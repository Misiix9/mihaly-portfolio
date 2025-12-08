import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../lib/anim/useReducedMotion'
import Button from './ui/Button'
import TextReveal from './ui/TextReveal'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { t } = useTranslation()
  const reduced = useReducedMotion(false)

  // Optimized refs
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const particlesRef = useRef(null)
  const logoParticlesRef = useRef(null)
  const floatingElementsRef = useRef([])
  const skillBadgesRef = useRef([])
  const metricsRef = useRef(null)

  // Performance-optimized states
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animationsEnabled] = useState(true)

  // Enhanced particle system with more particles
  const createEnhancedParticleSystem = useCallback(() => {
    if (!particlesRef.current || reduced) return

    const particles = []
    const particleCount = window.innerWidth < 768 ? 80 : 150 // Increased particle count

    // Clear existing particles
    particlesRef.current.innerHTML = ''

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle absolute pointer-events-none will-change-transform'

      const size = Math.random() * 6 + 2
      const depth = Math.random() * 100 + 50

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${i % 4 === 0 ? '#ffffff' : i % 4 === 1 ? '#f3f4f6' : i % 4 === 2 ? '#d1d5db' : '#9ca3af'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.8 + 0.3};
        transform: translateZ(${depth}px) scale(${Math.random() * 1.5 + 0.5});
        box-shadow: 0 0 ${size * 2}px rgba(255,255,255,0.4), 0 0 ${size * 4}px rgba(255,255,255,0.2);
      `

      particlesRef.current.appendChild(particle)
      particles.push(particle)

      // Snappy animations
      gsap.set(particle, {
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      })

      gsap.to(particle, {
        x: `+=${(Math.random() - 0.5) * 300}`,
        y: `+=${(Math.random() - 0.5) * 300}`,
        rotation: Math.random() * 720,
        scale: Math.random() * 2 + 0.5,
        duration: Math.random() * 8 + 6, // Faster animations
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut", // Snappier easing
        delay: i * 0.05
      })
    }

    return particles
  }, [reduced])

  // Logo particle formation animation
  const createLogoParticleFormation = useCallback(() => {
    if (!logoParticlesRef.current || reduced) return

    const logoParticles = []

    // Clear existing
    logoParticlesRef.current.innerHTML = ''

    // Create logo outline with particles
    const logoPath = [
      // S shape approximation with particles
      { x: 0, y: 0 }, { x: 20, y: 0 }, { x: 40, y: 0 },
      { x: 0, y: 20 }, { x: 20, y: 20 }, { x: 40, y: 20 },
      { x: 20, y: 40 }, { x: 40, y: 40 }, { x: 60, y: 40 }
    ]

    logoPath.forEach((point, i) => {
      const particle = document.createElement('div')
      particle.className = 'logo-particle absolute will-change-transform'
      particle.style.cssText = `
        width: 4px;
        height: 4px;
        background: #ffffff;
        border-radius: 50%;
        opacity: 0;
        box-shadow: 0 0 10px rgba(255,255,255,0.8);
      `

      logoParticlesRef.current.appendChild(particle)
      logoParticles.push(particle)

      // Animate particles forming logo
      gsap.fromTo(particle,
        {
          x: Math.random() * 400 - 200,
          y: Math.random() * 400 - 200,
          opacity: 0,
          scale: 0
        },
        {
          x: point.x,
          y: point.y,
          opacity: 1,
          scale: 1,
          duration: 2,
          delay: i * 0.1 + 3, // After main animations
          ease: "power3.out"
        }
      )
    })

    return logoParticles
  }, [reduced])

  // Asymmetrical floating elements
  const createAsymmetricalElements = useCallback(() => {
    if (!heroRef.current || reduced) return

    const geometryContainer = document.createElement('div')
    geometryContainer.className = 'floating-geometry absolute inset-0 pointer-events-none'
    geometryContainer.style.cssText = 'perspective: 1500px; transform-style: preserve-3d;'

    const elements = [
      // Large accent shapes
      { type: 'ring', size: 120, x: '85%', y: '20%', rotation: 45 },
      { type: 'triangle', size: 80, x: '15%', y: '70%', rotation: 30 },
      { type: 'hexagon', size: 60, x: '90%', y: '80%', rotation: 60 },
      { type: 'line', size: 200, x: '5%', y: '30%', rotation: 75 },
      { type: 'dot', size: 20, x: '80%', y: '60%', rotation: 0 },
      { type: 'square', size: 40, x: '10%', y: '15%', rotation: 45 }
    ]

    elements.forEach((elem, i) => {
      const shape = document.createElement('div')
      shape.className = `floating-shape floating-${elem.type} will-change-transform`

      let shapeStyle = `
        position: absolute;
        left: ${elem.x};
        top: ${elem.y};
        width: ${elem.size}px;
        height: ${elem.size}px;
        border: 2px solid rgba(255,255,255,0.15);
        transform: translateZ(${Math.random() * 150 + 50}px) rotate(${elem.rotation}deg);
        backdrop-filter: blur(10px);
        box-shadow: 
          0 0 30px rgba(255,255,255,0.1),
          inset 0 0 20px rgba(255,255,255,0.05);
      `

      // Different shapes
      if (elem.type === 'ring') {
        shapeStyle += 'border-radius: 50%; background: transparent;'
      } else if (elem.type === 'triangle') {
        shapeStyle += 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%); background: rgba(255,255,255,0.02);'
      } else if (elem.type === 'hexagon') {
        shapeStyle += 'clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); background: rgba(255,255,255,0.02);'
      } else if (elem.type === 'line') {
        shapeStyle += 'height: 2px; border-radius: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);'
      } else if (elem.type === 'dot') {
        shapeStyle += 'border-radius: 50%; background: rgba(255,255,255,0.1);'
      } else {
        shapeStyle += 'border-radius: 8px; background: rgba(255,255,255,0.02);'
      }

      shape.style.cssText = shapeStyle
      geometryContainer.appendChild(shape)
      floatingElementsRef.current.push(shape)

      // Dynamic animations
      gsap.to(shape, {
        rotationX: `+=${Math.random() * 360 + 180}`,
        rotationY: `+=${Math.random() * 360 + 180}`,
        rotationZ: `+=${Math.random() * 180 + 90}`,
        y: `+=${(Math.random() - 0.5) * 100}`,
        x: `+=${(Math.random() - 0.5) * 50}`,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5
      })
    })

    heroRef.current.appendChild(geometryContainer)
  }, [reduced])

  // Enhanced scroll effects with no jumping - simplified approach
  useEffect(() => {
    if (reduced) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const heroHeight = window.innerHeight
          const progress = Math.min(scrollY / heroHeight, 1)

          setScrollProgress(progress)

          // Fade out Hero section as About section approaches
          if (heroRef.current) {
            const opacity = Math.max(0, 1 - progress)
            heroRef.current.style.opacity = opacity
            // Optionally add pointer-events none when fully faded
            heroRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto'
          }

          // Smooth parallax effects without pinning
          if (particlesRef.current) {
            particlesRef.current.style.transform = `translate3d(0, ${progress * -50}px, 0) rotateZ(${progress * 5}deg)`
          }

          // Subtle title movement
          if (titleRef.current) {
            titleRef.current.style.transform = `translate3d(0, ${progress * -30}px, 0) scale(${1 - progress * 0.1})`
          }

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [reduced])

  // Throttled mouse tracking with enhanced parallax
  const throttledMouseMove = useMemo(() => {
    let ticking = false

    return (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100
          const y = (e.clientY / window.innerHeight) * 100
          setMousePosition({ x, y })

          if (!reduced && heroRef.current && animationsEnabled) {
            // Enhanced parallax with more dramatic movement
            floatingElementsRef.current.forEach((element, i) => {
              if (element) {
                const depth = (i + 1) * 0.1
                const moveX = (x - 50) * depth
                const moveY = (y - 50) * depth

                gsap.to(element, {
                  x: moveX,
                  y: moveY,
                  rotationY: moveX * 0.2,
                  rotationX: -moveY * 0.2,
                  duration: 0.6,
                  ease: "power2.out"
                })
              }
            })

            // Skill badges parallax
            skillBadgesRef.current.forEach((badge, i) => {
              if (badge) {
                const depth = 0.05 + i * 0.02
                gsap.to(badge, {
                  x: (x - 50) * depth,
                  y: (y - 50) * depth,
                  duration: 0.4,
                  ease: "power2.out"
                })
              }
            })
          }

          ticking = false
        })
        ticking = true
      }
    }
  }, [reduced, animationsEnabled])

  // Event listeners
  useEffect(() => {
    if (!reduced && animationsEnabled) {
      window.addEventListener('mousemove', throttledMouseMove, { passive: true })

      return () => {
        window.removeEventListener('mousemove', throttledMouseMove)
      }
    }
  }, [reduced, animationsEnabled, throttledMouseMove])

  // Master animation timeline with text reveals
  useEffect(() => {
    if (!isLoaded || reduced) return

    const tl = gsap.timeline()

    // Title letters with wave reveal
    const letters = titleRef.current?.querySelectorAll('.letter')
    if (letters) {
      letters.forEach((letter, i) => {
        gsap.set(letter, {
          rotationX: -90,
          y: -150,
          z: -300,
          opacity: 0,
          scale: 0.3,
          transformOrigin: "50% 50% -100px",
          willChange: 'transform'
        })

        tl.to(letter, {
          rotationX: 0,
          y: 0,
          z: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          transformOrigin: "50% 50% 0px"
        }, i * 0.1)

        // No additional animations - just keep letters static after entrance
      })
    }

    // Initialize enhanced systems
    createEnhancedParticleSystem()
    createAsymmetricalElements()
    createLogoParticleFormation()

  }, [isLoaded, reduced, createEnhancedParticleSystem, createAsymmetricalElements, createLogoParticleFormation])

  // Initialize with delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // Simple Shadow Hover - just strengthen the white shadow
  const handleSimpleShadowHover = useCallback((e) => {
    if (reduced || !animationsEnabled) return

    const element = e.currentTarget

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(element)

    gsap.to(element, {
      textShadow: `
        0 0 20px rgba(255,255,255,0.6),
        0 0 40px rgba(255,255,255,0.3)
      `,
      filter: 'contrast(1.05) brightness(1.02)',
      duration: 0.3,
      ease: "power2.out"
    })

  }, [reduced, animationsEnabled])

  const handleSimpleShadowLeave = useCallback((e) => {
    if (reduced || !animationsEnabled) return

    const element = e.currentTarget

    // Kill any existing animations to prevent conflicts
    gsap.killTweensOf(element)

    gsap.to(element, {
      textShadow: '0 0 20px rgba(255,255,255,0.4)',
      filter: 'none',
      duration: 2.0,
      ease: "power2.out"
    })

  }, [reduced, animationsEnabled])

  // Standard hover for other elements
  const handleStandardHover = useCallback((e, intensity = 1) => {
    if (reduced || !animationsEnabled) return

    const element = e.currentTarget
    gsap.killTweensOf(element)

    gsap.to(element, {
      scale: 1 + (0.05 * intensity),
      y: -5 * intensity,
      duration: 0.3,
      ease: "power2.out"
    })
  }, [reduced, animationsEnabled])

  const handleStandardLeave = useCallback((e) => {
    if (reduced || !animationsEnabled) return

    const element = e.currentTarget
    gsap.killTweensOf(element)

    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
  }, [reduced, animationsEnabled])

  // Technologies and metrics data
  const technologies = ['react', 'typescript', 'nodejs', 'threejs', 'gsap', 'webgl', 'nextjs', 'graphql']
  const metrics = [
    { label: t('hero.metrics.years_experience'), value: t('hero.metrics.years_value') },
    { label: t('hero.metrics.projects_completed'), value: t('hero.metrics.projects_value') },
    { label: t('hero.metrics.technologies_mastered'), value: t('hero.metrics.technologies_value') }
  ]

  return (
    <section
      ref={heroRef}
      className="relative h-screen overflow-hidden bg-black"
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
        isolation: 'isolate',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        transition: 'opacity 0.1s ease-out'
      }}
    >
      {/* Enhanced dramatic background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.12) 0%, 
              rgba(255,255,255,0.06) 25%,
              transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
            #000000
          `,
          willChange: 'auto'
        }}
      />

      {/* Enhanced particle system */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
          opacity: Math.max(0.4, 1 - scrollProgress * 0.3)
        }}
      />

      {/* Logo particle formation */}
      <div
        ref={logoParticlesRef}
        className="absolute top-1/4 right-20 pointer-events-none"
        style={{
          width: '100px',
          height: '100px',
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      />

      {/* Asymmetrical main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">

          {/* Main brand - offset left and rotated */}
          <div
            className="absolute left-[15%] top-[30%] transform -rotate-2"
            style={{ perspective: '1500px' }}
          >
            <h1
              ref={titleRef}
              className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none relative"
              style={{
                fontFamily: 'Lexend, sans-serif',
                transformStyle: 'preserve-3d',
                textShadow: '0 0 20px rgba(255,255,255,0.4)',
                color: '#ffffff',
                filter: 'none'
              }}
              onMouseEnter={handleSimpleShadowHover}
              onMouseLeave={handleSimpleShadowLeave}
            >
              {'SELORA'.split('').map((letter, i) => (
                <span
                  key={i}
                  className="letter-container inline-block relative"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <span
                    className="letter inline-block cursor-pointer relative"
                    style={{
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)', // Initial hardware acceleration
                      transformOrigin: '50% 50% 0px',
                      fontFamily: '"Lexend", sans-serif', // Ensure Lexend is always maintained
                      fontDisplay: 'swap'
                    }}
                  >
                    {letter}
                  </span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subtitle - positioned asymmetrically */}
          <div
            ref={subtitleRef}
            className="absolute right-[10%] top-[25%] transform rotate-1 max-w-sm"
          >
            <h2
              className="text-xl font-light mb-4"
              style={{
                color: '#e5e7eb',
                textShadow: '0 5px 15px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,0.1)',
                transformStyle: 'preserve-3d',
                lineHeight: '1.4'
              }}
              onMouseEnter={(e) => handleStandardHover(e, 1)}
              onMouseLeave={handleStandardLeave}
            >
              <TextReveal>{t('hero.hero_title')}</TextReveal>
            </h2>

            <div
              className="text-sm leading-relaxed"
              style={{
                color: '#9ca3af',
                textShadow: '0 3px 8px rgba(0,0,0,0.9)',
                transformStyle: 'preserve-3d'
              }}
            >
              <TextReveal delay={0.5} stagger={0.01}>{t('hero.hero_description')}</TextReveal>
            </div>
          </div>

          {/* Technology badges - scattered asymmetrically */}
          <div className="absolute inset-0 pointer-events-none">
            {technologies.map((tech, i) => (
              <div
                key={tech}
                ref={el => skillBadgesRef.current[i] = el}
                className="absolute pointer-events-auto cursor-pointer will-change-transform"
                style={{
                  left: `${[85, 20, 75, 25, 80, 15, 70, 30][i]}%`,
                  top: `${[60, 80, 75, 65, 85, 70, 55, 90][i]}%`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => handleStandardHover(e, 1.5)}
                onMouseLeave={handleStandardLeave}
              >
                <div
                  className="px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 8px 32px rgba(255,255,255,0.1),
                      inset 0 1px 0 rgba(255,255,255,0.2),
                      0 0 20px rgba(255,255,255,0.05)
                    `,
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {t(`hero.technologies.${tech}`)}
                </div>
              </div>
            ))}
          </div>

          {/* Metrics display - bottom left asymmetric */}
          <div
            ref={metricsRef}
            className="absolute bottom-[15%] left-[8%] space-y-3"
          >
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className="flex items-center space-x-4 will-change-transform"
                style={{
                  transform: `rotate(${i * 2 - 2}deg)`,
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={(e) => handleStandardHover(e, 0.8)}
                onMouseLeave={handleStandardLeave}
              >
                <div
                  className="text-3xl font-black"
                  style={{
                    color: '#ffffff',
                    textShadow: '0 0 20px rgba(255,255,255,0.6), 0 5px 15px rgba(0,0,0,0.8)'
                  }}
                >
                  {metric.value}
                </div>
                <div
                  className="text-sm font-light"
                  style={{
                    color: '#9ca3af',
                    textShadow: '0 2px 6px rgba(0,0,0,0.8)'
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced glassy liquid buttons - asymmetrically positioned */}
          <div
            ref={ctaRef}
            className="absolute bottom-[25%] right-[15%] space-y-4"
          >
            <Button
              variant="primary"
              size="lg"
              as="a"
              href="#contact"
              className="group relative overflow-hidden text-black px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-500 will-change-transform block transform -rotate-1"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255,255,255,0.9) 0%, 
                    rgba(255,255,255,0.7) 50%, 
                    rgba(255,255,255,0.8) 100%)
                `,
                boxShadow: `
                  0 20px 60px rgba(255,255,255,0.2),
                  0 0 80px rgba(255,255,255,0.1),
                  inset 0 2px 0 rgba(255,255,255,0.4),
                  inset 0 -2px 0 rgba(0,0,0,0.1)
                `,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              onMouseEnter={(e) => handleStandardHover(e, 2)}
              onMouseLeave={handleStandardLeave}
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('hero.cta_craft')}
                <svg className="w-5 h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              {/* Liquid effect overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
                  filter: 'blur(2px)'
                }}
              />
            </Button>

            <Button
              variant="ghost"
              size="lg"
              as="a"
              href="#projects"
              className="px-8 py-4 rounded-3xl font-bold text-lg text-white transition-all duration-500 will-change-transform block transform rotate-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.2)',
                textShadow: '0 0 20px rgba(255,255,255,0.3)',
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.1), 
                  0 10px 40px rgba(0,0,0,0.4),
                  0 0 40px rgba(255,255,255,0.05)
                `,
                backdropFilter: 'blur(30px)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              onMouseEnter={(e) => handleStandardHover(e, 1.5)}
              onMouseLeave={handleStandardLeave}
            >
              <span className="relative z-10">{t('hero.cta_explore')}</span>
              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  animation: 'glassReflection 2s infinite'
                }}
              />
            </Button>
          </div>

          {/* Enhanced availability badge - floating asymmetrically */}
          <div
            className="absolute top-[15%] left-[60%] transform -rotate-3"
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 will-change-transform"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: `
                  0 0 40px rgba(255,255,255,0.1), 
                  inset 0 1px 0 rgba(255,255,255,0.1),
                  0 10px 30px rgba(0,0,0,0.3)
                `,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
              onMouseEnter={(e) => handleStandardHover(e, 1)}
              onMouseLeave={handleStandardLeave}
            >
              <div
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{
                  boxShadow: '0 0 20px rgba(255,255,255,0.8)'
                }}
              />
              <span
                className="text-white font-medium text-sm"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}
              >
                {t('hero.availability_epic')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}