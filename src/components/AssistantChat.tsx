import { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useIdentity } from '../lib/identity-context'

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
  tools?: string[]
  failed?: boolean
}

const TOOL_LABELS: Record<string, string> = {
  search_ambassadors: 'Checked the ambassador directory',
  search_mentors: 'Searched the mentor directory',
  list_announcements: 'Read the latest announcements',
  get_site_guide: 'Looked up how GradeBridge works',
  get_my_account: 'Checked your account',
  get_my_sessions: 'Checked your sessions',
  navigate: 'Opened a page for you',
}

const SIGNED_OUT_PROMPTS = [
  'Who are the GradeBridge ambassadors?',
  'How do I become a mentor?',
  'What does it cost to get tutoring?',
]

const SIGNED_IN_PROMPTS = [
  'Find me a physics mentor',
  'What is the status of my sessions?',
  'Any new announcements?',
]

/**
 * Shared assistant chat. Renders inside both the full-page assistant and the
 * floating widget; the server decides what it is allowed to look up.
 */
export function AssistantChat({ compact = false }: { compact?: boolean }) {
  const { user, ready } = useIdentity()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const suggestions = user ? SIGNED_IN_PROMPTS : SIGNED_OUT_PROMPTS

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || thinking) return

    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(next)
    setInput('')
    setThinking(true)

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setMessages([...next, { role: 'assistant', content: data.error || 'Something went wrong. Please try again.', failed: true }])
        return
      }

      setMessages([...next, { role: 'assistant', content: data.reply, tools: data.toolsUsed }])

      if (data.action?.type === 'navigate' && typeof data.action.path === 'string') {
        setTimeout(() => navigate({ to: data.action.path as any }).catch(() => {
          window.location.href = data.action.path
        }), 700)
      }
    } catch {
      setMessages([...next, { role: 'assistant', content: 'I could not reach the assistant. Check your connection and try again.', failed: true }])
    } finally {
      setThinking(false)
    }
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-1 py-2 space-y-4">
        {messages.length === 0 && (
          <div className="py-6 text-center">
            <div className="text-3xl mb-3">🤖</div>
            <p className="text-white font-semibold">
              {ready && user ? `Hi ${user.name?.split(' ')[0] || 'there'} — how can I help?` : 'Ask me anything about GradeBridge'}
            </p>
            <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
              I can find mentors and ambassadors, explain how sessions work, check what you have booked, and take you
              straight to the right page.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : message.failed
                    ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-bl-sm'
                    : 'bg-white/8 text-slate-100 border border-white/10 rounded-bl-sm'
              }`}
            >
              {message.content}
              {!!message.tools?.length && (
                <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                  {Array.from(new Set(message.tools)).map((tool) => (
                    <span key={tool} className="text-[11px] text-slate-400">
                      ✓ {TOOL_LABELS[tool] || tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex justify-start">
            <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 px-1 pb-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => send(suggestion)}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/25 text-xs transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => { event.preventDefault(); send(input) }}
        className="flex gap-2 pt-2 border-t border-white/10"
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={compact ? 'Ask anything…' : 'Ask about mentors, ambassadors, sessions or how to join…'}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
        />
        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </form>
    </div>
  )
}
