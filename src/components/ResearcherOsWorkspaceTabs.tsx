import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Check,
  Database,
  FileText,
  FlaskConical,
  Home,
  Inbox,
  Layers,
  MessageSquare,
  Sparkles,
  Users,
} from 'lucide-react';

export type ResearcherTabId =
  | 'hub'
  | 'manuscripts'
  | 'synthesis'
  | 'experiments'
  | 'review'
  | 'inbox'
  | 'grants'
  | 'system';

interface ResearcherTabMeta {
  id: ResearcherTabId;
  shortLabel: string;
  pageTitle: string;
  calloutTitle: string;
  calloutBody: string;
  icon: React.ReactNode;
}

export const RESEARCHER_OS_TABS: ResearcherTabMeta[] = [
  {
    id: 'hub',
    shortLabel: 'Research Hub',
    pageTitle: 'Researcher OS',
    calloutTitle: 'Researcher OS Hub',
    calloutBody:
      'Capture → Screen → Synthesize → Experiment → Write → Review. Your complete academic cockpit in one page.',
    icon: <Home className="w-3.5 h-3.5" />,
  },
  {
    id: 'manuscripts',
    shortLabel: 'Manuscripts',
    pageTitle: 'Active Manuscripts & Writing Progress',
    calloutTitle: 'Manuscript Pipeline',
    calloutBody:
      'Every paper in flight, its stage, venue deadline, word-count budget, and IMRaD section readiness.',
    icon: <FileText className="w-3.5 h-3.5" />,
  },
  {
    id: 'synthesis',
    shortLabel: 'Synthesis Vault',
    pageTitle: 'Atomic Synthesis Vault & Literature Matrix',
    calloutTitle: 'Atomic Synthesis Vault',
    calloutBody:
      'One claim per note, linked directly to its source DOI, related Zettels, and target manuscript section.',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: 'experiments',
    shortLabel: 'Experiments',
    pageTitle: 'Experiments, Protocols & Datasets',
    calloutTitle: 'Lab & Reproducibility',
    calloutBody:
      'Auditable trial runs, versioned SOP protocols, dataset provenance, and Git commit lockfiles.',
    icon: <FlaskConical className="w-3.5 h-3.5" />,
  },
  {
    id: 'review',
    shortLabel: 'Peer Review',
    pageTitle: 'Reviewer Comments & Action Items',
    calloutTitle: 'Peer Review & Advisor Feedback',
    calloutBody:
      'Itemized reviewer critiques, advisor meeting action items, follow-up experiments, and rebuttal status.',
    icon: <MessageSquare className="w-3.5 h-3.5" />,
  },
  {
    id: 'inbox',
    shortLabel: 'Quick Capture',
    pageTitle: 'Quick Capture Inbox & Triage',
    calloutTitle: 'Quick Capture Inbox',
    calloutBody:
      'Drop citations, ablation ideas, and arXiv preprints without cluttering your active Literature Matrix.',
    icon: <Inbox className="w-3.5 h-3.5" />,
  },
  {
    id: 'grants',
    shortLabel: 'Grants & CFPs',
    pageTitle: 'Grants, CFP Venues & Collaborators',
    calloutTitle: 'Funding & Collaborations',
    calloutBody:
      'RFP cutoffs, target venue deadlines (ACL, NeurIPS, TACL), and co-author CRediT / ORCID directory.',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  {
    id: 'system',
    shortLabel: 'System · 14 DBs',
    pageTitle: 'System Vault & 14 Databases',
    calloutTitle: 'System Backend & Templates',
    calloutBody:
      '14 interconnected research databases, Weekly Research Reset checklist, and Paper Launch Blueprint.',
    icon: <Database className="w-3.5 h-3.5" />,
  },
];

const RESEARCHER_QUICK_NAV: Array<{
  id: ResearcherTabId;
  label: string;
  accent: string;
  icon: React.ReactNode;
}> = [
  { id: 'hub', label: 'Research Hub', accent: 'text-[#1D6EE3]', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'manuscripts', label: 'Manuscripts', accent: 'text-[#CA8A04]', icon: <FileText className="w-3.5 h-3.5" /> },
  { id: 'synthesis', label: 'Synthesis Vault', accent: 'text-[#7C3AED]', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'experiments', label: 'Experiments', accent: 'text-[#16A34A]', icon: <FlaskConical className="w-3.5 h-3.5" /> },
  { id: 'review', label: 'Peer Review', accent: 'text-[#DC2626]', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  { id: 'inbox', label: 'Capture Inbox', accent: 'text-[#475569]', icon: <Inbox className="w-3.5 h-3.5" /> },
  { id: 'grants', label: 'Grants & CFPs', accent: 'text-[#2563EB]', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'system', label: '14 Databases', accent: 'text-[#0F172A]', icon: <Database className="w-3.5 h-3.5" /> },
];

const KpiTile: React.FC<{
  bg: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ bg, icon, label, value }) => (
  <div
    style={{ backgroundColor: bg }}
    className="rounded-[10px] px-4 py-3.5 space-y-1.5 border border-black/[0.04]"
  >
    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1E293B]">
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <p className="text-[14px] font-medium text-[#37352F] tabular-nums pl-5.5">
      {value}
    </p>
  </div>
);

export const ResearcherOsWorkspaceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResearcherTabId>('manuscripts');
  const [reviewFilter, setReviewFilter] = useState<'open' | 'paper'>('open');

  const currentMeta =
    RESEARCHER_OS_TABS.find((t) => t.id === activeTab) || RESEARCHER_OS_TABS[0];

  return (
    <div data-testid="researcher-os-tabs-explorer" className="space-y-5">
      {/* Outer Interactive 8-Module Tab Strip (Matching Freelancer OS) */}
      <div
        role="tablist"
        aria-label="Researcher OS Interactive Sections"
        className="flex flex-wrap items-center gap-2"
      >
        {RESEARCHER_OS_TABS.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`ros-module-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[10px] text-[12.5px] font-semibold border inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              <span className="opacity-70 text-[11px] font-mono">
                {String(idx + 1).padStart(2, '0')}
              </span>
              {tab.icon}
              <span>{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Notion Workspace Window */}
      <div
        data-testid={`ros-tabpanel-${activeTab}`}
        role="tabpanel"
        aria-label={currentMeta.pageTitle}
        className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_16px_44px_-18px_rgba(15,23,42,0.10)] overflow-hidden"
      >
        {/* Subtle Notion Top Chrome */}
        <div className="px-5 py-3 border-b border-[#F1F5F9] bg-[#FBFBFA] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#64748B]">
          <div className="flex items-center gap-2 font-medium text-[#37352F]">
            <span className="inline-flex items-center gap-1 text-[#64748B]">
              <span>Researcher OS</span>
              <span>/</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#0F172A]">
              {currentMeta.icon}
              <span>{currentMeta.pageTitle}</span>
            </span>
          </div>
          <span className="text-[11.5px] font-medium text-[#64748B]">
            Interactive Notion Workspace Preview
          </span>
        </div>

        {/* Main Notion Canvas Interior */}
        <div className="p-5 sm:p-8 lg:p-10 space-y-6 bg-white">
          <h3 className="font-display text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-[#2F2D28] leading-tight">
            {currentMeta.pageTitle}
          </h3>

          {/* 2-Row Quick Switch Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {RESEARCHER_QUICK_NAV.map((nav) => {
              const selected = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveTab(nav.id)}
                  className={`px-3.5 py-2.5 rounded-[8px] border text-left text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#F4F3F1] border-[#D8D6D0] text-[#0F172A] font-semibold'
                      : 'bg-white border-[#EAEAEA] text-[#52504A] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <span className={`${nav.accent} shrink-0`}>{nav.icon}</span>
                  <span
                    className={`truncate ${
                      selected
                        ? ''
                        : 'underline decoration-[#D4D4D8] underline-offset-4'
                    }`}
                  >
                    {nav.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Notion Callout Banner */}
          <div className="rounded-[10px] bg-[#F6F5F3] border border-[#EAE8E3] px-4 py-3.5 flex items-start gap-3 text-[13.5px] leading-[1.5] text-[#37352F]">
            <span className="mt-0.5 text-[#1D6EE3] shrink-0">
              {currentMeta.icon}
            </span>
            <p>
              <span className="font-bold">{currentMeta.calloutTitle}</span> —{' '}
              <span className="text-[#52504A]">{currentMeta.calloutBody}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
