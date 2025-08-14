import React from 'react'
import Logo from './Logo'

/**
 * Logo Showcase Component - Shows off the epic logo in different sizes
 * This will make people say "WOW GOD DAMN THAT'S REALLY COOL!"
 */
export default function LogoShowcase() {
  return (
    <div className="p-8 bg-black min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold text-white mb-8">EPIC LOGO SHOWCASE</h1>
      
      {/* Different sizes showcase */}
      <div className="flex items-center gap-8 flex-wrap justify-center">
        <div className="text-center">
          <Logo size={30} />
          <p className="text-white/60 mt-2 text-sm">Small (30px)</p>
        </div>
        
        <div className="text-center">
          <Logo size={40} />
          <p className="text-white/60 mt-2 text-sm">Medium (40px)</p>
        </div>
        
        <div className="text-center">
          <Logo size={60} />
          <p className="text-white/60 mt-2 text-sm">Large (60px)</p>
        </div>
        
        <div className="text-center">
          <Logo size={80} />
          <p className="text-white/60 mt-2 text-sm">XL (80px)</p>
        </div>
        
        <div className="text-center">
          <Logo size={120} />
          <p className="text-white/60 mt-2 text-sm">XXL (120px)</p>
        </div>
      </div>
      
      {/* Interactive demo */}
      <div className="mt-12 p-8 border border-white/20 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Interactive Demo - Hover to see the EPIC effects!
        </h2>
        <div className="flex justify-center">
          <Logo size={100} className="cursor-pointer" />
        </div>
        <p className="text-white/70 text-center mt-4 max-w-md">
          ✨ Elegant circular frame with smooth rotation<br/>
          💎 Hypnotic center circle with counter-rotation<br/>
          🌟 Letters with sophisticated breathing glow<br/>
          ⚡ Corner elements dancing with staggered timing<br/>
          🔥 Connection lines with shimmer effects<br/>
          🎯 Accent dots floating magically<br/>
          🚀 Hover for EPIC acceleration and intensity!
        </p>
      </div>
      
      {/* Description */}
      <div className="max-w-2xl text-center">
        <h3 className="text-xl font-semibold text-white mb-3">
          🔥 ABSOLUTELY STUNNING NEW DESIGN! 🔥
        </h3>
        <ul className="text-white/80 space-y-2">
          <li>✅ Elegant circular frame with sophisticated rotation</li>
          <li>✅ Premium gradients and soft glow effects</li>
          <li>✅ Redesigned M and G letters with refined typography</li>
          <li>✅ Hypnotic center circle with counter-rotating elements</li>
          <li>✅ Corner decorative elements that dance and float</li>
          <li>✅ Sophisticated connection lines with shimmer effects</li>
          <li>✅ Magical accent dots with staggered animations</li>
          <li>✅ Enhanced hover effects with smooth acceleration</li>
          <li>✅ Professional drop shadows and inner shadows</li>
          <li>✅ Optimized performance with GPU acceleration</li>
          <li>✅ Clean, modern, and absolutely jaw-dropping!</li>
        </ul>
      </div>
    </div>
  )
}
