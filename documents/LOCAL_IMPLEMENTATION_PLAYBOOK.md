# Local Implementation Playbook — Jastech Website

This document turns the product specification into a controlled execution plan for a coding agent. The current target is a verified local application, not a deployment.

## 1. Required agent brief

Use this prompt when assigning the repository to an implementation agent:

> Implement the Jastech website locally. Read `AGENTS.md`, `JASTECH_WEBSITE_SPECIFICATION.md`, and `LOCAL_IMPLEMENTATION_PLAYBOOK.md` completely before acting. Follow the milestone order and stop after the requested milestone. Do not deploy, create external accounts, use production credentials, or add out-of-scope features. Preserve all existing user changes. Use placeholders only when clearly marked as draft/demo data. At the end, run the required verification commands and report changed files, test results, assumptions, and remaining work.

For safer review, assign one milestone at a time instead of asking an agent to build the entire system in one turn.

## 2. Proposed repository structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── (marketing)/
│   │   ├── services/
│   │   ├── case-studies/
│   │   ├── insights/
│   │   └── contact/
│   ├── admin/
│   └── api/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   └── admin/
├── features/
│   ├── auth/
│   ├── pages/
│   ├── services/
│   ├── case-studies/
│   ├── posts/
│   ├── media/
│   └── contacts/
├── lib/
│   ├── db/
│   ├── auth/
│   ├── i18n/
│   ├── validation/
│   └── services/
├── server/
└── styles/
prisma/
├── schema.prisma
├── migrations/
└── seed.ts
public/
tests/
├── integration/
└── e2e/
```

Organize by feature when code is domain-specific. Keep truly reusable visual primitives under `components/ui`.

## 3. Milestone plan

### Milestone 0 — Repository foundation

Deliverables:

- Next.js App Router project with TypeScript strict mode.
- Tailwind CSS and base design tokens.
- ESLint/formatting configuration.
- `pnpm` scripts.
- Docker Compose PostgreSQL.
- Prisma configuration.
- `.env.example` and gitignore rules.
- README with clean local setup.
- Basic Vitest and Playwright setup.

Acceptance checks:

- A fresh checkout can install dependencies.
- PostgreSQL starts locally.
- Migration and seed run from scratch.
- Dev server opens a minimal Japanese landing route and English counterpart.
- Typecheck, tests and build pass.

Do not build the CMS in this milestone.

### Milestone 1 — Data model and authentication

Deliverables:

- Core Prisma models for admin, pages, translations, sections, services, case studies, posts, categories, tags, media, contacts and settings.
- One seeded Admin account using local-only demo credentials documented in README.
- Secure login/logout and server-side admin route protection.
- Draft/published state model.
- Translation completeness validation.
- Initial audit event structure.

Acceptance checks:

- Anonymous users cannot access `/admin`.
- Admin login works locally.
- Password is never stored in plaintext.
- Publishing fails when required Japanese or English data is incomplete.
- Database can be reset and reseeded reproducibly.

### Milestone 2 — Public site shell and design system

Deliverables:

- Locale-aware routing.
- Header, navigation, language switcher and footer.
- Typography, colors, spacing and responsive grid.
- Accessible UI primitives.
- Placeholder home, service, case study, insight and contact routes.
- Metadata, canonical and `hreflang` foundation.

Acceptance checks:

- Locale switching retains the equivalent route where available.
- Navigation works with keyboard and mobile menu.
- Layout is verified at 360, 768, 1024 and 1440 px.
- No Netcompany assets, copy or exact layout are reproduced.

### Milestone 3 — Section registry and page builder

Start with a constrained vertical slice:

1. Hero image/video.
2. Rich text.
3. Text + image.
4. Services grid.
5. Case studies grid.
6. Statistics.
7. Contact CTA.

Deliverables:

- Typed, versioned section registry.
- Section renderer for public pages.
- Admin editor for supported section types.
- Add, remove, duplicate, enable/disable and reorder actions.
- Safe design token options.
- Preview mode.
- Graceful handling of invalid or legacy section data.

Add the remaining section types only after this vertical slice is verified.

Acceptance checks:

- Admin creates a page from a template.
- Admin reorders sections and preview reflects the result.
- Invalid payloads are rejected server-side.
- Public rendering never executes user-provided code.

### Milestone 4 — Content modules

Deliverables:

- CRUD for services.
- CRUD for case studies with public/anonymized customer mode.
- CRUD for insights, categories and tags.
- Japanese/English editorial workflow.
- Related-content selection.
- Public listing and detail pages.

Acceptance checks:

- Draft content is never visible publicly.
- Slugs are unique per locale and content type.
- Missing translations block publishing.
- Anonymous case studies do not leak customer names in metadata or structured data.

### Milestone 5 — Local media service

Deliverables:

- `MediaStorage` interface.
- Local filesystem adapter using a gitignored runtime directory.
- Upload validation for type and size.
- Media metadata, alt text and focal point.
- Image rendering abstraction compatible with a future Cloudinary adapter.
- Poster/fallback behavior for video.

Acceptance checks:

- Upload works locally without a Cloudinary account.
- Invalid file types and oversized files are rejected.
- Deleting a referenced media item is blocked or requires explicit resolution.
- Application records do not depend on absolute developer-machine paths.

### Milestone 6 — Contact workflow

Deliverables:

- Localized contact form.
- Server-side Zod validation.
- Contact database storage.
- Status workflow: New, Contacted, Closed.
- Admin list, filters, detail, notes and CSV export.
- Local email adapter that previews/logs a sanitized notification.
- Rate limiting and local anti-spam strategy.

Acceptance checks:

- Valid submission is stored once.
- Invalid submissions produce localized messages.
- Repeated submissions are rate limited.
- No external email is sent in local-only mode.
- CSV output is protected against spreadsheet formula injection.

### Milestone 7 — SEO, quality and local release candidate

Deliverables:

- Sitemap and robots behavior.
- Organization, Article and Breadcrumb structured data.
- Open Graph metadata.
- Error, not-found, loading and empty states.
- Accessibility review.
- Responsive and browser review.
- Performance pass for images, fonts and client JavaScript.
- Complete README and local demo instructions.

Acceptance checks:

- Main user and admin flows pass Playwright tests.
- Typecheck, tests and production build pass.
- No production credentials or external resources are required.
- Known limitations and production-readiness gaps are documented.

## 4. Local environment contract

Recommended `.env.example` shape:

```dotenv
DATABASE_URL=postgresql://jastech:jastech@localhost:5432/jastech
AUTH_SECRET=replace-with-local-development-secret
APP_URL=http://localhost:3000
MEDIA_DRIVER=local
MEDIA_LOCAL_DIRECTORY=.runtime/uploads
EMAIL_DRIVER=log
ADMIN_EMAIL=admin@jastech.local
ADMIN_PASSWORD=replace-for-local-use
```

Values above are development examples, not production credentials.

Recommended scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "db:up": "docker compose up -d db",
    "db:down": "docker compose down",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset"
  }
}
```

