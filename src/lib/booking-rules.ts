export const SESSION_DURATION_MINUTES = 60

export const startOfWeek = (date: Date) => {
  const start = new Date(date)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  start.setHours(0, 0, 0, 0)
  return start
}

export const endOfWeek = (date: Date) => {
  const end = new Date(date)
  const start = startOfWeek(date)
  end.setTime(start.getTime())
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export const parseAvailability = (raw: string) => {
  if (!raw) return []
  return raw
    .split(/[;,]/)
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

export const parseStructuredAvailability = (raw: string) => {
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const doesTimeMatchAvailability = (availability: string, date: Date, structuredAvailability = '') => {
  const structuredSource = structuredAvailability.trim() || availability
  const normalized = availability.toLowerCase()
  if (!normalized.trim() && !structuredAvailability.trim()) return true
  if (normalized.includes('flexible') || normalized.includes('anytime') || normalized.includes('weekdays') || normalized.includes('weekly')) {
    return true
  }

  const structuredSlots = parseStructuredAvailability(structuredSource)
  if (structuredSlots.length > 0) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const currentMinutes = date.getHours() * 60 + date.getMinutes()

    return structuredSlots.some((slot: any) => {
      const slotDay = String(slot?.day ?? '').toLowerCase()
      const dayMatch = slotDay === dayName || slotDay.includes(dayName)
      if (!dayMatch) return false

      const startMinutes = Number(slot?.start ?? 0)
      const endMinutes = Number(slot?.end ?? 24 * 60)
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes
    })
  }

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const hour = date.getHours()
  const hasDayMatch = parseAvailability(availability).some((slot) => slot.includes(dayName))

  if (hasDayMatch) {
    const timePattern = /\b(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?\s*(?:-|to|–)\s*(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?/i
    const match = normalized.match(timePattern)
    if (!match) return true

    const [, startHour, startMinutes, startMeridiem, endHour, endMinutes, endMeridiem] = match
    const startTime = Number(startHour) + (startMinutes ? Number(startMinutes) / 60 : 0) + ((startMeridiem && startMeridiem.toLowerCase() === 'pm' && Number(startHour) < 12) ? 12 : 0) - ((startMeridiem && startMeridiem.toLowerCase() === 'am' && Number(startHour) === 12) ? 12 : 0)
    const endTime = Number(endHour) + (endMinutes ? Number(endMinutes) / 60 : 0) + ((endMeridiem && endMeridiem.toLowerCase() === 'pm' && Number(endHour) < 12) ? 12 : 0) - ((endMeridiem && endMeridiem.toLowerCase() === 'am' && Number(endHour) === 12) ? 12 : 0)
    const currentTime = hour + (date.getMinutes() / 60)
    return currentTime >= startTime && currentTime <= endTime
  }

  return true
}
