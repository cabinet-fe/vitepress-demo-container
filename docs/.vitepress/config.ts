import { defineConfig } from 'vitepress'
import { DemoContainer } from '../../src'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'demo容器',
  description: 'demo容器文档',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },

  markdown: {
    config: md => {
      md.use(DemoContainer)
    }
  }
})
