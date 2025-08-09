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
  const title = 'Mihaly Gyori — Portfolio'
  const description = 'Hungarian website and desktop developer student. Minimal, monochrome, animation-rich portfolio.'
  setMeta({
    title,
    description,
    image: '/og-image.svg',
    twitterCard: 'summary_large_image',
    keywords: [
      'Mihaly Gyori',
      'Győri Mihály',
      'web developer',
      'portfolio',
      'Hungary',
    ],
  })
}
