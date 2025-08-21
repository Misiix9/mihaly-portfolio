import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { createHoverEffect, createPressEffect } from '../../lib/anim/microInteractions'

export default function CTABanner() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const cleanup = useRef({ hover: null, press: null })

  const handleClick = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const card = section.querySelector('[data-cta-card]')
    const subtitle = section.querySelector('[data-cta-subtitle]')
    const button = section.querySelector('[data-cta-button]')

    let observer
    if (!prefersReduced) {
      gsap.set([card, subtitle, button], { opacity: 0, y: 16 })
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            gsap.to([subtitle, button], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08, delay: 0.05 })
            observer.disconnect()
          }
        })
      }, { threshold: 0.15 })
      observer.observe(section)
    }

    cleanup.current.hover = createHoverEffect(card, { magnetic: true, magnetStrength: 0.1, scale: 1.01, y: -2, brightness: 1.03 })
    cleanup.current.press = createPressEffect(button)

    return () => {
      if (observer) observer.disconnect()
      if (cleanup.current.hover) cleanup.current.hover()
      if (cleanup.current.press) cleanup.current.press()
      cleanup.current = { hover: null, press: null }
    }
  }, [])

  return (
    <section ref={sectionRef} className="container mx-auto px-4 sm:px-6 py-14">
      <div data-cta-card className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-8 will-change-transform">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p data-cta-subtitle className="text-xl sm:text-2xl font-semibold text-white/90">{t('cta.subtitle')}</p>
          </div>
          <div>
            <button data-cta-button onClick={handleClick}
              className="inline-flex items-center justify-center rounded-xl bg-white text-black px-5 py-3 font-semibold shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-[0.99] transition-transform">
              {t('cta.button')}
            </button>
            <p className="mt-2 text-xs text-white/60 text-center md:text-right">{t('cta.note')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
