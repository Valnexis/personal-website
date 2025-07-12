import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'My Resume',
        short_name: 'Resume',
        description: 'My personal resume website',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,ttf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],

  // Configure development server to add caching headers for static assets
  server: {
    headers: {
      // Cache static assets for 1 day during development
      '*.js': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.css': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.woff': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.woff2': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.ttf': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.png': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.jpg': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.jpeg': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.svg': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.webp': {
        'Cache-Control': 'public, max-age=86400'
      },
      '*.ico': {
        'Cache-Control': 'public, max-age=86400'
      }
    }
  },

  // Configure build output to add cache-busting and set up for optimal caching
  build: {
    // Add hash to file names for cache busting
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
