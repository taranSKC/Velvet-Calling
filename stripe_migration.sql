-- Alter transactions table to add stripe_session_id column for payment idempotency
ALTER TABLE "transactions" ADD COLUMN "stripe_session_id" text UNIQUE;
