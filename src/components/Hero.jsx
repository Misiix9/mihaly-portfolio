import { useTranslation } from 'react-i18next'
import React, { lazy, Suspense } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Button from './ui/Button'
import MagneticButton from './ui/MagneticButton'
import Parallax from './ui/Parallax'
import ParticlesCanvas from './ui/ParticlesCanvas'
import LottiePlayer from './ui/LottiePlayer'
const Scene3D = lazy(() => import('../lib/3d/scene.jsx'))
import Viewport from './util/Viewport'

export default function Hero() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  return (
    <section className="relative py-20 md:py-28">
      {/* Background hook for particles/3D/shaders */}
      <div
        aria-hidden
        id="hero-bg-hook"
        className="pointer-events-none absolute inset-0 -z-10"
        data-parallax
        data-speed-y="0.2"
        data-max-shift="100"
        data-mouse="0.06"
      />
      {/* Particles background (mount when visible) */}
      <Viewport once rootMargin="200px">
        <ParticlesCanvas />
      </Viewport>
      {/* 3D scene background (lazy) */}
      <div className="pointer-events-none absolute -z-10 inset-0 flex items-center justify-center opacity-60">
        <Viewport once rootMargin="200px">
          <Suspense fallback={null}>
            <div className="h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
              <Scene3D />
            </div>
          </Suspense>
        </Viewport>
      </div>
      {/* Lottie decorative accent */}
      <div className="pointer-events-none absolute -z-10 top-6 right-6 w-28 opacity-60">
        <LottiePlayer
          src="https://lottie.host/2f7f22a1-2d2b-4c2f-b1e2-7f3a0f0e25a8/Zq2iP2b2mD.json"
          speed={1}
          loop
          autoplay
        />
      </div>

      {/* Subtle hero accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-6 left-8 h-32 w-32 rounded-full bg-white/5 blur-3xl"
        aria-hidden
        speedY={0.14}
        maxShift={90}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 top-24 right-16 h-24 w-24 rounded-full bg-white/6 blur-2xl"
        aria-hidden
        speedY={0.12}
        maxShift={80}
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative inline-block">
          <h1 ref={reveal} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">{t('hero.name')}</h1>
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-40 bg-white/30"
            speedY={0.8}
            start="top bottom"
            end="bottom top"
            maxShift={80}
            aria-hidden
          />
        </div>
        <h2 ref={reveal} className="mt-2 text-xl sm:text-2xl text-white/80">{t('hero.role')}</h2>
        <p ref={reveal} className="mt-4 text-white/70 max-w-2xl">{t('hero.subtitle')}</p>
        <div ref={reveal} className="mt-10 flex flex-wrap items-center gap-4 gap-y-3">
          <Button variant="primary" size="md">{t('hero.cta_primary')}</Button>
          <Button variant="secondary" size="md" as="a" href="#projects">{t('hero.cta_secondary')}</Button>
          <MagneticButton>{t('lang.en')}/{t('lang.hu')}</MagneticButton>
        </div>

        {/* Social links */}
        <nav className="mt-6 flex items-center gap-6 text-white/70" aria-label="Social Links">
          <a
            href="https://github.com/Misiix9"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/gyr.misi"
            target="_blank"
            rel="noreferrer noopener"
            className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="mailto:mihalygyori05@gmail.com"
            className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
            aria-label="Email"
          >
            Email
          </a>
        </nav>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 text-white/60" aria-hidden>
        <div className="flex flex-col items-center gap-2">
          <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span className="text-xs tracking-wider">scroll</span>
        </div>
      </div>
    </section>
  )
}
