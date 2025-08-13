// SEO Audit Helper
// Run this in browser console to validate SEO implementation

export const auditSEO = () => {
  const results = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    ogTitle: document.querySelector('meta[property="og:title"]')?.content,
    ogDescription: document.querySelector('meta[property="og:description"]')?.content,
    ogImage: document.querySelector('meta[property="og:image"]')?.content,
    twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
    structuredData: [...document.querySelectorAll('script[type="application/ld+json"]')].map(script => {
      try {
        return JSON.parse(script.textContent)
      } catch {
        return null
      }
    }).filter(Boolean),
    hreflang: [...document.querySelectorAll('link[hreflang]')].map(link => ({
      hreflang: link.getAttribute('hreflang'),
      href: link.href
    })),
    robots: document.querySelector('meta[name="robots"]')?.content,
    viewport: document.querySelector('meta[name="viewport"]')?.content,
    lang: document.documentElement.lang,
    performance: {
      lighthouse: 'Run Lighthouse audit manually',
      coreWebVitals: 'Monitor in Google Search Console'
    }
  }

  console.group('🔍 SEO Audit Results')
  console.log('📄 Basic Meta:', { title: results.title, description: results.description })
  console.log('🔗 Canonical URL:', results.canonical)
  console.log('📱 Open Graph:', { title: results.ogTitle, description: results.ogDescription, image: results.ogImage })
  console.log('🐦 Twitter Card:', results.twitterCard)
  console.log('🌐 Language & Alternates:', { lang: results.lang, hreflang: results.hreflang })
  console.log('🤖 Robots:', results.robots)
  console.log('📊 Structured Data:', results.structuredData)
  console.groupEnd()

  return results
}

// Validation checklist
export const seoChecklist = {
  critical: [
    '✅ Title tag (50-60 characters)',
    '✅ Meta description (150-160 characters)', 
    '✅ Canonical URL',
    '✅ Open Graph tags',
    '✅ Structured data (JSON-LD)',
    '✅ Robots meta tag',
    '✅ Language declaration',
    '✅ Hreflang for internationalization'
  ],
  important: [
    '✅ Twitter Cards',
    '✅ Sitemap.xml',
    '✅ Robots.txt',
    '✅ Image alt attributes',
    '✅ Semantic HTML structure',
    '✅ Internal linking',
    '✅ Page speed optimization'
  ],
  advanced: [
    '✅ Schema markup validation',
    '✅ Core Web Vitals optimization',
    '✅ Mobile-first indexing readiness',
    '✅ Rich snippets potential',
    '✅ Local SEO (if applicable)',
    '✅ Analytics and Search Console setup'
  ]
}

// Run audit on page load
if (typeof window !== 'undefined') {
  window.auditSEO = auditSEO
  window.seoChecklist = seoChecklist
  console.log('🚀 SEO audit tools loaded. Run auditSEO() in console.')
}
