'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  locale: string
}

export function Header({ locale }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const tNav = useTranslations('nav')
  const tCommon = useTranslations('common')

  const navLinks = [
    { href: `#services`, label: tNav('services') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/capabilities`, label: tNav('capabilities') },
    { href: `#case-studies`, label: tNav('caseStudies') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ]

  const targetLocale = locale === 'ja' ? 'en' : 'ja'
  const targetLocaleLabel = locale === 'ja' ? 'English' : '日本語'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group">
          <div className="relative w-24 h-7  overflow-hidden border-slate-1500 shadow-sm flex-shrink-0">
            <Image
              src="/images/logo_Jastech.jpg"
              alt="Jastech Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-navy group-hover:text-primary transition-colors">
              JASTECH VN
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {/* Desktop Navigation */}
          <Link
            href={`/${locale}#services`}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
          >
            {tNav('services')}
          </Link>

          <Link
            href={`/${locale}/about`}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
          >
            {tNav('about')}
          </Link>

          <Link
            href={`/${locale}/capabilities`}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
          >
            {tNav('capabilities')}
          </Link>

          <Link
            href={`/${locale}#case-studies`}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
          >
            {tNav('caseStudies')}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="text-sm font-medium text-slate-600 hover:text-primary transition-colors py-2"
          >
            {tNav('contact')}
          </Link>
        </nav>
        {/* Actions (Language Switcher + CTA) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher Button */}
          <Link
            href={`/${targetLocale}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{targetLocaleLabel}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href={`/${targetLocale}`}
            className="p-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span>{locale === 'ja' ? 'EN' : 'JA'}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-primary hover:bg-slate-50 rounded-md"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
