import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useIdentity } from '../../lib/identity-context'
import { getServerUser } from '../../lib/auth'
import { GradeBridgeLogo } from '../../components/GradeBridgeLogo'

export const Route = createFileRoute('/dashboard/admin')({
  beforeLoad: async () => {
    const user = await getServerUser()
    if (!user) throw redirect({ to: '/login' })
    if (user.role !== 'admin' && !user.roles?.includes('admin')) {
      throw redirect({ to: '/' })
    }
  },
  component: AdminDashboard,
})

/* ---------------------------------------------------------------- types --- */

type Application = {
  id: number
  fullName: string
  email: string
  phone: string
  school: string
  subjects: string
  igcseGrades?: string
  statement: string
  availability: string
  status: string
  createdAt: string
}

type Announcement = {
  id: number
  title: string
  body: string
  publishDate: string | null
  expiresAt: string | null
  pinned: boolean
  archived: boolean
  authorEmail: string | null
  createdAt: string
}

type Stats = {
  pendingApplications: number
  activeMentors: number
  registeredStudents: number
  upcomingSessions: number
}

type Mentor = {
  id: number
  applicationId: number
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
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

type Student = {
  id: number
  identityUserId: string
  fullName: string
  age: number
  gradeLevel: string
  email: string
  createdAt: string
}

type View =
  | 'dashboard'
  | 'applications'
  | 'mentors'
  | 'students'
  | 'sessions'
  | 'announcements'
  | 'settings'

/* ---------------------------------------------------------------- icons --- */

const I = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  applications: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  mentors: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  students: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
  sessions: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  announcements: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z',
  settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  bell: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  chevron: 'M19 9l-7 7-7-7',
  plus: 'M12 4v16m8-8H4',
  pin: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  archive: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
  check: 'M5 13l4 4L19 7',
  x: 'M6 18L18 6M6 6l12 12',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  menu: 'M4 6h16M4 12h16M4 18h16',
}

function Icon({ path, className = 'w-5 h-5' }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  )
}

const NAV: { key: View; label: string; icon: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: I.dashboard },
  { key: 'applications', label: 'Mentor Applications', icon: I.applications },
  { key: 'mentors', label: 'Mentors', icon: I.mentors },
  { key: 'students', label: 'Students', icon: I.students },
  { key: 'sessions', label: 'Tutoring Sessions', icon: I.sessions },
  { key: 'announcements', label: 'Announcements', icon: I.announcements },
  { key: 'settings', label: 'Settings', icon: I.settings },
]

const VIEW_TITLES: Record<View, string> = {
  dashboard: 'Dashboard',
  applications: 'Mentor Applications',
  mentors: 'Mentors',
  students: 'Students',
  sessions: 'Tutoring Sessions',
  announcements: 'Announcements',
  settings: 'Settings',
}

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

const parseList = (raw: string): string[] => {
  if (!raw) return []
  try {
    const v = JSON.parse(raw)
    return Array.isArray(v) ? v : Object.entries(v).map(([k, g]) => `${k}: ${g}`)
  } catch {
    return raw.split(',').map((s) => s.trim()).filter(Boolean)
  }
}

/* ------------------------------------------------------------ component --- */

