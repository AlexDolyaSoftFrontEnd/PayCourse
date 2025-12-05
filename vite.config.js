/**
 * Vite Configuration for PayCourse
 * 
 * Optimized build configuration with:
 * - Code splitting and vendor bundling
 * - Asset organization by type
 * - Production minification with console removal
 * - Development server with HMR
 * 
 * @see https://vite.dev/config/
 */

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`
          } else if (ext === 'js') {
            return `js/[name]-[hash][extname]`
          }
          return `[name]-[hash][extname]`
        },
      },
    },
    sourcemap: false,
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  preview: {
    port: 4173,
  },
  define: {
    __DEV__: 'true',
  },
  esbuild: {
    logLevel: 'silent',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
