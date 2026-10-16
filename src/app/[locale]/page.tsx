import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Page Content divided into modular sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection locale={locale} />

        {/* 2. Core Services */}
        <ServicesSection locale={locale} />

        {/* 3. Featured Case Studies */}
        <CaseStudiesSection />
      </main>
    </div>
  )
}
