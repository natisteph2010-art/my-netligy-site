import { admin, requestPasswordRecovery, type User } from '@netlify/identity'
import { eq, ilike } from 'drizzle-orm'

type IdentityModule = typeof import('@netlify/identity') & {
  init?: (config?: { url?: string; token?: string }) => void
}
import { db } from '../../db/index.js'
import {
  mentorApplications,
  mentorProfiles,
  students,
  userAccounts,
} from '../../db/schema.js'
import { syncUserAccount } from './authorization.js'

type MentorApplication = typeof mentorApplications.$inferSelect

export type ProvisionMentorResult = {
  identityUserId: string
  profileId: number
  createdUser: boolean
  passwordResetSent: boolean
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

async function initializeIdentityServerContext() {
  const identityModule = await import('@netlify/identity') as IdentityModule
  const initFn = identityModule.init

  if (typeof initFn !== 'function') return

  const netlifyEnv = (globalThis as typeof globalThis & {
    Netlify?: { env?: { get?: (name: string) => string | undefined } }
  }).Netlify?.env

  const identityUrl = netlifyEnv?.get?.('IDENTITY_URL') ?? netlifyEnv?.get?.('NETLIFY_IDENTITY_URL') ?? process.env.IDENTITY_URL ?? process.env.NETLIFY_IDENTITY_URL
  const identityToken = netlifyEnv?.get?.('IDENTITY_TOKEN') ?? netlifyEnv?.get?.('NETLIFY_IDENTITY_TOKEN') ?? process.env.IDENTITY_TOKEN ?? process.env.NETLIFY_IDENTITY_TOKEN

  if (!identityUrl && !identityToken) return

  initFn({ url: identityUrl, token: identityToken })
}

export async function sendMentorPasswordSetupEmail(email: string): Promise<boolean> {
  await initializeIdentityServerContext()

  try {
    await requestPasswordRecovery(normalizeEmail(email))
    return true
  } catch (error) {
    console.error(`Failed to send mentor password setup email to ${email}:`, error)
    return false
  }
}

async function findIdentityUserByEmail(email: string): Promise<User | null> {
  const normalized = normalizeEmail(email)

  const [account] = await db
    .select()
    .from(userAccounts)
    .where(ilike(userAccounts.email, normalized))
    .limit(1)
  if (account?.identityUserId) {
    try {
      return await admin.getUser(account.identityUserId)
    } catch {
      /* fall through */
    }
  }

  const [student] = await db
    .select()
    .from(students)
    .where(ilike(students.email, normalized))
    .limit(1)
  if (student?.identityUserId && student.identityUserId !== 'pending') {
    try {
      return await admin.getUser(student.identityUserId)
    } catch {
      /* fall through */
    }
  }

  let page = 1
  while (page <= 20) {
    const users = await admin.listUsers({ page, perPage: 100 })
    const match = users.find((user) => normalizeEmail(user.email ?? '') === normalized)
    if (match) return match
    if (users.length < 100) break
    page++
  }

  return null
}

async function assignMentorRole(userId: string) {
  const identityUser = await admin.getUser(userId)
  const existingRoles = Array.isArray(identityUser.appMetadata?.roles)
    ? identityUser.appMetadata.roles.filter((role): role is string => typeof role === 'string')
    : identityUser.roles ?? []
  const roles = Array.from(new Set([...existingRoles, 'mentor']))

  await admin.updateUser(userId, {
    role: 'mentor',
    app_metadata: { ...identityUser.appMetadata, roles },
    user_metadata: {
      ...identityUser.userMetadata,
      full_name: identityUser.userMetadata?.full_name ?? identityUser.name,
    },
  })
}

async function resolveIdentityUser(
  app: MentorApplication,
): Promise<{ user: User; createdUser: boolean; passwordResetSent: boolean }> {
  if (app.identityUserId) {
    const user = await admin.getUser(app.identityUserId)
    return { user, createdUser: false, passwordResetSent: false }
  }

  const existing = await findIdentityUserByEmail(app.email)
  if (existing) {
    return { user: existing, createdUser: false, passwordResetSent: false }
  }

  await initializeIdentityServerContext()

  const password = crypto.randomUUID() + crypto.randomUUID()
  const user = await admin.createUser({
    email: normalizeEmail(app.email),
    password,
    data: {
      role: 'mentor',
      user_metadata: { full_name: app.fullName },
      app_metadata: { roles: ['mentor'] },
    },
  })

  const passwordResetSent = await sendMentorPasswordSetupEmail(app.email)

  return { user, createdUser: true, passwordResetSent }
}

export async function provisionMentorFromApplication(
  app: MentorApplication,
): Promise<ProvisionMentorResult> {
  const [existingProfile] = await db
    .select()
    .from(mentorProfiles)
    .where(eq(mentorProfiles.applicationId, app.id))
    .limit(1)

  const { user, createdUser, passwordResetSent } = await resolveIdentityUser(app)

  if (createdUser && !passwordResetSent) {
    console.error(`ALERT: Mentor ${app.email} was created and approved but the password setup email failed to send. This account has no usable password.`)
  }

  await assignMentorRole(user.id)
  await syncUserAccount({ id: user.id, email: user.email ?? app.email }, 'mentor')

  if (existingProfile) {
    await db
      .update(mentorApplications)
      .set({
        status: 'approved',
        identityUserId: user.id,
        reviewedAt: new Date(),
      })
      .where(eq(mentorApplications.id, app.id))

    return {
      identityUserId: user.id,
      profileId: existingProfile.id,
      createdUser,
      passwordResetSent,
    }
  }

  const [profile] = await db
    .insert(mentorProfiles)
    .values({
      applicationId: app.id,
      identityUserId: user.id,
      fullName: app.fullName,
      email: app.email,
      bio: '',
      igcseGrades: '',
      subjects: app.subjects,
      reason: app.statement,
      availability: app.availability,
      contactEmail: app.email,
      whatsapp: app.phone || null,
      isPublic: true,
    })
    .returning()

  await db
    .update(mentorApplications)
    .set({
      status: 'approved',
      identityUserId: user.id,
      reviewedAt: new Date(),
    })
    .where(eq(mentorApplications.id, app.id))

  return {
    identityUserId: user.id,
    profileId: profile.id,
    createdUser,
    passwordResetSent,
  }
}
