import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const photosTable = sqliteTable("photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  girlId: integer("girl_id").notNull(),
  girlName: text("girl_name").notNull(),
  isPremium: integer("is_premium", { mode: "boolean" }).notNull().default(false),
  price: real("price"),
  category: text("category").notNull(),
  likes: integer("likes").notNull().default(0),
});

export const insertPhotoSchema = createInsertSchema(photosTable).omit({ id: true });
export type InsertPhoto = z.infer<typeof insertPhotoSchema>;
export type Photo = typeof photosTable.$inferSelect;
