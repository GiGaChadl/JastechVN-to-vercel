'use client'

import { Send, Clock, ShieldCheck, Mail, Building2, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState } from 'react'
import { Notification } from '@/components/ui/Notification'

export function ContactCtaSection() {
  const t = useTranslations('home.contactCta')
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
    description?: string
  } | null>(null)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget

    if (!(form instanceof HTMLFormElement)) {
      setNotification({
        type: 'error',
        message: t('notification.error.message'),
        description: t('notification.error.description'),
      })
      return
    }

    if (!executeRecaptcha) {
      setNotification({
        type: 'error',
        message: t('notification.error.message'),
        description: t('notification.error.description'),
      })
      return
    }

    try {
      const captchaToken = await executeRecaptcha('contact_form_submit')

      const formData = new FormData(form)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: formData.get('company'),
          name: formData.get('name'),
          email: formData.get('email'),
          inquiry: formData.get('inquiry'),
          captchaToken,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        setNotification({
          type: 'error',
          message: t('notification.error.message'),
          description: t('notification.error.description'),
        })
        return
      }

      form.reset()

      setNotification({
        type: 'success',
        message: t('notification.success.message'),
        description: t('notification.success.description'),
      })
    } catch (error) {
      setNotification({
        type: 'error',
        message: t('notification.error.message'),
        description: t('notification.error.description'),
      })
      return new Response(JSON.stringify({ error: 'Can not send message' }), {
        status: 500,
      })
    }
  }

  return (
    <>
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-navy via-slate-900 to-navy text-white relative overflow-hidden scroll-mt-20"
      >
        {/* Background photo — opacity thấp để không che chữ */}
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1920&auto=format&fit=crop"
          alt="Ảnh đại diện"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
        />

        {/* Background glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
              {t('title')}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Quick Consultation Form Box (Demo / Presentation UI) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-10 text-left max-w-2xl mx-auto shadow-2xl mb-8">
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Company Name / 貴社名
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder={t('companyPlaceholder')}
                        name="company"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Your Name / ご担当者名
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder={t('namePlaceholder')}
                        name="name"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Business Email / メールアドレス
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      placeholder="admin@gmail.com"
                      name="email"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Inquiry Details / ご相談内容
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t('inquiryPlaceholder')}
                    name="inquiry"
                    className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all cursor-pointer"
                >
                  <span>{t('button')}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Reassurance notes */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span>{t('note')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NDA（秘密保持契約）締結後のご相談も対応可能です</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {notification !== null && (
        <Notification
          type={notification.type}
          message={notification.message}
          description={notification.description}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  )
}
