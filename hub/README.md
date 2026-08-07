# GOSIM Hackathon Hub

Directory and routing gateway for `hackathon.gosim.org`.

## Responsibilities

- Serve the hackathon directory at `/`
- Keep the canonical event registry in `src/events.ts`
- Route each event slug to its independently deployed Vercel project
- Preserve redirects for URLs that existed before the multi-event migration

## Local development

```bash
npm ci
npm run dev
```

## Add an event

1. Add its public metadata to `src/events.ts`.
2. Add exact and wildcard rewrites to `vercel.json`.
3. Test the event home page, a deep route, and a static asset through the Hub preview deployment.
4. Merge only after the event's production Vercel deployment is ready.

## OAIC migration prerequisite

The current upstream in `vercel.json` assumes the event Vercel project receives the production domain `oaic-harness-2026.vercel.app`. If Vercel assigns a different domain, update both rewrite destinations before deploying the Hub.

Keep redirects temporary (`permanent: false`) during migration. They can be made permanent after the new routing has been stable for at least one week.
