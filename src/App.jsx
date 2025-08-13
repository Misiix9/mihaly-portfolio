import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ToastProvider } from './components/ui/ToastProvider'
import MagneticCursor from './components/ui/MagneticCursor'
// import { initSmoothScrolling, destroySmoothScrolling } from './lib/scroll/smoothScroll-enhanced'

function App() {
  // Commented out duplicate Lenis initialization - already initialized in main.jsx
  // useEffect(() => {
  //   // Initialize smooth scrolling
  //   initSmoothScrolling()

  //   // Cleanup on unmount
  //   return () => {
  //     destroySmoothScrolling()
  //   }
  // }, [])

  return (
    <ToastProvider>
      <MagneticCursor />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
