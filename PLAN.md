# Plan: Milestone 0 — Repository Foundation

## Context

Repository Jastech Website hoàn toàn trống (chỉ có documentation files). Cần khởi tạo foundation cho một Next.js project theo đặc tả:
- Next.js App Router + TypeScript strict mode
- Tailwind CSS
- PostgreSQL qua Docker Compose
- Prisma ORM
- pnpm package manager
- next-intl cho i18n (Nhật/Anh)

## Implementation Steps

### 1. Initialize Next.js project

```bash
cd /mnt/d/TranDangKhoa/Project/JastechVN
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-pnpm
```

Cờ quan trọng:
- `--typescript --strict` cho TypeScript strict mode
- `--tailwind` cho Tailwind CSS
- `--eslint` cho ESLint
- `--app` cho App Router
- `--src-dir` đặt code trong src/

### 2. Cấu trúc thư mục theo spec

```
src/
├── app/
│   ├── [locale]/           # Dynamic locale segment
│   │   ├── page.tsx        # Home
│   │   └── layout.tsx      # Locale layout
│   ├── admin/              # Admin routes
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI primitives
│   ├── layout/             # Header, Footer, etc.
│   └── sections/           # Page builder sections
├── lib/
│   ├── db/                 # Prisma client
│   ├── auth/               # Authentication
│   ├── i18n/               # i18n utilities
│   └── validation/         # Zod schemas
├── styles/
│   └── globals.css         # Global styles + Tailwind
prisma/
├── schema.prisma
└── seed.ts
public/
├── images/
└── fonts/
tests/
├── unit/
└── e2e/
```

### 3. Cấu hình Tailwind Design Tokens

```js
// tailwind.config.ts
colors: {
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  navy: '#1e3a5f',
  accent: '#06b6d4',
  background: '#fafafa',
  foreground: '#1a1a1a',
}
```

### 4. Docker Compose cho PostgreSQL

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: jastech
      POSTGRES_PASSWORD: jastech
      POSTGRES_DB: jastech
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 5. Cấu hình Prisma

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 6. Cài đặt dependencies cần thiết

```bash
pnpm add next-intl @prisma/client zod react-hook-form @hookform/resolvers clsx tailwind-merge lucide-react
pnpm add -D prisma @types/node eslint prettier eslint-config-prettier vitest @vitejs/plugin-react @testing-library/react @testing-library/dom @playwright/test
```

### 7. Thiết lập next-intl

```ts
// src/i18n/config.ts
export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';
```

### 8. Tạo .env.example

```dotenv
DATABASE_URL=postgresql://jastech:jastech@localhost:5432/jastech
AUTH_SECRET=replace-with-local-development-secret
APP_URL=http://localhost:3000
MEDIA_DRIVER=local
MEDIA_LOCAL_DIRECTORY=.runtime/uploads
EMAIL_DRIVER=log
```

### 9. Cấu hình ESLint + Prettier

```json
// .eslintrc.json - extends next/core-web-vitals, prettier
// .prettierrc - semi: false, singleQuote: true, etc.
```

### 10. Scripts trong package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:up": "docker compose up -d db",
    "db:down": "docker compose down",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:reset": "prisma migrate reset",
    "db:studio": "prisma studio"
  }
}
```

### 11. Basic Vitest config

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

### 12. Playwright setup

```bash
pnpm playwright install --with-deps chromium
```

### 13. README với setup instructions

Hướng dẫn:
1. Clone repository
2. `pnpm install`
3. `pnpm db:up`
4. `pnpm db:migrate`
5. `pnpm db:seed`
6. `pnpm dev`

### 14. Gitignore rules

```
# Dependencies
node_modules/

# Next.js
.next/
out/

# Production
build/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Runtime
.runtime/

# Prisma
prisma/migrations/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
test-results/
playwright-report/
```

## Critical Files to Create

| File | Purpose |
|------|---------|
| `package.json` | Dependencies và scripts |
| `next.config.js/ts` | Next.js config với next-intl |
| `tsconfig.json` | TypeScript strict mode |
| `tailwind.config.ts` | Design tokens |
| `postcss.config.js` | PostCSS cho Tailwind |
| `docker-compose.yml` | PostgreSQL service |
| `prisma/schema.prisma` | Prisma schema (empty models) |
| `prisma/seed.ts` | Demo admin seed |
| `src/app/[locale]/layout.tsx` | Locale layout |
| `src/app/[locale]/page.tsx` | Home page |
| `src/lib/i18n/config.ts` | i18n config |
| `.env.example` | Environment template |
| `.gitignore` | Ignore rules |
| `README.md` | Setup instructions |
| `vitest.config.ts` | Vitest config |
| `playwright.config.ts` | Playwright config |

## Verification Commands

```bash
pnpm install              # ✓ Dependencies install
pnpm db:up               # ✓ PostgreSQL starts
pnpm db:migrate          # ✓ Migration runs
pnpm db:seed             # ✓ Seed completes
pnpm dev                 # ✓ Dev server starts
curl http://localhost:3000/ja  # ✓ Japanese home loads
curl http://localhost:3000/en  # ✓ English home loads
pnpm typecheck           # ✓ No TypeScript errors
pnpm lint                # ✓ ESLint passes
pnpm test                # ✓ Tests pass
pnpm build               # ✓ Build succeeds
```

## Dependencies List

**Production:**
- `next` (latest)
- `react`, `react-dom`
- `typescript`
- `tailwindcss`, `postcss`, `autoprefixer`
- `next-intl` - i18n routing
- `@prisma/client` - Database ORM
- `zod` - Schema validation
- `react-hook-form`, `@hookform/resolvers` - Form handling
- `clsx`, `tailwind-merge` - Class utilities
- `lucide-react` - Icons

**Development:**
- `prisma` - Prisma CLI
- `eslint`, `eslint-config-next`, `eslint-config-prettier` - Linting
- `prettier` - Code formatting
- `vitest`, `@vitejs/plugin-react`, `@testing-library/react` - Testing
- `@playwright/test`, `playwright` - E2E testing
- `@types/node`, `@types/react`, `@types/react-dom` - Type definitions

## Remaining Milestones (After Milestone 0)

- **M1:** Data model và authentication
- **M2:** Public site shell và design system
- **M3:** Section registry và page builder
- **M4:** Content modules (services, case studies, posts)
- **M5:** Local media service
- **M6:** Contact workflow
- **M7:** SEO, quality và local release candidate
