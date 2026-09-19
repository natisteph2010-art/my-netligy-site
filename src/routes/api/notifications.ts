import { createFileRoute } from '@tanstack/react-router'
import { getUser } from '@netlify/identity'
import { and, desc, eq } from 'drizzle-orm'
import { db } from '../../../db/index.js'
import { sessionNotifications } from '../../../db/schema.js'

export const Route = createFileRoute('/api/notifications')({
  server: {
    handlers: {
      GET: async () => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const notifications = await db
          .select()
          .from(sessionNotifications)
          .where(eq(sessionNotifications.recipientUserId, user.id))
          .orderBy(desc(sessionNotifications.createdAt))
          .limit(50)

        return Response.json({ notifications })
      },

      PATCH: async ({ request }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const body = await request.json() as { notificationId?: number }
        if (!body.notificationId) return Response.json({ error: 'Notification id is required.' }, { status: 400 })

        const [updated] = await db
          .update(sessionNotifications)
          .set({ status: 'read', readAt: new Date(), updatedAt: new Date() })
          .where(and(eq(sessionNotifications.id, body.notificationId), eq(sessionNotifications.recipientUserId, user.id)))
          .returning({ id: sessionNotifications.id })

        if (!updated) return Response.json({ error: 'Notification not found.' }, { status: 404 })
        return Response.json({ success: true, id: updated.id })
      },
    },
  },
})