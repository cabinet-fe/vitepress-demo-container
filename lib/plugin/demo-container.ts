import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import path from 'path'
import fs from 'fs'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type { MarkdownEnv } from 'vitepress'
import { addDemoComponent, addImportScript, addScriptStatement } from './helper'

interface ContainerOptions {
  /** 示例组件根目录 */
  demoRootDir: string
}

/**
 * @description 创建demo容器, 用于展示vue示例组件
 * @param md - markdown-it实例
 */
export function DemoContainer(md: MarkdownIt, options?: ContainerOptions) {
  const { demoRootDir } = options ?? {}

  const renderRE = /^render\((.*)\)$/

  const render: RenderRule = (tokens, idx, _, env: MarkdownEnv) => {
    const token = tokens[idx]!

    if (token.nesting === 1) {
      const title = token.info?.trim().split(' ')[1] ?? ''

      const demoContent = tokens.slice(idx).find(token => {
        return token.content.trim().startsWith('render')
      })?.content

      const demoPath = demoContent?.match(renderRE)?.[1]

      if (demoPath) {
        const demoFullPath = path.resolve(
          demoRootDir ?? path.dirname(env.path),
          demoPath
        )

        const fileExist = fs.existsSync(demoFullPath)

        addDemoComponent(env)
        const componentName = addImportScript(env, demoPath, demoFullPath)

        const sourceCode = encodeURIComponent(
          fileExist ? fs.readFileSync(demoFullPath, 'utf-8') : ''
        )

        // 开始标签
        return `
        <v-demo
          source-code="${sourceCode}" title="${title}"
          :component="${componentName}">
         `
      }

      return ''
    }

    return '</v-demo>'
  }

  md.use(container, 'demo', {
    render
  })
}
