import React, { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import { useInteractiveEffect } from '../../lib/anim/useMicroInteractions'
import Button from './Button'

export default function ProjectCard({ project, onOpenModal }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Advanced hover effect with 3D tilt and content reveal
  useInteractiveEffect(cardRef, {
    type: 'hover',
    config: {
      scale: 1.02,
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

  // Mouse move 3D parallax effect
  useEffect(() => {
    if (reduced || !cardRef.current) return

    const cardElement = cardRef.current

    const handleMouseMove = (e) => {
      if (!isHovered) return
      
      const rect = cardElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      gsap.to(cardElement, {
        rotationY: deltaX * 8,
        rotationX: -deltaY * 8,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Parallax content layers
      gsap.to(imageRef.current, {
        x: deltaX * 10,
        y: deltaY * 10,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(contentRef.current, {
        x: deltaX * 5,
        y: deltaY * 5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const resetTransform = () => {
      gsap.to([cardElement, imageRef.current, contentRef.current], {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    cardElement.addEventListener('mouseleave', resetTransform)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cardElement.removeEventListener('mouseleave', resetTransform)
    }
  }, [isHovered, reduced])

  return (
    <article
      ref={cardRef}
      className="group relative rounded-2xl glass-card overflow-hidden cursor-pointer transform-gpu"
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px' 
      }}
      onClick={() => onOpenModal(project)}
      data-magnetic="0.15"
      data-cursor-text="View Details"
      data-cursor-scale="1.2"
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
        {/* Mock project preview */}
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

        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.url, '_blank')
              }}
              className="p-3 rounded-xl glass-light border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              data-magnetic="0.2"
              data-cursor-text="Visit"
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
              className="p-3 rounded-xl glass-light border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
              data-magnetic="0.2"
              data-cursor-text="Details"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Project content */}
      <div ref={contentRef} className="p-6 space-y-4">
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

        {/* Action buttons */}
        <div className="flex space-x-3 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onOpenModal(project)
            }}
            variant="primary"
            size="sm"
            className="flex-1 rounded-xl text-sm"
            data-magnetic="0.2"
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
            className="rounded-xl text-sm"
            data-magnetic="0.15"
            data-cursor-text="Visit"
          >
            {t('projects.viewDemo')}
          </Button>
        </div>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-500 pointer-events-none" />
    </article>
  )
}
