import { setAboutSectionMeta, setServicesSectionMeta, setContactSectionMeta, setDefaultSiteMeta } from './meta.js'
import { setBreadcrumbSchema } from './schema.js'

// Dynamic SEO updates based on current section
export function updateSEOForSection(sectionId, language = 'en') {
  const baseUrl = language === 'hu' ? 'https://selora.dev/hu' : 'https://selora.dev'
  
  // Update breadcrumbs for better navigation understanding
  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
  ]

  switch (sectionId) {
    case 'about': {
      setAboutSectionMeta()
      breadcrumbs.push({ name: 'About', url: `${baseUrl}/#about` })
      break
    }
    case 'services': {
      setServicesSectionMeta()
      breadcrumbs.push({ name: 'Services', url: `${baseUrl}/#services` })
      break
    }
    case 'contact': {
      setContactSectionMeta()
      breadcrumbs.push({ name: 'Contact', url: `${baseUrl}/#contact` })
      break
    }
    case 'projects': {
      // Projects-specific SEO
      const projectsTitle = language === 'hu' 
        ? 'Projektek | Mihaly Gyori - Web Fejlesztő Portfólió'
        : 'Projects | Mihaly Gyori - Web Developer Portfolio'
      const projectsDesc = language === 'hu'
        ? 'Tekintse meg Mihaly Gyori web fejlesztő projektjeit. React alkalmazások, weboldalak és modern web technológiák bemutatása.'
        : 'View Mihaly Gyori\'s web development projects. Showcasing React applications, websites, and modern web technology implementations.'
      document.title = projectsTitle
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', projectsDesc)
      breadcrumbs.push({ name: 'Projects', url: `${baseUrl}/#projects` })
      break
    }
    case 'skills': {
      // Skills-specific SEO
      const skillsTitle = language === 'hu'
        ? 'Készségek | Mihaly Gyori - React & TypeScript Fejlesztő'
        : 'Skills | Mihaly Gyori - React & TypeScript Developer'
      const skillsDesc = language === 'hu'
        ? 'Mihaly Gyori technikai készségei: React, TypeScript, JavaScript, GSAP, Tailwind CSS, Node.js, C#, Dart és modern web technológiák.'
        : 'Mihaly Gyori\'s technical skills: React, TypeScript, JavaScript, GSAP, Tailwind CSS, Node.js, C#, Dart and modern web technologies.'
      document.title = skillsTitle
      const skillsMetaDesc = document.querySelector('meta[name="description"]')
      if (skillsMetaDesc) skillsMetaDesc.setAttribute('content', skillsDesc)
      breadcrumbs.push({ name: 'Skills', url: `${baseUrl}/#skills` })
      break
    }
    case 'process': {
      // Process-specific SEO
      const processTitle = language === 'hu'
        ? 'Munkafolyamat | Mihaly Gyori - Web Fejlesztési Folyamat'
        : 'Process | Mihaly Gyori - Web Development Workflow'
      const processDesc = language === 'hu'
        ? 'Ismerje meg Mihaly Gyori átlátható web fejlesztési folyamatát: feltérképezés, tervezés, dizájn, fejlesztés, tesztelés és indítás.'
        : 'Learn about Mihaly Gyori\'s transparent web development process: discovery, planning, design, development, testing, and launch.'
      document.title = processTitle
      const processMetaDesc = document.querySelector('meta[name="description"]')
      if (processMetaDesc) processMetaDesc.setAttribute('content', processDesc)
      breadcrumbs.push({ name: 'Process', url: `${baseUrl}/#process` })
      break
    }
    case 'faq': {
      // FAQ-specific SEO
      const faqTitle = language === 'hu'
        ? 'GYIK | Mihaly Gyori - Gyakori Kérdések'
        : 'FAQ | Mihaly Gyori - Frequently Asked Questions'
      const faqDesc = language === 'hu'
        ? 'Gyakori kérdések Mihaly Gyori web fejlesztési szolgáltatásairól: árak, időkeretek, technológiák és munkafolyamat.'
        : 'Frequently asked questions about Mihaly Gyori\'s web development services: pricing, timelines, technologies, and workflow.'
      document.title = faqTitle
      const faqMetaDesc = document.querySelector('meta[name="description"]')
      if (faqMetaDesc) faqMetaDesc.setAttribute('content', faqDesc)
      breadcrumbs.push({ name: 'FAQ', url: `${baseUrl}/#faq` })
      break
    }
    default: {
      // Default homepage SEO
      setDefaultSiteMeta()
      break
    }
  }

  // Update breadcrumb schema
  if (breadcrumbs.length > 1) {
    setBreadcrumbSchema(breadcrumbs)
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]')
  if (canonical) {
    const newUrl = sectionId === 'home' ? baseUrl : `${baseUrl}/#${sectionId}`
    canonical.setAttribute('href', newUrl)
  }

  // Update Open Graph URL
  const ogUrl = document.querySelector('meta[property="og:url"]')
  if (ogUrl) {
    const newUrl = sectionId === 'home' ? baseUrl : `${baseUrl}/#${sectionId}`
    ogUrl.setAttribute('content', newUrl)
  }
}

// Initialize intersection observer for automatic SEO updates
export function initDynamicSEO() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

  const sections = ['hero', 'about', 'skills', 'projects', 'services', 'process', 'faq', 'cta', 'contact']
  let currentLanguage = 'en'

  // Detect current language from URL or localStorage
  if (window.location.pathname.includes('/hu/') || localStorage.getItem('i18nextLng') === 'hu') {
    currentLanguage = 'hu'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
        const sectionId = entry.target.id
        if (sections.includes(sectionId)) {
          updateSEOForSection(sectionId, currentLanguage)
        }
      }
    })
  }, {
    threshold: 0.5,
    rootMargin: '-20% 0px -20% 0px'
  })

  // Observe all sections
  sections.forEach(sectionId => {
    const element = document.getElementById(sectionId)
    if (element) {
      observer.observe(element)
    }
  })

  return () => observer.disconnect()
}

// Performance optimization: preload critical images
export function preloadCriticalImages() {
  const criticalImages = [
    '/og-image.svg',
    '/Icon_Only.svg',
    // Add any hero section images here
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}
