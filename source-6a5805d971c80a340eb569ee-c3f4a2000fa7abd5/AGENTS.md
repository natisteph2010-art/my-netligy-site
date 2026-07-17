# AISI Project Architecture

AISI is a TanStack Start (React + SSR) application for the Andinet IGCSE Success Initiative, deployed on Netlify. It uses Netlify Identity for authentication and Netlify Database (Postgres via Drizzle ORM) for data persistence.

## Directory Structure

```
src/
├── routes/                   # File-based routing (TanStack Router)
│   ├── __root.tsx            # Root layout: NavBar, IdentityProvider, CallbackHandler
│   ├── index.tsx             # Landing page (hero, stats, programs, testimonials)
│   ├── login.tsx             # Login + signup page
│   ├── mentors.tsx           # Mentor directory (requires auth)
│   ├── apply/
│   │   └── mentor.tsx        # 3-step mentor application form
│   ├── register/
│   │   └── student.tsx       # Student registration form
│   ├── dashboard/
│   │   ├── student.tsx       # Student dashboard
│   │   ├── mentor.tsx        # Mentor dashboard with profile editor
│   │   └── admin.tsx         # Admin dashboard with application review
│   └── api/                  # Server-only API routes (no React component)
│       ├── applications/
│       │   ├── mentor.ts     # GET (admin list) / POST (submit application)
│       │   └── mentor.$id.review.ts  # POST (approve/reject)
│       ├── register/
│       │   └── student.ts    # POST (create student record)
│       └── mentors/
│           ├── directory.ts  # GET (list approved mentors, auth required)
│           └── profile.$userId.ts  # GET/PUT (mentor profile)
├── lib/
│   ├── auth.ts               # getServerUser server function
│   └── identity-context.tsx  # IdentityProvider + useIdentity hook
├── middleware/
│   └── identity.ts           # identityMiddleware, requireAuthMiddleware
├── components/
│   └── CallbackHandler.tsx   # Processes OAuth/confirm/recovery URL hash callbacks
└── styles.css                # Global styles + custom animations/utilities

db/
├── schema.ts                 # Drizzle schema (mentorApplications, mentorProfiles, students)
└── index.ts                  # Drizzle client (drizzle-orm/netlify-db)

netlify/
├── database/migrations/      # Auto-applied Drizzle migrations
└── functions/
    └── identity-signup.mts   # Identity webhook: assign 'student' role on signup

drizzle.config.ts             # Points migrations to netlify/database/migrations/
```

## Authentication

- Uses `@netlify/identity` exclusively — never `netlify-identity-widget` or `gotrue-js`
- Auth only works on deployed Netlify environments (not plain localhost)
- Client-side: `useIdentity()` hook from `IdentityProvider` in `__root.tsx`
- Server-side: `getUser()` from `@netlify/identity` in API routes

### Role System

| Role | Assignment | Access |
|------|-----------|--------|
| `student` | Auto on signup (identity-signup.mts webhook) | Mentor directory, student dashboard |
| `mentor` | Admin sets after approving application | Mentor dashboard, profile editor |
| `admin` | Set via Netlify Identity dashboard | Admin dashboard, application review |

### First Admin Setup

Admins cannot be created via code. Must be done through Netlify Dashboard:
1. Go to **Identity → Invite users**
2. After accepting invite, go to **Identity → [User] → Roles** and add `admin`

## Database

- Uses `drizzle-orm@beta` and `drizzle-kit@beta` (required for Netlify Database adapter)
- Migrations live in `netlify/database/migrations/` — applied automatically on deploy
- After schema changes: run `npx drizzle-kit generate`
- **Never** run `drizzle-kit migrate` or DDL directly

### Schema Tables

| Table | Purpose |
|-------|---------|
| `mentor_applications` | Submitted mentor applications (pending/approved/rejected) |
| `mentor_profiles` | Published profiles for approved mentors |
| `students` | Registered student records |

## CSS Utility Classes (src/styles.css)

| Class | Effect |
|-------|--------|
| `.glass` | Glassmorphism: frosted background + border |
| `.glass-hover` | Hover: lift + glow border |
| `.card-glow` | Hover: blue shadow glow |
| `.gradient-text` | Blue-to-teal gradient text |
| `.gradient-text-gold` | Gold gradient text |
| `.btn-shimmer` | Shimmer sweep on hover |
| `.section-fade` | Scroll-reveal animation (add `.visible` class via JS) |
| `.stars-bg` | Radial gradient blobs background |
| `.grid-pattern` | Subtle dot grid overlay |
| `.animate-float` | Floating up/down animation |
| `.animate-pulse-glow` | Pulsing box shadow |

## Adding New API Routes

Create a file under `src/routes/api/`. Path determines URL:
- `src/routes/api/foo.ts` → `/api/foo`
- `src/routes/api/foo/$id.ts` → `/api/foo/:id`

All handlers check auth via `getUser()` from `@netlify/identity`.

## Conventions

- Components use `export default` for page components, named `export const Route`
- API-only routes export only `Route` (no React component)
- Subjects and IGCSE grades stored as JSON strings in text DB columns — always JSON.parse with fallback
- `subjectsList` arrays are serialized to JSON before saving to DB
