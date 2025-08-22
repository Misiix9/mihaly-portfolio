# Selora — Portfolio (React + Vite)

Desktop‑first, animated personal portfolio built with React + Vite. Monochrome design (black/white) with rich motion: scroll reveals, parallax, micro‑interactions, particles/blobs, and optional 3D/Three.js.

## Quick Start

```bash
# Install deps
npm install

# Start dev server
npm run dev

# Lint (if configured)
npm run lint

# Build for production
npm run build

# Preview local production build
npm run preview
```

## Tech Stack
- React (JavaScript) + Vite
- Styling: Tailwind CSS or CSS Modules (to be finalized)
- Animations: GSAP (+ ScrollTrigger), Lenis/Locomotive (smooth scroll)
- Advanced visuals: Lottie, Three.js/react‑three‑fiber (optional shaders)
- i18n: i18next or Lingui (HU/EN) with system language detection
- Analytics: Google Analytics 4 (GA4)
- Hosting: GitHub Pages

## Environment Variables
Create a `.env` (or `.env.local`) in the project root for local development. Prefix client‑side vars with `VITE_`.

Suggested variables (fill when features are wired):

```env
# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# reCAPTCHA (or hCaptcha if chosen)
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
# For serverless/email provider, you’ll also need the secret in that environment

# Email delivery (pick one approach later)
# Resend (serverless)
RESEND_API_KEY=your_resend_api_key
# EmailJS (client)
VITE_EMAILJS_SERVICE_ID=xxx
VITE_EMAILJS_TEMPLATE_ID=xxx
VITE_EMAILJS_PUBLIC_KEY=xxx

# i18n default fallback (optional)
VITE_DEFAULT_LANG=en
```

Do not commit actual secrets. Use repository secrets/CI vars for production.

Quick start: copy the template

```bash
cp .env.example .env
```

## Project Structure (planned)
```
src/
  components/
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    Contact.jsx
    Footer.jsx
    LanguageSwitch.jsx
    ui/
      MagneticButton.jsx
      ParticlesCanvas.jsx
  lib/
    i18n/
      index.js
    animations/
      gsap.js
    scroll/
      smoothScroll.js
    3d/
      scene.jsx
    seo/
      meta.ts
  locales/
    en.json
    hu.json
  styles/
    global.css
public/
  404.html        # SPA fallback (GitHub Pages)
  robots.txt
  sitemap.xml
vite.config.js
```

## GitHub Pages Deployment
1) Create a GitHub repository and push the project.
2) Configure Vite base (if deploying to `username.github.io/repo`): in `vite.config.js` set `base: '/repo/'`.
3) SPA fallback: add `public/404.html` that redirects to `index.html` (Vite preview uses `dist/` build; Pages needs 404 fallback for SPA routes).
4) Build: `npm run build` → outputs to `dist/`.
5) Deploy options:
   - Manual: push `dist/` to a `gh-pages` branch (e.g., using `git subtree` or `gh-pages` package), then enable GitHub Pages from that branch.
   - CI (recommended): add a GitHub Actions workflow to build and publish the `dist/` folder to Pages on push to `main`.
6) Set repository → Settings → Pages to serve from the published artifact/branch.

## Scripts (default Vite)
- `dev`: Start dev server with HMR
- `build`: Production build
- `preview`: Preview the production build locally

## i18n (HU/EN)
- Auto‑detect via browser language; fallback `en`.
- Animated switch toggles between HU/EN and persists user choice.

## Contact Form (planned)
- Fields: name, email, message
- CAPTCHA: Google reCAPTCHA (or hCaptcha)
- Delivery: Resend (serverless) or EmailJS
- Feedback: success/error toasts

## SEO & Analytics (planned)
- GA4 integration
- Meta tags (title/description), Open Graph/Twitter cards
- JSON‑LD Person schema
- `robots.txt` and `sitemap.xml`

## Development Notes
- Desktop‑first; graceful mobile layout
- Code‑split heavy visuals (Three.js), lazy‑load below the fold
- Keep animations cohesive and performant

## License
Private project for Selora’s portfolio.
