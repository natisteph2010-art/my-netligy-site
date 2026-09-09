import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useIdentity } from '../../lib/identity-context'
import { AnnouncementBanner } from '../../components/AnnouncementBanner'

type StudentSession = {
  id: number
  mentorName: string | null
  subject: string
  topicDescription: string
  scheduledAt: string
  status: string
  actualDurationMinutes: number | null
  topicsCovered: string | null
  evidenceFileName: string | null
  evidenceReviewedAt: string | null
}

export const Route = createFileRoute('/dashboard/student')({
  component: StudentDashboard,
})

export default function StudentDashboard() {
  const { user, ready, logout } = useIdentity()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<StudentSession[]>([])

  useEffect(() => {
    if (ready && !user) navigate({ to: '/login' })
    if (ready && user) {
      fetch('/api/students/sessions')
        .then((response) => response.ok ? response.json() : null)
        .then((data) => setSessions(data?.sessions || []))
    }
  }, [ready, user, navigate])

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg">
      <div className="max-w-5xl mx-auto">
        <AnnouncementBanner className="mb-8" />
        {/* Welcome */}
        <div className="mb-10">
          <span className="text-slate-400 text-sm">Student Dashboard</span>
          <h1 className="text-3xl font-black text-white mt-1">
            Welcome back, <span className="gradient-text">{user.name || user.email}</span> 👋
          </h1>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '📚', label: 'Weekly Sessions', value: '52/yr' },
            { icon: '💬', label: 'Monthly Q&As', value: '12/yr' },
            { icon: '🎓', label: 'Available Mentors', value: '25+' },
            { icon: '🆓', label: 'Cost', value: 'Free' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center card-glow">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-black text-white">{s.value}</div>
              <div className="text-slate-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/mentors"
            className="glass rounded-3xl p-8 card-glow glass-hover group block"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              🎓
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Browse Mentor Directory</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find your perfect mentor by subject, availability, or grade. Connect directly through their profile.
            </p>
            <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
              View Directory →
            </div>
          </Link>

          <div className="glass rounded-3xl p-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-2xl mb-4 shadow-lg shadow-teal-500/20">
              📅
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Upcoming Sessions</h3>
            <div className="space-y-3 mt-4">
              {sessions.length === 0 ? (
                <p className="text-sm text-slate-400">No session requests yet. Book a mentor session to see its live status here.</p>
              ) : sessions.map((session) => (
                <div key={session.id} className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-white text-sm font-medium">{session.subject} with {session.mentorName || 'your mentor'}</p>
                      <p className="text-slate-400 text-xs mt-1">{new Date(session.scheduledAt).toLocaleString()}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                      session.status === 'UPCOMING' ? 'bg-teal-500/15 text-teal-300' :
                      session.status === 'COMPLETED' ? 'bg-emerald-500/15 text-emerald-300' :
                      session.status === 'DECLINED' ? 'bg-red-500/15 text-red-300' :
                      session.status === 'PENDING_REVIEW' ? 'bg-amber-500/15 text-amber-200' :
                      'bg-blue-500/15 text-blue-300'
                    }`}>{session.status === 'PENDING_REVIEW' ? 'Under review' : session.status}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-2">{session.topicDescription}</p>
                  {session.status === 'COMPLETED' && <p className="text-emerald-300 text-xs mt-2">Session verified: {session.actualDurationMinutes || 0} minutes.</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Account info */}
        <div className="glass rounded-3xl p-8">
          <h3 className="text-white font-bold text-lg mb-4">My Account</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Name</p>
              <p className="text-white font-medium">{user.name || '—'}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Account Type</p>
              <p className="text-teal-400 font-medium">Student</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Membership</p>
              <p className="text-green-400 font-medium">Free · Active</p>
            </div>
          </div>
          <button
            onClick={() => logout().then(() => window.location.href = '/')}
            className="mt-6 px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
