import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const fallback = readFileSync(new URL('../hub/public/404.html', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1]
const restore = readFileSync(new URL('./platform-restore.js', import.meta.url), 'utf8')
function visit(path, enabled = true) {
  const url = new URL(path, 'https://create.gosim.org')
  const storage = new Map()
  let target
  const sessionStorage = {
    setItem: (key, value) => storage.set(key, value),
    getItem: key => storage.get(key),
    removeItem: key => storage.delete(key),
  }
  vm.runInNewContext(enabled ? fallback.replace('var platformEnabled = false', 'var platformEnabled = true') : fallback, {
    window: { location: { pathname: url.pathname, search: url.search, hash: url.hash, replace: value => { target = value } }, sessionStorage },
  })
  return { target, storage, sessionStorage }
}
test('platform deep links preserve registration queries and recovery fragments before app startup', () => {
  for (const path of ['/survey26/platform/register?mode=login&next=%2Fteam', '/survey26/platform/reset#access_token=test&type=recovery', '/survey26/platform/submissions/123']) {
    const result = visit(path)
    assert.equal(result.target, '/survey26/platform/')
    let restored
    vm.runInNewContext(restore, { sessionStorage: result.sessionStorage, URL,
      location: { origin: 'https://create.gosim.org' }, history: { replaceState: (_state, _title, url) => { restored = url } } })
    assert.equal(restored, path)
    assert.equal(result.storage.size, 0)
  }
})
test('normalizes platform root while retaining existing site fallbacks', () => {
  assert.equal(visit('/survey26/platform').storage.get('gosim-platform-redirect'), '/survey26/platform/')
  assert.equal(visit('/survey26/vision').target, '/survey26/')
  assert.equal(visit('/factory26/profile/123').target, '/factory26/')
  assert.equal(visit('/survey26/platform/register', false).target, '/survey26/')
  assert.equal(visit('/survey26/platform-other').target, '/survey26/')
})
test('restoration refuses foreign origins and paths outside platform', () => {
  for (const path of ['https://evil.example/', '//evil.example/', '/factory26/', '/survey26/platform/../../factory26/']) {
    let changed = false
    vm.runInNewContext(restore, { sessionStorage: { getItem: () => path, removeItem() {} }, URL,
      location: { origin: 'https://create.gosim.org' }, history: { replaceState() { changed = true } } })
    assert.equal(changed, false)
  }
})
