import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { AuthError, handleAuthCallback, getUser } from '@netlify/identity'
import { GradeBridgeLogo } from '../components/GradeBridgeLogo'

export const Route = createFileRoute('/reset-password')({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [dashboardPath, setDashboardPath] = useState('/dashboard/mentor')

  useEffect(() => {
    const hash = window.location.hash
    const isRecovery = hash.includes('recovery_token=')
    const isInvite = hash.includes('invite_token=')
    if (!isRecovery && !isInvite) {
      setError('Invalid or expired password reset link.')
      setLoading(false)
      return
    }

    const completeCallback = async () => {
      setError('')
      setSuccess('Completing your reset link…')
      try {
        await handleAuthCallback()
        const user = await getUser()
        const role = user?.roles?.[0]
        setDashboardPath(role === 'admin' ? '/dashboard/admin' : role === 'mentor' ? '/dashboard/mentor' : '/dashboard/student')
        setSuccess('Enter a new password to finish signing in.')
        setReady(true)
        setLoading(false)
        window.history.replaceState({}, '', '/reset-password')
      } catch (err) {
        console.error('Password reset callback failed:', err)
        setError('We could not complete the reset link. Please request a new one.')
        setLoading(false)
      }
    }

    void completeCallback()
  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!ready) return
    setLoading(true)
    setError('')
    setSuccess('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    try {
      const identity = await import('@netlify/identity')
      const updateUser = (identity as any).updateUser
      if (typeof updateUser !== 'function') {
        throw new Error('Unable to update password in this environment.')
      }

      await updateUser({ password })
      setSuccess('Password updated successfully. Redirecting…')
      setPassword('')
      setConfirmPassword('')
      navigate({ to: dashboardPath })
    } catch (err) {
      if (err instanceof AuthError) {
        setError(err.message)
      } else {
        setError('Unable to update your password. Please try again.')
      }
      console.error('Password update failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 stars-bg grid-pattern">
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <GradeBridgeLogo />
          </Link>
          <p className="text-slate-400 mt-2 text-sm">Reset your mentor password after approval.</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20">
          <h1 className="text-2xl font-semibold text-white mb-4">Set a new password</h1>
          <p className="text-slate-400 mb-6">Use the link from your approval email to create a secure password.</p>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!ready || loading}
                required
                minLength={8}
                placeholder="Create a new password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={!ready || loading}
                required
                minLength={8}
                placeholder="Confirm your new password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!ready || loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer mt-2"
            >
              {loading ? 'Processing…' : 'Save new password'}
            </button>
          </form>

          <div className="mt-6 text-center text-slate-400 text-sm">
            <Link to="/login" className="hover:text-white transition-colors">Back to Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
