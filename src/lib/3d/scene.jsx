import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function RotatingIcosa({ color = '#ffffff', wireframe = true }) {
  const ref = useRef()
  // mouse target rotation
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      // Normalize to -0.5..0.5
      const nx = (e.clientX / window.innerWidth) - 0.5
      const ny = (e.clientY / window.innerHeight) - 0.5
      target.current.x = ny * 0.6
      target.current.y = nx * 0.8
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, dt) => {
    if (!ref.current) return
    // subtle auto-rotation
    ref.current.rotation.y += dt * 0.2
    // ease towards mouse target
    ref.current.rotation.x += (target.current.x - ref.current.rotation.x) * 0.08
    ref.current.rotation.y += (target.current.y - ref.current.rotation.y) * 0.06
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

function ShaderPlane({ enabled = true }) {
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

export default function Scene({ enableShader = true }) {
  return (
    <Canvas
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
