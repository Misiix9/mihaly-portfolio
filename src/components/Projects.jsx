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
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-semibold">{t('projects.title')}</h2>
          {/* Decorative underline with GSAP parallax for precise scrubbing */}
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-32 bg-white/30"
            speedY={0.6}
            start="top bottom"
            end="bottom top"
            maxShift={60}
            aria-hidden
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.isArray(items) && items.map((p, idx) => (
            <article
              key={idx}
              ref={reveal}
              className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hover:bg-white/7.5"
            >
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-white/70">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {Array.isArray(p.tech) && p.tech.map((tech, i) => (
                    <span key={i} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 transition-colors hover:bg-white/12">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                {p.url && (
                  <Button as="a" href={p.url} target="_blank" rel="noreferrer noopener" variant="secondary" size="md">
                    {t('projects.view')}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
