import { createFileRoute } from '@tanstack/react-router'
import { db } from '../../../../db/index.js'
import { mentorProfiles } from '../../../../db/schema.js'
import { getUser } from '@netlify/identity'
import { eq } from 'drizzle-orm'

export const Route = createFileRoute('/api/mentors/profile/$userId')({
  server: {
    handlers: {
      PUT: async ({ request, params }) => {
        const user = await getUser()
        if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })

        // Only the mentor themselves or an admin can update
        if (user.id !== params.userId && !user.roles?.includes('admin')) {
          return Response.json({ error: 'Forbidden' }, { status: 403 })
        }

        const body = await request.json()
        const { bio, igcseGrades, subjects, reason, availability, profilePicUrl, instagram, telegram, whatsapp, contactEmail, linkedin } = body

        const [existing] = await db
          .select()
          .from(mentorProfiles)
          .where(eq(mentorProfiles.identityUserId, params.userId))

        if (!existing) {
          return Response.json({ error: 'Mentor profile not found' }, { status: 404 })
        }

        await db
          .update(mentorProfiles)
          .set({
            bio: bio ?? existing.bio,
            igcseGrades: igcseGrades ?? existing.igcseGrades,
            subjects: Array.isArray(subjects) ? JSON.stringify(subjects) : (subjects ?? existing.subjects),
            reason: reason ?? existing.reason,
            availability: availability ?? existing.availability,
            profilePicUrl: profilePicUrl ?? existing.profilePicUrl,
            instagram: instagram ?? existing.instagram,
            telegram: telegram ?? existing.telegram,
            whatsapp: whatsapp ?? existing.whatsapp,
            contactEmail: contactEmail ?? existing.contactEmail,
            linkedin: linkedin ?? existing.linkedin,
            updatedAt: new Date(),
          })
          .where(eq(mentorProfiles.identityUserId, params.userId))

        return Response.json({ success: true })
      },

      GET: async ({ params }) => {
        const [profile] = await db
          .select()
          .from(mentorProfiles)
          .where(eq(mentorProfiles.identityUserId, params.userId))

        if (!profile) return Response.json({ error: 'Not found' }, { status: 404 })
        return Response.json(profile)
      },
    },
  },
})
