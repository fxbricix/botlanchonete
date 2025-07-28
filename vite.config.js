import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/botlanchonete/',
  define: {
    'process.env': {}
  },
  publicDir: 'public',
  server: {
    proxy: {
      '/api': {
        target: 'https://dathost.net',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
