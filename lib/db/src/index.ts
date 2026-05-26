import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let dbInstance: any;

function getDb() {
  if (dbInstance) return dbInstance;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not defined. Please configure it in your environment or Cloudflare secrets.");
  }

  // prepare: false is required when connecting to Supabase via connection poolers (like Supavisor/PgBouncer)
  const client = postgres(connectionString, { prepare: false });
  dbInstance = drizzle(client, { schema });
  return dbInstance;
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
