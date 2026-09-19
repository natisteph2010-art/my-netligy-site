ALTER TABLE "session_notifications"
ADD COLUMN IF NOT EXISTS "read_at" timestamp;
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "session_notifications_recipient_idx"
ON "session_notifications" ("recipient_user_id", "created_at");