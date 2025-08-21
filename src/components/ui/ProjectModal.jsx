import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import Button from './Button'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectModal({ project, isOpen, onClose }) {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!modalRef.current || reduced) return

    if (isOpen) {
      // Animate modal in
      gsap.set(modalRef.current, { display: 'flex' })
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
      document.body.style.overflow = 'hidden'
    } else {
      // Animate modal out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      })
      gsap.to(contentRef.current, {
        scale: 0.95,
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' })
        }
      })
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, reduced])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 hidden items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Enhanced Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)'
        }}
        onClick={onClose}
      />
      
      {/* Animated backdrop particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full"
          style={{ animation: 'particleFloat 15s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-white/15 rounded-full"
          style={{ animation: 'particleFloat 20s ease-in-out infinite 3s reverse' }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-white/25 rounded-full"
          style={{ animation: 'particlePulse 12s ease-in-out infinite 1s' }}
        />
      </div>
      
      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.9) 100%)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => {
          // Prevent wheel events from bubbling to prevent body scroll
          e.stopPropagation()
        }}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/60 backdrop-blur-sm rounded-t-2xl flex-shrink-0 relative overflow-hidden">
          {/* Header background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/2 to-white/5 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white relative">
              {project.name}
              {/* Subtle text glow */}
              <div className="absolute inset-0 text-2xl font-bold text-white/20 blur-sm -z-10 pointer-events-none">
                {project.name}
              </div>
            </h2>
            <p className="text-hierarchy-secondary hover:text-white/80 transition-colors duration-300">{project.type} • {project.year}</p>
          </div>
          <button
            onClick={onClose}
            className="relative z-10 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 text-white/70 hover:text-white hover:scale-110 group/close"
            data-magnetic="0.15"
            data-cursor-text="Close"
            aria-label={t('projects.modal.close')}
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover/close:opacity-100 transition-opacity duration-300" />
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div 
          className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30" 
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.2) rgba(255,255,255,0.05)'
          }}
          onWheel={(e) => {
            // Allow scrolling within the modal content
            e.stopPropagation()
          }}
        >
          <div className="p-6 space-y-8">
          {/* Enhanced Hero Image */}
          {project.image && (
            <div className="relative rounded-xl overflow-hidden aspect-video bg-white/5 group/hero">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-center h-full text-white/60 group-hover/hero:text-white/80 transition-colors duration-300">
                <div className="text-center transform group-hover/hero:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 group-hover/hero:border-white/30 transition-colors duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm">Project Screenshot Preview</p>
                </div>
              </div>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover/hero:ring-white/20 transition-all duration-300" />
            </div>
          )}

          {/* Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-white mb-4">{t('projects.modal.overview')}</h3>
              <p className="text-hierarchy-secondary leading-relaxed mb-6">{project.desc}</p>
              
              {project.solution && (
                <div className="p-4 rounded-xl glass-light border border-white/10">
                  <h4 className="font-semibold text-white mb-2">Solution Approach</h4>
                  <p className="text-hierarchy-secondary text-sm leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>

            {/* Project Info Sidebar */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl glass-light border border-white/10 hover:border-white/20 transition-colors duration-300 group/details">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover/details:opacity-100 transition-opacity duration-300" />
                <h4 className="font-semibold text-white mb-3 relative z-10">Project Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-hierarchy-secondary">{t('projects.modal.year')}:</span>
                    <span className="text-white">{project.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-hierarchy-secondary">{t('projects.modal.status')}:</span>
                    <span className="text-green-400">{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-hierarchy-secondary">{t('projects.modal.type')}:</span>
                    <span className="text-white">{project.type}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              {project.metrics && (
                <div className="p-4 rounded-xl glass-light border border-white/10 hover:border-white/20 transition-colors duration-300 group/metrics relative overflow-hidden">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover/metrics:opacity-100 transition-opacity duration-300" />
                  <h4 className="font-semibold text-white mb-3 relative z-10">{t('projects.modal.metrics')}</h4>
                  <div className="space-y-3 text-sm">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-hierarchy-secondary capitalize">{key}:</span>
                        <span className="text-white font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Features */}
          {project.features && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('projects.modal.features')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-xl glass-light border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                    <span className="text-hierarchy-secondary text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{t('projects.modal.technology')}</h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full glass-light border border-white/10 text-white/80 text-sm hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          {project.challenges && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">{t('projects.modal.challenges')}</h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="p-4 rounded-xl glass-light border border-white/10">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-orange-400" />
                      </div>
                      <span className="text-hierarchy-secondary text-sm leading-relaxed">{challenge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {project.url && (
              <Button
                as="a"
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
                variant="primary"
                size="md"
                className="rounded-xl"
                data-magnetic="0.25"
                data-cursor-text="Visit"
                data-cursor-scale="1.2"
              >
                {t('projects.viewDemo')}
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="secondary"
              size="md"
              className="rounded-xl"
              data-magnetic="0.15"
            >
              {t('projects.modal.close')}
            </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
