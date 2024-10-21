<template>
  <div class="demo-container"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  description?: string
  /** 源码 */
  sourceCode?: string
}>()
</script>

<style lang="scss"></style>
