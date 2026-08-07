import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const legacyHashTarget = window.location.pathname === '/' && window.location.hash === '#teams'
  ? '/oaic-harness-2026/#teams'
  : null

if (legacyHashTarget) {
  window.location.replace(legacyHashTarget)
} else {
  createApp(App).mount('#app')
}
