-- ==========================================
-- VELVET CALL DB ZERO-BALANCE MIGRATION
-- Copy and paste this into your Supabase SQL Editor and execute.
-- ==========================================

-- 1. Alter wallet table to change default balance to 0 on new signups/wallet creation
ALTER TABLE "wallet" ALTER COLUMN "balance" SET DEFAULT 0;

-- 2. Update existing default seed wallet balance to 0 Credits
UPDATE "wallet" SET "balance" = 0.0 WHERE "id" = 1;

-- 3. Delete the starting welcome promo transaction history to reflect the zero credits start
DELETE FROM "transactions" WHERE "id" = 1 OR "description" = 'Welcome Promo Topup';
