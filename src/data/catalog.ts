export type Category =
  | 'All'
  | 'Health & Fitness'
  | 'Personal Productivity'
  | 'Business'
  | 'School'
  | 'Finance'
  | 'Travel';

export type TemplateCategory = Exclude<Category, 'All'>;

export interface Template {
  id: number;
  name: string;
  slug: string;
  price: number;
  compareAt?: number;
  pro: boolean;
  category: TemplateCategory;
  summary: string;
  description: [string, string];
  whatsInside: string[];
  databaseCount: number;
  viewsCount: number;
  version: string;
  illustrationUrl: string;
  cardTint: string;
}

export interface AppItem {
  name: string;
  slug: string;
  tagline: string;
  icon: 'grid' | 'book' | 'flask' | 'check-circle';
  description: string;
  features: { title: string; body: string }[];
  platform: string;
  priceLabel: string;
  illustrationUrl: string;
  cardTint: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  paragraphs: string[];
  takeaways: string[];
}

export interface UpdateEntry {
  version: string;
  date: string;
  title: string;
  changes: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  outcomeMetric: string;
  author: string;
  role: string;
  organization: string;
  templateUsed: string;
  templateSlug: string;
  surfaceTint: string;
  accentInk: string;
  illustrationUrl: string;
}

export const ALL_ACCESS_PRICE = 99;

export const CATEGORIES: Category[] = [
  'All',
  'Health & Fitness',
  'Personal Productivity',
  'Business',
  'School',
  'Finance',
  'Travel',
];

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const RAW_TEMPLATES: Array<{
  name: string;
  price: number;
  compareAt?: number;
  category: TemplateCategory;
}> = [
  { name: 'Task Tracker', price: 0, category: 'Personal Productivity' },
  { name: 'Dopamine Menu', price: 0, category: 'Personal Productivity' },
  { name: 'Travel Planner', price: 0, category: 'Travel' },
  { name: 'Travel Dashboard', price: 9, category: 'Travel' },
  { name: 'Project Tracker', price: 0, category: 'Personal Productivity' },
  { name: '12 Week Year Planner', price: 9, category: 'Personal Productivity' },
  { name: 'Savings Tracker', price: 5, category: 'Finance' },
  { name: 'Payday Budget', price: 5, category: 'Finance' },
  { name: 'Prompts Library', price: 0, category: 'Personal Productivity' },
  { name: 'Knowledge Base', price: 9, category: 'Personal Productivity' },
  { name: 'Second Brain', price: 39, compareAt: 79, category: 'Personal Productivity' },
  { name: 'Habit Tracker', price: 0, category: 'Health & Fitness' },
  { name: 'Wheel of Life Template', price: 0, category: 'Personal Productivity' },
  { name: 'Habit Journal', price: 9, category: 'Health & Fitness' },
  { name: 'Symptom Tracker', price: 0, category: 'Health & Fitness' },
  { name: 'Freelance OS', price: 79, category: 'Business' },
  { name: 'Book Tracker', price: 0, category: 'School' },
  { name: 'OKRs Tracker', price: 9, category: 'Business' },
  { name: 'GTD Dashboard', price: 39, category: 'Personal Productivity' },
  { name: 'Grocery List', price: 0, category: 'Health & Fitness' },
  { name: 'All-In-One Meal Planner', price: 9, category: 'Health & Fitness' },
  { name: 'Expense Tracker', price: 0, category: 'Finance' },
  { name: 'Budget Tracker', price: 5, category: 'Finance' },
  { name: 'CRM Template', price: 9, category: 'Business' },
  { name: 'Goal Tracker', price: 9, category: 'Personal Productivity' },
  { name: 'Content Calendar', price: 0, category: 'Business' },
  { name: 'Journal', price: 0, category: 'Personal Productivity' },
  { name: 'Gift Tracker', price: 0, category: 'Personal Productivity' },
  { name: 'Vocabulary Builder', price: 0, category: 'School' },
  { name: 'Content OS', price: 79, category: 'Business' },
  { name: 'PARA Dashboard', price: 0, category: 'Personal Productivity' },
  { name: 'Finance Tracker', price: 39, category: 'Finance' },
  { name: 'Running Tracker', price: 0, category: 'Health & Fitness' },
  { name: 'Workout Tracker Pro', price: 9, category: 'Health & Fitness' },
  { name: 'Workout Tracker', price: 0, category: 'Health & Fitness' },
  { name: 'Subscription Tracker', price: 0, category: 'Finance' },
  { name: 'Recipe Manager', price: 0, category: 'Health & Fitness' },
  { name: 'Student Dashboard', price: 0, category: 'School' },
  { name: 'Notes Dashboard', price: 0, category: 'School' },
];

