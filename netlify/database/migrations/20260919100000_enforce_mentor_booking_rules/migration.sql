CREATE INDEX IF NOT EXISTS "mentoring_sessions_mentor_schedule_idx"
ON "mentoring_sessions" ("mentor_identity_user_id", "scheduled_at");
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "mentoring_sessions_weekly_capacity_idx"
ON "mentoring_sessions" ("mentor_identity_user_id", "scheduled_at", "status", "student_identity_user_id");
--> statement-breakpoint

CREATE OR REPLACE FUNCTION enforce_mentoring_session_rules()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  conflicting_session integer;
  weekly_students integer;
BEGIN
  IF NEW.status NOT IN ('PENDING', 'UPCOMING', 'PENDING_REVIEW', 'COMPLETED', 'DECLINED', 'CANCELLED', 'RESCHEDULE_REQUESTED') THEN
    RAISE EXCEPTION 'Invalid mentoring session status: %', NEW.status;
  END IF;

  IF NEW.status IN ('PENDING', 'UPCOMING', 'PENDING_REVIEW') THEN
    PERFORM pg_advisory_xact_lock(hashtextextended(NEW.mentor_identity_user_id, 0));

    SELECT id INTO conflicting_session
    FROM mentoring_sessions
    WHERE mentor_identity_user_id = NEW.mentor_identity_user_id
      AND id <> COALESCE(NEW.id, -1)
      AND status IN ('PENDING', 'UPCOMING', 'PENDING_REVIEW')
      AND scheduled_at < NEW.scheduled_at + interval '60 minutes'
      AND scheduled_at + interval '60 minutes' > NEW.scheduled_at
    LIMIT 1;

    IF conflicting_session IS NOT NULL THEN
      RAISE EXCEPTION 'Mentor already has a conflicting session'
        USING ERRCODE = '23P01';
    END IF;

    SELECT count(DISTINCT COALESCE(student_identity_user_id, student_contact)) INTO weekly_students
    FROM mentoring_sessions
    WHERE mentor_identity_user_id = NEW.mentor_identity_user_id
      AND status IN ('UPCOMING', 'COMPLETED')
      AND scheduled_at >= date_trunc('week', NEW.scheduled_at)
      AND scheduled_at < date_trunc('week', NEW.scheduled_at) + interval '7 days'
      AND id <> COALESCE(NEW.id, -1);

    IF weekly_students >= 4 AND NOT EXISTS (
      SELECT 1
      FROM mentoring_sessions existing
      WHERE existing.id = NEW.id
        AND existing.status IN ('UPCOMING', 'COMPLETED')
        AND COALESCE(existing.student_identity_user_id, existing.student_contact) = COALESCE(NEW.student_identity_user_id, NEW.student_contact)
    ) THEN
      RAISE EXCEPTION 'Mentor has reached the weekly student capacity'
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;
--> statement-breakpoint

DROP TRIGGER IF EXISTS mentoring_session_rules_trigger ON "mentoring_sessions";
CREATE CONSTRAINT TRIGGER mentoring_session_rules_trigger
AFTER INSERT OR UPDATE OF mentor_identity_user_id, student_identity_user_id, student_contact, scheduled_at, status
ON "mentoring_sessions"
DEFERRABLE INITIALLY IMMEDIATE
FOR EACH ROW
EXECUTE FUNCTION enforce_mentoring_session_rules();