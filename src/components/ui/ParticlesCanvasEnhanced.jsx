import { useEffect, useRef, useCallback } from 'react'

// Enhanced Interactive Particles System with Mouse Response and WebGL Performance
export default function ParticlesCanvas({ 
  className = '', 
  mouseAttraction = true,
  connectionLines = true,
  sectionType = 'default' // 'hero', 'skills', 'projects', 'contact', 'default'
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const ioRef = useRef(null)
  const timeRef = useRef(0)

  // Section-specific particle configurations
  const getParticleConfig = useCallback((type) => {
    const configs = {
      hero: {
        count: 80,
        size: { min: 0.8, max: 2.2 },
        speed: { min: -0.08, max: 0.08 },
        alpha: { min: 0.08, max: 0.18 },
        mouseRadius: 120,
        attractionStrength: 0.02,
        connectionDistance: 150,
        color: 'rgba(255, 255, 255, ',
      },
      skills: {
        count: 60,
        size: { min: 0.6, max: 1.8 },
        speed: { min: -0.06, max: 0.06 },
        alpha: { min: 0.06, max: 0.14 },
        mouseRadius: 100,
        attractionStrength: 0.015,
        connectionDistance: 120,
        color: 'rgba(255, 255, 255, ',
      },
      projects: {
        count: 70,
        size: { min: 0.7, max: 2.0 },
        speed: { min: -0.07, max: 0.07 },
        alpha: { min: 0.07, max: 0.16 },
        mouseRadius: 110,
        attractionStrength: 0.018,
        connectionDistance: 140,
        color: 'rgba(255, 255, 255, ',
      },
      contact: {
        count: 50,
        size: { min: 0.5, max: 1.5 },
        speed: { min: -0.05, max: 0.05 },
        alpha: { min: 0.05, max: 0.12 },
        mouseRadius: 90,
        attractionStrength: 0.012,
        connectionDistance: 100,
        color: 'rgba(255, 255, 255, ',
      },
      default: {
        count: 65,
        size: { min: 0.6, max: 1.8 },
        speed: { min: -0.06, max: 0.06 },
        alpha: { min: 0.06, max: 0.14 },
        mouseRadius: 100,
        attractionStrength: 0.015,
        connectionDistance: 130,
        color: 'rgba(255, 255, 255, ',
      },
    }
    return configs[type] || configs.default
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { 
      alpha: true,
      desynchronized: true, // WebGL optimization
      willReadFrequently: false
    })
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const config = getParticleConfig(sectionType)

    const rand = (min, max) => Math.random() * (max - min) + min

    const createParticles = () => {
      const area = width * height
      const baseDensity = 140000 // Optimized density
      const targetCount = Math.max(
        config.count * 0.3, 
        Math.min(config.count, Math.floor(area / baseDensity))
      )
      
      const particles = []
      for (let i = 0; i < targetCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          originalX: 0,
          originalY: 0,
          r: rand(config.size.min, config.size.max),
          vx: rand(config.speed.min, config.speed.max),
          vy: rand(config.speed.min, config.speed.max),
          originalVx: 0,
          originalVy: 0,
          a: rand(config.alpha.min, config.alpha.max),
          originalA: 0,
          life: Math.random() * Math.PI * 2, // For breathing effect
          attractedToMouse: false,
        })
      }
      
      // Store original values
      particles.forEach(p => {
        p.originalX = p.x
        p.originalY = p.y
        p.originalVx = p.vx
        p.originalVy = p.vy
        p.originalA = p.a
      })
      
      particlesRef.current = particles
    }

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      width = Math.floor(rect?.width || window.innerWidth)
      height = Math.floor(rect?.height || window.innerHeight)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createParticles()
    }

    const drawConnections = (particles) => {
      if (!connectionLines) return
      
      ctx.strokeStyle = config.color + '0.03)'
      ctx.lineWidth = 0.5
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < config.connectionDistance) {
            const opacity = (1 - distance / config.connectionDistance) * 0.05
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const updateParticle = (p, deltaTime) => {
      // Breathing effect
      p.life += deltaTime * 0.001
      const breathe = Math.sin(p.life) * 0.02

      // Mouse interaction
      if (mouseAttraction && mouseRef.current.isActive) {
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < config.mouseRadius) {
          const force = (1 - distance / config.mouseRadius) * config.attractionStrength
          p.vx += (dx / distance) * force
          p.vy += (dy / distance) * force
          p.a = Math.min(p.originalA * 2, p.originalA + force * 2)
          p.attractedToMouse = true
        } else if (p.attractedToMouse) {
          // Smooth return to original state
          p.vx += (p.originalVx - p.vx) * 0.02
          p.vy += (p.originalVy - p.vy) * 0.02
          p.a += (p.originalA - p.a) * 0.02
          
          if (Math.abs(p.vx - p.originalVx) < 0.001) {
            p.attractedToMouse = false
          }
        }
      }

      // Apply breathing and movement
      p.x += (p.vx + breathe) * deltaTime
      p.y += (p.vy + breathe * 0.5) * deltaTime

      // Boundary wrapping
      if (p.x < -10) p.x = width + 10
      if (p.x > width + 10) p.x = -10
      if (p.y < -10) p.y = height + 10
      if (p.y > height + 10) p.y = -10
    }

    const draw = (currentTime) => {
      const deltaTime = currentTime - timeRef.current
      timeRef.current = currentTime

      ctx.clearRect(0, 0, width, height)
      
      const particles = particlesRef.current
      if (!particles.length) return

      // Update particles
      particles.forEach(p => updateParticle(p, deltaTime))

      // Draw connections first (behind particles)
      drawConnections(particles)

      // Draw particles
      particles.forEach(p => {
        const size = p.r * (1 + Math.sin(p.life) * 0.1) // Subtle size breathing
        
        ctx.globalAlpha = p.a
        ctx.fillStyle = config.color + p.a + ')'
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add subtle glow for attracted particles
        if (p.attractedToMouse) {
          ctx.globalAlpha = p.a * 0.3
          ctx.beginPath()
          ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      if (!mouseAttraction) return
      
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) * (width / rect.width)
      mouseRef.current.y = (e.clientY - rect.top) * (height / rect.height)
      mouseRef.current.isActive = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    // Intersection Observer for performance
    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resize()
          rafRef.current = requestAnimationFrame(draw)
          if (mouseAttraction) {
            canvas.addEventListener('mousemove', handleMouseMove)
            canvas.addEventListener('mouseleave', handleMouseLeave)
          }
        } else {
          cancelAnimationFrame(rafRef.current)
          if (mouseAttraction) {
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseleave', handleMouseLeave)
          }
        }
      },
      { threshold: 0.1 }
    )

    ioRef.current.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ioRef.current?.disconnect()
      window.removeEventListener('resize', resize)
      if (mouseAttraction) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [sectionType, mouseAttraction, connectionLines, getParticleConfig])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.7
      }}
      aria-hidden="true"
    />
  )
}
