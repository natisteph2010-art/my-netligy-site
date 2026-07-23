import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles } from '../../../../db/schema.js'
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
