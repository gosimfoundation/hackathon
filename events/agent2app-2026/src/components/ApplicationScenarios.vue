<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../useLocale'
const { locale, t } = useLocale()
const octosenseSite = computed(() => locale.value === 'en' ? 'https://octosense.org' : 'https://octosense.org/cn')
const scenarios = [
  { slug: 'mail', title: '邮件', text: '从来信中识别安排与变化，提出日程更新和回复草稿，确认后执行。' },
  { slug: 'messaging', title: '即时消息 · robrix2', text: '从会话中整理约定与待办，在 robrix2 中操作，并把结果带回原会话。' },
  { slug: 'calendar', title: '日历', text: '发现时间冲突，提出替代安排，区分待确认与已落实的日程。' },
  { slug: 'weather', title: '天气', text: '结合天气、空气质量与活动计划，提出有来源、可确认的出行建议。' },
  { slug: 'news', title: '新闻', text: '围绕关注主题准备简报，保留来源与时间，让用户决定何时阅读或收听。' },
  { slug: 'music', title: '音乐', text: '围绕专注、通勤等情境组织播放任务，让选择、操作与播放状态相连。' },
  { slug: 'video', title: '视频', text: '根据问题与可用时间整理观看清单，支持开始观看、调整与继续。' },
  { slug: 'markets', title: '财经', text: '把公告与行情变化整理成研究卡，清楚区分事实、来源与分析。' },
  { slug: 'navigation', title: '导航', text: '结合日程、地点与路况提出出发计划，确认后导航，并跟进变化。' },
  { slug: 'shopping', title: '购物与物流', text: '把订单、物流、安装与售后连成同一项任务，持续更新需要处理的事项。' },
  { slug: 'creation', title: '写作与创作', text: '将素材与目标变成可迭代的创作任务，支持修改约束、比较版本与确认。' },
  { slug: 'system', title: '系统与设备', text: '从设备状态发现维护需求，说明操作范围，授权后执行并核验结果。' },
]
</script>

<template>
  <section id="tracks" class="section application-scenarios" aria-labelledby="scenarios-title">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('02 / 场景选题') }}</p>
      <h2 id="scenarios-title">{{ t('从熟悉的应用，走向 Agent 自动化。') }}</h2>
      <p>{{ t('以 OctoSense 为核心，从官方应用指南推荐的 12 个场景中选择一个主要方向，也可以联动多个场景。所有场景统一参评。') }}</p>
      <a class="text-link" :href="`${octosenseSite}/#apps`" target="_blank" rel="noopener noreferrer">{{ t('查看 OctoSense 应用指南 ↗') }}</a>
    </div>
    <div class="scenario-grid">
      <article v-for="(scenario, index) in scenarios" :key="scenario.slug" class="scenario-card" :class="{ featured: index < 2 }">
        <span class="scenario-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3>{{ t(scenario.title) }}</h3>
        <p>{{ t(scenario.text) }}</p>
        <a class="text-link" :href="`${octosenseSite}/apps/${scenario.slug}/`" target="_blank" rel="noopener noreferrer" :aria-label="t(scenario.title) + ' · ' + t('阅读场景指南')">{{ t('阅读场景指南') }} ↗</a>
        <a v-if="scenario.slug === 'messaging'" class="text-link messaging-link" href="#messaging">{{ t('查看 robrix2 专题 ↓') }}</a>
      </article>
    </div>
    <p class="scenario-note">{{ t('这些是选题建议。官方指南包含概念体验与示例数据；参赛可用能力和运行环境以发布包及验证说明为准。') }}</p>
    <div id="messaging" class="messaging-brief">
      <div class="messaging-intro">
        <p class="eyebrow">OCTOSENSE / ROBRIX2</p>
        <h3>{{ t('让对话里的约定，成为可以完成的任务。') }}</h3>
        <p>{{ t('即时消息场景以 robrix2 为指定宿主，沿用其会话、消息与联系人界面。Agent 从对话中识别意图，将安排和待办整理成可操作的卡片或小程序，经用户授权后执行，并把结果带回原会话。') }}</p>
        <p class="readiness-note">{{ t('小程序接入将复用 Robrix Agent2App 的运行、宿主能力、权限与版本机制，主要 UI 沿用 robrix2。接入环境与开发包准备中，实操以公布支持的能力为准。') }}</p>
      </div>
      <div class="messaging-examples">
        <article>
          <h4>{{ t('日常协作：把聚会安排落实') }}</h4>
          <p>{{ t('群聊确定时间与地点 → 检查日程冲突 → 确认回复或加入日历 → 后续变更更新同一张任务卡。每一步都能回到来源消息。') }}</p>
        </article>
        <article id="factory-apps">
          <h4>{{ t('软件协作：robrix2 + hagency') }}</h4>
          <p>{{ t('hagency（原 hafleet）提供任务编排与协作数据。为软件工厂增加任务进度、Agent 状态、结果验收或交接小程序，在 robrix2 中查看、确认并跟进结果。') }}</p>
          <a class="text-link" href="https://github.com/hagency-org/hagency" target="_blank" rel="noopener noreferrer">{{ t('了解 hagency 项目 ↗') }}</a>
        </article>
        <p class="scenario-note">{{ t('hagency 服务于软件协作选题，其他场景不要求接入软件工厂。') }}</p>
      </div>
    </div>
    <div class="scenario-delivery">
      <h3>{{ t('每个场景，都要完成一项任务。') }}</h3>
      <ol>
        <li>{{ t('明确用户、输入事件与目标，提供可运行的应用、开源代码和能力说明。') }}</li>
        <li>{{ t('展示 Agent 如何读取状态、提出行动并执行；重要操作让用户查看和授权。') }}</li>
        <li>{{ t('核验操作结果，展示后续状态更新，以及失败、拒绝或过期时的处理。') }}</li>
        <li>{{ t('提交可复现的测试和截图，区分练习数据、概念展示与真实服务接入。') }}</li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.scenario-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 36px; margin-top: 40px; }
