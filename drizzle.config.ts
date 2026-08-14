import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "netlify/database/migrations",
  dbCredentials: {
    url: "postgresql://postgres.obrkzsxeejvsppfjilfl:Natiman2010!@aws-0-eu-west-1.pooler.supabase.com:6543/postgres",
  },
});