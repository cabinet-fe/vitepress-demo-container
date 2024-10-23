# 快速开始

在你的 md 文件中只需要像下面一样:

```md
:::demo ultra-ui 按钮示例
render(demos/test1.vue)
:::
```

:::demo ultra-ui 按钮示例
render(demos/test1.vue)
:::

在你的 vitepress 配置文件中添加以下配置：

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

恭喜:tada:，至此，所有的工作就都完成了。
