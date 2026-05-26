import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleLocal } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

let dbInstance: any;

function getDb() {
  if (dbInstance) return dbInstance;

  // 1. Check if Cloudflare D1 database binding is present (Production/Preview on Cloudflare)
  if (typeof process !== "undefined" && (process.env as any).DB) {
    dbInstance = drizzleD1((process.env as any).DB, { schema });
    return dbInstance;
  }

  // 2. Fall back to local SQLite file for offline local dev/testing
  const sqlite = new Database("local-d1.db");
  dbInstance = drizzleLocal(sqlite, { schema });
  return dbInstance;
}

export const db = getDb();
export * from "./schema";
