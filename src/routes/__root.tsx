import { HeadContent, Outlet, Scripts, createRootRoute, Link, useRouterState } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import '../styles.css'
import { IdentityProvider } from '../lib/identity-context'
import { CallbackHandler } from '../components/CallbackHandler'
import { GradeBridgeLogo } from '../components/GradeBridgeLogo'
import { useIdentity } from '../lib/identity-context'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'GradeBridge — Educational Mentoring Platform' },
      { name: 'description', content: 'GradeBridge connects IGCSE mentors with students through free tutoring and mentorship.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-950 text-white antialiased">
        <IdentityProvider>
          <CallbackHandler>
            <NavBar />
            {children}
          </CallbackHandler>
        </IdentityProvider>
        <Scripts />
      </body>
    </html>
  )
}

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const { user, ready, logout } = useIdentity()
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The admin dashboard renders its own top navigation and sidebar.
  if (pathname.startsWith('/dashboard/admin')) return null

  const role = user?.roles?.[0] ?? (user ? 'student' : null)

  const dashboardPath =
    role === 'admin' ? '/dashboard/admin' :
    role === 'mentor' ? '/dashboard/mentor' :
    '/dashboard/student'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-lg shadow-blue-500/5 border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <GradeBridgeLogo compact className="group-hover:opacity-90 transition-opacity" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/#about" className="text-slate-300 hover:text-white transition-colors">About</a>
            <a href="/#programs" className="text-slate-300 hover:text-white transition-colors">Programs</a>
            <a href="/#mentors" className="text-slate-300 hover:text-white transition-colors">Mentors</a>
            <a href="/#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            {ready && user ? (
              <>
                <Link to={dashboardPath} className="text-slate-300 hover:text-white transition-colors">Dashboard</Link>
                <button
                  onClick={() => logout().then(() => window.location.href = '/')}
                  className="px-4 py-1.5 rounded-lg border border-white/20 text-slate-300 hover:text-white hover:border-white/40 transition-all text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : ready ? (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors">Sign In</Link>
                <Link to="/apply/mentor" className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20">
                  Join Now
                </Link>
              </>
            ) : null}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀' : '🌙'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-b border-white/10 py-4 px-4 flex flex-col gap-3 text-sm">
          <a href="/#about" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">About</a>
          <a href="/#programs" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">Programs</a>
          <a href="/#mentors" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">Mentors</a>
          <a href="/#contact" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">Contact</a>
          {ready && user ? (
            <>
              <Link to={dashboardPath} onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">Dashboard</Link>
              <button onClick={() => logout().then(() => window.location.href = '/')} className="text-left text-slate-300 hover:text-white py-2">Sign Out</button>
            </>
          ) : ready ? (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-white py-2">Sign In</Link>
              <Link to="/apply/mentor" onClick={() => setMobileOpen(false)} className="text-blue-400 hover:text-blue-300 py-2 font-medium">Join Now</Link>
            </>
          ) : null}
        </div>
      )}
    </nav>
  )
}