export default function AdminDashboard() {
  const { user, ready, logout } = useIdentity()
  const navigate = useNavigate()

  const [view, setView] = useState<View>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  const [stats, setStats] = useState<Stats | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'more_info'>('pending')
  const [appsLoading, setAppsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<number | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [passwordSetupWarning, setPasswordSetupWarning] = useState<{ applicationId: number; email: string } | null>(null)

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [annLoading, setAnnLoading] = useState(false)
  const [editing, setEditing] = useState<Announcement | null>(null)

  const [mentors, setMentors] = useState<Mentor[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [mentorsLoading, setMentorsLoading] = useState(false)
  const [studentsLoading, setStudentsLoading] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    if (!ready) return
    if (!user) { navigate({ to: '/login' }); return }
    if (user.role !== 'admin' && !user.roles?.includes('admin')) { navigate({ to: '/' }); return }
    loadStats()
  }, [ready, user, navigate])

  useEffect(() => {
    if (view === 'applications') loadApplications()
    if (view === 'announcements') loadAnnouncements()
    if (view === 'mentors') loadMentors()
    if (view === 'students') loadStudents()
    if (view === 'dashboard') loadStats()
  }, [view, statusFilter])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) setStats(await res.json())
    } catch { /* ignore */ }
  }

  const loadApplications = async () => {
    setAppsLoading(true)
    try {
      const res = await fetch(`/api/applications/mentor?status=${statusFilter}`)
      if (res.ok) setApplications(await res.json())
    } catch { /* ignore */ }
    setAppsLoading(false)
  }

  const loadMentors = async () => {
    setMentorsLoading(true)
    try {
      const res = await fetch('/api/admin/mentors')
      if (res.ok) setMentors(await res.json())
    } catch { /* ignore */ }
    setMentorsLoading(false)
  }

  const loadStudents = async () => {
    setStudentsLoading(true)
    try {
      const res = await fetch('/api/admin/students')
      if (res.ok) setStudents(await res.json())
    } catch { /* ignore */ }
    setStudentsLoading(false)
  }

  const loadAnnouncements = async () => {
    setAnnLoading(true)
    try {
      const res = await fetch('/api/announcements?scope=all')
      if (res.ok) setAnnouncements(await res.json())
    } catch { /* ignore */ }
    setAnnLoading(false)
  }

  const reviewApp = async (id: number, action: 'approve' | 'reject' | 'more_info') => {
    if (action === 'reject' && !window.confirm('Decline and permanently remove this application?')) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/applications/mentor/${id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        const data = await res.json().catch(() => ({}))
        if (action === 'approve' && data.createdUser && !data.passwordResetSent) {
          setPasswordSetupWarning({ applicationId: id, email: data.email || '' })
          flash('Mentor approved, but the password setup email failed to send. A warning is shown below so this can be fixed.')
        } else {
          setPasswordSetupWarning(null)
          flash(
            action === 'approve'
              ? data.passwordResetSent
                ? 'Mentor approved — profile created and password setup email sent.'
                : data.createdUser
                  ? 'Mentor approved — profile created. Ask them to use “Forgot password” on login if needed.'
                  : 'Mentor approved — profile created and dashboard access granted.'
              : action === 'reject'
                ? 'Application declined and removed.'
                : 'More information requested from applicant.',
          )
        }
        loadApplications()
        loadStats()
      } else {
        const data = await res.json().catch(() => ({}))
        flash(data.error || 'Action failed. Please try again.')
      }
    } catch { /* ignore */ }
    setActionLoading(null)
  }

  const resendPasswordSetup = async (applicationId: number) => {
    setActionLoading(applicationId)
    try {
      const res = await fetch(`/api/applications/mentor/${applicationId}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resend_password_setup' }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.passwordResetSent) {
        flash('Password setup email sent successfully.')
        setPasswordSetupWarning(null)
      } else {
        flash(data.error || 'Unable to resend the password setup email.')
      }
    } catch {
      flash('Unable to resend the password setup email.')
    } finally {
      setActionLoading(null)
    }
  }

  const saveAnnouncement = async (data: Partial<Announcement>) => {
    const isEdit = !!editing
    const res = await fetch(isEdit ? `/api/announcements/${editing!.id}` : '/api/announcements', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      flash(isEdit ? 'Announcement updated.' : 'Announcement published.')
      setEditorOpen(false)
      setEditing(null)
      loadAnnouncements()
    }
  }

  const patchAnnouncement = async (id: number, patch: Partial<Announcement>) => {
    const res = await fetch(`/api/announcements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (res.ok) loadAnnouncements()
  }

  const deleteAnnouncement = async (id: number) => {
    if (!window.confirm('Delete this announcement permanently?')) return
    const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' })
    if (res.ok) { flash('Announcement deleted.'); loadAnnouncements() }
  }

  if (!ready || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const adminName = user.name || user.email?.split('@')[0] || 'Administrator'

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 admin-shell">
      {/* -------------------------------------------------------- sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-[#0f172a] text-slate-300 flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? 'lg:w-20' : 'lg:w-64'} w-64
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/5 flex-shrink-0">
          <GradeBridgeLogo compact className="flex-shrink-0" />
          {!collapsed && <span className="sr-only">GradeBridge</span>}
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = view === item.key
            return (
              <button
                key={item.key}
                onClick={() => { setView(item.key); setMobileOpen(false) }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  ${collapsed ? 'lg:justify-center' : ''}`}
              >
                <Icon path={item.icon} className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/5 flex-shrink-0">
          <button
            onClick={() => logout().then(() => (window.location.href = '/'))}
            title={collapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:text-white hover:bg-red-500/10 hover:text-red-300 transition-all
              ${collapsed ? 'lg:justify-center' : ''}`}
          >
            <Icon path={I.logout} className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* --------------------------------------------------------- content */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        {/* top nav */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6">
          <button
            onClick={() => (window.innerWidth < 1024 ? setMobileOpen(true) : setCollapsed(!collapsed))}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Icon path={I.menu} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 hidden sm:block">{VIEW_TITLES[view]}</h1>

          <div className="flex-1 max-w-md mx-auto hidden md:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon path={I.search} className="w-4 h-4" />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications, mentors, students…"
                className="w-full bg-slate-100 border border-transparent rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Notifications">
              <Icon path={I.bell} />
              {!!stats?.pendingApplications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>
            <div className="flex items-center gap-2 pl-2 sm:border-l sm:border-slate-200">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
                {initials(adminName)}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-slate-800">{adminName}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-sm shadow-2xl flex items-center gap-2 admin-fade-in">
            <Icon path={I.check} className="w-4 h-4 text-blue-400" />
            {toast}
          </div>
        )}

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {view === 'dashboard' && <DashboardHome name={adminName} stats={stats} onGo={setView} />}
          {view === 'applications' && (
            <Applications
              applications={applications}
              loading={appsLoading}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              expanded={expanded}
              setExpanded={setExpanded}
              actionLoading={actionLoading}
              onReview={reviewApp}
              onRefresh={loadApplications}
              onResendPasswordSetup={resendPasswordSetup}
              passwordSetupWarning={passwordSetupWarning}
              search={search}
            />
          )}
          {view === 'announcements' && (
            <Announcements
              items={announcements}
              loading={annLoading}
              onNew={() => { setEditing(null); setEditorOpen(true) }}
              onEdit={(a) => { setEditing(a); setEditorOpen(true) }}
              onDelete={deleteAnnouncement}
              onPatch={patchAnnouncement}
            />
          )}
          {view === 'mentors' && (
            <MentorsList
              mentors={mentors}
              loading={mentorsLoading}
              search={search}
              onRefresh={loadMentors}
            />
          )}
          {view === 'students' && (
            <StudentsList
              students={students}
              loading={studentsLoading}
              search={search}
              onRefresh={loadStudents}
            />
          )}
          {view === 'sessions' && <Placeholder title="Tutoring Sessions" icon={I.sessions} desc="Scheduled and past tutoring sessions will be managed from this space." />}
          {view === 'settings' && <SettingsPanel email={user.email || ''} />}
        </main>
      </div>

      {editorOpen && (
        <AnnouncementEditor
          initial={editing}
          onClose={() => { setEditorOpen(false); setEditing(null) }}
          onSave={saveAnnouncement}
        />
      )}
    </div>
  )
}

/* ---------------------------------------------------------- sub-views --- */

function StatCard({ label, value, icon, accent }: { label: string; value: number; icon: string; accent: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon path={icon} className="w-5 h-5" />
        </div>
      </div>
      <p className="text-3xl font-black text-slate-900 mt-4">{value}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  )
}

function DashboardHome({ name, stats, onGo }: { name: string; stats: Stats | null; onGo: (v: View) => void }) {
  return (
    <div className="space-y-8 admin-fade-in">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Welcome back, Administrator.</h2>
        <p className="text-slate-500 mt-1">Here's an overview of {name ? 'your platform' : 'GradeBridge'} today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Pending Mentor Applications" value={stats?.pendingApplications ?? 0} icon={I.applications} accent="bg-amber-50 text-amber-600" />
        <StatCard label="Active Mentors" value={stats?.activeMentors ?? 0} icon={I.mentors} accent="bg-blue-50 text-blue-600" />
        <StatCard label="Registered Students" value={stats?.registeredStudents ?? 0} icon={I.students} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Upcoming Tutoring Sessions" value={stats?.upcomingSessions ?? 0} icon={I.sessions} accent="bg-indigo-50 text-indigo-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => onGo('applications')} className="text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Icon path={I.applications} />
          </div>
          <h3 className="font-bold text-slate-900">Review Mentor Applications</h3>
          <p className="text-sm text-slate-500 mt-1">Approve, decline, or request more information from applicants.</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3">Go to applications <Icon path={I.chevron} className="w-4 h-4 -rotate-90" /></span>
        </button>
        <button onClick={() => onGo('announcements')} className="text-left bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
          <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Icon path={I.announcements} />
          </div>
          <h3 className="font-bold text-slate-900">Manage Announcements</h3>
          <p className="text-sm text-slate-500 mt-1">Publish updates shown across the landing page and dashboards.</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3">Go to announcements <Icon path={I.chevron} className="w-4 h-4 -rotate-90" /></span>
        </button>
      </div>
    </div>
  )
}

function Applications(props: {
  applications: Application[]
  loading: boolean
  statusFilter: 'pending' | 'approved' | 'more_info'
  setStatusFilter: (s: 'pending' | 'approved' | 'more_info') => void
  expanded: number | null
  setExpanded: (n: number | null) => void
  actionLoading: number | null
  onReview: (id: number, action: 'approve' | 'reject' | 'more_info') => void
  onRefresh: () => void
  onResendPasswordSetup: (id: number) => void
  passwordSetupWarning: { applicationId: number; email: string } | null
  search: string
}) {
  const { applications, loading, statusFilter, setStatusFilter, expanded, setExpanded, actionLoading, onReview, onRefresh, onResendPasswordSetup, passwordSetupWarning, search } = props
  const tabs: { key: 'pending' | 'approved' | 'more_info'; label: string }[] = [
    { key: 'pending', label: 'Pending' },
    { key: 'more_info', label: 'Awaiting Info' },
    { key: 'approved', label: 'Approved' },
  ]
  const q = search.trim().toLowerCase()
  const filtered = q
    ? applications.filter((a) => `${a.fullName} ${a.email} ${a.school} ${a.subjects}`.toLowerCase().includes(q))
    : applications

  return (
    <div className="space-y-5 admin-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex bg-slate-100 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setStatusFilter(t.key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                statusFilter === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button onClick={onRefresh} className="text-sm text-slate-500 hover:text-slate-800 transition-colors">↻ Refresh</button>
      </div>

      {passwordSetupWarning && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-amber-800">Password setup email delivery failed</p>
            <p className="text-sm text-amber-700">The mentor account was created, but the password setup email was not delivered. Use the button below to resend it.</p>
          </div>
          <button
            onClick={() => onResendPasswordSetup(passwordSetupWarning.applicationId)}
            className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            Resend password setup email
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Icon path={I.applications} className="w-6 h-6" />
          </div>
          <p className="font-semibold text-slate-800">No {statusFilter === 'more_info' ? 'awaiting-info' : statusFilter} applications</p>
          <p className="text-sm text-slate-500 mt-1">New submissions will appear here for review.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => {
            const open = expanded === app.id
            const grades = parseList(app.igcseGrades || '')
            return (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(open ? null : app.id)}
                  className="w-full p-4 sm:p-5 flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {initials(app.fullName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{app.fullName}</p>
                    <p className="text-sm text-slate-500 truncate">{app.school}</p>
                  </div>
                  <div className="hidden md:flex flex-wrap gap-1 max-w-xs justify-end">
                    {parseList(app.subjects).slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                  <Icon path={I.chevron} className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>

                {open && (
                  <div className="border-t border-slate-100 p-5 sm:p-6 space-y-5 bg-slate-50/50">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Email" value={app.email} />
                      <Field label="Phone" value={app.phone} />
                      <Field label="School / University" value={app.school} />
                      <Field label="Availability" value={app.availability} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Subjects to Teach</p>
                      <div className="flex flex-wrap gap-2">
                        {parseList(app.subjects).map((s) => (
                          <span key={s} className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">IGCSE Grades</p>
                      {grades.length ? (
                        <div className="flex flex-wrap gap-2">
                          {grades.map((g) => (
                            <span key={g} className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-medium">{g}</span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500">Detailed in the personal statement below.</p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Personal Statement</p>
                      <p className="text-sm text-slate-700 leading-relaxed bg-white rounded-xl p-4 border border-slate-200">{app.statement}</p>
                    </div>

                    {statusFilter !== 'approved' && (
                      <div className="flex flex-col sm:flex-row gap-3 pt-1">
                        <button
                          onClick={() => onReview(app.id, 'approve')}
                          disabled={actionLoading === app.id}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm shadow-blue-600/20"
                        >
                          <Icon path={I.check} className="w-4 h-4" /> Approve Mentor
                        </button>
                        <button
                          onClick={() => onReview(app.id, 'more_info')}
                          disabled={actionLoading === app.id}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-50 transition-colors"
                        >
                          <Icon path={I.info} className="w-4 h-4" /> Request More Info
                        </button>
                        <button
                          onClick={() => onReview(app.id, 'reject')}
                          disabled={actionLoading === app.id}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-red-200 text-red-600 font-semibold hover:bg-red-50 disabled:opacity-50 transition-colors"
                        >
                          <Icon path={I.x} className="w-4 h-4" /> Decline Mentor
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
      <p className="text-sm text-slate-800 break-words">{value || '—'}</p>
    </div>
  )
}

function Announcements(props: {
  items: Announcement[]
  loading: boolean
  onNew: () => void
  onEdit: (a: Announcement) => void
  onDelete: (id: number) => void
  onPatch: (id: number, patch: Partial<Announcement>) => void
}) {
  const { items, loading, onNew, onEdit, onDelete, onPatch } = props
  const active = items.filter((a) => !a.archived)
  const archived = items.filter((a) => a.archived)

  const Card = ({ a }: { a: Announcement }) => (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${a.pinned ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {a.pinned && <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md"><Icon path={I.pin} className="w-3 h-3" /> Pinned</span>}
            {a.archived && <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Archived</span>}
            <h3 className="font-bold text-slate-900 truncate">{a.title}</h3>
          </div>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">{a.body}</p>
          <p className="text-xs text-slate-400 mt-3">
            {a.publishDate ? `Published ${new Date(a.publishDate).toLocaleDateString()}` : 'Draft'}
            {a.expiresAt ? ` · Expires ${new Date(a.expiresAt).toLocaleDateString()}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-4 pt-4 border-t border-slate-100">
        <IconBtn label={a.pinned ? 'Unpin' : 'Pin'} icon={I.pin} onClick={() => onPatch(a.id, { pinned: !a.pinned })} active={a.pinned} />
        <IconBtn label="Edit" icon={I.edit} onClick={() => onEdit(a)} />
        <IconBtn label={a.archived ? 'Unarchive' : 'Archive'} icon={I.archive} onClick={() => onPatch(a.id, { archived: !a.archived })} />
        <IconBtn label="Delete" icon={I.trash} onClick={() => onDelete(a.id)} danger />
      </div>
    </div>
  )

  return (
    <div className="space-y-6 admin-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Announcements appear on the landing page and student &amp; mentor dashboards.</p>
        <button onClick={onNew} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
          <Icon path={I.plus} className="w-4 h-4" /> New Announcement
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <Icon path={I.announcements} className="w-6 h-6" />
          </div>
          <p className="font-semibold text-slate-800">No announcements yet</p>
          <p className="text-sm text-slate-500 mt-1">Create your first announcement to broadcast it across the platform.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {active.map((a) => <Card key={a.id} a={a} />)}
          </div>
          {archived.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Archived</p>
              <div className="grid gap-4 md:grid-cols-2 opacity-75">
                {archived.map((a) => <Card key={a.id} a={a} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function IconBtn({ label, icon, onClick, danger, active }: { label: string; icon: string; onClick: () => void; danger?: boolean; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors
        ${danger ? 'text-red-600 hover:bg-red-50' : active ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-100'}`}
    >
      <Icon path={icon} className="w-4 h-4" /> {label}
    </button>
  )
}

function MentorsList({ mentors, loading, search, onRefresh }: {
  mentors: Mentor[]
  loading: boolean
  search: string
  onRefresh: () => void
}) {
  const q = search.trim().toLowerCase()
  const filtered = q
    ? mentors.filter((mentor) =>
        [mentor.fullName, mentor.email, mentor.subjects, mentor.bio, mentor.contactEmail || '']
          .some((value) => value.toLowerCase().includes(q)),
      )
    : mentors

  return (
    <div className="space-y-5 admin-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm text-slate-500">Approved mentor profiles and contact details.</p>
          <p className="text-sm text-slate-400">Use the search box to locate mentors by name, email, or subject.</p>
        </div>
        <button onClick={onRefresh} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
          <h2 className="font-semibold text-slate-900">No mentors found</h2>
          <p className="text-sm text-slate-500 mt-2">Approve mentor applications to populate this list.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Name</p>
                  <p className="font-semibold text-slate-900">{mentor.fullName}</p>
                  <p className="text-sm text-slate-500 mt-1">{mentor.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {parseList(mentor.subjects).map((subject) => (
                      <span key={subject} className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Contact</p>
                  <p className="text-sm text-slate-600">{mentor.contactEmail || mentor.email}</p>
                  <p className="text-xs text-slate-400 mt-2">{mentor.isPublic ? 'Public profile' : 'Private profile'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function StudentsList({ students, loading, search, onRefresh }: {
  students: Student[]
  loading: boolean
  search: string
  onRefresh: () => void
}) {
  const q = search.trim().toLowerCase()
  const filtered = q
    ? students.filter((student) =>
        [student.fullName, student.email, student.gradeLevel]
          .some((value) => value.toLowerCase().includes(q)),
      )
    : students

  return (
    <div className="space-y-5 admin-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm text-slate-500">Registered students in the system.</p>
          <p className="text-sm text-slate-400">Search by name, email, or grade level.</p>
        </div>
        <button onClick={onRefresh} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
          ↻ Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">
          <h2 className="font-semibold text-slate-900">No students found</h2>
          <p className="text-sm text-slate-500 mt-2">Student registrations will appear here after they sign up.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((student) => (
            <div key={student.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 grid gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Name</p>
                  <p className="font-semibold text-slate-900">{student.fullName}</p>
                  <p className="text-sm text-slate-500 mt-1">{student.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Grade</p>
                  <p className="font-semibold text-slate-900">{student.gradeLevel}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Age</p>
                  <p className="font-semibold text-slate-900">{student.age}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400 mb-2">Joined</p>
                  <p className="text-sm text-slate-600">{new Date(student.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AnnouncementEditor({ initial, onClose, onSave }: {
  initial: Announcement | null
  onClose: () => void
  onSave: (data: Partial<Announcement>) => void
}) {
  const toInput = (d: string | null) => (d ? new Date(d).toISOString().slice(0, 10) : '')
  const [title, setTitle] = useState(initial?.title || '')
  const [body, setBody] = useState(initial?.body || '')
  const [publishDate, setPublishDate] = useState(toInput(initial?.publishDate ?? null) || new Date().toISOString().slice(0, 10))
  const [expiresAt, setExpiresAt] = useState(toInput(initial?.expiresAt ?? null))
  const [pinned, setPinned] = useState(initial?.pinned || false)
  const [saving, setSaving] = useState(false)

  const submit = async () => {
    if (!title.trim() || !body.trim()) return
    setSaving(true)
    await onSave({ title, body, publishDate, expiresAt: expiresAt || null, pinned })
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm admin-fade-in" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">{initial ? 'Edit Announcement' : 'New Announcement'}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"><Icon path={I.x} className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Write the announcement…"
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Publish date</label>
              <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiration <span className="text-slate-400 font-normal">(optional)</span></label>
              <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
            </div>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm text-slate-700">Pin to top across the platform</span>
          </label>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={submit} disabled={saving || !title.trim() || !body.trim()}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {saving ? 'Saving…' : initial ? 'Save Changes' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Placeholder({ title, icon, desc }: { title: string; icon: string; desc: string }) {
  return (
    <div className="admin-fade-in bg-white rounded-2xl border border-slate-200 p-14 text-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5">
        <Icon path={icon} className="w-7 h-7" />
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">{desc}</p>
      <span className="inline-block mt-5 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Coming soon</span>
    </div>
  )
}

function SettingsPanel({ email }: { email: string }) {
  return (
    <div className="admin-fade-in space-y-5 max-w-2xl">
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Administrator Account</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Email" value={email} />
          <Field label="Role" value="Administrator" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-2">Admin &amp; Mentor Roles</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          New administrators are added via <strong className="text-slate-700">Netlify Dashboard → Identity → [User] → Roles</strong> by
          adding the <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">admin</code> role. Approving a mentor application
          automatically grants the applicant the <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">mentor</code> role and Mentor Dashboard access.
        </p>
      </div>
    </div>
  )
}
