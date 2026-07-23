import type { Config } from '@netlify/functions'
import { admin, getUser, verifyRequestOrigin } from '@netlify/identity'
import { syncUserAccount } from '../../src/lib/authorization.js'

export default async function adminBootstrap(request: Request) {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    verifyRequestOrigin(request)
  } catch {
    return Response.json({ error: 'Invalid request origin' }, { status: 403 })
  }

  const user = await getUser()
  if (!user?.email) {
    return Response.json({ error: 'Authentication required' }, { status: 401 })
  }

  const allowedEmail = Netlify.env.get('ADMIN_BOOTSTRAP_EMAIL')?.trim().toLowerCase()
  if (!allowedEmail) {
    return Response.json({ error: 'Administrator bootstrap is not configured' }, { status: 503 })
  }

  if (user.email.toLowerCase() !== allowedEmail) {
    return Response.json({ error: 'Access denied' }, { status: 403 })
  }

  try {
    const identityUser = await admin.getUser(user.id)
    const existingRoles = Array.isArray(identityUser.appMetadata?.roles)
      ? identityUser.appMetadata.roles.filter((role): role is string => typeof role === 'string')
      : identityUser.roles ?? []
    const roles = Array.from(new Set([...existingRoles, 'admin']))

    await admin.updateUser(user.id, {
      role: 'admin',
      app_metadata: { ...identityUser.appMetadata, roles },
    })
    await syncUserAccount(user, 'admin')

    return Response.json({ success: true, reauthenticationRequired: true })
  } catch (error) {
    console.error('Administrator bootstrap failed:', error)
    return Response.json({ error: 'Failed to promote administrator' }, { status: 500 })
  }
}

export const config: Config = {
  path: '/api/auth/bootstrap-admin',
  method: 'POST',
}
