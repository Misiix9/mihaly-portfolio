import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import LanguageSwitch from './LanguageSwitch'
import Transitions from './ui/Transitions'

export default function Layout() {
  return (
    <div className="relative">
      {/* Premium background effects */}
      <div 
        className="fixed inset-0 pointer-events-none z-[-1]" 
        style={{
          background: `
            radial-gradient(600px 300px at 20% -10%, rgba(255,255,255,0.08), transparent 60%),
            radial-gradient(500px 250px at 80% 10%, rgba(255,255,255,0.06), transparent 50%),
            linear-gradient(to bottom, rgba(255,255,255,0.04), transparent 20%)
          `
        }}
        aria-hidden 
      />
      
      {/* Skip to content for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white/20 focus:border focus:border-white/30 focus:rounded-lg focus:backdrop-blur-sm focus:shadow-lg"
      >
        Skip to content
      </a>
      <Transitions />
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight text-white hover:text-white/90 transition-all duration-300 hover:scale-105">Mihaly Gyori</span>
          <LanguageSwitch />
        </div>
      </header>
      <main id="main">
        <Hero />
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <About />
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <Skills />
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <Projects />
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
