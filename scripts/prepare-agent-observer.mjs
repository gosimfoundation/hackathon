import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const config = JSON.parse(readFileSync(join(root, 'scripts/agent-observer.json'), 'utf8'))
const checkout = join(root, '.cache/agent-observer', config.revision)
if (!/^[a-f0-9]{40}$/.test(config.revision)) throw new Error('Platform revision must be a full commit SHA')
function run(command, args) {
  const result = spawnSync(command, args, { cwd: checkout, stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`${command} failed`)
}
mkdirSync(checkout, { recursive: true })
if (!existsSync(join(checkout, '.git'))) run('git', ['init'])
run('git', ['fetch', '--depth=1', config.repository, config.revision])
run('git', ['checkout', '--detach', config.revision])
run('npm', ['ci', '--prefix', 'web'])
console.log(`Prepared Agent Observer ${config.revision}`)
