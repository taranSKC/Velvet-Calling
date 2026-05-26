import { NextResponse } from "next/server";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { SendTipBody, SendTipResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";
import { getOrCreateWallet } from "../wallet/route";

function serializeTx(tx: { id: number; type: string; amount: number; description: string | null; createdAt: Date | string }) {
  return { ...tx, createdAt: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : tx.createdAt };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = SendTipBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const wallet = await getOrCreateWallet();
    if (wallet.balance < parsed.data.amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    const newBalance = wallet.balance - parsed.data.amount;
    await db.update(walletTable).set({ balance: newBalance });

    await db.insert(transactionsTable).values({
      type: "tip",
      amount: -parsed.data.amount,
      description: parsed.data.message
        ? `Tip: ${parsed.data.message}`
        : `Tip sent ($${parsed.data.amount.toFixed(2)})`,
    });

    const transactions = await db.select().from(transactionsTable).orderBy(desc(transactionsTable.createdAt)).limit(20);

    return NextResponse.json(SendTipResponse.parse({
      balance: newBalance,
      currency: wallet.currency,
      transactions: transactions.map(serializeTx),
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
