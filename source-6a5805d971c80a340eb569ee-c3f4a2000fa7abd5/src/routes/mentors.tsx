import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../lib/identity-context'

export const Route = createFileRoute('/mentors')({
  component: MentorDirectoryPage,
})

const SUBJECTS_FILTER = [
  'All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics',
  'Business', 'English', 'History', 'Computer Science', 'Accounting',
]

type Mentor = {
  id: number
  identityUserId: string
  fullName: string
  email: string
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

export default function MentorDirectoryPage() {
  const { user, ready } = useIdentity()
  const navigate = useNavigate()
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [subjectFilter, setSubjectFilter] = useState('All')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!ready) return
    if (!user) {
      navigate({ to: '/login' })
      return
    }

    const params = new URLSearchParams()
    if (subjectFilter !== 'All') params.set('subject', subjectFilter)
    if (search) params.set('search', search)

    fetch(`/api/mentors/directory?${params}`)
      .then((r) => {
        if (r.status === 401) { navigate({ to: '/login' }); return null }
        return r.json()
      })
      .then((data) => {
        if (data) setMentors(data)
        setLoading(false)
      })
      .catch(() => { setError('Failed to load mentors.'); setLoading(false) })
  }, [ready, user, subjectFilter, search, navigate])

  const parseSubjects = (raw: string): string[] => {
    try { return JSON.parse(raw) } catch { return raw.split(',').map((s) => s.trim()) }
  }

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  if (!ready || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400">Loading mentor directory…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-teal-400 font-semibold tracking-wider uppercase text-sm">Mentor Directory</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 mb-4 text-white">
            Find Your <span className="gradient-text">Perfect Mentor</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse our community of approved IGCSE mentors. Each mentor has been vetted and approved by our admin team.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search mentors by name, bio, or subject…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </div>

        {/* Subject filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SUBJECTS_FILTER.map((s) => (
            <button
              key={s}
              onClick={() => setSubjectFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                subjectFilter === s
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'glass border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/30'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {error && (
          <div className="text-center py-12 text-red-400">{error}</div>
        )}

        {/* Mentors grid */}
        {mentors.length === 0 && !error ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">No mentors found</h3>
            <p className="text-slate-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => {
              const subjects = parseSubjects(mentor.subjects)
              const grades: Record<string, string> = (() => { try { return JSON.parse(mentor.igcseGrades) } catch { return {} } })()

              return (
                <div key={mentor.id} className="glass rounded-3xl p-6 card-glow glass-hover flex flex-col">
                  {/* Profile header */}
                  <div className="flex items-start gap-4 mb-4">
                    {mentor.profilePicUrl ? (
                      <img
                        src={mentor.profilePicUrl}
                        alt={mentor.fullName}
                        className="w-14 h-14 rounded-2xl object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                        {getInitials(mentor.fullName)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg leading-tight truncate">{mentor.fullName}</h3>
                      <p className="text-slate-400 text-sm mt-0.5">{mentor.availability || 'Flexible availability'}</p>
                    </div>
                  </div>

                  {/* Subjects */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {subjects.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                    {subjects.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 text-xs">
                        +{subjects.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  {mentor.bio && (
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">{mentor.bio}</p>
                  )}

                  {/* Grades */}
                  {Object.keys(grades).length > 0 && (
                    <div className="mb-4 p-3 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">IGCSE Grades</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(grades).slice(0, 4).map(([sub, grade]) => (
                          <span key={sub} className="text-xs">
                            <span className="text-slate-400">{sub}:</span>{' '}
                            <span className="text-teal-400 font-bold">{grade}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reason */}
                  {mentor.reason && (
                    <div className="mb-4 p-3 rounded-xl bg-white/5">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Why I Mentor</p>
                      <p className="text-slate-300 text-xs line-clamp-2">{mentor.reason}</p>
                    </div>
                  )}

                  <div className="flex-1" />

                  {/* Contact buttons */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {mentor.contactEmail && (
                      <a href={`mailto:${mentor.contactEmail}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-slate-300 hover:text-white text-xs transition-all hover:border-blue-500/30">
                        📧 Email
                      </a>
                    )}
                    {mentor.telegram && (
                      <a href={`https://t.me/${mentor.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-slate-300 hover:text-white text-xs transition-all hover:border-blue-500/30">
                        ✈ Telegram
                      </a>
                    )}
                    {mentor.whatsapp && (
                      <a href={`https://wa.me/${mentor.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-slate-300 hover:text-white text-xs transition-all hover:border-green-500/30">
                        💬 WhatsApp
                      </a>
                    )}
                    {mentor.instagram && (
                      <a href={`https://instagram.com/${mentor.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-slate-300 hover:text-white text-xs transition-all hover:border-pink-500/30">
                        📸 Instagram
                      </a>
                    )}
                    {mentor.linkedin && (
                      <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-slate-300 hover:text-white text-xs transition-all hover:border-blue-500/30">
                        💼 LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
