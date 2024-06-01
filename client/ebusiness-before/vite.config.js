import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
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
  devServer: {
    port: 8000
  },
  publicPath: '/ebusiness-before/',
  transpileDependencies: true
})