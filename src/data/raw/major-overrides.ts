import type { RelationshipStatus } from '@/types/country'

export interface RecentDevRow {
  date: string
  title: string
  description: string
  whyItMatters: string
}

export interface MajorOverride {
  // New dimensions not present in the old 6-axis model.
  political: number
  energy: number
  multilateral: number
  momentum: number
  status: RelationshipStatus
  diplomaticRelationsEstablished?: string
  recentDevelopments: RecentDevRow[]
}

// Only the four *new* dimensions are overridden here — diplomatic, economic,
// defence, technology, strategic and peopleToPeople carry over from the
// existing (already-researched) six-axis scores in prisma/data.ts, with
// light manual adjustment baked directly into this table where 2024–2026
// developments changed the picture materially (US, Türkiye, Bangladesh,
// Canada, Maldives).

export const majorOverrides: Record<string, MajorOverride> = {
  'united-states': {
    political: 40, energy: 40, multilateral: 72, momentum: 22,
    status: 'Complex',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2025-08', title: 'US imposes steep tariffs tied to Russian oil purchases', description: 'The Trump administration imposed some of the highest US tariffs on any major trading partner on a wide range of Indian exports, explicitly citing India\'s continued purchases of discounted Russian crude as a factor alongside the broader trade deficit.', whyItMatters: 'The most serious rupture in the economic relationship in years, forcing India to weigh trade diversification even as defence and technology cooperation continued.' },
      { date: '2025', title: 'Trade negotiations continue amid the tariff dispute', description: 'Despite the tariff measures, both governments kept trade-deal negotiations open, alongside continued iCET technology cooperation and defence engagement.', whyItMatters: 'Signals the relationship\'s underlying strategic ballast — Indo-Pacific alignment and defence ties have not been suspended even as trade ties are strained.' },
      { date: '2024', title: 'iCET and defence cooperation continue', description: 'The Initiative on Critical and Emerging Technology continued advancing semiconductor and AI cooperation, and defence trade discussions proceeded under the existing foundational agreements.', whyItMatters: 'Underlines that the strategic and technology tracks remained largely insulated from the trade friction that emerged the following year.' },
    ],
  },
  'turkiye': {
    political: 25, energy: 35, multilateral: 30, momentum: 20,
    status: 'Strained',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2025', title: 'Tensions sharpen over Türkiye-Pakistan defence ties', description: 'Reports of Turkish-origin drones and matériel linked to Pakistan during a period of heightened India-Pakistan tension drew sharp criticism in India, alongside an informal consumer-level boycott movement affecting Turkish tourism and trade.', whyItMatters: 'Pushed an already-cool political relationship toward its most strained point in years, with defence-related distrust now compounding the long-standing dispute over Kashmir statements.' },
      { date: '2025', title: 'Bilateral consultations resume', description: 'Despite the tension, foreign-ministry-level bilateral consultations between India and Türkiye continued during the year, keeping a formal diplomatic channel open.', whyItMatters: 'A sign that both sides are managing the strain through diplomatic channels rather than severing engagement entirely — evidence the relationship is strained but not fully ruptured.' },
      { date: '2023', title: 'Operation Dost earthquake relief', description: 'India sent search-and-rescue teams and humanitarian assistance to Türkiye after the devastating February 2023 earthquakes.', whyItMatters: 'A rare recent instance of warmth in an otherwise cool relationship, though it did not translate into a broader political thaw in subsequent years.' },
    ],
  },
  china: {
    political: 25, energy: 30, multilateral: 65, momentum: 45,
    status: 'Adversarial',
    diplomaticRelationsEstablished: '1950',
    recentDevelopments: [
      { date: '2024', title: 'Border patrolling agreement enables partial disengagement', description: 'India and China reached an agreement on patrolling arrangements at remaining friction points along the Line of Actual Control, enabling limited troop disengagement and a cautious resumption of some high-level contact.', whyItMatters: 'The first concrete de-escalation step since the 2020 Galwan clash, though large-scale troop deployments and mutual distrust persist.' },
      { date: '2025', title: 'Resumption of direct flights and limited people-to-people exchanges', description: 'Direct flight connectivity and some visa/exchange channels saw incremental easing as part of the broader post-2024 disengagement track.', whyItMatters: 'A modest normalization signal, though the underlying border dispute and trade imbalance remain unresolved.' },
    ],
  },
  japan: {
    political: 85, energy: 55, multilateral: 90, momentum: 75,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1952',
    recentDevelopments: [
      { date: '2024', title: 'Continued QUAD and Act East Forum coordination', description: 'India and Japan sustained close coordination through the QUAD grouping and the Act East Forum on northeastern India infrastructure projects.', whyItMatters: 'Reinforces one of India\'s most stable and deeply institutionalized major-power partnerships.' },
      { date: '2025', title: 'Bullet train project progresses amid continued delays', description: 'Construction on the Mumbai-Ahmedabad High Speed Rail corridor continued, though land acquisition issues kept the project behind its original timeline.', whyItMatters: 'The flagship infrastructure project remains a visible, if delayed, symbol of the deepening economic partnership.' },
    ],
  },
  'south-korea': {
    political: 65, energy: 45, multilateral: 55, momentum: 60,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1973',
    recentDevelopments: [
      { date: '2024', title: 'Talks on upgrading the CEPA trade agreement continue', description: 'India and South Korea continued discussions on modernizing their 2010 trade agreement to expand coverage.', whyItMatters: 'Reflects steady, unspectacular progress in one of India\'s most commercially significant East Asian partnerships.' },
    ],
  },
  'north-korea': {
    political: 15, energy: 10, multilateral: 20, momentum: 50,
    status: 'Developing',
    diplomaticRelationsEstablished: '1973',
    recentDevelopments: [
      { date: '2024', title: 'Relationship remains minimal under sanctions constraints', description: 'India continued to maintain only a bare diplomatic presence, constrained by UN Security Council sanctions on North Korea\'s weapons programmes.', whyItMatters: 'No material change — the relationship remains structurally limited by the international sanctions regime.' },
    ],
  },
  mongolia: {
    political: 55, energy: 25, multilateral: 35, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1955',
    recentDevelopments: [
      { date: '2024', title: 'Continued implementation of oil refinery financing', description: 'Work continued on the India-financed oil refinery project in Mongolia under the 2015 line of credit.', whyItMatters: 'A long-running but steady development cooperation track, insulated from broader geopolitical shifts.' },
    ],
  },
  vietnam: {
    political: 75, energy: 40, multilateral: 60, momentum: 65,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1972',
    recentDevelopments: [
      { date: '2024', title: 'Continued defence and maritime cooperation', description: 'India and Vietnam sustained defence training cooperation and joint naval engagement amid shared concern over Chinese assertiveness in the South China Sea.', whyItMatters: 'One of India\'s most consistent Southeast Asian defence partnerships, unaffected by broader regional volatility.' },
    ],
  },
  indonesia: {
    political: 60, energy: 55, multilateral: 65, momentum: 55,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1951',
    recentDevelopments: [
      { date: '2024', title: 'Continued Comprehensive Strategic Partnership implementation', description: 'India and Indonesia continued defence and maritime cooperation under their 2018 Comprehensive Strategic Partnership, including use of Sabang port access.', whyItMatters: 'Steady progress in a relationship central to India\'s Indo-Pacific maritime strategy.' },
    ],
  },
  philippines: {
    political: 60, energy: 20, multilateral: 55, momentum: 65,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1949',
    recentDevelopments: [
      { date: '2024', title: 'BrahMos missile deliveries and follow-on interest', description: 'Following the landmark 2022 BrahMos deal, the Philippines continued fielding the system and signalled interest in further defence acquisitions from India.', whyItMatters: 'Cements India\'s emergence as a credible defence exporter and deepens strategic alignment amid shared South China Sea concerns.' },
    ],
  },
  singapore: {
    political: 75, energy: 45, multilateral: 65, momentum: 65,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1965',
    recentDevelopments: [
      { date: '2024', title: 'Continued fintech and investment ties deepen', description: 'The UPI-PayNow digital payment linkage and Singaporean investment into Indian infrastructure and startups continued expanding.', whyItMatters: 'Reinforces Singapore\'s role as one of India\'s most important economic and financial gateways.' },
    ],
  },
  malaysia: {
    political: 50, energy: 35, multilateral: 50, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1957',
    recentDevelopments: [
      { date: '2024', title: 'Trade ties stabilize after earlier political friction', description: 'Bilateral trade, including palm oil purchases, continued to recover after the 2019-20 friction over political commentary.', whyItMatters: 'Shows the relationship\'s underlying economic ballast reasserting itself after a period of strain.' },
    ],
  },
  thailand: {
    political: 60, energy: 30, multilateral: 55, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Trilateral Highway construction continues amid delays', description: 'Work on the India-Myanmar-Thailand Trilateral Highway continued, though security conditions in Myanmar kept the project behind schedule.', whyItMatters: 'A key regional connectivity ambition remains only partly realized, limiting the pace of deeper integration.' },
    ],
  },
  uae: {
    political: 82, energy: 70, multilateral: 75, momentum: 75,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1972',
    recentDevelopments: [
      { date: '2024', title: 'CEPA-driven trade continues rapid growth', description: 'Non-oil bilateral trade continued expanding rapidly under the 2022 Comprehensive Economic Partnership Agreement.', whyItMatters: 'The UAE has become one of the clearest success stories of India\'s post-2020 trade agreement push.' },
      { date: '2025', title: 'Continued I2U2 and Gulf connectivity initiatives', description: 'India and the UAE continued advancing I2U2 grouping initiatives alongside broader India-Middle East-Europe Economic Corridor (IMEC) planning.', whyItMatters: 'Positions the UAE as a central node in India\'s wider West Asia and connectivity strategy.' },
    ],
  },
  'saudi-arabia': {
    political: 75, energy: 80, multilateral: 65, momentum: 65,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Strategic Partnership Council ministerial meetings continue', description: 'India and Saudi Arabia continued institutionalized ministerial coordination under the 2019 Strategic Partnership Council framework.', whyItMatters: 'Reflects a maturing relationship increasingly institutionalized beyond energy trade alone.' },
    ],
  },
  qatar: {
    political: 70, energy: 75, multilateral: 45, momentum: 78,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1973',
    recentDevelopments: [
      { date: '2024-02', title: 'Release of former Indian Navy personnel', description: 'Qatar commuted the death sentences of eight former Indian Navy personnel and released them following sustained diplomatic engagement; they returned to India in early 2024.', whyItMatters: 'A significant diplomatic success that reinforced bilateral trust after a tense 18-month period.' },
      { date: '2024', title: 'Renegotiated LNG terms take effect', description: 'India continued receiving Qatari LNG under revised long-term contract terms secured in the preceding years.', whyItMatters: 'Anchors continued energy security cooperation on more favourable terms for India.' },
    ],
  },
  oman: {
    political: 70, energy: 50, multilateral: 40, momentum: 60,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1955',
    recentDevelopments: [
      { date: '2024', title: 'Continued naval access and logistics cooperation', description: 'Indian Navy access to the Port of Duqm continued under the 2018 agreement, supporting operations toward the Gulf of Aden.', whyItMatters: 'Remains one of India\'s few reliable foreign naval logistics footholds in the western Indian Ocean.' },
    ],
  },
  iran: {
    political: 45, energy: 20, multilateral: 40, momentum: 45,
    status: 'Balanced',
    diplomaticRelationsEstablished: '1950',
    recentDevelopments: [
      { date: '2024-05', title: 'Ten-year Chabahar Port operating agreement signed', description: 'India signed a long-term agreement to operate the Shahid Beheshti terminal at Chabahar Port for ten years.', whyItMatters: 'Locks in India\'s access to a strategically important trade and connectivity route to Afghanistan and Central Asia despite broader sanctions constraints on Iran.' },
    ],
  },
  iraq: {
    political: 50, energy: 80, multilateral: 30, momentum: 50,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1952',
    recentDevelopments: [
      { date: '2024', title: 'Iraq remains a top-two crude oil supplier', description: 'Iraq continued to be one of India\'s largest sources of crude oil imports, with the relationship remaining largely transactional and energy-focused.', whyItMatters: 'Confirms the relationship\'s continued centrality to India\'s energy security, with limited broader strategic expansion.' },
    ],
  },
  israel: {
    political: 70, energy: 15, multilateral: 60, momentum: 60,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1992',
    recentDevelopments: [
      { date: '2023-2024', title: 'Gaza war reshapes regional context', description: 'Following the October 2023 Hamas attack and subsequent Gaza war, India condemned terrorism while continuing to call for humanitarian access and a two-state solution, even as thousands of Indian workers took up construction jobs in Israel amid labour shortages.', whyItMatters: 'Tested India\'s traditional balancing act between close Israeli defence ties and longstanding support for Palestinian statehood.' },
      { date: '2024', title: 'Defence and agri-tech cooperation continues', description: 'Core defence procurement and agricultural technology cooperation continued largely unaffected by the regional conflict.', whyItMatters: 'Shows the bilateral relationship\'s institutional ties proved resilient through a highly volatile regional period.' },
    ],
  },
  'united-kingdom': {
    political: 78, energy: 40, multilateral: 60, momentum: 78,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2025-07', title: 'India-UK free trade agreement signed', description: 'After nearly three years of negotiation, India and the UK signed a Comprehensive Economic and Trade Agreement, one of the UK\'s largest post-Brexit trade deals.', whyItMatters: 'A major milestone expected to substantially expand two-way trade and investment, and a signature achievement of the 2021 "Roadmap 2030" partnership.' },
    ],
  },
  france: {
    political: 88, energy: 35, multilateral: 70, momentum: 80,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Continued defence-industrial deepening', description: 'India and France continued discussions on additional Rafale acquisitions (including for the Navy) and expanded submarine and space cooperation.', whyItMatters: 'France remains one of India\'s most consistent major-power defence partners, largely insulated from the volatility seen elsewhere.' },
    ],
  },
  germany: {
    political: 72, energy: 40, multilateral: 55, momentum: 68,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1951',
    recentDevelopments: [
      { date: '2024', title: 'Skilled migration and green energy financing expand', description: 'Implementation of the 2022 migration and mobility partnership continued alongside German financing for Indian green hydrogen projects.', whyItMatters: 'Reflects Germany\'s growing role as both a labour-market partner and a green-transition financier for India.' },
    ],
  },
  italy: {
    political: 60, energy: 30, multilateral: 55, momentum: 62,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2023-2024', title: 'Strategic Partnership implementation continues', description: 'Following the 2023 elevation to a Strategic Partnership under PM Meloni, both sides continued expanding defence and technology cooperation.', whyItMatters: 'Marks a full normalization from the 2012-2020 Enrica Lexie-era strain.' },
    ],
  },
  spain: {
    political: 58, energy: 25, multilateral: 50, momentum: 62,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1956',
    recentDevelopments: [
      { date: '2024', title: 'C295 aircraft manufacturing ramps up in Vadodara', description: 'The Airbus-Tata C295 final assembly line in Vadodara continued production, delivering aircraft for the Indian Air Force.', whyItMatters: 'A flagship "Make in India" defence-manufacturing success story anchoring the wider relationship.' },
    ],
  },
  russia: {
    political: 78, energy: 90, multilateral: 80, momentum: 60,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024-08', title: "PM Modi visits Moscow and Kyiv in the same year", description: 'PM Modi visited both Moscow and Kyiv in 2024, the Kyiv visit being the first by an Indian prime minister since Ukrainian independence, underscoring India\'s balancing approach to the Russia-Ukraine war.', whyItMatters: 'Signals India is actively managing, not ignoring, the diplomatic complexity of sustaining ties with Russia while re-engaging Ukraine.' },
      { date: '2025', title: 'Russian crude imports remain elevated despite Western pressure', description: 'India continued importing large volumes of discounted Russian crude oil, a practice that became a specific point of friction with the United States during 2025.', whyItMatters: 'The energy relationship with Russia has become entangled with India\'s ties to Washington, illustrating the strategic trade-offs of India\'s multi-alignment approach.' },
    ],
  },
  ukraine: {
    political: 45, energy: 15, multilateral: 35, momentum: 55,
    status: 'Balanced',
    diplomaticRelationsEstablished: '1992',
    recentDevelopments: [
      { date: '2024-08', title: "PM Modi's Kyiv visit", description: 'PM Modi visited Kyiv in August 2024, the first visit by an Indian prime minister since Ukraine\'s independence, meeting President Zelenskyy.', whyItMatters: 'A symbolically significant re-engagement, signalling India\'s intent to maintain channels with Ukraine even as it sustains deep ties with Russia.' },
    ],
  },
  netherlands: {
    political: 60, energy: 30, multilateral: 50, momentum: 60,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Semiconductor cooperation deepens', description: 'India and the Netherlands continued implementing their 2023 semiconductor supply-chain MoU, relevant given the Netherlands\' role in chip-equipment manufacturing.', whyItMatters: 'Positions the Netherlands as a growing technology partner alongside its established role as an investment hub.' },
    ],
  },
  belgium: {
    political: 55, energy: 20, multilateral: 45, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Diamond trade and EU-gateway engagement continue', description: 'The Antwerp-Surat diamond pipeline and Belgium\'s role in broader India-EU engagement continued steadily.', whyItMatters: 'A stable, low-friction relationship anchored in commercial ties and EU institutional access.' },
    ],
  },
  switzerland: {
    political: 62, energy: 20, multilateral: 45, momentum: 78,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024-03', title: 'India-EFTA trade agreement signed', description: 'India signed the Trade and Economic Partnership Agreement with the European Free Trade Association (Switzerland, Norway, Iceland, Liechtenstein), with EFTA committing to a $100 billion investment target over 15 years.', whyItMatters: 'One of India\'s most significant trade agreements with European economies, led by Switzerland.' },
    ],
  },
  sweden: {
    political: 58, energy: 20, multilateral: 45, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1949',
    recentDevelopments: [
      { date: '2024', title: 'Innovation partnership continues on clean technology', description: 'The India-Sweden Innovation Partnership continued supporting joint smart-city and clean-technology projects.', whyItMatters: 'A steady, low-profile but substantive technology and sustainability relationship.' },
    ],
  },
  norway: {
    political: 55, energy: 25, multilateral: 40, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2024', title: 'Norwegian sovereign fund investment in India continues', description: 'Norway\'s sovereign wealth fund remained among the larger foreign portfolio investors in Indian equity markets.', whyItMatters: 'Reflects continued financial-market confidence in India even amid global volatility.' },
    ],
  },
  poland: {
    political: 55, energy: 20, multilateral: 40, momentum: 58,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1954',
    recentDevelopments: [
      { date: '2024', title: 'Trade and logistics ties continue growing', description: 'India-Poland trade continued its steady growth trajectory, building on Poland\'s role as a logistics gateway to Central Europe.', whyItMatters: 'A quietly expanding relationship without major friction points.' },
    ],
  },
  pakistan: {
    political: 10, energy: 5, multilateral: 20, momentum: 15,
    status: 'Adversarial',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2025-04', title: 'Pahalgam terror attack and Indus Waters Treaty held in abeyance', description: 'Following a terror attack in Pahalgam, India held the 1960 Indus Waters Treaty in abeyance, one of the most significant unilateral steps taken in the treaty\'s history.', whyItMatters: 'Marked a sharp escalation, removing a decades-old mechanism that had survived multiple prior wars, and signalling a fundamentally more confrontational Indian posture.' },
      { date: '2025', title: 'Heightened military tension', description: 'Bilateral tension escalated further through 2025, with reports of cross-border incidents and international concern over the risk of wider conflict between the two nuclear-armed neighbours.', whyItMatters: 'Underscores that the relationship remains the most volatile and dangerous in India\'s neighbourhood.' },
    ],
  },
  bangladesh: {
    political: 45, energy: 30, multilateral: 45, momentum: 30,
    status: 'Complex',
    diplomaticRelationsEstablished: '1971',
    recentDevelopments: [
      { date: '2024-08', title: 'Fall of the Hasina government', description: 'Sheikh Hasina resigned amid mass protests and took refuge in India; an interim government under Muhammad Yunus assumed charge in Dhaka.', whyItMatters: 'Ended a 15-year period of unusually close India-Bangladesh alignment and introduced significant uncertainty into one of India\'s most important regional relationships.' },
      { date: '2025', title: 'Relations remain cautious under the interim government', description: 'Engagement between New Delhi and the interim Dhaka administration continued but with a more guarded tone, including friction over Hasina\'s status and minority-rights rhetoric.', whyItMatters: 'The relationship has shifted from a strategic anchor to one requiring active, careful management.' },
    ],
  },
  nepal: {
    political: 60, energy: 45, multilateral: 40, momentum: 58,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1950',
    recentDevelopments: [
      { date: '2024', title: 'Hydropower cooperation expands', description: 'Cross-border electricity trade under the 2014 Power Trade Agreement continued expanding, with new hydropower projects progressing.', whyItMatters: 'Deepens economic interdependence even as the Kalapani-Lipulekh border dispute remains unresolved.' },
    ],
  },
  bhutan: {
    political: 92, energy: 85, multilateral: 40, momentum: 80,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1968',
    recentDevelopments: [
      { date: '2024', title: 'Continued coordination on the Doklam tri-junction', description: 'India and Bhutan maintained close coordination on border security near Doklam amid continued Chinese infrastructure activity in the area.', whyItMatters: 'Reaffirms Bhutan\'s position as India\'s closest and most reliable regional partner on shared strategic concerns.' },
    ],
  },
  'sri-lanka': {
    political: 62, energy: 40, multilateral: 45, momentum: 65,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024', title: 'Post-crisis economic engagement continues', description: 'India continued supporting Sri Lanka\'s economic recovery following the 2022 crisis, including renewable energy investment.', whyItMatters: 'Consolidated India\'s standing as Sri Lanka\'s most reliable crisis-era partner.' },
    ],
  },
  maldives: {
    political: 45, energy: 20, multilateral: 35, momentum: 55,
    status: 'Balanced',
    diplomaticRelationsEstablished: '1965',
    recentDevelopments: [
      { date: '2024', title: 'Diplomatic reset following 2023-24 friction', description: 'Following tension over the "India Out" campaign and a 2024 social-media row, both governments worked through high-level visits to stabilise relations, including a Comprehensive Economic and Maritime Security Partnership.', whyItMatters: 'Shows the relationship recovering from its lowest point in years, though the underlying strategic competition with China persists.' },
    ],
  },
  afghanistan: {
    political: 30, energy: 15, multilateral: 25, momentum: 45,
    status: 'Developing',
    diplomaticRelationsEstablished: '1950',
    recentDevelopments: [
      { date: '2024', title: 'Technical mission continues limited engagement', description: 'India\'s technical mission in Kabul, reopened in 2022, continued managing humanitarian assistance without formal recognition of the Taliban government.', whyItMatters: 'Reflects a cautious, transactional re-engagement rather than a full normalization of ties.' },
    ],
  },
  'south-africa': {
    political: 75, energy: 30, multilateral: 80, momentum: 62,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1993',
    recentDevelopments: [
      { date: '2024', title: 'Continued BRICS and Global South coordination', description: 'India and South Africa continued close coordination within BRICS (including on its 2024 expansion) and other Global South forums.', whyItMatters: 'Reinforces the historic political trust underpinning one of India\'s closest African partnerships.' },
    ],
  },
  egypt: {
    political: 78, energy: 35, multilateral: 55, momentum: 65,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2023-2024', title: 'Strategic Partnership implementation continues', description: 'Following the 2023 elevation to a Strategic Partnership during President Sisi\'s Republic Day visit, both sides continued expanding trade and defence engagement.', whyItMatters: 'Consolidates a historic Non-Aligned Movement relationship into a more concrete modern partnership.' },
    ],
  },
  nigeria: {
    political: 55, energy: 65, multilateral: 45, momentum: 58,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1962',
    recentDevelopments: [
      { date: '2024', title: 'Continued energy and defence-industrial ties', description: 'Nigeria remained one of India\'s largest African trading partners, with continued crude oil and LNG trade alongside defence-industrial engagement.', whyItMatters: 'Anchors India\'s broader West African economic engagement.' },
    ],
  },
  kenya: {
    political: 58, energy: 20, multilateral: 45, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024', title: 'East Africa gateway role continues', description: 'Kenya remained India\'s primary commercial and diplomatic gateway to East Africa, with steady pharmaceutical and engineering-goods trade.', whyItMatters: 'A stable, historically rooted relationship without major recent shifts.' },
    ],
  },
  ethiopia: {
    political: 55, energy: 15, multilateral: 40, momentum: 52,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024', title: 'Development financing continues', description: 'Indian lines of credit continued supporting Ethiopian industrial and infrastructure projects.', whyItMatters: 'A steady development partnership largely insulated from Ethiopia\'s domestic political volatility.' },
    ],
  },
  mauritius: {
    political: 90, energy: 30, multilateral: 60, momentum: 82,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024', title: 'Agalega infrastructure and CECPA implementation continue', description: 'Maritime infrastructure cooperation on Agalega Island and implementation of the 2021 trade agreement continued deepening.', whyItMatters: 'Mauritius remains India\'s closest African partner by nearly every measure, from demographics to strategic trust.' },
    ],
  },
  brazil: {
    political: 68, energy: 30, multilateral: 85, momentum: 62,
    status: 'Strong Partner',
    diplomaticRelationsEstablished: '1948',
    recentDevelopments: [
      { date: '2024', title: 'Continued BRICS and G20 coordination', description: 'India and Brazil continued close coordination through BRICS and the G20 (Brazil hosted the G20 in 2024, following India\'s 2023 presidency), including joint advocacy for UN Security Council reform.', whyItMatters: 'Reflects a deepening Global South partnership beyond bilateral trade alone.' },
    ],
  },
  argentina: {
    political: 55, energy: 20, multilateral: 45, momentum: 58,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1949',
    recentDevelopments: [
      { date: '2024', title: 'Lithium investment continues', description: 'Indian public-sector investment in Argentine lithium blocks continued as part of India\'s critical-minerals strategy.', whyItMatters: 'Positions Argentina as an increasingly important supplier for India\'s electric-vehicle battery supply chain.' },
    ],
  },
  chile: {
    political: 52, energy: 25, multilateral: 35, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1949',
    recentDevelopments: [
      { date: '2024', title: 'Copper and lithium trade continues', description: 'Chile remained a steady supplier of copper and lithium carbonate to India.', whyItMatters: 'A quiet but strategically relevant relationship for India\'s critical-minerals needs.' },
    ],
  },
  mexico: {
    political: 50, energy: 20, multilateral: 40, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1950',
    recentDevelopments: [
      { date: '2024', title: 'Pharmaceutical and auto-component trade grows', description: 'Bilateral trade in generic pharmaceuticals and automotive components continued its steady growth.', whyItMatters: 'A modest but expanding relationship without major political friction.' },
    ],
  },
  canada: {
    political: 20, energy: 25, multilateral: 45, momentum: 30,
    status: 'Strained',
    diplomaticRelationsEstablished: '1947',
    recentDevelopments: [
      { date: '2023-09', title: 'Nijjar killing rupture', description: 'PM Trudeau alleged "credible" links between Indian agents and the killing of Khalistani separatist Hardeep Singh Nijjar in British Columbia; both countries expelled diplomats and downgraded ties.', whyItMatters: 'Triggered the most serious diplomatic rupture in the relationship\'s history, with trade talks and visa services suspended for extended periods.' },
      { date: '2024-2025', title: 'Ties remain cool with limited normalization', description: 'Diplomatic relations remained strained through 2024-2025, with only limited steps toward normalization amid continued disagreement over the Khalistan separatism issue.', whyItMatters: 'The rupture has proven more durable than initially expected, keeping one of India\'s major diaspora relationships in an unusually cold state.' },
    ],
  },
  'new-zealand': {
    political: 55, energy: 15, multilateral: 35, momentum: 55,
    status: 'Cooperative',
    diplomaticRelationsEstablished: '1952',
    recentDevelopments: [
      { date: '2024', title: 'Renewed trade agreement talks', description: 'India and New Zealand continued discussions toward a bilateral free trade agreement, building on talks that first launched in 2010.', whyItMatters: 'Modest but real momentum in a relationship that has historically moved slowly.' },
    ],
  },
  australia: {
    political: 80, energy: 55, multilateral: 88, momentum: 78,
    status: 'Strategic Partner',
    diplomaticRelationsEstablished: '1944',
    recentDevelopments: [
      { date: '2024', title: 'ECTA implementation and critical minerals cooperation deepen', description: 'Implementation of the 2022 Economic Cooperation and Trade Agreement continued, alongside growing critical-minerals and education cooperation.', whyItMatters: 'One of India\'s fastest-deepening major-power relationships, anchored by the QUAD and shared Indo-Pacific interests.' },
    ],
  },
}
