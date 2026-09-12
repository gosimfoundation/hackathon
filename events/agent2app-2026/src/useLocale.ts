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
  zh: 'Agentic App 黑客松：意图所至，应用而生。围绕 octos、OctoSense 与 Octoscript，一条主赛道、三级自选阶梯，让一句话长成能用的应用。',
  en: 'Agentic App Hackathon 2026: The Intent Is the App. Turn a real intent into a working app with octos, OctoSense and Octoscript. Three steps, two award categories, and a live showcase at GOSIM Shenzhen 2026.',
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
