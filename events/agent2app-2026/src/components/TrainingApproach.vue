<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()
const projects = [
  { name: 'octos', role: 'Agent 的执行基础：组织上下文、工具与任务，让应用具备持续行动的能力。', href: 'https://github.com/octos-org/octos' },
  { name: 'octoscode', role: '与编码 Agent 协作的入口：描述需求、查看修改、确认操作并反馈结果。', href: 'https://github.com/octos-org/octoscode' },
  { name: 'OctoLoop', role: '内环执行、外环审查：让 Agent 分工完成、检查和改进，人来确定目标与验收。', href: 'https://github.com/octos-org/octoscode/blob/main/docs/OCTOLOOP_GUIDE.md' },
  { name: 'robrix2', role: '本届主要宿主：理解小程序入口、会话分享、独立授权与结果回传。', href: 'https://github.com/OctoSense-org/robrix2' },
  { name: 'hagency', role: '软件工厂的协作机制：组织多个 Agent 的任务、沟通、交接和人工确认。', href: 'https://github.com/hagency-org/hagency' },
  { name: 'OctoSense', role: '参赛场景与应用入口：从邮件、消息、日历等需求出发，呈现 Agent 的行动与结果。', href: 'https://octosense.org/' },
  { name: 'Octoscript', role: '动态应用的表达方式：让 Agent 生成和调整界面与交互，用运行结果验证意图。', href: 'https://github.com/OctoSense-org/Octoscript' },
  { name: 'Makepad', role: '原生界面的基础：让生成的应用可见、可操作，支持人与 Agent 共同使用和检查。', href: 'https://github.com/OctoSense-org/makepad' },
]
</script>

<template>
  <div class="training-approach">
    <h3>{{ t('看懂机制，让 Agent 帮你完成比赛。') }}</h3>
    <p>{{ t('围绕八个项目，讲清它们为什么存在、如何工作，以及选手怎样与 Agent 配合。通过场景演示和作品练习建立理解，不展开源码、语法与底层实现。') }}</p>
    <div class="project-map">
      <article v-for="project in projects" :key="project.name">
        <h4><a :href="project.href" target="_blank" rel="noopener noreferrer">{{ project.name }} ↗</a></h4>
        <p>{{ t(project.role) }}</p>
      </article>
    </div>
    <p class="learning-flow">{{ t('选一个场景 → 描述目标 → 让 Agent 制作与协作 → 运行并检查 → 反馈改进 → 提交作品。') }}</p>
    <p class="availability-note">{{ t('以 robrix2 和原生文章编辑器为共同示例，按选题选择其他工具。课程讲机制与 Agent 协作，不要求每个作品同时接入八个项目。') }}</p>
  </div>
</template>

<style scoped>
.training-approach { margin-top: 36px; padding-block: 28px; border-block: 1px solid var(--border); }
.training-approach > h3 { font-size: clamp(22px, 3vw, 30px); font-weight: 500; margin: 0 0 14px; line-height: 1.5; }
.training-approach p { color: var(--muted); font-size: 14px; line-height: 1.85; margin: 0; }
.training-approach > p { max-width: 960px; }
.project-map { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px 28px; margin-block: 28px; }
.project-map article { min-width: 0; }
.project-map h4 { font-size: 18px; margin: 0 0 10px; font-weight: 500; color: var(--accent); }
.training-approach .learning-flow { color: var(--ink); }
.training-approach .availability-note { margin-top: 12px; font-size: 13px; }
@media (max-width: 1000px) { .project-map { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .project-map { grid-template-columns: 1fr; gap: 20px; } }
</style>
