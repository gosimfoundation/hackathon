<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useLocale } from './useLocale'
const { locale, t, toggleLocale } = useLocale()
import ConferenceText from './components/ConferenceText.vue'
import HeroDetail from './components/HeroDetail.vue'
import HeroMedia from './components/HeroMedia.vue'
import EventSwitcher from './components/EventSwitcher.vue'
import TierMascot from './components/TierMascot.vue'
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
const site = computed(() => locale.value === 'en' ? 'https://octosense.org' : 'https://octosense.org/cn')
const nav = [['challenge', '参赛命题'], ['tracks', '场景赛道'], ['steps', '三级深度'], ['awards', '奖项与评分'], ['schedule', '赛程与培训']]
const tracks = [
  { slug: 'mail', name: '邮件', scenario: '学校把周四接孩子的时间从 16:00 改为 15:30。一封回复和一项日历变更，等你一起处理。' },
  { slug: 'messaging', name: '即时消息', scenario: '朋友在群里约定周五 19:00 聚餐，又发来了餐厅地址。' },
  { slug: 'calendar', name: '日历', scenario: '会议改到更早的时间和另一间办公室，新的时段恰好与私人预约冲突。' },
  { slug: 'weather', name: '天气', scenario: '周六日历上安排了公园野餐，预报却变成午后有雨。' },
  { slug: 'news', name: '新闻', scenario: '你希望每天 06:00 有一份简洁的科技与本地新闻简报，通勤时还能切换成收听。' },
  { slug: 'music', name: '音乐', scenario: '一个下雨的晚上，你有一小时安静时间。Agent 根据收听偏好，准备了一份播放列表。' },
  { slug: 'video', name: '视频', scenario: '你有二十分钟，想理解刚从新闻里保存的一个主题。' },
  { slug: 'markets', name: '财经', scenario: '你关注的一家公司发布了财报。你想先理解这次更新，再决定下一步。' },
  { slug: 'navigation', name: '导航', scenario: '你要在 10:00 到城市另一边赴约，交通变化让提前出发变得更合适。' },
  { slug: 'shopping', name: '购物与物流', scenario: '一盏台灯的订单通过邮件确认、发货、送达。之后，你可能需要找到退货说明。' },
  { slug: 'creation', name: '写作与创作', scenario: '你选中项目文档里的一段长文字，想缩短表达，同时保留引用。' },
  { slug: 'system', name: '系统与设备', scenario: '存储空间不足，Agent 准备清理临时文件，并把个人文档留在本次范围之外。' },
]
const schedule = [
  { time: 'NOW', type: '报名', title: '报名开放 · 组队', description: '填写报名表并加入参赛群，组队集市同步开放。' },
  { time: 'SEP 21–22', type: '开营', title: '开营直播', description: '讲解命题、场景赛道、三级深度、开源要求与奖项。' },
  { time: 'SEP 26+', type: '每周末培训', title: '培训课程', description: 'Octoscript 与 AppCard 流程、Android 真机构建、OctoSense ROM 刷机。课程安排在参赛群内更新。' },
  { time: 'SEP 26–30', type: '初赛', title: '初赛提交与评审', description: '以公开仓库提交作品。国庆前选出 50 支队伍进入决赛。' },
  { time: 'OCT 1–7', type: '决赛', title: '国庆冲刺', description: '决赛队伍获得 token 资源，利用国庆假期完成作品。' },
  { time: 'OCT 8', type: '评审', title: '决赛评审', description: '评出获奖作品，优秀创意进入 OctoSense-org 主仓库的合并流程。' },
  { time: 'GOSIM SZ', type: '现场展示', title: '现场展示', description: '获奖作品在 GOSIM Shenzhen 2026现场展示。' },
]
const faqs = [
  { q: '不会 Rust，也能参赛吗？', a: '可以。鹦鹉螺层用 Octoscript 与 AppCard 流程生成应用和卡片，不需要手写 Rust。整条技术栈是 Rust，潜得越深，Rust 用得越多：帝王蟹与大章鱼是加分项，不是门槛。' },
  { q: '作品必须开源吗？用什么许可证？', a: '必须。作品代码以 Apache License 2.0 在公开仓库提交，初赛与决赛均以仓库为准。平台各项目同样采用 Apache 2.0。优秀创意将进入 OctoSense-org 主仓库的合并流程。' },
  { q: '必须组队吗？没有技术伙伴怎么办？', a: '不强制组队，也不要求每队必须有技术成员。赛前组队集市提供撮合，赛中平台技术台可提供少量能力接线支持。这属于平台服务，不算代做。' },
  { q: '没有合适的手机怎么办？', a: '大章鱼层需要一台 OnePlus 6：这是目前 OctoSense ROM 唯一支持的机型，二手价约两三百元。帝王蟹层可以用任何 Android 手机安装 OctoSense。没有手机，也可以用桌面版演示。' },
  { q: '应用的数据存在哪里？', a: '比赛中用 JSON 文件即可，需要时也可以用 SQLite。示例应用已内置天气等常用数据接口，邮件可以接 Gmail、飞书或任何 POP3 邮箱。告诉 Octos 数据在哪里，Agent 就能读取并把有价值的信息沉淀进记忆。' },
  { q: '只提交创意、设计稿或视频可以吗？', a: '不可以。创意必须通过可运行的开源代码实现。设计图可以交给 AI 生成，再用 image-to-appcard-flow 转成原生界面与卡片；服务规则与交互逻辑需要你自己设计。' },
  { q: '奖金是多少？什么时候开始？', a: '总奖金池 ¥40,000（含 token 资源）。报名已开放，开营、培训与初赛安排见上方赛程，以参赛群通知为准。获奖作品在 GOSIM Shenzhen 2026现场展示。' },
]
</script>

