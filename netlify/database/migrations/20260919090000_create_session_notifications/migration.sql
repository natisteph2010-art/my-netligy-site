CREATE TABLE "session_notifications" (
	"id" serial PRIMARY KEY,
	"session_id" integer NOT NULL,
	"recipient_user_id" text NOT NULL,
	"recipient_role" text DEFAULT 'student' NOT NULL,
	"notification_type" text NOT NULL,
	"channel" text DEFAULT 'in_app' NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "session_notifications_session_id_mentoring_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "mentoring_sessions"("id")
);
--> statement-breakpoint

CREATE INDEX "session_notifications_recipient_idx"
ON "session_notifications" ("recipient_user_id", "created_at");