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
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-semibold">{t('skills.title')}</h2>
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-28 bg-white/30"
            speedY={0.5}
            start="top bottom"
            end="bottom top"
            maxShift={50}
            aria-hidden
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(categories) && categories.map((cat, idx) => (
            <div
              key={idx}
              ref={reveal}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5 transition-transform duration-300 will-change-transform hover:-translate-y-1"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)] backdrop-blur-sm">
                <h3 className="text-sm uppercase tracking-wider text-white/60">{cat.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.isArray(cat.items) && cat.items.map((item, i) => (
                    <span key={i} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 transition-colors group-hover:bg-white/8 hover:bg-white/12">
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
