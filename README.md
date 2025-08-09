# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (GitHub Pages — manual)

This project is configured for a GitHub Pages project site under:

- https://Misiix9.github.io/mihaly-portfolio/

Vite base is already set in `vite.config.js`:

```js
// vite.config.js
export default defineConfig({
  base: '/mihaly-portfolio/',
})
```

We also include an SPA fallback at `public/404.html` so deep links work when hosted on Pages.

### Steps

1) Install deps and build

```bash
npm install
npm run build
```

2) Publish `dist/` to a `gh-pages` branch (option A: git subtree)

```bash
git add -f dist
git commit -m "build: publish dist"
git subtree push --prefix dist origin gh-pages
```

If `git subtree` isn’t available or you prefer a clean branch (option B):

```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Initialize gh-pages"
git checkout main
npm run build
git checkout gh-pages
cp -R dist/* .
git add .
git commit -m "Deploy"
git push -u origin gh-pages
git checkout main
```

3) GitHub Pages settings

- Repository → Settings → Pages
- Source: Deploy from a branch
- Branch: `gh-pages` • Folder: `/ (root)` → Save

Within a minute or two, your site should be live at:

- https://Misiix9.github.io/mihaly-portfolio/

### Custom domain (later)

When you have a custom domain, add it in the Pages settings and create a `CNAME` DNS record pointing to GitHub Pages. Then you can remove or adjust the `base` in `vite.config.js` to `'/'` and update internal URLs if needed.
