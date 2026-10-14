import { useTranslations } from 'next-intl'

export function WhyJastechSection() {
  const t = useTranslations('home.whyJastech')

  return (
    <section id="why-jastech" className="py-24 bg-slate-50/80 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề section */}
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

        {/* Split layout: 6 cards bên trái, ảnh bên phải */}
        {/* lg:grid-cols-[1fr_400px] — bên trái chiếm phần còn lại, bên phải cố định 400px */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* Cột trái — 6 feature cards xếp thành 2 cột */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-primary/50 shadow-sm hover:shadow-md transition-all group"
              >
                <h3 className="text-lg font-bold text-navy mb-2.5">
                  {t(`points.${index}.title`)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(`points.${index}.desc`)}
                </p>
              </div>
            ))}
          </div>

          {/* Cột phải — ảnh full height, sticky khi scroll */}
          {/* sticky top-24 — ảnh "dính" ở vị trí cố định khi người dùng cuộn */}
          <div className="hidden lg:block sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-xl h-[560px]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
                alt="Jastech team collaboration"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
