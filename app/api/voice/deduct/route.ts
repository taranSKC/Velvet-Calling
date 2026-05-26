import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";

// ─── Server-side rate limit: max 1 deduction per 50 seconds ─────────────
// This is a safety net — the client should only call once per 60s,
// but if React effects re-fire or the user has multiple tabs open,
// this prevents draining the wallet.
const lastDeductionTime = new Map<string, number>();
const MIN_DEDUCTION_INTERVAL_MS = 50_000; // 50 seconds (allows slight clock drift)

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const { girlId, girlName, pricePerMin } = await request.json();

    if (!girlId || !pricePerMin || pricePerMin <= 0) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    // ─── Rate limit check ──────────────────────────────────────────
    const userId = session.user.id || session.user.email || "default";
    const rateKey = `${userId}:${girlId}`;
    const now = Date.now();
    const lastTime = lastDeductionTime.get(rateKey) || 0;

    if (now - lastTime < MIN_DEDUCTION_INTERVAL_MS) {
      const waitSec = Math.ceil((MIN_DEDUCTION_INTERVAL_MS - (now - lastTime)) / 1000);
      return NextResponse.json(
        { error: "rate_limited", message: `Too fast. Wait ${waitSec}s.`, retryAfter: waitSec },
        { status: 429 }
      );
    }
    lastDeductionTime.set(rateKey, now);

    // Clean up stale entries (older than 2 minutes)
    for (const [key, time] of lastDeductionTime.entries()) {
      if (now - time > 120_000) lastDeductionTime.delete(key);
    }

    // ─── Check current balance ─────────────────────────────────────
    const [wallet] = await db.select().from(walletTable).limit(1);

    if (!wallet || wallet.balance < pricePerMin) {
      return NextResponse.json(
        { error: "insufficient_balance", balance: wallet?.balance ?? 0 },
        { status: 402 }
      );
    }

    // ─── Double-check: no deduction in the last 55s for this girl ──
    // This is the DB-level safety net in case the in-memory map resets
    const [recentTransaction] = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.type, "call"))
      .orderBy(desc(transactionsTable.createdAt))
      .limit(1);

    if (recentTransaction) {
      const recentTime = new Date(recentTransaction.createdAt).getTime();
      if (now - recentTime < MIN_DEDUCTION_INTERVAL_MS) {
        return NextResponse.json(
          { error: "rate_limited", message: "Deduction too recent" },
          { status: 429 }
        );
      }
    }

    // ─── Deduct balance atomically ─────────────────────────────────
    await db
      .update(walletTable)
      .set({
        balance: sql`GREATEST(${walletTable.balance} - ${pricePerMin}, 0)`,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(walletTable.id, wallet.id));

    // ─── Log transaction ───────────────────────────────────────────
    await db.insert(transactionsTable).values({
      type: "call",
      amount: -pricePerMin,
      description: `Voice call with ${girlName || "performer"} (1 min)`,
    });

    // Re-read actual balance (atomic read after write)
    const [updatedWallet] = await db.select().from(walletTable).where(eq(walletTable.id, wallet.id)).limit(1);
    const newBalance = updatedWallet?.balance ?? 0;

    return NextResponse.json({
      success: true,
      newBalance,
    });
  } catch (error) {
    console.error("Voice deduct error:", error);
    return NextResponse.json(
      { error: "Billing error" },
      { status: 500 }
    );
  }
}
