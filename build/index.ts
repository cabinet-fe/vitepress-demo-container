import { updateVersion } from '@helper/build'
import path from 'path'
import fs from 'fs'
import { $ } from 'bun'

async function build() {
  await Promise.all([
    $`bun run build`.cwd(path.resolve(__dirname, '../packages/components')),
    $`bun run build`.cwd(path.resolve(__dirname, '../packages/plugins'))
  ])

  const pkgJSONPath = path.resolve(__dirname, '../package.json')
  await updateVersion(pkgJSONPath)
  fs.cpSync(
    path.resolve(__dirname, '../README.md'),
    path.resolve(__dirname, '../dist/README.md')
  )

  const pkgJSON = JSON.parse(fs.readFileSync(pkgJSONPath, 'utf-8'))
  fs.writeFileSync(
    path.resolve(__dirname, '../dist/package.json'),
    JSON.stringify(
      {
        name: pkgJSON.name,
        version: pkgJSON.version,
        description: pkgJSON.description,
        type: 'module',
        exports: {
          './components': './components/index.js',
          './plugins': './plugins/index.js',
          './*': './*'
        }
      },
      null,
      2
    )
  )

  try {
    await $`cd ../dist && npm publish --registry http://192.168.31.250:6005`
  } catch (error: any) {
    console.error(error.stderr?.toString())
  }
}

build()
