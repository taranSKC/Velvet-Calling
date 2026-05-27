import { pgTable, text, integer, real, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./auth";

export const walletTable = pgTable("wallet", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => usersTable.id, { onDelete: "cascade" }),
  balance: real("balance").notNull().default(0),
  currency: text("currency").notNull().default("USD"),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const transactionsTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // topup | tip | call | purchase
  amount: real("amount").notNull(),
  description: text("description").notNull(),
  stripeSessionId: text("stripe_session_id").unique(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactionsTable).omit({ id: true, createdAt: true });
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactionsTable.$inferSelect;
