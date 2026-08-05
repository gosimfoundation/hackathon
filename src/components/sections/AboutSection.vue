<script setup lang="ts">
import { useI18n } from '../../composables/useI18n'
const { t } = useI18n()
</script>

<template>
  <section id="about" class="bg-bg-primary py-24 md:py-36">
    <div class="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14">
      <div class="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div class="reveal">
          <span class="section-kicker">01 / Position</span>
          <h2 class="section-title mt-8">{{ t('about.title') }}</h2>
          <blockquote class="mt-12 border-l border-accent pl-5 text-lg font-medium leading-relaxed text-text-primary md:text-2xl">
            {{ t('about.quote') }}
          </blockquote>
          <p class="mono-label mt-4 pl-5 text-text-muted">{{ t('about.quoteAuthor') }}</p>
        </div>

        <div class="reveal reveal-delay-1 lg:pt-14">
          <div class="max-w-3xl space-y-6 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>{{ t('about.partOf') }} <strong class="font-semibold text-text-primary">{{ t('about.partOfEvent') }}</strong>{{ t('about.partOfSuffix') }}</p>
            <p class="font-medium text-text-primary">{{ t('about.p1') }}</p>
            <p>{{ t('about.p2') }}</p>
            <p>{{ t('about.p3') }}</p>
            <p><strong class="font-semibold text-accent">{{ t('about.p4_bold') }}</strong>{{ t('about.p4_suffix') }}</p>
          </div>
        </div>
      </div>

      <div class="mt-20 grid border-y border-border md:grid-cols-3 md:divide-x md:divide-border">
        <article v-for="n in 3" :key="n" class="reveal px-0 py-8 md:px-7 md:py-10" :class="`reveal-delay-${n}`">
          <div class="mono-label text-accent">0{{ n }}</div>
          <h3 class="mt-8 text-xl font-semibold tracking-[-0.03em] text-text-primary md:text-2xl">{{ t(`about.mission${n}_title`) }}</h3>
          <p class="mt-4 text-sm leading-relaxed text-text-secondary">{{ t(`about.mission${n}_desc`) }}</p>
        </article>
      </div>

      <p class="reveal mt-10 max-w-4xl text-xl font-medium leading-relaxed tracking-[-0.02em] text-text-tertiary md:text-3xl">{{ t('about.closing') }}</p>
    </div>
  </section>
</template>
