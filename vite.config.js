import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd())
  
  const isDev = mode === 'development';
  const apiBaseUrl = isDev ? '/api' : 'https://corebyte-backendapplication.azurewebsites.net';
  
  return {
    plugins: [vue()],
    server: isDev ? {
      proxy: {
        // Proxy API requests to the backend server in development
        '/api': {
          target: 'https://corebyte-backendapplication.azurewebsites.net',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.error('Proxy error:', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Proxying request:', req.method, req.url);
              // Forward the origin header
              if (req.headers.origin) {
                proxyReq.setHeader('Origin', req.headers.origin);
              }
              // Add any other required headers
              proxyReq.setHeader('Accept', 'application/json');
            });
          }
        }
      },
      port: 5173,
      strictPort: true,
      open: true,
      cors: {
        origin: 'http://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type,Authorization,X-Requested-With',
        credentials: true,
        optionsSuccessStatus: 204
      }
    } : undefined,
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl)
    }
  }
})
