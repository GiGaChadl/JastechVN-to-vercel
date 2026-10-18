import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LayoutGrid } from '../ui/layout-grid'

export function CaseStudiesSection() {
  const t = useTranslations('home.caseStudies')

  // DANH SÁCH ẢNH DỰ ÁN THỰC TẾ TỪ UNSPLASH:
  const caseImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', // B2B EC Platform
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Smart Logistics App
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop', // Enterprise Cloud SaaS
  ]

  const cards = [0, 1, 2].map((i) => ({
    id: i + 1,
    className: 'col-span-1 h-72 md:h-96',
    thumbnail: caseImages[i],
    content: (
      <div className="text-white">
        <h3 className="text-xl sm:text-2x1 font-bold mb-3 leading-snug">
          {t(`items.${i}.title`)}
        </h3>
        <div>
          <div>
            <span className="font-bold block mb-1">
              {t('problem')}:
              <p className="text-white/80 leading-relaxed">
                {t(`items.${i}.problem`)}
              </p>
            </span>
          </div>
          <div>
            <span className="font-bold block mb-1">
              {t('solution')}:
              <p className="text-white/50 leading-relaxed">
                {t(`items.${i}.solution`)}
              </p>
            </span>
          </div>
        </div>
      </div>
    ),
  }))

  return (
    <section id="case-studies" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between max-w-6xl mx-auto mb-16 gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {t('tag')}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-navy mt-2">
              {t('title')}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition flex-shrink-0"
          >
            <span>{t('viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="max-w-6x1 mx-auto">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </section>
  )
}
