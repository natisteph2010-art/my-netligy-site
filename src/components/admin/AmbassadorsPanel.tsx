import { useEffect, useMemo, useRef, useState } from 'react'
import type { AdminAmbassador } from '../../lib/ambassadors'

type Draft = {
  fullName: string
  title: string
  school: string
  country: string
  city: string
  graduationYear: string
  bio: string
  achievements: string
  subjects: string
  languages: string
  photoUrl: string
  contactEmail: string
  instagram: string
  telegram: string
  whatsapp: string
  linkedin: string
  website: string
  featured: boolean
  isPublic: boolean
  sortOrder: string
}

const EMPTY: Draft = {
  fullName: '', title: 'Student Ambassador', school: '', country: '', city: '', graduationYear: '',
  bio: '', achievements: '', subjects: '', languages: '', photoUrl: '', contactEmail: '',
  instagram: '', telegram: '', whatsapp: '', linkedin: '', website: '',
  featured: false, isPublic: true, sortOrder: '0',
}

const toDraft = (a: AdminAmbassador): Draft => ({
  fullName: a.fullName,
  title: a.title || 'Student Ambassador',
  school: a.school || '',
  country: a.country || '',
  city: a.city || '',
  graduationYear: a.graduationYear || '',
  bio: a.bio || '',
  achievements: a.achievements.join('\n'),
  subjects: a.subjects.join(', '),
  languages: a.languages.join(', '),
  photoUrl: a.photoUrl || '',
  contactEmail: a.contactEmail || '',
  instagram: a.instagram || '',
  telegram: a.telegram || '',
  whatsapp: a.whatsapp || '',
  linkedin: a.linkedin || '',
  website: a.website || '',
  featured: a.featured,
  isPublic: a.isPublic,
  sortOrder: String(a.sortOrder ?? 0),
})

const splitLines = (value: string) => value.split('\n').map((v) => v.trim()).filter(Boolean)
const splitCommas = (value: string) => value.split(',').map((v) => v.trim()).filter(Boolean)

const initials = (name: string) =>
  name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2) || '?'

const field =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all'
const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5'

