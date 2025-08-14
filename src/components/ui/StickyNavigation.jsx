import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import LanguageSwitch from '../LanguageSwitch'
import Logo from './Logo'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function StickyNavigation() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const progressBarRef = useRef(null)
  const reduced = useReducedMotion()

  const navItems = useMemo(() => [
    { key: 'home', href: '#hero', label: t('nav.home') },
    { key: 'about', href: '#about', label: t('nav.about') },
    { key: 'skills', href: '#skills', label: t('nav.skills') },
    { key: 'projects', href: '#projects', label: t('nav.projects') },
    { key: 'contact', href: '#contact', label: t('nav.contact') }
  ], [t])

  // Smooth scroll to section
  const scrollToSection = (href) => {
    const targetId = href.replace('#', '')
    const target = document.getElementById(targetId) || document.querySelector(`[id="${targetId}"]`)
    
    if (target) {
      // Close mobile menu if open
      setIsMenuOpen(false)
      
      // Use native smooth scrolling with enhanced offset
      const yOffset = -80 // Account for sticky header
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      if (!reduced) {
        // Smooth scroll with GSAP for better control
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: y,
            autoKill: true
          },
          ease: 'power2.inOut'
        })
      } else {
        // Fallback to native smooth scroll
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        })
      }
    }
  }

  // Track scroll progress and active section
  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(scrolled / scrollHeight, 1)
      setScrollProgress(progress)
    }

    const updateActiveSection = () => {
      const sections = navItems.map(item => {
        const id = item.href.replace('#', '')
        const element = document.getElementById(id) || document.querySelector(`[id="${id}"]`)
        return {
          id: item.key,
          element,
          top: element ? element.getBoundingClientRect().top : 0
        }
      })

      // Find the section that's currently in view
      const current = sections.find((section, index) => {
        const next = sections[index + 1]
        return section.top <= 100 && (!next || next.top > 100)
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress()
          updateActiveSection()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current || reduced) return

    if (isMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: 'block' })
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: 'none' })
        }
      })
    }
  }, [isMenuOpen, reduced])

  // Progress bar animation
  useEffect(() => {
    if (!progressBarRef.current || reduced) return

    gsap.to(progressBarRef.current, {
      scaleX: scrollProgress,
      duration: 0.1,
      ease: 'none'
    })
  }, [scrollProgress, reduced])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header 
        ref={navRef}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20 shadow-2xl"
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/10">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-white/60 via-white/80 to-white/60 origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Epic Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-3 font-bold text-lg tracking-tight text-white hover:text-white/90 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-2"
              data-magnetic="0.2"
              data-cursor-text="Home"
            >
              <Logo 
                size={36} 
                className="transition-all duration-500 hover:scale-110" 
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-1 ${
                    activeSection === item.key
                      ? 'text-white'
                      : 'text-white/70 hover:text-white/90'
                  }`}
                  data-magnetic="0.15"
                  data-cursor-text={item.label}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  <div 
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-white/80 rounded-full transition-all duration-300 ${
                      activeSection === item.key ? 'w-full' : 'w-0'
                    }`}
                  />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </button>
              ))}
            </nav>

            {/* Right side - Language + Mobile Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSwitch />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div 
                    className={`h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <div 
                    className={`h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <div 
                    className={`h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-b border-white/20 shadow-2xl ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <nav className="container mx-auto px-4 py-6" aria-label="Mobile navigation">
            <div className="space-y-4">
              {navItems.slice(1).map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                    activeSection === item.key
                      ? 'text-white bg-white/5'
                      : 'text-white/70'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {activeSection === item.key && (
                      <div className="w-2 h-2 bg-white/80 rounded-full" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile scroll progress indicator */}
            <div className="mt-6 px-4">
              <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                <span>Page Progress</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-white/60 to-white/80 rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
