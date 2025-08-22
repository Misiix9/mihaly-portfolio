import React from 'react'
import { useTranslation } from 'react-i18next'

export default function StructuredData() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const baseUrl = 'https://selora.dev'
  
  // Person/Professional Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Selora",
    "alternateName": "Selora",
    "url": baseUrl,
    "image": `${baseUrl}/og-image.svg`,
    "sameAs": [
      "https://github.com/Misiix9",
      "https://instagram.com/gyr.misi",
      "https://linkedin.com/in/mihaly-gyori"
    ],
    "jobTitle": currentLang === 'hu' ? "Frontend Fejlesztő & Digitális Stúdió" : "Frontend Developer & Digital Studio",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance",
      "url": baseUrl
    },
    "knowsAbout": [
      "Frontend Development",
      "React",
      "JavaScript",
      "TypeScript",
      "Vue.js",
      "UI/UX Design",
      "Web Performance",
      "SEO Optimization"
    ],
    "email": "hi@selora.dev",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "HU",
      "addressRegion": "Hungary"
    },
    "description": currentLang === 'hu' 
      ? "Kreatív frontend fejlesztő, aki modern technológiákkal építi a jövő webes élményeit."
      : "Creative frontend studio crafting the future of web experiences with modern technologies."
  }

  // Organization Schema for Freelance Work
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Selora - Frontend Development",
    "alternateName": "MG Dev",
    "url": baseUrl,
    "logo": `${baseUrl}/og-image.svg`,
    "image": `${baseUrl}/og-image.svg`,
    "description": currentLang === 'hu'
      ? "Professzionális frontend fejlesztési szolgáltatások modern technológiákkal."
      : "Professional frontend development services with modern technologies.",
    "founder": {
      "@type": "Person",
      "name": "Selora"
    },
    "foundingDate": "2023",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "HU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hi@selora.dev",
      "contactType": "customer service",
      "availableLanguage": ["Hungarian", "English"]
    },
    "offers": [
      {
        "@type": "Service",
        "name": currentLang === 'hu' ? "Frontend Fejlesztés" : "Frontend Development",
        "description": currentLang === 'hu' 
          ? "Modern, reszponzív weboldalak és alkalmazások fejlesztése"
          : "Modern, responsive website and application development"
      },
      {
        "@type": "Service", 
        "name": currentLang === 'hu' ? "UI/UX Tervezés" : "UI/UX Design",
        "description": currentLang === 'hu'
          ? "Felhasználóbarát interfészek és élmények tervezése"
          : "User-friendly interface and experience design"
      },
      {
        "@type": "Service",
        "name": currentLang === 'hu' ? "Teljesítmény Optimalizálás" : "Performance Optimization", 
        "description": currentLang === 'hu'
          ? "Weboldal sebesség és teljesítmény javítása"
          : "Website speed and performance improvement"
      }
    ]
  }

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Selora - Frontend Developer Portfolio",
    "alternateName": "MG Dev Portfolio",
    "url": baseUrl,
    "description": currentLang === 'hu'
      ? "Selora frontend fejlesztő portfólió - Modern webes élmények és alkalmazások."
      : "Selora frontend developer portfolio - Modern web experiences and applications.",
    "author": {
      "@type": "Person",
      "name": "Selora"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Selora - Frontend Development"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": [
      {
        "@type": "Language",
        "name": "Hungarian",
        "alternateName": "hu"
      },
      {
        "@type": "Language", 
        "name": "English",
        "alternateName": "en"
      }
    ]
  }

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": currentLang === 'hu' ? "Főoldal" : "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2, 
        "name": currentLang === 'hu' ? "Rólam" : "About",
        "item": `${baseUrl}#about`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentLang === 'hu' ? "Készségek" : "Skills", 
        "item": `${baseUrl}#skills`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": currentLang === 'hu' ? "Projektek" : "Projects",
        "item": `${baseUrl}#projects`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": currentLang === 'hu' ? "Kapcsolat" : "Contact",
        "item": `${baseUrl}#contact`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}
