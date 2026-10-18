import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('about')

  return (
    <div className="bg-slate-900">
      <ContainerScroll
        titleComponent={
          <div className="mb-10">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
          alt="Jastech Team"
          className="h-full w-full object-cover rounded-2xl"
        />
      </ContainerScroll>
    </div>
  )
}
