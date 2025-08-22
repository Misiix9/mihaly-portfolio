import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Selora',
        short_name: 'Portfolio',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: []
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2,woff}'],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/.*\.(?:js|css)(?:\?.*)?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-v1',
              expiration: { maxEntries: 60, maxAgeSeconds: 31536000 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Google Fonts stylesheets
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'gfonts-stylesheets',
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // Google Fonts font files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gfonts-webfonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 31536000 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\/fonts\/.*\.(?:woff2|woff|ttf)(?:\?.*)?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts-v1',
              expiration: { maxEntries: 30, maxAgeSeconds: 31536000 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\/images\/.*\.(?:png|jpg|jpeg|webp|svg)(?:\?.*)?$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-v1',
              expiration: { maxEntries: 60, maxAgeSeconds: 31536000 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // HTML/doc navigations
            urlPattern: /\/.*(?:\.html)?$/, 
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-v1',
              networkTimeoutSeconds: 3,
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  // Using custom domain - no base path needed
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          lottie: ['lottie-web'],
          gsap: ['gsap', 'gsap/ScrollTrigger'],
        },
      },
    },
  },
})
