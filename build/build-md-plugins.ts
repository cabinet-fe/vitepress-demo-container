import { build } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export async function buildMdPlugins() {
  await build({
    build: {
      emptyOutDir: true,
      outDir: path.resolve(__dirname, '../dist/plugins'),
      lib: {
        entry: {
          index: path.resolve(__dirname, '../lib/plugins/index.ts')
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

    plugins: [
      dts({ tsconfigPath: path.resolve(__dirname, '../lib/tsconfig.json') })
    ]
  })
}
