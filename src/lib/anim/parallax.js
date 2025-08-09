import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
      const baseY = -centerDelta * s.speedY
      const baseX = 0 + (0 - 0) * s.speedX
      const mx = mouseX * s.maxShift * s.mouse
      const my = mouseY * s.maxShift * s.mouse
      s.tx = lerp(s.tx, (baseX + mx) * globalIntensity, 0.08)
      s.ty = lerp(s.ty, (baseY + my) * globalIntensity, 0.08)
      s.el.style.transform = `translate3d(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px, 0)`
      s.el.style.willChange = 'transform'
    }
    rafId = requestAnimationFrame(frame)
  }
  rafId = requestAnimationFrame(frame)

  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
      loopStarted = false
      states.clear()
    })
  }
}

export function registerParallax(el, options = {}) {
  if (!el) return () => {}
  ensureMouseListener()
  ensureLoop()

  const s = {
    el,
    speedY: Number(options.speedY ?? el.dataset.speedY ?? el.dataset.speed ?? 0.2),
    speedX: Number(options.speedX ?? el.dataset.speedX ?? 0),
    maxShift: Number(options.maxShift ?? el.dataset.maxShift ?? 60),
    mouse: Number(options.mouse ?? el.dataset.mouse ?? 0.06),
    tx: 0,
    ty: 0,
  }
  states.add(s)
  return () => {
    states.delete(s)
  }
}

// Backwards-compatible initializer for data-attribute usage
export function initParallax({ selector = '[data-parallax]' } = {}) {
  const els = Array.from(document.querySelectorAll(selector))
  els.forEach(el => registerParallax(el))
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
