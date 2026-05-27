-- ==========================================
-- VELVET CALL DB USER-SCOPED CHAT MIGRATION
-- Copy and paste this into your Supabase SQL Editor and execute.
-- ==========================================

-- 1. Truncate existing chat messages to prevent constraints violations
TRUNCATE TABLE "chat_messages" CASCADE;

-- 2. Alter chat_messages table to add "user_id" column referencing the "user" table (not null, on delete cascade)
ALTER TABLE "chat_messages" 
ADD COLUMN "user_id" text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE;
