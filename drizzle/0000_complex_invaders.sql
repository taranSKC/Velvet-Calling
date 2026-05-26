CREATE TABLE "girls" (
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
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"image_url" text DEFAULT '' NOT NULL,
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "videos" (
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
--> statement-breakpoint
CREATE TABLE "photos" (
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
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"girl_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"amount" real NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "wallet" (
	"id" serial PRIMARY KEY NOT NULL,
	"balance" real DEFAULT 50 NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"girl_id" integer NOT NULL,
	"content" text NOT NULL,
	"sender" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
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
--> statement-breakpoint
CREATE TABLE "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
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
--> statement-breakpoint
CREATE TABLE "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp (3) NOT NULL,
	CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;