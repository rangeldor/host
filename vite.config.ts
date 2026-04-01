import { defineConfig } from 'vite'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
  },
  build: {
    target: 'esnext',
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'host',
      remotes: {
        auth: {
          type: 'module',
          name: 'auth',
          entry: 'http://localhost:3005/remoteEntry.js',
        },
        products: {
          type: 'module',
          name: 'products',
          entry: 'http://localhost:3006/remoteEntry.js',
        },
        orders: {
          type: 'module',
          name: 'orders',
          entry: 'http://localhost:3007/remoteEntry.js',
        },
      },
      shared: {
        react: { singleton: true, requiredVersion: '18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '18.3.1' },
        'react-router': { singleton: true },
        'react-router-dom': { singleton: true },
        nuqs: { singleton: true, requiredVersion: '2.8.9' },
        '@tanstack/react-query': { singleton: true, requiredVersion: '5.96.1' },
      },
    }),
  ],
})
