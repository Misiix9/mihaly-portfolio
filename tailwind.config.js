/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Opacity-based monochrome utilities frequently used in JSX
    'text-white/50', 'text-white/60', 'text-white/70', 'text-white/80', 'text-white/90',
    'bg-white/4', 'bg-white/5', 'bg-white/6', 'bg-white/8', 'bg-white/10', 'bg-white/12',
    'border-white/10', 'border-white/12', 'border-white/15', 'border-white/20', 'border-white/30',
    // Sizes used for decorative lines
    'h-px', 'w-28', 'w-32', 'w-40',
    // Shadows and blur helpers
    'blur-2xl', 'blur-3xl', 'shadow-[0_10px_30px_-15px_rgba(0,0,0,0.7)]',
    // Grid/spacing variants used in cards/sections
    'p-[1px]', 'bg-gradient-to-b', 'from-white/20', 'to-white/5',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Lexend', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      colors: {
        gray: {
          950: '#0a0a0a',
          900: '#171717',
          850: '#262626',
          800: '#404040',
          700: '#525252',
          600: '#737373',
          500: '#a3a3a3',
          400: '#d4d4d4',
          300: '#e5e5e5',
          200: '#f5f5f5',
          100: '#fafafa',
        },
        white: {
          DEFAULT: '#ffffff',
          5: 'rgba(255, 255, 255, 0.05)',
          10: 'rgba(255, 255, 255, 0.10)',
          15: 'rgba(255, 255, 255, 0.15)',
          20: 'rgba(255, 255, 255, 0.20)',
          30: 'rgba(255, 255, 255, 0.30)',
          40: 'rgba(255, 255, 255, 0.40)',
          50: 'rgba(255, 255, 255, 0.50)',
          60: 'rgba(255, 255, 255, 0.60)',
          70: 'rgba(255, 255, 255, 0.70)',
          80: 'rgba(255, 255, 255, 0.80)',
          90: 'rgba(255, 255, 255, 0.90)',
        }
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-hero': 'radial-gradient(600px 300px at 50% 0%, rgba(255,255,255,0.06), transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
