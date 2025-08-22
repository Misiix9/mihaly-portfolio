import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LegalModal from './ui/LegalModal'
import useScrollReveal from '../lib/anim/useScrollReveal'
import LanguageSwitch from './LanguageSwitch'
import Parallax from './ui/Parallax'
import useBudapestTime from '../lib/time/useBudapestTime'

export default function Footer() {
  const { t } = useTranslation()
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalDoc, setLegalDoc] = useState(null)
  const reveal = useScrollReveal()
  const time = useBudapestTime()

  const openLegal = (docKey) => {
    setLegalDoc(docKey)
    setLegalOpen(true)
  }

  const lang = typeof navigator !== 'undefined' && navigator.language?.startsWith('hu') ? 'hu' : 'en'
  const label = (en, hu) => (lang === 'hu' ? hu : en)
  return (
    <footer className="relative py-12 md:py-16 border-t border-white/10 overflow-hidden">
      {/* Dynamic Background Layer for Footer Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(300px 150px at 20% 50%, rgba(255,255,255,0.02), transparent 50%),
            radial-gradient(200px 100px at 80% 50%, rgba(255,255,255,0.015), transparent 60%),
            linear-gradient(90deg, rgba(255,255,255,0.008) 0%, transparent 30%, rgba(255,255,255,0.01) 100%)
          `,
          animation: 'globalPulse 34s ease-in-out infinite 6s'
        }}
        aria-hidden
      />
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 -z-30 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
        aria-hidden
      />
      
      {/* Floating Dynamic Elements */}
      <div
        className="absolute top-4 left-20 w-16 h-16 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          animation: 'globalFloat 20s ease-in-out infinite 3s'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-2 right-16 w-12 h-12 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
          animation: 'globalPulse 24s ease-in-out infinite 5s'
        }}
        aria-hidden
      />
      
      {/* Background accents with enhanced animation */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-6 left-8 h-20 w-20 rounded-full bg-white/5 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={50}
        style={{ animation: 'globalPulse 18s ease-in-out infinite 2s' }}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 -bottom-6 right-12 h-24 w-24 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.1}
        maxShift={60}
        style={{ animation: 'globalFloat 22s ease-in-out infinite 4s' }}
      />
      <div ref={reveal} className="container mx-auto px-4 sm:px-6 text-sm text-white/70 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-white/90">© {new Date().getFullYear()} Mihaly Gyori</span>
            <span className="hidden md:inline">•</span>
            <span>{t('footer.rights')}</span>
          </div>
          <div className="text-white/80">
            {t('footer.tagline', { time })}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a href="#about" className="text-white/70 hover:text-white transition-colors">{t('nav.about')}</a>
            </li>
            <li>
              <a href="#skills" className="text-white/70 hover:text-white transition-colors">{t('nav.skills')}</a>
            </li>
            <li>
              <a href="#projects" className="text-white/70 hover:text-white transition-colors">{t('nav.projects')}</a>
            </li>
            <li>
              <a href="#services" className="text-white/70 hover:text-white transition-colors">{t('nav.services', t('services.title'))}</a>
            </li>
            <li>
              <a href="#process" className="text-white/70 hover:text-white transition-colors">{t('nav.process', t('process.title'))}</a>
            </li>
            <li>
              <a href="#faq" className="text-white/70 hover:text-white transition-colors">{t('nav.faq', t('faq.title'))}</a>
            </li>
            <li>
              <a href="#cta" className="text-white/70 hover:text-white transition-colors">{t('nav.cta', 'Get Started')}</a>
            </li>
            <li>
              <a href="#contact" className="text-white/70 hover:text-white transition-colors">{t('nav.contact')}</a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <LanguageSwitch />
        </div>
      </div>

      {/* Legal links row */}
      <div className="container mx-auto px-4 sm:px-6 mt-8">
        <ul className="flex flex-wrap gap-3">
          <li>
            <button onClick={() => openLegal('legal-notice')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Legal Notice', 'Impresszum')}
            </button>
          </li>
          <li>
            <button onClick={() => openLegal('privacy-policy')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Privacy Policy', 'Adatvédelmi Tájékoztató')}
            </button>
          </li>
          <li>
            <button onClick={() => openLegal('cookie-policy')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Cookie Policy', 'Sütiszabályzat')}
            </button>
          </li>
          <li>
            <button onClick={() => openLegal('terms-of-service')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Terms of Service', 'Általános Szerződési Feltételek')}
            </button>
          </li>
          <li>
            <button onClick={() => openLegal('refunds-cancellations')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Refunds & Cancellations', 'Visszatérítés és Lemondás')}
            </button>
          </li>
          <li>
            <button onClick={() => openLegal('support-maintenance')} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
              {label('Support & Maintenance', 'Támogatás és Karbantartás')}
            </button>
          </li>
        </ul>
      </div>

      <LegalModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} docKey={legalDoc} />
    </footer>
  )
}
