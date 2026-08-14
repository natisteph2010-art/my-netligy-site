import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "netlify/database/migrations",
  dbCredentials: {
    url: "postgresql://postgres:Natiman2010!@db.obrkzsxeejvsppfjilfl.supabase.co:5432/postgres",
  },
});