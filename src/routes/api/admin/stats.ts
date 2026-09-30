import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { ambassadors, announcements, mentorApplications, mentorProfiles, mentoringSessions, students, userAccounts } from '../../../../db/schema.js'
import { and, count, eq, gte, gt } from 'drizzle-orm'
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
        const [totalUsers] = await db.select({ value: count() }).from(userAccounts)
        const [newUsers] = await db
          .select({ value: count() })
          .from(userAccounts)
          .where(gte(userAccounts.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)))
        const [totalSessions] = await db.select({ value: count() }).from(mentoringSessions)
        const [completedSessions] = await db
          .select({ value: count() })
          .from(mentoringSessions)
          .where(eq(mentoringSessions.status, 'COMPLETED'))
        const [publicAmbassadors] = await db
          .select({ value: count() })
          .from(ambassadors)
          .where(eq(ambassadors.isPublic, true))
        const [activeAnnouncements] = await db
          .select({ value: count() })
          .from(announcements)
          .where(eq(announcements.archived, false))
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
          totalUsers: totalUsers?.value ?? 0,
          newUsersLast30Days: newUsers?.value ?? 0,
          totalSessions: totalSessions?.value ?? 0,
          completedSessions: completedSessions?.value ?? 0,
          publicAmbassadors: publicAmbassadors?.value ?? 0,
          activeAnnouncements: activeAnnouncements?.value ?? 0,
        })
      },
    },
  },
})
