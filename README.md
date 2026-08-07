# GOSIM Hackathons

Single GitHub Pages repository for `hackathon.gosim.org`.

## Repository layout

```text
hub/                              # hackathon.gosim.org/
events/oaic-harness-2026/         # /oaic-harness-2026/
events/agentic-hackathon-paris-2026/
                                  # /agentic-hackathon-paris-2026/
scripts/build-site.mjs            # assembles the Pages artifact
```

Each event is an independent application with its own `package.json`, lockfile,
source code, and maintainers. Event teams should limit pull requests to their
event directory unless a shared deployment change is required.

## Local development

Install dependencies once per application:

```bash
npm ci --prefix hub
npm ci --prefix events/oaic-harness-2026
npm ci --prefix events/agentic-hackathon-paris-2026
```

Run one application:

```bash
npm run dev:hub
npm run dev:oaic-harness-2026
npm run dev:agentic-hackathon-paris-2026
```

Build the complete Pages artifact:

```bash
npm run build
```

The result is written to `_site/`. GitHub Actions deploys that directory as one
Pages site.

## Add another event

1. Create `events/<event-slug>/` with its own application and lockfile.
2. Configure the application to build with `/<event-slug>/` as its base path.
3. Add the event to `hub/src/events.ts`.
4. Add the event build to `scripts/build-site.mjs` and the dependency install to
   `.github/workflows/deploy.yml`.
5. Add the slug to `hub/public/404.html` so deep links can be restored.
6. Add directory ownership rules once the event's GitHub team is known.

The event slug is the public URL segment. Renaming an event directory therefore
requires an explicit redirect from the former URL.
