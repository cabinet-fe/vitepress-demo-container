import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'VitePressDemoContainer',
      formats: ['es'],
      fileName: format => `vitepress-demo-container.${format}.js`
    },

    rollupOptions: {
      external: ['vue', 'markdown-it', 'vitepress', 'path', 'fs'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },

  plugins: [vue()]
})
