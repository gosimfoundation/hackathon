// API_BASE: set to your backend URL if you have one, or empty string for same-origin
export const API_BASE = ''
const BASE_URL = import.meta.env.BASE_URL // '/' or '/hackathon-kit/'

// Resolve image paths: uploads go to backend, static assets use base path
export function assetUrl(path: string): string {
  if (!path) return ''
  if (path.startsWith('http')) return path
  // Static assets (sponsors, icons, default-avatar) — use vite base path
  if (path.startsWith('/')) return `${BASE_URL}${path.slice(1)}`
  return path
}
