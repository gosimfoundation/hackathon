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
  zh: 'Agentic App 黑客松 2026：9 月 13 日报名、9 月 19 日开营，初赛、复赛和决赛均在线上完成。拟定 10 月 11 日决赛，前 2–3 名优胜团队获邀于 10 月 17 日在 GOSIM 现场展示。单人、多人均可参赛，每位成员分别报名。赛道：OctoSense + AppCard、robrix2 + hagency。',
  en: 'Agentic App Hackathon 2026: register September 13; kickoff September 19. All rounds take place online, with the final proposed for October 11. The top 2–3 teams are invited to showcase at GOSIM on October 17. Solo and team entries welcome; every member registers. Tracks: OctoSense + AppCard and robrix2 + hagency.',
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
