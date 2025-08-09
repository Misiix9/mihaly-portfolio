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
  }
  const el = ensureJsonLd(id)
  el.textContent = JSON.stringify(data)
}
