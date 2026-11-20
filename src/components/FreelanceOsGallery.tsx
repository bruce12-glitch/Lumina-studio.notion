import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  LayoutDashboard,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import { FreelanceOsWorkspaceTabs } from './FreelanceOsWorkspaceTabs';
import {
  FlagshipDeckSlideItem,
  FlagshipSlideDeck,
} from './FlagshipSlideDeck';
import freelancerMascotCardImg from '../assets/images/freelancer_mascot_card_1794923266919.jpg';

export interface FreelanceOsIncludedModule {
  title: string;
  details: string;
}

export type FreelanceStudioFilterId =
  | 'all'
  | 'hub'
  | 'clients'
  | 'growth'
  | 'finances';

export interface FreelanceOsSlide {
  id: 'hub' | 'clients' | 'growth' | 'finances';
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
  includedModules: FreelanceOsIncludedModule[];
}

export const FREELANCE_OS_SLIDES: FreelanceOsSlide[] = [
  {
    id: 'hub',
    stepNumber: '01',
    shortLabel: 'Studio Hub',
    label: '01 · Studio Hub & Execution',
    badge: 'Command Center',
    title: 'Run your entire freelance week from one',
    editorialAccent: 'calm cockpit.',
    description:
      'Start every morning seeing overdue invoice alerts, active client deliverables, weekly billable hours, and your Friday review checklist on one clean Notion page.',
    beforeText:
      'Checking 6 browser tabs, scattered sticky notes, and forgetting follow-ups.',
    afterText:
      'Every deadline, unpaid invoice, and billable session linked in a 5-minute cockpit.',
    highlightMetric: 'Main Hub · Projects · Time Sheet',
    includedModules: [
      {
        title: 'Main Hub (Freelancer Business OS)',
        details:
          'Unpaid invoices, overdue alerts, open proposals, today’s follow-ups, and a Friday review checklist.',
      },
      {
        title: 'Project Management',
        details:
          'Multi-mode project boards (Simple, Complete, Advanced), timelines, deadlines, and deliverables.',
      },
      {
        title: 'Time Sheet & Profitability',
        details:
          '0.25 h work-session logger rolled up automatically into client margin and utilization.',
      },
    ],
  },
  {
    id: 'clients',
    stepNumber: '02',
    shortLabel: 'Clients & Legals',
    label: '02 · Clients CRM, Outreach & Legals',
    badge: 'Pipeline & Relationships',
    title: 'Close retainers faster with a unified',
    editorialAccent: 'client pipeline.',
    description:
      'Track every warm lead, open proposal, segmented outreach list, and MSA/SOW/NDA renewal alert directly beside each client account.',
    beforeText:
      'Lost proposal PDFs, cold leads slipping away, and surprise contract renewals.',
    afterText:
      'Kanban CRM, outreach tracking, and contract clause library connected per client.',
    highlightMetric: 'Clients CRM · Outreach · Legals',
    includedModules: [
      {
        title: 'Clients Dashboard',
        details:
          'Visual client pipeline, key account briefs, contact directory, and proposal status tracker.',
      },
      {
        title: 'Email List & Outreach',
        details:
          'Segmented contact directory and outreach or newsletter campaign cadence tracker.',
      },
      {
        title: 'Legals & Contracts',
        details:
          'MSA, SOW, and NDA registry with renewal alerts and a reusable standard clause library.',
      },
    ],
  },
  {
    id: 'growth',
    stepNumber: '03',
    shortLabel: 'Strategy & Brand',
    label: '03 · Strategy, Ideation & Brand',
    badge: 'OKRs, Plan & Portfolio',
    title: 'Turn rough studio ideas into a',
    editorialAccent: 'repeatable growth plan.',
    description:
      'Track SMART annual goals with live health charts, score ideas with Impact/Confidence/Ease (ICE) math, and map quarterly roadmaps in one clean strategic workspace.',
    beforeText:
      'Feast-or-famine months with unprioritized side ideas and outdated brand assets.',
    afterText:
      'Quarterly SMART scorecards, live goal health ring, and an interactive annual roadmap.',
    highlightMetric: 'SMART Goals · Goal Health · Roadmap',
    includedModules: [
      {
        title: 'Growth & Strategy',
        details:
          'SMART goals scorecard, visual goal-health breakdown, and quarterly annual roadmap timeline.',
      },
      {
        title: 'Ideation Hub',
        details:
          'Idea capture board with Impact/Confidence/Ease (ICE) scoring and 1-click promotion to projects.',
      },
      {
        title: 'Business Plan & Externals',
        details:
          '12-month financial model, offer ladder, risk register, brand guidelines, and portfolio page.',
      },
    ],
  },
  {
    id: 'finances',
    stepNumber: '04',
    shortLabel: 'Finances & Core',
    label: '04 · Finances, Security & System Core',
    badge: 'Cash Flow & 18 DBs',
    title: 'Stay audit-ready with automated',
    editorialAccent: 'cash-flow clarity.',
    description:
      'Spot late invoices immediately via automatic overdue aging, track tax-ready monthly profit, organize 2FA vault pointers, and duplicate 18 linked databases in 60 seconds.',
    beforeText:
      'Chasing late payments manually and scrambling through bank statements at tax time.',
    afterText:
      'Automated invoice aging, monthly P&L ledger, and a 1-click SOP & template library.',
    highlightMetric: 'Invoices · P&L Ledger · 18 Linked DBs',
    includedModules: [
      {
        title: 'Finances & Invoices',
        details:
          'Unpaid invoice tracker with automatic overdue aging, paid ledger, expenses, and monthly P&L.',
      },
      {
        title: 'Accounts Access & Security',
        details:
          'Catalog of login URLs, 2FA verification status, subscription renewals, and password-vault pointers.',
      },
      {
        title: 'System Core & Templates',
        details:
          'Quick Actions SOPs, ready-made briefs/proposals/invoices, and all 18 interconnected backend databases.',
      },
    ],
  },
];

