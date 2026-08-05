import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default defineConfig({
  base: process.env.GHPAGES ? '/' : '/',
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        try { copyFileSync(resolve('dist/index.html'), resolve('dist/404.html')) } catch {}
      },
    },
  ],
})
