import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Ensure ScrollTrigger is registered (gsapBridge likely already does this)
try { gsap.registerPlugin(ScrollTrigger) } catch { /* no-op */ }

// Utility: checks reduced motion flag set in main bootstrap
function isReducedMotion() {
  try { return Boolean(window.__reducedMotion) } catch { return false }
}

// Animate a node list with a simple fade/slide-up stagger
function revealStagger(targets, opts = {}) {
  const {
    y = 16,
    duration = 0.7,
    ease = 'power2.out',
    stagger = 0.08,
    start = 'top 85%',
  } = opts

  if (!targets || targets.length === 0) return

  gsap.set(targets, { opacity: 0, y })

  ScrollTrigger.batch(targets, {
    start,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        overwrite: true,
      })
    },
    once: true,
  })
}

export function initScrollReveal() {
  if (isReducedMotion()) return

  const sections = Array.from(document.querySelectorAll('section'))
  if (sections.length === 0) return

  // Headings and primary text within sections
  const headingSel = 'h1, h2, h3, h4, h5, h6'
  const textSel = 'p, li'
  const mediaSel = 'img, video, canvas, svg'

  // Per-section staggered entrance
  sections.forEach((section) => {
    const headings = section.querySelectorAll(headingSel)
    const texts = section.querySelectorAll(textSel)
    const media = section.querySelectorAll(mediaSel)

    revealStagger(headings, { y: 18, duration: 0.8 })
    revealStagger(texts, { y: 14, duration: 0.7, stagger: 0.06 })
    revealStagger(media, { y: 22, duration: 0.9, stagger: 0.06 })
  })

  // Generic cards, buttons, tags if present
  const cards = document.querySelectorAll('.card, .glass, .border, [class*="shadow-"]')
  revealStagger(cards, { y: 20, duration: 0.8, stagger: 0.05, start: 'top 90%' })

  const buttons = document.querySelectorAll('a.button, button, .btn')
  revealStagger(buttons, { y: 10, duration: 0.5, stagger: 0.04, start: 'top 92%' })

  // Parallax subtle lift on hover (non-intrusive)
  const hoverables = document.querySelectorAll('.card, .glass, a, button, .btn')
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { y: -2, duration: 0.25, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { y: 0, duration: 0.25, ease: 'power2.out' })
    })
  })

  // Refresh on resize/content changes
  setTimeout(() => ScrollTrigger.refresh(), 100)
}
