import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../lib/i18n/index.js'

export default function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const [lang, setLang] = useState(i18n.language?.slice(0,2) === 'hu' ? 'hu' : 'en')

  // Keep local state in sync if i18n changes elsewhere
  useEffect(() => {
    const onChanged = (lng) => setLang(lng.slice(0,2) === 'hu' ? 'hu' : 'en')
    i18n.on('languageChanged', onChanged)
    return () => i18n.off('languageChanged', onChanged)
  }, [i18n])

  const labels = useMemo(() => ({ en: t('lang.en', 'EN'), hu: t('lang.hu', 'HU') }), [t])

  const toggle = () => {
    const next = lang === 'en' ? 'hu' : 'en'
    setLanguage(next)
  }

  return (
    <button
      type="button"
      aria-label={lang === 'en' ? 'Switch language to Hungarian' : 'Váltás angol nyelvre'}
      onClick={toggle}
      className="relative inline-flex items-center border border-white/20 hover:border-white/40 rounded-[var(--radius-md)] px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
    >
      <span className="relative h-5 w-10 overflow-hidden">
        <span
          className="absolute inset-0 grid place-items-center transition-transform duration-300"
          style={{ transform: lang === 'en' ? 'translateY(0%)' : 'translateY(-100%)' }}
        >
          <span className="text-xs tabular-nums tracking-wide">{labels.en}</span>
        </span>
        <span
          className="absolute inset-0 grid place-items-center transition-transform duration-300"
          style={{ transform: lang === 'en' ? 'translateY(100%)' : 'translateY(0%)' }}
        >
          <span className="text-xs tabular-nums tracking-wide">{labels.hu}</span>
        </span>
      </span>
    </button>
  )
}
