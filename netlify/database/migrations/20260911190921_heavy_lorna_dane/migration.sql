CREATE TABLE IF NOT EXISTS "ambassadors" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"title" text DEFAULT 'Student Ambassador' NOT NULL,
	"school" text,
	"country" text,
	"city" text,
	"graduation_year" text,
	"bio" text DEFAULT '' NOT NULL,
	"achievements" text DEFAULT '' NOT NULL,
	"subjects" text DEFAULT '' NOT NULL,
	"languages" text DEFAULT '' NOT NULL,
	"photo_url" text,
	"contact_email" text,
	"instagram" text,
	"telegram" text,
	"whatsapp" text,
	"linkedin" text,
	"website" text,
	"featured" boolean DEFAULT false NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "student_identity_user_id" text;--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "evidence_file_name" text;--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "evidence_mime_type" text;--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "evidence_data" text;--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "evidence_reviewed_at" timestamp;--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN IF NOT EXISTS "evidence_reviewed_by" text;
