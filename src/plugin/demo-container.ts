import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import path from 'path'
import fs from 'fs'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import { createHighlighter } from 'shiki'
import type { MarkdownEnv } from 'vitepress'

interface ContainerOptions {
  /** 示例组件根目录 */
  demoRootDir: string
}

/**
 * @description 创建demo容器, 用于展示vue示例组件
 * @param md - markdown-it实例
 */
export const DemoContainer = async function (
  md: MarkdownIt,
  options?: ContainerOptions
) {
  const highlighter = await createHighlighter({
    langs: ['vue', 'typescript', 'javascript', 'html'],
    themes: ['one-dark-pro', 'vitesse-light']
  })

  const { demoRootDir = process.cwd() } = options ?? {}

  const renderRE = /^render\((.*)\)$/

  const render: RenderRule = (tokens, idx, options, env: MarkdownEnv, self) => {
    const token = tokens[idx]!

    if (token.nesting !== 1) {
      return '</div>'
    }

    const demoContent = tokens.find(token => {
      return token.content.trim().startsWith('render')
    })?.content

    const demoPath = demoContent?.match(renderRE)?.[1]

    if (demoPath) {
      const demoFullPath = path.resolve(demoRootDir, demoPath)

      const fileExist = fs.existsSync(demoFullPath)

      const sourceCode = highlighter.codeToHtml(
        fileExist ? fs.readFileSync(demoFullPath, 'utf-8') : '',
        {
          lang: 'vue',
          theme: 'vitesse-light'
        }
      )

      // const importCode = `import ${demoPath.replace(/\.vue$/, '')} from '${demoPath}'`

      // 开始标签
      return `<div code="${demoPath}"> ${sourceCode} `
    }

    return ''
  }

  md.use(container, 'demo', {
    render
  })
}
