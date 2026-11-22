import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  Database,
  LayoutGrid,
  ListChecks,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  BOOK_GENRE_RATINGS,
  BOOK_TRACKER_OS_SPEC,
  BookPriority,
  BookRecord,
  computeLibraryKpis,
  computeQueueScore,
  computeReadingSignal,
  INITIAL_BOOKS,
  ReadingStage,
} from '../data/bookTrackerOsSpec';
import { filterOsDatabases } from '../data/osSpecTypes';

type BookTrackerTabId =
  | 'analytics'
  | 'queue'
  | 'library'
  | 'ledgers'
  | 'timeline'
  | 'system';

const STAGE_ORDER: ReadingStage[] = [
  'Want to Read',
  'Next Up',
  'Currently Reading',
  'On Hold',
  'Finished',
];

const GENRE_COLORS: Record<string, string> = {
  Fiction: '#66B483',
  Nonfiction: '#DB739F',
  'Science Fiction': '#E2BE63',
  Philosophy: '#48A9B6',
  Science: '#5B9BE6',
  'Self-Development': '#51A678',
  Fantasy: '#DFB664',
  Psychology: '#DF6E62',
  History: '#B884D8',
  Business: '#528FE4',
  Literature: '#D98C54',
  Technology: '#AE7ED1',
};

const STAGE_COLORS: Record<ReadingStage, string> = {
  'Want to Read': '#C7C5BE',
  'Next Up': '#5B9BE6',
  'Currently Reading': '#4B8BE0',
  'On Hold': '#E2BE63',
  Finished: '#66B483',
  'Did Not Finish': '#DF6E62',
};

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

