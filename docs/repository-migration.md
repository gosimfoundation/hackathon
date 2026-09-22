# Active event repository migration — 2026-09-22

| Event | Former directory | Authoritative source |
| --- | --- | --- |
| Factory26 | `events/oaic-harness-2026/` | https://github.com/gosimfoundation/hackathon-factory26 |
| Survey26 | `events/agentic-cosmos-2026/` plus external platform pin | https://github.com/gosimfoundation/hackathon-survey26 |
| Agentic App | `events/agent2app-2026/` | https://github.com/gosimfoundation/hackathon-agenticapp26 |
| Paris (archived event) | `events/agentic-hackathon-paris-2026/` | remains here |

The active event directories have been removed from this repository. Their
source files and relevant commit histories are preserved in the destination
repositories. Survey's old event directory is under `legacy-event/`; its live
platform is in `web/`. The GOSIM platform repository starts from the exact
upstream version that was already deployed before the migration.

Existing direct collaborators from this repository retain their roles on the
three destinations. Organization-inherited access also remains in effect.

## For maintainers

1. Save any uncommitted work in the old checkout before switching.
2. Clone your event's authoritative repository and open that directory in your
   editor or AI coding tool. Merely pulling the old repository does not switch it.
3. Apply any uncommitted changes under the new root (Survey's old-site changes
   go under `legacy-event/`, live platform changes under `web/`).
4. Open new branches and pull requests in the destination repository.
5. After merging, check **Publish event site**. Once its release succeeds, the
   shared publisher collects it on the existing five-minute schedule; GitHub may
   delay scheduled runs. A shared-publisher manual run performs an immediate refresh.

The old Agentic App PR #66 is preserved as a separate, unmerged PR in the new
Agentic App repository, retaining its author's commit. It is not bundled into
the production migration. Successor: https://github.com/gosimfoundation/hackathon-agenticapp26/pull/1.

The `Retired event directories` CI check detects accidental reintroduction of
old event folders. Keep branches up to date with this repository's `main`.
It is a CI check, not a replacement for branch-protection rules or team notice.

## What stays the same

- `create.gosim.org` and all event paths, including `/survey26/platform/`.
- Existing public Supabase projects, login/reset callbacks, and databases.
- Hub navigation, Paris hosting, and Factory's scheduled leaderboard snapshot.
- Evaluation workers and backend deployments: they are outside this website migration.

Factory and Survey's public client settings were verified against the deployed
JavaScript bundles and configured as destination repository Actions variables.
No administrative database credential or personal GitHub token was copied.
The old secrets may remain in the shared repository for rollback; only Paris's
secrets are used by its new build workflow.

## Release selection and recovery

Each event's `Publish event site` workflow creates a draft release, uploads its
complete archive and checksum, then publishes it as latest. Compilation errors
cannot advance the latest published site. The central collector resolves one
explicit tag per event, validates the checksum, identity, paths, and required
entry points, and aborts on failure before a Pages deployment occurs.

`config/event-sites.json` can pin a known-good `site-...` release tag for rollback.
`latest` resumes automatic updates. The published `/deployment.json` records the
source commit, release tag, and archive checksum for each event.

For a full deployment-system rollback, revert the migration merge in this repo
and redeploy; the existing secrets and original source history are retained.
Do not resume editing both copies of an event after a rollback.

Survey upstream contributions to `BH3GEI/agent-observer` must be reviewed and
merged into `gosimfoundation/hackathon-survey26` to reach this domain. The old
`scripts/agent-observer.json` pin-update workflow is retired.

The event repositories use `hackathon-<slug>` names. Website paths keep their
existing `/<slug>/` form. The collector explicitly accepts the former repository
identities for existing release archives, preserving rollback across renames.
