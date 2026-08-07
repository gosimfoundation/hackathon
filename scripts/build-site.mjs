import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const output = join(root, '_site')
const publicOrigin = 'https://hackathon.gosim.org'

const events = [
  {
    slug: 'oaic-harness-2026',
    directory: join(root, 'events', 'oaic-harness-2026'),
  },
]

function runBuild(directory, env = {}) {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: directory,
    env: { ...process.env, ...env },
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

rmSync(output, { recursive: true, force: true })

runBuild(join(root, 'hub'))
cpSync(join(root, 'hub', 'dist'), output, { recursive: true })

for (const event of events) {
  const basePath = `/${event.slug}/`

  runBuild(event.directory, {
    VITE_BASE_PATH: basePath,
    VITE_SITE_URL: process.env.VITE_SITE_URL || `${publicOrigin}/${event.slug}`,
  })

  const destination = join(output, event.slug)
  mkdirSync(destination, { recursive: true })
  cpSync(join(event.directory, 'dist'), destination, { recursive: true })
}

console.log(`Built Hub and ${events.length} event site(s) in ${output}`)
