import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
    allowedHosts: ['serwis-demo.tczke.ovh'], // Only allow this domain
    headers: {
      'Access-Control-Allow-Origin': 'https://serwis-demo.tczke.ovh',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': "default-src 'self' https://serwis-demo.tczke.ovh"
    }
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    allowedHosts: ['serwis-demo.tczke.ovh'], // Only allow this domain for dev server too
    headers: {
      'Access-Control-Allow-Origin': 'https://serwis-demo.tczke.ovh'
    }
  }
})