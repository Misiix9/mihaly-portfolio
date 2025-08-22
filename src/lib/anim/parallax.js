import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let globalIntensity = 1

export function setParallaxGlobalIntensity(v = 1) {
  const num = Number(v)
  globalIntensity = Number.isFinite(num) ? num : 1
}

export function getParallaxGlobalIntensity() {
  return globalIntensity
}

export function registerParallax(el, options = {}) {
  if (!el) return () => {}
  const speedY = Number(options.speedY ?? el.dataset.speedY ?? el.dataset.speed ?? 0.2)
  const maxShift = Number(options.maxShift ?? el.dataset.maxShift ?? 100)
  return createGsapParallax(el, { speedY, maxShift, scrub: true })
}

// Backwards-compatible initializer for data-attribute usage
export function initParallax({ selector = '[data-parallax]' } = {}) {
  const els = Array.from(document.querySelectorAll(selector))
  els.forEach(el => {
    const speedY = Number(el.dataset.speedY ?? el.dataset.speed ?? 0.2)
    const maxShift = Number(el.dataset.maxShift ?? 100)
    createGsapParallax(el, { speedY, maxShift, scrub: true })
  })
}

// GSAP variant for exact control/scrubbing (uses ScrollTrigger + Lenis bridge)
export function createGsapParallax(el, {
  speedY = 0.2,
  start = 'top bottom',
  end = 'bottom top',
  maxShift = 100,
  ease = 'none',
  scrub = true,
} = {}) {
  if (!el) return () => {}
  gsap.registerPlugin(ScrollTrigger)
  const tween = gsap.fromTo(el, { y: 0 }, {
    y: () => maxShift * speedY * globalIntensity,
    ease,
    scrollTrigger: {
      trigger: el,
      start,
      end,
      scrub,
    },
  })
  return () => {
    if (tween) tween.kill()
  }
}
