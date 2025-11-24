import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})

