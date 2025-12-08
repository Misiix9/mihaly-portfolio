import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { createAdvancedGsapParallax, createScrollReveal } from '../lib/anim/parallax-enhanced'
import useReducedMotion from '../lib/anim/useReducedMotion'
import Parallax from './ui/Parallax'
import LottiePlayer from './ui/LottiePlayer'
import ProjectModal from './ui/ProjectModal'
import HorizontalProjectScroll from './ui/HorizontalProjectScroll'

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const reveal = useScrollReveal()
  const reduced = useReducedMotion()
  const projectsRef = useRef(null)
  const titleRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  // Enhanced scroll effects for projects section
  useEffect(() => {
    if (reduced || !projectsRef.current) return

    // Section background parallax
    const sectionParallax = createAdvancedGsapParallax(projectsRef.current, {
      yPercent: -8,
      trigger: projectsRef.current,
      start: 'top bottom',
      end: 'bottom top',
    })

    // Title reveal with scale
    const titleReveal = createScrollReveal(titleRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power3.out',
    })

    return () => {
      sectionParallax?.()
      titleReveal?.()
    }
  }, [reduced])

  return (
    <section ref={projectsRef} className="relative py-20 md:py-28 overflow-hidden" id="projects" data-section="projects">
      {/* Enhanced Dynamic Background Layer for Projects Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(800px 400px at 50% 70%, rgba(255,255,255,0.035), transparent 65%),
            conic-gradient(from 180deg at 80% 20%, rgba(255,255,255,0.025), transparent 40%, rgba(255,255,255,0.03)),
            linear-gradient(60deg, rgba(255,255,255,0.02) 0%, transparent 45%, rgba(255,255,255,0.025) 100%),
            radial-gradient(400px 200px at 20% 30%, rgba(255,255,255,0.015), transparent 50%)
          `,
          animation: 'globalFlow 30s ease-in-out infinite 4s'
        }}
        aria-hidden
      />

      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 -z-19 pointer-events-none opacity-40"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.06) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)
          `,
          animation: 'meshFlow 40s ease-in-out infinite reverse'
        }}
        aria-hidden
      />

      {/* Enhanced Floating Dynamic Elements */}
      <div
        className="absolute top-24 right-32 w-36 h-36 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)',
          animation: 'globalFloat 26s ease-in-out infinite 1.5s',
          filter: 'blur(1px)'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-24 left-16 w-24 h-24 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)',
          animation: 'globalPulse 18s ease-in-out infinite 3s',
          filter: 'blur(0.5px)'
        }}
        aria-hidden
      />

      {/* Additional floating particles */}
      <div
        className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full -z-18 pointer-events-none bg-white/20"
        style={{
          animation: 'particleFloat 20s ease-in-out infinite 2s',
          filter: 'blur(0.5px)'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 rounded-full -z-18 pointer-events-none bg-white/15"
        style={{
          animation: 'particleFloat 25s ease-in-out infinite 5s reverse',
          filter: 'blur(0.5px)'
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full -z-18 pointer-events-none bg-white/25"
        style={{
          animation: 'particlePulse 15s ease-in-out infinite 1s',
          filter: 'blur(0.25px)'
        }}
        aria-hidden
      />

      {/* Background accents (RAF mode) with enhanced animation */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-6 left-10 h-28 w-28 rounded-full bg-white/4 blur-2xl"
        aria-hidden
        speedY={0.09}
        maxShift={60}
        style={{ animation: 'globalPulse 14s ease-in-out infinite 2s' }}
      />
      <Parallax
        className="pointer-events-none absolute -z-10 bottom-6 right-10 h-32 w-32 rounded-full bg-white/6 blur-3xl"
        aria-hidden
        speedY={0.12}
        maxShift={80}
        style={{ animation: 'globalFloat 20s ease-in-out infinite 4s' }}
      />
      {/* Lottie decorative accent */}
      <div className="pointer-events-none absolute -z-10 top-8 right-8 w-24 opacity-60">
        <LottiePlayer
          src="https://lottie.host/2f7f22a1-2d2b-4c2f-b1e2-7f3a0f0e25a8/Zq2iP2b2mD.json"
          speed={1}
          loop
          autoplay
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="relative mb-8" ref={titleRef}>
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-bold text-white hover:scale-105 transition-all duration-300 cursor-default relative">
            {t('projects.title')}
            {/* Enhanced text glow effect */}
            <div className="absolute inset-0 text-2xl sm:text-3xl font-bold text-white/20 blur-sm -z-10 pointer-events-none">
              {t('projects.title')}
            </div>
          </h2>
          <p className="mt-3 text-hierarchy-secondary text-lg hover:text-white/90 transition-colors duration-500">{t('projects.subtitle')}</p>

          {/* Enhanced decorative elements */}
          <div className="absolute -bottom-2 left-0 h-0.5 w-28 bg-gradient-to-r from-white/60 via-white/40 to-transparent rounded-full" />
          <div className="absolute -bottom-2 left-0 h-px w-32 bg-gradient-to-r from-white/30 via-white/20 to-transparent rounded-full animate-pulse" />
          <div className="absolute -bottom-3 left-24 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
          <div className="absolute -bottom-3 left-28 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'particlePulse 3s ease-in-out infinite 1s' }} />
          {/* Decorative underline with GSAP parallax for precise scrubbing */}
          <Parallax
            mode="gsap"
            className="absolute -bottom-2 left-0 h-px w-32 bg-gradient-to-r from-white/40 to-transparent"
            speedY={0.6}
            start="top bottom"
            end="bottom top"
            maxShift={60}
            aria-hidden
          />
        </div>
      </div>

      {/* Horizontal Scroll Implementation */}
      <div className="relative z-10 w-full mt-8">
        {Array.isArray(items) && (
          <HorizontalProjectScroll items={items} onOpenModal={handleOpenModal} />
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}
