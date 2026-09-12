import { and, asc, desc, eq, gt, isNull, lte, or } from 'drizzle-orm'
import { db } from '../../db/index.js'
import {
  ambassadors,
  announcements,
  mentorProfiles,
  mentoringSessions,
  students,
} from '../../db/schema.js'
import { parseList } from './ambassadors.js'
import type { AppRole } from './authorization.js'

export type AssistantContext = {
  user: { id: string; email?: string | null; name?: string | null } | null
  role: AppRole | null
}

export type AssistantTool = {
  name: string
  description: string
  input_schema: {
    type: 'object'
    properties: Record<string, unknown>
    required?: string[]
  }
}

/** Pages the assistant is allowed to send a visitor to. */
export const SITE_PAGES: Record<string, { path: string; summary: string; requiresAuth?: boolean }> = {
  home: { path: '/', summary: 'Landing page with the mission, programs and contact details.' },
  ambassadors: { path: '/ambassadors', summary: 'Public directory of GradeBridge ambassadors.' },
  mentors: { path: '/mentors', summary: 'Mentor directory and session booking. Sign-in required.', requiresAuth: true },
  assistant: { path: '/assistant', summary: 'This assistant, in full-page mode.' },
  login: { path: '/login', summary: 'Sign in or create an account.' },
  register_student: { path: '/register/student', summary: 'Student registration form.' },
  apply_mentor: { path: '/apply/mentor', summary: 'Three-step mentor application form.' },
  student_dashboard: { path: '/dashboard/student', summary: 'Student dashboard with session status.', requiresAuth: true },
  mentor_dashboard: { path: '/dashboard/mentor', summary: 'Mentor dashboard, profile editor and session logbook.', requiresAuth: true },
  admin_dashboard: { path: '/dashboard/admin', summary: 'Administrator dashboard.', requiresAuth: true },
}

export const SITE_GUIDE = `
GradeBridge (the Andinet IGCSE Success Initiative) is a free mentoring platform that connects IGCSE students
with mentors who have already sat the exams.

How people join:
- Students create an account on the login page, then complete the student registration form. Signing up grants the
  "student" role automatically, which unlocks the mentor directory and the student dashboard.
- Mentors apply through the three-step mentor application form. An administrator reviews every application. Once
  approved, the mentor receives dashboard access and a public profile in the mentor directory.
- Administrators are appointed through Netlify Identity by an existing administrator; they cannot be created from the site.

How mentoring works:
- A signed-in student browses the mentor directory, opens a mentor and books a session by choosing a subject, a topic
  and a date and time. The request starts as PENDING.
- The mentor approves or declines the request. Approved requests become UPCOMING.
- After the session the mentor logs the real duration, the topics covered, and uploads evidence. The session then sits
  in PENDING_REVIEW until an administrator verifies the evidence, at which point it becomes COMPLETED.
- Mentoring is always free of charge.

Ambassadors are students and graduates who represent GradeBridge in their schools and communities. Their profiles are
published on the ambassadors page and are managed by administrators.
`.trim()

export function buildTools(context: AssistantContext): AssistantTool[] {
  const tools: AssistantTool[] = [
    {
      name: 'search_ambassadors',
      description:
        'Search the published GradeBridge ambassadors by name, school, country, subject or achievement. Use this whenever the visitor asks who the ambassadors are or wants to reach one.',
      input_schema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Free-text search. Leave empty to list everyone.' },
        },
      },
    },
    {
      name: 'search_mentors',
      description:
        'Search published mentor profiles by subject or free text. Returns each mentor\'s subjects, biography, availability and how many students they already have booked this week. Only available to signed-in users.',
      input_schema: {
        type: 'object',
        properties: {
          subject: { type: 'string', description: 'Subject to filter on, e.g. "Physics".' },
          query: { type: 'string', description: 'Free-text search across name, bio and subjects.' },
        },
      },
    },
    {
      name: 'list_announcements',
      description: 'List the announcements that are currently published on the site.',
      input_schema: { type: 'object', properties: {} },
    },
    {
      name: 'get_site_guide',
      description:
        'Get the authoritative explanation of how GradeBridge works — registration, mentor applications, roles, the session lifecycle and pricing. Use this before answering any "how do I…" question.',
      input_schema: { type: 'object', properties: {} },
    },
    {
      name: 'navigate',
      description:
        'Send the visitor to a page on the site. Use it after explaining what they will find there. Never invent page keys.',
      input_schema: {
        type: 'object',
        properties: {
          page: { type: 'string', enum: Object.keys(SITE_PAGES), description: 'Which page to open.' },
          reason: { type: 'string', description: 'One short sentence telling the visitor why you are taking them there.' },
        },
        required: ['page'],
      },
    },
  ]

  if (context.user) {
    tools.push({
      name: 'get_my_account',
      description: 'Look up the signed-in visitor\'s own GradeBridge account: their role, and their student or mentor record if one exists.',
      input_schema: { type: 'object', properties: {} },
    })
    tools.push({
      name: 'get_my_sessions',
      description:
        'List the signed-in visitor\'s own mentoring sessions with their current status. Works for both students and mentors.',
      input_schema: { type: 'object', properties: {} },
    })
  }

  return tools
}