The implementation agent may adjust exact command bodies to match tool versions, but the command names and outcomes should remain stable.

## 5. Decisions that require user approval

An agent must not decide these silently:

- Replacing the official logo or changing the company name.
- Publishing or deploying the site.
- Purchasing a domain or paid service.
- Creating Cloudinary, Vercel, Supabase, Neon, Resend or other external accounts.
- Sending real email to customers or staff.
- Publishing real client names, testimonials or project details not explicitly provided.
- Changing the three MVP service categories.
- Adding pricing, payments, careers, public accounts or a customer portal.
- Enabling analytics, advertising pixels or non-essential cookies.
- Changing the selected core framework or database.

## 6. Review checklist for each agent handoff

Require the agent to answer:

1. Which milestone and acceptance criteria were completed?
2. Which files were added or changed?
3. Which assumptions were made?
4. Which migrations or environment variables were added?
5. Which commands were run, and what were their results?
6. What remains incomplete or intentionally deferred?
7. Did the work introduce any external dependency, account or irreversible decision?

Reject a handoff that only says the feature is complete without verification evidence.

## 7. Production work explicitly deferred

The following belongs to a later production-readiness phase:

- Cloudinary adapter and production media migration.
- Production email provider.
- Managed PostgreSQL provisioning.
- Domain and DNS.
- Vercel or other deployment configuration.
- Production secrets and secret rotation.
- Monitoring alerts and operational ownership.
- Database backup/restore drill.
- Legal review of Privacy Policy and cookie consent.
- Japanese copy review by the responsible language team.
- Final logo/vector asset and brand guideline.
- Analytics and consent management.
- Penetration/security review appropriate to launch risk.

