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

- Node.js 18+
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

Update `.env` with your settings if needed.

### 4. Run Database Migration

```bash
pnpm db:migrate // Chưa chạy được 
```

### 5. Seed Database (Optional - for demo data)

```bash
pnpm db:seed
```

### 6. Start Development Server

```bash
pnpm dev
```

The app will be available at:
- Japanese: http://localhost:3000/ja
- English: http://localhost:3000/en

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run unit/integration tests |
| `pnpm test:e2e` | Run E2E tests with Playwright |
| `pnpm db:up` | Start PostgreSQL container |
| `pnpm db:down` | Stop PostgreSQL container |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:seed` | Seed the database |
| `pnpm db:reset` | Reset database (migrate + seed) |
| `pnpm db:studio` | Open Prisma Studio |

## Demo Credentials

**Admin Account:**
- Email: `admin@jastech.local`
- Password: `admin123` (change this in production!)

*Note: The admin account will be created when you run the seed script in Milestone 1.*

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

- [x] **M0**: Repository Foundation
- [ ] **M1**: Data Model & Authentication
- [ ] **M2**: Public Site Shell & Design System
- [ ] **M3**: Section Registry & Page Builder
- [ ] **M4**: Content Modules
- [ ] **M5**: Local Media Service
- [ ] **M6**: Contact Workflow
- [ ] **M7**: SEO, Quality & Local Release

## License

Proprietary - Jastech Co., Ltd.
