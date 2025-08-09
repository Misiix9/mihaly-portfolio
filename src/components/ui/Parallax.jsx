import { useEffect, useMemo, useRef, useState } from 'react'
import { registerParallax, createGsapParallax } from '../../lib/anim/parallax.js'

/**
 * Parallax component
 * - mode: 'raf' (default) uses lightweight RAF + mouse influence
 * - mode: 'gsap' uses GSAP ScrollTrigger for precise scrubbing
 */
export default function Parallax({
  as: Tag = 'div',
  mode = 'raf',
  speedY = 0.12,
  speedX = 0,
  maxShift = 60,
  mouse = 0.04,
  reduceMobileFactor = 0.7, // scale intensity on small screens
  // GSAP-only props
  start = 'top bottom',
  end = 'bottom top',
  ease = 'none',
  scrub = true,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)
  const [bp, setBp] = useState('lg')

  // compute breakpoint and update on resize
  useEffect(() => {
    const computeBp = () => {
      const w = window.innerWidth
      if (w < 768) return 'sm'
      if (w < 1024) return 'md'
      return 'lg'
    }
    const onResize = () => setBp(computeBp())
    setBp(computeBp())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const effectiveMaxShift = useMemo(() => {
    if (bp === 'sm') return maxShift * reduceMobileFactor
    if (bp === 'md') return maxShift * ((1 + reduceMobileFactor) / 2)
    return maxShift
  }, [bp, maxShift, reduceMobileFactor])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (mode === 'gsap') {
      const dispose = createGsapParallax(el, { speedY, start, end, maxShift: effectiveMaxShift, ease, scrub })
      return () => dispose && dispose()
    } else {
      const dispose = registerParallax(el, { speedY, speedX, maxShift: effectiveMaxShift, mouse })
      return () => dispose && dispose()
    }
  }, [mode, speedY, speedX, effectiveMaxShift, mouse, start, end, ease, scrub])

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  )
}
