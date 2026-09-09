ALTER TABLE "mentoring_sessions" ADD COLUMN "student_identity_user_id" text;
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN "evidence_file_name" text;
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN "evidence_mime_type" text;
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN "evidence_data" text;
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN "evidence_reviewed_at" timestamp;
--> statement-breakpoint
ALTER TABLE "mentoring_sessions" ADD COLUMN "evidence_reviewed_by" text;