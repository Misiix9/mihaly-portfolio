import { useEffect, useRef } from 'react'
import { registerParallax, createGsapParallax } from './parallax.js'

/**
 * useParallax
 * Imperative hook to attach parallax to any element via ref.
 *
 * @param {Object} opts
 *  - mode: 'raf' | 'gsap'
 *  - speedY, speedX, maxShift, mouse
 *  - start, end, ease, scrub (GSAP-only)
 *
 * @returns {React.RefObject}
 */
export default function useParallax(opts = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      mode = 'raf',
      speedY = 0.12,
      speedX = 0,
      maxShift = 60,
      mouse = 0.04,
      start = 'top bottom',
      end = 'bottom top',
      ease = 'none',
      scrub = true,
    } = opts

    let dispose
    if (mode === 'gsap') {
      dispose = createGsapParallax(el, { speedY, start, end, maxShift, ease, scrub })
    } else {
      dispose = registerParallax(el, { speedY, speedX, maxShift, mouse })
    }

    return () => dispose && dispose()
  }, [opts])

  return ref
}
