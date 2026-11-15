# Landscape composition (1920x1080)

The 16:9 cut of the brag video. Same 122 BPM grid, same scene boundaries and
beat locks as the vertical composition next door, so one music track fits
either version without re-timing.

Scenes re-laid out for the short axis — this is not a crop of the vertical:

- Intro puts the logo beside the name block instead of above it.
- The roster runs two columns of four; eight stacked cards do not fit 1080px.
- The short-form cards shrink to 344x612 and spread wider.

## Assets

`assets/` is gitignored here because it is a byte-for-byte copy of the vertical
composition's, and duplicating ~2.7MB of binaries in the repo is not worth it.
Restore before rendering:

```bash
cp -R ../composition/assets ./assets
```