const formatDate = (value: Date | string | null) =>
  value ? new Date(value).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : null

async function searchAmbassadors(query: string) {
  const rows = await db
    .select()
    .from(ambassadors)
    .where(eq(ambassadors.isPublic, true))
    .orderBy(desc(ambassadors.featured), asc(ambassadors.sortOrder), asc(ambassadors.fullName))

  const needle = query.trim().toLowerCase()
  const matched = needle
    ? rows.filter((row) =>
        [row.fullName, row.title, row.school, row.country, row.city, row.bio, row.subjects, row.achievements, row.languages]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(needle)),
      )
    : rows

  return {
    count: matched.length,
    ambassadors: matched.slice(0, 12).map((row) => ({
      name: row.fullName,
      title: row.title,
      school: row.school,
      location: [row.city, row.country].filter(Boolean).join(', ') || null,
      graduationYear: row.graduationYear,
      bio: row.bio?.slice(0, 400) || null,
      subjects: parseList(row.subjects),
      languages: parseList(row.languages),
      achievements: parseList(row.achievements),
      featured: row.featured,
      profilePage: '/ambassadors',
    })),
  }
}

async function searchMentors(context: AssistantContext, subject: string, query: string) {
  if (!context.user) {
    return {
      error: 'The mentor directory is only available to signed-in users.',
      hint: 'Offer to take them to the login page or the student registration form.',
    }
  }

  const rows = await db.select().from(mentorProfiles).where(eq(mentorProfiles.isPublic, true))

  const subjectNeedle = subject.trim().toLowerCase()
  const textNeedle = query.trim().toLowerCase()

  const matched = rows.filter((row) => {
    const subjects = parseList(row.subjects)
    if (subjectNeedle && !subjects.some((entry) => entry.toLowerCase().includes(subjectNeedle))) return false
    if (!textNeedle) return true
    return [row.fullName, row.bio, row.availability, ...subjects]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(textNeedle))
  })

  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7))
  weekStart.setHours(0, 0, 0, 0)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)

  const sessions = await db.select().from(mentoringSessions)
  const bookedThisWeek = new Map<string, Set<string>>()
  for (const session of sessions) {
    if (!session.scheduledAt || !session.mentorIdentityUserId) continue
    const scheduledAt = new Date(session.scheduledAt)
    if (scheduledAt < weekStart || scheduledAt > weekEnd) continue
    if (session.status !== 'UPCOMING' && session.status !== 'COMPLETED') continue
    const current = bookedThisWeek.get(session.mentorIdentityUserId) ?? new Set<string>()
    current.add(`${session.studentName}::${session.studentContact}`)
    bookedThisWeek.set(session.mentorIdentityUserId, current)
  }

  return {
    count: matched.length,
    bookingPage: '/mentors',
    mentors: matched.slice(0, 10).map((row) => ({
      name: row.fullName,
      subjects: parseList(row.subjects),
      bio: row.bio?.slice(0, 400) || null,
      availability: row.availability || null,
      igcseGrades: row.igcseGrades ? (() => { try { return JSON.parse(row.igcseGrades) } catch { return row.igcseGrades } })() : null,
      studentsBookedThisWeek: bookedThisWeek.get(row.identityUserId)?.size ?? 0,
      weeklyCapacity: 4,
    })),
  }
}

async function listAnnouncements() {
  const now = new Date()
  const rows = await db
    .select()
    .from(announcements)
    .where(
      and(
        eq(announcements.archived, false),
        lte(announcements.publishDate, now),
        or(isNull(announcements.expiresAt), gt(announcements.expiresAt, now)),
      ),
    )
    .orderBy(desc(announcements.pinned), desc(announcements.publishDate))

  return {
    count: rows.length,
    announcements: rows.slice(0, 8).map((row) => ({
      title: row.title,
      body: row.body,
      pinned: row.pinned,
      publishedAt: formatDate(row.publishDate),
    })),
  }
}

