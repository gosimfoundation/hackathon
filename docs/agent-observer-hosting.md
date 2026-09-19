# 巡天比赛平台接入官网

目标地址：`https://create.gosim.org/survey26/platform/`。
活动介绍继续使用 `/survey26/`。沿用 BH3GEI 平台现有的 Supabase、账号、存储与评分 worker，不运行数据库迁移，也不改同事的 GitHub Actions。

## 当前状态与启用步骤

网站侧已经支持可选构建。未启用时，线上报名入口仍指向原平台。
启用前请平台维护者提供前端公开配置，并完成回调设置：

1. 提供 `VITE_SUPABASE_URL` 和 `VITE_SUPABASE_ANON_KEY`。只使用前端 anon/publishable key，绝对不要提供 service_role 或 secret key。
2. 在 Supabase → Authentication → URL Configuration 中添加以下 Redirect URLs，保留原站地址以支持旧邮件和回退：
   - `https://create.gosim.org/survey26/platform/register?mode=login`
   - `https://create.gosim.org/survey26/platform/reset`
   - `https://create.gosim.org/survey26/platform/`
3. 上游 `recovery-link` 函数默认写死旧站重置页，需要将该函数的 `RECOVERY_REDIRECT_URL` 环境变量设置为 `https://create.gosim.org/survey26/platform/reset`。同时检查自定义邮件模板是否写死原站域名。正式切换时，把 Site URL 设置为 `https://create.gosim.org/survey26/platform/`。
4. 在官网仓库 Actions secrets 设置 `COSMOS_VITE_SUPABASE_URL` 和 `COSMOS_VITE_SUPABASE_ANON_KEY`。在 Actions variables 设置 `COSMOS_PLATFORM_ENABLED=true`，然后触发 Deploy workflow。启用时构建会自动更新官网报名及比赛入口。
5. 验证注册验证邮件、登录、重置密码、组队、提交、排行榜和工具包下载。实际注册/发邮件需要使用授权的测试账号。

没有 Supabase 配置时，只验证本地构建和界面，不宣称注册、登录或提交已联通。

## 构建和更新

`scripts/agent-observer.json` 固定上游仓库和完整 commit SHA。构建不自动跟随上游 main；上游更新后修改 revision，构建验证后再发布。

```sh
npm run prepare:platform
npm run test:platform
COSMOS_PLATFORM_ENABLED=true npm run build
```

最后一条命令还需要通过环境变量提供上述两个 Supabase 公开配置。Vite 的上游构建脚本会把公开配置写入前端与参赛工具包。官网构建配置不能传入管理员密钥。

`prepare:platform` 将指定提交检出至忽略目录 `.cache/agent-observer/<revision>` 并安装锁定依赖。网页、工具包一起构建至 `_site/survey26/platform/`；不复制数据库或 worker 部署。

GitHub Pages 只有根目录 404 页面生效。根目录 fallback 针对平台路径单独保存深链接，平台在 Vue 和 Supabase 初始化前恢复 URL，保留 query 和 hash。`npm run preview` 同样将该目录下的深链接交给平台前端。

回退：将 `COSMOS_PLATFORM_ENABLED` 改为 `false` 并重新部署，官网恢复原平台入口。Supabase 保留旧站 Redirect URLs；如果已更改默认 Site URL，应相应恢复。
