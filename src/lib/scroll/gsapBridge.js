import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let bridged = false

export function initGsapLenisBridge(lenis) {
  if (!lenis || bridged) return
  bridged = true

  // Register plugin
  if (!gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger)
  }

  // Keep ScrollTrigger in sync with Lenis scroll positions
  lenis.on('scroll', () => {
    ScrollTrigger.update()
  })

  // Optional: if you prefer GSAP to drive the RAF, you can disable your own RAF
  // and use the ticker. We keep Lenis' own RAF from smoothScroll.js to avoid conflicts.
  // gsap.ticker.add((time) => {
  //   lenis.raf(time * 1000)
  // })

  // Ensure ScrollTrigger uses the window as scroller and calculates positions correctly
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true })
      }
      return window.scrollY || window.pageYOffset
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
    // With Lenis, pinType is usually 'transform' on desktop if transforms are applied,
    // but fall back to 'fixed' to prevent jitter on mobile.
    pinType: document.body.style.transform ? 'transform' : 'fixed',
  })

  // Refresh on resize/content changes
  const refresh = () => ScrollTrigger.refresh()
  window.addEventListener('resize', refresh)

  // HMR cleanup
  if (import.meta && import.meta.hot) {
    import.meta.hot.dispose(() => {
      window.removeEventListener('resize', refresh)
      try { ScrollTrigger.getAll().forEach(t => t.kill()) } catch { /* ignore during HMR dispose */ }
      bridged = false
    })
  }

  // Initial refresh after setup
  setTimeout(() => ScrollTrigger.refresh(), 0)
}
