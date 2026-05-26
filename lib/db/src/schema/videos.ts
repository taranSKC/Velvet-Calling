import { pgTable, text, integer, real, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const videosTable = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  duration: integer("duration").notNull().default(0), // seconds
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url"),
  girlId: integer("girl_id").notNull(),
  girlName: text("girl_name").notNull(),
  category: text("category").notNull(),
  isPremium: boolean("is_premium").notNull().default(false),
  price: real("price"),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videosTable).omit({ id: true, createdAt: true });
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videosTable.$inferSelect;
