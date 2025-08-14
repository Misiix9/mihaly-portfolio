import React from 'react'

/**
 * Minimalist geometric logo variant - Ultra clean and modern
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.size - Size of the logo (default: 40)
 * @param {string} props.color - Color override for the logo
 */
export default function LogoMinimal({ className = '', size = 40, color = 'currentColor', ...props }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-mg-minimal ${className}`}
      {...props}
    >
      {/* Outer minimal frame */}
      <rect 
        x="2" 
        y="2" 
        width="36" 
        height="36" 
        stroke={color} 
        strokeWidth="0.3" 
        fill="none" 
        opacity="0.2"
      />
      
      {/* Main geometric M */}
      <g transform="translate(9, 12)">
        <path 
          d="M1 16 L1 2 L4 9 L7 2 L7 16" 
          stroke={color} 
          strokeWidth="1.8" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      
      {/* Main geometric G */}
      <g transform="translate(23, 12)">
        <path 
          d="M1 6 C3.5 6 5 7.5 5 10 L5 14 C5 16.5 3.5 18 1 18 C-1.5 18 -3 16.5 -3 14 L-3 10 C-3 7.5 -1.5 6 1 6 Z M2.5 13 L1 13" 
          stroke={color} 
          strokeWidth="1.8" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      
      {/* Central connection point */}
      <circle cx="20" cy="20" r="0.8" fill={color} opacity="0.6"/>
      
      {/* Subtle corner accents */}
      <rect x="6" y="6" width="1" height="1" fill={color} opacity="0.15"/>
      <rect x="33" y="6" width="1" height="1" fill={color} opacity="0.15"/>
      <rect x="6" y="33" width="1" height="1" fill={color} opacity="0.15"/>
      <rect x="33" y="33" width="1" height="1" fill={color} opacity="0.15"/>
    </svg>
  )
}
