import { defineConfig } from 'vitepress'
import { DemoContainer } from '../../lib/plugin'
import { UltraUIResolver } from 'vite-helper'
import Components from 'unplugin-vue-components/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Demo容器',
  description: '基于vitepress快捷生成你的文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/cabinet-fe/vitepress-demo-container'
      }
    ]
  },

  markdown: {
    config: md => {
      md.use(DemoContainer)
    }
  },

  vite: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    server: {
      port: 5183
    },
    plugins: [
      Components({
        resolvers: [UltraUIResolver]
      })
    ]
  }
})
