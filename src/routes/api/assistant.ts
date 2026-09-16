import { createFileRoute } from '@tanstack/react-router'
import Groq from 'groq-sdk'

const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'search_mentors',
      description: 'Find mentors by subject or search term.',
      parameters: {
        type: 'object',
        properties: {
          subject: { type: 'string', description: 'Subject the student needs help with.' },
          search: { type: 'string', description: 'Optional name or keyword search.' },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'search_ambassadors',
      description: 'Find student ambassadors by subject or search term.',
      parameters: {
        type: 'object',
        properties: {
          subject: { type: 'string' },
          search: { type: 'string' },
        },
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_announcements',
      description: 'List the latest active site announcements.',
      parameters: { type: 'object', properties: {}, additionalProperties: false },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'book_mentor_session',
      description: 'Book a session with a mentor after the student chooses a mentor and time.',
      parameters: {
        type: 'object',
        properties: {
          mentorName: { type: 'string' },
          time: { type: 'string' },
          subject: { type: 'string' },
          topicDescription: { type: 'string' },
        },
        required: ['mentorName', 'time'],
        additionalProperties: false,
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'toggle_dark_mode',
      description: 'Toggle dark mode in the assistant interface.',
      parameters: { type: 'object', properties: {}, additionalProperties: false },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'navigate_to_page',
      description: 'Navigate the student to a page on the site.',
      parameters: {
        type: 'object',
        properties: { pageName: { type: 'string' } },
        required: ['pageName'],
        additionalProperties: false,
      },
    },
  },
]

export const Route = createFileRoute('/api/assistant')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!process.env.GROQ_API_KEY) {
          return Response.json({ error: 'GROQ_API_KEY is not configured' }, { status: 500 })
        }

        try {
          const body = await request.json()
          if (!Array.isArray(body.messages)) {
            return Response.json({ error: 'messages must be an array' }, { status: 400 })
          }

          const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
          const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: body.messages,
            tools,
            tool_choice: 'auto',
            max_tokens: 512,
          })

          return Response.json(completion)
        } catch (error) {
          console.error('Assistant completion failed:', error)
          return Response.json({ error: 'Assistant completion failed' }, { status: 500 })
        }
      },
    },
  },
})