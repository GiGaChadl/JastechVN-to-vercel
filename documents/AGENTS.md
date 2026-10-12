# AGENTS.md — Jastech Website

## Source of truth

Read `JASTECH_WEBSITE_SPECIFICATION.md` and `LOCAL_IMPLEMENTATION_PLAYBOOK.md` completely before changing code.

When requirements conflict, use this priority order:

1. The user's latest explicit instruction.
2. This `AGENTS.md`.
3. `JASTECH_WEBSITE_SPECIFICATION.md`.
4. `LOCAL_IMPLEMENTATION_PLAYBOOK.md`.
5. Existing implementation patterns in the repository.

Do not silently reinterpret product requirements. Record any necessary assumption in the handoff.

## Current project phase

This phase is **local development only**.

- Do not deploy or publish the website.
- Do not create paid services, cloud resources, domains, API keys or external accounts.
- Do not connect production databases, email services, analytics or CRM systems.
- Do not commit real secrets or personal credentials.
- Use local development adapters and documented environment placeholders.
- Keep integrations replaceable so Cloudinary, Resend and production PostgreSQL can be enabled later.

## Product boundaries

Build a bilingual B2B corporate website for Japanese companies seeking web, application and maintenance services from Jastech.

The MVP includes:

- Public Japanese and English pages.
- Services, case studies and insights.
- Contact form.
- One Admin role.
- Draft and published content states.
- Page creation from controlled templates.
- A section-based page builder with safe configuration options.
- Local media upload through a storage abstraction.
- Local email preview/logging instead of sending real email.

The MVP does not include:

- E-commerce, payment or public user accounts.
- Careers, pricing, customer portal or CRM integration.
- Arbitrary HTML, CSS or JavaScript entered from the admin.
- A fully free-form visual page builder.
- Multiple roles, approval chains or real-time collaboration.
- Production deployment or production infrastructure.

Do not add excluded features without explicit user approval.

## Fixed technical direction

- Next.js with App Router.
- React and TypeScript in strict mode.
- Tailwind CSS.
- PostgreSQL and Prisma ORM.
- `next-intl` for Japanese and English routing/content.
- TipTap for rich text only where structured fields are insufficient.
- `dnd-kit` for section ordering.
- React Hook Form and Zod for forms.
- Vitest for unit/integration tests.
- Playwright for critical browser flows.
- `pnpm` as the package manager.

Prefer Server Components. Add Client Components only where browser state or interaction requires them.

## Local development rules

- Use Docker Compose for the local PostgreSQL service.
- Keep a committed `.env.example`; keep `.env` and `.env.local` ignored.
- Use seed data marked clearly as demo content.
- Store local uploaded media under a gitignored runtime directory through a `MediaStorage` interface. Do not couple content records to local filesystem paths.
- Implement an `EmailService` interface whose local adapter writes sanitized previews to logs or a local development mailbox. Do not send external email in this phase.
- Use relative application URLs and configuration; do not hard-code localhost ports in domain logic.
- Database migrations and seed scripts must be reproducible from a clean checkout.

## Content and localization rules

- Japanese is the default locale; English is secondary.
- Public routes use `/ja/...` and `/en/...`.
- A content item may be saved with an incomplete translation, but it may not be published until all required Japanese and English fields pass validation.
- Updating one published translation must flag the paired translation as potentially stale.
- Never present invented company metrics, testimonials, certifications or clients as factual.
- Placeholder content must be labeled `DRAFT` in admin and seeded demo data.
- Case studies must support public and anonymized customer modes.
- Use the provided legal/company information as user-supplied content; do not claim it was independently verified.

## Page builder guardrails

- Use a typed section registry and versioned section schemas.
- Each section type must define its schema, defaults, renderer and editor.
- Store structured section data; do not store rendered HTML as the source of truth.
- Validate section payloads on both client and server.
- Supported customization is limited to approved tokens: theme, width, spacing, columns, alignment, media ratio, overlay, visibility and animation preset.
- No arbitrary scripts, styles or unsafe HTML.
- Unknown or outdated section versions must fail safely in admin and never crash a public page.
- Keep migrations possible when section schemas change.

## Design guardrails

- Take inspiration from Netcompany's editorial rhythm, large typography, strong media and grid—not its exact layouts, assets, copy or branding.
- Use Jastech's blue identity and the supplied logo only as provisional assets until the final vector logo is confirmed.
- Use `Noto Sans JP` for Japanese and `Inter` for Latin text unless the user approves another font system.
- Build mobile-first and verify at 360 px, 768 px, 1024 px and 1440 px.
- Hero autoplay video must be muted, have a poster, expose pause control and respect `prefers-reduced-motion`.
- Maintain keyboard navigation, visible focus and suitable contrast.

## Security and data rules

- Hash passwords with a modern password hashing algorithm.
- Protect admin routes server-side.
- Validate all mutations server-side.
- Apply CSRF-safe session handling, rate limiting and anti-spam protection to the contact form.
- Do not render unsanitized rich text.
- Avoid logging passwords, tokens, complete contact messages or other sensitive fields.
- Use database transactions for multi-record publishing operations.
- Contact submission deletion must be explicit and recoverable where practical.

## Implementation discipline

- Work milestone by milestone; do not attempt the whole product in one unverified pass.
- Before each milestone, inspect the current repository and preserve unrelated user changes.
- Prefer small, cohesive modules over premature frameworks and abstractions.
- Do not duplicate locale, publishing or section validation logic across routes.
- Do not replace chosen libraries without documenting a concrete blocker.
- Do not add infrastructure or dependencies merely because they may be useful later.
- Run relevant checks after every meaningful slice.
- Keep the README current with setup, commands, credentials for demo access and known limitations.

## Definition of done for any task

A task is complete only when:

- The requested behavior works locally.
- Type checking passes.
- Relevant automated tests pass.
- New environment variables are documented in `.env.example`.
- Schema changes include a migration and seed updates where applicable.
- Japanese and English behavior is considered.
- Loading, empty, validation and error states are handled.
- No real secrets, production resources or unapproved scope were introduced.
- The handoff lists changed files, verification performed and remaining limitations.

## Expected verification commands

Use the actual scripts defined by the project; keep equivalent scripts available under these names:

```bash
pnpm install
pnpm db:up
pnpm db:migrate
pnpm db:seed
pnpm dev
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Do not claim completion if a required command failed. Report the exact failing command and concise cause.

