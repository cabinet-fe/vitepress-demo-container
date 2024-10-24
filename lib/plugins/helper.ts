import { camelCase } from 'cat-kit/fe'
import type { MarkdownEnv } from 'vitepress'
import path from 'path'

type MDFilePath = string

export function addScriptStatement(
  env: MarkdownEnv,
  statement: string,
  envCaches: Map<MDFilePath, Set<string>>
) {
  const script = env.sfcBlocks?.scripts[0]

  const envCache = envCaches.get(env.path)

  /** 如果已经存在，则不再添加 */
  if (envCache?.has(statement)) {
    return
  }

  if (!envCache) {
    envCaches.set(env.path, new Set([statement]))
  } else {
    envCache.add(statement)
  }

  const tagOpen = '<script setup lang="ts">'
  const tagClose = '</script>'

  if (script) {
    script.tagOpen = tagOpen
    script.contentStripped = statement + '\n' + script.contentStripped
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
  demoFullPath: string,
  envCaches: Map<MDFilePath, Set<string>>
) {
  // 将demoPath转换为组件名
  const componentName = camelCase(
    demoPath.replace(/\.vue$/, '').replace(/[\/\\]/g, '-'),
    'upper'
  )

  // 将demoFullPath转换为import路径
  let demoDir = path
    .relative(path.dirname(env.path), demoFullPath)
    .replace(/\\/g, '/')
  demoDir = demoDir.startsWith('.') ? demoDir : `./${demoDir}`

  const importerStatement = `import ${componentName} from '${demoDir}'`

  addScriptStatement(env, importerStatement, envCaches)

  return componentName
}

export function addDemoComponent(
  env: MarkdownEnv,
  envCaches: Map<MDFilePath, Set<string>>
) {
  const statement = `import { VDemo } from 'vitepress-demo-container/components'`
  addScriptStatement(env, statement, envCaches)
}
