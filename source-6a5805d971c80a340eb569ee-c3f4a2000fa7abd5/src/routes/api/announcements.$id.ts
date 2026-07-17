import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../db/index.js'
import { announcements } from '../../../db/schema.js'
import { eq } from 'drizzle-orm'
import { getAdminUser } from '../../lib/authorization.js'

export const Route = createFileRoute('/api/announcements/$id')({
  server: {
    handlers: {
      // Edit an announcement or toggle pinned / archived state.
      PUT: async ({ request, params }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        const id = parseInt(params.id, 10)
        try {
          const body = await request.json()
          const updates: Record<string, unknown> = { updatedAt: new Date() }
          if (body.title !== undefined) updates.title = body.title
          if (body.body !== undefined) updates.body = body.body
          if (body.publishDate !== undefined)
            updates.publishDate = body.publishDate ? new Date(body.publishDate) : new Date()
          if (body.expiresAt !== undefined)
            updates.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null
          if (body.pinned !== undefined) updates.pinned = !!body.pinned
          if (body.archived !== undefined) updates.archived = !!body.archived

          const [row] = await db
            .update(announcements)
            .set(updates)
            .where(eq(announcements.id, id))
            .returning()
          if (!row) return Response.json({ error: 'Not found' }, { status: 404 })
          return Response.json(row)
        } catch (err) {
          console.error('Update announcement error:', err)
          return Response.json({ error: 'Failed to update announcement' }, { status: 500 })
        }
      },

      DELETE: async ({ params }) => {
        if (!(await getAdminUser())) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        const id = parseInt(params.id, 10)
        await db.delete(announcements).where(eq(announcements.id, id))
        return Response.json({ success: true })
      },
    },
  },
})
