export interface Article {
  id: string;
  title: string;
  kicker?: string;
  isLive?: boolean;
  summary: string;
  byline: string;
  date: string;
  readTime: string;
  timeAgo?: string;
  section: string;
  imageUrl?: string;
  imageCaption?: string;
  imageCredit?: string;
  content: string[];
  keyPoints?: { title: string; desc: string }[];
  commentsCount: number;
}

export interface OpinionPiece {
  id: string;
  author: string;
  initials: string;
  role: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  content: string[];
  commentsCount: number;
}

export interface Recipe {
  id: string;
  title: string;
  summary: string;
  cookTime: string;
  prepTime: string;
  servings: number;
  rating: number;
  reviewsCount: number;
  author: string;
  imageUrl?: string;
  ingredients: string[];
  instructions: string[];
  chefTips: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  show: string;
  host: string;
  duration: string;
  durationSeconds: number;
  date: string;
  summary: string;
  keyTimestamps: { time: string; label: string }[];
}

export const MAIN_STORY: Article = {
  id: 'trump-press-secretary',
  title: "Trump’s New Press Secretary: Not Quite Attorney at Law",
  kicker: "Special Report",
  summary: "Karoline Leavitt told The New York Times that the confusion over her legal credentials is the result of shifting communications protocols inside the press office.",
  byline: "By Maggie Haberman and Jonathan Swan",
  date: "October 15, 2025",
  readTime: "6 MIN READ",
  section: "U.S.",
  imageUrl: "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg",
  imageCaption: "Karoline Leavitt addressing reporters during a briefing in Washington.",
  imageCredit: "DOUG MILLS / THE NEW YORK TIMES",
  keyPoints: [
    {
      title: "Vetting Discrepancies",
      desc: "Government ethics disclosures revealed inconsistencies regarding bar associations and prior corporate representation."
    },
    {
      title: "Internal Pushback",
      desc: "Allies within the Department of Justice expressed mounting unease over public claims made during televised briefings."
    }
  ],
  commentsCount: 428,
  content: [
    "WASHINGTON — Inside the White House briefing room, where words are parsed by international markets and foreign ministries alike, the question of legal standing was meant to be an uncontroversial footnote. Instead, it has ignited a fierce internal dispute over executive vetting procedures.",
    "Karoline Leavitt, designated to helm the daily televised confrontations on behalf of the administration, acknowledged in an interview with The New York Times that earlier characterizations of her background had conflated policy counsel duties with formal constitutional advocacy.",
    "“The representations made in official transition literature reflected preliminary summaries compiled under immense time constraints,” Ms. Leavitt said in a statement. “At every juncture, my role has remained focused on policy communications and articulating executive directives.”",
    "Yet records obtained through congressional oversight inquiries show that as recently as last month, administrative filings listed her as an active associate in several regulatory disputes. The discrepancies quickly caught the attention of career attorneys at the Department of Justice, who raised internal flags with White House counsel.",
    "The friction highlights a broader tension running through the early months of the term: a fast-moving transition apparatus that prized television presence and personal loyalty, sometimes cutting corners on standard institutional background checks.",
    "Senior aides insisted on Tuesday that Ms. Leavitt retains the full confidence of the president. But privately, several advisers conceded that the scrutiny has complicated planned announcements on antitrust enforcement and ongoing federal litigation."
  ]
};

