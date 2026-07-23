import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { students } from '../../../../db/schema.js'
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
    },
  },
})
