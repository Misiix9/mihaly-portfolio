import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef, useState } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { createAdvancedGsapParallax, createScrollReveal } from '../lib/anim/parallax-enhanced'
import useReducedMotion from '../lib/anim/useReducedMotion'
import Parallax from './ui/Parallax'
import LottiePlayer from './ui/LottiePlayer'
import ProjectCard from './ui/ProjectCard'
import ProjectModal from './ui/ProjectModal'

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const reveal = useScrollReveal()
  const reduced = useReducedMotion()
  const projectsRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
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

    // Staggered project cards reveal
    const cards = cardsRef.current?.children
    if (cards) {
      Array.from(cards).forEach((card, index) => {
        createScrollReveal(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotation: index % 2 === 0 ? -1 : 1,
          delay: index * 0.15,
          duration: 1.2,
          ease: 'power3.out',
        })
      })
    }

    return () => {
      sectionParallax?.()
      titleReveal?.()
    }
  }, [reduced])

  return (
    <section ref={projectsRef} className="relative py-20 md:py-28" id="projects" data-section="projects">
      {/* Dynamic Background Layer for Projects Section */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px 300px at 50% 70%, rgba(255,255,255,0.025), transparent 65%),
            conic-gradient(from 180deg at 80% 20%, rgba(255,255,255,0.015), transparent 40%, rgba(255,255,255,0.02)),
            linear-gradient(60deg, rgba(255,255,255,0.01) 0%, transparent 45%, rgba(255,255,255,0.015) 100%)
          `,
          animation: 'globalFlow 30s ease-in-out infinite 4s'
        }}
        aria-hidden
      />
      
      {/* Floating Dynamic Elements */}
      <div
        className="absolute top-24 right-32 w-36 h-36 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          animation: 'globalFloat 26s ease-in-out infinite 1.5s'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-24 left-16 w-24 h-24 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          animation: 'globalPulse 18s ease-in-out infinite 3s'
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative" ref={titleRef}>
          <h2 ref={reveal} className="text-2xl sm:text-3xl font-bold text-white hover:scale-105 transition-all duration-300 cursor-default">{t('projects.title')}</h2>
          <p className="mt-3 text-hierarchy-secondary text-lg">{t('projects.subtitle')}</p>
          <div className="absolute -bottom-2 left-0 h-0.5 w-28 bg-gradient-to-r from-white/50 via-white/30 to-transparent rounded-full" />
          <div className="absolute -bottom-3 left-24 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
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

        <div ref={cardsRef} className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.isArray(items) && items.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>
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
