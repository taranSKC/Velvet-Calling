-- ==========================================
-- VELVET CALL DB SETUP & SEED SCRIPT
-- Copy and paste this directly into your Supabase SQL Editor and execute.
-- ==========================================

-- 1. Create Tables

CREATE TABLE IF NOT EXISTS "girls" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"status" text DEFAULT 'offline' NOT NULL,
	"price_per_min" real NOT NULL,
	"avatar_url" text NOT NULL,
	"cover_url" text,
	"bio" text DEFAULT '' NOT NULL,
	"short_bio" text DEFAULT '' NOT NULL,
	"specialties" jsonb NOT NULL,
	"categories" jsonb NOT NULL,
	"is_online" boolean DEFAULT false NOT NULL,
	"rating" real DEFAULT 4.5 NOT NULL,
	"total_calls" integer DEFAULT 0 NOT NULL,
	"ethnicity" text DEFAULT '' NOT NULL,
	"body_type" text DEFAULT '' NOT NULL,
	"hair_color" text DEFAULT '' NOT NULL,
	"available_in" integer,
	"photo_count" integer DEFAULT 0 NOT NULL,
	"video_count" integer DEFAULT 0 NOT NULL,
	"languages" jsonb NOT NULL,
	"joined_year" integer DEFAULT 2023 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"image_url" text DEFAULT '' NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"duration" integer DEFAULT 0 NOT NULL,
	"thumbnail_url" text NOT NULL,
	"video_url" text,
	"girl_id" integer NOT NULL,
	"girl_name" text NOT NULL,
	"category" text NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"price" real,
	"views" integer DEFAULT 0 NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"girl_id" integer NOT NULL,
	"girl_name" text NOT NULL,
	"is_premium" boolean DEFAULT false NOT NULL,
	"price" real,
	"category" text NOT NULL,
	"likes" integer DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"girl_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"amount" real NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "wallet" (
	"id" serial PRIMARY KEY NOT NULL,
	"balance" real DEFAULT 50 NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"girl_id" integer NOT NULL,
	"content" text NOT NULL,
	"sender" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp (3),
	"image" text,
	"password" text,
	"role" text DEFAULT 'user' NOT NULL,
	"createdAt" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);

CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp (3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp (3) NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);

-- 2. Add Foreign Key Constraints

ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;

-- 3. Clear Existing Data

DELETE FROM "chat_messages";
DELETE FROM "photos";
DELETE FROM "videos";
DELETE FROM "girls";
DELETE FROM "categories";
DELETE FROM "transactions";
DELETE FROM "wallet";

-- 4. Seed Data

