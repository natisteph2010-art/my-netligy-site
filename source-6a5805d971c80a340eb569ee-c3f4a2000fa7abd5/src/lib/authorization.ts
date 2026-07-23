import { getUser, type User } from '@netlify/identity'
import { db } from '../../db/index.js'
import { userAccounts } from '../../db/schema.js'

export type AppRole = 'student' | 'mentor' | 'admin'

const rolePriority: AppRole[] = ['admin', 'mentor', 'student']

export function getIdentityRole(user: Pick<User, 'role' | 'roles'>): AppRole {
  const assigned = new Set([user.role, ...(user.roles ?? [])])
  return rolePriority.find((role) => assigned.has(role)) ?? 'student'
}

export async function syncUserAccount(
  user: Pick<User, 'id' | 'email'>,
  role: AppRole,
) {
  if (!user.email) return

  await db
    .insert(userAccounts)
    .values({ identityUserId: user.id, email: user.email, role })
    .onConflictDoUpdate({
      target: userAccounts.identityUserId,
      set: { email: user.email, role, updatedAt: new Date() },
    })
}

export async function getCurrentUserWithRole() {
  const user = await getUser()
  if (!user) return null

  const role = getIdentityRole(user)
  await syncUserAccount(user, role)
  return { user, role }
}

export async function getAdminUser() {
  const account = await getCurrentUserWithRole()
  return account?.role === 'admin' ? account.user : null
}
