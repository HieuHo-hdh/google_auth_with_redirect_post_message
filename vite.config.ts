import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Explicitly set to localhost
    port: 3333, // Use port 3333
    strictPort: true, // Fail if port 3333 is already in use
  },
})
