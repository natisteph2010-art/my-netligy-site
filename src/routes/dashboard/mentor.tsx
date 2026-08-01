import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../../lib/identity-context'
import { AnnouncementBanner } from '../../components/AnnouncementBanner'

export const Route = createFileRoute('/dashboard/mentor')({
  component: MentorDashboard,
})

type Profile = {
  bio: string
  igcseGrades: string
  subjects: string
  reason: string
  availability: string
  profilePicUrl: string | null
  instagram: string | null
  telegram: string | null
  whatsapp: string | null
  contactEmail: string | null
  linkedin: string | null
  totalHoursTaught?: number
}

type SessionRecord = {
  id: number
  mentorIdentityUserId: string
  studentName: string
  studentContact: string
  subject: string
  topicDescription: string
  scheduledAt: string
  status: 'PENDING' | 'UPCOMING' | 'COMPLETED' | 'DECLINED'
  reminderSentAt?: string | null
  actualDurationMinutes?: number | null
  topicsCovered?: string | null
  evidenceLink?: string | null
  createdAt?: string
  updatedAt?: string
  approvedAt?: string | null
  completedAt?: string | null
}

const AVAILABLE_SUBJECTS = [
  'Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Economics', 'Business Studies', 'English Language', 'English Literature',
  'History', 'Geography', 'Computer Science', 'ICT',
]

