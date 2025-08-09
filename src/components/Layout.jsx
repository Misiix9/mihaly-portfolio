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
    <div>
      {/* Skip to content for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-white/10 focus:border focus:border-white/20 focus:rounded"
      >
        Skip to content
      </a>
      <Transitions />
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <span className="font-semibold">Mihaly Gyori</span>
          <LanguageSwitch />
        </div>
      </header>
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
