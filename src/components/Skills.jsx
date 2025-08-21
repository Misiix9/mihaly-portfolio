import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { createAdvancedGsapParallax, createScrollReveal } from '../lib/anim/parallax-enhanced'
import useReducedMotion from '../lib/anim/useReducedMotion'
import Parallax from './ui/Parallax'
import SkillsFilter from './ui/SkillsFilter'
import SkillsCategory from './ui/SkillsCategory'
import MorphingBlob from './ui/MorphingBlob'

export default function Skills() {
  const { t } = useTranslation()
  const categories = t('skills.categories', { returnObjects: true })
  const reveal = useScrollReveal()
  const reduced = useReducedMotion()
  const skillsRef = useRef(null)
  const titleRef = useRef(null)
  const statsRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')

  // Filter categories based on active filter
  const filteredCategories = activeFilter === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === activeFilter)

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  // Calculate statistics from skills data
  const skillsStats = useMemo(() => {
    if (!Array.isArray(categories)) return { total: 0, avgLevel: 0, totalYears: 0 }
    
    const allSkills = categories.flatMap(cat => cat.items || [])
    const totalSkills = allSkills.length
    const avgLevel = totalSkills > 0 ? Math.round(allSkills.reduce((sum, skill) => sum + (skill.level || 0), 0) / totalSkills) : 0
    const totalYears = allSkills.reduce((sum, skill) => sum + (skill.yearsExperience || 0), 0)
    
    return { total: totalSkills, avgLevel, totalYears }
  }, [categories])

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
    <section ref={skillsRef} className="relative py-20 md:py-28" id="skills" data-section="skills">
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

        {/* Enhanced Statistics Display */}
        <div ref={statsRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Total Skills Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <MorphingBlob className="w-8 h-8 opacity-30" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{skillsStats.total}</div>
              <div className="text-sm text-white/70">{t('skills.stats.totalSkills', 'Total Skills')}</div>
            </div>
          </div>

          {/* Average Level Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <MorphingBlob className="w-8 h-8 opacity-30" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{skillsStats.avgLevel}/10</div>
              <div className="text-sm text-white/70">{t('skills.stats.avgLevel', 'Average Level')}</div>
            </div>
          </div>

          {/* Total Experience Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <MorphingBlob className="w-8 h-8 opacity-30" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{skillsStats.totalYears}+</div>
              <div className="text-sm text-white/70">{t('skills.stats.totalYears', 'Years Experience')}</div>
            </div>
          </div>
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
