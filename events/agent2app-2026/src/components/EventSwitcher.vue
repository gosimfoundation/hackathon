<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()
import { onMounted, onUnmounted, ref } from 'vue'
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const events = [
  { href: '/agent2app26/', name: 'Agentic App 黑客松', detail: '意图即应用 · The Intent Is the App', current: true },
  { href: '/factory26/', name: '智能体工厂国际黑客松与大奖赛', detail: 'OAIC · Agentic Factory', current: false },
  { href: '/survey26/', name: '智能体巡天黑客松', detail: 'Agentic Cosmos', current: false },
]
function dismiss(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) open.value = false
}
function escape(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    event.stopPropagation()
    open.value = false
    trigger.value?.focus()
  }
}
function focusOut(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) open.value = false
}
onMounted(() => document.addEventListener('pointerdown', dismiss))
onUnmounted(() => document.removeEventListener('pointerdown', dismiss))
</script>

<template>
  <div ref="root" class="event-switcher" @keydown="escape" @focusout="focusOut">
    <button ref="trigger" class="series-trigger" type="button" :aria-expanded="open" aria-controls="event-series-links" @click="open = !open">
      <span class="series-label">Agentic App</span><svg :class="{ expanded: open }" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.5"/></svg>
    </button>
    <div v-show="open" id="event-series-links" class="series-panel" :aria-label="t('选择黑客松')">
      <div class="panel-label"><span>{{ t('深圳黑客松系列') }}</span><span>{{ t('选择赛事 ↓') }}</span></div>
      <a v-for="(event, index) in events" :key="event.href" :href="event.href" :aria-current="event.current ? 'page' : undefined" @click="open = false">
        <span class="event-index" aria-hidden="true">0{{ index + 1 }}</span><span class="event-name">{{ t(event.name) }}<small v-if="event.current">{{ t('当前') }}</small></span>
        <span class="event-detail">{{ event.detail }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.event-switcher { position: relative; min-width: 0; }
.series-trigger { display: flex; align-items: center; gap: 18px; padding: 4px 0; border: 0; background: transparent; color: var(--ink); text-align: left; line-height: 1.6; }
.series-trigger:hover, .series-trigger[aria-expanded="true"] { color: var(--accent); }
.series-trigger svg { flex: none; color: var(--accent); }
.series-trigger svg.expanded { transform: rotate(180deg); }
.series-label { font-size: 13px; white-space: nowrap; }
.series-label small { display: block; font: 12px/1.6 var(--mono); color: var(--muted); letter-spacing: .09em; }
.series-panel { position: absolute; top: calc(100% + 20px); left: 0; width: 345px; max-width: calc(100vw - 48px); background: var(--paper); color: var(--ink); border: 1px solid var(--border); box-shadow: 0 18px 40px #30261b26; z-index: 20; }
.panel-label { display: flex; justify-content: space-between; gap: 12px; padding: 15px; background: color-mix(in srgb, var(--paper) 90%, var(--ink)); font: 12px/1.7 var(--mono); color: var(--ink); }
.series-panel a { position: relative; display: block; padding: 21px 16px 21px 45px; border-left: 2px solid transparent; color: var(--ink); }
.series-panel a + a { border-top: 1px solid var(--border); }
.series-panel a:hover, .series-panel a:focus-visible { background: color-mix(in srgb, var(--paper) 88%, var(--ink)); }
.series-panel a[aria-current] { border-left-color: var(--accent); background: color-mix(in srgb, var(--paper) 85%, var(--accent)); }
.event-index { position: absolute; left: 14px; top: 24px; font: 12px var(--mono); color: var(--accent); }
.event-name { display: flex; align-items: baseline; gap: 12px; justify-content: space-between; font-size: 14px; line-height: 1.6; }
.event-name small { color: var(--accent); white-space: nowrap; font-size: 12px; }
.event-detail { display: block; color: var(--muted); font-size: 12px; line-height: 1.6; margin-top: 6px; }
@media (max-width: 480px) {
  .series-trigger { gap: 6px; }
  .series-label { font-size: 12px; }
  .series-panel { position: fixed; top: 64px; left: 16px; max-width: calc(100vw - 32px); }
}

</style>

<style scoped>
@media (max-width: 760px) { .series-full { display: none; } .series-panel { position: fixed; top: 64px; left: 16px; max-width: calc(100vw - 32px); } }
@media (max-width: 380px) { .series-label { font-size: 10px; } .series-trigger { gap: 3px; } }
</style>
