import { createMiddleware } from '@tanstack/react-start'
import type { User } from '@netlify/identity'
import { getCurrentUserWithRole } from '../lib/authorization'

export const identityMiddleware = createMiddleware().server(async ({ next }) => {
  const account = await getCurrentUserWithRole()
  const user: User | null = account?.user ?? null
  return next({ context: { user } })
})

export const requireAuthMiddleware = createMiddleware().server(async ({ next }) => {
  const account = await getCurrentUserWithRole()
  if (!account) throw new Error('Authentication required')
  return next({ context: { user: account.user } })
})

export function requireRoleMiddleware(role: string) {
  return createMiddleware().server(async ({ next }) => {
    const account = await getCurrentUserWithRole()
    if (!account) throw new Error('Authentication required')
    if (account.role !== role) throw new Error(`Role '${role}' required`)
    return next({ context: { user: account.user } })
  })
}
