import { Check, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FanCards, type FanCardItem } from '@/components/ui/fan-cards'

interface ServicesSectionProps {
  locale: string
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('home.services')

  const cardStyles = [
    {
      bg: '#F26419',
      textColor: '#fff',
      subtitleColor: 'rgba(255,255,255,0.78)',
      defaultRotation: -8,
    },
    {
      bg: '#ECEAE3',
      textColor: '#1a1a1a',
      subtitleColor: 'rgba(0,0,0,0.58)',
      defaultRotation: 0,
    },
    {
      bg: '#3B82F6',
      textColor: '#fff',
      subtitleColor: 'rgba(255,255,255,0.78)',
      defaultRotation: 8,
    },
  ]

  // DANH SÁCH ẢNH DỊCH VỤ TỪ UNSPLASH (Bạn có thể tự do thay URL ảnh):
  const serviceImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop', // Web Systems & SaaS
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop', // Mobile Apps
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', // Dedicated Lab Teams & Support
  ]

  const serviceCards: FanCardItem[] = [0, 1, 2].map((index) => ({
    id: `service-${index}`,
    title: t(`items.${index}.title`),
    subtitle: t(`items.${index}.desc`),
    stackIndex: index,
    ...cardStyles[index],
    content: (
      <img
        src={serviceImages[index]}
        alt={t(`items.${index}.title`)}
        className="h-full w-full rounded-xl object-cover"
      />
    ),
  }))

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

        <div className="mx-auto w-full max-w-6xl overflow-x-hidden">
          <FanCards
            cards={serviceCards}
            spread={100}
            rotateStep={10}
            springStiffness={260}
            springDamping={26}
          />
        </div>
      </div>
    </section>
  )
}
