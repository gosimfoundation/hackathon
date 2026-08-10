import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const siteRoot = join(repositoryRoot, '_site')
const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT || 5173)
const eventSlugs = new Set([
  'factory26',
  'agenticparis26',
])
const legacyEventSlugs = new Set([
  'oaic-harness-2026',
  'agentic-hackathon-paris-2026',
])

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

function resolveRequest(pathname) {
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, '')
  const normalized = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '')
  let candidate = join(siteRoot, normalized)

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = join(candidate, 'index.html')
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate
  }

  const [firstSegment] = normalized.split(/[\\/]/)
  if (legacyEventSlugs.has(firstSegment)) {
    return join(siteRoot, '404.html')
  }

  return eventSlugs.has(firstSegment)
    ? join(siteRoot, firstSegment, 'index.html')
    : join(siteRoot, 'index.html')
}

const server = createServer((request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`)
    const filePath = resolveRequest(url.pathname)
    const body = readFileSync(filePath)

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
    })

    response.end(request.method === 'HEAD' ? undefined : body)
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end(`Local preview error: ${error.message}`)
  }
})

server.listen(port, host, () => {
  console.log(`Serving the assembled GOSIM hackathon site at http://localhost:${port}/`)
})
