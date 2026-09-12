import { useEffect, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { AssistantChat } from './AssistantChat'

/** Floating assistant launcher available on every public page and dashboard. */
export function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  // The full-page assistant already is the assistant; the admin shell has its own chrome.
  const hidden = pathname.startsWith('/assistant') || pathname.startsWith('/dashboard/admin')

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (hidden) return null

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] max-h-[70vh] glass rounded-3xl shadow-2xl shadow-blue-500/10 flex flex-col p-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-sm">🤖</span>
              <div className="leading-tight">
                <p className="text-white text-sm font-bold">GradeBridge Assistant</p>
                <p className="text-slate-400 text-[11px]">Answers from live site data</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 min-h-0 pt-2">
            <AssistantChat compact />
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close assistant' : 'Open the GradeBridge assistant'}
        className="fixed bottom-6 right-4 sm:right-6 z-50 h-14 px-5 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
      >
        <span className="text-lg">{open ? '✕' : '🤖'}</span>
        {!open && <span className="hidden sm:inline">Ask GradeBridge</span>}
      </button>
    </>
  )
}
