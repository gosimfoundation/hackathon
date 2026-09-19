import { ref, watch } from 'vue'
import translations from './en.json'

type Locale = 'zh' | 'en'
const requested = new URL(window.location.href).searchParams.get('lang')
let initial: Locale = 'zh'
try { if (localStorage.getItem('agent2app-locale') === 'en') initial = 'en' } catch { /* Storage is optional. */ }
if (requested === 'en' || requested === 'zh') initial = requested
const locale = ref<Locale>(initial)
const english: Record<string, string> = translations
const descriptions = {
  zh: 'Agentic App 黑客松：意图，即应用。在 Octos、Octoscript、Makepad 与 OctoSense 这条纯 Rust 开源 Agentic 技术栈上，把系统应用 Agent 化；鹦鹉螺、帝王蟹、大章鱼三级深度，作品以 Apache 2.0 开源提交。',
  en: 'Agentic App Hackathon 2026: The Intent Is the App. Build agent-native apps on Octos, Octoscript, Makepad and OctoSense, an open, pure-Rust agentic stack. Three depths from Nautilus to Giant Octopus, Apache 2.0 submissions, and a live showcase at GOSIM Shenzhen 2026.',
}
watch(locale, value => {
  document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN'
  document.title = value === 'en' ? 'Agentic App Hackathon 2026 · The Intent Is the App' : 'Agentic App 黑客松 2026 · 意图，即应用'
  document.querySelector('meta[name="description"]')?.setAttribute('content', descriptions[value])
  try { localStorage.setItem('agent2app-locale', value) } catch { /* Storage is optional. */ }
}, { immediate: true })

export function useLocale() {
  const t = (text: string) => locale.value === 'en' ? (english[text] ?? text) : text
  function toggleLocale() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale.value)
    window.history.replaceState(window.history.state, '', url)
  }
  return { locale, t, toggleLocale }
}
