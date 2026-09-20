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
  zh: 'Agentic App 黑客松 2026：获奖奖池 ¥50,000（含现金奖金与 MiniMax Token 额度）。9 月 13 日报名、9 月 22 日开营，9 月 26 日起周末与国庆集中上课。初赛海选晋级 50 人，复赛评出一、二、三等奖，10 月 12 日线上决赛并公布结果。前三名将于 10 月 17 日到 GOSIM 黑客松现场展示作品并参加颁奖。单人、多人均可参赛，每位成员分别报名。以 OctoSense 为核心，围绕邮件、即时消息、日历等 12 个场景构建 Agentic 应用；即时消息绑定 robrix2，软件协作可接入 hagency。评选最佳 Agentic 奖与最佳技术突破奖。',
  en: 'Agentic App Hackathon 2026: RMB 50,000 in prizes, including cash and MiniMax token credits. Register September 13; kickoff September 22; classes start Saturday, September 26, on weekends and during the National Day holiday. Online qualifying selects 50 participants, who compete in the award round for First, Second and Third Prizes. The online final and award results are on October 12. The top three teams will showcase their projects and attend the awards ceremony at the GOSIM Hackathon on October 17. Solo and team entries welcome; every member registers. Build Agentic apps around 12 OctoSense scenarios, including mail, messaging and calendar. Messaging uses robrix2; software collaboration can connect hagency. Awards recognize Agentic automation and technical breakthroughs.',
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
