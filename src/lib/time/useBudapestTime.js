import { useEffect, useState } from 'react'

// Returns a time string for Europe/Budapest, updated every minute
export default function useBudapestTime() {
  const [time, setTime] = useState(() => formatBudapestTime(new Date()))

  useEffect(() => {
    const update = () => setTime(formatBudapestTime(new Date()))
    // Align update to next minute boundary for neatness
    const now = new Date()
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
    let intervalId
    const timeout = setTimeout(() => {
      update()
      intervalId = setInterval(update, 60 * 1000)
    }, msToNextMinute)

    return () => {
      clearTimeout(timeout)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  return time
}

function formatBudapestTime(date) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Europe/Budapest'
    }).format(date)
  } catch {
    // Fallback without timezone if Intl or TZ not available
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
}
