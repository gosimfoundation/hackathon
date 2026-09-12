# Agent2App Hackathon 2026

Independent Vue + TypeScript + Vite event site, served at `/agenticapp26/` alongside Factory26 and Survey26. No shared event database or authentication is configured.

## Development

```sh
npm ci
npm run dev
npm run build
```

The root build assembles the output into `_site/agenticapp26/`. `VITE_BASE_PATH` can override the default base path.

## Content and visual direction

`src/App.vue` contains participant-facing copy, awards and bounties. `src/components/EventSchedule.vue` contains the dated competition and training calendars. The original August 2026 blueprint was expanded on September 12 into two tracks sharing three optional depths and the existing awards:

- Track A: OctoSense + AppCard intent-driven applications.
- Track B: Robrix Agent2App software factory mini apps, using robrix2 + [hagency](https://github.com/hagency-org/hagency) (formerly hafleet). Participants add task, agent-state, outcome-review or collaboration applications.

`src/components/CompetitionTracks.vue` owns the track descriptions and Track B deliverables. The robrix2 runtime integration is planned; the site explicitly marks the runtime, capability list and starter kit as pending. Its UI will follow robrix2. Training is a common foundation followed by track-specific practice, with an additional factory-app verification session. Copy changes must be reflected in `src/en.json`, metadata in `src/useLocale.ts` / `index.html`, and the hub event entry. The finale is co-located at GOSIM Shenzhen, as confirmed by the organizer.

The current design uses the approved warm city/studio illustration as a full-viewport hero. The palette is cream, terracotta, slate blue and muted sage, drawn from the artwork. Chinese typography uses Noto Serif SC. English display text uses Cormorant Garamond, with Space Grotesk body text and IBM Plex Mono for small labels. All fonts include local fallbacks.

- `public/images/human-robot-city-v3.png`: current full-bleed hero, expanded classical city view.
- `public/images/human-robot-studio-v2.png`: matching workshop illustration in the technology section.
- `public/images/CITY-V3-PROMPT.md` and `STUDIO-V2-PROMPT.md`: generation provenance.

These are concept illustrations, not photographs of the actual event or product screenshots. `heroImage` and `terminalImage` in `src/App.vue` control the assets. The hero uses a left-weighted contrast overlay; the right side remains open to the city and workspace. Mobile retains the full-bleed composition with a stronger local overlay. Earlier artwork and temporary video files are unused variants.

The media layer can host a future video without changing the page layout. When restoring video, provide muted inline playback, pause controls and reduced-motion handling.

Registration links to the organizer-provided [Tencent Questionnaire form](https://wj.qq.com/s2/27846792/da0o/). `src/components/RegistrationPanel.vue` embeds the provided Qacman animated QR code and shows the full registration URL as a direct alternative. The site does not store form responses. The organizer confirmed registration opens September 13, 2026, kickoff takes place September 19, and the GOSIM live final is October 17. Solo and team entries are welcome; captains and all members register individually. The local draft sets registration close on September 23, preliminary submission on September 28, semifinal submission on October 8, two review days per round, and six days of final preparation. All times are UTC+8. Other intermediate dates and exact training times are proposed; prize amounts, advancement quotas and remaining resources are pending. See [the operational schedule](docs/competition-schedule.md) and [curriculum](docs/curriculum.md). Spotlight promotional copy describes a separate event and is not included.

## Day / night themes

The header theme button switches the full page palette and hero between `human-robot-city-v3.png` and `human-robot-city-night.png`. The default is day; explicit selection persists under the event-specific `agent2app-theme` localStorage key. A small head script restores the palette before first paint, and the toggle remains usable if storage is unavailable. Night artwork is a lighting edit of the same composition. The browser theme color and native color scheme follow the selected mode.

## Real application screenshots

`src/components/ProjectShowcase.vue` adds the eight selected native captures to the live page at `#showcase`: one AppCard reference weather card, two OctoSense desktop themes, an independently visible Omarchy tiling view, and four Robrix Agent2App mechanism views. Desktop theme selection follows the site theme and also has its own controls. Each image opens its full original in a new tab. The eight files under `public/screenshots/` are byte-identical to the reviewed originals; `provenance.json` records their SHA-256 and source paths in the local review archive; those archive paths are not public site routes. Raw review logs and temporary launchers are retained locally. Captions distinguish prebuilt cards, source-project test UI, and deterministic ACP output from the planned robrix2 integration.
