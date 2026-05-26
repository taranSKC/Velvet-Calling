import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import * as schema from "./schema";

let dbInstance: any;

function getDb() {
  if (dbInstance) return dbInstance;

  // 1. Check if Cloudflare D1 database binding is present (Production/Preview on Cloudflare)
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    if (env && env.DB) {
      dbInstance = drizzleD1(env.DB, { schema });
      return dbInstance;
    }
  } catch (err) {
    // getCloudflareContext is not available or failed (e.g. running locally via node, or building)
  }

  if (typeof process !== "undefined" && (process.env as any).DB) {
    dbInstance = drizzleD1((process.env as any).DB, { schema });
    return dbInstance;
  }

  // 1b. Edge runtime compilation fallback (e.g. during next build static page collection)
  // We return a mock Drizzle D1 instance so prototype checks and static routing succeed.
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "edge") {
    const dummyD1 = {
      prepare: () => ({
        bind: () => ({
          all: () => Promise.resolve({ results: [] }),
          run: () => Promise.resolve({ results: [] }),
          get: () => Promise.resolve(null),
        })
      }),
      batch: () => Promise.resolve([]),
      exec: () => Promise.resolve([]),
    } as any;
    dbInstance = drizzleD1(dummyD1, { schema });
    return dbInstance;
  }

  // 2. Fall back to local SQLite file for offline local dev/testing
  // We use dynamic require to prevent compilation errors in Edge runtimes (like Cloudflare Pages or Edge API routes)
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME !== "edge") {
    try {
      const Database = require("better-sqlite3");
      const { drizzle: drizzleLocal } = require("drizzle-orm/better-sqlite3");
      const path = require("path");
      const fs = require("fs");

      // Dynamic lookup of process.cwd() to bypass static analysis checks
      const cwd = globalThis.process?.cwd?.() || "";
      let dbPath = path.join(cwd, "local-d1.db");

      // On Vercel or other serverless environments, the root filesystem is read-only.
      // We copy the database to /tmp to make it writeable if on a serverless Vercel function.
      if (process.env.VERCEL || process.env.NODE_ENV === "production") {
        const tmpPath = "/tmp/local-d1.db";
        try {
          if (!fs.existsSync(tmpPath)) {
            if (fs.existsSync(dbPath)) {
              fs.copyFileSync(dbPath, tmpPath);
            } else {
              const parentDbPath = path.join(cwd, "..", "local-d1.db");
              if (fs.existsSync(parentDbPath)) {
                fs.copyFileSync(parentDbPath, tmpPath);
              }
            }
          }
          if (fs.existsSync(tmpPath)) {
            dbPath = tmpPath;
          }
        } catch (err) {
          console.error("Failed to copy database to /tmp, using original path:", err);
        }
      }

      const sqlite = new Database(dbPath);
      dbInstance = drizzleLocal(sqlite, { schema });
      return dbInstance;
    } catch (err: any) {
      console.error("Failed to initialize local better-sqlite3 database:", err);
      throw new Error(`Local database driver failed to load: ${err.message}`);
    }
  }

  throw new Error("No database driver available for this runtime environment.");
}

export const db = new Proxy({} as any, {
  get(target, prop) {
    if (prop === "_drizzleInstance") {
      return getDb();
    }
    const instance = getDb();
    const value = Reflect.get(instance, prop);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  }
});

export * from "./schema";
