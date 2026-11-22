import { OsSystemSpec } from './osSpecTypes';

export type ReadingStage =
  | 'Want to Read'
  | 'Next Up'
  | 'Currently Reading'
  | 'On Hold'
  | 'Finished'
  | 'Did Not Finish';

export type BookPriority = 'High' | 'Medium' | 'Low';
export type BookFormat = 'Physical' | 'Ebook';

export interface BookRecord {
  id: string;
  title: string;
  author: string;
  genres: string[];
  stage: ReadingStage;
  priority: BookPriority;
  owned: boolean;
  format: BookFormat;
  totalPages: number;
  pagesRead: number;
  hoursRead: number;
  rating?: number;
  finishDate?: string;
  finishMonth?: string;
  reviewWritten?: boolean;
  daysSinceRead?: number;
  readingPace?: number;
  notesDue?: boolean;
  timelineStartDay?: number;
  timelineEndDay?: number;
}

export const INITIAL_BOOKS: BookRecord[] = [
  {
    id: 'bk-1',
    title: 'Deep Work',
    author: 'Cal Newport',
    genres: ['Self-Development', 'Business'],
    stage: 'Finished',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 304,
    pagesRead: 304,
    hoursRead: 3.1,
    rating: 4,
    finishDate: 'October 18, 2026',
    finishMonth: '2026-10',
    reviewWritten: true,
    notesDue: true,
  },
  {
    id: 'bk-2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genres: ['Self-Development', 'Psychology'],
    stage: 'Finished',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 320,
    pagesRead: 320,
    hoursRead: 3.2,
    rating: 5,
    finishDate: 'September 20, 2026',
    finishMonth: '2026-09',
    reviewWritten: true,
    notesDue: false,
  },
  {
    id: 'bk-3',
    title: 'Dune',
    author: 'Frank Herbert',
    genres: ['Science Fiction', 'Fiction'],
    stage: 'Finished',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 688,
    pagesRead: 688,
    hoursRead: 6.0,
    rating: 5,
    finishDate: 'September 1, 2026',
    finishMonth: '2026-09',
    reviewWritten: false,
    notesDue: true,
  },
  {
    id: 'bk-4',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genres: ['History', 'Nonfiction'],
    stage: 'Finished',
    priority: 'Medium',
    owned: true,
    format: 'Physical',
    totalPages: 443,
    pagesRead: 443,
    hoursRead: 3.8,
    rating: 4,
    finishDate: 'August 2, 2026',
    finishMonth: '2026-08',
    reviewWritten: false,
    notesDue: true,
  },
  {
    id: 'bk-5',
    title: 'Cosmos',
    author: 'Carl Sagan',
    genres: ['Science', 'Nonfiction'],
    stage: 'Finished',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 324,
    pagesRead: 324,
    hoursRead: 2.7,
    rating: 5,
    finishDate: 'June 28, 2026',
    finishMonth: '2026-06',
    reviewWritten: false,
    notesDue: true,
  },
  {
    id: 'bk-6',
    title: 'The Left Hand of Darkness',
    author: 'Ursula K. Le Guin',
    genres: ['Science Fiction', 'Literature'],
    stage: 'Finished',
    priority: 'Medium',
    owned: true,
    format: 'Ebook',
    totalPages: 300,
    pagesRead: 300,
    hoursRead: 2.5,
    rating: 4,
    finishDate: 'April 20, 2026',
    finishMonth: '2026-04',
    reviewWritten: false,
    notesDue: true,
  },
  {
    id: 'bk-7',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    genres: ['Philosophy'],
    stage: 'Currently Reading',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 254,
    pagesRead: 90,
    hoursRead: 1.4,
    daysSinceRead: 25,
    readingPace: 2.6,
  },
  {
    id: 'bk-8',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    genres: ['Fiction'],
    stage: 'Currently Reading',
    priority: 'Medium',
    owned: true,
    format: 'Physical',
    totalPages: 296,
    pagesRead: 140,
    hoursRead: 2.1,
    daysSinceRead: 1,
    readingPace: 14.5,
    timelineStartDay: 6,
    timelineEndDay: 18,
  },
  {
    id: 'bk-9',
    title: 'A Wizard of Earthsea',
    author: 'Ursula K. Le Guin',
    genres: ['Fiction', 'Fantasy'],
    stage: 'Next Up',
    priority: 'High',
    owned: true,
    format: 'Physical',
    totalPages: 183,
    pagesRead: 0,
    hoursRead: 0,
  },
  {
    id: 'bk-10',
    title: 'Dune Messiah',
    author: 'Frank Herbert',
    genres: ['Science Fiction', 'Fiction'],
    stage: 'Next Up',
    priority: 'High',
    owned: false,
    format: 'Ebook',
    totalPages: 331,
    pagesRead: 0,
    hoursRead: 0,
  },
  {
    id: 'bk-11',
    title: 'Digital Minimalism',
    author: 'Cal Newport',
    genres: ['Nonfiction', 'Technology'],
    stage: 'Want to Read',
    priority: 'Medium',
    owned: false,
    format: 'Ebook',
    totalPages: 284,
    pagesRead: 0,
    hoursRead: 0,
  },
  {
    id: 'bk-12',
    title: 'The Tombs of Atuan',
    author: 'Ursula K. Le Guin',
    genres: ['Fiction', 'Fantasy'],
    stage: 'Want to Read',
    priority: 'Medium',
    owned: false,
    format: 'Ebook',
    totalPages: 197,
    pagesRead: 0,
    hoursRead: 0,
  },
  {
    id: 'bk-13',
    title: 'Letters from a Stoic',
    author: 'Seneca',
    genres: ['Philosophy'],
    stage: 'Want to Read',
    priority: 'Low',
    owned: false,
    format: 'Physical',
    totalPages: 254,
    pagesRead: 0,
    hoursRead: 0,
  },
  {
    id: 'bk-14',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genres: ['Psychology', 'Nonfiction'],
    stage: 'On Hold',
    priority: 'Medium',
    owned: true,
    format: 'Physical',
    totalPages: 499,
    pagesRead: 180,
    hoursRead: 2.8,
  },
  {
    id: 'bk-15',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    genres: ['Science'],
    stage: 'Did Not Finish',
    priority: 'Low',
    owned: true,
    format: 'Ebook',
    totalPages: 212,
    pagesRead: 64,
    hoursRead: 1.1,
    rating: 2,
  },
];

