<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ text: string }>()
const name = 'GOSIM Shenzhen 2026'
const parts = computed(() => props.text.split(name))
</script>
<template>
  <template v-for="(part, index) in parts" :key="index"><a v-if="index > 0" class="conference-link" href="https://shenzhen2026.gosim.org/" target="_blank" rel="noopener noreferrer">{{ name }}</a>{{ part }}</template>
</template>
<style scoped>
.conference-link { color: inherit; text-decoration: underline; text-underline-offset: 4px; text-decoration-thickness: 1px; }
.conference-link:hover { color: var(--accent); }
</style>
