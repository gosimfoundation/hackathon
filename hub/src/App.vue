<script setup lang="ts">
import { computed, ref } from 'vue'
import { events, type EventStatus } from './events'

type Locale = 'en' | 'zh'

const locale = ref<Locale>('en')
const activeEvents = computed(() => events.filter(event => event.status === 'open' || event.status === 'upcoming'))

const statusLabel: Record<EventStatus, Record<Locale, string>> = {
  open: { en: 'Registration open', zh: '报名开放' },
  upcoming: { en: 'Upcoming', zh: '即将开始' },
  concluded: { en: 'Concluded', zh: '已结束' },
}

function pick(english: string, chinese: string) {
  return locale.value === 'en' ? english : chinese
}
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="/" aria-label="GOSIM Hackathons home">
        <span>GOSIM</span>
        <span class="brand-divider" aria-hidden="true"></span>
        <span class="brand-section">HACKATHONS</span>
      </a>

      <button class="locale-toggle" type="button" @click="locale = locale === 'en' ? 'zh' : 'en'">
        {{ locale === 'en' ? '中文' : 'EN' }}
      </button>
    </header>

    <main>
      <section class="hero" aria-labelledby="page-title">
        <div class="hero-kicker">
          <span class="status-dot" aria-hidden="true"></span>
          {{ pick('Open-source builders, worldwide', '连接全球开源建造者') }}
        </div>

        <h1 id="page-title">{{ pick('Build the open future.', '共同构建开放未来。') }}</h1>

        <p class="hero-copy">
          {{ pick(
            'GOSIM Hackathons bring developers, researchers, and open-source communities together to turn ambitious ideas into working systems.',
            'GOSIM 黑客松汇聚开发者、研究者与开源社区，将有野心的想法变成真正可运行的系统。',
          ) }}
        </p>

        <div class="hero-meta" aria-label="Hackathon program summary">
          <div>
            <span class="meta-value">{{ String(activeEvents.length).padStart(2, '0') }}</span>
            <span class="meta-label">{{ pick('Active event', '进行中的活动') }}</span>
          </div>
          <div>
            <span class="meta-value">2026</span>
            <span class="meta-label">{{ pick('Current season', '当前赛季') }}</span>
          </div>
          <div>
            <span class="meta-value">OPEN</span>
            <span class="meta-label">{{ pick('Source by default', '默认开源') }}</span>
          </div>
        </div>
      </section>

      <section class="events-section" aria-labelledby="events-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ pick('Now building', '正在进行') }}</p>
            <h2 id="events-title">{{ pick('Current hackathons', '当前黑客松') }}</h2>
          </div>
          <p>{{ pick('Each event has its own team, rules, and workspace.', '每项活动拥有独立的团队、规则与协作空间。') }}</p>
        </div>

        <div class="events-grid">
          <article v-for="event in events" :key="event.slug" class="event-card">
            <div class="event-topline">
              <span class="event-status">
                <span class="status-dot" aria-hidden="true"></span>
                {{ statusLabel[event.status][locale] }}
              </span>
              <span class="event-code">{{ event.code }}</span>
            </div>

            <div class="event-body">
              <p class="event-organizer">{{ event.organizer }}</p>
              <h3>{{ locale === 'en' ? event.name : event.nameZh }}</h3>
              <p class="event-description">{{ locale === 'en' ? event.description : event.descriptionZh }}</p>
            </div>

            <dl class="event-details">
              <div>
                <dt>{{ pick('When', '时间') }}</dt>
                <dd>{{ locale === 'en' ? event.dates : event.datesZh }}</dd>
              </div>
              <div>
                <dt>{{ pick('Where', '地点') }}</dt>
                <dd>{{ locale === 'en' ? event.location : event.locationZh }}</dd>
              </div>
            </dl>

            <a class="event-link" :href="event.href">
              {{ pick('Enter hackathon', '进入活动网站') }}
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <span>© {{ new Date().getFullYear() }} GOSIM Foundation</span>
      <a href="https://gosim.org" rel="noreferrer">gosim.org ↗</a>
    </footer>
  </div>
</template>