/* Crisp Interactive Notion Preview Canvases for Freelance OS (Zero Blurry Collage Screenshots) */
const FreelanceSlideVisual: React.FC<{
  slideId: FreelanceOsSlide['id'];
  expanded?: boolean;
}> = ({ slideId, expanded = false }) => {
  const [hubChecks, setHubChecks] = useState<Record<string, boolean>>({
    h1: false,
    h2: true,
    h3: false,
  });
  const [goalFilter, setGoalFilter] = useState<'all' | 'on-track' | 'at-risk'>(
    'all'
  );
  const [paidInvoices, setPaidInvoices] = useState<Record<string, boolean>>({
    'INV-1042': true,
    'INV-1043': false,
    'INV-1044': false,
  });

  const pad = expanded ? 'p-5 sm:p-7 space-y-5' : 'p-3.5 sm:p-5 space-y-3.5';

  if (slideId === 'hub') {
    const tasks = [
      {
        id: 'h1',
        title: 'Send Sprint 4 invoice to Northstar Labs',
        meta: 'Finances · $2,400',
        due: 'Today',
      },
      {
        id: 'h2',
        title: 'Ship Kora AI design system handoff',
        meta: 'Active Project · Milestone 3',
        due: 'Thu',
      },
      {
        id: 'h3',
        title: 'Run Friday 15-min margin & capacity reset',
        meta: 'Weekly SOP · Time Sheet',
        due: 'Fri 4 PM',
      },
    ];

    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_8px_24px_-14px_rgba(55,53,47,0.16)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between gap-2 text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5 truncate">
            <LayoutDashboard className="w-3.5 h-3.5 text-[#2383E2] shrink-0" />
            <span className="truncate">Freelance OS / Main Studio Hub</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums shrink-0">
            Week 46 · Live
          </span>
        </div>

        <div className={pad}>
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { label: 'Unpaid', value: '$4,850', tone: 'text-[#D9730D]' },
              { label: 'Projects', value: '4 active', tone: 'text-[#0F7B6C]' },
              { label: 'Billable', value: '28.5 hrs', tone: 'text-[#2383E2]' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-2.5 sm:px-3 py-2 sm:py-2.5"
              >
                <p className="text-[10.5px] sm:text-[11px] text-[#6E6D68] font-medium whitespace-nowrap truncate">
                  {stat.label}
                </p>
                <p
                  className={`text-[13.5px] sm:text-[15px] font-bold tabular-nums whitespace-nowrap mt-0.5 ${stat.tone}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2 text-[11.5px] font-semibold text-[#6E6D68]">
              <span className="truncate">
                Today&apos;s Studio Actions{' '}
                <span className="hidden sm:inline font-normal text-[#9B9A97]">
                  (click to toggle)
                </span>
              </span>
              <span className="font-mono shrink-0">Due</span>
            </div>
            <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
              {tasks.map((task) => {
                const done = !!hubChecks[task.id];
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() =>
                      setHubChecks((prev) => ({
                        ...prev,
                        [task.id]: !prev[task.id],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 transition-colors ${
                          done
                            ? 'bg-[#2383E2] border-[#2383E2] text-white'
                            : 'border-[#C7C5BE] bg-white'
                        }`}
                      >
                        {done && <Check className="w-3 h-3 stroke-[2.6]" />}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-[12.5px] sm:text-[13px] font-semibold truncate ${
                            done
                              ? 'line-through text-[#9B9A97]'
                              : 'text-[#37352F]'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-[11px] text-[#6E6D68] truncate">
                          {task.meta}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-semibold text-[#52504A] shrink-0 tabular-nums">
                      {done ? 'Done' : task.due}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-3.5 py-2.5 space-y-1.5">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="font-semibold text-[#37352F]">
                Weekly Billable Utilization
              </span>
              <span className="font-mono font-bold text-[#0F7B6C] tabular-nums">
                89% · Target 85%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#E9E9E7] overflow-hidden">
              <div
                style={{ width: '89%' }}
                className="h-full rounded-full bg-[#0F7B6C]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'clients') {
    const columns = [
      {
        stage: 'Proposal Sent',
        count: '2',
        accent: 'text-[#D9730D]',
        cards: [
          { name: 'Velo Commerce', meta: '$6,500 · Brand + Web' },
          { name: 'Arbor Health', meta: '$4,200 · Design Audit' },
        ],
      },
      {
        stage: 'Active Retainer',
        count: '3',
        accent: 'text-[#0F7B6C]',
        cards: [
          { name: 'Northstar Labs', meta: '$5,500/mo · Product' },
          { name: 'Kora AI Studio', meta: '$4,800/mo · Systems' },
        ],
      },
      {
        stage: 'Renewal Ready',
        count: '1',
        accent: 'text-[#2383E2]',
        cards: [{ name: 'Helix FinTech', meta: 'MSA + SOW · Q1' }],
      },
    ];

    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_8px_24px_-14px_rgba(55,53,47,0.16)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between gap-2 text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5 truncate">
            <Briefcase className="w-3.5 h-3.5 text-[#2383E2] shrink-0" />
            <span className="truncate">Clients CRM / Retainer Pipeline</span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] tabular-nums shrink-0">
            $24.6k/mo pipeline
          </span>
        </div>

        <div className={pad}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {columns.map((col) => (
              <div
                key={col.stage}
                className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-2.5 space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#52504A]">
                  <span className="truncate">{col.stage}</span>
                  <span className={`font-mono ${col.accent}`}>{col.count}</span>
                </div>
                <div className="space-y-1.5">
                  {col.cards.map((card) => (
                    <div
                      key={card.name}
                      className="rounded-[8px] bg-white border border-[#E9E9E7] px-2.5 py-2 space-y-0.5"
                    >
                      <p className="text-[12px] font-semibold text-[#37352F] leading-snug">
                        {card.name}
                      </p>
                      <p className="text-[10.5px] font-mono text-[#6E6D68]">
                        {card.meta}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-3.5 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <ShieldCheck className="w-4 h-4 text-[#0F7B6C] shrink-0" />
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-[#37352F] truncate">
                  MSA, SOW &amp; NDA Contract Registry
                </p>
                <p className="text-[11px] text-[#6E6D68] truncate">
                  Standard clause library linked · 1 renewal alert in 18 days
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] shrink-0">
              3 Signed
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'growth') {
    const goals = [
      {
        id: 'g1',
        name: '$120k Annual Revenue',
        category: 'Revenue',
        status: 'on-track' as const,
        statusLabel: 'On Track',
        pct: 62,
        current: '$74k / $120k',
        barColor: '#0F7B6C',
        quarters: [true, true, true, false],
      },
      {
        id: 'g2',
        name: '8 Active Retainer Clients',
        category: 'Client',
        status: 'on-track' as const,
        statusLabel: 'On Track',
        pct: 63,
        current: '5 / 8',
        barColor: '#2383E2',
        quarters: [true, true, true, true],
      },
      {
        id: 'g3',
        name: 'Publish 12 Case Studies',
        category: 'Marketing',
        status: 'at-risk' as const,
        statusLabel: 'At Risk',
        pct: 33,
        current: '4 / 12',
        barColor: '#D9730D',
        quarters: [false, true, true, true],
      },
      {
        id: 'g4',
        name: 'Launch Productized Offer',
        category: 'Product',
        status: 'on-track' as const,
        statusLabel: 'On Track',
        pct: 75,
        current: '3 / 4 steps',
        barColor: '#6940A5',
        quarters: [false, false, true, true],
      },
    ];

    const visibleGoals =
      goalFilter === 'all'
        ? goals
        : goals.filter((g) => g.status === goalFilter);

    // SVG Donut Ring math (r = 30, circumference = 2 * pi * 30 ≈ 188.5)
    const circumference = 188.5;
    const onTrackArc = circumference * 0.75; // 3 of 4 goals On Track
    const atRiskArc = circumference * 0.25; // 1 of 4 goals At Risk

    return (
      <div
        data-testid="freelance-growth-visual"
        className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_8px_24px_-14px_rgba(55,53,47,0.16)] overflow-hidden text-left"
      >
        {/* Notion Window Header */}
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between gap-2 text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5 truncate">
            <Target className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
            <span className="truncate">Growth &amp; Strategy / Annual OKRs</span>
          </span>
          <div className="inline-flex items-center gap-1 shrink-0">
            {(
              [
                { id: 'all', label: 'All (4)' },
                { id: 'on-track', label: 'On Track' },
                { id: 'at-risk', label: 'At Risk' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setGoalFilter(f.id)}
                className={`px-2 py-0.5 rounded-[5px] text-[10.5px] font-semibold transition-colors cursor-pointer ${
                  goalFilter === f.id
                    ? 'bg-[#37352F] text-white'
                    : 'text-[#6E6D68] hover:text-[#37352F] hover:bg-[#E9E9E7]/70'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={pad}>
          {/* 4-Up SMART Goal KPI Cards (Clean, Rounded Percentages, Zero Raw Decimals) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                label: 'Revenue Goal',
                pct: '62%',
                sub: '$74k / $120k',
                bar: '#0F7B6C',
                width: 62,
              },
              {
                label: 'Active Clients',
                pct: '63%',
                sub: '5 of 8 target',
                bar: '#2383E2',
                width: 63,
              },
              {
                label: 'Case Studies',
                pct: '33%',
                sub: '4 of 12 live',
                bar: '#D9730D',
                width: 33,
              },
              {
                label: 'Retainer Offer',
                pct: '75%',
                sub: 'Q4 launch',
                bar: '#6940A5',
                width: 75,
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-[9px] bg-[#FAF9F6] border border-[#E9E9E7] px-2.5 py-2 space-y-1"
              >
                <p className="text-[10.5px] font-medium text-[#6E6D68] truncate">
                  {kpi.label}
                </p>
                <div className="flex items-baseline justify-between gap-1 tabular-nums">
                  <span className="text-[14px] font-bold text-[#37352F]">
                    {kpi.pct}
                  </span>
                  <span className="text-[10px] font-mono text-[#6E6D68] truncate">
                    {kpi.sub}
                  </span>
                </div>
                <div className="h-1 w-full rounded-full bg-[#E9E9E7] overflow-hidden">
                  <div
                    style={{ width: `${kpi.width}%`, backgroundColor: kpi.bar }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Middle Split: Goals Scorecard + Vector SVG Goal Health Ring */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-stretch">
            {/* Goals Scorecard Table */}
            <div className="sm:col-span-8 rounded-[10px] border border-[#E9E9E7] overflow-hidden bg-white">
              <div className="px-3 py-1.5 bg-[#FAF9F6] border-b border-[#E9E9E7] flex items-center justify-between text-[10.5px] font-semibold text-[#6E6D68]">
                <span className="inline-flex items-center gap-1">
                  <BarChart3 className="w-3 h-3 text-[#2383E2]" />
                  <span>Goals Scorecard</span>
                </span>
                <span className="font-mono">Progress</span>
              </div>
              <div className="divide-y divide-[#F1F1EF]">
                {visibleGoals.map((g) => (
                  <div
                    key={g.id}
                    className="px-3 py-2 flex items-center justify-between gap-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-[12px] font-semibold text-[#37352F] truncate">
                          {g.name}
                        </p>
                        <span
                          className={`text-[10px] font-mono font-semibold shrink-0 ${
                            g.status === 'at-risk'
                              ? 'text-[#D9730D]'
                              : 'text-[#0F7B6C]'
                          }`}
                        >
                          {g.statusLabel}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-[#F1F1EF] overflow-hidden">
                        <div
                          style={{
                            width: `${g.pct}%`,
                            backgroundColor: g.barColor,
                          }}
                          className="h-full rounded-full"
                        />
                      </div>
                    </div>
                    <div className="text-right font-mono tabular-nums shrink-0">
                      <p className="text-[11.5px] font-bold text-[#37352F]">
                        {g.pct}%
                      </p>
                      <p className="text-[10px] text-[#6E6D68]">{g.current}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crisp SVG Goal Health Ring */}
            <div className="sm:col-span-4 rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6] p-3 flex flex-col items-center justify-between gap-2">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#6E6D68] self-start">
                Goal Health
              </p>

              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg
                  viewBox="0 0 80 80"
                  className="w-20 h-20 -rotate-90"
                  aria-label="Goal health chart: 3 of 4 goals on track, 1 at risk"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#E9E9E7"
                    strokeWidth="9"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#2383E2"
                    strokeWidth="9"
                    strokeDasharray={`${onTrackArc} ${circumference}`}
                    strokeLinecap="butt"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    fill="none"
                    stroke="#D9730D"
                    strokeWidth="9"
                    strokeDasharray={`${atRiskArc} ${circumference}`}
                    strokeDashoffset={-onTrackArc}
                    strokeLinecap="butt"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[16px] font-bold text-[#37352F] leading-none tabular-nums">
                    4
                  </span>
                  <span className="text-[9.5px] font-mono text-[#6E6D68] mt-0.5">
                    Goals
                  </span>
                </div>
              </div>

              <div className="w-full space-y-1 text-[10.5px] font-mono">
                <div className="flex items-center justify-between text-[#37352F]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2383E2]" />
                    <span>On Track</span>
                  </span>
                  <span className="font-bold tabular-nums">75%</span>
                </div>
                <div className="flex items-center justify-between text-[#52504A]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D9730D]" />
                    <span>At Risk</span>
                  </span>
                  <span className="font-bold tabular-nums">25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crisp Annual Roadmap Timeline Strip (Q1–Q4) */}
          <div className="rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6] px-3 py-2.5 space-y-1.5">
            <div className="grid grid-cols-12 items-center text-[10px] font-mono font-semibold text-[#6E6D68]">
              <span className="col-span-4 text-[#37352F]">Roadmap Timeline</span>
              <span className="col-span-2 text-center">Q1</span>
              <span className="col-span-2 text-center">Q2</span>
              <span className="col-span-2 text-center text-[#2383E2]">Q3 · Now</span>
              <span className="col-span-2 text-center">Q4</span>
            </div>
            <div className="space-y-1.5">
              {[
                { label: '$120k Revenue', start: '0%', span: '75%', color: '#0F7B6C' },
                { label: 'Productized Offer', start: '50%', span: '50%', color: '#6940A5' },
              ].map((bar) => (
                <div key={bar.label} className="grid grid-cols-12 items-center gap-2">
                  <span className="col-span-4 text-[11px] font-medium text-[#37352F] truncate">
                    {bar.label}
                  </span>
                  <div className="col-span-8 relative h-3 rounded-full bg-[#EBEAE6] overflow-hidden">
                    <div
                      style={{
                        left: bar.start,
                        width: bar.span,
                        backgroundColor: bar.color,
                      }}
                      className="absolute top-0 bottom-0 rounded-full opacity-90"
                    />
                    <div
                      aria-hidden="true"
                      style={{ left: '66%' }}
                      className="absolute top-0 bottom-0 w-[1.5px] bg-[#C43B3B]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 04: Finances, Invoice Aging & System Core
  const invoices = [
    { id: 'INV-1042', client: 'Northstar Labs', amount: 4200, dueLabel: 'Paid Oct 28' },
    { id: 'INV-1043', client: 'Kora AI Studio', amount: 2850, dueLabel: 'Due in 5d' },
    { id: 'INV-1044', client: 'Velo Commerce', amount: 2000, dueLabel: 'Overdue 4d', overdue: true },
  ];

  const paidTotal =
    70000 +
    invoices.reduce(
      (sum, inv) => sum + (paidInvoices[inv.id] ? inv.amount : 0),
      0
    );
  const unpaidCount = invoices.filter((inv) => !paidInvoices[inv.id]).length;

  return (
    <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_8px_24px_-14px_rgba(55,53,47,0.16)] overflow-hidden text-left">
      <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between gap-2 text-[11.5px] text-[#6E6D68]">
        <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5 truncate">
          <DollarSign className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
          <span className="truncate">Finances &amp; Invoices / P&amp;L Ledger</span>
        </span>
        <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] tabular-nums shrink-0">
          Margin 78.4%
        </span>
      </div>

      <div className={pad}>
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {[
            {
              label: 'Collected YTD',
              value: `$${paidTotal.toLocaleString()}`,
              tone: 'text-[#0F7B6C]',
            },
            { label: 'Net Margin', value: '78.4%', tone: 'text-[#37352F]' },
            {
              label: 'Open Invoices',
              value: `${unpaidCount} open`,
              tone: unpaidCount > 0 ? 'text-[#C43B3B]' : 'text-[#0F7B6C]',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-2.5 sm:px-3 py-2 sm:py-2.5"
            >
              <p className="text-[10.5px] sm:text-[11px] text-[#6E6D68] font-medium whitespace-nowrap truncate">
                {stat.label}
              </p>
              <p
                className={`text-[13.5px] sm:text-[15px] font-bold tabular-nums whitespace-nowrap mt-0.5 ${stat.tone}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[11.5px] font-semibold text-[#6E6D68]">
            <span className="truncate">
              Invoice Aging Ledger{' '}
              <span className="hidden sm:inline font-normal text-[#9B9A97]">
                (click to mark paid)
              </span>
            </span>
            <span className="font-mono shrink-0">Status</span>
          </div>
          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
            {invoices.map((inv) => {
              const isPaid = !!paidInvoices[inv.id];
              return (
                <button
                  key={inv.id}
                  type="button"
                  onClick={() =>
                    setPaidInvoices((prev) => ({
                      ...prev,
                      [inv.id]: !prev[inv.id],
                    }))
                  }
                  className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 transition-colors ${
                        isPaid
                          ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                          : 'border-[#C7C5BE] bg-white'
                      }`}
                    >
                      {isPaid && <Check className="w-3 h-3 stroke-[2.6]" />}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#37352F] truncate">
                        {inv.id} · {inv.client}
                      </p>
                      <p className="text-[11px] font-mono text-[#6E6D68] tabular-nums">
                        ${inv.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-semibold shrink-0 ${
                      isPaid
                        ? 'text-[#0F7B6C]'
                        : inv.overdue
                        ? 'text-[#C43B3B]'
                        : 'text-[#D9730D]'
                    }`}
                  >
                    {isPaid ? 'Paid ✓' : inv.dueLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1.5 border-t border-[#F1F1EF] text-[11px] font-mono text-[#6E6D68]">
          <span>18 Linked Databases · 2FA Vault Ready</span>
          <span className="text-[#37352F] font-semibold">Tax-Ready P&amp;L</span>
        </div>
      </div>
    </div>
  );
};

export const FreelanceOsGallery: React.FC<{
  variant?: 'home' | 'detail';
  onInspectTemplate?: () => void;
  activeViewFilter?: FreelanceStudioFilterId;
  onViewFilterChange?: (next: FreelanceStudioFilterId) => void;
  onOpenBuy?: () => void;
  isOwned?: boolean;
  price?: number;
  compareAt?: number;
}> = ({
  variant = 'detail',
  onInspectTemplate,
  activeViewFilter,
  onViewFilterChange,
  onOpenBuy,
  isOwned = false,
  price = 79,
  compareAt = 99,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxSlide =
    lightboxIndex !== null ? FREELANCE_OS_SLIDES[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % FREELANCE_OS_SLIDES.length
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + FREELANCE_OS_SLIDES.length) % FREELANCE_OS_SLIDES.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  const deckSlides: FlagshipDeckSlideItem[] = FREELANCE_OS_SLIDES.map(
    (slide, idx) => ({
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
      onInspectFullScreen: () => setLightboxIndex(idx),
      renderVisual: () => <FreelanceSlideVisual slideId={slide.id} />,
    })
  );

  return (
    <div data-testid="freelance-os-gallery" className="space-y-12">
      {/* Header Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div
          className={`${
            variant === 'home' ? 'lg:col-span-8' : 'lg:col-span-12'
          } space-y-3`}
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
            {variant === 'home'
              ? 'Featured System · Freelancer Business OS'
              : 'Inside Freelancer Business OS · Live Interactive Workspace'}
          </p>
          <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
            {variant === 'home'
              ? 'Run Your Entire Freelance Studio in Notion'
              : '1 Command Hub, 11 Modules, 18 Interconnected Databases'}
          </h2>
          <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
            Click through all 13 live workspace tabs below—test views, toggle checklists, and inspect how clients, projects, and invoices stay synced.
          </p>

          {variant === 'home' && onInspectTemplate && (
            <div className="pt-2">
              <motion.button
                type="button"
                whileHover={{ y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                onClick={onInspectTemplate}
                className="btn-motion-primary h-11 px-5 rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Explore Freelance OS (${price})</span>
                <ArrowRight className="w-4 h-4 btn-arrow-slide" />
              </motion.button>
            </div>
          )}
        </div>

        {variant === 'home' && (
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              type="button"
              data-testid="home-freelance-mascot"
              onClick={onInspectTemplate}
              className="w-full max-w-[320px] rounded-[20px] bg-[#FAF9F6] border border-[#E5E4E0] hover:border-[#C7C5BE] p-4 flex items-center justify-center cursor-pointer transition-colors"
            >
              <img
                src={freelancerMascotCardImg}
                alt="Freelancer Business OS studio mascot"
                referrerPolicy="no-referrer"
                className="w-full h-44 sm:h-48 object-contain mix-blend-multiply"
              />
            </button>
          </div>
        )}
      </div>

      {/* Interactive 13-Tab Notion Workspace Explorer */}
      <FreelanceOsWorkspaceTabs
        onOpenBuy={onOpenBuy}
        priceLabel={isOwned ? 'Open Delivery' : `Duplicate for $${price}`}
      />

      {/* Interactive 4-Slide Studio Tour Deck */}
      <FlagshipSlideDeck
        deckId="freelance-os-studio-views"
        osName="Freelance OS"
        accentColor="#2383E2"
        price={price}
        compareAt={compareAt}
        isOwned={isOwned}
        onOpenBuy={onOpenBuy}
        sectionKicker="Guided Product Tour · 4 Core Pillars"
        sectionTitle="Walk through every workflow before you buy."
        sectionSubtitle="Step through each interactive slide—filter SMART goals, toggle live invoices, and inspect how Freelance OS replaces scattered studio apps."
        slides={deckSlides}
        controlledSlideId={activeViewFilter}
        onControlledSlideChange={(next) => {
          if (onViewFilterChange) {
            onViewFilterChange(next as FreelanceStudioFilterId);
          }
        }}
        testIdPrefix="freelance-os"
      />

      {/* Expanded Interactive Preview Modal */}
      {lightboxSlide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxSlide.shortLabel} expanded interactive preview`}
          data-testid="freelance-os-lightbox"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] bg-[#1F1E1B]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[960px] rounded-[20px] bg-white border border-[#E9E9E7] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[#E9E9E7] flex items-center justify-between gap-4 bg-[#F7F6F3]">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2383E2]">
                  {lightboxSlide.label} · {lightboxSlide.badge}
                </p>
                <h3 className="text-[16px] font-bold text-[#37352F] truncate">
                  {lightboxSlide.title} {lightboxSlide.editorialAccent}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous slide preview"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev - 1 + FREELANCE_OS_SLIDES.length) %
                          FREELANCE_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide preview"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev + 1) % FREELANCE_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close expanded preview"
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#FAF9F6] p-4 sm:p-8 max-h-[82vh] overflow-y-auto">
              <FreelanceSlideVisual slideId={lightboxSlide.id} expanded />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
