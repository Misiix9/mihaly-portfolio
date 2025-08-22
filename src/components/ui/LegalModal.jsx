import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function LegalModal({ isOpen, onClose, docKey }) {
  const { i18n } = useTranslation()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  // Load markdown content for the selected doc and language
  useEffect(() => {
    const load = async () => {
      if (!isOpen || !docKey) return
      setLoading(true)
      setError('')
      try {
        const lang = i18n.language?.startsWith('hu') ? 'hu' : 'en'
        const res = await fetch(`/legal/${lang}/${docKey}.md`, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        setContent(text)
      } catch {
        setError('Failed to load content.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [isOpen, docKey, i18n.language])

  // Basic escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && isOpen) onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <div
        ref={contentRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-black/90 p-6 text-white/90 prose prose-invert prose-sm sm:prose-base"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Legal content"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-lg px-2 py-1 text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Close"
        >
          ✕
        </button>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && !error && (
          <article>
            {/* Render markdown safely by converting simple line breaks */}
            {/* For simplicity, we allow basic markdown via a minimal parser */}
            <Markdown text={content} />
          </article>
        )}
      </div>
    </div>
  )
}

function Markdown({ text }) {
  // Minimal markdown renderer: headings, bold/italic, links, lists, paragraphs.
  const html = text
    .replace(/^######\s?(.*)$/gim, '<h6>$1</h6>')
    .replace(/^#####\s?(.*)$/gim, '<h5>$1</h5>')
    .replace(/^####\s?(.*)$/gim, '<h4>$1</h4>')
    .replace(/^###\s?(.*)$/gim, '<h3>$1</h3>')
    .replace(/^##\s?(.*)$/gim, '<h2>$1</h2>')
    .replace(/^#\s?(.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>')
    .replace(/\n-\s(.*)/g, '<ul><li>$1</li></ul>')
    .replace(/\n\n/g, '</p><p>')

  return <div dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }} />
}
