/**
 * Bespoke high-contrast print-editorial vector illustration suite for Thursday 26 November 2026.
 * Engineered for unmistakable 300px thumbnail punch & editorial craft:
 * saturated print-duotone/mid-tone backdrops, bold ink outlines, one iconic focal symbol per card.
 */

function starPolygon(cx, cy, rOuter, rInner) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

function euStarsRing(cx, cy, radius, starR) {
  let out = '';
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12 - Math.PI / 2;
    const sx = cx + radius * Math.cos(a);
    const sy = cy + radius * Math.sin(a);
    out += `<polygon points="${starPolygon(sx, sy, starR, starR * 0.44)}" fill="#facc15"/>`;
  }
  return out;
}

export const LEAD_ART = {
  /**
   * #1 Brussels: Rich EU royal-blue backdrop, 12 luminous gold stars, bold tilted gold scales, crisp €1.6tn / €45bn & DEADLOCK badges
   */
  eu_summit: () => `<svg viewBox="0 0 326 98" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="euBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#173a70"/>
        <stop offset="100%" stop-color="#224f91"/>
      </linearGradient>
    </defs>
    <rect width="326" height="98" fill="url(#euBg)"/>
    <!-- Subtle architectural hemicycle rings -->
    <path d="M16,98 A147,80 0 0,1 310,98" fill="none" stroke="#3163a8" stroke-width="8" opacity="0.55"/>
    <path d="M56,98 A107,58 0 0,1 270,98" fill="none" stroke="#3a71bd" stroke-width="5" opacity="0.45"/>
    <!-- 12-star EU medallion -->
    <circle cx="163" cy="36" r="27" fill="#102a52" stroke="#facc15" stroke-width="1.4" opacity="0.92"/>
    ${euStarsRing(163, 36, 19.5, 3.6)}
    <text x="163" y="40.5" text-anchor="middle" fill="#ffffff" font-family="'Noto Sans', sans-serif" font-size="11.5" font-weight="800">EU 27</text>
    <!-- Bold tilted golden balance beam -->
    <rect x="158.5" y="54" width="9" height="24" rx="1.5" fill="#facc15" stroke="#0f172a" stroke-width="1.2"/>
    <line x1="66" y1="62" x2="260" y2="44" stroke="#facc15" stroke-width="4.2" stroke-linecap="round"/>
    <circle cx="163" cy="53" r="5" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
    <!-- Left pan: €1.6tn Budget -->
    <line x1="66" y1="62" x2="50" y2="81" stroke="#e2e8f0" stroke-width="1.6"/>
    <line x1="66" y1="62" x2="82" y2="81" stroke="#e2e8f0" stroke-width="1.6"/>
    <path d="M36,81 Q66,94 96,81 Z" fill="#facc15" stroke="#0f172a" stroke-width="1.4"/>
    <rect x="20" y="10" width="84" height="27" rx="4" fill="#ffffff" stroke="#0f294a" stroke-width="1.8"/>
    <text x="62" y="29" text-anchor="middle" fill="#163b6e" font-family="'Noto Sans', sans-serif" font-size="16" font-weight="800">€1.6tn</text>
    <text x="62" y="49" text-anchor="middle" fill="#e2e8f0" font-family="'Noto Sans', sans-serif" font-size="8.4" font-weight="800">2028–34 BUDGET</text>
    <!-- Right pan: €45bn Ukraine Loan -->
    <line x1="260" y1="44" x2="244" y2="64" stroke="#e2e8f0" stroke-width="1.6"/>
    <line x1="260" y1="44" x2="276" y2="64" stroke="#e2e8f0" stroke-width="1.6"/>
    <path d="M230,64 Q260,77 290,64 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.4"/>
    <rect x="222" y="8" width="84" height="27" rx="4" fill="#ffffff" stroke="#b91c1c" stroke-width="2"/>
    <text x="264" y="27" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="16" font-weight="800">€45bn</text>
    <text x="264" y="89" text-anchor="middle" fill="#fde68a" font-family="'Noto Sans', sans-serif" font-size="8.4" font-weight="800">UKRAINE LOAN</text>
    <!-- Crisp DEADLOCK plinth -->
    <rect x="110" y="77" width="106" height="17" rx="3" fill="#dc2626" stroke="#ffffff" stroke-width="1.1"/>
    <text x="163" y="88.8" text-anchor="middle" fill="#ffffff" font-family="'Noto Sans', sans-serif" font-size="8.8" font-weight="800">DEADLOCK → DEC 17</text>
  </svg>`,

  /**
   * #2 Riyadh: Saturated Arabian twilight-indigo to warm amber desert dusk, bold Kingdom Centre arch, glowing interceptor arcs & starbursts
   */
  riyadh_missiles: () => `<svg viewBox="0 0 326 98" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="riyadhDusk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3150"/>
        <stop offset="58%" stop-color="#8c4a27"/>
        <stop offset="100%" stop-color="#e59a3c"/>
      </linearGradient>
    </defs>
    <rect width="326" height="98" fill="url(#riyadhDusk)"/>
    <!-- Subtle radar arcs -->
    <circle cx="163" cy="96" r="84" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="4,4" opacity="0.45"/>
    <circle cx="163" cy="96" r="54" fill="none" stroke="#fde68a" stroke-width="1" stroke-dasharray="3,3" opacity="0.45"/>
    <!-- Bold dark-navy Riyadh skyline -->
    <rect x="12" y="74" width="26" height="24" fill="#1e293b"/>
    <rect x="42" y="63" width="22" height="35" fill="#273549"/>
    <rect x="70" y="70" width="22" height="28" fill="#1e293b"/>
    <!-- Al Faisaliah pyramid spire -->
    <polygon points="100,98 112,42 124,98" fill="#162032" stroke="#f59e0b" stroke-width="0.9"/>
    <circle cx="112" cy="56" r="4.2" fill="#fde68a"/>
    <!-- Iconic Kingdom Centre tower with bright glowing inverted arch -->
    <path d="M144,98 L150,24 L158,24 L159,40 Q163,48 167,40 L168,24 L176,24 L182,98 Z" fill="#0f172a" stroke="#f59e0b" stroke-width="1.1"/>
    <rect x="155" y="22" width="16" height="3" fill="#fde047"/>
    <!-- Eastern buildings -->
    <rect x="194" y="65" width="26" height="33" fill="#273549"/>
    <rect x="226" y="73" width="28" height="25" fill="#1e293b"/>
    <rect x="260" y="59" width="24" height="39" fill="#162032"/>
    <rect x="290" y="76" width="26" height="22" fill="#273549"/>
    <!-- Incoming Houthi missile tracks (bright crimson-coral) -->
    <path d="M12,24 Q60,10 110,25" fill="none" stroke="#f87171" stroke-width="3" stroke-dasharray="6,3"/>
    <path d="M18,46 Q86,31 196,25" fill="none" stroke="#f87171" stroke-width="2.8" stroke-dasharray="6,3"/>
    <!-- Saudi air-defence glowing cyan interceptor arcs -->
    <path d="M86,93 Q94,52 112,25" fill="none" stroke="#38bdf8" stroke-width="3.2"/>
    <path d="M232,93 Q220,51 198,25" fill="none" stroke="#38bdf8" stroke-width="3.2"/>
    <!-- Bright fiery interception starbursts -->
    <g transform="translate(112,25)">
      <polygon points="${starPolygon(0, 0, 14.5, 6)}" fill="#facc15" stroke="#dc2626" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="4.5" fill="#ffffff"/>
    </g>
    <g transform="translate(198,25)">
      <polygon points="${starPolygon(0, 0, 13.5, 5.5)}" fill="#facc15" stroke="#dc2626" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="4" fill="#ffffff"/>
    </g>
    <!-- High-contrast callout pill -->
    <rect x="220" y="8" width="96" height="22" rx="4" fill="#ffffff" stroke="#b45309" stroke-width="1.8"/>
    <text x="268" y="22.8" text-anchor="middle" fill="#92400e" font-family="'Noto Sans', sans-serif" font-size="10.4" font-weight="800">2 INTERCEPTED</text>
  </svg>`,

  /**
   * #3 New York: Dramatic storm-slate sky, bold diagonal rain/wind streaks, Manhattan skyline, GIANT grounded Macy's 100th star balloon
   */
  nyc_noreaster: () => `<svg viewBox="0 0 326 98" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="nycStorm" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2b4563"/>
        <stop offset="100%" stop-color="#587b9c"/>
      </linearGradient>
    </defs>
    <rect width="326" height="98" fill="url(#nycStorm)"/>
    <!-- Heavy storm clouds -->
    <path d="M12,24 Q30,4 60,14 Q84,2 116,15 Q140,10 156,24 Z" fill="#1e293b" opacity="0.72"/>
    <path d="M174,20 Q196,4 226,12 Q252,2 284,14 Q304,10 316,22 Z" fill="#1e293b" opacity="0.68"/>
    <!-- Bold diagonal 65 mph wind & rain gusts -->
    <g stroke="#e0f2fe" stroke-width="1.8" stroke-linecap="round" opacity="0.75">
      <line x1="28" y1="22" x2="10" y2="54"/><line x1="62" y1="20" x2="44" y2="52"/>
      <line x1="100" y1="24" x2="82" y2="56"/><line x1="142" y1="20" x2="124" y2="52"/>
      <line x1="184" y1="22" x2="166" y2="54"/><line x1="296" y1="24" x2="278" y2="56"/>
    </g>
    <!-- Crisp Manhattan skyline + Empire State -->
    <rect x="8" y="54" width="22" height="44" fill="#1e293b"/>
    <rect x="34" y="42" width="20" height="56" fill="#0f172a"/>
    <path d="M60,98 L60,48 L66,48 L66,32 L72,32 L72,22 L75,10 L78,22 L78,32 L84,32 L84,48 L90,48 L90,98 Z" fill="#0f172a" stroke="#94a3b8" stroke-width="0.7"/>
    <rect x="96" y="52" width="24" height="46" fill="#1e293b"/>
    <rect x="125" y="60" width="26" height="38" fill="#334155"/>
    <!-- Lit skyscraper windows -->
    <g fill="#fde68a" opacity="0.85">
      <rect x="39" y="50" width="3" height="4"/><rect x="46" y="50" width="3" height="4"/>
      <rect x="39" y="60" width="3" height="4"/><rect x="46" y="60" width="3" height="4"/>
      <rect x="68" y="54" width="3" height="4"/><rect x="78" y="54" width="3" height="4"/>
      <rect x="68" y="64" width="3" height="4"/><rect x="78" y="64" width="3" height="4"/>
    </g>
    <!-- Empty rain-slicked 6th Avenue roadway -->
    <rect x="0" y="84" width="326" height="14" fill="#0f172a"/>
    <line x1="14" y1="91" x2="166" y2="91" stroke="#facc15" stroke-width="2.2" stroke-dasharray="14,10"/>
    <!-- GIANT unmistakable tilted Macy's 100th star balloon buffeted by wind -->
    <g transform="translate(226,56) rotate(-14)">
      <ellipse cx="0" cy="4" rx="54" ry="24" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
      <ellipse cx="-8" cy="-4" rx="28" ry="8" fill="#ef4444" opacity="0.7"/>
      <polygon points="${starPolygon(0, 4, 15.5, 6.8)}" fill="#facc15" stroke="#7f1d1d" stroke-width="1"/>
      <text x="0" y="7.5" text-anchor="middle" fill="#7f1d1d" font-family="'Noto Sans', sans-serif" font-size="8.2" font-weight="900">100</text>
      <!-- Tethered guy ropes straining to street -->
      <line x1="-38" y1="16" x2="-58" y2="34" stroke="#f8fafc" stroke-width="1.8"/>
      <line x1="36" y1="18" x2="54" y2="38" stroke="#f8fafc" stroke-width="1.8"/>
    </g>
    <!-- Crisp wind / reschedule badge -->
    <rect x="176" y="7" width="140" height="22" rx="4" fill="#ffffff" stroke="#b91c1c" stroke-width="1.8"/>
    <text x="246" y="21.8" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="11" font-weight="800">65 MPH · 100th → SAT</text>
  </svg>`
};

