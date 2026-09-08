/** Route callbacks that Supabase sends to the site root back to an event app. */
export function authRedirect(url: URL, eventProjects: Record<string, string> = {}): string | null {
  if (url.pathname !== '/') return null

  const hash = new URLSearchParams(url.hash.slice(1))
  const isCallback = hash.has('access_token') || hash.get('type') === 'recovery'
    || url.searchParams.get('type') === 'recovery'
  if (!isCallback) return null

  // The root used to host Factory26. Keep old emails working even when there
  // is no project mapping (for example, during local development).
  let destination = '/factory26/'
  try {
    const payload = hash.get('access_token')?.split('.')[1]
    if (payload) {
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
      const { iss } = JSON.parse(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=')))
      for (const [path, projectUrl] of Object.entries(eventProjects)) {
        if (projectUrl && iss === `${projectUrl.replace(/\/+$/, '')}/auth/v1`
          && ['/factory26/', '/agenticparis26/', '/survey26/register'].includes(path)) {
          destination = path
          break
        }
      }
    }
  } catch {
    // Let the event's auth client validate the token. The decoded issuer above
    // is only a routing hint and never authorizes access or an external redirect.
  }

  return `${destination}${url.search}${url.hash}`
}
