import { createFileRoute } from '@tanstack/react-router'
import { asc, desc } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { ambassadors } from '../../../db/schema.js'
import { getAdminUser } from '../../lib/authorization.js'
import { buildAmbassadorValues, toPublicAmbassador } from '../../lib/ambassadors.js'

export const Route = createFileRoute('/api/ambassadors')({
  server: {
    handlers: {
      // GET /api/ambassadors            -> public: published ambassadors
      // GET /api/ambassadors?scope=all  -> admin: every ambassador, including hidden ones
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const scope = url.searchParams.get('scope')

        try {
          const rows = await db
            .select()
            .from(ambassadors)
            .orderBy(desc(ambassadors.featured), asc(ambassadors.sortOrder), asc(ambassadors.fullName))

          if (scope === 'all') {
            if (!(await getAdminUser())) {
              return Response.json({ error: 'Access denied' }, { status: 403 })
            }
            return Response.json(rows.map((row) => ({ ...toPublicAmbassador(row), isPublic: row.isPublic })))
          }

          return Response.json(rows.filter((row) => row.isPublic).map(toPublicAmbassador))
        } catch (err) {
          console.error('List ambassadors error:', err)
          return Response.json({ error: 'Failed to load ambassadors' }, { status: 500 })
        }
      },

      POST: async ({ request }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        try {
          const body = await request.json()
          const values = buildAmbassadorValues(body, { partial: false })
          if (!values.fullName) {
            return Response.json({ error: 'Full name is required' }, { status: 400 })
          }
          const [row] = await db.insert(ambassadors).values(values as any).returning()
          return Response.json(toPublicAmbassador(row), { status: 201 })
        } catch (err) {
          console.error('Create ambassador error:', err)
          return Response.json({ error: 'Failed to create ambassador' }, { status: 500 })
        }
      },
    },
  },
})