/**
 * Pure Book Tracker OS Queue Score Formula (mirrors Notion Σ Queue Score):
 * - Next Up (+25), High Priority (+30) / Medium (+20) / Low (+10), Owned (+10)
 */
export function computeQueueScore(book: Pick<BookRecord, 'stage' | 'priority' | 'owned'>): number {
  const stageBonus = book.stage === 'Next Up' ? 25 : 0;
  const priorityScore =
    book.priority === 'High' ? 30 : book.priority === 'Medium' ? 20 : 10;
  const ownedBonus = book.owned ? 10 : 0;
  return stageBonus + priorityScore + ownedBonus;
}

/**
 * Pure Reading Signal & Pace Formula (mirrors Notion Σ Signal, Σ Progress, Σ Days to Finish)
 */
export function computeReadingSignal(book: BookRecord): {
  signal: 'Stale' | 'On Track';
  progressPct: number;
  daysToFinish: number;
} {
  const progressPct =
    book.totalPages > 0 ? Math.min(100, Math.round((book.pagesRead / book.totalPages) * 100)) : 0;
  const remaining = Math.max(0, book.totalPages - book.pagesRead);
  const pace = book.readingPace && book.readingPace > 0 ? book.readingPace : 10;
  const daysToFinish = remaining === 0 ? 0 : Math.ceil(remaining / pace);
  const signal = (book.daysSinceRead ?? 0) >= 14 ? 'Stale' : 'On Track';
  return { signal, progressPct, daysToFinish };
}

/**
 * Pure Hero Telemetry KPI Aggregator (mirrors Book Tracker OS top 4 Notion number charts)
 */
