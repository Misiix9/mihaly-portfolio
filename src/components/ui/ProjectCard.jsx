import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import Button from './Button'

export default function ProjectCard({ project, onOpenModal }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const wrapperRef = useRef(null)
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const buttonsRef = useRef(null)
  const overlayButtonsRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Enhanced 3D card effect
  useEffect(() => {
    if (reduced || !wrapperRef.current || !cardRef.current) return

    const wrapperElement = wrapperRef.current
    const cardElement = cardRef.current

    // Ensure buttons are always visible and stable
    if (buttonsRef.current) {
      gsap.set(buttonsRef.current, {
        opacity: 1,
        visibility: 'visible',
        force3D: true,
        clearProps: true
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      gsap.to(cardElement, {
        y: -12,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseMove = (e) => {
      if (!isHovered) return
      
      const rect = cardElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      // 3D rotation effect
      gsap.to(cardElement, {
        rotationY: deltaX * 15,
        rotationX: -deltaY * 15,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Parallax content layers
      gsap.to(imageRef.current, {
        x: deltaX * 8,
        y: deltaY * 8,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(contentRef.current, {
        x: deltaX * 4,
        y: deltaY * 4,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Floating effect for overlay buttons
      if (overlayButtonsRef.current) {
        gsap.to(overlayButtonsRef.current, {
          x: deltaX * 6,
          y: deltaY * 6,
          z: 30,
          rotationY: deltaX * 8,
          rotationX: -deltaY * 5,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      // Enhanced floating 3D effect for bottom buttons - scroll-independent and always visible
      if (buttonsRef.current) {
        gsap.to(buttonsRef.current, {
          x: deltaX * 8,
          y: deltaY * 8,
          z: 10,
          rotationY: deltaX * 15, // Match card rotation exactly
          rotationX: -deltaY * 15, // Match card rotation exactly
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
          force3D: true,
          opacity: 1,
          visibility: 'visible'
        })
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      
      // Reset card and content elements
      gsap.to([cardElement, imageRef.current, contentRef.current], {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      
      // Reset overlay buttons separately to prevent flickering
      if (overlayButtonsRef.current) {
        gsap.to(overlayButtonsRef.current, {
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          z: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
      
      // Reset bottom floating buttons separately with stable animation - always keep visible
      if (buttonsRef.current) {
        gsap.to(buttonsRef.current, {
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          z: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
          force3D: true,
          opacity: 1,
          visibility: 'visible'
        })
      }
    }

    // Button-specific hover effects
    const handleButtonMouseEnter = () => {
      if (buttonsRef.current) {
        gsap.to(buttonsRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    }

    const handleButtonMouseLeave = () => {
      if (buttonsRef.current) {
        gsap.to(buttonsRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    wrapperElement.addEventListener('mouseenter', handleMouseEnter)
    wrapperElement.addEventListener('mousemove', handleMouseMove)
    wrapperElement.addEventListener('mouseleave', handleMouseLeave)

    // Add button hover effects
    const buttonsElement = buttonsRef.current
    if (buttonsElement) {
      buttonsElement.addEventListener('mouseenter', handleButtonMouseEnter)
      buttonsElement.addEventListener('mouseleave', handleButtonMouseLeave)
      
      // Protect buttons from scroll events that might hide them
      const scrollHandler = () => {
        if (buttonsRef.current) {
          gsap.set(buttonsRef.current, {
            opacity: 1,
            visibility: 'visible',
            force3D: true
          })
        }
      }
      
      window.addEventListener('scroll', scrollHandler, { passive: true })
      document.addEventListener('scroll', scrollHandler, { passive: true })
      
      return () => {
        wrapperElement.removeEventListener('mouseenter', handleMouseEnter)
        wrapperElement.removeEventListener('mousemove', handleMouseMove)
        wrapperElement.removeEventListener('mouseleave', handleMouseLeave)
        
        if (buttonsElement) {
          buttonsElement.removeEventListener('mouseenter', handleButtonMouseEnter)
          buttonsElement.removeEventListener('mouseleave', handleButtonMouseLeave)
        }
        
        window.removeEventListener('scroll', scrollHandler)
        document.removeEventListener('scroll', scrollHandler)
      }
    }

    return () => {
      wrapperElement.removeEventListener('mouseenter', handleMouseEnter)
      wrapperElement.removeEventListener('mousemove', handleMouseMove)
      wrapperElement.removeEventListener('mouseleave', handleMouseLeave)
      
      if (buttonsElement) {
        buttonsElement.removeEventListener('mouseenter', handleButtonMouseEnter)
        buttonsElement.removeEventListener('mouseleave', handleButtonMouseLeave)
      }
    }
  }, [isHovered, reduced])

  return (
    <div 
      ref={wrapperRef}
      className="group relative" 
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <article
        ref={cardRef}
        className="relative rounded-2xl glass-card overflow-hidden cursor-pointer transform-gpu"
        style={{ 
          transformStyle: 'preserve-3d'
        }}
        onClick={() => onOpenModal(project)}
      >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full glass-light border border-white/20 text-xs text-white/80 font-medium">
          Featured
        </div>
      )}

      {/* Project preview image area */}
      <div 
        ref={imageRef}
        className="relative h-48 bg-gradient-to-br from-white/10 to-white/5 overflow-hidden"
      >
        {/* Actual project image or mock project preview */}
        {project.image ? (
          <div className="absolute inset-0">
            <img 
              src={project.image} 
              alt={`${project.name} preview`}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Gradient overlay for better text readability on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          /* Mock project preview */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <p className="text-white/50 text-sm">{project.name}</p>
            </div>
          </div>
        )}

        {/* Hover overlay background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
        
        {/* Overlay buttons - separate from background to allow clicks */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div 
            ref={overlayButtonsRef}
            className="flex space-x-3"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.url, '_blank')
              }}
              className="p-3 rounded-xl glass-light border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-lg relative z-50 pointer-events-auto"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal(project)
              }}
              className="p-3 rounded-xl glass-light border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-lg relative z-50 pointer-events-auto"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Project content */}
      <div ref={contentRef} className="p-6 pb-20 space-y-4">
        {/* Header with status */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-white/95 transition-colors duration-300">
              {project.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-hierarchy-secondary text-sm">{project.type}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-hierarchy-secondary text-sm">{project.year}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400 text-xs font-medium">{project.status}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-hierarchy-secondary group-hover:text-white/80 transition-colors duration-300 leading-relaxed line-clamp-3">
          {project.desc}
        </p>

        {/* Performance metrics preview */}
        {project.metrics && (
          <div className="flex space-x-4 text-sm">
            {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="text-hierarchy-secondary">{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Technology stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.slice(0, 4).map((tech, i) => (
            <span 
              key={i}
              className="inline-block rounded-full glass-light px-3 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="inline-block rounded-full glass-light px-3 py-1 text-xs text-white/50 border border-white/10">
              +{project.tech.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
    </article>

    {/* Floating action buttons positioned outside card boundary - stable and scroll-independent */}
    <div 
      ref={buttonsRef}
      className="absolute bottom-2 left-6 right-6 flex space-x-3 z-30 pointer-events-none"
      style={{ 
        transformStyle: 'preserve-3d',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        visibility: 'visible',
        opacity: 1,
        position: 'absolute'
      }}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onOpenModal(project)
        }}
        variant="primary"
        size="sm"
        className="flex-1 rounded-xl text-sm border-2 border-white/30 backdrop-blur-xl pointer-events-auto text-black font-medium"
        style={{ 
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.6), 0 0 0 1px rgba(255,255,255,0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#000000'
        }}
      >
        {t('projects.viewCase')}
      </Button>
      <Button
        as="a"
        href={project.url}
        target="_blank"
        rel="noreferrer noopener"
        onClick={(e) => e.stopPropagation()}
        variant="secondary"
        size="sm"
        className="rounded-xl text-sm border-2 border-white/20 backdrop-blur-xl pointer-events-auto text-white font-medium"
        style={{ 
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, rgba(100,100,100,0.7) 0%, rgba(80,80,80,0.6) 100%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          color: '#ffffff'
        }}
      >
        {t('projects.viewDemo')}
      </Button>
    </div>
  </div>
  )
}
