# 快速开始

1. 在你的 md 文件中使用 demo 容器 :

```md
:::demo ultra-ui 按钮示例
render(demos/test1.vue)
:::
```

:::demo ultra-ui 按钮示例
render(demos/test1.vue)
:::

2. 在你的 vitepress 配置文件中添加以下配置：

```ts
import { defineConfig } from 'vitepress'
import { DemoContainer } from 'vitepress-demo-container/plugin'

export default defineConfig({
  // 其他配置...
  markdown: {
    config: md => {
      md.use(DemoContainer)
    }
  }
  // 其他配置...
})
```

3. 在 vitepress 主题中注册 demo 组件

```ts
// .vitepress/theme/index.ts
import { VDemo } from 'vitepress-demo-container/components'
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('VDemo', VDemo)
  }
} satisfies Theme
```

4. 如果你要预览 vue 组件

4.1 全局注册 (推荐)

```ts
// .vitepress/theme/index.ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 在此处注册你的组件
  }
} satisfies Theme
```

4.2 或在 demo 组件中导入

```vue
<script setup>
import 'ultra-ui/components/button/style'
import { UButton } from 'ultra-ui'
</script>
```

恭喜:tada:，至此，所有的工作就都完成了。
