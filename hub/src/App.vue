<script setup lang="ts">
import { ref } from 'vue'
import { eventGroups, type EventStatus } from './events'

type Locale = 'en' | 'zh'

const locale = ref<Locale>('en')
const currentEdition = eventGroups[0]!
const currentHackathon = currentEdition.hackathons[0]!
const previousEdition = eventGroups[1]!
const previousHackathon = previousEdition.hackathons[0]!

const statusLabel: Record<EventStatus, Record<Locale, string>> = {
  open: { en: 'Registration open', zh: '报名开放' },
  upcoming: { en: 'Upcoming', zh: '即将开始' },
  concluded: { en: 'Completed', zh: '已结束' },
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
      <a class="brand" href="/" aria-label="GOSIM Hackathons home">
        <img src="/images/gosim-logo.svg" alt="GOSIM" />
        <span>{{ pick('Hackathons', '黑客松') }}</span>
      </a>

      <nav class="header-nav" :aria-label="pick('Primary navigation', '主导航')">
        <a href="#current">{{ pick('Current', '当前') }}</a>
        <a href="#previous">{{ pick('Previous', '往届') }}</a>
        <button class="locale-toggle" type="button" @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
      </nav>
    </header>

    <main>
      <section class="hero" aria-labelledby="page-title">
        <img class="hero-image" src="/images/hackathon-hero.jpg" :alt="pick('Builders working together at GOSIM Paris 2026', 'GOSIM Paris 2026 开发者共创现场')" />
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-content">
          <p class="eyebrow">GOSIM / {{ pick('Open-source hackathons', '开源黑客松') }}</p>
          <h1 id="page-title">{{ pick('Build what should exist.', '创造本应存在的未来。') }}</h1>
          <p>{{ pick('Open-source builders. Focused challenges. Working systems.', '开源开发者，专注挑战，真实成果。') }}</p>
          <a class="hero-link" href="#current">{{ pick('View current hackathon', '查看当前黑客松') }} <span aria-hidden="true">↓</span></a>
        </div>
        <p class="hero-caption">GOSIM Paris 2026 / STATION F</p>
      </section>

      <section id="current" class="event-section current-section" aria-labelledby="current-title">
        <div class="section-intro">
          <p class="section-label">01 / {{ pick('Current hackathon', '当前黑客松') }}</p>
          <span class="status status-open"><i aria-hidden="true"></i>{{ statusLabel[currentHackathon.status][locale] }}</span>
        </div>

        <article class="event-record">
          <div class="event-main">
            <p class="organizer">{{ currentHackathon.organizer }}</p>
            <h2 id="current-title">{{ locale === 'en' ? currentHackathon.name : currentHackathon.nameZh }}</h2>
            <p class="event-description">{{ locale === 'en' ? currentHackathon.description : currentHackathon.descriptionZh }}</p>
          </div>

          <aside class="event-details">
            <dl>
              <div><dt>{{ pick('Dates', '日期') }}</dt><dd>{{ locale === 'en' ? currentHackathon.dates : currentHackathon.datesZh }}</dd></div>
              <div><dt>{{ pick('Format', '形式') }}</dt><dd>{{ locale === 'en' ? currentHackathon.format : currentHackathon.formatZh }}</dd></div>
            </dl>

            <div class="host-note">
              <p>{{ pick('Live finale at', '线下终场举办于') }}</p>
              <strong>GOSIM {{ locale === 'en' ? currentEdition.city : currentEdition.cityZh }} {{ currentEdition.year }}</strong>
              <span>{{ locale === 'en' ? currentEdition.dates : currentEdition.datesZh }} · {{ locale === 'en' ? currentEdition.venue : currentEdition.venueZh }}</span>
              <a :href="currentEdition.href" target="_blank" rel="noreferrer">{{ pick('Conference site', '大会官网') }} ↗</a>
            </div>

            <a class="button button-primary" :href="currentHackathon.href">{{ pick('Enter hackathon', '进入黑客松') }} <span aria-hidden="true">→</span></a>
          </aside>
        </article>
      </section>

      <section id="previous" class="event-section previous-section" aria-labelledby="previous-title">
        <div class="section-intro">
          <p class="section-label">02 / {{ pick('Previous hackathon', '往届黑客松') }}</p>
          <span class="status status-complete">{{ statusLabel[previousHackathon.status][locale] }}</span>
        </div>

        <article class="event-record">
          <div class="event-main">
            <p class="organizer">{{ previousHackathon.organizer }}</p>
            <h2 id="previous-title">{{ locale === 'en' ? previousHackathon.name : previousHackathon.nameZh }}</h2>
            <p class="event-description">{{ locale === 'en' ? previousHackathon.description : previousHackathon.descriptionZh }}</p>
          </div>

          <aside class="event-details">
            <dl>
              <div><dt>{{ pick('Dates', '日期') }}</dt><dd>{{ locale === 'en' ? previousHackathon.dates : previousHackathon.datesZh }}</dd></div>
              <div><dt>{{ pick('Format', '形式') }}</dt><dd>{{ locale === 'en' ? previousHackathon.format : previousHackathon.formatZh }}</dd></div>
            </dl>

            <div class="host-note">
              <p>{{ pick('Held at', '举办于') }}</p>
              <strong>GOSIM {{ locale === 'en' ? previousEdition.city : previousEdition.cityZh }} {{ previousEdition.year }}</strong>
              <span>{{ locale === 'en' ? previousEdition.dates : previousEdition.datesZh }} · {{ locale === 'en' ? previousEdition.venue : previousEdition.venueZh }}</span>
              <a :href="previousEdition.href" target="_blank" rel="noreferrer">{{ pick('Conference archive', '大会回顾') }} ↗</a>
            </div>

            <a class="button button-secondary" :href="previousHackathon.href">{{ pick('View archive', '查看回顾') }} <span aria-hidden="true">→</span></a>
          </aside>
        </article>
      </section>
    </main>

    <footer class="site-footer">
      <a href="https://gosim.org" target="_blank" rel="noreferrer"><img src="/images/gosim-logo.svg" alt="GOSIM" /></a>
      <span>© {{ new Date().getFullYear() }} GOSIM Foundation</span>
      <a href="https://gosim.org" target="_blank" rel="noreferrer">gosim.org ↗</a>
    </footer>
  </div>
</template>
