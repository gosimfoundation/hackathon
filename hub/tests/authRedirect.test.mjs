import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import ts from 'typescript'

const { outputText } = ts.transpileModule(
  readFileSync(new URL('../src/authRedirect.ts', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } },
)
const { authRedirect } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const url = (suffix) => new URL(`https://create.gosim.org${suffix}`)

test('old root recovery emails retain the complete credentials and query', () => {
  const suffix = '?lang=zh#access_token=old-token&refresh_token=a%2Bb%2Fc&type=recovery'
  assert.equal(authRedirect(url(`/${suffix}`)), `/factory26/${suffix}`)
})

test('each configured project reaches its own password recovery UI', () => {
  const projects = {
    '/factory26/': 'https://factory.supabase.co',
    '/agenticparis26/': 'https://paris.supabase.co/',
    '/survey26/register': 'https://cosmos.supabase.co',
  }
  for (const [path, project] of Object.entries(projects)) {
    const payload = Buffer.from(JSON.stringify({ iss: `${project.replace(/\/$/, '')}/auth/v1` })).toString('base64url')
    const hash = `#access_token=header.${payload}.signature&refresh_token=test&type=recovery`
    assert.equal(authRedirect(url(`/${hash}`), projects), `${path}${hash}`)
  }
})

test('normal hub navigation and event callbacks are left alone', () => {
  for (const path of ['/', '/#current', '/#previous', '/#teams', '/?lang=zh', '/factory26/#type=recovery']) {
    assert.equal(authRedirect(url(path)), null)
  }
})

test('malformed tokens cannot crash routing or redirect outside an event', () => {
  assert.equal(authRedirect(url('/#access_token=x.!!!.y&type=recovery')), '/factory26/#access_token=x.!!!.y&type=recovery')
  const payload = Buffer.from(JSON.stringify({ iss: 'https://evil.example/auth/v1' })).toString('base64url')
  const hash = `#access_token=x.${payload}.y&type=recovery`
  assert.equal(authRedirect(url(`/${hash}`), { '//evil.example/': 'https://evil.example' }), `/factory26/${hash}`)
})
