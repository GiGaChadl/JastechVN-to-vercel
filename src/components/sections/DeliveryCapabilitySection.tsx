
import { useTranslations } from 'next-intl'

export function DeliveryCapabilitySection() {
  const t = useTranslations('home.delivery')

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* BrSE Card */}
          <div className="rounded-2xl border border-primary/20 shadow-sm overflow-hidden flex flex-col">
            {/* Ảnh phía trên card — Japanese business meeting */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop"
                alt="BrSE Bridge Role"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Nội dung phía dưới card */}
            <div className="bg-gradient-to-b from-primary/5 to-white p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {t('brseRole')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('brseDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-primary">
                JLPT N1/N2 • Japanese Culture Alignment
              </div>
            </div>
          </div>

          {/* Timezone Sync Card */}
          <div className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* Ảnh phía trên card — world clock / collaboration */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop"
                alt="Timezone Collaboration"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-gradient-to-b from-navy/5 to-white p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {t('collabRole')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('collabDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-navy">
                Tokyo (GMT+9) ⇄ Vietnam (GMT+7)
              </div>
            </div>
          </div>

          {/* Vietnam Dev Team Card */}
          <div className="rounded-2xl border border-accent/30 shadow-sm overflow-hidden flex flex-col">
            {/* Ảnh phía trên card — developers at work */}
            <div className="h-48 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Vietnam Dev Team"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-gradient-to-b from-accent/10 to-white p-8 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {t('devRole')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('devDesc')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-accent-700">
                Top University Talents • Modern Tech Stacks
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
