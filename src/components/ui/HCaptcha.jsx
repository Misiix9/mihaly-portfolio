import React, { useEffect, useRef, useState } from 'react'

// Lazy load hCaptcha script and render widget.
export default function HCaptcha({ siteKey = import.meta.env.VITE_HCAPTCHA_SITEKEY, onVerify, className = '' }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!siteKey) {
      console.warn('HCaptcha: missing VITE_HCAPTCHA_SITEKEY')
      return
    }
    const ensureScript = () => new Promise((resolve) => {
      if (window.hcaptcha) return resolve()
      const s = document.createElement('script')
      s.src = 'https://hcaptcha.com/1/api.js?render=explicit'
      s.async = true
      s.defer = true
      s.onload = () => resolve()
      document.head.appendChild(s)
    })

    let cancelled = false
    ensureScript().then(() => {
      if (cancelled) return
      setReady(true)
    })

    return () => { cancelled = true }
  }, [siteKey])

  useEffect(() => {
    if (!ready || !containerRef.current || !window.hcaptcha || widgetIdRef.current != null) return
    widgetIdRef.current = window.hcaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onVerify?.(token),
      'error-callback': () => onVerify?.(null),
      'expired-callback': () => onVerify?.(null),
      theme: 'dark',
      size: 'normal',
    })
  }, [ready, siteKey, onVerify])

  return (
    <div className={className}>
      <div ref={containerRef} className="h-captcha" />
    </div>
  )
}
