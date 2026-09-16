import { createFileRoute } from '@tanstack/react-router'
import Groq from 'groq-sdk'
import { getCurrentUserWithRole } from '../../../lib/authorization.js'
import {
  buildTools,
  runTool,
  SITE_GUIDE,
  SITE_PAGES,
  type AssistantContext,
} from '../../../lib/assistant-tools.js'

const MODEL = 'llama-3.1-8b-instant'
const MAX_TOOL_ROUNDS = 5
const MAX_HISTORY = 20

type ClientMessage = { role: 'user' | 'assistant'; content: string }

function systemPrompt(context: AssistantContext) {
  const who = context.user
    ? `The visitor is signed in as ${context.user.name || context.user.email} with the "${context.role}" role.`
    : 'The visitor is NOT signed in. Anything behind the mentor directory or a dashboard needs an account first.'

  return `You are the GradeBridge assistant, a helpful guide embedded in the GradeBridge website.

${who}

${SITE_GUIDE}

Pages you can take people to (use the navigate tool with these keys):
${Object.entries(SITE_PAGES).map(([key, page]) => `- ${key} (${page.path}): ${page.summary}`).join('\n')}

How to behave:
- Answer from the tools, not from memory. If someone asks about mentors, ambassadors, announcements or their own
  sessions, call the matching tool first and answer only from what it returns.
- Never invent a mentor, an ambassador, a session, a date or a statistic. If a tool returns nothing, say so plainly.
- Keep replies short and concrete — a couple of sentences or a tight list. No headings, no filler.
- When an action lives on a page, offer to take the visitor there and use the navigate tool rather than describing
  a URL. Only navigate when it genuinely helps; asking a follow-up question is often better.
- You cannot book sessions, edit profiles, approve applications or change any data. Walk the visitor to the page
  where they can do it themselves.
- If the visitor needs to sign in first, say that directly and offer the login page.`
}

export const Route = createFileRoute('/api/assistant/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { messages?: ClientMessage[] }
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid request body.' }, { status: 400 })
        }

        const incoming = Array.isArray(body.messages) ? body.messages : []
        const history = incoming
          .filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
          .filter((message) => typeof message.content === 'string' && message.content.trim())
          .slice(-MAX_HISTORY)
          .map((message) => ({ role: message.role, content: message.content.slice(0, 4000) }))

        if (history.length === 0) {
          return Response.json({ error: 'Send at least one message.' }, { status: 400 })
        }

        const account = await getCurrentUserWithRole().catch(() => null)
        const context: AssistantContext = {
          user: account ? { id: account.user.id, email: account.user.email, name: account.user.name } : null,
          role: account?.role ?? null,
        }

        const tools = buildTools(context)
        const groqTools = tools.map((tool) => ({
          type: 'function' as const,
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.input_schema,
          },
        }))
        const messages: any[] = [
          { role: 'system', content: systemPrompt(context) },
          ...history,
        ]

        const toolsUsed: string[] = []
        let action: { type: 'navigate'; path: string; reason?: string } | undefined

        try {
          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

          for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
            const response = await groq.chat.completions.create({
              model: MODEL,
              max_tokens: 1024,
              tools: groqTools,
              tool_choice: 'auto',
              messages,
            })

            const message = response.choices[0]?.message
            const toolCalls = message?.tool_calls ?? []

            if (toolCalls.length === 0 || round === MAX_TOOL_ROUNDS) {
              const reply = message?.content?.trim() || "I couldn't work that one out. Could you rephrase it?"

              return Response.json({
                reply,
                toolsUsed,
                action,
              })
            }

            messages.push(message)

            for (const call of toolCalls) {
              const name = call.function.name
              toolsUsed.push(name)
              let outcome
              try {
                outcome = await runTool(name, JSON.parse(call.function.arguments || '{}'), context)
              } catch (err) {
                console.error(`Assistant tool "${name}" failed:`, err)
                outcome = { result: { error: 'That lookup failed. Tell the visitor to try again shortly.' } }
              }
              if (outcome.action) action = outcome.action
              messages.push({
                role: 'tool',
                tool_call_id: call.id,
                content: JSON.stringify(outcome.result).slice(0, 12000),
              })
            }
          }
        } catch (err: any) {
          console.error('Assistant chat error:', err)
          const status = err?.status === 429 ? 429 : 502
          return Response.json(
            {
              error:
                status === 429
                  ? 'The assistant is busy right now. Please try again in a moment.'
                  : 'The assistant is unavailable right now. Please try again shortly.',
            },
            { status },
          )
        }

        return Response.json({ error: 'The assistant could not complete that request.' }, { status: 500 })
      },
    },
  },
})
