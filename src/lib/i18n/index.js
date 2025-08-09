import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '../../locales/en.json'
import hu from '../../locales/hu.json'

let initialized = false

export function setupI18n() {
  if (initialized) return i18n

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        hu: { translation: hu },
      },
      fallbackLng: 'en',
      supportedLngs: ['en', 'hu'],
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupQuerystring: 'lang',
      },
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })

  initialized = true
  return i18n
}

export function setLanguage(lang) {
  return i18n.changeLanguage(lang)
}

export default i18n
