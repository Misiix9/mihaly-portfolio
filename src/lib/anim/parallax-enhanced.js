import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Enhanced parallax system with sophisticated scroll effects
 */

let rafId = null
let mouseX = 0
let mouseY = 0
let loopStarted = false
let mouseBound = false
const states = new Set()
let globalIntensity = 1

export function setParallaxGlobalIntensity(v = 1) {
  const num = Number(v)
  globalIntensity = Number.isFinite(num) ? num : 1
}

export function getParallaxGlobalIntensity() {
  return globalIntensity
}

function lerp(a, b, t) { return a + (b - a) * t }

function ensureMouseListener() {
  if (mouseBound) return
  const onMouse = (e) => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    mouseX = (e.clientX / vw) * 2 - 1 // -1..1
    mouseY = (e.clientY / vh) * 2 - 1 // -1..1
  }
  window.addEventListener('mousemove', onMouse)
  mouseBound = true

  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('mousemove', onMouse)
      mouseBound = false
    })
  }
}

function ensureLoop() {
  if (loopStarted) return
  loopStarted = true
  const frame = () => {
    const vh = window.innerHeight
    for (const s of states) {
      const rect = s.el.getBoundingClientRect()
      const centerDelta = (rect.top + rect.height / 2) - (vh / 2)
      const baseY = -centerDelta * s.speedY * globalIntensity
      const baseX = -centerDelta * s.speedX * globalIntensity

      const mouseInfluenceX = mouseX * s.mouse * s.maxShift * globalIntensity
      const mouseInfluenceY = mouseY * s.mouse * s.maxShift * globalIntensity

      let finalY = baseY + mouseInfluenceY
      let finalX = baseX + mouseInfluenceX

      // Apply maxShift clamping
      finalY = Math.max(-s.maxShift, Math.min(s.maxShift, finalY))
      finalX = Math.max(-s.maxShift, Math.min(s.maxShift, finalX))

      // Smooth interpolation for fluid motion
      s.currentY = lerp(s.currentY, finalY, 0.08)
      s.currentX = lerp(s.currentX, finalX, 0.08)

      // Apply transform
      s.el.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0)`
    }
    rafId = requestAnimationFrame(frame)
  }
  frame()

  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (rafId) cancelAnimationFrame(rafId)
      loopStarted = false
    })
  }
}

/**
 * Enhanced GSAP parallax with sophisticated scroll behaviors
 */
export function createAdvancedGsapParallax(el, opts = {}) {
  const {
    speedY = 0.12,
    speedX = 0,
    speedRotation = 0,
    speedScale = 0,
    speedOpacity = 0,
    start = 'top bottom',
    end = 'bottom top',
    ease = 'none',
    scrub = true,
    maxShift = 100,
    stagger = 0,
  } = opts

  // Create ScrollTrigger for complex animations
  const scrollTrigger = ScrollTrigger.create({
    trigger: el,
    start,
    end,
    scrub: scrub === true ? 1 : scrub,
    ease,
    onUpdate: (self) => {
      const progress = self.progress
      
      // Calculate transforms based on scroll progress
      const translateY = -progress * speedY * maxShift
      const translateX = -progress * speedX * maxShift
      const rotation = progress * speedRotation * 360
      const scale = 1 + (progress * speedScale)
      const opacity = speedOpacity > 0 ? Math.max(0, 1 - progress * speedOpacity) : 1

      // Apply sophisticated transform
      gsap.set(el, {
        y: translateY,
        x: translateX,
        rotation: rotation,
        scale: scale,
        opacity: opacity,
        force3D: true
      })
    }
  })

  // Add reveal animation for elements entering viewport
  gsap.set(el, { opacity: 0, y: 30 })
  
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    delay: stagger,
    scrollTrigger: {
      trigger: el,
      start: "top 95%",
      toggleActions: "play none none reverse"
    }
  })

  return () => {
    scrollTrigger.kill()
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) st.kill()
    })
  }
}

/**
 * Create smooth scrolling element reveal
 */
export function createScrollReveal(el, opts = {}) {
  const {
    direction = 'up',
    distance = 50,
    duration = 0.8,
    delay = 0,
    ease = "power2.out",
    stagger = 0.1
  } = opts

  const isArray = Array.isArray(el) || el instanceof NodeList
  const elements = isArray ? Array.from(el) : [el]

  elements.forEach((element, index) => {
    const initialProps = { opacity: 0 }
    const animateProps = { opacity: 1, duration, ease, delay: delay + (index * stagger) }

    // Set initial position based on direction
    switch (direction) {
      case 'up':
        initialProps.y = distance
        animateProps.y = 0
        break
      case 'down':
        initialProps.y = -distance
        animateProps.y = 0
        break
      case 'left':
        initialProps.x = distance
        animateProps.x = 0
        break
      case 'right':
        initialProps.x = -distance
        animateProps.x = 0
        break
      case 'scale':
        initialProps.scale = 0.8
        animateProps.scale = 1
        break
    }

    gsap.set(element, initialProps)

    gsap.to(element, {
      ...animateProps,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    })
  })

  return () => {
    elements.forEach(element => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill()
      })
    })
  }
}

/**
 * Create magnetic hover effect with GSAP
 */
export function createMagneticEffect(el, opts = {}) {
  const {
    strength = 0.3,
    ease = "power2.out",
    duration = 0.3
  } = opts

  let bounds = el.getBoundingClientRect()
  
  const onMouseMove = (e) => {
    const x = e.clientX - bounds.left - bounds.width / 2
    const y = e.clientY - bounds.top - bounds.height / 2
    
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration,
      ease
    })
  }

  const onMouseLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration,
      ease
    })
  }

  const onResize = () => {
    bounds = el.getBoundingClientRect()
  }

  el.addEventListener('mousemove', onMouseMove)
  el.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('resize', onResize)

  return () => {
    el.removeEventListener('mousemove', onMouseMove)
    el.removeEventListener('mouseleave', onMouseLeave)
    window.removeEventListener('resize', onResize)
  }
}

/**
 * Original RAF-based parallax (kept for compatibility)
 */
export function registerParallax(el, opts = {}) {
  const { speedY = 0.12, speedX = 0, maxShift = 60, mouse = 0.04 } = opts

  ensureMouseListener()
  ensureLoop()

  const state = {
    el,
    speedY,
    speedX,
    maxShift,
    mouse,
    currentY: 0,
    currentX: 0,
  }

  states.add(state)

  return () => {
    states.delete(state)
    if (states.size === 0 && rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
      loopStarted = false
    }
  }
}

/**
 * Original GSAP parallax (kept for compatibility)
 */
export function createGsapParallax(el, opts = {}) {
  return createAdvancedGsapParallax(el, opts)
}
