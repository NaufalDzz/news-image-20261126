/**
 * Zero-dependency headless Chromium CDP renderer & strict automated DOM layout gate.
 * Launches the local Chromium binary, loads the compiled HTML broadsheet at 1024x1024,
 * asserts zero clipping/overflow/overlap on every card, headline, deck, brief, container,
 * and footer boundary, captures PNG, and optimizes PNG filesize to 180-320 KB.
 */

import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';

const CANDIDATE_CHROMIUM_PATHS = [
  process.env.CHROMIUM_PATH,
  '/var/lib/openbot/.cache/ms-playwright/chromium-1255/chrome-linux-arm64/chrome',
  '/var/lib/openbot/.cache/ms-playwright/chromium-1255/chrome-linux/chrome',
  '/usr/bin/chromium',
  '/usr/bin/google-chrome'
].filter(Boolean);

export function findChromium() {
  for (const candidate of CANDIDATE_CHROMIUM_PATHS) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(`No Chromium binary found. Checked: ${CANDIDATE_CHROMIUM_PATHS.join(', ')}`);
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.ready = new Promise((resolveReady, rejectReady) => {
      this.ws.addEventListener('open', resolveReady, { once: true });
      this.ws.addEventListener('error', rejectReady, { once: true });
    });
    this.ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(String(evt.data));
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve: res, reject: rej } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) rej(new Error(`CDP error ${msg.error.code}: ${msg.error.message}`));
        else res(msg.result);
      }
    });
  }

  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId++;
    return new Promise((res, rej) => {
      this.pending.set(id, { resolve: res, reject: rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    try {
      this.ws.close();
    } catch {
      // ignore
    }
  }
}

async function waitForDevToolsWs(port, timeoutMs = 12000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const targets = await res.json();
        const page = targets.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
        if (page) return page.webSocketDebuggerUrl;
      }
    } catch {
      // still booting
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error('Timed out waiting for Chromium DevTools endpoint');
}

const DOM_AUDIT_EXPR = `(() => {
  const issues = [];
  const root = document.querySelector('#broadsheet');
  const rootRect = root.getBoundingClientRect();
  if (Math.ceil(root.scrollHeight) > 1024 || Math.ceil(rootRect.height) > 1024) {
    issues.push('ROOT_HEIGHT_OVERFLOW: scrollHeight=' + root.scrollHeight + ', rect=' + rootRect.height);
  }
  if (Math.ceil(root.scrollWidth) > 1024 || Math.ceil(rootRect.width) > 1024) {
    issues.push('ROOT_WIDTH_OVERFLOW: scrollWidth=' + root.scrollWidth + ', rect=' + rootRect.width);
  }

  // Strict scrollHeight <= clientHeight & scrollWidth <= clientWidth gate on EVERY card,
  // headline, deck, brief, timeline item, ribbon, footer, and container (UNCONDITIONALLY,
  // never skipping overflow:visible containers!).
  const strictSelectors = [
    '#broadsheet', '.top-rule', '.masthead', '.masthead-title', '.masthead-deck',
    '.region-bar', '.region-pill',
    '.leads-grid', '.sec-grid', '.card', '.card-body', '.card-eyebrow', '.card-headline', '.card-deck', '.card-meta',
    '.numbers-ribbon', '.stat-cell', '.stat-num', '.stat-label',
    '.lower-grid', '.left-pane', '.right-pane', '.timeline-list', '.timeline-item',
    '.briefs-cols', '.brief-col', '.brief-item', '.brief-copy',
    '.footer-box', '.date-check-text', '.legend-line'
  ];

  for (const sel of strictSelectors) {
    for (const el of document.querySelectorAll(sel)) {
      const r = el.getBoundingClientRect();
      const label = (el.getAttribute('data-num') ? '#' + el.getAttribute('data-num') + ' ' : '') +
        el.textContent.replace(/\\s+/g, ' ').trim().slice(0, 42);
      if (el.scrollHeight > el.clientHeight + 1) {
        issues.push('OVERFLOW_Y ' + sel + ' (' + label + '): sh=' + el.scrollHeight + ' ch=' + el.clientHeight);
      }
      if (el.scrollWidth > el.clientWidth + 1) {
        issues.push('OVERFLOW_X ' + sel + ' (' + label + '): sw=' + el.scrollWidth + ' cw=' + el.clientWidth);
      }
      if (r.right > 1024.5 || r.bottom > 1024.5 || r.left < -0.5 || r.top < -0.5) {
        issues.push('OUT_OF_BOUNDS ' + sel + ' (' + label + '): ' + JSON.stringify({
          l: Math.round(r.left), t: Math.round(r.top), r: Math.round(r.right), b: Math.round(r.bottom)
        }));
      }
    }
  }

  // Verify every card's children (headline, deck, wire source meta) sit fully inside the card bounds
  for (const card of document.querySelectorAll('.card')) {
    const cr = card.getBoundingClientRect();
    const num = card.getAttribute('data-num') || '?';
    for (const childSel of ['.card-eyebrow', '.card-headline', '.card-deck', '.card-meta']) {
      const child = card.querySelector(childSel);
      if (!child) {
        issues.push('MISSING_CHILD card #' + num + ' ' + childSel);
        continue;
      }
      const r = child.getBoundingClientRect();
      if (r.bottom > cr.bottom - 0.5) {
        issues.push('CARD_CHILD_CLIP_Y card #' + num + ' ' + childSel + ': childBottom=' + r.bottom.toFixed(1) + ' cardBottom=' + cr.bottom.toFixed(1));
      }
      if (r.right > cr.right + 0.5) {
        issues.push('CARD_CHILD_CLIP_X card #' + num + ' ' + childSel + ': childRight=' + r.right.toFixed(1) + ' cardRight=' + cr.right.toFixed(1));
      }
    }
  }

  // Verify ZERO overlap between lower-grid / briefs / timeline and DATE CHECK footer
  const footer = document.querySelector('.footer-box');
  const footerRect = footer.getBoundingClientRect();
  const lowerGrid = document.querySelector('.lower-grid');
  const lowerRect = lowerGrid.getBoundingClientRect();

  if (lowerRect.bottom > footerRect.top - 1) {
    issues.push('FOOTER_OVERLAP .lower-grid: lowerBottom=' + lowerRect.bottom.toFixed(1) + ' footerTop=' + footerRect.top.toFixed(1));
  }

  let maxBriefBottom = 0;
  let briefCount = 0;
  for (const brief of document.querySelectorAll('.brief-item')) {
    briefCount++;
    const br = brief.getBoundingClientRect();
    if (br.bottom > maxBriefBottom) maxBriefBottom = br.bottom;
    if (br.bottom > footerRect.top - 2) {
      issues.push('BRIEF_FOOTER_OVERLAP #' + brief.getAttribute('data-num') + ': bottom=' + br.bottom.toFixed(1) + ' footerTop=' + footerRect.top.toFixed(1));
    }
    if (br.bottom > lowerRect.bottom + 0.5) {
      issues.push('BRIEF_CLIPPED_IN_LOWER #' + brief.getAttribute('data-num') + ': bottom=' + br.bottom.toFixed(1) + ' lowerBottom=' + lowerRect.bottom.toFixed(1));
    }
  }
  if (briefCount !== 27) {
    issues.push('BRIEF_COUNT_MISMATCH: expected 27, found ' + briefCount);
  }

  let maxTimelineBottom = 0;
  for (const tl of document.querySelectorAll('.timeline-item')) {
    const tr = tl.getBoundingClientRect();
    if (tr.bottom > maxTimelineBottom) maxTimelineBottom = tr.bottom;
    if (tr.bottom > footerRect.top - 2) {
      issues.push('TIMELINE_FOOTER_OVERLAP (' + tl.textContent.trim().slice(0, 30) + '): bottom=' + tr.bottom.toFixed(1) + ' footerTop=' + footerRect.top.toFixed(1));
    }
  }

  // Check map pin spacing in rendered CSS px (strict >= 15.0px)
  const pinEls = [...document.querySelectorAll('.map-pin circle')];
  const pinCenters = pinEls.map((c) => {
    const r = c.getBoundingClientRect();
    return {
      id: c.parentElement.getAttribute('data-id'),
      x: r.left + r.width / 2,
      y: r.top + r.height / 2
    };
  });
  let minPinPx = 999;
  for (let i = 0; i < pinCenters.length; i++) {
    for (let j = i + 1; j < pinCenters.length; j++) {
      const d = Math.hypot(pinCenters[i].x - pinCenters[j].x, pinCenters[i].y - pinCenters[j].y);
      if (d < minPinPx) minPinPx = d;
      if (d < 15.0) {
        issues.push('PIN_SPACING_FAIL: #' + pinCenters[i].id + ' & #' + pinCenters[j].id + ' dist=' + d.toFixed(1) + 'px (< 15px)');
      }
    }
  }

  // Measure computed typography floors
  const minFont = (sel) => {
    const vals = [...document.querySelectorAll(sel)].map((e) => parseFloat(getComputedStyle(e).fontSize));
    return vals.length ? Math.min(...vals) : null;
  };
  const dcFont = minFont('.date-check-text');
  if (dcFont < 9.5) {
    issues.push('DATE_CHECK_FONT_TOO_SMALL: ' + dcFont + 'px (< 9.5px)');
  }

  return {
    rootHeight: Math.round(rootRect.height),
    rootScrollHeight: Math.round(root.scrollHeight),
    footerTop: Number(footerRect.top.toFixed(1)),
    footerBottom: Number(footerRect.bottom.toFixed(1)),
    lowerBottom: Number(lowerRect.bottom.toFixed(1)),
    maxBriefBottom: Number(maxBriefBottom.toFixed(1)),
    maxTimelineBottom: Number(maxTimelineBottom.toFixed(1)),
    briefFooterGapPx: Number((footerRect.top - maxBriefBottom).toFixed(1)),
    briefCount,
    pinCount: pinCenters.length,
    minPinDistancePx: Number(minPinPx.toFixed(1)),
    fonts: {
      masthead: minFont('.masthead-title'),
      leadHeadline: minFont('.lead-card .card-headline'),
      secHeadline: minFont('.sec-card .card-headline'),
      statNum: minFont('.stat-num'),
      brief: minFont('.brief-item'),
      dateCheck: dcFont
    },
    issues
  };
})()`;

/**
 * Render an HTML file to a 1024x1024 optimized PNG and return DOM audit metrics.
 */
export async function renderBroadsheet({ htmlPath, rawPngPath, outPngPath, thumb300Path }) {
  const chromePath = findChromium();
  const port = 9222 + Math.floor(Math.random() * 500);
  const absHtml = resolve(htmlPath);
  mkdirSync(dirname(resolve(rawPngPath)), { recursive: true });
  mkdirSync(dirname(resolve(outPngPath)), { recursive: true });

  const child = spawn(
    chromePath,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-background-networking',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1024,1024',
      `--remote-debugging-port=${port}`,
      'about:blank'
    ],
    { stdio: 'ignore' }
  );

  let client;
  try {
    const wsUrl = await waitForDevToolsWs(port);
    client = new CDPClient(wsUrl);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1024,
      height: 1024,
      deviceScaleFactor: 1,
      mobile: false
    });

    await client.send('Page.navigate', { url: pathToFileURL(absHtml).href });
    await new Promise((r) => setTimeout(r, 650));
    await client.send('Runtime.evaluate', {
      expression: 'document.fonts.ready.then(() => true)',
      awaitPromise: true
    });
    await new Promise((r) => setTimeout(r, 150));

    const auditEval = await client.send('Runtime.evaluate', {
      expression: DOM_AUDIT_EXPR,
      returnByValue: true
    });
    const audit = auditEval.result?.value;

    const shot = await client.send('Page.captureScreenshot', {
      format: 'png',
      fromSurface: true,
      clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 }
    });
    writeFileSync(rawPngPath, Buffer.from(shot.data, 'base64'));

    // Optimize PNG cleanly via Python PIL.
    // 256-color median-cut palette with zero dithering yields razor-sharp typography & vector art
    // right in the lean competition sweet spot (~180-300 KB).
    const pyScript = `
import os, sys
from PIL import Image

raw_path, out_path, thumb_path = sys.argv[1], sys.argv[2], sys.argv[3]
img = Image.open(raw_path).convert("RGB")
assert img.size == (1024, 1024), f"Unexpected size {img.size}"

# Median-cut 256 colors gives ultra-clean anti-aliased serif edges and crisp editorial colors
q = img.quantize(colors=256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
q.save(out_path, format="PNG", optimize=True, compress_level=9)

if thumb_path:
    t = img.resize((300, 300), Image.Resampling.LANCZOS)
    t.save(thumb_path, format="PNG", optimize=True)
`;
    execFileSync('python3', ['-c', pyScript, rawPngPath, outPngPath, thumb300Path || ''], {
      stdio: 'inherit'
    });

    const rawBytes = statSync(rawPngPath).size;
    const outBytes = statSync(outPngPath).size;
    return { audit, rawBytes, outBytes };
  } finally {
    if (client) client.close();
    child.kill('SIGKILL');
  }
}
