import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { getOrCreateWallet } from "../../wallet/route";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { secureRoute } from "@/utils/crypto";

export const POST = secureRoute(async function POST(request: Request) {
  try {
    const sessionUser = await auth();
    if (!sessionUser?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = sessionUser.user.id;

    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe secret key is not configured" }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);

    // Retrieve checkout session directly from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Verify session state and ownership to prevent credit-theft attempts
    const sessionUserId = session.client_reference_id || session.metadata?.userId;
    if (sessionUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized session access" }, { status: 403 });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // Replay/Re-entry Protection Check: check if already processed
    const [existingTx] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.stripeSessionId, sessionId))
      .limit(1);

    if (existingTx) {
      return NextResponse.json({ success: true, message: "Already processed", processedBefore: true });
    }

    // Fetch and calculate crediting amount
    const amountUsd = (session.amount_total ?? 0) / 100;
    if (amountUsd <= 0) {
      return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    const credits = amountUsd * 10;

    // Retrieve and credit wallet atomically
    const wallet = await getOrCreateWallet(userId);
    const newBalance = wallet.balance + amountUsd;

    await db
      .update(walletTable)
      .set({ balance: newBalance })
      .where(eq(walletTable.userId, userId));

    // Record transaction
    await db.insert(transactionsTable).values({
      userId,
      type: "topup",
      amount: amountUsd,
      description: `Added ${(credits).toFixed(0)} Credits via Stripe Payment`,
      stripeSessionId: sessionId,
    });

    return NextResponse.json({ success: true, newBalance: newBalance * 10 });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
