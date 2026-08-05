<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'
const { locale, t } = useI18n()
const isEn = computed(() => locale.value === 'en')
</script>

<template>
  <article class="py-32 bg-bg-primary min-h-screen">
    <div class="max-w-3xl mx-auto px-6 vision-content">
      <router-link to="/" class="inline-flex items-center gap-2 text-text-tertiary hover:text-text-primary transition-colors mb-12">← {{ isEn ? 'Back to Home' : '返回首页' }}</router-link>
      <p class="text-xs text-accent uppercase tracking-[0.2em] mb-4">{{ t('about.partOfEvent') }}</p>
      <h1 class="heading-serif text-4xl md:text-6xl text-text-primary mb-5">{{ t('about.title') }}</h1>
      <p class="text-text-tertiary mb-12">{{ t('hero.location') }}</p>

      <blockquote class="heading-serif text-2xl text-text-tertiary border-l-2 border-accent pl-6 mb-12">{{ t('about.quote') }}<small class="block text-sm text-text-muted mt-3">{{ t('about.quoteAuthor') }}</small></blockquote>

      <section>
        <h2>{{ isEn ? 'The wager' : '赌注' }}</h2>
        <p>{{ t('about.p1') }}</p><p>{{ t('about.p2') }}</p>
      </section>
      <section>
        <h2>{{ isEn ? 'The method' : '打法' }}</h2>
        <p>{{ t('about.p3') }}</p><p><strong>{{ t('about.p4_bold') }}</strong>{{ t('about.p4_suffix') }}</p>
      </section>
      <section>
        <h2>{{ isEn ? 'The engineering standard' : '工程标准' }}</h2>
        <div v-for="n in 3" :key="n" class="mb-7"><h3>{{ t(`about.mission${n}_title`) }}</h3><p>{{ t(`about.mission${n}_desc`) }}</p></div>
      </section>
      <p class="text-center italic text-text-tertiary heading-serif text-xl border-t border-border pt-10 mt-12">{{ t('about.closing') }}</p>
    </div>
  </article>
</template>

<style scoped>
.vision-content section { border-top: 1px solid var(--color-border); padding-top: 2.5rem; margin-top: 2.5rem; }
.vision-content h2 { font-family: 'Space Grotesk', 'Noto Sans SC', system-ui, sans-serif; color: var(--color-text-primary); font-size: 1.75rem; font-weight: 600; letter-spacing: -.035em; margin-bottom: 1rem; }
.vision-content h3 { color: var(--color-text-primary); font-weight: 700; margin-bottom: .4rem; }
.vision-content p { color: var(--color-text-secondary); line-height: 1.85; margin-bottom: 1rem; }
</style>
