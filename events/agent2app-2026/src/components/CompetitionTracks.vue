<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()
const applications = [
  { title: '任务与阻塞看板', text: '聚合任务、依赖和等待原因，定位需要处理的事项，并回到对应讨论。' },
  { title: 'Agent 工作状态', text: '让团队看懂谁在执行、谁在等待，以及当前任务的进展；清楚区分实时与过期状态。' },
  { title: '结果与验收工作台', text: '把运行结果、测试证据和待确认事项整理成可检查的应用，帮助人完成验收。' },
  { title: '团队协作与交接', text: '围绕项目进展、任务交接或规则提醒设计小程序，减少在消息与工具之间反复查找。' },
]
</script>

<template>
  <section id="tracks" class="section competition-tracks">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('02 / 两大赛道') }}</p>
      <h2>{{ t('为日常意图，也为软件工厂。') }}</h2>
      <p>{{ t('选择一个应用场景，沿三级阶梯深入。两条赛道共用奖项与评分，最终都要交付能用的应用。') }}</p>
    </div>
    <div class="track-overview">
      <article class="track-card">
        <p class="track-label">{{ t('赛道 A / 意图驱动应用') }}</p>
        <h3>OctoSense + AppCard</h3>
        <p>{{ t('从一个日常需求出发，组合数据、卡片与交互，让意图变成可使用的应用。') }}</p>
        <p class="track-examples">{{ t('天气与出行 · 信息速览 · 个人工作流') }}</p>
        <a class="text-link" href="#steps">{{ t('查看参赛阶梯 →') }}</a>
      </article>
      <article class="track-card factory-track-card">
        <p class="track-label">{{ t('赛道 B / 软件工厂小程序') }}</p>
        <h3>robrix2 + hagency</h3>
        <p>{{ t('为 hagency 软件工厂增加实用小程序，在 robrix2 中查看任务、理解 Agent 状态、检查结果并参与协作。') }}</p>
        <p class="track-examples">{{ t('任务进度 · Agent 状态 · 结果验收 · 团队协作') }}</p>
        <a class="text-link" href="#factory-apps">{{ t('查看小程序选题 →') }}</a>
      </article>
    </div>
    <div id="factory-apps" class="factory-brief">
      <div class="factory-intro">
        <p class="eyebrow">{{ t('ROBRIX AGENT2APP / 软件工厂的应用入口') }}</p>
        <h3>{{ t('让团队用得上 Agent 的工作成果。') }}</h3>
        <p>{{ t('hagency（原 hafleet）负责 Agent 编排与任务协作；robrix2 提供熟悉的聊天与工作空间界面。参赛作品为两者之间的具体工作环节增加小程序。') }}</p>
        <p>{{ t('小程序接入将复用 Robrix Agent2App 的脚本运行、宿主能力、权限和版本机制，界面遵循 robrix2 的设计体系。') }}</p>
        <a class="text-link" href="https://github.com/hagency-org/hagency" target="_blank" rel="noopener noreferrer">{{ t('了解 hagency 项目 ↗') }}</a>
        <p class="track-readiness">{{ t('接入环境与参赛开发包准备中。支持的能力、运行包和接口版本将在赛前公布。') }}</p>
      </div>
      <div class="factory-options">
        <article v-for="app in applications" :key="app.title">
          <h4>{{ t(app.title) }}</h4>
          <p>{{ t(app.text) }}</p>
        </article>
      </div>
    </div>
    <div class="factory-delivery">
      <h3>{{ t('这条赛道交付什么？') }}</h3>
      <ol>
        <li>{{ t('一个明确的软件工厂使用场景，以及能在指定 robrix2 环境中运行的小程序。') }}</li>
        <li>{{ t('可审查的源码或应用包、所需能力声明，以及 hagency 数据或事件的接入说明。') }}</li>
        <li>{{ t('一次完整的任务演示：读取状态、执行操作、核对结果，并展示一个失败或过期状态。') }}</li>
        <li>{{ t('可复现的测试与截图。练习数据和真实服务接入分别标明；影响工厂运行的操作由宿主确认。') }}</li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.track-overview { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px; margin-top: 44px; }
.track-card { min-width: 0; border-top: 2px solid var(--border); padding-top: 24px; }
.factory-track-card { border-color: var(--accent); }
.track-label { font: 12px/1.8 var(--mono); color: var(--accent); letter-spacing: .05em; }
.track-card h3 { font-size: clamp(24px, 2.5vw, 34px); line-height: 1.3; margin: 14px 0; }
.track-card p:not(.track-label), .factory-intro > p:not(.eyebrow), .factory-options p, .factory-delivery li { color: var(--muted); font-size: 16px; line-height: 1.85; }
.track-card .track-examples { font-size: 14px; }
.text-link { display: inline-block; margin-top: 12px; color: var(--accent); border-bottom: 1px solid currentColor; font-size: 14px; }
.factory-brief { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 84px); margin-top: 64px; padding-top: 44px; border-top: 1px solid var(--border); scroll-margin-top: 110px; }
.factory-intro, .factory-options { min-width: 0; }
.factory-intro h3 { font-size: clamp(24px, 2.5vw, 32px); line-height: 1.5; margin: 0 0 20px; }
.factory-intro .track-readiness { font-size: 13px; border-left: 2px solid var(--border); padding-left: 16px; margin-top: 26px; }
.factory-options article { border-bottom: 1px solid var(--border); padding: 0 0 18px; margin-bottom: 22px; }
.factory-options h4 { margin: 0 0 8px; font-size: 19px; font-weight: 500; }
.factory-options p { margin: 0; }
.factory-delivery { margin-top: 36px; display: grid; grid-template-columns: 1fr 2fr; gap: 36px; border-top: 1px solid var(--border); padding-top: 30px; }
.factory-delivery h3 { font-size: 23px; margin: 0; }
.factory-delivery ol { margin: 0; padding-left: 22px; }
.factory-delivery li + li { margin-top: 12px; }
@media (max-width: 760px) {
  .track-overview, .factory-brief, .factory-delivery { grid-template-columns: 1fr; gap: 30px; }
  .factory-brief { margin-top: 44px; }
}
</style>