export function AmbassadorsPanel({ search, flash }: { search: string; flash: (message: string) => void }) {
  const [items, setItems] = useState<AdminAmbassador[]>([])
  const [loading, setLoading] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formError, setFormError] = useState('')
  const fileRef = useRef<HTMLInputElement | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ambassadors?scope=all')
      const data = await response.json().catch(() => [])
      setItems(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const visible = useMemo(() => {
    const needle = search.trim().toLowerCase()
    if (!needle) return items
    return items.filter((a) =>
      [a.fullName, a.title, a.school, a.country, a.city, ...a.subjects]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(needle)),
    )
  }, [items, search])

  const openNew = () => {
    setEditingId(null)
    setDraft(EMPTY)
    setFormError('')
    setEditorOpen(true)
  }

  const openEdit = (ambassador: AdminAmbassador) => {
    setEditingId(ambassador.id)
    setDraft(toDraft(ambassador))
    setFormError('')
    setEditorOpen(true)
  }

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((d) => ({ ...d, [key]: value }))

  const uploadPhoto = async (file: File) => {
    setUploading(true)
    setFormError('')
    try {
      const body = new FormData()
      body.append('file', file)
      const response = await fetch('/api/ambassador-photos', { method: 'POST', body })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Upload failed')
      set('photoUrl', data.url)
    } catch (err: any) {
      setFormError(err.message || 'Could not upload that photo.')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const save = async () => {
    if (!draft.fullName.trim()) {
      setFormError('Full name is required.')
      return
    }
    setSaving(true)
    setFormError('')
    const payload = {
      ...draft,
      achievements: splitLines(draft.achievements),
      subjects: splitCommas(draft.subjects),
      languages: splitCommas(draft.languages),
      sortOrder: Number(draft.sortOrder) || 0,
    }
    try {
      const response = await fetch(editingId ? `/api/ambassadors/${editingId}` : '/api/ambassadors', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Save failed')
      flash(editingId ? 'Ambassador updated.' : 'Ambassador added.')
      setEditorOpen(false)
      setEditingId(null)
      load()
    } catch (err: any) {
      setFormError(err.message || 'Could not save this ambassador.')
    } finally {
      setSaving(false)
    }
  }

  const patch = async (id: number, body: Record<string, unknown>) => {
    const response = await fetch(`/api/ambassadors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) load()
    else flash('Could not update that ambassador.')
  }

  const remove = async (ambassador: AdminAmbassador) => {
    if (!window.confirm(`Remove ${ambassador.fullName} from the ambassador page permanently?`)) return
    const response = await fetch(`/api/ambassadors/${ambassador.id}`, { method: 'DELETE' })
    if (response.ok) { flash('Ambassador removed.'); load() }
    else flash('Could not remove that ambassador.')
  }

  return (
    <div className="space-y-6 admin-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Ambassadors</h2>
          <p className="text-slate-500 text-sm mt-1">
            Everyone added here appears on the public <span className="font-medium text-slate-700">/ambassadors</span> page.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            Refresh
          </button>
          <button onClick={openNew} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            + Add Ambassador
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <p className="font-semibold text-slate-800">
            {items.length === 0 ? 'No ambassadors yet' : 'No ambassadors match your search'}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {items.length === 0
              ? 'Add your first ambassador to publish the public ambassador page.'
              : 'Try a different name, school or country.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((ambassador) => (
            <div key={ambassador.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
              <div className="flex items-start gap-4">
                {ambassador.photoUrl ? (
                  <img src={ambassador.photoUrl} alt={ambassador.fullName} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    {initials(ambassador.fullName)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900 truncate">{ambassador.fullName}</p>
                  <p className="text-sm text-slate-500 truncate">{ambassador.title}</p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {[ambassador.school, ambassador.city, ambassador.country].filter(Boolean).join(' · ') || 'No location set'}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${ambassador.isPublic ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                  {ambassador.isPublic ? 'Published' : 'Hidden'}
                </span>
                {ambassador.featured && (
                  <span className="px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-medium">Featured</span>
                )}
                {ambassador.subjects.slice(0, 3).map((subject) => (
                  <span key={subject} className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-xs">{subject}</span>
                ))}
              </div>

              {ambassador.bio && <p className="mt-3 text-sm text-slate-500 line-clamp-3">{ambassador.bio}</p>}

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <button onClick={() => openEdit(ambassador)} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors">
                  Edit
                </button>
                <button onClick={() => patch(ambassador.id, { isPublic: !ambassador.isPublic })} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors">
                  {ambassador.isPublic ? 'Hide' : 'Publish'}
                </button>
                <button onClick={() => patch(ambassador.id, { featured: !ambassador.featured })} className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors">
                  {ambassador.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button onClick={() => remove(ambassador)} className="ml-auto px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={() => setEditorOpen(false)}>
          <div className="bg-white rounded-3xl w-full max-w-3xl my-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit ambassador' : 'Add ambassador'}</h3>
              <button onClick={() => setEditorOpen(false)} className="w-9 h-9 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors" aria-label="Close">✕</button>
            </div>

            <div className="px-7 py-6 space-y-6">
              {formError && <p className="rounded-xl bg-red-50 text-red-600 text-sm px-4 py-3">{formError}</p>}

              {/* Photo */}
              <div className="flex items-center gap-5">
                {draft.photoUrl ? (
                  <img src={draft.photoUrl} alt="" className="w-20 h-20 rounded-2xl object-cover border border-slate-200" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">👤</div>
                )}
                <div className="flex-1">
                  <label className={labelCls}>Profile picture</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={(event) => { const file = event.target.files?.[0]; if (file) uploadPhoto(file) }}
                      className="text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                    />
                    {uploading && <span className="text-xs text-slate-500">Uploading…</span>}
                    {draft.photoUrl && !uploading && (
                      <button onClick={() => set('photoUrl', '')} className="text-xs text-red-600 hover:underline">Remove</button>
                    )}
                  </div>
                  <input
                    value={draft.photoUrl}
                    onChange={(event) => set('photoUrl', event.target.value)}
                    placeholder="…or paste an image URL"
                    className={`${field} mt-2`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full name *</label>
                  <input value={draft.fullName} onChange={(e) => set('fullName', e.target.value)} className={field} placeholder="Selam Tesfaye" />
                </div>
                <div>
                  <label className={labelCls}>Role / title</label>
                  <input value={draft.title} onChange={(e) => set('title', e.target.value)} className={field} placeholder="Student Ambassador" />
                </div>
                <div>
                  <label className={labelCls}>School</label>
                  <input value={draft.school} onChange={(e) => set('school', e.target.value)} className={field} placeholder="Addis International Academy" />
                </div>
                <div>
                  <label className={labelCls}>Graduation year</label>
                  <input value={draft.graduationYear} onChange={(e) => set('graduationYear', e.target.value)} className={field} placeholder="2025" />
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input value={draft.city} onChange={(e) => set('city', e.target.value)} className={field} placeholder="Addis Ababa" />
                </div>
                <div>
                  <label className={labelCls}>Country</label>
                  <input value={draft.country} onChange={(e) => set('country', e.target.value)} className={field} placeholder="Ethiopia" />
                </div>
              </div>

              <div>
                <label className={labelCls}>Biography</label>
                <textarea value={draft.bio} onChange={(e) => set('bio', e.target.value)} rows={5} className={`${field} resize-none`} placeholder="Who they are, what they do for GradeBridge, and how students can work with them." />
              </div>

              <div>
                <label className={labelCls}>Achievements <span className="normal-case tracking-normal font-normal text-slate-400">(one per line)</span></label>
                <textarea value={draft.achievements} onChange={(e) => set('achievements', e.target.value)} rows={4} className={`${field} resize-none`} placeholder={'9 A* at IGCSE\nFounded the school physics club\nMentored 40+ students'} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Subjects <span className="normal-case tracking-normal font-normal text-slate-400">(comma separated)</span></label>
                  <input value={draft.subjects} onChange={(e) => set('subjects', e.target.value)} className={field} placeholder="Physics, Mathematics" />
                </div>
                <div>
                  <label className={labelCls}>Languages <span className="normal-case tracking-normal font-normal text-slate-400">(comma separated)</span></label>
                  <input value={draft.languages} onChange={(e) => set('languages', e.target.value)} className={field} placeholder="English, Amharic" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  ['contactEmail', 'Contact email', 'ambassador@example.com'],
                  ['instagram', 'Instagram', '@username'],
                  ['telegram', 'Telegram', '@username'],
                  ['whatsapp', 'WhatsApp', '+251...'],
                  ['linkedin', 'LinkedIn', 'https://linkedin.com/in/...'],
                  ['website', 'Website', 'https://...'],
                ] as const).map(([key, label, placeholder]) => (
                  <div key={key}>
                    <label className={labelCls}>{label}</label>
                    <input value={draft[key]} onChange={(e) => set(key, e.target.value)} className={field} placeholder={placeholder} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={draft.isPublic} onChange={(e) => set('isPublic', e.target.checked)} className="w-4 h-4 rounded" />
                  Show on the public ambassador page
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" checked={draft.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 rounded" />
                  Feature at the top
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  Order
                  <input value={draft.sortOrder} onChange={(e) => set('sortOrder', e.target.value)} className="w-20 rounded-lg border border-slate-200 px-2 py-1 text-sm" />
                </label>
              </div>
            </div>

            <div className="px-7 py-5 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setEditorOpen(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={save} disabled={saving || uploading} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Add ambassador'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
