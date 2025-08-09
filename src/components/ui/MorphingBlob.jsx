import React from 'react'

// SVG-based morphing blob using turbulence + displacement for subtle organic motion
export default function MorphingBlob({ className = '', opacity = 0.08, color = '#ffffff' }) {
  const o = Math.max(0, Math.min(1, opacity))
  return (
    <svg
      className={className}
      viewBox="0 0 600 600"
      width="600"
      height="600"
      aria-hidden
    >
      <defs>
        <filter id="blobNoise" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
          <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="2" result="noise">
            <animate attributeName="baseFrequency" dur="18s" values="0.008;0.014;0.009;0.008" repeatCount="indefinite"/>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" dur="18s" values="30;50;35;30" repeatCount="indefinite"/>
          </feDisplacementMap>
        </filter>
        <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={o} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>

      <g filter="url(#blobNoise)">
        <circle cx="300" cy="300" r="240" fill="url(#blobGrad)" />
      </g>
    </svg>
  )
}
