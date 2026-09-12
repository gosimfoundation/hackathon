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
  zh: 'Agentic App 黑客松 2026：9 月 13 日报名组队，经初赛、复赛晋级，10 月 17 日 GOSIM 现场决赛。单人、多人均可参赛，所有成员分别报名。两大赛道：OctoSense + AppCard、robrix2 + hagency。',
  en: 'Agentic App Hackathon 2026: registration opens September 13; advance through preliminary and semifinal rounds to the October 17 GOSIM live final. Solo and team entries welcome; every member registers. Tracks: OctoSense + AppCard and robrix2 + hagency.',
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
