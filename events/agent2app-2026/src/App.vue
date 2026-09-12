<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useLocale } from './useLocale'
const { locale, t, toggleLocale } = useLocale()
import ConferenceText from './components/ConferenceText.vue'
import HeroDetail from './components/HeroDetail.vue'
import HeroMedia from './components/HeroMedia.vue'
import EventSwitcher from './components/EventSwitcher.vue'
import CompetitionTracks from './components/CompetitionTracks.vue'
import RegistrationPanel from './components/RegistrationPanel.vue'
import ProjectShowcase from './components/ProjectShowcase.vue'
import EventSchedule from './components/EventSchedule.vue'
const menuOpen = ref(false)
const base = import.meta.env.BASE_URL
// Keep both photographs mounted so lighting can crossfade without a blank frame.
const isNight = ref(document.documentElement.dataset.theme === 'night')
const displayedNight = ref(isNight.value)
const themeLoading = ref(true)
const scrolled = ref(window.scrollY > 24)
const dayImage = `${base}videos/agent2app-day-v2.jpg`
const nightImage = `${base}videos/agent2app-night-v2.jpg`
let disposed = false
function updateScroll() { scrolled.value = window.scrollY > 24 }
watch(displayedNight, (night) => {
  document.documentElement.dataset.theme = night ? 'night' : 'day'
}, { immediate: true })
// Browser chrome follows the chosen theme.
watch(isNight, (night) => {
  document.documentElement.dataset.browserTheme = night ? 'night' : 'day'
  document.documentElement.style.colorScheme = night ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? '#18242f' : '#f3ede2')
}, { immediate: true })
function toggleTheme() {
  if (themeLoading.value) return
  isNight.value = !isNight.value
  displayedNight.value = isNight.value
  try { localStorage.setItem('agent2app-theme', isNight.value ? 'night' : 'day') } catch { /* Optional preference storage. */ }
}
onMounted(async () => {
  window.addEventListener('scroll', updateScroll, { passive: true })
  await Promise.allSettled([dayImage, nightImage].map(async (src) => {
    const image = new Image()
    image.src = src
    await image.decode()
  }))
  if (disposed) return
  themeLoading.value = false
})
onUnmounted(() => {
  disposed = true
  window.removeEventListener('scroll', updateScroll)
})
const nav = [['challenge', '参赛命题'], ['showcase', '实机预览'], ['tracks', '两大赛道'], ['steps', '三级阶梯'], ['awards', '奖项与评分'], ['bounties', '悬赏榜'], ['schedule', '赛程与培训']]
const bounties = [
  { title: 'hagency 软件工厂小程序', description: '围绕任务进度、Agent 状态、结果验收或协作交接提交 robrix2 小程序，附 hagency 接入说明和完整任务演示。', repo: 'robrix2 + hagency' },
  { title: '小程序能力与契约测试', description: '为工厂小程序补充一个受限数据能力、状态回放或权限测试，并接回实际参赛应用。', repo: 'robrix2 + hagency' },
  { title: 'L0 Web Playground', description: '输入脚本，实时预览卡片。头号悬赏；若赛前已有 MVP，则转为体验增强。', repo: 'Octoscript' },
  { title: 'check-ui CLI 与 LSP 接入', description: '把 L0 校验带进命令行与编辑器，让创作反馈更及时。', repo: 'Octoscript' },
  { title: '更有用的错误诊断', description: '错误码与修复建议，帮助模型理解失败并完成自修复。', repo: 'Octoscript' },
  { title: '结构化 lint 引擎', description: '从子串匹配走向 OR、禁止与计数规则，提升卡片质量校验。', repo: 'AppCard / Octoscript' },
  { title: '跨仓库 schema 契约测试', description: '为 Octoscript 与 OctoSense 的接口一致性提供自动检查。', repo: '双仓协作' },
  { title: 'L0 parser fuzz', description: '测试解析器边界，提高面对复杂输入时的稳定性。', repo: 'Octoscript' },
  { title: 'L1 规范撰写', description: '把语言行为写成清晰规范，技术写作者也可认领。', repo: 'Octoscript' },
  { title: 'UI Protocol 最小客户端', description: '用 TypeScript 或 Python，把 Octos 接到手机之外的界面。', repo: 'Octos' },
  { title: '协议 schema / typegen / conformance', description: '完善 schema 导出、类型生成或协议一致性测试。', repo: 'Octos' },
  { title: 'new-skill 脚手架', description: '简化 manifest 与注册流程，让新能力更容易起步。', repo: 'Octos' },
  { title: '「生产回路 Agent」演示', description: '读取自身运行指标，发现卡片失败，自动修复并重新发布。', repo: 'Octos' },
]
const faqs = [
  { q: '必须到 GOSIM 现场才能获奖吗？', a: '不需要。比赛在线上决赛结束时确定获奖结果；总排名前 2–3 名优胜团队受邀到现场展示，到场情况不影响名次与获奖资格。' },
  { q: '软件工厂小程序赛道现在可以从哪里开始？', a: '先阅读 hagency 仓库，选择一个具体工厂任务并设计应用。robrix2 小程序接入处于规划阶段，运行包、能力清单、示例及练习数据的提交接受范围将在开课前说明；不要求参赛者照搬原有示例 UI。' },
  { q: '不会 Rust，也能独立参赛吗？', a: '可以。AppCard 路径可从需求、规则和参考卡片开始；软件工厂赛道适合设计与开发协作。两条赛道共用奖项，具体开发环境以赛前发布包为准。' },
  { q: '必须组队吗？没有技术伙伴怎么办？', a: '可以单人或多人参赛。单人队伍由本人报名；多人队伍的队长和每位队员都须分别报名，队长不能代替成员报名。拟定 9/23 23:59 截止个人报名，9/28 初赛提交时锁定已报名成员名单。' },
  { q: '没有 Android 手机怎么办？', a: '赛道 A 的设备借用与桌面路径将在赛前说明中公布；赛道 B 首版以 robrix2 与 hagency 在同一电脑运行的环境为主。使用公布支持的设备即可，不强制手机演示。' },
  { q: '什么是 no-facts？', a: '在 AppCard L0 路径中，模型写布局与数据绑定，事实由数据能力提供。软件工厂小程序同样不得编造任务进度或执行结果，应以 hagency 返回的数据为准。' },
  { q: '做工具链或内核，就不用做应用了吗？', a: '仍需回到统一命题：一句话变成能用的应用。技术突破必须服务自己的作品演示；悬赏贡献另计项目反哺分，不替代演示。' },
  { q: '从哪里报名？奖金是多少？', a: '9 月 13 日起，通过本页动态二维码或腾讯问卷报名。初赛、复赛和决赛均在线上完成，拟定 10 月 11 日决赛并公布结果；总排名前 2–3 名优胜团队获邀于 10 月 17 日到 GOSIM 现场展示。具体奖金金额待公布。' },
]
</script>

