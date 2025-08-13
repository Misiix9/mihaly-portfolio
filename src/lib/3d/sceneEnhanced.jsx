import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

// Enhanced Rotating Geometry with Portal Mode and Section Tunneling
function EnhancedGeometry({ 
  geometryType = 'icosahedron', 
  color = '#ffffff', 
  wireframe = true,
  scrollInfluence = true,
  mouseResponse = true,
  fixedPosition = false,
  portalMode = false,
  expansionFactor = 2
}) {
  const meshRef = useRef()
  const groupRef = useRef()
  const materialRef = useRef()
  const target = useRef({ x: 0, y: 0, scale: 1 })
  const animating = useRef(false)
  const [currentGeometry, setCurrentGeometry] = useState(geometryType)
  const [portalState, setPortalState] = useState({
    scale: 1,
    opacity: 0.6,
    rotation: { x: 0, y: 0, z: 0 },
    tunnelDepth: 0,
    sectionProgress: 0
  })
  const { invalidate, gl } = useThree()

  // Geometry selection with dynamic switching
  const geometry = useMemo(() => {
    switch (currentGeometry) {
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 16, 100]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      default:
        return <icosahedronGeometry args={[1, 1]} />
    }
  }, [currentGeometry])

  // Enhanced material with animations
  const materialProps = useMemo(() => ({
    color: new THREE.Color(color),
    wireframe,
    transparent: true,
    opacity: 0.6,
    metalness: 0.1,
    roughness: 0.8,
    emissive: new THREE.Color(color).multiplyScalar(0.1),
  }), [color, wireframe])

  // Enhanced mouse interaction with portal mode support
  useEffect(() => {
    if (!mouseResponse || !gl?.domElement) return
    
    const el = gl.domElement
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      
      if (portalMode) {
        // In portal mode: more dramatic responses
        target.current.x = ny * 1.5
        target.current.y = nx * 2
        target.current.scale = 1 + Math.abs(nx) * 0.8 + Math.abs(ny) * 0.6
        
        // Add pulsing effect on mouse movement
        if (meshRef.current && materialRef.current) {
          gsap.to(materialRef.current, {
            emissiveIntensity: 0.3 + Math.abs(nx + ny) * 0.4,
            duration: 0.2
          })
        }
      } else {
        // Regular mode: subtle interactions
        target.current.x = ny * 0.8
        target.current.y = nx * 1.2
        target.current.scale = 1 + Math.abs(nx) * 0.3 + Math.abs(ny) * 0.2
      }
      
      animating.current = true
      invalidate()
    }
    
    const onLeave = () => {
      target.current = { x: 0, y: 0, scale: 1 }
      animating.current = true
      
      // Reset emissive intensity
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          emissiveIntensity: 0.1,
          duration: 0.5
        })
      }
      
      invalidate()
    }
    
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [gl, invalidate, mouseResponse, portalMode])

  // Enhanced scroll-based animations with portal mode - TEMPORARILY DISABLED
  useEffect(() => {
    // Completely disable scroll influence to test if this is causing scroll issues
    console.log('3D Scene scroll influence disabled for debugging')
    return
    
    /* COMMENTED OUT FOR DEBUGGING
    if (!scrollInfluence || !groupRef.current) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const maxScroll = documentHeight - windowHeight
          const globalProgress = Math.min(scrollY / maxScroll, 1)
          
          // Get sections
          const sections = ['hero', 'about', 'skills', 'projects', 'contact']
          let currentSection = 'hero'
          let sectionProgress = 0
          
          // Detect current section
          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId)
            if (element) {
              const rect = element.getBoundingClientRect()
              const sectionTop = scrollY + rect.top
              const sectionBottom = sectionTop + rect.height
              
              if (scrollY >= sectionTop - windowHeight / 2 && scrollY < sectionBottom) {
                currentSection = sectionId
                sectionProgress = (scrollY - sectionTop + windowHeight / 2) / rect.height
              }
            }
          })

          // Portal Mode: Massive scaling and tunneling effect
          if (portalMode && groupRef.current) {
            // Calculate portal expansion (grows dramatically as you scroll)
            const heroElement = document.getElementById('hero')
            const heroBottom = heroElement ? heroElement.offsetTop + heroElement.offsetHeight : windowHeight
            
            let portalScale = 1
            let tunnelEffect = 0
            let portalOpacity = 0.6
            
            if (scrollY > heroBottom * 0.3) {
              // Start expanding dramatically after 30% of hero section
              const expansionProgress = Math.min((scrollY - heroBottom * 0.3) / (windowHeight * 2), 1)
              portalScale = 1 + expansionProgress * expansionFactor * 3 // Massive expansion
              tunnelEffect = expansionProgress * 2 // Tunnel depth effect
              portalOpacity = Math.max(0.2, 0.8 - expansionProgress * 0.4) // Fade as it expands
              
              // Create wireframe tunnel effect
              if (materialRef.current) {
                materialRef.current.wireframe = true
                materialRef.current.opacity = portalOpacity
              }
            } else {
              // In hero section: normal interactive mode
              portalScale = 1 + sectionProgress * 0.3
              if (materialRef.current) {
                materialRef.current.wireframe = false
                materialRef.current.opacity = 0.6
              }
            }
            
            // Update portal state
            setPortalState({
              scale: portalScale,
              opacity: portalOpacity,
              rotation: {
                x: globalProgress * Math.PI * 2 + tunnelEffect,
                y: scrollY * 0.003,
                z: Math.sin(globalProgress * Math.PI * 4) * 0.5
              },
              tunnelDepth: tunnelEffect,
              sectionProgress: globalProgress
            })
            
            // Apply portal transformations
            gsap.to(groupRef.current.scale, {
              x: portalScale,
              y: portalScale,
              z: portalScale + tunnelEffect * 0.5,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            gsap.to(groupRef.current.rotation, {
              x: globalProgress * Math.PI * 2 + tunnelEffect,
              y: scrollY * 0.003,
              z: Math.sin(globalProgress * Math.PI * 4) * 0.5,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            // Position adjustment for tunnel effect
            gsap.to(groupRef.current.position, {
              z: tunnelEffect * -2,
              duration: 0.3,
              ease: 'power2.out'
            })
            
            ticking = false
            return // Skip regular section animations in portal mode
          }

          // Regular mode: Apply different animations based on current section
          if (groupRef.current) {
            // Update geometry based on section
            const sectionGeometries = {
              'hero': 'icosahedron',
              'about': 'dodecahedron', 
              'skills': 'octahedron',
              'projects': 'torus',
              'contact': 'torusKnot'
            }
            
            if (sectionGeometries[currentSection] !== currentGeometry) {
              setCurrentGeometry(sectionGeometries[currentSection])
            }
            
            switch (currentSection) {
              case 'hero':
                gsap.to(groupRef.current.rotation, {
                  x: sectionProgress * 0.3,
                  y: scrollY * 0.001,
                  z: sectionProgress * 0.2,
                  duration: 0.5,
                  ease: 'power2.out'
                })
                gsap.to(groupRef.current.scale, {
                  x: 1 + sectionProgress * 0.2,
                  y: 1 + sectionProgress * 0.2,
                  z: 1 + sectionProgress * 0.2,
                  duration: 0.5
                })
                break
                
              case 'about':
                gsap.to(groupRef.current.rotation, {
                  x: Math.PI * 0.2 + sectionProgress * 0.5,
                  y: scrollY * 0.002,
                  z: Math.sin(scrollY * 0.01) * 0.3,
                  duration: 0.5,
                  ease: 'power2.out'
                })
                gsap.to(groupRef.current.scale, {
                  x: 1.3 + Math.sin(sectionProgress * Math.PI) * 0.2,
                  y: 1.3 + Math.sin(sectionProgress * Math.PI) * 0.2,
                  z: 1.3 + Math.sin(sectionProgress * Math.PI) * 0.2,
                  duration: 0.5
                })
                break
                
              case 'skills':
                gsap.to(groupRef.current.rotation, {
                  x: Math.PI * 0.5 + sectionProgress * Math.PI,
                  y: scrollY * 0.003,
                  z: sectionProgress * Math.PI * 0.5,
                  duration: 0.5,
                  ease: 'power2.out'
                })
                gsap.to(groupRef.current.scale, {
                  x: 1.5 + sectionProgress * 0.3,
                  y: 1.5 + sectionProgress * 0.3,
                  z: 1.5 + sectionProgress * 0.3,
                  duration: 0.5
                })
                break
                
              case 'projects':
                gsap.to(groupRef.current.rotation, {
                  x: Math.PI + sectionProgress * 0.8,
                  y: scrollY * 0.004,
                  z: Math.cos(scrollY * 0.01) * 0.4,
                  duration: 0.5,
                  ease: 'power2.out'
                })
                gsap.to(groupRef.current.scale, {
                  x: 1.8 + sectionProgress * 0.4,
                  y: 1.8 + sectionProgress * 0.4,
                  z: 1.8 + sectionProgress * 0.4,
                  duration: 0.5
                })
                break
                
              case 'contact':
                gsap.to(groupRef.current.rotation, {
                  x: Math.PI * 1.5 + sectionProgress * 0.6,
                  y: scrollY * 0.005,
                  z: sectionProgress * Math.PI,
                  duration: 0.5,
                  ease: 'power2.out'
                })
                gsap.to(groupRef.current.scale, {
                  x: 2 + Math.sin(sectionProgress * Math.PI * 2) * 0.3,
                  y: 2 + Math.sin(sectionProgress * Math.PI * 2) * 0.3,
                  z: 2 + Math.sin(sectionProgress * Math.PI * 2) * 0.3,
                  duration: 0.5
                })
                break
            }
            
            // Update material opacity based on section
            if (materialRef.current) {
              const opacity = currentSection === 'hero' ? 0.6 : Math.max(0.3, 0.8 - sectionProgress * 0.3)
              gsap.to(materialRef.current, {
                opacity,
                duration: 0.5
              })
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    */
  }, [scrollInfluence, currentGeometry, portalMode, expansionFactor])

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return

    // Mouse-based rotation easing
    if (animating.current) {
      meshRef.current.rotation.x += (target.current.x - meshRef.current.rotation.x) * 0.12
      meshRef.current.rotation.y += (target.current.y - meshRef.current.rotation.y) * 0.1
      
      const targetScale = target.current.scale
      groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.08
      groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.08
      groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.08

      // Check if close to target
      const dx = Math.abs(target.current.x - meshRef.current.rotation.x)
      const dy = Math.abs(target.current.y - meshRef.current.rotation.y)
      const dz = Math.abs(targetScale - groupRef.current.scale.x)
      
      if (dx < 0.001 && dy < 0.001 && dz < 0.001) {
        animating.current = false
      } else {
        invalidate()
      }
    }

    // Continuous subtle rotation when not interacting
    if (!animating.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.003
      invalidate()
    }

    // Material opacity breathing
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      materialRef.current.emissiveIntensity = 0.1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} scale={1.2}>
      <mesh ref={meshRef}>
        {geometry}
        <meshStandardMaterial ref={materialRef} {...materialProps} />
      </mesh>
    </group>
  )
}

