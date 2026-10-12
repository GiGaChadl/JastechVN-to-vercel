import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { createHash, randomBytes, scryptSync } from 'node:crypto'

const prisma = new PrismaClient()

const locales = ['ja', 'en'] as const
const demoDate = new Date('2020-01-01T00:00:00Z')
const expiredDate = new Date('2020-01-02T00:00:00Z')
const richText = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
})

async function seedDemo(tx: Prisma.TransactionClient, adminId: string) {
  // Fixtures cannot authenticate: raw random tokens are discarded, records expired.
  await tx.session.upsert({
    where: { id: 'demo-expired-session' },
    update: {},
    create: {
      id: 'demo-expired-session',
      userId: adminId,
      tokenHash: createHash('sha256').update(randomBytes(32)).digest('hex'),
      createdAt: demoDate,
      expiresAt: expiredDate,
    },
  })
  await tx.passwordResetToken.upsert({
    where: { id: 'demo-used-password-reset' },
    update: {},
    create: {
      id: 'demo-used-password-reset',
      userId: adminId,
      tokenHash: createHash('sha256').update(randomBytes(32)).digest('hex'),
      createdAt: demoDate,
      expiresAt: expiredDate,
      usedAt: expiredDate,
    },
  })

  const photos = [
    {
      key: 'office',
      photo: 'photo-1497366754035-f200968a6e72',
      en: 'Illustrative office interior',
      ja: '参考画像：オフィスの内装',
    },
    {
      key: 'workspace',
      photo: 'photo-1497366811353-6870744d04b2',
      en: 'Illustrative shared workspace',
      ja: '参考画像：共有ワークスペース',
    },
    {
      key: 'code',
      photo: 'photo-1461749280684-dccba630e2f6',
      en: 'Illustrative programming screen',
      ja: '参考画像：プログラミング画面',
    },
  ]
  const mediaIds: string[] = []
  for (const photo of photos) {
    const media = await tx.mediaAsset.upsert({
      where: {
        driver_storageKey: {
          driver: 'external',
          storageKey: `demo/unsplash/${photo.key}`,
        },
      },
      update: {},
      create: {
        driver: 'external',
        storageKey: `demo/unsplash/${photo.key}`,
        url: `https://images.unsplash.com/${photo.photo}?fit=crop&w=1600&h=900&q=80&fm=jpg`,
        type: 'IMAGE',
        mimeType: 'image/jpeg',
        sizeBytes: 0,
        width: 1600,
        height: 900,
        metadata: {
          isDemo: true,
          source: 'Unsplash',
          sizeBytesUnknown: true,
          note: 'External illustrative stock photo; not Jastech premises or client work.',
        },
        translations: {
          create: locales.map((locale) => ({
            locale,
            alt: `[DEMO] ${photo[locale]}`,
            caption: '[DRAFT] Unsplash stock photo — illustration only.',
          })),
        },
      },
    })
    mediaIds.push(media.id)
  }

  const page = await tx.page.upsert({
    where: { key: 'demo-showcase' },
    update: {},
    create: {
      key: 'demo-showcase',
      template: 'LANDING',
      isDemo: true,
      translations: {
        create: locales.map((locale) => ({
          locale,
          slug: 'demo-showcase',
          status: 'DRAFT',
          title:
            locale === 'ja' ? '[DRAFT] デモページ' : '[DRAFT] Demo showcase',
          content: richText('[DRAFT] Fictional demonstration content only.'),
          seoTitle: '[DRAFT] Jastech demo showcase',
          seoDescription:
            '[DRAFT] Local database fixture, not approved company content.',
          ogTitle: '[DRAFT] Demo showcase',
          ogDescription: '[DRAFT] Illustration only.',
          ogImageId: mediaIds[0],
        })),
      },
      sections: {
        create: [
          'hero-image',
          'text-image',
          'services-grid',
          'contact-cta',
        ].map((type, position) => ({
          type,
          position,
          schemaVersion: 1,
          settings: {
            theme: position % 2 ? 'light' : 'brand',
            width: 'wide',
            spacing: 'large',
            alignment: 'left',
          },
          translations: {
            create: locales.map((locale) => ({
              locale,
              data: {
                title:
                  locale === 'ja'
                    ? '[DRAFT] デモコンテンツ'
                    : '[DRAFT] Demo content',
                description:
                  locale === 'ja'
                    ? '架空のサンプルです。実際の実績ではありません。'
                    : 'Fictional sample, not a claim about actual company work.',
                mediaId: mediaIds[position % mediaIds.length],
                cta: {
                  label: locale === 'ja' ? 'お問い合わせ' : 'Contact us',
                  href: `/${locale}/contact`,
                },
              },
            })),
          },
          media: { create: { mediaId: mediaIds[position % mediaIds.length] } },
        })),
      },
    },
  })

  const topics = [
    {
      key: 'web',
      service: 'web-development',
      en: 'Web delivery',
      ja: 'Web開発',
      project: 'Retail portal prototype',
      projectJa: '小売ポータルの試作',
      tech: ['Next.js', 'PostgreSQL'],
    },
    {
      key: 'app',
      service: 'application-development',
      en: 'Application design',
      ja: 'アプリ設計',
      project: 'Internal workflow prototype',
      projectJa: '社内業務アプリの試作',
      tech: ['React', 'TypeScript'],
    },
    {
      key: 'support',
      service: 'maintenance-support',
      en: 'Maintenance practices',
      ja: '保守運用',
      project: 'Monitoring dashboard prototype',
      projectJa: '監視ダッシュボードの試作',
      tech: ['PostgreSQL', 'Docker'],
    },
  ]
  for (const [index, topic] of topics.entries()) {
    const service = await tx.service.findUniqueOrThrow({
      where: { key: topic.service },
    })
    const category = await tx.category.upsert({
      where: { key: `demo-${topic.key}` },
      update: {},
      create: {
        key: `demo-${topic.key}`,
        translations: {
          create: locales.map((locale) => ({
            locale,
            name: `[DRAFT] ${topic[locale]}`,
            slug: `demo-${topic.key}`,
          })),
        },
      },
    })
    const tag = await tx.tag.upsert({
      where: { key: `demo-${topic.key}` },
      update: {},
      create: {
        key: `demo-${topic.key}`,
        translations: {
          create: locales.map((locale) => ({
            locale,
            name: `[DEMO] ${topic.tech[0]}`,
            slug: `demo-${topic.key}`,
          })),
        },
      },
    })
    await tx.caseStudy.upsert({
      where: { key: `demo-${topic.key}` },
      update: {},
      create: {
        key: `demo-${topic.key}`,
        isDemo: true,
        featured: index === 0,
        customerVisibility: 'ANONYMIZED',
        coverMediaId: mediaIds[index],
        technologies: topic.tech,
        teamSize: 3,
        services: { create: { serviceId: service.id } },
        translations: {
          create: locales.map((locale) => ({
            locale,
            slug: `demo-${topic.key}`,
            status: 'DRAFT',
            title: `[DRAFT] ${locale === 'ja' ? topic.projectJa : topic.project}`,
            anonymousLabel:
              locale === 'ja'
                ? '[DEMO] 架空の企業'
                : '[DEMO] Fictional company',
            industry: '[DEMO] Software',
            duration: '[DEMO] 8 weeks',
            summary:
              '[DRAFT] Fictional project for local testing; not an actual Jastech engagement.',
            challenge: richText(
              '[DRAFT] Consolidate sample information in one workspace.'
            ),
            solution: richText(
              '[DRAFT] Prototype a bilingual interface and a structured database.'
            ),
            results: richText(
              '[DRAFT] Demo prototype only; no verified business results.'
            ),
            seoTitle: `[DRAFT] ${topic.project}`,
            seoDescription: '[DRAFT] Fictional case study for local testing.',
            ogImageId: mediaIds[index],
          })),
        },
      },
    })
    await tx.post.upsert({
      where: { key: `demo-${topic.key}` },
      update: {},
      create: {
        key: `demo-${topic.key}`,
        isDemo: true,
        coverMediaId: mediaIds[index],
        categories: { create: { categoryId: category.id } },
        tags: { create: { tagId: tag.id } },
        translations: {
          create: locales.map((locale) => ({
            locale,
            slug: `demo-${topic.key}`,
            status: 'DRAFT',
            title: `[DRAFT] ${topic[locale]}`,
            excerpt:
              locale === 'ja'
                ? '[DRAFT] 開発手順を説明するサンプル記事です。'
                : '[DRAFT] Sample article describing a delivery workflow.',
            content: richText(
              locale === 'ja'
                ? '[DRAFT] 要件確認、設計、実装、検証の流れを紹介する架空のサンプルです。'
                : '[DRAFT] A fictional walkthrough of discovery, design, implementation and verification.'
            ),
            seoTitle: `[DRAFT] ${topic[locale]}`,
            seoDescription: '[DRAFT] Local sample article.',
            ogImageId: mediaIds[index],
          })),
        },
      },
    })
    const contact = await tx.contactSubmission.upsert({
      where: { idempotencyKey: `demo-contact-${topic.key}` },
      update: {},
      create: {
        idempotencyKey: `demo-contact-${topic.key}`,
        name: `[DEMO] Contact ${index + 1}`,
        company: '[DEMO] Fictional Company',
        jobTitle: '[DEMO] Project coordinator',
        email: `demo-${topic.key}@example.invalid`,
        serviceId: service.id,
        expectedStart: '[DEMO] Next quarter',
        message: `[DEMO] Fictional inquiry about ${topic.en}. Do not contact.`,
        privacyAcceptedAt: demoDate,
        privacyPolicyVersion: 'demo-v1',
        locale: index === 1 ? 'en' : 'ja',
        utmSource: 'demo',
        utmMedium: 'fixture',
        utmCampaign: 'local-seed',
        referrer: 'https://example.invalid/demo',
        status: (['NEW', 'CONTACTED', 'CLOSED'] as const)[index],
        notes: {
          create: {
            authorId: adminId,
            body: '[DEMO] Internal note for testing only; no real inquiry received.',
          },
        },
      },
    })
    // A dedicated demo audit event, never a real contact payload.
    await tx.auditLog.upsert({
      where: { id: `demo-contact-audit-${topic.key}` },
      update: {},
      create: {
        id: `demo-contact-audit-${topic.key}`,
        actorId: adminId,
        action: 'DEMO_SEED',
        entityType: 'ContactSubmission',
        entityId: contact.id,
        metadata: { isDemo: true, fixture: topic.key },
      },
    })
  }

  // Isolated demo navigation avoids adding links/positions to user-edited menus.
  await tx.menu.upsert({
    where: { key: 'demo-navigation' },
    update: {},
    create: {
      key: 'demo-navigation',
      items: {
        create: [
          {
            position: 0,
            enabled: false,
            translations: {
              create: locales.map((locale) => ({
                locale,
                label: '[DRAFT] Demo home',
                href: `/${locale}/demo-showcase`,
              })),
            },
          },
          {
            position: 1,
            enabled: false,
            translations: {
              create: locales.map((locale) => ({
                locale,
                label: '[DRAFT] Demo contact',
                href: `/${locale}/contact`,
              })),
            },
          },
        ],
      },
    },
  })
  for (const locale of locales) {
    await tx.redirect.upsert({
      where: {
        locale_sourcePath: {
          locale,
          sourcePath: `/${locale}/demo-old-showcase`,
        },
      },
      update: {},
      create: {
        locale,
        sourcePath: `/${locale}/demo-old-showcase`,
        targetPath: `/${locale}/demo-showcase`,
        statusCode: 301,
      },
    })
  }
  await tx.revision.upsert({
    where: {
      entityType_entityId_version: {
        entityType: 'Page',
        entityId: page.id,
        version: 1,
      },
    },
    update: {},
    create: {
      entityType: 'Page',
      entityId: page.id,
      version: 1,
      authorId: adminId,
      snapshot: {
        isDemo: true,
        status: 'DRAFT',
        title: '[DRAFT] Demo showcase',
        schemaVersion: 1,
      },
    },
  })
}

