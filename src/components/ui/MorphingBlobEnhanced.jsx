import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Enhanced Morphing Blob with Advanced Grayscale Animations and Mouse Response
export default function MorphingBlob({ 
  className = '', 
  opacity = 0.08, 
  color = '#ffffff',
  size = 600,
  mouseInteraction = true,
  morphingStyle = 'organic', // 'organic', 'geometric', 'fluid'
  animationSpeed = 'medium' // 'slow', 'medium', 'fast'
}) {
  const svgRef = useRef(null)
  const blobRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  const speedMap = {
    slow: { duration: 25, turbulence: '0.006;0.012;0.007;0.006' },
    medium: { duration: 18, turbulence: '0.008;0.014;0.009;0.008' },
    fast: { duration: 12, turbulence: '0.010;0.018;0.012;0.010' }
  }

  const styleMap = {
    organic: {
      baseFrequency: '0.008',
      octaves: 2,
      scale: '30;50;35;30',
      path: 'M300,100 C400,100 500,200 500,300 C500,400 400,500 300,500 C200,500 100,400 100,300 C100,200 200,100 300,100 Z'
    },
    geometric: {
      baseFrequency: '0.012',
      octaves: 1,
      scale: '20;40;25;20',
      path: 'M300,80 L420,180 L480,320 L380,460 L220,460 L120,320 L180,180 Z'
    },
    fluid: {
      baseFrequency: '0.015',
      octaves: 3,
      scale: '40;70;45;40',
      path: 'M300,80 C450,120 520,250 480,380 C440,510 360,520 260,480 C160,440 80,360 120,260 C160,160 250,80 300,80 Z'
    }
  }

  const currentSpeed = speedMap[animationSpeed] || speedMap.medium
  const currentStyle = styleMap[morphingStyle] || styleMap.organic
  const o = Math.max(0, Math.min(1, opacity))

  useEffect(() => {
    if (!mouseInteraction || !svgRef.current) return

    const svgElement = svgRef.current

    const handleMouseMove = (e) => {
      const rect = svgElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseRef.current.x = (e.clientX - centerX) / rect.width
      mouseRef.current.y = (e.clientY - centerY) / rect.height
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    svgElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      svgElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseInteraction])

  useEffect(() => {
    if (!blobRef.current || !mouseInteraction) return

    const animate = () => {
      const blob = blobRef.current
      if (!blob) return

      // Mouse-based transform
      const mouseInfluence = 0.1
      const scaleX = 1 + mouseRef.current.x * mouseInfluence
      const scaleY = 1 + mouseRef.current.y * mouseInfluence
      const rotation = mouseRef.current.x * 10 // degrees

      gsap.to(blob, {
        scaleX,
        scaleY,
        rotation,
        duration: 1.5,
        ease: 'power2.out'
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mouseInteraction])

  const uniqueId = `blob-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        {/* Enhanced noise filter with multiple layers */}
        <filter id={`${uniqueId}-noise`} x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
          {/* Primary turbulence */}
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency={currentStyle.baseFrequency}
            numOctaves={currentStyle.octaves}
            seed="2" 
            result="noise1"
          >
            <animate 
              attributeName="baseFrequency" 
              dur={`${currentSpeed.duration}s`}
              values={currentSpeed.turbulence}
              repeatCount="indefinite"
            />
          </feTurbulence>
          
          {/* Secondary turbulence for complexity */}
          <feTurbulence 
            type="turbulence" 
            baseFrequency="0.02"
            numOctaves="1"
            seed="5" 
            result="noise2"
          >
            <animate 
              attributeName="baseFrequency" 
              dur={`${currentSpeed.duration * 1.3}s`}
              values="0.015;0.025;0.018;0.015"
              repeatCount="indefinite"
            />
          </feTurbulence>
          
          {/* Composite noises */}
          <feComposite in="noise1" in2="noise2" operator="multiply" result="combinedNoise" />
          
          {/* Primary displacement */}
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="combinedNoise" 
            scale="35"
            xChannelSelector="R" 
            yChannelSelector="G"
            result="displaced"
          >
            <animate 
              attributeName="scale" 
              dur={`${currentSpeed.duration}s`}
              values={currentStyle.scale}
              repeatCount="indefinite"
            />
          </feDisplacementMap>
          
          {/* Subtle blur for smoothness */}
          <feGaussianBlur in="displaced" stdDeviation="1" result="blurred" />
        </filter>

        {/* Multi-layer gradient for depth */}
        <radialGradient id={`${uniqueId}-grad`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity={o * 1.2} />
          <stop offset="30%" stopColor={color} stopOpacity={o * 0.8} />
          <stop offset="70%" stopColor={color} stopOpacity={o * 0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>

        {/* Secondary gradient for layering */}
        <radialGradient id={`${uniqueId}-grad2`} cx="40%" cy="40%" r="80%">
          <stop offset="0%" stopColor={color} stopOpacity={o * 0.6} />
          <stop offset="50%" stopColor={color} stopOpacity={o * 0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>

        {/* Linear gradient for additional texture */}
        <linearGradient id={`${uniqueId}-linear`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity={o * 0.4} />
          <stop offset="50%" stopColor={color} stopOpacity={o * 0.1} />
          <stop offset="100%" stopColor={color} stopOpacity={o * 0.3} />
        </linearGradient>
      </defs>

      <g ref={blobRef} filter={`url(#${uniqueId}-noise)`}>
        {/* Base shape - varies by morphing style */}
        {morphingStyle === 'organic' && (
          <circle 
            cx={size / 2} 
            cy={size / 2} 
            r={size * 0.35} 
            fill={`url(#${uniqueId}-grad)`}
          />
        )}
        
        {morphingStyle === 'geometric' && (
          <path 
            d={currentStyle.path} 
            fill={`url(#${uniqueId}-grad)`}
            transform={`scale(${size/600})`}
          />
        )}
        
        {morphingStyle === 'fluid' && (
          <path 
            d={currentStyle.path} 
            fill={`url(#${uniqueId}-grad)`}
            transform={`scale(${size/600})`}
          />
        )}
        
        {/* Secondary layer for depth */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={size * 0.25} 
          fill={`url(#${uniqueId}-grad2)`}
          opacity="0.6"
        />
        
        {/* Texture overlay */}
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={size * 0.4} 
          fill={`url(#${uniqueId}-linear)`}
          opacity="0.3"
        />
      </g>
    </svg>
  )
}
