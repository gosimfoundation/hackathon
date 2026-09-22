import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const output = join(root, '_site')
const prepared = join(root, '.cache/event-sites')
const events = JSON.parse(readFileSync(join(root, 'config/event-sites.json'), 'utf8'))
const versions = JSON.parse(readFileSync(join(prepared, 'versions.json'), 'utf8'))
const arcBenchApi = 'https://arc-bench.com/api/competitions'
for (const event of events) {
  if (versions[event.slug]?.repository !== event.repository) throw new Error(`Unprepared event: ${event.slug}`)
  for (const file of event.requiredFiles) {
    if (!existsSync(join(prepared, event.slug, file))) throw new Error(`Missing ${event.slug}/${file}`)
  }
}
function runBuild(directory, env = {}) {
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: directory, env: { ...process.env, ...env }, stdio: 'inherit',
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

async function writeArcBenchLeaderboard(destination) {
  try {
    const competitionsResponse = await fetch(arcBenchApi, { signal: AbortSignal.timeout(10_000) })
    if (!competitionsResponse.ok) throw new Error(`ARC-Bench returned ${competitionsResponse.status}`)
    const competitions = await competitionsResponse.json()
    const competition = competitions.find(item => item.is_public && item.task_count > 0)
    if (!competition) throw new Error('No public ARC-Bench competition available')
    const response = await fetch(`${arcBenchApi}/leaderboard?track=all&competition_id=${encodeURIComponent(competition.id)}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`ARC-Bench returned ${response.status}`)

    const payload = await response.json()
    if (!Array.isArray(payload)) throw new Error('ARC-Bench returned an invalid payload')

    writeFileSync(
      join(destination, 'arcbench-leaderboard.json'),
      `${JSON.stringify({ competition: { id: competition.id, title: competition.title }, updatedAt: new Date().toISOString(), entries: payload })}\n`,
    )
    console.log(`Captured ${payload.length} ARC-Bench leaderboard row(s)`)
  } catch (error) {
    // A temporary upstream outage should not prevent the rest of the sites from deploying.
    console.warn(`Could not capture ARC-Bench leaderboard: ${error.message}`)
    // Keep the bundled last successful snapshot on upstream failure.
  }
}

rmSync(output, { recursive: true, force: true })
runBuild(join(root, 'hub'), {
  VITE_AUTH_EVENT_PROJECTS: JSON.stringify({
    '/factory26/': versions.factory26.supabaseUrl,
    '/agenticparis26/': process.env.PARIS_VITE_SUPABASE_URL || '',
    '/survey26/platform/register': versions.survey26.supabaseUrl,
  }),
})
cpSync(join(root, 'hub/dist'), output, { recursive: true })
const fallback = join(output, '404.html')
writeFileSync(fallback, readFileSync(fallback, 'utf8').replace('var platformEnabled = false', 'var platformEnabled = true'))
runBuild(join(root, 'events/agentic-hackathon-paris-2026'), {
  VITE_BASE_PATH: '/agenticparis26/',
  VITE_SITE_URL: 'https://create.gosim.org/agenticparis26',
  VITE_SUPABASE_URL: process.env.PARIS_VITE_SUPABASE_URL || '',
  VITE_SUPABASE_ANON_KEY: process.env.PARIS_VITE_SUPABASE_ANON_KEY || '',
})
cpSync(join(root, 'events/agentic-hackathon-paris-2026/dist'), join(output, 'agenticparis26'), { recursive: true })
for (const event of events) {
  cpSync(join(prepared, event.slug), join(output, event.slug), { recursive: true })
}
await writeArcBenchLeaderboard(join(output, 'factory26'))
writeFileSync(join(output, 'deployment.json'), JSON.stringify({ events: versions }, null, 2) + '\n')
console.log('Built hub and Paris, and assembled three independently published event sites')
