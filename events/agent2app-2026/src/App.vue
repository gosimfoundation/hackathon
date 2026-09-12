<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useLocale } from './useLocale'
const { locale, t, toggleLocale } = useLocale()
import ConferenceText from './components/ConferenceText.vue'
import HeroDetail from './components/HeroDetail.vue'
import HeroMedia from './components/HeroMedia.vue'
import EventSwitcher from './components/EventSwitcher.vue'
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
const nav = [['challenge', '参赛命题'], ['steps', '三级阶梯'], ['awards', '奖项与评分'], ['bounties', '悬赏榜'], ['schedule', '赛程与培训']]
const bounties = [
  { title: 'L0 Web Playground', description: '输入脚本，实时预览卡片。头号悬赏；若赛前已有 MVP，则转为体验增强。', repo: 'Octoscript' },
  { title: 'check-ui CLI 与 LSP 接入', description: '把 L0 校验带进命令行与编辑器，让创作反馈更及时。', repo: 'Octoscript' },
  { title: '更有用的错误诊断', description: '错误码与修复建议，帮助模型理解失败并完成自修复。', repo: 'Octoscript' },
  { title: '结构化 lint 引擎', description: '从子串匹配走向 OR、禁止与计数规则，提升卡片质量校验。', repo: 'OctoSense' },
  { title: '跨仓库 schema 契约测试', description: '为 Octoscript 与 OctoSense 的接口一致性提供自动检查。', repo: '双仓协作' },
  { title: 'L0 parser fuzz', description: '测试解析器边界，提高面对复杂输入时的稳定性。', repo: 'Octoscript' },
  { title: 'L1 规范撰写', description: '把语言行为写成清晰规范，技术写作者也可认领。', repo: 'Octoscript' },
  { title: 'UI Protocol 最小客户端', description: '用 TypeScript 或 Python，把 octos 接到手机之外的界面。', repo: 'octos' },
  { title: '协议 schema / typegen / conformance', description: '完善 schema 导出、类型生成或协议一致性测试。', repo: 'octos' },
  { title: 'new-skill 脚手架', description: '简化 manifest 与注册流程，让新能力更容易起步。', repo: 'octos' },
  { title: '「生产回路 Agent」演示', description: '读取自身运行指标，发现卡片失败，自动修复并重新发布。', repo: 'octos' },
]
const schedule = [
  { time: 'T − 21', type: '赛前启动', title: '命题发布 · 开放报名', description: '公布阶梯、双评奖线、悬赏榜与分值，收集技能标签，启动组队撮合。' },
  { time: 'T − 14', type: '全员必修 / 90 MIN', title: '第 0 讲 · Agent 化的软件', description: '理解主题，看「一句话 → 活卡片」真机演示，了解赛制，参加组队集市。' },
  { time: 'T − 10', type: '全员必修 / 120 MIN', title: '第 1 讲 · L0 语言速成', description: '学习声明、no-facts 与事件，使用能力菜单，写一张卡并通过 validator；提交 app.md 草稿。' },
  { time: 'T − 7', type: '技术选修 / 120 MIN', title: '第 2 讲 · Rust 能力与组件', description: '从预打包环境跑到真机，添加最小数据源，学习组件注册与跨后端契约。' },
  { time: 'T − 4', type: '技术选修 / 120 MIN', title: '第 3 讲 · 悬赏题导览', description: '理解 Octoscript 工具链与 octos 协议，逐题了解切入点、交付物和验收标准。' },
  { time: 'DAY 1–2', type: '比赛 / 48 小时以内', title: '动手构建 · 中途检查 · 最终演示', description: 'Mentor、平台技术台与环境急救台值守；中途进行 checkpoint demo，最后展示完整作品。' },
  { time: 'T + 14', type: '赛后合并窗口', title: '贡献合入 · 采纳奖 · 作品归档', description: 'Mentor 协助完善 PR；合并窗口结束，按实际采纳结果补发奖励，作品进入 examples 与应用库。' },
]
const faqs = [
  { q: '不会 Rust，也能独立参赛吗？', a: '可以。STEP 1 是零编译路径，用既有能力写需求式 spec、lint 规则和参考卡片即可。最佳意图设计奖与最佳技术突破奖的奖金对等，纯 L0 作品也可争夺总冠军。' },
  { q: '必须组队吗？没有技术伙伴怎么办？', a: '不强制组队，也不要求每队必须有技术成员。赛前组队集市提供撮合，赛中平台技术台可提供少量能力接线支持。这属于平台服务，不算代做。' },
  { q: '没有 Android 手机怎么办？', a: '蓝图安排测试机供现场演示，并提供桌面路径作为兜底。设备借用方式与环境包将在赛前说明中公布。' },
  { q: '什么是 no-facts？', a: '模型只写布局与数据绑定，不编造天气、价格等事实。真实数据在渲染时由 sys.* helper 获取；卡片应遵守能力菜单与 L0 校验规则。' },
  { q: '做工具链或内核，就不用做应用了吗？', a: '仍需回到统一命题：一句话变成能用的应用。技术突破必须服务自己的作品演示；悬赏贡献另计项目反哺分，不替代演示。' },
  { q: '报名什么时候开放？奖金是多少？', a: '现场展示与 GOSIM Shenzhen 2026同期举办。具体报名时间、比赛赛程、奖金金额及官方资源入口尚待公布。本页先提供参赛命题与蓝图中的赛制安排。' },
]
</script>

