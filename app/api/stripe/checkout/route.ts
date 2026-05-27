import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { secureRoute } from "@/utils/crypto";

export const POST = secureRoute(async function POST(request: Request) {
  try {
    const sessionUser = await auth();
    if (!sessionUser?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    const userId = sessionUser.user.id;

    const { amount } = await request.json();
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY || process.env.VITE_STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe secret key is not configured" }, { status: 500 });
    }

    const stripe = new Stripe(secretKey);
    const origin = request.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${parsedAmount * 10} VelvetCall Credits`,
              description: `Top up your credits wallet with ${(parsedAmount * 10).toFixed(0)} Credits.`,
            },
            unit_amount: Math.round(parsedAmount * 100), // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/wallet?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/wallet?canceled=true`,
      client_reference_id: userId,
      metadata: {
        userId: userId,
        amount: String(parsedAmount),
        credits: String(parsedAmount * 10),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
