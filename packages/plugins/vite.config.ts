import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, '../../dist/plugins'),
    lib: {
      entry: {
        index: path.resolve(__dirname, 'index.ts')
      },
      formats: ['es']
    },

    rollupOptions: {
      external: ['markdown-it', 'vitepress', 'path', 'fs'],
      output: {
        chunkFileNames: '[name]-[hash].js'
      }
    }
  },

  plugins: [dts()]
})