-- Categories Seed
INSERT INTO "categories" ("id", "name", "slug", "count", "image_url") VALUES
(1, 'College Girls', 'college-girls', 14, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=80'),
(2, 'MILFs', 'milfs', 8, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80'),
(3, 'Ebony', 'ebony', 11, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&auto=format&fit=crop&q=80'),
(4, 'Asian', 'asian', 9, 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop&q=80'),
(5, 'Latina', 'latina', 12, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80'),
(6, 'Petite', 'petite', 7, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80'),
(7, 'Curvy', 'curvy', 10, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80');

-- Performers (Girls) Seed
INSERT INTO "girls" (
  "id", "name", "age", "status", "price_per_min", "avatar_url", "cover_url", 
  "bio", "short_bio", "specialties", "categories", "is_online", "rating", "total_calls", 
  "ethnicity", "body_type", "hair_color", "available_in", "photo_count", "video_count", 
  "languages", "joined_year"
) VALUES
(
  1, 
  'Ava Sinclair', 
  22, 
  'online', 
  3.99, 
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80', 
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=80', 
  'Hey handsome! I''m Ava, a passionate college girl who loves dirty talking, cosplay, and fulfilling your wildest, most intimate desires. I am very open-minded, submissive when you want it, and dominant when you need a little discipline. Let''s make an unforgettable connection tonight.', 
  'Submissive college babe who loves wild roles and GFE.', 
  '["GFE", "Dirty Talk", "Roleplay", "Cosplay"]'::jsonb, 
  '["college-girls", "petite"]'::jsonb, 
  true, 
  4.9, 
  312, 
  'Latina', 
  'Petite', 
  'Brunette', 
  NULL, 
  12, 
  4, 
  '["English", "Spanish"]'::jsonb, 
  2024
),
(
  2, 
  'Chloe Hart', 
  34, 
  'online', 
  5.99, 
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80', 
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&auto=format&fit=crop&q=80', 
  'Welcome to my room, darling. I''m Chloe, an elegant MILF with a highly sensual, experienced touch. I know exactly how to please a man and listen to his deepest secrets. Whether you want to talk about your day, indulge in sweet whispers, or explore intense taboo roleplay, I am here for you.', 
  'Sophisticated MILF with an experienced, highly seductive touch.', 
  '["Taboo", "MILF", "Teasing", "Femdom"]'::jsonb, 
  '["milfs", "curvy"]'::jsonb, 
  true, 
  4.8, 
  450, 
  'Caucasian', 
  'Curvy', 
  'Blonde', 
  NULL, 
  8, 
  3, 
  '["English", "French"]'::jsonb, 
  2023
),
(
  3, 
  'Emma Thorne', 
  20, 
  'busy', 
  2.99, 
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', 
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&auto=format&fit=crop&q=80', 
  'Hi! I''m Emma, a sweet, energetic blonde who is always up for a good laugh and some naughty fun. I love teasing on camera, wearing sexy lingerie, and having fun chats. I''m currently in a private call but I''ll be free in just a few minutes, don''t keep me waiting!', 
  'Playful blonde college girl with a sweet smile and naughty mind.', 
  '["Lingerie", "GFE", "Sweet & Naughty", "Foot Fetish"]'::jsonb, 
  '["college-girls", "petite"]'::jsonb, 
  true, 
  4.7, 
  188, 
  'Caucasian', 
  'Slim', 
  'Blonde', 
  4, 
  6, 
  2, 
  '["English"]'::jsonb, 
  2025
),
(
  4, 
  'Yuki Sakura', 
  24, 
  'online', 
  4.49, 
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80', 
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=80', 
  'Konichiwa! I''m Yuki, a sweet and highly expressive Japanese beauty. I absolute love cute outfits, dirty talks, and building deep, intimate connections with open-minded men. I''m very visual, love teasing with high heels, and want to make your wildest fantasies come to life.', 
  'Intimate and sensual Asian stunner who loves high heels and GFE.', 
  '["GFE", "Foot Fetish", "Cosplay", "Visual Teasing"]'::jsonb, 
  '["asian", "petite"]'::jsonb, 
  true, 
  4.95, 
  275, 
  'Asian', 
  'Petite', 
  'Black', 
  NULL, 
  15, 
  5, 
  '["English", "Japanese"]'::jsonb, 
  2024
),
(
  5, 
  'Naomi Brooks', 
  26, 
  'online', 
  4.99, 
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80', 
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop&q=80', 
  'Hey baby. I''m Naomi, an Ebony goddess with mesmerizing curves and a voice that will send shivers down your spine. I specialize in dirty talking, sensual teasing, and premium GFE. I''m looking for a handsome partner to share some extremely intimate moments with. Ready for me?', 
  'Ebony goddess with stunning curves and an incredibly seductive voice.', 
  '["Dirty Talk", "Curvy", "GFE", "Seductive Voice"]'::jsonb, 
  '["ebony", "curvy"]'::jsonb, 
  true, 
  4.88, 
  395, 
  'Ebony', 
  'Curvy', 
  'Dark Brown', 
  NULL, 
  10, 
  4, 
  '["English"]'::jsonb, 
  2023
);

-- Photos Seed
INSERT INTO "photos" ("id", "girl_id", "girl_name", "url", "thumbnail_url", "is_premium", "price", "category", "likes") VALUES
(1, 1, 'Ava Sinclair', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&auto=format&fit=crop&q=80', false, NULL, 'Lingerie', 120),
(2, 1, 'Ava Sinclair', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80', true, 15.0, 'Explicit', 340),
(3, 2, 'Chloe Hart', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80', false, NULL, 'Elegant', 85),
(4, 2, 'Chloe Hart', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80', true, 25.0, 'Boudoir', 210);

-- Videos Seed
INSERT INTO "videos" ("id", "girl_id", "girl_name", "title", "duration", "thumbnail_url", "video_url", "category", "is_premium", "price", "views", "likes") VALUES
(1, 1, 'Ava Sinclair', 'Sensual Lingerie Tease & Bedroom Chat', 320, 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Teasing', false, NULL, 1200, 450),
(2, 1, 'Ava Sinclair', 'Exclusive Dirty Talk & Undressing Fantasy', 540, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Explicit', true, 35.0, 4500, 2100),
(3, 2, 'Chloe Hart', 'An Elegant Tease in Silk Sheets', 410, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80', 'https://www.w3schools.com/html/mov_bbb.mp4', 'Boudoir', true, 49.0, 3100, 1540);

-- Wallet Seed
INSERT INTO "wallet" ("id", "balance", "currency") VALUES
(1, 100.0, 'USD');

-- Transactions Seed
INSERT INTO "transactions" ("id", "type", "amount", "description") VALUES
(1, 'topup', 100.0, 'Welcome Promo Topup');

-- Chat Messages Seed
INSERT INTO "chat_messages" ("id", "girl_id", "content", "sender", "created_at") VALUES
(1, 1, 'Hey there handsome! Thanks for opening my private room. 💋 I was just lying on my bed thinking about what we could do tonight. Send me a message, don''t be shy!', 'girl', now() - interval '1 hour'),
(2, 2, 'Hello, darling. It''s so nice to meet you. I''m Chloe, and I love catering to mature tastes. Tell me: what is your deepest, most secret fantasy? I promise it''s safe with me.', 'girl', now() - interval '1 hour'),
(3, 4, 'Konichiwa! 🌸 Welcome to my fantasy room. I''m Yuki, and I absolute love visual teasing. Let me know if you want to start a private voice call or send a sweet tip! Click chat to talk.', 'girl', now() - interval '1 hour');

-- 5. Reset Primary Key Sequences

SELECT setval(pg_get_serial_sequence('girls', 'id'), coalesce(max(id), 1)) FROM "girls";
SELECT setval(pg_get_serial_sequence('categories', 'id'), coalesce(max(id), 1)) FROM "categories";
SELECT setval(pg_get_serial_sequence('videos', 'id'), coalesce(max(id), 1)) FROM "videos";
SELECT setval(pg_get_serial_sequence('photos', 'id'), coalesce(max(id), 1)) FROM "photos";
SELECT setval(pg_get_serial_sequence('favorites', 'id'), coalesce(max(id), 1)) FROM "favorites";
SELECT setval(pg_get_serial_sequence('transactions', 'id'), coalesce(max(id), 1)) FROM "transactions";
SELECT setval(pg_get_serial_sequence('wallet', 'id'), coalesce(max(id), 1)) FROM "wallet";
SELECT setval(pg_get_serial_sequence('chat_messages', 'id'), coalesce(max(id), 1)) FROM "chat_messages";

-- ==========================================
-- EXECUTION COMPLETED SUCCESSFULLY
-- ==========================================
