import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles } from '../../../../db/schema.js'
import { getAdminUser } from '../../../lib/authorization.js'

export const Route = createFileRoute('/api/admin/mentors')({
  server: {
    handlers: {
      GET: async () => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }

        const mentors = await db
          .select()
          .from(mentorProfiles)
          .orderBy(mentorProfiles.fullName)

        return Response.json(mentors)
      },
    },
  },
})
