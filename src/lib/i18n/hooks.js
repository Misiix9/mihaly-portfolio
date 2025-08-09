import { useEffect, useState } from 'react'
import i18n from './index.js'

// Returns current short language ('en'|'hu') and a setter
export function useLanguage() {
  const [lang, setLang] = useState(short(i18n.language))

  useEffect(() => {
    const onChanged = (lng) => setLang(short(lng))
    i18n.on('languageChanged', onChanged)
    return () => i18n.off('languageChanged', onChanged)
  }, [])

  const setLanguage = (lng) => i18n.changeLanguage(lng)
  return [lang, setLanguage]
}

export function short(lng) {
  return (lng || 'en').slice(0, 2) === 'hu' ? 'hu' : 'en'
}

// For explicit persistence checks; i18next-browser-languagedetector already persists to localStorage
export const STORAGE_KEY = 'i18nextLng'
export function getPersistedLanguage() {
  if (typeof window === 'undefined') return null
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v ? short(v) : null
}