.scenario-card { min-width: 0; border-top: 1px solid var(--border); padding-top: 20px; }
.scenario-card.featured { border-top: 2px solid var(--accent); }
.scenario-number { font: 12px/1.8 var(--mono); color: var(--accent); }
.scenario-card h3 { font-size: 23px; line-height: 1.5; margin: 8px 0 12px; }
.scenario-card p, .messaging-brief p, .scenario-delivery li { color: var(--muted); font-size: 15px; line-height: 1.85; }
.scenario-card p { margin: 0; }
.text-link { display: inline-block; margin-top: 12px; color: var(--accent); border-bottom: 1px solid currentColor; font-size: 14px; }
.messaging-link { margin-left: 14px; }
.scenario-note { color: var(--muted); font-size: 13px; line-height: 1.85; margin: 28px 0 0; }
.messaging-brief { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 6vw, 84px); margin-top: 56px; padding-top: 36px; border-top: 1px solid var(--border); scroll-margin-top: 110px; }
.messaging-intro, .messaging-examples { min-width: 0; }
.messaging-intro h3 { font-size: clamp(24px, 2.5vw, 32px); line-height: 1.5; margin: 0 0 20px; }
.messaging-intro .readiness-note { font-size: 13px; border-left: 2px solid var(--border); padding-left: 16px; margin-top: 26px; }
.messaging-examples article { border-bottom: 1px solid var(--border); padding: 0 0 18px; margin-bottom: 22px; scroll-margin-top: 110px; }
.messaging-examples h4 { margin: 0 0 8px; font-size: 19px; font-weight: 500; }
.messaging-examples p { margin: 0; }
.scenario-delivery { margin-top: 36px; display: grid; grid-template-columns: 1fr 2fr; gap: 36px; border-top: 1px solid var(--border); padding-top: 30px; }
.scenario-delivery h3 { font-size: 23px; margin: 0; line-height: 1.5; }
.scenario-delivery ol { margin: 0; padding-left: 22px; }
.scenario-delivery li + li { margin-top: 12px; }
@media (max-width: 1000px) { .scenario-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 760px) {
  .messaging-brief, .scenario-delivery { grid-template-columns: 1fr; gap: 30px; }
  .messaging-brief { margin-top: 44px; }
}
@media (max-width: 480px) { .scenario-grid { grid-template-columns: 1fr; gap: 28px; } }
</style>
