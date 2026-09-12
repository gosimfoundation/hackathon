<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()
const registrationUrl = 'https://wj.qq.com/s2/27846792/da0o/'
const qrEmbedUrl = 'https://qacman.com/?embed=1&autoplay=1&gh=4&q=https%3A%2F%2Fwj.qq.com%2Fs2%2F27846792%2Fda0o%2F&skin=d.eJwVzEEKgzAQBdC7_EVXwWjRKQxIz5KEGF1UJTOJC8ndi-8A70YFDwYn-EYBY1U9ha111anL0qVN1-KLxByOXeOuXTh-ttg3fQaaiKavzNS_6jzCQMDwW0oxoxmE57zAIPLj0qO1P4wxIbQ'
</script>

<template>
  <div class="registration-panel">
    <p class="registration-instruction">{{ t('扫码报名，或直接打开报名表。') }}</p>
    <p class="registration-instruction">{{ t('9/13 开始报名 · 9/19 开营 · 拟定 9/23 23:59 截止（北京时间）') }}<br>{{ t('单人可参赛；多人队伍的队长、队员均须分别填写。') }}</p>
    <iframe
      :src="qrEmbedUrl"
      :title="t('Agentic App 黑客松报名动态二维码')"
      width="500"
      height="500"
      loading="lazy"
      allow="autoplay"
      class="registration-qr"
    ></iframe>
    <a class="button primary" :href="registrationUrl" target="_blank" rel="noopener noreferrer">{{ t('填写报名表 ↗') }}</a>
    <p class="registration-address"><span>{{ t('报名地址') }}</span><a :href="registrationUrl" target="_blank" rel="noopener noreferrer">{{ registrationUrl }}</a></p>
  </div>
</template>

<style scoped>
.registration-panel { max-width: 660px; margin: 34px auto 42px; }
.registration-instruction { line-height: 1.8; }
.registration-qr { display: block; width: min(100%, 500px); height: auto; aspect-ratio: 1; margin: 24px auto 0; border: 0; }
.registration-address { display: flex; flex-direction: column; gap: 10px; font-size: 15px; line-height: 1.8; }
.registration-address a { text-decoration: underline; text-underline-offset: 4px; overflow-wrap: anywhere; }
</style>
