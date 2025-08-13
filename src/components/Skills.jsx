import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { createAdvancedGsapParallax, createScrollReveal } from '../lib/anim/parallax-enhanced'
import useReducedMotion from '../lib/anim/useReducedMotion'
import Parallax from './ui/Parallax'
import SkillsFilter from './ui/SkillsFilter'
import SkillsCategory from './ui/SkillsCategory'

export default function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })
  const reveal = useScrollReveal()
  const reduced = useReducedMotion()
  const skillsRef = useRef(null)
  const titleRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter categories based on active filter
  const filteredCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === activeFilter)

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  // Enhanced scroll effects for skills section
  useEffect(() => {
    if (reduced || !skillsRef.current) return

    // Section background parallax
    const sectionParallax = createAdvancedGsapParallax(skillsRef.current, {
      yPercent: -10,
      trigger: skillsRef.current,
      start: 'top bottom',
      end: 'bottom top',
    })

    // Title reveal with bounce
    const titleReveal = createScrollReveal(titleRef.current, {
      y: 60,
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: 'back.out(1.2)',
    })

    return () => {
      sectionParallax?.()
      titleReveal?.()
    }
  }, [reduced])

  return (
    <section ref={skillsRef} className="relative py-20 md:py-28" id="skills">
      {/* Dynamic Background Layer for Skills Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            conic-gradient(from 120deg at 30% 30%, rgba(255,255,255,0.02), transparent 50%, rgba(255,255,255,0.015)),
            radial-gradient(400px 200px at 70% 80%, rgba(255,255,255,0.02), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,0.008) 0%, transparent 50%, rgba(255,255,255,0.012) 100%)
          `,
          animation: 'globalWave 24s ease-in-out infinite 3s'
        }}
        aria-hidden
      />
      
      {/* Floating Dynamic Elements */}
      <div
        className="absolute top-32 left-16 w-28 h-28 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          animation: 'globalFloat 18s ease-in-out infinite 2.5s'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-16 right-24 w-20 h-20 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          animation: 'globalPulse 20s ease-in-out infinite 6s'
        }}
        aria-hidden
      />
      
      {/* Background accents with enhanced animation */}
      <Parallax
        className="pointer-events-none absolute -z-10 top-6 right-8 h-28 w-28 rounded-full bg-white/4 blur-2xl"
        aria-hidden
        speedY={0.08}
        maxShift={50}
        style={{ animation: 'globalPulse 16s ease-in-out infinite 1s' }}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-10 left-12 h-24 w-24 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.06}
        maxShift={60}
        style={{ animation: 'globalFloat 22s ease-in-out infinite 3s' }}
      />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative inline-block" ref={titleRef}>
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-bold text-white hover:scale-105 transition-all duration-300 cursor-default">{t('skills.title')}</h2>
          <p className="mt-3 text-hierarchy-secondary text-lg">{t('skills.subtitle')}</p>
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

        {/* Skills Filter */}
        <div className="mt-12">
          <SkillsFilter
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Skills Categories */}
        <div className="mt-16 space-y-16">
          {Array.isArray(categories) && filteredCategories.map((category) => (
            <SkillsCategory
              key={category.id}
              category={category}
              isVisible={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