export const SIDE_ARTICLES: Article[] = [
  {
    id: 'high-ranking-women-leaving',
    title: "High-Ranking Women Are Leaving the Trump Administration",
    kicker: "Live Updates",
    isLive: true,
    summary: "As the president’s second term enters its stride, senior female advisers and cabinet-level deputies have departed at an unprecedented pace.",
    byline: "By Annie Karni and Peter Baker",
    date: "October 15, 2025",
    readTime: "3 MIN READ",
    timeAgo: "10m ago",
    section: "U.S.",
    commentsCount: 312,
    content: [
      "WASHINGTON — A steady succession of high-profile departures has reshaped the West Wing in recent weeks, as prominent female officials across diplomacy, domestic policy, and the national security council step down.",
      "Interviews with more than a dozen current and former administration officials reveal a pattern of marginalization in key policy deliberations, where informal advisory circles dominated by campaign loyalists have routinely circumvented cabinet secretaries.",
      "The departures include two undersecretaries of state and three deputy directors at the Office of Management and Budget. While departures are common as administrations transition from initial sprints to sustained governance, the concentration of senior female leadership exiting within a six-week span has alarmed congressional allies."
    ]
  },
  {
    id: 'guilfoyle-inner-circle',
    title: "The Steep Rise and Sudden Fall of Kimberly Guilfoyle’s Inner Circle",
    kicker: "Political Memo",
    summary: "Behind the curtain of conservative power brokers, access to the transition apparatus proved fickle and fraught with shifting allegiances.",
    byline: "By Maggie Haberman",
    date: "October 15, 2025",
    readTime: "5 MIN READ",
    section: "Politics",
    commentsCount: 184,
    content: [
      "PALM BEACH, Fla. — For nearly two years, Kimberly Guilfoyle was among the most visible gatekeepers of Mar-a-Lago’s fundraising apparatus, orchestrating donor roundtables and acting as an aggressive conduit between MAGA finance circles and the campaign.",
      "Now, as the administration solidifies its personnel roster, the figures once closest to Ms. Guilfoyle have found themselves abruptly on the outside looking in.",
      "The shifting dynamic underscores how swiftly fortune turns within the president's political ecosystem, where standing is measured in direct access and loyalty is perpetually subject to re-examination."
    ]
  },
  {
    id: 'european-leaders-brussels-trade',
    title: "European Leaders Gather in Brussels to Weigh Unified Trade Response",
    summary: "With new tariffs looming across the Atlantic, delegates confront an uncomfortable divergence in national strategies.",
    byline: "By Matina Stevis-Gridneff",
    date: "October 15, 2025",
    readTime: "5 MIN READ",
    section: "World",
    commentsCount: 96,
    content: [
      "BRUSSELS — European Union heads of state met behind closed doors on Wednesday to map out counter-measures against proposed American tariffs on advanced machinery, automotive components, and pharmaceutical exports.",
      "While French delegates urged an aggressive reciprocal tariff package targeting agricultural and aerospace goods, German negotiators advocated for a bilateral compromise to shield European manufacturers from supply chain disruptions.",
      "“We cannot afford a fractures-first doctrine,” noted one senior European diplomat. “A divided continent will negotiate from weakness at precisely the moment transatlantic solidarity is most urgently tested.”"
    ]
  }
];

export const SPLIT_ARTICLES: Article[] = [
  {
    id: 'federal-prosecutors-scrutiny',
    title: "How Federal Prosecutors Navigated Months of Political Scrutiny",
    summary: "An exhaustive review of internal records depicts career attorneys navigating pressure from both sides of the congressional aisle.",
    byline: "By Glenn Thrush",
    date: "October 15, 2025",
    readTime: "7 MIN READ",
    section: "U.S.",
    commentsCount: 247,
    content: [
      "WASHINGTON — When the subpoenas began arriving in early spring, attorneys inside the Public Integrity Section were instructed to log every communication with congressional liaisons.",
      "Memos released following Freedom of Information Act litigation illustrate the psychological and legal tightrope walked by career civil servants trying to insulate active investigations from partisan grandstanding."
    ]
  },
  {
    id: 'ai-frontier-financial-forensics',
    title: "The New AI Frontier in Financial Forensics",
    summary: "Regulators are adopting algorithmic models to parse millions of offshore wire records within fractions of a second.",
    byline: "By Cade Metz",
    date: "October 15, 2025",
    readTime: "4 MIN READ",
    section: "Business",
    commentsCount: 153,
    content: [
      "NEW YORK — Sifting through dense ledgers of shell company wire transfers used to take teams of forensic accountants months of painstaking cross-referencing.",
      "Today, new foundation models tuned on financial intelligence can flag suspicious layering patterns, nested shell companies, and sanctions evasion schemes within seconds, revolutionizing how the Treasury Department identifies illicit cash flows."
    ]
  }
];

export const OPINION_PIECES: OpinionPiece[] = [
  {
    id: 'pamela-paul-never-caught-up',
    author: "Pamela Paul",
    initials: "PB",
    role: "Columnist",
    title: "“The Truth About Why We Feel We’re Never Caught Up”",
    summary: "In a culture that measures virtue by output, true leisure has been reframed as a luxury few are permitted to afford.",
    readTime: "4 MIN READ",
    date: "October 15, 2025",
    commentsCount: 582,
    content: [
      "Every morning begins with an audit of deficits: emails unanswered, laundry uncollected, projects lingering in the halfway house of good intentions.",
      "We convince ourselves that once we sprint past this current deluge — once this deadline clears, once this semester wraps — we will finally touch that mythic plateau called 'caught up.'",
      "It is time to admit the truth: The horizon does not advance because we are walking; the horizon is designed to retreat. In a hyper-connected society, to be caught up is not a logistical milestone. It is a conceptual impossibility."
    ]
  },
  {
    id: 'ezra-klein-building-nothing',
    author: "Ezra Klein",
    initials: "EK",
    role: "Columnist",
    title: "The Real Cost of Building Nothing Anywhere",
    summary: "How state and municipal procedural gridlock is crippling clean energy infrastructure before it even breaks ground.",
    readTime: "6 MIN READ",
    date: "October 15, 2025",
    commentsCount: 719,
    content: [
      "If you ask why the transmission lines carrying renewable wind power from Wyoming to California are years behind schedule, no one will tell you the technology failed.",
      "They will tell you about an environmental review process designed in the 1970s that now weaponizes litigation against the very infrastructure needed to decarbonize the American grid.",
      "We have built an institutional apparatus skilled at vetoing the future while remaining paralyzed when asked to construct it. That must change."
    ]
  }
];

