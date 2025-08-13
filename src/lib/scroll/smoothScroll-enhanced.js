import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let lenis = null
let rafCallback = null

/**
 * Initialize smooth scrolling with Lenis
 */
export function initSmoothScrolling() {
  if (lenis) return lenis

  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Create and store the RAF callback
    rafCallback = (time) => {
      if (lenis && lenis.raf) {
        lenis.raf(time * 1000)
      }
    }

    // Add Lenis to GSAP ticker for smooth integration
    gsap.ticker.add(rafCallback)

    // Disable lag smoothing in GSAP to avoid conflicts
    gsap.ticker.lagSmoothing(0)

    return lenis
  } catch (error) {
    console.warn('Failed to initialize Lenis:', error)
    return null
  }
}

/**
 * Scroll to element with smooth animation
 */
export function scrollToElement(target, options = {}) {
  if (!lenis) return

  const {
    offset = 0,
    duration = 1.2,
    easing = 'easeInOutQuart',
    onComplete = null
  } = options

  let element = target
  if (typeof target === 'string') {
    element = document.querySelector(target)
  }

  if (!element) return

  lenis.scrollTo(element, {
    offset,
    duration,
    easing,
    onComplete
  })
}

/**
 * Scroll to top with smooth animation
 */
export function scrollToTop(options = {}) {
  if (!lenis) return

  const {
    duration = 1.5,
    easing = 'easeInOutQuart',
    onComplete = null
  } = options

  lenis.scrollTo(0, {
    duration,
    easing,
    onComplete
  })
}

/**
 * Get current scroll position
 */
export function getScrollY() {
  return lenis ? lenis.scroll : window.scrollY
}

/**
 * Stop smooth scrolling
 */
export function stopSmootScrolling() {
  if (lenis) {
    lenis.stop()
  }
}

/**
 * Start smooth scrolling
 */
export function startSmoothScrolling() {
  if (lenis) {
    lenis.start()
  }
}

/**
 * Destroy smooth scrolling instance
 */
export function destroySmoothScrolling() {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  
  if (rafCallback) {
    gsap.ticker.remove(rafCallback)
    rafCallback = null
  }
  
  gsap.ticker.lagSmoothing(500, 16)
}

/**
 * Update smooth scrolling (useful for dynamic content)
 */
export function updateSmoothScrolling() {
  if (lenis) {
    lenis.resize()
  }
}
