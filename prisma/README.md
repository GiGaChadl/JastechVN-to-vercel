# Local database

PostgreSQL 16 + Prisma 6. The initial migration creates 32 application tables.
Run package scripts in the environment where dependencies were installed (WSL for
the current checkout). Node 22.18+ is required for `seed.ts` and `database.test.ts`.

## Setup

1. Copy `.env.example` to `.env` only if it does not already exist.
2. Set a private local `ADMIN_PASSWORD` (12+ characters, not the placeholder).
3. Run `pnpm db:up`, `pnpm db:validate`, `pnpm db:deploy`, `pnpm db:generate`, `pnpm db:seed`.
4. Run `pnpm exec prisma migrate status` to inspect the migration state.

The compose port is bound to `127.0.0.1`. Existing containers must be recreated
with `pnpm db:up` to adopt that binding; their named volume is preserved.
Never use `docker compose down -v` against a database whose data should survive.

`db:deploy` applies tracked SQL, whereas `db:migrate --name ...` creates new migrations
and needs a shadow database. Commit both `schema.prisma` and migration SQL.
Do not edit an applied migration. SQL CHECK constraints at the end of the initial
migration are intentional and must be preserved in future migrations.

## Data model and boundaries

- Users, hashed sessions/reset tokens and session version support future admin auth.
  Seed uses `scrypt$32768$8$1$saltHex$hashHex`, with a 16-byte random salt and 64-byte
  derived key. Backend verification and session invalidation are not implemented.
- Pages, services, case studies and posts have independent JA/EN translations, unique
  locale/slug pairs, draft/published status, translation status, stale flags and SEO/OG
  fields. Missing translations can be stored as drafts (nullable fields/slugs).
- Pages own ordered, versioned sections with structured JSON settings and localized
  JSON data. Section media references must also be registered in `PageSectionMedia`.
- Case studies default to anonymized customers and support related services.
  The future public serializer must omit private customer fields in anonymized mode.
- Categories/tags are translated; explicit join tables link them to posts.
- Media stores provider-neutral storage keys, URLs, type, size, dimensions, translated
  alt/captions, focal points and video poster references. No uploads are performed.
- Menus have translated labels/links; parent links must belong to the same menu.
  Positions are unique across a menu. BE must reject deeper parent cycles and unsafe URLs.
- Company/footer/global settings use keyed JSON; localized company fields live under
  `translations.ja` and `translations.en`. Settings payload validation belongs to BE.
- Contacts retain consent time/version, locale, attribution, status and internal notes.
  `deletedAt` supports recoverable deletion; an optional idempotency key supports a
  future duplicate-submission policy. It does not implement deduplication by itself.
- Redirects, revisions and audit logs provide persistence only. History uses polymorphic
  entity references so it survives content deletion. BE must validate entity types,
  sanitize snapshots and never record passwords, tokens or full contact payloads.

Database constraints enforce uniqueness, foreign keys, delete restrictions for registered
media references, nonnegative positions, positive versions/dimensions/team sizes, normalized
admin email, object-shaped section JSON, bounded focal points and allowed redirect codes.
Deleting an owning page/content item cascades its translations/join records. Removing a
service referenced by a case study is restricted; contacts survive service deletion.
Reordering unique positions requires temporary free positions inside one transaction.

The database alone does **not** enforce bilingual completeness before publishing,
paired-translation stale updates, section registry schemas, safe rich text, anonymous
customer serialization, authentication, rate limiting or business workflows. These are
explicit BE follow-ups. Public queries must filter `PUBLISHED` once the BE is built.
No API, CMS, frontend, media adapter, email provider or production deployment is included.

## Seed behavior

The local-only seed creates an admin and draft/demo records in one transaction.
All existing records are preserved, including edited translations and passwords.
Changing `ADMIN_PASSWORD` and rerunning seed does not rotate an existing password.
Changing `ADMIN_EMAIL` creates another admin record; keep it stable for the one-admin MVP.
Company details are marked user-supplied/unverified. Fictional case studies, articles,
contacts and notes are explicitly labeled DRAFT/DEMO and are never published. Contact
addresses use `example.invalid`; no messages are sent. A separate demo page/menu preserves
existing home/header/footer records. Demo menu items are disabled because FE routes are pending.

Every application table gets fixtures, including translation and join tables, revisions,
audit logs, redirects, sessions and reset tokens. Authentication fixtures contain hashes
of discarded random tokens, expired in 2020; reset tokens are also marked used. They are
not working login/reset credentials. The Prisma migration history is managed only by Prisma.

Three media records use direct `https://images.unsplash.com/` URLs with `driver=external`.
They are illustrative stock photos, not photos of Jastech staff, clients or premises.
No files are downloaded. `sizeBytes=0` with `metadata.sizeBytesUnknown=true` indicates
that remote file size was not measured. Requested crops are 1600×900 JPEG. The future
media adapter must handle external URLs without treating their storage keys as local paths.

## Database integration tests

Create a separate disposable database once:

```sh
docker exec jastech-db psql -U jastech -d postgres -c 'CREATE DATABASE jastech_dbtest;'
```

Then from Bash/WSL (local example credentials only):

```sh
export DATABASE_URL='postgresql://jastech:jastech@localhost:5432/jastech_dbtest'
pnpm db:deploy
pnpm db:generate
pnpm db:test
unset DATABASE_URL
pnpm typecheck --incremental false
```

Tests refuse hosts other than loopback and DB names without `_dbtest`. Use a dedicated
empty database initially. Repeated test runs are supported; seed records remain in the
test DB, while constraint fixtures roll back. Tests cover all-table fixture coverage,
Unsplash URLs, expired auth fixtures, password hashing, repeatable
seed, draft/slug behavior, foreign keys, media deletion/focal bounds, recoverable contact
deletion and section cascades. They do not test application routes or publishing logic.

The repository pins Prisma 6; its supported `package.json#prisma.seed` configuration
currently emits a Prisma 7 migration/deprecation notice. No Prisma major upgrade is included.
