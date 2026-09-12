<script setup lang="ts">
import { useLocale } from '../useLocale'
const { t } = useLocale()

const stages = [
  { date: '09.13–09.23', title: '报名与组队', deadline: '9/13 09:00 开放 · 9/23 23:59 截止', description: '单人或多人均可参赛。队长和每位队员分别报名，可边组队边开始初赛。' },
  { date: '09.13–09.28', title: '初赛 · 需求与最小原型', deadline: '9/28 23:59 提交截止', description: '提交明确场景、可运行原型、源码与说明、短视频和截图；随作品提交已报名成员名单。' },
  { date: '09.29–09.30', title: '初赛评审 · 2 天', deadline: '9/30 20:00 公布复赛名单与反馈', description: '独立评阅、运行核验与交叉复核。通过初赛后，进入复赛继续完善作品。', review: true },
  { date: '10.01–10.08', title: '复赛 · 完整应用与验证', deadline: '10/8 23:59 提交截止', description: '完善真实任务、数据与操作反馈，补齐失败状态、用户试用、测试证据及项目贡献。' },
  { date: '10.09–10.10', title: '复赛评审 · 2 天', deadline: '10/10 20:00 公布决赛名单与反馈', description: '安装复现、任务验证与评分校准。通过复赛后获得决赛资格，10/11 18:00 前确认到场代表。', review: true },
  { date: '10.11–10.16', title: '决赛准备 · 6 天', deadline: '10/14 线上彩排 · 10/15 18:00 展示包冻结', description: '完善演示与稳定性，准备离线备用材料；10/16 进行现场设备联调，具体时段随会务安排。' },
  { date: '10.17', title: 'GOSIM 现场决赛', deadline: '10 月 17 日（周六）· 具体时段另行通知', description: '晋级项目现场展示与答辩，评委合议及颁奖。3 分钟应用演示 + 2 分钟项目贡献，并预留问答时间。', final: true },
  { date: '10.18–10.31', title: '赛后采纳与归档', deadline: '两周贡献合入窗口', description: '完善 PR、应用和规范，按实际采纳结果核算采纳奖，归档优秀作品。' },
]

const sessions = [
  { date: '09.19', time: '19:30–21:00', audience: '共同基础', title: '开营、赛制与选题', description: '了解两条赛道与晋级规则，梳理用户、场景、数据、操作和结果，参加组队交流。' },
  { date: '09.21', time: '19:30–21:30', audience: '赛道 A 实践', title: 'AppCard + OctoSense 入门', description: '从意图到脚本、校验、渲染与事件；完成一张有数据来源、正常与失败状态的卡片。' },
  { date: '09.22', time: '19:30–21:30', audience: '赛道 B 实践', title: 'robrix2 + hagency 小程序机制', description: '学习脚本容器、能力、权限与版本，按 robrix2 UI 设计任务状态原型；实操以公布的环境为准。' },
  { date: '09.23', time: '19:30–21:30', audience: '技术选修', title: 'Rust 能力、组件与悬赏', description: '认领贡献题，定义输入、权限、错误与版本；将最小能力或工具改进接回自己的应用。' },
  { date: '09.24', time: '19:30–21:00', audience: '共同实践', title: '可用性与初赛提交', description: '让队外用户完成一次任务，修正信息缺失和无反馈操作，整理原型、短视频与复现说明。' },
  { date: '09.28', time: '19:00–20:00', audience: '可选门诊', title: '初赛提交检查', description: '核对报名名单、运行环境和材料，排查提交阻塞；初赛当日 23:59 截止。' },
  { date: '09.29', time: '19:30–21:00', audience: '赛道 A 进阶', title: '生成 pipeline 与事实验证', description: '分离生成、校验、渲染和评审，保留失败与重试；核对天气、空气质量等事实字段。' },
  { date: '09.29', time: '19:30–21:00', audience: '赛道 B 进阶', title: '软件工厂应用的任务验收', description: '验证任务变化、权限拒绝、过期与结果来源；区分练习数据和真实 hagency 接入，留下可复现证据。' },
  { date: '09.30', time: '20:30–21:30', audience: '复赛启动课', title: '复赛反馈与开发计划', description: '消化初赛反馈，收敛复赛目标，补全数据与操作链路，列出正常、空值、拒绝和超时场景。' },
  { date: '10.05', time: '19:30–20:30', audience: '假期可选', title: '开发答疑', description: '集中处理开发阻塞，整理共享 FAQ；假期不增加必修直播内容。' },
  { date: '10.08', time: '19:00–20:00', audience: '可选门诊', title: '复赛提交检查', description: '核对安装包、仓库版本、测试证据与视频，预留上传时间；当日 23:59 截止。' },
  { date: '10.12', time: '19:30–21:00', audience: '决赛训练', title: '演示与答辩', description: '组织 3 分钟实际操作与 2 分钟项目贡献，准备问题回答和离线备用演示。' },
  { date: '10.14', time: '19:00–21:00', audience: '决赛队伍 · 分队预约', title: '线上彩排', description: '检查启动、投屏、计时与问答，列出冻结前修复项；每队具体时段随决赛名单公布。' },
]
</script>

