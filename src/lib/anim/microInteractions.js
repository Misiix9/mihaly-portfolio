/**
 * Micro-Interactions Library
 * Advanced hover effects, loading states, and form interactions
 */

import { gsap } from 'gsap'

// Enhanced hover effects for interactive elements
export const createHoverEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    scale: 1.05,
    y: -2,
    duration: 0.3,
    ease: 'power2.out',
    brightness: 1.1,
    shadow: true,
    magnetic: false,
    magnetStrength: 0.2,
  }

  const config = { ...defaults, ...options }
  let isHovering = false

  const handleMouseEnter = () => {
    if (isHovering) return
    isHovering = true

    const tl = gsap.timeline()
    
    tl.to(element, {
      scale: config.scale,
      y: config.y,
      duration: config.duration,
      ease: config.ease,
      filter: `brightness(${config.brightness})`,
    })

    if (config.shadow) {
      tl.to(element, {
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        duration: config.duration,
      }, '<')
    }
  }

  const handleMouseLeave = () => {
    isHovering = false
    
    gsap.to(element, {
      scale: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      filter: 'brightness(1)',
      boxShadow: '0 0 0 rgba(0,0,0,0)',
    })
  }

  const handleMouseMove = (e) => {
    if (!config.magnetic) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * config.magnetStrength
    const deltaY = (e.clientY - centerY) * config.magnetStrength

    gsap.to(element, {
      x: deltaX,
      y: deltaY + (isHovering ? config.y : 0),
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)
  
  if (config.magnetic) {
    element.addEventListener('mousemove', handleMouseMove)
  }

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    if (config.magnetic) {
      element.removeEventListener('mousemove', handleMouseMove)
    }
  }
}

// Button press feedback with physics
export const createPressEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.out',
    haptic: true,
  }

  const config = { ...defaults, ...options }

  const handleMouseDown = () => {
    gsap.to(element, {
      scale: config.scale,
      duration: config.duration,
      ease: config.ease,
    })

    // Haptic feedback on supported devices
    if (config.haptic && 'vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const handleMouseUp = () => {
    gsap.to(element, {
      scale: 1,
      duration: config.duration * 2,
      ease: 'back.out(1.7)',
    })
  }

  element.addEventListener('mousedown', handleMouseDown)
  element.addEventListener('mouseup', handleMouseUp)
  element.addEventListener('mouseleave', handleMouseUp) // Reset if mouse leaves

  return () => {
    element.removeEventListener('mousedown', handleMouseDown)
    element.removeEventListener('mouseup', handleMouseUp)
    element.removeEventListener('mouseleave', handleMouseUp)
  }
}

// Form field focus animations
export const createFormFieldEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    scale: 1.02,
    borderWidth: 2,
    glowColor: 'rgba(255,255,255,0.3)',
    duration: 0.3,
  }

  const config = { ...defaults, ...options }

  const handleFocus = () => {
    const tl = gsap.timeline()
    
    tl.to(element, {
      scale: config.scale,
      duration: config.duration,
      ease: 'power2.out',
    })
    .to(element, {
      boxShadow: `0 0 0 ${config.borderWidth}px ${config.glowColor}, 0 0 20px ${config.glowColor}`,
      duration: config.duration,
    }, '<')
  }

  const handleBlur = () => {
    gsap.to(element, {
      scale: 1,
      boxShadow: '0 0 0 0px transparent, 0 0 0px transparent',
      duration: config.duration,
      ease: 'power2.out',
    })
  }

  element.addEventListener('focus', handleFocus)
  element.addEventListener('blur', handleBlur)

  return () => {
    element.removeEventListener('focus', handleFocus)
    element.removeEventListener('blur', handleBlur)
  }
}

