import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { signup, AuthError } from '@netlify/identity'
import { useIdentity } from '../../lib/identity-context'

export const Route = createFileRoute('/register/student')({
  component: StudentRegisterPage,
})

const GRADE_LEVELS = [
  'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13',
]

export default function StudentRegisterPage() {
  const { user, ready } = useIdentity()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gradeLevel: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Create Identity account
      const identityUser = await signup(form.email, form.password, { full_name: form.fullName })

      // Save student record in DB
      await fetch('/api/register/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          age: parseInt(form.age, 10),
          gradeLevel: form.gradeLevel,
          email: form.email,
          identityUserId: identityUser?.id || 'pending',
        }),
      })

      setSubmitted(true)
    } catch (err) {
      if (err instanceof AuthError) {
        if (err.status === 422) setError('Invalid email or password. Password must be at least 8 characters.')
        else setError(err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 stars-bg">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow">
            🎉
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Welcome to GradeBridge!</h1>
          <p className="text-slate-300 mb-4 leading-relaxed">
            Your account has been created. Please check your email to confirm your account — then you'll be able to sign in and access the mentor directory.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Once confirmed, sign in to find mentors, book sessions, and join our community.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/login" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity text-center">
              Sign In
            </Link>
            <Link to="/" className="inline-block px-8 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-24 stars-bg grid-pattern">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-white font-bold text-lg">GradeBridge</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-teal-500/20 text-teal-300 text-sm font-medium mb-6">
            📖 Student Registration
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Join <span className="gradient-text">GradeBridge Today</span>
          </h1>
          <p className="text-slate-400">
            Register to access free mentoring, connect with experienced IGCSE graduates, and join our community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set('fullName', e.target.value)}
                required
                placeholder="Your full name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Age</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => set('age', e.target.value)}
                required
                min={12}
                max={20}
                placeholder="15"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Grade Level</label>
              <select
                value={form.gradeLevel}
                onChange={(e) => set('gradeLevel', e.target.value)}
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50 transition-all appearance-none"
              >
                <option value="">Select grade</option>
                {GRADE_LEVELS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-teal-500/20 btn-shimmer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account…
              </span>
            ) : 'Create My Account 🚀'}
          </button>

          <p className="text-center text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Sign in</Link>
          </p>
        </form>

        {/* Benefits reminder */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🆓', label: 'Always Free' },
            { icon: '🎓', label: 'Expert Mentors' },
            { icon: '💬', label: 'Live Q&As' },
          ].map((b) => (
            <div key={b.label} className="glass rounded-2xl p-4">
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="text-slate-400 text-xs">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
