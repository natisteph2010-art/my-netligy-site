import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'
import { asc, eq } from 'drizzle-orm'
import { getAdminUser } from '../../../lib/authorization.js'

const SESSION_STATUSES = ['PENDING', 'UPCOMING', 'PENDING_REVIEW', 'COMPLETED', 'DECLINED'] as const

type SessionStatus = typeof SESSION_STATUSES[number]

export const Route = createFileRoute('/api/admin/sessions')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        const url = new URL(request.url)
        const requestedStatus = url.searchParams.get('status')
        const status = SESSION_STATUSES.includes(requestedStatus as SessionStatus)
          ? requestedStatus as SessionStatus
          : null

        const rows = await db
          .select({
            id: mentoringSessions.id,
            mentorIdentityUserId: mentoringSessions.mentorIdentityUserId,
            mentorName: mentorProfiles.fullName,
            mentorEmail: mentorProfiles.email,
            studentName: mentoringSessions.studentName,
            studentContact: mentoringSessions.studentContact,
            subject: mentoringSessions.subject,
            topicDescription: mentoringSessions.topicDescription,
            scheduledAt: mentoringSessions.scheduledAt,
            status: mentoringSessions.status,
            actualDurationMinutes: mentoringSessions.actualDurationMinutes,
            topicsCovered: mentoringSessions.topicsCovered,
            evidenceLink: mentoringSessions.evidenceLink,
            evidenceFileName: mentoringSessions.evidenceFileName,
            evidenceMimeType: mentoringSessions.evidenceMimeType,
            evidenceReviewedAt: mentoringSessions.evidenceReviewedAt,
            createdAt: mentoringSessions.createdAt,
            updatedAt: mentoringSessions.updatedAt,
            approvedAt: mentoringSessions.approvedAt,
            completedAt: mentoringSessions.completedAt,
          })
          .from(mentoringSessions)
          .leftJoin(mentorProfiles, eq(mentorProfiles.identityUserId, mentoringSessions.mentorIdentityUserId))
          .where(status ? eq(mentoringSessions.status, status) : undefined)
          .orderBy(asc(mentoringSessions.scheduledAt))

        return Response.json({ sessions: rows, updatedAt: new Date().toISOString() })
      },
    },
  },
})
