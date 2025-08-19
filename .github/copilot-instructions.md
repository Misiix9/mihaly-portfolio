# Mihály Portfolio - AI Coding Instructions

## Project Overview
React portfolio site with advanced animations, performance optimizations, and bilingual i18n support. Built with Vite, deployed to GitHub Pages at `/mihaly-portfolio/` base path.

## Architecture Patterns

### Component Structure
- **Layout-first approach**: Single `Layout.jsx` contains all sections (Hero, About, Skills, Projects, Contact)
- **UI components** in `src/components/ui/` for reusable elements (buttons, cards, animations)
- **Section components** in `src/components/` for main content areas
- **Library modules** in `src/lib/` organized by domain (animations, i18n, performance, scroll, seo)

### Animation System
- **GSAP + Lenis**: Core animation stack with `smoothScroll.js` and `gsapBridge.js` integration
- **Reduced motion support**: All animations check `useReducedMotion()` hook and respect user preferences
- **Parallax system**: Global intensity control via `setParallaxGlobalIntensity()` in `lib/anim/parallax.js`
- **Micro-interactions**: Use `useInteractiveEffect()` from `lib/anim/useMicroInteractions.js` for hover/focus effects
- **Magnetic cursor**: Custom cursor with `MagneticCursor.jsx` - adds `data-magnetic` attributes to interactive elements

### Internationalization (i18n)
- **react-i18next**: Setup in `lib/i18n/index.js` with localStorage persistence
- **Language files**: `src/locales/en.json` and `hu.json` with nested object structure
- **Translation hook**: Use `const { t } = useTranslation()` and access with dot notation: `t('hero.title')`
- **Language switching**: `LanguageSwitch` component with URL query parameter support

### Performance Architecture
- **Web Vitals monitoring**: `lib/performance/webVitals.js` tracks CLS, FCP, LCP with optimization helpers
- **Critical CSS**: Performance optimizations in `lib/performance/criticalCSS.js`
- **Bundle splitting**: Vite config has manual chunks for `three`, `lottie`, and `gsap` libraries
- **Legacy support**: Vite legacy plugin with specific polyfills for older browsers

## Development Workflows

### Key Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint checking
```

### Deployment (GitHub Pages)
1. Build: `npm run build`
2. Deploy: `git subtree push --prefix dist origin gh-pages`
3. Base path is configured in `vite.config.js` as `/mihaly-portfolio/`

## Styling Conventions

### Tailwind Setup
- **Glass morphism**: Extensive use of `bg-white/10`, `backdrop-blur-sm` patterns
- **Custom colors**: Extended white opacity variants (`white/5` to `white/90`)
- **Safelist**: Dynamic classes for monochrome variations and decorative elements
- **Font**: Lexend font family with weights 300-700

### Component Patterns
- **Glass containers**: `bg-white/6 backdrop-blur-md border border-white/10`
- **Hover effects**: Combine with GSAP animations, not just CSS transitions
- **Responsive**: Mobile-first approach with `sm:`, `md:`, `lg:` breakpoints

## Critical Integration Points

### Initialization Sequence (main.jsx)
1. Performance optimizations (critical CSS, web vitals)
2. Smooth scroll setup (Lenis)
3. GSAP-Lenis bridge
4. Reduced motion detection and parallax setup
5. i18n initialization
6. Analytics (GA4) setup
7. SEO meta and schema injection

### Animation Dependencies
- **GSAP ScrollTrigger**: Requires proper Lenis integration via `gsapBridge.js`
- **Mouse events**: Parallax and magnetic effects share mouse position tracking
- **Performance**: All animations should check `useReducedMotion()` before initialization

### SEO Integration
- **Structured data**: Person schema injected in `main.jsx`
- **Meta tags**: Dynamic SEO components in `components/seo/`
- **Image optimization**: Aspect ratios preserved for CLS prevention

## Common Pitfalls

### Animation Issues
- Always import `useReducedMotion` and check before complex animations
- Use `globalIntensity` from parallax system for motion-sensitive users
- Cleanup animation listeners in `useEffect` cleanup functions

### Performance
- Monitor bundle size when adding new libraries
- Use manual chunks in Vite config for large dependencies
- Test Web Vitals locally before pushing changes

### i18n
- New translation keys must be added to both `en.json` and `hu.json`
- Use nested objects for organization: `hero.roles.developer`
- Language switching preserves current page state via localStorage
