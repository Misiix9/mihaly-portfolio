import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastCtx = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const push = useCallback((payload) => {
    const id = ++idCounter
    const toast = {
      id,
      type: payload.type || 'info',
      message: payload.message,
      duration: payload.duration ?? 3000,
    }
    setToasts((t) => [...t, toast])
    if (toast.duration > 0) {
      setTimeout(() => remove(id), toast.duration)
    }
    return id
  }, [remove])

  const value = useMemo(() => ({ push, remove }), [push, remove])

  return (
    <ToastCtx.Provider value={value}>
      {children}
      {/* Toast container */}
      <div className="pointer-events-none fixed top-4 right-4 z-[9999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              'pointer-events-auto select-none rounded-md border px-4 py-2 shadow-md backdrop-blur',
              'text-sm',
              'transition-opacity',
              t.type === 'success' && 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
              t.type === 'error' && 'border-red-500/30 bg-red-500/10 text-red-200',
              t.type === 'info' && 'border-white/20 bg-white/10 text-white/90',
            ].filter(Boolean).join(' ')}
            onClick={() => remove(t.id)}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastCtx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
