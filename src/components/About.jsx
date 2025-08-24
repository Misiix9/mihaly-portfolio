import { useTranslation } from 'react-i18next'
import useScrollReveal from '../lib/anim/useScrollReveal'
import Parallax from './ui/Parallax'
import MorphingBlob from './ui/MorphingBlob'

export default function About() {
  const { t } = useTranslation()
  const strengths = t('about.strengths', { returnObjects: true })
  const stack = t('about.stack', { returnObjects: true })
  const experience = t('about.experience', { returnObjects: true })
  const reveal = useScrollReveal()

  return (
    <section 
      className="relative py-20 md:py-32 bg-black" 
      id="about" 
      data-section="about"
      style={{
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#000000',
        minHeight: '100vh'
      }}
    >
      {/* Full Black Background - ensures it covers everything */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          position: 'absolute',
          top: '-100px', // Extend upward to cover header
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000000',
          zIndex: -1
        }}
        aria-hidden
      />
      
      {/* Enhanced Dynamic Background Layer */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(600px 300px at 70% 20%, rgba(59, 130, 246, 0.04), transparent 60%),
            radial-gradient(500px 400px at 30% 80%, rgba(168, 85, 247, 0.03), transparent 50%),
            linear-gradient(135deg, rgba(255,255,255,0.015) 0%, transparent 40%, rgba(59, 130, 246, 0.01) 100%)
          `,
          animation: 'globalFlow 30s ease-in-out infinite'
        }}
        aria-hidden
      />
      
      {/* Enhanced Floating Elements */}
      <div
        className="absolute top-20 right-20 w-40 h-40 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)',
          animation: 'globalFloat 25s ease-in-out infinite 1s'
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-32 left-16 w-32 h-32 rounded-full -z-19 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.025) 0%, transparent 70%)',
          animation: 'globalPulse 18s ease-in-out infinite 3s'
        }}
        aria-hidden
      />
      
      {/* Enhanced background accents */}
      <Parallax
        className="pointer-events-none absolute -z-10 -top-12 left-8 h-[500px] w-[500px]"
        aria-hidden
        speedY={0.06}
        maxShift={80}
      >
        <MorphingBlob className="h-full w-full" opacity={0.06} />
      </Parallax>
      <Parallax
        className="pointer-events-none absolute -z-10 top-16 -right-12 h-48 w-48 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl"
        aria-hidden
        speedY={0.1}
        maxShift={90}
        style={{ animation: 'globalPulse 16s ease-in-out infinite 2s' }}
      />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Enhanced Title Section */}
        <div className="text-center mb-16" ref={reveal}>
          <h2 className="about-title text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
            {t('about.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content */}
          <div ref={reveal} className="lg:col-span-7 space-y-8">
            {/* About Content */}
            <div className="relative">
              <p className="about-content text-lg leading-relaxed text-white/85 max-w-3xl">
                {t('about.body')}
              </p>
              <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
            </div>

            {/* Mission Statement */}
            <div className="relative p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm">
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <p className="text-white/90 italic leading-relaxed pl-4">
                "{t('about.mission')}"
              </p>
            </div>

            {/* Core Strengths */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                {t('about.strengths_title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.isArray(strengths) && strengths.map((strength, i) => (
                  <div key={i} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-white/80 leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div ref={reveal} className="lg:col-span-5 space-y-8">
            {/* Technology Stack */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                {t('about.stack_title')}
              </h3>
              <div className="flex flex-wrap gap-3">
                {Array.isArray(stack) && stack.map((tech, i) => (
                  <span
                    key={i}
                    className="group relative px-4 py-2 rounded-xl border border-white/15 bg-gradient-to-br from-white/8 to-white/[0.02] text-white/85 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-300 cursor-default backdrop-blur-sm"
                  >
                    <span className="relative z-10">{tech}</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                  </span>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                {t('about.experience_title')}
              </h3>
              <div className="space-y-3">
                {Array.isArray(experience) && experience.map((exp, i) => (
                  <div key={i} className="group flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 hover:bg-white/8 transition-all duration-300 backdrop-blur-sm">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-white/80 leading-relaxed text-sm">{exp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats or Call to Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
              <div className="text-center space-y-3">
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-white/70 text-sm uppercase tracking-wider">Years of Experience</div>
                <div className="w-12 h-px bg-gradient-to-r from-blue-400 to-purple-400 mx-auto" />
                <div className="text-white/60 text-xs">Crafting digital experiences</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
