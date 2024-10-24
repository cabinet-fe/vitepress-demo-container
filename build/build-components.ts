import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { UltraUIResolver } from 'vite-helper'
import dts from 'vite-plugin-dts'

export async function buildComponents() {
  await build({
    build: {
      emptyOutDir: true,
      outDir: path.resolve(__dirname, '../dist/components'),
      lib: {
        entry: {
          index: path.resolve(__dirname, '../lib/components/index.ts')
        },

        formats: ['es']
      },

      rollupOptions: {
        external: ['vue', 'vitepress'],
        output: {
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name].[hash].[ext]'
        }
      }
    },

    plugins: [
      vue(),
      dts({
        tsconfigPath: path.resolve(__dirname, '../lib/tsconfig.json')
      }),
      Components({ resolvers: [UltraUIResolver] })
    ]
  })
}
