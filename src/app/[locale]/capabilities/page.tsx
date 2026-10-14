import { ProcessSection } from '@/components/sections/ProcessSection'
import { TechStackSection } from '@/components/sections/TechStackSection'
import { InsightsSection } from '@/components/sections/InsightsSection'
import { Cpu } from 'lucide-react'

export default async function CapabilitiesPage({
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
          <div className="absolute inset-0 opacity-25">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
              alt="Engineering & Architecture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-slate-900/90 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {locale === 'ja'
                ? '堅牢な開発プロセスと最先端の技術スタック'
                : 'Robust Engineering Process & Modern Tech Stack'}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {locale === 'ja'
                ? 'アジャイル開発による迅速なデリバリーと、スケーラブルなクラウドネイティブアーキテクチャで確かなプロダクト価値を創出します。'
                : 'Rapid delivery powered by Agile Scrum methodology and resilient cloud-native technologies.'}
            </p>
          </div>
        </section>

        {/* 1. Development Process */}
        <ProcessSection />

        {/* 2. Technology Stack */}
        <TechStackSection />

        {/* 3. Latest Insights & Technical Blog */}
        <InsightsSection />
      </main>
    </div>
  )
}
