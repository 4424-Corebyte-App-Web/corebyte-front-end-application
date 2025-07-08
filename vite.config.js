import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/api': {
        target: 'https://localhost:7164',
        changeOrigin: true,
        secure: false, // Disable SSL verification for local development
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 5173,
    strictPort: true,
    open: true
  },
  // Update environment variables to use the proxy
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify('/api')
  }
})
