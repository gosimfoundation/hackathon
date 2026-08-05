<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
import { setTeamFilter } from '../../composables/useTeamFilter'

const { t } = useI18n()
const themeIds: Record<string, string> = {
  '01': 'auth-session',
  '02': 'repository-lifecycle',
  '03': 'issues-forms',
  '04': 'pull-request-review',
  '05': 'actions-workflow',
  '06': 'org-permissions-audit',
  '07': 'compute-engine',
}

const themes = computed(() => t('tracks.themes') as any[])
const injects = computed(() => t('tracks.injects') as string[])
const expandedTheme = ref<string | null>('01')

function toggleTheme(number: string) {
  expandedTheme.value = expandedTheme.value === number ? null : number
}
</script>

<template>
  <section id="themes" class="bg-bg-primary py-24 md:py-36">
    <div class="mx-auto max-w-[1440px] px-6 md:px-10 xl:px-14">
      <div class="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        <div class="reveal lg:sticky lg:top-28 lg:self-start">
          <span class="section-kicker">03 / Challenge Map</span>
          <h2 class="section-title mt-8">{{ t('tracks.title') }}</h2>
          <p class="mt-8 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">{{ t('tracks.intro') }}</p>
        </div>

        <div class="border-t border-border reveal reveal-delay-1">
          <article v-for="theme in themes" :key="theme.number" class="border-b border-border">
            <button class="group grid w-full grid-cols-[3rem_1fr_auto] items-start gap-3 py-6 text-left md:grid-cols-[4rem_1fr_9rem_auto] md:gap-5 md:py-8" @click="toggleTheme(theme.number)">
              <span class="font-mono text-xs text-accent">{{ theme.number }}</span>
              <span>
                <span class="block text-xl font-semibold leading-tight tracking-[-0.035em] text-text-primary md:text-2xl">{{ theme.title }}</span>
                <span class="mt-2 block text-sm text-text-secondary md:hidden">{{ theme.subtitle }}</span>
              </span>
              <span class="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted md:block">{{ theme.stage }}</span>
              <span class="text-lg text-text-muted transition-transform duration-200" :class="expandedTheme === theme.number ? 'rotate-45 text-accent' : ''">＋</span>
            </button>

            <div class="grid overflow-hidden transition-[grid-template-rows] duration-300" :class="expandedTheme === theme.number ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
              <div class="overflow-hidden">
                <div class="grid gap-8 pb-8 pl-[3.75rem] md:grid-cols-[1fr_1fr] md:pl-[5rem]">
                  <div>
                    <p class="text-sm leading-relaxed text-text-primary">{{ theme.description }}</p>
                    <p class="mt-4 text-sm leading-relaxed text-text-secondary">{{ theme.detail }}</p>
                  </div>
                  <div>
                    <div class="mono-label text-text-muted">{{ t('tracks.directionsLabel') }}</div>
                    <ul class="mt-4 border-t border-border-subtle">
                      <li v-for="dir in theme.directions" :key="dir" class="border-b border-border-subtle py-2.5 text-xs leading-relaxed text-text-secondary">{{ dir }}</li>
                    </ul>
                    <button @click.stop="setTeamFilter(themeIds[theme.number] || theme.title)" class="mt-5 border-b border-text-primary pb-1 text-xs font-semibold uppercase tracking-[0.12em] text-text-primary transition-colors hover:border-accent hover:text-accent">
                      {{ t('tracks.viewTeams') }} ↘
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="reveal mt-20 grid border-y border-border py-8 md:grid-cols-[.4fr_1fr] md:gap-10">
        <h3 class="text-xl font-semibold tracking-[-0.03em] text-text-primary">{{ t('tracks.injectsTitle') }}</h3>
        <ul class="mt-6 grid gap-6 md:mt-0 md:grid-cols-2">
          <li v-for="(item, i) in injects" :key="item" class="text-sm leading-relaxed text-text-secondary"><span class="mr-3 font-mono text-accent">0{{ i + 1 }}</span>{{ item }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
