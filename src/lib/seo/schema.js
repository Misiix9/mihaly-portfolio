// Helpers to inject JSON-LD structured data

function ensureJsonLd(id) {
  let el = document.head.querySelector(`#${id}`)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  return el
}

export function setPersonSchema({
  name,
  alternateName,
  jobTitle,
  email,
  url,
  image,
  sameAs = [],
  address,
  telephone,
  knowsAbout = [],
  worksFor,
}) {
  if (typeof document === 'undefined') return
  const id = 'jsonld-person'
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(alternateName ? { alternateName } : {}),
    ...(jobTitle ? { jobTitle } : {}),
    ...(email ? { email: `mailto:${email}` } : {}),
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    ...(sameAs && sameAs.length ? { sameAs } : {}),
    ...(address ? { address } : {}),
    ...(telephone ? { telephone } : {}),
    ...(knowsAbout && knowsAbout.length ? { knowsAbout } : {}),
    ...(worksFor ? { worksFor } : {}),
  }
  const el = ensureJsonLd(id)
  el.textContent = JSON.stringify(data)
}

export function setWebsiteSchema({ name, url, description, author, inLanguage = ['en', 'hu'] }) {
  if (typeof document === 'undefined') return
  const id = 'jsonld-website'
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    author: {
      '@type': 'Person',
      name: author
    },
    inLanguage,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
  const el = ensureJsonLd(id)
  el.textContent = JSON.stringify(data)
}

export function setProfessionalServiceSchema({
  name,
  description,
  provider,
  areaServed = 'Budapest, Hungary',
  serviceType,
  offers = []
}) {
  if (typeof document === 'undefined') return
  const id = 'jsonld-service'
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    provider: {
      '@type': 'Person',
      name: provider
    },
    areaServed: {
      '@type': 'City',
      name: areaServed
    },
    serviceType,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: offers.map((offer, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offer.name,
          description: offer.description
        },
        price: offer.price,
        priceCurrency: 'EUR',
        position: index + 1
      }))
    }
  }
  const el = ensureJsonLd(id)
  el.textContent = JSON.stringify(data)
}

export function setBreadcrumbSchema(items) {
  if (typeof document === 'undefined') return
  const id = 'jsonld-breadcrumb'
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
  const el = ensureJsonLd(id)
  el.textContent = JSON.stringify(data)
}

// Initialize comprehensive schema for the portfolio
export function initPortfolioSchema() {
  // Enhanced person schema
  setPersonSchema({
    name: 'Selora',
    alternateName: undefined,
    jobTitle: 'Web Developer',
    email: 'hi@selora.dev',
    url: 'https://selora.dev',
    image: 'https://selora.dev/og-image.svg',
    sameAs: [
      'https://github.com/mihaly-gyori',
      'https://instagram.com/mihaly.gyori'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Budapest',
      addressCountry: 'Hungary'
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'Frontend Development',
      'GSAP Animation',
      'Tailwind CSS',
      'Node.js',
      'C#',
      'Dart'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    }
  })

  // Website schema
  setWebsiteSchema({
    name: 'Selora',
    url: 'https://selora.dev',
    description: 'Professional web developer portfolio showcasing React, TypeScript, and modern web development projects.',
    author: 'Selora'
  })

  // Professional service schema
  setProfessionalServiceSchema({
    name: 'Web Development Services',
    description: 'Professional web development services including React applications, websites, e-commerce, and maintenance.',
    provider: 'Selora',
    serviceType: 'Web Development',
    offers: [
      {
        name: 'Website Development',
        description: 'Modern, responsive websites optimized for speed and user experience',
        price: '400'
      },
      {
        name: 'Web Application Development',
        description: 'Custom React web applications with robust architecture',
        price: '1500'
      },
      {
        name: 'E-commerce Development',
        description: 'E-commerce stores with secure payment and CMS integration',
        price: '1200'
      },
      {
        name: 'Website Redesign',
        description: 'UX/UI refresh for cleaner, faster, and better user experience',
        price: '600'
      },
      {
        name: 'Website Maintenance',
        description: 'Ongoing updates, bug fixes, and performance optimization',
        price: '200'
      }
    ]
  })
}
