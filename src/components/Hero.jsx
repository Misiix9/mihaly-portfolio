import { useTranslation } from 'react-i18next'
import React, { useRef, useEffect } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Button from './ui/Button'
import MagneticButton from './ui/MagneticButton'
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

  // Optimize scroll performance by removing unnecessary global styles
  useEffect(() => {
    // Set basic background without interfering with scroll
    document.documentElement.style.backgroundColor = '#000000'
    document.body.style.backgroundColor = '#000000'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    
    // Add minimal global styles for performance
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
      >
        {/* Simplified single background layer for better performance */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
            willChange: 'auto'
          }}
          aria-hidden
        />

        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-start min-h-screen relative z-10">
          <div className="max-w-4xl">
            <div className="relative inline-block" ref={titleRef}>
              <h1 ref={reveal} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:scale-105 transition-all duration-500 cursor-default">
                {t('hero.name')}
              </h1>
            </div>
            
            <div ref={subtitleRef}>
              <div className="mt-6 text-xl sm:text-2xl text-gray-100 font-medium flex items-center">
                <span className="mr-2">{t('hero.im')}</span>
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
                    className="text-white font-semibold"
                  />
                ) : (
                  <span className="text-white font-semibold">{t('hero.role')}</span>
                )}
              </div>
              <div ref={reveal} className="mt-4 text-sm sm:text-base text-gray-300 font-medium tracking-wide uppercase hover:text-gray-100 transition-colors duration-300">
                {t('hero.value_proposition')}
              </div>
              <p ref={reveal} className="mt-6 text-gray-200 max-w-2xl text-lg leading-relaxed hover:text-white transition-colors duration-300">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-6 gap-y-4">
              <Button 
                variant="primary" 
                size="md" 
                className="rounded-xl px-8 py-4 hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl"
                data-magnetic="0.3"
                data-cursor-text="Click me"
                data-cursor-scale="1.5"
              >
                {t('hero.cta_primary')}
              </Button>
              <Button 
                variant="secondary" 
                size="md" 
                as="a" 
                href="#projects" 
                className="rounded-xl px-8 py-4 hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                data-magnetic="0.25"
                data-cursor-text="View Work"
                data-cursor-scale="1.3"
              >
                {t('hero.cta_secondary')}
              </Button>
              <MagneticButton 
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium underline-offset-4 hover:underline"
                data-magnetic="0.2"
                data-cursor-text="Switch"
              >
                {t('lang.en')}/{t('lang.hu')}
              </MagneticButton>
            </div>

            {/* Social links with better contrast */}
            <nav className="mt-6 flex items-center gap-6 text-gray-400" aria-label="Social Links">
              <a
                href="https://github.com/Misiix9"
                target="_blank"
                rel="noreferrer noopener"
                className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded hover:text-gray-100 transition-colors duration-300"
                aria-label="GitHub"
                data-magnetic="0.15"
                data-cursor-text="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com/gyr.misi"
                target="_blank"
                rel="noreferrer noopener"
                className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded hover:text-gray-100 transition-colors duration-300"
                data-magnetic="0.15"
                data-cursor-text="Instagram"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="mailto:mihalygyori05@gmail.com"
                className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded hover:text-gray-100 transition-colors duration-300"
                aria-label="Email"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Keep the RoleAnimations on the right side */}
        {!reduced && (
          <div className="hidden lg:block">
            <RoleAnimations />
          </div>
        )}

        {/* Simple scroll indicator */}
        <div className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 text-white/60" aria-hidden>
          <div className="flex flex-col items-center gap-2">
            <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span className="text-xs tracking-wider">scroll</span>
          </div>
        </div>
      </section>
    </>
  )
}
