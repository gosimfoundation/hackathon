import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { authRedirect } from './authRedirect'

const legacyRoutes = new Set([
  '/vision',
  '/rules',
  '/bootcamp',
  '/resources',
  '/admin',
  '/export',
  '/submit',
  '/checkin',
  '/projects',
])

const isLegacyProfile = window.location.pathname.startsWith('/profile/')
const legacyPathTarget = legacyRoutes.has(window.location.pathname) || isLegacyProfile
  ? `/factory26${window.location.pathname}${window.location.search}${window.location.hash}`
  : null
const legacyHashTarget = window.location.pathname === '/' && window.location.hash === '#teams'
  ? '/factory26/#teams'
  : null
const legacyTarget = authRedirect(
  new URL(window.location.href),
  JSON.parse(import.meta.env.VITE_AUTH_EVENT_PROJECTS || '{}'),
) || legacyPathTarget || legacyHashTarget

if (legacyTarget) {
  window.location.replace(legacyTarget)
} else {
  createApp(App).mount('#app')
}
