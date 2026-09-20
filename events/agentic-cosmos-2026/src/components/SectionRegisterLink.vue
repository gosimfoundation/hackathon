<script setup lang="ts">
import { registrationUrl } from '../registration'
import { useI18n } from '../composables/useI18n'

const { pick } = useI18n()
</script>

<template>
  <a
    :href="registrationUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="cosmos-register-link mt-8 inline-flex min-h-12 min-w-48 items-center justify-between gap-8 border px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest"
  >
    {{ pick('Register now', '立即报名') }}
    <span aria-hidden="true">↗</span>
  </a>
</template>

<style scoped>
a { text-decoration: none; }
</style>
