import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'
import ConnectionLines from './ConnectionLines'

gsap.registerPlugin(ScrollTrigger)

export default function RoleAnimations({ className = '' }) {
  const containerRef = useRef(null)
  const iconsRef = useRef([])
  const orbsRef = useRef([])
  const reduced = useReducedMotion()

  // Enhanced role-based icons and animations
  const roles = useMemo(() => [
    {
      name: 'Developer',
      description: 'Full-stack development with modern technologies',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: 'rotate',
      color: 'from-blue-500/20 to-purple-500/20',
      accent: 'bg-blue-400/30'
    },
    {
      name: 'Designer',
      description: 'UI/UX design with attention to detail',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: 'pulse',
      color: 'from-green-500/20 to-emerald-500/20',
      accent: 'bg-green-400/30'
    },
    {
      name: 'Problem Solver',
      description: 'Analytical thinking and creative solutions',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="6" r="1" fill="currentColor"/>
        </svg>
      ),
      animation: 'bounce',
      color: 'from-orange-500/20 to-red-500/20',
      accent: 'bg-orange-400/30'
    },
    {
      name: 'Innovator',
      description: 'Forward-thinking and cutting-edge solutions',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      animation: 'glow',
      color: 'from-purple-500/20 to-pink-500/20',
      accent: 'bg-purple-400/30'
    }
  ], [])

  useEffect(() => {
    if (!containerRef.current || reduced) return

    const container = containerRef.current
    const icons = iconsRef.current
    const orbs = orbsRef.current

    // Initial setup with subtle entrance
    gsap.set(icons, { 
      opacity: 0, 
      y: 20
    })

    gsap.set(orbs, {
      opacity: 0,
      scale: 0.8
    })

    // Create scroll-triggered animations for each role
    roles.forEach((role, index) => {
      const icon = icons[index]
      const orb = orbs[index]
      if (!icon || !orb) return

      ScrollTrigger.create({
        trigger: container,
        start: `top ${85 - index * 12}%`,
        end: `bottom ${50 - index * 8}%`,
        onEnter: () => {
          // Simple, elegant entrance animation
          gsap.to(orb, {
            opacity: 0.4,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: index * 0.1
          })

          gsap.to(icon, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: index * 0.1
          })

          // Very subtle continuous animations based on role
          switch (role.animation) {
            case 'rotate':
              // Slow, gentle rotation with seamless loop
              gsap.set(icon, { rotation: 0 })
              gsap.to(icon, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: 'none'
              })
              break
            case 'pulse':
              // Gentle breathing effect with seamless transition
              gsap.to(orb, {
                opacity: 0.6,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              })
              break
            case 'bounce':
              // Very subtle floating with seamless motion
              gsap.to(icon, {
                y: -3,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              })
              break
            case 'glow':
              // Gentle pulsing glow with smooth transitions
              gsap.to(orb, {
                opacity: 0.6,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              })
              break
          }
        },
        onLeave: () => {
          gsap.to([icon, orb], {
            opacity: 0.3,
            duration: 0.4
          })
        },
        onEnterBack: () => {
          gsap.to(icon, {
            opacity: 1,
            duration: 0.4
          })
          gsap.to(orb, {
            opacity: 0.4,
            duration: 0.4
          })
        },
        onLeaveBack: () => {
          gsap.to([icon, orb], {
            opacity: 0,
            y: (i) => i === 0 ? 20 : 0, // only move icon
            duration: 0.6
          })
        }
      })

      // Subtle hover interactions - no crazy scaling or rotation
      icon.addEventListener('mouseenter', () => {
        if (!reduced) {
          gsap.to(icon, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(orb, {
            opacity: 0.7,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })

      icon.addEventListener('mouseleave', () => {
        if (!reduced) {
          gsap.to(icon, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
          gsap.to(orb, {
            opacity: 0.4,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) {
          st.kill()
        }
      })
    }
  }, [roles, reduced])

  return (
    <div 
      ref={containerRef}
      className={`absolute left-[calc(100%-100px)] top-1/2 transform -translate-y-1/2 hidden lg:block ${className}`}
    >
      <div className="relative flex flex-col space-y-8">
        {/* Connection lines between roles */}
        <ConnectionLines roleCount={roles.length} />
        
        {roles.map((role, index) => (
          <div
            key={role.name}
            className="relative group cursor-pointer z-10"
          >
            {/* Animated Background Orb */}
            <div
              ref={el => orbsRef.current[index] = el}
              className={`absolute inset-0 w-16 h-16 -m-2 rounded-full bg-gradient-to-br ${role.color} blur-xl`}
            />

            {/* Enhanced Icon Container */}
            <div
              ref={el => iconsRef.current[index] = el}
              className="relative w-12 h-12 rounded-xl glass-light border border-white/30 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/15 transition-all duration-500 backdrop-blur-md shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              {role.icon}
              
              {/* Accent dot */}
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${role.accent} blur-sm`} />
            </div>
            
            {/* Enhanced Tooltip */}
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:translate-x-1">
              <div className="bg-black/90 backdrop-blur-md text-white rounded-xl border border-white/20 shadow-2xl overflow-hidden w-64">
                <div className="px-4 py-3">
                  <div className="font-semibold text-sm text-white mb-1">{role.name}</div>
                  <div className="text-xs text-white/70 leading-relaxed">{role.description}</div>
                </div>
                <div className={`h-1 bg-gradient-to-r ${role.color}`} />
                
                {/* Arrow */}
                <div className="absolute left-full top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-black/90" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
