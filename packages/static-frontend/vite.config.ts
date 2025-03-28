import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
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
    allowedHosts: ['serwis-demo.tczke.ovh']
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true
  }
})
