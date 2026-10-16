import { ArrowRight, Sparkles, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { DiaTextReveal } from '@/components/ui/dia-text-reveal'
import { EncryptedText } from '@/components/ui/encrypted-text'

interface HeroSectionProps {
  locale: string
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('home.hero')

  // GỢI Ý ẢNH GIF CÔNG NGHỆ ĐỘNG (Bạn có thể tự do copy link GIF khác dán vào đây):
  // 1. Digital Network / Data Flow: https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif
  // 2. Cyber Matrix Code: https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif
  // 3. AI / Digital Tech Loop: https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif
  const heroGifUrl =
    'https://media.giphy.com/media/SVCSsoKU5v6ZJLk07n/giphy.gif'

  return (
    <section className="relative isolate pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-900 text-white">
      <div className="container mx-auto z-10">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroGifUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* CỘT TRÁI: TIÊU ĐỀ, CTA, CHỈ SỐ */}
          <div className="lg:col-span-7 text-left">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 whitespace-pre-line text-white">
              {/* <DiaTextReveal text={t('title')} textColor="#ffffff" /> */}
              <EncryptedText
                text={t('title')}
                revealDelayMs={20}
                flipDelayMs={30}
                encryptedClassName="text-muted-foreground"
                revealedClassName="text-foreground"
              />
            </h1>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {t('description')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all text-base"
              >
                <span>{t('ctaPrimary')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#case-studies"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold backdrop-blur-sm transition-all text-base"
              >
                <span>{t('ctaSecondary')}</span>
              </a>
            </div>

            {/* Mini Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-accent block">
                  {t('metric1')}
                </span>
                <span className="text-xs text-slate-400">
                  {t('metric1Label')}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-white block">
                  {t('metric2')}
                </span>
                <span className="text-xs text-slate-400">
                  {t('metric2Label')}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-accent block">
                  {t('metric3')}
                </span>
                <span className="text-xs text-slate-400">
                  {t('metric3Label')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
