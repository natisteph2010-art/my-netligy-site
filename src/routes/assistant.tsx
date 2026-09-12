import { createFileRoute, Link } from '@tanstack/react-router'
import { AssistantChat } from '../components/AssistantChat'
import { useIdentity } from '../lib/identity-context'

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
})

const CAPABILITIES = [
  { icon: '🎓', title: 'Find a mentor', body: 'Search published mentor profiles by subject and see who still has room this week.' },
  { icon: '🌟', title: 'Meet the ambassadors', body: 'Look up ambassadors by school, country, subject or achievement.' },
  { icon: '📅', title: 'Track your sessions', body: 'Check the live status of every session you have requested or agreed to run.' },
  { icon: '🧭', title: 'Get you there', body: 'Explain how registration, applications and session reviews work — then open the right page.' },
]

export default function AssistantPage() {
  const { user, ready } = useIdentity()

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 stars-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-[0.2em]">
            AI Assistant
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-black text-white leading-tight">
            Ask <span className="gradient-text">GradeBridge</span> anything
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The assistant reads live site data — mentors, ambassadors, announcements and your own sessions — so its
            answers reflect what is actually on the platform right now.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="glass rounded-3xl p-5 sm:p-6 flex flex-col h-[34rem]">
            <AssistantChat />
          </div>

          <div className="space-y-4">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-white font-bold mb-4">What it can do</h2>
              <div className="space-y-4">
                {CAPABILITIES.map((capability) => (
                  <div key={capability.title} className="flex gap-3">
                    <span className="text-lg leading-none mt-0.5">{capability.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold">{capability.title}</p>
                      <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{capability.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {ready && !user && (
              <div className="glass rounded-3xl p-6">
                <h2 className="text-white font-bold mb-2">Sign in for more</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The mentor directory and your session history are only available once you have an account. Everything
                  else works without signing in.
                </p>
                <Link
                  to="/login"
                  className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Sign in
                </Link>
              </div>
            )}

            <div className="glass rounded-3xl p-6">
              <h2 className="text-white font-bold mb-2">Good to know</h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                The assistant is read-only. It will walk you to the page where you can book a session, apply as a
                mentor or edit your profile, but it never changes anything on your behalf.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
