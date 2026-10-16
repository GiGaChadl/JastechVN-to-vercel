'use client'
import { useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface NotificationProps {
  type: 'success' | 'error'
  message: string
  description?: string
  onClose: () => void
}

export function Notification({
  type,
  message,
  description,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const tNotification = useTranslations('home.contactCta.notification')

  const isSuccess = type === 'success'

  return (
    <div
      role={isSuccess ? 'status' : 'alert'}
      className={`fixed right-5 top-5 z-[9999] flex w-[calc(100%-2.5rem)] max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg animate-in slide-in-from-top-2 fade-in duration-300 ${
        isSuccess
          ? 'border-green-200 bg-green-50 text-green-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      )}

      <div className="min-w-0 flex-1">
        <p className="font-semibold">{message}</p>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={tNotification('close')}
        className="rounded-md p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
