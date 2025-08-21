import { useTranslation } from 'react-i18next'
import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Footer from './Footer'
import StickyNavigation from './ui/StickyNavigation'
import SectionProgressIndicator from './ui/SectionProgressIndicator'
import SEOHead from './seo/SEOHead'
import StructuredData from './seo/StructuredData'
import Transitions from './ui/Transitions'
import GlobalDynamicBackground from './ui/GlobalDynamicBackground'
import Services from './sections/Services'
import ProcessTimeline from './sections/ProcessTimeline'
import FAQ from './sections/FAQ'
import CTABanner from './sections/CTABanner'

export default function Layout() {
  const { t } = useTranslation()
  
  return (
    <div className="relative overflow-x-hidden">
      {/* SEO and Structured Data */}
      <SEOHead section="home" />
      <StructuredData />
      
      {/* Global Never-Static Background System - TEMPORARILY DISABLED */}
      {/* <GlobalDynamicBackground /> */}
      
      {/* Skip to content for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white/20 focus:border focus:border-white/30 focus:rounded-lg focus:backdrop-blur-sm focus:shadow-lg"
      >
        {t('common.skip_to_content')}
      </a>
      <Transitions />
      
      {/* Enhanced Sticky Navigation */}
      <StickyNavigation />
      
      {/* Section Progress Indicator */}
      <SectionProgressIndicator />
      
      <main id="main" className="overflow-x-hidden pt-20">
        <section id="hero">
          <Hero />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="about">
          <About />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="skills">
          <Skills />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="projects">
          <Projects />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        {/* New Sections: Services, Process, FAQ, CTA */}
        <section id="services">
          <Services />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="process">
          <ProcessTimeline />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="faq">
          <FAQ />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="cta">
          <CTABanner />
        </section>
        <div className="section-divider container mx-auto px-4 sm:px-6" />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
