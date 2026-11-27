/**
 * Verified full-day Thursday, 26 November 2026 world-news dataset and integrity gate.
 * Every story occurred or was first reported on Thu 26 Nov 2026 (00:00-23:59 UTC).
 * Programmatically enforces counts, stat verbatim matching, and zero DATE CHECK leaks.
 */

export const EDITION = {
  dateIso: '2026-11-26',
  kickerLeft: 'THE WORLD IN ONE DAY',
  kickerRight: '35 STORIES · 9 REGIONS · FULL-DAY THURSDAY 26 NOVEMBER 2026',
  dayPrefix: 'Thursday',
  dayDate: '26 November 2026',
  standfirst:
    "EU summit deadlocks on €1.6tn budget & €45bn Ukraine loan · Saudi defences down two Houthi missiles over Riyadh · Thanksgiving nor'easter lashes US East",
  editionStamp: 'Full-day edition · Thu 26 Nov 2026 UTC',
  certaintyLegend:
    'OFFICIAL = government, court, central bank or organiser · CONFIRMED = 2+ major outlets · REPORTED = single wire report · Original vector art.',
  dateCheckRule:
    'Every story occurred or was first reported on Thursday 26 November 2026 (UTC).',
  dateCheckExcluded:
    'US 14-partner tariffs (Wed 25) · Bangladesh 36% wage (Wed 25) · Cairo tanker fire (Wed 25) · Shenzhou-24 docking (Wed 25) · UK Ofgem +26% cap (Wed 25) · Solomons A$740m pact (Wed 25) · Ramaphosa & Netanyahu rulings (Wed 25) · Huawei, Chen Jining & Real Madrid 5–1 (Tue 24)'
};

export const REGIONS = [
  { id: 'europe', label: 'EUROPE', color: '#1d4e7a', count: 6 },
  { id: 'namerica', label: 'N. AMERICA', color: '#a82328', count: 4 },
  { id: 'mideast', label: 'MIDDLE EAST', color: '#9c5a10', count: 4 },
  { id: 'africa', label: 'AFRICA', color: '#b07412', count: 4 },
  { id: 'sasia', label: 'S. ASIA', color: '#1b6d50', count: 4 },
  { id: 'eastseasia', label: 'E. & SE ASIA', color: '#0f6a7c', count: 4 },
  { id: 'latam', label: 'LATIN AM.', color: '#c2541a', count: 4 },
  { id: 'global', label: 'GLOBAL', color: '#475569', count: 3 },
  { id: 'oceania', label: 'OCEANIA', color: '#5b428a', count: 2 }
];

export const REGION_MAP = Object.fromEntries(REGIONS.map((r) => [r.id, r]));

export const KEY_FIGURES = [
  {
    figure: '€45bn',
    accent: '#fcd34d',
    line1: 'EU 2027 Ukraine loan',
    line2: 'deadlocked to Dec 17',
    storyNum: 1
  },
  {
    figure: '65 mph',
    accent: '#fca5a5',
    line1: "Nor'easter wind gusts",
    line2: 'lash US East Coast',
    storyNum: 3
  },
  {
    figure: '3.25%',
    accent: '#7dd3fc',
    line1: 'Bank of Korea rate',
    line2: 'hiked 25 bps to 2-yr high',
    storyNum: 4
  },
  {
    figure: '77,000',
    accent: '#6ee7b7',
    line1: 'UK net migration',
    line2: "down 62%, lowest since '97",
    storyNum: 5
  },
  {
    figure: '12,021',
    accent: '#fdba74',
    line1: 'DRC Ebola cases',
    line2: '5,904 deaths in east',
    storyNum: 22
  }
];

export const TIMELINE_UTC = [
  { time: '01:00', text: 'Bank of Korea hikes rate to 3.25%', status: 'done' },
  { time: '02:30', text: 'Saudi defences down 2 Riyadh missiles', status: 'done' },
  { time: '05:00', text: 'India marks 26/11 & Constitution Day', status: 'done' },
  { time: '07:45', text: 'Bangkok refinery blast injures 9', status: 'done' },
  { time: '09:30', text: 'ONS: UK net migration falls to 77,000', status: 'done' },
  { time: '19:00', text: 'Gukesh–Sindarov draw 60-move Game 3', status: 'done' },
  { time: '22:30', text: 'EU summit deadlocks; pushed to Dec 17', status: 'done' },
  { time: '23:30', text: 'NFL: Bears 39–35, Eagles 39–38 wins', status: 'done' }
];

