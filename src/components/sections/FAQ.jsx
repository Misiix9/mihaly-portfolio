import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { createHoverEffect, createPressEffect } from '../../lib/anim/microInteractions'

export default function FAQ() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const hoverCleanups = useRef([])
  const pressCleanups = useRef([])
  const panelsRef = useRef([])
  const iconsRef = useRef([])
  const cardsRef = useRef([])
  const items = [
    'project_types',
    'pricing',
    'timeline',
    'features',
    'cms',
    'maintenance',
    'redesign',
    'animations_performance',
    'multilingual',
    'seo_analytics',
    'communication_process',
    'payments'
  ]
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const title = section.querySelector('[data-faq-title]')
    const subtitle = section.querySelector('[data-faq-subtitle]')
    const cards = section.querySelectorAll('[data-faq-item]')
    const buttons = section.querySelectorAll('[data-faq-toggle]')

    let observer
    if (!prefersReduced) {
      gsap.set([title, subtitle], { opacity: 0, y: 12 })
      gsap.set(cards, { opacity: 0, y: 16 })
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to([title, subtitle], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 })
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.05, delay: 0.1 })
            observer.disconnect()
          }
        })
      }, { threshold: 0.18 })
      observer.observe(section)
    }

    hoverCleanups.current = Array.from(cards).map((el) =>
      createHoverEffect(el, { magnetic: true, magnetStrength: 0.14, scale: 1.01, y: -1, brightness: 1.04 })
    ).filter(Boolean)
    pressCleanups.current = Array.from(buttons).map((btn) => createPressEffect(btn)).filter(Boolean)

    return () => {
      if (observer) observer.disconnect()
      hoverCleanups.current.forEach((fn) => fn && fn())
      pressCleanups.current.forEach((fn) => fn && fn())
      hoverCleanups.current = []
      pressCleanups.current = []
    }
  }, [])

  // Animate open/close transitions
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    panelsRef.current.forEach((panel, idx) => {
      if (!panel) return
      const icon = iconsRef.current[idx]
      const card = cardsRef.current[idx]
      const isOpen = open === idx

      gsap.killTweensOf([panel, icon, card])

      if (reduced) {
        panel.style.height = isOpen ? 'auto' : '0px'
        panel.style.opacity = isOpen ? '1' : '0'
        if (icon) icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        if (card) card.style.boxShadow = isOpen ? '0 8px 24px rgba(0,0,0,0.25)' : 'none'
        return
      }

      if (isOpen) {
        // Measure content height
        const h = panel.scrollHeight
        gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: 'power2.out', onComplete: () => {
          panel.style.height = 'auto'
        } })
        if (icon) gsap.to(icon, { rotate: 180, duration: 0.25, ease: 'power2.out' })
        if (card) gsap.to(card, { boxShadow: '0 8px 24px rgba(0,0,0,0.25)', duration: 0.3, ease: 'power2.out' })
      } else {
        // Only animate panels that are currently open
        if (panel.style.height && panel.style.height !== '0px') {
          const h = panel.scrollHeight || panel.offsetHeight
          gsap.fromTo(panel, { height: h, opacity: 1 }, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
        } else {
          gsap.set(panel, { height: 0, opacity: 0 })
        }
        if (icon) gsap.to(icon, { rotate: 0, duration: 0.25, ease: 'power2.in' })
        if (card) gsap.to(card, { boxShadow: 'none', duration: 0.25, ease: 'power2.in' })
      }
    })
  }, [open])

  return (
    <section ref={sectionRef} className="container mx-auto px-4 sm:px-6 py-16">
      <div className="relative mb-10">
        <h2 data-faq-title className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{t('faq.title')}</h2>
        <p data-faq-subtitle className="mt-3 text-white/70 max-w-2xl">{t('faq.subtitle')}</p>
        <div className="mt-4 h-px w-32 bg-gradient-to-r from-white/40 to-transparent" />
      </div>

      <div className="space-y-3">
        {items.map((key, idx) => {
          const isOpen = open === idx
          return (
            <div
              key={key}
              data-faq-item
              ref={(el) => (cardsRef.current[idx] = el)}
              className={`rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-colors ${isOpen ? 'bg-white/7' : ''}`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                data-faq-toggle
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl transition-colors"
              >
                <span className="text-white font-medium">{t(`faq.items.${key}.q`)}</span>
                <span
                  ref={(el) => (iconsRef.current[idx] = el)}
                  className="text-white/70 ml-4 inline-block transition-transform"
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>
              <div
                id={`faq-panel-${idx}`}
                ref={(el) => (panelsRef.current[idx] = el)}
                className="px-4 pb-4 pt-0 text-sm text-white/70"
                style={{ height: 0, opacity: 0, overflow: 'hidden' }}
              >
                {t(`faq.items.${key}.a`)}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
