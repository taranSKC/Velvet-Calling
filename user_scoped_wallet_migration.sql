-- ==========================================
-- VELVET CALL DB USER-SCOPED WALLET MIGRATION
-- Copy and paste this into your Supabase SQL Editor and execute.
-- ==========================================

-- 1. Truncate existing dev wallets and transactions to prevent constraints violations on existing un-scoped rows
TRUNCATE TABLE "wallet" CASCADE;
TRUNCATE TABLE "transactions" CASCADE;

-- 2. Alter wallet table to add "user_id" column referencing the "user" table (unique, not null, on delete cascade)
ALTER TABLE "wallet" 
ADD COLUMN "user_id" text NOT NULL UNIQUE REFERENCES "user"("id") ON DELETE CASCADE;

-- 3. Alter transactions table to add "user_id" column referencing the "user" table (not null, on delete cascade)
ALTER TABLE "transactions" 
ADD COLUMN "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE;
