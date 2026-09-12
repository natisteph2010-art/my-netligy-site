import { createFileRoute } from '@tanstack/react-router'
import { eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { ambassadors } from '../../../db/schema.js'
import { getAdminUser } from '../../lib/authorization.js'
import { buildAmbassadorValues, toPublicAmbassador } from '../../lib/ambassadors.js'

export const Route = createFileRoute('/api/ambassadors/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = Number(params.id)
        if (!Number.isInteger(id)) return Response.json({ error: 'Invalid id' }, { status: 400 })

        try {
          const [row] = await db.select().from(ambassadors).where(eq(ambassadors.id, id))
          if (!row) return Response.json({ error: 'Ambassador not found' }, { status: 404 })
          if (!row.isPublic && !(await getAdminUser())) {
            return Response.json({ error: 'Ambassador not found' }, { status: 404 })
          }
          return Response.json(toPublicAmbassador(row))
        } catch (err) {
          console.error('Read ambassador error:', err)
          return Response.json({ error: 'Failed to load ambassador' }, { status: 500 })
        }
      },

      PUT: async ({ request, params }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        const id = Number(params.id)
        if (!Number.isInteger(id)) return Response.json({ error: 'Invalid id' }, { status: 400 })

        try {
          const body = await request.json()
          const values = buildAmbassadorValues(body, { partial: true })
          const [row] = await db
            .update(ambassadors)
            .set({ ...values, updatedAt: new Date() } as any)
            .where(eq(ambassadors.id, id))
            .returning()
          if (!row) return Response.json({ error: 'Ambassador not found' }, { status: 404 })
          return Response.json(toPublicAmbassador(row))
        } catch (err) {
          console.error('Update ambassador error:', err)
          return Response.json({ error: 'Failed to update ambassador' }, { status: 500 })
        }
      },

      DELETE: async ({ params }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        const id = Number(params.id)
        if (!Number.isInteger(id)) return Response.json({ error: 'Invalid id' }, { status: 400 })

        try {
          const [row] = await db.delete(ambassadors).where(eq(ambassadors.id, id)).returning()
          if (!row) return Response.json({ error: 'Ambassador not found' }, { status: 404 })
          return Response.json({ success: true })
        } catch (err) {
          console.error('Delete ambassador error:', err)
          return Response.json({ error: 'Failed to delete ambassador' }, { status: 500 })
        }
      },
    },
  },
})
