# GOSIM Hackathons — shared domain publisher

This repository owns the hub at **https://create.gosim.org/**, the archived
Paris event, and the final GitHub Pages deployment. The active events are now
maintained and built independently:

| Website | Source repository | Local development |
| --- | --- | --- |
| `/factory26/` | [gosimfoundation/hackathon-factory26](https://github.com/gosimfoundation/hackathon-factory26) | `npm ci && npm run dev` |
| `/survey26/` → `/survey26/platform/` | [gosimfoundation/hackathon-survey26](https://github.com/gosimfoundation/hackathon-survey26) | `npm ci --prefix web && npm run dev --prefix web` |
| `/agenticapp26/` | [gosimfoundation/hackathon-agenticapp26](https://github.com/gosimfoundation/hackathon-agenticapp26) | `npm ci && npm run dev` |
| `/agenticparis26/` | `events/agentic-hackathon-paris-2026/` in this repository | `npm run dev:agentic-hackathon-paris-2026` |

**请在对应的新仓库修改活动网站。旧的本地项目不会自动切换，请重新克隆并在编辑器中打开新仓库。**
See [migration and team handoff](docs/repository-migration.md).

## Publishing

Each active event publishes a versioned GitHub Release only after its build
succeeds. This repository downloads and verifies those artifacts, builds the
hub and Paris, then assembles one GitHub Pages site. Public URLs, DNS, databases,
and authentication callback URLs are unchanged.

`config/event-sites.json` selects each source repository and release (`latest`
by default). A failed event build leaves its previous successful release in use.
Download, checksum, or assembly failures abort the deployment and leave the live
site intact. `deployment.json` at the site root records exactly what is deployed.

The existing five-minute schedule collects new releases and refreshes Factory's
ARC-Bench leaderboard snapshot. GitHub schedules can be delayed. Run **Deploy
hackathon sites to GitHub Pages** manually for an immediate collection after an
event release succeeds. No cross-repository personal access token is needed.

Rollback: change an event's `release` to a known-good `site-...` tag and redeploy.
Set it back to `latest` to resume automatic collection.

## Local development and verification

Use Node.js 22, Python 3.12+, and GitHub CLI (`gh auth login`).

```bash
npm ci --prefix hub
npm ci --prefix events/agentic-hackathon-paris-2026
npm run dev:hub
```

Build and preview the complete site (requires network access to GitHub releases):

```bash
npm run build
npm run preview
```

For local Paris authentication, set `PARIS_VITE_SUPABASE_URL` and
`PARIS_VITE_SUPABASE_ANON_KEY`. CI retains the existing Paris repository secrets.
The hub obtains Factory and Survey's public project URLs from release manifests.

```bash
npm run test:platform
npm run test:releases
npm test --prefix hub
node scripts/verify-site.mjs  # after building
```

## Authentication and routes

Keep existing Supabase Site URLs and allowed callbacks:

| Event | Site URL / allowed reset callback |
| --- | --- |
| Factory | `https://create.gosim.org/factory26` and trailing-slash variant |
| Paris | `https://create.gosim.org/agenticparis26` and trailing-slash variant |
| Survey platform | `https://create.gosim.org/survey26/platform` / `/survey26/platform/register` |

The root 404 handler restores event deep links and recovery fragments. The hub
also forwards legacy root authentication callbacks. Its unmatched-issuer fallback
continues to be Factory, which previously occupied the root.

## Add an event

Create an independent event repository with a versioned site release workflow,
add its identity and required entry points to `config/event-sites.json`, and
update `hub/src/events.ts`, the root 404 routing, local preview routing, and
verification coverage. Preserve established public URL segments.