function buildWhatsInside(name: string, category: TemplateCategory, pro: boolean): string[] {
  const base: Record<TemplateCategory, string[]> = {
    'Personal Productivity': [
      `Pre-configured ${name} master database with Today, Upcoming, and Archive views`,
      'Quick-capture inbox block for zero-friction daily entries',
      'Automated status rollups and weekly review checklist',
      'Minimalist monochrome icons and clean mobile-optimized layout',
    ],
    'Health & Fitness': [
      `Daily & weekly ${name} log with automated streak calculation`,
      'Visual progress rings and habit consistency matrix',
      'Mobile quick-entry view designed for on-the-go logging',
      'Monthly reflection prompts and baseline health metrics',
    ],
    Business: [
      `Centralized ${name} workspace with linked client, project, and pipeline databases`,
      'Executive summary dashboard with filtered KPI views',
      'Standard operating procedure (SOP) templates and repeatable workflows',
      'Automated deliverable tracking and deadline alerts',
    ],
    School: [
      `Structured ${name} system organized by semester, course, and topic`,
      'Spaced-repetition review queue and active recall prompts',
      'Clean reading and citation database with status tags',
      'Distraction-free study dashboard for exam preparation',
    ],
    Finance: [
      `Complete ${name} ledger with monthly and annual rollup summaries`,
      'Automated category breakdowns, savings targets, and cash-flow formulas',
      'One-click transaction entry with recurring payment reminders',
      'Visual balance progress bars compatible with Notion Free plan',
    ],
    Travel: [
      `End-to-end ${name} workspace covering itinerary, bookings, and packing lists`,
      'Day-by-day schedule view with timezone and location notes',
      'Trip budget estimator with actual vs. planned spend tracking',
      'Offline-friendly mobile checklist for airport and transit days',
    ],
  };

  const items = [...base[category]];
  if (pro) {
    items.push('Lifetime access to future template updates + Private Circle community invite');
  } else {
    items.push('Instant one-click duplication into any free or paid Notion workspace');
  }
  return items;
}

export const BLUSH_ASSETS = {
  // 30 Copyright-Free Ultra-HD Storyset Vector Illustrations (880x800 Enhanced)
  expenseReceiptAlert: '/assets/aistudio/image_994c9eea.png',
  mobilePiggyPortfolio: '/assets/aistudio/image_6f469fd4.png',
  savingsJarsCalendar: '/assets/aistudio/image_1073bb8b.png',
  executiveSofaStrategy: '/assets/aistudio/image_73df9636.png',
  vrIdeaLab: '/assets/aistudio/image_1e71dd22.png',
  dualDeskStudio: '/assets/aistudio/image_39833869.png',
  boardroomPieChart: '/assets/aistudio/image_6abd788b.png',
  isometricCompanyOS: '/assets/aistudio/image_6e478f9f.png',
  teamGrowthClimb: '/assets/aistudio/image_e5de7079.png',
  secondBrainMazeBulb: '/assets/aistudio/image_325e535e.png',
  strategicMazeThinker: '/assets/aistudio/image_4e538395.png',
  clockCalendarPlanner: '/assets/aistudio/image_ce36d90f.png',
  mindfulMeditationClock: '/assets/aistudio/image_7307a332.png',
  yellowClockTasks: '/assets/aistudio/image_84cbd4da.png',
  mobileProfileLauncher: '/assets/aistudio/image_1d1aa18f.png',
  laptopFinanceLedger: '/assets/aistudio/image_f55a3ea4.png',
  secondBrainPuzzleHead: '/assets/aistudio/image_81de8a00.png',
  mentalGardenWatering: '/assets/aistudio/image_b42bb9d2.png',
  bloomingMindGarden: '/assets/aistudio/image_3349b033.png',
  clientDealHandshake: '/assets/aistudio/image_cc88b829.png',
  developerCodeDesk: '/assets/aistudio/image_75c19751.png',
  onlineCourseLecture: '/assets/aistudio/image_7ae70ebe.png',
  bookStackReader: '/assets/aistudio/image_5471920d.png',
  relaxedFloorReader: '/assets/aistudio/image_42c746a3.png',
  zettelkastenBookLotus: '/assets/aistudio/image_cf1244e8.png',
  mathStudyChecklist: '/assets/aistudio/image_f05ad58a.png',
  globalCommunityNetwork: '/assets/aistudio/image_2ce78738.png',
  creativeDesignerCoffee: '/assets/aistudio/image_f70909f2.png',
  videoStudioCreator: '/assets/aistudio/image_1cad396b.png',
  socialMegaphoneCreator: '/assets/aistudio/image_496ea7b7.png',
} as const;

