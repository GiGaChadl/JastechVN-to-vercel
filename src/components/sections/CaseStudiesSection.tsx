import { TrendingUp, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function CaseStudiesSection() {
  const t = useTranslations('home.caseStudies')

  // DANH SÁCH ẢNH DỰ ÁN THỰC TẾ TỪ UNSPLASH:
  const caseImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', // B2B EC Platform
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop', // Smart Logistics App
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop', // Enterprise Cloud SaaS
  ]

  return (
    <section id="case-studies" className="py-24 bg-white scroll-mt-20">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 1. ẢNH DỰ ÁN UNSPLASH */}
                <div className="w-full h-56 overflow-hidden bg-slate-100">
                  <img
                    src={caseImages[index]}
                    alt={t(`items.${index}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 2. THÔNG TIN CASE STUDY */}
                <div className="p-7">
                  <h3 className="text-lg font-bold text-navy mb-4 leading-snug group-hover:text-primary transition-colors">
                    {t(`items.${index}.title`)}
                  </h3>

                  {/* Bài toán & Giải pháp */}
                  <div className="space-y-3 mb-6 text-xs sm:text-sm">
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-700 block mb-1">
                        Problem / 課題:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {t(`items.${index}.problem`)}
                      </p>
                    </div>

                    <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/10">
                      <span className="font-bold text-primary block mb-1">
                        Solution / 解決策:
                      </span>
                      <p className="text-slate-600 leading-relaxed">
                        {t(`items.${index}.solution`)}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack chips */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[0, 1, 2, 3].map((techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {t(`items.${index}.tech.${techIndex}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. KẾT QUẢ ĐẠT ĐƯỢC */}
              <div className="px-7 pb-7">
                <div className="border-t border-slate-100 pt-4 flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50/70 p-3 rounded-xl">
                  <span>{t(`items.${index}.result`)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
