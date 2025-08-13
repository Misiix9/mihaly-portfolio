import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Parallax from './ui/Parallax'

export default function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })
  const reveal = useScrollReveal()
  return (
    <section className="relative py-20 md:py-28" id="skills">
      {/* Background accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 top-6 right-8 h-28 w-28 rounded-full bg-white/4 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={50}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-10 left-12 h-24 w-24 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.06}
        maxShift={60}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative inline-block">
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-bold text-white hover:scale-105 transition-all duration-300 cursor-default">{t('skills.title')}</h2>
          <div className="absolute -bottom-2 left-0 h-0.5 w-24 bg-gradient-to-r from-white/50 via-white/30 to-transparent rounded-full" />
          <div className="absolute -bottom-3 left-20 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-28 bg-gradient-to-r from-white/40 to-transparent"
            speedY={0.5}
            start="top bottom"
            end="bottom top"
            maxShift={50}
            aria-hidden
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(categories) && categories.map((cat, idx) => (
            <div
              key={idx}
              ref={reveal}
              className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/20 hover:border-white/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8">
                <h3 className="text-sm uppercase tracking-widest text-white/70 font-semibold group-hover:text-white/90 transition-colors duration-300">{cat.title}</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {Array.isArray(cat.items) && cat.items.map((item, i) => (
                    <span key={i} className="inline-block rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 px-4 py-2 text-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-default backdrop-blur-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
