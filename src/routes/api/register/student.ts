import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { students } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'

export const Route = createFileRoute('/api/register/student')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { fullName, age, gradeLevel, email, identityUserId } = body

          if (!fullName || !age || !gradeLevel || !email) {
            return Response.json({ error: 'All fields are required' }, { status: 400 })
          }

          const [student] = await db
            .insert(students)
            .values({
              identityUserId: identityUserId || 'pending',
              fullName,
              age: parseInt(age, 10),
              gradeLevel,
              email,
            })
            .returning()

          return Response.json({ success: true, id: student.id }, { status: 201 })
        } catch (err) {
          console.error('Student registration error:', err)
          return Response.json({ error: 'Failed to register student' }, { status: 500 })
        }
      },
    },
  },
})
