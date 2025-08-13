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
    extend: {},
  },
  plugins: [],
}
