import React, { useState, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import useReducedMotion from '../../lib/anim/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function SectionProgressIndicator() {
  const [currentSection, setCurrentSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState([])
  const reduced = useReducedMotion()

  const sections = useMemo(() => [
    { id: 'hero', name: 'Hero', color: 'from-white/60 to-white/80' },
    { id: 'about', name: 'About', color: 'from-white/50 to-white/70' },
    { id: 'skills', name: 'Skills', color: 'from-white/60 to-white/80' },
    { id: 'projects', name: 'Projects', color: 'from-white/50 to-white/70' },
    { id: 'contact', name: 'Contact', color: 'from-white/60 to-white/80' }
  ], [])

  useEffect(() => {
    if (reduced) return

    const progressTriggers = []

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id)
      if (!element) return

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress
          setSectionProgress(prev => {
            const newProgress = [...prev]
            newProgress[index] = progress
            return newProgress
          })
        },
        onEnter: () => setCurrentSection(index),
        onEnterBack: () => setCurrentSection(index)
      })

      progressTriggers.push(trigger)
    })

    return () => {
      progressTriggers.forEach(trigger => trigger.kill())
    }
  }, [sections, reduced])

  if (reduced) return null

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-3">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="group relative cursor-pointer"
            onClick={() => {
              const element = document.getElementById(section.id)
              if (element) {
                gsap.to(window, {
                  duration: 1,
                  scrollTo: {
                    y: element,
                    offsetY: 80
                  },
                  ease: 'power2.inOut'
                })
              }
            }}
          >
            {/* Progress Circle */}
            <div className="relative w-3 h-3">
              {/* Background circle */}
              <div className="absolute inset-0 rounded-full bg-white/20 border border-white/30" />
              
              {/* Progress fill */}
              <div 
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${section.color} transition-all duration-500 ${
                  currentSection === index ? 'scale-100' : 'scale-75'
                }`}
                style={{
                  clipPath: `polygon(0 0, ${(sectionProgress[index] || 0) * 100}% 0, ${(sectionProgress[index] || 0) * 100}% 100%, 0 100%)`
                }}
              />
              
              {/* Active indicator */}
              {currentSection === index && (
                <div className="absolute inset-0 rounded-full bg-white/40 animate-pulse" />
              )}
            </div>

            {/* Section name tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:translate-x-1">
              <div className="bg-black/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg border border-white/20 shadow-lg whitespace-nowrap">
                {section.name}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-black/90" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall progress line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 transform -translate-x-1/2 -z-10">
        <div 
          className="w-full bg-gradient-to-b from-white/40 to-white/60 transition-all duration-500"
          style={{
            height: `${((currentSection + 1) / sections.length) * 100}%`
          }}
        />
      </div>
    </div>
  )
}
