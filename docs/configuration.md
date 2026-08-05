# Configuration Guide

## Environment variables

Copy `.env.example` to `.env` and set:

```dotenv
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SITE_URL=https://your-public-site.example
```

`VITE_SITE_URL` is used for authentication redirects, invitation links, and QR codes. Add `GHPAGES=1` only when deploying below a GitHub Pages repository path.

## Public event content

The English and Chinese public copy is in `src/i18n/en.ts` and `src/i18n/zh.ts`. `config/event.example.yaml` is a reference snapshot of the same confirmed 2026 event data; it is not read at runtime.

The countdown in `src/components/sections/HeroSection.vue` starts at `2026-09-01T00:00:00+08:00`. Update it only if the organizer confirms a new start time.

Do not publish values for the following fields until they are confirmed:

- team size
- registration deadline
- participation fee
- judging weights
- contact details
- additional sponsors or sponsor logos

## Supabase

Follow `docs/supabase-setup.md` and apply every migration under `supabase/migrations/` in filename order. The current public registration flow requires Supabase Auth plus the `profiles`, `teams`, `team_invitations`, and supporting tables documented there.

## Email notifications

The `send_team_email` Edge Function uses:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SITE_URL`

Deploy it with the Supabase CLI after those secrets are configured.

## Media

Static assets are served from `public/`. Sponsor marks should be added only after authorization is confirmed and the public sponsor section is updated accordingly.
