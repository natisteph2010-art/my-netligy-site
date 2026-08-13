import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
})

const MENTORS = [
  { id: 1, name: 'Sarah Connor', subjects: ['Aerodynamics', 'Math'] },
  { id: 2, name: 'Alex Rivera', subjects: ['CAD', 'Drones'] },
  { id: 3, name: 'Aisha Bekele', subjects: ['Physics', 'Math'] },
  { id: 4, name: 'Samuel Tesfaye', subjects: ['Chemistry', 'Biology'] },
]

export default function AssistantPage() {
  const [status, setStatus] = useState('Initializing…')
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([])
  const [engineReady, setEngineReady] = useState(false)
  const [useMock, setUseMock] = useState(false)
  const [bookings, setBookings] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('gb_bookings') || '[]')
    } catch {
      return []
    }
  })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mentorsRef = useRef(MENTORS)
  const engineRef = useRef<any>(null)

  useEffect(() => {
    ;(async () => {
      setStatus('Creating engine…')
      try {
        const webllm = await import('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm')
        engineRef.current = await webllm.CreateMLCEngine({ backend: 'webgpu' })
        setEngineReady(true)
        setStatus('Ready')
      } catch (err) {
        console.warn('WebLLM init failed, falling back to mock', err)
        setUseMock(true)
        setEngineReady(false)
        setStatus('Ready (mock)')
      }
    })()
  }, [])

  useEffect(() => {
    localStorage.setItem('gb_bookings', JSON.stringify(bookings))
  }, [bookings])

  function append(role: string, text: string) {
    setMessages((m) => [...m, { role, text }])
  }

  function renderMentors(list = mentorsRef.current) {
    mentorsRef.current = list
    // no-op UI handled in JSX
  }

  async function callChat(history: any[]) {
    if (useMock) {
      const last = history.slice().reverse().find((h) => h.role === 'user')?.content || ''
      if (/book/i.test(last)) {
        return { choices: [{ message: { tool_calls: [{ name: 'bookMentorSession', arguments: { mentorName: 'Sarah Connor', time: 'Tomorrow 4pm', studentName: 'Student' } }] } }] }
      }
      if (/find|search|mentor/i.test(last)) {
        const subj = (last.match(/aerodynamics|math|cad|drones|physics|chemistry|biology|programming/i) || ['Math'])[0]
        return { choices: [{ message: { tool_calls: [{ name: 'searchMentors', arguments: { subject: subj } }] } }] }
      }
      return { choices: [{ message: { content: 'I can help book mentors, search mentors, and toggle settings.' } }] }
    }

    try {
      const resp = await engineRef.current.chat.completions.create({ model: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', messages: history, max_tokens: 256 })
      return resp
    } catch (e) {
      console.error('chat call failed', e)
      setUseMock(true)
      return callChat(history)
    }
  }

  async function executeTool(name: string, args: any) {
    if (name === 'searchMentors') {
      const q = String(args.subject || '').toLowerCase()
      const found = MENTORS.filter((m) => m.subjects.some((s) => s.toLowerCase().includes(q)))
      renderMentors(found)
      return { results: found }
    }
    if (name === 'bookMentorSession') {
      const mentor = MENTORS.find((m) => m.name.toLowerCase() === String(args.mentorName || '').toLowerCase()) || MENTORS[0]
      const code = `GB-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
      const booking = { mentor: mentor.name, mentorId: mentor.id, student: args.studentName || 'Student', time: args.time, code }
      setBookings((b) => [...b, booking])
      return { success: true, booking }
    }
    if (name === 'toggleDarkMode') {
      document.body.classList.toggle('dark-mode')
      return { dark: document.body.classList.contains('dark-mode') }
    }
    if (name === 'navigateToPage') {
      window.location.hash = '#/' + (args.pageName || 'home')
      return { navigated: true }
    }
    throw new Error('Unknown tool ' + name)
  }

  async function handleSend(text: string) {
    append('user', text)
    const history = [{ role: 'system', content: 'You are a helpful student assistant.' }, ...messages.map((m) => ({ role: m.role as any, content: m.text })), { role: 'user', content: text }]
    setStatus('Thinking…')
    const resp = await callChat(history)
    const choice = resp.choices && resp.choices[0] ? resp.choices[0] : resp
    const message = choice.message || choice
    const tool_calls = message.tool_calls || message.function_call || null
    if (tool_calls) {
      const calls = Array.isArray(tool_calls) ? tool_calls : [tool_calls]
      for (const call of calls) {
        const name = call.name || (call.function_call && call.function_call.name)
        let args = call.arguments || (call.function_call && call.function_call.arguments) || {}
        if (typeof args === 'string') {
          try {
            args = JSON.parse(args)
          } catch {}
        }
        append('assistant', `Executing ${name}`)
        const result = await executeTool(name, args)
        append('assistant', `Result: ${JSON.stringify(result)}`)
      }
      setStatus('Ready')
      // ask model for final message
      const final = await callChat([{ role: 'system', content: 'Summarize.' }])
      const finalMsg = final.choices && final.choices[0] && final.choices[0].message && final.choices[0].message.content ? final.choices[0].message.content : 'Done.'
      append('assistant', finalMsg)
      return
    }

    const assistantText = message.content || message.text || JSON.stringify(message)
    append('assistant', assistantText)
    setStatus('Ready')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-slate-900 rounded-lg p-4 flex flex-col" style={{ minHeight: '70vh' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold">Site Assistant — Mentor Helper</h3>
              <div className="text-sm text-slate-400">Ask to find mentors, book sessions, or navigate the site.</div>
            </div>
            <div className="text-sm text-slate-300">{status}</div>
          </div>
          <div className="flex-1 overflow-auto p-2 space-y-2 bg-slate-950/20 rounded">
            {messages.map((m, i) => (
              <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-slate-800 text-slate-200'}`}>
                <div className="text-sm">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input ref={inputRef} className="flex-1 p-2 rounded bg-transparent border border-slate-700" placeholder='Try: "Find physics mentors"' />
            <button
              className="px-3 rounded bg-sky-500 text-slate-900 font-bold"
              onClick={() => {
                const v = inputRef.current?.value?.trim()
                if (!v) return
                inputRef.current!.value = ''
                handleSend(v)
              }}
            >
              Send
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <strong>Mentor Directory</strong>
              <span className="text-sm text-slate-400">Live</span>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto">
              {mentorsRef.current.map((m) => (
                <div key={m.id} className="flex justify-between items-center p-2 rounded bg-slate-800">
                  <div>
                    <div className="font-medium">{m.name}</div>
                    <div className="text-sm text-slate-400">{m.subjects.join(', ')}</div>
                  </div>
                  <div className="text-sm text-slate-400">ID {m.id}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <strong>Bookings</strong>
              <span className="text-sm text-slate-400">Persistent</span>
            </div>
            <div className="space-y-2 max-h-40 overflow-auto text-sm">
              {bookings.length === 0 ? <div className="text-slate-400">No bookings yet</div> : bookings.map((b, i) => (
                <div key={i} className="p-2 rounded bg-slate-800">{b.student} — {b.mentor} @ {b.time} ({b.code})</div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-lg p-3">
            <strong>Execution Log</strong>
            <div className="text-xs text-slate-400 mt-2">Messages are stored locally and tools execute in-browser.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
