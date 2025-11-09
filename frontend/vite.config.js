// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections
    port: 5174,
    proxy: {
      '/graphql': {
        target: 'http://express-api:5050',
        changeOrigin: true,
      }
    }
  }
})