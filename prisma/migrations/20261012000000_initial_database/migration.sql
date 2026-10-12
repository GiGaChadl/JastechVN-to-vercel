-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
-- Initial schema. Additional CHECK constraints at the end are maintained in SQL.
CREATE TYPE "Locale" AS ENUM ('ja', 'en');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "TranslationStatus" AS ENUM ('MISSING', 'DRAFT', 'READY', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "PageTemplate" AS ENUM ('LANDING', 'STANDARD', 'SERVICE_DETAIL', 'CASE_STUDY_DETAIL', 'ARTICLE_DETAIL', 'COMPANY', 'CONTACT');

-- CreateEnum
CREATE TYPE "CustomerVisibility" AS ENUM ('PUBLIC', 'ANONYMIZED');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "sessionVersion" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "template" "PageTemplate" NOT NULL DEFAULT 'STANDARD',
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_translations" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "content" JSONB,
    "status" "TranslationStatus" NOT NULL DEFAULT 'MISSING',
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_sections" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "schemaVersion" INTEGER NOT NULL DEFAULT 1,
    "position" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_section_translations" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "page_section_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_section_media" (
    "sectionId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "page_section_media_pkey" PRIMARY KEY ("sectionId","mediaId")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "position" INTEGER NOT NULL DEFAULT 0,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "coverMediaId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_translations" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "summary" TEXT,
    "content" JSONB,
    "status" "TranslationStatus" NOT NULL DEFAULT 'MISSING',
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "customerVisibility" "CustomerVisibility" NOT NULL DEFAULT 'ANONYMIZED',
    "customerName" TEXT,
    "customerLogoId" TEXT,
    "coverMediaId" TEXT,
    "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "teamSize" INTEGER,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_study_translations" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "anonymousLabel" TEXT,
    "industry" TEXT,
    "duration" TEXT,
    "summary" TEXT,
    "challenge" JSONB,
    "solution" JSONB,
    "results" JSONB,
    "testimonial" JSONB,
    "status" "TranslationStatus" NOT NULL DEFAULT 'MISSING',
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_study_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_study_services" (
    "caseStudyId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "case_study_services_pkey" PRIMARY KEY ("caseStudyId","serviceId")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "coverMediaId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_translations" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "excerpt" TEXT,
    "content" JSONB,
    "status" "TranslationStatus" NOT NULL DEFAULT 'MISSING',
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_translations" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_translations" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "tag_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_categories" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "post_categories_pkey" PRIMARY KEY ("postId","categoryId")
);

