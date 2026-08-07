# Production cutover checklist

This checklist moves the current hackathon to:

- Hub: `https://hackathon.gosim.org/`
- Event: `https://hackathon.gosim.org/oaic-harness-2026/`

Keep the existing production domain unchanged until both Vercel projects below
have deployed successfully.

## 1. Merge the event-site change (completed)

Pull request `gosimfoundation/sz26hackathon#1` was merged into `main` on
2026-08-07.

The application still defaults to `/`, so merging this change does not move the
current production site by itself.

## 2. Create the event Vercel project

Import `gosimfoundation/sz26hackathon` as a new Vercel project named
`oaic-harness-2026`.

Copy the existing project's application secrets, then set:

```text
VITE_BASE_PATH=/oaic-harness-2026/
VITE_SITE_URL=https://hackathon.gosim.org/oaic-harness-2026
```

Deploy it and verify the assigned `*.vercel.app` hostname. If it is not
`oaic-harness-2026.vercel.app`, update the two upstream URLs in `vercel.json`
before deploying the hub.

## 3. Create the hub Vercel project

Import `gosimfoundation/hackathon-hub` as a project named `hackathon-hub` and
deploy it.

On its preview URL, verify:

- `/` shows the event directory.
- `/oaic-harness-2026/` shows the event site.
- `/oaic-harness-2026/rules` opens directly and survives a refresh.
- Login and password-reset links remain under the event prefix.

## 4. Cut over the production domain

Only after the preview checks pass:

1. Remove `hackathon.gosim.org` from the old Vercel project.
2. Add `hackathon.gosim.org` to the `hackathon-hub` Vercel project.
3. In Supabase Auth URL Configuration, change the Site URL to
   `https://hackathon.gosim.org/oaic-harness-2026`.
4. Keep these redirect allow-list entries:
   - `https://hackathon.gosim.org/oaic-harness-2026`
   - `https://hackathon.gosim.org/oaic-harness-2026/**`
5. If the Supabase Edge Functions use a `SITE_URL` secret, set it to
   `https://hackathon.gosim.org/oaic-harness-2026` and redeploy affected
   functions.

The hub temporarily redirects former root-level event routes such as `/rules`
and `/projects` into the event prefix.

## 5. Post-cutover checks

- Test the hub and event from a logged-out browser.
- Test sign-up, login, logout, password reset, team links, QR codes, and admin
  links.
- Confirm Supabase Auth logs do not show rejected redirect URLs.
- Keep the old Vercel project for rollback until the new setup has been stable.
- Rename `sz26hackathon` to `oaic-harness-2026` only after the migration is
  stable; GitHub redirects the old repository URL automatically.