// Enhanced Shader Plane with Monochrome Effects
function MonochromeShaderPlane({ enabled = false, effectType = 'waves' }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const { gl } = useThree()

  const shaderEffects = useMemo(() => ({
    waves: {
      fragment: `
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        
        void main() {
          vec2 uv = vUv - 0.5;
          float t = uTime * 0.3;
          
          // Wave patterns
          float wave1 = sin((uv.x + t) * 8.0) * sin((uv.y + t) * 6.0);
          float wave2 = sin((uv.x - t * 0.7) * 12.0) * sin((uv.y + t * 0.5) * 10.0);
          
          float pattern = (wave1 + wave2 * 0.5) * 0.5;
          float intensity = smoothstep(-0.3, 0.7, pattern);
          
          vec3 color = vec3(1.0) * (0.02 + 0.12 * intensity);
          float alpha = 0.15 + 0.25 * intensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    },
    noise: {
      fragment: `
        varying vec2 vUv;
        uniform float uTime;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
          vec2 uv = vUv * 8.0;
          float t = uTime * 0.2;
          
          float n = noise(uv + t);
          n += 0.5 * noise(uv * 2.0 + t * 1.5);
          n += 0.25 * noise(uv * 4.0 + t * 2.0);
          
          float intensity = smoothstep(0.3, 0.8, n);
          vec3 color = vec3(1.0) * (0.03 + 0.08 * intensity);
          float alpha = 0.12 + 0.18 * intensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    },
    grid: {
      fragment: `
        varying vec2 vUv;
        uniform float uTime;
        
        void main() {
          vec2 uv = vUv * 20.0;
          float t = uTime * 0.5;
          
          vec2 grid = abs(fract(uv + t * 0.1) - 0.5) / fwidth(uv);
          float line = min(grid.x, grid.y);
          float intensity = 1.0 - min(line, 1.0);
          
          // Pulsing effect
          intensity *= 0.5 + 0.5 * sin(t * 3.0);
          
          vec3 color = vec3(1.0) * (0.02 + 0.15 * intensity);
          float alpha = 0.1 + 0.3 * intensity;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    },
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(gl.domElement.clientWidth, gl.domElement.clientHeight) },
  }), [gl])

  useFrame((_, delta) => {
    if (!enabled || !materialRef.current) return
    uniforms.uTime.value += delta
  })

  if (!enabled) return null

  const currentEffect = shaderEffects[effectType] || shaderEffects.waves

  return (
    <mesh ref={meshRef} position={[0, 0, -1]} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={currentEffect.fragment}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Floating Particles in 3D Space
function FloatingParticles({ count = 50, enabled = true }) {
  const particlesRef = useRef()
  const { invalidate } = useThree()

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!enabled || !particlesRef.current) return

    const time = state.clock.elapsedTime
    const positions = particlesRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] += Math.sin(time + i) * 0.002
      positions[i3 + 1] += Math.cos(time + i * 1.1) * 0.002
      positions[i3 + 2] += Math.sin(time * 0.7 + i * 0.5) * 0.001
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    invalidate()
  })

  if (!enabled) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main Enhanced Scene Component
export default function SceneEnhanced({ 
  geometryType = 'icosahedron',
  enableShader = true,
  shaderEffect = 'waves',
  enableParticles = true,
  mouseResponse = true,
  scrollInfluence = true,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    const element = document.querySelector('#hero')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  if (!isVisible) return null

  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        dpr={[1, Math.min(2, window.devicePixelRatio || 1)]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 3]} intensity={0.5} />
        <directionalLight position={[-2, -1, -2]} intensity={0.3} />
        <pointLight position={[0, 0, 2]} intensity={0.4} distance={10} />

        {/* Main 3D Elements */}
        <group position={[0, 0, 0]}>
          {/* Background Shader */}
          <MonochromeShaderPlane enabled={enableShader} effectType={shaderEffect} />
          
          {/* Floating Particles */}
          <FloatingParticles count={30} enabled={enableParticles} />
          
          {/* Main Geometry */}
          <EnhancedGeometry
            geometryType={geometryType}
            mouseResponse={mouseResponse}
            scrollInfluence={scrollInfluence}
          />
        </group>
      </Canvas>
    </div>
  )
}
