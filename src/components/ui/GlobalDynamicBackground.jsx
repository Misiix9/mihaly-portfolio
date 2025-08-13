import React, { useEffect } from 'react'
import useReducedMotion from '../../lib/anim/useReducedMotion'

export default function GlobalDynamicBackground() {
  const reduced = useReducedMotion(false)

  // Add global dynamic background animations
  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'global-dynamic-bg'
    style.textContent = `
      /* Global Never-Static Background System */
      @keyframes globalFlow {
        0%, 100% {
          transform: translate(0px, 0px) scale(1) rotate(0deg);
          opacity: 1;
        }
        16% {
          transform: translate(8px, -12px) scale(1.03) rotate(1deg);
          opacity: 0.9;
        }
        32% {
          transform: translate(-6px, 8px) scale(0.97) rotate(-0.5deg);
          opacity: 1.1;
        }
        48% {
          transform: translate(10px, -5px) scale(1.02) rotate(1.2deg);
          opacity: 0.85;
        }
        64% {
          transform: translate(-4px, 10px) scale(0.98) rotate(-0.8deg);
          opacity: 1.05;
        }
        80% {
          transform: translate(7px, -8px) scale(1.01) rotate(0.6deg);
          opacity: 0.95;
        }
      }
      
      @keyframes globalRotate {
        0% {
          transform: rotate(0deg) scale(1);
        }
        25% {
          transform: rotate(90deg) scale(1.08);
        }
        50% {
          transform: rotate(180deg) scale(0.92);
        }
        75% {
          transform: rotate(270deg) scale(1.05);
        }
        100% {
          transform: rotate(360deg) scale(1);
        }
      }
      
      @keyframes globalMesh {
        0%, 100% {
          transform: translate(0px, 0px) scale(1);
          filter: blur(0.5px) opacity(1);
        }
        20% {
          transform: translate(15px, -10px) scale(1.05);
          filter: blur(1px) opacity(0.8);
        }
        40% {
          transform: translate(-10px, 20px) scale(0.95);
          filter: blur(0.3px) opacity(1.2);
        }
        60% {
          transform: translate(20px, 10px) scale(1.03);
          filter: blur(1.2px) opacity(0.9);
        }
        80% {
          transform: translate(-15px, -15px) scale(0.97);
          filter: blur(0.7px) opacity(1.1);
        }
      }
      
      @keyframes globalFloat {
        0%, 100% {
          transform: translate(0px, 0px) rotate(0deg) scale(1);
          opacity: 0.4;
        }
        25% {
          transform: translate(12px, -8px) rotate(90deg) scale(1.1);
          opacity: 0.7;
        }
        50% {
          transform: translate(-8px, 12px) rotate(180deg) scale(0.9);
          opacity: 0.5;
        }
        75% {
          transform: translate(10px, -10px) rotate(270deg) scale(1.05);
          opacity: 0.8;
        }
      }
      
      @keyframes globalPulse {
        0%, 100% {
          opacity: 0.2;
          transform: scale(1) rotate(0deg);
          filter: blur(15px);
        }
        25% {
          opacity: 0.6;
          transform: scale(1.15) rotate(5deg);
          filter: blur(20px);
        }
        50% {
          opacity: 0.3;
          transform: scale(0.85) rotate(-3deg);
          filter: blur(12px);
        }
        75% {
          opacity: 0.8;
          transform: scale(1.05) rotate(8deg);
          filter: blur(25px);
        }
      }
      
      @keyframes globalWave {
        0% {
          transform: translateX(0px) translateY(0px);
        }
        25% {
          transform: translateX(15px) translateY(-8px);
        }
        50% {
          transform: translateX(-10px) translateY(15px);
        }
        75% {
          transform: translateX(8px) translateY(-12px);
        }
        100% {
          transform: translateX(0px) translateY(0px);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      const existingStyle = document.getElementById('global-dynamic-bg')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  if (reduced) return null

  return (
    <>
      {/* Global Dynamic Background Layer 1 - Main Flow */}
      <div
        className="fixed inset-0 -z-50 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px 300px at 25% 25%, rgba(255,255,255,0.04), transparent 60%),
            radial-gradient(800px 200px at 75% 75%, rgba(255,255,255,0.03), transparent 50%),
            radial-gradient(400px 400px at 50% 30%, rgba(255,255,255,0.025), transparent 70%),
            linear-gradient(135deg, rgba(255,255,255,0.015) 0%, transparent 30%, rgba(255,255,255,0.008) 100%)
          `,
          animation: 'globalFlow 35s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Global Dynamic Background Layer 2 - Rotating Pattern */}
      <div
        className="fixed inset-0 -z-49 pointer-events-none"
        style={{
          background: `
            conic-gradient(from 45deg at 50% 50%, 
              rgba(255,255,255,0.015) 0deg, 
              transparent 80deg,
              rgba(255,255,255,0.008) 160deg,
              transparent 240deg,
              rgba(255,255,255,0.012) 320deg,
              transparent 360deg)
          `,
          animation: 'globalRotate 45s linear infinite'
        }}
        aria-hidden
      />
      
      {/* Global Dynamic Background Layer 3 - Mesh Network */}
      <div
        className="fixed inset-0 -z-48 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.015) 0%, transparent 45%),
            radial-gradient(circle at 60% 60%, rgba(255,255,255,0.018) 0%, transparent 35%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.012) 0%, transparent 50%)
          `,
          animation: 'globalMesh 50s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Global Floating Elements */}
      <div
        className="fixed top-1/4 left-1/4 w-32 h-32 rounded-full -z-47 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          animation: 'globalFloat 25s ease-in-out infinite'
        }}
        aria-hidden
      />
      <div
        className="fixed top-3/4 right-1/4 w-24 h-24 rounded-full -z-47 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)',
          animation: 'globalFloat 30s ease-in-out infinite 5s'
        }}
        aria-hidden
      />
      <div
        className="fixed top-1/2 left-1/2 w-40 h-40 rounded-full -z-47 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
          animation: 'globalFloat 40s ease-in-out infinite 10s'
        }}
        aria-hidden
      />
      
      {/* Global Pulsing Elements */}
      <div
        className="fixed top-16 right-16 w-20 h-20 rounded-full -z-46 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.03)',
          animation: 'globalPulse 15s ease-in-out infinite'
        }}
        aria-hidden
      />
      <div
        className="fixed bottom-16 left-16 w-28 h-28 rounded-full -z-46 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.025)',
          animation: 'globalPulse 20s ease-in-out infinite 3s'
        }}
        aria-hidden
      />
      <div
        className="fixed top-1/3 right-1/3 w-16 h-16 rounded-full -z-46 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.02)',
          animation: 'globalPulse 18s ease-in-out infinite 7s'
        }}
        aria-hidden
      />
      
      {/* Global Wave Pattern */}
      <div
        className="fixed inset-0 -z-45 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, transparent 48%, rgba(255,255,255,0.008) 49%, rgba(255,255,255,0.008) 51%, transparent 52%),
            linear-gradient(0deg, transparent 48%, rgba(255,255,255,0.006) 49%, rgba(255,255,255,0.006) 51%, transparent 52%)
          `,
          backgroundSize: '100px 100px',
          animation: 'globalWave 55s ease-in-out infinite'
        }}
        aria-hidden
      />
    </>
  )
}