// Loading state animations
export const createLoadingEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    duration: 1.5,
    ease: 'power2.inOut',
    shimmer: true,
  }

  const config = { ...defaults, ...options }
  let animation = null

  const startLoading = () => {
    if (config.shimmer) {
      // Create shimmer effect
      const shimmerElement = document.createElement('div')
      shimmerElement.className = 'absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full'
      element.style.position = 'relative'
      element.style.overflow = 'hidden'
      element.appendChild(shimmerElement)

      animation = gsap.to(shimmerElement, {
        x: '200%',
        duration: config.duration,
        ease: config.ease,
        repeat: -1,
      })
    } else {
      // Simple pulse effect
      animation = gsap.to(element, {
        opacity: 0.5,
        duration: config.duration / 2,
        ease: config.ease,
        yoyo: true,
        repeat: -1,
      })
    }
  }

  const stopLoading = () => {
    if (animation) {
      animation.kill()
      animation = null
    }

    // Remove shimmer element if exists
    const shimmer = element.querySelector('div[class*="shimmer"]')
    if (shimmer) {
      shimmer.remove()
    }

    // Reset element state
    gsap.set(element, { opacity: 1 })
  }

  return {
    start: startLoading,
    stop: stopLoading,
  }
}

// Text reveal animations
export const createTextRevealEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    duration: 0.8,
    stagger: 0.03,
    ease: 'power3.out',
    splitBy: 'chars', // 'chars', 'words', 'lines'
  }

  const config = { ...defaults, ...options }

  // Split text into spans
  const text = element.textContent
  let splits = []

  if (config.splitBy === 'chars') {
    splits = text.split('')
  } else if (config.splitBy === 'words') {
    splits = text.split(' ')
  } else {
    splits = text.split('\n')
  }

  // Clear original text and create spans
  element.innerHTML = ''
  const spans = splits.map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char // Non-breaking space
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.transform = 'translateY(20px)'
    element.appendChild(span)
    return span
  })

  // Animate in
  const reveal = () => {
    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
    })
  }

  return { reveal, spans }
}

// Navigation highlight effect
export const createNavHighlightEffect = (navElement, options = {}) => {
  if (!navElement) return null

  const defaults = {
    indicatorClass: 'nav-indicator',
    duration: 0.3,
    ease: 'power2.out',
  }

  const config = { ...defaults, ...options }

  // Create indicator element
  const indicator = document.createElement('div')
  indicator.className = config.indicatorClass
  indicator.style.cssText = `
    position: absolute;
    bottom: 0;
    height: 2px;
    background: linear-gradient(90deg, white, rgba(255,255,255,0.5));
    transition: none;
    pointer-events: none;
  `
  navElement.appendChild(indicator)

  const links = navElement.querySelectorAll('a, button')
  
  const updateIndicator = (targetElement) => {
    if (!targetElement) return

    const rect = targetElement.getBoundingClientRect()
    const navRect = navElement.getBoundingClientRect()
    
    gsap.to(indicator, {
      width: rect.width,
      x: rect.left - navRect.left,
      duration: config.duration,
      ease: config.ease,
    })
  }

  // Set initial position
  const activeLink = navElement.querySelector('.active, [aria-current="page"]')
  if (activeLink) {
    updateIndicator(activeLink)
  }

  // Add hover effects
  links.forEach(link => {
    link.addEventListener('mouseenter', () => updateIndicator(link))
  })

  navElement.addEventListener('mouseleave', () => {
    const activeLink = navElement.querySelector('.active, [aria-current="page"]')
    if (activeLink) {
      updateIndicator(activeLink)
    }
  })

  return {
    updateActive: updateIndicator,
    destroy: () => indicator.remove(),
  }
}

// Ripple effect for clicks
export const createRippleEffect = (element, options = {}) => {
  if (!element) return null

  const defaults = {
    color: 'rgba(255,255,255,0.6)',
    duration: 0.6,
  }

  const config = { ...defaults, ...options }

  const handleClick = (e) => {
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: ${config.color};
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
    `

    element.style.position = 'relative'
    element.style.overflow = 'hidden'
    element.appendChild(ripple)

    gsap.to(ripple, {
      scale: 2,
      opacity: 0,
      duration: config.duration,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    })
  }

  element.addEventListener('click', handleClick)

  return () => element.removeEventListener('click', handleClick)
}
