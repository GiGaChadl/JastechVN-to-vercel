import { useTranslations } from 'next-intl'
import { LayoutGrid } from '../ui/layout-grid'

export function DeliveryCapabilitySection() {
  const t = useTranslations('home.delivery')
  const caseImages = [
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop', // B2B EC Platform
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop', // Smart Logistics App
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
    <section id="delivery" className="py-24 bg-white border-y border-slate-100">
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
