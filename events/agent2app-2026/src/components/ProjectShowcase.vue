<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLocale } from '../useLocale'

const props = defineProps<{ night: boolean }>()
const { t } = useLocale()
const desktopNight = ref(props.night)
watch(() => props.night, night => { desktopNight.value = night })
const asset = (file: string) => `${import.meta.env.BASE_URL}screenshots/${file}`
const desktopShots = [
  { night: false, file: 'octosense-desktop-light.png', alt: 'OctoSense 浅色桌面中并排打开 Clock 与 Weather 浮动窗口' },
  { night: true, file: 'octosense-desktop-dark.png', alt: 'OctoSense 深色桌面中运行同一组 Clock 与 Weather 应用' },
]
const miniappShots = [
  { file: 'robrix-miniapps.jpg', title: '找到并打开小程序', caption: '从宿主中的小程序列表出发，进入创建、运行与管理流程。', alt: 'Robrix Agent2App 测试版的小程序列表与创建入口' },
  { file: 'robrix-permission.jpg', title: '能力请求，交给用户决定', caption: 'Account 小程序请求设备与账户相关能力，宿主提供拒绝、单次允许与允许选项。', alt: 'Account 小程序的权限弹窗，包含拒绝、单次允许和允许按钮' },
  { file: 'robrix-versions.jpg', title: '修改留下版本记录', caption: '离线 ACP 测试代理完成修改后，应用保留历史版本，提供查看与回退入口。', alt: 'Pomodoro 测试小程序的版本历史，显示两次版本记录' },
  { file: 'robrix-diff.jpg', title: '看清每一次源码变化', caption: '通过源码差异检查修改内容；这里展示的是确定性测试输出。', alt: 'Pomodoro 测试小程序的源码差异，标记新增和移除内容' },
]
</script>

<template>
  <section id="showcase" class="section project-showcase" aria-labelledby="showcase-title">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('IN ACTION / 实机预览') }}</p>
      <h2 id="showcase-title">{{ t('先看见应用，再开始创造。') }}</h2>
      <p>{{ t('从天气卡片、多应用桌面，到小程序的权限与版本管理。以下画面来自本轮 macOS 实机测试，点击图片可查看原图。') }}</p>
    </div>

    <div class="showcase-apps">
      <figure class="appcard-preview">
        <div class="preview-heading"><span class="preview-label">APPCARD</span><span class="capture-type">{{ t('参考卡片 · 实机运行') }}</span></div>
        <a class="screenshot-link portrait-link" :href="asset('appcard-weather.png')" target="_blank" rel="noopener noreferrer" :aria-label="t('查看原图') + ' · AppCard'">
          <img :src="asset('appcard-weather.png')" width="430" height="860" loading="lazy" decoding="async" :alt="t('AppCard 的 Kyoto 天气参考卡片，展示天气、预报和卫星图区域')">
        </a>
        <figcaption>
          <h3>{{ t('把天气组织成一张卡片。') }}</h3>
          <p>{{ t('AppCard 运行时渲染的 Kyoto 天气参考卡片，展示天气、预报和卫星图区域。') }}</p>
          <p class="capture-note">{{ t('从预置参考卡片启动，部分数据随后在线刷新；城市背景为生成配图。本图展示渲染效果，不代表现场生成或空气质量已通过验证。') }}</p>
        </figcaption>
      </figure>

      <figure class="desktop-preview">
        <div class="preview-heading">
          <span class="preview-label">OCTOSENSE</span>
          <div class="preview-themes" role="group" :aria-label="t('OctoSense 截图主题')">
            <button type="button" :aria-pressed="!desktopNight" @click="desktopNight = false">{{ t('浅色截图') }}</button>
            <button type="button" :aria-pressed="desktopNight" @click="desktopNight = true">{{ t('深色截图') }}</button>
          </div>
        </div>
        <a v-for="shot in desktopShots" v-show="shot.night === desktopNight" :key="shot.file" class="screenshot-link" :href="asset(shot.file)" target="_blank" rel="noopener noreferrer" :aria-label="t('查看原图') + ' · ' + t(shot.alt)">
          <img :src="asset(shot.file)" width="1195" height="768" loading="lazy" decoding="async" :alt="t(shot.alt)">
        </a>
        <figcaption>
          <h3>{{ t('一个桌面，承载多个应用。') }}</h3>
          <p>{{ t('Clock 与 Weather 在 OctoSense 中以浮动窗口运行，共用桌面的明暗主题。') }}</p>
          <p class="capture-note">{{ t('通过应用目录启动的预编译样例，记录于 macOS；展示宿主与窗口能力，尚非 AppCard 与 OctoSense 已接通的完整演示。') }}</p>
        </figcaption>
      </figure>
    </div>

    <figure class="omarchy-preview">
      <a class="screenshot-link" :href="asset('octosense-omarchy.jpg')" target="_blank" rel="noopener noreferrer" :aria-label="t('查看原图') + ' · OctoSense Omarchy'">
        <img :src="asset('octosense-omarchy.jpg')" width="1195" height="768" loading="lazy" decoding="async" :alt="t('OctoSense 的 Omarchy 风格桌面，Clock 与 Weather 并排平铺并显示焦点边框')">
      </a>
      <figcaption>
        <p class="preview-label">OCTOSENSE / OMARCHY</p>
        <h3>{{ t('平铺窗口，专注当前任务。') }}</h3>
        <p>{{ t('两个应用在 Omarchy 风格下并排平铺，保留顶栏、焦点边框与各自内容。') }}</p>
        <p class="capture-note">{{ t('macOS 实机记录：同一个 OctoSense 测试实例从浮动桌面切换为 Omarchy，Clock 与 Weather 继续运行。') }}</p>
      </figcaption>
    </figure>

    <div class="miniapp-preview-heading">
      <p class="eyebrow">ROBRIX AGENT2APP</p>
      <h3>{{ t('从运行小程序，到管理它的变化。') }}</h3>
      <span class="capture-type">{{ t('源项目测试版 · 生成与修改使用离线 ACP 测试代理') }}</span>
    </div>
    <div class="miniapp-previews">
      <figure v-for="(shot, index) in miniappShots" :key="shot.file">
        <a class="screenshot-link" :href="asset(shot.file)" target="_blank" rel="noopener noreferrer" :aria-label="t('查看原图') + ' · ' + t(shot.title)">
          <img :src="asset(shot.file)" width="1229" height="768" loading="lazy" decoding="async" :alt="t(shot.alt)">
        </a>
        <figcaption>
          <span class="preview-label">0{{ index + 1 }}</span>
          <h4>{{ t(shot.title) }}</h4>
          <p>{{ t(shot.caption) }}</p>
        </figcaption>
      </figure>
    </div>
    <p class="showcase-footnote">{{ t('实机记录 · 2026.09.12 · 原始截图未修饰') }}</p>
  </section>
