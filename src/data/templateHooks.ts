export interface TemplateInsideItem {
  name: string;
  whatItDoes: string;
}

export interface TemplateHookProfile {
  cardHook: string;
  heroHeadline: string;
  heroLead: string;
  painPoint: string;
  payoff: string;
  setupTime: string;
  buyerSignal: string;
  insideItems: TemplateInsideItem[];
  samplePreviewRows: Array<{
    title: string;
    meta: string;
    status: string;
    done?: boolean;
  }>;
}

export const TEMPLATE_HOOKS: Record<string, TemplateHookProfile> = {
  'task-tracker': {
    cardHook: 'Stop staring at 40 tasks wondering what to do first.',
    heroHeadline: 'Finish your top three—without the 40-item guilt list.',
    heroLead:
      'One clean Notion queue that hides backlog noise and puts only today’s real priorities in front of you.',
    painPoint: 'Endless to-do lists where urgent work hides under chores.',
    payoff: 'Today-only focus view with 1-click inbox triage.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Replaces messy sticky notes & 3 task apps',
    insideItems: [
      { name: 'Today Focus View', whatItDoes: 'Shows only tasks due today—nothing else.' },
      { name: 'Quick-Capture Inbox', whatItDoes: 'Dump thoughts fast and sort them later.' },
      { name: 'Priority Matrix', whatItDoes: 'Separates P1 needle-movers from low-stakes busywork.' },
      { name: 'Done Archive', whatItDoes: 'Auto-clears finished work so your list stays light.' },
    ],
    samplePreviewRows: [
      { title: 'Send revised homepage draft to client', meta: 'P1 · Today', status: 'In Progress' },
      { title: 'Book dentist appointment', meta: 'P2 · Today', status: 'Next Up' },
      { title: 'Clear 14 inbox captures', meta: 'Routine · 10 min', status: 'Done', done: true },
    ],
  },
  'dopamine-menu': {
    cardHook: 'Replace doomscrolling with Today’s Plate, Mood Match, and Craving Swaps.',
    heroHeadline: 'Stop trading your best afternoons to your phone.',
    heroLead:
      'A personal Notion menu with Today’s Plate, 3-minute Reset cards, Mood Match, Craving Swaps, and formula Pick Scores.',
    painPoint: 'Opening social feeds "for 2 minutes" and losing an hour.',
    payoff: 'Matched 3-to-60 minute resets ranked by real mood lift and win rate.',
    setupTime: '2-min setup',
    buyerSignal: '10 Notion views · Order Log + Insights included',
    insideItems: [
      { name: "Today's Plate & Reset Now", whatItDoes: 'Appetizer, Entrée, Side, Dessert board plus 3–10 min quick resets.' },
      { name: 'Top Picks Formula Table', whatItDoes: 'Auto Pick Score, Keeper/Works verdicts, and average mood lift.' },
      { name: 'Mood Match Kanban', whatItDoes: 'Pick what fits Anxious, Bored, Fried, Lonely, or Overstimulated.' },
      { name: 'Craving Swaps Board', whatItDoes: 'Swap Doomscrolling, Binge Watching, or Impulse Ordering instantly.' },
      { name: '5 Live KPIs & Mood Chart', whatItDoes: 'Track 7d orders, win rate, swaps, 30d spend, and mood triggers.' },
    ],
    samplePreviewRows: [
      { title: 'One song, eyes closed (3 min · Restores)', meta: 'Appetizer · Keeper', status: 'Pick Score 6' },
      { title: 'Cold shower + 10 pushups (5 min · Restores)', meta: 'Reset Now · Keeper', status: 'Pick Score 8' },
      { title: 'Gym session (60 min · Restores)', meta: 'Entrée · Avg Lift +3.00', status: 'Logged', done: true },
    ],
  },
  'travel-planner': {
    cardHook: 'Control Tower, Readiness bars, spend charts, and trip timeline in one hub.',
    heroHeadline: 'Land knowing every booking, visa, budget, and day plan.',
    heroLead:
      'Track active trips with live readiness bars, spend-by-category donuts, payment rails, packing checklists, and an offline document vault.',
    painPoint: 'Hunting through 19 booking emails, messy budgets, and forgotten packing lists.',
    payoff: 'Control Tower readiness bars, live spend charts, timeline Gantt, and Vault.',
    setupTime: '2-min setup',
    buyerSignal: 'Trips · Itinerary · Places · Packing · Vault · Wallet',
    insideItems: [
      { name: 'Control Tower & Trip Cards', whatItDoes: 'Live countdowns, visual readiness bars, budget health, and visa status.' },
      { name: 'Wallet & Spend Charts', whatItDoes: 'Donut breakdown by Travel/Stay/Other plus Payment Rails bar chart.' },
      { name: 'Monthly Trip Timeline', whatItDoes: 'Gantt calendar with live Today marker and trip completion bars.' },
      { name: 'Packing & Document Vault', whatItDoes: 'Reusable checklists, weight status, passports, visas, and boarding passes.' },
      { name: 'Day Plans & Saved Places', whatItDoes: 'Day-by-day itinerary linked to neighborhood food and sight pins.' },
    ],
    samplePreviewRows: [
      { title: 'Goa · November — North Goa (Today)', meta: 'Control Tower · Visa Approved', status: '58% Ready' },
      { title: 'Manali · March — Manali + Solang', meta: 'Control Tower · Visa To Do', status: 'Planning' },
      { title: 'Spend by Category (₹16,150 / ₹65,000)', meta: 'Wallet · On Track', status: 'Tracked', done: true },
    ],
  },
  'travel-dashboard': {
    cardHook: 'Plan multi-city trips, split costs, and map saved spots.',
    heroHeadline: 'Plan multi-stop trips without 24 browser tabs.',
    heroLead:
      'Link bucket-list cities, live exchange budgets, restaurant pins, and daily transit legs inside one reusable travel hub.',
    painPoint: 'Half your trip plans in Google Maps, half in spreadsheets, half in notes.',
    payoff: 'Every trip, city guide, packing preset, and expense rolled into one hub.',
    setupTime: '3-min setup',
    buyerSignal: 'Reusable across every future trip',
    insideItems: [
      { name: 'Multi-Trip Hub', whatItDoes: 'Track upcoming, bucket-list, and past trips together.' },
      { name: 'City Spots & Cafes', whatItDoes: 'Filterable neighborhood guide for food and sights.' },
      { name: 'Expense & FX Ledger', whatItDoes: 'Track actual vs. planned spend across currencies.' },
      { name: 'Transit & Doc Locker', whatItDoes: 'Visa notes, train passes, and emergency contacts.' },
    ],
    samplePreviewRows: [
      { title: 'London → Paris Eurostar 09:31', meta: 'Transit · Seat 42', status: 'Confirmed', done: true },
      { title: 'Marais Specialty Coffee & Bookshop Walk', meta: 'Paris · 8 Pins', status: 'Saved' },
      { title: '10-Day Europe Budget ($2,480 / $3,000)', meta: 'FX Tracker · 82%', status: 'On Track' },
    ],
  },
  'project-tracker': {
    cardHook: 'See which projects are moving—and which quietly stalled.',
    heroHeadline: 'Stop starting ten projects and finishing two.',
    heroLead:
      'Connect every active project to its exact next action and deadline bar so nothing silently slips a month behind.',
    painPoint: 'Projects stall because the next physical step is buried in docs.',
    payoff: 'Live completion bars auto-calculated from linked tasks.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Auto-rollup progress bars included',
    insideItems: [
      { name: 'Active Projects Board', whatItDoes: 'See Planned, In Progress, and Shipped at a glance.' },
      { name: 'Auto-Progress Rollups', whatItDoes: 'Bars advance automatically as you check off tasks.' },
      { name: 'Project Timeline View', whatItDoes: 'Spot overlapping deadlines before weeks collide.' },
      { name: 'Kickoff Brief Template', whatItDoes: 'Define scope, outcome, and deadline in 60 seconds.' },
    ],
    samplePreviewRows: [
      { title: 'Q4 Portfolio Site Refresh', meta: '7 / 9 tasks · 78%', status: 'Active' },
      { title: 'Launch Weekly Newsletter', meta: '4 / 8 tasks · 50%', status: 'Active' },
      { title: 'Migrate Cloud Backups', meta: '6 / 6 tasks · 100%', status: 'Shipped', done: true },
    ],
  },
  '12-week-year-planner': {
    cardHook: 'Treat every week like a month—and get a year done in 90 days.',
    heroHeadline: 'Do more in 12 weeks than most do in 12 months.',
    heroLead:
      'Replace vague annual resolutions with 12-week execution sprints, weekly lead tactics, and an automatic Friday scorecard.',
    painPoint: 'January goals die by March because December feels too far away.',
    payoff: 'Weekly execution score (aim for 85%+) keeps momentum real.',
    setupTime: '5-min setup',
    buyerSignal: '94% weekly tactic clarity for solo builders',
    insideItems: [
      { name: '12-Week Vision & Goals', whatItDoes: 'Lock in 1–3 high-leverage outcomes for this cycle.' },
      { name: 'Weekly Tactic Scorecard', whatItDoes: 'Auto-calculates your exact % execution every Friday.' },
      { name: 'Lead vs. Lag Tracker', whatItDoes: 'Measures daily actions you control, not wishful results.' },
      { name: 'Week 13 Buffer Review', whatItDoes: 'Guided retrospective before launching your next sprint.' },
    ],
    samplePreviewRows: [
      { title: 'Week 07 Execution Score — 89%', meta: '8 / 9 tactics hit', status: 'On Track', done: true },
      { title: 'Publish 3 long-form essays (2/3 done)', meta: 'Goal 1 · Lead Tactic', status: 'In Progress' },
      { title: 'Complete 4 strength sessions (3/4 done)', meta: 'Goal 2 · Lead Tactic', status: 'In Progress' },
    ],
  },
  'savings-tracker': {
    cardHook: 'Watch your emergency fund and big goals fill up visually.',
    heroHeadline: 'Save faster when every dollar has a finish line.',
    heroLead:
      'Split savings into named buckets—emergency fund, travel, house deposit—with automatic progress bars and target dates.',
    painPoint: 'One lump savings account makes it too easy to dip in.',
    payoff: 'Named sinking funds with clear % progress toward every milestone.',
    setupTime: '2-min setup',
    buyerSignal: 'Works on Notion Free forever',
    insideItems: [
      { name: 'Savings Buckets Grid', whatItDoes: 'Visual % bars for Emergency, Travel, and Big Buys.' },
      { name: 'Deposit Ledger', whatItDoes: 'Log transfers in 10 seconds—totals update automatically.' },
      { name: 'Monthly Target Math', whatItDoes: 'Shows how much to set aside each month to hit your date.' },
      { name: 'Milestone Checkpoints', whatItDoes: 'Marks 25%, 50%, 75%, and 100% funded states.' },
    ],
    samplePreviewRows: [
      { title: '6-Month Emergency Reserve', meta: '$13,500 / $18,000 · 75%', status: 'On Track' },
      { title: 'Autumn Japan Trip Fund', meta: '$3,200 / $3,500 · 91%', status: 'Almost There' },
      { title: 'New Studio Laptop Fund', meta: '$2,400 / $2,400 · 100%', status: 'Funded', done: true },
    ],
  },
  'payday-budget': {
    cardHook: 'Tell every paycheck where to go before it vanishes.',
    heroHeadline: 'Stop wondering where your paycheck went by week two.',
    heroLead:
      'Give every dollar a job the day you get paid—fixed bills, guilt-free spending, and savings allocated in five minutes flat.',
    painPoint: 'Checking your balance mid-month and feeling blindsided.',
    payoff: 'Zero-based paycheck plan showing exact leftover safe-to-spend.',
    setupTime: '3-min setup',
    buyerSignal: 'Built for bi-weekly & monthly paydays',
    insideItems: [
      { name: 'Paycheck Allocation Sheet', whatItDoes: 'Splits every payday into Bills, Needs, Wants, and Savings.' },
      { name: 'Bill Due-Date Checklist', whatItDoes: 'Check off rent, utilities, and auto-pays per pay cycle.' },
      { name: 'Safe-to-Spend Counter', whatItDoes: 'Know your true guilt-free cash after obligations.' },
      { name: 'Payday History Rollup', whatItDoes: 'Compare savings rate across every paycheck of the year.' },
    ],
    samplePreviewRows: [
      { title: 'Nov 15 Paycheck — $3,400 Allocated', meta: 'Savings 24% · Bills Paid', status: 'Balanced', done: true },
      { title: 'Rent & Internet Auto-Pay', meta: '$1,520 · Fixed', status: 'Cleared', done: true },
      { title: 'Remaining Safe-to-Spend', meta: '$410 left for 9 days', status: 'Healthy' },
    ],
  },
  'prompts-library': {
    cardHook: 'Stop rewriting the same AI prompts from scratch every day.',
    heroHeadline: 'Keep your best prompts one search away—never buried in chat logs.',
    heroLead:
      'Tag, version, and copy-paste your highest-performing writing, coding, and research prompts in seconds.',
    painPoint: 'Scrolling 40 old AI chats trying to find that one prompt that worked.',
    payoff: 'Searchable prompt vault sorted by use case, model, and output quality.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Saves hours of prompt trial-and-error',
    insideItems: [
      { name: 'Copy-Ready Prompt Cards', whatItDoes: 'Store variables like [Audience] and [Tone] cleanly.' },
      { name: 'Role & Workflow Tags', whatItDoes: 'Filter by Writing, Code Review, Strategy, or Study.' },
      { name: 'Output Rating Log', whatItDoes: 'Keep only 5-star prompts and retire weak drafts.' },
      { name: 'Prompt Chain Templates', whatItDoes: 'Multi-step sequences for deep research and editing.' },
    ],
    samplePreviewRows: [
      { title: 'Editorial Line-Editor (Cut Fluff & Clichés)', meta: 'Writing · 5★ Tested', status: 'Favorite', done: true },
      { title: 'PR Security & Edge-Case Auditor', meta: 'Coding · 5★ Tested', status: 'Favorite', done: true },
      { title: 'Customer Interview Synthesis Matrix', meta: 'Research · v2', status: 'Active' },
    ],
  },
  'knowledge-base': {
    cardHook: 'Capture articles, books, and notes you will actually find again.',
    heroHeadline: 'Stop saving bookmarks you never open again.',
    heroLead:
      'Turn scattered highlights, SOPs, and web clippings into a searchable Notion library linked to your real projects.',
    painPoint: '200 browser bookmarks and 400 notes—none of them findable when needed.',
    payoff: 'Clean topic index with Inbox → Evergreen synthesis workflow.',
    setupTime: '2-min setup',
    buyerSignal: 'Replaces Readwise clutter & messy folders',
    insideItems: [
      { name: 'Topic & Resource Index', whatItDoes: 'Group insights by theme instead of burying them in dates.' },
      { name: 'Reading & Clipping Inbox', whatItDoes: 'Capture links fast and distill keepers once a week.' },
      { name: 'Evergreen Note Cards', whatItDoes: 'One sharp takeaway per card for instant reuse.' },
      { name: 'Pinned Playbooks', whatItDoes: 'Keep high-frequency guides locked at the top.' },
    ],
    samplePreviewRows: [
      { title: 'Pricing Anchor & Tiering Playbook', meta: 'Strategy · Evergreen', status: 'Pinned', done: true },
      { title: 'PostgreSQL Indexing Cheatsheet', meta: 'Engineering · Reference', status: 'Evergreen' },
      { title: 'Landing Page Teardown Notes (12 examples)', meta: 'Design · To Distill', status: 'Inbox' },
    ],
  },
  'second-brain': {
    cardHook: 'Empty your head in 5 seconds. Find any note or task in 3.',
    heroHeadline: 'Your head is for having ideas—not holding them.',
    heroLead:
      'One calm PARA system connecting Tasks, Projects, Areas, Resources, and Notes—so Monday morning takes two minutes, not two hours.',
    painPoint: 'Notes in Apple Notes, tasks in Todoist, docs in Drive—nothing connected.',
    payoff: 'One fast inbox that routes every idea into active projects and weekly reviews.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Flagship bestseller · Half off ($39 vs $79)',
    insideItems: [
      { name: 'Unified Quick-Capture Inbox', whatItDoes: 'Dump tasks, notes, and links from desktop or phone in 5 seconds.' },
      { name: 'Projects & Tasks Engine', whatItDoes: 'Today view + auto-progress bars linked to your real goals.' },
      { name: 'Full PARA Architecture', whatItDoes: 'Projects, Areas, Resources, and Archive connected cleanly.' },
      { name: '10-Minute Sunday Reset', whatItDoes: 'Guided weekly checklist that clears clutter before Monday.' },
      { name: 'Notes & Book Library', whatItDoes: 'Keep highlights and frameworks one search away from active work.' },
      { name: 'Goals & Milestone Tracker', whatItDoes: 'Tie daily actions directly to quarterly outcomes.' },
    ],
    samplePreviewRows: [
      { title: 'Q4 Product Launch Plan', meta: 'Project · 8 / 10 tasks', status: 'Active' },
      { title: 'Sunday Weekly Reset (Inbox Zero)', meta: 'Routine · 10 min', status: 'Ready' },
      { title: 'Design Systems & Copy Vault', meta: 'Area · 24 evergreen notes', status: 'Synced', done: true },
    ],
  },
  'habit-tracker': {
    cardHook: 'See your streak on one screen—because you won’t break what you see.',
    heroHeadline: 'Build daily rituals without bloated habit apps.',
    heroLead:
      'One tap per morning on phone or desktop—watch weekly completion percentages climb automatically.',
    painPoint: 'Skipping two days and forgetting the habit existed altogether.',
    payoff: 'Visual daily checkboxes with automatic weekly % consistency scores.',
    setupTime: '60-sec duplicate',
    buyerSignal: '1-tap mobile check-in view included',
    insideItems: [
      { name: 'Daily Check-In Grid', whatItDoes: 'Tap once per habit—no extra screens or popups.' },
      { name: 'Weekly % Score Formula', whatItDoes: 'Auto-calculates consistency across every 7-day block.' },
      { name: 'Streak & Miss Log', whatItDoes: 'Spot which weekday breaks your routine and fix it.' },
      { name: 'Mobile Quick-Button', whatItDoes: 'Generates today’s row in one click every morning.' },
    ],
    samplePreviewRows: [
      { title: 'Morning 20m Walk + Sunlight', meta: '6 / 7 days · 86%', status: 'Streak 14d', done: true },
      { title: 'Read 20 Pages Before Bed', meta: '7 / 7 days · 100%', status: 'Streak 21d', done: true },
      { title: 'No Phone First 45 Minutes', meta: '5 / 7 days · 71%', status: 'Active' },
    ],
  },
  'wheel-of-life-template': {
    cardHook: 'Score 8 life areas in 5 minutes and see what you’re neglecting.',
    heroHeadline: 'See which part of life is thriving—and which needs you now.',
    heroLead:
      'Rate Career, Health, Money, Relationships, and Fun on a 1–10 monthly check-in so work never quietly swallows everything else.',
    painPoint: 'Crushing career goals while health or friendships quietly slip to a 3/10.',
    payoff: 'Quarterly balance snapshot with 1 concrete action per low-scoring area.',
    setupTime: '2-min setup',
    buyerSignal: 'Used for quarterly & New Year resets',
    insideItems: [
      { name: '8-Area Life Audit', whatItDoes: 'Score Health, Career, Finance, Love, Friends, Growth, Fun, Home.' },
      { name: 'Quarter-over-Quarter Log', whatItDoes: 'Compare past scores to see real life trajectory.' },
      { name: 'Lowest-Score Action Prompt', whatItDoes: 'Turns your #1 neglected area into a 30-day fix.' },
      { name: 'Reflection Journal', whatItDoes: 'Short 3-question monthly clarity check-in.' },
    ],
    samplePreviewRows: [
      { title: 'Career & Craft — 8.5 / 10', meta: 'Up +1.0 vs Q3', status: 'Strong', done: true },
      { title: 'Health & Energy — 7.5 / 10', meta: 'Steady · 4x training', status: 'Healthy', done: true },
      { title: 'Rest & Play — 5.0 / 10', meta: 'Priority fix: plan 1 weekend trip', status: 'Focus Next' },
    ],
  },
  'habit-journal': {
    cardHook: 'Pair daily habit streaks with 2-minute reflection prompts.',
    heroHeadline: 'Know not just whether you showed up—but why.',
    heroLead:
      'Combine effortless habit checkboxes with mood, energy, and evening wins so you learn what actually fuels good days.',
    painPoint: 'Tracking checkboxes without seeing why energy crashes on Thursdays.',
    payoff: 'Habits + 3-line daily reflection linked on one peaceful page.',
    setupTime: '2-min setup',
    buyerSignal: 'Takes under 3 minutes a night',
    insideItems: [
      { name: 'Daily Habit + Mood Entry', whatItDoes: 'Log rituals alongside energy score (1–5) in one card.' },
      { name: '3-Line Evening Prompt', whatItDoes: 'Win of the day, friction point, and tomorrow’s #1 focus.' },
      { name: 'Monthly Pattern Gallery', whatItDoes: 'Scan your best weeks and repeat what worked.' },
      { name: '1-Click New Day Button', whatItDoes: 'Spawns a clean pre-formatted entry every morning.' },
    ],
    samplePreviewRows: [
      { title: 'Nov 21 — Deep focus morning, 5/5 energy', meta: 'Habits 6/6 · 8h sleep', status: 'Logged', done: true },
      { title: 'Nov 20 — Late coffee hurt sleep score', meta: 'Habits 4/6 · 6.5h sleep', status: 'Insight' },
      { title: 'Weekly Pattern: 8h sleep = 2x output', meta: 'Monthly Review', status: 'Pinned', done: true },
    ],
  },
  'symptom-tracker': {
    cardHook: 'Walk into doctor visits with clear dates, triggers, and patterns.',
    heroHeadline: 'Spot health triggers instead of guessing from memory.',
    heroLead:
      'Log symptoms, severity, meals, sleep, and meds in 20 seconds—so you have a clean timeline ready for any appointment.',
    painPoint: 'Forgetting when flare-ups started the moment a doctor asks.',
    payoff: 'Filterable symptom log with severity levels and printable summary view.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Private in your own Notion workspace',
    insideItems: [
      { name: '20-Second Symptom Log', whatItDoes: 'Record date, severity (1–5), duration, and likely triggers.' },
      { name: 'Trigger & Food Tags', whatItDoes: 'Spot repeat patterns across sleep, stress, or diet.' },
      { name: 'Medication & Relief Log', whatItDoes: 'Track what actually helped and how fast.' },
      { name: 'Doctor Visit Summary', whatItDoes: 'Clean 30-day filtered table ready to share or print.' },
    ],
    samplePreviewRows: [
      { title: 'Tension Headache · Severity 2/5', meta: 'Trigger: 6h sleep + screen', status: 'Resolved', done: true },
      { title: 'Afternoon Energy Dip · Severity 3/5', meta: 'Trigger: Skipped lunch', status: 'Noted' },
      { title: '30-Day Doctor Summary View', meta: '4 entries · Ready to export', status: 'Updated', done: true },
    ],
  },
  'freelance-os': {
    cardHook: 'Run a solo studio like an agency—and never chase a late invoice again.',
    heroHeadline: 'Run your studio like a $200k agency—without hiring one.',
    heroLead:
      'Clients, proposals, project sprints, billable hours, unpaid invoices, and contracts wired into one calm Notion home.',
    painPoint: 'Proposals in Docs, hours in spreadsheets, and overdue invoices forgotten.',
    payoff: '11 studio modules + 18 linked DBs showing unpaid cash & deadlines first.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Saves 40+ hrs setup · 18 linked DBs',
    insideItems: [
      { name: 'Main Studio Hub', whatItDoes: 'Unpaid invoices, overdue alerts, and today’s follow-ups upfront.' },
      { name: 'Clients & Pipeline CRM', whatItDoes: 'Track warm leads, proposals, retainers, and contacts per client.' },
      { name: '3-Mode Project Boards', whatItDoes: 'Simple, Complete, or Advanced sprint views + timelines.' },
      { name: 'Invoices & Overdue Aging', whatItDoes: 'Auto-flags late payments plus clean monthly P&L rollups.' },
      { name: 'Time & Margin Logger', whatItDoes: '0.25h session tracker revealing your true effective hourly rate.' },
      { name: 'Legals, ICE Ideas & OKRs', whatItDoes: 'MSA/SOW renewals, ICE idea scorer, and annual roadmap.' },
    ],
    samplePreviewRows: [
      { title: 'Northstar Labs · Sprint 4 Invoice ($2,400)', meta: 'Due Today · Auto-aging', status: 'Action' },
      { title: 'Kora AI Design System Handoff', meta: 'Retainer · 85% complete', status: 'Active' },
      { title: 'Effective Studio Rate — $142/hr', meta: '28.5 billable hrs logged', status: 'Healthy', done: true },
    ],
  },
  'book-tracker': {
    cardHook: 'Track what you’re reading, rate finishes, and keep favorite quotes.',
    heroHeadline: 'Remember the books you read—not just the covers.',
    heroLead:
      'A clean, zero-clutter Notion bookshelf for your current reads, TBR queue, star ratings, and chapter takeaways.',
    painPoint: 'Finishing a great book and blanking on it a month later.',
    payoff: 'Bookshelf gallery + simple quote & takeaway notes per title.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Free forever · Instant Notion duplicate',
    insideItems: [
      { name: 'Currently Reading Shelf', whatItDoes: 'Track page progress on active books without clutter.' },
      { name: 'Clean TBR Queue', whatItDoes: 'Capture recommendations before you forget who suggested them.' },
      { name: 'Ratings & Review Log', whatItDoes: 'Rate finished books and store 3 key takeaways each.' },
      { name: 'Yearly Reading Counter', whatItDoes: 'Watch your annual book total tick up automatically.' },
    ],
    samplePreviewRows: [
      { title: 'Deep Work — Cal Newport', meta: 'Finished · 5★ · 4 takeaways', status: 'Finished', done: true },
      { title: 'The Creative Act — Rick Rubin', meta: 'Page 142 / 406 · 35%', status: 'Reading' },
      { title: 'A Wizard of Earthsea — Ursula Le Guin', meta: 'Fantasy · Owned', status: 'Up Next' },
    ],
  },
  'okrs-tracker': {
    cardHook: 'Connect quarterly objectives to measurable weekly key results.',
    heroHeadline: 'Stop setting quarterly goals you only read on day one.',
    heroLead:
      'Link 3–5 quarterly objectives directly to live % Key Results and active projects—so progress is visible every Monday.',
    painPoint: 'Goals sit forgotten in a slide deck while daily tasks drift.',
    payoff: 'Auto-calculated Objective % progress rolled up from real Key Results.',
    setupTime: '3-min setup',
    buyerSignal: 'Built for founders & small teams',
    insideItems: [
      { name: 'Quarterly OKR Scorecard', whatItDoes: 'Auto-averages Key Result % into live Objective health.' },
      { name: 'At-Risk Radar', whatItDoes: 'Flags lagging KRs early while there is still time to course-correct.' },
      { name: 'Linked Projects View', whatItDoes: 'Proves every active project actually moves a Key Result.' },
      { name: 'Quarterly Grading Review', whatItDoes: '0.0–1.0 scoring template for end-of-quarter retros.' },
    ],
    samplePreviewRows: [
      { title: 'O1: Grow Recurring Studio Revenue to $30k/mo', meta: '3 KRs · 74% avg', status: 'On Track' },
      { title: 'KR: Publish 12 Case Studies (8 / 12)', meta: '67% · Owner: Alex', status: 'In Progress' },
      { title: 'KR: Cut Onboarding Time Under 48h', meta: '100% · Shipped', status: 'Achieved', done: true },
    ],
  },
  'gtd-dashboard': {
    cardHook: 'Full David Allen GTD—Inbox, Next Actions, Waiting-For & Someday.',
    heroHeadline: 'Get everything out of your head and into trusted lists.',
    heroLead:
      'A faithful Getting Things Done Notion workspace built around Contexts (@Computer, @Calls, @Errands) and frictionless weekly reviews.',
    painPoint: 'Mental RAM drained by half-remembered promises and delegated tasks.',
    payoff: 'Zero-inbox capture + context-filtered Next Actions + Waiting-For radar.',
    setupTime: '3-min setup',
    buyerSignal: 'Complete GTD workflow · 8 linked DBs',
    insideItems: [
      { name: 'Fast Capture Inbox', whatItDoes: 'Dump every open loop fast; clarify it once a day.' },
      { name: 'Context Next-Action Views', whatItDoes: 'Filter by @DeepWork, @Calls, @Quick5Min, or @Errands.' },
      { name: 'Waiting-For Tracker', whatItDoes: 'Never lose track of items delegated to teammates or clients.' },
      { name: 'Someday / Maybe Parking Lot', whatItDoes: 'Keep good ideas safe without polluting today’s focus.' },
      { name: 'Guided Weekly Review', whatItDoes: 'Step-by-step Friday checklist to reset all lists to clean.' },
    ],
    samplePreviewRows: [
      { title: 'Draft Q4 proposal outline', meta: '@DeepWork · 45 min', status: 'Next Action' },
      { title: 'Waiting on signed SOW from Maya', meta: 'Waiting For · 4 days', status: 'Follow Up' },
      { title: 'Inbox Clarified — 0 items left', meta: 'Daily Capture', status: 'Clear', done: true },
    ],
  },
  'grocery-list': {
    cardHook: 'Auto-sorted by supermarket aisle so you shop in half the time.',
    heroHeadline: 'Walk through the store once—without forgetting the essentials.',
    heroLead:
      'Tap staple items back onto your list in one second, auto-grouped by Produce, Pantry, Dairy, and Frozen for fast phone shopping.',
    painPoint: 'Zig-zagging across aisles and still forgetting olive oil.',
    payoff: 'Mobile-first aisle checklist with 1-tap staple restock.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Designed for one-handed phone use',
    insideItems: [
      { name: 'Aisle-Sorted Shopping View', whatItDoes: 'Groups items by Produce, Protein, Dairy, Pantry, and Home.' },
      { name: '1-Tap Staple Restock', whatItDoes: 'Re-add weekly regulars without typing them every Sunday.' },
      { name: 'Pantry Stock Toggle', whatItDoes: 'Mark items "Running Low" to auto-send them to your list.' },
      { name: 'Quick Cost Estimate', whatItDoes: 'Optional basket total before you hit checkout.' },
    ],
    samplePreviewRows: [
      { title: 'Avocados, Baby Spinach, Lemons', meta: 'Produce · 3 items', status: 'In Cart', done: true },
      { title: 'Greek Yogurt & Oat Milk', meta: 'Dairy · 2 items', status: 'To Grab' },
      { title: 'Extra Virgin Olive Oil', meta: 'Pantry · Running Low', status: 'To Grab' },
    ],
  },
  'all-in-one-meal-planner': {
    cardHook: 'Pick your week’s meals in 5 minutes—grocery list fills itself.',
    heroHeadline: 'End the 6 PM "what’s for dinner?" scramble for good.',
    heroLead:
      'Plan Monday–Sunday meals from your personal recipe book, track protein and prep time, and generate an aisle-sorted shopping list.',
    painPoint: 'Ordering expensive takeout because nothing was planned or prepped.',
    payoff: 'Weekly meal calendar + linked recipe vault + automatic grocery checklist.',
    setupTime: '3-min setup',
    buyerSignal: 'Pays for itself on the first skipped takeout',
    insideItems: [
      { name: 'Weekly Meal Calendar', whatItDoes: 'Drag breakfast, lunch, and dinner cards onto each day.' },
      { name: 'Personal Recipe Book', whatItDoes: 'Filter by 15-min meals, high-protein, or batch-cook.' },
      { name: 'Linked Grocery Generator', whatItDoes: 'Pulls ingredients straight from this week’s chosen meals.' },
      { name: 'Prep-Day Checklist', whatItDoes: '45-minute Sunday batch prep guide for smooth weekdays.' },
    ],
    samplePreviewRows: [
      { title: 'Mon Dinner · Lemon Herb Salmon & Quinoa', meta: '20 min · 42g protein', status: 'Prepped', done: true },
      { title: 'Tue Lunch · High-Protein Chickpea Bowl', meta: '10 min · Batch cook', status: 'Planned' },
      { title: 'Sunday Grocery List — 14 ingredients', meta: 'Auto-linked to week', status: 'Ready' },
    ],
  },
  'expense-tracker': {
    cardHook: 'Log spending in 10 seconds and see monthly totals automatically.',
    heroHeadline: 'See where your money leaks in under a minute a day.',
    heroLead:
      'A fast mobile-friendly Notion ledger that categorizes daily spending and totals every month without spreadsheet formulas.',
    painPoint: 'Small $12–$25 card taps quietly adding up to $600 a month.',
    payoff: 'Instant monthly category totals from one clean mobile entry button.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Zero spreadsheet math required',
    insideItems: [
      { name: 'Mobile Quick-Log Button', whatItDoes: 'Record amount, category, and date in 10 seconds.' },
      { name: 'Monthly Category Totals', whatItDoes: 'Auto-sums Dining, Groceries, Transport, and Shopping.' },
      { name: 'This Month vs. Last Month', whatItDoes: 'Spot spending spikes immediately before they become habits.' },
      { name: 'Tax-Deductible Tag', whatItDoes: 'Flag work receipts for effortless year-end export.' },
    ],
    samplePreviewRows: [
      { title: 'Whole Foods Weekly Groceries', meta: 'Groceries · $94.20', status: 'Logged', done: true },
      { title: 'Coffee & Bakery Catch-Up', meta: 'Dining · $16.50', status: 'Logged', done: true },
      { title: 'November Total — $1,420 across 6 categories', meta: '12% below Oct', status: 'On Track' },
    ],
  },
  'budget-tracker': {
    cardHook: 'Set category caps and watch remaining allowance update live.',
    heroHeadline: 'Know if you can afford it—before you swipe.',
    heroLead:
      'Set monthly spending limits per category and see green/red remaining bars update automatically with every logged purchase.',
    painPoint: 'Finding out you overspent two weeks after the credit card closes.',
    payoff: 'Live remaining-budget bars across every spending category.',
    setupTime: '3-min setup',
    buyerSignal: 'Simple 50/30/20 setup included',
    insideItems: [
      { name: 'Category Cap Bars', whatItDoes: 'See exact dollars left in Dining, Fun, Travel, and Bills.' },
      { name: 'Income vs. Expense Rollup', whatItDoes: 'Live monthly net surplus and savings rate %.' },
      { name: 'Over-Budget Warning', whatItDoes: 'Flags any category crossing 85% before month-end.' },
      { name: 'Annual Month-by-Month Log', whatItDoes: 'Track your financial progress across all 12 months.' },
    ],
    samplePreviewRows: [
      { title: 'Dining Out — $210 / $350 (60%)', meta: '$140 remaining', status: 'Healthy' },
      { title: 'Groceries — $390 / $450 (87%)', meta: '$60 remaining', status: 'Watch' },
      { title: 'Monthly Savings Rate — 31%', meta: '$1,480 saved so far', status: 'On Target', done: true },
    ],
  },
  'crm-template': {
    cardHook: 'Never forget a warm lead or let a good deal go cold.',
    heroHeadline: 'Follow up on time—and close deals others drop.',
    heroLead:
      'Track every prospect from first message to signed contract with automatic follow-up dates, deal values, and call notes.',
    painPoint: 'Warm leads dying in your inbox because you forgot to ping them Friday.',
    payoff: 'Visual deal pipeline + Follow-Up Due Today queue.',
    setupTime: '2-min setup',
    buyerSignal: 'Replaces $50/mo CRM subscriptions',
    insideItems: [
      { name: 'Deal Pipeline Kanban', whatItDoes: 'Lead → Discovery → Proposal → Won with weighted totals.' },
      { name: 'Follow-Up Due Queue', whatItDoes: 'Surfaces every contact needing a check-in today.' },
      { name: 'Account & Call Notes', whatItDoes: 'Keep budget, pain points, and past emails on one card.' },
      { name: 'Monthly Pipeline Forecast', whatItDoes: 'See expected revenue closing this month and next.' },
    ],
    samplePreviewRows: [
      { title: 'Studio Kanso · Brand Retainer ($6,500)', meta: 'Proposal Sent · Ping today', status: 'Follow Up' },
      { title: 'BuildLog · UX Audit ($3,200)', meta: 'Discovery · Thu 2 PM', status: 'Qualified' },
      { title: 'Nordic Editorial · Sprint ($4,800)', meta: 'Signed & Invoiced', status: 'Won', done: true },
    ],
  },
  'goal-tracker': {
    cardHook: 'Break big yearly goals into milestones you actually finish.',
    heroHeadline: 'Turn vague New Year wishes into concrete finish lines.',
    heroLead:
      'Connect every big goal to specific quarterly milestones and automatic % progress bars so ambition turns into weekly action.',
    painPoint: 'Writing goals in a notebook in January and never opening it again.',
    payoff: 'Milestone-backed progress bars tied directly to your monthly focus.',
    setupTime: '2-min setup',
    buyerSignal: 'Includes quarterly review prompts',
    insideItems: [
      { name: 'Life & Career Goal Cards', whatItDoes: 'Visual % progress bars organized by life pillar.' },
      { name: 'Milestone Breakdown', whatItDoes: 'Splits intimidating goals into 4–6 concrete checkpoints.' },
      { name: 'Quarterly Focus Filter', whatItDoes: 'Hides future-quarter goals so you stay locked in now.' },
      { name: 'Monthly Reflection Log', whatItDoes: 'Review wins, roadblocks, and adjust deadlines cleanly.' },
    ],
    samplePreviewRows: [
      { title: 'Run Half-Marathon Under 1h 50m', meta: 'Health · 3 / 4 milestones (75%)', status: 'On Track' },
      { title: 'Save $15,000 Investment Reserve', meta: 'Finance · 80% complete', status: 'On Track' },
      { title: 'Ship First Paid Digital Product', meta: 'Career · 100% complete', status: 'Achieved', done: true },
    ],
  },
  'content-calendar': {
    cardHook: 'Plan, draft, and ship posts consistently without last-minute panic.',
    heroHeadline: 'Never stare at a blank screen an hour before posting.',
    heroLead:
      'Move ideas cleanly from Spark → Draft → Scheduled → Published across YouTube, X, LinkedIn, and newsletters on one calendar.',
    painPoint: 'Posting sporadically because ideas are trapped in random voice memos.',
    payoff: 'Visual publishing calendar + reusable post briefs in one view.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Multi-channel views ready out of the box',
    insideItems: [
      { name: 'Monthly Publishing Calendar', whatItDoes: 'See exact publish dates across every platform at once.' },
      { name: '4-Stage Content Board', whatItDoes: 'Idea → Scripting → Ready → Published workflow.' },
      { name: 'Hook & Idea Bank', whatItDoes: 'Capture viral angles and outlines the second they strike.' },
      { name: 'Channel Filter Tabs', whatItDoes: 'View Newsletter, YouTube, or Social pipelines separately.' },
    ],
    samplePreviewRows: [
      { title: 'Why Minimalist Systems Beat Complex Apps', meta: 'Newsletter · Thu 9 AM', status: 'Scheduled', done: true },
      { title: '5-Minute Notion Workspace Tour', meta: 'YouTube · Script 80%', status: 'Drafting' },
      { title: '3 Hooks That Doubled Conversion', meta: 'X / LinkedIn · Outline', status: 'Idea' },
    ],
  },
  journal: {
    cardHook: 'A quiet 3-minute morning & evening canvas with zero visual noise.',
    heroHeadline: 'Clear your head in three minutes—without staring at a blank page.',
    heroLead:
      'One-click daily entries with gentle morning clarity and evening gratitude prompts—private inside your own Notion.',
    painPoint: 'Skipping journaling because a blank page feels heavy after a long day.',
    payoff: 'Guided 3-question prompts that turn reflection into a 3-minute habit.',
    setupTime: '60-sec duplicate',
    buyerSignal: '100% private in your own Notion account',
    insideItems: [
      { name: '1-Click Daily Entry', whatItDoes: 'Spawns today’s date and morning/evening prompts instantly.' },
      { name: 'Mood & Energy Tagging', whatItDoes: 'Spot emotional trends across weeks and seasons.' },
      { name: 'On This Day Archive', whatItDoes: 'Revisit past reflections and see how far you’ve come.' },
      { name: 'Gratitude & Wins Log', whatItDoes: 'Filter only your best moments whenever you need perspective.' },
    ],
    samplePreviewRows: [
      { title: 'Nov 22 · Calm start, finished deep work before noon', meta: 'Mood: Grounded · 3 min', status: 'Complete', done: true },
      { title: 'Nov 21 · Long walk cleared project bottleneck', meta: 'Mood: Energized · 4 min', status: 'Complete', done: true },
      { title: 'Weekly Highlight Reel — 5 moments saved', meta: 'Archive · Pinned', status: 'Saved' },
    ],
  },
  'gift-tracker': {
    cardHook: 'Capture gift ideas all year so birthdays never catch you off guard.',
    heroHeadline: 'Give thoughtful gifts—without last-minute panic shopping.',
    heroLead:
      'Save offhand hints people drop in April, track budgets per person, and check off Ordered → Wrapped → Gifted.',
    painPoint: 'Scrambling for a generic gift card two days before a birthday.',
    payoff: 'Year-round gift vault with upcoming birthday countdowns and budget totals.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Tracks birthdays, holidays & spend',
    insideItems: [
      { name: 'People & Occasions List', whatItDoes: 'Every birthday, anniversary, and holiday sorted by date.' },
      { name: 'Hint Capture Inbox', whatItDoes: 'Jot down ideas on your phone the second someone mentions one.' },
      { name: 'Order-to-Wrapped Status', whatItDoes: 'Track Idea → Bought → Wrapped → Given cleanly.' },
      { name: 'Holiday Budget Rollup', whatItDoes: 'See total gift spend across the season automatically.' },
    ],
    samplePreviewRows: [
      { title: 'Mom · Ceramic Pour-Over Set ($68)', meta: 'Dec 12 · Ordered', status: 'In Transit' },
      { title: 'Sam · Hardcover Dune Collector Edition ($45)', meta: 'Holiday · Wrapped', status: 'Ready', done: true },
      { title: 'Maya · Local Pottery Workshop Voucher', meta: 'Jan 8 · Hint Saved', status: 'Idea' },
    ],
  },
  'vocabulary-builder': {
    cardHook: 'Save new words with context sentences and review via active recall.',
    heroHeadline: 'Actually use the new words you look up—instead of forgetting them.',
    heroLead:
      'Capture unfamiliar words from books or language study with real-world sentences and a built-in spaced-recall review queue.',
    painPoint: 'Looking up a great word twice a week and never retaining it.',
    payoff: 'Active-recall toggle flashcards sorted by mastery level.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Works for English & foreign languages',
    insideItems: [
      { name: 'Word + Context Card', whatItDoes: 'Stores definition, pronunciation, and the exact book quote.' },
      { name: 'Active-Recall Toggle View', whatItDoes: 'Hides definitions until you test yourself.' },
      { name: 'Mastery Stages', whatItDoes: 'Moves words from New → Learning → Active Vocabulary.' },
      { name: 'Source & Language Tags', whatItDoes: 'Group terms by book, exam (GRE/IELTS), or language.' },
    ],
    samplePreviewRows: [
      { title: 'Perspicacious · keen insight', meta: 'From: Essays · 4 reviews', status: 'Mastered', done: true },
      { title: 'Equanimity · composure under pressure', meta: 'From: Meditations', status: 'Review Due' },
      { title: 'Laconic · using very few words', meta: 'GRE / Writing', status: 'Learning' },
    ],
  },
  'content-os': {
    cardHook: 'Turn one pillar idea into 15 cross-platform posts—on schedule.',
    heroHeadline: 'Publish everywhere every week—without burning out.',
    heroLead:
      'A full creator production studio linking Research, Pillar Scripts, Repurposing Matrices, Sponsorship CRM, and Analytics.',
    painPoint: 'Reinventing content from zero every week and missing sponsor deliverables.',
    payoff: '1 pillar asset cascades automatically into YouTube, Newsletter, and Social queues.',
    setupTime: '5-min setup',
    buyerSignal: 'Full creator studio · 8 linked DBs',
    insideItems: [
      { name: 'Pillar-to-Clip Repurposer', whatItDoes: 'Turns 1 flagship piece into 10+ linked short posts.' },
      { name: 'Multi-Channel Calendar', whatItDoes: 'YouTube, Newsletter, X, LinkedIn, and Podcast in sync.' },
      { name: 'Sponsor & Brand Deal CRM', whatItDoes: 'Track rates, integration dates, deliverables, and payouts.' },
      { name: 'Hook & Retention Library', whatItDoes: 'Log top-performing thumbnails, titles, and CTR winners.' },
      { name: 'Production SOP Checklists', whatItDoes: 'Repeatable filming, editing, and publishing steps.' },
    ],
    samplePreviewRows: [
      { title: 'Flagship Video: Calm Notion Setup 2026', meta: '6 repurposed clips linked', status: 'Editing' },
      { title: 'Sponsor Slot · Readwise ($1,800)', meta: 'Brief approved · Dec 4', status: 'Confirmed', done: true },
      { title: 'Newsletter Issue #48 · 51% Open Rate', meta: 'Published · Top performer', status: 'Shipped', done: true },
    ],
  },
  'para-dashboard': {
    cardHook: 'Tiago Forte’s PARA method stripped down to pure speed.',
    heroHeadline: 'Organize everything by where you’ll use it—not where you found it.',
    heroLead:
      'Four crisp folders—Projects, Areas, Resources, Archive—wired together so every document sits right where your work happens.',
    painPoint: 'Deep nested folders that take 9 clicks to find anything.',
    payoff: 'Actionability-first layout with 1-click archiving of finished projects.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Cleanest free PARA starter in Notion',
    insideItems: [
      { name: 'Active Projects Desk', whatItDoes: 'Short-term outcomes with clear finish lines upfront.' },
      { name: 'Areas of Responsibility', whatItDoes: 'Ongoing standards like Health, Finances, and Career.' },
      { name: 'Resources Library', whatItDoes: 'Topics and references you are actively curious about.' },
      { name: '1-Click Cold Archive', whatItDoes: 'Clears completed items without deleting a single note.' },
    ],
    samplePreviewRows: [
      { title: 'Projects · 4 Active Sprints', meta: 'Deadlines this month', status: 'Focus' },
      { title: 'Areas · Health, Money, Studio, Family', meta: '4 ongoing standards', status: 'Active', done: true },
      { title: 'Resources · Design, Writing, Investing', meta: '19 linked references', status: 'Indexed' },
    ],
  },
  'finance-tracker': {
    cardHook: 'Catch forgotten subscriptions, track net worth, and grow savings.',
    heroHeadline: 'Know where every dollar goes—before the month disappears.',
    heroLead:
      'Unify bank accounts, monthly budgets, recurring bills, debt payoff, and net worth in one private Notion financial hub.',
    painPoint: 'Checking four bank apps and still having no clue what your real savings rate is.',
    payoff: 'Live net-worth rollup + renewal alerts that often pay for the template day one.',
    setupTime: '5-min setup',
    buyerSignal: 'Users catch $300+/yr in forgotten renewals',
    insideItems: [
      { name: 'Multi-Account Net Worth', whatItDoes: 'Track checking, savings, investments, and cards together.' },
      { name: 'Subscription Renewal Radar', whatItDoes: 'Flags sneaky monthly & annual bills before they charge.' },
      { name: 'Cash-Flow & Savings Rate', whatItDoes: 'Auto-calculates monthly income, spend, and % saved.' },
      { name: 'Category Budget Caps', whatItDoes: 'Visual bars showing remaining room per category.' },
      { name: 'Savings Goals & Sinking Funds', whatItDoes: 'Progress bars for emergency reserves and big goals.' },
      { name: 'Annual Tax & Export View', whatItDoes: 'Clean 12-month ledger ready for tax prep.' },
    ],
    samplePreviewRows: [
      { title: 'Net Worth — $64,280 (+19% YoY)', meta: '4 accounts synced', status: 'Growing', done: true },
      { title: 'Subscription Audit · Saved $64/mo', meta: '3 renewals flagged early', status: 'Protected', done: true },
      { title: 'Monthly Savings Rate — 38%', meta: '$2,140 net surplus', status: 'On Track' },
    ],
  },
  'running-tracker': {
    cardHook: 'Log mileage, pace, and shoe wear for your next 5K or marathon.',
    heroHeadline: 'Watch your pace drop and weekly mileage compound.',
    heroLead:
      'Track every easy run, tempo session, weekly kilometer total, race PRs, and shoe mileage so you train smarter without injury.',
    painPoint: 'Increasing mileage too fast or forgetting when running shoes hit 500km.',
    payoff: 'Weekly mileage rollups, pace trends, and shoe retirement alerts.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Built for 5K, 10K & Half-Marathon blocks',
    insideItems: [
      { name: 'Run Log & Pace Math', whatItDoes: 'Log distance, time, RPE, and Zone 2 vs. Tempo tags.' },
      { name: 'Weekly Mileage Rollup', whatItDoes: 'Keep weekly jumps safely under the 10% rule.' },
      { name: 'Shoe Mileage Counter', whatItDoes: 'Alerts you before worn midsoles cause knee pain.' },
      { name: 'Race PR & Split Vault', whatItDoes: 'Track personal bests across 5K, 10K, and 21.1K.' },
    ],
    samplePreviewRows: [
      { title: 'Zone 2 Base Run · 8.2 km @ 5:42/km', meta: 'RPE 4/10 · Morning', status: 'Logged', done: true },
      { title: 'Tempo Intervals · 6.0 km @ 4:48/km', meta: 'Weekly Total: 26.4 km', status: 'PR Split', done: true },
      { title: 'Daily Trainers · 412 / 550 km', meta: '138 km left', status: 'Healthy' },
    ],
  },
  'workout-tracker-pro': {
    cardHook: 'Track progressive overload, PRs, and splits without paying $15/mo.',
    heroHeadline: 'Lift heavier every month with clear progressive overload.',
    heroLead:
      'Log sets, reps, weight, and rest on mobile—automatically see your last session’s numbers and personal records per lift.',
    painPoint: 'Walking into the gym guessing what weight you lifted last Tuesday.',
    payoff: 'Instant last-session weight lookup, volume math, and PR tracking.',
    setupTime: '2-min setup',
    buyerSignal: 'Replaces $12–$15/mo gym tracker apps',
    insideItems: [
      { name: 'Split & Program Builder', whatItDoes: 'Supports Push/Pull/Legs, Upper/Lower, or Full Body.' },
      { name: 'Progressive Overload Log', whatItDoes: 'Shows previous weight & reps right next to today’s sets.' },
      { name: 'Auto Volume & PR Tracker', whatItDoes: 'Highlights every new 1RM or rep personal record.' },
      { name: 'Bodyweight & Deload Log', whatItDoes: 'Track recovery trends and schedule smart deload weeks.' },
    ],
    samplePreviewRows: [
      { title: 'Incline DB Press · 3×8 @ 70 lbs', meta: '+5 lbs vs last week', status: 'New PR', done: true },
      { title: 'Romanian Deadlift · 3×10 @ 185 lbs', meta: 'Volume: 5,550 lbs', status: 'Complete', done: true },
      { title: 'Week 6 Consistency — 4 / 4 Sessions', meta: 'Upper / Lower Split', status: 'On Track' },
    ],
  },
  'workout-tracker': {
    cardHook: 'Simple gym log for sets, reps, and weekly training consistency.',
    heroHeadline: 'Log your workouts in seconds—zero bloated fitness clutter.',
    heroLead:
      'A clean, phone-friendly Notion training log for your weekly routine, exercise library, and session checkboxes.',
    painPoint: 'Over-engineered fitness apps that take longer to tap than your set.',
    payoff: 'Fast mobile workout cards and weekly session counter.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Free forever · Clean mobile layout',
    insideItems: [
      { name: '1-Tap Workout Cards', whatItDoes: 'Open today’s split and log sets right between rests.' },
      { name: 'Exercise Library', whatItDoes: 'Keep form cues and muscle groups organized cleanly.' },
      { name: 'Weekly Session Streak', whatItDoes: 'See every completed workout across the month.' },
      { name: 'Quick PR Notes', whatItDoes: 'Jot down top weights so next week beats last week.' },
    ],
    samplePreviewRows: [
      { title: 'Monday · Upper Body Strength (48 min)', meta: '6 exercises logged', status: 'Done', done: true },
      { title: 'Wednesday · Lower Body & Core', meta: '5 exercises ready', status: 'Up Next' },
      { title: 'Monthly Sessions — 14 completed', meta: 'Avg 3.5x / week', status: 'Active' },
    ],
  },
  'subscription-tracker': {
    cardHook: 'Spot the $40/mo in forgotten trials quietly draining your card.',
    heroHeadline: 'Stop paying for apps you haven’t opened since spring.',
    heroLead:
      'List every monthly and annual renewal in two minutes—see your true yearly burn rate and get ahead of auto-renewals.',
    painPoint: 'Getting hit with a surprise $149 annual charge you meant to cancel.',
    payoff: 'True annual cost math + upcoming renewal countdown sorted by date.',
    setupTime: '2-min setup',
    buyerSignal: 'Often saves $200+ in the first 10 minutes',
    insideItems: [
      { name: 'Monthly & Yearly Cost Math', whatItDoes: 'Auto-converts every plan into real annual spend.' },
      { name: 'Upcoming Renewal Radar', whatItDoes: 'Sorted by next charge date so you cancel in time.' },
      { name: 'Keep / Cut Audit Status', whatItDoes: 'Tag low-value tools to cancel before billing day.' },
      { name: 'Category Breakdown', whatItDoes: 'See SaaS, Streaming, Cloud, and Fitness totals clearly.' },
    ],
    samplePreviewRows: [
      { title: 'Unused Design Tool · $180/yr', meta: 'Renews in 6 days', status: 'Cancel Now' },
      { title: 'Cloud Storage 2TB · $9.99/mo', meta: '$119.88/yr · Essential', status: 'Keep', done: true },
      { title: 'Total Active Burn — $78/mo ($936/yr)', meta: 'Cut $42/mo this quarter', status: 'Audited', done: true },
    ],
  },
  'recipe-manager': {
    cardHook: 'Save only the recipes you actually cook—zero 2,000-word food blogs.',
    heroHeadline: 'Open dinner instructions in two seconds—not past ten ads.',
    heroLead:
      'Store your real go-to meals with ingredients, cook time, and tags like "15-min", "High Protein", or "Guests".',
    painPoint: 'Scrolling past life stories and pop-up ads with flour on your hands.',
    payoff: 'Clean, ad-free kitchen cards filterable by prep time and cuisine.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Clean phone view for the kitchen counter',
    insideItems: [
      { name: 'Ad-Free Recipe Cards', whatItDoes: 'Ingredients and numbered steps—nothing else.' },
      { name: 'Time & Diet Filters', whatItDoes: 'Find 15-minute weeknight dinners in one tap.' },
      { name: 'Favorites & Rating Tags', whatItDoes: 'Keep proven crowd-pleasers pinned at the top.' },
      { name: 'Quick Ingredient Check', whatItDoes: 'Tick off what you have before heading to the store.' },
    ],
    samplePreviewRows: [
      { title: 'Crispy Garlic Chili Noodles', meta: '15 min · Weeknight', status: '5★ Staple', done: true },
      { title: 'Sheet-Pan Miso Glazed Salmon', meta: '25 min · High Protein', status: '5★ Staple', done: true },
      { title: 'Sunday Sourdough Focaccia', meta: 'Weekend · Crowd Favorite', status: 'Saved' },
    ],
  },
  'student-dashboard': {
    cardHook: 'Every class, assignment due date, and lecture note on one page.',
    heroHeadline: 'Stop checking five portals just to know what’s due Friday.',
    heroLead:
      'A lightweight, free Notion desk uniting your class schedule, upcoming deadlines, and course notes for a calmer semester.',
    painPoint: 'Missing a 10% quiz because it was buried inside a syllabus PDF.',
    payoff: 'One clean semester hub showing classes and upcoming due dates first.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Free starter · Upgrade anytime to Student OS',
    insideItems: [
      { name: 'Enrolled Courses Grid', whatItDoes: 'One hub per class with professor info and syllabus.' },
      { name: 'Assignment Due-Date List', whatItDoes: 'Sorted by urgency so nothing sneaks up overnight.' },
      { name: 'Clean Lecture Notes', whatItDoes: 'Linked directly to each course and exam topic.' },
      { name: 'Weekly Class Timetable', whatItDoes: 'Room numbers and office hours at a glance.' },
    ],
    samplePreviewRows: [
      { title: 'CS 201 · Problem Set 4', meta: 'Due Tomorrow · 11:59 PM', status: 'In Progress' },
      { title: 'HIST 112 · Lecture 09 Notes', meta: 'Linked to Midterm', status: 'Reviewed', done: true },
      { title: 'ECON 104 · Reading Ch. 6', meta: 'Due Friday', status: 'Next Up' },
    ],
  },
  'notes-dashboard': {
    cardHook: 'Capture fast, tag cleanly, and find any note in three seconds.',
    heroHeadline: 'A quiet notebook that doesn’t turn into a junk drawer.',
    heroLead:
      'Separate quick scratchpad thoughts from polished reference notes using clean notebooks, favorites, and instant search.',
    painPoint: 'Hundreds of "Untitled Note" drafts you can never find again.',
    payoff: 'Inbox → Organized Notebook flow with pinned favorites at the top.',
    setupTime: '60-sec duplicate',
    buyerSignal: 'Minimalist & lightning fast on mobile',
    insideItems: [
      { name: 'Quick Scratchpad Inbox', whatItDoes: 'Capture ideas mid-meeting without worrying about folders.' },
      { name: 'Notebooks & Topic Tags', whatItDoes: 'Group work, study, and personal notes cleanly.' },
      { name: 'Pinned Favorites Bar', whatItDoes: 'Keep your 5 most-referenced docs one click away.' },
      { name: 'Review & Archive Filter', whatItDoes: 'Sweep out stale drafts once a month.' },
    ],
    samplePreviewRows: [
      { title: 'Product Launch Messaging Angles', meta: 'Work · Pinned', status: 'Favorite', done: true },
      { title: '1-on-1 Meeting Notes — Nov 21', meta: 'Meetings · 3 action items', status: 'Active' },
      { title: 'Book Highlights: Good Strategy Bad Strategy', meta: 'Reading · Distilled', status: 'Archived', done: true },
    ],
  },
  'student-os': {
    cardHook: 'Walk into finals calm with 7-day radar, flashcards & live 4.0 GPA.',
    heroHeadline: 'Walk into finals calm while everyone else pulls all-nighters.',
    heroLead:
      'Every syllabus, 7-day deadline, Cornell recall note, spaced-repetition card, internship app, and live 4.0 GPA rollup in one desk.',
    painPoint: 'Juggling Canvas, syllabus PDFs, Quizlet, and messy GPA spreadsheets.',
    payoff: '10 academic modules + 12 linked DBs wired to protect your GPA & sleep.',
    setupTime: '60-sec duplicate',
    buyerSignal: '10 modules · 12 linked DBs · Notion Free',
    insideItems: [
      { name: '7-Day Deadline Radar', whatItDoes: 'Auto-surfaces every quiz, lab, and essay due this week.' },
      { name: 'Live Weighted 4.0 GPA', whatItDoes: 'Log scores once—credit-weighted term & cumulative GPA updates live.' },
      { name: 'Cornell Notes & Recall', whatItDoes: 'Built-in 1 · 3 · 7 · 21 day spaced-repetition review queue.' },
      { name: 'Courses & Syllabi Hubs', whatItDoes: 'Grading weights, office hours, and readings per class.' },
      { name: 'Internship & Career Kanban', whatItDoes: 'Track applications from Applied → OA → Offer.' },
      { name: 'Student Budget & Sleep Log', whatItDoes: 'Monthly spending caps, scholarships, and exam-week wellness.' },
    ],
    samplePreviewRows: [
      { title: 'CS 201 · Binary Tree Lab Report (15%)', meta: 'Due Tomorrow', status: 'Urgent' },
      { title: 'Term GPA — 3.92 across 16 credits', meta: 'Auto-weighted formula', status: 'Dean’s List', done: true },
      { title: 'Due for Recall: 12 Flashcards Today', meta: '1/3/7/21d engine', status: 'Ready' },
    ],
  },
  'researcher-os': {
    cardHook: 'Turn 100 scattered PDFs into your next submitted paper.',
    heroHeadline: 'Turn hundreds of scattered PDFs into your next published paper.',
    heroLead:
      'Link arXiv triage, literature synthesis matrices, Zettelkasten claims, reproducible lab runs, IMRaD drafts, and peer-review rebuttals.',
    painPoint: 'Re-reading 30-page PDFs to remember which baseline failed—and scrambling before CFPs.',
    payoff: '12 research modules + 14 linked DBs keeping every citation one click from your draft.',
    setupTime: '60-sec duplicate',
    buyerSignal: '12 modules · 14 linked DBs · Notion Free',
    insideItems: [
      { name: 'Literature Synthesis Matrix', whatItDoes: 'Compare methods, baselines, datasets, DOIs, and gaps side-by-side.' },
      { name: 'Zettelkasten Claim Vault', whatItDoes: 'Atomic citable claims linked straight to manuscript sections.' },
      { name: 'IMRaD Manuscript Pacer', whatItDoes: 'Track word budgets, Overleaf links, and section readiness.' },
      { name: 'Reproducible Lab Ledger', whatItDoes: 'Log hypotheses, protocols, dataset hashes, and Git SHAs.' },
      { name: 'Peer-Review Rebuttal Board', whatItDoes: 'Map reviewer critiques to control runs and paper edits.' },
      { name: 'CFPs, Grants & Co-Authors', whatItDoes: 'Conference countdowns, funding RFPs, and ORCID directory.' },
    ],
    samplePreviewRows: [
      { title: 'ACL 2027 Draft · 6,420 / 8,000 words', meta: '42 days to CFP', status: 'Writing' },
      { title: 'Reviewer #2 · Ablation Control Run', meta: 'Severity: Major · Linked', status: 'In Lab' },
      { title: 'Literature Matrix — 38 Papers Synthesized', meta: 'DOIs & BibTeX synced', status: 'Indexed', done: true },
    ],
  },
  'nexus-os': {
    cardHook: 'Replace 5 disconnected apps with one Core-5 command screen.',
    heroHeadline: 'One calm spine for your goals, sprints, capital, and week.',
    heroLead:
      'Unite Goals, Master Projects, P1 Sprint Queues, PARA Knowledge, Monthly Burn Rate, and People CRM on 15 linked Notion databases.',
    painPoint: 'Separate apps for tasks, notes, burn rate, and contacts that never talk to each other.',
    payoff: '10 command modules + 15 Core-5 DBs with live sprint & capital visibility.',
    setupTime: '60-sec duplicate',
    buyerSignal: '10 modules · 15 linked DBs · Notion Free',
    insideItems: [
      { name: 'Command Hub & Quick Capture', whatItDoes: '4 live pulse cards + 1-click capture for tasks, notes, projects, contacts.' },
      { name: '7-View Sprint Queue', whatItDoes: 'Today, Focus, Upcoming, Waiting, and Inbox Triage ranked P1–P3.' },
      { name: 'Master Projects & Radar', whatItDoes: 'Grouped timeline paired beside live Portfolio Progress bars.' },
      { name: 'PARA & Knowledge Vault', whatItDoes: '24 active domains and evergreen notes with zero orphan pages.' },
      { name: 'Capital Burn & Renewals', whatItDoes: 'Monthly run-rate tracker + subscription renewal alerts.' },
      { name: 'People CRM & Sunday Reset', whatItDoes: 'Warm touchpoint reminders + 15-minute weekly hygiene checklist.' },
    ],
    samplePreviewRows: [
      { title: 'Launch Nexus OS Flagship Template', meta: 'Career · 82% complete', status: 'Active' },
      { title: 'Monthly Burn — ₹1.24L (3 renewals due)', meta: 'Capital Radar', status: 'Review' },
      { title: 'Sunday PARA Hygiene Reset', meta: '0 orphaned nodes', status: 'Passed', done: true },
    ],
  },
  'book-tracker-os': {
    cardHook: 'Finish more books with 6 live charts, Queue Score & stale alerts.',
    heroHeadline: 'Finish the books you start—and actually remember them.',
    heroLead:
      'Six live Notion charts, formula-ranked Up Next queues, automatic stale-book alerts, chapter notes, and an annual Reading Wrapped.',
    painPoint: 'Five half-read books gathering dust while your wishlist keeps growing.',
    payoff: 'Σ Queue Score picks your next read + Stale Radar rescues paused classics.',
    setupTime: '60-sec duplicate',
    buyerSignal: '6 live charts · 8 linked DBs · Notion Free',
    insideItems: [
      { name: '4 Live Editorial KPIs', whatItDoes: 'Books Finished, Pages Read, Hours Invested, and Notes Due.' },
      { name: '6 Native Notion Charts', whatItDoes: 'Monthly bars, 12-genre donut, ratings, and format splits.' },
      { name: 'Σ Queue Score Engine', whatItDoes: 'Auto-ranks your TBR by Priority, Next Up, and Owned status.' },
      { name: 'Stale-Book Alert Radar', whatItDoes: 'Flags untouched reads (14+ days) with pace & days-to-finish math.' },
      { name: '5-Stage Board & Gallery', whatItDoes: 'Want to Read → Next Up → Reading → On Hold → Finished.' },
      { name: 'Timeline & Reading Wrapped', whatItDoes: 'Monthly Gantt pacing + auto-compiled year-end Hall of Fame.' },
    ],
    samplePreviewRows: [
      { title: 'A Wizard of Earthsea · Σ Queue Score 65', meta: 'Next Up · High · Owned', status: '#1 Pick' },
      { title: 'Meditations · 25d untouched (35%)', meta: 'Needs Attention Radar', status: 'Stale' },
      { title: '2026 Reading Wrapped · 6 books / 2,379 pp', meta: '21.3 hrs · 5 notes due', status: 'Live', done: true },
    ],
  },
};

export function getTemplateHook(slug: string): TemplateHookProfile {
  const match = TEMPLATE_HOOKS[slug];
  if (match) return match;
  return TEMPLATE_HOOKS['second-brain'];
}
