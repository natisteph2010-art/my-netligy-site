import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema.js";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

// Initialize the Drizzle client lazily. Creating it at module load throws when
// NETLIFY_DB_URL is not configured, and because the generated route tree
// statically imports every API route (including the announcements feed that
// uses this module), that throw would take down the entire site — even public
// pages that never touch the database. Deferring initialization keeps the app
// rendering and lets individual DB-backed requests fail on their own.
let _db: DrizzleDb | null = null;

function getDb(): DrizzleDb {
  if (!_db) {
    _db = drizzle({ schema });
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
