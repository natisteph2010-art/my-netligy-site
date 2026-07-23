import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorApplications } from '../../../../db/schema.js'
import { eq } from 'drizzle-orm'
import { getAdminUser } from '../../../lib/authorization.js'

export const Route = createFileRoute('/api/applications/mentor')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { fullName, email, phone, school, subjects, statement, availability } = body

          if (!fullName || !email || !phone || !school || !subjects || !statement || !availability) {
            return Response.json({ error: 'All fields are required' }, { status: 400 })
          }

          const [application] = await db
            .insert(mentorApplications)
            .values({
              fullName,
              email,
              phone,
              school,
              subjects: Array.isArray(subjects) ? JSON.stringify(subjects) : subjects,
              statement,
              availability,
              status: 'pending',
            })
            .returning()

          return Response.json({ success: true, id: application.id }, { status: 201 })
        } catch (err) {
          console.error('Mentor application error:', err)
          return Response.json({ error: 'Failed to submit application' }, { status: 500 })
        }
      },

      GET: async ({ request }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        const url = new URL(request.url)
        const status = url.searchParams.get('status') || 'pending'
        const apps = await db
          .select()
          .from(mentorApplications)
          .where(eq(mentorApplications.status, status))
          .orderBy(mentorApplications.createdAt)
        return Response.json(apps)
      },
    },
  },
})