export function computeLibraryKpis(books: BookRecord[]): {
  booksFinished: number;
  pagesFinished: number;
  hoursRead: number;
  notesDue: number;
  totalBooks: number;
} {
  const finished = books.filter((b) => b.stage === 'Finished');
  const pagesFinished = finished.reduce((acc, b) => acc + b.totalPages, 0);
  const hoursRead = Number(
    finished.reduce((acc, b) => acc + b.hoursRead, 0).toFixed(1)
  );
  const notesDue = books.filter((b) => b.notesDue).length;
  return {
    booksFinished: finished.length,
    pagesFinished,
    hoursRead,
    notesDue,
    totalBooks: books.length,
  };
}

export const BOOK_GENRE_RATINGS: Array<{ genre: string; avgRating: number }> = [
  { genre: 'Business', avgRating: 4.0 },
  { genre: 'Fiction', avgRating: 4.5 },
  { genre: 'History', avgRating: 4.0 },
  { genre: 'Nonfiction', avgRating: 4.5 },
  { genre: 'Science', avgRating: 3.5 },
  { genre: 'Science Fiction', avgRating: 4.5 },
  { genre: 'Self-Development', avgRating: 5.0 },
];

export const BOOK_TRACKER_OS_SPEC: OsSystemSpec = {
  slug: 'book-tracker-os',
  name: 'Book Tracker OS',
  eyebrow: 'Smart Reading Telemetry · Personal Library OS',
  sectionHeadline: 'One Library. Eight Modules. Live Reading Analytics.',
  sectionSubheadline:
    'Formula-ranked Up Next queues, stale-book alerts, interactive Notion charts, reading timelines, and annual Reading Wrapped—all wired on Notion Free.',
  overviewPillars: [
    {
      id: 'telemetry',
      label: 'Reading Telemetry',
      metric: '6 Live Notion Charts',
      detail: 'Finished per Month, Genre Mix, Rating Distribution, Format Mix, and Stage Breakdown.',
    },
    {
      id: 'queue-score',
      label: 'Smart Queue Engine',
      metric: 'Auto Σ Queue Score',
      detail: 'Ranks your TBR automatically by Priority, Stage, and Owned status so you never stall.',
    },
    {
      id: 'attention',
      label: 'Stale-Book Radar',
      metric: 'Pace & Days Left',
      detail: 'Flags books untouched for 14+ days with live reading pace and days-to-finish math.',
    },
    {
      id: 'wrapped',
      label: 'Annual Wrapped',
      metric: 'Reading Wrapped',
      detail: 'Automatically compiles your yearly finished ledger, top genres, hours read, and reviews.',
    },
  ],
  moduleCategories: ['Analytics', 'Queue', 'Library', 'Notes', 'Wrapped'],
  modules: [
    {
      id: 'reading-telemetry-hub',
      number: '01',
      shortLabel: 'Analytics Hub',
      title: 'Library Telemetry & Charts Dashboard',
      category: 'Analytics',
      summary:
        'Four top-level KPI counters (Books Finished, Pages Finished, Hours Read, Notes Due) paired with six native Notion analytics charts.',
      whatItContains: [
        'Live Books Finished, Sum of Finished Pages, Sum of Hours Read, and Notes Due counters',
        'Finished per Month bar chart and 12-genre Donut Mix chart',
        'Rating Distribution and Average Rating by Genre horizontal bars',
        'Format Mix (Physical vs Ebook) and Reading Stage breakdown donuts',
      ],
      includedViews: [
        { name: 'KPI Header Strip', layout: 'Gallery', description: '4 single-number Notion metric blocks.' },
        { name: '6-Chart Analytics Grid', layout: 'Board', description: 'Monthly cadence, genre, rating, and format charts.' },
      ],
      keyFormulasAndProperties: ['Sum of Finished Pages', 'Sum of Hours Read', 'Avg Rating by Genre'],
      connectedDatabases: ['Master Library', 'Reading Sessions', 'Highlights & Notes'],
      includedSubTemplates: ['Monthly Reading Snapshot'],
    },
    {
      id: 'smart-tbr-queue',
      number: '02',
      shortLabel: 'Up Next Queue',
      title: 'Up Next (Ranked) & Needs Attention Radar',
      category: 'Queue',
      summary:
        'Formula-scored reading queue that surfaces what to read next—paired with an automatic Stale-book detector.',
      whatItContains: [
        'Automatic Σ Queue Score ranking books by Next Up status, Priority, and Owned checkbox',
        'Needs Attention table flagging books untouched for 14+ days as Stale',
        'Live Σ Days Since Read, Σ Progress %, Σ Days to Finish, and Σ Reading Pace columns',
      ],
      includedViews: [
        { name: 'Up Next (Ranked)', layout: 'Table', description: 'Auto-sorted TBR queue by Queue Score.' },
        { name: 'Needs Attention', layout: 'Table', description: 'Stale book warning panel with pace math.' },
      ],
      keyFormulasAndProperties: ['Σ Queue Score', 'Σ Signal (Stale / On Track)', 'Σ Days to Finish', 'Σ Reading Pace'],
      connectedDatabases: ['Master Library', 'Reading Sessions'],
      includedSubTemplates: ['Quick Book Capture'],
    },
    {
      id: 'stage-kanban-gallery',
      number: '03',
      shortLabel: 'Kanban & Gallery',
      title: 'Reading Stage Board & Editorial Gallery',
      category: 'Library',
      summary:
        'Move books smoothly from Want to Read to Finished on a Kanban board or browse your entire collection as clean editorial cards.',
      whatItContains: [
        '5-column Stage Board (Want to Read, Next Up, Currently Reading, On Hold, Finished)',
        'Minimalist Editorial Gallery showing Author, Stage pill, and star rating',
        'Dedicated Did Not Finish (DNF) archive so abandoned books stay tracked honestly',
      ],
      includedViews: [
        { name: 'Reading Stage Kanban', layout: 'Board', description: 'Drag-and-drop stage progression.' },
        { name: 'Editorial Card Gallery', layout: 'Gallery', description: 'Visual catalog of every owned & TBR title.' },
      ],
      keyFormulasAndProperties: ['Reading Status', 'Author Relation', 'Rating Display'],
      connectedDatabases: ['Master Library', 'Authors', 'Bookshelves'],
      includedSubTemplates: ['Book Page Blueprint'],
    },
    {
      id: 'finished-wishlist-ledgers',
      number: '04',
      shortLabel: 'Finished Ledger',
      title: 'Finished Archive & Wishlist Tables',
      category: 'Library',
      summary:
        'Clean chronological ledger of finished books with Finish Date, Rating, and Review Written checkboxes alongside a prioritized Wishlist.',
      whatItContains: [
        'Finished Books table sorted by Finish Date with Rating and Review Written tracker',
        'Wishlist / TBR table filtering Genre tags, Priority, and Total Pages',
        '1-click review prompts so you capture key lessons right after finishing',
      ],
      includedViews: [
        { name: 'Finished Ledger', layout: 'Table', description: 'Chronological reading archive with ratings.' },
        { name: 'Wishlist TBR Table', layout: 'Table', description: 'Unowned titles sorted by priority and length.' },
      ],
      keyFormulasAndProperties: ['Finish Month Key', 'Review Pending Filter'],
      connectedDatabases: ['Master Library', 'Highlights & Notes'],
      includedSubTemplates: ['Post-Read Book Review'],
    },
    {
      id: 'reading-timeline',
      number: '05',
      shortLabel: 'Timeline',
      title: 'Reading Timeline & Pace Calendar',
      category: 'Analytics',
      summary:
        'Monthly Gantt reading timeline showing active books, On Track badges, and exact progress percentages relative to today.',
      whatItContains: [
        'Monthly Timeline view with live Today vertical marker',
        'Inline On Track / Stale signal and live completion ratio per book',
        'Direct calendar integration for pacing longer non-fiction and classics',
      ],
      includedViews: [
        { name: 'Reading Timeline', layout: 'Timeline', description: 'Visual duration spans across months.' },
        { name: 'Session Calendar', layout: 'Calendar', description: 'Daily page-logging streak view.' },
      ],
      keyFormulasAndProperties: ['Start -> Target Finish Span', 'Pace Velocity'],
      connectedDatabases: ['Master Library', 'Reading Sessions'],
      includedSubTemplates: ['Daily Reading Session'],
    },
    {
      id: 'highlights-notes-vault',
      number: '06',
      shortLabel: 'Notes & Quotes',
      title: 'Highlights, Quotes & Spaced Review Notes',
      category: 'Notes',
      summary:
        'Capture chapter quotes, permanent reflections, and Notes Due reminders so great books actually stick.',
      whatItContains: [
        'Structured Highlights database linked by Book, Page #, and Theme tag',
        'Notes Due counter surfacing finished books still awaiting synthesis',
        'Searchable quote vault for essays, talks, and personal reflection',
      ],
      includedViews: [
        { name: 'Notes Due Queue', layout: 'List', description: 'Finished books waiting for final synthesis.' },
        { name: 'Quote Gallery', layout: 'Gallery', description: 'Browse saved passages by topic.' },
      ],
      keyFormulasAndProperties: ['Notes Due Flag', 'Highlight Count Rollup'],
      connectedDatabases: ['Highlights & Notes', 'Master Library'],
      includedSubTemplates: ['Chapter Synthesis Note', 'Favorite Quote Card'],
    },
    {
      id: 'reading-goals-challenges',
      number: '07',
      shortLabel: 'Goals & Pace',
      title: 'Annual Goals & Reading Challenges',
      category: 'Analytics',
      summary:
        'Set annual book, page, or hour targets with automatic rollup progress bars—no manual tallying required.',
      whatItContains: [
        'Annual Book Goal & Page Target trackers rolled up automatically',
        'Genre diversity challenges and themed reading sprints',
        'Daily minutes-read habit tracker feeding Hours Read totals',
      ],
      includedViews: [
        { name: 'Annual Goal Tracker', layout: 'Board', description: 'Books, pages, and hours progress bars.' },
        { name: 'Themed Challenges', layout: 'Gallery', description: 'Curated reading lists and progress.' },
      ],
      keyFormulasAndProperties: ['Annual Pace Projection', 'Goal Completion %'],
      connectedDatabases: ['Reading Goals', 'Master Library', 'Reading Sessions'],
      includedSubTemplates: ['Annual Reading Challenge'],
    },
    {
      id: 'reading-wrapped',
      number: '08',
      shortLabel: 'Reading Wrapped',
      title: 'Reading Wrapped Annual Digest',
      category: 'Wrapped',
      summary:
        'An editorial year-in-review page automatically summarizing your top-rated reads, favorite genres, total pages, and longest streak.',
      whatItContains: [
        'Automatic year-end summary of Books Finished, Pages, Hours, and Top 5★ Picks',
        'Genre affinity breakdown and average rating per category',
        'Shareable reflection template celebrating your reading year',
      ],
      includedViews: [
        { name: '2026 Reading Wrapped', layout: 'Gallery', description: 'Editorial annual reading recap.' },
        { name: 'Hall of Fame (5★)', layout: 'Gallery', description: 'All-time five-star favorites.' },
      ],
      keyFormulasAndProperties: ['5-Star Filter', 'Yearly Page Total', 'Top Genre Rollup'],
      connectedDatabases: ['Annual Wrapped', 'Master Library', 'Authors'],
      includedSubTemplates: ['Year-End Reading Wrapped'],
    },
  ],
  databaseCountLabel: '8 Interconnected Reading Databases',
  databases: [
    { id: 'bt-db-1', name: 'Master Library', category: 'Core', purpose: 'Every book across Want to Read, Next Up, Reading, On Hold, Finished, and DNF.', keyProperties: ['Queue Score', 'Reading Status', 'Priority', 'Owned', 'Rating'], relations: ['Authors', 'Reading Sessions', 'Highlights & Notes'], viewsIncluded: ['Up Next (Ranked)', 'Needs Attention', 'Stage Kanban', 'Gallery'] },
    { id: 'bt-db-2', name: 'Reading Sessions', category: 'Telemetry', purpose: 'Daily page and duration logs computing Hours Read and Reading Pace.', keyProperties: ['Date', 'Pages Read', 'Minutes', 'Pace'], relations: ['Master Library', 'Reading Goals'], viewsIncluded: ['Session Log', 'Monthly Rollup'] },
    { id: 'bt-db-3', name: 'Highlights & Notes', category: 'Synthesis', purpose: 'Quotes, chapter takeaways, and Notes Due review reminders.', keyProperties: ['Page #', 'Theme', 'Review Due'], relations: ['Master Library'], viewsIncluded: ['Notes Due', 'Quote Vault'] },
    { id: 'bt-db-4', name: 'Authors Directory', category: 'Reference', purpose: 'Track favorite authors, completed titles, and average rating per writer.', keyProperties: ['Name', 'Avg Rating', 'Books Read'], relations: ['Master Library'], viewsIncluded: ['Author Index'] },
    { id: 'bt-db-5', name: 'Reading Goals', category: 'Goals', purpose: 'Annual book, page, and hour targets with automatic rollup math.', keyProperties: ['Year', 'Target', 'Completed %'], relations: ['Master Library', 'Reading Sessions'], viewsIncluded: ['Annual Targets'] },
    { id: 'bt-db-6', name: 'Bookshelves & Lists', category: 'Curation', purpose: 'Curated shelves for Philosophy, Sci-Fi Classics, and Studio Must-Reads.', keyProperties: ['Shelf Name', 'Book Count', 'Theme'], relations: ['Master Library'], viewsIncluded: ['Shelf Gallery'] },
    { id: 'bt-db-7', name: 'Reading Challenges', category: 'Goals', purpose: 'Themed sprints (e.g. 6 Books This Quarter, Classic Lit Sprint).', keyProperties: ['Challenge', 'Deadline', 'Progress'], relations: ['Master Library'], viewsIncluded: ['Active Sprints'] },
    { id: 'bt-db-8', name: 'Reading Wrapped', category: 'Annual', purpose: 'Automated annual reading digest and 5-star hall of fame.', keyProperties: ['Year', 'Top Genre', 'Total Pages', 'Hours'], relations: ['Master Library', 'Reading Goals'], viewsIncluded: ['Yearly Wrapped'] },
  ],
  readyTemplates: [
    { id: 'bt-tpl-1', title: 'Book Profile & Summary', triggerContext: 'Master Library', contains: 'Key thesis, chapter notes, favorite quotes, and 5-star rubric.' },
    { id: 'bt-tpl-2', title: 'Daily Reading Session', triggerContext: 'Reading Sessions', contains: 'Start/end page, minutes read, and 1-sentence takeaway.' },
    { id: 'bt-tpl-3', title: 'Post-Read Review Card', triggerContext: 'Finished Ledger', contains: 'What changed my mind, best quote, and who should read this.' },
    { id: 'bt-tpl-4', title: 'Highlight & Quote Entry', triggerContext: 'Highlights & Notes', contains: 'Exact quote, page reference, and linked mental model tag.' },
    { id: 'bt-tpl-5', title: 'Quarterly Reading Sprint', triggerContext: 'Reading Challenges', contains: 'Curated 6-book slate with target finish dates.' },
    { id: 'bt-tpl-6', title: 'Stale Book Rescue Check', triggerContext: 'Needs Attention', contains: 'Decide in 2 minutes: resume with 10 pages/day, hold, or DNF guilt-free.' },
    { id: 'bt-tpl-7', title: 'Author Deep-Dive Page', triggerContext: 'Authors Directory', contains: 'Complete bibliography checklist and linked books.' },
    { id: 'bt-tpl-8', title: 'Annual Reading Wrapped', triggerContext: 'Reading Wrapped', contains: 'Automated stats collage, top 3 reads, and next year’s shelf.' },
  ],
  weeklyRhythm: [
    { day: 'Daily', focus: 'Log Reading Session', checklist: 'Enter ending page in 10 seconds to update pace and timeline.' },
    { day: 'Wed', focus: 'Check Attention Radar', checklist: 'Rescue any Stale book before momentum fades.' },
    { day: 'Sun', focus: 'Distill Notes Due', checklist: 'Turn raw highlights into 3 lasting takeaways while fresh.' },
    { day: 'Month-End', focus: 'Inspect Charts & Queue', checklist: 'Review Finished per Month and pick your top-scored Next Up read.' },
  ],
};
