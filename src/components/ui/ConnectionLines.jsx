import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../../lib/anim/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function ConnectionLines({ roleCount = 4, className = '' }) {
  const containerRef = useRef(null)
  const linesRef = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reduced) return

    const container = containerRef.current
    const lines = linesRef.current

    // Initial setup - hide lines
    gsap.set(lines, {
      scaleY: 0,
      opacity: 0,
      transformOrigin: 'top center'
    })

    // Create scroll-triggered animation for lines
    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        // Simple, gentle line appearance
        gsap.to(lines, {
          scaleY: 1,
          opacity: 0.3,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1
        })
      },
      onLeave: () => {
        gsap.to(lines, {
          opacity: 0.1,
          duration: 0.5
        })
      },
      onEnterBack: () => {
        gsap.to(lines, {
          opacity: 0.3,
          duration: 0.5
        })
      },
      onLeaveBack: () => {
        gsap.to(lines, {
          scaleY: 0,
          opacity: 0,
          duration: 0.5
        })
      }
    })

    // Very subtle flowing animation
    lines.forEach((line, index) => {
      if (!line) return

      // Gentle opacity pulsing only
      gsap.to(line, {
        opacity: 0.5,
        duration: 4 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) {
          st.kill()
        }
      })
    }
  }, [reduced, roleCount])

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: roleCount - 1 }, (_, index) => (
        <div
          key={index}
          ref={el => linesRef.current[index] = el}
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: `${(index + 1) * (100 / roleCount)}%`,
            width: '2px',
            height: `${100 / roleCount}%`,
            background: `linear-gradient(180deg, 
              rgba(255,255,255,0.4) 0%, 
              rgba(255,255,255,0.2) 50%, 
              rgba(255,255,255,0.1) 100%
            )`,
            backgroundSize: '100% 200%',
            backgroundPosition: '0% 0%'
          }}
        />
      ))}
      
      {/* Central hub dot */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full"
        style={{
          boxShadow: '0 0 8px rgba(255,255,255,0.4)'
        }}
      />
    </div>
  )
}
