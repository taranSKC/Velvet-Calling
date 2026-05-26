import { NextResponse } from "next/server";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { GetWalletResponse } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

function serializeTx(tx: { id: number; type: string; amount: number; description: string | null; createdAt: Date | string }) {
  return { ...tx, createdAt: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : tx.createdAt };
}

export async function getOrCreateWallet() {
  let [wallet] = await db.select().from(walletTable).limit(1);
  if (!wallet) {
    [wallet] = await db.insert(walletTable).values({ balance: 0, currency: "USD" }).returning();
  }
  return wallet;
}

export async function GET() {
  try {
    const wallet = await getOrCreateWallet();
    const transactions = await db.select().from(transactionsTable).orderBy(desc(transactionsTable.createdAt)).limit(20);

    return NextResponse.json(GetWalletResponse.parse({
      balance: wallet.balance,
      currency: wallet.currency,
      transactions: transactions.map(serializeTx),
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
