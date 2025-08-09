import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { ToastProvider } from './components/ui/ToastProvider'

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </ToastProvider>
  )
}

export default App
