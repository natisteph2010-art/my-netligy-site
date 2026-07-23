import { useEffect, useState } from 'react'

type Announcement = {
  id: number
  title: string
  body: string
  pinned: boolean
}

/**
 * Displays active platform announcements. Rendered on the landing page and the
 * student & mentor dashboards. Pulls from the public /api/announcements feed
 * (published, not expired, not archived) and lets users dismiss each item.
 */
export function AnnouncementBanner({ className = '' }: { className?: string }) {
  const [items, setItems] = useState<Announcement[]>([])
  const [dismissed, setDismissed] = useState<number[]>([])

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => Array.isArray(data) && setItems(data))
      .catch(() => {})
  }, [])

  const visible = items.filter((a) => !dismissed.includes(a.id))
  if (visible.length === 0) return null

  return (
    <div className={`space-y-3 ${className}`}>
      {visible.map((a) => (
        <div
          key={a.id}
          className={`glass rounded-2xl px-5 py-4 flex items-start gap-4 border ${
            a.pinned ? 'border-blue-500/40 shadow-lg shadow-blue-500/10' : 'border-white/10'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center flex-shrink-0 text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {a.pinned && <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Pinned</span>}
              <h4 className="text-white font-semibold">{a.title}</h4>
            </div>
            <p className="text-slate-300 text-sm mt-1 leading-relaxed">{a.body}</p>
          </div>
          <button
            onClick={() => setDismissed((d) => [...d, a.id])}
            className="text-slate-400 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}