const NotionDonutChart: React.FC<{
  title: string;
  subtitle: string;
  segments: DonutSegment[];
  centerValue: number;
  highlightLabel?: string | null;
  onSelectLabel?: (label: string | null) => void;
}> = ({
  title,
  subtitle,
  segments,
  centerValue,
  highlightLabel,
  onSelectLabel,
}) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  const radius = 56;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="rounded-[12px] border border-[#E9E9E7] bg-white p-4 flex flex-col justify-between gap-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F3] text-[12px] font-semibold text-[#37352F]">
          <BarChart3 className="w-3.5 h-3.5 text-[#6E6D68]" />
          <span>{title}</span>
        </span>
        <span className="font-mono text-[10.5px] text-[#9B9A97]">
          Notion Chart
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-1">
        <svg
          viewBox="0 0 152 152"
          className="w-[144px] h-[144px]"
          role="img"
          aria-label={`${title}: ${centerValue} total`}
        >
          <g transform="rotate(-90 76 76)">
            {segments.map((seg) => {
              const fraction = seg.value / total;
              const dash = Math.max(0, fraction * circumference - 2.4);
              const offset = -cumulative * circumference;
              cumulative += fraction;
              const dimmed =
                highlightLabel !== undefined &&
                highlightLabel !== null &&
                highlightLabel !== seg.label;
              return (
                <circle
                  key={seg.label}
                  cx="76"
                  cy="76"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={
                    highlightLabel === seg.label ? strokeWidth + 3 : strokeWidth
                  }
                  strokeDasharray={`${dash} ${circumference}`}
                  strokeDashoffset={offset}
                  opacity={dimmed ? 0.3 : 1}
                  className="transition-all duration-200 cursor-pointer"
                  onClick={() =>
                    onSelectLabel?.(
                      highlightLabel === seg.label ? null : seg.label
                    )
                  }
                />
              );
            })}
          </g>
          <text
            x="76"
            y="74"
            textAnchor="middle"
            className="fill-[#37352F] text-[26px] font-bold"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {centerValue}
          </text>
          <text
            x="76"
            y="92"
            textAnchor="middle"
            className="fill-[#6E6D68] text-[11px] font-medium"
          >
            Total
          </text>
        </svg>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {segments.map((seg) => {
            const active = highlightLabel === seg.label;
            return (
              <button
                key={seg.label}
                type="button"
                onClick={() =>
                  onSelectLabel?.(active ? null : seg.label)
                }
                className={`inline-flex items-center gap-1.5 text-[11px] transition-opacity cursor-pointer ${
                  highlightLabel && !active ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <span
                  style={{ backgroundColor: seg.color }}
                  className="w-2 h-2 rounded-[2px] shrink-0"
                />
                <span className="text-[#52504A] font-medium">
                  {seg.label}
                </span>
                <span className="font-mono text-[10px] text-[#9B9A97] tabular-nums">
                  ({seg.value})
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-[11.5px] text-[#6E6D68]">{subtitle}</p>
      </div>
    </div>
  );
};

interface BookTrackerOsWorkspaceTabsProps {
  onOpenBuy?: () => void;
  priceLabel?: string;
}

export const BookTrackerOsWorkspaceTabs: React.FC<
  BookTrackerOsWorkspaceTabsProps
> = ({ onOpenBuy, priceLabel = 'Duplicate for $29' }) => {
  const [activeTab, setActiveTab] = useState<BookTrackerTabId>('analytics');
  const [books, setBooks] = useState<BookRecord[]>(INITIAL_BOOKS);
  const [highlightedGenre, setHighlightedGenre] = useState<string | null>(null);
  const [highlightedStage, setHighlightedStage] = useState<string | null>(null);
  const [librarySubView, setLibrarySubView] = useState<'kanban' | 'gallery'>(
    'kanban'
  );
  const [galleryGenreFilter, setGalleryGenreFilter] = useState<string>('All');
  const [dbQuery, setDbQuery] = useState('');

  const kpis = useMemo(() => computeLibraryKpis(books), [books]);

  const upNextRanked = useMemo(() => {
    return books
      .filter((b) => b.stage === 'Next Up' || b.stage === 'Want to Read')
      .map((b) => ({ ...b, queueScore: computeQueueScore(b) }))
      .sort((a, b) => b.queueScore - a.queueScore);
  }, [books]);

  const currentlyReadingWithSignals = useMemo(() => {
    return books
      .filter((b) => b.stage === 'Currently Reading')
      .map((b) => ({ book: b, metrics: computeReadingSignal(b) }));
  }, [books]);

  const finishedBooks = useMemo(
    () => books.filter((b) => b.stage === 'Finished'),
    [books]
  );

  const wishlistBooks = useMemo(
    () => books.filter((b) => !b.owned && b.stage !== 'Finished'),
    [books]
  );

  const filteredDatabases = useMemo(
    () => filterOsDatabases(BOOK_TRACKER_OS_SPEC.databases, dbQuery),
    [dbQuery]
  );

  // Dynamic Chart Data from books state
  const finishedPerMonth = useMemo(() => {
    const months = ['2026-04', '2026-06', '2026-08', '2026-09', '2026-10'];
    return months.map((m) => ({
      month: m,
      count: books.filter((b) => b.stage === 'Finished' && b.finishMonth === m)
        .length,
    }));
  }, [books]);

  const genreSegments = useMemo<DonutSegment[]>(() => {
    const map = new Map<string, number>();
    for (const b of books) {
      const primary = b.genres[0] || 'Fiction';
      map.set(primary, (map.get(primary) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([label, value]) => ({
        label,
        value,
        color: GENRE_COLORS[label] || '#5B9BE6',
      }))
      .sort((a, b) => b.value - a.value);
  }, [books]);

  const formatSegments = useMemo<DonutSegment[]>(() => {
    const ebook = books.filter((b) => b.format === 'Ebook').length;
    const physical = books.filter((b) => b.format === 'Physical').length;
    return [
      { label: 'Ebook', value: ebook, color: '#5B9BE6' },
      { label: 'Physical', value: physical, color: '#E2BE63' },
    ];
  }, [books]);

  const stageSegments = useMemo<DonutSegment[]>(() => {
    const allStages: ReadingStage[] = [
      'Want to Read',
      'Next Up',
      'Currently Reading',
      'On Hold',
      'Finished',
      'Did Not Finish',
    ];
    return allStages
      .map((stage) => ({
        label: stage,
        value: books.filter((b) => b.stage === stage).length,
        color: STAGE_COLORS[stage],
      }))
      .filter((s) => s.value > 0);
  }, [books]);

  const ratingDist = useMemo(() => {
    const r4 = finishedBooks.filter((b) => b.rating === 4).length;
    const r5 = finishedBooks.filter((b) => b.rating === 5).length;
    return [
      { stars: '4★', count: r4 },
      { stars: '5★', count: r5 },
    ];
  }, [finishedBooks]);

  // Interactive mutations
  const handleToggleOwned = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, owned: !b.owned } : b))
    );
  };

  const handleCyclePriority = (id: string) => {
    const nextMap: Record<BookPriority, BookPriority> = {
      High: 'Medium',
      Medium: 'Low',
      Low: 'High',
    };
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, priority: nextMap[b.priority] } : b
      )
    );
  };

  const handleLogReadingSession = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const nextPages = Math.min(b.totalPages, b.pagesRead + 25);
        const finishedNow = nextPages >= b.totalPages;
        return {
          ...b,
          pagesRead: nextPages,
          hoursRead: Number((b.hoursRead + 0.8).toFixed(1)),
          daysSinceRead: 0,
          readingPace: Math.max(b.readingPace ?? 10, 12.5),
          stage: finishedNow ? 'Finished' : b.stage,
          finishDate: finishedNow ? 'October 22, 2026' : b.finishDate,
          finishMonth: finishedNow ? '2026-10' : b.finishMonth,
          rating: finishedNow ? 5 : b.rating,
        };
      })
    );
  };

  const handleAdvanceStage = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        const idx = STAGE_ORDER.indexOf(b.stage);
        const nextStage = STAGE_ORDER[(idx + 1) % STAGE_ORDER.length];
        const isNowFinished = nextStage === 'Finished';
        return {
          ...b,
          stage: nextStage,
          pagesRead: isNowFinished ? b.totalPages : b.pagesRead,
          hoursRead:
            isNowFinished && b.hoursRead === 0 ? 3.0 : b.hoursRead,
          finishDate: isNowFinished
            ? b.finishDate || 'October 24, 2026'
            : b.finishDate,
          finishMonth: isNowFinished ? b.finishMonth || '2026-10' : b.finishMonth,
          rating: isNowFinished ? b.rating || 5 : b.rating,
          notesDue: isNowFinished ? true : b.notesDue,
        };
      })
    );
  };

  const handleToggleReviewWritten = (id: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              reviewWritten: !b.reviewWritten,
              notesDue: b.reviewWritten ? true : false,
            }
          : b
      )
    );
  };

  const tabs: Array<{ id: BookTrackerTabId; num: string; label: string }> = [
    { id: 'analytics', num: '01', label: 'Library Analytics' },
    { id: 'queue', num: '02', label: 'Queue & Attention' },
    { id: 'library', num: '03', label: 'Stage Board & Gallery' },
    { id: 'ledgers', num: '04', label: 'Finished & Wishlist' },
    { id: 'timeline', num: '05', label: 'Timeline & Wrapped' },
    { id: 'system', num: '06', label: 'System · 8 DBs' },
  ];

  const allGenres = useMemo(() => {
    const s = new Set<string>();
    books.forEach((b) => b.genres.forEach((g) => s.add(g)));
    return ['All', ...Array.from(s).sort()];
  }, [books]);

  return (
    <div
      data-testid="book-tracker-os-workspace-tabs"
      className="rounded-[20px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
    >
      {/* Top Notion Workspace Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#FAF9F6] border-b border-[#E9E9E7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12.5px] text-[#6E6D68] min-w-0">
          <span className="w-5 h-5 rounded-[5px] bg-[#0F7B6C] text-white inline-flex items-center justify-center shrink-0">
            <BookOpen className="w-3 h-3" />
          </span>
          <span className="font-semibold text-[#37352F] truncate">
            Book Tracker OS
          </span>
          <span className="text-[#C7C5BE]">/</span>
          <span className="truncate font-mono text-[11.5px]">
            Personal Library Telemetry · {kpis.totalBooks} Books
          </span>
        </div>

        {onOpenBuy && (
          <button
            type="button"
            onClick={onOpenBuy}
            className="h-8 px-3.5 rounded-[8px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{priceLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Live Top 4-Column Editorial Notion KPI Strip (Always Synced to State) */}
      <div
        data-testid="book-tracker-live-kpis"
        className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x divide-[#E9E9E7] border-b border-[#E9E9E7] bg-white"
      >
        {[
          {
            pill: 'Books Finished',
            sub: 'Count all',
            value: String(kpis.booksFinished),
            testId: 'kpi-books-finished',
          },
          {
            pill: 'Pages Finished',
            sub: 'Sum of Finished Pages',
            value: kpis.pagesFinished.toLocaleString('en-US'),
            testId: 'kpi-pages-finished',
          },
          {
            pill: 'Hours Read',
            sub: 'Sum of Hours Read',
            value: kpis.hoursRead.toFixed(1),
            testId: 'kpi-hours-read',
          },
          {
            pill: 'Notes Due',
            sub: 'Count all',
            value: String(kpis.notesDue),
            testId: 'kpi-notes-due',
          },
        ].map((kpi) => (
          <div
            key={kpi.pill}
            className="px-4 sm:px-6 py-4 sm:py-5 flex flex-col items-center text-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F6F3] text-[11.5px] font-medium text-[#52504A]">
              {kpi.pill}
            </span>
            <div className="space-y-0.5">
              <p className="text-[11px] font-semibold text-[#6E6D68]">
                {kpi.sub}
              </p>
              <p
                data-testid={kpi.testId}
                className="font-editorial text-[32px] sm:text-[38px] font-semibold leading-none tracking-[-0.02em] text-[#37352F] tabular-nums"
              >
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notion Interactive Tabs */}
      <div
        role="tablist"
        aria-label="Book Tracker OS workspace modules"
        className="px-4 sm:px-6 py-2.5 bg-white border-b border-[#E9E9E7] flex items-center gap-1.5 overflow-x-auto no-scrollbar"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`book-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#37352F] text-white'
                  : 'text-[#52504A] hover:bg-[#F7F6F3] hover:text-[#37352F]'
              }`}
            >
              <span
                className={`font-mono text-[10.5px] tabular-nums ${
                  isActive ? 'text-white/75' : 'text-[#9B9A97]'
                }`}
              >
                {tab.num}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace Body */}
      <div className="p-4 sm:p-6 lg:p-7 bg-[#FAF9F6]/40">
        {/* TAB 01: LIBRARY ANALYTICS (6 NOTION CHARTS) */}
        {activeTab === 'analytics' && (
          <div
            data-testid="book-panel-analytics"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {/* Chart 1: Finished per Month */}
            <div className="rounded-[12px] border border-[#E9E9E7] bg-white p-4 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F3] text-[12px] font-semibold text-[#37352F]">
                  <BarChart3 className="w-3.5 h-3.5 text-[#5B9BE6]" />
                  <span>Finished per Month</span>
                </span>
                <span className="font-mono text-[11px] text-[#6E6D68] tabular-nums">
                  {kpis.booksFinished} in 2026
                </span>
              </div>

              <div className="pt-2">
                <svg
                  viewBox="0 0 360 156"
                  className="w-full h-[156px]"
                  role="img"
                  aria-label="Books finished per month bar chart"
                >
                  {[0, 1, 2, 3].map((tick) => {
                    const y = 128 - tick * 34;
                    return (
                      <g key={tick}>
                        <line
                          x1="28"
                          y1={y}
                          x2="346"
                          y2={y}
                          stroke="#F1F1EF"
                          strokeDasharray="2 2"
                        />
                        <text
                          x="18"
                          y={y + 3}
                          textAnchor="end"
                          className="fill-[#9B9A97] text-[10px]"
                        >
                          {tick}
                        </text>
                      </g>
                    );
                  })}
                  {finishedPerMonth.map((item, idx) => {
                    const x = 58 + idx * 60;
                    const barHeight = Math.min(3, item.count) * 34;
                    const y = 128 - barHeight;
                    return (
                      <g key={item.month}>
                        <rect
                          x={x - 10}
                          y={y}
                          width="20"
                          height={Math.max(2, barHeight)}
                          rx="3"
                          fill="#5B9BE6"
                        />
                        <text
                          x={x}
                          y={y - 6}
                          textAnchor="middle"
                          className="fill-[#52504A] text-[10.5px] font-semibold"
                        >
                          {item.count}
                        </text>
                        <text
                          x={x}
                          y="144"
                          textAnchor="middle"
                          className="fill-[#6E6D68] text-[9.5px]"
                        >
                          {item.month}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <p className="text-center text-[11.5px] text-[#6E6D68]">
                Books finished per month
              </p>
            </div>

            {/* Chart 2: Genre Mix Donut */}
            <NotionDonutChart
              title="Genre Mix"
              subtitle="Library by primary genre (click legend to isolate)"
              segments={genreSegments}
              centerValue={books.length}
              highlightLabel={highlightedGenre}
              onSelectLabel={setHighlightedGenre}
            />

            {/* Chart 3: Rating Distribution */}
            <div className="rounded-[12px] border border-[#E9E9E7] bg-white p-4 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F3] text-[12px] font-semibold text-[#37352F]">
                  <Star className="w-3.5 h-3.5 text-[#D98C54]" />
                  <span>Rating Distribution</span>
                </span>
                <span className="font-mono text-[11px] text-[#6E6D68] tabular-nums">
                  Avg 4.5 / 5
                </span>
              </div>

              <svg
                viewBox="0 0 320 144"
                className="w-full h-[144px]"
                role="img"
                aria-label="Rating distribution chart"
              >
                {[0, 1, 2, 3, 4].map((tick) => {
                  const y = 118 - tick * 24;
                  return (
                    <g key={tick}>
                      <line
                        x1="28"
                        y1={y}
                        x2="300"
                        y2={y}
                        stroke="#F1F1EF"
                        strokeDasharray="2 2"
                      />
                      <text
                        x="18"
                        y={y + 3}
                        textAnchor="end"
                        className="fill-[#9B9A97] text-[10px]"
                      >
                        {tick}
                      </text>
                    </g>
                  );
                })}
                {ratingDist.map((item, idx) => {
                  const x = idx === 0 ? 105 : 225;
                  const h = Math.min(4, item.count) * 24;
                  const y = 118 - h;
                  return (
                    <g key={item.stars}>
                      <rect
                        x={x - 14}
                        y={y}
                        width="28"
                        height={Math.max(2, h)}
                        rx="3"
                        fill="#D98C54"
                      />
                      <text
                        x={x}
                        y={y - 6}
                        textAnchor="middle"
                        className="fill-[#52504A] text-[11px] font-semibold"
                      >
                        {item.count}
                      </text>
                      <text
                        x={x}
                        y="134"
                        textAnchor="middle"
                        className="fill-[#6E6D68] text-[10.5px]"
                      >
                        {item.stars}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <p className="text-center text-[11.5px] text-[#6E6D68]">
                How you rate what you finish
              </p>
            </div>

            {/* Chart 4: Rating by Genre Horizontal Purple Bars */}
            <div className="rounded-[12px] border border-[#E9E9E7] bg-white p-4 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F6F3] text-[12px] font-semibold text-[#37352F]">
                  <BarChart3 className="w-3.5 h-3.5 text-[#B884D8]" />
                  <span>Rating by Genre</span>
                </span>
                <span className="font-mono text-[11px] text-[#6E6D68]">
                  Scale 0 – 5★
                </span>
              </div>

              <div className="space-y-2 py-1">
                {BOOK_GENRE_RATINGS.map((row) => (
                  <div
                    key={row.genre}
                    className="grid grid-cols-12 items-center gap-2 text-[11.5px]"
                  >
                    <span className="col-span-4 text-right text-[#52504A] truncate">
                      {row.genre}
                    </span>
                    <div className="col-span-7 h-3 rounded-[3px] bg-[#F7F6F3] overflow-hidden">
                      <div
                        style={{ width: `${(row.avgRating / 5) * 100}%` }}
                        className="h-full rounded-[3px] bg-[#BC8BE0]"
                      />
                    </div>
                    <span className="col-span-1 font-mono text-[11px] font-semibold text-[#52504A] tabular-nums">
                      {row.avgRating.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-[11.5px] text-[#6E6D68]">
                Average rating by genre
              </p>
            </div>

            {/* Chart 5: Format Mix */}
            <NotionDonutChart
              title="Format Mix"
              subtitle="Physical vs Ebook editions"
              segments={formatSegments}
              centerValue={books.length}
            />

            {/* Chart 6: Reading Stages */}
            <NotionDonutChart
              title="Reading Stages"
              subtitle="Your library across its reading stages"
              segments={stageSegments}
              centerValue={books.length}
              highlightLabel={highlightedStage}
              onSelectLabel={setHighlightedStage}
            />
          </div>
        )}

        {/* TAB 02: UP NEXT (RANKED) & NEEDS ATTENTION */}
        {activeTab === 'queue' && (
          <div data-testid="book-panel-queue" className="space-y-6">
            {/* Up Next (Ranked) */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E9E7] text-[12.5px] font-semibold text-[#37352F]">
                  <ListChecks className="w-3.5 h-3.5 text-[#2383E2]" />
                  <span>Up Next (Ranked)</span>
                </span>
                <span className="text-[12px] text-[#6E6D68]">
                  Toggle <strong>Owned</strong> or click <strong>Priority</strong> to watch Σ Queue Score re-rank live
                </span>
              </div>

              <div className="rounded-[12px] border border-[#E9E9E7] bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-medium text-[#6E6D68]">
                      <th className="py-2.5 px-3.5">Aa Title</th>
                      <th className="py-2.5 px-3 text-right">Σ Queue Score</th>
                      <th className="py-2.5 px-3">Reading Status</th>
                      <th className="py-2.5 px-3">Priority</th>
                      <th className="py-2.5 px-3 text-center">Owned</th>
                      <th className="py-2.5 px-3 text-right"># Total Pages</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                    {upNextRanked.map((book) => (
                      <tr
                        key={book.id}
                        data-testid={`queue-row-${book.id}`}
                        className="hover:bg-[#FAF9F6]/80 transition-colors"
                      >
                        <td className="py-2.5 px-3.5 font-semibold text-[#37352F]">
                          {book.title}
                        </td>
                        <td
                          data-testid={`queue-score-${book.id}`}
                          className="py-2.5 px-3 text-right font-mono font-bold text-[#37352F] tabular-nums"
                        >
                          {book.queueScore}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11.5px] font-medium ${
                              book.stage === 'Next Up'
                                ? 'bg-[#EBF3FC] text-[#2383E2]'
                                : 'bg-[#F1F1EF] text-[#52504A]'
                            }`}
                          >
                            {book.stage}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            type="button"
                            onClick={() => handleCyclePriority(book.id)}
                            title="Click to cycle priority"
                            className={`px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold cursor-pointer transition-opacity hover:opacity-80 ${
                              book.priority === 'High'
                                ? 'bg-[#FDECEC] text-[#C43B3B]'
                                : book.priority === 'Medium'
                                ? 'bg-[#FDF4E7] text-[#B45309]'
                                : 'bg-[#F1F1EF] text-[#52504A]'
                            }`}
                          >
                            {book.priority}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            data-testid={`queue-owned-${book.id}`}
                            aria-label={`Toggle owned for ${book.title}`}
                            onClick={() => handleToggleOwned(book.id)}
                            className={`w-4.5 h-4.5 rounded-[4px] border inline-flex items-center justify-center transition-colors cursor-pointer ${
                              book.owned
                                ? 'bg-[#2383E2] border-[#2383E2] text-white'
                                : 'bg-white border-[#C7C5BE] hover:border-[#2383E2]'
                            }`}
                          >
                            {book.owned && (
                              <Check className="w-3 h-3 stroke-[2.8]" />
                            )}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#52504A] tabular-nums">
                          {book.totalPages}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Needs Attention Radar */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E9E9E7] text-[12.5px] font-semibold text-[#37352F]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#C43B3B]" />
                  <span>Needs Attention &amp; Active Pace Radar</span>
                </span>
                <span className="text-[12px] text-[#6E6D68]">
                  Click <strong>Log +25 Pages</strong> to rescue a Stale book live
                </span>
              </div>

              <div className="rounded-[12px] border border-[#E9E9E7] bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-medium text-[#6E6D68]">
                      <th className="py-2.5 px-3.5">Aa Title</th>
                      <th className="py-2.5 px-3">Σ Signal</th>
                      <th className="py-2.5 px-3 text-right">Σ Days Since Read</th>
                      <th className="py-2.5 px-3 text-right">Σ Progress</th>
                      <th className="py-2.5 px-3 text-right">Σ Days to Finish</th>
                      <th className="py-2.5 px-3 text-right">Σ Pace</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                    {currentlyReadingWithSignals.map(({ book, metrics }) => (
                      <tr key={book.id} data-testid={`attention-row-${book.id}`}>
                        <td className="py-3 px-3.5 font-semibold text-[#37352F]">
                          {book.title}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            data-testid={`signal-${book.id}`}
                            className={`inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold ${
                              metrics.signal === 'Stale'
                                ? 'bg-[#FDECEC] text-[#C43B3B]'
                                : 'bg-[#E7F4F0] text-[#0F7B6C]'
                            }`}
                          >
                            {metrics.signal === 'Stale' ? 'Stale' : 'On Track'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#52504A]">
                          {book.daysSinceRead ?? 0}d
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-[#37352F]">
                          {metrics.progressPct}%
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#52504A]">
                          {metrics.daysToFinish}d
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#52504A]">
                          {(book.readingPace ?? 10).toFixed(1)} pp/d
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            type="button"
                            data-testid={`log-pages-${book.id}`}
                            onClick={() => handleLogReadingSession(book.id)}
                            className="px-2.5 py-1 rounded-[6px] bg-[#0F7B6C] hover:bg-[#0B6357] text-white text-[11.5px] font-semibold whitespace-nowrap cursor-pointer transition-colors"
                          >
                            Log +25 Pages
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 03: STAGE BOARD & EDITORIAL GALLERY */}
        {activeTab === 'library' && (
          <div data-testid="book-panel-library" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center p-1 rounded-[9px] bg-white border border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={() => setLibrarySubView('kanban')}
                  className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                    librarySubView === 'kanban'
                      ? 'bg-[#37352F] text-white'
                      : 'text-[#6E6D68] hover:text-[#37352F]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Stage Kanban</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLibrarySubView('gallery')}
                  className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                    librarySubView === 'gallery'
                      ? 'bg-[#37352F] text-white'
                      : 'text-[#6E6D68] hover:text-[#37352F]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Editorial Gallery</span>
                </button>
              </div>

              {librarySubView === 'gallery' ? (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {allGenres.slice(0, 7).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGalleryGenreFilter(g)}
                      className={`px-2.5 py-1 rounded-[6px] text-[11.5px] font-semibold border whitespace-nowrap shrink-0 cursor-pointer ${
                        galleryGenreFilter === g
                          ? 'bg-[#37352F] text-white border-[#37352F]'
                          : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] text-[#6E6D68]">
                  Click <strong>Advance →</strong> on any card to move books across stages and update KPIs live
                </p>
              )}
            </div>

            {librarySubView === 'kanban' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {STAGE_ORDER.map((stage) => {
                  const colBooks = books.filter((b) => b.stage === stage);
                  return (
                    <div
                      key={stage}
                      className="rounded-[12px] bg-white border border-[#E9E9E7] p-3 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-[11.5px] font-semibold text-[#37352F]">
                        <span className="truncate">{stage}</span>
                        <span className="font-mono text-[#6E6D68] tabular-nums">
                          {colBooks.length}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {colBooks.map((book) => (
                          <div
                            key={book.id}
                            className="rounded-[9px] bg-[#FAF9F6] border border-[#E9E9E7] p-2.5 space-y-1.5"
                          >
                            <p className="text-[12.5px] font-semibold text-[#37352F] leading-snug">
                              {book.title}
                            </p>
                            <p className="text-[11px] text-[#6E6D68]">
                              {book.author}
                            </p>
                            <div className="flex items-center justify-between pt-1">
                              <span className="font-mono text-[10.5px] text-[#6E6D68] tabular-nums">
                                {book.rating ? `${book.rating}★` : `${book.totalPages}p`}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleAdvanceStage(book.id)}
                                className="text-[10.5px] font-semibold text-[#2383E2] hover:underline cursor-pointer"
                              >
                                Advance →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {books
                  .filter(
                    (b) =>
                      galleryGenreFilter === 'All' ||
                      b.genres.includes(galleryGenreFilter)
                  )
                  .map((book) => (
                    <div
                      key={book.id}
                      className="rounded-[12px] bg-white border border-[#E9E9E7] p-4 space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <p className="text-[13.5px] font-bold text-[#37352F] leading-snug">
                          {book.title}
                        </p>
                        <p className="text-[12px] text-[#6E6D68]">
                          {book.author}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#F1F1EF] text-[11px]">
                        <span className="px-2 py-0.5 rounded-[5px] bg-[#F7F6F3] text-[#37352F] font-medium">
                          {book.stage}
                        </span>
                        <span className="font-mono font-semibold text-[#B45309] tabular-nums">
                          {book.rating ? `${'★'.repeat(book.rating)}` : book.format}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 04: FINISHED LEDGER & WISHLIST */}
        {activeTab === 'ledgers' && (
          <div data-testid="book-panel-ledgers" className="space-y-6">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[13.5px] font-bold text-[#37352F]">
                  Finished Books Ledger ({finishedBooks.length})
                </span>
                <span className="text-[12px] text-[#6E6D68]">
                  Toggle <strong>Review Written</strong> to clear your top <strong>Notes Due</strong> counter
                </span>
              </div>

              <div className="rounded-[12px] border border-[#E9E9E7] bg-white overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-medium text-[#6E6D68]">
                      <th className="py-2.5 px-3.5">Aa Title</th>
                      <th className="py-2.5 px-3">Author</th>
                      <th className="py-2.5 px-3">Finish Date</th>
                      <th className="py-2.5 px-3 text-right">Rating</th>
                      <th className="py-2.5 px-3 text-center">Review Written</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                    {finishedBooks.map((book) => (
                      <tr key={book.id}>
                        <td className="py-2.5 px-3.5 font-semibold text-[#37352F]">
                          {book.title}
                        </td>
                        <td className="py-2.5 px-3 text-[#52504A]">
                          {book.author}
                        </td>
                        <td className="py-2.5 px-3 text-[#6E6D68] font-mono text-[12px] tabular-nums">
                          {book.finishDate || '2026'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-[#B45309] tabular-nums">
                          {book.rating ?? 5} / 5
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            type="button"
                            aria-label={`Toggle review written for ${book.title}`}
                            onClick={() => handleToggleReviewWritten(book.id)}
                            className={`w-4.5 h-4.5 rounded-[4px] border inline-flex items-center justify-center transition-colors cursor-pointer ${
                              book.reviewWritten
                                ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                                : 'bg-white border-[#C7C5BE] hover:border-[#0F7B6C]'
                            }`}
                          >
                            {book.reviewWritten && (
                              <Check className="w-3 h-3 stroke-[2.8]" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Wishlist / Unowned TBR */}
            <div className="space-y-2.5">
              <span className="text-[13.5px] font-bold text-[#37352F]">
                Wishlist &amp; Unowned TBR ({wishlistBooks.length})
              </span>
              <div className="rounded-[12px] border border-[#E9E9E7] bg-white divide-y divide-[#F1F1EF]">
                {wishlistBooks.map((book) => (
                  <div
                    key={book.id}
                    className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[13px]"
                  >
                    <div>
                      <p className="font-semibold text-[#37352F]">
                        {book.title}{' '}
                        <span className="font-normal text-[#6E6D68]">
                          · {book.author}
                        </span>
                      </p>
                      <p className="text-[11.5px] text-[#6E6D68]">
                        {book.genres.join(' · ')} · {book.totalPages} pages
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleOwned(book.id)}
                      className="px-2.5 py-1 rounded-[6px] border border-[#E9E9E7] bg-[#FAF9F6] hover:bg-[#EBF3FC] hover:text-[#2383E2] text-[11.5px] font-semibold text-[#37352F] cursor-pointer"
                    >
                      Mark Owned (+10 Score)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 05: READING TIMELINE & 2026 READING WRAPPED */}
        {activeTab === 'timeline' && (
          <div data-testid="book-panel-timeline" className="space-y-5">
            {/* Monthly Gantt Timeline */}
            <div className="rounded-[12px] border border-[#E9E9E7] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[13px] font-bold text-[#37352F]">
                  <Calendar className="w-4 h-4 text-[#0F7B6C]" />
                  <span>Reading Timeline · October – November 2026</span>
                </span>
                <span className="font-mono text-[11px] text-[#E03E3E] font-semibold">
                  ● Today Marker: Oct 18
                </span>
              </div>

              <div className="relative rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6] p-3.5 overflow-hidden space-y-3">
                {/* Day Header */}
                <div className="grid grid-cols-10 text-center font-mono text-[10px] text-[#9B9A97] border-b border-[#E9E9E7] pb-2 tabular-nums">
                  {[
                    'Oct 4',
                    'Oct 8',
                    'Oct 12',
                    'Oct 16',
                    'Oct 18',
                    'Oct 22',
                    'Oct 26',
                    'Oct 30',
                    'Nov 4',
                    'Nov 8',
                  ].map((d) => (
                    <span
                      key={d}
                      className={
                        d === 'Oct 18' ? 'text-[#E03E3E] font-bold' : ''
                      }
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Red Today Vertical Line */}
                <div
                  aria-hidden="true"
                  style={{ left: '45%' }}
                  className="absolute top-9 bottom-3 w-[1.5px] bg-[#E03E3E]/70 pointer-events-none"
                />

                {/* Active Timeline Bars */}
                <div className="space-y-2.5 relative z-10">
                  {currentlyReadingWithSignals.map(({ book, metrics }, idx) => (
                    <div
                      key={book.id}
                      style={{
                        marginLeft: idx === 0 ? '14%' : '26%',
                        width: idx === 0 ? '58%' : '46%',
                      }}
                      className="rounded-[8px] bg-white border border-[#E9E9E7] shadow-[0_2px_6px_rgba(55,53,47,0.05)] px-3 py-2 flex items-center justify-between gap-2 text-[12px]"
                    >
                      <span className="font-semibold text-[#37352F] truncate">
                        {book.title}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10.5px] font-semibold ${
                            metrics.signal === 'Stale'
                              ? 'bg-[#FDECEC] text-[#C43B3B]'
                              : 'bg-[#E7F4F0] text-[#0F7B6C]'
                          }`}
                        >
                          {metrics.signal}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#37352F] tabular-nums">
                          {metrics.progressPct}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2026 Reading Wrapped Editorial Digest */}
            <div className="rounded-[14px] bg-white border border-[#E9E9E7] p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#0F7B6C]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>2026 READING WRAPPED · AUTO-COMPILED</span>
                  </p>
                  <h4 className="font-display text-[19px] font-bold text-[#37352F]">
                    Your year in pages, favorites, and lasting notes.
                  </h4>
                </div>
                <span className="font-mono text-[11.5px] font-semibold text-[#52504A] tabular-nums">
                  {kpis.booksFinished} Finished · {kpis.pagesFinished.toLocaleString('en-US')} Pages
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-3.5 space-y-1">
                  <p className="font-mono text-[10.5px] uppercase text-[#6E6D68]">
                    5★ Hall of Fame
                  </p>
                  <p className="text-[13px] font-bold text-[#37352F]">
                    Atomic Habits, Dune, Cosmos
                  </p>
                  <p className="text-[11.5px] text-[#6E6D68]">
                    50% of finished books rated 5/5
                  </p>
                </div>
                <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-3.5 space-y-1">
                  <p className="font-mono text-[10.5px] uppercase text-[#6E6D68]">
                    Highest-Rated Genre
                  </p>
                  <p className="text-[13px] font-bold text-[#37352F]">
                    Self-Development (5.0★)
                  </p>
                  <p className="text-[11.5px] text-[#6E6D68]">
                    Followed by Sci-Fi &amp; Fiction (4.5★)
                  </p>
                </div>
                <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-3.5 space-y-1">
                  <p className="font-mono text-[10.5px] uppercase text-[#6E6D68]">
                    Reading Investment
                  </p>
                  <p className="text-[13px] font-bold text-[#37352F] tabular-nums">
                    {kpis.hoursRead.toFixed(1)} Deep Reading Hours
                  </p>
                  <p className="text-[11.5px] text-[#6E6D68]">
                    Peak month: September (2 books)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 06: SYSTEM VAULT (8 DATABASES) */}
        {activeTab === 'system' && (
          <div data-testid="book-panel-system" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#37352F]">
                <Database className="w-4 h-4 text-[#0F7B6C]" />
                <span>
                  Reading Architecture ({filteredDatabases.length} of{' '}
                  {BOOK_TRACKER_OS_SPEC.databases.length} databases)
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#6E6D68] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={dbQuery}
                  onChange={(e) => setDbQuery(e.target.value)}
                  placeholder="Filter 8 databases..."
                  className="w-full h-8 pl-8 pr-3 rounded-[8px] border border-[#E9E9E7] bg-white text-[12.5px] text-[#37352F] placeholder:text-[#9B9A97] focus:outline-none focus:border-[#0F7B6C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredDatabases.map((db) => (
                <div
                  key={db.id}
                  className="rounded-[11px] border border-[#E9E9E7] bg-white p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-[13.5px] font-bold text-[#37352F] truncate">
                      {db.name}
                    </h5>
                    <span className="font-mono text-[10.5px] text-[#0F7B6C] font-semibold shrink-0">
                      {db.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#52504A] leading-[1.45]">
                    {db.purpose}
                  </p>
                  <p className="font-mono text-[10.5px] text-[#6E6D68] pt-1 border-t border-[#F1F1EF]">
                    Links → {db.relations.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
