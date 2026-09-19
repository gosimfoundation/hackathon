<script setup lang="ts">
// Tier mascots: Nautilus (design), King Crab (real device), Giant Octopus (ROM / system).
// Illustrations generated with Gemini in one character sheet, then cut out.
const props = defineProps<{ kind: 'nautilus' | 'crab' | 'octopus'; label: string }>()
const src = `${import.meta.env.BASE_URL}mascots/${props.kind}.webp`
</script>

<template>
  <img class="tier-mascot" :src="src" width="480" height="480" loading="lazy" decoding="async" :alt="label">
</template>

<style scoped>
.tier-mascot { display: block; width: 168px; height: 168px; margin: 0 0 14px -10px; }
</style>
