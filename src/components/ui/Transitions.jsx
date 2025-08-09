import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

// Subtle global overlay that fades in/out on anchor scroll start/end and route changes
export default function Transitions() {
  const overlayRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return

    const fadeIn = () => gsap.to(el, { opacity: 0.06, duration: 0.22, ease: 'power2.out' })
    const fadeOut = () => gsap.to(el, { opacity: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 })

    const onAnchorTransition = (e) => {
      const phase = e?.detail?.phase
      if (phase === 'start') fadeIn()
      if (phase === 'end') fadeOut()
    }

    document.addEventListener('anchor:transition', onAnchorTransition)

    // On route change, do a quick dip
    fadeIn()
    const to = setTimeout(() => fadeOut(), 140)

    return () => {
      document.removeEventListener('anchor:transition', onAnchorTransition)
      clearTimeout(to)
    }
  }, [location.pathname])

  return (
    <div
      ref={overlayRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] bg-white opacity-0"
    />
  )
}