</template>

<style scoped>
.project-showcase figure { margin: 0; min-width: 0; }
.showcase-apps { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.7fr); gap: clamp(28px, 4vw, 64px); margin-top: 48px; align-items: start; }
.project-showcase .omarchy-preview { display: grid; grid-template-columns: minmax(0, 1.7fr) minmax(0, .8fr); gap: clamp(28px, 4vw, 64px); align-items: center; margin-top: 52px; padding-top: 40px; border-top: 1px solid var(--border); }
.omarchy-preview figcaption { padding-top: 0; }
.omarchy-preview .preview-label { color: var(--accent); font-size: 12px; }
.preview-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; margin-bottom: 18px; flex-wrap: wrap; }
.preview-label { font: 12px/1.8 var(--mono); letter-spacing: .08em; color: var(--accent); }
.capture-type { font-size: 12px; line-height: 1.7; color: var(--muted); }
.screenshot-link { display: block; border: 1px solid var(--border); cursor: zoom-in; }
.screenshot-link:hover { border-color: var(--accent); }
.screenshot-link img { display: block; width: 100%; height: auto; }
.portrait-link { width: min(100%, 280px); margin-inline: auto; }
.preview-themes { display: flex; gap: 4px; }
.preview-themes button { min-height: 38px; border: 1px solid var(--border); color: var(--muted); background: transparent; font-size: 12px; padding: 8px 12px; }
.preview-themes button[aria-pressed='true'] { color: var(--accent); border-color: var(--accent); }
figcaption { padding-top: 22px; }
figcaption h3 { font-size: clamp(21px, 2vw, 27px); line-height: 1.5; margin: 0 0 12px; }
figcaption p { color: var(--muted); font-size: 15px; margin: 0 0 12px; }
figcaption .capture-note { font-size: 12px; line-height: 1.8; margin-top: 16px; }
.miniapp-preview-heading { border-top: 1px solid var(--border); margin-top: 64px; padding-top: 40px; max-width: 100%; }
.miniapp-preview-heading .eyebrow { margin-bottom: 14px; }
.miniapp-preview-heading h3 { font-size: clamp(25px, 3vw, 34px); line-height: 1.5; margin: 0 0 16px; }
.miniapp-preview-heading > p:not(.eyebrow) { max-width: 820px; font-size: 16px; color: var(--muted); }
.miniapp-previews { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 32px; margin-top: 28px; }
.miniapp-previews figcaption { display: grid; grid-template-columns: 26px 1fr; column-gap: 10px; row-gap: 8px; padding-top: 18px; }
.miniapp-previews h4 { font-size: 20px; line-height: 1.5; margin: 0; }
.miniapp-previews figcaption p { grid-column: 2; margin: 0; }
.showcase-footnote { font: 12px/1.8 var(--mono); color: var(--muted); margin: 40px 0 0; }
@media (max-width: 760px) {
  .showcase-apps, .miniapp-previews, .project-showcase .omarchy-preview { grid-template-columns: 1fr; gap: 36px; }
  .portrait-link { width: min(100%, 320px); }
  .miniapp-preview-heading { margin-top: 44px; }
}
</style>
