import { useEffect, useRef } from 'react'

/**
 * LottiePlayer
 * - Lazy loads lottie-web only when mounted in the browser
 * - Accepts a remote or local JSON URL
 * - Plays in loop, muted, with minimal CPU usage
 */
export default function LottiePlayer({
  src,
  className = '',
  speed = 1,
  loop = true,
  autoplay = true,
  hoverPause = false,
  pauseWhenHidden = true,
}) {
  const ref = useRef(null)
  const animRef = useRef(null)
  const ioRef = useRef(null)
  const visRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !src) return

    // Only start once visible
    ioRef.current = new IntersectionObserver(async (entries) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting) {
        ioRef.current?.disconnect()
        try {
          const lottie = (await import('lottie-web')).default
          animRef.current = lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop,
            autoplay,
            path: src,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              progressiveLoad: true,
              hideOnTransparent: true,
            },
          })
          animRef.current.setSpeed(speed)
          if (hoverPause) {
            el.addEventListener('mouseenter', () => animRef.current?.pause())
            el.addEventListener('mouseleave', () => animRef.current?.play())
          }
          if (pauseWhenHidden) {
            visRef.current = new IntersectionObserver((ents) => {
              const v = ents[0]
              if (!animRef.current) return
              if (v && v.isIntersecting) {
                animRef.current.play()
              } else {
                animRef.current.pause()
              }
            }, { rootMargin: '0px' })
            visRef.current.observe(el)
          }
        } catch {
          /* noop */
        }
      }
    }, { rootMargin: '200px' })

    ioRef.current.observe(el)

    return () => {
      ioRef.current?.disconnect()
      visRef.current?.disconnect()
      if (hoverPause && el) {
        el.replaceWith(el.cloneNode(true)) // drop listeners
      }
      try { animRef.current?.destroy() } catch { /* noop */ }
      animRef.current = null
    }
  }, [src, speed, loop, autoplay, hoverPause, pauseWhenHidden])

  return (
    <div ref={ref} className={className} aria-hidden />
  )
}
