<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale } = useI18n()
const isEn = computed(() => locale.value === 'en')

// 第一讲打底，后五讲各讲一条参赛路径。具体时间待定，确定后在本页公布。
const sessions = [
  {
    number: '01',
    group: 'platform',
    zhTitle: 'Hello ARC!',
    enTitle: 'Hello ARC!',
    zhSubtitle: '比赛系统简介',
    enSubtitle: 'An introduction to the competition system',
    zhNote: '了解比赛在哪运行、赛题如何呈现、作品如何提交，以及分数如何产生，为后续课程打好基础。',
    enNote: 'Where the competition runs, what a challenge looks like, how you submit, and where the score comes from. Get the ground under you before the rest of the sessions build on it.',
  },
  {
    number: '02',
    group: 'path',
    zhTitle: '自研智能体',
    enTitle: 'Your own agent',
    zhSubtitle: '参考实现',
    enSubtitle: 'Reference implementation',
    zhNote: '从零搭建参赛智能体：需要哪些组件，以及如何与比赛平台对接。',
    enNote: 'Building an agent from scratch for this competition: which parts you need and how they meet the platform.',
  },
  {
    number: '03',
    group: 'path',
    zhTitle: 'Octos Agent OS',
    enTitle: 'Octos Agent OS',
    zhSubtitle: '开源 · 参考实现',
    enSubtitle: 'Open source · Reference implementation',
    zhNote: '演示使用开源 Octos Agent OS 参赛的完整路径。',
    enNote: 'One complete route through the competition using the open-source Octos Agent OS.',
  },
  {
    number: '04',
    group: 'path',
    zhTitle: 'HAgency Software Factory',
    enTitle: 'HAgency Software Factory',
    zhSubtitle: '开源 · 参考实现',
    enSubtitle: 'Open source · Reference implementation',
    zhNote: '演示使用开源 HAgency Software Factory 参赛的完整路径。',
    enNote: 'One complete route through the competition using the open-source HAgency Software Factory.',
  },
  {
    number: '05',
    group: 'path',
    zhTitle: 'Claude Code',
    enTitle: 'Claude Code',
    zhSubtitle: '参考实现',
    enSubtitle: 'Reference implementation',
    zhNote: '演示使用 Claude Code 参赛的完整路径。',
    enNote: 'One complete route through the competition using Claude Code.',
  },
  {
    number: '06',
    group: 'path',
    zhTitle: 'Codex',
    enTitle: 'Codex',
    zhSubtitle: '参考实现',
    enSubtitle: 'Reference implementation',
    zhNote: '演示使用 Codex 参赛的完整路径。',
    enNote: 'One complete route through the competition using Codex.',
  },
]

// 三场答疑按主题分，覆盖六讲之外参赛者真正会卡住的三块：平台、路径、交付。
const officeHours = [
  {
    number: '01',
    zhTitle: '平台与规则',
    enTitle: 'Platform and rules',
    zhNote: '集中解答 ARC-Bench 使用、沙箱与模型网关、报名与组队，以及赛制和关键日期等问题。',
    enNote: 'Using ARC-Bench, the sandbox and the model gateway, registration and teams, the format and its dates. Whatever session 01 left unclear belongs here.',
  },
  {
    number: '02',
    zhTitle: 'Harness 与智能体',
    enTitle: 'Harnesses and agents',
    zhNote: '集中解答五条参考路径的具体问题，包括自研智能体、Octos、HAgency、Claude Code 和 Codex 的选型、搭建及常见误区。',
    enNote: 'The specifics of the five reference routes — choosing between your own agent, Octos, HAgency, Claude Code, and Codex, building on one, and what tends to go wrong.',
  },
  {
    number: '03',
    zhTitle: '提交与评分',
    enTitle: 'Submission and scoring',
    zhNote: '说明提交包的内容、生产轨迹的保存方式、五项指标的计算方法及申诉流程。本场将在初赛 9 月 30 日截止前举行。',
    enNote: 'What the submission package actually contains, how to keep a production trace, how the five metrics are computed, and how appeals work. Scheduled well before the qualifier closes on September 30.',
  },
]

const purposes = [
  {
    zhTitle: '讲清楚',
    enTitle: 'Make it clear',
    zhDesc: 'Harness Engineering 被谈论得远多于被实践。专家将系统讲解比赛平台和几条主流技术路径，帮助参赛者快速入门。',
    enDesc: 'Harness Engineering is talked about far more than it is practised. An expert walking through the system and the main technical routes gets you there faster than reading the documentation alone.',
  },
  {
    zhTitle: '答疑',
    enTitle: 'Answer questions',
    zhDesc: '建立组织方与参赛者之间的直接沟通渠道。对规则、平台或评分有疑问，都可以现场提出并获得解答。',
    enDesc: 'A direct line between the organizers and the participants. Anything you are unsure about in the rules, the platform, or the scoring — ask it live and get an answer live.',
  },
  {
    zhTitle: '连接',
    enTitle: 'Connect',
    zhDesc: '为参赛者提供交流机会。面对同一道赛题，了解其他队伍选择的路径也很有价值。',
    enDesc: 'Participants need somewhere to meet each other too. Same challenge, different routes — the other teams are worth listening to.',
  },
]
</script>

