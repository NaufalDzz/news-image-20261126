/**
 * Broadsheet HTML/CSS/SVG compiler and build runner for news-image-20261126.
 * Validates dataset integrity, generates a 1024x1024 print-editorial broadsheet,
 * renders via Chromium CDP with strict automated DOM clipping/overlap audit, and outputs entry.png.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EDITION,
  REGIONS,
  REGION_MAP,
  KEY_FIGURES,
  TIMELINE_UTC,
  LEADS,
  SECONDARIES,
  BRIEFS,
  MAP_PINS,
  validateEdition
} from './data.mjs';
import { LEAD_ART, SECONDARY_ART } from './illustrations.mjs';
import { renderWorldMapSvg } from './world-map.mjs';
import { renderBroadsheet } from './render.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');

function esc(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function tagClass(tag) {
  const t = tag.toLowerCase();
  if (t === 'official') return 'tag-official';
  if (t === 'confirmed') return 'tag-confirmed';
  if (t === 'ongoing' || t === 'scheduled') return 'tag-ongoing';
  return 'tag-reported';
}

function buildHtml() {
  const stats = validateEdition();

  const pinsWithColor = MAP_PINS.map((p) => ({
    ...p,
    color: REGION_MAP[p.region].color
  }));
  const { svg: worldMapSvg, minPairDist } = renderWorldMapSvg(pinsWithColor);

  const regionPillsHtml = REGIONS.map(
    (r) =>
      `<div class="region-pill" style="background:${r.color}; flex:${r.count} 1 auto;">
        <span>${esc(r.label)}</span><strong>${r.count}</strong>
      </div>`
  ).join('');

  const leadCardsHtml = LEADS.map((item) => {
    const reg = REGION_MAP[item.region];
    const art = LEAD_ART[item.artKey]();
    return `<article class="card lead-card" data-num="${item.num}" style="border-top-color:${reg.color}">
      <div class="lead-art">${art}</div>
      <div class="card-body">
        <div class="card-eyebrow">
          <span class="eyebrow-left">
            <span class="num-dot" style="background:${reg.color}">${item.num}</span>
            <span class="place-txt" style="color:${reg.color}">${esc(item.place)}</span>
          </span>
          <span class="cert-tag ${tagClass(item.tag)}">${esc(item.tag)}</span>
        </div>
        <h2 class="card-headline">${esc(item.headline)}</h2>
        <p class="card-deck">${esc(item.deck)}</p>
        <div class="card-meta">
          <span>Source: ${esc(item.source)}</span>
          <span class="utc-stamp">${esc(item.utc)}</span>
        </div>
      </div>
    </article>`;
  }).join('');

  const secondaryCardsHtml = SECONDARIES.map((item) => {
    const reg = REGION_MAP[item.region];
    const art = SECONDARY_ART[item.artKey]();
    return `<article class="card sec-card" data-num="${item.num}" style="border-top-color:${reg.color}">
      <div class="sec-art">${art}</div>
      <div class="card-body">
        <div class="card-eyebrow">
          <span class="eyebrow-left">
            <span class="num-dot num-sm" style="background:${reg.color}">${item.num}</span>
            <span class="place-txt" style="color:${reg.color}">${esc(item.place)}</span>
          </span>
          <span class="cert-tag ${tagClass(item.tag)}">${esc(item.tag)}</span>
        </div>
        <h3 class="card-headline">${esc(item.headline)}</h3>
        <p class="card-deck">${esc(item.summary)}</p>
        <div class="card-meta"><span>${esc(item.source)}</span></div>
      </div>
    </article>`;
  }).join('');

  const figuresHtml = KEY_FIGURES.map(
    (k) => `<div class="stat-cell">
      <div class="stat-num" style="color:${k.accent}">${esc(k.figure)}</div>
      <div class="stat-label"><strong>${esc(k.line1)}</strong><span>${esc(k.line2)}</span></div>
    </div>`
  ).join('');

  const timelineHtml = TIMELINE_UTC.map(
    (t) => `<div class="timeline-item">
      <span class="tl-time">${esc(t.time)}</span>
      <span class="tl-dot"></span>
      <span class="tl-text">${esc(t.text)}</span>
    </div>`
  ).join('');

  // Split 24 spacious briefs cleanly: 12 left + 12 right
  const leftBriefs = BRIEFS.slice(0, 12);
  const rightBriefs = BRIEFS.slice(12);

  const renderBrief = (b) => {
    const reg = REGION_MAP[b.region];
    return `<div class="brief-item" data-num="${b.num}">
      <span class="brief-num" style="background:${reg.color}">${b.num}</span>
      <span class="brief-copy"><strong>${esc(b.place)}:</strong> ${esc(b.text)} <span class="brief-src">(${esc(b.source)})</span></span>
    </div>`;
  };

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${esc(EDITION.dayPrefix)} ${esc(EDITION.dayDate)} — World News Broadsheet</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #f7f3ea;
    color: #161616;
    font-family: 'Noto Sans', 'Nimbus Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  #broadsheet {
    width: 1024px;
    height: 1024px;
    padding: 5px 14px 5px 14px;
    display: flex;
    flex-direction: column;
    background: #f7f3ea;
  }

  /* Eyebrow & Giant Unmistakable Masthead */
  .top-rule {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8.5px;
    font-weight: 800;
    letter-spacing: 0.65px;
    text-transform: uppercase;
    padding-bottom: 2px;
    border-bottom: 2px solid #161616;
    flex-shrink: 0;
  }
  .kicker-left { color: #334155; }
  .kicker-right { color: #9b1c1c; }

  .masthead {
    text-align: center;
    padding: 0 0 1px 0;
    border-bottom: 1px solid #c9c0ae;
    flex-shrink: 0;
  }
  .masthead-title {
    font-family: 'Noto Serif', 'C059', Georgia, serif;
    font-size: 57px;
    font-weight: 900;
    line-height: 1.32;
    margin: -6px 0 -5px 0;
    letter-spacing: -1px;
    color: #111111;
  }
  .masthead-date { color: #9b1c1c; }
  .masthead-deck {
    margin-top: -1px;
    font-family: 'Noto Serif', Georgia, serif;
    font-style: italic;
    font-size: 10.6px;
    line-height: 1.22;
    color: #2c2c2c;
    white-space: nowrap;
  }

  /* 9-Region Proportional Strip */
  .region-bar {
    margin-top: 4px;
    display: flex;
    gap: 3px;
    height: 17px;
    flex-shrink: 0;
  }
  .region-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 2px;
    color: #ffffff;
    font-size: 8.1px;
    font-weight: 700;
    letter-spacing: 0.2px;
    padding: 0 4px;
    white-space: nowrap;
  }
  .region-pill strong {
    background: rgba(255,255,255,0.22);
    padding: 0 3.5px;
    border-radius: 2px;
    font-size: 8.3px;
  }

  /* Cards Shared */
  .card {
    background: #ffffff;
    border: 1px solid #d5cebe;
    border-top-width: 3px;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
  .card-eyebrow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }
  .eyebrow-left {
    display: flex;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }
  .num-dot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    color: #ffffff;
    font-size: 9px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .num-sm { width: 13.5px; height: 13.5px; font-size: 8.1px; }
  .place-txt {
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.3px;
    white-space: nowrap;
  }
  .cert-tag {
    font-size: 7.2px;
    font-weight: 800;
    letter-spacing: 0.25px;
    padding: 1px 4px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .tag-official { background: #e6eff7; color: #16406b; }
  .tag-confirmed { background: #e4f3ec; color: #145a41; }
  .tag-reported { background: #f4efe3; color: #6e4a12; }
  .tag-ongoing { background: #fdeaea; color: #9b1c1c; }

  /* 3 Hero Lead Cards */
  .leads-grid {
    margin-top: 4px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    height: 215px;
    flex-shrink: 0;
  }
  .lead-art {
    height: 92px;
    border-bottom: 1px solid #e5dfd2;
    overflow: hidden;
    flex-shrink: 0;
  }
  .lead-art svg, .sec-art svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .lead-card .card-body {
    padding: 3.5px 8px 3.5px 8px;
  }
  .lead-card .card-headline {
    margin-top: 1.5px;
    font-family: 'Noto Serif', 'C059', Georgia, serif;
    font-size: 18.2px;
    font-weight: 800;
    line-height: 1.2;
    color: #111111;
    flex-shrink: 0;
  }
  .lead-card .card-deck {
    margin-top: 2px;
    font-size: 10.2px;
    line-height: 1.2;
    color: #262626;
    flex: 1;
    min-height: 0;
  }
  .lead-card .card-meta {
    margin-top: 2px;
    padding-top: 2px;
    border-top: 1px solid #ece7dc;
    display: flex;
    justify-content: space-between;
    font-size: 8.6px;
    font-weight: 700;
    color: #4b5563;
    flex-shrink: 0;
  }
  .utc-stamp { color: #1d4e7a; }

  /* 8 WIDE Secondary Cards (2 x 4) for unmistakable 300px readability */
  .sec-grid {
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 162px);
    gap: 7px;
    flex-shrink: 0;
  }
  .sec-art {
    height: 57px;
    border-bottom: 1px solid #e5dfd2;
    overflow: hidden;
    flex-shrink: 0;
  }
  .sec-card .card-body {
    padding: 3.5px 7px 3.5px 7px;
  }
  .sec-card .card-headline {
    margin-top: 2px;
    font-family: 'Noto Serif', 'C059', Georgia, serif;
    font-size: 14.5px;
    font-weight: 800;
    line-height: 1.22;
    color: #111111;
    flex-shrink: 0;
  }
  .sec-card .card-deck {
    margin-top: 2px;
    font-size: 9.7px;
    line-height: 1.2;
    color: #2f2f2f;
    flex: 1;
    min-height: 0;
  }
  .sec-card .card-meta {
    margin-top: 2px;
    padding-top: 2px;
    border-top: 1px solid #eee9de;
    font-size: 8.4px;
    font-weight: 700;
    color: #4b5563;
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* Architectural BY THE NUMBERS Ribbon */
  .numbers-ribbon {
    margin-top: 5px;
    height: 36px;
    background: #162536;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    gap: 6px;
    color: #ffffff;
    flex-shrink: 0;
  }
  .ribbon-title {
    width: 66px;
    flex-shrink: 0;
    font-size: 8.5px;
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: 0.65px;
    color: #e2e8f0;
    border-right: 1px solid rgba(255,255,255,0.22);
    padding-right: 6px;
  }
  .stats-row {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
  }
  .stat-cell {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-left: 4px;
    border-left: 1px solid rgba(255,255,255,0.14);
  }
  .stat-cell:first-child { border-left: none; padding-left: 0; }
  .stat-num {
    font-size: 19.5px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.4px;
    line-height: 1.22;
    white-space: nowrap;
  }
  .stat-label {
    display: flex;
    flex-direction: column;
    font-size: 8.2px;
    line-height: 1.15;
    color: #cbd5e1;
  }
  .stat-label strong {
    color: #ffffff;
    font-weight: 700;
  }

  /* Lower Section: Map + Timeline (Left) & 24 Spacious Regional Briefs (Right) */
  .lower-grid {
    margin-top: 5px;
    display: grid;
    grid-template-columns: 262px 1fr;
    gap: 10px;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .section-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: #161616;
    padding-bottom: 2px;
    border-bottom: 1.5px solid #161616;
    margin-bottom: 4px;
    flex-shrink: 0;
  }
  .section-sub {
    font-size: 8px;
    font-weight: 700;
    color: #52525b;
  }
  .left-pane {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .map-wrap {
    height: 112px;
    border: 1px solid #c9c0ae;
    border-radius: 3px;
    overflow: hidden;
    background: #dceaf3;
    flex-shrink: 0;
  }
  .timeline-head {
    margin-top: 4px;
    margin-bottom: 2px;
  }
  .timeline-list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-height: 0;
    padding: 0 0 1px 0;
  }
  .timeline-item {
    display: flex;
    align-items: center;
    gap: 4.5px;
    font-family: 'Noto Sans', sans-serif;
    font-size: 9.8px;
    line-height: 1.15;
    color: #1e293b;
    white-space: nowrap;
  }
  .tl-time {
    font-family: 'Noto Sans', sans-serif;
    font-size: 9.2px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: #1d4e7a;
    width: 31px;
    flex-shrink: 0;
  }
  .tl-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #1d4e7a;
    flex-shrink: 0;
  }
  .tl-text {
    flex: 1;
    min-width: 0;
  }

  /* 24 Spacious Briefs Right Pane (12 + 12, non-condensed clean sans) */
  .right-pane {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .briefs-cols {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    flex: 1;
    min-height: 0;
  }
  .brief-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    padding-bottom: 1px;
  }
  .brief-item {
    display: flex;
    align-items: flex-start;
    gap: 5px;
    font-family: 'Noto Sans', sans-serif;
    font-size: 11px;
    letter-spacing: -0.1px;
    line-height: 1.18;
    color: #1f2937;
    padding: 1.4px 0;
    border-bottom: 1px dotted #ddd6c7;
  }
  .brief-item:last-child { border-bottom: none; }
  .brief-num {
    font-family: 'Noto Sans', sans-serif;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 14px;
    margin-top: 1px;
    border-radius: 2px;
    color: #ffffff;
    font-size: 8.3px;
    font-weight: 800;
    flex-shrink: 0;
  }
  .brief-copy {
    flex: 1;
    min-width: 0;
  }
  .brief-copy strong { color: #111111; font-weight: 700; }
  .brief-src { color: #52525b; font-size: 9.7px; font-weight: 500; }

  /* Readable DATE CHECK Footer (>= 9.8px) */
  .footer-box {
    margin-top: 4px;
    background: #ffffff;
    border: 1px solid #d5cebe;
    border-left: 4px solid #9b1c1c;
    border-radius: 2px;
    padding: 4px 8px;
    flex-shrink: 0;
  }
  .date-check-text {
    font-size: 9.7px;
    line-height: 1.24;
    color: #27272a;
  }
  .dc-badge {
    display: inline-block;
    background: #9b1c1c;
    color: #ffffff;
    font-size: 8.3px;
    font-weight: 800;
    letter-spacing: 0.4px;
    padding: 0.5px 5px;
    border-radius: 2px;
    margin-right: 4px;
    vertical-align: 0.5px;
  }
  .dc-excl { color: #9b1c1c; font-weight: 800; }
  .legend-line {
    margin-top: 2px;
    font-size: 8.1px;
    color: #52525b;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>
<main id="broadsheet">
  <header class="top-rule">
    <span class="kicker-left">${esc(EDITION.kickerLeft)}</span>
    <span class="kicker-right">${esc(EDITION.kickerRight)}</span>
  </header>

  <section class="masthead">
    <h1 class="masthead-title">${esc(EDITION.dayPrefix)} <span class="masthead-date">${esc(EDITION.dayDate)}</span></h1>
    <p class="masthead-deck">${esc(EDITION.standfirst)}</p>
  </section>

  <nav class="region-bar" aria-label="Regional story breakdown">
    ${regionPillsHtml}
  </nav>

  <section class="leads-grid" aria-label="Top three stories">
    ${leadCardsHtml}
  </section>

  <section class="sec-grid" aria-label="Ten secondary illustrated stories">
    ${secondaryCardsHtml}
  </section>

  <section class="numbers-ribbon" aria-label="Key figures">
    <div class="ribbon-title">BY THE<br/>NUMBERS</div>
    <div class="stats-row">${figuresHtml}</div>
  </section>

  <section class="lower-grid">
    <div class="left-pane">
      <div class="section-head">
        <span>WHERE IT HAPPENED</span>
        <span class="section-sub">${stats.pinsCount} KEY LOCATIONS</span>
      </div>
      <div class="map-wrap">${worldMapSvg}</div>
      <div class="section-head timeline-head">
        <span>DAY IN UTC</span>
        <span class="section-sub">01:00 – 23:30 UTC</span>
      </div>
      <div class="timeline-list">${timelineHtml}</div>
    </div>

    <div class="right-pane">
      <div class="section-head">
        <span>ALSO ON THURSDAY 26 NOVEMBER — STORIES 12–35</span>
        <span class="section-sub">${stats.briefsCount} REGIONAL BRIEFS · NAMED SOURCES</span>
      </div>
      <div class="briefs-cols">
        <div class="brief-col">${leftBriefs.map(renderBrief).join('')}</div>
        <div class="brief-col">${rightBriefs.map(renderBrief).join('')}</div>
      </div>
    </div>
  </section>

  <footer class="footer-box">
    <div class="date-check-text">
      <span class="dc-badge">DATE CHECK</span>
      <strong>${esc(EDITION.dateCheckRule)}</strong>
      <span class="dc-excl"> EXCLUDED (NOT 26 NOV):</span> ${esc(EDITION.dateCheckExcluded)}.
    </div>
    <div class="legend-line">
      <span>${esc(EDITION.certaintyLegend)}</span>
      <span>${esc(EDITION.editionStamp)}</span>
    </div>
  </footer>
</main>
</body>
</html>`;

  return { html, stats, minPairDist };
}

async function main() {
  const distDir = resolve(REPO_ROOT, 'dist');
  mkdirSync(distDir, { recursive: true });

  const { html, stats, minPairDist } = buildHtml();
  const htmlPath = resolve(distDir, 'broadsheet.html');
  const rawPngPath = resolve(distDir, 'entry-raw.png');
  const outPngPath = resolve(REPO_ROOT, 'entry.png');
  const thumb300Path = resolve(distDir, 'entry-300px.png');

  writeFileSync(htmlPath, html, 'utf8');
  console.log('Validated edition:', stats, '| SVG min pin distance:', minPairDist);

  const { audit, rawBytes, outBytes } = await renderBroadsheet({
    htmlPath,
    rawPngPath,
    outPngPath,
    thumb300Path
  });

  console.log(`Rendered entry.png: raw=${rawBytes} B -> optimized=${outBytes} B (${(outBytes / 1024).toFixed(1)} KB)`);
  console.log('DOM Audit:', JSON.stringify(audit, null, 2));

  if (audit.issues.length > 0) {
    console.error(`DOM AUDIT FAILED (${audit.issues.length} issues)`);
    process.exit(1);
  } else {
    console.log('DOM AUDIT PASSED: 0 issues!');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
