import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      // Proxy pour éviter les problèmes CORS en développement
      proxy: mode === 'development' ? {
        '/api': {
          target: env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
        }
      } : undefined
    },
    build: {
      // Configuration pour la production
      outDir: 'dist',
      sourcemap: mode === 'development',
    },
    define: {
      // Rendre les variables d'environnement disponibles
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    }
  }
})