async function main() {
  const databaseUrl = new URL(process.env.DATABASE_URL ?? '')
  if (
    !['localhost', '127.0.0.1', '[::1]', 'db'].includes(databaseUrl.hostname)
  ) {
    throw new Error('Demo seed only supports a local database.')
  }
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Set a valid ADMIN_EMAIL in .env.')
  }
  const existingAdmin = await prisma.user.findUnique({ where: { email } })
  let passwordHash = existingAdmin?.passwordHash
  if (!existingAdmin) {
    const password = process.env.ADMIN_PASSWORD
    if (
      !password ||
      password.length < 12 ||
      ['change-this-password', 'replace-for-local-use'].includes(password)
    ) {
      throw new Error(
        'Set ADMIN_PASSWORD to a non-placeholder password of at least 12 characters in .env.'
      )
    }
    const salt = randomBytes(16).toString('hex')
    const hash = scryptSync(password, salt, 64, {
      N: 32768,
      r: 8,
      p: 1,
      maxmem: 64 * 1024 * 1024,
    })
    passwordHash = `scrypt$32768$8$1$${salt}$${hash.toString('hex')}`
  }

  // One atomic seed. Re-running preserves existing content and credentials.
  await prisma.$transaction(
    async (tx) => {
      const admin = await tx.user.upsert({
        where: { email },
        update: {},
        create: { email, passwordHash: passwordHash!, role: 'ADMIN' },
      })
      const services = [
        { key: 'web-development', ja: 'Web開発', en: 'Web Development' },
        {
          key: 'application-development',
          ja: 'アプリケーション開発',
          en: 'Application Development',
        },
        {
          key: 'maintenance-support',
          ja: '保守・サポート',
          en: 'Maintenance & Support',
        },
      ]
      for (const [position, service] of services.entries()) {
        await tx.service.upsert({
          where: { key: service.key },
          update: {},
          create: {
            key: service.key,
            position,
            isDemo: true,
            translations: {
              create: (['ja', 'en'] as const).map((locale) => ({
                locale,
                slug: service.key,
                title: `[DRAFT] ${service[locale]}`,
                summary: '[DRAFT — Replace before launch]',
                status: 'DRAFT',
              })),
            },
          },
        })
      }
      await tx.page.upsert({
        where: { key: 'home' },
        update: {},
        create: {
          key: 'home',
          template: 'LANDING',
          isDemo: true,
          translations: {
            create: [
              {
                locale: 'ja',
                title: '[DRAFT] ホーム',
                slug: 'home',
                status: 'DRAFT',
              },
              {
                locale: 'en',
                title: '[DRAFT] Home',
                slug: 'home',
                status: 'DRAFT',
              },
            ],
          },
        },
      })
      // Empty menus, no links to routes which do not exist yet.
      for (const key of ['header', 'footer']) {
        await tx.menu.upsert({ where: { key }, update: {}, create: { key } })
      }
      await tx.siteSetting.upsert({
        where: { key: 'company' },
        update: {},
        create: {
          key: 'company',
          value: {
            status: 'DRAFT',
            source: 'user-supplied; not independently verified',
            legalName: 'CÔNG TY TNHH JASTECH',
            internationalName: 'JASTECH',
            taxCode: '0317141031',
            incorporationDate: '2022-01-25',
            representative: 'NGUYỄN ĐỨC THUẬN',
            phone: '0969000063',
            address:
              '39 Hậu Giang, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam',
            translations: {
              ja: { status: 'MISSING' },
              en: { status: 'MISSING' },
            },
          },
        },
      })
      await seedDemo(tx, admin.id)
    },
    { timeout: 30000 }
  )
  console.log(
    'Local seed complete: demo data in all 32 application tables. Images use Unsplash URLs; existing records preserved.'
  )
}

main()
  .catch(() => {
    console.error(
      'Seed failed. Check local DATABASE_URL, migrations, ADMIN_EMAIL and a non-placeholder ADMIN_PASSWORD (12+ characters). No credentials are logged.'
    )
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
