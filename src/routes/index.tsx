import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import homePageContent from '../../content/pages/home.json'
import { AnnouncementBanner } from '../components/AnnouncementBanner'
import { GradeBridgeLogo } from '../components/GradeBridgeLogo'
import { EntranceOverlay } from '../components/EntranceOverlay'
import { KnowledgeConstellation } from '../components/KnowledgeConstellation'
import { ParticleNetwork } from '../components/ParticleNetwork'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

const DEFAULT_STATS = [
  { value: '52', label: 'Sessions/Year', icon: '📚' },
  { value: '12', label: 'Monthly Q&As', icon: '💬' },
]

const DEFAULT_ABOUT_CARDS = [
  { icon: '📌', title: 'Founded', value: '2023', desc: 'By IGCSE graduates' },
  { icon: '🌍', title: 'Mission', value: 'Free Access', desc: 'Quality mentorship for all' },
  { icon: '🏆', title: 'Focus', value: 'A* Results', desc: 'Proven exam strategies' },
  { icon: '🤗', title: 'Community', value: '200+ Members', desc: 'Growing student network' },
]

const DEFAULT_PROGRAM_CARDS = [
  {
    icon: '📚',
    eyebrow: 'Weekly',
    title: 'Free Tutoring Sessions',
    description: 'Every week, experienced mentors lead focused tutoring sessions covering IGCSE subjects. From exam technique to concept mastery — we\'ve got it covered.',
    benefits: ['Live interactive sessions', 'All major IGCSE subjects', 'Q&A time included', 'Recorded for later review'],
  },
  {
    icon: '💬',
    eyebrow: 'Monthly',
    title: 'In-Person Q&A Sessions',
    description: 'Once a month, we gather in person for open Q&A sessions where students can ask anything — from study strategies to career advice and everything in between.',
    benefits: ['Face-to-face interaction', 'No question too small', 'Multiple mentors present', 'Networking opportunities'],
  },
]

const SUBJECTS = ['Math', 'Physics', 'Chem', 'Bio', 'English', 'Geo', 'Computer Science', 'Business', 'ICT', 'Global Citizenship']

const BENEFITS = [
  { icon: '🆓', title: 'Completely Free', desc: 'All tutoring and Q&A sessions are free of charge for registered students.' },
  { icon: '🎯', title: 'Experienced Mentors', desc: 'Learn from students who have successfully completed IGCSE with excellent grades.' },
  { icon: '📅', title: 'Flexible Schedule', desc: 'Weekly and monthly sessions planned around your school timetable.' },
  { icon: '🤝', title: 'Peer Support', desc: 'Build lasting connections with students who understand your journey.' },
  { icon: '📖', title: 'Curated Resources', desc: 'Access study materials, past papers, and strategies proven to work.' },
  { icon: '💡', title: 'Live Q&A Sessions', desc: 'Get your burning questions answered in real-time by experienced mentors.' },
]

type HomePageContent = {
  title?: string
  heroKicker?: string
  heroEyebrow?: string
  heroHeadline?: string
  heroHighlight?: string
  heroSubtitle?: string
  heroPrimaryCta?: string
  heroSecondaryCta?: string
  stats?: Array<{ value: string; label: string; icon: string }>
  aboutEyebrow?: string
  aboutTitle?: string
  aboutBody1?: string
  aboutBody2?: string
  aboutCards?: Array<{ icon: string; title: string; value: string; desc: string }>
  programsEyebrow?: string
  programsTitle?: string
  programCards?: Array<{ icon: string; eyebrow: string; title: string; description: string; benefits: string[] }>
}

const pageContent = homePageContent as HomePageContent
const stats = pageContent.stats?.length ? pageContent.stats : DEFAULT_STATS
const aboutCards = pageContent.aboutCards?.length ? pageContent.aboutCards : DEFAULT_ABOUT_CARDS
const programCards = pageContent.programCards?.length ? pageContent.programCards : DEFAULT_PROGRAM_CARDS

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-fade').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function AnimatedCounter({ target }: { target: string }) {
  const [displayed, setDisplayed] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericPart = parseInt(target.replace(/\D/g, ''), 10)
          const suffix = target.replace(/[0-9]/g, '')
          let current = 0
          const step = Math.ceil(numericPart / 40)
          const timer = setInterval(() => {
            current = Math.min(current + step, numericPart)
            setDisplayed(current + suffix)
            if (current >= numericPart) clearInterval(timer)
          }, 30)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{displayed}</span>
}

