import { ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { LayoutGrid } from '../ui/layout-grid'

export function InsightsSection() {
  const t = useTranslations('home.insights')
  const locale = useLocale()

  // ẢNH BÀI VIẾT TỪ UNSPLASH:
  const insightImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', // Offshore BrSE Team
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', // Next.js & Modern Code
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop', // Agile Daily Scrum
  ]

  const cards = [0, 1, 2].map((i) => ({
    id: i + 1,
    className: 'col-span-1 h-72 md:h-96',
    thumbnail: insightImages[i],
    content: (
      <div className="text-white">
        <h3 className="text-xl sm:text-2x1 font-bold mb-3 leading-snug">
          {t(`items.${i}.title`)}
        </h3>
        <div>
          <div>
            <span className="font-bold block mb-1">
              <p className="text-white/80 leading-relaxed">
                {t(`items.${i}.excerpt`)}
              </p>
            </span>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section id="insights" className="py-24 bg-slate-50/50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {t('tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-navy mt-2">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6x1 mx-auto">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </section>
  )
}
