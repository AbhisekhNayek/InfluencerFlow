import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Ensure it's accessible externally
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173, // Use the PORT env variable or fallback to 5173
    allowedHosts: [
      'micromatch.onrender.com', // Add your Render host here
    ],
  },

  plugins: [
    react(),
    tailwindcss(),
  ],
})
