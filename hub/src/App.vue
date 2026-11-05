<script setup lang="ts">
import { ref } from 'vue'
import { eventGroups, currentHackathons, type EventStatus } from './events'

type Locale = 'en' | 'zh'

const locale = ref<Locale>('en')
const previousHackathons = eventGroups.flatMap(edition =>
  edition.hackathons.map(hackathon => ({ ...hackathon, edition })),
)

const statusLabel: Record<EventStatus, Record<Locale, string>> = {
  open: { en: 'Registration open', zh: '报名开放' },
  upcoming: { en: 'Upcoming', zh: '即将开始' },
  concluded: { en: 'Completed', zh: '已结束' },
}

function splitName(name: string) {
  const separator = [' — ', ' · '].find(mark => name.includes(mark))
  if (!separator) return { title: name, subtitle: '' }
  const index = name.lastIndexOf(separator)
  return { title: name.slice(0, index), subtitle: name.slice(index + separator.length) }
}

function pick(english: string, chinese: string) {
  return locale.value === 'en' ? english : chinese
}

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  document.documentElement.lang = locale.value === 'en' ? 'en' : 'zh-CN'
}
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="https://create.gosim.org/" :aria-label="pick('GOSIM Create home', 'GOSIM Create 首页')">
        <img src="/images/gosim-logo.svg" alt="GOSIM" />
        <span>Create</span>
      </a>

      <nav class="header-nav" :aria-label="pick('Primary navigation', '主导航')">
        <a href="#current">{{ pick('Latest', '最新') }}</a>
        <a href="#previous">{{ pick('Previous', '往届') }}</a>
        <button class="locale-toggle" type="button" @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
      </nav>
    </header>

    <main>
      <section class="hero" aria-labelledby="page-title">
        <img class="hero-image" src="/images/hackathon-hero.jpg" :alt="pick('Builders working together at GOSIM Paris 2026', 'GOSIM 巴黎 2026 开发者共创现场')" />
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-content">
          <p class="eyebrow">GOSIM / Create</p>
          <h1 id="page-title">{{ pick('GOSIM Create, a Hackathon Series', 'GOSIM Create，黑客松系列') }}</h1>
          <p>{{ pick("The home of GOSIM hackathons—bringing open-source builders together through focused challenges at GOSIM events around the world.", 'GOSIM 旗下黑客松的共同主页，让全球开源开发者围绕专注挑战，在世界各地的 GOSIM 活动中共同创造。') }}</p>
          <a class="hero-link" href="https://gaac.gosim.org/">{{ pick('Explore GAAC', '了解智能体大奖赛 GAAC') }} <span aria-hidden="true">↓</span></a>
        </div>
        <p class="hero-caption">{{ pick('GOSIM Paris 2026 / STATION F', 'GOSIM 巴黎 2026 / STATION F') }}</p>
      </section>

      <section id="current" class="event-section current-section" aria-labelledby="current-section-title">
        <div class="section-intro">
          <p id="current-section-title" class="section-label">
            <span aria-hidden="true">01</span>
            <strong>{{ pick('Latest hackathon', '最新黑客松') }}</strong>
          </p>
        </div>

        <div class="current-grid">
          <article v-for="hackathon in currentHackathons" :key="hackathon.slug" class="event-record" :class="`event-${hackathon.slug}`">
            <a v-if="hackathon.cover" class="current-cover" :href="hackathon.href" :aria-label="pick(hackathon.name, hackathon.nameZh)" tabindex="-1">
              <img :src="hackathon.cover.src" :alt="pick(hackathon.cover.alt, hackathon.cover.altZh)" width="1632" height="1080" loading="lazy" decoding="async" />
            </a>
            <div class="current-body">
              <div class="event-main">
                <p class="organizer">{{ hackathon.code }}</p>
                <h2 :id="`current-${hackathon.slug}-title`">{{ splitName(pick(hackathon.name, hackathon.nameZh)).title }}</h2>
                <p class="event-description">{{ pick(hackathon.description, hackathon.descriptionZh) }}</p>
              </div>
              <aside class="event-details">
                <dl>
                  <div><dt>{{ pick('Dates', '日期') }}</dt><dd>{{ pick(hackathon.dates, hackathon.datesZh) }}</dd></div>
                  <div><dt>{{ pick('Format', '形式') }}</dt><dd>{{ pick(hackathon.format, hackathon.formatZh) }}</dd></div>
                </dl>
              </aside>
              <a class="event-cta" :href="hackathon.href">{{ pick('Visit website', '访问活动网站') }} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      </section>

      <section id="previous" class="event-section previous-section" aria-labelledby="previous-section-title">
        <div class="section-intro">
          <p id="previous-section-title" class="section-label">
            <span aria-hidden="true">02</span>
            <strong>{{ pick('Previous hackathons', '往届黑客松') }}</strong>
          </p>
        </div>

        <div class="archive-grid">
          <article v-for="hackathon in previousHackathons" :key="hackathon.slug" class="archive-card" :aria-labelledby="`previous-${hackathon.slug}-title`">
            <div class="archive-cover" :style="{ '--cover-zoom': hackathon.cover?.zoom ?? 1 }">
              <a :href="hackathon.href" :aria-label="pick(hackathon.name, hackathon.nameZh)" tabindex="-1">
              <img v-if="hackathon.cover" :src="hackathon.cover.src" :alt="pick(hackathon.cover.alt, hackathon.cover.altZh)" loading="lazy" decoding="async" width="800" height="450" />
              </a>
              <span class="archive-status">{{ statusLabel[hackathon.status][locale] }}</span>
            </div>
            <div class="archive-body">
              <a class="archive-edition" :href="hackathon.edition.href" target="_blank" rel="noreferrer">
                {{ pick(hackathon.edition.city, hackathon.edition.cityZh) }} · {{ hackathon.edition.year }} <span aria-hidden="true">↗</span>
              </a>
              <h2 :id="`previous-${hackathon.slug}-title`"><a :href="hackathon.href">{{ splitName(pick(hackathon.name, hackathon.nameZh)).title }}</a></h2>
              <p class="archive-description">{{ pick(hackathon.description, hackathon.descriptionZh) }}</p>
              <div class="archive-footer">
                <p class="archive-date">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/></svg>
                  {{ pick(hackathon.dates, hackathon.datesZh) }}
                </p>
                <a class="archive-link" :href="hackathon.href" :aria-label="`${pick('View hackathon', '查看活动')} — ${pick(hackathon.name, hackathon.nameZh)}`">{{ pick('View hackathon', '查看活动') }} <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <a href="https://gosim.org" target="_blank" rel="noreferrer"><img src="/images/gosim-logo.svg" alt="GOSIM" /></a>
      <span>© {{ new Date().getFullYear() }} GOSIM Foundation</span>
      <a href="https://gosim.org" target="_blank" rel="noreferrer">gosim.org ↗</a>
    </footer>
  </div>
</template>