export default function MentorDashboard() {
  const { user, ready, logout } = useIdentity()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState<Partial<Profile>>({})
  const [saveMsg, setSaveMsg] = useState('')
  const [subjectsList, setSubjectsList] = useState<string[]>([])
  const [gradeInputs, setGradeInputs] = useState<{ subject: string; grade: string }[]>([])
  const [sessionsView, setSessionsView] = useState<'requests' | 'completed'>('requests')
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [sessionActionMsg, setSessionActionMsg] = useState('')
  const [logDrafts, setLogDrafts] = useState<Record<number, { actualDurationMinutes: string; topicsCovered: string; evidenceLink: string }>>({})

  useEffect(() => {
    if (ready && !user) { navigate({ to: '/login' }); return }
    if (ready && user) {
      fetch(`/api/mentors/profile/${user.id}`)
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (data) {
            setProfile(data)
            setForm(data)
            try { setSubjectsList(JSON.parse(data.subjects)) } catch { setSubjectsList(data.subjects?.split(',').map((s: string) => s.trim()) || []) }
            try {
              const g = JSON.parse(data.igcseGrades || '{}')
              setGradeInputs(Object.entries(g).map(([subject, grade]) => ({ subject, grade: grade as string })))
            } catch { }
          }
        })

      fetch(`/api/mentors/sessions?mentorId=${user.id}`)
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (data?.sessions) setSessions(data.sessions)
        })
    }
  }, [ready, user, navigate])

  const set = (field: keyof Profile, value: any) => setForm((f) => ({ ...f, [field]: value }))

  const toggleSubject = (s: string) => {
    setSubjectsList((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)
    const gradesObj: Record<string, string> = {}
    gradeInputs.forEach(({ subject, grade }) => { if (subject && grade) gradesObj[subject] = grade })

    await fetch(`/api/mentors/profile/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        subjects: subjectsList,
        igcseGrades: JSON.stringify(gradesObj),
      }),
    })
    setSaveMsg('Profile saved!')
    setEditing(false)
    setSaving(false)
    setTimeout(() => setSaveMsg(''), 3000)
  }

  const pendingSessions = sessions.filter((session) => session.status === 'PENDING')
  const upcomingSessions = sessions.filter((session) => session.status === 'UPCOMING')
  const completedSessions = sessions.filter((session) => session.status === 'COMPLETED')
  const sessionNeedsLogging = upcomingSessions.filter((session) => new Date(session.scheduledAt).getTime() < Date.now())

  const updateSessionStatus = async (sessionId: number, action: 'approve' | 'decline' | 'complete', payload?: Record<string, unknown>) => {
    const response = await fetch(`/api/mentors/sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      setSessionActionMsg(data.error || 'Action failed.')
      return
    }

    setSessionActionMsg(action === 'approve' ? 'Request approved.' : action === 'decline' ? 'Request declined.' : 'Session logged successfully.')
    fetch(`/api/mentors/sessions?mentorId=${user.id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.sessions) setSessions(data.sessions)
      })
  }

  const handleLogSubmit = async (sessionId: number) => {
    const draft = logDrafts[sessionId]
    if (!draft) return
    await updateSessionStatus(sessionId, 'complete', {
      actualDurationMinutes: Number(draft.actualDurationMinutes),
      topicsCovered: draft.topicsCovered,
      evidenceLink: draft.evidenceLink,
    })
  }

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 stars-bg">
      <div className="max-w-4xl mx-auto">
        <AnnouncementBanner className="mb-8" />
        <div className="flex items-start justify-between mb-10">
          <div>
            <span className="text-slate-400 text-sm">Mentor Dashboard</span>
            <h1 className="text-3xl font-black text-white mt-1">
              Hello, <span className="gradient-text">{user.name || user.email}</span> 🎓
            </h1>
          </div>
          <button
            onClick={() => logout().then(() => window.location.href = '/')}
            className="px-4 py-2 rounded-lg border border-white/10 text-slate-300 hover:text-white text-sm transition-all"
          >
            Sign Out
          </button>
        </div>

        {saveMsg && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm">
            ✓ {saveMsg}
          </div>
        )}

        {!profile ? (
          <div className="glass rounded-3xl p-8 text-center">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-white font-bold text-xl mb-2">Profile Under Review</h3>
            <p className="text-slate-400 leading-relaxed">
              Your mentor application is being reviewed by our admin team. Once approved, you'll be able to set up your profile and appear in the mentor directory.
            </p>
            <p className="text-slate-500 text-sm mt-4">Expected review time: 3–5 business days</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Profile card */}
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">My Profile</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    editing
                      ? 'bg-white/10 text-slate-300 hover:text-white'
                      : 'bg-blue-600 text-white hover:opacity-90 shadow-lg shadow-blue-500/20'
                  }`}
                >
                  {editing ? 'Cancel' : '✏ Edit Profile'}
                </button>
              </div>

              {editing ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Profile Picture URL</label>
                    <input
                      value={form.profilePicUrl || ''}
                      onChange={(e) => set('profilePicUrl', e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Biography</label>
                    <textarea
                      value={form.bio || ''}
                      onChange={(e) => set('bio', e.target.value)}
                      rows={4}
                      placeholder="Tell students about yourself..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">
                      IGCSE Grades <span className="text-slate-500">(subject + grade)</span>
                    </label>
                    <div className="space-y-2 mb-3">
                      {gradeInputs.map((g, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            value={g.subject}
                            onChange={(e) => {
                              const copy = [...gradeInputs]
                              copy[i] = { ...copy[i], subject: e.target.value }
                              setGradeInputs(copy)
                            }}
                            placeholder="Subject"
                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                          />
                          <input
                            value={g.grade}
                            onChange={(e) => {
                              const copy = [...gradeInputs]
                              copy[i] = { ...copy[i], grade: e.target.value }
                              setGradeInputs(copy)
                            }}
                            placeholder="A*"
                            className="w-20 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm"
                          />
                          <button onClick={() => setGradeInputs(gradeInputs.filter((_, idx) => idx !== i))} className="px-3 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-colors">✕</button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGradeInputs([...gradeInputs, { subject: '', grade: '' }])}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      + Add Grade
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Subjects You Teach</label>
                    <div className="flex flex-wrap gap-2">
                      {AVAILABLE_SUBJECTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            subjectsList.includes(s)
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                              : 'bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Why I Help Students</label>
                    <textarea
                      value={form.reason || ''}
                      onChange={(e) => set('reason', e.target.value)}
                      rows={3}
                      placeholder="What motivates you to mentor?"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Availability</label>
                    <input
                      value={form.availability || ''}
                      onChange={(e) => set('availability', e.target.value)}
                      placeholder="e.g., Weekday evenings, Saturday mornings"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  {/* Social media */}
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-3">Contact &amp; Social Media</label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { field: 'contactEmail', label: '📧 Email', placeholder: 'contact@example.com' },
                        { field: 'instagram', label: '📸 Instagram', placeholder: '@username' },
                        { field: 'telegram', label: '✈ Telegram', placeholder: '@username' },
                        { field: 'whatsapp', label: '💬 WhatsApp', placeholder: '+1234567890' },
                        { field: 'linkedin', label: '💼 LinkedIn', placeholder: 'https://linkedin.com/in/...' },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className="block text-slate-400 text-xs mb-1">{label}</label>
                          <input
                            value={(form as any)[field] || ''}
                            onChange={(e) => set(field as keyof Profile, e.target.value)}
                            placeholder={placeholder}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 text-sm transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                  >
                    {saving ? 'Saving…' : 'Save Profile ✓'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
                      <p className="text-white font-medium">{user.email}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Availability</p>
                      <p className="text-white font-medium">{profile.availability || 'Not set'}</p>
                    </div>
                  </div>
                  {profile.bio && (
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Biography</p>
                      <p className="text-white text-sm leading-relaxed">{profile.bio}</p>
                    </div>
                  )}
                  {subjectsList.length > 0 && (
                    <div className="p-4 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Subjects</p>
                      <div className="flex flex-wrap gap-2">
                        {subjectsList.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-slate-500 text-sm">Your profile is visible in the mentor directory.</p>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-lg">✓</div>
              <div>
                <p className="text-white font-semibold">Approved Mentor</p>
                <p className="text-slate-400 text-sm">Your profile is live in the mentor directory</p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-300">
                  Total Hours Taught: <span className="font-semibold text-white">{(profile.totalHoursTaught ?? 0).toFixed(1)}</span>
                </div>
                <Link to="/mentors" className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-sm transition-colors">
                  View Directory →
                </Link>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-300">Sessions</p>
                  <h2 className="text-2xl font-black text-white">Requests &amp; Logbook</h2>
                </div>
                <div className="flex rounded-xl bg-white/5 p-1">
                  <button type="button" onClick={() => setSessionsView('requests')} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === 'requests' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>Requests &amp; Upcoming</button>
                  <button type="button" onClick={() => setSessionsView('completed')} className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${sessionsView === 'completed' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}>Completed Logs</button>
                </div>
              </div>

              {sessionActionMsg && <p className="mb-4 rounded-xl bg-sky-500/10 px-3 py-2 text-sm text-sky-200">{sessionActionMsg}</p>}

              {sessionsView === 'requests' ? (
                <div className="space-y-4">
                  {pendingSessions.length === 0 && upcomingSessions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400">
                      No session requests or upcoming sessions yet.
                    </div>
                  ) : null}

                  {pendingSessions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Pending Requests</h3>
                      {pendingSessions.map((session) => (
                        <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="text-white font-semibold">{session.studentName}</div>
                              <div className="text-sm text-slate-400">{session.studentContact} · {session.subject} · {new Date(session.scheduledAt).toLocaleString()}</div>
                              <p className="mt-2 text-sm text-slate-300">{session.topicDescription}</p>
                            </div>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => updateSessionStatus(session.id, 'approve')} className="rounded-lg bg-teal-500 px-3 py-2 text-sm font-semibold text-white">Approve</button>
                              <button type="button" onClick={() => updateSessionStatus(session.id, 'decline')} className="rounded-lg bg-red-500/20 px-3 py-2 text-sm font-semibold text-red-300">Decline</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {upcomingSessions.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Upcoming Sessions</h3>
                      {upcomingSessions.map((session) => (
                        <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <div className="text-white font-semibold">{session.studentName}</div>
                              <div className="text-sm text-slate-400">{session.subject} · {new Date(session.scheduledAt).toLocaleString()}</div>
                              <p className="mt-2 text-sm text-slate-300">{session.topicDescription}</p>
                            </div>
                            {sessionNeedsLogging.some((item) => item.id === session.id) && (
                              <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3 text-sm text-amber-100">
                                <div className="font-semibold">Log Notes &amp; Evidence</div>
                                <div className="mt-2 space-y-2">
                                  <input value={logDrafts[session.id]?.actualDurationMinutes ?? ''} onChange={(e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: e.target.value, topicsCovered: prev[session.id]?.topicsCovered ?? '', evidenceLink: prev[session.id]?.evidenceLink ?? '' } }))} placeholder="Actual duration (minutes)" className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" />
                                  <textarea rows={3} value={logDrafts[session.id]?.topicsCovered ?? ''} onChange={(e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? '', topicsCovered: e.target.value, evidenceLink: prev[session.id]?.evidenceLink ?? '' } }))} placeholder="Topics covered" className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" />
                                  <input value={logDrafts[session.id]?.evidenceLink ?? ''} onChange={(e) => setLogDrafts((prev) => ({ ...prev, [session.id]: { actualDurationMinutes: prev[session.id]?.actualDurationMinutes ?? '', topicsCovered: prev[session.id]?.topicsCovered ?? '', evidenceLink: e.target.value } }))} placeholder="Evidence link (optional)" className="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white" />
                                  <button type="button" onClick={() => handleLogSubmit(session.id)} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Submit Log</button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {completedSessions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-slate-400">
                      No completed logs yet.
                    </div>
                  ) : null}
                  {completedSessions.map((session) => (
                    <div key={session.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="text-white font-semibold">{session.studentName}</div>
                          <div className="text-sm text-slate-400">{session.subject} · Completed {new Date(session.completedAt || session.scheduledAt).toLocaleString()}</div>
                        </div>
                        <div className="text-sm text-slate-300">Duration: {session.actualDurationMinutes ?? 0} min</div>
                      </div>
                      <p className="mt-3 text-sm text-slate-300">{session.topicsCovered || 'No notes recorded.'}</p>
                      {session.evidenceLink && <a href={session.evidenceLink} className="mt-2 inline-block text-sm text-sky-300">View evidence</a>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
