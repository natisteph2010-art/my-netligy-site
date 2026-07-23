import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../lib/identity-context'
import { ParticleNetwork } from '../components/ParticleNetwork'

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
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null)

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
          <span className="text-teal-400 font-semibold tracking-wider uppercase text-sm">Knowledge Constellation</span>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 mb-4 text-white">
            Find your <span className="gradient-text">next connection</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Each node is an approved IGCSE mentor. Choose a subject cluster, then open a profile to explore the person behind the expertise.
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
          <div className="constellation">
            <ParticleNetwork density={38} />
            <div className="constellation-lines" />
            {mentors.map((mentor) => {
              const subjects = parseSubjects(mentor.subjects)
              const isSelected = selectedMentor === mentor.id

              return (
                <button type="button" key={mentor.id} onClick={() => setSelectedMentor(isSelected ? null : mentor.id)} className={`constellation-node ${isSelected ? 'active' : ''}`} aria-pressed={isSelected}>
                  {mentor.profilePicUrl ? <img src={mentor.profilePicUrl} alt="" /> : <span className="constellation-avatar">{getInitials(mentor.fullName)}</span>}
                  <strong className="text-sm truncate max-w-full">{mentor.fullName}</strong>
                  <small>{subjects.slice(0, 2).join(' · ') || 'IGCSE Mentor'}</small>
                  <span className="text-[10px] text-sky-300">{isSelected ? 'Close profile' : 'Open profile'}</span>
                </button>
              )
            })}
            {selectedMentor !== null && (() => {
              const mentor = mentors.find((item) => item.id === selectedMentor)
              if (!mentor) return null
              const subjects = parseSubjects(mentor.subjects)
              return (
                <div className="absolute z-10 bottom-5 right-5 left-5 sm:left-auto sm:w-[360px] rounded-2xl border border-sky-300/30 bg-slate-950/90 p-5 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div><p className="text-xs uppercase tracking-[0.16em] text-sky-300">Selected node</p><h2 className="text-xl font-bold text-white mt-1">{mentor.fullName}</h2></div>
                    <button type="button" onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-white" aria-label="Close mentor profile">×</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">{subjects.map((subject) => <span key={subject} className="px-2 py-1 rounded-md bg-sky-400/10 text-sky-200 text-xs">{subject}</span>)}</div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{mentor.bio || mentor.reason || 'An approved mentor ready to share their experience.'}</p>
                  <p className="text-xs text-slate-400 mb-4">{mentor.availability || 'Flexible availability'}</p>
                  {mentor.contactEmail && <a href={`mailto:${mentor.contactEmail}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-semibold hover:bg-sky-400 transition-colors">Connect with {mentor.fullName.split(' ')[0]} →</a>}
                </div>
              )
            })()}
          </div>
        )}
      </div>
    </div>
  )
}