export const CATEGORY_BLUSH_ASSET: Record<TemplateCategory, string> = {
  'Personal Productivity': BLUSH_ASSETS.zettelkastenBookLotus,
  'Health & Fitness': BLUSH_ASSETS.bloomingMindGarden,
  Business: BLUSH_ASSETS.isometricCompanyOS,
  School: BLUSH_ASSETS.onlineCourseLecture,
  Finance: BLUSH_ASSETS.laptopFinanceLedger,
  Travel: BLUSH_ASSETS.globalCommunityNetwork,
};

const ALL_30_TEMPLATE_ILLUSTRATIONS: string[] = [
  BLUSH_ASSETS.yellowClockTasks, // 0: Task Tracker
  BLUSH_ASSETS.laptopFinanceLedger, // 1: Dopamine Menu & 31: Finance Tracker
  BLUSH_ASSETS.globalCommunityNetwork, // 2: Travel Planner
  BLUSH_ASSETS.mobileProfileLauncher, // 3: Travel Dashboard
  BLUSH_ASSETS.developerCodeDesk, // 4: Project Tracker
  BLUSH_ASSETS.clockCalendarPlanner, // 5: 12 Week Year Planner
  BLUSH_ASSETS.savingsJarsCalendar, // 6: Savings Tracker
  BLUSH_ASSETS.mobilePiggyPortfolio, // 7: Payday Budget
  BLUSH_ASSETS.vrIdeaLab, // 8: Prompts Library
  BLUSH_ASSETS.secondBrainPuzzleHead, // 9: Knowledge Base
  BLUSH_ASSETS.zettelkastenBookLotus, // 10: Second Brain
  BLUSH_ASSETS.bloomingMindGarden, // 11: Habit Tracker
  BLUSH_ASSETS.mindfulMeditationClock, // 12: Wheel of Life Template
  BLUSH_ASSETS.mentalGardenWatering, // 13: Habit Journal
  BLUSH_ASSETS.relaxedFloorReader, // 14: Symptom Tracker
  BLUSH_ASSETS.isometricCompanyOS, // 15: Freelance OS
  BLUSH_ASSETS.bookStackReader, // 16: Book Tracker
  BLUSH_ASSETS.teamGrowthClimb, // 17: OKRs Tracker
  BLUSH_ASSETS.strategicMazeThinker, // 18: GTD Dashboard
  BLUSH_ASSETS.mathStudyChecklist, // 19: Grocery List
  BLUSH_ASSETS.creativeDesignerCoffee, // 20: All-In-One Meal Planner
  BLUSH_ASSETS.expenseReceiptAlert, // 21: Expense Tracker
  BLUSH_ASSETS.boardroomPieChart, // 22: Budget Tracker
  BLUSH_ASSETS.clientDealHandshake, // 23: CRM Template
  BLUSH_ASSETS.secondBrainMazeBulb, // 24: Goal Tracker
  BLUSH_ASSETS.socialMegaphoneCreator, // 25: Content Calendar
  BLUSH_ASSETS.dualDeskStudio, // 26: Journal
  BLUSH_ASSETS.executiveSofaStrategy, // 27: Gift Tracker
  BLUSH_ASSETS.onlineCourseLecture, // 28: Vocabulary Builder
  BLUSH_ASSETS.videoStudioCreator, // 29: Content OS
];

