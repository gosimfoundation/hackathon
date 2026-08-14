<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale, t } = useI18n()
const isEn = computed(() => locale.value === 'en')
const locationLines = computed(() => t('hero.location') as string[])
const rounds = computed(() => t('schedule.rounds') as any[])
const criteria = computed(() => t('judging.criteria') as any[])
const fairness = computed(() => t('judging.fairness') as any[])
</script>

<template>
  <article class="py-32 bg-bg-primary min-h-screen">
    <div class="max-w-3xl mx-auto px-6 rules-content">
      <router-link to="/" class="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-12">← {{ isEn ? 'Back to Home' : '返回首页' }}</router-link>

      <h1 class="heading-serif text-4xl md:text-5xl text-text-primary mb-4">{{ isEn ? 'Event Rules & Format' : '赛制与规则' }}</h1>
      <p class="text-text-tertiary mb-2">{{ t('hero.eventTitle') }}</p>
      <p v-for="line in locationLines" :key="line" class="text-text-muted text-sm last:mb-12">{{ line }}</p>

      <section>
        <h2>{{ isEn ? '1. Participation' : '1. 参赛' }}</h2>
        <p>{{ isEn ? 'The qualifier and Grand Challenge are open worldwide and run online. Prior Harness Engineering experience is not required; the bootcamp is designed to get teams ready.' : '初赛和大奖赛面向全球开放，均在线上举行。参赛者无需具备 Harness Engineering 经验；研习营将帮助各队做好参赛准备。' }}</p>
        <p>{{ t('teams.registerNote') }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '2. Three-stage series' : '2. 三阶段赛程' }}</h2>
        <ol>
          <li v-for="round in rounds" :key="round.number"><strong>{{ round.name }}</strong> · {{ round.dates }} · {{ round.format }}<br />{{ round.challenge }}</li>
        </ol>
      </section>

      <section>
        <h2>{{ isEn ? '3. Models and harnesses' : '3. 模型与 Harness' }}</h2>
        <p>{{ isEn ? 'Organizer-issued tokens cover Kimi, GLM, MiniMax, and DeepSeek. Calls go through one gateway for quota enforcement and metering.' : '组织方将发放 Kimi、GLM、MiniMax 和 DeepSeek 等开源模型的 Token。所有调用均通过统一网关执行配额限制和计量。' }}</p>
        <p>{{ isEn ? 'The competition is open to Octos, HAgency, ARC, Claude Code, custom agents, and others. Teams may change their harness, but cannot change the tests, gateway metering, or scoring.' : '赛事向 Octos、HAgency、ARC、Claude Code、自研智能体及其他方案开放。队伍可以修改自己的 Harness，但不能修改测试、网关计量方式或评分规则。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '4. Submission package' : '4. 提交物' }}</h2>
        <ul>
          <li>{{ isEn ? 'A runnable rebuild: source code and startup instructions.' : '可运行的复刻成果：源代码和启动说明。' }}</li>
          <li>{{ isEn ? 'The complete production trace: prompts, tool calls, agent iterations, and human intervention points.' : '完整的生产过程轨迹：提示词、工具调用、智能体迭代和人工干预点。' }}</li>
          <li>{{ isEn ? 'A 3–5 minute demo.' : '一段 3—5 分钟的演示视频。' }}</li>
        </ul>
      </section>

      <section>
        <h2>{{ isEn ? '5. Judging' : '5. 评审' }}</h2>
        <p>{{ t('judging.desc') }}</p>
        <ul><li v-for="criterion in criteria" :key="criterion.name"><strong>{{ criterion.name }}</strong> · {{ criterion.summary }} — {{ criterion.desc }}</li></ul>
      </section>

      <section>
        <h2>{{ isEn ? '6. Evaluation safeguards' : '6. 评测保障' }}</h2>
        <ul><li v-for="item in fairness" :key="item.title"><strong>{{ item.title }}</strong> — {{ item.desc }}</li></ul>
      </section>

      <section>
        <h2>{{ isEn ? '7. Awards and completion' : '7. 奖项与完赛' }}</h2>
        <p>{{ t('awards.subtitle') }}</p>
        <p>{{ t('awards.certificate') }}{{ isEn ? '. ' : '。' }}{{ t('awards.gosimSeat') }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '8. Organizer authority' : '8. 组织方权利' }}</h2>
        <p>{{ isEn ? 'The organizers reserve the right to interpret these rules, to adjust the format and schedule of the series, and to make the final ruling on results and disputes.' : '大赛规则的解释权、赛程与赛制的调整权，以及评审结果与争议的最终裁定权，均归组织方所有。' }}</p>
        <p>{{ isEn ? 'Where the rules change, the version published on this site governs, and the change is posted on this page. Where a situation arises that the rules do not cover, the organizers decide it. Appeals concerning scores, penalties, or eligibility are settled by the organizers, and that decision is final.' : '规则如有调整，以官网公布的版本为准，改动会在本页更新。比赛过程中出现规则未覆盖的情形，由组织方裁定；对成绩、判罚与参赛资格的申诉，经组织方裁定后为最终结果。' }}</p>
      </section>
    </div>
  </article>
</template>

<style scoped>
.rules-content section { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; }
.rules-content h2 { font-family: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif; color: var(--color-text-primary); font-size: 1.6rem; font-weight: 600; letter-spacing: -.035em; margin-bottom: 1rem; }
.rules-content p, .rules-content li { color: var(--color-text-secondary); line-height: 1.8; margin-bottom: .75rem; }
.rules-content ul, .rules-content ol { padding-left: 1.35rem; list-style: disc; }
.rules-content ol { list-style: decimal; }
</style>
