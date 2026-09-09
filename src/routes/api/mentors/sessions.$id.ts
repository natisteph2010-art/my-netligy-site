import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'
import { and, eq, gte, lte, or } from 'drizzle-orm'

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

const getMentorWeeklyUniqueCount = async (mentorIdentityUserId: string) => {
  const records = await db
    .select()
    .from(mentoringSessions)
    .where(
      and(
        eq(mentoringSessions.mentorIdentityUserId, mentorIdentityUserId),
        or(eq(mentoringSessions.status, 'UPCOMING'), eq(mentoringSessions.status, 'COMPLETED')),
        gte(mentoringSessions.scheduledAt, startOfWeek(new Date())),
        lte(mentoringSessions.scheduledAt, endOfWeek(new Date())),
      ),
    )

  const unique = new Set(records.map((session) => `${session.studentName}::${session.studentContact}`))
  return unique.size
}

export const Route = createFileRoute('/api/mentors/sessions/$id')({
  server: {
    handlers: {
      PATCH: async ({ request, params }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json()
        const { action } = body as { action?: 'approve' | 'decline' | 'submit_evidence' | 'approve_evidence' | 'reject_evidence' }
        const sessionId = Number(params.id)

        const [session] = await db
          .select()
          .from(mentoringSessions)
          .where(eq(mentoringSessions.id, sessionId))

        if (!session) {
          return Response.json({ error: 'Session not found.' }, { status: 404 })
        }

        if (user.id !== session.mentorIdentityUserId && !user.roles?.includes('admin')) {
          return Response.json({ error: 'Forbidden' }, { status: 403 })
        }

        if (action === 'approve') {
          if (session.status !== 'PENDING') {
            return Response.json({ error: 'Only pending requests can be approved.' }, { status: 409 })
          }

          const weeklyApprovedCount = await getMentorWeeklyUniqueCount(session.mentorIdentityUserId)
          if (weeklyApprovedCount >= 4) {
            return Response.json({ error: 'Mentor has already reached the weekly booking limit.' }, { status: 409 })
          }

          await db
            .update(mentoringSessions)
            .set({
              status: 'UPCOMING',
              approvedAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(mentoringSessions.id, sessionId))

          return Response.json({ success: true })
        }

        if (action === 'decline') {
          await db
            .update(mentoringSessions)
            .set({
              status: 'DECLINED',
              updatedAt: new Date(),
            })
            .where(eq(mentoringSessions.id, sessionId))
          return Response.json({ success: true })
        }

        if (action === 'submit_evidence') {
          if (session.status !== 'UPCOMING') {
            return Response.json({ error: 'Only upcoming sessions can be completed.' }, { status: 409 })
          }

          const duration = Number(body.actualDurationMinutes)
          const topicsCovered = String(body.topicsCovered || '')
          const evidenceLink = String(body.evidenceLink || '')
          const evidenceFileName = String(body.evidenceFileName || '')
          const evidenceMimeType = String(body.evidenceMimeType || '')
          const evidenceData = String(body.evidenceData || '')

          if (!duration || duration <= 0 || !topicsCovered.trim() || !evidenceFileName || !evidenceData) {
            return Response.json({ error: 'Duration, topics covered, and an evidence file are required.' }, { status: 400 })
          }

          if (!evidenceData.startsWith('data:') || evidenceData.length > 7_000_000) {
            return Response.json({ error: 'Evidence file must be a valid file smaller than 5 MB.' }, { status: 400 })
          }

          await db
            .update(mentoringSessions)
            .set({
              status: 'PENDING_REVIEW',
              actualDurationMinutes: duration,
              topicsCovered,
              evidenceLink,
              evidenceFileName,
              evidenceMimeType,
              evidenceData,
              completedAt: null,
              evidenceReviewedAt: null,
              evidenceReviewedBy: null,
              updatedAt: new Date(),
            })
            .where(eq(mentoringSessions.id, sessionId))

          return Response.json({ success: true, status: 'PENDING_REVIEW' })
        }

        if (action === 'approve_evidence' || action === 'reject_evidence') {
          if (!user.roles?.includes('admin')) {
            return Response.json({ error: 'Only administrators can review evidence.' }, { status: 403 })
          }
          if (session.status !== 'PENDING_REVIEW') {
            return Response.json({ error: 'Only evidence awaiting review can be approved.' }, { status: 409 })
          }

          if (action === 'reject_evidence') {
            await db
              .update(mentoringSessions)
              .set({ status: 'UPCOMING', evidenceReviewedAt: new Date(), evidenceReviewedBy: user.id, updatedAt: new Date() })
              .where(eq(mentoringSessions.id, sessionId))
            return Response.json({ success: true, status: 'UPCOMING' })
          }

          const [mentorRecord] = await db
            .select()
            .from(mentorProfiles)
            .where(eq(mentorProfiles.identityUserId, session.mentorIdentityUserId))

          if (!mentorRecord) return Response.json({ error: 'Mentor profile missing.' }, { status: 404 })

          await db
            .update(mentoringSessions)
            .set({ status: 'COMPLETED', completedAt: new Date(), evidenceReviewedAt: new Date(), evidenceReviewedBy: user.id, updatedAt: new Date() })
            .where(eq(mentoringSessions.id, sessionId))

          await db
            .update(mentorProfiles)
            .set({
              totalHoursTaught: Number(mentorRecord.totalHoursTaught ?? 0) + Number(session.actualDurationMinutes ?? 0) / 60,
              updatedAt: new Date(),
            })
            .where(eq(mentorProfiles.identityUserId, session.mentorIdentityUserId))

          return Response.json({ success: true, status: 'COMPLETED' })
        }

        return Response.json({ error: 'Unsupported action.' }, { status: 400 })
      },
    },
  },
})
