import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import SkillCard from './SkillCard'

gsap.registerPlugin(ScrollTrigger)

export default function SkillsCategory({ category, isVisible }) {
  const reduced = useReducedMotion()
  const categoryRef = useRef(null)
  const headerRef = useRef(null)
  const skillsRef = useRef(null)

  // Animate category entrance
  useEffect(() => {
    if (reduced || !categoryRef.current) return

    if (isVisible) {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: 'power3.out'
        }
      )

      // Staggered skills animation
      const skillCards = skillsRef.current?.children
      if (skillCards) {
        gsap.fromTo(Array.from(skillCards),
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.9,
            rotationX: 15
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.2
          }
        )
      }
    }
  }, [isVisible, reduced])

  // Category icon mapping
  const getIcon = (iconName) => {
    const icons = {
      code: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tools: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      star: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }
    return icons[iconName] || icons.code
  }

  if (!isVisible) return null

  return (
    <div ref={categoryRef} className="space-y-8">
      {/* Category Header */}
      <div ref={headerRef} className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-xl glass-light border border-white/20 text-white/80">
            {getIcon(category.icon)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{category.title}</h3>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <span className="text-hierarchy-secondary text-sm">{category.items.length} skills</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-hierarchy-secondary text-sm">
                Avg: {Math.round(category.items.reduce((sum, skill) => sum + skill.level, 0) / category.items.length)}%
              </span>
            </div>
          </div>
        </div>
        <p className="text-hierarchy-secondary text-sm max-w-2xl mx-auto leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Skills Grid */}
      <div 
        ref={skillsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {category.items.map((skill) => (
          <SkillCard
            key={skill.name}
            skill={skill}
          />
        ))}
      </div>
    </div>
  )
}