<template>
  <article class="py-32 bg-bg-primary min-h-screen">
    <div class="max-w-3xl mx-auto px-6 bootcamp-content">
      <router-link to="/" class="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-12">← {{ isEn ? 'Back to Home' : '返回首页' }}</router-link>

      <h1 class="heading-serif text-4xl md:text-5xl text-text-primary mb-4">{{ isEn ? 'Bootcamp' : '研习营' }}</h1>
      <p class="text-text-tertiary mb-2">{{ isEn ? 'September 1 – 15, 2026 · Online video sessions' : '2026 年 9 月 1—15 日 · 线上视频会议' }}</p>
      <p class="text-text-muted text-sm mb-12">{{ isEn ? 'Six teaching sessions and three office hours, each under an hour. Encouraged, never required.' : '六讲课程，三场答疑，每场一小时以内。鼓励参加，但不作要求。' }}</p>

      <p class="lede">{{ isEn ? 'The bootcamp is scaffolding, not a gate. The organizers invite technical experts to explain what you need to know to compete, and to answer questions on the spot. Every session is optional — skipping it costs you nothing in the standings, and attending all nine earns you nothing either. It is here because we would rather you spend the qualifier building than working out how the pieces fit.' : '研习营提供的是支持，不是门槛。组织方将邀请技术专家讲解参赛所需知识，并现场回答问题。所有课程均为自愿参加：缺席不会影响成绩，九场全部参加也不会获得额外加分。设置研习营，是希望你把初赛时间用于实际构建，而不是反复摸索各个环节如何衔接。' }}</p>

      <section>
        <h2>{{ isEn ? '1. How it runs' : '1. 怎么进行' }}</h2>
        <ul>
          <li><strong>{{ isEn ? 'Format' : '形式' }}</strong> — {{ isEn ? 'Zoom or Tencent Meeting. The link for each session is published here before it starts.' : 'Zoom 或腾讯会议。每一讲的会议链接会在开始前发布在本页。' }}</li>
          <li><strong>{{ isEn ? 'Length' : '时长' }}</strong> — {{ isEn ? 'each session is kept under one hour, talk and questions together.' : '每场不超过一小时，讲解和答疑均包含在内。' }}</li>
          <li><strong>{{ isEn ? 'Shape' : '结构' }}</strong> — {{ isEn ? 'the six teaching sessions are led by an invited expert and close with live questions; the three office hours are questions from the first minute.' : '六讲课程由受邀专家主讲，并在结尾安排现场提问；三场答疑则全程用于回答问题。' }}</li>
          <li><strong>{{ isEn ? 'Recordings' : '录像' }}</strong> — {{ isEn ? 'every session is recorded and made available afterwards, so a clash with your timezone is not a problem.' : '每场活动都会录制并在结束后开放回看，因此不必担心时区冲突。' }}</li>
        </ul>
        <p class="muted">{{ isEn ? 'The bootcamp runs alongside the qualifier, which is open the whole time (September 1–30). You do not need to wait for it to finish before you start competing.' : '研习营与初赛同步进行，初赛在 9 月 1—30 日全程开放。无需等研习营结束后再开始参赛。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '2. What it is for' : '2. 它想做成的三件事' }}</h2>
        <ol>
          <li v-for="p in purposes" :key="p.enTitle"><strong>{{ isEn ? p.enTitle : p.zhTitle }}</strong> — {{ isEn ? p.enDesc : p.zhDesc }}</li>
        </ol>
      </section>

      <section>
        <h2>{{ isEn ? '3. The six sessions' : '3. 六讲课程' }}</h2>
        <p>{{ isEn ? 'The first session covers the ground everyone stands on. The remaining five each walk one route through the competition — you do not need all five. Pick the one closest to how you intend to compete, and treat the others as a look at what the teams beside you are doing.' : '第一讲介绍所有参赛者都需要了解的基础。后五讲分别演示一条参赛路径，无需全部参加；请选择最接近自己方案的一讲，其余课程可用于了解其他队伍可能采用的技术路线。' }}</p>

        <ul class="sessionlist">
          <li v-for="s in sessions" :key="s.number">
            <div class="session-head">
              <span class="session-no">{{ s.number }}</span>
              <div>
                <strong>{{ isEn ? s.enTitle : s.zhTitle }}</strong>
                <span class="session-sub">{{ isEn ? s.enSubtitle : s.zhSubtitle }}</span>
              </div>
              <span class="session-tba">{{ isEn ? 'Time TBA' : '时间待定' }}</span>
            </div>
            <span class="block">{{ isEn ? s.enNote : s.zhNote }}</span>
          </li>
        </ul>

        <p class="muted">{{ isEn ? 'All six fall between September 1 and 15. Exact dates and times are still being settled and go up on this page once fixed — no time here is final until it is announced.' : '六讲课程均安排在 9 月 1—15 日。具体日期和时间仍在确认中，确定后将在本页公布；请以正式公告为准。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '4. Three office hours' : '4. 三场答疑' }}</h2>
        <p>{{ isEn ? 'The teaching sessions run one way; the office hours run the other. There is no talk prepared — you bring the questions and the organizers answer them live. Each one has a theme so that the right people are in the room, but a question that lands in the wrong session still gets answered rather than deferred.' : '课程以专家讲解为主，答疑则完全围绕参赛者的问题展开，不设置预先准备的演讲。每场答疑设有主题，便于相关负责人参与；即使问题不完全属于当场主题，也会尽量现场解答，而不会推迟处理。' }}</p>

        <ul class="sessionlist">
          <li v-for="oh in officeHours" :key="oh.number">
            <div class="session-head">
              <span class="session-no">{{ isEn ? 'OH' : '答疑' }}&nbsp;{{ oh.number }}</span>
              <div>
                <strong>{{ isEn ? oh.enTitle : oh.zhTitle }}</strong>
              </div>
              <span class="session-tba">{{ isEn ? 'Time TBA' : '时间待定' }}</span>
            </div>
            <span class="block">{{ isEn ? oh.enNote : oh.zhNote }}</span>
          </li>
        </ul>

        <p class="muted">{{ isEn ? 'The three office hours also fall between September 1 and 15, interleaved with the teaching sessions. Times are posted here once fixed.' : '三场答疑同样安排在 9 月 1 日至 15 日之间，与六讲课程穿插进行。时间确定后公布在本页。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '5. Do I have to attend?' : '5. 必须参加吗？' }}</h2>
        <p>{{ isEn ? 'No. The bootcamp is encouraged but never required, and attendance is not part of the scoring in any form. Registration for the series is complete once you create or join a team; the bootcamp sits outside that.' : '不必。我们鼓励参赛者参加研习营，但不作强制要求，出席情况也不会以任何形式计入评分。创建或加入队伍后即完成赛事报名，是否参加研习营不影响报名状态。' }}</p>
        <p>{{ isEn ? 'If you already know how you intend to build your harness, going straight to the qualifier is a perfectly good plan. If you do not, session 01 is the one to watch.' : '如果已经明确 Harness 的构建方案，可以直接开始初赛；如果尚未确定，建议优先参加第 01 讲。' }}</p>
      </section>

      <p class="closing">{{ isEn ? 'Questions the bootcamp did not answer are worth telling us about — an unanswered question is a gap in our material, not in your preparation.' : '如果研习营未能解答你的问题，请告诉我们——未被覆盖的问题说明我们的材料仍有缺口，并不代表你的准备不足。' }}</p>
    </div>
  </article>
</template>

<style scoped>
.bootcamp-content section { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; }
.bootcamp-content h2 { font-family: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif; color: var(--color-text-primary); font-size: 1.6rem; font-weight: 600; letter-spacing: -.035em; margin-bottom: 1rem; }
.bootcamp-content p, .bootcamp-content li { color: var(--color-text-secondary); line-height: 1.85; margin-bottom: .75rem; }
.bootcamp-content ul, .bootcamp-content ol { padding-left: 1.35rem; list-style: disc; }
.bootcamp-content ol { list-style: decimal; }
.bootcamp-content .lede { font-size: 1.075rem; color: var(--color-text-tertiary); line-height: 1.9; }
.bootcamp-content .muted { color: var(--color-text-muted); font-size: .9rem; }
.bootcamp-content .closing { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; color: var(--color-text-tertiary); }
.bootcamp-content .sessionlist { list-style: none; padding-left: 0; margin-top: 1.75rem; }
.bootcamp-content .sessionlist li { border-left: 2px solid var(--color-border); padding-left: 1rem; margin-bottom: 1.5rem; }
.bootcamp-content .session-head { display: flex; align-items: baseline; gap: .75rem; flex-wrap: wrap; }
.bootcamp-content .session-no { font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: .72rem; color: var(--color-accent); }
.bootcamp-content .session-head strong { color: var(--color-text-primary); font-weight: 600; }
.bootcamp-content .session-sub { display: block; font-size: .88rem; color: var(--color-text-tertiary); margin-top: .15rem; }
.bootcamp-content .session-tba { margin-left: auto; font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: .68rem; text-transform: uppercase; letter-spacing: .08em; color: var(--color-text-muted); border: 1px solid var(--color-border); padding: .15rem .45rem; white-space: nowrap; }
.bootcamp-content .sessionlist span.block { color: var(--color-text-muted); font-size: .92rem; line-height: 1.7; margin-top: .45rem; }
</style>
