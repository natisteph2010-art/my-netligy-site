import type { InferSelectModel } from 'drizzle-orm'
import type { ambassadors } from '../../db/schema.js'

/** Netlify Blobs store holding uploaded ambassador profile pictures. */
export const PHOTO_STORE = 'ambassador-photos'

export type AmbassadorRow = InferSelectModel<typeof ambassadors>

/** Fields an administrator may set when creating or editing an ambassador. */
export const AMBASSADOR_TEXT_FIELDS = [
  'fullName',
  'title',
  'school',
  'country',
  'city',
  'graduationYear',
  'bio',
  'photoUrl',
  'contactEmail',
  'instagram',
  'telegram',
  'whatsapp',
  'linkedin',
  'website',
] as const

export const AMBASSADOR_LIST_FIELDS = ['achievements', 'subjects', 'languages'] as const

/** Subjects/achievements/languages are stored as JSON strings — always parse with a fallback. */
export function parseList(raw: string | null | undefined): string[] {
  if (!raw) return []
  try {
    const value = JSON.parse(raw)
    if (Array.isArray(value)) return value.map(String).filter(Boolean)
  } catch {
    /* fall through to comma-separated parsing */
  }
  return raw.split(',').map((entry) => entry.trim()).filter(Boolean)
}

export function serializeList(value: unknown): string {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map((entry) => String(entry).trim()).filter(Boolean))
  }
  if (typeof value === 'string') return JSON.stringify(parseList(value))
  return JSON.stringify([])
}

/** Build the column patch for an insert/update from an untrusted request body. */
export function buildAmbassadorValues(body: Record<string, any>, { partial }: { partial: boolean }) {
  const values: Record<string, any> = {}

  for (const field of AMBASSADOR_TEXT_FIELDS) {
    if (partial && !(field in body)) continue
    const raw = body[field]
    const text = raw === null || raw === undefined ? '' : String(raw).trim()
    values[field] = text === '' ? null : text
  }

  for (const field of AMBASSADOR_LIST_FIELDS) {
    if (partial && !(field in body)) continue
    values[field] = serializeList(body[field])
  }

  if (!partial || 'featured' in body) values.featured = !!body.featured
  if (!partial || 'isPublic' in body) values.isPublic = body.isPublic === undefined ? true : !!body.isPublic
  if (!partial || 'sortOrder' in body) values.sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0

  // Columns that are NOT NULL in the database must never be set to null.
  if ('fullName' in values && !values.fullName) delete values.fullName
  if ('title' in values && !values.title) values.title = 'Student Ambassador'
  if ('bio' in values && values.bio === null) values.bio = ''

  return values
}

/** Shape an ambassador row for public consumption (lists already parsed). */
export function toPublicAmbassador(row: AmbassadorRow) {
  return {
    id: row.id,
    fullName: row.fullName,
    title: row.title,
    school: row.school,
    country: row.country,
    city: row.city,
    graduationYear: row.graduationYear,
    bio: row.bio,
    achievements: parseList(row.achievements),
    subjects: parseList(row.subjects),
    languages: parseList(row.languages),
    photoUrl: row.photoUrl,
    contactEmail: row.contactEmail,
    instagram: row.instagram,
    telegram: row.telegram,
    whatsapp: row.whatsapp,
    linkedin: row.linkedin,
    website: row.website,
    featured: row.featured,
    sortOrder: row.sortOrder,
  }
}

/** Shape returned by every ambassador API route. */
export type PublicAmbassador = ReturnType<typeof toPublicAmbassador>

/** Admin listings also expose the published/hidden flag. */
export type AdminAmbassador = PublicAmbassador & { isPublic: boolean }
