import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/craig-john-portfolio-website/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'pages/about.html'),
        otherworks: resolve(__dirname, 'pages/other_works.html'),
        projects: resolve(__dirname, 'pages/projects.html'),
        biomes: resolve(__dirname, 'pages/balancing_biomes.html'),
        bagend: resolve(__dirname, 'pages/bagend.html'),
        digitalman: resolve(__dirname, 'pages/digitalman.html'),
        junglestory: resolve(__dirname, 'pages/junglestory.html'),
        void: resolve(__dirname, 'pages/thevoid.html'),
        venus: resolve(__dirname, 'pages/venusian_landscape.html'),
        rebirth: resolve(__dirname, 'pages/rebirth.html'),
        fantascapes: resolve(__dirname, 'pages/fantascapes.html'),
      }
    }
  }
})