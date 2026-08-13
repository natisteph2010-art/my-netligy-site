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
      DELETE: async ({ request }) => {
        try {
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

          console.log('Admin mentors DELETE called, parsed id=', id, 'url=', request.url)

          if (!id) {
            const url = new URL(request.url)
            const q = url.searchParams.get('id')
            if (q) id = parseInt(q, 10)
          }

          if (!id || Number.isNaN(id)) {
            return Response.json({ error: 'Invalid mentor id' }, { status: 400 })
          }

          const [mentor] = await db.select().from(mentorProfiles).where(mentorProfiles.id.eq(id))
          if (!mentor) return Response.json({ error: 'Mentor not found' }, { status: 404 })

          // Soft-delete: avoid cascading/foreign-key errors by sanitizing the profile
          const newIdentity = `removed-${mentor.id}-${Date.now()}`
          await db
            .update(mentorProfiles)
            .set({
              isPublic: false,
              fullName: `[removed] ${mentor.fullName}`,
              email: '',
              contactEmail: null,
              profilePicUrl: null,
              identityUserId: newIdentity,
              updatedAt: new Date(),
            })
            .where(mentorProfiles.id.eq(id))

          return Response.json({ success: true, action: 'soft_delete' })
        } catch (err: any) {
          console.error('Admin mentors DELETE error', err)
          return Response.json({ error: 'Failed to remove mentor', details: err?.message || String(err), stack: err?.stack }, { status: 500 })
        }
      },
    },
  },
})
