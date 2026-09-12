import { createFileRoute } from '@tanstack/react-router'
import Anthropic from '@anthropic-ai/sdk'
import { getCurrentUserWithRole } from '../../../lib/authorization.js'
import {
  buildTools,
  runTool,
  SITE_GUIDE,
  SITE_PAGES,
  type AssistantContext,
} from '../../../lib/assistant-tools.js'

const MODEL = 'claude-sonnet-5'
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
        const messages: Anthropic.MessageParam[] = history.map((message) => ({
          role: message.role,
          content: message.content,
        }))

        const toolsUsed: string[] = []
        let action: { type: 'navigate'; path: string; reason?: string } | undefined

        try {
          const anthropic = new Anthropic()

          for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
            const response = await anthropic.messages.create({
              model: MODEL,
              max_tokens: 1024,
              system: systemPrompt(context),
              tools: tools as any,
              messages,
            })

            const toolUses = response.content.filter((block) => block.type === 'tool_use')

            if (response.stop_reason !== 'tool_use' || toolUses.length === 0 || round === MAX_TOOL_ROUNDS) {
              const reply = response.content
                .filter((block): block is Anthropic.TextBlock => block.type === 'text')
                .map((block) => block.text)
                .join('\n')
                .trim()

              return Response.json({
                reply: reply || "I couldn't work that one out. Could you rephrase it?",
                toolsUsed,
                action,
              })
            }

            messages.push({ role: 'assistant', content: response.content })

            const results: Anthropic.ToolResultBlockParam[] = []
            for (const block of toolUses) {
              if (block.type !== 'tool_use') continue
              toolsUsed.push(block.name)
              let outcome
              try {
                outcome = await runTool(block.name, (block.input ?? {}) as Record<string, any>, context)
              } catch (err) {
                console.error(`Assistant tool "${block.name}" failed:`, err)
                outcome = { result: { error: 'That lookup failed. Tell the visitor to try again shortly.' } }
              }
              if (outcome.action) action = outcome.action
              results.push({
                type: 'tool_result',
                tool_use_id: block.id,
                content: JSON.stringify(outcome.result).slice(0, 12000),
              })
            }

            messages.push({ role: 'user', content: results })
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
