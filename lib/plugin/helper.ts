import { camelCase } from 'cat-kit/fe'
import type { MarkdownEnv } from 'vitepress'
import path from 'path'

type MDFilePath = string
const importCache = new Map<MDFilePath, Set<string>>()

export function addScriptStatement(env: MarkdownEnv, statement: string) {
  const script = env.sfcBlocks?.scripts[0]

  const tagOpen = '<script setup lang="ts">'
  const tagClose = '</script>'

  if (script) {
    script.tagOpen = tagOpen
    script.contentStripped += statement
    script.content = script.tagOpen + script.contentStripped + script.tagClose
  } else {
    env.sfcBlocks?.scripts.push({
      content: `${tagOpen}${statement}${tagClose}`,
      tagOpen,
      type: 'script',
      contentStripped: statement,
      tagClose
    })
  }
}

export function addImportScript(
  env: MarkdownEnv,
  demoPath: string,
  demoFullPath: string
) {
  const componentName = camelCase(
    demoPath.replace(/\.vue$/, '').replace(/[\/\\]/g, '-'),
    'upper'
  )

  const mdEnvImports = importCache.get(env.path)
  if (mdEnvImports?.has(componentName)) {
    return componentName
  }

  if (!mdEnvImports) {
    importCache.set(env.path, new Set([componentName]))
  } else {
    mdEnvImports.add(componentName)
  }

  let demoDir = path
    .relative(path.dirname(env.path), demoFullPath)
    .replace(/\\/g, '/')
  demoDir = demoDir.startsWith('.') ? demoDir : `./${demoDir}`

  const importerStatement = `\nimport ${componentName} from '${demoDir}'\n`

  addScriptStatement(env, importerStatement)

  return componentName
}

export function addDemoComponent(env: MarkdownEnv) {
  const DemoComponentName = 'VDemo'

  const mdEnvImports = importCache.get(env.path)
  if (mdEnvImports?.has(DemoComponentName)) {
    return
  }

  if (!mdEnvImports) {
    importCache.set(env.path, new Set([DemoComponentName]))
  } else {
    mdEnvImports.add(DemoComponentName)
  }

  const statement = `
  import { VDemo } from 'vitepress-demo-container/components'

  `

  addScriptStatement(env, statement)
}
