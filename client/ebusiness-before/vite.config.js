import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        'comps': path.join(__dirname, './src/components'),
        'views': path.join(__dirname, './src/views'),
        'routes': path.join(__dirname, './src/routes'),
      }
    }
  },
  define: {
    'process.env': {}
  },
  base: './',
  outDir: './dist',
  devServer: {
    port: 8000
  },
  publicPath: '/ebusiness-before/',
  transpileDependencies: true
})