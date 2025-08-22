import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function SEOHead({ 
  title,
  description,
  image = '/og-image.svg',
  type = 'website',
  section = 'home'
}) {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const baseUrl = 'https://selora.dev'
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  
  // Dynamic titles and descriptions per language and section
  const seoContent = {
    en: {
      home: {
        title: 'Selora - Frontend Developer & Digital Studio',
        description: 'Creative frontend developer crafting exceptional web experiences with React, Vue.js, and modern technologies. Available for freelance projects and collaborations.'
      },
      about: {
        title: 'About Selora - Frontend Developer & Designer',
        description: 'Learn about my journey as a frontend developer, my passion for clean code, and my commitment to creating user-centered digital experiences.'
      },
      skills: {
        title: 'Skills & Technologies - Frontend Development Expertise',
        description: 'Explore my technical skills in React, Vue.js, JavaScript, TypeScript, UI/UX design, and modern web development technologies.'
      },
      projects: {
        title: 'Projects & Portfolio - Frontend Development Work',
        description: 'Discover my latest frontend development projects, including web applications, UI/UX designs, and innovative digital solutions.'
      },
      contact: {
        title: 'Contact Selora - Hire a Frontend Developer',
        description: 'Ready to start your next project? Get in touch with me for frontend development, UI/UX design, and web application consulting.'
      }
    },
    hu: {
      home: {
        title: 'Selora - Frontend Fejlesztő & Digitális Stúdió',
        description: 'Kreatív frontend fejlesztő, aki kivételes webes élményeket alkot React, Vue.js és modern technológiákkal. Elérhető szabadúszó projektekhez.'
      },
      about: {
        title: 'Rólam - Selora Frontend Fejlesztő & Tervező',
        description: 'Ismerje meg utamat frontend fejlesztőként, a tiszta kód iránti szenvedélyemet és elkötelezettségemet a felhasználó-központú digitális élmények iránt.'
      },
      skills: {
        title: 'Készségek & Technológiák - Frontend Fejlesztési Szakértelem',
        description: 'Fedezze fel technikai készségeimet React, Vue.js, JavaScript, TypeScript, UI/UX tervezés és modern webfejlesztési technológiák terén.'
      },
      projects: {
        title: 'Projektek & Portfólió - Frontend Fejlesztési Munkák',
        description: 'Tekintse meg legújabb frontend fejlesztési projektjeimet, beleértve webalkalmazásokat, UI/UX tervezéseket és innovatív digitális megoldásokat.'
      },
      contact: {
        title: 'Kapcsolat - Selora Frontend Fejlesztő Felvétele',
        description: 'Készen áll a következő projektjére? Vegye fel velem a kapcsolatot frontend fejlesztés, UI/UX tervezés és webalkalmazás tanácsadás ügyében.'
      }
    }
  }

  const currentContent = seoContent[currentLang]?.[section] || seoContent[currentLang]?.home || seoContent.en.home
  const finalTitle = title || currentContent.title
  const finalDescription = description || currentContent.description

  // Language-specific canonical URLs
  const canonicalUrl = `${baseUrl}${currentLang === 'hu' ? '/hu' : ''}`
  const alternateUrl = `${baseUrl}${currentLang === 'en' ? '/hu' : ''}`

  useEffect(() => {
    // Update document title
    document.title = finalTitle

    // Helper function to update or create meta tags
    const updateMeta = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Helper function to update or create link tags
    const updateLink = (rel, href, hreflang = null) => {
      const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
      let link = document.querySelector(selector)
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        if (hreflang) link.setAttribute('hreflang', hreflang)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
    }

    // Basic meta tags
    updateMeta('description', finalDescription)
    updateMeta('keywords', currentLang === 'hu' 
      ? "frontend fejlesztő, webfejlesztő, React fejlesztő, Vue.js fejlesztő, UI/UX tervező, JavaScript, TypeScript, magyar fejlesztő"
      : "frontend developer, web developer, React developer, Vue.js developer, UI/UX designer, JavaScript, TypeScript, Hungarian developer"
    )
    updateMeta('author', 'Selora')
    updateMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
    updateMeta('language', currentLang)
    updateMeta('geo.region', 'HU')
    updateMeta('geo.country', 'Hungary')

    // Open Graph tags
    updateMeta('og:type', type, true)
    updateMeta('og:title', finalTitle, true)
    updateMeta('og:description', finalDescription, true)
    updateMeta('og:image', fullImageUrl, true)
    updateMeta('og:image:alt', currentLang === 'hu' 
      ? "Selora Frontend Fejlesztő Portfólió"
      : "Selora Frontend Developer Portfolio", true)
    updateMeta('og:url', canonicalUrl, true)
    updateMeta('og:site_name', 'Selora', true)
    updateMeta('og:locale', currentLang === 'hu' ? 'hu_HU' : 'en_US', true)

    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image')
    updateMeta('twitter:title', finalTitle)
    updateMeta('twitter:description', finalDescription)
    updateMeta('twitter:image', fullImageUrl)
    updateMeta('twitter:image:alt', currentLang === 'hu' 
      ? "Selora Frontend Fejlesztő Portfólió"
      : "Selora Frontend Developer Portfolio")
    updateMeta('twitter:creator', '@gyr_misi')
    updateMeta('twitter:site', '@gyr_misi')

    // Theme and application
    updateMeta('theme-color', '#000000')
    updateMeta('msapplication-TileColor', '#000000')
    updateMeta('application-name', 'Selora')

    // Canonical and alternate URLs
    updateLink('canonical', canonicalUrl)
    updateLink('alternate', alternateUrl, currentLang === 'en' ? 'hu' : 'en')
    updateLink('alternate', baseUrl, 'x-default')

  }, [finalTitle, finalDescription, fullImageUrl, type, canonicalUrl, alternateUrl, currentLang])

  return null // This component doesn't render anything
}
