import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/apply/mentor')({
  component: MentorApplyPage,
})

const AVAILABLE_SUBJECTS = [
  'Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology',
  'Combined Science', 'Economics', 'Business Studies', 'Accounting',
  'English Language', 'English Literature', 'History', 'Geography',
  'Computer Science', 'ICT', 'Art & Design', 'Music',
]

const AVAILABILITY_OPTIONS = [
  'Weekday mornings', 'Weekday afternoons', 'Weekday evenings',
  'Saturday mornings', 'Saturday afternoons', 'Sunday mornings', 'Sunday afternoons',
]

export default function MentorApplyPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    school: '',
    subjects: [] as string[],
    statement: '',
    availability: [] as string[],
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const set = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }))

  const toggleSubject = (s: string) => {
    set('subjects', form.subjects.includes(s) ? form.subjects.filter((x) => x !== s) : [...form.subjects, s])
  }

  const toggleAvailability = (a: string) => {
    set('availability', form.availability.includes(a) ? form.availability.filter((x) => x !== a) : [...form.availability, a])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.subjects.length === 0) { setError('Please select at least one subject.'); return }
    if (form.availability.length === 0) { setError('Please select at least one availability slot.'); return }

    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/applications/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, availability: form.availability.join(', ') }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Submission failed. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 stars-bg">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-teal-500/30 animate-pulse-glow">
            ✓
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Application Submitted!</h1>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Thank you for applying to become a GradeBridge mentor. Our team will review your application and get back to you within 3–5 business days.
          </p>
          <Link to="/" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-24 stars-bg grid-pattern">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span className="text-white font-bold text-lg">GradeBridge</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            🎓 Mentor Application
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            Become a <span className="gradient-text">GradeBridge Mentor</span>
          </h1>
          <p className="text-slate-400">
            Share your IGCSE expertise and help the next generation succeed. Applications are reviewed within 3–5 business days.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/10 text-slate-400'
              }`}>
                {step > s ? '✓' : s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-blue-600' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-400 mb-10 -mt-4">
          <span>Personal Info</span>
          <span>Subjects</span>
          <span>Statement</span>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 shadow-2xl shadow-blue-900/20">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
              {[
                { field: 'fullName', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                { field: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
                { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 000-0000' },
                { field: 'school', label: 'Current School / University', type: 'text', placeholder: 'Where are you studying?' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[field]}
                    onChange={(e) => set(field, e.target.value)}
                    required
                    placeholder={placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  if (!form.fullName || !form.email || !form.phone || !form.school) {
                    setError('Please fill in all fields.')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20 mt-2"
              >
                Next: Select Subjects →
              </button>
            </div>
          )}

          {/* Step 2: Subjects & Availability */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-2">Subjects &amp; Availability</h2>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">
                  Subjects You Can Teach <span className="text-slate-500">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        form.subjects.includes(s)
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:border-blue-500/30 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">
                  Availability <span className="text-slate-500">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAvailability(a)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        form.availability.includes(a)
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                          : 'bg-white/5 text-slate-300 border border-white/10 hover:border-teal-500/30 hover:text-white'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all">
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (form.subjects.length === 0) { setError('Select at least one subject.'); return }
                    if (form.availability.length === 0) { setError('Select at least one availability slot.'); return }
                    setError('')
                    setStep(3)
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
                >
                  Next: Statement →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Statement */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-2">Personal Statement</h2>
              <p className="text-slate-400 text-sm">
                Tell us about yourself, your IGCSE experience, why you want to mentor, and what makes you a great candidate.
              </p>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">
                  Personal Statement <span className="text-slate-500">(min 100 words)</span>
                </label>
                <textarea
                  value={form.statement}
                  onChange={(e) => set('statement', e.target.value)}
                  required
                  minLength={100}
                  rows={8}
                  placeholder="Share your IGCSE journey, the grades you achieved, your teaching style, and why you're passionate about helping fellow students..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
                <p className="text-slate-500 text-xs mt-1">{form.statement.split(/\s+/).filter(Boolean).length} words</p>
              </div>

              {error && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white font-semibold transition-all">
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20 btn-shimmer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting…
                    </span>
                  ) : 'Submit Application 🚀'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
