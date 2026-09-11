<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useLocale } from '../useLocale'
const props = defineProps<{ night: boolean }>()
const { t } = useLocale()
const base = import.meta.env.BASE_URL
const day = ref<HTMLVideoElement | null>(null)
const night = ref<HTMLVideoElement | null>(null)
const container = ref<HTMLElement | null>(null)
const playing = ref(false)
const dayReady = ref(false)
const nightReady = ref(false)
let observer: IntersectionObserver | undefined
let visible = true
function syncPlayback() {
  for (const video of [day.value, night.value]) {
    if (!video) continue
    if (playing.value && visible) void video.play().catch(() => { playing.value = false })
    else video.pause()
  }
}
watch(playing, syncPlayback)
onMounted(() => {
  playing.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  observer = new IntersectionObserver(([entry]) => { visible = !!entry?.isIntersecting; syncPlayback() })
  if (container.value) observer.observe(container.value)
})
onUnmounted(() => observer?.disconnect())
</script>
<template>
  <div ref="container" class="hero-media" aria-hidden="true">
    <div class="scene-layer">
      <img :src="`${base}videos/agent2app-day-v2.jpg`" alt="" fetchpriority="high">
      <video ref="day" :class="{ ready: dayReady }" :src="`${base}videos/agent2app-day-v2.mp4`" muted loop playsinline preload="auto" @loadeddata="dayReady = true; syncPlayback()" @error="dayReady = false"></video>
    </div>
    <div class="scene-layer night-scene" :class="{ visible: props.night }">
      <img :src="`${base}videos/agent2app-night-v2.jpg`" alt="" fetchpriority="high">
      <video ref="night" :class="{ ready: nightReady }" :src="`${base}videos/agent2app-night-v2.mp4`" muted loop playsinline preload="auto" @loadeddata="nightReady = true; syncPlayback()" @error="nightReady = false"></video>
    </div>
  </div>
  <button class="motion-toggle" type="button" :aria-pressed="playing" @click="playing = !playing">{{ playing ? t('暂停背景动画') : t('播放背景动画') }}</button>
</template>
<style scoped>
.scene-layer { position: absolute; inset: 0; }
.scene-layer img, .scene-layer video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 38%; }
.scene-layer video { opacity: 0; }
.scene-layer video.ready { opacity: 1; }
.night-scene { opacity: 0; transition: opacity 1.6s ease; }
.night-scene.visible { opacity: 1; }
.motion-toggle { position: absolute; right: var(--gutter); bottom: 95px; border: 1px solid #fff7e950; color: #fff7e9; background: #17292770; padding: 7px 10px; font-size: 11px; z-index: 1; }
@media(max-width:760px) { .scene-layer img, .scene-layer video { object-position: 58% center; } .motion-toggle { bottom: 120px; } }
@media(prefers-reduced-motion:reduce) { .night-scene { transition: none; } }
</style>