const ALL_CARD_TINTS: string[] = [
  '#F8F5E8',
  '#EDF5FD',
  '#FFF0E3',
  '#EBF8EF',
  '#F2EEFA',
  '#FEF9E6',
  '#FDF0F5',
];

function resolveTemplateAsset(_slug: string, _category: TemplateCategory, idx: number): string {
  return ALL_30_TEMPLATE_ILLUSTRATIONS[idx % ALL_30_TEMPLATE_ILLUSTRATIONS.length];
}

function resolveTemplateTint(slug: string, _category: TemplateCategory, idx: number): string {
  if (slug === 'second-brain') return '#F8F5E8';
  if (slug === 'finance-tracker') return '#EDF5FD';
  if (slug === 'habit-tracker') return '#EBF8EF';
  if (slug === 'freelance-os') return '#FFF0E3';
  if (slug === 'content-os') return '#F2EEFA';
  return ALL_CARD_TINTS[idx % ALL_CARD_TINTS.length];
}

export const TEMPLATES: Template[] = RAW_TEMPLATES.map((item, idx) => {
  const pro = item.price > 0;
  const slug = toSlug(item.name);
  return {
    id: idx + 1,
    name: item.name,
    slug,
    price: item.price,
    compareAt: item.compareAt,
    pro,
    category: item.category,
    summary:
      item.name === 'Second Brain'
        ? 'An all-in-one Notion system to organize your tasks, projects, goals, and notes.'
        : item.name === 'Finance Tracker'
        ? 'Bring your financials in one place to get the big picture.'
        : `A clean ${item.category.toLowerCase()} Notion template to track and organize your ${item.name.toLowerCase()}.`,
    description: [
      `${item.name} is a ready-to-use Notion template with pre-linked databases, filtered views, and a clean layout. Duplicate it into your Notion workspace in one click and start organizing right away.`,
      pro
        ? `Includes interconnected databases, automated progress rollups, a step-by-step setup guide, and lifetime updates with access to the private Circle community.`
        : `Works on Notion's free plan across desktop, tablet, and mobile with no complex setup required.`,
    ],
    whatsInside: buildWhatsInside(item.name, item.category, pro),
    databaseCount: pro ? (item.price >= 39 ? 8 : 4) : 2,
    viewsCount: pro ? (item.price >= 39 ? 18 : 9) : 4,
    version: pro ? 'v4.2' : 'v2.4',
    illustrationUrl: resolveTemplateAsset(slug, item.category, idx),
    cardTint: resolveTemplateTint(slug, item.category, idx),
  };
});