async function getMyAccount(context: AssistantContext) {
  if (!context.user) return { error: 'Not signed in.' }

  const [studentRecord] = await db.select().from(students).where(eq(students.identityUserId, context.user.id))
  const [mentorRecord] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.identityUserId, context.user.id))

  return {
    email: context.user.email ?? null,
    name: context.user.name ?? null,
    role: context.role,
    studentRecord: studentRecord
      ? { fullName: studentRecord.fullName, gradeLevel: studentRecord.gradeLevel, age: studentRecord.age }
      : null,
    mentorProfile: mentorRecord
      ? {
          fullName: mentorRecord.fullName,
          subjects: parseList(mentorRecord.subjects),
          totalHoursTaught: mentorRecord.totalHoursTaught,
          isPublic: mentorRecord.isPublic,
        }
      : null,
  }
}

async function getMySessions(context: AssistantContext) {
  if (!context.user) return { error: 'Not signed in.' }

  if (context.role === 'mentor') {
    const rows = await db
      .select()
      .from(mentoringSessions)
      .where(eq(mentoringSessions.mentorIdentityUserId, context.user.id))
      .orderBy(asc(mentoringSessions.scheduledAt))

    return {
      perspective: 'mentor',
      count: rows.length,
      sessions: rows.slice(0, 20).map((row) => ({
        student: row.studentName,
        subject: row.subject,
        topic: row.topicDescription,
        scheduledAt: formatDate(row.scheduledAt),
        status: row.status,
      })),
    }
  }

  const rows = await db
    .select({
      mentorName: mentorProfiles.fullName,
      subject: mentoringSessions.subject,
      topicDescription: mentoringSessions.topicDescription,
      scheduledAt: mentoringSessions.scheduledAt,
      status: mentoringSessions.status,
      actualDurationMinutes: mentoringSessions.actualDurationMinutes,
    })
    .from(mentoringSessions)
    .leftJoin(mentorProfiles, eq(mentorProfiles.identityUserId, mentoringSessions.mentorIdentityUserId))
    .where(
      or(
        eq(mentoringSessions.studentIdentityUserId, context.user.id),
        and(
          eq(mentoringSessions.studentContact, context.user.email || ''),
          isNull(mentoringSessions.studentIdentityUserId),
        ),
      ),
    )
    .orderBy(asc(mentoringSessions.scheduledAt))

  return {
    perspective: 'student',
    count: rows.length,
    sessions: rows.slice(0, 20).map((row) => ({
      mentor: row.mentorName,
      subject: row.subject,
      topic: row.topicDescription,
      scheduledAt: formatDate(row.scheduledAt),
      status: row.status,
      loggedMinutes: row.actualDurationMinutes,
    })),
  }
}

export type ToolOutcome = {
  result: unknown
  /** Client-side action the browser should perform after the reply is rendered. */
  action?: { type: 'navigate'; path: string; reason?: string }
}

export async function runTool(
  name: string,
  input: Record<string, any>,
  context: AssistantContext,
): Promise<ToolOutcome> {
  switch (name) {
    case 'search_ambassadors':
      return { result: await searchAmbassadors(String(input.query ?? '')) }
    case 'search_mentors':
      return { result: await searchMentors(context, String(input.subject ?? ''), String(input.query ?? '')) }
    case 'list_announcements':
      return { result: await listAnnouncements() }
    case 'get_site_guide':
      return { result: { guide: SITE_GUIDE, pages: SITE_PAGES } }
    case 'get_my_account':
      return { result: await getMyAccount(context) }
    case 'get_my_sessions':
      return { result: await getMySessions(context) }
    case 'navigate': {
      const page = SITE_PAGES[String(input.page)]
      if (!page) return { result: { error: `Unknown page "${input.page}".`, availablePages: Object.keys(SITE_PAGES) } }
      if (page.requiresAuth && !context.user) {
        return {
          result: { error: `${page.path} requires signing in first.`, suggestion: 'Navigate to "login" instead.' },
        }
      }
      return {
        result: { navigated: true, path: page.path },
        action: { type: 'navigate', path: page.path, reason: input.reason ? String(input.reason) : undefined },
      }
    }
    default:
      return { result: { error: `Unknown tool "${name}".` } }
  }
}
