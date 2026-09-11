import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const output = join(root, '_site')
const publicOrigin = 'https://create.gosim.org'
const arcBenchApi = 'https://arc-bench.com/api/competitions'

const events = [
  {
    slug: 'agent2app26',
    directory: join(root, 'events', 'agent2app-2026'),
    environment: { VITE_SITE_URL: 'https://create.gosim.org/agent2app26' },
  },
  {
    slug: 'factory26',
    directory: join(root, 'events', 'oaic-harness-2026'),
  },
  {
    slug: 'agenticparis26',
    directory: join(root, 'events', 'agentic-hackathon-paris-2026'),
    environment: {
      VITE_SUPABASE_URL: process.env.PARIS_VITE_SUPABASE_URL || '',
      VITE_SUPABASE_ANON_KEY: process.env.PARIS_VITE_SUPABASE_ANON_KEY || '',
      VITE_SITE_URL: process.env.PARIS_VITE_SITE_URL || '',
    },
  },
  {
    slug: 'survey26',
    directory: join(root, 'events', 'agentic-cosmos-2026'),
    environment: {
      VITE_SUPABASE_URL: process.env.COSMOS_VITE_SUPABASE_URL || '',
      VITE_SUPABASE_ANON_KEY: process.env.COSMOS_VITE_SUPABASE_ANON_KEY || '',
      VITE_SITE_URL: process.env.COSMOS_VITE_SITE_URL || '',
      VITE_COSMOSBENCH_URL: process.env.COSMOS_VITE_COSMOSBENCH_URL || '',
      VITE_COSMOSBENCH_LEADERBOARD_API: process.env.COSMOS_VITE_COSMOSBENCH_LEADERBOARD_API || '',
    },
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
  // Public project URLs only; the hub forwards callbacks without handling auth.
  VITE_AUTH_EVENT_PROJECTS: JSON.stringify({
    '/factory26/': process.env.VITE_SUPABASE_URL || '',
    '/agenticparis26/': process.env.PARIS_VITE_SUPABASE_URL || '',
    '/survey26/register': process.env.COSMOS_VITE_SUPABASE_URL || '',
  }),
})
cpSync(join(root, 'hub', 'dist'), output, { recursive: true })

for (const event of events) {
  const basePath = `/${event.slug}/`

  runBuild(event.directory, {
    ...event.environment,
    VITE_BASE_PATH: basePath,
    VITE_SITE_URL: event.environment
      ? event.environment.VITE_SITE_URL || `${publicOrigin}/${event.slug}`
      : process.env.VITE_SITE_URL || `${publicOrigin}/${event.slug}`,
  })

  const destination = join(output, event.slug)
  mkdirSync(destination, { recursive: true })
  cpSync(join(event.directory, 'dist'), destination, { recursive: true })

  if (event.slug === 'factory26') {
    await writeArcBenchLeaderboard(destination)
  }
}

console.log(`Built Hub and ${events.length} event site(s) in ${output}`)