<template>
  <a class="skip-link" href="#main">{{ t('跳转到主要内容') }}</a>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'menu-is-open': menuOpen }">
    <div class="header-brand-group"><a class="brand" href="/" :aria-label="t('GOSIM Create 首页')"><span class="brand-logo" aria-hidden="true" :style="{ maskImage: `url(${base}gosim-logo.svg)`, WebkitMaskImage: `url(${base}gosim-logo.svg)` }"></span><span class="create-wordmark">Create</span></a><EventSwitcher /></div>
    <div class="header-controls"><button class="locale-toggle" type="button" :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'" @click="toggleLocale">{{ locale === 'zh' ? 'EN' : '中文' }}</button><button class="theme-toggle" type="button" :aria-pressed="isNight" :aria-label="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :title="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :disabled="themeLoading" :aria-busy="themeLoading" @click="toggleTheme">
      <svg v-if="isNight" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 14A8.6 8.6 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/></svg>
    </button><span class="registration-status registration-desktop" aria-disabled="true">{{ t('报名即将开始') }}</span><button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="navigation" @click="menuOpen = !menuOpen">{{ menuOpen ? t('关闭') : t('菜单') }}</button></div>
    <nav id="navigation" :class="{ open: menuOpen }" :aria-label="t('主导航')"><a v-for="[id, label] in nav" :key="id" :href="`#${id}`" @click="menuOpen = false">{{ t(label) }}</a><span class="registration-status registration-mobile" aria-disabled="true">{{ t('报名即将开始') }}</span></nav>
  </header>
  <main id="main">
    <section class="hero" aria-labelledby="event-title">
      <HeroMedia :night="displayedNight" />
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-stage">
        <div class="hero-copy">
          <p class="eyebrow"><a href="https://shenzhen2026.gosim.org/" target="_blank" rel="noopener noreferrer">GOSIM Shenzhen 2026</a> / AGENTIC APP</p>
          <h1 id="event-title" v-if="locale === 'en'">The Intent<br>Is the <span>App.</span></h1><h1 id="event-title" v-else class="zh">意图<br>即<span>应用。</span></h1>
          <div class="hero-details">
            <h2>{{ t('Agentic App 黑客松') }}</h2>
            <p class="hero-theme">{{ t('意图所至，应用而生。') }}</p>
            
            <a class="location" href="https://shenzhen2026.gosim.org/" target="_blank" rel="noreferrer">{{ t('现场展示 · GOSIM Shenzhen 2026 ↗') }}</a>
            
            <div class="actions"><a class="button primary" href="#participate">{{ t('参赛信息') }}<span>↗</span></a><a class="text-link" href="#challenge">{{ t('查看命题 ↓') }}</a></div>
          </div>
        </div>
      </div>
      <div class="hero-bottom"><a class="org-link" href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">OCTOS / OCTOSENSE / OCTOSCRIPT</a><span>{{ t('单一命题 · 三级阶梯 · 双线评奖') }}</span><a href="#challenge">{{ t('探索赛事 ↓') }}</a></div>
    </section>
    <section id="challenge" class="section challenge"><div class="section-heading"><p class="eyebrow">{{ t('01 / 参赛命题') }}</p><h2>{{ t('意图所至，') }}<br>{{ t('应用而生。') }}</h2><figure class="intent-detail"><HeroDetail region="design" :night="displayedNight" :alt="t('主视觉局部：创作者在绘图屏上绘制应用界面')" /></figure></div><div class="section-body"><p class="lead">{{ t('用一句话，生成一个能用的应用。') }}</p><p>{{ t('面向设计师、产品人、OPC（一人公司）、学生，以及懂 Rust 的开发者。围绕 OctoSense，从一个真实意图出发，完成一款能够演示的应用。') }}</p><p>{{ t('可以独立参赛，也可以自由组队。赛前组队集市帮助你找到伙伴，赛中平台技术台提供能力接线支持。') }}</p><div class="rule"><span>{{ t('共同交付') }}</span><strong>{{ t('跑通的演示 + 进入仓库的 spec / 代码') }}</strong><p>{{ t('真机优先，桌面演示兜底。无论深入哪一层，最终都要回到「一句话 → 活的 App」。') }}</p></div></div></section>
    <section id="steps" class="section steps"><div class="section-heading wide"><p class="eyebrow">{{ t('02 / 参赛阶梯') }}</p><h2>{{ t('一个命题，三级深度') }}</h2><p>{{ t('阶梯是加分维度，不是资格线。把 STEP 1 做到极致，同样可以夺冠。') }}</p></div><div class="steps-grid"><article><div class="step-index">01 <span>{{ t('意图层 / L0') }}</span></div><span class="tag">{{ t('零编译 · 人人可做') }}</span><h3>{{ t('用现有能力，') }}<br>{{ t('造一个新 App。') }}</h3><p>{{ t('写一份需求式 app.md，配上 lint 规则与参考卡片。组合既有数据源和组件，设计旅行计划、买菜清单、健身打卡或播客速览。') }}</p><div class="step-foot">{{ t('交付 / spec + lint + 参考卡片') }}<br><span>{{ t('看重意图设计、信息设计与泛化能力') }}</span></div></article><article><div class="step-index">02 <span>{{ t('能力层 / RUST') }}</span></div><span class="tag">{{ t('技术选做') }}</span><h3>{{ t('没有的数据，') }}<br>{{ t('自己接进来。') }}</h3><p>{{ t('为你的创意新增一个 sys.* helper：公共交通、汇率、日历或空气质量。完善契约、错误处理与限流，让新能力真正服务应用。') }}</p><div class="step-foot">{{ t('交付 / 新数据能力 + 应用演示') }}<br><span>{{ t('扩展所有参赛者都能使用的能力菜单') }}</span></div></article><article><div class="step-index">03 <span>{{ t('突破层 / PLATFORM') }}</span></div><span class="tag">{{ t('深水区 · 技术选做') }}</span><h3>{{ t('改语言、改渲染，') }}<br>{{ t('也可以改内核。') }}</h3><p>{{ t('创建可视化组件，打通 L0 交互态，或认领悬赏榜中的工具链与协议题目。每一次平台突破，都要落在作品的体验上。') }}</p><div class="step-foot">{{ t('交付 / 平台贡献 + 应用演示') }}<br><span>{{ t('技术突破必须服务于自己的作品') }}</span></div></article></div></section>
    <section class="section stack"><div class="section-heading"><p class="eyebrow">{{ t('03 / 技术平台') }}</p><h2><a href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">octos · OctoSense · Octoscript</a></h2><p class="stack-lead">{{ t('OctoSense 是运行在操作系统之上的 Agent 交互 Shell。它看起来是你熟悉的 launcher 和应用，行为上却是一个理解你的意图、感知周围变化、并在你开口之前重组这些应用的智能体。') }}</p><p class="stack-lead">{{ t('今天的 Agent 界面都是聊天框：线性、单向、只有文本。OctoSense 走另一条路，保留人们已经熟悉的应用交互，把 Agent 植入应用，而不是把人拉进聊天框。') }}</p><ul class="stack-principles"><li><strong>{{ t('熟悉的入口') }}</strong><span>{{ t('新闻、天气、行情、出行仍是稳定的起点，入口之下的内容围绕你的意图生成。') }}</span></li><li><strong>{{ t('主动，而非被动') }}</strong><span>{{ t('由时间和事件驱动：降温、航班延误、日程变化，都会让应用重新组织、提前准备。') }}</span></li><li><strong>{{ t('删繁就简') }}</strong><span>{{ t('把为十亿人打造的超级应用裁剪到你需要的部分，持续生成、持续进化。') }}</span></li><li><strong>{{ t('人在回路') }}</strong><span>{{ t('重要决定留给你。Agent 把一天提炼成几件需要确认的事，确认后一切随之更新。') }}</span></li><li><strong>{{ t('情绪价值') }}</strong><span>{{ t('风格、配色、字体随人和时刻变化。像章鱼一样，它在感知，也在变色。') }}</span></li></ul><p class="stack-lead">{{ t('你看到的每个应用都是触点。触点背后是同一个 Agent、同一份记忆，以及对你所处环境持续进化的理解。') }}</p><figure class="terminal-figure"><HeroDetail region="computing" :night="displayedNight" :alt="t('主视觉局部：创作者在复古电脑上输入，旁边的手机展示应用卡片')" /><figcaption>{{ t('PERSONAL COMPUTING / 从意图到应用') }}</figcaption></figure></div><div class="stack-list"><article><span>{{ t('交互层 / AGENT SHELL') }}</span><h3>OctoSense</h3><p>{{ t('跨平台的 Agent 交互 Shell，运行在 Windows、macOS、Linux、Android、iOS 与鸿蒙之上。既是你熟悉的应用入口与 launcher，也是意图驱动、主动感知的智能体：每个应用只是触点，背后是统一的记忆与持续进化的理解。') }}</p></article><article><span>{{ t('语言层 / DSL') }}</span><h3>Octoscript</h3><p>{{ t('由 Makepad 的 Splash 演化而来、面向 Agent 需求优化的动态 DSL。无需编译即可实时解释执行应用逻辑并生成界面，用起来像 JavaScript，底座是 Rust。App Card 与主题模板都由它构建。') }}</p></article><article><span>{{ t('内核层 / HARNESS') }}</span><h3>octos</h3><p>{{ t('可嵌入的 Rust 原生 Agent harness 内核。多轮交互、上下文与记忆、模型 provider、多 agent 并发、工具与沙箱、用户审批流程，全部抽象为 OS UI protocol 提供给上层应用。') }}</p></article><a class="stack-github" href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">{{ t('在 GitHub 上查看 OctoSense-org →') }}</a></div></section>
    <section id="awards" class="section awards"><div class="section-heading wide"><p class="eyebrow">{{ t('04 / 奖项与评分') }}</p><h2>{{ t('意图设计与技术突破') }}</h2><p>{{ t('一个总冠军，两条奖金对等的评奖线。具体奖金金额待公布。') }}</p></div><div class="awards-grid"><article class="champion"><span>{{ t('GRAND PRIZE / 综合分最高') }}</span><h3>{{ t('总冠军') }}</h3><p>{{ t('可以是纯 L0 的设计杰作，也可以是全栈突破。最终看作品的综合表现。') }}</p></article><article><span>INTENT DESIGN</span><h3>{{ t('最佳意图设计奖') }}</h3><p>{{ t('评选意图覆盖、信息设计与美感、no-facts 规则，以及 spec 的泛化能力。让不同问法都能得到正确的卡片。') }}</p></article><article><span>TECHNICAL BREAKTHROUGH</span><h3>{{ t('最佳技术突破奖') }}</h3><p>{{ t('评选数据能力契约质量，以及组件、工具链、协议作品的深度与可合并性。') }}</p></article><article class="adoption"><span>AFTER THE HACKATHON</span><h3>{{ t('采纳奖 · 赛后颁发') }}</h3><p>{{ t('赛后两周合并窗口结束时，按实际合入仓库的 PR、应用与规范补发。') }}</p></article></div><div class="scoring"><div><h3>{{ t('评分如何构成？') }}</h3><p>{{ t('STEP 1 的极致设计同样可以拿满创意与完成度分。技术深度加分，不设技术资格门槛。') }}</p></div><div class="score-text-list"><article><div class="score-row-heading"><span>{{ t('项目反哺') }}</span><strong>40%</strong></div><p>{{ t('可合并 PR、入库应用与能力、合格缺口 issue、采纳规范；客观清单及分值赛前公示。') }}</p></article><article><div class="score-row-heading"><span>{{ t('创意与完成度') }}</span><strong>30%</strong></div><p>{{ t('意图到应用的想象力、实际跑通程度，以及服务作品的能力与平台突破。') }}</p></article><article><div class="score-row-heading"><span>{{ t('现场演示') }}</span><strong>20%</strong></div><p>{{ t('3 分钟真机 demo + 2 分钟讲清「我的作品让项目多了什么」。') }}</p></article><article><div class="score-row-heading"><span>{{ t('协作与文档') }}</span><strong>10%</strong></div><p>{{ t('让下一个人接得住的 README / spec。混合组队、使用他队能力或工具，双方加分。') }}</p></article></div></div></section>
    <section id="bounties" class="section bounties"><div class="section-heading wide"><p class="eyebrow">{{ t('05 / 悬赏题目') }}</p><h2>{{ t('工具链与平台贡献') }}</h2><p>{{ t('悬赏是 STEP 3 的选题，也可以是赛中的小贡献。以下为蓝图中的建议题目，难度、分值与认领入口将在赛前公布。') }}</p></div><div class="bounty-list compact-bounties"><details v-for="(bounty, i) in bounties" :key="bounty.title"><summary><span class="bounty-number">{{ String(i + 1).padStart(2, '0') }}</span><span>{{ t(bounty.title) }}</span><span class="repo">{{ t(bounty.repo) }}</span></summary><p>{{ t(bounty.description) }}</p></details></div><div class="contribution-note"><strong>{{ t('缺口，也是贡献。') }}</strong><p>{{ t('发现可复现的语言表达缺口、契约漂移、文档错误或误导性诊断？提交合格 issue 即可计分。每队在创意题之外至少认领 1 项悬赏或 issue，颁奖时核验。') }}</p></div></section>
    <section id="schedule" class="section schedule"><div class="section-heading"><p class="eyebrow">{{ t('06 / 赛程与培训') }}</p><h2>{{ t('赛前培训与比赛安排') }}</h2><p>{{ t('以下为建议相对赛程，T 为比赛开始日。') }}<br><ConferenceText :text="t('现场展示与 GOSIM Shenzhen 2026同期举办，具体赛程待公布。')" /></p><div class="schedule-note"><strong>{{ t('必修两讲 + 选修两讲') }}</strong><p>{{ t('非技术参赛者从 L0 开始；技术参赛者可继续深入 Rust、工具链与协议。讲义也将成为项目文档。') }}</p></div></div><div class="timeline compact-timeline"><details v-for="item in schedule" :key="item.time"><summary><span class="session-time">{{ item.time }}</span><span>{{ t(item.title) }}</span></summary><div><p class="session-type">{{ t(item.type) }}</p><p>{{ t(item.description) }}</p></div></details></div></section>
    <section id="faq" class="section faq"><div class="section-heading"><p class="eyebrow">{{ t('07 / 常见问题') }}</p><h2>{{ t('参赛须知') }}</h2></div><div><details v-for="item in faqs" :key="item.q"><summary>{{ t(item.q) }}<span aria-hidden="true">+</span></summary><p><ConferenceText :text="t(item.a)" /></p></details></div></section>

    <section id="participate" class="section participate"><p class="eyebrow">{{ t('08 / 参赛信息') }}</p><h2>{{ t('Agentic App 黑客松 2026') }}</h2><p><ConferenceText :text="t('现场展示与 GOSIM Shenzhen 2026同期举办。报名入口、比赛具体赛程及奖金金额待公布。')" /></p><a class="button primary" href="#steps">{{ t('先了解参赛阶梯 ↗') }}</a><p class="small">{{ t('Agentic App 是独立赛事，与智能体工厂、智能体巡天黑客松并行。') }}</p></section>
  </main>
  <footer><a href="/">GOSIM / CREATE</a><span>{{ t('Agentic App 黑客松 · 2026') }}</span><a href="/">{{ t('查看全部黑客松 ↗') }}</a></footer>
</template>
