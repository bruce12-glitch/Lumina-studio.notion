import React, { useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  ListChecks,
} from 'lucide-react';
import { BOOK_TRACKER_OS_SPEC } from '../data/bookTrackerOsSpec';
import { BookTrackerOsWorkspaceTabs } from './BookTrackerOsWorkspaceTabs';
import {
  FlagshipDeckSlideItem,
  FlagshipSlideDeck,
} from './FlagshipSlideDeck';
import { RealScreenshotStrip } from './RealScreenshotStrip';

export type BookTrackerStudioFilterId =
  | 'all'
  | 'telemetry'
  | 'queue'
  | 'library'
  | 'timeline';

export interface BookTrackerOsSlide {
  id: 'telemetry' | 'queue' | 'library' | 'timeline';
  stepNumber: string;
  shortLabel: string;
  label: string;
  badge: string;
  title: string;
  editorialAccent: string;
  description: string;
  beforeText: string;
  afterText: string;
  highlightMetric: string;
  includedModules: { title: string; details: string }[];
}

export const BOOK_TRACKER_OS_SLIDES: BookTrackerOsSlide[] = [
  {
    id: 'telemetry',
    stepNumber: '01',
    shortLabel: 'Reading Telemetry',
    label: '01 · Live KPIs & 6 Notion Charts',
    badge: 'Reading Analytics',
    title: 'Watch your reading habit grow in',
    editorialAccent: 'live Notion charts.',
    description:
      'Four live counters—Books, Pages, Hours, Notes Due—plus six charts for cadence, genre mix, and ratings.',
    beforeText:
      'Forgetting how many books you finished last quarter or which genres hit 5 stars.',
    afterText:
      'Live monthly bars, 12-genre donuts, format splits, and average rating by genre.',
    highlightMetric: '4 KPI Counters · 6 Live Charts',
    includedModules: [
      {
        title: 'KPI Counter Row',
        details: 'Auto rollups for Finished Books, Pages, Hours Read, and Notes Due.',
      },
      {
        title: 'Monthly & Genre Charts',
        details: 'Spot peak reading months and balance fiction vs. nonfiction.',
      },
      {
        title: 'Rating & Format Split',
        details: 'Compare Physical vs. Ebook completion and top-rated genres.',
      },
    ],
  },
  {
    id: 'queue',
    stepNumber: '02',
    shortLabel: 'Smart TBR Queue',
    label: '02 · Σ Queue Score & Stale-Book Radar',
    badge: 'Auto-Ranked TBR',
    title: 'Know what to read next—and',
    editorialAccent: 'rescue stalled reads.',
    description:
      'Σ Queue Score ranks your TBR by Priority and Owned status while Stale Radar flags books untouched 14+ days.',
    beforeText:
      'Buying new books while five half-read titles sit forgotten on your nightstand.',
    afterText:
      'Auto-ranked Up Next list plus live Stale flags, pace, and days-to-finish math.',
    highlightMetric: 'Σ Queue Score · Σ Stale Signal',
    includedModules: [
      {
        title: 'Up Next Formula',
        details: 'Scores titles (+25 Next Up, +30 High Priority, +10 Owned) automatically.',
      },
      {
        title: 'Needs Attention Radar',
        details: 'Flags books idle 14+ days with pace and estimated days to finish.',
      },
      {
        title: 'Clean DNF & On Hold',
        details: 'Pause or drop books without breaking your active pace math.',
      },
    ],
  },
  {
    id: 'library',
    stepNumber: '03',
    shortLabel: 'Board & Gallery',
    label: '03 · Stage Kanban, Gallery & Ledgers',
    badge: 'Library Views',
    title: 'Browse your books like a',
    editorialAccent: 'private library.',
    description:
      'Move titles across five Kanban stages, browse cover cards, and check off Reviews so key ideas stick.',
    beforeText:
      'Closing a great book and forgetting 90% of its arguments three weeks later.',
    afterText:
      'Notes Due prompts, Review Written checkboxes, and a searchable quote vault.',
    highlightMetric: '5-Stage Board · Notes Due Queue',
    includedModules: [
      {
        title: '5-Stage Kanban',
        details: 'Want to Read, Next Up, Reading, On Hold, and Finished.',
      },
      {
        title: 'Finished Ledger',
        details: 'Finish dates, star ratings, and Review Written checkboxes.',
      },
      {
        title: 'Quotes & Highlights',
        details: 'Link chapter notes and favorite passages back to each book.',
      },
    ],
  },
  {
    id: 'timeline',
    stepNumber: '04',
    shortLabel: 'Timeline & Wrapped',
    label: '04 · Reading Timeline & Annual Wrapped',
    badge: 'Pacing & Wrapped',
    title: 'Pace longer reads and keep your',
    editorialAccent: 'Reading Wrapped.',
    description:
      'See active reads on a monthly Gantt timeline—plus an auto-built Reading Wrapped digest every year.',
    beforeText:
      'No idea how long dense books take or what defined your reading year.',
    afterText:
      'Monthly pacing bars with On Track signals and an automated 5★ Hall of Fame.',
    highlightMetric: 'Monthly Gantt · 2026 Wrapped',
    includedModules: [
      {
        title: 'Monthly Timeline',
        details: 'Start → Finish spans with On Track status and completion %.',
      },
      {
        title: 'Annual Targets',
        details: 'Book, page, and hour goals that update on every session log.',
      },
      {
        title: 'Reading Wrapped',
        details: 'Yearly total of pages, hours read, top genre, and 5★ favorites.',
      },
    ],
  },
];

