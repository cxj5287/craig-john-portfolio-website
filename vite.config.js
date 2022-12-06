import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
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
      } ,
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
              return 'assets/images/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]';   
          }
 
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return 'assets/[name]-[hash][extname]';
        },
      },
    }
    
  }
})
