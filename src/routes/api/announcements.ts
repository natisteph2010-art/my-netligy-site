import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../db/index.js'
import { announcements } from '../../../db/schema.js'
import { and, desc, eq, gt, isNull, lte, or } from 'drizzle-orm'
import { getAdminUser } from '../../lib/authorization.js'

export const Route = createFileRoute('/api/announcements')({
  server: {
    handlers: {
      // GET /api/announcements            -> public: active (published, not expired, not archived)
      // GET /api/announcements?scope=all  -> admin: every announcement
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const scope = url.searchParams.get('scope')

        if (scope === 'all') {
          if (!(await getAdminUser())) {
            return Response.json({ error: 'Access denied' }, { status: 403 })
          }
          const rows = await db
            .select()
            .from(announcements)
            .orderBy(desc(announcements.pinned), desc(announcements.createdAt))
          return Response.json(rows)
        }

        const now = new Date()
        const rows = await db
          .select()
          .from(announcements)
          .where(
            and(
              eq(announcements.archived, false),
              lte(announcements.publishDate, now),
              or(isNull(announcements.expiresAt), gt(announcements.expiresAt, now)),
            ),
          )
          .orderBy(desc(announcements.pinned), desc(announcements.publishDate))
        return Response.json(rows)
      },

      POST: async ({ request }) => {
        const user = await getAdminUser()
        if (!user) {
          return Response.json({ error: 'Access denied' }, { status: 403 })
        }
        try {
          const body = await request.json()
          const { title, body: message, publishDate, expiresAt, pinned } = body
          if (!title || !message) {
            return Response.json({ error: 'Title and message are required' }, { status: 400 })
          }
          const [row] = await db
            .insert(announcements)
            .values({
              title,
              body: message,
              publishDate: publishDate ? new Date(publishDate) : new Date(),
              expiresAt: expiresAt ? new Date(expiresAt) : null,
              pinned: !!pinned,
              authorEmail: user.email,
            })
            .returning()
          return Response.json(row, { status: 201 })
        } catch (err) {
          console.error('Create announcement error:', err)
          return Response.json({ error: 'Failed to create announcement' }, { status: 500 })
        }
      },
    },
  },
})
