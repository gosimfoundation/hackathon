<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const { locale, t } = useI18n()
const isEn = computed(() => locale.value === 'en')
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
      <p class="text-text-muted text-sm mb-12">{{ t('hero.location') }}</p>

      <section>
        <h2>{{ isEn ? '1. Participation' : '1. 参赛' }}</h2>
        <p>{{ isEn ? 'The qualifier and Grand Challenge are open worldwide and run online. Prior Harness Engineering experience is not required; the bootcamp is designed to get teams ready.' : '资格赛与大奖赛面向全球、全部线上进行。参赛者不必已经掌握 Harness Engineering；训练营就是为队伍就位而设。' }}</p>
        <p>{{ t('teams.registerNote') }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '2. Three-stage series' : '2. 三站赛程' }}</h2>
        <ol>
          <li v-for="round in rounds" :key="round.number"><strong>{{ round.name }}</strong> · {{ round.dates }} · {{ round.format }}<br />{{ round.challenge }}</li>
        </ol>
      </section>

      <section>
        <h2>{{ isEn ? '3. Models and harnesses' : '3. 模型与 Harness' }}</h2>
        <p>{{ isEn ? 'Organizer-issued tokens cover Kimi, GLM, MiniMax, and DeepSeek. Calls go through one gateway for quota enforcement and metering.' : '组织方发放 Kimi、GLM、MiniMax、DeepSeek 的开源模型 Token。所有调用经统一网关限额和计量。' }}</p>
        <p>{{ isEn ? 'The arena is open to Octos, HAgency, ARC, Claude Code, custom harnesses, and others. Teams may change their harness, but cannot change the tests, gateway metering, or scoring.' : '擂台对 Octos、HAgency、ARC、Claude Code、自研及其它 Harness 开放。队伍能改自己的 Harness，但改不到测试、网关计量与评分。' }}</p>
      </section>

      <section>
        <h2>{{ isEn ? '4. Submission package' : '4. 提交物' }}</h2>
        <ul>
          <li>{{ isEn ? 'A runnable rebuild: source code and startup instructions.' : '可运行的复刻：源码与启动方式。' }}</li>
          <li>{{ isEn ? 'The complete production trace: prompts, tool calls, agent iterations, and human intervention points.' : '完整生产轨迹：prompts、工具调用、agent 迭代与人工干预点。' }}</li>
          <li>{{ isEn ? 'A 3–5 minute demo.' : '3–5 分钟 Demo。' }}</li>
        </ul>
      </section>

      <section>
        <h2>{{ isEn ? '5. Judging' : '5. 评审' }}</h2>
        <p>{{ t('judging.desc') }}</p>
        <ul><li v-for="criterion in criteria" :key="criterion.name"><strong>{{ criterion.name }}</strong> · {{ criterion.summary }} — {{ criterion.desc }}</li></ul>
      </section>

      <section>
        <h2>{{ isEn ? '6. Evaluation safeguards' : '6. 评审底线' }}</h2>
        <ul><li v-for="item in fairness" :key="item.title"><strong>{{ item.title }}</strong> — {{ item.desc }}</li></ul>
      </section>

      <section>
        <h2>{{ isEn ? '7. Awards and completion' : '7. 奖项与完赛' }}</h2>
        <p>{{ t('awards.subtitle') }}</p>
        <p>{{ t('awards.certificate') }}. {{ t('awards.gosimSeat') }}</p>
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
