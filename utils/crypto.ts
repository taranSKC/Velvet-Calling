import { NextResponse } from "next/server";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Derive a secure 256-bit AES key from the password using SHA-256
async function getEncryptionKey(secret: string): Promise<CryptoKey> {
  const passwordBytes = encoder.encode(secret);
  const hash = await crypto.subtle.digest("SHA-256", passwordBytes);
  return await crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a plaintext string using AES-256-GCM
 */
export async function encryptPayload(text: string, secret: string): Promise<string> {
  try {
    const key = await getEncryptionKey(secret);
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV is standard for GCM
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(text)
    );

    // Convert IV and Ciphertext to Hex strings
    const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
    const ciphertextBytes = new Uint8Array(encrypted);
    const ciphertextHex = Array.from(ciphertextBytes).map(b => b.toString(16).padStart(2, '0')).join('');

    return `${ivHex}:${ciphertextHex}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    throw new Error("Failed to encrypt payload");
  }
}

/**
 * Decrypts a hex-encoded AES-256-GCM string back to plaintext
 */
export async function decryptPayload(encryptedHex: string, secret: string): Promise<string> {
  try {
    const parts = encryptedHex.split(":");
    if (parts.length !== 2) {
      throw new Error("Invalid encrypted payload format");
    }
    const [ivHex, ciphertextHex] = parts;

    const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    const ciphertext = new Uint8Array(ciphertextHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    const key = await getEncryptionKey(secret);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );

    return decoder.decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt payload");
  }
}

/**
 * Higher-order function to secure Next.js API route handlers.
 * Automatically decrypts the incoming POST/PUT JSON payload and encrypts the JSON response body.
 */
export function secureRoute(handler: (req: Request, ...args: any[]) => Promise<Response>) {
  return async (request: Request, ...args: any[]) => {
    const shouldEncrypt = process.env.NEXT_PUBLIC_PAYLOAD_ENCRYPTION === "true";
    const secret = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "velvet-call-secret-key-32-chars-long!";

    let reqToPass = request;

    if (shouldEncrypt && request.method !== "GET" && request.method !== "HEAD") {
      try {
        const contentType = request.headers.get("content-type");
        // If content is encrypted, decrypt it back to normal JSON before passing to handler
        if (contentType && (contentType.includes("application/json") || contentType.includes("text/plain"))) {
          // Clone the request first to read bodyText without consuming the original request's body stream
          const bodyText = await request.clone().text();

          const isRawJson = bodyText.trim().startsWith("{") || bodyText.trim().startsWith("[");
          if (bodyText && bodyText.includes(":") && !isRawJson) {
            const finalBody = await decryptPayload(bodyText, secret);

            // Recreate the Request object ONLY when we have actually decrypted the payload
            const newHeaders = new Headers(request.headers);
            newHeaders.set("Content-Type", "application/json");

            reqToPass = new Request(request.url, {
              method: request.method,
              headers: newHeaders,
              body: finalBody,
            });
          } else {
            // If the body is not encrypted (e.g. raw JSON), we pass the original unconsumed request!
            reqToPass = request;
          }
        }
      } catch (err) {
        console.error("Failed to decrypt incoming secure route request body:", err);
        return NextResponse.json({ error: "Invalid secure payload signature" }, { status: 400 });
      }
    }

    try {
      const response = await handler(reqToPass, ...args);

      if (shouldEncrypt && response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const rawText = await response.text();
          const encryptedText = await encryptPayload(rawText, secret);

          const newHeaders = new Headers(response.headers);
          newHeaders.set("Content-Type", "text/plain");
          newHeaders.set("X-Payload-Encrypted", "true");

          return new Response(encryptedText, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        }
      }

      return response;
    } catch (error: any) {
      console.error("Secure route execution error:", error);
      return NextResponse.json({ error: error.message || "Internal secure gateway error" }, { status: 500 });
    }
  };
}
