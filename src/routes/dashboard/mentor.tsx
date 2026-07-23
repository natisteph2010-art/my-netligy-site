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
}

const AVAILABLE_SUBJECTS = [
  'Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Economics', 'Business Studies', 'Accounting', 'English Language', 'English Literature',
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

            {/* Status */}
            <div className="glass rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-lg">✓</div>
              <div>
                <p className="text-white font-semibold">Approved Mentor</p>
                <p className="text-slate-400 text-sm">Your profile is live in the mentor directory</p>
              </div>
              <Link to="/mentors" className="ml-auto px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 text-sm transition-colors">
                View Directory →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
