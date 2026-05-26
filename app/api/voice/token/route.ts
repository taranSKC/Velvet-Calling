import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST() {
  // Verify user is authenticated
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    console.error("XAI_API_KEY is not set in environment variables");
    return NextResponse.json(
      { error: "Voice service not configured" },
      { status: 503 }
    );
  }

  try {
    const response = await fetch(
      "https://api.x.ai/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expires_after: { seconds: 300 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("xAI token mint failed:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to create voice session" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      token: data.value,
      expiresAt: data.expires_at,
    });
  } catch (error) {
    console.error("xAI token mint error:", error);
    return NextResponse.json(
      { error: "Voice service unavailable" },
      { status: 500 }
    );
  }
}
