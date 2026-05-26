import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let dbInstance: any;

function getDb() {
  if (dbInstance) return dbInstance;

  let connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // During Next.js build time or when DATABASE_URL is not set locally, fall back to a dummy string.
    // postgres-js connects lazily, so this will not trigger any actual network calls during build.
    connectionString = "postgres://postgres:postgres@localhost:5432/postgres";
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
