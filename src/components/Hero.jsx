import { useTranslation } from 'react-i18next'
import React, { useEffect, useRef } from 'react'
import useScrollReveal from '../lib/anim/useScrollReveal'
import { createAdvancedGsapParallax, createScrollReveal } from '../lib/anim/parallax-enhanced'
import Button from './ui/Button'
import MagneticButton from './ui/MagneticButton'
import Parallax from './ui/Parallax'
import TypewriterText from './ui/TypewriterText'
import ScrollDiscoveryIndicator from './ui/ScrollDiscoveryIndicator'
import RoleAnimations from './ui/RoleAnimations'
import Viewport from './util/Viewport'
import useReducedMotion from '../lib/anim/useReducedMotion'
import { LazyWrapper, LazyParticlesCanvasEnhanced, LazyLottiePlayer, LazyThreeSceneEnhanced } from '../lib/performance/lazyLoading.jsx'
import FloatingParticles from './ui/FloatingParticles'

export default function Hero() {
  const { t } = useTranslation()
  const reveal = useScrollReveal()
  const reduced = useReducedMotion(false)
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  // Add dynamic background animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes backgroundFlow {
        0%, 100% {
          transform: translate(0px, 0px) scale(1) rotate(0deg);
          opacity: 1;
        }
        25% {
          transform: translate(15px, -20px) scale(1.08) rotate(2deg);
          opacity: 0.8;
        }
        50% {
          transform: translate(-10px, 15px) scale(0.92) rotate(-1deg);
          opacity: 1.3;
        }
        75% {
          transform: translate(-12px, -12px) scale(1.05) rotate(1.5deg);
          opacity: 0.9;
        }
      }
      
      @keyframes rotateGradient {
        0% {
          transform: rotate(0deg) scale(1);
        }
        25% {
          transform: rotate(90deg) scale(1.15);
        }
        50% {
          transform: rotate(180deg) scale(0.85);
        }
        75% {
          transform: rotate(270deg) scale(1.1);
        }
        100% {
          transform: rotate(360deg) scale(1);
        }
      }
      
      @keyframes patternMove {
        0% {
          transform: translate(0px, 0px) rotate(0deg);
        }
        25% {
          transform: translate(20px, -10px) rotate(5deg);
        }
        50% {
          transform: translate(-15px, 20px) rotate(-3deg);
        }
        75% {
          transform: translate(10px, -25px) rotate(7deg);
        }
        100% {
          transform: translate(0px, 0px) rotate(0deg);
        }
      }
      
      @keyframes meshFloat {
        0%, 100% {
          transform: translate(0px, 0px) scale(1);
          filter: blur(0px);
        }
        20% {
          transform: translate(30px, -20px) scale(1.1);
          filter: blur(1px);
        }
        40% {
          transform: translate(-20px, 40px) scale(0.9);
          filter: blur(0.5px);
        }
        60% {
          transform: translate(40px, 20px) scale(1.05);
          filter: blur(1.5px);
        }
        80% {
          transform: translate(-30px, -30px) scale(0.95);
          filter: blur(0.8px);
        }
      }
      
      @keyframes pulseGlow {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1) rotate(0deg);
          filter: blur(20px);
        }
        25% {
          opacity: 0.7;
          transform: scale(1.2) rotate(10deg);
          filter: blur(25px);
        }
        50% {
          opacity: 0.5;
          transform: scale(0.8) rotate(-5deg);
          filter: blur(15px);
        }
        75% {
          opacity: 0.9;
          transform: scale(1.1) rotate(15deg);
          filter: blur(30px);
        }
      }
      
      @keyframes floatDrift {
        0%, 100% {
          transform: translate(0px, 0px) rotate(0deg) scale(1);
        }
        33% {
          transform: translate(25px, -15px) rotate(120deg) scale(1.1);
        }
        66% {
          transform: translate(-20px, 25px) rotate(240deg) scale(0.9);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Enhanced scroll effects for hero elements
  useEffect(() => {
    if (reduced || !heroRef.current) return

    // Create advanced parallax for hero background
    const heroParallax = createAdvancedGsapParallax(heroRef.current, {
      yPercent: -15,
      scale: 1.05,
      trigger: heroRef.current,
      start: 'top bottom',
      end: 'bottom top',
    })

    // Title reveal with scale and rotation
    const titleReveal = createScrollReveal(titleRef.current, {
      y: 80,
      opacity: 0,
      scale: 0.95,
      rotation: 2,
      duration: 1.4,
      ease: 'power3.out',
    })

    // Staggered subtitle reveal
    const subtitleReveal = createScrollReveal(subtitleRef.current, {
      y: 40,
      opacity: 0,
      delay: 0.3,
      duration: 1.2,
      ease: 'power2.out',
    })

    // CTA buttons with bounce effect
    const ctaReveal = createScrollReveal(ctaRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.9,
      delay: 0.6,
      duration: 1,
      ease: 'back.out(1.4)',
    })

    // Cleanup function
    return () => {
      heroParallax?.()
      titleReveal?.()
      subtitleReveal?.()
      ctaReveal?.()
    }
  }, [reduced])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        animation: 'globalFlow 40s ease-in-out infinite',
        minHeight: '100vh',
        padding: '0'
      }}
      data-lcp-critical
    >
      {/* Main background with animated dark gradient */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: 'linear-gradient(45deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
          animation: 'globalPulse 35s ease-in-out infinite 1s'
        }}
        aria-hidden
      />
      {/* Dynamic animated background - Never static */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: `
            radial-gradient(400px 200px at 20% 30%, rgba(255,255,255,0.06), transparent 50%),
            radial-gradient(600px 180px at 80% 70%, rgba(255,255,255,0.04), transparent 40%),
            radial-gradient(300px 300px at 60% 40%, rgba(255,255,255,0.03), transparent 60%),
            linear-gradient(45deg, rgba(255,255,255,0.02) 0%, transparent 25%, rgba(255,255,255,0.01) 100%)
          `,
          animation: 'backgroundFlow 20s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 -z-19"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              rgba(255,255,255,0.02) 0deg, 
              transparent 60deg,
              rgba(255,255,255,0.01) 120deg,
              transparent 180deg,
              rgba(255,255,255,0.015) 240deg,
              transparent 300deg,
              rgba(255,255,255,0.02) 360deg)
          `,
          animation: 'rotateGradient 30s linear infinite'
        }}
        aria-hidden
      />
      
      {/* Moving geometric pattern layer */}
      <div
        className="absolute inset-0 -z-18"
        style={{
          background: `
            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.01) 41%, rgba(255,255,255,0.01) 42%, transparent 43%),
            linear-gradient(-45deg, transparent 40%, rgba(255,255,255,0.008) 41%, rgba(255,255,255,0.008) 42%, transparent 43%)
          `,
          backgroundSize: '60px 60px',
          animation: 'patternMove 25s linear infinite'
        }}
        aria-hidden
      />
      
      {/* Floating animated mesh */}
      <div
        className="absolute inset-0 -z-17"
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(255,255,255,0.025) 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, rgba(255,255,255,0.015) 0%, transparent 50%)
          `,
          animation: 'meshFloat 40s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Background hook for particles/3D/shaders */}
      <div
        aria-hidden
        id="hero-bg-hook"
        className="pointer-events-none absolute inset-0 -z-10"
        data-parallax
        data-speed-y="0.2"
        data-max-shift="100"
        data-mouse="0.06"
      />
      {/* Ultra-Dynamic Particles - Constantly Moving */}
      {!reduced && (
        <Viewport once rootMargin="200px">
          <LazyWrapper className="opacity-80">
            <LazyParticlesCanvasEnhanced 
              sectionType="hero"
              mouseAttraction={true}
              connectionLines={true}
              particleCount={200}
              attractionStrength={1.2}
              repulsionStrength={0.8}
              flowField={true}
              turbulence={true}
              autoFlow={true}
              velocityDecay={0.95}
              mouseRadius={150}
              connectionDistance={120}
              className="opacity-80"
            />
          </LazyWrapper>
        </Viewport>
      )}
      {/* Fixed Interactive 3D Portal - The centerpiece that stays fixed */}
      {!reduced && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <Viewport once rootMargin="200px">
            <LazyWrapper className="h-64 w-64 md:h-96 md:w-96 lg:h-[600px] lg:w-[600px]">
              <LazyThreeSceneEnhanced 
                enhanced={true}
                geometryType="icosahedron"
                enableShader={true}
                shaderEffect="portal"
                enableParticles={true}
                mouseResponse={true}
                scrollInfluence={true}
                sectionAware={true}
                fixedPosition={true}
                portalMode={true}
                expansionFactor={4}
              />
            </LazyWrapper>
          </Viewport>
        </div>
      )}
      {/* Lottie decorative accent */}
      {!reduced && (
        <div className="pointer-events-none absolute -z-10 top-6 right-6 w-28 opacity-60">
          <LazyWrapper className="w-28 h-28">
            <LazyLottiePlayer
              src="https://lottie.host/2f7f22a1-2d2b-4c2f-b1e2-7f3a0f0e25a8/Zq2iP2b2mD.json"
              speed={1}
              loop
              autoplay
            />
          </LazyWrapper>
        </div>
      )}

      {/* Animated floating elements - Never static */}
      {!reduced && (
        <>
          <Parallax
            className="pointer-events-none absolute -z-10 -top-6 left-8 h-32 w-32 rounded-full bg-white/8 blur-3xl"
            aria-hidden
            speedY={0.14}
            maxShift={90}
            style={{ animation: 'pulseGlow 8s ease-in-out infinite' }}
          />
          <Parallax
            className="pointer-events-none absolute -z-10 top-24 right-16 h-24 w-24 rounded-full bg-white/10 blur-2xl"
            aria-hidden
            speedY={0.12}
            maxShift={80}
            style={{ animation: 'pulseGlow 6s ease-in-out infinite 2s' }}
          />
          <Parallax
            className="pointer-events-none absolute -z-10 bottom-32 left-1/4 h-20 w-20 rounded-full bg-white/6 blur-xl"
            aria-hidden
            speedY={0.08}
            maxShift={60}
            style={{ animation: 'pulseGlow 10s ease-in-out infinite 4s' }}
          />
          <Parallax
            className="pointer-events-none absolute -z-10 top-1/3 right-1/4 h-16 w-16 rounded-full bg-white/12 blur-2xl"
            aria-hidden
            speedY={0.16}
            maxShift={100}
            style={{ animation: 'pulseGlow 7s ease-in-out infinite 1s' }}
          />
          
          {/* Additional constantly moving elements */}
          <div
            className="pointer-events-none absolute -z-10 top-1/2 left-12 h-40 w-40 rounded-full bg-white/3 blur-3xl"
            aria-hidden
            style={{ animation: 'floatDrift 15s ease-in-out infinite' }}
          />
          <div
            className="pointer-events-none absolute -z-10 bottom-1/4 right-8 h-28 w-28 rounded-full bg-white/5 blur-2xl"
            aria-hidden
            style={{ animation: 'floatDrift 18s ease-in-out infinite 3s' }}
          />
          <div
            className="pointer-events-none absolute -z-10 top-16 left-1/3 h-36 w-36 rounded-full bg-white/4 blur-xl"
            aria-hidden
            style={{ animation: 'floatDrift 22s ease-in-out infinite 6s' }}
          />
          <div
            className="pointer-events-none absolute -z-10 bottom-16 left-3/4 h-22 w-22 rounded-full bg-white/7 blur-lg"
            aria-hidden
            style={{ animation: 'floatDrift 12s ease-in-out infinite 9s' }}
          />
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-start min-h-screen relative z-10">
        <div className="max-w-4xl">
        <div className="relative inline-block" ref={titleRef}>
          <h1 ref={reveal} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent hover:scale-105 transition-all duration-500 cursor-default">{t('hero.name')}</h1>
          <div className="absolute -bottom-3 left-0 h-0.5 w-32 bg-gradient-to-r from-white/80 via-white/50 to-transparent rounded-full" />
          <div className="absolute -bottom-4 left-28 w-2 h-2 bg-white/70 rounded-full animate-pulse" />
          {!reduced && (
            <Parallax
              mode="gsap"
              className="absolute -bottom-2 left-0 h-px w-40 bg-gradient-to-r from-white/40 to-transparent"
              speedY={0.8}
              start="top bottom"
              end="bottom top"
              maxShift={80}
              aria-hidden
            />
          )}
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
          <div ref={reveal} className="mt-4 text-sm sm:text-base text-gray-300 font-medium tracking-wide uppercase hover:text-gray-100 transition-colors duration-300">{t('hero.value_proposition')}</div>
          <p ref={reveal} className="mt-6 text-gray-200 max-w-2xl text-lg leading-relaxed hover:text-white transition-colors duration-300">{t('hero.subtitle')}</p>
        </div>
        <div ref={ctaRef} className="mt-12 flex flex-wrap items-center gap-6 gap-y-4">
          <Button 
            variant="primary" 
            size="md" 
            className="bg-white text-black rounded-xl px-8 py-4 font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-gray-100 group border-0"
            data-magnetic="0.3"
            data-cursor-text="Click me"
            data-cursor-scale="1.5"
          >
            <span className="relative z-10">{t('hero.cta_primary')}</span>
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            as="a" 
            href="#projects" 
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 text-gray-100 rounded-xl px-8 py-4 font-semibold hover:scale-105 hover:-translate-y-1 transition-all duration-300 hover:bg-gray-800/60 hover:border-gray-600"
            data-magnetic="0.25"
            data-cursor-text="View Work"
            data-cursor-scale="1.3"
          >
            {t('hero.cta_secondary')}
          </Button>
          <MagneticButton 
            className="text-gray-400 hover:text-gray-100 transition-colors duration-300 font-medium"
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

      {/* Role-specific animations with floating particles */}
      {!reduced && (
        <div className="hidden lg:block">
          <RoleAnimations />
          <FloatingParticles className="right-0 top-0 w-80 h-full" />
        </div>
      )}

      {/* Enhanced scroll discovery indicator */}
      {!reduced ? (
        <ScrollDiscoveryIndicator 
          text={t('hero.scroll_discover')}
          showOnLoad={true}
          hideOnScroll={true}
        />
      ) : (
        <div className="pointer-events-none absolute left-1/2 bottom-6 -translate-x-1/2 text-white/60" aria-hidden>
          <div className="flex flex-col items-center gap-2">
            <svg className="h-5 w-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
            <span className="text-xs tracking-wider">scroll</span>
          </div>
        </div>
      )}
    </section>
  )
}
