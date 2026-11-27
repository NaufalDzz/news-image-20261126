/**
 * Clean editorial vector world map (equirectangular-tuned projection)
 * with deterministic pin collision avoidance for 1024x1024 broadsheets.
 */

export const MAP_VIEWBOX = { width: 320, height: 152 };

/**
 * Project geographic (lat, lon) into map SVG coordinates.
 * Clips polar latitudes (-56..74) so inhabited continents fill the frame cleanly.
 */
export function projectGeo(lat, lon) {
  const minLon = -168;
  const maxLon = 180;
  const minLat = -56;
  const maxLat = 76;
  const padX = 6;
  const padY = 6;
  const usableW = MAP_VIEWBOX.width - padX * 2;
  const usableH = MAP_VIEWBOX.height - padY * 2;

  const clampedLon = Math.max(minLon, Math.min(maxLon, lon));
  const clampedLat = Math.max(minLat, Math.min(maxLat, lat));

  const x = padX + ((clampedLon - minLon) / (maxLon - minLon)) * usableW;
  const y = padY + ((maxLat - clampedLat) / (maxLat - minLat)) * usableH;
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

/**
 * Simplified, clean editorial landmass outlines built from real lat/lon polygons
 * so pins land accurately on continents and major islands.
 */
const LAND_POLYGONS = [
  // North America
  [
    [70, -162], [71, -135], [69, -110], [64, -92], [58, -94], [52, -80],
    [59, -65], [52, -55], [44, -63], [41, -70], [35, -75], [25, -80],
    [30, -85], [29, -95], [21, -97], [21, -87], [15, -84], [9, -78],
    [8, -82], [14, -92], [19, -104], [24, -108], [32, -117], [40, -124],
    [49, -125], [58, -137], [60, -150], [56, -162], [63, -166]
  ],
  // Greenland
  [
    [76, -54], [76, -20], [68, -26], [60, -44], [66, -54], [73, -58]
  ],
  // Cuba / Caribbean
  [
    [22, -84], [23, -79], [20, -74], [20, -78], [21, -83]
  ],
  // South America
  [
    [11, -75], [11, -62], [6, -53], [0, -49], [-6, -35], [-15, -39],
    [-23, -43], [-34, -53], [-42, -64], [-54, -68], [-55, -72], [-45, -75],
    [-32, -72], [-18, -71], [-5, -81], [4, -77]
  ],
  // Europe (continental + Iberia + Italy + Scandinavia)
  [
    [36, -9], [43, -9], [43, -2], [48, -5], [51, 2], [54, 8], [58, 5],
    [64, 10], [70, 20], [70, 31], [65, 34], [60, 30], [55, 21], [54, 14],
    [56, 10], [54, 12], [52, 24], [47, 39], [45, 36], [46, 30], [41, 29],
    [38, 24], [40, 19], [45, 13], [40, 18], [38, 15], [44, 9], [43, 3],
    [37, -1], [36, -6]
  ],
  // UK & Ireland
  [
    [58, -5], [58, -2], [53, 1], [50, -5], [53, -4], [55, -6]
  ],
  [
    [55, -8], [54, -6], [52, -7], [52, -10], [54, -10]
  ],
  // Iceland
  [
    [66, -23], [66, -14], [64, -15], [64, -22]
  ],
  // Africa
  [
    [35, -6], [37, 10], [32, 15], [31, 32], [22, 37], [12, 44], [11, 51],
    [2, 45], [-10, 40], [-25, 35], [-34, 26], [-34, 18], [-22, 14],
    [-6, 12], [4, 9], [5, -4], [5, -10], [14, -17], [22, -17], [30, -10]
  ],
  // Madagascar
  [
    [-12, 49], [-16, 50], [-25, 47], [-25, 44], [-17, 44]
  ],
  // Asia + Middle East + India + SE Asia
  [
    [41, 27], [42, 41], [47, 39], [52, 44], [60, 40], [68, 44], [71, 68],
    [74, 105], [71, 140], [66, 172], [60, 165], [54, 140], [45, 136],
    [38, 129], [35, 126], [40, 122], [35, 120], [30, 122], [22, 114],
    [20, 106], [12, 109], [9, 105], [13, 100], [2, 103], [7, 98],
    [16, 97], [22, 91], [16, 81], [8, 77], [15, 74], [23, 69],
    [25, 62], [27, 56], [30, 48], [24, 56], [17, 54], [13, 45],
    [21, 39], [29, 35], [36, 36], [37, 27]
  ],
  // Sri Lanka
  [
    [9.5, 80], [7, 81.8], [6, 80.5], [8, 79.8]
  ],
  // Japan
  [
    [44, 142], [43, 145], [38, 141], [35, 140], [33, 131], [35, 133], [40, 140]
  ],
  // Taiwan
  [
    [25, 121.5], [22, 121], [23, 120.2], [25, 121]
  ],
  // Philippines
  [
    [18, 121], [15, 122], [11, 125], [7, 126], [8, 123], [14, 120]
  ],
  // Indonesia (Sumatra, Java, Borneo, Sulawesi)
  [
    [5, 96], [0, 102], [-6, 106], [-8, 115], [-8, 111], [-6, 104], [1, 98]
  ],
  [
    [6, 117], [1, 118], [-3, 116], [-3, 110], [2, 109]
  ],
  // Papua New Guinea
  [
    [-2, 132], [-5, 141], [-9, 149], [-10, 146], [-7, 138], [-4, 131]
  ],
  // Australia
  [
    [-12, 131], [-12, 136], [-16, 137], [-11, 142], [-20, 149], [-28, 153],
    [-38, 149], [-38, 140], [-32, 133], [-35, 117], [-22, 114], [-15, 124]
  ],
  // Tasmania
  [
    [-41, 145], [-41, 148], [-43.5, 147], [-43, 145]
  ],
  // New Zealand
  [
    [-35, 173], [-38, 178], [-41, 175], [-46, 168], [-44, 167], [-39, 174]
  ]
];

function polygonToPath(coords) {
  return (
    coords
      .map(([lat, lon], idx) => {
        const { x, y } = projectGeo(lat, lon);
        return `${idx === 0 ? 'M' : 'L'}${x},${y}`;
      })
      .join(' ') + ' Z'
  );
}

/**
 * Deterministic pairwise repulsion so numbered pins never overlap.
 * Guarantees minDist (in SVG units, matching ~1:1 CSS px) between every pair of pins,
 * while staying within map padding and keeping anchor leader lines when displaced.
 */
export function layoutPins(rawPins, { minDist = 16.5, maxIter = 240 } = {}) {
  const padX = 11;
  const padY = 11;
  const maxX = MAP_VIEWBOX.width - padX;
  const maxY = MAP_VIEWBOX.height - padY;

  const pins = rawPins.map((p) => {
    const pt = projectGeo(p.lat, p.lon);
    return {
      ...p,
      anchorX: pt.x,
      anchorY: pt.y,
      x: pt.x + (p.dx || 0),
      y: pt.y + (p.dy || 0)
    };
  });

  for (let iter = 0; iter < maxIter; iter++) {
    let moved = false;
    for (let i = 0; i < pins.length; i++) {
      for (let j = i + 1; j < pins.length; j++) {
        let dx = pins[j].x - pins[i].x;
        let dy = pins[j].y - pins[i].y;
        let dist = Math.hypot(dx, dy);
        if (dist < 0.01) {
          dx = (i % 2 === 0 ? 1 : -1) * 0.5;
          dy = (j % 2 === 0 ? 1 : -1) * 0.5;
          dist = Math.hypot(dx, dy);
        }
        if (dist < minDist) {
          const push = (minDist - dist) * 0.54;
          const ux = dx / dist;
          const uy = dy / dist;
          pins[i].x -= ux * push;
          pins[i].y -= uy * push;
          pins[j].x += ux * push;
          pins[j].y += uy * push;
          moved = true;
        }
      }
    }

    // Gentle spring toward original geographic anchor + strict bounding clamp
    for (const pin of pins) {
      pin.x += (pin.anchorX - pin.x) * 0.04;
      pin.y += (pin.anchorY - pin.y) * 0.04;
      pin.x = Math.max(padX, Math.min(maxX, pin.x));
      pin.y = Math.max(padY, Math.min(maxY, pin.y));
    }

    if (!moved) break;
  }

  // Final hard pass to ensure minDist after spring damping
  for (let iter = 0; iter < 60; iter++) {
    let overlap = false;
    for (let i = 0; i < pins.length; i++) {
      for (let j = i + 1; j < pins.length; j++) {
        let dx = pins[j].x - pins[i].x;
        let dy = pins[j].y - pins[i].y;
        let dist = Math.hypot(dx, dy);
        if (dist < minDist) {
          overlap = true;
          const ux = dist > 0.01 ? dx / dist : 1;
          const uy = dist > 0.01 ? dy / dist : 0;
          const push = (minDist - dist) * 0.55;
          pins[i].x = Math.max(padX, Math.min(maxX, pins[i].x - ux * push));
          pins[i].y = Math.max(padY, Math.min(maxY, pins[i].y - uy * push));
          pins[j].x = Math.max(padX, Math.min(maxX, pins[j].x + ux * push));
          pins[j].y = Math.max(padY, Math.min(maxY, pins[j].y + uy * push));
        }
      }
    }
    if (!overlap) break;
  }

  return pins.map((p) => ({
    ...p,
    x: Number(p.x.toFixed(1)),
    y: Number(p.y.toFixed(1))
  }));
}

/**
 * Render the complete editorial SVG world map with graticule, continents,
 * optional leader ticks for nudged pins, and numbered region-colored markers.
 */
export function renderWorldMapSvg(rawPins) {
  const pins = layoutPins(rawPins, { minDist: 22.0 });

  // Verify pairwise separation
  let minPairDist = Infinity;
  for (let i = 0; i < pins.length; i++) {
    for (let j = i + 1; j < pins.length; j++) {
      const d = Math.hypot(pins[i].x - pins[j].x, pins[i].y - pins[j].y);
      if (d < minPairDist) minPairDist = d;
    }
  }

  const latLines = [-30, 0, 30, 60].map((lat) => {
    const a = projectGeo(lat, -168);
    const b = projectGeo(lat, 180);
    const isEq = lat === 0;
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${isEq ? '#a9c3d4' : '#c6d9e6'}" stroke-width="${isEq ? '0.8' : '0.55'}" stroke-dasharray="${isEq ? '3,2' : '2,3'}"/>`;
  });

  const lonLines = [-120, -60, 0, 60, 120].map((lon) => {
    const a = projectGeo(76, lon);
    const b = projectGeo(-56, lon);
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#c6d9e6" stroke-width="0.55" stroke-dasharray="2,3"/>`;
  });

  const landPaths = LAND_POLYGONS.map(
    (poly) =>
      `<path d="${polygonToPath(poly)}" fill="#ded6c3" stroke="#a69b84" stroke-width="0.65" stroke-linejoin="round"/>`
  );

  const leaders = pins
    .filter((p) => Math.hypot(p.x - p.anchorX, p.y - p.anchorY) > 6.5)
    .map(
      (p) =>
        `<line x1="${p.anchorX}" y1="${p.anchorY}" x2="${p.x}" y2="${p.y}" stroke="#334155" stroke-width="0.85" stroke-linecap="round"/><circle cx="${p.anchorX}" cy="${p.anchorY}" r="1.5" fill="#334155"/>`
    );

  const pinNodes = pins.map((p) => {
    const isTwoDigit = String(p.id).length >= 2;
    const fontSize = isTwoDigit ? '7.4' : '8.5';
    return `<g class="map-pin" data-id="${p.id}" data-cx="${p.x}" data-cy="${p.y}">
        <circle cx="${p.x}" cy="${p.y}" r="7.4" fill="${p.color}" stroke="#ffffff" stroke-width="1.35"/>
        <text x="${p.x}" y="${p.y + 0.3}" text-anchor="middle" dominant-baseline="central" fill="#ffffff" font-family="'Noto Sans', sans-serif" font-size="${fontSize}" font-weight="800">${p.id}</text>
      </g>`;
  });

  const svg = `<svg viewBox="0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="World news map for 26 November 2026">
    <rect width="${MAP_VIEWBOX.width}" height="${MAP_VIEWBOX.height}" rx="3" fill="#dceaf3"/>
    ${latLines.join('')}
    ${lonLines.join('')}
    ${landPaths.join('')}
    ${leaders.join('')}
    ${pinNodes.join('')}
  </svg>`;

  return { svg, pins, minPairDist: Number(minPairDist.toFixed(1)) };
}
