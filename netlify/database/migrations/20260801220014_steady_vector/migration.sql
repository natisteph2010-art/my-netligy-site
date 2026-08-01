CREATE TABLE "mentoring_sessions" (
	"id" serial PRIMARY KEY,
	"mentor_identity_user_id" text NOT NULL,
	"student_name" text NOT NULL,
	"student_contact" text NOT NULL,
	"subject" text NOT NULL,
	"topic_description" text NOT NULL,
	"scheduled_at" timestamp NOT NULL,
	"status" text DEFAULT 'PENDING' NOT NULL,
	"reminder_sent_at" timestamp,
	"actual_duration_minutes" integer,
	"topics_covered" text,
	"evidence_link" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"approved_at" timestamp,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "mentor_profiles" ADD COLUMN "total_hours_taught" real DEFAULT 0 NOT NULL;