import { NextResponse } from "next/server";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { TopUpWalletBody, TopUpWalletResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";
import { getOrCreateWallet } from "../route";

function serializeTx(tx: { id: number; type: string; amount: number; description: string | null; createdAt: Date | string }) {
  return { ...tx, createdAt: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : tx.createdAt };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = TopUpWalletBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.message }, { status: 400 });
    }

    const wallet = await getOrCreateWallet();
    const newBalance = wallet.balance + parsed.data.amount;

    await db.update(walletTable).set({ balance: newBalance });

    await db.insert(transactionsTable).values({
      type: "topup",
      amount: parsed.data.amount,
      description: `Added $${parsed.data.amount.toFixed(2)} to wallet`,
    });

    const transactions = await db.select().from(transactionsTable).orderBy(desc(transactionsTable.createdAt)).limit(20);

    return NextResponse.json(TopUpWalletResponse.parse({
      balance: newBalance,
      currency: wallet.currency,
      transactions: transactions.map(serializeTx),
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
