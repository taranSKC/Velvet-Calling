import { db } from "./src/index";
import { sql } from "drizzle-orm";

async function run() {
  console.log("Starting DB migration for user-scoped wallets and transactions...");
  try {
    // 1. Truncate existing dev wallets/transactions to prevent constraints failure on existing un-scoped rows
    console.log("Truncating existing un-scoped wallets and transactions...");
    await db.execute(sql`TRUNCATE TABLE "wallet" CASCADE;`);
    await db.execute(sql`TRUNCATE TABLE "transactions" CASCADE;`);

    // 2. Add user_id column referencing the user table to the wallet table
    console.log("Adding user_id column to wallet table...");
    await db.execute(sql`
      ALTER TABLE "wallet" 
      ADD COLUMN "user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE;
    `);

    // 3. Add user_id column referencing the user table to the transactions table
    console.log("Adding user_id column to transactions table...");
    await db.execute(sql`
      ALTER TABLE "transactions" 
      ADD COLUMN "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE;
    `);

    console.log("DB migration completed successfully! Wallets and transactions are now fully scoped to users.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

run();
