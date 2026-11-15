# Hyperframes Composition Brief: Abdul Basit — Video Editor Portfolio

## Objective
Create a short launch-style brag video for Abdul Basit's video editor portfolio site.

## Output
- Composition directory: `brag-output/composition/`
- Rendered video: `brag-output/brag.mp4`
- Format: vertical — 1080x1920
- Duration: 22.65s

## Source Material
- Project root: `/Users/amh/Desktop/portfolio website`
- Primary files read: `index.html`, `styles.css`, `assets/images/*`
- Product name: Abdul Basit — Video Editor · Motion Design
- Tagline / strongest claim: "Engage. Entertain. Elevate." — and the derived roster total, **8,506,730 subscribers**
- Key UI to recreate: the creator card (circular avatar + name + sub count) and the
  9:16 short-form card with the circular ▶ button
- Copy that must appear verbatim:
  - `Engage. Entertain.` / `Elevate.`
  - `Video Editor · Motion Design`
  - `Mementoe` `3.1M+` / `Tayo Ricci` `3M+` / `Jack Gordon` `853K+` / `HRVizak` `316K+`
  - `30+` creators · `200+` videos · `24–72h`
  - `basitportfoliowebsite.vercel.app`

## Creative Direction
- Tone preset: `default`
- Creative direction: the editor's own showreel — fast cuts on beat, ember-lit dark, let the client numbers do the bragging
- Interpretation: Energy comes from motion and tight cuts, never from pulling text early.
  Every scene boundary sits on a strong beat. One accent colour only; aggression lives in timing.
- Angle: He edits for creators with millions of subscribers, but nobody has ever added it
  up. The roster totals ~8.5M subscribers. Lead with the number, prove it with the real
  roster and the real work.
- Hook: a counter racing `0 → 8,506,730`, settling on the 1.60s strong beat, then the word `subscribers`.
- Outro / punchline: his own hero line, "Engage. Entertain." → **"Elevate."** in the ember gradient, URL beneath.
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Unrelated visual redesign
  - Any second accent colour

## Visual Identity
- Background: `#070a0f` (elevated surface `#101520`, soft `#141a26`)
- Text: `#f7f7f7`, muted `#a2a8b9`
- Accent: `#c43b2f` → `#ff6b4a` gradient (reserve the gradient for "Elevate.")
- Display font: Space Grotesk 700
- Body font: Space Grotesk 400/500
- Visual references from the project: circular avatar with conic ember ring; pill-shaped
  creator card on near-black; 9:16 card with 14px radius and a circular translucent ▶;
  radial ember page glow top-left

## Storyboard
Use the storyboard in `brag-output/brag-plan.md` as the creative contract.

Scene summary:
1. The number — 3.70s — counter `0 → 8,506,730` settles on beat, label `subscribers`
2. Who — 2.64s — "…watch videos I edited." then `ABDUL BASIT` / `Video Editor · Motion Design`
3. The roster — 6.31s — 4 real creator cards arrive one by one on alternating beats, then hold together
4. The work — 5.26s — simulated tap on a real 9:16 short card's ▶; swaps to a playing state
5. Stats and sign-off — 4.74s — stat row, then `Engage. Entertain.` / `Elevate.` + URL

## Audio
- Audio role: warm rhythmic bed that drives the cuts
- Audio arc: ticks build the hook → card sounds mark each creator → one tap sells the interaction → one restrained hit lands "Elevate." → music fades out
- Music: `happy-beats-business-moves-vol-11-by-ende-dot-app.mp3` (114.84 BPM)
- Music treatment: starts at 0.00, steady through the body, fade out over the final ~1.2s
- Music cue guidance: bundled preset at
  `<skill-dir>/assets/music/cues/happy-beats-business-moves-vol-11-by-ende-dot-app.music-cues.json`.
  Strong cues: **1.60 / 3.70 / 5.80 / 6.34 / 8.96 / 9.50 / 12.65 / 17.91 / 22.65**.
  Beat grid ~0.525s. Scene boundaries target 3.70 / 6.34 / 12.65 / 17.91 / 22.65.
  **Sequential creator cards must snap to every OTHER beat (~1.05s)** so each name and
  count clears the readability floor — not every beat.
- Audio-reactive treatment: subtle; drive the ember page-glow intensity and creator-card
  presence from RMS/bass. No waveform, equalizer, or particle visuals.
- Audio-coupled moments:
  - Scene 1 counter — ticks during the roll, one soft impact on the settle (beat-lock 1.60s)
  - Scene 3 roster — one card sound per arrival, on the alternating beat grid
  - Scene 4 play button — UI tap on press, soft whoosh on the state swap
  - Scene 5 "Elevate." — single restrained impact, then music fade
- SFX selection guidance: match sound to the implemented motion. Card-like reveals get
  card sounds; the tap gets a UI click; the payoff gets one announcement cue. Keep it
  moderate — nothing fires on top of a line the viewer must read.
- SFX analysis guidance: use `<skill-dir>/assets/sfx/sfx-analysis.md` / `.json`; prefer
  low high-frequency-risk files for the repeated card arrivals.
- Exact SFX choice: Hyperframes chooses filenames, timestamps, density, and volume after the animation exists.
- Audio files: copy chosen music and SFX into `brag-output/composition/assets/`

## Hyperframes Instructions
Load `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`,
`hyperframes-keyframes`, `hyperframes-cli`. /brag is its own workflow — do not enter the
`hyperframes` entry-point intent interview or its generic promo / launch-video workflow.
Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Show real UI/copy from the source project (creator cards + the 9:16 play card are the anchors).
- All text readable in the final render; respect the reading floor (short label ~0.8s settled, sentence ~0.3s/word).
- Total duration 15-25s.
- Include the music/SFX layer.
- Beat-lock 1-3 major reveals within ±0.15s; snap sequential card arrivals within ±0.10s of alternating beats.
- Wire at least one visual element to audio data, or document extraction failure.
- Use local assets; render locally (Chrome + FFmpeg verified present).
- Run `hyperframes check` before render — brag's single gate.

## Asset note (important)
The site's images were deliberately optimised small for web (avatars 80px, short thumbs
360x640) and will look soft at 1080x1920. Higher-resolution sources of the SAME images
are staged into `composition/assets/img/` for the video. Do not downgrade the website's
optimised assets — the video uses its own copies.
