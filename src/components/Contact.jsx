import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { useInteractiveEffect } from '../lib/anim/useMicroInteractions'
import Parallax from './ui/Parallax'
import ContactWizard from './ui/ContactWizard'
import ContactSuccess from './ui/ContactSuccess'
import { sendEmail } from '../lib/email/sendEmail'
import { showToast } from './ui/toast'

export default function Contact() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const backgroundRef = useInteractiveEffect({ sensitivity: 0.15 })

  const handleFormSubmit = async (formData) => { 
    setLoading(true)
    
    try {
      // Send the email
      await sendEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        // Add additional form data to the message
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        features: formData.features,
        company: formData.company,
        phone: formData.phone
      })
      
      setShowSuccess(true)
      showToast.success(t('contact.form.success'))
    } catch (error) {
      console.error('Failed to send email:', error)
      showToast.error(t('contact.form.error'))
    } finally {
      setLoading(false)
    }
  }

  const handleBackToForm = () => {
    setShowSuccess(false)
  }

  return (
    <section className="relative py-20 md:py-28" id="contact">
      {/* Dynamic Background Layer for Contact Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(500px 400px at 30% 30%, rgba(255,255,255,0.03), transparent 60%),
            radial-gradient(400px 200px at 90% 70%, rgba(255,255,255,0.02), transparent 50%),
            linear-gradient(225deg, rgba(255,255,255,0.012) 0%, transparent 40%, rgba(255,255,255,0.008) 100%)
          `,
          animation: 'globalWave 26s ease-in-out infinite 5s'
        }}
        aria-hidden
      />
      
      {/* Floating Dynamic Elements */}
      <div
        className="absolute top-20 left-24 w-32 h-32 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          animation: 'globalFloat 24s ease-in-out infinite 2s'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-32 right-20 w-28 h-28 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          animation: 'globalPulse 16s ease-in-out infinite 4.5s'
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
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {t('contact.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            {t('contact.subtitle')}
          </p>
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