<template>
  <a class="skip-link" href="#main">{{ t('跳转到主要内容') }}</a>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'menu-is-open': menuOpen }">
    <div class="header-brand-group"><a class="brand" href="/" :aria-label="t('GOSIM Create 首页')"><span class="brand-logo" aria-hidden="true" :style="{ maskImage: `url(${base}gosim-logo.svg)`, WebkitMaskImage: `url(${base}gosim-logo.svg)` }"></span><span class="create-wordmark">Create</span></a><EventSwitcher /></div>
    <div class="header-controls"><button class="locale-toggle" type="button" :aria-label="locale === 'zh' ? 'Switch to English' : '切换到中文'" @click="toggleLocale">{{ locale === 'zh' ? 'EN' : '中文' }}</button><button class="theme-toggle" type="button" :aria-pressed="isNight" :aria-label="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :title="isNight ? t('切换到白天模式') : t('切换到夜晚模式')" :disabled="themeLoading" :aria-busy="themeLoading" @click="toggleTheme">
      <svg v-if="isNight" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
      <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.5 14A8.6 8.6 0 0 1 10 3.5 8.8 8.8 0 1 0 20.5 14Z"/></svg>
    </button><span class="registration-status registration-desktop" aria-disabled="true">{{ t('报名进行中') }}</span><button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="navigation" @click="menuOpen = !menuOpen">{{ menuOpen ? t('关闭') : t('菜单') }}</button></div>
    <nav id="navigation" :class="{ open: menuOpen }" :aria-label="t('主导航')"><a v-for="[id, label] in nav" :key="id" :href="`#${id}`" @click="menuOpen = false">{{ t(label) }}</a><span class="registration-status registration-mobile" aria-disabled="true">{{ t('报名进行中') }}</span></nav>
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
            <p class="hero-theme">{{ t('一条纯 Rust 的开源 Agentic 技术栈上，意图所至，应用而生。') }}</p>
            
            <a class="location" href="https://shenzhen2026.gosim.org/" target="_blank" rel="noreferrer">{{ t('现场展示 · GOSIM Shenzhen 2026 ↗') }}</a>
            
            <div class="actions"><a class="button primary" href="#participate">{{ t('参赛信息') }}<span>↗</span></a><a class="text-link" href="#challenge">{{ t('查看命题 ↓') }}</a></div>
          </div>
        </div>
      </div>
      <div class="hero-bottom"><a class="org-link" href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">OCTOS / OCTOSCRIPT / MAKEPAD / OCTOSENSE</a><span>{{ t('纯 Rust 技术栈 · 开源提交 · 真机优先') }}</span><a href="#challenge">{{ t('探索赛事 ↓') }}</a></div>
    </section>
    <section id="challenge" class="section challenge"><div class="section-heading"><p class="eyebrow">{{ t('01 / 参赛命题') }}</p><h2>{{ t('用 Rust 造 Agent，') }}<br>{{ t('让 Agent 造应用。') }}</h2><figure class="intent-detail"><HeroDetail region="design" :night="displayedNight" :alt="t('主视觉局部：创作者在绘图屏上绘制应用界面')" /></figure></div><div class="section-body"><p class="lead">{{ t('什么是 Agent 化的应用？') }}</p><p>{{ t('一句话生成一个应用，今天只要模型不太差就能跑通，这不再是比拼的重点。本届命题是畅想 Agent 化的应用：应用由 Agent 生成，是 Agent 行动的手，也是它与你沟通、交互的方式。') }}</p><p>{{ t('意图不一定来自你对 Agent 说的话。它可能藏在一封邮件、一条消息、一个时间点或一次状态变化里。比如买了一台空调：物流、预约安装、上门、付款、售后，Agent 读完邮件，把每一步整理成等你确认的卡片。') }} <a class="inline-link" :href="`${site}/experience/aircon/`" target="_blank" rel="noopener noreferrer">{{ t('体验空调服务示例 ↗') }}</a></p><p>{{ t('面向设计师、产品人、OPC（一人公司）、学生，以及 Rust 开发者。可以独立参赛，也可以自由组队。') }}</p><div class="rule"><span>{{ t('共同交付') }}</span><strong>{{ t('跑通的演示 + 以 Apache 2.0 开源的代码') }}</strong><p>{{ t('创意与技术一起比，不单设创意赛道：视频或设计稿不能代替可运行的作品。优秀创意将进入 OctoSense-org 主仓库。') }}</p></div></div></section>
    <section id="tracks" class="section tracks"><div class="section-heading wide"><p class="eyebrow">{{ t('02 / 场景赛道') }}</p><h2>{{ t('挑一个系统应用，把它 Agent 化') }}</h2><p>{{ t('以下场景对应 OctoSense 的默认系统应用，每个都附有 octosense.org 上的应用手册与示例情境。选一个赛道，也可以自带场景（例如照片与相机）。想清楚它由什么触发、以什么形态出现、如何让你一步确认。评审最看重作品的 Agent 化程度。') }}</p></div><div class="bounty-list compact-bounties"><details v-for="(track, i) in tracks" :key="track.slug"><summary><span class="bounty-number">{{ String(i + 1).padStart(2, '0') }}</span><span>{{ t(track.name) }}</span><span class="repo">{{ track.slug.toUpperCase() }}</span></summary><p>{{ t(track.scenario) }} <a class="inline-link" :href="`${site}/apps/${track.slug}/`" target="_blank" rel="noopener noreferrer">{{ t('应用手册 ↗') }}</a></p></details></div><div class="contribution-note"><strong>{{ t('界面交给工具，逻辑交给你。') }}</strong><p>{{ t('Octoscript-AppCard 的 image-to-appcard-flow 可以把一张包含 8–12 屏的 AI 生成设计图，转成原生 Makepad 界面、App Card 与可点击的服务流程。octosense.org 上的空调、学校、体检与聚会体验都是这样做出来的。服务规则、状态与交互逻辑仍需你来设计，这正是评审的重点。') }} <a class="inline-link" href="https://github.com/OctoSense-org/Octoscript-AppCard/tree/main/lab/image-to-appcard-flow" target="_blank" rel="noopener noreferrer">image-to-appcard-flow ↗</a></p></div></section>
    <section id="steps" class="section steps"><div class="section-heading wide"><p class="eyebrow">{{ t('03 / 三级深度') }}</p><h2>{{ t('潜得越深，离内核越近') }}</h2><p>{{ t('深度是加分维度，不是资格线。鹦鹉螺做到极致，同样可以夺冠；大章鱼获得最高的技术加分。') }}</p></div><div class="steps-grid"><article><TierMascot kind="nautilus" :label="t('鹦鹉螺 / NAUTILUS')" /><div class="step-index">01 <span>{{ t('鹦鹉螺 / NAUTILUS') }}</span></div><span class="tag">{{ t('应用层 · 设计师与 vibe coder') }}</span><h3>{{ t('选一个场景，') }}<br>{{ t('让它 Agent 化。') }}</h3><p>{{ t('不用写 Rust。用 AI 生成设计图，再用 AppCard 流程生成应用和卡片：由事件驱动，以卡片呈现，在关键处等你确认。桌面与手机同一套代码。') }}</p><div class="step-foot">{{ t('交付 / 可运行的开源应用 + 场景说明') }}<br><span>{{ t('看重 Agent 化程度、交互设计与完成度') }}</span></div></article><article><TierMascot kind="crab" :label="t('帝王蟹 / RUSTACEAN')" /><div class="step-index">02 <span>{{ t('帝王蟹 / RUSTACEAN') }}</span></div><span class="tag">{{ t('真机层 · 重点推荐') }}</span><h3>{{ t('装进手机，') }}<br>{{ t('在真机上跑。') }}</h3><p>{{ t('移动端是本届的重点。用 OctoSense-mobile 构建 APK，在 Android 真机上演示；模拟器演示不计入真机分。') }}</p><div class="step-foot">{{ t('交付 / Android 真机演示') }}<br><span>{{ t('没有手机时，桌面演示兜底') }}</span></div></article><article><TierMascot kind="octopus" :label="t('大章鱼 / GIANT OCTOPUS')" /><div class="step-index">03 <span>{{ t('大章鱼 / GIANT OCTOPUS') }}</span></div><span class="tag">{{ t('ROM 层 · 最高加分') }}</span><h3>{{ t('刷一台章鱼手机，') }}<br>{{ t('改到系统层。') }}</h3><p>{{ t('花两三百元买一台二手 OnePlus 6，刷入 OctoSense ROM：Agent 进入系统层，读取通知、调用系统能力。在 ROM 上做出系统级体验，是最硬核的挑战。') }}</p><div class="step-foot">{{ t('交付 / ROM 上的系统级演示') }}<br><span>{{ t('目前仅支持 OnePlus 6（enchilada）') }}</span></div></article></div></section>
    <section class="section stack"><div class="section-heading"><p class="eyebrow">{{ t('04 / 技术平台') }}</p><h2>{{ t('一条纯 Rust 的开源 Agentic 技术栈') }}</h2><p class="stack-lead">{{ t('从内核、语言、UI 框架到 Shell，整条 Agentic 技术栈都用 Rust 写成，全部以 Apache 2.0 开源。在手机上，Android 底座之上全部是 Rust。') }}</p><p class="stack-lead">{{ t('OctoSense 是运行在操作系统之上的 Agent 交互 Shell。它看起来是你熟悉的 launcher 和应用，行为上却是一个理解你的意图、感知周围变化、并在你开口之前重组这些应用的智能体。今天的 Agent 界面都是聊天框：线性、单向、只有文本。OctoSense 把 Agent 植入应用，而不是把人拉进聊天框。') }}</p><ul class="stack-principles"><li><strong>{{ t('熟悉的入口') }}</strong><span>{{ t('新闻、天气、行情、出行仍是稳定的起点，入口之下的内容围绕你的意图生成。') }}</span></li><li><strong>{{ t('主动，而非被动') }}</strong><span>{{ t('由时间和事件驱动：降温、航班延误、日程变化，都会让应用重新组织、提前准备。') }}</span></li><li><strong>{{ t('人在回路') }}</strong><span>{{ t('重要决定留给你。Agent 把一天提炼成几件需要确认的事，确认后一切随之更新。') }}</span></li><li><strong>{{ t('越用越懂你') }}</strong><span>{{ t('每个应用都是触点，背后是同一个 Agent、同一份记忆，以及对你所处环境持续进化的理解。') }}</span></li></ul><figure class="terminal-figure"><HeroDetail region="computing" :night="displayedNight" :alt="t('主视觉局部：创作者在复古电脑上输入，旁边的手机展示应用卡片')" /><figcaption>{{ t('PERSONAL COMPUTING / 从意图到应用') }}</figcaption></figure></div><div class="stack-list"><article><span>{{ t('内核层 / HARNESS') }}</span><h3><a href="https://github.com/octos-org/octos" target="_blank" rel="noopener noreferrer">Octos</a></h3><p>{{ t('可嵌入的 Rust 原生 Agent harness 内核。多轮交互、上下文与记忆、模型 provider、多 agent 并发、工具与沙箱、用户审批流程，全部抽象为 OS UI protocol 提供给上层应用。') }}</p></article><article><span>{{ t('语言层 / DSL') }}</span><h3><a href="https://github.com/OctoSense-org/Octoscript" target="_blank" rel="noopener noreferrer">Octoscript</a></h3><p>{{ t('由 Makepad 的 Splash 演化而来、用 Rust 实现的动态 DSL。无需编译即可解释执行应用逻辑并生成界面，写法像 JavaScript，Agent 写起来也很顺手。App Card 由它构建。') }}</p></article><article><span>{{ t('界面层 / UI') }}</span><h3><a href="https://github.com/OctoSense-org/makepad" target="_blank" rel="noopener noreferrer">Makepad</a></h3><p>{{ t('Rust 跨平台 UI 框架，一套代码运行在桌面、Android 与 Web（WebAssembly）。Agent 可以直接读取完整的 UI 树与每个节点的状态，不必靠截屏去“看”界面。') }}</p></article><article><span>{{ t('交互层 / AGENT SHELL') }}</span><h3><a href="https://github.com/OctoSense-org/OctoSense" target="_blank" rel="noopener noreferrer">OctoSense</a></h3><p>{{ t('Agent 交互 Shell：应用启动、窗口管理与应用管理，可以模拟 iOS、Android、经典 Windows 或 Omarchy 等多种桌面风格。手机版见 OctoSense-mobile。') }}</p></article><article><span>{{ t('系统层 / ROM') }}</span><h3><a href="https://github.com/OctoSense-org/octosense-rom" target="_blank" rel="noopener noreferrer">OctoSense ROM</a></h3><p>{{ t('基于 LineageOS 的 OnePlus 6 ROM，内置 OctoSense launcher 与系统桥，让 Agent 进入系统层。') }}</p></article><a class="stack-github" href="https://github.com/orgs/OctoSense-org/" target="_blank" rel="noopener noreferrer">{{ t('在 GitHub 上查看 OctoSense-org →') }}</a></div></section>
    <section id="awards" class="section awards"><div class="section-heading wide"><p class="eyebrow">{{ t('05 / 奖项与评分') }}</p><h2>{{ t('总奖金池 ¥40,000') }}</h2><p>{{ t('奖金池含 token 资源。奖项设置为暂定，最终以赛前公布为准。') }}</p></div><div class="awards-grid"><article class="champion"><span>{{ t('FIRST PRIZE / 1 名') }}</span><h3>{{ t('一等奖') }}</h3><p>{{ t('可以是鹦鹉螺的设计杰作，也可以是大章鱼的系统级突破。最终看作品的综合表现。') }}</p></article><article><span>{{ t('SECOND PRIZE / 2 名') }}</span><h3>{{ t('二等奖') }}</h3><p>{{ t('Agent 化程度与完成度俱佳的作品。') }}</p></article><article><span>{{ t('THIRD PRIZE / 3 名') }}</span><h3>{{ t('三等奖') }}</h3><p>{{ t('创意鲜明、在真机上跑通的作品。') }}</p></article><article class="adoption"><span>{{ t('FINALISTS & BEYOND') }}</span><h3>{{ t('决赛资源 · 纪念奖 · 进入主仓') }}</h3><p>{{ t('进入决赛的 50 支队伍获得 token 资源；线上参赛者可获纪念奖。优秀创意进入 OctoSense-org 主仓库，成为项目的一部分。') }}</p></article></div><div class="scoring"><div><h3>{{ t('评分如何构成？') }}</h3><p>{{ t('深度加分，不设技术资格门槛。鹦鹉螺的极致设计同样可以拿满创意与完成度分。') }}</p></div><div class="score-text-list"><article><div class="score-row-heading"><span>{{ t('Agent 化程度') }}</span><strong>40%</strong></div><p>{{ t('由什么触发、以什么形态出现、如何让人一步确认；应用是否真正成为 Agent 的手。') }}</p></article><article><div class="score-row-heading"><span>{{ t('创意与完成度') }}</span><strong>30%</strong></div><p>{{ t('场景的想象力、实际跑通程度，以及鹦鹉螺、帝王蟹、大章鱼的深度加分。') }}</p></article><article><div class="score-row-heading"><span>{{ t('真机演示') }}</span><strong>20%</strong></div><p>{{ t('3 分钟真机 demo + 2 分钟讲清作品的 Agent 化设计。') }}</p></article><article><div class="score-row-heading"><span>{{ t('开源与文档') }}</span><strong>10%</strong></div><p>{{ t('Apache 2.0 仓库、让下一个人接得住的 README，以及可合并进主仓的质量。') }}</p></article></div></div></section>
    <section id="schedule" class="section schedule"><div class="section-heading"><p class="eyebrow">{{ t('06 / 赛程与培训') }}</p><h2>{{ t('初赛、决赛与现场展示') }}</h2><p>{{ t('以下为暂定安排，以参赛群通知为准。') }}<br><ConferenceText :text="t('获奖作品在 GOSIM Shenzhen 2026现场展示。')" /></p><div class="schedule-note"><strong>{{ t('每周末培训') }}</strong><p>{{ t('从 AppCard 生成应用开始，逐步深入 Android 真机与 ROM。讲义也将成为项目文档。') }}</p></div></div><div class="timeline compact-timeline"><details v-for="item in schedule" :key="item.time"><summary><span class="session-time">{{ item.time }}</span><span>{{ t(item.title) }}</span></summary><div><p class="session-type">{{ t(item.type) }}</p><p>{{ t(item.description) }}</p></div></details></div></section>
    <section id="faq" class="section faq"><div class="section-heading"><p class="eyebrow">{{ t('07 / 常见问题') }}</p><h2>{{ t('参赛须知') }}</h2></div><div><details v-for="item in faqs" :key="item.q"><summary>{{ t(item.q) }}<span aria-hidden="true">+</span></summary><p><ConferenceText :text="t(item.a)" /></p></details></div></section>

    <section id="participate" class="section participate"><p class="eyebrow">{{ t('08 / 参赛信息') }}</p><h2>{{ t('Agentic App 黑客松 2026') }}</h2><p><ConferenceText :text="t('报名进行中。作品以 Apache 2.0 开源提交，获奖作品在 GOSIM Shenzhen 2026现场展示。')" /></p><a class="button primary" href="#steps">{{ t('了解三级深度 ↗') }}</a><p class="small">{{ t('Agentic App 是独立赛事，与智能体工厂、智能体巡天黑客松并行。') }}</p></section>
  </main>
  <footer><a href="/">GOSIM / CREATE</a><span>{{ t('Agentic App 黑客松 · 2026') }}</span><a href="/">{{ t('查看全部黑客松 ↗') }}</a></footer>
</template>
