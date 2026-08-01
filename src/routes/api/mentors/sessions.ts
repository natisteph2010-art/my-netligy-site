import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'
import { and, asc, eq, gte, lte, or } from 'drizzle-orm'

const ALLOWED_SUBJECTS = [
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
]

const MAX_WEEKLY_APPROVED = 4

const startOfWeek = (date: Date) => {
  const start = new Date(date)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  start.setHours(0, 0, 0, 0)
  return start
}

const endOfWeek = (date: Date) => {
  const end = new Date(date)
  const start = startOfWeek(date)
  end.setTime(start.getTime())
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

const loadWeekSessions = async (mentorIdentityUserId: string) => {
  const weekStart = startOfWeek(new Date())
  const weekEnd = endOfWeek(new Date())

  const records = await db
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

  return records
}

const computeUniqueCount = (records: typeof mentoringSessions.$inferSelect[]) => {
  const distinct = new Set(records.map((session) => `${session.studentName}::${session.studentContact}`))
  return distinct.size
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
            : ['PENDING', 'UPCOMING', 'COMPLETED', 'DECLINED']

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

        const weeklyRecords = await loadWeekSessions(mentorIdentityUserId)
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

        const scheduledDate = new Date(scheduledAt)
        if (Number.isNaN(scheduledDate.getTime())) {
          return Response.json({ error: 'Invalid session date/time.' }, { status: 400 })
        }

        const weeklyRecords = await loadWeekSessions(mentorIdentityUserId)
        const weeklyCount = computeUniqueCount(weeklyRecords)
        if (weeklyCount >= MAX_WEEKLY_APPROVED) {
          return Response.json({ error: 'Fully booked this week.' }, { status: 409 })
        }

        await db.insert(mentoringSessions).values({
          mentorIdentityUserId,
          studentName,
          studentContact,
          subject,
          topicDescription,
          scheduledAt: scheduledDate,
          status: 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        return Response.json({ success: true }, { status: 201 })
      },
    },
  },
})
