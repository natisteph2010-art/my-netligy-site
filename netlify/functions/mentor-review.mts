import type { Config } from '@netlify/functions'
import { verifyRequestOrigin } from '@netlify/identity'
import { eq } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { mentorApplications } from '../../db/schema.js'
import { getAdminUser } from '../../src/lib/authorization.js'
import { provisionMentorFromApplication, sendMentorPasswordSetupEmail } from '../../src/lib/mentor-provisioning.js'

function parseApplicationId(request: Request) {
  const match = new URL(request.url).pathname.match(/^\/api\/applications\/mentor\/(\d+)\/review$/)
  return match ? parseInt(match[1], 10) : null
}

export default async function mentorReview(request: Request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    verifyRequestOrigin(request)
  } catch {
    return Response.json({ error: 'Invalid request origin' }, { status: 403 })
  }

  if (!(await getAdminUser())) {
    return Response.json({ error: 'Access denied' }, { status: 403 })
  }

  const appId = parseApplicationId(request)
  if (!appId) {
    return Response.json({ error: 'Invalid application id' }, { status: 400 })
  }

  let action: string
  try {
    ;({ action } = await request.json())
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (action !== 'approve' && action !== 'reject' && action !== 'more_info' && action !== 'resend_password_setup') {
    return Response.json({ error: 'Invalid action' }, { status: 400 })
  }

  const [app] = await db
    .select()
    .from(mentorApplications)
    .where(eq(mentorApplications.id, appId))

  if (!app) {
    return Response.json({ error: 'Application not found' }, { status: 404 })
  }

  if (action === 'reject') {
    await db.delete(mentorApplications).where(eq(mentorApplications.id, appId))
    return Response.json({ success: true, action })
  }

  if (action === 'more_info') {
    await db
      .update(mentorApplications)
      .set({ status: 'more_info', reviewedAt: new Date() })
      .where(eq(mentorApplications.id, appId))

    return Response.json({ success: true, action, status: 'more_info' })
  }

  if (action === 'resend_password_setup') {
    const passwordResetSent = await sendMentorPasswordSetupEmail(app.email)
    return Response.json({ success: true, action: 'resend_password_setup', passwordResetSent })
  }

  try {
    const result = await provisionMentorFromApplication(app)
    return Response.json({
      success: true,
      action: 'approve',
      status: 'approved',
      ...result,
    })
  } catch (error) {
    console.error('Mentor approval failed:', error)
    return Response.json({ error: 'Failed to approve mentor application' }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/applications/mentor/:id/review',
  method: 'POST',
}
