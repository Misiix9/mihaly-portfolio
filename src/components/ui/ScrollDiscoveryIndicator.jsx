import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollDiscoveryIndicator({ 
  className = '',
  text = 'Scroll to discover',
  showOnLoad = true,
  hideOnScroll = true
}) {
  const containerRef = useRef(null)
  const arrowRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const arrow = arrowRef.current
    const textElement = textRef.current

    // Initial state - hidden
    gsap.set(container, { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    })

    // Show animation
    if (showOnLoad) {
      gsap.to(container, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        delay: 2, // Show after hero content loads
        ease: 'back.out(1.4)'
      })
    }

    // Continuous arrow bounce animation
    if (arrow) {
      gsap.to(arrow, {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    // Text breathing effect
    if (textElement) {
      gsap.to(textElement, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      })
    }

    // Hide on scroll
    if (hideOnScroll) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '50px top',
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(container, {
            opacity: 1 - progress,
            y: progress * -20,
            duration: 0.3,
            ease: 'power2.out'
          })
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container || st.trigger === 'body') {
          st.kill()
        }
      })
    }
  }, [showOnLoad, hideOnScroll])

  return (
    <div 
      ref={containerRef}
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none ${className}`}
    >
      <div className="flex flex-col items-center space-y-3">
        {/* Text */}
        <span 
          ref={textRef}
          className="text-sm text-white/70 font-medium tracking-wide uppercase"
        >
          {text}
        </span>
        
        {/* Animated Arrow */}
        <div 
          ref={arrowRef}
          className="flex flex-col items-center"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            className="text-white/70"
          >
            <path 
              d="M12 4L12 20M12 20L6 14M12 20L18 14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Decorative dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
