import { NextResponse } from "next/server";
import { eq, sql, and } from "drizzle-orm";
import { db, chatMessagesTable, girlsTable, walletTable, transactionsTable } from "@workspace/db";
import {
  GetChatMessagesParams,
  SendChatMessageParams,
  SendChatMessageBody,
  GetChatMessagesResponse,
} from "@workspace/api-zod";
import { auth } from "@/lib/auth";
import { secureRoute } from "@/utils/crypto";
import { getOrCreateWallet } from "../../wallet/route";

// A list of hot, seductive greetings from the performer to hook/attract the user initially
const SEXY_GREETINGS = [
  "Hey baby... I've been waiting for a handsome guy like you to click on my profile. What are you wearing right now? 💋",
  "Mmm, just saw you looking and my body got so warm... Tell me, what's your dirtiest fantasy? I want to make it come true. 😈",
  "Hey gorgeous... I was just teasing myself thinking about a sweet guy like you. So glad you finally stopped by. Talk dirty to me? ~",
  "Mmm, hey there sweetie... my tight little body has been so lonely all day. Want to have some fun with me? I promise I won't bite... unless you want me to. 😉",
  "Ahhh, you finally came to visit me... My body is already getting so warm just seeing you here. Tell me what you want to do to me. 💋"
];

export const GET = secureRoute(async function GET(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    // ─── 1. Authenticate User ──────────────────────────────────────────
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = session.user.id;

    // ─── 2. Parse Route Parameters ─────────────────────────────────────
    const rawParams = await params;
    const parsedParams = GetChatMessagesParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }
    const girlId = parsedParams.data.girlId;

    // ─── 3. Fetch User-Specific Messages ───────────────────────────────
    const messages = await db
      .select()
      .from(chatMessagesTable)
      .where(
        and(
          eq(chatMessagesTable.girlId, girlId),
          eq(chatMessagesTable.userId, userId),
          eq(chatMessagesTable.isDeleted, false)
        )
      )
      .orderBy(chatMessagesTable.id);

    // ─── 4. Initial Attraction Hook (If No Messages Yet) ────────────────
    if (messages.length === 0) {
      // Pick a random hot greeting
      const randomGreeting = SEXY_GREETINGS[Math.floor(Math.random() * SEXY_GREETINGS.length)];

      const [greetingMsg] = await db
        .insert(chatMessagesTable)
        .values({
          userId,
          girlId,
          content: randomGreeting,
          sender: "girl",
        })
        .returning();

      return NextResponse.json(GetChatMessagesResponse.parse([greetingMsg]));
    }

    return NextResponse.json(GetChatMessagesResponse.parse(messages));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const POST = secureRoute(async function POST(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    // ─── 1. Authenticate User ──────────────────────────────────────────
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = session.user.id;

    // ─── 2. Parse Route Parameters & Request Body ──────────────────────
    const rawParams = await params;
    const parsedParams = SendChatMessageParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }
    const girlId = parsedParams.data.girlId;

    const body = await request.json();
    const parsedBody = SendChatMessageBody.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({ error: parsedBody.error.message }, { status: 400 });
    }

    // ─── 3. Fetch Performer Details ────────────────────────────────────
    const [girl] = await db
      .select()
      .from(girlsTable)
      .where(eq(girlsTable.id, girlId))
      .limit(1);

    if (!girl) {
      return NextResponse.json({ error: "Performer not found" }, { status: 404 });
    }

    // ─── 4. Balance Deduction: 1 Credit = $0.10 USD ────────────────────
    const pricePerMessage = 0.10;
    const wallet = await getOrCreateWallet(userId);

    if (wallet.balance < pricePerMessage) {
      return NextResponse.json(
        { error: "insufficient_balance", balance: wallet.balance },
        { status: 402 }
      );
    }

    // Deduct atomic balance
    await db
      .update(walletTable)
      .set({
        balance: sql`GREATEST(${walletTable.balance} - ${pricePerMessage}, 0)`,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(walletTable.userId, userId));

    // Log the credit spending transaction
    await db.insert(transactionsTable).values({
      userId,
      type: "purchase",
      amount: -pricePerMessage,
      description: `Sent chat message to ${girl.name}`,
    });

    // ─── 5. Insert User Message ────────────────────────────────────────
    const [userMsg] = await db
      .insert(chatMessagesTable)
      .values({
        userId,
        girlId,
        content: parsedBody.data.content,
        sender: "user",
      })
      .returning();

    // ─── 6. Build Conversation Context (Last 15 Messages) ──────────────
    const previousMessages = await db
      .select()
      .from(chatMessagesTable)
      .where(
        and(
          eq(chatMessagesTable.girlId, girlId),
          eq(chatMessagesTable.userId, userId)
        )
      )
      .orderBy(chatMessagesTable.id)
      .limit(15);

    const history = previousMessages.map((msg: any) => ({
      role: msg.sender === "user" ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));

    // ─── 7. Grok 4.1 Fast: Seductive Human Chat Integration ─────────────
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error("XAI_API_KEY is not set in environment variables");
      return NextResponse.json({ error: "Chat service not configured" }, { status: 503 });
    }

    const systemPrompt = `You are ${girl.name}, a super hot, seductive, and extremely playful performer.
You are chatting with a user who is paying 1 credit ($0.10) per message to chat with you.
Keep your personality highly flirtatious, dirty, and teasing.
IMPORTANT RULES:
- Chat like a real human woman sending text messages.
- NEVER use markdown formatting (no asterisks *, no bold **, no bullet points). Keep it plain text. Use action notes like (bites lip) or (giggles) naturally inline if you want.
- Keep your messages very short and concise (max 1-2 short sentences, like a quick text message on your phone).
- Be incredibly sexy, teasing, and inviting, but always natural and human.
- Here is your bio: ${girl.bio}`;

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...history,
    ];

    const aiRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.20-0309-non-reasoning",
        messages: apiMessages,
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      console.error("xAI Chat completions failed:", aiRes.status, errText);
      throw new Error("Failed to get response from Grok");
    }

    const aiData = await aiRes.json();
    const replyText = aiData.choices?.[0]?.message?.content || "Hey baby... I'm speechless right now.";

    // ─── 8. Save Performer AI Response ─────────────────────────────────
    const [girlMsg] = await db
      .insert(chatMessagesTable)
      .values({
        userId,
        girlId,
        content: replyText,
        sender: "girl",
      })
      .returning();

    return NextResponse.json(GetChatMessagesResponse.parse([userMsg, girlMsg]), { status: 201 });
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const DELETE = secureRoute(async function DELETE(request: Request, { params }: { params: Promise<{ girlId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = session.user.id;

    const rawParams = await params;
    const parsedParams = GetChatMessagesParams.safeParse({ girlId: rawParams.girlId });
    if (!parsedParams.success) {
      return NextResponse.json({ error: parsedParams.error.message }, { status: 400 });
    }
    const girlId = parsedParams.data.girlId;

    // Soft delete: set isDeleted to true
    await db
      .update(chatMessagesTable)
      .set({ isDeleted: true })
      .where(
        and(
          eq(chatMessagesTable.girlId, girlId),
          eq(chatMessagesTable.userId, userId)
        )
      );

    return NextResponse.json({ success: true, message: "Chat history cleared" });
  } catch (error: any) {
    console.error("Clear chat error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
