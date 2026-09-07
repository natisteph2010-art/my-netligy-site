import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema.js";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleDb | null = null;

function getDb(): DrizzleDb {
  if (!_db) {
    const connectionString =
      process.env.NETLIFY_DB_URL ||
      process.env.SUPABASE_DB_URL ||
      process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error(
        "Database connection string (NETLIFY_DB_URL, SUPABASE_DB_URL, or DATABASE_URL) is not defined.",
      );
    }

    _db = drizzle(connectionString, { schema }) as DrizzleDb;
  }
  return _db;
}

export const db = new Proxy({} as DrizzleDb, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});