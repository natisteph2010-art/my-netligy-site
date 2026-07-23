CREATE TABLE "mentor_applications" (
	"id" serial PRIMARY KEY,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"school" text NOT NULL,
	"subjects" text NOT NULL,
	"statement" text NOT NULL,
	"availability" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"identity_user_id" text,
	"created_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "mentor_profiles" (
	"id" serial PRIMARY KEY,
	"application_id" integer NOT NULL,
	"identity_user_id" text NOT NULL UNIQUE,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"igcse_grades" text DEFAULT '' NOT NULL,
	"subjects" text DEFAULT '' NOT NULL,
	"reason" text DEFAULT '' NOT NULL,
	"availability" text DEFAULT '' NOT NULL,
	"profile_pic_url" text,
	"instagram" text,
	"telegram" text,
	"whatsapp" text,
	"contact_email" text,
	"linkedin" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY,
	"identity_user_id" text NOT NULL UNIQUE,
	"full_name" text NOT NULL,
	"age" integer NOT NULL,
	"grade_level" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "mentor_profiles" ADD CONSTRAINT "mentor_profiles_application_id_mentor_applications_id_fkey" FOREIGN KEY ("application_id") REFERENCES "mentor_applications"("id");