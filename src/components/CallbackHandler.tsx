import { useEffect } from 'react'
import { handleAuthCallback } from '@netlify/identity'

const AUTH_HASH_PATTERN =
  /^#(confirmation_token|recovery_token|invite_token|email_change_token|access_token)=/

export function CallbackHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const hash = window.location.hash

    if (!AUTH_HASH_PATTERN.test(hash)) return

    const isRecovery = hash.includes('recovery_token=')
    const isInvite = hash.includes('invite_token=')

    if ((isRecovery || isInvite) && window.location.pathname !== '/reset-password') {
      window.location.assign(`/reset-password${hash}`)
      return
    }

    void handleAuthCallback().catch((error) => {
      console.error('Auth callback failed:', error)
    })
  }, [])

  return <>{children}</>
}
