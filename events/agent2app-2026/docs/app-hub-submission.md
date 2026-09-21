# 作品提交与 OctoSense App Hub

本届以 OctoSense 为核心，以 robrix2 为主要开发基线。作品交付分为提交与基础预检、实际运行验收、评委评奖三个环节。赛程和提交截止时间沿用 [赛事赛程](competition-schedule.md)；本指南不新增赛段。

## 当前使用方式

[OctoSense App Hub](https://github.com/OctoSense-org/OctoSense-App-Hub) 已提供卡片包规范、准入检查 CLI、签名应用目录与商店模块。可参考规范准备包并在本地预检。

截至 2026-09-21，robrix2 的通用目录与包安装尚未接通，自动提交入口仍在建设。现阶段各轮评审以公开源码仓库和可运行作品为准，无需等待 Hub 上架。后续入口和适用宿主版本开放后，由赛事方公布使用方式。

## 所有作品需要的材料

1. 公开源码仓库、固定提交号或发布版本、Apache License 2.0 许可证。
2. 应用目标、适用场景、图标、运行截图、作者与支持方式。
3. 宿主版本、支持平台、依赖与启动说明，让评审能复现同一版本。
4. 数据来源、申请权限、隐私处理，以及用户授权、拒绝和失败时的行为。
5. Agent 任务演示：输入是什么，Agent 实际完成哪些步骤，如何核验结果，哪些环节需要人工确认。
6. 运行截图、日志或视频及对应复现步骤。演示材料不能代替可运行的开源作品。

## 按作品形态交付

| 作品形态 | 交付方式 |
| --- | --- |
| Hub 卡片包 | 按 Hub 规范准备 manifest、listing、page.card、kit 与本地素材，附预检结果及实际运行证据 |
| 网页小程序 | 提交源码、可运行页面、URL 卡片与部署/启动说明，说明自己的账号和数据接入方式 |
| 原生宿主扩展 | 提交含扩展的可构建宿主版本、源码提交号、支持平台与运行说明 |
| OctoSense ROM 扩展 | 在可运行应用基础上附系统改动、构建/安装与复现说明，以及效果前后对照 |

现有 robrix2 内置编辑器不是任意 Hub 包的安装入口，不能仅提交 `.card` 文件并假设宿主会加载。具体基线见 [robrix2 小程序指南](robrix2-miniapps.md)。

## Hub 基础预检

遵循 [官方发布规范](https://github.com/OctoSense-org/OctoSense-App-Hub/blob/97c2a1fd9aa49a6b87586f228e070e0c16b1067b/docs/PUBLISHING.md)。获得与所选版本匹配的 Hub CLI 后，可对自己的卡片包运行：

```sh
hub stamp my-app
hub check my-app --allow-unsigned
hub scan my-app --packet review.json
```

`--allow-unsigned` 用于未签名包的本地预检，不代表正式发布无需遵守签名与更新规则。每次修改包内容后需重新计算摘要；已签名包检查时还需提供发布者公钥，详见官方规范。

基础检查覆盖应用资料、包摘要、签名规则、文件类型和大小、权限、网络目标、Agent 工具与资源配额；结合目录可检查重复版本与发布者连续性。

`hub scan` 默认只生成审核材料。配置外部 reviewer 后，才能执行 Agent 辅助审核，给出通过、转人工或拒绝的建议。它不自动证明应用能运行，也不替代比赛评审。

当前检查尚未完整覆盖页面解析、图片有效性与真实交互。无论报告是否通过，选手都应在指定运行环境中验证自己的作品。

## 运行验收与评奖

实际演示应覆盖启动、真实输入、必要授权、Agent 执行、结果核验和失败处理。聊天或账号相关作品还需演示接收者独立授权，避免把发送者身份或权限带给接收者。

最佳 Agentic 评价作品运行时的任务自动化；最佳技术突破在可运行应用基础上评价项目反哺与 OctoSense ROM 改进。Agent 辅助开发、通过包预检、成功上架或累计 PR 数量，均不能单独替代作品效果证据。

## 核查依据

- App Hub 核查版本：[97c2a1fd](https://github.com/OctoSense-org/OctoSense-App-Hub/tree/97c2a1fd9aa49a6b87586f228e070e0c16b1067b)。
- robrix2 集成状态：[ADR 0002](https://github.com/OctoSense-org/robrix2/blob/05daf9bdb05fafc6d8f04dcb312a35f1d46a661e/docs/adr/0002-octoscript-mini-app-authority.md)。
- 更详细的边界以锁定版本的官方文档与实际运行结果为准。
