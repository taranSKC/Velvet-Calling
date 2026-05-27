import { NextResponse } from "next/server";
import { db, walletTable, transactionsTable } from "@workspace/db";
import { GetWalletResponse } from "@workspace/api-zod";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { secureRoute } from "@/utils/crypto";

function serializeTx(tx: { id: number; type: string; amount: number; description: string | null; createdAt: Date | string }) {
  return { ...tx, createdAt: tx.createdAt instanceof Date ? tx.createdAt.toISOString() : tx.createdAt };
}

export async function getOrCreateWallet(userId: string) {
  let [wallet] = await db.select().from(walletTable).where(eq(walletTable.userId, userId)).limit(1);
  if (!wallet) {
    [wallet] = await db.insert(walletTable).values({ userId, balance: 0, currency: "USD" }).returning();
  }
  return wallet;
}

export const GET = secureRoute(async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const wallet = await getOrCreateWallet(userId);
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, userId))
      .orderBy(desc(transactionsTable.createdAt))
      .limit(20);

    return NextResponse.json(GetWalletResponse.parse({
      balance: wallet.balance,
      currency: wallet.currency,
      transactions: transactions.map(serializeTx),
    }));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
