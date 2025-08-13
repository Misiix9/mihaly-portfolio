import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useReducedMotion from '../../lib/anim/useReducedMotion'

export default function FloatingParticles({ className = '' }) {
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || reduced) return

    const particles = particlesRef.current

    // Create floating animation for each particle
    particles.forEach((particle) => {
      if (!particle) return

      // Initial random position and properties
      gsap.set(particle, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 200 - 100,
        scale: Math.random() * 0.5 + 0.3,
        opacity: Math.random() * 0.3 + 0.1
      })

      // Very gentle floating animation
      gsap.to(particle, {
        x: `+=${Math.random() * 20 - 10}`,
        y: `+=${Math.random() * 20 - 10}`,
        duration: Math.random() * 6 + 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 2
      })

      // Subtle opacity pulsing
      gsap.to(particle, {
        opacity: Math.random() * 0.2 + 0.05,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * 1.5
      })
    })

    return () => {
      gsap.killTweensOf(particles)
    }
  }, [reduced])

  // Generate particle data - reduced count for subtlety
  const particleCount = 6
  const particles = Array.from({ length: particleCount }, (_, index) => ({
    id: index,
    size: Math.random() * 3 + 1,
    type: index % 2 // 0: circle, 1: square (removed diamond for simplicity)
  }))

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          ref={el => particlesRef.current[particle.id] = el}
          className="absolute"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        >
          {particle.type === 0 && (
            // Circle
            <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm" />
          )}
          {particle.type === 1 && (
            // Square
            <div className="w-full h-full bg-white/8 backdrop-blur-sm" style={{ borderRadius: '1px' }} />
          )}
        </div>
      ))}
    </div>
  )
}
