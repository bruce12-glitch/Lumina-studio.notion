import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  FileText,
  Layers,
  Target,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react';
import { NEXUS_OS_SPEC } from '../data/nexusOsSpec';
import { NexusOsWorkspaceTabs } from './NexusOsWorkspaceTabs';
import {
  FlagshipDeckSlideItem,
  FlagshipSlideDeck,
} from './FlagshipSlideDeck';
import { RealScreenshotStrip } from './RealScreenshotStrip';

export type NexusStudioFilterId =
  | 'all'
  | 'spine'
  | 'sprints'
  | 'portfolio'
  | 'capital';

export interface NexusOsSlide {
  id: 'spine' | 'sprints' | 'portfolio' | 'capital';
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

export const NEXUS_OS_SLIDES: NexusOsSlide[] = [
  {
    id: 'spine',
    stepNumber: '01',
    shortLabel: 'Core-5 Spine',
    label: '01 · Core-5 Relational Command Hub',
    badge: 'Core-5 Hub',
    title: 'Run work, research, and life from',
    editorialAccent: 'one linked spine.',
    description:
      'One command page tracking sprints, monthly burn, PARA hygiene, and 1-click capture buttons.',
    beforeText:
      'Separate apps for tasks, notes, subscriptions, and contacts that never connect.',
    afterText:
      '100% linked Core-5 spine tying Goals, Projects, Tasks, PARA Areas, and Knowledge.',
    highlightMetric: '15 Databases · Zero Orphans',
    includedModules: [
      {
        title: '4 Live Pulse Cards',
        details: 'System integrity, live sprints, monthly burn, and 24 PARA areas.',
      },
      {
        title: 'Quick Capture Dock',
        details: 'Add tasks, notes, projects, or contacts from desktop or phone.',
      },
      {
        title: 'Domain Launchers',
        details: 'Direct links to My Day, PARA Matrix, People CRM, Money, and Vault.',
      },
    ],
  },
  {
    id: 'sprints',
    stepNumber: '02',
    shortLabel: 'Sprint Queue',
    label: '02 · Active Sprint & Execution Queue',
    badge: 'Task Engine',
    title: 'See your next P1 action',
    editorialAccent: 'without inbox noise.',
    description:
      'Seven task views—Today, Focus, Next, Waiting, Upcoming, Inbox, Done—keep urgent work isolated.',
    beforeText:
      'One 90-item to-do list where everything looks urgent and nothing ships.',
    afterText:
      'Priority-ranked Sprint Queue linked directly to active projects.',
    highlightMetric: '7 Views · P1/P2 Tiering',
    includedModules: [
      {
        title: 'Today & Focus Views',
        details: 'Show daily top-3 intentions and P1 Critical tasks only.',
      },
      {
        title: 'Inbox & Waiting-For',
        details: 'Triage raw captures into projects and track delegated follow-ups.',
      },
      {
        title: 'Auto Project Rollups',
        details: 'Checked tasks update project progress bars automatically.',
      },
    ],
  },
  {
    id: 'portfolio',
    stepNumber: '03',
    shortLabel: 'Portfolio Radar',
    label: '03 · Master Projects & Progress Radar',
    badge: 'Dual-Pane View',
    title: 'See timelines and progress side by side',
    editorialAccent: 'every quarter.',
    description:
      'Pair a grouped Master Projects Timeline beside a live Progress Radar tagged by PARA domain.',
    beforeText:
      'Projects silently slipping weeks behind because timelines live elsewhere.',
    afterText:
      'Grouped project horizon paired with Active, Planned, and Done completion bars.',
    highlightMetric: 'Timeline + Progress Radar',
    includedModules: [
      {
        title: 'Grouped Project Horizon',
        details: 'Spot what launched in the last 7 days, 30 days, or earlier quarters.',
      },
      {
        title: 'Progress Radar',
        details: 'Map every initiative to Research, Business, Health, or Personal Dev.',
      },
      {
        title: 'Cold Archive Sweep',
        details: 'Archive finished projects cleanly while keeping notes and assets.',
      },
    ],
  },
  {
    id: 'capital',
    stepNumber: '04',
    shortLabel: 'PARA & Capital',
    label: '04 · Capital Burn, Subscriptions & CRM',
    badge: 'Money & CRM',
    title: 'Protect your runway and key contacts',
    editorialAccent: 'every Sunday.',
    description:
      'Track monthly burn, catch renewals early, tag Knowledge notes, and stay warm with mentors.',
    beforeText:
      'Surprise annual card charges and months passing without messaging key contacts.',
    afterText:
      'Monthly burn radar, renewal alerts, Knowledge Vault, and People CRM.',
    highlightMetric: 'Burn Radar · People CRM · PARA',
    includedModules: [
      {
        title: 'Capital Burn Radar',
        details: 'Monthly run-rate, upcoming software renewals, and cash-flow notes.',
      },
      {
        title: 'Knowledge Vault',
        details: 'Turn raw clippings and research papers into reusable frameworks.',
      },
      {
        title: 'People CRM & Reset',
        details: 'Touchpoint reminders plus a 15-minute Sunday PARA audit.',
      },
    ],
  },
];

const NexusSlideVisual: React.FC<{ slideId: NexusOsSlide['id'] }> = ({
  slideId,
}) => {
  const [checkedSprintIds, setCheckedSprintIds] = useState<
    Record<string, boolean>
  >({
    s1: false,
    s2: false,
    s3: true,
  });

  if (slideId === 'spine') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Nexus OS / Command Hub</span>
          </span>
          <span className="font-mono text-[11px] text-[#0F7B6C] font-semibold">
            100% Linked Spine
          </span>
        </div>

        <div className="p-4 space-y-3">
          <div className="rounded-[10px] bg-[#EDF5FC] border border-[#D8E8F8] px-3.5 py-2.5 text-[12px] text-[#37352F]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
              Core-5 Relational Engine
            </p>
            <p className="mt-0.5 text-[#52504A] leading-snug">
              Goals → Master Projects → Sprint Tasks → PARA Areas → Knowledge &amp; Capital
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                label: 'System Integrity',
                val: '100% Linked',
                sub: '0 Orphaned Nodes',
                bg: 'bg-[#F6F2FA] border-[#E8DEF3]',
                ink: 'text-[#6940A5]',
              },
              {
                label: 'Active Velocity',
                val: '12 Live Sprints',
                sub: '4 Key Milestones',
                bg: 'bg-[#EDF5FC] border-[#D8E8F8]',
                ink: 'text-[#2383E2]',
              },
              {
                label: 'Capital Burn',
                val: '₹1.24L / mo',
                sub: '3 Renewals Due',
                bg: 'bg-[#EDF6F1] border-[#D7EBDF]',
                ink: 'text-[#0F7B6C]',
              },
              {
                label: 'PARA Hygiene',
                val: '24 Active Areas',
                sub: 'Weekly Audit Passed',
                bg: 'bg-[#FCF2EA] border-[#F3DFCE]',
                ink: 'text-[#B45309]',
              },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-[10px] border p-3 space-y-0.5 ${card.bg}`}
              >
                <p
                  className={`font-mono text-[10px] font-bold uppercase tracking-[0.05em] ${card.ink}`}
                >
                  {card.label}
                </p>
                <p className="text-[14px] font-bold text-[#37352F] tabular-nums">
                  {card.val}
                </p>
                <p className="text-[11px] text-[#52504A]">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'sprints') {
    const items = [
      {
        id: 's1',
        name: '[1/5] Capture rapid thought via Quick Capture',
        project: 'Launch Nexus OS',
        priority: 'P1 Critical',
      },
      {
        id: 's2',
        name: '[2/5] Curate realistic daily top-3 intentions',
        project: 'Launch Nexus OS',
        priority: 'P2 High',
      },
      {
        id: 's3',
        name: '[3/5] Open Knowledge & run AI Auto-Tagging',
        project: 'AI & Systems',
        priority: 'P2 High',
      },
    ];
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Tasks / Active Sprint Queue</span>
          </span>
          <span className="font-mono text-[11px]">Today · Focus · Inbox</span>
        </div>

        <div className="p-4 space-y-2.5">
          <p className="text-[11.5px] font-medium text-[#6E6D68]">
            Click any row to mark complete:
          </p>
          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
            {items.map((item) => {
              const done = !!checkedSprintIds[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setCheckedSprintIds((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }))
                  }
                  className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 ${
                        done
                          ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                          : 'border-[#C7C5BE] bg-white'
                      }`}
                    >
                      {done && <Check className="w-3 h-3 stroke-[2.6]" />}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[12.5px] font-semibold truncate ${
                          done
                            ? 'line-through text-[#9B9A97]'
                            : 'text-[#37352F]'
                        }`}
                      >
                        {item.name}
                      </p>
                      <p className="text-[11px] text-[#6E6D68]">
                        {item.project}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-[5px] text-[10.5px] font-semibold shrink-0 ${
                      item.priority === 'P1 Critical'
                        ? 'bg-[#FDECEC] text-[#C43B3B]'
                        : 'bg-[#FDF4E7] text-[#B45309]'
                    }`}
                  >
                    {done ? 'Done' : item.priority}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'portfolio') {
    const rows = [
      {
        name: 'Publish LLM Inference Benchmark',
        area: 'AI & Systems',
        status: 'Active',
        pct: 74,
      },
      {
        name: 'Launch Nexus OS Flagship Template',
        area: 'Career & Business',
        status: 'Active',
        pct: 82,
      },
      {
        name: 'Build steady weekly movement routine',
        area: 'Health & Vitality',
        status: 'Active',
        pct: 58,
      },
      {
        name: 'File 2026 Personal Tax Return',
        area: 'Personal Dev',
        status: 'Done',
        pct: 100,
      },
    ];
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Master Projects &amp; Progress Radar</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums">6 Tracked</span>
        </div>

        <div className="p-4 space-y-2.5">
          {rows.map((r) => (
            <div
              key={r.name}
              className="rounded-[9px] border border-[#E9E9E7] bg-[#FAF9F6]/70 px-3 py-2.5 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 text-[12px]">
                <span className="font-semibold text-[#37352F] truncate">
                  {r.name}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#2383E2] tabular-nums shrink-0">
                  {r.pct}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-[#E9E9E7] overflow-hidden">
                  <div
                    style={{ width: `${r.pct}%` }}
                    className={`h-full rounded-full ${
                      r.pct === 100 ? 'bg-[#0F7B6C]' : 'bg-[#2383E2]'
                    }`}
                  />
                </div>
                <span className="text-[10.5px] text-[#6E6D68] whitespace-nowrap">
                  {r.area}
                </span>
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
          <Wallet className="w-3.5 h-3.5 text-[#0F7B6C]" />
          <span>Capital Burn &amp; PARA Hygiene</span>
        </span>
        <span className="font-mono text-[11px] text-[#0F7B6C] font-semibold">
          Weekly Audit ✓
        </span>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-[10px] bg-[#EDF6F1] border border-[#D7EBDF] p-3">
            <p className="text-[10.5px] font-mono uppercase text-[#0F7B6C] font-bold">
              Mo. Run-Rate
            </p>
            <p className="text-[16px] font-bold text-[#37352F] tabular-nums mt-0.5">
              ₹1.24L
            </p>
            <p className="text-[11px] text-[#52504A]">3 subscriptions due</p>
          </div>
          <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-3">
            <p className="text-[10.5px] font-mono uppercase text-[#6E6D68] font-bold">
              Warm Network
            </p>
            <p className="text-[16px] font-bold text-[#37352F] tabular-nums mt-0.5">
              38 Contacts
            </p>
            <p className="text-[11px] text-[#52504A]">2 check-ins due</p>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#E9E9E7] bg-white px-3.5 py-2.5 flex items-center justify-between text-[12px]">
          <span className="inline-flex items-center gap-2 font-semibold text-[#37352F]">
            <Target className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Sunday PARA Hygiene Reset</span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#0F7B6C]">
            0 Orphans · Passed
          </span>
        </div>
      </div>
    </div>
  );
};

interface NexusOsShowcaseProps {
  activeViewFilter?: NexusStudioFilterId;
  onViewFilterChange?: (next: NexusStudioFilterId) => void;
  onOpenBuy?: () => void;
  isOwned?: boolean;
  price?: number;
  compareAt?: number;
}

export const NexusOsShowcase: React.FC<NexusOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
  onOpenBuy,
  isOwned = false,
  price = 59,
  compareAt = 89,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const deckSlides: FlagshipDeckSlideItem[] = NEXUS_OS_SLIDES.map((slide) => ({
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
    renderVisual: () => <NexusSlideVisual slideId={slide.id} />,
  }));

  return (
    <div data-testid="nexus-os-details-showcase" className="space-y-10">
      {/* Header Row */}
      <div className="space-y-2">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
          Interactive Preview
        </p>
        <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          Test the live workspace — 10 modules, 15 linked databases.
        </h2>
        <p className="text-[15px] text-[#52504A] leading-[1.55] max-w-[660px]">
          Add a quick task, check off Today actions, and inspect the Progress Radar below before you duplicate.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <NexusOsWorkspaceTabs
        onOpenBuy={onOpenBuy}
        priceLabel={isOwned ? 'Open Delivery' : `Duplicate for $${price}`}
      />

      {/* Real Notion Screenshots Attached Directly */}
      <RealScreenshotStrip
        title="Real screenshots from inside Nexus OS"
        subtitle="See the exact Core-5 Command Hub, Active Sprint Queue, and Master Projects Radar inside Notion."
        accentColor="#2383E2"
        testIdPrefix="nexus-os"
        items={[
          {
            id: 'hub',
            src: '/assets/aistudio/image_f8fdd75d.png',
            title: 'Core-5 Command Hub',
            caption: '4 live telemetry cards, Quick Capture dock, and domain launchers.',
          },
          {
            id: 'sprints',
            src: '/assets/aistudio/image_d990bd29.png',
            title: 'Active Sprint & Execution Queue',
            caption: 'Today, Upcoming, Next, Waiting, Focus, and Inbox triage views.',
          },
          {
            id: 'portfolio',
            src: '/assets/aistudio/image_951c62d5.png',
            title: 'Master Projects & Progress Radar',
            caption: 'Grouped project timeline paired beside live PARA status radar.',
          },
        ]}
      />

      {/* Interactive 4-Slide Product Tour Deck */}
      <FlagshipSlideDeck
        deckId="nexus-os-studio-views"
        osName="Nexus OS"
        accentColor="#2383E2"
        price={price}
        compareAt={compareAt}
        isOwned={isOwned}
        onOpenBuy={onOpenBuy}
        sectionKicker="4 Core Views"
        sectionTitle="Replace five disconnected productivity apps with one."
        sectionSubtitle=""
        slides={deckSlides}
        controlledSlideId={activeViewFilter}
        onControlledSlideChange={(next) => {
          if (onViewFilterChange) {
            onViewFilterChange(next as NexusStudioFilterId);
          }
        }}
        testIdPrefix="nexus-os"
      />

      {/* Collapsible 8 Ready-to-Use Page Templates Included */}
      <div
        data-testid="nexus-os-templates-included"
        className="rounded-[16px] bg-[#FAF9F6] border border-[#E9E9E7] overflow-hidden"
      >
        <button
          type="button"
          data-testid="nexus-os-templates-toggle"
          aria-expanded={showTemplates}
          onClick={() => setShowTemplates((v) => !v)}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F4F3F0] transition-colors cursor-pointer"
        >
          <div className="space-y-0.5 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#2383E2]">
              One-Click Notion Templates · Free Plan Compatible
            </p>
            <h4 className="font-display text-[17px] sm:text-[19px] font-bold tracking-[-0.02em] text-[#37352F]">
              Includes {NEXUS_OS_SPEC.readyTemplates.length} ready-to-use page templates
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
            {NEXUS_OS_SPEC.readyTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-[12px] bg-white border border-[#E9E9E7] p-3.5 space-y-1"
              >
                <div className="flex items-center gap-2 text-[#37352F]">
                  <FileText className="w-3.5 h-3.5 text-[#2383E2] shrink-0" />
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
