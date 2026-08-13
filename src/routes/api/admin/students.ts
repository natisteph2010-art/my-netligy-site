import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { students, userAccounts } from '../../../../db/schema.js'
import { getAdminUser } from '../../../lib/authorization.js'

export const Route = createFileRoute('/api/admin/students')({
  server: {
    handlers: {
      GET: async () => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        const studentList = await db
          .select()
          .from(students)
          .orderBy(students.fullName)

        return Response.json(studentList)
      },
      DELETE: async ({ request }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        let id: number | undefined
        try {
          const body = await request.json().catch(() => ({}))
          id = body?.id
        } catch {
          /* ignore */
        }

        if (!id) {
          const url = new URL(request.url)
          const q = url.searchParams.get('id')
          if (q) id = parseInt(q, 10)
        }

        if (!id || Number.isNaN(id)) {
          return Response.json({ error: 'Invalid student id' }, { status: 400 })
        }

        const [student] = await db.select().from(students).where(students.id.eq(id))
        if (!student) return Response.json({ error: 'Student not found' }, { status: 404 })

        // remove student record
        await db.delete(students).where(students.id.eq(id))

        // also try removing any user_accounts row for this identityUserId if present
        try {
          await db.delete(userAccounts).where(userAccounts.identityUserId.eq(student.identityUserId))
        } catch {
          /* best-effort */
        }

        return Response.json({ success: true })
      },
    },
  },
})
