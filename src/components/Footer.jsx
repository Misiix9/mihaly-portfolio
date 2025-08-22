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
      {/* Gradient top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
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
      <div ref={reveal} className="container mx-auto px-4 sm:px-6 text-sm text-white/80 flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <span className="text-white/90">© {new Date().getFullYear()} Selora</span>
          <span>•</span>
          <span>{t('footer.rights')}</span>
        </div>
        <div className="text-white/80 max-w-2xl">
          {t('footer.tagline', { time })}
        </div>

        {/* Language */}
        <div className="flex items-center">
          <LanguageSwitch />
        </div>
      </div>

      {/* Social links */}
      <div className="container mx-auto px-4 sm:px-6 mt-10">
        <ul className="flex justify-center flex-wrap gap-4 text-white/80">
          <li><a href="https://github.com/seloradev" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline underline-offset-4">GitHub</a></li>
          <li><a href="https://instagram.com/selora.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline underline-offset-4">Instagram</a></li>
          <li><a href="mailto:hi@selora.dev" className="hover:text-white hover:underline underline-offset-4">Email</a></li>
        </ul>
      </div>

      {/* Legal links row */}
      <div className="container mx-auto px-4 sm:px-6 mt-12">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Links column (uses existing anchors) */}
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-wider text-white/50">{label('Quick Links', 'Gyors Linkek')}</h3>
            <ul className="flex flex-col gap-2">
              <li><a href="#about" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.about')}</a></li>
              <li><a href="#skills" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.skills')}</a></li>
              <li><a href="#projects" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.projects')}</a></li>
              <li><a href="#services" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.services', t('services.title'))}</a></li>
              <li><a href="#process" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.process', t('process.title'))}</a></li>
              <li><a href="#faq" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.faq', t('faq.title'))}</a></li>
              <li><a href="#contact" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-white/85 hover:text-white hover:bg-white/5 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-wider text-white/50">{label('Legal', 'Jogi')}</h3>
            <ul className="flex flex-col gap-2 text-white/85">
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('legal-notice') }} className="hover:text-white hover:underline underline-offset-4">{label('Legal Notice', 'Impresszum')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('privacy-policy') }} className="hover:text-white hover:underline underline-offset-4">{label('Privacy Policy', 'Adatvédelmi Tájékoztató')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('cookie-policy') }} className="hover:text-white hover:underline underline-offset-4">{label('Cookie Policy', 'Sütiszabályzat')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('terms-of-service') }} className="hover:text-white hover:underline underline-offset-4">{label('Terms of Service', 'Általános Szerződési Feltételek')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('refunds-cancellations') }} className="hover:text-white hover:underline underline-offset-4">{label('Refunds & Cancellations', 'Visszatérítés és Lemondás')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openLegal('support-maintenance') }} className="hover:text-white hover:underline underline-offset-4">{label('Support & Maintenance', 'Támogatás és Karbantartás')}</a></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="hidden lg:block">
            <h3 className="mb-3 text-xs uppercase tracking-wider text-white/50">{label('Get In Touch', 'Kapcsolat')}</h3>
            <ul className="flex flex-col gap-2 text-white/85">
              <li><a href="#contact" className="hover:text-white hover:underline underline-offset-4">{t('nav.contact')}</a></li>
              <li><a href="#cta" className="hover:text-white hover:underline underline-offset-4">{label('Start a Project', 'Kezdjük El')}</a></li>
            </ul>
          </div>
        </div>
      </div>

      <LegalModal isOpen={legalOpen} onClose={() => setLegalOpen(false)} docKey={legalDoc} />
    </footer>
  )
}
