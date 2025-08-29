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
  const [scrolled, setScrolled] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const [navHeight, setNavHeight] = useState(64)
  const navRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const progressBarRef = useRef(null)
  const lastScrollYRef = useRef(0)
  const reduced = useReducedMotion()

  const navItems = useMemo(() => [
    { key: 'home', href: '#hero', label: t('nav.home') },
    { key: 'about', href: '#about', label: t('nav.about') },
    { key: 'skills', href: '#skills', label: t('nav.skills') },
    { key: 'projects', href: '#projects', label: t('nav.projects') },
    { key: 'services', href: '#services', label: t('nav.services') },
    { key: 'process', href: '#process', label: t('nav.process') },
    { key: 'faq', href: '#faq', label: t('nav.faq') },
    { key: 'cta', href: '#cta', label: t('nav.cta') },
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
          // Toggle scrolled state after a small threshold
          const y = window.scrollY || window.pageYOffset || 0
          setScrolled(y > 60)

          // Navbar visibility: Stay visible in hero section, hide only when scrolling into About section
          const lastY = lastScrollYRef.current
          const delta = Math.abs(y - lastY)
          const threshold = 8
          
          // Get hero and about section elements
          const heroSection = document.getElementById('hero')
          const aboutSection = document.getElementById('about')
          
          if (delta > threshold && heroSection && aboutSection) {
            const scrollingDown = y > lastY
            const aboutStart = aboutSection.offsetTop
            
            // Only hide navbar when user has scrolled past the hero section into the about section
            if (!isMenuOpen) {
              if (scrollingDown && y >= aboutStart - 50) {
                // Hide navbar when entering About section
                setNavHidden(true)
              } else if (!scrollingDown || y < aboutStart - 50) {
                // Show navbar when scrolling up or still in hero section
                setNavHidden(false)
              }
            }
            lastScrollYRef.current = y
          }

          // Update nav height so the fixed progress bar can sit right under it
          if (navRef.current) {
            const h = navRef.current.getBoundingClientRect().height
            // Avoid re-renders if unchanged
            if (h && Math.abs(h - navHeight) > 0.5) {
              setNavHeight(h)
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems, isMenuOpen, navHeight])

  // Keep navHeight in sync on resize (padding changes on scroll can alter height)
  useEffect(() => {
    const update = () => {
      if (navRef.current) {
        const h = navRef.current.getBoundingClientRect().height
        if (h && Math.abs(h - navHeight) > 0.5) {
          setNavHeight(h)
        }
      }
    }
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => window.removeEventListener('resize', update)
  }, [navHeight])

  // Mobile menu animations
  useEffect(() => {
    if (!mobileMenuRef.current || reduced) return

    if (isMenuOpen) {
      gsap.set(mobileMenuRef.current, { display: 'block' })
      gsap.fromTo(mobileMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )

      // Stagger in menu items for polish
      const buttons = mobileMenuRef.current.querySelectorAll('nav button')
      if (buttons && buttons.length) {
        gsap.fromTo(buttons,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.05, delay: 0.05 }
        )
        // Focus the first interactive element for accessibility
        setTimeout(() => {
          const first = buttons[0]
          if (first && typeof first.focus === 'function') first.focus()
        }, 60)
      }
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

  // Focus trap within mobile menu when open
  useEffect(() => {
    if (!isMenuOpen || !mobileMenuRef.current) return

    const container = mobileMenuRef.current
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input[type="text"]:not([disabled])',
      'input[type="email"]:not([disabled])',
      'input[type="search"]:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',')

    const getFocusable = () => Array.from(container.querySelectorAll(selector))

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusables = getFocusable()
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

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
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b shadow-2xl transition-[background,border-color,box-shadow,transform] duration-300 will-change-transform"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 50,
          transform: navHidden && !isMenuOpen ? 'translateY(-100%)' : 'translateY(0)',
          background: scrolled
            ? 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.85) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.15)',
          boxShadow: scrolled
            ? '0 10px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        {/* Progress bar moved out of header to remain visible even when nav hides */}

        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'} transition-[padding] duration-300`}
          >
            {/* Epic Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center gap-3 font-bold text-lg tracking-tight text-white hover:text-white/90 transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-2"
              data-magnetic="0.2"
              data-cursor-text="Home"
            >
              {/* Responsive logo sizes: 48px on mobile, 56px on md+ */}
              <Logo
                size={72}
                className="transition-all duration-500 hover:scale-110 md:hidden"
              />
              <Logo
                size={164}
                className="transition-all duration-500 hover:scale-110 hidden md:block"
              />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative group text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-2 py-1 ${
                    activeSection === item.key
                      ? 'text-white'
                      : 'text-white/70 hover:text-white/90'
                  }`}
                  data-magnetic="0.15"
                  data-cursor-text={item.label}
                  style={{ willChange: 'transform, box-shadow' }}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Active indicator */}
                  <div 
                    className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-white/80 rounded-full transition-all duration-300 ${
                      activeSection === item.key ? 'w-full' : 'w-0'
                    }`}
                  />
                  
                  {/* Hover effect */}
                  <div className="pointer-events-none absolute inset-0 rounded bg-white/8 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  />

                  {/* Soft outer glow on hover/press */}
                  <div
                    className="pointer-events-none absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      boxShadow: '0 0 16px rgba(255,255,255,0.22), 0 0 32px rgba(255,255,255,0.12)'
                    }}
                  />

                  {/* Subtle inner highlight */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(255,255,255,0.08)'
                    }}
                  />
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
                aria-label={isMenuOpen ? t('common.close_menu') : t('common.open_menu')}
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
          className={`md:hidden absolute top-full left-0 w-full backdrop-blur-lg border-b border-white/20 shadow-2xl ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          <nav className="container mx-auto px-4 py-6" aria-label="Mobile navigation">
            <div className="space-y-4">
              {navItems.slice(1).map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                    activeSection === item.key
                      ? 'text-white'
                      : 'text-white/70'
                  }`}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    background: activeSection === item.key 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)'
                      : 'transparent',
                    border: activeSection === item.key 
                      ? '1px solid rgba(255,255,255,0.15)'
                      : '1px solid transparent',
                    backdropFilter: activeSection === item.key ? 'blur(8px)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.key) {
                      e.target.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                      e.target.style.border = '1px solid rgba(255,255,255,0.1)'
                      e.target.style.backdropFilter = 'blur(6px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.key) {
                      e.target.style.background = 'transparent'
                      e.target.style.border = '1px solid transparent'
                      e.target.style.backdropFilter = 'none'
                    }
                  }}
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
                <span>{t('common.page_progress')}</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${scrollProgress * 100}%`,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 100%)',
                    boxShadow: '0 0 8px rgba(255,255,255,0.3)'
                  }}
                />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Fixed top progress bar: sits under navbar when visible; moves to top when navbar hides */}
      {!reduced && (
        <div
          className="fixed left-0 right-0 z-40"
          style={{
            top: navHidden ? 0 : navHeight,
          }}
        >
          <div className="h-0.5 w-full bg-white/5">
            <div
              ref={progressBarRef}
              className="h-full origin-left"
              style={{
                transform: 'scaleX(0)',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.6) 100%)',
                boxShadow: '0 0 8px rgba(255,255,255,0.3)'
              }}
            />
          </div>
        </div>
      )}

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
