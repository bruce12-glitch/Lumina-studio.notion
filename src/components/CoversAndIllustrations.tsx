import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BLUSH_ASSETS,
  CATEGORY_BLUSH_ASSET,
  TemplateCategory,
} from '../data/catalog';

const ASSETS_WITH_CORNER_BADGE = new Set<string>([
  BLUSH_ASSETS.digitalStorefront,
  BLUSH_ASSETS.financeCharts,
  BLUSH_ASSETS.calmStudyDesk,
  BLUSH_ASSETS.notionLineArtCreator,
  BLUSH_ASSETS.minimalistLivingRoom,
]);

export const BlushAssetImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  maskCorner?: boolean;
  floatDelay?: number;
  disableFloat?: boolean;
}> = ({
  src,
  alt,
  className = '',
  imgClassName = 'max-w-full max-h-full w-auto h-auto object-contain',
  maskCorner = true,
  floatDelay = 0,
  disableFloat = false,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F7F6F4] text-[#787671] text-xs font-medium p-4 ${className}`}
      >
        <span>{alt}</span>
      </div>
    );
  }

  const isBanner = src === BLUSH_ASSETS.communityBanner;
  const shouldClipCorner =
    maskCorner && ASSETS_WITH_CORNER_BADGE.has(src);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={`group/asset relative flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        animate={
          disableFloat
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={
          disableFloat
            ? undefined
            : {
                duration: 5.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              }
        }
        style={
          shouldClipCorner
            ? {
                clipPath:
                  'polygon(0 0, 78% 0, 78% 16%, 100% 16%, 100% 100%, 0 100%)',
              }
            : undefined
        }
        className={`${isBanner ? 'blush-banner' : 'blush-illustration'} ${imgClassName}`}
      />
    </motion.div>
  );
};

function slugSeed(slug: string): number {
  let h = 17;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 9973;
  }
  return h;
}

export const TemplateCover: React.FC<{
  name: string;
  slug: string;
  category: TemplateCategory;
  pro?: boolean;
  illustrationUrl?: string;
  cardTint?: string;
  className?: string;
}> = ({
  name,
  slug,
  category,
  pro,
  illustrationUrl,
  cardTint = '#F8F5E8',
  className = '',
}) => {
  const seed = slugSeed(slug);
  const resolvedAsset = illustrationUrl || CATEGORY_BLUSH_ASSET[category];
  const bar1 = 35 + (seed % 35);
  const bar2 = 48 + ((seed * 3) % 32);
  const bar3 = 30 + ((seed * 7) % 40);
  const bar4 = 58 + ((seed * 11) % 28);

  return (
    <div
      style={{ backgroundColor: cardTint }}
      className={`relative aspect-[16/10] w-full border-b border-[#E5E3DF] p-3 sm:p-4 overflow-hidden select-none ${className}`}
    >
      {/* Notion Window Frame */}
      <div className="w-full h-full rounded-[12px] bg-white border border-[#E5E3DF] shadow-[0_4px_16px_rgba(15,15,15,0.05)] overflow-hidden flex flex-col transition-transform duration-300 ease-out group-hover:scale-[1.015]">
        {/* Top Window Chrome Bar */}
        <div className="h-7 px-3 bg-[#FAF9F7] border-b border-[#E5E3DF] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#D4D4D4]" />
            <span className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
            <span className="w-2 h-2 rounded-full bg-[#E5E5E5]" />
            <span className="text-[10px] font-medium text-[#787671] truncate pl-1">
              Easlo / {category} / {name}
            </span>
          </div>
          {pro ? (
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#111110] text-white text-[8.5px] font-bold uppercase tracking-[0.06em] leading-none shrink-0">
              PRO
            </span>
          ) : (
            <span className="text-[9px] font-medium text-[#787671] shrink-0">
              Free Setup
            </span>
          )}
        </div>

        {/* Main Split Workspace: Left Notion Database Structure + Right Prominent Blush Illustration */}
        <div className="flex-1 grid grid-cols-12 min-h-0">
          {/* Left 7 Columns: Notion Page Header & Category Database UI */}
          <div className="col-span-7 p-3 sm:p-3.5 flex flex-col justify-between border-r border-[#F0EEEC] min-w-0">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-[4px] bg-[#111110] text-white text-[9px] font-bold inline-flex items-center justify-center shrink-0">
                  e
                </span>
                <span className="text-[9.5px] font-medium text-[#787671] truncate">
                  {category}
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] font-bold tracking-[-0.02em] text-[#111110] truncate leading-tight">
                {name}
              </p>
            </div>

            {/* Category-Specific Mini Notion Database Preview */}
            <div className="my-auto pt-2">
              {category === 'Finance' ? (
                <svg viewBox="0 0 200 76" className="w-full h-auto block" aria-hidden="true">
                  <rect width="94" height="28" rx="4" fill="#FAF9F7" stroke="#E5E3DF" />
                  <text x="7" y="11" fill="#787671" fontSize="6.5" fontWeight="600">NET BALANCE</text>
                  <text x="7" y="22" fill="#111110" fontSize="9.5" fontWeight="700">$24,850</text>
                  <rect x="102" y="0" width="94" height="28" rx="4" fill="#FAF9F7" stroke="#E5E3DF" />
                  <text x="109" y="11" fill="#787671" fontSize="6.5" fontWeight="600">SAVINGS</text>
                  <text x="109" y="22" fill="#111110" fontSize="9.5" fontWeight="700">42.5%</text>
                  {[bar1, bar2, bar3, bar4, bar1 + 10, bar2 - 8, bar4].map((h, i) => {
                    const scaled = Math.max(10, Math.min(36, Math.round(h * 0.42)));
                    return (
                      <rect
                        key={i}
                        x={6 + i * 27}
                        y={72 - scaled}
                        width="16"
                        height={scaled}
                        rx="2.5"
                        fill={i === 6 ? '#111110' : i % 2 === 0 ? '#52504C' : '#D4D4D4'}
                      />
                    );
                  })}
                </svg>
              ) : category === 'Health & Fitness' ? (
                <div className="space-y-1.5">
                  {[0, 1, 2].map((row) => {
                    const checked = (seed + row) % 2 === 0;
                    return (
                      <div
                        key={row}
                        className="px-2 py-1 rounded-[5px] bg-[#FAF9F7] border border-[#E5E3DF] flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`w-3 h-3 rounded-[3px] border flex items-center justify-center shrink-0 ${
                              checked
                                ? 'bg-[#111110] border-[#111110] text-white'
                                : 'bg-white border-[#C8C4BE]'
                            }`}
                          >
                            {checked && (
                              <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            )}
                          </span>
                          <span className="h-1.5 w-16 rounded-full bg-[#37352F]/80" />
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[0, 1, 2, 3].map((d) => (
                            <span
                              key={d}
                              className={`w-1.5 h-1.5 rounded-full ${
                                (seed + row + d) % 3 !== 0 ? 'bg-[#111110]' : 'bg-[#E5E3DF]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="p-1.5 rounded-[5px] bg-[#FAF9F7] border border-[#E5E3DF] space-y-1">
                      <span className="block text-[7.5px] font-semibold uppercase tracking-[0.05em] text-[#787671]">
                        In Progress
                      </span>
                      <span className="block h-1.5 w-4/5 rounded-full bg-[#111110]" />
                      <span className="block h-1.5 w-3/5 rounded-full bg-[#C8C4BE]" />
                    </div>
                    <div className="p-1.5 rounded-[5px] bg-[#FAF9F7] border border-[#E5E3DF] space-y-1">
                      <span className="block text-[7.5px] font-semibold uppercase tracking-[0.05em] text-[#787671]">
                        Completed
                      </span>
                      <span className="block h-1.5 w-3/4 rounded-full bg-[#37352F]" />
                      <span className="block h-1.5 w-1/2 rounded-full bg-[#C8C4BE]" />
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-[5px] bg-[#FAF9F7] border border-[#E5E3DF] flex items-center justify-between">
                    <span className="text-[8.5px] font-medium text-[#37352F]">
                      Linked Databases
                    </span>
                    <span className="text-[8.5px] font-mono font-semibold text-[#111110]">
                      {pro ? '8 Views' : '4 Views'}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Notion Status Footer */}
            <div className="pt-1.5 border-t border-[#F0EEEC] flex items-center justify-between text-[9px] text-[#787671]">
              <span>One-click duplicate</span>
              <span className="font-mono text-[#111110] font-semibold">Notion 2026</span>
            </div>
          </div>

          {/* Right 5 Columns: Prominent Blush.design Illustration Showcase */}
          <div
            style={{ backgroundColor: `${cardTint}99` }}
            className="col-span-5 p-2 sm:p-2.5 flex flex-col items-center justify-center relative overflow-hidden"
          >
            <BlushAssetImage
              src={resolvedAsset}
              alt={`${name} — Notion template preview`}
              disableFloat
              className="w-full h-full"
              imgClassName="w-full h-full object-contain scale-[1.04] transition-transform duration-500 group-hover:scale-[1.1]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export type HeroWorkspaceMode = 'second-brain' | 'finance' | 'freelance' | 'habit';

export const HeroWorkspaceShowcase: React.FC<{
  activeMode: HeroWorkspaceMode;
  onSelectMode: (mode: HeroWorkspaceMode) => void;
  onOpenTemplate: (slug: string) => void;
  onQuickCheckout: (slug: string) => void;
}> = ({ activeMode, onSelectMode, onOpenTemplate, onQuickCheckout }) => {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    'sb-1': true,
    'sb-2': true,
    'sb-3': false,
    'sb-4': false,
    'fin-1': true,
    'fin-2': true,
    'fin-3': true,
    'fin-4': false,
    'fr-1': true,
    'fr-2': false,
    'fr-3': true,
    'fr-4': false,
    'hab-1': true,
    'hab-2': true,
    'hab-3': false,
    'hab-4': true,
  });

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const modeConfig = {
    'second-brain': {
      slug: 'second-brain',
      breadcrumb: 'Easlo Workspace / Personal Productivity / Second Brain 5.0',
      badge: 'PARA SYSTEM · $39 (50% OFF)',
      title: 'Second Brain 5.0 — Command Center',
      subtitle: 'Organize your tasks, projects, goals, and notes inside one calm PARA system.',
      primaryIllus: BLUSH_ASSETS.notionLineArtCreator,
      secondaryIllus: BLUSH_ASSETS.calmStudyDesk,
      primaryCaption: 'PARA Knowledge Capture',
      secondaryCaption: 'Deep Work Rituals',
      surfaceTint: '#F8F5E8',
      secondaryTint: '#FEF9E6',
      metrics: [
        { label: 'ACTIVE PROJECTS', value: '6 Sprints', sub: '2 shipping this week' },
        { label: 'EVERGREEN NOTES', value: '142 Notes', sub: 'Linked across 8 areas' },
        { label: 'WEEKLY CLARITY', value: '4.5 hrs', sub: 'Saved on planning' },
      ],
      tasksTitle: 'Today’s Focus Queue — Click any task to check off',
      tasks: [
        { id: 'sb-1', text: 'Finalize Q4 product launch roadmap in Projects', tag: 'Projects' },
        { id: 'sb-2', text: 'Synthesize 3 book notes into Evergreen Zettelkasten', tag: 'Resources' },
        { id: 'sb-3', text: 'Run 10-minute Sunday zero-inbox weekly review', tag: 'Ritual' },
        { id: 'sb-4', text: 'Align quarterly OKR milestones with active tasks', tag: 'Goals' },
      ],
    },
    finance: {
      slug: 'finance-tracker',
      breadcrumb: 'Easlo Workspace / Finance / All-In-One Finance Dashboard',
      badge: 'FINANCE OS · $39',
      title: 'All-In-One Finance Dashboard',
      subtitle: 'Bring your income, expenses, budgets, and net-worth rollups into one clear view.',
      primaryIllus: BLUSH_ASSETS.financeCharts,
      secondaryIllus: BLUSH_ASSETS.financialAnalyst,
      primaryCaption: 'Cash-Flow & Budget Charts',
      secondaryCaption: 'Net-Worth Analytics',
      surfaceTint: '#EDF5FD',
      secondaryTint: '#EBF8EF',
      metrics: [
        { label: 'NET WORTH', value: '$148,920', sub: '+14.2% YTD growth' },
        { label: 'MONTHLY SAVINGS', value: '66.0%', sub: '$7,560 saved this month' },
        { label: 'SUBSCRIPTION AUDIT', value: '$340/mo', sub: 'Unused charges flagged' },
      ],
      tasksTitle: 'Monthly Financial Checklist — Click any item to complete',
      tasks: [
        { id: 'fin-1', text: 'Reconcile checking & high-yield savings balances', tag: 'Ledger' },
        { id: 'fin-2', text: 'Audit recurring SaaS & streaming subscriptions', tag: 'Audit' },
        { id: 'fin-3', text: 'Allocate monthly index fund & treasury contributions', tag: 'Invest' },
        { id: 'fin-4', text: 'Review Q4 tax reserve & deductible business expenses', tag: 'Tax' },
      ],
    },
    freelance: {
      slug: 'freelance-os',
      breadcrumb: 'Easlo Workspace / Business / Freelance & Creator Studio OS',
      badge: 'BUSINESS OS · $79',
      title: 'Freelance & Content OS',
      subtitle: 'Client CRM, active retainers, invoice tracking, and multi-channel content queue.',
      primaryIllus: BLUSH_ASSETS.creatorDesktop,
      secondaryIllus: BLUSH_ASSETS.teamAnalytics,
      primaryCaption: 'Creator Studio Desk',
      secondaryCaption: 'Client & KPI Pipeline',
      surfaceTint: '#FFF0E3',
      secondaryTint: '#FDF0F5',
      metrics: [
        { label: 'ACTIVE RETAINERS', value: '$28,400', sub: '6 active client portals' },
        { label: 'CONTENT PIPELINE', value: '18 Drafts', sub: 'Scheduled for next 30d' },
        { label: 'INVOICE STATUS', value: '100% Paid', sub: 'Zero overdue invoices' },
      ],
      tasksTitle: 'Studio Deliverables Queue — Click any item to complete',
      tasks: [
        { id: 'fr-1', text: 'Send design system handoff package to Atelier client', tag: 'Client' },
        { id: 'fr-2', text: 'Publish Sunday minimalist productivity essay & newsletter', tag: 'Content' },
        { id: 'fr-3', text: 'Update Q4 CRM pipeline and retainer renewal proposals', tag: 'CRM' },
        { id: 'fr-4', text: 'Archive completed sprint assets into client vault', tag: 'SOP' },
      ],
    },
    habit: {
      slug: 'habit-tracker',
      breadcrumb: 'Easlo Workspace / Health & Fitness / Minimalist Habit Tracker',
      badge: 'FREE TEMPLATE · $0',
      title: 'Minimalist Habit & Rituals OS',
      subtitle: 'Daily keystone routines, streak tracking, and calm evening reflection.',
      primaryIllus: BLUSH_ASSETS.minimalistLivingRoom,
      secondaryIllus: BLUSH_ASSETS.relaxedLaptopCreator,
      primaryCaption: 'Calm Environment',
      secondaryCaption: 'Evening Reflection',
      surfaceTint: '#EBF8EF',
      secondaryTint: '#F2EEFA',
      metrics: [
        { label: 'CURRENT STREAK', value: '28 Days', sub: '94% monthly consistency' },
        { label: 'DEEP WORK BLOCKS', value: '3.5 hrs/day', sub: 'Zero phone distractions' },
        { label: 'EVENING SHUTDOWN', value: '100%', sub: '7-day calm streak' },
      ],
      tasksTitle: 'Today’s Keystone Rituals — Click any habit to log',
      tasks: [
        { id: 'hab-1', text: '90 minutes of deep work before checking messages', tag: 'Focus' },
        { id: 'hab-2', text: '30 minutes of non-fiction reading & note capture', tag: 'Mind' },
        { id: 'hab-3', text: '45-minute strength training or outdoor run', tag: 'Health' },
        { id: 'hab-4', text: 'Digital sunset & 3-line gratitude journal at 9 PM', tag: 'Calm' },
      ],
    },
  }[activeMode];

  const completedCount = modeConfig.tasks.filter((t) => checkedTasks[t.id]).length;
  const completionPct = Math.round((completedCount / modeConfig.tasks.length) * 100);

  return (
    <div className="relative w-full">
      {/* Interactive Mode Selector Bar Above the Notion Window */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div
          role="tablist"
          aria-label="Interactive Notion workspace preview modes"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-[12px] bg-[#F7F6F4] border border-[#E5E3DF]"
        >
          {[
            { id: 'second-brain' as const, label: '01. Second Brain ($39)' },
            { id: 'finance' as const, label: '02. Finance Tracker ($39)' },
            { id: 'freelance' as const, label: '03. Freelance OS ($79)' },
            { id: 'habit' as const, label: '04. Habit Tracker ($0)' },
          ].map((tab) => {
            const active = activeMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSelectMode(tab.id)}
                className={`px-3.5 py-2 rounded-[8px] text-[12.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#111110] text-white shadow-[0_2px_6px_rgba(17,17,16,0.18)]'
                    : 'text-[#37352F] hover:text-[#111110] hover:bg-white/70'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3 text-[12.5px] text-[#787671]">
          <span>Interactive Notion Workspace</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-[#111110]">Click tasks & tabs to test live</span>
        </div>
      </div>

      {/* Main Notion Desktop Window Card (Matches Notion design.md workspace-mockup-card) */}
      <div className="rounded-[16px] border border-[#E5E3DF] bg-white overflow-hidden shadow-[0_24px_48px_-12px_rgba(15,15,15,0.14)]">
        {/* Top macOS / Notion Window Title Bar */}
        <div className="px-4 py-3 bg-[#FAF9F7] border-b border-[#E5E3DF] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#E5E3DF]" />
              <span className="w-3 h-3 rounded-full bg-[#E5E3DF]" />
              <span className="w-3 h-3 rounded-full bg-[#E5E3DF]" />
            </div>
            <span className="text-[12px] font-medium text-[#787671] truncate pl-1">
              {modeConfig.breadcrumb}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onOpenTemplate(modeConfig.slug)}
              className="h-8 px-3 rounded-[8px] border border-[#C8C4BE] bg-white hover:bg-[#F7F6F4] text-[12px] font-semibold text-[#111110] transition-colors cursor-pointer whitespace-nowrap"
            >
              Inspect Details
            </button>
            <button
              type="button"
              onClick={() => onQuickCheckout(modeConfig.slug)}
              className="h-8 px-3.5 rounded-[8px] bg-[#111110] hover:bg-[#262523] text-white text-[12px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Duplicate Template
            </button>
          </div>
        </div>

        {/* Workspace Split: Left Notion Sidebar (3 Cols) + Right Active Page Canvas (9 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Notion Sidebar */}
          <aside className="hidden lg:flex lg:col-span-3 bg-[#FAF9F7] border-r border-[#E5E3DF] p-4 flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Workspace Identity */}
              <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-[8px] bg-white border border-[#E5E3DF]">
                <span className="w-6 h-6 rounded-[6px] bg-[#111110] text-white text-[12px] font-bold inline-flex items-center justify-center shrink-0">
                  e
                </span>
                <div className="min-w-0">
                  <p className="text-[12.5px] font-bold text-[#111110] truncate">
                    Easlo Studio OS
                  </p>
                  <p className="text-[10.5px] text-[#787671] truncate">
                    Notion Free & Plus Ready
                  </p>
                </div>
              </div>

              {/* Sidebar Navigation Tree */}
              <div className="space-y-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#787671] mb-1.5">
                  Core Workspaces
                </p>
                {[
                  { id: 'second-brain' as const, name: 'Second Brain 5.0', meta: 'PARA' },
                  { id: 'finance' as const, name: 'Finance Tracker', meta: 'Ledger' },
                  { id: 'freelance' as const, name: 'Freelance & Studio', meta: 'CRM' },
                  { id: 'habit' as const, name: 'Habit & Rituals', meta: 'Daily' },
                ].map((item) => {
                  const isCurrent = activeMode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectMode(item.id)}
                      className={`w-full px-2.5 py-2 rounded-[8px] text-left flex items-center justify-between text-[12.5px] transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#EAE8E3] font-semibold text-[#111110]'
                          : 'text-[#37352F] hover:bg-[#F0EEEC]'
                      }`}
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="text-[10.5px] font-mono text-[#787671]">
                        {item.meta}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Featured Blush Illustration Callout */}
            <div
              style={{ backgroundColor: modeConfig.secondaryTint }}
              className="rounded-[12px] border border-[#E5E3DF] p-3 space-y-2"
            >
              <div className="flex items-center justify-between text-[10px] font-semibold text-[#37352F]">
                <span>{modeConfig.secondaryCaption}</span>
                <span>2026</span>
              </div>
              <BlushAssetImage
                src={modeConfig.secondaryIllus}
                alt={modeConfig.secondaryCaption}
                floatDelay={0.3}
                className="w-full h-28"
              />
            </div>
          </aside>

          {/* Right Main Notion Canvas */}
          <div className="lg:col-span-9 p-5 sm:p-7 space-y-6">
            {/* Top Page Header + Large Prominent Blush Illustration Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-6 border-b border-[#E5E3DF]">
              <div className="md:col-span-6 space-y-2.5 text-left">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#787671]">
                  <span>{modeConfig.badge}</span>
                </div>
                <h2 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.03em] text-[#111110] leading-[1.15]">
                  {modeConfig.title}
                </h2>
                <p className="text-[14.5px] text-[#37352F] leading-[1.55]">
                  {modeConfig.subtitle}
                </p>
              </div>

              {/* Large Heroic Blush Illustration Showcase Card */}
              <div className="md:col-span-6">
                <div
                  style={{ backgroundColor: modeConfig.surfaceTint }}
                  className="rounded-[14px] border border-[#E5E3DF] p-4 flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-left max-w-[150px]">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.07em] text-[#787671]">
                      Visual Blueprint
                    </p>
                    <p className="text-[14px] font-bold text-[#111110] leading-snug">
                      {modeConfig.primaryCaption}
                    </p>
                    <p className="text-[11.5px] text-[#37352F] leading-snug">
                      Pre-built databases, relations & views ready in 1 click.
                    </p>
                  </div>
                  <BlushAssetImage
                    src={modeConfig.primaryIllus}
                    alt={`${modeConfig.title} illustration`}
                    floatDelay={0.1}
                    className="w-40 sm:w-48 h-32 sm:h-36 shrink-0"
                  />
                </div>
              </div>
            </div>

            {/* 3 Live KPI Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {modeConfig.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-[12px] border border-[#E5E3DF] bg-[#FAF9F7] p-3.5 text-left"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.07em] text-[#787671]">
                    {m.label}
                  </p>
                  <p className="mt-1 text-[20px] font-bold tracking-[-0.02em] text-[#111110] tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#37352F]">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Checkable Notion Database Rows + Animated Progress Bar */}
            <div className="rounded-[12px] border border-[#E5E3DF] bg-white p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[13px] font-semibold text-[#111110]">
                  {modeConfig.tasksTitle}
                </span>
                <span className="text-[12px] font-mono font-semibold text-[#111110] tabular-nums">
                  {completedCount}/{modeConfig.tasks.length} Completed ({completionPct}%)
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 rounded-full bg-[#F0EEEC] overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-[#111110]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {modeConfig.tasks.map((task) => {
                  const isDone = Boolean(checkedTasks[task.id]);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="w-full px-3 py-2.5 rounded-[8px] border border-[#E5E3DF] bg-[#FAF9F7] hover:bg-[#F0EEEC] flex items-center justify-between gap-2.5 text-left transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            isDone
                              ? 'bg-[#111110] border-[#111110] text-white'
                              : 'bg-white border-[#111110]'
                          }`}
                        >
                          {isDone && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6.5L5 9L9.5 3.5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-[12.5px] font-medium truncate transition-colors ${
                            isDone ? 'line-through text-[#787671]' : 'text-[#111110]'
                          }`}
                        >
                          {task.text}
                        </span>
                      </span>
                      <span className="text-[10.5px] font-medium text-[#787671] shrink-0">
                        {task.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3 Home Feature Split Editorial Showcases (combining Large Blush Illustrations + Live Notion UI)
 */
export const FeatureMedia: React.FC<{
  kind: 'second-brain' | 'finance' | 'minimalism';
}> = ({ kind }) => {
  if (kind === 'second-brain') {
    return (
      <div className="w-full rounded-[20px] border border-[#E5E3DF] bg-[#F8F5E8] p-5 sm:p-7 space-y-5 shadow-[0_12px_32px_-8px_rgba(15,15,15,0.06)]">
        {/* Top Heroic Blush Illustration Pair */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
          <div className="sm:col-span-7 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#787671] mb-2">
              <span>PARA Command Center</span>
              <span className="font-mono text-[#111110]">Second Brain 5.0</span>
            </div>
            <BlushAssetImage
              src={BLUSH_ASSETS.notionLineArtCreator}
              alt="Second Brain PARA creator illustration"
              floatDelay={0.1}
              className="w-full h-44 sm:h-48"
            />
            <div className="pt-3 border-t border-[#F0EEEC] flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#111110]">Projects · Areas · Resources · Archive</span>
              <span className="text-[#787671]">8 Linked Databases</span>
            </div>
          </div>

          <div className="sm:col-span-5 flex flex-col gap-4">
            <div className="flex-1 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-[#787671]">
                Creative Studio Setup
              </span>
              <BlushAssetImage
                src={BLUSH_ASSETS.creatorDesktop}
                alt="Creator studio desktop illustration"
                floatDelay={0.4}
                className="w-full h-32"
              />
              <p className="text-[12px] font-medium text-[#37352F]">
                Capture fleeting ideas & connect them to quarterly goals.
              </p>
            </div>

            <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-3.5 flex items-center gap-3">
              <BlushAssetImage
                src={BLUSH_ASSETS.focusedCreator}
                alt="Focused deep work creator illustration"
                floatDelay={0.7}
                className="w-16 h-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12.5px] font-bold text-[#111110]">
                  Zero-Inbox Weekly Review
                </p>
                <p className="text-[11.5px] text-[#787671] leading-snug">
                  15-minute guided Sunday reset ritual.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Live Notion Goal & Project Rollup Card */}
        <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#111110]">
              Quarterly OKRs & Active Project Rollups
            </span>
            <span className="text-[11.5px] font-mono text-[#787671]">
              Auto-calculated in Notion
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { name: 'Ship 5 Minimalist Templates', pct: 85 },
              { name: 'Maintain 90% Daily Habit Streak', pct: 92 },
              { name: 'Read 24 Non-Fiction Books', pct: 68 },
              { name: 'Zero Inbox Every Sunday', pct: 100 },
            ].map((goal, idx) => (
              <div
                key={goal.name}
                className="p-3 rounded-[10px] bg-[#FAF9F7] border border-[#E5E3DF] space-y-1.5"
              >
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold text-[#111110] truncate">{goal.name}</span>
                  <span className="font-mono font-bold text-[#111110] tabular-nums">
                    {goal.pct}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#E5E3DF] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${goal.pct}%` }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full bg-[#111110]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'finance') {
    return (
      <div className="w-full rounded-[20px] border border-[#E5E3DF] bg-[#EDF5FD] p-5 sm:p-7 space-y-5 shadow-[0_12px_32px_-8px_rgba(15,15,15,0.06)]">
        {/* Top Heroic Finance Illustrations */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
          <div className="sm:col-span-7 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#787671] mb-2">
              <span>All-In-One Finance Ledger</span>
              <span className="font-mono text-[#111110]">$148,920 Net Worth</span>
            </div>
            <BlushAssetImage
              src={BLUSH_ASSETS.financeCharts}
              alt="Finance dashboard charts illustration"
              floatDelay={0.15}
              className="w-full h-44 sm:h-48"
            />
            <div className="pt-3 border-t border-[#F0EEEC] flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#111110]">Income · Expenses · Subscriptions</span>
              <span className="text-[#15803D] font-semibold">66% Savings Rate</span>
            </div>
          </div>

          <div className="sm:col-span-5 flex flex-col gap-4">
            <div className="flex-1 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-[#787671]">
                Automated Rollups
              </span>
              <BlushAssetImage
                src={BLUSH_ASSETS.financialAnalyst}
                alt="Financial analyst dashboard illustration"
                floatDelay={0.5}
                className="w-full h-32"
              />
              <p className="text-[12px] font-medium text-[#37352F]">
                Real-time monthly cash-flow and savings target tracking.
              </p>
            </div>

            <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-3.5 flex items-center gap-3">
              <BlushAssetImage
                src={BLUSH_ASSETS.teamAnalytics}
                alt="Team financial analytics illustration"
                floatDelay={0.8}
                className="w-16 h-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[12.5px] font-bold text-[#111110]">
                  Subscription Renewal Radar
                </p>
                <p className="text-[11.5px] text-[#787671] leading-snug">
                  Spot recurring charges before they renew.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Cash Flow Bar Chart Card */}
        <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-[#111110]">
              2026 Monthly Cash Flow & Savings Trajectory
            </span>
            <div className="flex items-center gap-3 text-[11px] font-medium text-[#37352F]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#111110]" />
                Income
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#C8C4BE]" />
                Expenses
              </span>
            </div>
          </div>
          <svg viewBox="0 0 680 120" className="w-full h-auto block" role="img" aria-label="Monthly cash flow bar chart">
            <line x1="0" y1="98" x2="680" y2="98" stroke="#E5E3DF" strokeWidth="1" />
            {[
              { m: 'Jan', inc: 52, exp: 26 },
              { m: 'Feb', inc: 58, exp: 24 },
              { m: 'Mar', inc: 55, exp: 28 },
              { m: 'Apr', inc: 64, exp: 22 },
              { m: 'May', inc: 68, exp: 25 },
              { m: 'Jun', inc: 66, exp: 21 },
              { m: 'Jul', inc: 72, exp: 24 },
              { m: 'Aug', inc: 75, exp: 23 },
              { m: 'Sep', inc: 78, exp: 24 },
              { m: 'Oct', inc: 82, exp: 22 },
              { m: 'Nov', inc: 85, exp: 21 },
              { m: 'Dec', inc: 88, exp: 23 },
            ].map((bar, idx) => {
              const x = 12 + idx * 55;
              return (
                <g key={bar.m}>
                  <rect
                    x={x}
                    y={98 - bar.inc}
                    width="15"
                    height={bar.inc}
                    rx="3"
                    fill="#111110"
                  />
                  <rect
                    x={x + 18}
                    y={98 - bar.exp}
                    width="13"
                    height={bar.exp}
                    rx="3"
                    fill="#C8C4BE"
                  />
                  <text
                    x={x + 15}
                    y="114"
                    textAnchor="middle"
                    fill="#787671"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {bar.m}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[20px] border border-[#E5E3DF] bg-[#EBF8EF] p-5 sm:p-7 space-y-5 shadow-[0_12px_32px_-8px_rgba(15,15,15,0.06)]">
      {/* Top Digital Minimalism Blush Illustrations */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
        <div className="sm:col-span-6 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#787671] mb-2">
            <span>Intentional Living Space</span>
            <span className="font-mono text-[#111110]">Calm Environment</span>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.minimalistLivingRoom}
            alt="Minimalist living space illustration"
            floatDelay={0.2}
            className="w-full h-44 sm:h-48"
          />
          <p className="pt-3 border-t border-[#F0EEEC] text-[12px] font-medium text-[#37352F]">
            Replace algorithmic noise with quiet daily reading & reflection rituals.
          </p>
        </div>

        <div className="sm:col-span-6 rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#787671] mb-2">
            <span>Focused Study & Desk Setup</span>
            <span className="font-mono text-[#111110]">Deep Work</span>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.calmStudyDesk}
            alt="Calm study desk illustration"
            floatDelay={0.5}
            className="w-full h-44 sm:h-48"
          />
          <p className="pt-3 border-t border-[#F0EEEC] text-[12px] font-medium text-[#37352F]">
            Curated monochrome wallpapers, launcher menus, and distraction-free tools.
          </p>
        </div>
      </div>

      {/* Secondary Pair: Modern Workspace & Evening Unwind */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex items-center gap-4">
          <BlushAssetImage
            src={BLUSH_ASSETS.modernWorkspace}
            alt="Modern desktop workspace illustration"
            floatDelay={0.35}
            className="w-24 h-20 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#111110]">
              Minimalist Desktop Setup
            </p>
            <p className="text-[12px] text-[#37352F] leading-snug mt-0.5">
              4 essential utility apps on your dock and home screen.
            </p>
          </div>
        </div>

        <div className="rounded-[14px] bg-white border border-[#E5E3DF] p-4 flex items-center gap-4">
          <BlushAssetImage
            src={BLUSH_ASSETS.relaxedLaptopCreator}
            alt="Relaxed evening journaling creator illustration"
            floatDelay={0.75}
            className="w-24 h-20 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#111110]">
              Evening Digital Sunset
            </p>
            <p className="text-[12px] text-[#37352F] leading-snug mt-0.5">
              Unwind with guided journaling and zero notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AppIconGlyph: React.FC<{
  icon: 'grid' | 'book' | 'flask' | 'check-circle';
}> = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-[8px] border border-[#E5E3DF] bg-[#FAF9F7] flex items-center justify-center text-[#111110] shrink-0 transition-transform duration-300 group-hover:scale-105">
      {icon === 'grid' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )}
      {icon === 'book' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )}
      {icon === 'flask' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2v7.31L4.72 18.55A2 2 0 0 0 6.46 21.5h11.08a2 2 0 0 0 1.74-2.95L14 9.31V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
        </svg>
      )}
      {icon === 'check-circle' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )}
    </div>
  );
};
