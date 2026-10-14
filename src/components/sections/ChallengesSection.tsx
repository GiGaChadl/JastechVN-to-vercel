import { useTranslations } from 'next-intl'

export function ChallengesSection() {
  const t = useTranslations('home.challenges')

  return (
    <section id="challenges" className="py-20 bg-slate-50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/50 transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Problem Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-navy">
                      {t(`items.${index}.title`)}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {t(`items.${index}.desc`)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Solution Box */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-3 bg-emerald-50/60 p-4 rounded-xl border-emerald-100">
                <div className="text-xs sm:text-sm font-medium text-emerald-900 leading-snug">
                  <span className="font-bold text-emerald-700 block text-xs uppercase tracking-wider mb-0.5">
                    {t('JastechSolution')}
                  </span>
                  {t(`items.${index}.solution`)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
