import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { getOrCreateWallet } from "../../wallet/route";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.VITE_STRIPE_WEBHOOK_SECRET;

    if (!secretKey || !webhookSecret) {
      return NextResponse.json({ error: "Stripe key or webhook secret is not configured" }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Signature Verification Failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const sessionId = session.id;

      // Webhook Idempotency Check: Check if we already processed this Stripe Session ID
      const [existingTx] = await db
        .select()
        .from(transactionsTable)
        .where(eq(transactionsTable.stripeSessionId, sessionId))
        .limit(1);

      if (existingTx) {
        console.log(`Webhook Session ${sessionId} already processed.`);
        return NextResponse.json({ received: true, message: "Already processed" }, { status: 200 });
      }

      // Secure payment amount calculation directly from Stripe's amount_total (in cents)
      const amountUsd = (session.amount_total ?? 0) / 100;
      if (amountUsd <= 0) {
        console.error(`Webhook: Invalid session amount_total received for ${sessionId}`);
        return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
      }

      const credits = amountUsd * 10;
      console.log(`Webhook Fulfilling: Crediting ${(credits).toFixed(0)} credits for Stripe session ${sessionId}...`);

      // Retrieve single-row wallet
      const wallet = await getOrCreateWallet();
      const newBalance = wallet.balance + amountUsd;

      // Update wallet balance in database
      await db.update(walletTable).set({ balance: newBalance });

      // Record transaction with unique stripeSessionId (securing against duplicate processing)
      await db.insert(transactionsTable).values({
        type: "topup",
        amount: amountUsd,
        description: `Added ${(credits).toFixed(0)} Credits via Stripe Payment`,
        stripeSessionId: sessionId,
      });

      console.log(`Webhook Fulfillment Completed for ${sessionId}. New balance: ${(newBalance * 10).toFixed(0)} credits.`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