export const APPS: AppItem[] = [
  {
    name: 'Menu',
    slug: 'menu',
    tagline: 'Your menu for everything.',
    icon: 'grid',
    description:
      'A calm command bar and personal launcher that keeps your daily links, routines, and quick notes one keystroke away.',
    platform: 'Web · macOS · iOS',
    priceLabel: 'Free / $4 mo',
    illustrationUrl: BLUSH_ASSETS.mobileProfileLauncher,
    cardTint: '#EBF8EF',
    features: [
      {
        title: 'Keyboard-First Launcher',
        body: 'Summon your most-used workflows, Notion pages, and snippets in under 50 milliseconds.',
      },
      {
        title: 'Curated Daily Menus',
        body: 'Group actions by context — Morning Routine, Deep Work, or Wind Down — with zero visual clutter.',
      },
      {
        title: 'Instant Sync',
        body: 'Changes propagate across desktop and mobile automatically with offline-first local storage.',
      },
    ],
  },
  {
    name: 'Journal',
    slug: 'journal',
    tagline: 'Simple, intuitive journaling.',
    icon: 'book',
    description:
      'A distraction-free daily writing space with guided evening reflections, streak tracking, and plain-text export.',
    platform: 'Web · iOS · Android',
    priceLabel: 'Free / $3 mo',
    illustrationUrl: BLUSH_ASSETS.relaxedFloorReader,
    cardTint: '#F2EEFA',
    features: [
      {
        title: 'One-Page Daily Canvas',
        body: 'Open the app and start typing immediately. No nested folders or formatting toolbars in your way.',
      },
      {
        title: 'Mindful Prompts',
        body: 'Rotate through curated morning clarity and evening review questions designed for 3-minute reflection.',
      },
      {
        title: 'Private & Exportable',
        body: 'End-to-end encrypted entries with one-click export to Markdown or Notion.',
      },
    ],
  },
  {
    name: 'Experiments',
    slug: 'experiments',
    tagline: 'Live life as an experiment.',
    icon: 'flask',
    description:
      'Design 7-day, 14-day, and 30-day personal habits as structured hypotheses, track daily adherence, and review clear outcomes.',
    platform: 'Web · iOS',
    priceLabel: 'Free / $5 mo',
    illustrationUrl: BLUSH_ASSETS.vrIdeaLab,
    cardTint: '#FDF0F5',
    features: [
      {
        title: 'Hypothesis-Driven Habits',
        body: 'Frame routines as testable experiments with a clear duration, daily check-in, and measurable result.',
      },
      {
        title: 'Visual Adherence Grid',
        body: 'Spot patterns at a glance with a monochrome contribution matrix and completion rate metrics.',
      },
      {
        title: 'Post-Experiment Retrospectives',
        body: 'Decide what to keep, adjust, or discard at the end of each cycle.',
      },
    ],
  },
  {
    name: 'SyncTasks',
    slug: 'sync-tasks',
    tagline: 'A minimalist to-do app.',
    icon: 'check-circle',
    description:
      'Fast, plain-text task management with two-way Notion database synchronization and natural-language due dates.',
    platform: 'Web · macOS · iOS',
    priceLabel: 'Free / $5 mo',
    illustrationUrl: BLUSH_ASSETS.yellowClockTasks,
    cardTint: '#FEF9E6',
    features: [
      {
        title: 'Two-Way Notion Sync',
        body: 'Check off a task in SyncTasks and watch your Notion Second Brain or Task Tracker update in real time.',
      },
      {
        title: 'Today & Someday Views',
        body: 'Keep your daily list intentionally short while holding backlog items safely out of sight.',
      },
      {
        title: 'Offline Speed',
        body: 'Instant startup and zero loading spinners whether you are on a flight or at your desk.',
      },
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is a Notion template?',
    answer:
      'A Notion template is a ready-made workspace you can duplicate into your own Notion account in one click. Instead of building a system from scratch, you start with a finished structure — databases, views, and dashboards — and customize it to fit the way you work.',
  },
  {
    question: 'Why pay for Notion templates?',
    answer:
      'Paid templates are complete, refined systems that save you dozens of hours of setup. You get lifetime access, free future updates, and a structure that has been tested and improved over years of daily use — while supporting an independent creator.',
  },
  {
    question: 'Can I use this with a free Notion account?',
    answer:
      "Yes. Every template works on Notion's free Personal plan. No paid Notion subscription is required to duplicate or use any template in the shop.",
  },
  {
    question: 'How can I access the private Circle community?',
    answer:
      "Every paid template includes access to the private Circle community. You'll find your invite link in your purchase receipt and in your account dashboard after signing in.",
  },
  {
    question: 'Do you offer educational or nonprofit discounts?',
    answer:
      "Yes. Students, educators, and registered nonprofits can request a discount. Get in touch from your institutional email address with proof of status, and we'll send you a discount code.",
  },
  {
    question: 'What is your refund policy?',
    answer:
      'Because templates are digital products delivered instantly, all sales are final. If a template arrives broken or not as described, contact support within 14 days of purchase and we will make it right.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How I organize my life in Notion',
    slug: 'how-i-organize-my-life-in-notion',
    date: 'October 28, 2026',
    readTime: '5 min read',
    category: 'Systems',
    excerpt:
      'A look inside the four interconnected databases — Projects, Areas, Resources, and Archive — that run my entire personal and creative workflow.',
    paragraphs: [
      'Most Notion workspaces fail for one simple reason: they prioritize decoration over retrieval. When you spend more time maintaining cover banners and widgets than capturing real work, the system becomes a chore rather than a tool.',
      'Over the past four years, I have stripped my personal workspace down to four core databases modeled on Tiago Forte’s PARA method: Projects, Areas, Resources, and Archive — paired with a single unified Task & Note inbox.',
      'Every morning starts on a single Today dashboard. It surfaces only tasks due today, active projects in progress, and a quick-capture scratchpad. Everything else stays tucked away until my weekly review on Sunday evening.',
      'When building your own system, resist adding a new database until an existing one breaks. Monochrome formatting, consistent property naming, and one-click filters will outlast complex formulas every single time.',
    ],
    takeaways: [
      'Capture everything into one unified Inbox before sorting by project or area.',
      'Limit your daily dashboard to Today’s tasks and active projects.',
      'Schedule a 15-minute Sunday review to clear your inbox and archive completed work.',
    ],
  },
  {
    title: 'The 12 Week Year, explained',
    slug: 'the-12-week-year-explained',
    date: 'September 19, 2026',
    readTime: '4 min read',
    category: 'Productivity',
    excerpt:
      'Why annual goals create a false sense of time — and how compressing your execution horizon to 12 weeks transforms focus.',
    paragraphs: [
      'Annual planning has a structural flaw: in January, December feels infinitely far away. That distance breeds procrastination until the final quarter of the year.',
      'In The 12 Week Year, Brian Moran proposes replacing annual goals with 12-week execution sprints. In this model, a week is no longer 1/52nd of a year — a week is an entire month of your 12-week cycle.',
      'To put this into practice in Notion, pick no more than two primary goals for the next 12 weeks. Break each goal down into recurring weekly lead indicators (actions you control directly) rather than lag indicators (results you hope for).',
      'At the end of week 12, take a 7-day buffer week to review your execution score, celebrate progress, and reset your workspace for the next sprint.',
    ],
    takeaways: [
      'Choose 1 to 2 high-leverage goals per 12-week cycle.',
      'Track weekly lead actions (e.g., "Write 3 drafts/week") alongside outcomes.',
      'Score your weekly execution percentage every Friday afternoon.',
    ],
  },
  {
    title: 'Digital minimalism for your phone',
    slug: 'digital-minimalism-for-your-phone',
    date: 'August 11, 2026',
    readTime: '3 min read',
    category: 'Minimalism',
    excerpt:
      'Practical steps to turn your smartphone from an attention slot machine back into a calm, intentional tool.',
    paragraphs: [
      'Your phone screen is the most contested real estate in your life. Every red badge, algorithmic feed, and colorful app icon is engineered to trigger an impulsive check.',
      'Reclaiming your attention does not require throwing away your smartphone. Start by removing every social and news app from your home screen, leaving only utilities: Calendar, Notes, Maps, and your task manager.',
      'Switch your wallpaper to a solid monochrome background and enable a grayscale color filter via your phone’s accessibility shortcut. Without candy-colored triggers, screen time drops naturally within 48 hours.',
      'Pair a quiet home screen with intentional check-in windows — and let your phone serve your schedule instead of dictating it.',
    ],
    takeaways: [
      'Keep your primary home screen limited to 4–6 essential utility apps.',
      'Disable non-human notifications (keep only direct messages and calendar alerts).',
      'Use a clean monochrome wallpaper and accessibility grayscale shortcut.',
    ],
  },
];

export const UPDATES_LIST: UpdateEntry[] = [
  {
    version: '2026.11',
    date: 'November 2026',
    title: 'Second Brain 5.0 & Instant Automated Delivery',
    changes: [
      'Introduced one-click Notion Workspace Duplicator and instant license provisioning across all 39 templates.',
      'Added native Stripe & Lemon Squeezy multi-currency checkout with instant receipt generation.',
      'Refined Second Brain mobile quick-capture view and automated weekly review formulas.',
    ],
  },
  {
    version: '2026.08',
    date: 'August 2026',
    title: 'Finance Tracker Multi-Account Rollups',
    changes: [
      'Added automated net-worth tracking and recurring subscription renewal alerts.',
      'New grayscale chart views compatible with Notion native charts.',
      'Added Payday Budget and Savings Tracker 2.0 updates for all existing customers.',
    ],
  },
  {
    version: '2026.05',
    date: 'May 2026',
    title: 'SyncTasks & Experiments Web Apps Launch',
    changes: [
      'Launched SyncTasks with real-time two-way Notion database synchronization.',
      'Released Experiments app for tracking 7-day and 30-day habit hypotheses.',
      'Added global Ctrl+M navigation command overlay across the storefront.',
    ],
  },
  {
    version: '2026.01',
    date: 'January 2026',
    title: '2026 Template Catalog Refresh',
    changes: [
      'Updated all 22 free templates and 17 PRO systems for Notion’s latest database layout engine.',
      'Added Dopamine Menu, Prompts Library, and Running Tracker to the free collection.',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    quote:
      'Before switching to Second Brain, our product notes lived across four disconnected apps. Consolidating into Lumina’s PARA workspace cut our weekly planning overhead by 4.5 hours and gave every project a single source of truth.',
    outcomeMetric: '4.5 hrs saved weekly',
    author: 'Elena Rostova',
    role: 'Staff Product Designer',
    organization: 'Linearity Studio',
    templateUsed: 'Second Brain',
    templateSlug: 'second-brain',
    surfaceTint: '#F8F7F3',
    accentInk: '#37352F',
    illustrationUrl: BLUSH_ASSETS.creativeDesignerCoffee,
  },
  {
    id: 'rev-2',
    quote:
      'I tried complex spreadsheets for years and always abandoned them by February. The All-In-One Finance Tracker took ten minutes to duplicate, surfaced $340 in forgotten monthly subscriptions, and raised my savings rate from 22% to 41%.',
    outcomeMetric: '+19% savings rate in 90 days',
    author: 'Marcus Vance',
    role: 'Principal Engineer',
    organization: 'Vance Systems',
    templateUsed: 'Finance Tracker',
    templateSlug: 'finance-tracker',
    surfaceTint: '#F4F6F8',
    accentInk: '#1A2A52',
    illustrationUrl: BLUSH_ASSETS.teamGrowthClimb,
  },
  {
    id: 'rev-3',
    quote:
      'Running a solo design consultancy meant client proposals, invoices, and deliverables were constantly slipping. Freelance OS turned my chaotic Notion sidebar into a calm executive dashboard that helped me close $48k in retainer work.',
    outcomeMetric: '12 client pipelines unified',
    author: 'Sora Takahashi',
    role: 'Founder & Creative Director',
    organization: 'Atelier Koto',
    templateUsed: 'Freelance OS',
    templateSlug: 'freelance-os',
    surfaceTint: '#F4F7F4',
    accentInk: '#254232',
    illustrationUrl: BLUSH_ASSETS.clientDealHandshake,
  },
  {
    id: 'rev-4',
    quote:
      'Compressing annual goals into 12-week sprints changed how I write and ship research. The minimalist layout removes every decorative distraction so I can open Notion at 7 AM and execute immediately.',
    outcomeMetric: '94% weekly task completion',
    author: 'Dr. Julian Mercer',
    role: 'Computational Fellow',
    organization: 'ETH Zurich',
    templateUsed: '12 Week Year Planner',
    templateSlug: '12-week-year-planner',
    surfaceTint: '#F7F5F8',
    accentInk: '#391C57',
    illustrationUrl: BLUSH_ASSETS.executiveSofaStrategy,
  },
];

