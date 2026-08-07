const isLocalBackend = typeof window !== 'undefined' && window.location.hostname === 'paris.mofa.ai'

export const API_BASE = isLocalBackend ? '' : 'https://paris.mofa.ai'
export const BASE_URL = import.meta.env.BASE_URL

export function appUrl(path: string = ''): string {
  if (!path) return BASE_URL
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) return path
  if (path.startsWith('#')) return `${BASE_URL}${path}`
  return `${BASE_URL}${path.replace(/^\/+/, '')}`
}

export function publicSiteUrl(path: string = ''): string {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '')
  const basePath = BASE_URL === '/' ? '' : BASE_URL.replace(/\/+$/, '')
  const root = configuredSiteUrl || `${window.location.origin}${basePath}`
  if (!path) return root
  if (path.startsWith('#')) return `${root}/${path}`
  return `${root}/${path.replace(/^\/+/, '')}`
}

// Resolve image paths: uploads go to backend, static assets use base path
export function assetUrl(path: string): string {
  if (!path) return ''
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('blob:')) return path
  if (path.startsWith('/uploads/')) return `${API_BASE}${path}`
  // Static assets (sponsors, icons, default-avatar) — use vite base path
  if (path.startsWith('/')) return appUrl(path)
  return path
}
