import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
plugins: [react()],
  plugins: [react()],
  css: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
    },
    preprocessorOptions: {
      css: {
        // Exclude external library CSS from PostCSS processing
        exclude: [
          /node_modules.*\.css$/
        ]
      }
    }
  }
allowedHosts: true,
host: true,
strictPort: true,
port: 5173
})