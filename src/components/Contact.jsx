import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { useInteractiveEffect } from '../lib/anim/useMicroInteractions'
import Parallax from './ui/Parallax'
import ContactWizard from './ui/ContactWizard'
import ContactSuccess from './ui/ContactSuccess'
import { sendEmail } from '../lib/email/sendEmail'
import { useToast } from './ui/toast'

export default function Contact() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const backgroundRef = useInteractiveEffect({ sensitivity: 0.15 })
  const { push: showToast } = useToast()

  const handleFormSubmit = async (formData) => { 
    setLoading(true)
    try {
      // Send the email and verify result
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        // Additional details
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        features: formData.features,
        company: formData.company,
        phone: formData.phone,
      })

      if (!result?.success) {
        console.error('Email send failed:', result)
        throw new Error(result?.error || 'Email send failed')
      }

      setShowSuccess(true)
      showToast({ type: 'success', message: t('contact.form.success') })
    } catch (error) {
      console.error('Failed to send email:', error)
      showToast({ type: 'error', message: t('contact.form.error') })
    } finally {
      setLoading(false)
    }
  }

  const handleBackToForm = () => {
    setShowSuccess(false)
  }

  return (
    <section className="relative py-20 md:py-28" id="contact" data-section="contact">
      {/* Enhanced Dynamic Background Layer for Contact Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(600px 500px at 30% 30%, rgba(255,255,255,0.04), transparent 60%),
            radial-gradient(500px 300px at 90% 70%, rgba(255,255,255,0.03), transparent 50%),
            linear-gradient(225deg, rgba(255,255,255,0.02) 0%, transparent 40%, rgba(255,255,255,0.015) 100%),
            conic-gradient(from 45deg at 70% 20%, rgba(255,255,255,0.01), transparent 30%, rgba(255,255,255,0.02))
          `,
          animation: 'globalWave 26s ease-in-out infinite 5s'
        }}
        aria-hidden
      />
      
      {/* Animated contact mesh overlay */}
      <div
        className="absolute inset-0 -z-19 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%),
            linear-gradient(135deg, transparent 20%, rgba(255,255,255,0.015) 50%, transparent 80%)
          `,
          animation: 'meshFlow 35s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Enhanced Floating Dynamic Elements */}
      <div
        className="absolute top-20 left-24 w-32 h-32 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)',
          animation: 'globalFloat 24s ease-in-out infinite 2s',
          filter: 'blur(1px)'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-32 right-20 w-28 h-28 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)',
          animation: 'globalPulse 16s ease-in-out infinite 4.5s',
          filter: 'blur(0.5px)'
        }}
        aria-hidden
      />
      
      {/* Additional contact-specific particles */}
      <div
        className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full -z-18 pointer-events-none bg-white/15"
        style={{
          animation: 'particleFloat 18s ease-in-out infinite 1s',
          filter: 'blur(0.5px)'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full -z-18 pointer-events-none bg-white/20"
        style={{
          animation: 'particleFloat 22s ease-in-out infinite 3s reverse',
          filter: 'blur(0.25px)'
        }}
        aria-hidden
      />
      <div
        className="absolute top-2/3 left-1/2 w-1.5 h-1.5 rounded-full -z-18 pointer-events-none bg-white/25"
        style={{
          animation: 'particlePulse 12s ease-in-out infinite 2s',
          filter: 'blur(0.25px)'
        }}
        aria-hidden
      />
      
      {/* Background accents with enhanced animation */}
      <Parallax
        className="pointer-events-none absolute -z-10 top-12 left-10 h-28 w-28 rounded-full bg-white/5 blur-3xl"
        aria-hidden
        offset={-50}
        style={{ animation: 'globalPulse 18s ease-in-out infinite 1s' }}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 top-32 right-16 h-20 w-20 rounded-full bg-white/3 blur-3xl"
        aria-hidden
        offset={30}
        style={{ animation: 'globalFloat 22s ease-in-out infinite 3s' }}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-16 left-1/3 h-24 w-24 rounded-full bg-white/4 blur-3xl"
        aria-hidden
        offset={-25}
        style={{ animation: 'globalPulse 20s ease-in-out infinite 2.5s' }}
      />

      {/* Interactive background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #050505 100%)',
          animation: 'globalFlow 32s ease-in-out infinite 1s'
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center" ref={reveal}>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl relative">
            {t('contact.title')}
            {/* Enhanced text glow effect */}
            <div className="absolute inset-0 text-4xl sm:text-6xl font-bold text-white/15 blur-sm -z-10 pointer-events-none">
              {t('contact.title')}
            </div>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70 hover:text-white/90 transition-colors duration-500">
            {t('contact.subtitle')}
          </p>
          
          {/* Enhanced decorative elements */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {showSuccess ? (
            <ContactSuccess onBack={handleBackToForm} />
          ) : (
            <ContactWizard onSubmit={handleFormSubmit} loading={loading} />
          )}
        </div>
      </div>
    </section>
  )
}

