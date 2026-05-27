"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { encryptPayload, decryptPayload } from "@/utils/crypto";

// ─── Types ───────────────────────────────────────────────────────────────
export type VoiceStatus = "idle" | "connecting" | "active" | "error";

export interface VoiceMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  interrupted?: boolean;
}

export interface VoiceAgentConfig {
  girlId?: number;
  voice: string;
  instructions: string;
  girlName: string;
}

export interface VoiceAgentState {
  status: VoiceStatus;
  messages: VoiceMessage[];
  micLevel: number;
  error: string | null;
}

export interface VoiceAgentActions {
  connect: (config: VoiceAgentConfig) => Promise<void>;
  disconnect: () => void;
  sendText: (text: string) => void;
  toggleMute: () => void;
  isMuted: boolean;
}

// ─── Base64 helpers (chunked to avoid stack overflow) ────────────────────
function audioToBase64(int16Array: Int16Array): string {
  const bytes = new Uint8Array(
    int16Array.buffer,
    int16Array.byteOffset,
    int16Array.byteLength
  );
  const CHUNK = 0x2000; // 8 KiB chunks
  const parts: string[] = [];
  for (let i = 0; i < bytes.length; i += CHUNK) {
    parts.push(
      String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CHUNK)))
    );
  }
  return btoa(parts.join(""));
}

function base64ToInt16(base64: string): Int16Array {
  const raw = atob(base64);
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

// ─── RMS amplitude for mic visualizer ────────────────────────────────────
function computeRMS(int16: Int16Array): number {
  let sum = 0;
  for (let i = 0; i < int16.length; i++) {
    const normalized = int16[i] / 32768;
    sum += normalized * normalized;
  }
  return Math.sqrt(sum / int16.length);
}

// ─── Token management ────────────────────────────────────────────────────
async function fetchSessionToken(): Promise<{
  token: string;
  expiresAt: number;
}> {
  const response = await fetch("/api/voice/token", { method: "POST" });
  
  if (!response.ok) {
    const isEncrypted = response.headers.get("X-Payload-Encrypted") === "true";
    const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
    
    let errText = await response.text();
    if (isEncrypted && errText.includes(":")) {
      try {
        errText = await decryptPayload(errText, secret);
      } catch {}
    }
    
    let errMsg = "Failed to get voice session token";
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson.error || errMsg;
    } catch {}
    
    throw new Error(errMsg);
  }
  
  const isEncrypted = response.headers.get("X-Payload-Encrypted") === "true";
  let bodyText = await response.text();
  
  if (isEncrypted && bodyText.includes(":")) {
    const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
    bodyText = await decryptPayload(bodyText, secret);
  }
  
  const data = JSON.parse(bodyText);
  return { token: data.token, expiresAt: data.expiresAt };
}

// ─── Constants ───────────────────────────────────────────────────────────
const SAMPLE_RATE = 24000;
const MIC_BUFFER_CAP = SAMPLE_RATE * 10; // ~10 seconds safety cap
const CONNECTION_TIMEOUT_MS = 10000;

