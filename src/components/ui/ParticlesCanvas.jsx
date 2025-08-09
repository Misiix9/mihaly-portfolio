import { useEffect, useRef } from 'react'

// Lightweight, subtle particles background. Desktop-first, degrades gracefully.
export default function ParticlesCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const ioRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const rand = (min, max) => Math.random() * (max - min) + min

    const createParticles = () => {
      const area = width * height
      // Density tuned for subtle effect; fewer on small screens
      const baseDensity = 130000 // px^2 per particle
      const target = Math.max(12, Math.min(80, Math.floor(area / baseDensity)))
      const particles = []
      for (let i = 0; i < target; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: rand(0.6, 1.6),
          vx: rand(-0.06, 0.06),
          vy: rand(-0.06, 0.06),
          a: rand(0.06, 0.14), // alpha
        })
      }
      particlesRef.current = particles
    }

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = Math.floor((rect?.width || window.innerWidth))
      height = Math.floor((rect?.height || window.innerHeight))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const particles = particlesRef.current
      const m = mouseRef.current
      const parallax = 0.02 // slight mouse reaction
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // Integrate velocity
        p.x += p.vx
        p.y += p.vy
        // Wrap around
        if (p.x < -2) p.x = width + 2
        if (p.x > width + 2) p.x = -2
        if (p.y < -2) p.y = height + 2
        if (p.y > height + 2) p.y = -2

        // Slight mouse parallax offset
        const offX = (m.x - width / 2) * parallax
        const offY = (m.y - height / 2) * parallax

        ctx.beginPath()
        ctx.arc(p.x - offX, p.y - offY, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.fill()
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      window.removeEventListener('mousemove', onMouseMove)
    }

    const start = () => {
      if (!rafRef.current) {
        window.addEventListener('mousemove', onMouseMove)
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Start/stop based on viewport intersection
    ioRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry && entry.isIntersecting) start()
      else stop()
    }, { rootMargin: '200px' })
    ioRef.current.observe(canvas)

    return () => {
      window.removeEventListener('resize', resize)
      stop()
      ioRef.current?.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      aria-hidden
    />
  )
}
