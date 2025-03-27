import { defineConfig } from 'vitepress'
import { DemoContainer } from '../../packages/plugins'
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
    ],
    footer: {
      message: '基于MIT协议发布',
      copyright: 'Copyright © 2022-现在 元智慧前端'
    }
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
