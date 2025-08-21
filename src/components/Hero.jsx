import { useTranslation } from 'react-i18next'
import React, { useRef, useEffect, useState } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Button from './ui/Button'
import TypewriterText from './ui/TypewriterText'
import RoleAnimations from './ui/RoleAnimations'
import useReducedMotion from '../lib/anim/useReducedMotion'

export default function Hero() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  const reduced = useReducedMotion(false)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    if (!reduced) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [reduced])

  // Optimize scroll performance
  useEffect(() => {
    document.documentElement.style.backgroundColor = '#000000'
    document.body.style.backgroundColor = '#000000'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    const style = document.createElement('style')
    style.textContent = `
      html, body {
        background-color: #000000;
        margin: 0;
        padding: 0;
      }
      #root, #app, .app {
        background-color: #000000;
      }
      .hero-glow {
        filter: blur(40px);
        opacity: 0.6;
      }
      .hero-floating-element {
        animation: float 6s ease-in-out infinite;
      }
      .hero-floating-element:nth-child(2) {
        animation-delay: -2s;
      }
      .hero-floating-element:nth-child(3) {
        animation-delay: -4s;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(2deg); }
      }
      .hero-shine {
        background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
        animation: shine 3s infinite;
      }
      @keyframes shine {
        0% { transform: translateX(-100%) skewX(-15deg); }
        100% { transform: translateX(200%) skewX(-15deg); }
      }
      .text-glow {
        text-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3);
      }
      .availability-pulse {
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.05); }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <>
      <section
        className="relative overflow-hidden min-h-screen bg-black"
        style={{
          minHeight: '100vh',
          padding: '0',
          margin: '0',
          backgroundColor: '#000000'
        }}
        data-lcp-critical
        data-section="hero"
      >
        {/* Enhanced animated background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)
            `,
            willChange: 'auto'
          }}
          aria-hidden
        />

        {/* Main content */}
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-center min-h-screen relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced title with better typography */}
            <div className="relative inline-block" ref={titleRef}>
              <h1 
                ref={reveal} 
                className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:scale-[1.02] transition-all duration-500 cursor-default relative z-10 mb-2" 
                data-lang-text="hero.name"
                style={{
                  fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('hero.name')}
              </h1>
              {/* Subtle glow effect behind title */}
              {!reduced && (
                <div className="absolute inset-0 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white hero-glow opacity-10 -z-10">
                  {t('hero.name')}
                </div>
              )}
            </div>
            
            {/* Enhanced subtitle with better responsive typography */}
            <div ref={subtitleRef} className="space-y-4">
              <div className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-medium flex items-baseline justify-center flex-wrap gap-1">
                <span className="hero-subtitle" data-lang-text="hero.im">{t('hero.im')}</span>
                {!reduced ? (
                  <TypewriterText
                    texts={[
                      t('hero.roles.developer'),
                      t('hero.roles.designer'),
                      t('hero.roles.problem_solver'),
                      t('hero.roles.innovator')
                    ]}
                    speed={80}
                    delay={2000}
                    loop={true}
                    className="text-white font-semibold hero-role"
                    data-lang-animation="typewriter"
                  />
                ) : (
                  <span className="text-white font-semibold hero-role" data-lang-text="hero.role">{t('hero.role')}</span>
                )}
              </div>
              
              {/* Value proposition with enhanced styling */}
              <div 
                ref={reveal} 
                className="text-base sm:text-lg text-blue-300 font-medium tracking-wide uppercase hover:text-blue-200 transition-colors duration-300 hero-subtitle relative overflow-hidden" 
                data-lang-text="hero.value_proposition"
              >
                {t('hero.value_proposition')}
                {!reduced && <div className="absolute inset-0 hero-shine" />}
              </div>
              
              {/* Main description with improved typography */}
              <p 
                ref={reveal} 
                className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed hover:text-white transition-colors duration-300 hero-subtitle" 
                data-lang-text="hero.subtitle"
                style={{ lineHeight: '1.7' }}
              >
                {t('hero.subtitle')}
              </p>

              {/* Response time guarantee */}
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span data-lang-text="hero.response_time">{t('hero.response_time')}</span>
              </div>
            </div>
            
            {/* Enhanced CTA buttons with better spacing */}
            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary" 
                size="md" 
                as="a" 
                href="#contact" 
                className="hero-cta rounded-xl px-8 py-3 font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden group w-full sm:w-auto"
                data-magnetic="0.3"
                data-cursor-text="Start Project"
                data-cursor-scale="1.5"
              >
                <span className="button-text relative z-10" data-lang-text="hero.cta_primary">{t('hero.cta_primary')}</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              
              <Button 
                variant="secondary" 
                size="md" 
                as="a" 
                href="#projects" 
                className="hero-cta rounded-xl px-8 py-3 font-medium hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                data-magnetic="0.25"
                data-cursor-text="View Work"
                data-cursor-scale="1.3"
              >
                <span className="button-text" data-lang-text="hero.cta_secondary">{t('hero.cta_secondary')}</span>
              </Button>
            </div>

            {/* Enhanced social links */}
            <nav className="mt-8 flex items-center justify-center gap-6 text-gray-500" aria-label="Social Links">
              <a
                href="https://github.com/Misiix9"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors duration-300"
                aria-label={t('common.social.github')}
                data-magnetic="0.15"
                data-cursor-text={t('common.social.github')}
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="hidden sm:inline">{t('common.social.github')}</span>
              </a>
              <a
                href="https://instagram.com/gyr.misi"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors duration-300"
                data-magnetic="0.15"
                data-cursor-text={t('common.social.instagram')}
                aria-label={t('common.social.instagram')}
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="hidden sm:inline">{t('common.social.instagram')}</span>
              </a>
              <a
                href="mailto:mihalygyori05@gmail.com"
                className="group flex items-center gap-1.5 text-sm hover:text-gray-300 transition-colors duration-300"
                aria-label={t('common.social.email')}
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{t('common.social.email')}</span>
              </a>
            </nav>

            {/* Availability status - relocated to bottom */}
            <div className="mt-6 flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/5 border border-green-500/10 rounded-full text-green-400 text-xs font-medium backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span data-lang-text="hero.availability">{t('hero.availability')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Keep the RoleAnimations on the right side */}
        {!reduced && (
          <div className="hidden lg:block">
            <RoleAnimations />
          </div>
        )}

        {/* Enhanced scroll indicator */}
        <div className="pointer-events-none absolute left-1/2 bottom-8 -translate-x-1/2 text-white/60 flex flex-col items-center gap-3" aria-hidden>
          <div className="text-sm tracking-widest uppercase font-medium" data-lang-text="hero.scroll_discover">
            {t('hero.scroll_discover')}
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="h-6 w-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
            <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </section>
    </>
  )
}