<template>
  <section id="schedule" class="section event-schedule">
    <div class="section-heading wide">
      <p class="eyebrow">{{ t('07 / 赛程与培训') }}</p>
      <h2>{{ t('9.13 报名，9.19 开营。') }}</h2>
      <p>{{ t('从初赛原型，到复赛可用应用，再到 10 月 17 日 GOSIM 现场决赛。两轮评审各留 2 天，决赛前留出 6 天准备。') }}</p>
      <p class="schedule-timezone">{{ t('2026 年 · 全部时间为北京时间 UTC+8') }}</p>
      <p class="schedule-draft">{{ t('报名、开营与决赛日期已确定；其余节点与具体时段为拟定安排。') }}</p>
    </div>
    <div class="schedule-columns">
      <div class="competition-calendar">
        <h3 class="calendar-heading">{{ t('比赛进程') }}</h3>
        <ol class="stage-list">
          <li v-for="stage in stages" :key="stage.title" :class="{ 'review-stage': stage.review, 'final-stage': stage.final }">
            <p class="stage-date">{{ stage.date }}</p>
            <h4>{{ t(stage.title) }}</h4>
            <p class="stage-deadline">{{ t(stage.deadline) }}</p>
            <p class="stage-description">{{ t(stage.description) }}</p>
          </li>
        </ol>
      </div>
      <div class="training-calendar">
        <h3 class="calendar-heading">{{ t('跟着作品进度学') }}</h3>
        <p class="training-intro">{{ t('9/19 开营后开始入门实践，9/29 分赛道进阶为复赛做准备。所有课程提供回放；选修与门诊按需参加。') }}</p>
        <div class="training-list">
          <details v-for="session in sessions" :key="session.title">
            <summary>
              <span class="training-date">{{ session.date }}</span>
              <span class="training-info"><span class="training-audience">{{ t(session.audience) }}</span><strong>{{ t(session.title) }}</strong><span class="training-time">{{ session.time }}</span></span>
              <span class="training-expand" aria-hidden="true"></span>
            </summary>
            <p class="training-description">{{ t(session.description) }}</p>
          </details>
        </div>
        <p class="calendar-note">{{ t('9/29 的 A、B 进阶课使用两个教室同时开课，选择本赛道参加；面向所有初赛队伍，回放可补学。') }}</p>
        <p class="calendar-note">{{ t('中秋与国庆假期以自主开发、课程回放为主，10/5 仅设可选答疑。10/16 现场设备联调按队预约，时段另行通知。') }}</p>
        <p class="calendar-note">{{ t('赛道 B 开发包与接口准备中。实操环境、练习数据及提交接受范围在开课前统一说明。') }}</p>
      </div>
    </div>
    <div class="advancement-note">
      <h3>{{ t('每一轮，都交付能验证的进展。') }}</h3>
      <div>
        <p>{{ t('初赛看需求与最小原型；复赛看完整任务、可用性与测试证据；决赛看现场演示和项目贡献。必须依次通过初赛、复赛，才能晋级决赛。') }}</p>
        <p>{{ t('每轮按截止时的冻结版本评审。初赛侧重任务价值与可用性；复赛沿用四项评分，演示分依据视频与复现；决赛演示分取现场表现。晋级名额与详细规则另行公布。') }}</p>
        <a class="text-link" href="#participate">{{ t('查看报名说明 →') }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-schedule { padding-block: clamp(56px, 6vw, 88px); }
.section-heading .schedule-timezone { color: var(--accent); font-size: 14px; margin-bottom: 8px; }
.section-heading .schedule-draft { font-size: 13px; margin-top: 0; }
.schedule-columns { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(36px, 7vw, 96px); margin-top: 40px; }
.calendar-heading { margin: 0 0 24px; font-size: 25px; font-weight: 500; }
.stage-list { list-style: none; margin: 0; padding: 0; }
.stage-list li { border-top: 1px solid var(--border); padding: 20px 0 24px; }
.stage-date { color: var(--accent); font: 14px/1.7 var(--mono); margin: 0 0 8px; }
.stage-list h4 { font-size: 20px; font-weight: 500; margin: 0 0 10px; }
.stage-deadline { font-size: 14px; color: var(--ink); margin: 0 0 8px; }
.stage-description, .training-intro, .calendar-note, .training-description { color: var(--muted); font-size: 14px; margin: 0; line-height: 1.85; }
.stage-list .review-stage { padding-left: 18px; border-left: 2px solid var(--accent); }
.stage-list .final-stage { border-top: 2px solid var(--accent); }
.final-stage h4 { color: var(--accent); font-size: 24px; }
.training-intro { margin-bottom: 24px; }
.training-list details { border-top: 1px solid var(--border); }
.training-list summary { display: grid; grid-template-columns: 64px minmax(0, 1fr) 12px; gap: 14px; padding: 17px 0; cursor: pointer; list-style: none; }
.training-list summary::-webkit-details-marker { display: none; }
.training-date { font: 13px/1.8 var(--mono); color: var(--accent); padding-top: 2px; }
.training-info { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.training-audience { color: var(--muted); font-size: 12px; line-height: 1.6; }
.training-info strong { font-size: 16px; line-height: 1.7; font-weight: 500; }
.training-time { color: var(--accent); font: 12px/1.7 var(--mono); }
.training-expand::after { content: '+'; color: var(--accent); }
details[open] .training-expand::after { content: '−'; }
.training-description { padding: 0 26px 18px 78px; }
.calendar-note { border-left: 1px solid var(--border); padding-left: 16px; margin-top: 24px; font-size: 13px; }
.advancement-note { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; border-top: 1px solid var(--border); padding-top: 30px; margin-top: 32px; }
.advancement-note h3 { font-size: 23px; font-weight: 500; margin: 0; line-height: 1.6; }
.advancement-note p { font-size: 14px; color: var(--muted); margin: 0 0 14px; }
.advancement-note a { color: var(--accent); border-bottom: 1px solid currentColor; }
@media (max-width: 760px) {
  .schedule-columns, .advancement-note { grid-template-columns: 1fr; gap: 36px; }
  .training-list summary { grid-template-columns: 56px minmax(0, 1fr) 12px; gap: 10px; }
  .training-description { padding-left: 66px; padding-right: 0; }
}
</style>
