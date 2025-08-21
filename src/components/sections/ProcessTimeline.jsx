import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { createHoverEffect } from '../../lib/anim/microInteractions'

export default function ProcessTimeline() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const hoverCleanups = useRef([])
  const steps = [
    { key: 'discovery', icon: '🔎' },
    { key: 'planning', icon: '🧭' },
    { key: 'design', icon: '🎨' },
    { key: 'development', icon: '💻' },
    { key: 'testing', icon: '🧪' },
    { key: 'launch', icon: '🚀' }
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = section.querySelectorAll('[data-proc-card]')
    const title = section.querySelector('[data-proc-title]')
    const subtitle = section.querySelector('[data-proc-subtitle]')

    let observer
    if (!prefersReduced) {
      gsap.set([title, subtitle], { opacity: 0, y: 12 })
      gsap.set(cards, { opacity: 0, x: -16 })

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to([title, subtitle], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 })
            gsap.to(cards, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, delay: 0.1 })
            observer.disconnect()
          }
        })
      }, { threshold: 0.2 })
      observer.observe(section)
    }

    // Magnetic effect on timeline cards (not the li) for stability
    hoverCleanups.current = Array.from(cards).map((el) =>
      createHoverEffect(el, { magnetic: true, magnetStrength: 0.12, scale: 1.015, y: -2, brightness: 1.05, shadow: false })
    ).filter(Boolean)

    return () => {
      if (observer) observer.disconnect()
      hoverCleanups.current.forEach((fn) => fn && fn())
      hoverCleanups.current = []
    }
  }, [])

  return (
    <section ref={sectionRef} className="container mx-auto px-4 sm:px-6 py-16">
      <div className="relative mb-10">
        <h2 data-proc-title className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {t('process.title')}
        </h2>
        <p data-proc-subtitle className="mt-3 text-white/70 max-w-2xl">{t('process.subtitle')}</p>
        <div className="mt-4 h-px w-32 bg-gradient-to-r from-white/40 to-transparent" />
      </div>

      <ol className="relative border-l border-white/10 ml-4">
        {steps.map(({ key, icon }) => (
          <li key={key} data-proc-item className="mb-10 ml-6 group relative">
            {/* Icon bubble */}
            <span className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg backdrop-blur-sm shadow-sm">
              <span className="transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5">{icon}</span>
            </span>
            {/* Content card with padding-left to avoid overlap */}
            <div data-proc-card className="pl-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 hover:bg-white/[0.07] transition-colors will-change-transform">
              <h3 className="text-lg font-semibold text-white">
                {t(`process.steps.${key}.title`)}
              </h3>
              <p className="mt-1 text-sm text-white/70">
                {t(`process.steps.${key}.desc`)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
