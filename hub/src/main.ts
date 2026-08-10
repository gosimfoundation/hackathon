import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

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
const legacyTarget = legacyPathTarget || legacyHashTarget

if (legacyTarget) {
  window.location.replace(legacyTarget)
} else {
  createApp(App).mount('#app')
}
