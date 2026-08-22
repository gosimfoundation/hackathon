<script setup lang="ts">
import { ref } from 'vue'
import { eventGroups, type EventStatus } from './events'

type Locale = 'en' | 'zh'

const locale = ref<Locale>('en')
const currentEdition = eventGroups[0]!
const currentHackathons = currentEdition.hackathons
const previousEdition = eventGroups[1]!
const previousHackathons = previousEdition.hackathons

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
      <a class="brand" href="/" aria-label="GOSIM Create home">
        <img src="/images/gosim-logo.svg" alt="GOSIM" />
        <span>{{ pick('Create', '共创') }}</span>
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
          <p class="eyebrow">GOSIM / {{ pick('Create', '共创') }}</p>
          <h1 id="page-title">{{ pick('GOSIM Create, a Hackathon Series', 'GOSIM Create，黑客松系列') }}</h1>
          <p>{{ pick("The home of GOSIM hackathons—bringing open-source builders together through focused challenges at GOSIM events around the world.", 'GOSIM 旗下黑客松的共同主页，让全球开源开发者围绕专注挑战，在世界各地的 GOSIM 活动中共同创造。') }}</p>
          <a class="hero-link" href="#current">{{ pick('View current hackathons', '查看当前黑客松') }} <span aria-hidden="true">↓</span></a>
        </div>
        <p class="hero-caption">GOSIM Paris 2026 / STATION F</p>
      </section>

      <section id="current" class="event-section current-section" aria-labelledby="current-section-title">
        <div class="section-intro">
          <p id="current-section-title" class="section-label">01 / {{ pick('Current hackathons', '当前黑客松') }}</p>
        </div>

        <article v-for="hackathon in currentHackathons" :key="hackathon.slug" class="event-record">
          <div class="event-main">
            <div class="event-heading">
              <p class="organizer">{{ hackathon.organizer }}</p>
              <span class="status status-open"><i aria-hidden="true"></i>{{ statusLabel[hackathon.status][locale] }}</span>
            </div>
            <h2 :id="`current-${hackathon.slug}-title`">{{ locale === 'en' ? hackathon.name : hackathon.nameZh }}</h2>
            <p class="event-description">{{ locale === 'en' ? hackathon.description : hackathon.descriptionZh }}</p>
          </div>

          <aside class="event-details">
            <dl>
              <div><dt>{{ pick('Dates', '日期') }}</dt><dd>{{ locale === 'en' ? hackathon.dates : hackathon.datesZh }}</dd></div>
              <div><dt>{{ pick('Format', '形式') }}</dt><dd>{{ locale === 'en' ? hackathon.format : hackathon.formatZh }}</dd></div>
            </dl>

            <div class="host-note">
              <p>{{ pick('Live finale at', '线下终场举办于') }}</p>
              <strong>GOSIM {{ locale === 'en' ? currentEdition.city : currentEdition.cityZh }} {{ currentEdition.year }}</strong>
              <span>{{ locale === 'en' ? currentEdition.dates : currentEdition.datesZh }} · {{ locale === 'en' ? currentEdition.venue : currentEdition.venueZh }}</span>
              <a :href="currentEdition.href" target="_blank" rel="noreferrer">{{ pick('Conference site', '大会官网') }} ↗</a>
            </div>

            <a class="button button-primary" :href="hackathon.href">{{ pick('Enter hackathon', '进入黑客松') }} <span aria-hidden="true">→</span></a>
          </aside>
        </article>
      </section>

      <section id="previous" class="event-section previous-section" aria-labelledby="previous-section-title">
        <div class="section-intro">
          <p id="previous-section-title" class="section-label">02 / {{ pick('Previous hackathons', '往届黑客松') }}</p>
        </div>

        <article v-for="hackathon in previousHackathons" :key="hackathon.slug" class="event-record">
          <div class="event-main">
            <div class="event-heading">
              <p class="organizer">{{ hackathon.organizer }}</p>
              <span class="status status-complete">{{ statusLabel[hackathon.status][locale] }}</span>
            </div>
            <h2 :id="`previous-${hackathon.slug}-title`">{{ locale === 'en' ? hackathon.name : hackathon.nameZh }}</h2>
            <p class="event-description">{{ locale === 'en' ? hackathon.description : hackathon.descriptionZh }}</p>
          </div>

          <aside class="event-details">
            <dl>
              <div><dt>{{ pick('Dates', '日期') }}</dt><dd>{{ locale === 'en' ? hackathon.dates : hackathon.datesZh }}</dd></div>
              <div><dt>{{ pick('Format', '形式') }}</dt><dd>{{ locale === 'en' ? hackathon.format : hackathon.formatZh }}</dd></div>
            </dl>

            <div class="host-note">
              <p>{{ pick('Held at', '举办于') }}</p>
              <strong>GOSIM {{ locale === 'en' ? previousEdition.city : previousEdition.cityZh }} {{ previousEdition.year }}</strong>
              <span>{{ locale === 'en' ? previousEdition.dates : previousEdition.datesZh }} · {{ locale === 'en' ? previousEdition.venue : previousEdition.venueZh }}</span>
              <a :href="previousEdition.href" target="_blank" rel="noreferrer">{{ pick('Conference archive', '大会回顾') }} ↗</a>
            </div>

            <a class="button button-secondary" :href="hackathon.href">{{ pick('View archive', '查看回顾') }} <span aria-hidden="true">→</span></a>
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
