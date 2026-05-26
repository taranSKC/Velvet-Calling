import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const chatMessagesTable = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  girlId: integer("girl_id").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // user | girl
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const chatTable = chatMessagesTable;

export const insertChatMessageSchema = createInsertSchema(chatMessagesTable).omit({ id: true, createdAt: true });
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessagesTable.$inferSelect;
