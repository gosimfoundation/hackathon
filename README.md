# GOSIM Hackathons

Single GitHub Pages repository for `create.gosim.org`.

## Repository layout

```text
hub/                              # create.gosim.org/
events/oaic-harness-2026/         # /factory26/
events/agentic-hackathon-paris-2026/
                                  # /agenticparis26/
events/agentic-cosmos-2026/       # /survey26/
events/agent2app-2026/            # /agent2app26/
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
npm ci --prefix events/agentic-cosmos-2026
npm ci --prefix events/agent2app-2026
```

Run one application:

```bash
npm run dev:hub
npm run dev:oaic-harness-2026
npm run dev:agentic-hackathon-paris-2026
npm run dev:agentic-cosmos-2026
npm run dev:agent2app-2026
```

Build the complete Pages artifact:

```bash
npm run build
```

The result is written to `_site/`. GitHub Actions deploys that directory as one
Pages site.

## Password reset redirects

Each event's Supabase project should use its event URL as the Auth Site URL and
allow its callback URL under **Authentication → URL Configuration → Redirect URLs**:

| Project | Site URL | Allowed reset callback |
| --- | --- | --- |
| Factory26 | `https://create.gosim.org/factory26` | `https://create.gosim.org/factory26` and `https://create.gosim.org/factory26/` |
| Paris | `https://create.gosim.org/agenticparis26` | `https://create.gosim.org/agenticparis26` and `https://create.gosim.org/agenticparis26/` |
| Survey26 | `https://create.gosim.org/survey26` | `https://create.gosim.org/survey26/register` |

Keep the standard reset email's `{{ .ConfirmationURL }}` link so Supabase verifies
the recovery request before returning to the app. See the
[Supabase redirect URL documentation](https://supabase.com/docs/guides/auth/redirect-urls).

The hub also forwards legacy root auth callbacks, preserving the query and hash.
Build-time public Supabase project URLs select the event; callbacks without a
matching issuer use Factory26, which previously occupied the root. Tokens are
validated by the destination app's Supabase client, not by the hub.

Run redirect regression tests with `npm test --prefix hub`. To verify a real
reset after deployment, request a fresh email, open it in a signed-out browser,
confirm the new-password form appears, and confirm login with the new password.

## Add another event

1. Create `events/<event-slug>/` with its own application and lockfile.
2. Configure the application to build with `/<event-slug>/` as its base path.
3. Add the event to `hub/src/events.ts`.
4. Add the event build to `scripts/build-site.mjs` and the dependency install to
   `.github/workflows/deploy.yml`.
5. Add the slug to `hub/public/404.html` so deep links can be restored.
6. Add the slug to `scripts/serve-site.mjs` so local preview deep links work.
7. Add directory ownership rules once the event's GitHub team is known.

The event slug configured by the root build is the public URL segment; it does
not need to match the source directory. Renaming a public slug requires an
explicit redirect from the former URL.
