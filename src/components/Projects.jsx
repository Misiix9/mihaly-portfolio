import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Button from './ui/Button'
import Parallax from './ui/Parallax'
import LottiePlayer from './ui/LottiePlayer'

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const reveal = useScrollReveal()
  return (
    <section className="relative py-20 md:py-28" id="projects">
      {/* Background accents (RAF mode) */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-6 left-10 h-28 w-28 rounded-full bg-white/4 blur-2xl"
        aria-hidden
        speedY={0.09}
        maxShift={60}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-6 right-10 h-32 w-32 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.12}
        maxShift={80}
      />
      {/* Lottie decorative accent */}
      <div className="pointer-events-none absolute -z-10 top-8 right-8 w-24 opacity-60">
        <LottiePlayer
          src="https://lottie.host/2f7f22a1-2d2b-4c2f-b1e2-7f3a0f0e25a8/Zq2iP2b2mD.json"
          speed={1}
          loop
          autoplay
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative">
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-bold text-white hover:scale-105 transition-all duration-300 cursor-default">{t('projects.title')}</h2>
          <div className="absolute -bottom-2 left-0 h-0.5 w-28 bg-gradient-to-r from-white/50 via-white/30 to-transparent rounded-full" />
          <div className="absolute -bottom-3 left-24 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
          {/* Decorative underline with GSAP parallax for precise scrubbing */}
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-32 bg-gradient-to-r from-white/40 to-transparent"
            speedY={0.6}
            start="top bottom"
            end="bottom top"
            maxShift={60}
            aria-hidden
          />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.isArray(items) && items.map((p, idx) => (
            <article
              key={idx}
              ref={reveal}
              className="group relative rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/2 border border-white/20 hover:border-white/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:scale-105 hover:-translate-y-3 shadow-xl hover:shadow-2xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative p-8 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-white/95 transition-colors duration-300">{p.name}</h3>
                  <p className="mt-4 text-white/70 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">{p.desc}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {Array.isArray(p.tech) && p.tech.map((tech, i) => (
                      <span key={i} className="inline-block rounded-full border border-white/20 bg-white/10 hover:bg-white/20 hover:border-white/30 px-3 py-1.5 text-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-default backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  {p.url && (
                    <Button as="a" href={p.url} target="_blank" rel="noreferrer noopener" variant="secondary" size="md" className="bg-transparent hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-xl px-6 py-3 font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                      {t('projects.view')}
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
