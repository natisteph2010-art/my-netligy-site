import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorApplications, mentorProfiles, mentoringSessions, students } from '../../../../db/schema.js'
import { and, count, eq, gt } from 'drizzle-orm'
import { getAdminUser } from '../../../lib/authorization.js'

export const Route = createFileRoute('/api/admin/stats')({
  server: {
    handlers: {
      GET: async () => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        const [pending] = await db
          .select({ value: count() })
          .from(mentorApplications)
          .where(eq(mentorApplications.status, 'pending'))
        const [mentors] = await db.select({ value: count() }).from(mentorProfiles)
        const [studentCount] = await db.select({ value: count() }).from(students)
        const [upcomingSessions] = await db
          .select({ value: count() })
          .from(mentoringSessions)
          .where(
            and(
              eq(mentoringSessions.status, 'UPCOMING'),
              gt(mentoringSessions.scheduledAt, new Date()),
            ),
          )

        return Response.json({
          pendingApplications: pending?.value ?? 0,
          activeMentors: mentors?.value ?? 0,
          registeredStudents: studentCount?.value ?? 0,
          upcomingSessions: upcomingSessions?.value ?? 0,
        })
      },
    },
  },
})
