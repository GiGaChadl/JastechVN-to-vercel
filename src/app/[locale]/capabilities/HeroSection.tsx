import { useTranslations } from 'next-intl'
import { BackgroundCubesGrid } from '@/components/ui/background-cubes-grid'

export function HeroSection() {
  const t = useTranslations('capability')

  return (
    <div className="bg-slate-900">
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <BackgroundCubesGrid
          variant="perspective"
          backgroundColor="#0f172a"
          baseColor="#1e293b"
          waveColor="#3b82f6"
          glow={0.8}
        />
        {/* Lớp tối nhẹ để chữ dễ đọc, không chặn chuột */}
        {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent" /> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {t('title')}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>
    </div>
  )
}
