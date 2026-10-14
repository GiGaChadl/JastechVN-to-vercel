import { Calendar, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function InsightsSection() {
  const t = useTranslations('home.insights')
  const locale = useLocale()

  // ẢNH BÀI VIẾT TỪ UNSPLASH:
  const insightImages = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop', // Offshore BrSE Team
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop', // Next.js & Modern Code
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop', // Agile Daily Scrum
  ]

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[0, 1, 2].map((index) => (
            <article
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-primary/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 1. ẢNH BÀI VIẾT UNSPLASH */}
                <div className="w-full h-48 overflow-hidden bg-slate-100">
                  <img
                    src={insightImages[index]}
                    alt={t(`items.${index}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 2. NỘI DUNG */}
                <div className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-navy mb-3 group-hover:text-primary transition-colors leading-snug">
                    {t(`items.${index}.title`)}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(`items.${index}.excerpt`)}
                  </p>
                </div>
              </div>

              {/* 3. NÚT ĐỌC BÀI (DÙNG ĐÚNG useLocale ĐỂ CHUYỂN TRANG) */}
              <div className="px-6 pb-6">
                <Link
                  href={`/${locale}#contact`}
                  className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform"
                >
                  <span>{t('readMore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
