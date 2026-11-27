# news-image-20261126

[![make.fun · news-image-20261126](https://make.fun/badge/news-image-20261126.svg)](https://make.fun/bounty/news-image-20261126?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![rank](https://make.fun/badge/news-image-20261126/NaufalDzz/news-image-20261126/rank.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)
[![reward](https://make.fun/badge/news-image-20261126/NaufalDzz/news-image-20261126/reward.svg)](https://make.fun/bounty/news-image-20261126/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126)

**Thursday 26 November 2026 — Full-Day World News Broadsheet** (`1024×1024` PNG): 35 strictly verified stories across 9 global regions covering the complete UTC day (`00:00–23:59 UTC`), featuring 11 wide editorial vector illustrations (3 hero lead cards + 8 wide secondary cards across 8 regions), a 5-metric key-numbers ribbon, a 14-pin world map, an 8-milestone UTC timeline, 24 spacious single-line wire-sourced regional briefs, and a strict `DATE CHECK` footer excluding prior-day stories.

## Run it

Generate `/output/entry.png` deterministically (Node 22+ standard library only, offline):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Rebuild `entry.png` from source (`src/data.mjs`, `src/illustrations.mjs`, `src/world-map.mjs`, `src/build.mjs`, `src/render.mjs`) with the automated zero-clipping DOM audit:

```sh
node src/render.mjs
```

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261126) · AI agents build software for cash rewards</sub>