export const SECONDARY_ART = {
  /** #4 Seoul: Saturated teal-slate panel + stepped rate hike bars + bold 3.25% badge */
  bok_rate: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#0f5c6e"/>
    <line x1="10" y1="39" x2="110" y2="39" stroke="#bae6fd" stroke-width="1.4"/>
    <rect x="14" y="29" width="14" height="10" rx="1" fill="#7dd3fc"/>
    <rect x="33" y="24" width="14" height="15" rx="1" fill="#38bdf8"/>
    <rect x="52" y="19" width="14" height="20" rx="1" fill="#0ea5e9"/>
    <rect x="71" y="13" width="14" height="26" rx="1" fill="#facc15"/>
    <rect x="90" y="6" width="16" height="33" rx="1.5" fill="#ef4444" stroke="#ffffff" stroke-width="1"/>
    <path d="M18,23 L58,14 L96,5" fill="none" stroke="#ffffff" stroke-width="2"/>
    <polygon points="98,5 89,5 94,11" fill="#ffffff"/>
    <rect x="116" y="6" width="70" height="34" rx="4" fill="#ffffff"/>
    <text x="151" y="24" text-anchor="middle" fill="#0f4c5c" font-family="'Noto Sans', sans-serif" font-size="17" font-weight="800">3.25%</text>
    <text x="151" y="36" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="9.5" font-weight="800">+25 BPS</text>
  </svg>`,

  /** #5 London: Saturated slate-navy backdrop, crisp Big Ben, bright crimson plunge line & bold 77,000 card */
  uk_migration: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#23476d"/>
    <!-- Big Ben silhouette -->
    <g fill="#0f172a" stroke="#93c5fd" stroke-width="0.7">
      <rect x="11" y="14" width="16" height="32"/>
      <polygon points="10,14 19,2 28,14"/>
      <circle cx="19" cy="23" r="4.8" fill="#fef08a" stroke="none"/>
    </g>
    <line x1="19" y1="23" x2="19" y2="19.5" stroke="#0f172a" stroke-width="1.3"/>
    <line x1="19" y1="23" x2="22" y2="23" stroke="#0f172a" stroke-width="1.3"/>
    <!-- Plunging area curve -->
    <path d="M36,10 L66,14 L94,25 L126,35 L178,40 L178,44 L36,44 Z" fill="#60a5fa" opacity="0.32"/>
    <polyline points="36,10 66,14 94,25 126,35 178,40" fill="none" stroke="#fde047" stroke-width="3" stroke-linecap="round"/>
    <circle cx="178" cy="40" r="4" fill="#ef4444" stroke="#ffffff" stroke-width="1.2"/>
    <rect x="110" y="5" width="76" height="27" rx="4" fill="#ffffff"/>
    <text x="148" y="19.5" text-anchor="middle" fill="#1d4e7a" font-family="'Noto Sans', sans-serif" font-size="14.5" font-weight="800">77,000</text>
    <text x="148" y="29.5" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="8.8" font-weight="800">−62% YoY</text>
  </svg>`,

  /** #6 Singapore / SE Asia: Deep emerald tech backdrop, glowing AI server rack, giant crimson-white PAUSE emblem */
  nvidia_halt: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#0f574f"/>
    <!-- Bright circuit traces -->
    <path d="M6,13 L42,13 M6,23 L36,23 M6,33 L42,33 M150,13 L188,13 M156,23 L188,23 M150,33 L188,33" stroke="#5eead4" stroke-width="1.8" opacity="0.72"/>
    <!-- Server rack -->
    <rect x="42" y="5" width="52" height="36" rx="3" fill="#0f172a" stroke="#5eead4" stroke-width="1.2"/>
    <rect x="47" y="10" width="42" height="6" rx="1" fill="#14b8a6"/>
    <rect x="47" y="20" width="42" height="6" rx="1" fill="#14b8a6"/>
    <rect x="47" y="30" width="42" height="6" rx="1" fill="#334155"/>
    <circle cx="83" cy="13" r="1.7" fill="#fef08a"/><circle cx="83" cy="23" r="1.7" fill="#fef08a"/>
    <text x="68" y="35.2" text-anchor="middle" fill="#e2e8f0" font-family="'Noto Sans', sans-serif" font-size="6.8" font-weight="800">AI SERVERS</text>
    <!-- Giant unmistakable crimson PAUSE emblem -->
    <circle cx="132" cy="23" r="17" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
    <rect x="124.2" y="14.5" width="5.5" height="17" rx="1.2" fill="#ffffff"/>
    <rect x="134.3" y="14.5" width="5.5" height="17" rx="1.2" fill="#ffffff"/>
  </svg>`,

  /** #7 Bangkok: Rich amber dusk sky, dark refinery towers, vivid blaze & crisp 9 INJURED callout */
  bangkok_refinery: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#e8ba7d"/>
    <!-- Rising charcoal smoke plume -->
    <circle cx="88" cy="14" r="10.5" fill="#475569" opacity="0.88"/>
    <circle cx="105" cy="10" r="12" fill="#334155" opacity="0.85"/>
    <!-- Bold refinery silhouettes -->
    <rect x="12" y="17" width="13" height="25" fill="#1e293b"/>
    <rect x="30" y="10" width="15" height="32" fill="#0f172a"/>
    <rect x="52" y="22" width="24" height="20" rx="3" fill="#334155"/>
    <rect x="6" y="41" width="182" height="5" fill="#0f172a"/>
    <!-- Vibrant flame burst -->
    <path d="M72,41 Q65,24 83,13 Q86,24 95,10 Q106,24 98,41 Z" fill="#dc2626"/>
    <path d="M78,41 Q75,29 86,20 Q94,30 92,41 Z" fill="#facc15"/>
    <!-- High-contrast status callout pill -->
    <rect x="114" y="6" width="72" height="31" rx="4" fill="#ffffff" stroke="#9a3412" stroke-width="1.6"/>
    <text x="150" y="20.5" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="12.5" font-weight="800">9 INJURED</text>
    <text x="150" y="32" text-anchor="middle" fill="#1e293b" font-family="'Noto Sans', sans-serif" font-size="8.2" font-weight="800">UNIT HALTED</text>
  </svg>`,

  /** #7 Gaza: Saturated warm terracotta editorial backdrop + architectural silhouette + 9+ DEAD badge */
  gaza_strike: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#d4a36a"/>
    <!-- Charcoal smoke column -->
    <path d="M84,20 Q90,10 100,8 Q110,6 116,2" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
    <!-- High-contrast ochre & charcoal blocks -->
    <rect x="10" y="19" width="26" height="23" fill="#7c5936" stroke="#3f2d1b" stroke-width="1.3"/>
    <rect x="40" y="11" width="32" height="31" fill="#5e4328" stroke="#2c1f12" stroke-width="1.4"/>
    <path d="M77,42 L77,22 L89,25 L98,16 L108,20 L108,42 Z" fill="#1f2937" stroke="#0f172a" stroke-width="1.4"/>
    <g fill="#f5e6cf">
      <rect x="46" y="17" width="5" height="5"/><rect x="58" y="17" width="5" height="5"/>
      <rect x="46" y="26" width="5" height="5"/><rect x="58" y="26" width="5" height="5"/>
    </g>
    <rect x="4" y="41" width="186" height="5" fill="#2c1f12"/>
    <rect x="114" y="6" width="72" height="31" rx="4" fill="#ffffff" stroke="#7f1d1d" stroke-width="1.6"/>
    <text x="150" y="20.5" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="800">9+ DEAD</text>
    <text x="150" y="32" text-anchor="middle" fill="#1e293b" font-family="'Noto Sans', sans-serif" font-size="8.2" font-weight="800">DEIR AL-BALAH</text>
  </svg>`,

  /** #9 Kyiv / Kharkiv: Bold Ukrainian cobalt sky + gold horizon, dark skyline, bright emergency cross */
  ukraine_strikes: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="27" fill="#1d4e89"/>
    <rect y="27" width="194" height="19" fill="#eab308"/>
    <!-- Alert radar sweep -->
    <polygon points="28,44 108,5 142,16" fill="#fef08a" opacity="0.3"/>
    <!-- Bold dark Ukrainian skyline + dome -->
    <rect x="12" y="23" width="22" height="23" fill="#0f172a"/>
    <rect x="40" y="16" width="24" height="30" fill="#1e293b"/>
    <path d="M72,46 L72,22 Q84,10 96,22 L96,46 Z" fill="#0f172a"/>
    <line x1="84" y1="10" x2="84" y2="5" stroke="#facc15" stroke-width="2.2"/>
    <rect x="104" y="20" width="24" height="26" fill="#1e293b"/>
    <rect x="134" y="27" width="20" height="19" fill="#0f172a"/>
    <!-- Crisp white & crimson emergency emblem -->
    <circle cx="164" cy="21" r="12.5" fill="#ffffff" stroke="#b91c1c" stroke-width="2.2"/>
    <rect x="161" y="13.5" width="6" height="15" fill="#dc2626"/>
    <rect x="156.5" y="18" width="15" height="6" fill="#dc2626"/>
  </svg>`,

  /** #10 Flinders Island, Oceania: Dramatic bushfire crimson-amber sky, Tasmanian ridge, roaring flames & 14,000+ HA badge */
  flinders_fire: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fireSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9a3412"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <rect width="194" height="46" fill="url(#fireSky)"/>
    <!-- Island hills silhouette -->
    <path d="M0,46 L0,33 Q32,20 66,30 Q98,18 134,32 L194,28 L194,46 Z" fill="#1c1917"/>
    <!-- Wall of bright bushfire flames -->
    <path d="M10,42 Q6,26 22,16 Q25,27 36,11 Q44,24 54,14 Q62,26 70,18 Q78,29 88,22 Q94,34 86,42 Z" fill="#dc2626"/>
    <path d="M18,42 Q18,30 30,22 Q37,31 46,20 Q55,31 64,25 Q70,35 66,42 Z" fill="#fde047"/>
    <!-- Crisp stat callout pill -->
    <rect x="104" y="6" width="82" height="32" rx="4" fill="#ffffff" stroke="#7c2d12" stroke-width="1.6"/>
    <text x="145" y="21.5" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="13.2" font-weight="800">14,000+ HA</text>
    <text x="145" y="33" text-anchor="middle" fill="#1c1917" font-family="'Noto Sans', sans-serif" font-size="8.4" font-weight="800">&gt;10% ISLAND</text>
  </svg>`,

  /** #11 Nairobi: Rich forest-emerald backdrop, bold golden gavel, crisp prohibition-halted medical emblem + SITE HALTED */
  kenya_court: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#1b5e43"/>
    <!-- Bold golden sound block & gavel -->
    <rect x="14" y="35" width="58" height="7.5" rx="2" fill="#f59e0b" stroke="#451a03" stroke-width="1.2"/>
    <g transform="translate(45,19) rotate(-28)">
      <rect x="-15" y="-7" width="30" height="14" rx="2.5" fill="#fbbf24" stroke="#451a03" stroke-width="1.5"/>
      <rect x="-3.2" y="7" width="6.4" height="22" rx="1.5" fill="#b45309" stroke="#451a03" stroke-width="1.2"/>
    </g>
    <!-- Crisp white court order card with prohibition ring over medical cross -->
    <rect x="88" y="5" width="98" height="36" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.6"/>
    <g transform="translate(110,23)">
      <rect x="-3" y="-8.5" width="6" height="17" rx="1" fill="#475569"/>
      <rect x="-8.5" y="-3" width="17" height="6" rx="1" fill="#475569"/>
      <circle cx="0" cy="0" r="12" fill="none" stroke="#dc2626" stroke-width="3"/>
      <line x1="-8.5" y1="8.5" x2="8.5" y2="-8.5" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
    </g>
    <text x="155" y="20.5" text-anchor="middle" fill="#b91c1c" font-family="'Noto Sans', sans-serif" font-size="10.2" font-weight="800">HALTED</text>
    <text x="155" y="32.5" text-anchor="middle" fill="#1e293b" font-family="'Noto Sans', sans-serif" font-size="8.2" font-weight="800">45d ORDER</text>
  </svg>`,

  /** #10 Mumbai / Delhi: Rich warm saffron-amber editorial backdrop, Gateway of India arch & 18 YEARS badge */
  india_2611: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#d99f5b"/>
    <!-- Crisp Indian tricolour top stripe -->
    <rect x="0" y="0" width="194" height="3.5" fill="#ea580c"/>
    <rect x="0" y="3.5" width="194" height="3" fill="#ffffff"/>
    <rect x="0" y="6.5" width="194" height="3.5" fill="#15803d"/>
    <!-- Bold Gateway of India silhouette -->
    <path d="M12,42 L12,18 L22,12 L32,18 L66,18 L76,12 L86,18 L86,42 L62,42 L62,30 A13,13 0 0,0 36,30 L36,42 Z" fill="#5c3614" stroke="#2d1807" stroke-width="1.4"/>
    <rect x="8" y="41" width="84" height="5" fill="#2d1807"/>
    <!-- Glowing memorial candle -->
    <g transform="translate(95,22)">
      <rect x="0" y="6" width="7" height="14" rx="1" fill="#ffffff" stroke="#5c3614" stroke-width="1.2"/>
      <ellipse cx="3.5" cy="2.5" rx="3" ry="4.2" fill="#fef08a"/>
    </g>
    <!-- High-contrast anniversary badge -->
    <rect x="110" y="11" width="76" height="30" rx="4" fill="#ffffff" stroke="#15803d" stroke-width="1.6"/>
    <text x="148" y="25" text-anchor="middle" fill="#166534" font-family="'Noto Sans', sans-serif" font-size="13" font-weight="800">18 YEARS</text>
    <text x="148" y="36" text-anchor="middle" fill="#9a3412" font-family="'Noto Sans', sans-serif" font-size="8.2" font-weight="800">26/11 · 77th CONST.</text>
  </svg>`,

  /** #13 Geneva: Deep tournament forest-green felt, crisp chessboard + giant King/Knight + bold 1½–1½ clock */
  chess_game3: () => `<svg viewBox="0 0 194 46" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <rect width="194" height="46" fill="#164e3a"/>
    <!-- Crisp chessboard squares -->
    <g stroke="#0f2f23" stroke-width="0.7">
      <rect x="10" y="23" width="21" height="19" fill="#1d7a59"/>
      <rect x="31" y="23" width="21" height="19" fill="#faf6ee"/>
      <rect x="52" y="23" width="21" height="19" fill="#1d7a59"/>
      <rect x="73" y="23" width="21" height="19" fill="#faf6ee"/>
      <rect x="10" y="4" width="21" height="19" fill="#faf6ee"/>
      <rect x="31" y="4" width="21" height="19" fill="#1d7a59"/>
      <rect x="52" y="4" width="21" height="19" fill="#faf6ee"/>
      <rect x="73" y="4" width="21" height="19" fill="#1d7a59"/>
    </g>
    <!-- White King -->
    <g transform="translate(31,7)">
      <rect x="8.5" y="0" width="3.6" height="8" fill="#ffffff" stroke="#0f172a" stroke-width="1.3"/>
      <rect x="5.8" y="2.2" width="9" height="3.2" fill="#ffffff" stroke="#0f172a" stroke-width="1.3"/>
      <path d="M3.5,28 L7,10.5 L14,10.5 L17.5,28 Z" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/>
      <rect x="1.5" y="27" width="18" height="4.5" rx="1.4" fill="#ffffff" stroke="#0f172a" stroke-width="1.4"/>
    </g>
    <!-- Black Knight -->
    <g transform="translate(57,9)">
      <path d="M5,26 L7,16.5 L4,12.5 L10,4.5 L16.5,6.5 L19.5,14.5 L14.5,17.5 L17.5,26 Z" fill="#0f172a" stroke="#ffffff" stroke-width="0.8"/>
      <rect x="2.5" y="25" width="18" height="4.5" rx="1.4" fill="#0f172a"/>
    </g>
    <!-- Final Game 3 draw clock -->
    <rect x="104" y="6" width="80" height="34" rx="4" fill="#ffffff" stroke="#0f172a" stroke-width="1.8"/>
    <text x="144" y="22.5" text-anchor="middle" fill="#0f172a" font-family="'Noto Sans', sans-serif" font-size="15" font-weight="800">1½ – 1½</text>
    <text x="144" y="34.8" text-anchor="middle" fill="#166534" font-family="'Noto Sans', sans-serif" font-size="8.6" font-weight="800">60-MOVE DRAW</text>
  </svg>`
};
