import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import { useInteractiveEffect } from '../../lib/anim/useMicroInteractions'

gsap.registerPlugin(ScrollTrigger)

export default function SkillCard({ skill }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const cardRef = useRef(null)
  const progressRef = useRef(null)
  const progressFillRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [progressAnimated, setProgressAnimated] = useState(false)

  // Enhanced hover effect with 3D tilt
  useInteractiveEffect(cardRef, {
    type: 'hover',
    config: {
      scale: 1.05,
      y: -8,
      rotationX: 2,
      rotationY: 1,
      duration: 0.4,
      ease: 'power2.out',
    },
    trigger: {
      onEnter: () => setIsHovered(true),
      onLeave: () => setIsHovered(false),
    }
  })

  // Animate progress bar on scroll
  useEffect(() => {
    if (reduced || !progressFillRef.current || progressAnimated) return

    const progressAnimation = gsap.fromTo(progressFillRef.current,
      { 
        scaleX: 0,
        opacity: 0.8
      },
      {
        scaleX: skill.level / 100,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          once: true,
          onComplete: () => setProgressAnimated(true)
        }
      }
    )

    // Animate progress text counter
    const progressText = cardRef.current?.querySelector('.progress-text')
    if (progressText) {
      gsap.fromTo(progressText,
        { innerText: 0 },
        {
          innerText: skill.level,
          duration: 1.5,
          ease: 'power3.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            once: true
          }
        }
      )
    }

    return () => {
      progressAnimation?.kill?.()
    }
  }, [skill.level, reduced, progressAnimated])

  // Get proficiency color based on level
  const getProficiencyColor = (proficiency) => {
    switch (proficiency) {
      case 'expert': return 'text-white'
      case 'advanced': return 'text-white/90'
      case 'intermediate': return 'text-white/80'
      case 'learning': return 'text-white/70'
      default: return 'text-white/70'
    }
  }

  const getProficiencyBg = (proficiency) => {
    switch (proficiency) {
      case 'expert': return 'bg-white/20'
      case 'advanced': return 'bg-white/15'
      case 'intermediate': return 'bg-white/12'
      case 'learning': return 'bg-white/8'
      default: return 'bg-white/8'
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-xl glass-card overflow-hidden cursor-pointer transform-gpu"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px' 
      }}
      data-magnetic="0.15"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 space-y-4">
        {/* Header with skill name and proficiency */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-white/95 transition-colors duration-300">
              {skill.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getProficiencyBg(skill.proficiency)} ${getProficiencyColor(skill.proficiency)} border border-white/10`}>
                {t(`skills.proficiency.${skill.proficiency}`)}
              </span>
              <span className="text-hierarchy-secondary text-xs">
                {skill.yearsExperience} {skill.yearsExperience === 1 ? 'year' : 'years'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white progress-text">0</div>
            <div className="text-xs text-hierarchy-secondary">%</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div 
            ref={progressRef}
            className="relative h-2 bg-white/10 rounded-full overflow-hidden"
          >
            <div 
              ref={progressFillRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/80 to-white/60 rounded-full origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
            {/* Animated shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </div>

        {/* Description */}
        <p className="text-hierarchy-secondary text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
          {skill.description}
        </p>

        {/* Experience details - shown on hover */}
        <div className={`space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          {skill.projects && skill.projects.length > 0 && (
            <div>
              <div className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1">
                Recent Projects
              </div>
              <div className="flex flex-wrap gap-1">
                {skill.projects.slice(0, 2).map((project, idx) => (
                  <span 
                    key={idx}
                    className="text-xs px-2 py-1 rounded glass-light border border-white/10 text-white/70"
                  >
                    {project}
                  </span>
                ))}
                {skill.projects.length > 2 && (
                  <span className="text-xs px-2 py-1 rounded glass-light border border-white/10 text-white/50">
                    +{skill.projects.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
    </div>
  )
}
