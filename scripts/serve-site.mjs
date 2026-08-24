import { createServer } from 'node:http'
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const siteRoot = join(repositoryRoot, '_site')
const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT || 5173)
const eventSlugs = new Set([
  'factory26',
  'agenticparis26',
  'survey26',
])
const legacyEventSlugs = new Set([
  'oaic-harness-2026',
  'agentic-hackathon-paris-2026',
  'agentic-cosmos-2026',
  'cosmos26',
  'open-survey-26',
])

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
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
    const extension = extname(filePath)
    const fileSize = statSync(filePath).size
    const contentType = contentTypes[extension] || 'application/octet-stream'

    if (extension === '.mp4' && request.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range)
      if (!match) {
        response.writeHead(416, { 'Content-Range': `bytes */${fileSize}` })
        response.end()
        return
      }

      const [, startText, endText] = match
      const suffixLength = startText === '' ? Number(endText) : 0
      const start = startText === '' ? Math.max(fileSize - suffixLength, 0) : Number(startText)
      const end = endText === '' || startText === '' ? fileSize - 1 : Math.min(Number(endText), fileSize - 1)

      if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start > end || start >= fileSize) {
        response.writeHead(416, { 'Content-Range': `bytes */${fileSize}` })
        response.end()
        return
      }

      response.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-store',
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Content-Type': contentType,
      })

      if (request.method === 'HEAD') response.end()
      else createReadStream(filePath, { start, end }).pipe(response)
      return
    }

    const body = readFileSync(filePath)

    response.writeHead(200, {
      ...(extension === '.mp4' ? { 'Accept-Ranges': 'bytes' } : {}),
      'Cache-Control': 'no-store',
      'Content-Length': body.length,
      'Content-Type': contentType,
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
