# Agent2App Hackathon 2026

Independent Vue + TypeScript + Vite event site, served at `/agent2app26/` alongside Factory26 and Survey26. No shared event database or authentication is configured.

## Development

```sh
npm ci
npm run dev
npm run build
```

The root build assembles the output into `_site/agent2app26/`. `VITE_BASE_PATH` can override the default base path.

## Content and visual direction

`src/App.vue` contains participant-facing copy based on the supplied Agent2App single-track, three-depth v2 blueprint (August 2026). The finale is co-located at GOSIM Shenzhen, as confirmed by the organizer.

The current design uses the approved warm city/studio illustration as a full-viewport hero. The palette is cream, terracotta, slate blue and muted sage, drawn from the artwork. Chinese typography remains Noto Sans SC. English display text uses Cormorant Garamond, with Space Grotesk body text and IBM Plex Mono for small labels. Serif styling is limited to English headings and numerals. All fonts include local fallbacks.

- `public/images/human-robot-city-v3.png`: current full-bleed hero, expanded classical city view.
- `public/images/human-robot-studio-v2.png`: matching workshop illustration in the technology section.
- `public/images/CITY-V3-PROMPT.md` and `STUDIO-V2-PROMPT.md`: generation provenance.

These are concept illustrations, not photographs of the actual event or product screenshots. `heroImage` and `terminalImage` in `src/App.vue` control the assets. The hero uses a left-weighted contrast overlay; the right side remains open to the city and workspace. Mobile retains the full-bleed composition with a stronger local overlay. Earlier artwork and temporary video files are unused variants.

The media layer can host a future video without changing the page layout. When restoring video, provide muted inline playback, pause controls and reduced-motion handling.

Exact competition dates, prize amounts, registration, repository links, bounty values and official resources remain unconfirmed. The site labels them as pending and does not collect registrations. Replace the pending notice with the confirmed event-specific registration service when available; never reuse another event's credentials. Relative training dates are a proposed schedule. Spotlight promotional copy describes a separate event and is not included.

## Day / night themes

The header theme button switches the full page palette and hero between `human-robot-city-v3.png` and `human-robot-city-night.png`. The default is day; explicit selection persists under the event-specific `agent2app-theme` localStorage key. A small head script restores the palette before first paint, and the toggle remains usable if storage is unavailable. Night artwork is a lighting edit of the same composition. The browser theme color and native color scheme follow the selected mode.
