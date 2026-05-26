import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { sql } from "drizzle-orm";

export const videosTable = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  duration: integer("duration").notNull().default(0), // seconds
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url"),
  girlId: integer("girl_id").notNull(),
  girlName: text("girl_name").notNull(),
  category: text("category").notNull(),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  price: real("price"),
  views: integer("views").notNull().default(0),
  likes: integer("likes").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertVideoSchema = createInsertSchema(videosTable).omit({ id: true, createdAt: true });
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videosTable.$inferSelect;
