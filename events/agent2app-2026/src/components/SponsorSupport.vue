<script setup lang="ts">
import { useLocale } from '../useLocale'
const { locale, t } = useLocale()
const asset = (name: string) => `${import.meta.env.BASE_URL}sponsors/${name}`
</script>

<template>
  <section id="sponsors" class="sponsor-support" aria-labelledby="sponsor-title">
    <p class="eyebrow">{{ t('赛事资源支持') }}</p>
    <h3 id="sponsor-title">{{ t('Token 与编程权益赞助') }}</h3>
    <p class="sponsor-intro">{{ t('感谢 MiniMax 与 Kimi，为参赛者提供模型调用与 AI 编程资源，支持从想法到可运行作品。') }}</p>
    <div class="sponsor-grid">
      <article>
        <a class="sponsor-logo" :href="locale === 'en' ? 'https://www.minimax.io/' : 'https://www.minimaxi.com/'" target="_blank" rel="noopener noreferrer">
          <img class="minimax-logo" :src="asset('minimax-logo.png')" width="560" height="129" alt="MiniMax" loading="lazy" decoding="async">
        </a>
        <p class="sponsor-kind">{{ t('MiniMax · Token 赞助') }}</p>
        <h4>{{ t('价值 ¥50,000 的 Token 额度') }}</h4>
        <p>{{ t('MiniMax 开放平台提供文本、语音、视频等模型 API 能力。本次赞助用于赛事奖励与参赛开发，支持 Agent 任务验证、测试和应用迭代。') }}</p>
        <a class="sponsor-link" :href="locale === 'en' ? 'https://www.minimax.io/' : 'https://www.minimaxi.com/'" target="_blank" rel="noopener noreferrer">{{ t('了解 MiniMax →') }}</a>
      </article>
      <article>
        <a class="sponsor-logo" href="https://www.kimi.com/code/" target="_blank" rel="noopener noreferrer">
          <img class="kimi-logo" :src="asset('kimi-logo.svg')" width="428" height="144" alt="Kimi" loading="lazy" decoding="async">
        </a>
        <p class="sponsor-kind">{{ t('Kimi · AI 编程支持') }}</p>
        <h4>{{ t('Kimi 编程权益') }}</h4>
        <p>{{ t('Kimi 由月之暗面（Moonshot AI）研发。本次提供编程权益，支持代码理解、功能开发、调试与测试，帮助参赛者与 Agent 协作完成应用。') }}</p>
        <a class="sponsor-link" href="https://www.kimi.com/code/" target="_blank" rel="noopener noreferrer">{{ t('了解 Kimi Code →') }}</a>
      </article>
    </div>
    <p class="sponsor-note">{{ t('获奖奖励与开发支持分别发放；奖池包含的 Token 计入综合奖励。领取方式与使用期限随资源发放说明公布。') }}</p>
  </section>
</template>

<style scoped>
.sponsor-support { margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); scroll-margin-top: 110px; }
.sponsor-support > .eyebrow { margin: 0 0 12px; }
.sponsor-support h3 { font-size: clamp(25px, 3vw, 34px); line-height: 1.5; margin: 0 0 16px; font-weight: 500; }
.sponsor-intro { max-width: 780px; margin: 0; color: var(--muted); }
.sponsor-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(28px, 5vw, 64px); margin-top: 28px; }
.sponsor-grid article { min-width: 0; padding-top: 24px; border-top: 1px solid var(--border); }
.sponsor-logo { display: flex; align-items: center; justify-content: center; width: 272px; max-width: 100%; height: 108px; padding: 22px; background: #fff; border: 1px solid #e7e7e7; box-sizing: border-box; }
.sponsor-logo img { display: block; height: auto; max-width: 100%; object-fit: contain; }
.minimax-logo { width: 224px; }
.kimi-logo { width: 178px; }
.sponsor-grid .sponsor-kind { color: var(--accent); font-size: 13px; margin: 24px 0 8px; }
.sponsor-grid h4 { font-size: clamp(21px, 2.4vw, 27px); line-height: 1.5; font-weight: 500; margin: 0 0 14px; }
.sponsor-grid p { color: var(--muted); font-size: 15px; line-height: 1.85; margin: 0; }
.sponsor-link { display: inline-block; margin-top: 16px; color: var(--accent); border-bottom: 1px solid currentColor; font-size: 14px; }
.sponsor-note { color: var(--muted); font-size: 13px; line-height: 1.85; margin: 28px 0 0; }
@media (max-width: 760px) { .sponsor-grid { grid-template-columns: 1fr; gap: 28px; } }
</style>
