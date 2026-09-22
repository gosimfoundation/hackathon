# Shared domain publisher

Read README.md and docs/repository-migration.md before editing.
Active event source code lives in the independent repositories listed in
config/event-sites.json. Do not recreate the removed event source directories.
This repository owns the hub, archived Paris site, shared routing and assembly.
Keep public URLs and authentication callbacks stable.
Use Node.js 22 and Python 3.12+. Validate routing, release validation, hub tests,
and the assembled site when changing deployment.