-- CreateTable
CREATE TABLE "post_tags" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "post_tags_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "media_assets" (
    "id" TEXT NOT NULL,
    "driver" TEXT NOT NULL DEFAULT 'local',
    "storageKey" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" BIGINT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "focalX" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "focalY" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "posterId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_asset_translations" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "alt" TEXT,
    "caption" TEXT,

    CONSTRAINT "media_asset_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "parentId" TEXT,
    "position" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "openInNewTab" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_item_translations" (
    "id" TEXT NOT NULL,
    "menuItemId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "menu_item_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobTitle" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "serviceId" TEXT,
    "expectedStart" TEXT,
    "message" TEXT NOT NULL,
    "privacyAcceptedAt" TIMESTAMP(3) NOT NULL,
    "privacyPolicyVersion" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "referrer" TEXT,
    "idempotencyKey" TEXT,
    "status" "ContactStatus" NOT NULL DEFAULT 'NEW',
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_notes" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirects" (
    "id" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "targetPath" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL DEFAULT 301,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revisions" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_tokenHash_key" ON "sessions"("tokenHash");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_tokenHash_key" ON "password_reset_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- CreateIndex
CREATE INDEX "password_reset_tokens_expiresAt_idx" ON "password_reset_tokens"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "pages_key_key" ON "pages"("key");

-- CreateIndex
CREATE INDEX "pages_status_publishedAt_idx" ON "pages"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "page_translations_ogImageId_idx" ON "page_translations"("ogImageId");

-- CreateIndex
CREATE UNIQUE INDEX "page_translations_pageId_locale_key" ON "page_translations"("pageId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "page_translations_locale_slug_key" ON "page_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "page_sections_pageId_position_key" ON "page_sections"("pageId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "page_section_translations_sectionId_locale_key" ON "page_section_translations"("sectionId", "locale");

-- CreateIndex
CREATE INDEX "page_section_media_mediaId_idx" ON "page_section_media"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "services_key_key" ON "services"("key");

-- CreateIndex
CREATE INDEX "services_status_position_idx" ON "services"("status", "position");

-- CreateIndex
CREATE INDEX "services_coverMediaId_idx" ON "services"("coverMediaId");

-- CreateIndex
CREATE INDEX "service_translations_ogImageId_idx" ON "service_translations"("ogImageId");

-- CreateIndex
CREATE UNIQUE INDEX "service_translations_serviceId_locale_key" ON "service_translations"("serviceId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "service_translations_locale_slug_key" ON "service_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_key_key" ON "case_studies"("key");

-- CreateIndex
CREATE INDEX "case_studies_status_featured_publishedAt_idx" ON "case_studies"("status", "featured", "publishedAt");

-- CreateIndex
CREATE INDEX "case_studies_customerLogoId_idx" ON "case_studies"("customerLogoId");

-- CreateIndex
CREATE INDEX "case_studies_coverMediaId_idx" ON "case_studies"("coverMediaId");

-- CreateIndex
CREATE INDEX "case_study_translations_ogImageId_idx" ON "case_study_translations"("ogImageId");

-- CreateIndex
CREATE UNIQUE INDEX "case_study_translations_caseStudyId_locale_key" ON "case_study_translations"("caseStudyId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "case_study_translations_locale_slug_key" ON "case_study_translations"("locale", "slug");

-- CreateIndex
CREATE INDEX "case_study_services_serviceId_idx" ON "case_study_services"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "posts_key_key" ON "posts"("key");

-- CreateIndex
CREATE INDEX "posts_status_publishedAt_idx" ON "posts"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "posts_coverMediaId_idx" ON "posts"("coverMediaId");

-- CreateIndex
CREATE INDEX "post_translations_ogImageId_idx" ON "post_translations"("ogImageId");

-- CreateIndex
CREATE UNIQUE INDEX "post_translations_postId_locale_key" ON "post_translations"("postId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "post_translations_locale_slug_key" ON "post_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "categories_key_key" ON "categories"("key");

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_categoryId_locale_key" ON "category_translations"("categoryId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "category_translations_locale_slug_key" ON "category_translations"("locale", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_key_key" ON "tags"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tag_translations_tagId_locale_key" ON "tag_translations"("tagId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "tag_translations_locale_slug_key" ON "tag_translations"("locale", "slug");

-- CreateIndex
CREATE INDEX "post_categories_categoryId_idx" ON "post_categories"("categoryId");

-- CreateIndex
CREATE INDEX "post_tags_tagId_idx" ON "post_tags"("tagId");

-- CreateIndex
CREATE INDEX "media_assets_posterId_idx" ON "media_assets"("posterId");

-- CreateIndex
CREATE UNIQUE INDEX "media_assets_driver_storageKey_key" ON "media_assets"("driver", "storageKey");

-- CreateIndex
CREATE UNIQUE INDEX "media_asset_translations_mediaId_locale_key" ON "media_asset_translations"("mediaId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "menus_key_key" ON "menus"("key");

-- CreateIndex
CREATE INDEX "menu_items_parentId_menuId_idx" ON "menu_items"("parentId", "menuId");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_id_menuId_key" ON "menu_items"("id", "menuId");

-- CreateIndex
CREATE UNIQUE INDEX "menu_items_menuId_position_key" ON "menu_items"("menuId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "menu_item_translations_menuItemId_locale_key" ON "menu_item_translations"("menuItemId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "contact_submissions_idempotencyKey_key" ON "contact_submissions"("idempotencyKey");

-- CreateIndex
CREATE INDEX "contact_submissions_status_deletedAt_createdAt_idx" ON "contact_submissions"("status", "deletedAt", "createdAt");

-- CreateIndex
CREATE INDEX "contact_submissions_email_idx" ON "contact_submissions"("email");

-- CreateIndex
CREATE INDEX "contact_submissions_serviceId_idx" ON "contact_submissions"("serviceId");

-- CreateIndex
CREATE INDEX "contact_notes_contactId_createdAt_idx" ON "contact_notes"("contactId", "createdAt");

-- CreateIndex
CREATE INDEX "contact_notes_authorId_idx" ON "contact_notes"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "redirects_locale_sourcePath_key" ON "redirects"("locale", "sourcePath");

-- CreateIndex
CREATE INDEX "revisions_authorId_idx" ON "revisions"("authorId");

-- CreateIndex
CREATE UNIQUE INDEX "revisions_entityType_entityId_version_key" ON "revisions"("entityType", "entityId", "version");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_createdAt_idx" ON "audit_logs"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_actorId_createdAt_idx" ON "audit_logs"("actorId", "createdAt");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_translations" ADD CONSTRAINT "page_translations_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_translations" ADD CONSTRAINT "page_translations_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_sections" ADD CONSTRAINT "page_sections_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_section_translations" ADD CONSTRAINT "page_section_translations_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "page_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_section_media" ADD CONSTRAINT "page_section_media_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "page_sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page_section_media" ADD CONSTRAINT "page_section_media_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_translations" ADD CONSTRAINT "service_translations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_translations" ADD CONSTRAINT "service_translations_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_customerLogoId_fkey" FOREIGN KEY ("customerLogoId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_translations" ADD CONSTRAINT "case_study_translations_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_translations" ADD CONSTRAINT "case_study_translations_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_services" ADD CONSTRAINT "case_study_services_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_services" ADD CONSTRAINT "case_study_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translations" ADD CONSTRAINT "post_translations_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_translations" ADD CONSTRAINT "post_translations_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_translations" ADD CONSTRAINT "category_translations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_translations" ADD CONSTRAINT "tag_translations_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_categories" ADD CONSTRAINT "post_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_assets" ADD CONSTRAINT "media_assets_posterId_fkey" FOREIGN KEY ("posterId") REFERENCES "media_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_asset_translations" ADD CONSTRAINT "media_asset_translations_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "media_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parentId_menuId_fkey" FOREIGN KEY ("parentId", "menuId") REFERENCES "menu_items"("id", "menuId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_item_translations" ADD CONSTRAINT "menu_item_translations_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_notes" ADD CONSTRAINT "contact_notes_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contact_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_notes" ADD CONSTRAINT "contact_notes_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisions" ADD CONSTRAINT "revisions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Database invariants not representable by Prisma's schema DSL.
ALTER TABLE "users" ADD CONSTRAINT "users_email_normalized" CHECK ("email" = lower(btrim("email")));
ALTER TABLE "page_sections" ADD CONSTRAINT "section_version_positive" CHECK ("schemaVersion" > 0);
ALTER TABLE "page_sections" ADD CONSTRAINT "section_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "page_sections" ADD CONSTRAINT "section_settings_object" CHECK (jsonb_typeof("settings") = 'object');
ALTER TABLE "page_section_translations" ADD CONSTRAINT "section_data_object" CHECK (jsonb_typeof("data") = 'object');
ALTER TABLE "media_assets" ADD CONSTRAINT "media_valid_dimensions" CHECK (("width" IS NULL OR "width" > 0) AND ("height" IS NULL OR "height" > 0) AND "sizeBytes" >= 0);
ALTER TABLE "media_assets" ADD CONSTRAINT "media_focal_bounds" CHECK ("focalX" BETWEEN 0 AND 1 AND "focalY" BETWEEN 0 AND 1);
ALTER TABLE "media_assets" ADD CONSTRAINT "media_not_own_poster" CHECK ("posterId" IS NULL OR "posterId" <> "id");
ALTER TABLE "case_studies" ADD CONSTRAINT "case_study_team_positive" CHECK ("teamSize" IS NULL OR "teamSize" > 0);
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_item_not_own_parent" CHECK ("parentId" IS NULL OR "parentId" <> "id");
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_position_nonnegative" CHECK ("position" >= 0);
ALTER TABLE "redirects" ADD CONSTRAINT "redirect_status_allowed" CHECK ("statusCode" IN (301, 302, 307, 308));
ALTER TABLE "redirects" ADD CONSTRAINT "redirect_not_self" CHECK ("sourcePath" <> "targetPath");
ALTER TABLE "revisions" ADD CONSTRAINT "revision_version_positive" CHECK ("version" > 0);
