// https://vitepress.dev/guide/custom-theme
import { defineComponent, h, onMounted } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { VDemo } from '../../../packages/components'
import {
  loadTheme,
  UITheme,
  type Theme as UltraTheme
} from 'ultra-ui/styles/theme'
import { WebCache } from 'cat-kit/fe'

export default {
  extends: DefaultTheme,
  Layout: defineComponent({
    setup() {
      onMounted(() => {
        const cachedTheme = WebCache.local.get<UltraTheme>('theme') || undefined
        const theme = cachedTheme ? new UITheme(cachedTheme) : undefined
        loadTheme(theme)
      })

      return () => {
        return h(DefaultTheme.Layout, null, {
          // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
      }
    }
  }),
  enhanceApp({ app, router, siteData }) {
    app.component('VDemo', VDemo)
  }
} satisfies Theme
