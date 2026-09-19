import { db } from '../../db/index.js'
import { mentoringSessions, sessionNotifications } from '../../db/schema.js'
import { and, eq, gte, inArray, lte, or } from 'drizzle-orm'
import {
  SESSION_DURATION_MINUTES,
  doesTimeMatchAvailability,
  endOfWeek,
  startOfWeek,
} from './booking-rules.js'

export { SESSION_DURATION_MINUTES, doesTimeMatchAvailability, endOfWeek, startOfWeek } from './booking-rules.js'

export const ALLOWED_SUBJECTS = [
  'Math',
  'Physics',
  'Chem',
  'Bio',
  'English',
  'Geo',
  'Computer Science',
  'Business',
  'ICT',
  'Global Citizenship',
] as const

export const MAX_WEEKLY_APPROVED = 4
export const computeUniqueCount = (
  records: Array<{ studentIdentityUserId?: string | null; studentName: string; studentContact: string }>,
) => {
  const distinct = new Set(
    records.map((session) => session.studentIdentityUserId || `${session.studentName}::${session.studentContact}`),
  )
  return distinct.size
}

export const loadWeekSessions = async (
  mentorIdentityUserId: string,
  weekStart = startOfWeek(new Date()),
  weekEnd = endOfWeek(new Date()),
) => {
  return db
    .select()
    .from(mentoringSessions)
    .where(
      and(
        eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
        or(eq(mentoringSessions.status, 'UPCOMING'), eq(mentoringSessions.status, 'COMPLETED')),
        gte(mentoringSessions.scheduledAt, weekStart),
        lte(mentoringSessions.scheduledAt, weekEnd),
      ),
    )
}

export const hasSchedulingConflict = async (
  mentorIdentityUserId: string,
  scheduledAt: Date,
  excludeId?: number,
) => {
  const targetStart = new Date(scheduledAt)
  const targetEnd = new Date(scheduledAt)
  targetEnd.setMinutes(targetEnd.getMinutes() + SESSION_DURATION_MINUTES)

  const conflicts = await db
    .select()
    .from(mentoringSessions)
    .where(
      and(
        eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
        inArray(mentoringSessions.status, ['PENDING', 'UPCOMING', 'PENDING_REVIEW']),
      ),
    )

  return conflicts.some((session) => {
    if (excludeId && session.id === excludeId) return false
    if (!session.scheduledAt) return false

    const existingStart = new Date(session.scheduledAt)
    const existingEnd = new Date(existingStart)
    existingEnd.setMinutes(existingEnd.getMinutes() + (session.actualDurationMinutes || SESSION_DURATION_MINUTES))

    return targetStart < existingEnd && targetEnd > existingStart
  })
}

export const recordNotification = async ({
  sessionId,
  recipientUserId,
  recipientRole,
  notificationType,
  channel,
  message,
}: {
  sessionId: number
  recipientUserId: string
  recipientRole: string
  notificationType: string
  channel: string
  message: string
}) => {
  await db.insert(sessionNotifications).values({
    sessionId,
    recipientUserId,
    recipientRole,
    notificationType,
    channel,
    message,
    status: 'queued',
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}
