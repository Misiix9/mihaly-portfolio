import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

function RotatingIcosa({ color = '#ffffff', wireframe = true }) {
  const ref = useRef()
  // mouse target rotation
  const target = useRef({ x: 0, y: 0 })
  const animating = useRef(false)
  const { invalidate, gl } = useThree()

  useEffect(() => {
    const el = gl?.domElement
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      target.current.x = ny * 0.6
      target.current.y = nx * 0.8
      animating.current = true
      invalidate()
    }
    const onLeave = () => {
      animating.current = false
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [gl, invalidate])

  useFrame(() => {
    if (!ref.current) return
    if (!animating.current) return
    // ease towards mouse target
    ref.current.rotation.x += (target.current.x - ref.current.rotation.x) * 0.12
    ref.current.rotation.y += (target.current.y - ref.current.rotation.y) * 0.1
    // stop when close to target to avoid continuous frames
    const dx = Math.abs(target.current.x - ref.current.rotation.x)
    const dy = Math.abs(target.current.y - ref.current.rotation.y)
    if (dx < 0.001 && dy < 0.001) {
      animating.current = false
    } else {
      // request next frame
      invalidate()
    }
  })

  const materialProps = useMemo(() => ({
    color,
    wireframe,
    transparent: true,
    opacity: 0.45,
  }), [color, wireframe])

  return (
    <mesh ref={ref} scale={1.2}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial {...materialProps} />
    </mesh>
  )
}

function ShaderPlane({ enabled = false }) {
  const meshRef = useRef()
  const matRef = useRef()
  const frag = `
    varying vec2 vUv;
    uniform float uTime;
    // simple tiled sinus pattern used as a lightweight shader accent
    void main() {
      vec2 uv = vUv - 0.5;
      float t = uTime * 0.25;
      float s = sin((uv.x + t) * 10.0) * sin((uv.y + t) * 12.0);
      float a = smoothstep(-0.2, 0.8, s);
      vec3 col = vec3(1.0) * (0.05 + 0.08 * a);
      gl_FragColor = vec4(col, 0.22 + 0.20 * a);
    }
  `
  const vert = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((_, dt) => {
    if (!enabled) return
    uniforms.uTime.value += dt
  })

  if (!enabled) return null
  return (
    <mesh ref={meshRef} position={[0, 0, -0.6]} scale={[3.2, 3.2, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial ref={matRef} transparent uniforms={uniforms} vertexShader={vert} fragmentShader={frag} depthWrite={false} />
    </mesh>
  )
}

export default function Scene({ enableShader = false }) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, Math.min(2, window.devicePixelRatio || 1)]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 3.2], fov: 50 }}
    >
      {/* Lights */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[2, 2, 2]} intensity={0.6} />
      <directionalLight position={[-2, -1, -2]} intensity={0.25} />

      {/* Object */}
      <group position={[0, 0, 0]}>
        <ShaderPlane enabled={enableShader} />
        <RotatingIcosa />
      </group>
    </Canvas>
  )
}