export const COOKING_SPOTLIGHT: Recipe = {
  id: 'crispy-sheet-pan-chicken',
  title: "Crispy Sheet-Pan Chicken With Lemon and Feta",
  summary: "A 30-minute weeknight dinner that relies on high heat and briny notes.",
  cookTime: "35 minutes",
  prepTime: "10 minutes",
  servings: 4,
  rating: 4.8,
  reviewsCount: 2410,
  author: "Ali Slagle",
  ingredients: [
    "2 pounds bone-in, skin-on chicken thighs, patted dry",
    "1 pound baby Yukon Gold potatoes, halved",
    "1 large red onion, cut into 1/2-inch wedges",
    "3 tablespoons extra-virgin olive oil",
    "1 tablespoon dried oregano or za'atar",
    "1 teaspoon kosher salt and freshly cracked black pepper",
    "1 large lemon, sliced into thin rounds",
    "6 ounces Greek feta, broken into large bite-sized chunks",
    "Fresh dill or mint sprigs, for serving"
  ],
  instructions: [
    "Preheat the oven to 425°F (220°C). Position a rack in the upper third.",
    "On a large rimmed baking sheet, toss potatoes, red onion, 1.5 tablespoons olive oil, salt, pepper, and half the oregano.",
    "Season the chicken thighs generously all over with salt and remaining oregano. Nest the chicken and lemon slices among the vegetables skin-side up.",
    "Roast for 25 minutes until chicken is golden and potatoes are tender when pierced with a fork.",
    "Scatter the chunks of feta over the sheet pan. Return to the oven for 8–10 minutes until the cheese is warm and lightly caramelized around the edges.",
    "Garnish with fresh dill and a squeeze of charred roasted lemon juice before serving directly from the pan."
  ],
  chefTips: "For maximum crispiness, don't crowd the pan! If your potatoes overlap the chicken, steam will prevent the skin from sizzling into that deep golden crackle."
};

export const PODCAST_EPISODE: PodcastEpisode = {
  id: 'the-daily-white-house-subpoenas',
  title: "The Legal Stakes Behind the Latest White House Subpoenas",
  show: "The Daily",
  host: "Michael Barbaro",
  duration: "28 min",
  durationSeconds: 1680,
  date: "Wednesday, October 15, 2025",
  summary: "A sudden flurry of subpoenas from congressional committees has opened a new constitutional battleground over executive privilege. Michael Barbaro speaks with senior legal correspondent Charlie Savage about what happens when the White House refuses to comply.",
  keyTimestamps: [
    { time: "00:00", label: "Introduction & Today's Headway" },
    { time: "04:15", label: "The Subpoena Strategy Explained" },
    { time: "12:30", label: "Historical Precedents: From Nixon to Now" },
    { time: "19:45", label: "What the Courts Might Rule" },
    { time: "25:20", label: "Wrap-up and Tomorrow's Briefing" }
  ]
};

export const MARKET_DATA = [
  { symbol: "S&P 500", value: "5,862.14", change: "+0.42%", isPositive: true },
  { symbol: "Nasdaq", value: "18,367.09", change: "+0.68%", isPositive: true },
  { symbol: "10-Yr Yield", value: "4.18%", change: "+0.03%", isPositive: false }
];

export const TRENDING_TOPICS = [
  "Special Counsel Report",
  "Interest Rate Outlook",
  "Cannes Film Roster",
  "Supreme Court Docket",
  "Silicon Valley Energy Grid"
];

export const EDITIONS = ["U.S.", "INTERNATIONAL", "CANADA", "ESPAÑOL", "中文"];

export const SECTIONS = [
  "U.S.",
  "World",
  "Business",
  "Arts",
  "Lifestyle",
  "Opinion",
  "Audio",
  "Games",
  "Cooking",
  "Wirecutter",
  "The Athletic"
];
