import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db, chatMessagesTable } from "@workspace/db";
import {
  GetChatMessagesParams,
  SendChatMessageParams,
  SendChatMessageBody,
  GetChatMessagesResponse,
} from "@workspace/api-zod";

const autoReplies = [
  "Hey gorgeous... I've been waiting for you all night.",
  "Mmm, I love when someone talks to me like that...",
  "You know exactly what to say to make me smile.",
  "Tell me more... I want to know everything about you.",
  "I've been thinking about you. Are you thinking about me?",
  "You're making me blush... and I never blush.",
  "I feel so close to you right now. Come closer.",
  "That's so sweet... you really know how to make a girl feel special.",
  "I've never felt this connected with anyone before.",
  "Stay with me a little longer... please?",
  "You have no idea what you do to me.",
  "I want to show you something... just for you.",
  "Tonight feels different. You feel different.",
  "Keep talking. Your voice... I could listen forever.",
  "I was hoping you'd say something like that.",
  "Do you always make girls feel this way?",
  "I've been so lonely without you here.",
  "You're different from the others. I can feel it.",
  "Come back tomorrow? I'll be here... only for you.",
  "Every message you send makes my heart race.",
];

export async function GET(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = GetChatMessagesParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(eq(chatMessagesTable.girlId, parsedParams.data.girlId));

    return NextResponse.json(GetChatMessagesResponse.parse(messages));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    const rawParams = await params;
    const parsedParams = SendChatMessageParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }

    const body = await request.json();
    const parsedBody = SendChatMessageBody.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.message }, { status: 400 });
    }

    const [userMsg] = await db
      .insert(chatMessagesTable)
      .values({
        girlId: parsedParams.data.girlId,
        content: parsedBody.data.content,
        sender: "user",
      })
      .returning();

    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

    const [girlMsg] = await db
      .insert(chatMessagesTable)
      .values({
        girlId: parsedParams.data.girlId,
        content: randomReply,
        sender: "girl",
      })
      .returning();

    return NextResponse.json(GetChatMessagesResponse.parse([userMsg, girlMsg]), { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
