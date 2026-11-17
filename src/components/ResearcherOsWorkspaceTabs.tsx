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

          {/* TAB 01: RESEARCH HUB */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EAF3FC"
                  icon={<FileText className="w-4 h-4 text-[#1D6EE3]" />}
                  label="Manuscripts"
                  value="2 active in flight"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<MessageSquare className="w-4 h-4 text-[#CA8A04]" />}
                  label="Comments open"
                  value="3 reviewer items"
                />
                <KpiTile
                  bg="#F3EFFB"
                  icon={<BookOpen className="w-4 h-4 text-[#7C3AED]" />}
                  label="Reading queue"
                  value="12 papers to screen"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<Layers className="w-4 h-4 text-[#16A34A]" />}
                  label="Word count progress"
                  value="4,050 / 7,000 w (58%)"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 rounded-[12px] border border-[#EAEAEA] p-4 space-y-3 bg-[#FBFBFA]">
                  <h4 className="text-[15px] font-bold text-[#2F2D28]">
                    Guides & One-Click Templates
                  </h4>
                  <ul className="space-y-2 text-[13px] text-[#334155]">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1D6EE3]" /><span>Paper Launch Blueprint (IMRaD)</span></li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1D6EE3]" /><span>Weekly Research Reset Checklist</span></li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1D6EE3]" /><span>Atomic Zettel & Literature Matrix Sheets</span></li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#1D6EE3]" /><span>Grant Specific Aims & Advisor 1:1 Log</span></li>
                  </ul>
                </div>

                <div className="lg:col-span-7 rounded-[12px] border border-[#EAEAEA] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#EAEAEA] bg-[#FAF9F7] flex items-center justify-between text-[13px] font-bold text-[#2F2D28]">
                    <span>↗ Quick Capture Inbox</span>
                    <span className="text-[11px] font-medium text-[#64748B]">Triage Queue</span>
                  </div>
                  <div className="divide-y divide-[#F1F1EF] text-[13px]">
                    {[
                      { item: 'Verify ECE bin count used in calibration baseline', tag: 'Citation to Check', tone: 'bg-[#FBF5E2] text-[#B45309]' },
                      { item: 'Ablate entropy vs. margin as retrieval trigger', tag: 'Experiment Idea', tone: 'bg-[#F3EFFB] text-[#7C3AED]' },
                      { item: 'Selective Classification for Deep Neural Networks', tag: 'Paper to Screen', tone: 'bg-[#EAF3FC] text-[#1D6EE3]' },
                    ].map((row) => (
                      <div key={row.item} className="px-4 py-2.5 flex items-center justify-between gap-3">
                        <span className="font-medium text-[#2F2D28] truncate">{row.item}</span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium shrink-0 ${row.tone}`}>
                          {row.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: ACTIVE MANUSCRIPTS & SECTION TRACKER */}
          {activeTab === 'manuscripts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile bg="#EAF3FC" icon={<FileText className="w-4 h-4 text-[#1D6EE3]" />} label="Drafting stage" value="58% · 4,050 / 7,000 w" />
                <KpiTile bg="#EDF5EE" icon={<Check className="w-4 h-4 text-[#16A34A]" />} label="Sections polished" value="2 of 4 ready" />
                <KpiTile bg="#FCECEC" icon={<Calendar className="w-4 h-4 text-[#DC2626]" />} label="Target venue" value="ACL 2027 (Feb 15)" />
                <KpiTile bg="#FBF5E2" icon={<BookOpen className="w-4 h-4 text-[#CA8A04]" />} label="Secondary paper" value="Benchmarking (TACL)" />
              </div>

              <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                <table className="w-full text-left text-[13px] min-w-[580px]">
                  <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#64748B] text-[12px]">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Section Tracker</th>
                      <th className="py-2.5 px-4 font-medium">Status</th>
                      <th className="py-2.5 px-4 font-medium">Words</th>
                      <th className="py-2.5 px-4 font-medium">Target Date</th>
                      <th className="py-2.5 px-4 font-medium text-right">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF]">
                    {[
                      { sec: '1. Abstract & Introduction', status: 'Polished', sTone: 'bg-[#EDF5EE] text-[#15803D]', words: '900 / 1000 w', date: 'Nov 20, 2026', prio: 'P2 · Active', pTone: 'bg-[#FBF5E2] text-[#B45309]' },
                      { sec: '2. Related Work', status: 'Revising', sTone: 'bg-[#FBF5E2] text-[#B45309]', words: '1350 / 1500 w', date: 'Nov 27, 2026', prio: 'P2 · Active', pTone: 'bg-[#FBF5E2] text-[#B45309]' },
                      { sec: '3. Methodology', status: 'Drafting', sTone: 'bg-[#EAF3FC] text-[#1D6EE3]', words: '1500 / 2000 w', date: 'Dec 8, 2026', prio: 'P1 · Urgent', pTone: 'bg-[#FCECEC] text-[#DC2626]' },
                      { sec: '4. Experiments & Results', status: 'Outline', sTone: 'bg-[#F1F1EF] text-[#52504A]', words: '300 / 2500 w', date: 'Dec 22, 2026', prio: 'P1 · Urgent', pTone: 'bg-[#FCECEC] text-[#DC2626]' },
                    ].map((row) => (
                      <tr key={row.sec}>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{row.sec}</td>
                        <td className="py-2.5 px-4"><span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.sTone}`}>{row.status}</span></td>
                        <td className="py-2.5 px-4 tabular-nums text-[#475569]">{row.words}</td>
                        <td className="py-2.5 px-4 text-[#64748B]">{row.date}</td>
                        <td className="py-2.5 px-4 text-right"><span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.pTone}`}>{row.prio}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 03: ATOMIC SYNTHESIS VAULT */}
          {activeTab === 'synthesis' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                {
                  claim: 'Expected Calibration Error as the calibration yardstick',
                  type: 'Definition / Framework',
                  kind: 'Paraphrase',
                  stage: '● Refined',
                  tone: 'bg-[#EAF3FC] text-[#1D6EE3]',
                },
                {
                  claim: 'Embedding similarity is not the same as faithfulness',
                  type: 'Counter-Argument',
                  kind: 'My Synthesis',
                  stage: '● Raw Note',
                  tone: 'bg-[#FBF5E2] text-[#B45309]',
                },
                {
                  claim: 'Retrieval is applied to every input, even when unnecessary',
                  type: 'Limitation / Gap',
                  kind: 'Critical Critique',
                  stage: '● Refined',
                  tone: 'bg-[#FCECEC] text-[#DC2626]',
                },
                {
                  claim: 'Self-attention removes recurrence as sequential bottleneck',
                  type: 'Core Claim',
                  kind: 'Paraphrase',
                  stage: '● Integrated in Draft',
                  tone: 'bg-[#EDF5EE] text-[#15803D]',
                },
              ].map((card) => (
                <div
                  key={card.claim}
                  className="rounded-[12px] border border-[#EAEAEA] bg-[#FAF9F7] p-3.5 space-y-2.5"
                >
                  <p className="text-[13px] font-semibold text-[#2F2D28] leading-snug">
                    {card.claim}
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
                    <span className={`px-2 py-0.5 rounded ${card.tone}`}>{card.type}</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-[#EAEAEA] text-[#475569]">{card.kind}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#1D6EE3]">{card.stage}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
