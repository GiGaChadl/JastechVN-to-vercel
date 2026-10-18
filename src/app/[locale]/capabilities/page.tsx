import { ProcessSection } from '@/components/sections/ProcessSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { HeroSection } from './HeroSection'

export default async function CapabilitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 pt-20">
        {/* Hero Capabilities Section */}
        <HeroSection></HeroSection>
        {/* 1. Development Process */}
        <ProcessSection />

        {/* 2. Latest Insights & Technical Blog */}
        <InsightsSection />
      </main>
    </div>
  )
}
