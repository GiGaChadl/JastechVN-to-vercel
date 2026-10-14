import { useTranslations } from 'next-intl'

export function TrustIndicatorsSection() {
  const t = useTranslations('home.trust')

  return (
    <section id="trust" className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {t('tag')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-2">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/50 transition-all shadow-sm hover:shadow-md text-center group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-navy mb-1 tracking-tight">
                {t(`stats.${index}.value`)}
              </div>
              <div className="text-sm font-semibold text-slate-800 mb-1">
                {t(`stats.${index}.label`)}
              </div>
              <div className="text-xs text-slate-500">
                {t(`stats.${index}.desc`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
