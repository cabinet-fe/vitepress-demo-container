import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import path from 'path'
import fs from 'fs'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type { MarkdownEnv } from 'vitepress'
import { addImportScript, addScriptStatement } from './helper'

interface ContainerOptions {
  /** 示例组件根目录 */
  demoRootDir: string
}

type MDFilePath = string

/** 用于缓存已经解析的markdown脚本 */
const envCaches = new Map<MDFilePath, Set<string>>()

/**
 * @description 创建demo容器, 用于展示vue示例组件
 * @param md - markdown-it实例
 */
export function DemoContainer(md: MarkdownIt, options?: ContainerOptions) {
  const { demoRootDir } = options ?? {}

  const mdRender = md.render

  md.render = (src, env) => {
    envCaches.set(env.path, new Set())
    return mdRender(src, env)
  }

  const renderRE = /^render\((.*)\)$/

  const render: RenderRule = (tokens, idx, _, env: MarkdownEnv) => {
    const token = tokens[idx]!

    if (token.nesting === 1) {
      const title = token.info?.trim().slice(4)

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

        /** 添加demo组件导入脚本 */
        // addDemoComponent(env, envCaches)

        addScriptStatement(
          env,
          'import { useData } from "vitepress"',
          envCaches
        )

        const componentName = addImportScript(
          env,
          demoPath,
          demoFullPath,
          envCaches
        )

        const sourceCode = encodeURIComponent(
          fileExist ? fs.readFileSync(demoFullPath, 'utf-8') : ''
        )

        // 开始标签
        return `
        <ClientOnly>
        <v-demo
          source-code="${sourceCode}" title="${title}"
          :component="${componentName}" :use-data="useData">
         `
      }

      return ''
    }

    return '</v-demo> </ClientOnly>'
  }

  md.use(container, 'demo', {
    render
  })
}