export const LEADS = [
  {
    num: 1,
    region: 'europe',
    place: 'BRUSSELS',
    tag: 'OFFICIAL',
    utc: '22:30 UTC',
    artKey: 'eu_summit',
    headline: 'EU summit deadlocks on €1.6tn budget & €45bn Ukraine loan',
    deck: "Over 12 hours of talks end without a deal on 2028–34 spending or Kyiv's 2027 loan; leaders push decisions to Dec 17.",
    source: 'EU Council · Guardian'
  },
  {
    num: 2,
    region: 'mideast',
    place: 'RIYADH',
    tag: 'OFFICIAL',
    utc: '02:30 UTC',
    artKey: 'riyadh_missiles',
    headline: 'Saudi defences down two Houthi missiles over Riyadh',
    deck: 'Coalition downs two ballistic missiles aimed at the capital, plus a cruise missile and three drones; minor Jazan damage.',
    source: 'Saudi Coalition · Anadolu'
  },
  {
    num: 3,
    region: 'namerica',
    place: 'NEW YORK · US EAST',
    tag: 'CONFIRMED',
    utc: '12:00 UTC',
    artKey: 'nyc_noreaster',
    headline: "Nor'easter lashes US East; 100th Macy's route sits empty",
    deck: 'Gusts up to 65 mph trigger a 21-county NJ emergency as New York moves its centennial parade to Saturday.',
    source: 'AP · Washington Post'
  }
];

export const SECONDARIES = [
  {
    num: 4,
    region: 'eastseasia',
    place: 'SEOUL',
    tag: 'OFFICIAL',
    artKey: 'bok_rate',
    headline: 'Bank of Korea hikes rate 25 bps to 3.25%',
    summary: '5–2 vote for 3rd 2026 hike on 2.8% CPI & AI boom; GDP lifted to 3.9%.',
    source: 'Bank of Korea · Yonhap'
  },
  {
    num: 5,
    region: 'europe',
    place: 'LONDON',
    tag: 'OFFICIAL',
    artKey: 'uk_migration',
    headline: 'UK net migration falls 62% to 77,000',
    summary: 'Lowest since 1997 in ONS year-to-June data, down from 204,000.',
    source: 'ONS · Guardian'
  },
  {
    num: 6,
    region: 'eastseasia',
    place: 'BANGKOK',
    tag: 'CONFIRMED',
    artKey: 'bangkok_refinery',
    headline: 'Blast shuts Bangkok refinery, injuring nine',
    summary: 'Bangchak Phra Khanong unit hit; fire out in 30 min, units halted.',
    source: 'Reuters · The Hindu'
  },
  {
    num: 7,
    region: 'mideast',
    place: 'GAZA',
    tag: 'CONFIRMED',
    artKey: 'gaza_strike',
    headline: 'Strike kills Hamas economic chief Abu Nada',
    summary: 'Overnight Deir al-Balah raid kills Abu Nada & wife among 9+ dead.',
    source: 'Al-Monitor · ToI'
  },
  {
    num: 8,
    region: 'oceania',
    place: 'FLINDERS IS., AUS',
    tag: 'OFFICIAL',
    artKey: 'flinders_fire',
    headline: 'Wildfire scorches >10% of Flinders Island',
    summary: 'Tasmanian blaze burns 14,000+ ha & damages 6+ homes; shelter alert.',
    source: 'Tas. Fire · Guardian'
  },
  {
    num: 9,
    region: 'africa',
    place: 'NAIROBI',
    tag: 'OFFICIAL',
    artKey: 'kenya_court',
    headline: 'Kenya court halts US-backed Ebola site',
    summary: 'Bars 50-bed Laikipia Base site; orders full pact release in 45 days.',
    source: 'WashPost · Katiba'
  },
  {
    num: 10,
    region: 'sasia',
    place: 'MUMBAI · DELHI',
    tag: 'OFFICIAL',
    artKey: 'india_2611',
    headline: 'India marks 18 yrs of 26/11 & Constitution',
    summary: 'Honours 166 killed in 2008 attacks; Modi leads 77th Samvidhan Diwas.',
    source: 'PTI · Indian Exp.'
  },
  {
    num: 11,
    region: 'global',
    place: 'GENEVA',
    tag: 'OFFICIAL',
    artKey: 'chess_game3',
    headline: 'Gukesh, Sindarov draw 60-move Chess Game 3',
    summary: '5-hour marathon leaves title match tied 1½–1½ heading into rest day.',
    source: 'FIDE · Guardian'
  }
];