<template>
  <a class="skip-link" href="#main">{{ t('跳转到主要内容') }}</a>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'menu-is-open': menuOpen }">
    <div class="header-brand-group"><a class="brand" href="/" :aria-label="t('GOSIM Create 首页')"><span class="brand-logo" aria-hidden="true" :style="{ maskImage: `url(${base}gosim-logo.svg)`, WebkitMaskImage: `url(${base}gosim-logo.svg)` }"></span><span class="create-wordmark">Create</span></a><EventSwitcher /></div>
    <div class="header-controls"><button class="locale-toggle" type="button" :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'" @click="toggleLocale">{{ locale === 'zh' ? 'EN' : '中文' }}</button><button class="theme-toggle" type="button" :aria-pressed="isNight" :aria-label="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :title="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :disabled="themeLoading" :aria-busy="themeLoading" @click="toggleTheme">
      <svg v-if="isNight" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 14A8.6 8.6 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/></svg>
    </button><a class="registration-status registration-desktop" href="#participate">{{ t('报名参赛 ↗') }}</a><button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="navigation" @click="menuOpen = !menuOpen">{{ menuOpen ? t('关闭') : t('菜单') }}</button></div>
    <nav id="navigation" :class="{ open: menuOpen }" :aria-label="t('主导航')"><a v-for="[id, label] in nav" :key="id" :href="`#${id}`" @click="menuOpen = false">{{ t(label) }}</a><a class="registration-status registration-mobile" href="#participate" @click="menuOpen = false">{{ t('报名参赛 ↗') }}</a></nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="event-title">
      <HeroMedia :night="displayedNight" />
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-stage">
        <div class="hero-copy">
          <p class="eyebrow"><a href="https://shenzhen2026.gosim.org/" target="_blank" rel="noopener noreferrer">GOSIM Shenzhen 2026</a> / AGENTIC APP</p>
          <h1 id="event-title" v-if="locale === 'en'">The Intent<br>Is the <span>App.</span></h1><h1 id="event-title" v-else class="zh">意图，<br>即<span>应用。</span></h1>
          <div class="hero-details">
            <h2>{{ t('Agentic App 黑客松') }}</h2>
            <p class="hero-theme">{{ t('意图所至，应用而生。') }}</p>
            <p class="hero-theme">{{ t('2026.09.13–10.17 · 线上比赛 + 优胜项目现场展示') }}</p>
            
            <a class="location" href="https://shenzhen2026.gosim.org/" target="_blank" rel="noreferrer">{{ t('10.17 优胜项目现场展示 · GOSIM Shenzhen 2026 ↗') }}</a>
            
            <div class="actions"><a class="button primary" href="#participate">{{ t('参赛信息') }}<span>↗</span></a><a class="text-link" href="#showcase">{{ t('查看实机 ↓') }}</a></div>
          </div>
        </div>
      </div>
      <div class="hero-bottom"><a class="org-link" href="#tracks">APPCARD / ROBRIX2 / HAGENCY</a><span>{{ t('两大赛道 · 三级阶梯 · 双线评奖') }}</span><a href="#challenge">{{ t('探索赛事 ↓') }}</a></div>
    </section>
    <section id="challenge" class="section challenge"><div class="section-heading"><p class="eyebrow">{{ t('01 / 参赛命题') }}</p><h2>{{ t('意图所至，') }}<br>{{ t('应用而生。') }}</h2><figure class="intent-detail"><HeroDetail region="design" :night="displayedNight" :alt="t('主视觉局部：创作者在绘图屏上绘制应用界面')" /></figure></div><div class="section-body"><p class="lead">{{ t('用一句话，生成一个能用的应用。') }}</p><p>{{ t('面向设计师、产品人、OPC（一人公司）、学生，以及开发者。选择 OctoSense + AppCard 或 robrix2 + hagency，从真实需求出发，完成一款能够演示的应用。') }}</p><p>{{ t('9 月 13 日开放报名与组队。可以单人参赛，也可以多人组队；队长和每位队员均须分别报名。') }}</p><div class="rule"><span>{{ t('共同交付') }}</span><strong>{{ t('跑通的演示 + 进入仓库的 spec / 代码') }}</strong><p>{{ t('使用赛前公布支持的设备与运行环境。无论深入哪一层，最终都要回到「一句话 → 活的 App」。') }}</p></div></div></section>
    <ProjectShowcase :night="displayedNight" />
    <CompetitionTracks />
    <section id="steps" class="section steps"><div class="section-heading wide"><p class="eyebrow">{{ t('03 / 参赛阶梯') }}</p><h2>{{ t('两条赛道，三级深度') }}</h2><p>{{ t('阶梯是加分维度，不是资格线。把 STEP 1 做到极致，同样可以夺冠。') }}</p></div><div class="steps-grid"><article><div class="step-index">01 <span>{{ t('应用层 / APP') }}</span></div><span class="tag">{{ t('从既有能力开始') }}</span><h3>{{ t('用现有能力，') }}<br>{{ t('造一个新 App。') }}</h3><p>{{ t('写清应用需求，组合平台已有数据与组件。赛道 A 做意图卡片，赛道 B 做服务 hagency 工作流程的 robrix2 小程序。') }}</p><div class="step-foot">{{ t('交付 / 需求说明 + 应用 + 测试证据') }}<br><span>{{ t('看重意图设计、信息设计与泛化能力') }}</span></div></article><article><div class="step-index">02 <span>{{ t('能力层 / RUST') }}</span></div><span class="tag">{{ t('技术选做') }}</span><h3>{{ t('没有的数据，') }}<br>{{ t('自己接进来。') }}</h3><p>{{ t('为作品补充数据或操作能力：赛道 A 扩展数据 helper，赛道 B 接入 hagency 的任务、事件或结果数据。完善契约、错误状态与权限边界。') }}</p><div class="step-foot">{{ t('交付 / 新数据能力 + 应用演示') }}<br><span>{{ t('扩展所有参赛者都能使用的能力菜单') }}</span></div></article><article><div class="step-index">03 <span>{{ t('突破层 / PLATFORM') }}</span></div><span class="tag">{{ t('深水区 · 技术选做') }}</span><h3>{{ t('改语言、改渲染，') }}<br>{{ t('也可以改内核。') }}</h3><p>{{ t('创建可视化组件，完善生成与测试工具，或改进小程序的运行、权限与平台接口。每一次平台突破，都要落在作品的体验上。') }}</p><div class="step-foot">{{ t('交付 / 平台贡献 + 应用演示') }}<br><span>{{ t('技术突破必须服务于自己的作品') }}</span></div></article></div></section>
    <section class="section stack"><div class="section-heading"><p class="eyebrow">{{ t('04 / 意图应用平台') }}</p><h2><a href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">Octos · OctoSense · Octoscript</a></h2><p class="stack-lead">{{ t('OctoSense 的方向是运行在操作系统之上的 Agent 交互 Shell：从熟悉的 launcher 和应用入口出发，探索意图理解、环境感知与应用重组。') }}</p><p class="stack-lead">{{ t('OctoSense 探索聊天之外的 Agent 交互：保留人们熟悉的应用入口，让数据、卡片与操作围绕意图组织。') }}</p><ul class="stack-principles"><li><strong>{{ t('熟悉的入口') }}</strong><span>{{ t('新闻、天气、行情、出行仍是稳定的起点，入口之下的内容围绕你的意图生成。') }}</span></li><li><strong>{{ t('主动，而非被动') }}</strong><span>{{ t('探索由时间和事件触发的应用变化，例如降温、航班延误和日程调整。') }}</span></li><li><strong>{{ t('删繁就简') }}</strong><span>{{ t('围绕具体需求组合界面与数据，减少使用应用时无关的信息和步骤。') }}</span></li><li><strong>{{ t('人在回路') }}</strong><span>{{ t('重要决定留给用户。应用应呈现需要确认的事项，并清楚反馈操作结果。') }}</span></li><li><strong>{{ t('情绪价值') }}</strong><span>{{ t('探索适合场景的风格、配色与字体，让动态应用保持可读、易用。') }}</span></li></ul><p class="stack-lead">{{ t('这些是平台探索的方向。参赛时可用的能力、设备与集成范围，以赛前发布包和验证说明为准。') }}</p><figure class="terminal-figure"><HeroDetail region="computing" :night="displayedNight" :alt="t('主视觉局部：创作者在复古电脑上输入，旁边的手机展示应用卡片')" /><figcaption>{{ t('PERSONAL COMPUTING / 从意图到应用') }}</figcaption></figure></div><div class="stack-list"><article><span>{{ t('交互层 / AGENT SHELL') }}</span><h3>OctoSense</h3><p>{{ t('以跨平台为目标的 Agent 交互 Shell，提供应用入口与 launcher，并探索意图驱动的卡片和应用交互。实际支持的系统、数据能力和集成范围以发布包为准。') }}</p></article><article><span>{{ t('语言层 / DSL') }}</span><h3>Octoscript</h3><p>{{ t('由 Makepad 的 Splash 演化而来、面向 Agent 需求优化的动态 DSL。无需编译即可实时解释执行应用逻辑并生成界面，用起来像 JavaScript，底座是 Rust。App Card 与主题模板都由它构建。') }}</p></article><article><span>{{ t('内核层 / HARNESS') }}</span><h3>Octos</h3><p>{{ t('可嵌入的 Rust 原生 Agent harness 内核。多轮交互、上下文与记忆、模型 provider、多 agent 并发、工具与沙箱、用户审批流程，全部抽象为 OS UI protocol 提供给上层应用。') }}</p></article><a class="stack-github" href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">{{ t('在 GitHub 上查看 OctoSense-org →') }}</a></div></section>
    <section id="awards" class="section awards"><div class="section-heading wide"><p class="eyebrow">{{ t('05 / 奖项与评分') }}</p><h2>{{ t('意图设计与技术突破') }}</h2><p>{{ t('一个总冠军，两条奖金对等的评奖线。具体奖金金额待公布。') }}</p></div><div class="awards-grid"><article class="champion"><span>{{ t('GRAND PRIZE / 综合分最高') }}</span><h3>{{ t('总冠军') }}</h3><p>{{ t('可以是纯 L0 的设计杰作，也可以是全栈突破。最终看作品的综合表现。') }}</p></article><article><span>INTENT DESIGN</span><h3>{{ t('最佳意图设计奖') }}</h3><p>{{ t('评选需求覆盖、信息设计、事实准确性与使用体验。无论卡片还是软件工厂小程序，都应帮助用户完成明确任务。') }}</p></article><article><span>TECHNICAL BREAKTHROUGH</span><h3>{{ t('最佳技术突破奖') }}</h3><p>{{ t('评选数据能力契约质量，以及组件、工具链、协议作品的深度与可合并性。') }}</p></article><article class="adoption"><span>AFTER THE HACKATHON</span><h3>{{ t('采纳奖 · 赛后颁发') }}</h3><p>{{ t('10/18–10/31 采纳窗口结束后，按实际合入仓库的 PR、应用与规范补发；不改变线上决赛排名。') }}</p></article></div><div class="scoring"><div><h3>{{ t('评分如何构成？') }}</h3><p>{{ t('STEP 1 的极致设计同样可以拿满创意与完成度分。技术深度加分，不设技术资格门槛。') }}</p></div><div class="score-text-list"><article><div class="score-row-heading"><span>{{ t('项目反哺') }}</span><strong>40%</strong></div><p>{{ t('可合并 PR、入库应用与能力、合格缺口 issue、采纳规范；客观清单及分值赛前公示。') }}</p></article><article><div class="score-row-heading"><span>{{ t('创意与完成度') }}</span><strong>30%</strong></div><p>{{ t('意图到应用的想象力、实际跑通程度，以及服务作品的能力与平台突破。') }}</p></article><article><div class="score-row-heading"><span>{{ t('演示与答辩') }}</span><strong>20%</strong></div><p>{{ t('线上决赛：3 分钟应用 demo + 2 分钟项目贡献，并预留评委问答。') }}</p></article><article><div class="score-row-heading"><span>{{ t('协作与文档') }}</span><strong>10%</strong></div><p>{{ t('让下一个人接得住的 README / spec。混合组队、使用他队能力或工具，双方加分。') }}</p></article></div></div></section>
    <section id="bounties" class="section bounties"><div class="section-heading wide"><p class="eyebrow">{{ t('06 / 悬赏题目') }}</p><h2>{{ t('工具链与平台贡献') }}</h2><p>{{ t('悬赏是 STEP 3 的选题，也可以是赛中的小贡献。以下为蓝图中的建议题目，难度、分值与认领入口将在赛前公布。') }}</p></div><div class="bounty-list compact-bounties"><details v-for="(bounty, i) in bounties" :key="bounty.title"><summary><span class="bounty-number">{{ String(i + 1).padStart(2, '0') }}</span><span>{{ t(bounty.title) }}</span><span class="repo">{{ t(bounty.repo) }}</span></summary><p>{{ t(bounty.description) }}</p></details></div><div class="contribution-note"><strong>{{ t('缺口，也是贡献。') }}</strong><p>{{ t('发现可复现的语言表达缺口、契约漂移、文档错误或误导性诊断？提交合格 issue 即可计分。每队在创意题之外至少认领 1 项悬赏或 issue，颁奖时核验。') }}</p></div></section>
    <EventSchedule />
    <section id="faq" class="section faq"><div class="section-heading"><p class="eyebrow">{{ t('08 / 常见问题') }}</p><h2>{{ t('参赛须知') }}</h2></div><div><details v-for="item in faqs" :key="item.q"><summary>{{ t(item.q) }}<span aria-hidden="true">+</span></summary><p><ConferenceText :text="t(item.a)" /></p></details></div></section>

    <section id="participate" class="section participate"><p class="eyebrow">{{ t('09 / 参赛信息') }}</p><h2>{{ t('Agentic App 黑客松 2026') }}</h2><p><ConferenceText :text="t('2026 年 9 月 13 日开放报名组队，9 月 19 日开营。初赛、复赛和决赛均在线上完成，拟定 10 月 11 日公布获奖结果，前 2–3 名优胜团队获邀于 10 月 17 日在 GOSIM Shenzhen 2026 现场展示。单人、多人均可参赛；队长和每位队员都须分别报名。')" /></p><RegistrationPanel /><p class="small">{{ t('Agentic App 是独立赛事，与智能体工厂、智能体巡天黑客松并行。') }}</p></section>
  </main>
  <footer><a href="/">GOSIM / CREATE</a><span>{{ t('Agentic App 黑客松 · 2026') }}</span><a href="/">{{ t('查看全部黑客松 ↗') }}</a></footer>
</template>
