import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { createHoverEffect } from '../../lib/anim/microInteractions'

const EUR_TO_HUF = 400

function Price({ eur }) {
  const huf = Math.round(eur * EUR_TO_HUF)
  return (
    <div className="mt-2 text-sm text-white/70">
      <span className="text-white font-semibold">€{eur.toLocaleString()}</span>
      <span className="mx-2">/</span>
      <span className="text-white font-semibold">{huf.toLocaleString('hu-HU')} Ft</span>
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const hoverCleanups = useRef([])

  const services = [
    { key: 'website', icon: '🌐', from: 400 },
    { key: 'webapp', icon: '⚡', from: 1500 },
    { key: 'ecommerce', icon: '🛒', from: 1200 },
    { key: 'redesign', icon: '🎨', from: 600 },
    { key: 'maintenance', icon: '🔧', from: 200 },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Entrance animations (respect reduced motion)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = section.querySelectorAll('[data-svc-card]')
    const title = section.querySelector('[data-svc-title]')
    const subtitle = section.querySelector('[data-svc-subtitle]')

    let observer
    if (!prefersReduced) {
      gsap.set([title, subtitle], { opacity: 0, y: 12 })
      gsap.set(cards, { opacity: 0, y: 24 })

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to([title, subtitle], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 })
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: 0.1 })
            observer.disconnect()
          }
        })
      }, { threshold: 0.2 })
      observer.observe(section)
    }

    // Magnetic hover on cards
    hoverCleanups.current = Array.from(cards).map((el) =>
      createHoverEffect(el, { magnetic: true, magnetStrength: 0.15, scale: 1.03, y: -3, brightness: 1.08 })
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
        <h2 data-svc-title className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {t('services.title')}
        </h2>
        <p data-svc-subtitle className="mt-3 text-white/70 max-w-2xl">
          {t('services.subtitle')}
        </p>
        {/* subtle glow underline */}
        <div className="mt-4 h-px w-32 bg-gradient-to-r from-white/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ key, icon, from }) => (
          <div key={key} data-svc-card
            className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-white/5 hover:-translate-y-1">
            {/* gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <div className="text-3xl mb-3">
                <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">{icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">
                {t(`contact.projectType.${key}`)}
              </h3>
              <p className="mt-2 text-sm text-white/70">
                {t(`services.items.${key}.desc`)}
              </p>
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-white/60">{t('services.from')}</div>
                <Price eur={from} />
              </div>
            </div>

            {/* hover ring */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-white/50">{t('services.note')}</p>
    </section>
  )
}
