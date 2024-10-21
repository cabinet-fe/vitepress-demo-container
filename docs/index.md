---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'demo容器'
  text: 'demo容器文档1'
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---

<script setup>
import Test1 from './demos/test1.vue'
</script>

::: demo
render(docs/demos/test1.vue)
:::