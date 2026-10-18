import { useTranslations } from 'next-intl'
import { SwipeCarousel } from '@/components/ui/swipe-carousel'

export function ProcessSection() {
  const t = useTranslations('home.process')
  const slides = [0, 1, 2, 3, 4, 5].map((index) => (
    <div key={index}>
      <span className="text-xs font-bold tracking-widest text-white/70">
        0{index + 1} / 06
      </span>
      <h3 className="mt-2 text-2xl font-bold md:text-3xl">
        {t(`steps.${index}.name`)}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
        {t(`steps.${index}.desc`)}
      </p>
    </div>
  ))
  return (
    <section id="process" className="py-24 bg-slate-50 scroll-mt-20">
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

        <div className="mx-auto max-w-6xl">
          <SwipeCarousel
            image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
            imageAlt="Engineering & Architecture"
            slides={slides}
          />
        </div>
      </div>
    </section>
  )
}
