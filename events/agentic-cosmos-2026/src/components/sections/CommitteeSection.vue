<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '../../composables/useI18n'
import zhaiZhongxuImage from '../../assets/images/committee-zhai-zhongxu.webp'
import wangWeiImage from '../../assets/images/committee-wang-wei.webp'
import liuDeziImage from '../../assets/images/committee-liu-dezi.webp'
import liuXiangkunImage from '../../assets/images/committee-liu-xiangkun.webp'
import shanHuanyuanImage from '../../assets/images/committee-shan-huanyuan.webp'
import tanTingImage from '../../assets/images/committee-tan-ting.webp'
import luoYifeiImage from '../../assets/images/committee-luo-yifei.webp'
import octosLogo from '../../assets/images/octos-logo.webp'

const { t } = useI18n()

type MemberCopy = {
  name: string
  institution: string
  role: string
}

const portraits = [
  { src: zhaiZhongxuImage, position: '50% 38%' },
  { src: wangWeiImage, position: '50% 25%' },
  { src: liuDeziImage, position: '50% 38%' },
  { src: liuXiangkunImage, position: '50% 32%' },
  { src: shanHuanyuanImage, position: '50% 28%' },
  { src: tanTingImage, position: '42% 50%' },
  { src: luoYifeiImage, position: '50% 34%' },
]

const members = computed(() =>
  (t('committee.members') as MemberCopy[]).map((member, index) => ({
    ...member,
    ...portraits[index],
  })),
)
</script>

<template>
  <section id="committee" class="poster-section poster-canvas py-24 md:py-40">
    <div class="mx-auto max-w-[1600px] px-5 md:px-10 xl:px-14">
      <div class="grid gap-10 border-b poster-rule pb-12 lg:grid-cols-[1.05fr_.95fr] lg:items-end lg:gap-24">
        <div class="reveal">
          <span class="poster-kicker">{{ t('committee.kicker') }}</span>
          <h2 class="section-title distressed-type mt-9">{{ t('committee.title') }}</h2>
        </div>

        <div class="reveal reveal-delay-1 lg:pb-2">
          <div class="font-mono text-xs uppercase tracking-[.12em] text-[#edb28b]">04 / 07</div>
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">{{ t('committee.intro') }}</p>
        </div>
      </div>

      <div class="committee-grid reveal mt-14 grid grid-cols-1 gap-px border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <article
          v-for="(member, index) in members"
          :key="member.name"
          class="committee-card group min-w-0 bg-[#101d29] p-3 pb-6 md:p-4 md:pb-7"
        >
          <div class="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-[.1em] text-text-tertiary">
            <span>SC / {{ String(index + 1).padStart(2, '0') }}</span>
            <span class="h-px w-8 bg-[#edb28b] transition-[width] duration-300 group-hover:w-12"></span>
          </div>
          <div class="committee-portrait aspect-[4/5] overflow-hidden bg-[#18242f]">
            <img
              :src="member.src"
              :alt="member.name"
              :style="{ objectPosition: member.position }"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </div>
          <h3 class="mt-6 text-2xl font-semibold leading-none tracking-[-.03em] text-[#f0e9dd]">{{ member.name }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-text-secondary">{{ member.institution }}</p>
          <p class="mt-1 font-mono text-xs uppercase leading-relaxed tracking-[.06em] text-[#edb28b]">{{ member.role }}</p>
        </article>
      </div>

      <div class="reveal mt-20 grid gap-8 border-y poster-rule py-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-20">
        <div>
          <span class="font-mono text-xs uppercase tracking-[.14em] text-[#edb28b]">{{ t('committee.support.kicker') }}</span>
          <h3 class="mt-5 text-3xl font-semibold leading-tight tracking-[-.03em] text-[#f0e9dd] md:text-4xl">{{ t('committee.support.title') }}</h3>
          <p class="mt-5 max-w-xl text-sm leading-relaxed text-text-secondary md:text-base">{{ t('committee.support.desc') }}</p>
        </div>

        <a
          href="https://github.com/octos-org/"
          target="_blank"
          rel="noopener noreferrer"
          class="octos-card group grid min-h-44 grid-cols-[7rem_1fr] items-center gap-7 border border-white/25 bg-[#16232f] p-5 transition-colors hover:border-[#edb28b] md:grid-cols-[9rem_1fr] md:p-7"
          :aria-label="t('committee.support.linkLabel')"
        >
          <span class="grid aspect-square place-items-center bg-[#f3ede2] p-3">
            <img :src="octosLogo" :alt="t('committee.support.logoAlt')" class="h-full w-full object-contain">
          </span>
          <span class="min-w-0">
            <span class="block font-mono text-xs uppercase tracking-[.12em] text-text-tertiary">Open-source agent OS</span>
            <strong class="mt-3 block text-4xl font-semibold tracking-[-.05em] text-[#f0e9dd] md:text-5xl">Octos</strong>
            <span class="mt-4 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[.08em] text-[#edb28b]">
              {{ t('committee.support.cta') }}
              <span class="text-lg transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
            </span>
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.committee-portrait img {
  filter: grayscale(.78) contrast(1.08) saturate(.7);
  transform: scale(1.002);
  transition: filter .45s ease, transform .6s cubic-bezier(.2,.75,.25,1);
}

.committee-card:hover .committee-portrait img {
  filter: grayscale(0) contrast(1.02) saturate(.92);
  transform: scale(1.035);
}

.octos-card {
  text-decoration: none;
}

@media (max-width: 520px) {
  .octos-card { grid-template-columns: 5.5rem 1fr; gap: 1rem; }
}
</style>