const BookSlideVisual: React.FC<{ slideId: BookTrackerOsSlide['id'] }> = ({
  slideId,
}) => {
  const [wizardOwned, setWizardOwned] = useState(true);
  const [duneOwned, setDuneOwned] = useState(false);

  if (slideId === 'telemetry') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Book Tracker OS / Reading Telemetry</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums">15 Books</span>
        </div>

        <div className="p-4 space-y-3.5">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Finished', value: '6' },
              { label: 'Pages', value: '2,379' },
              { label: 'Hours', value: '21.3' },
              { label: 'Notes Due', value: '5' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[9px] bg-[#FAF9F6] border border-[#E9E9E7] p-2.5 text-center"
              >
                <p className="text-[10px] text-[#6E6D68] font-medium truncate">
                  {stat.label}
                </p>
                <p className="font-editorial text-[20px] font-semibold text-[#37352F] tabular-nums mt-0.5">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6]/60 p-3 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#52504A]">
              <span>Average Rating by Genre</span>
              <span className="font-mono text-[#0F7B6C]">Self-Dev 5.0★</span>
            </div>
            {[
              { g: 'Self-Development', v: 5.0 },
              { g: 'Science Fiction', v: 4.5 },
              { g: 'Fiction', v: 4.5 },
              { g: 'History', v: 4.0 },
            ].map((row) => (
              <div
                key={row.g}
                className="grid grid-cols-12 items-center gap-2 text-[11px]"
              >
                <span className="col-span-5 text-[#52504A] truncate">
                  {row.g}
                </span>
                <div className="col-span-6 h-2 rounded-full bg-[#E9E9E7] overflow-hidden">
                  <div
                    style={{ width: `${(row.v / 5) * 100}%` }}
                    className="h-full rounded-full bg-[#BC8BE0]"
                  />
                </div>
                <span className="col-span-1 font-mono font-semibold text-[#37352F] tabular-nums">
                  {row.v.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'queue') {
    const wizardScore = 55 + (wizardOwned ? 10 : 0);
    const duneScore = 55 + (duneOwned ? 10 : 0);
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Up Next (Ranked) · Click Owned to recalculate</span>
          </span>
          <span className="font-mono text-[11px]">Σ Queue Score</span>
        </div>

        <div className="p-4 space-y-3">
          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden text-[12.5px]">
            {[
              {
                title: 'A Wizard of Earthsea',
                score: wizardScore,
                owned: wizardOwned,
                toggle: () => setWizardOwned((v) => !v),
              },
              {
                title: 'Dune Messiah',
                score: duneScore,
                owned: duneOwned,
                toggle: () => setDuneOwned((v) => !v),
              },
            ].map((row) => (
              <div
                key={row.title}
                className="px-3.5 py-2.5 bg-white flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={row.toggle}
                    aria-label={`Toggle owned for ${row.title}`}
                    className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 cursor-pointer ${
                      row.owned
                        ? 'bg-[#2383E2] border-[#2383E2] text-white'
                        : 'border-[#C7C5BE] bg-white'
                    }`}
                  >
                    {row.owned && <Check className="w-3 h-3 stroke-[2.8]" />}
                  </button>
                  <span className="font-semibold text-[#37352F] truncate">
                    {row.title}
                  </span>
                </div>
                <span className="font-mono text-[12.5px] font-bold text-[#2383E2] tabular-nums shrink-0">
                  Score {row.score}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] bg-[#FEF6F6] border border-[#F6DADA] px-3.5 py-2.5 flex items-center justify-between gap-2 text-[12px]">
            <span className="inline-flex items-center gap-2 font-semibold text-[#37352F]">
              <AlertCircle className="w-3.5 h-3.5 text-[#C43B3B]" />
              <span>Needs Attention: Meditations</span>
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#C43B3B] tabular-nums">
              Stale · 25d · 35%
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'library') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Reading Stage Board &amp; Finished Ledger</span>
          </span>
          <span className="font-mono text-[11px]">5 Stages</span>
        </div>

        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              stage: 'Next Up',
              count: '2',
              books: ['A Wizard of Earthsea', 'Dune Messiah'],
            },
            {
              stage: 'Reading',
              count: '2',
              books: ['Norwegian Wood (47%)', 'Meditations (35%)'],
            },
            {
              stage: 'Finished',
              count: '6',
              books: ['Deep Work · 4★', 'Atomic Habits · 5★'],
            },
          ].map((col) => (
            <div
              key={col.stage}
              className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-2.5 space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#52504A]">
                <span>{col.stage}</span>
                <span className="font-mono text-[#0F7B6C]">{col.count}</span>
              </div>
              <div className="space-y-1.5">
                {col.books.map((b) => (
                  <div
                    key={b}
                    className="rounded-[7px] bg-white border border-[#E9E9E7] px-2.5 py-2 text-[11.5px] font-semibold text-[#37352F] leading-snug"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
      <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
        <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0F7B6C]" />
          <span>Reading Timeline · Oct 2026</span>
        </span>
        <span className="font-mono text-[11px] text-[#E03E3E] font-semibold">
          Today Oct 18
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div className="relative rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6] p-3 space-y-2">
          <div
            aria-hidden="true"
            style={{ left: '52%' }}
            className="absolute top-2 bottom-2 w-[1.5px] bg-[#E03E3E]/70"
          />
          <div className="ml-[18%] w-[62%] rounded-[7px] bg-white border border-[#E9E9E7] px-3 py-2 flex items-center justify-between text-[12px] relative z-10">
            <span className="font-semibold text-[#37352F] truncate">
              Norwegian Wood
            </span>
            <span className="font-mono text-[11px] font-bold text-[#0F7B6C] tabular-nums shrink-0">
              On Track · 47%
            </span>
          </div>
          <div className="ml-[8%] w-[56%] rounded-[7px] bg-white border border-[#E9E9E7] px-3 py-2 flex items-center justify-between text-[12px] relative z-10">
            <span className="font-semibold text-[#37352F] truncate">
              Meditations
            </span>
            <span className="font-mono text-[11px] font-bold text-[#C43B3B] tabular-nums shrink-0">
              Stale · 35%
            </span>
          </div>
        </div>

        <div className="rounded-[10px] bg-[#EDF6F1] border border-[#D7EBDF] px-3.5 py-2.5 flex items-center justify-between text-[12px]">
          <span className="font-semibold text-[#37352F]">
            2026 Reading Wrapped
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] tabular-nums">
            6 Books · 2,379 Pages · 21.3 hrs
          </span>
        </div>
      </div>
    </div>
  );
};

interface BookTrackerOsShowcaseProps {
  activeViewFilter?: BookTrackerStudioFilterId;
  onViewFilterChange?: (next: BookTrackerStudioFilterId) => void;
  onOpenBuy?: () => void;
  isOwned?: boolean;
  price?: number;
  compareAt?: number;
}

export const BookTrackerOsShowcase: React.FC<BookTrackerOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
  onOpenBuy,
  isOwned = false,
  price = 29,
  compareAt = 49,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const deckSlides: FlagshipDeckSlideItem[] = BOOK_TRACKER_OS_SLIDES.map(
    (slide) => ({
      id: slide.id,
      stepNumber: slide.stepNumber,
      shortLabel: slide.shortLabel,
      kicker: slide.badge,
      headline: slide.title,
      editorialAccent: slide.editorialAccent,
      description: slide.description,
      beforeText: slide.beforeText,
      afterText: slide.afterText,
      highlightMetric: slide.highlightMetric,
      includedModules: slide.includedModules,
      renderVisual: () => <BookSlideVisual slideId={slide.id} />,
    })
  );

  return (
    <div data-testid="book-tracker-os-details-showcase" className="space-y-10">
      {/* Header Row */}
      <div className="space-y-2">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0F7B6C]">
          Interactive Preview
        </p>
        <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          Test the live library — 6 live charts, auto-ranked TBR.
        </h2>
        <p className="text-[15px] text-[#52504A] leading-[1.55] max-w-[660px]">
          Toggle Owned boxes to watch Σ Queue Score re-rank, rescue a Stale book, and move titles across stages below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <BookTrackerOsWorkspaceTabs
        onOpenBuy={onOpenBuy}
        priceLabel={isOwned ? 'Open Delivery' : `Duplicate for $${price}`}
      />

      {/* Real Notion Screenshots Attached Directly */}
      <RealScreenshotStrip
        title="Real screenshots from inside Book Tracker OS"
        subtitle="Inspect the actual Notion charts, auto-ranked Queue Score table, 5-stage board, and finished ledger."
        accentColor="#0F7B6C"
        testIdPrefix="book-tracker-os"
        items={[
          {
            id: 'charts',
            src: '/assets/aistudio/image_fd465e35.png',
            title: 'Finished/Month & Genre Mix',
            caption: 'Native Notion monthly bar chart + 12-genre library donut.',
          },
          {
            id: 'queue',
            src: '/assets/aistudio/image_6abf0d88.png',
            title: 'Up Next (Ranked) & Stale Radar',
            caption: 'Automatic Σ Queue Score and 14-day Stale book alerts.',
          },
          {
            id: 'board',
            src: '/assets/aistudio/image_c6762db2.png',
            title: '5-Stage Kanban & Author Gallery',
            caption: 'Reading stage pipeline plus minimalist book cards.',
          },
          {
            id: 'ledger',
            src: '/assets/aistudio/image_dd2f2154.png',
            title: 'Wishlist & Finished Ledgers',
            caption: 'Star ratings, finish dates, and Review Written checkboxes.',
          },
        ]}
      />

      {/* Interactive 4-Slide Product Tour Deck */}
      <FlagshipSlideDeck
        deckId="book-tracker-os-studio-views"
        osName="Book Tracker OS"
        accentColor="#0F7B6C"
        price={price}
        compareAt={compareAt}
        isOwned={isOwned}
        onOpenBuy={onOpenBuy}
        sectionKicker="4 Core Views"
        sectionTitle="Finish more books — and remember what you read."
        sectionSubtitle=""
        slides={deckSlides}
        controlledSlideId={activeViewFilter}
        onControlledSlideChange={(next) => {
          if (onViewFilterChange) {
            onViewFilterChange(next as BookTrackerStudioFilterId);
          }
        }}
        testIdPrefix="book-tracker-os"
      />

      {/* Collapsible 8 Ready-to-Use Page Templates Included */}
      <div
        data-testid="book-tracker-os-templates-included"
        className="rounded-[16px] bg-[#FAF9F6] border border-[#E9E9E7] overflow-hidden"
      >
        <button
          type="button"
          data-testid="book-tracker-os-templates-toggle"
          aria-expanded={showTemplates}
          onClick={() => setShowTemplates((v) => !v)}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F4F3F0] transition-colors cursor-pointer"
        >
          <div className="space-y-0.5 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#0F7B6C]">
              One-Click Notion Templates · Free Plan Compatible
            </p>
            <h4 className="font-display text-[17px] sm:text-[19px] font-bold tracking-[-0.02em] text-[#37352F]">
              Includes {BOOK_TRACKER_OS_SPEC.readyTemplates.length} ready-to-use reading templates
            </h4>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#37352F] shrink-0 whitespace-nowrap">
            <span>{showTemplates ? 'Hide list' : 'Show all 8'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                showTemplates ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {showTemplates && (
          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#E9E9E7] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BOOK_TRACKER_OS_SPEC.readyTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-[12px] bg-white border border-[#E9E9E7] p-3.5 space-y-1"
              >
                <div className="flex items-center gap-2 text-[#37352F]">
                  <FileText className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
                  <h5 className="text-[13.5px] font-semibold leading-snug">
                    {tpl.title}
                  </h5>
                </div>
                <p className="text-[11px] font-mono text-[#6E6D68]">
                  In {tpl.triggerContext}
                </p>
                <p className="text-[12.5px] text-[#52504A] leading-[1.45]">
                  {tpl.contains}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
