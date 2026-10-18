import { WhyJastechSection } from '@/components/sections/WhyJastechSection'
import { DeliveryCapabilitySection } from '@/components/sections/DeliveryCapabilitySection'
import { HeroSection } from './HeroSection'
import { TestimonialSection } from '@/components/sections/TestimonialSection'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <section className="relative py-10 bg-slate-900 text-white overflow-hidden"></section>
        {/* 1. Hero Section */}
        <HeroSection></HeroSection>

        {/* 2. Testimonial  */}
        <TestimonialSection />

        {/* 3. Why Choose Jastech */}
        <WhyJastechSection />

        {/* 4. Japan-Vietnam Hybrid Delivery Model */}
        <DeliveryCapabilitySection />
      </main>
    </div>
  )
}