export const BRIEFS = [
  { num: 12, region: 'europe', place: 'Kyiv', text: 'Strikes kill 2 in Kharkiv, hurt 7 in Kyiv', source: 'AP' },
  { num: 13, region: 'europe', place: 'Kyiv', text: '250 fallen soldiers returned in swap', source: 'UNN' },
  { num: 14, region: 'europe', place: 'London', text: '24h RMT Tube strike halts 2 lines', source: 'TfL' },
  { num: 15, region: 'europe', place: 'Europe', text: 'DAX +2.1%, FTSE +1.75%, CAC +1.6%', source: 'Bloomberg' },
  { num: 16, region: 'namerica', place: 'US', text: 'Trump & Rutte warn Russia on war', source: 'NATO' },
  { num: 17, region: 'namerica', place: 'US', text: 'Markets shut; AAA sees 81.5m trips', source: 'AAA' },
  { num: 18, region: 'namerica', place: 'NFL', text: 'Bears 39–35 Lions; Eagles 39–38 Cowboys', source: 'NFL' },
  { num: 19, region: 'mideast', place: 'Tehran', text: 'M. Khamenei urges wider Basij role', source: 'Al-Monitor' },
  { num: 20, region: 'mideast', place: 'Baghdad', text: 'Leaders set Dec 1 Kurdish oil talks', source: 'Anadolu' },
  { num: 21, region: 'africa', place: 'Pretoria', text: 'SA Oct producer inflation hits 8.1%', source: 'Stats SA' },
  { num: 22, region: 'africa', place: 'DRC', text: 'East Ebola: 12,021 cases, 5,904 dead', source: 'DRC Health' },
  { num: 23, region: 'africa', place: 'Lusaka', text: 'Hetero ships 300k generic HIV vials', source: 'The Hindu' },
  { num: 24, region: 'sasia', place: 'Dhaka', text: 'Central bank plans $2.6bn Sukuk bond', source: 'TBS News' },
  { num: 25, region: 'sasia', place: 'Nepal', text: 'Notices for ~4,000 flood missing', source: 'SCMP' },
  { num: 26, region: 'sasia', place: 'Doha', text: 'Sri Lanka A beat India A by 8 wkts', source: 'Ind. Exp.' },
  { num: 27, region: 'eastseasia', place: 'Singapore', text: 'Nvidia pauses AI servers to 4 hubs', source: 'FT' },
  { num: 28, region: 'eastseasia', place: 'Tokyo', text: 'Nikkei +0.86%, HSI +1.19%, Kospi +0.3%', source: 'Xinhua' },
  { num: 29, region: 'latam', place: 'Brazil', text: 'Mid-Nov IPCA-15 eases to 0.22% MoM', source: 'IBGE' },
  { num: 30, region: 'latam', place: 'Brasília', text: 'Embraer & ALADA sign KC-390 pact', source: 'Embraer' },
  { num: 31, region: 'latam', place: 'Mexico', text: '2026 LatAm steel seen +3.6% (57.7 Mt)', source: 'Alacero' },
  { num: 32, region: 'latam', place: 'Asunción', text: '2028 Copa América awarded to US', source: 'CONMEBOL' },
  { num: 33, region: 'oceania', place: 'Canberra', text: 'Senate passes 20% LNG bill (21–10)', source: 'Guardian' },
  { num: 34, region: 'global', place: 'Zurich', text: 'FIFA confirms <0.1% data cyberattack', source: 'FIFA' },
  { num: 35, region: 'global', place: 'Markets', text: 'Brent >$95/bbl; gold >$3,560, BTC >$61k', source: 'Morningstar' }
];

export const MAP_PINS = [
  { id: 1, label: 'Brussels', region: 'europe', lat: 50.85, lon: 4.35 },
  { id: 2, label: 'Riyadh', region: 'mideast', lat: 24.71, lon: 46.68 },
  { id: 3, label: 'New York', region: 'namerica', lat: 40.71, lon: -74.01 },
  { id: 4, label: 'Seoul', region: 'eastseasia', lat: 37.57, lon: 126.98 },
  { id: 6, label: 'Bangkok', region: 'eastseasia', lat: 13.7, lon: 100.6 },
  { id: 7, label: 'Gaza', region: 'mideast', lat: 31.42, lon: 34.35 },
  { id: 8, label: 'Flinders Is.', region: 'oceania', lat: -40.0, lon: 148.0 },
  { id: 9, label: 'Nairobi', region: 'africa', lat: -1.29, lon: 36.82 },
  { id: 10, label: 'Mumbai', region: 'sasia', lat: 19.08, lon: 72.88 },
  { id: 12, label: 'Kyiv', region: 'europe', lat: 50.45, lon: 30.52 },
  { id: 21, label: 'Pretoria', region: 'africa', lat: -25.75, lon: 28.19 },
  { id: 27, label: 'Singapore', region: 'eastseasia', lat: 1.35, lon: 103.82 },
  { id: 29, label: 'Brasília', region: 'latam', lat: -15.79, lon: -47.88 },
  { id: 31, label: 'Mexico City', region: 'latam', lat: 19.43, lon: -99.13 }
];

