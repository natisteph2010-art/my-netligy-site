import test from 'node:test'
import assert from 'node:assert/strict'
import { doesTimeMatchAvailability, endOfWeek, startOfWeek } from '../src/lib/booking-rules.ts'

test('structured availability accepts a time inside a slot', () => {
  const date = new Date(2026, 8, 21, 15, 30)
  assert.equal(doesTimeMatchAvailability('legacy value', date, JSON.stringify([{ day: 'Monday', start: 900, end: 1020 }])), true)
})

test('structured availability rejects a time outside a slot', () => {
  const date = new Date(2026, 8, 21, 18, 0)
  assert.equal(doesTimeMatchAvailability('legacy value', date, JSON.stringify([{ day: 'Monday', start: 900, end: 1020 }])), false)
})

test('week helpers cover a Monday through Sunday window', () => {
  const date = new Date(2026, 8, 23, 12, 0)
  assert.equal(startOfWeek(date).getDay(), 1)
  assert.equal(endOfWeek(date).getDay(), 0)
})