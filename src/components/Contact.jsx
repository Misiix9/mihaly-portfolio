import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendEmail } from '../lib/email/sendEmail'
import Button from './ui/Button'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Parallax from './ui/Parallax'
import HCaptcha from './ui/HCaptcha'
import { useToast } from './ui/toast'

export default function Contact() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [captcha, setCaptcha] = useState(null)
  const [botField, setBotField] = useState('') // honeypot
  const [startTs, setStartTs] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const toast = useToast()

  useEffect(() => {
    setStartTs(Date.now())
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setStatus(null)
    // Basic validation + spam checks
    if (!name || !email || !message || !captcha) {
      setStatus('error')
      return
    }
    // Honeypot
    if (botField) {
      setStatus('error')
      return
    }
    // Minimum time on page before submit (~1.5s)
    if (Date.now() - startTs < 1500) {
      setStatus('error')
      return
    }
    try {
      setLoading(true)
      await sendEmail({ name, email, message, captchaToken: captcha })
      setStatus('success')
      toast.push({ type: 'success', message: t('contact.form.success'), duration: 3000 })
      setName('')
      setEmail('')
      setMessage('')
      setCaptcha(null)
    } catch (err) {
      console.error(err)
      setStatus('error')
      toast.push({ type: 'error', message: t('contact.form.error'), duration: 4000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-20 md:py-28" id="contact">
      {/* Background accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 top-12 left-10 h-28 w-28 rounded-full bg-white/5 blur-3xl"
        aria-hidden
        speedY={0.09}
        maxShift={70}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-6 right-8 h-24 w-24 rounded-full bg-white/6 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={60}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative inline-block section-title">
          <h2 ref={reveal} className="text-3xl font-semibold fx-tilt">{t('contact.title')}</h2>
          <div className="rule fx-border-shimmer" />
          <div className="dot fx-float" />
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-28 bg-white/30 fx-shimmer"
            speedY={0.6}
            start="top bottom"
            end="bottom top"
            maxShift={60}
            aria-hidden
          />
        </div>
        <p ref={reveal} className="mt-3 text-white/70 max-w-2xl fx-fade-up">{t('contact.subtitle')}</p>

        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6" noValidate>
          <div ref={reveal} className="lg:col-span-1 space-y-4">
            <div className="fx-fade-up">
              <label htmlFor="name" className="block text-sm text-white/70">{t('contact.form.name')}</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 hover-lift fx-shimmer"
                placeholder={t('contact.form.name_placeholder')}
                required
                aria-required="true"
                aria-invalid={submitted && !name ? 'true' : 'false'}
                aria-describedby={submitted && !name ? 'name-error' : undefined}
              />
              {submitted && !name && (
                <p id="name-error" className="mt-1 text-sm text-red-400">{t('contact.form.error')}</p>
              )}
            </div>
            <div className="fx-fade-up">
              <label htmlFor="email" className="block text-sm text-white/70">{t('contact.form.email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 hover-lift fx-shimmer"
                placeholder={t('contact.form.email_placeholder')}
                required
                aria-required="true"
                aria-invalid={submitted && !email ? 'true' : 'false'}
                aria-describedby={submitted && !email ? 'email-error' : undefined}
              />
              {submitted && !email && (
                <p id="email-error" className="mt-1 text-sm text-red-400">{t('contact.form.error')}</p>
              )}
            </div>
          </div>
          <div ref={reveal} className="lg:col-span-1 fx-fade-up">
            <label htmlFor="message" className="block text-sm text-white/70">{t('contact.form.message')}</label>
            <textarea
              id="message"
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 hover-lift fx-shimmer"
              placeholder={t('contact.form.message_placeholder')}
              required
              aria-required="true"
              aria-invalid={submitted && !message ? 'true' : 'false'}
              aria-describedby={submitted && !message ? 'message-error' : undefined}
            />
            {submitted && !message && (
              <p id="message-error" className="mt-1 text-sm text-red-400">{t('contact.form.error')}</p>
            )}
          </div>

          <div ref={reveal} className="lg:col-span-2 flex items-center gap-4 fx-fade-up">
            {/* Honeypot field (keep rendered) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              aria-hidden
              className="absolute opacity-0 pointer-events-none -z-10"
            />
            <HCaptcha className="shrink-0" onVerify={setCaptcha} />
            <Button type="submit" variant="primary" size="md" disabled={loading} aria-busy={loading ? 'true' : 'false'} className="btn-primary hover-lift fx-shimmer">
              {loading ? t('contact.form.sending') : t('contact.form.submit')}
            </Button>
            <a
              href={`mailto:mihalygyori05@gmail.com?subject=${encodeURIComponent('Portfolio contact')}&body=${encodeURIComponent(message)}`}
              className="text-white/70 underline-offset-4 hover:underline transition-colors hover:text-white/90 fx-float"
            >
              {t('contact.form.mailto_fallback')}
            </a>
          </div>

          {status === 'success' && (
            <p ref={reveal} className="lg:col-span-2 text-sm text-emerald-400" role="status" aria-live="polite">{t('contact.form.success')}</p>
          )}
          {status === 'error' && (
            <p ref={reveal} className="lg:col-span-2 text-sm text-red-400" role="status" aria-live="polite">{t('contact.form.error')}</p>
          )}
        </form>
      </div>
    </section>
  )
}