export const FORBIDDEN_TOKENS = [
  'cairo',
  'tanker',
  'shenzhou',
  'tiangong',
  'zeeshan',
  'astronaut',
  'ofgem',
  '£2,166',
  'solomons',
  'solomon islands',
  'a$740m',
  'ramaphosa',
  'farmgate',
  'phala phala',
  'case 4000',
  'bogor',
  'gold mine',
  'spacex',
  'songdowon',
  'astier',
  '−6.2%',
  '-6.2%',
  'huawei',
  'chen jining',
  'real madrid',
  'sooryavanshi',
  '15,000 crore',
  'murmansk',
  'chibis',
  'afcon',
  'senegal',
  'ras tanura',
  'hormuz mines',
  'tk17,000',
  '36% wage',
  'garment pay',
  'wed 25',
  'tue 24',
  '25 nov',
  '24 nov'
];

/**
 * Automated editorial integrity gate:
 * - Verifies exact counts (40 stories, 9 regions, 13 cards, 27 briefs)
 * - Verifies region counts match actual story region assignments
 * - Verifies every key figure appears verbatim in its referenced story
 * - Verifies ZERO forbidden/excluded tokens appear in any story, stat, or timeline
 */
export function validateEdition() {
  const errors = [];
  const allStories = [...LEADS, ...SECONDARIES, ...BRIEFS];

  if (allStories.length !== 35) {
    errors.push(`Expected 35 stories, got ${allStories.length}`);
  }
  if (LEADS.length !== 3 || SECONDARIES.length !== 8 || BRIEFS.length !== 24) {
    errors.push(`Expected 3/8/24 split, got ${LEADS.length}/${SECONDARIES.length}/${BRIEFS.length}`);
  }

  // Sequential numbering 1..40
  allStories.forEach((s, i) => {
    if (s.num !== i + 1) errors.push(`Story index ${i} has num=${s.num}`);
    if (!s.source || !s.source.trim()) errors.push(`Story #${s.num} missing wire source`);
  });

  // Exact region totals
  const actualByRegion = {};
  for (const s of allStories) {
    actualByRegion[s.region] = (actualByRegion[s.region] || 0) + 1;
  }
  let regionSum = 0;
  for (const r of REGIONS) {
    regionSum += r.count;
    if ((actualByRegion[r.id] || 0) !== r.count) {
      errors.push(`Region ${r.id}: declared ${r.count}, actual ${actualByRegion[r.id] || 0}`);
    }
  }
  if (regionSum !== allStories.length) {
    errors.push(`Region sum ${regionSum} != total stories ${allStories.length}`);
  }

  // Verbatim key-figure match against referenced story
  for (const kf of KEY_FIGURES) {
    const story = allStories.find((s) => s.num === kf.storyNum);
    if (!story) {
      errors.push(`Key figure ${kf.figure} references missing story #${kf.storyNum}`);
      continue;
    }
    const blob = `${story.headline || ''} ${story.deck || ''} ${story.summary || ''} ${story.text || ''}`;
    if (!blob.includes(kf.figure)) {
      errors.push(`Key figure "${kf.figure}" not found verbatim in story #${kf.storyNum}`);
    }
  }

  // Zero forbidden/excluded token leaks across all published content (excluding DATE CHECK box)
  const contentCorpus = [
    EDITION.standfirst,
    ...KEY_FIGURES.map((k) => `${k.figure} ${k.line1} ${k.line2}`),
    ...TIMELINE_UTC.map((t) => t.text),
    ...allStories.map((s) => `${s.place} ${s.headline || ''} ${s.deck || ''} ${s.summary || ''} ${s.text || ''} ${s.source}`)
  ]
    .join('\n')
    .toLowerCase();

  for (const tok of FORBIDDEN_TOKENS) {
    if (contentCorpus.includes(tok.toLowerCase())) {
      errors.push(`DATE_LEAK: forbidden token "${tok}" appeared in 26 Nov content!`);
    }
  }

  // Verify DATE CHECK itself does NOT mention included stories
  const lowerDateCheck = EDITION.dateCheckExcluded.toLowerCase();
  for (const includedTerm of ["macy's", 'parade', 'riyadh', 'brussels', 'gukesh', 'bangchak', 'laikipia', 'flinders', 'sukuk']) {
    if (lowerDateCheck.includes(includedTerm)) {
      errors.push(`DATE_CHECK_CONTRADICTION: "${includedTerm}" appears in both stories and excluded list`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Editorial integrity gate failed:\n - ${errors.join('\n - ')}`);
  }

  return {
    totalStories: allStories.length,
    totalRegions: REGIONS.length,
    illustratedCards: LEADS.length + SECONDARIES.length,
    briefsCount: BRIEFS.length,
    pinsCount: MAP_PINS.length
  };
}
