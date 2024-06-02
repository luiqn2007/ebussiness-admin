import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'comps': path.resolve(__dirname, './src/component'),
      'views': path.resolve(__dirname, './src/views'),
      'routes': path.resolve(__dirname, './src/routes'),
      'styles': path.resolve(__dirname, './src/styles'),
    }
  },
  define: {
    'process.env': {}
  },
  base: './',
  outDir: './dist',
  server: {
    port: 8000
  }
})
