import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'

export default function AnimatedGlow({ 
  children, 
  className = '', 
  color = 'rgba(255,255,255,0.2)',
  intensity = 1,
  speed = 2,
  size = 1.5
}) {
  const glowRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!glowRef.current || reduced) return

    const glow = glowRef.current

    // Pulsing glow animation
    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(glow, {
      scale: size,
      opacity: intensity * 0.8,
      duration: speed,
      ease: 'sine.inOut'
    })
    .to(glow, {
      scale: 1,
      opacity: intensity * 0.3,
      duration: speed,
      ease: 'sine.inOut'
    })

    return () => {
      tl.kill()
    }
  }, [reduced, intensity, speed, size])

  return (
    <div className={`relative ${className}`}>
      {/* Animated glow background */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full blur-lg pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          opacity: intensity * 0.3
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
