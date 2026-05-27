// @ts-nocheck
/**
 * VelvetCall Secure Voice WebSocket Edge Proxy
 * Deploy to Cloudflare Workers (Free Tier)
 */

export interface Env {
  NEXT_PUBLIC_PAYLOAD_ENCRYPTION?: string;
  NEXT_PUBLIC_ENCRYPTION_KEY?: string;
}

// ─── AES-256-GCM Web Crypto Decryption Helpers ──────────────────────────
async function getKey(password: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const passwordBytes = enc.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", passwordBytes);
  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

async function decryptPayload(ciphertextWithIv: string, keyString: string): Promise<string> {
  const parts = ciphertextWithIv.split(":");
  if (parts.length !== 2) throw new Error("Invalid cipher format");
  const iv = new Uint8Array(
    parts[0].match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const encrypted = new Uint8Array(
    parts[1].match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const key = await getKey(keyString);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );
  return new TextDecoder().decode(decrypted);
}

async function encryptPayload(plaintext: string, keyString: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await getKey(keyString);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  );
  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const encryptedHex = Array.from(new Uint8Array(encrypted))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${ivHex}:${encryptedHex}`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const upgradeHeader = request.headers.get("Upgrade");
    if (!upgradeHeader || upgradeHeader !== "websocket") {
      return new Response("VelvetCall Secure Edge Voice Proxy. Connect via WebSocket.", { status: 426 });
    }

    const shouldEncrypt = env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
    const secret = env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";

    // Create client-server WebSocket pair
    const webSocketPair = new WebSocketPair();
    const [clientWs, serverWs] = Object.values(webSocketPair);

    serverWs.accept();

    let xaiWs: WebSocket | null = null;
    let isInitialized = false;

    serverWs.addEventListener("message", async (event) => {
      // 1. Initial Handshake / Setup
      if (!isInitialized) {
        try {
          let textData = event.data as string;
          
          // Decrypt the handshake config if encryption is enabled
          if (shouldEncrypt) {
            const parsed = JSON.parse(textData);
            if (parsed.encrypted && parsed.ciphertext) {
              textData = await decryptPayload(parsed.ciphertext, secret);
            }
          }

          const config = JSON.parse(textData);
          if (config.type !== "session.init") {
            serverWs.send(JSON.stringify({ type: "error", error: { message: "Invalid handshake event" } }));
            serverWs.close(4000, "Invalid handshake");
            return;
          }

          const { token, voice, instructions } = config;
          if (!token || !instructions) {
            serverWs.close(4000, "Missing voice session token or instructions");
            return;
          }

          isInitialized = true;

          // Establish the secure connection from Cloudflare's Edge to xAI
          const xaiRes = await fetch("https://api.x.ai/v1/realtime?model=grok-voice-latest", {
            headers: {
              "Upgrade": "websocket",
              "Sec-WebSocket-Protocol": `xai-client-secret.${token}`
            }
          });

          xaiWs = xaiRes.webSocket;
          if (!xaiWs) {
            throw new Error("xAI WebSocket connection failed");
          }

          xaiWs.accept();

          // Send the session instructions immediately from Cloudflare to xAI
          xaiWs.send(
            JSON.stringify({
              type: "session.update",
              session: {
                voice: (voice || "eve").toLowerCase(),
                instructions: instructions,
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

          // Relayer: xAI back to Client browser
          xaiWs.addEventListener("message", async (xaiEvent) => {
            if (serverWs.readyState !== 1) return; // 1 = OPEN

            if (typeof xaiEvent.data !== "string") {
              // Binary audio chunks passed with absolute zero latency
              serverWs.send(xaiEvent.data);
              return;
            }

            const textMessage = xaiEvent.data;
            let payloadToSend = textMessage;

            if (shouldEncrypt) {
              try {
                const parsed = JSON.parse(textMessage);
                // Zero-latency bypass for audio deltas
                if (parsed.type === "response.output_audio.delta" || parsed.type === "input_audio_buffer.append") {
                  payloadToSend = textMessage;
                } else {
                  const encrypted = await encryptPayload(textMessage, secret);
                  payloadToSend = JSON.stringify({ encrypted: true, ciphertext: encrypted });
                }
              } catch (err) {
                // Ignore parsing errors
              }
            }

            serverWs.send(payloadToSend);
          });

          xaiWs.addEventListener("close", (e) => {
            serverWs.close(e.code, e.reason);
          });

          xaiWs.addEventListener("error", () => {
            serverWs.send(JSON.stringify({ type: "error", error: { message: "Edge AI link disrupted" } }));
          });

        } catch (err: any) {
          serverWs.send(JSON.stringify({ type: "error", error: { message: `Session initialization error: ${err.message || String(err)}` } }));
          serverWs.close(1011, "Handshake failed");
        }
        return;
      }

      // 2. Normal relay phase (Client to xAI)
      if (xaiWs && xaiWs.readyState === 1) {
        if (typeof event.data !== "string") {
          // Forward mic audio directly to xAI
          xaiWs.send(event.data);
          return;
        }

        let textMessage = event.data;

        if (shouldEncrypt) {
          try {
            const parsed = JSON.parse(textMessage);
            if (parsed.encrypted && parsed.ciphertext) {
              textMessage = await decryptPayload(parsed.ciphertext, secret);
            }
          } catch (err) {
            return;
          }
        }

        xaiWs.send(textMessage);
      }
    });

    serverWs.addEventListener("close", (e) => {
      if (xaiWs && xaiWs.readyState === 1) {
        xaiWs.close(e.code, e.reason);
      }
    });

    return new Response(null, {
      status: 101,
      webSocket: clientWs,
    });
  },
};