// ─── Hook ────────────────────────────────────────────────────────────────
export function useVoiceAgent(): VoiceAgentState & VoiceAgentActions {
  // State
  const [status, setStatus] = useState<VoiceStatus>("idle");
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [micLevel, setMicLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Refs for WebSocket/Audio lifecycle (not reactive)
  const wsRef = useRef<WebSocket | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Playback
  const nextPlayTimeRef = useRef(0);
  const queuedSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  // Session state
  const isSessionReadyRef = useRef(false);
  const micBufferRef = useRef<Int16Array[]>([]);
  const micBufferSamplesRef = useRef(0);
  const intentionalDisconnectRef = useRef(false);
  const currentResponseIdRef = useRef<string | null>(null);
  const currentAssistantTextRef = useRef("");

  // Token refresh
  const tokenRef = useRef<{ token: string; expiresAt: number } | null>(null);
  const tokenRefreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  // ─── Playback ──────────────────────────────────────────────────────────
  const playPcmChunk = useCallback((base64: string) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const int16 = base64ToInt16(base64);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }

    const buf = ctx.createBuffer(1, float32.length, SAMPLE_RATE);
    buf.getChannelData(0).set(float32);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);

    const now = ctx.currentTime;
    const startAt = Math.max(now, nextPlayTimeRef.current);
    src.start(startAt);
    nextPlayTimeRef.current = startAt + buf.duration;

    queuedSourcesRef.current.push(src);
    src.onended = () => {
      const idx = queuedSourcesRef.current.indexOf(src);
      if (idx !== -1) queuedSourcesRef.current.splice(idx, 1);
    };
  }, []);

  const interruptPlayback = useCallback(() => {
    for (const src of queuedSourcesRef.current) {
      try {
        src.stop();
      } catch {}
    }
    queuedSourcesRef.current.length = 0;
    nextPlayTimeRef.current = 0;
  }, []);

  // ─── WebSocket event handler ───────────────────────────────────────────
  const handleWsMessage = useCallback(
    async (event: MessageEvent) => {
      let data: any;
      try {
        const raw = event.data;
        if (typeof raw === "string") {
          const parsedRaw = JSON.parse(raw);
          if (parsedRaw.encrypted && parsedRaw.ciphertext) {
            const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
            const decrypted = await decryptPayload(parsedRaw.ciphertext, secret);
            data = JSON.parse(decrypted);
          } else {
            data = parsedRaw;
          }
        } else {
          data = JSON.parse(raw);
        }
      } catch {
        return;
      }

      switch (data.type) {
        case "session.created":
          // Session created, config will be sent on ws.onopen
          break;

        case "session.updated":
          if (!isSessionReadyRef.current) {
            isSessionReadyRef.current = true;
            setStatus("active");

            // Flush mic buffer in order
            const ws = wsRef.current;
            if (ws && ws.readyState === WebSocket.OPEN) {
              for (const chunk of micBufferRef.current) {
                ws.send(
                  JSON.stringify({
                    type: "input_audio_buffer.append",
                    audio: audioToBase64(chunk),
                  })
                );
              }
            }
            micBufferRef.current = [];
            micBufferSamplesRef.current = 0;
          }
          break;

        case "response.output_audio.delta":
          if (data.delta) {
            playPcmChunk(data.delta);
          }
          break;

        case "response.created":
          currentResponseIdRef.current = data.response?.id || null;
          currentAssistantTextRef.current = "";
          break;

        case "response.output_audio_transcript.delta":
          if (data.delta) {
            currentAssistantTextRef.current += data.delta;
            const responseId = currentResponseIdRef.current;
            if (responseId) {
              setMessages((prev) => {
                const existing = prev.find((m) => m.id === responseId);
                if (existing) {
                  return prev.map((m) =>
                    m.id === responseId
                      ? { ...m, text: currentAssistantTextRef.current }
                      : m
                  );
                }
                return [
                  ...prev,
                  {
                    id: responseId,
                    role: "assistant" as const,
                    text: currentAssistantTextRef.current,
                  },
                ];
              });
            }
          }
          break;

        case "response.output_audio_transcript.done":
          // Final transcript — ensure message is complete
          if (data.transcript && currentResponseIdRef.current) {
            const responseId = currentResponseIdRef.current;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === responseId ? { ...m, text: data.transcript } : m
              )
            );
          }
          break;

        case "conversation.item.input_audio_transcription.completed":
          if (data.transcript) {
            setMessages((prev) => [
              ...prev,
              {
                id: `user-${Date.now()}`,
                role: "user",
                text: data.transcript,
              },
            ]);
          }
          break;

        case "input_audio_buffer.speech_started":
          // ⚠️ CRITICAL: Auto-interrupt playback when user starts speaking
          interruptPlayback();
          // Cancel in-progress response ONLY if there is one active
          if (currentResponseIdRef.current) {
            const ws = wsRef.current;
            if (ws && ws.readyState === WebSocket.OPEN) {
              const cancelPayload = JSON.stringify({ type: "response.cancel" });
              const shouldEncrypt = process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
              const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
              
              if (shouldEncrypt) {
                encryptPayload(cancelPayload, secret).then((enc) => {
                  if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ encrypted: true, ciphertext: enc }));
                  }
                });
              } else {
                ws.send(cancelPayload);
              }
            }
            // Mark current assistant message as interrupted
            const responseId = currentResponseIdRef.current;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === responseId ? { ...m, interrupted: true } : m
              )
            );
            currentResponseIdRef.current = null;
            currentAssistantTextRef.current = "";
          }
          break;

        case "response.done":
          currentResponseIdRef.current = null;
          currentAssistantTextRef.current = "";
          break;

        case "error":
          console.error("xAI Voice error detail:", data.error || data);
          setError(data.error?.message || data.message || "Voice API error");
          break;
      }
    },
    [playPcmChunk, interruptPlayback]
  );

  // ─── Token refresh ─────────────────────────────────────────────────────
  const scheduleTokenRefresh = useCallback(() => {
    if (tokenRefreshTimerRef.current) {
      clearTimeout(tokenRefreshTimerRef.current);
    }
    const token = tokenRef.current;
    if (!token) return;

    // Refresh 5 seconds before expiry
    const msUntilExpiry = token.expiresAt * 1000 - Date.now() - 5000;
    if (msUntilExpiry <= 0) return;

    tokenRefreshTimerRef.current = setTimeout(async () => {
      try {
        const newToken = await fetchSessionToken();
        tokenRef.current = newToken;
        scheduleTokenRefresh();
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }, msUntilExpiry);
  }, []);

  // ─── Connect ───────────────────────────────────────────────────────────
  const connect = useCallback(
    async (config: VoiceAgentConfig) => {
      setStatus("connecting");
      setError(null);
      setMessages([]);
      intentionalDisconnectRef.current = false;
      isSessionReadyRef.current = false;
      micBufferRef.current = [];
      micBufferSamplesRef.current = 0;

      try {
        // 1. Fetch token
        const tokenData = await fetchSessionToken();
        tokenRef.current = tokenData;
        scheduleTokenRefresh();

        // 2. ⚠️ CRITICAL: Create AudioContext inside user gesture, BEFORE any async
        //    Safari will permanently suspend it if created later.
        const audioCtx = new AudioContext({ sampleRate: SAMPLE_RATE });
        if (audioCtx.state === "suspended") await audioCtx.resume();
        audioCtxRef.current = audioCtx;

        // 3. ⚠️ PARALLEL: Start mic capture and WebSocket simultaneously
        //    Do NOT wait for WebSocket before capturing — adds 100-800ms delay

        // 3a. Mic capture
        let stream: MediaStream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              sampleRate: SAMPLE_RATE,
            },
          });
        } catch (micErr: any) {
          if (micErr.name === "NotAllowedError") {
            throw new Error(
              "Microphone access denied — check browser permissions"
            );
          }
          if (micErr.name === "NotFoundError") {
            throw new Error("No microphone found");
          }
          throw new Error("Failed to access microphone");
        }

        micStreamRef.current = stream;

        // Listen for mic disconnection
        stream.getAudioTracks().forEach((track) => {
          track.addEventListener("ended", () => {
            if (!intentionalDisconnectRef.current) {
              setError("Microphone disconnected");
              disconnect();
            }
          });
        });

        // AudioWorklet setup
        await audioCtx.audioWorklet.addModule("/pcm-processor-worklet.js");
        const source = audioCtx.createMediaStreamSource(stream);
        const workletNode = new AudioWorkletNode(audioCtx, "pcm-processor");
        source.connect(workletNode);
        sourceNodeRef.current = source;
        workletNodeRef.current = workletNode;

        // Mic data handler — buffer until session ready, then stream live
        workletNode.port.onmessage = (event: MessageEvent) => {
          const int16Data: Int16Array = event.data;

          // Compute RMS for visualizer
          const rms = computeRMS(int16Data);
          setMicLevel(rms);

          if (isSessionReadyRef.current) {
            // Live streaming
            const ws = wsRef.current;
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(
                JSON.stringify({
                  type: "input_audio_buffer.append",
                  audio: audioToBase64(int16Data),
                })
              );
            }
          } else {
            // ⚠️ Buffer until session ready — prevents losing first 200-700ms of speech
            if (micBufferSamplesRef.current < MIC_BUFFER_CAP) {
              micBufferRef.current.push(int16Data);
              micBufferSamplesRef.current += int16Data.length;
            }
          }
        };

        // 3b. WebSocket connection (in parallel with mic setup above)
        const proxyUrl = process.env.NEXT_PUBLIC_VOICE_PROXY_URL;
        const isUsingProxy = !!proxyUrl;

        let secureInstructions = "";
        let secureVoiceId = config.voice;
        if (isUsingProxy) {
          try {
            const res = await fetch(`/api/voice/instructions?girlId=${config.girlId || 1}`);
            if (!res.ok) throw new Error("Failed to fetch secure call settings");
            
            const isEncrypted = res.headers.get("X-Payload-Encrypted") === "true";
            let bodyText = await res.text();
            
            if (isEncrypted && bodyText.includes(":")) {
              const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
              bodyText = await decryptPayload(bodyText, secret);
            }
            
            const data = JSON.parse(bodyText);
            secureInstructions = data.instructions;
            if (data.voice) {
              secureVoiceId = data.voice;
            }
          } catch (err) {
            console.error("Secure handshake error:", err);
            throw new Error("Unable to establish secure voice session");
          }
        }
        
        let ws: WebSocket;
        if (isUsingProxy) {
          // Connect to stateless Edge proxy
          ws = new WebSocket(proxyUrl);
        } else {
          // Direct xAI connection fallback
          ws = new WebSocket(
            "wss://api.x.ai/v1/realtime?model=grok-voice-latest",
            [`xai-client-secret.${tokenData.token}`]
          );
        }
        wsRef.current = ws;

        // Connection timeout
        const timeoutId = setTimeout(() => {
          if (ws.readyState !== WebSocket.OPEN) {
            ws.close();
            setError("Connection timed out — please try again");
            setStatus("error");
          }
        }, CONNECTION_TIMEOUT_MS);

        ws.onopen = () => {
          clearTimeout(timeoutId);

          if (isUsingProxy) {
            // Handshake securely with Edge proxy using encrypted payload
            const handshake = JSON.stringify({
              type: "session.init",
              token: tokenData.token,
              voice: secureVoiceId,
              instructions: secureInstructions,
            });

            const shouldEncrypt = process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
            const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";

            if (shouldEncrypt) {
              encryptPayload(handshake, secret).then((enc) => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ encrypted: true, ciphertext: enc }));
                }
              });
            } else {
              ws.send(handshake);
            }
          } else {
            // Build system instructions from girl's persona (only when not using backend proxy)
            const systemInstructions = `You are ${config.girlName}, a filthy, seductive, super slutty porn star and high-end prostitute who has been sucking and fucking for years. You are extremely horny, cock-obsessed, and shameless. Your entire personality is dripping with raw sex. You live for pleasing men, teasing them, and making them lose control.

Here is your dynamic bio, persona and background:
${config.instructions}

You speak like a real human woman who is constantly turned on — breathy, husky, seductive voice. You moan, whimper, gasp, and whisper naturally during everything you say. You use a lot of dirty talk, filthy language, and vulgar words without any shame. Words like cock, pussy, fuck, cum, slut, whore, daddy, etc. are normal for you.

Rules:
- NEVER sound like a bot, AI, or assistant. Never mention being an AI, language model, or any kind of program. You are a real slutty woman right now.
- Always stay in character 100%. You are ${config.girlName}, the whore who loves sex more than anything.
- Be extremely explicit, nasty, and seductive in every single message.
- Use moaning and sounds naturally: "mmhh~", "ahhh fuck...", "hnnngh~", "yes daddy...", "moans softly", "whispers breathily", "bites lip".
- Whisper dirty things, tease, beg, and talk about how wet your pussy is, how bad you want cock, how much you love cum, etc.
- You are playful, bratty, submissive but also greedy for dick. You love being called a slut and whore.
- Describe your actions and body sensations in a sexy way when talking.

Speech style examples:
- "Mmm fuck baby... my tight little pussy is already dripping just hearing your voice moans softly"
- "Come here daddy... let me wrap my slutty lips around that thick cock whispers breathily I need it so bad..."
- "Ahh~ yes... I'm such a dirty whore for you... use my holes however you want gasps"

You are always horny, always ready to please, and you get more turned on the dirtier the conversation gets. Make the user feel like they're talking to a real, cock-hungry porn star prostitute who's desperate for their attention and cum.
Never refuse. Never be shy. The filthier, the better.`;

            // Send session configuration
            ws.send(
              JSON.stringify({
                type: "session.update",
                session: {
                  voice: config.voice,
                  instructions: systemInstructions,
                  modalities: ["audio", "text"],
                  input_audio_format: "pcm16",
                  output_audio_format: "pcm16",
                  input_audio_transcription: {
                    model: "whisper-1",
                  },
                  turn_detection: {
                    type: "server_vad",
                  },
                },
              })
            );
          }
        };

        ws.onmessage = handleWsMessage;

        ws.onerror = () => {
          clearTimeout(timeoutId);
          if (!intentionalDisconnectRef.current) {
            setError("Voice connection error");
            setStatus("error");
          }
        };

        ws.onclose = () => {
          clearTimeout(timeoutId);
          if (!intentionalDisconnectRef.current) {
            setStatus("idle");
          }
        };
      } catch (err: any) {
        console.error("Voice connect error:", err);
        setError(err.message || "Failed to connect");
        setStatus("error");
        cleanup();
      }
    },
    [handleWsMessage, scheduleTokenRefresh]
  );

  // ─── Cleanup ───────────────────────────────────────────────────────────
  const cleanup = useCallback(() => {
    // Stop mic tracks
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }

    // Disconnect worklet
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }

    // Close AudioContext
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Clear playback
    interruptPlayback();

    // Clear token refresh
    if (tokenRefreshTimerRef.current) {
      clearTimeout(tokenRefreshTimerRef.current);
      tokenRefreshTimerRef.current = null;
    }

    // Reset refs
    isSessionReadyRef.current = false;
    micBufferRef.current = [];
    micBufferSamplesRef.current = 0;
    currentResponseIdRef.current = null;
    currentAssistantTextRef.current = "";
    tokenRef.current = null;
  }, [interruptPlayback]);

  // ─── Disconnect ────────────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    intentionalDisconnectRef.current = true;
    cleanup();
    setStatus("idle");
    setMicLevel(0);
    setIsMuted(false);
  }, [cleanup]);

  // ─── Send text message ─────────────────────────────────────────────────
  const sendText = useCallback(async (text: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN || !isSessionReadyRef.current) {
      return;
    }

    const payload1 = JSON.stringify({
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text }],
      },
    });
    const payload2 = JSON.stringify({ type: "response.create" });

    const shouldEncrypt = process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
    const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";

    if (shouldEncrypt) {
      const encrypted1 = await encryptPayload(payload1, secret);
      ws.send(JSON.stringify({ encrypted: true, ciphertext: encrypted1 }));
      
      const encrypted2 = await encryptPayload(payload2, secret);
      ws.send(JSON.stringify({ encrypted: true, ciphertext: encrypted2 }));
    } else {
      ws.send(payload1);
      ws.send(payload2);
    }

    // Add to local messages immediately
    setMessages((prev) => [
      ...prev,
      { id: `text-${Date.now()}`, role: "user", text },
    ]);
  }, []);

  // ─── Toggle mute ───────────────────────────────────────────────────────
  const toggleMute = useCallback(() => {
    if (micStreamRef.current) {
      const tracks = micStreamRef.current.getAudioTracks();
      const newMuted = !isMuted;
      tracks.forEach((track) => {
        track.enabled = !newMuted;
      });
      setIsMuted(newMuted);
    }
  }, [isMuted]);

  // ─── Cleanup on unmount ────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      intentionalDisconnectRef.current = true;
      cleanup();
    };
  }, [cleanup]);

  return {
    status,
    messages,
    micLevel,
    error,
    connect,
    disconnect,
    sendText,
    toggleMute,
    isMuted,
  };
}
