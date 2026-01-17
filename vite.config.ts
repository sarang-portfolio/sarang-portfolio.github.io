import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js into its own chunk
          'three-vendor': ['three'],
          'react-three': ['@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Target modern browsers only
    target: 'esnext',
    // Increase chunk size warning limit (Three.js is large)
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
