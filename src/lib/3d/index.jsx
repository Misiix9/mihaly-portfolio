import React, { Suspense } from 'react'
import Scene from './scene'
import SceneEnhanced from './sceneEnhanced'
import useReducedMotion from '../anim/useReducedMotion'

// Scene wrapper with adaptive features - COMPLETELY DISABLED FOR DEBUGGING
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
  // TEMPORARILY DISABLED: Return null to disable all 3D rendering
  console.log('All 3D scenes disabled for scroll debugging')
  return null
  
  /* ORIGINAL CODE COMMENTED OUT FOR DEBUGGING
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
  */
}
