import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scryptSync, timingSafeEqual } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { Prisma, PrismaClient } from '@prisma/client'

// Deliberately requires a disposable database, never the developer's working DB.
const url = new URL(process.env.DATABASE_URL ?? '')
if (
  !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
  !url.pathname.endsWith('_dbtest')
) {
  throw new Error(
    'DB tests require a local disposable database ending in _dbtest.'
  )
}
const prisma = new PrismaClient()
const rollback = new Error('rollback test fixture')

test('database constraints and repeatable seed', async (t) => {
  try {
    const env = {
      ...process.env,
      ADMIN_EMAIL: 'test-admin@jastech.local',
      ADMIN_PASSWORD: 'local-test-only-strong-password',
    }
    const seed = () => {
      const result = spawnSync(process.execPath, ['prisma/seed.ts'], {
        env,
        encoding: 'utf8',
      })
      assert.equal(result.status, 0, result.stderr)
    }
    seed()
    const tableCounts = async () => {
      const counts: Record<string, number> = {}
      for (const model of Prisma.dmmf.datamodel.models) {
        // Identifiers come only from the generated, checked-in schema, never user input.
        const table = model.dbName ?? model.name
        const [row] = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
          `SELECT count(*) FROM "${table}"`
        )
        counts[table] = Number(row.count)
      }
      return counts
    }
    const countsBefore = await tableCounts()
    await t.test('all application tables contain dummy records', () => {
      assert.equal(Object.keys(countsBefore).length, 32)
      for (const [table, count] of Object.entries(countsBefore)) {
        assert.ok(count > 0, `${table} must contain demo data`)
      }
    })
    await t.test(
      'stock images and authentication fixtures are safe demo records',
      async () => {
        const images = await prisma.mediaAsset.findMany({
          where: { driver: 'external' },
        })
        assert.equal(images.length, 3)
        for (const image of images) {
          const imageUrl = new URL(image.url)
          assert.equal(imageUrl.protocol, 'https:')
          assert.equal(imageUrl.hostname, 'images.unsplash.com')
        }
        const session = await prisma.session.findUniqueOrThrow({
          where: { id: 'demo-expired-session' },
        })
        const reset = await prisma.passwordResetToken.findUniqueOrThrow({
          where: { id: 'demo-used-password-reset' },
        })
        assert.ok(session.expiresAt < new Date())
        assert.ok(reset.expiresAt < new Date())
        assert.ok(reset.usedAt)
        assert.match(session.tokenHash, /^[a-f0-9]{64}$/)
        assert.match(reset.tokenHash, /^[a-f0-9]{64}$/)
        assert.equal(
          await prisma.caseStudy.count({ where: { status: 'PUBLISHED' } }),
          0
        )
        assert.equal(
          await prisma.post.count({ where: { status: 'PUBLISHED' } }),
          0
        )
      }
    )
    const admin = await prisma.user.findUniqueOrThrow({
      where: { email: env.ADMIN_EMAIL },
    })
    await t.test('admin password uses salted scrypt, not plaintext', () => {
      const [algorithm, n, r, p, salt, digest] = admin.passwordHash.split('$')
      assert.equal(algorithm, 'scrypt')
      assert.ok(salt.length >= 32)
      assert.ok(
        timingSafeEqual(
          Buffer.from(digest, 'hex'),
          scryptSync(env.ADMIN_PASSWORD, salt, 64, {
            N: Number(n),
            r: Number(r),
            p: Number(p),
            maxmem: 64 * 1024 * 1024,
          })
        )
      )
    })
    await t.test(
      'seed preserves edits and password, creates no duplicate records',
      async () => {
        const home = await prisma.page.findUniqueOrThrow({
          where: { key: 'home' },
        })
        await prisma.pageTranslation.update({
          where: { pageId_locale: { pageId: home.id, locale: 'en' } },
          data: { title: '[DRAFT] Edited by administrator' },
        })
        seed()
        assert.equal(await prisma.user.count(), 1)
        assert.equal(await prisma.page.count(), 2)
        assert.equal(await prisma.service.count(), 3)
        assert.equal(await prisma.serviceTranslation.count(), 6)
        assert.equal(await prisma.menu.count(), 3)
        assert.deepEqual(await tableCounts(), countsBefore)
        assert.equal(
          (await prisma.user.findUniqueOrThrow({ where: { id: admin.id } }))
            .passwordHash,
          admin.passwordHash
        )
        assert.equal(
          (
            await prisma.pageTranslation.findUniqueOrThrow({
              where: { pageId_locale: { pageId: home.id, locale: 'en' } },
            })
          ).title,
          '[DRAFT] Edited by administrator'
        )
        assert.equal(
          await prisma.service.count({ where: { status: 'PUBLISHED' } }),
          0
        )
        assert.equal(
          await prisma.page.count({ where: { status: 'PUBLISHED' } }),
          0
        )
      }
    )
    await t.test(
      'a one-language draft is valid; locale slug collisions are rejected',
      async () => {
        await assert.rejects(
          prisma.$transaction(async (tx) => {
            await tx.page.create({
              data: {
                key: 'test-incomplete',
                translations: {
                  create: { locale: 'en', slug: 'unique-draft' },
                },
              },
            })
            await tx.page.create({
              data: {
                key: 'test-duplicate',
                translations: {
                  create: { locale: 'en', slug: 'unique-draft' },
                },
              },
            })
          }),
          { code: 'P2002' }
        )
        assert.equal(
          await prisma.page.count({ where: { key: 'test-incomplete' } }),
          0
        )
      }
    )
    await t.test('a translation cannot refer to a missing page', async () => {
      await assert.rejects(
        prisma.pageTranslation.create({
          data: { pageId: 'nonexistent-page', locale: 'ja' },
        }),
        { code: 'P2003' }
      )
    })
    await t.test('referenced media cannot be deleted', async () => {
      await assert.rejects(
        prisma.$transaction(async (tx) => {
          const media = await tx.mediaAsset.create({
            data: {
              storageKey: 'test-cover',
              url: '/media/test-cover',
              type: 'IMAGE',
              mimeType: 'image/png',
              sizeBytes: 1,
            },
          })
          await tx.post.create({
            data: { key: 'test-media', coverMediaId: media.id },
          })
          await tx.mediaAsset.delete({ where: { id: media.id } })
        }),
        { code: 'P2003' }
      )
    })
    await t.test('media focal points have database bounds', async () => {
      await assert.rejects(
        prisma.mediaAsset.create({
          data: {
            storageKey: 'invalid-focal',
            url: '/media/invalid',
            type: 'IMAGE',
            mimeType: 'image/png',
            sizeBytes: 1,
            focalX: 2,
          },
        })
      )
    })
    await t.test(
      'contact soft deletion retains notes and can be reversed',
      async () => {
        await assert.rejects(
          prisma.$transaction(async (tx) => {
            const contact = await tx.contactSubmission.create({
              data: {
                name: 'TEST',
                company: 'TEST',
                email: 'test@example.invalid',
                message: 'TEST ONLY',
                locale: 'en',
                privacyAcceptedAt: new Date(),
                privacyPolicyVersion: 'test-v1',
                notes: { create: { body: 'TEST NOTE', authorId: admin.id } },
              },
            })
            await tx.contactSubmission.update({
              where: { id: contact.id },
              data: { deletedAt: new Date() },
            })
            assert.equal(
              await tx.contactNote.count({ where: { contactId: contact.id } }),
              1
            )
            await tx.contactSubmission.update({
              where: { id: contact.id },
              data: { deletedAt: null, status: 'CONTACTED' },
            })
            assert.equal(
              (
                await tx.contactSubmission.findUniqueOrThrow({
                  where: { id: contact.id },
                })
              ).deletedAt,
              null
            )
            throw rollback
          }),
          (error: unknown) => error === rollback
        )
      }
    )
    await t.test(
      'section translations cascade with the owning page',
      async () => {
        await assert.rejects(
          prisma.$transaction(async (tx) => {
            const page = await tx.page.create({
              data: {
                key: 'test-section',
                sections: {
                  create: {
                    type: 'hero-image',
                    position: 0,
                    translations: {
                      create: { locale: 'en', data: { title: '[DRAFT]' } },
                    },
                  },
                },
              },
              include: { sections: true },
            })
            const sectionId = page.sections[0].id
            await tx.page.delete({ where: { id: page.id } })
            assert.equal(
              await tx.pageSectionTranslation.count({ where: { sectionId } }),
              0
            )
            throw rollback
          }),
          (error: unknown) => error === rollback
        )
      }
    )
  } finally {
    await prisma.$disconnect()
  }
})
