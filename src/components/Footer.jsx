import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import LanguageSwitch from './LanguageSwitch'
import Parallax from './ui/Parallax'

export default function Footer() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  return (
    <footer className="relative py-10 md:py-12 border-t border-white/10">
      {/* Background accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-6 left-8 h-20 w-20 rounded-full bg-white/5 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={50}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 -bottom-6 right-12 h-24 w-24 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.1}
        maxShift={60}
      />
      <div ref={reveal} className="container mx-auto px-4 sm:px-6 text-sm text-white/60 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/80">© {new Date().getFullYear()} Mihaly Gyori</span>
          <span className="hidden md:inline">•</span>
          <span>{t('footer.rights')}</span>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a href="#about" className="hover:text-white/90 transition-colors">{t('nav.about')}</a>
            </li>
            <li>
              <a href="#skills" className="hover:text-white/90 transition-colors">{t('nav.skills')}</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white/90 transition-colors">{t('nav.projects')}</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white/90 transition-colors">{t('nav.contact')}</a>
            </li>
          </ul>
        </nav>

        <div className="flex items-center">
          <LanguageSwitch />
        </div>
      </div>
    </footer>
  )
}
