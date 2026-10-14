import { useTranslations } from 'next-intl'

export function ProcessSection() {
  const t = useTranslations('home.process')

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:border-primary/50 hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-primary/30 group-hover:text-primary transition-colors font-mono">
                  {t(`steps.${index}.step`)}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-navy mb-2">
                {t(`steps.${index}.name`)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(`steps.${index}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