export default function LandingPage() {
  useScrollReveal()
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setContactStatus('sending')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(event.target as HTMLFormElement)).toString(),
      })

      if (!response.ok) throw new Error('Contact form submission failed')

      event.currentTarget.reset()
      setContactStatus('sent')
    } catch {
      setContactStatus('error')
    }
  }

  return (
    <div className="min-h-screen">
      <EntranceOverlay />
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4">
        <AnnouncementBanner />
      </div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden cinematic-surface grid-pattern pt-20" data-sb-object-id="content/pages/home.json">
        <div className="aurora-layer" />
        <ParticleNetwork density={52} />
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-2 items-center">
            <div className="hero-content">
              <div className="hero-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.16em] uppercase mb-8 animate-fade-in-up" data-sb-field-path="heroKicker">
                <span className="w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse" />
                {pageContent.heroKicker || 'The Knowledge Network'}
              </div>
              <p className="text-sky-200 font-medium tracking-[0.28em] uppercase text-xs mb-5" data-sb-field-path="heroEyebrow">{pageContent.heroEyebrow || 'GradeBridge'}</p>
              <div data-sb-object-id="content/pages/home.json" data-sb-field-path="heroHeadline">
                <h1 data-sb-field-path="heroHeadline" className="hero-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] mb-7">
                  {pageContent.heroHeadline || 'A clearer path to'} <strong data-sb-field-path="heroHighlight" className="gradient-text">{pageContent.heroHighlight || 'understanding.'}</strong>
                </h1>
              </div>
              <p className="text-slate-300 text-lg sm:text-xl max-w-xl mb-9 leading-relaxed" data-sb-field-path="heroSubtitle">
                {pageContent.heroSubtitle || 'Students and mentors connected through knowledge, experience, and the quiet confidence that comes from learning together.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link to="/apply/mentor" className="btn-shimmer px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-xl shadow-sky-900/30 hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300" data-sb-field-path="heroPrimaryCta">{pageContent.heroPrimaryCta || 'Become a mentor'} <span aria-hidden="true">→</span></Link>
                <Link to="/register/student" className="btn-shimmer px-7 py-3.5 rounded-xl border border-sky-300/30 bg-sky-950/40 text-sky-100 font-semibold hover:bg-sky-900/50 hover:border-sky-200/60 transition-all duration-300" data-sb-field-path="heroSecondaryCta">{pageContent.heroSecondaryCta || 'Enroll as a student'}</Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end">
              <KnowledgeConstellation />
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-[10px] uppercase tracking-[0.2em]">
          <span>Explore the network</span>
          <div className="w-px h-9 bg-gradient-to-b from-sky-300 to-transparent animate-pulse" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8" data-sb-object-id="content/pages/home.json">
        <div className="max-w-6xl mx-auto">
          <div className="section-fade grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-teal-400 font-semibold tracking-wider uppercase text-sm" data-sb-field-path="aboutEyebrow">{pageContent.aboutEyebrow || 'About GradeBridge'}</span>
              <h2 className="text-4xl sm:text-5xl font-black mt-3 mb-6 text-white" data-sb-field-path="aboutTitle">
                {pageContent.aboutTitle || 'Built by students,'}<br />
                <span className="gradient-text">for students</span>
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed" data-sb-field-path="aboutBody1">
                {pageContent.aboutBody1 || 'GradeBridge was founded by IGCSE graduates who understood the unique challenges of navigating the Pearson Edexcel curriculum. We know how overwhelming it can feel — and we built this community to change that.'}
              </p>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed" data-sb-field-path="aboutBody2">
                {pageContent.aboutBody2 || 'Our mentors don\'t just teach content — they share lived experience, exam strategies, and the mindset needed to excel. Every student deserves access to quality guidance regardless of background.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full glass border border-blue-500/20 text-blue-300 text-sm">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-500/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-8 space-y-4" data-sb-object-id="content/pages/home.json" data-sb-field-path="aboutCards">
                {aboutCards.map((item, index) => 
                  index === 3 ? null : (
                    <div key={item.title} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors" data-sb-field-path={`aboutCards.${index}`}>
                      <span className="text-2xl" data-sb-field-path={`aboutCards.${index}.icon`}>{item.icon}</span>
                      <div className="flex-1">
                        {index === 0 ? (
                          <p className="text-white font-bold" data-sb-field-path={`aboutCards.${index}.title`}>
                            Founded {item.value} By {item.desc}
                          </p>
                        ) : (
                          <>
                            <p className="text-slate-400 text-xs uppercase tracking-wider" data-sb-field-path={`aboutCards.${index}.title`}>{item.title}</p>
                            <p className="text-white font-bold" data-sb-field-path={`aboutCards.${index}.value`}>{item.value}</p>
                          </>
                        )}
                      </div>
                      {index !== 0 && <p className="text-slate-400 text-sm" data-sb-field-path={`aboutCards.${index}.desc`}>{item.desc}</p>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30" data-sb-object-id="content/pages/home.json">
        <div className="max-w-6xl mx-auto">
          <div className="section-fade text-center mb-16">
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm" data-sb-field-path="programsEyebrow">{pageContent.programsEyebrow || 'Our Programs'}</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-3 text-white" data-sb-field-path="programsTitle">
              {pageContent.programsTitle ? pageContent.programsTitle.replace('Support', 'Support') : 'Structured'} <span className="gradient-text">Support</span> at Every Step
            </h2>
          </div>
          <div className="section-fade grid md:grid-cols-2 gap-8" data-sb-object-id="content/pages/home.json" data-sb-field-path="programCards">
            {programCards.map((card, index) => (
              <div key={card.title} className="glass rounded-3xl p-8 card-glow glass-hover relative overflow-hidden group" data-sb-field-path={`programCards.${index}`}>
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-colors" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-blue-500/30" data-sb-field-path={`programCards.${index}.icon`}>
                    {card.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold uppercase tracking-wider" data-sb-field-path={`programCards.${index}.eyebrow`}>{card.eyebrow}</span>
                  <h3 className="text-2xl font-black text-white mt-4 mb-3" data-sb-field-path={`programCards.${index}.title`}>{card.title}</h3>
                  <p className="text-slate-300 leading-relaxed mb-6" data-sb-field-path={`programCards.${index}.description`}>
                    {card.description}
                  </p>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    {card.benefits.map((item, bindex) => (
                      <li key={`${index}-${bindex}`} data-sb-field-path={`programCards.${index}.benefits.${bindex}`} className="flex items-center gap-2">
                        <span className="text-teal-400">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="section-fade text-center mb-16">
            <span className="text-cyan-300 font-semibold tracking-wider uppercase text-sm">Why Join GradeBridge</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-3 text-white">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
          </div>
          <div className="section-fade grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="glass rounded-2xl p-6 glass-hover card-glow group cursor-default">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{benefit.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main CTA Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="section-fade text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              Ready to <span className="gradient-text">Get Started?</span>
            </h2>
            <p className="text-slate-400 mt-4 text-lg">Choose your path and join the GradeBridge community today.</p>
          </div>
          <div className="section-fade grid md:grid-cols-2 gap-8">
            <Link
              to="/apply/mentor"
              className="group relative block rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-blue-800 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <div className="relative p-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl">
                  🎓
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Are You a Mentor?</h3>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Share your IGCSE knowledge and experience. Help the next generation achieve their goals.
                </p>
                <div className="flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all">
                  Apply to Mentor <span>→</span>
                </div>
              </div>
            </Link>

            <Link
              to="/register/student"
              className="group relative block rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-700 opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
              <div className="relative p-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform shadow-xl">
                  📖
                </div>
                <h3 className="text-3xl font-black text-white mb-3">Upcoming IGCSE Student?</h3>
                <p className="text-teal-100 text-lg mb-8 leading-relaxed">
                  Register to access free mentoring, tutoring sessions, and connect with experienced IGCSE graduates.
                </p>
                <div className="flex items-center gap-3 text-white font-semibold text-lg group-hover:gap-5 transition-all">
                  Register Now <span>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto section-fade text-center">
          <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-black mt-3 mb-6 text-white">
            Have Questions? <span className="gradient-text">We're Here.</span>
          </h2>
          <p className="text-slate-300 text-lg mb-12">
            Reach out through any of the platforms below. We'd love to hear from you.
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleContactSubmit}
            className="glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-900/20 mb-10 text-left"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Do not fill this out: <input name="bot-field" />
              </label>
            </p>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="contact-name" className="block text-slate-300 text-sm font-medium mb-2">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-slate-300 text-sm font-medium mb-2">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="contact-subject" className="block text-slate-300 text-sm font-medium mb-2">Subject</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="How can we help?"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="contact-message" className="block text-slate-300 text-sm font-medium mb-2">Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="Write your message..."
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="submit"
                disabled={contactStatus === 'sending'}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all btn-shimmer disabled:opacity-60 disabled:hover:scale-100"
              >
                {contactStatus === 'sending' ? 'Sending...' : contactStatus === 'sent' ? 'Submitted successfully' : 'Send Message'}
              </button>
              {contactStatus === 'sent' && (
                <p className="text-teal-300 text-sm font-medium">Submitted successfully. We&apos;ll reach out soon.</p>
              )}
              {contactStatus === 'error' && (
                <p className="text-red-300 text-sm font-medium">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '📧', label: 'Email', value: 'hello@gradebridge.com', href: 'mailto:hello@gradebridge.com' },
              { icon: '📱', label: 'Telegram', value: '@GradeBridge', href: '#' },
              { icon: '📸', label: 'Instagram', value: '@gradebridge', href: '#' },
            ].map((c) => (
              <a key={c.label} href={c.href} className="glass rounded-2xl p-6 glass-hover card-glow text-center block">
                <div className="text-3xl mb-3">{c.icon}</div>
                <p className="text-slate-400 text-sm mb-1">{c.label}</p>
                <p className="text-white font-semibold">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <GradeBridgeLogo compact />
                <span className="font-bold text-white text-lg">GradeBridge</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                GradeBridge — a student-led academic community dedicated to empowering IGCSE students through mentorship and community.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="/#about" className="hover:text-white transition-colors">About GradeBridge</a></li>
                <li><a href="/#programs" className="hover:text-white transition-colors">Programs</a></li>
                <li><Link to="/apply/mentor" className="hover:text-white transition-colors">Become a Mentor</Link></li>
                <li><Link to="/register/student" className="hover:text-white transition-colors">Student Registration</Link></li>
                <li><Link to="/mentors" className="hover:text-white transition-colors">Mentor Directory</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="mailto:hello@gradebridge.com" className="hover:text-white transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} GradeBridge. All rights reserved.</p>
            <p>Student-Led · Free Forever · Community Driven</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
