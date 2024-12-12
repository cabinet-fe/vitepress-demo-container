import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { UltraUIResolver } from 'vite-helper'
import dts from 'vite-plugin-dts'

console.log(path.resolve(__dirname, './index.ts'))

export default defineConfig({
  build: {
    emptyOutDir: true,

    outDir: path.resolve(__dirname, '../../dist/components'),

    lib: {
      entry: {
        index: path.resolve(__dirname, './index.ts')
      },

      formats: ['es']
    },

    rollupOptions: {
      external: ['vue', 'vitepress'],
      output: {
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },

  plugins: [
    vue(),
    dts(),
    Components({
      resolvers: [UltraUIResolver]
    })
  ]
})
