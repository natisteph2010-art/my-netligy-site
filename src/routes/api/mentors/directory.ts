import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles, mentoringSessions } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/api/mentors/directory')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const user = await getUser()
        if (!user) {
          return Response.json({ error: 'Unauthorized. Register as a student to access the mentor directory.' }, { status: 401 })
        }

        const url = new URL(request.url)
        const subject = url.searchParams.get('subject')
        const search = url.searchParams.get('search')?.toLowerCase()

        let mentors = await db
          .select()
          .from(mentorProfiles)
          .where(eq(mentorProfiles.isPublic, true))

        const allSessions = await db.select().from(mentoringSessions)
        const weekStart = new Date()
        weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
        weekStart.setHours(0, 0, 0, 0)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)

        const mentorCounts = new Map<string, Set<string>>()
        for (const session of allSessions) {
          if (!session.scheduledAt || !session.mentorIdentityUserId) continue
          const scheduledAt = new Date(session.scheduledAt)
          if (scheduledAt < weekStart || scheduledAt > weekEnd) continue
          if (session.status !== 'UPCOMING' && session.status !== 'COMPLETED') continue

          const mentorKey = session.mentorIdentityUserId
          const studentKey = `${session.studentName}::${session.studentContact}`
          const current = mentorCounts.get(mentorKey) ?? new Set<string>()
          current.add(studentKey)
          mentorCounts.set(mentorKey, current)
        }

        mentors = mentors.map((mentor) => ({
          ...mentor,
          weeklyApprovedCount: mentorCounts.get(mentor.identityUserId)?.size ?? 0,
          weeklyCapacity: 4,
        }))

        if (subject) {
          mentors = mentors.filter((m) => {
            try {
              const subs = JSON.parse(m.subjects)
              return Array.isArray(subs) && subs.some((s: string) => s.toLowerCase().includes(subject.toLowerCase()))
            } catch {
              return m.subjects.toLowerCase().includes(subject.toLowerCase())
            }
          })
        }

        if (search) {
          mentors = mentors.filter(
            (m) =>
              m.fullName.toLowerCase().includes(search) ||
              m.bio.toLowerCase().includes(search) ||
              m.subjects.toLowerCase().includes(search)
          )
        }

        return Response.json(mentors)
      },
    },
  },
})
