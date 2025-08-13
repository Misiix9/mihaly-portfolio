import React, { Suspense } from 'react'
import Scene from './scene'
import SceneEnhanced from './sceneEnhanced'
import useReducedMotion from '../anim/useReducedMotion'

// Scene wrapper with adaptive features
export default function AdaptiveScene({ 
  enhanced = true,
  geometryType = 'icosahedron',
  enableShader = true,
  shaderEffect = 'waves',
  enableParticles = true,
  mouseResponse = true,
  scrollInfluence = true,
  className = '',
  fallback = null
}) {
  const isReducedMotion = useReducedMotion()

  // Use simpler scene for reduced motion preference
  const SceneComponent = enhanced && !isReducedMotion ? SceneEnhanced : Scene

  const sceneProps = enhanced ? {
    geometryType,
    enableShader,
    shaderEffect,
    enableParticles,
    mouseResponse: mouseResponse && !isReducedMotion,
    scrollInfluence: scrollInfluence && !isReducedMotion,
    className
  } : { className }

  return (
    <Suspense fallback={fallback}>
      <SceneComponent {...sceneProps} />
    </Suspense>
  )
}
