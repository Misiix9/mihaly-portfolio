// Simple SEO meta helpers for SPA
// setMeta: updates document title and common meta tags (description, og/tw)

function ensureTag(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

export function setMeta({
  title,
  description,
  url,
  type = 'website',
  siteName = 'Mihaly Gyori — Portfolio',
  image,
  locale = 'en',
  twitterCard = 'summary_large_image',
  keywords,
}) {
  if (typeof document === 'undefined') return

  if (title) document.title = title
  if (description) {
    ensureTag('meta[name="description"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'description')
      return m
    }).setAttribute('content', description)
  }

  const href = url || window.location.href

  // Canonical
  ensureTag('link[rel="canonical"]', () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  }).setAttribute('href', href)

  // Open Graph
  const og = (p, v) => {
    if (v == null) return
    ensureTag(`meta[property="og:${p}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', `og:${p}`)
      return m
    }).setAttribute('content', String(v))
  }
  og('title', title)
  og('description', description)
  og('type', type)
  og('url', href)
  og('site_name', siteName)
  og('locale', locale)
  if (image) og('image', image)

  // Twitter
  const tw = (n, v) => {
    if (v == null) return
    ensureTag(`meta[name="twitter:${n}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute('name', `twitter:${n}`)
      return m
    }).setAttribute('content', String(v))
  }
  tw('card', twitterCard)
  tw('title', title)
  tw('description', description)
  if (image) tw('image', image)

  // Ethical keywords (optional, concise)
  if (keywords && Array.isArray(keywords) && keywords.length) {
    ensureTag('meta[name="keywords"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('name', 'keywords')
      return m
    }).setAttribute('content', keywords.join(', '))
  }
}

export function setDefaultSiteMeta() {
  const title = 'Mihaly Gyori | Web Developer & React Specialist in Budapest'
  const description = 'Professional web developer in Budapest specializing in React, TypeScript, and modern web applications. Fast, clean, and accessible websites for startups and businesses. Available for freelance projects.'
  setMeta({
    title,
    description,
    image: '/og-image.svg',
    twitterCard: 'summary_large_image',
    keywords: [
      'Mihaly Gyori',
      'Győri Mihály',
      'web developer Budapest',
      'React developer Hungary',
      'TypeScript developer',
      'freelance web developer',
      'website development',
      'web application development',
      'frontend developer',
      'JavaScript developer',
      'portfolio website',
      'Budapest developer',
      'Hungarian web developer'
    ],
  })
}

// Section-specific SEO helpers
export function setAboutSectionMeta() {
  setMeta({
    title: 'About Mihaly Gyori | Web Developer Profile & Experience',
    description: 'Learn about Mihaly Gyori, a passionate web developer from Budapest specializing in React, TypeScript, and modern web technologies. Student developer with professional project experience.',
    keywords: ['about Mihaly Gyori', 'web developer background', 'React developer experience', 'Budapest developer profile']
  })
}

export function setServicesSectionMeta() {
  setMeta({
    title: 'Web Development Services | Mihaly Gyori - React & TypeScript',
    description: 'Professional web development services in Budapest. Website development, React applications, e-commerce, redesign, and maintenance. Clear pricing from €200-1500. Fast delivery.',
    keywords: ['web development services', 'React development Budapest', 'website development Hungary', 'freelance web developer', 'web application development']
  })
}

export function setContactSectionMeta() {
  setMeta({
    title: 'Contact Mihaly Gyori | Hire Web Developer in Budapest',
    description: 'Get in touch with Mihaly Gyori for your web development project. Based in Budapest, available for freelance work. 24-48 hour response time. GitHub, Instagram, Email contact.',
    keywords: ['contact web developer', 'hire React developer Budapest', 'freelance web developer Hungary', 'web development contact']
  })
}
