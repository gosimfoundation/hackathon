<script setup lang="ts">
defineProps<{ region: 'computing' | 'design'; night: boolean; alt: string }>()
const base = import.meta.env.BASE_URL
</script>
<template>
  <div class="hero-detail">
    <img :src="`${base}images/hero-detail-${region}-day${region === 'computing' ? '-enhanced' : ''}.png`" :alt="alt" width="520" height="390" loading="lazy" decoding="async">
    <img class="detail-night" :class="{ visible: night }" :src="`${base}images/hero-detail-${region}-night${region === 'computing' ? '-enhanced' : ''}.png`" alt="" aria-hidden="true" width="520" height="390" loading="lazy" decoding="async">
  </div>
</template>
<style scoped>
.hero-detail { position: relative; width: 100%; max-width: 520px; aspect-ratio: 4 / 3; overflow: hidden; }
.hero-detail img { display: block; width: 100%; height: 100%; object-fit: contain; }
.detail-night { position: absolute; inset: 0; opacity: 0; transition: opacity 1.6s ease; }
.detail-night.visible { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .detail-night { transition: none; } }
</style>
