# AISI — Andinet IGCSE Success Initiative

A full-stack educational platform for the **Andinet IGCSE Success Initiative (AISI)**, a student-led community connecting IGCSE graduates with upcoming students through free mentoring and Q&A sessions.

## Tech Stack

- **Framework**: TanStack Start (React, SSR)
- **Styling**: Tailwind CSS v4
- **Database**: Netlify Database (Postgres) with Drizzle ORM
- **Authentication**: Netlify Identity via `@netlify/identity`
- **Deployment**: Netlify

## Features

- **Landing Page** — Hero section, animated stats, programs, testimonials, and dual CTA cards
- **Mentor Application** — 3-step form (personal info → subjects/availability → statement)
- **Student Registration** — Sign up with Identity + student record in DB
- **Mentor Directory** — Searchable, filterable grid of approved mentors with social contact buttons
- **Dashboards** — Role-based dashboards for students, mentors, and admins
- **Admin Panel** — Review and approve/reject mentor applications

## Running Locally

```bash
npm install
netlify dev --port 8889
```

> **Note**: Netlify Identity requires a deployed Netlify environment to function. Auth does not work on plain `localhost` — use `netlify dev` which proxies through Netlify's edge.

## Environment

The Netlify platform provides the database connection and Identity automatically. Initial administrator promotion uses one temporary environment variable:

- `ADMIN_BOOTSTRAP_EMAIL` — the email address of the existing account allowed to become the first administrator.

## First Admin Setup

1. Set `ADMIN_BOOTSTRAP_EMAIL` in Netlify to the email of your existing account and deploy.
2. Log in with that account.
3. From the site's browser console, run `fetch('/api/auth/bootstrap-admin', { method: 'POST' }).then((response) => response.json()).then(console.log)`.
4. Log out and log in again so Identity issues a token containing the `admin` role.
5. Remove `ADMIN_BOOTSTRAP_EMAIL` after promotion to disable the bootstrap endpoint.

The endpoint only promotes the authenticated account whose email exactly matches the server-side setting. It never creates a separate administrator account.
