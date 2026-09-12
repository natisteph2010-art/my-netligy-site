import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import type { PublicAmbassador } from '../lib/ambassadors'

export const Route = createFileRoute('/ambassadors')({
  component: AmbassadorsPage,
})


const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)

const location = (a: PublicAmbassador) => [a.city, a.country].filter(Boolean).join(', ')

const socialLinks = (a: PublicAmbassador) =>
  [
    a.contactEmail && { label: 'Email', icon: '📧', href: `mailto:${a.contactEmail}` },
    a.instagram && { label: 'Instagram', icon: '📸', href: `https://instagram.com/${a.instagram.replace(/^@/, '')}` },
    a.telegram && { label: 'Telegram', icon: '✈', href: `https://t.me/${a.telegram.replace(/^@/, '')}` },
    a.whatsapp && { label: 'WhatsApp', icon: '💬', href: `https://wa.me/${a.whatsapp.replace(/[^\d]/g, '')}` },
    a.linkedin && { label: 'LinkedIn', icon: '💼', href: a.linkedin.startsWith('http') ? a.linkedin : `https://${a.linkedin}` },
    a.website && { label: 'Website', icon: '🌐', href: a.website.startsWith('http') ? a.website : `https://${a.website}` },
  ].filter(Boolean) as { label: string; icon: string; href: string }[]

function Avatar({ ambassador, className }: { ambassador: PublicAmbassador; className: string }) {
  if (ambassador.photoUrl) {
    return (
      <img
        src={ambassador.photoUrl}
        alt={ambassador.fullName}
        loading="lazy"
        className={`${className} object-cover`}
      />
    )
  }
  return (
    <div className={`${className} bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center font-black text-white`}>
      {initials(ambassador.fullName)}
    </div>
  )
}

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<PublicAmbassador[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('All')
  const [selected, setSelected] = useState<PublicAmbassador | null>(null)

  useEffect(() => {
    fetch('/api/ambassadors')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('failed'))))
      .then((data: PublicAmbassador[]) => setAmbassadors(Array.isArray(data) ? data : []))
      .catch(() => setError('We could not load the ambassador team right now. Please try again shortly.'))
      .finally(() => setLoading(false))
  }, [])

  const countries = useMemo(
    () => ['All', ...Array.from(new Set(ambassadors.map((a) => a.country).filter(Boolean) as string[])).sort()],
    [ambassadors],
  )

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase()
    return ambassadors.filter((a) => {
      if (countryFilter !== 'All' && a.country !== countryFilter) return false
      if (!needle) return true
      return [a.fullName, a.title, a.school, a.bio, ...a.subjects, ...a.achievements, ...a.languages]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle))
    })
  }, [ambassadors, search, countryFilter])

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 stars-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
            Our People
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-white leading-tight">
            Meet the <span className="gradient-text-gold">GradeBridge Ambassadors</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ambassadors are the students and graduates who carry GradeBridge into their schools and communities —
            running study circles, answering questions, and helping new students find the right mentor.
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-10 flex flex-col sm:flex-row gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, school, subject or achievement…"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
          />
          {countries.length > 1 && (
            <select
              value={countryFilter}
              onChange={(event) => setCountryFilter(event.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500/50 text-sm"
            >
              {countries.map((country) => (
                <option key={country} value={country} className="bg-slate-900">{country}</option>
              ))}
            </select>
          )}
        </div>

        {/* States */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="glass rounded-3xl p-10 text-center text-slate-300">{error}</div>
        ) : visible.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h2 className="text-white font-bold text-xl mb-2">
              {ambassadors.length === 0 ? 'Ambassadors coming soon' : 'No ambassadors match that search'}
            </h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              {ambassadors.length === 0
                ? 'Our team is being introduced here shortly. Check back soon to meet the people representing GradeBridge.'
                : 'Try a different name, subject or country.'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((ambassador) => (
              <button
                key={ambassador.id}
                onClick={() => setSelected(ambassador)}
                className="glass glass-hover card-glow rounded-3xl p-6 text-left flex flex-col group"
              >
                <div className="flex items-center gap-4">
                  <Avatar ambassador={ambassador} className="w-16 h-16 rounded-2xl flex-shrink-0 text-lg" />
                  <div className="min-w-0">
                    <h3 className="text-white font-bold text-lg truncate">{ambassador.fullName}</h3>
                    <p className="text-blue-300 text-sm truncate">{ambassador.title}</p>
                    {location(ambassador) && (
                      <p className="text-slate-500 text-xs mt-0.5 truncate">📍 {location(ambassador)}</p>
                    )}
                  </div>
                </div>

                {ambassador.featured && (
                  <span className="mt-4 self-start px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 text-[11px] font-semibold uppercase tracking-wider">
                    ★ Featured
                  </span>
                )}

                {ambassador.bio && (
                  <p className="mt-4 text-slate-400 text-sm leading-relaxed line-clamp-4">{ambassador.bio}</p>
                )}

                {ambassador.subjects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {ambassador.subjects.slice(0, 4).map((subject) => (
                      <span key={subject} className="px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs">{subject}</span>
                    ))}
                    {ambassador.subjects.length > 4 && (
                      <span className="px-2 py-0.5 rounded-lg bg-white/5 text-slate-400 text-xs">+{ambassador.subjects.length - 4}</span>
                    )}
                  </div>
                )}

                <span className="mt-5 text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                  View full profile →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="glass rounded-3xl max-w-2xl w-full my-8 p-8 relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Avatar ambassador={selected} className="w-24 h-24 rounded-3xl flex-shrink-0 text-2xl" />
              <div className="min-w-0">
                <h2 className="text-2xl font-black text-white">{selected.fullName}</h2>
                <p className="text-blue-300 font-medium">{selected.title}</p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                  {selected.school && <span>🏫 {selected.school}</span>}
                  {location(selected) && <span>📍 {location(selected)}</span>}
                  {selected.graduationYear && <span>🎓 Class of {selected.graduationYear}</span>}
                </div>
              </div>
            </div>

            {selected.bio && (
              <p className="mt-6 text-slate-300 leading-relaxed whitespace-pre-line">{selected.bio}</p>
            )}

            {selected.achievements.length > 0 && (
              <div className="mt-6">
                <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-3">Achievements</h3>
                <ul className="space-y-2">
                  {selected.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-amber-400">★</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {selected.subjects.length > 0 && (
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.subjects.map((subject) => (
                      <span key={subject} className="px-2 py-0.5 rounded-lg bg-blue-500/15 text-blue-300 text-xs">{subject}</span>
                    ))}
                  </div>
                </div>
              )}
              {selected.languages.length > 0 && (
                <div className="p-4 rounded-2xl bg-white/5">
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Languages</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.languages.map((language) => (
                      <span key={language} className="px-2 py-0.5 rounded-lg bg-teal-500/15 text-teal-300 text-xs">{language}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {socialLinks(selected).length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {socialLinks(selected).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-sm transition-colors"
                  >
                    {link.icon} {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
