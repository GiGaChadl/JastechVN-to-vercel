# Jastech Website

A bilingual B2B corporate website for Japanese companies seeking software development services from Jastech in Vietnam.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Docker Compose
- **ORM**: Prisma
- **i18n**: next-intl (Japanese & English)
- **Testing**: Vitest (unit/integration) + Playwright (E2E)
- **Package Manager**: pnpm

## Prerequisites

- Node.js 22.18+ (the DB seed/tests use native TypeScript execution)
- pnpm 9+
- Docker Desktop (for PostgreSQL)

## Local Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
pnpm db:up
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Set `ADMIN_EMAIL` and a non-placeholder `ADMIN_PASSWORD` of at least 12 characters.
Keep `.env` private. The seed only accepts local database hosts.
Use the same environment for install and commands: dependencies installed in WSL
must be run from WSL, not from Windows Node.js.

### 4. Apply the Committed Database Migration

```bash
pnpm db:deploy
pnpm db:generate
```

### 5. Seed the Local Admin and Draft Data

```bash
pnpm db:seed
```

Seed creates dummy data in all 32 application tables: one admin, three draft services,
two draft pages (home and demo showcase), sections, three case studies, three articles,
categories/tags, three Unsplash images, three sample contacts, notes and history.
Localizable demo content includes Japanese and English. Header/footer menus stay empty;
a separate disabled demo menu contains sample items.
It is transactional and safe to repeat: existing records and passwords are preserved.
Fictional projects and contacts are explicitly marked DRAFT/DEMO; contact emails use
`example.invalid`. Sessions/reset tokens are expired fixtures and cannot be used to log in.

For future schema edits use `pnpm db:migrate --name describe_change` and commit
the generated migration. `pnpm db:reset` is destructive; use it only on a disposable DB.

### 6. Start Development Server

```bash
pnpm dev
```

The app will be available at:

- Japanese: http://localhost:3000/ja
- English: http://localhost:3000/en

## Scripts

| Command            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `pnpm dev`         | Start development server                                        |
| `pnpm build`       | Build for production                                            |
| `pnpm start`       | Start production server                                         |
| `pnpm lint`        | Run ESLint                                                      |
| `pnpm typecheck`   | Run TypeScript type checking                                    |
| `pnpm test`        | Run unit/integration tests                                      |
| `pnpm test:e2e`    | Run E2E tests with Playwright                                   |
| `pnpm db:up`       | Start PostgreSQL container                                      |
| `pnpm db:down`     | Stop PostgreSQL container                                       |
| `pnpm db:migrate`  | Run Prisma migrations                                           |
| `pnpm db:seed`     | Seed the database                                               |
| `pnpm db:reset`    | Reset database (migrate + seed)                                 |
| `pnpm db:studio`   | Open Prisma Studio                                              |
| `pnpm db:deploy`   | Apply committed migrations without a shadow database            |
| `pnpm db:generate` | Generate Prisma Client                                          |
| `pnpm db:validate` | Validate the Prisma schema                                      |
| `pnpm db:test`     | Run DB integration tests against a separate local `*_dbtest` DB |

## Test runners

`pnpm test` runs unit/integration tests with Vitest. Files under
`tests/e2e/` are excluded because they require the Playwright runner.
Run them with `pnpm test:e2e` (or `pnpm test:e2e --project=chromium`
for a single browser project).

Application tests currently only cover E2E. Database integration tests use Node's
test runner separately; see [prisma/README.md](prisma/README.md). Until application
unit/integration tests are added, Vitest reports `No test files found`. For an explicit temporary empty-suite
check, run `pnpm exec vitest run --passWithNoTests`; this does not verify application behavior.

## Demo Credentials

**Admin Account:**

- Email: `admin@jastech.local`
- Password: the value you configure in your private `.env` as `ADMIN_PASSWORD`.

The seed stores a salted scrypt hash, never a plaintext password. There is no login
screen or authentication backend yet; creating the DB record does not implement login.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── [locale]/         # Locale-specific routes
│   │   ├── page.tsx     # Homepage
│   │   └── layout.tsx   # Locale layout
│   ├── admin/           # Admin CMS routes
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/             # Reusable UI primitives
│   ├── layout/         # Header, Footer, etc.
│   └── sections/       # Page builder sections
├── lib/                # Utilities
│   ├── db/            # Prisma client
│   ├── i18n/          # i18n configuration
│   └── utils/         # Helper functions
├── messages/          # Translation files
│   ├── ja.json
│   └── en.json
└── tests/             # Test setup
prisma/
├── schema.prisma      # Database schema
└── seed.ts           # Seed script
```

## Milestones

- [ ] **M0**: Repository Foundation — scaffold exists; full app checks remain pending
- [ ] **M1**: Data Model & Authentication — DB schema/migration/seed implemented; authentication deferred
- [ ] **M2**: Public Site Shell & Design System
- [ ] **M3**: Section Registry & Page Builder
- [ ] **M4**: Content Modules
- [ ] **M5**: Local Media Service
- [ ] **M6**: Contact Workflow
- [ ] **M7**: SEO, Quality & Local Release

Current scope stops at the database. Backend APIs, publishing/translation validation,
session handling, storage/email adapters and frontend implementation remain deferred.
See [database notes](prisma/README.md) for schema guarantees and verification commands.

## License

Proprietary - Jastech Co., Ltd.
