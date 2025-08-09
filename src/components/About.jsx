import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Parallax from './ui/Parallax'
import MorphingBlob from './ui/MorphingBlob'

export default function About() {
  const { t } = useTranslation()
  const strengths = t('about.strengths', { returnObjects: true })
  const stack = t('about.stack', { returnObjects: true })
  const reveal = useScrollReveal()
  return (
    <section className="relative py-20 md:py-28" id="about">
      {/* Subtle background accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-8 left-6 h-[420px] w-[420px]"
        aria-hidden
        speedY={0.06}
        maxShift={60}
      >
        <MorphingBlob className="h-full w-full" opacity={0.08} />
      </Parallax>
      <Parallax
        className="pointer-events-none absolute -z-10 top-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl"
        aria-hidden
        speedY={0.1}
        maxShift={70}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-0 left-1/4 h-24 w-24 rounded-full bg-white/4 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={60}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <h2 ref={reveal} className="text-2xl sm:text-3xl font-semibold">{t('about.title')}</h2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div ref={reveal} className="lg:col-span-7">
            <p className="text-white/80 leading-relaxed max-w-2xl">{t('about.body')}</p>

            <div className="mt-6">
              <h3 className="text-sm uppercase tracking-wider text-white/50">{t('about.strengths_title')}</h3>
              <ul className="mt-3 space-y-2">
                {Array.isArray(strengths) && strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden />
                    <span className="text-white/80">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={reveal} className="lg:col-span-5">
            <h3 className="text-sm uppercase tracking-wider text-white/50">{t('about.stack_title')}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.isArray(stack) && stack.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
