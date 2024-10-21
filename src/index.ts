import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

export const DemoContainer = function (md: MarkdownIt) {
  const render: RenderRule = (tokens, idx) => {
    const token = tokens[idx]!

    if (token.nesting === 1) {
      // opening tag
      return '<div>'
    } else {
      // closing tag
      return '</duv>'
    }
  }

  md.use(container, 'demo', {
    render
  })
}
