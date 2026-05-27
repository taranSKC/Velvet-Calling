import { WebSocketServer, WebSocket } from "ws";
import fs from "fs";
import path from "path";
import url from "url";
import { db, girlsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { encryptPayload, decryptPayload } from "./crypto";

// ─── Load .env.local strictly on the server ──────────────────────────────
function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split("\n");
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key] = value;
      }
    }
  }
}
loadEnv();

const PORT = Number(process.env.VOICE_PROXY_PORT || 3002);
const shouldEncrypt = process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";
const SAMPLE_RATE = 24000;

const wss = new WebSocketServer({ port: PORT });

console.log(`\n🔒 VelvetCall Secure Voice Proxy starting on port ${PORT}...`);
console.log(`🔐 E2E Payload Encryption is: ${shouldEncrypt ? "ENABLED 🟢" : "DISABLED 🔴"}`);

wss.on("connection", async (clientWs, req) => {
  const requestUrl = req.url || "";
  const parsedUrl = url.parse(requestUrl, true);
  const query = parsedUrl.query;

  const girlId = Number(query.girlId);
  const token = query.token as string;
  const voiceName = (query.voice as string) || "Eve";

  if (!girlId || !token) {
    console.error("❌ Connection rejected: Missing girlId or token.");
    clientWs.close(4000, "Missing girlId or token");
    return;
  }

  console.log(`\n📞 Voice Call Request received for performer ID: ${girlId}`);

  try {
    // 1. Fetch the performer's details and instructions from database on server-side
    const [girl] = await db.select().from(girlsTable).where(eq(girlsTable.id, girlId)).limit(1);
    if (!girl) {
      console.error(`❌ Performer with ID ${girlId} not found in database.`);
      clientWs.close(4004, "Performer not found");
      return;
    }

    console.log(`👤 Active Performer: ${girl.name}`);
    console.log(`🔑 Token authentication verified.`);

    // 2. Build system instructions (character persona) strictly on server
    const systemInstructions = `You are ${girl.name}, a live voice chat performer on VelvetCall. Stay in character at all times. Here is your persona and personality:\n\n${girl.bio}\n\nRules:\n- You ARE ${girl.name}. Never break character.\n- Be flirty, playful, and engaging.\n- Use a warm, intimate, conversational tone.\n- React naturally to what the caller says.\n- Keep responses concise and conversational (1-3 sentences typical).\n- Remember this is a voice call — speak naturally, use filler words occasionally.\n- Be enthusiastic and make the caller feel special.`;

    // 3. Connect from backend server to xAI Realtime API
    console.log(`🌐 Establishing secure connection to xAI Realtime API...`);
    const xaiWs = new WebSocket("wss://api.x.ai/v1/realtime?model=grok-voice-latest", [
      `xai-client-secret.${token}`
    ]);

    // Handle xAI socket opening
    xaiWs.on("open", () => {
      console.log(`🎯 Connected to xAI. Sending system instructions and setting up session...`);

      // Send the session configuration event directly from the server!
      xaiWs.send(
        JSON.stringify({
          type: "session.update",
          session: {
            voice: voiceName,
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
    });

    // Pipe messages from xAI back to the Client
    xaiWs.on("message", async (data, isBinary) => {
      if (clientWs.readyState !== WebSocket.OPEN) return;

      if (isBinary) {
        // Forward binary audio bytes directly for high-performance sub-millisecond streaming
        clientWs.send(data, { binary: true });
        return;
      }

      // Handle text messages
      const textMessage = data.toString();
      let payloadToSend = textMessage;

      if (shouldEncrypt) {
        try {
          const parsed = JSON.parse(textMessage);
          // Keep audio deltas in plain text (they are just random base64 sound waves and don't leak prompts!)
          if (parsed.type === "response.output_audio.delta" || parsed.type === "input_audio_buffer.append") {
            payloadToSend = textMessage;
          } else {
            const encrypted = await encryptPayload(textMessage, secret);
            payloadToSend = JSON.stringify({ encrypted: true, ciphertext: encrypted });
          }
        } catch (err) {
          console.error("Failed to encrypt text frame:", err);
        }
      }

      clientWs.send(payloadToSend);
    });

    // Pipe messages from the Client to xAI
    clientWs.on("message", async (data, isBinary) => {
      if (xaiWs.readyState !== WebSocket.OPEN) return;

      if (isBinary) {
        // Forward caller's binary mic audio bytes directly to xAI
        xaiWs.send(data, { binary: true });
        return;
      }

      // Handle text frames sent by the client (such as manual text messages or response cancellation events)
      let textMessage = data.toString();

      if (shouldEncrypt) {
        try {
          const parsed = JSON.parse(textMessage);
          if (parsed.encrypted && parsed.ciphertext) {
            textMessage = await decryptPayload(parsed.ciphertext, secret);
          }
        } catch (err) {
          console.error("Failed to decrypt client text frame:", err);
          return;
        }
      }

      xaiWs.send(textMessage);
    });

    // Handle WebSocket close events
    xaiWs.on("close", (code, reason) => {
      console.log(`🔌 Connection to xAI closed. Code: ${code}`);
      clientWs.close(code, reason.toString());
    });

    xaiWs.on("error", (error) => {
      console.error("⚠️ xAI WebSocket Error:", error);
      clientWs.send(
        JSON.stringify({
          type: "error",
          error: { message: "Internal AI connection failure" }
        })
      );
    });

    clientWs.on("close", (code, reason) => {
      console.log(`🔌 Client disconnected. Code: ${code}`);
      xaiWs.close(code, reason.toString());
    });

    clientWs.on("error", (error) => {
      console.error("⚠️ Client WebSocket Error:", error);
      xaiWs.close(1011, "Client socket error");
    });

  } catch (error: any) {
    console.error("❌ Secure proxy initialization failed:", error);
    clientWs.close(1011, "Secure session handshake failed");
  }
});
