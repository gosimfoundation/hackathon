# Hub application

Directory for all events published at `create.gosim.org`.

## Responsibilities

- Present GOSIM Create as the home of the GOSIM hackathon series at `/`
- Keep the canonical event registry in `src/events.ts`
- Link each event slug to the corresponding application under `../events/`
- Preserve redirects for URLs that existed before the multi-event migration

## Local development

```bash
npm ci
npm run dev
```

Run this application from the repository root with `npm run dev:hub`.

The repository-level README contains the deployment and event onboarding steps.
