import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'
import { and, asc, eq, gte, inArray, lte, or } from 'drizzle-orm'
import {
  ALLOWED_SUBJECTS,
  MAX_WEEKLY_APPROVED,
  computeUniqueCount,
  doesTimeMatchAvailability,
  hasSchedulingConflict,
  loadWeekSessions,
  recordNotification,
  startOfWeek,
  endOfWeek,
} from '../../../../src/lib/booking.js'

const loadWeekSessionsForMentor = async (mentorIdentityUserId: string) => {
  return loadWeekSessions(mentorIdentityUserId, startOfWeek(new Date()), endOfWeek(new Date()))
}

export const Route = createFileRoute('/api/mentors/sessions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const url = new URL(request.url)
        const mentorIdentityUserId = url.searchParams.get('mentorId') || user.id
        const scope = url.searchParams.get('scope') || 'dashboard'

        const isMentorOwner = user.roles?.includes('mentor') && user.id === mentorIdentityUserId
        const isAdmin = user.roles?.includes('admin')

        if (!isMentorOwner && !isAdmin) {
          return Response.json({ error: 'Forbidden' }, { status: 403 })
        }

        const requestedStatuses = scope === 'completed'
          ? ['COMPLETED']
          : scope === 'requests'
            ? ['PENDING']
            : ['PENDING', 'UPCOMING', 'PENDING_REVIEW', 'COMPLETED', 'DECLINED']

        const records = await db
          .select()
          .from(mentoringSessions)
          .where(
            and(
              eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
              inArray(mentoringSessions.status, requestedStatuses),
            ),
          )
          .orderBy(asc(mentoringSessions.scheduledAt))

        const weeklyRecords = await loadWeekSessionsForMentor(mentorIdentityUserId)
        const weeklyApprovedCount = computeUniqueCount(weeklyRecords)

        const reminderWindowStart = new Date()
        reminderWindowStart.setHours(reminderWindowStart.getHours() + 24)

        for (const record of records) {
          if (record.status !== 'UPCOMING' || record.reminderSentAt) continue
          if (record.scheduledAt && new Date(record.scheduledAt) <= reminderWindowStart) {
            await db
              .update(mentoringSessions)
              .set({ reminderSentAt: new Date(), updatedAt: new Date() })
              .where(eq(mentoringSessions.id, record.id))
          }
        }

        return Response.json({
          mentorIdentityUserId,
          weeklyApprovedCount,
          maxWeeklyCapacity: MAX_WEEKLY_APPROVED,
          sessions: records,
        })
      },

      POST: async ({ request }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const isStudent = user.roles?.includes('student') || user.roles?.includes('admin')
        if (!isStudent) {
          return Response.json({ error: 'Only students can request mentoring sessions.' }, { status: 403 })
        }

        const body = await request.json()
        const {
          mentorIdentityUserId,
          studentName,
          studentContact,
          subject,
          topicDescription,
          scheduledAt,
        } = body as {
          mentorIdentityUserId: string
          studentName: string
          studentContact: string
          subject: string
          topicDescription: string
          scheduledAt: string
        }

        if (!mentorIdentityUserId || !studentName || !studentContact || !subject || !topicDescription || !scheduledAt) {
          return Response.json({ error: 'Missing scheduling fields.' }, { status: 400 })
        }

        if (!ALLOWED_SUBJECTS.includes(subject)) {
          return Response.json({ error: 'Invalid subject selected.' }, { status: 400 })
        }

        const [mentor] = await db
          .select()
          .from(mentorProfiles)
          .where(eq(mentorProfiles.identityUserId, mentorIdentityUserId))

        if (!mentor) {
          return Response.json({ error: 'Mentor not found.' }, { status: 404 })
        }

        const mentorSubjects = (() => {
          try {
            return JSON.parse(mentor.subjects || '[]')
          } catch {
            return String(mentor.subjects || '').split(',').map((value) => value.trim()).filter(Boolean)
          }
        })()

        if (!mentorSubjects.includes(subject)) {
          return Response.json({ error: 'This mentor does not teach that subject.' }, { status: 409 })
        }

        const scheduledDate = new Date(scheduledAt)
        if (Number.isNaN(scheduledDate.getTime())) {
          return Response.json({ error: 'Invalid session date/time.' }, { status: 400 })
        }

        if (!doesTimeMatchAvailability(mentor.availability || '', scheduledDate, mentor.availabilitySlots || '')) {
          return Response.json({ error: 'That time is outside the mentor availability window.' }, { status: 409 })
        }

        const weeklyRecords = await loadWeekSessionsForMentor(mentorIdentityUserId)
        const weeklyCount = computeUniqueCount(weeklyRecords)
        if (weeklyCount >= MAX_WEEKLY_APPROVED) {
          return Response.json({ error: 'Fully booked this week.' }, { status: 409 })
        }

        const hasConflict = await hasSchedulingConflict(mentorIdentityUserId, scheduledDate)
        if (hasConflict) {
          return Response.json({ error: 'This mentor already has a conflicting session at that time.' }, { status: 409 })
        }

        const [createdSession] = await db.insert(mentoringSessions).values({
          mentorIdentityUserId,
          studentIdentityUserId: user.id,
          studentName,
          studentContact,
          subject,
          topicDescription,
          scheduledAt: scheduledDate,
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        }).returning({ id: mentoringSessions.id })

        await recordNotification({
          sessionId: createdSession.id,
          recipientUserId: mentorIdentityUserId,
          recipientRole: 'mentor',
          notificationType: 'session_requested',
          channel: 'in_app',
          message: `${studentName} requested a ${subject} session for ${scheduledDate.toLocaleString()}.`,
        })

        return Response.json({ success: true }, { status: 201 })
      },
    },
  },
})
