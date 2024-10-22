<template>
  <u-card style="margin-top: 16px">
    <u-card-header v-if="title"> {{ title }} </u-card-header>

    <u-card-content>
      <ClientOnly>
        <component :is="component" />
      </ClientOnly>
    </u-card-content>

    <u-card-action style="text-align: right">
      <u-button
        title="查看源码"
        @click="visible = true"
        :icon="CodeOpen"
        type="primary"
        text
        circle
      />
    </u-card-action>
  </u-card>

  <u-dialog v-model="visible" :modal="false" title="源码" style="width: 80vw">
    <div v-html="code" class="language-vue"></div>

    <template #footer>
      <u-button :icon="Copy" @click="copyCode" text type="primary" />
    </template>
  </u-dialog>
</template>

<script lang="ts" setup>
import { shallowRef, watchEffect, type Component } from 'vue'
import CodeOpen from './icons/code-open.vue'
import Copy from './icons/copy.vue'
import { codeToHtml } from 'shiki'
import { useData } from 'vitepress'

defineOptions({
  name: 'Demo',
  inheritAttrs: false
})

const props = defineProps<{
  /** 源码 */
  sourceCode?: string
  /** 标题 */
  title?: string
  /** 组件 */
  component: Component
}>()

const visible = shallowRef(false)

const { isDark } = useData()

const code = shallowRef('')

watchEffect(async () => {
  code.value = await codeToHtml(
    props.sourceCode ? decodeURIComponent(props.sourceCode) : '',
    {
      lang: 'vue',
      theme: isDark.value ? 'one-dark-pro' : 'vitesse-light'
    }
  )
})

const copyCode = () => {
  props.sourceCode &&
    navigator.clipboard.writeText(decodeURIComponent(props.sourceCode))
}
</script>
