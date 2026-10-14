import { Check, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('home.services')

  // DANH SÁCH ẢNH DỊCH VỤ TỪ UNSPLASH (Bạn có thể tự do thay URL ảnh):
  const serviceImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', // Web Systems & SaaS
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop', // Mobile Apps
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', // Dedicated Lab Teams & Support
  ]

  return (
    <section id="services" className="py-24 bg-slate-50/60 scroll-mt-20">
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
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 1. ẢNH ĐẠI DIỆN DỊCH VỤ (UNSPLASH) */}
                <div className="w-full h-52 overflow-hidden bg-slate-100">
                  <img
                    src={serviceImages[index]}
                    alt={t(`items.${index}.title`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 2. NỘI DUNG CHI TIẾT */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-primary transition-colors">
                    {t(`items.${index}.title`)}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {t(`items.${index}.desc`)}
                  </p>

                  {/* Danh sách tính năng */}
                  <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                    {[0, 1, 2].map((fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>{t(`items.${index}.features.${fIndex}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 3. NÚT XEM THÊM */}
              <div className="px-7 pb-7">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-between w-full py-3.5 px-5 rounded-xl bg-slate-50 text-navy font-semibold text-sm transition-all"
                >
                  <span>{t('learnMore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
