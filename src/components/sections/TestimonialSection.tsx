import { useTranslations } from 'next-intl'
import { AnimatedTestimonials } from '../ui/animated-testimonials'
export function TestimonialSection() {
  const t = useTranslations('home.testimonial')
  const testimonials = [
    {
      quote: t('user1.quote'),
      name: t('user1.name'),
      designation: t('user1.designation'),
      src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('user2.quote'),
      name: t('user2.name'),
      designation: t('user2.designation'),
      src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('user3.quote'),
      name: t('user3.name'),
      designation: t('user3.designation'),
      src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('user4.quote'),
      name: t('user4.name'),
      designation: t('user4.designation'),
      src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      quote: t('user5.quote'),
      name: t('user5.name'),
      designation: t('user5.designation'),
      src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]
  return (
    <section id="challenges" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  )
}
