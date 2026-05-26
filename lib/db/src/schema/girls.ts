import { pgTable, text, integer, real, serial, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const girlsTable = pgTable("girls", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  status: text("status").notNull().default("offline"), // online | busy | offline
  pricePerMin: real("price_per_min").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  coverUrl: text("cover_url"),
  bio: text("bio").notNull().default(""),
  shortBio: text("short_bio").notNull().default(""),
  specialties: jsonb("specialties").$type<string[]>().notNull(),
  categories: jsonb("categories").$type<string[]>().notNull(),
  isOnline: boolean("is_online").notNull().default(false),
  rating: real("rating").notNull().default(4.5),
  totalCalls: integer("total_calls").notNull().default(0),
  ethnicity: text("ethnicity").notNull().default(""),
  bodyType: text("body_type").notNull().default(""),
  hairColor: text("hair_color").notNull().default(""),
  availableIn: integer("available_in"),
  photoCount: integer("photo_count").notNull().default(0),
  videoCount: integer("video_count").notNull().default(0),
  languages: jsonb("languages").$type<string[]>().notNull(),
  joinedYear: integer("joined_year").notNull().default(2023),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const insertGirlSchema = createInsertSchema(girlsTable).omit({ id: true, createdAt: true });
export type InsertGirl = z.infer<typeof insertGirlSchema>;
export type Girl = typeof girlsTable.$inferSelect;
