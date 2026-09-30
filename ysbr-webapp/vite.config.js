import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seo from './vite-seo.js'

// Una voce per ogni pagina HTML del sito: ognuna finisce in dist/ allo stesso
// percorso (kitesurf/index.html -> www.ysbr.it/kitesurf/)
const pages = {
  main: 'index.html',
  kitesurf: 'kitesurf/index.html',
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seo()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, file]) => [
          name,
          fileURLToPath(new URL(file, import.meta.url)),
        ])
      ),
    },
  },
})
