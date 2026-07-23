CREATE TABLE "user_accounts" (
	"identity_user_id" text PRIMARY KEY,
	"email" text NOT NULL,
	"role" text DEFAULT 'student' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

INSERT INTO "user_accounts" ("identity_user_id", "email", "role")
SELECT "identity_user_id", "email", 'student'
FROM "students"
ON CONFLICT ("identity_user_id") DO NOTHING;

INSERT INTO "user_accounts" ("identity_user_id", "email", "role")
SELECT "identity_user_id", "email", 'mentor'
FROM "mentor_profiles"
ON CONFLICT ("identity_user_id") DO UPDATE
SET "email" = EXCLUDED."email", "role" = EXCLUDED."role", "updated_at" = now();
