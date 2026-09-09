import { createFileRoute } from '@tanstack/react-router'
import { getUser } from '@netlify/identity'
import { eq } from 'drizzle-orm'
import { db } from '../../../../db/index.js'
import { mentoringSessions } from '../../../../db/schema.js'

export const Route = createFileRoute('/api/mentors/sessions/$id/evidence')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        const [session] = await db
          .select({
            mentorIdentityUserId: mentoringSessions.mentorIdentityUserId,
            studentIdentityUserId: mentoringSessions.studentIdentityUserId,
            studentContact: mentoringSessions.studentContact,
            evidenceData: mentoringSessions.evidenceData,
            evidenceFileName: mentoringSessions.evidenceFileName,
            evidenceMimeType: mentoringSessions.evidenceMimeType,
          })
          .from(mentoringSessions)
          .where(eq(mentoringSessions.id, Number(params.id)))

        if (!session) return Response.json({ error: 'Session not found.' }, { status: 404 })

        const allowed = user.roles?.includes('admin')
          || user.id === session.mentorIdentityUserId
          || user.id === session.studentIdentityUserId
          || user.email === session.studentContact
        if (!allowed) return Response.json({ error: 'Forbidden' }, { status: 403 })
        if (!session.evidenceData) return Response.json({ error: 'Evidence file unavailable.' }, { status: 404 })

        return Response.json({
          data: session.evidenceData,
          fileName: session.evidenceFileName,
          mimeType: session.evidenceMimeType,
        })
      },
    },
  },
})
