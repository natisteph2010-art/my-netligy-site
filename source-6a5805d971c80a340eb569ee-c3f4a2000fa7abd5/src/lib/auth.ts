import { createServerFn } from '@tanstack/react-start'
import type { User } from '@netlify/identity'
import { getCurrentUserWithRole } from './authorization'

export type { User as IdentityUser }

export const getServerUser = createServerFn({ method: 'GET' }).handler(
  async () => {
    const account = await getCurrentUserWithRole()
    return (account?.user ?? null) as any
  }
)
