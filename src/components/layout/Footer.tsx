import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const tFooter = useTranslations('footer')
  const tNav = useTranslations('nav')
  const tCommon = useTranslations('common')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-4 rounded-lg overflow-hidden border border-slate-1500 bg-white flex-shrink-0">
                <Image
                  src="/images/logo_Jastech.jpg"
                  alt="Jastech Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                JASTECH
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {tFooter('desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {tFooter('linksTitle')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-white transition">
                  {tNav('services')}
                </a>
              </li>
              <li>
                <a href="#why-jastech" className="hover:text-white transition">
                  {tNav('whyJastech')}
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition">
                  {tNav('caseStudies')}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition">
                  {tNav('process')}
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition">
                  {tNav('techStack')}
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition">
                  {tNav('insights')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {tFooter('contactTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{tFooter('address')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${tFooter('email')}`}
                  className="hover:underline"
                >
                  {tFooter('email')}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Tokyo GMT+9 / Vietnam GMT+7 (2h difference)</span>
              </li>
            </ul>
          </div>

          {/* Language Switch */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Language / 言語
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/ja"
                className={`inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-sm transition ${
                  locale === 'ja'
                    ? 'bg-primary text-white font-medium'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>日本語 (Japanese)</span>
                {locale === 'ja' && <span className="text-xs">✓ Active</span>}
              </Link>
              <Link
                href="/en"
                className={`inline-flex items-center justify-between px-3.5 py-2 rounded-lg text-sm transition ${
                  locale === 'en'
                    ? 'bg-primary text-white font-medium'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <span>English (US)</span>
                {locale === 'en' && <span className="text-xs">✓ Active</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{tFooter('copyright', { year: currentYear })}</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">
              {tCommon('privacy')}
            </span>
            <span>Security Standard ISO 27001 Ready</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
