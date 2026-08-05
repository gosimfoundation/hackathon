<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
const { t } = useI18n()
const models = computed(() => t('tech.models') as string[])
const frameworks = computed(() => t('tech.frameworkList') as string[])
</script>

<template>
  <section class="bg-bg-secondary py-24 md:py-36">
    <div class="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14">
      <div class="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
        <div class="reveal">
          <span class="section-kicker">04 / Stack</span>
          <h2 class="section-title mt-8">{{ t('tech.title') }} {{ t('tech.titleAccent') }}</h2>
        </div>
        <p class="reveal reveal-delay-1 max-w-3xl self-end text-base leading-relaxed text-text-secondary md:text-lg">
          {{ t('tech.desc_prefix') }}<strong class="font-semibold text-text-primary">{{ t('tech.desc_bold') }}</strong>{{ t('tech.desc_suffix') }}
        </p>
      </div>

      <div class="reveal mt-16 grid grid-cols-2 border-l border-t border-border md:grid-cols-4">
        <div v-for="(model, i) in models" :key="model" class="border-b border-r border-border p-5 md:p-7">
          <span class="mono-label text-accent">M0{{ i + 1 }}</span>
          <div class="mt-8 text-lg font-semibold tracking-[-0.03em] text-text-primary md:text-2xl">{{ model }}</div>
        </div>
      </div>

      <div class="mt-10 grid border-t border-border lg:grid-cols-2">
        <article class="reveal border-b border-border py-8 lg:border-r lg:p-10 lg:pl-0">
          <span class="mono-label text-accent">{{ t('tech.frameworks') }}</span>
          <ul class="mt-7">
            <li v-for="(item, i) in frameworks" :key="item" class="grid grid-cols-[2.5rem_1fr] border-t border-border-subtle py-3 text-sm text-text-secondary">
              <span class="font-mono text-[10px] text-text-muted">0{{ i + 1 }}</span><span>{{ item }}</span>
            </li>
          </ul>
          <p class="mt-8 text-lg font-semibold text-text-primary">{{ t('tech.openArena') }}</p>
        </article>
        <article class="reveal reveal-delay-1 border-b border-border py-8 lg:p-10 lg:pr-0">
          <div class="font-mono text-5xl font-medium tracking-[-0.06em] text-accent md:text-7xl">ARC</div>
          <p class="mt-8 text-sm leading-relaxed text-text-secondary md:text-base">{{ t('tech.arcDesc') }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
