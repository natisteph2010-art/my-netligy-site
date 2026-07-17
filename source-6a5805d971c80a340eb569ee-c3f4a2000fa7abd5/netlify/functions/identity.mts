import type { UserLoginEvent, UserSignupEvent } from '@netlify/functions'
import { getIdentityRole, syncUserAccount } from '../../src/lib/authorization.js'

type IdentityRoleEvent = UserLoginEvent | UserSignupEvent

async function applyRole(event: IdentityRoleEvent) {
  const role = getIdentityRole(event.user)
  const roles = Array.from(new Set([...(event.user.roles ?? []), role]))

  try {
    await syncUserAccount(event.user, role)
  } catch (error) {
    console.error('User role sync failed:', error)
  }

  return {
    user: {
      ...event.user,
      role,
      roles,
      appMetadata: {
        ...event.user.appMetadata,
        roles,
      },
    },
  }
}

export default {
  userSignup: applyRole,
  userLogin: applyRole,
}
