import Lenis from '@studio-freight/lenis'

let lenis = null
let rafId = null
let initialized = false

function raf(time) {
  lenis?.raf(time)
  rafId = requestAnimationFrame(raf)
}

function onAnchorClick(e) {
  const target = e.target.closest('a[href^="#"]')
  if (!target) return
  const href = target.getAttribute('href')
  if (!href || href === '#' || href.length < 2) return

  const id = href.slice(1)
  const el = document.getElementById(id)
  if (!el) return

  e.preventDefault()
  try {
    document.dispatchEvent(new CustomEvent('anchor:transition', { detail: { phase: 'start', id } }))
  } catch {
    /* noop */
  }
  lenis?.scrollTo(el, {
    duration: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    onComplete: () => {
      try {
        document.dispatchEvent(new CustomEvent('anchor:transition', { detail: { phase: 'end', id } }))
      } catch {
        /* noop */
      }
    }
  })
}

export function initSmoothScroll(options = {}) {
  if (initialized) return lenis
  initialized = true

  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    lerp: 0.1,
    smoothWheel: true,
    smoothTouch: false,
    ...options,
  })

  rafId = requestAnimationFrame(raf)
  document.addEventListener('click', onAnchorClick, { passive: false })

  // Cleanup on HMR or SPA remounts
  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => {
      document.removeEventListener('click', onAnchorClick)
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenis = null
      initialized = false
    })
  }

  return lenis
}

export function getLenis() {
  return lenis
}
