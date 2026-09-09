import { createFileRoute } from '@tanstack/react-router'
import { getUser } from '@netlify/identity'
import { and, asc, eq, isNull, or } from 'drizzle-orm'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'

export const Route = createFileRoute('/api/students/sessions')({
  server: {
    handlers: {
      GET: async () => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const sessions = await db
          .select({
            id: mentoringSessions.id,
            mentorName: mentorProfiles.fullName,
            subject: mentoringSessions.subject,
            topicDescription: mentoringSessions.topicDescription,
            scheduledAt: mentoringSessions.scheduledAt,
            status: mentoringSessions.status,
            actualDurationMinutes: mentoringSessions.actualDurationMinutes,
            topicsCovered: mentoringSessions.topicsCovered,
            evidenceFileName: mentoringSessions.evidenceFileName,
            evidenceReviewedAt: mentoringSessions.evidenceReviewedAt,
            createdAt: mentoringSessions.createdAt,
          })
          .from(mentoringSessions)
          .leftJoin(mentorProfiles, eq(mentorProfiles.identityUserId, mentoringSessions.mentorIdentityUserId))
          .where(
            or(
              eq(mentoringSessions.studentIdentityUserId, user.id),
              and(
                eq(mentoringSessions.studentContact, user.email || ''),
                isNull(mentoringSessions.studentIdentityUserId),
              ),
            ),
          )
          .orderBy(asc(mentoringSessions.scheduledAt))

        return Response.json({ sessions })
      },
    },
  },
})