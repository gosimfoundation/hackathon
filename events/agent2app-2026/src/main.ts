import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
// Restore an event URL forwarded by the shared GitHub Pages 404 handler.
try {
  const target = sessionStorage.getItem('gosim-pages-redirect')
  if (target?.startsWith(import.meta.env.BASE_URL)) {
    sessionStorage.removeItem('gosim-pages-redirect')
    history.replaceState(null, '', target)
  }
} catch {
  // The landing page remains usable when browser storage is unavailable.
}
createApp(App).mount('#app')
