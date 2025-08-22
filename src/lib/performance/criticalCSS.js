// Critical CSS utilities for above-the-fold optimization

// Extract and inline critical CSS for hero section
export const criticalCSS = `
  /* Critical styles for hero section and initial paint */
  :root {
    --color-primary: #000000;
    --color-secondary: #ffffff;
    --color-gray-50: #fafafa;
    --color-gray-100: #f5f5f5;
    --color-gray-200: #e5e5e5;
    --color-gray-300: #d4d4d4;
    --color-gray-400: #a3a3a3;
    --color-gray-500: #737373;
    --color-gray-600: #525252;
    --color-gray-700: #404040;
    --color-gray-800: #262626;
    --color-gray-900: #171717;
    --color-gray-950: #0a0a0a;
  }

  /* Typography - critical */
  /* Using Google Fonts (Lexend) via <link> in index.html */

  /* Base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--color-gray-900);
    background-color: var(--color-gray-50);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Hero section critical styles */
  .hero-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
  }

  .hero-title {
    font-size: clamp(2.5rem, 8vw, 6rem);
    font-weight: 700;
    line-height: 1.1;
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #d4d4d4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
  }

  .hero-subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 400;
    color: var(--color-gray-200);
    text-align: center;
    margin-top: 1rem;
  }

  /* Navigation critical styles */
  .nav-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--color-gray-800);
  }

  /* Button critical styles */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
    font-weight: 600;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-primary:hover {
    background-color: var(--color-gray-200);
    transform: translateY(-1px);
  }

  /* Layout utilities */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section {
    padding: 4rem 0;
  }

  .flex {
    display: flex;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .text-center {
    text-align: center;
  }

  /* Responsive utilities */
  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }
    
    .section {
      padding: 2rem 0;
    }
  }
`

// Function to inject critical CSS
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return

  const styleElement = document.createElement('style')
  styleElement.textContent = criticalCSS
  styleElement.setAttribute('data-critical', 'true')
  
  // Insert before other stylesheets
  const firstLink = document.querySelector('link[rel="stylesheet"]')
  if (firstLink) {
    firstLink.parentNode.insertBefore(styleElement, firstLink)
  } else {
    document.head.appendChild(styleElement)
  }
}

// Font preloading
export const preloadFonts = () => {
  if (typeof document === 'undefined') return

  // Local font preloading disabled — using Google Fonts via <link> in index.html
}

// Resource hints
export const addResourceHints = () => {
  if (typeof document === 'undefined') return

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//api.emailjs.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
    { rel: 'preconnect', href: 'https://api.emailjs.com', crossOrigin: true }
  ]

  hints.forEach(hint => {
    const link = document.createElement('link')
    Object.assign(link, hint)
    document.head.appendChild(link)
  })
}

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  injectCriticalCSS()
  preloadFonts()
  addResourceHints()
}
