import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const site = join(root, '_site')
for (const page of ['index.html', 'factory26/index.html', 'agenticapp26/index.html', 'agenticparis26/index.html', 'survey26/index.html', 'survey26/platform/index.html', '404.html']) {
  assert(existsSync(join(site, page)), `Missing ${page}`)
  const html = readFileSync(join(site, page), 'utf8')
  for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]+\.(?:js|css))"/g)) {
    assert(existsSync(join(site, match[1])), `Missing asset ${match[1]} referenced by ${page}`)
  }
}
assert.match(readFileSync(join(site, '404.html'), 'utf8'), /var platformEnabled = true/)
assert.match(readFileSync(join(site, 'survey26/index.html'), 'utf8'), /\/survey26\/platform\//)
assert.equal(readFileSync(join(site, 'survey26/platform/restore-route.js'), 'utf8'), readFileSync(join(root, 'scripts/platform-restore.js'), 'utf8'), 'Platform routing changed: update and rerun the shared routing tests')
const deployed = JSON.parse(readFileSync(join(site, 'deployment.json'), 'utf8'))
for (const slug of ['factory26', 'survey26', 'agenticapp26']) {
  assert.equal(deployed.events[slug].slug, slug)
  assert.match(deployed.events[slug].revision, /^[a-f0-9]{40}$/)
}
console.log('All event entry points, JS/CSS assets, source revisions and platform routing verified')
