import { TrustIndicatorsSection } from '@/components/sections/TrustIndicatorsSection'
import { ChallengesSection } from '@/components/sections/ChallengesSection'
import { WhyJastechSection } from '@/components/sections/WhyJastechSection'
import { DeliveryCapabilitySection } from '@/components/sections/DeliveryCapabilitySection'
import { ShieldCheck, Users } from 'lucide-react'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 pt-20">
        {/* Visual Banner phong cách Netcompany */}
        <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
              alt="Jastech Team"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-slate-900/90 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {locale === 'ja'
                ? '日本企業のための、信頼されるテックパートナー'
                : 'Your Trusted Engineering Partner in Vietnam for Japanese Enterprises'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {locale === 'ja'
                ? 'Jastechは高度な技術力、厳格な品質基準、そして日本語による円滑な意思疎通を武器に、お客様のデジタルトランスフォーメーションを強力に伴走支援します。'
                : 'Combining top-tier engineering talent, Japanese quality assurance standards, and frictionless bilingual communication to power your digital growth.'}
            </p>
          </div>
        </section>

        {/* 1. Trust & Track Record Indicators */}
        <TrustIndicatorsSection />

        {/* 2. Challenges We Solve */}
        <ChallengesSection />

        {/* 3. Why Choose Jastech */}
        <WhyJastechSection />

        {/* 4. Japan-Vietnam Hybrid Delivery Model */}
        <DeliveryCapabilitySection />
      </main>
    </div>
  )
}
