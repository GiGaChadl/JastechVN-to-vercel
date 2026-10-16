import { ContactCtaSection } from '@/components/sections/ContactCtaSection'
import { RecaptchaProvider } from '@/components/providers/RecaptchaProvider'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Main Page Content divided into modular sections */}
      <RecaptchaProvider>
        <main className="flex-1">
          {/* 1. Contact & Consultation CTA */}
          <ContactCtaSection />
        </main>
      </RecaptchaProvider>
    </div>
  )
}
