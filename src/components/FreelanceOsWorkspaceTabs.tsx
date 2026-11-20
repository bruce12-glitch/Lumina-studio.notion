import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Compass,
  Database,
  FileText,
  Folder,
  Globe,
  Home,
  KeyRound,
  Lightbulb,
  Mail,
  Scale,
  Sprout,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

export type FreelanceTabId =
  | 'hub'
  | 'clients'
  | 'projects'
  | 'finances'
  | 'time'
  | 'ideas'
  | 'growth'
  | 'legals'
  | 'email'
  | 'accounts'
  | 'plan'
  | 'externals'
  | 'system';

interface TabMeta {
  id: FreelanceTabId;
  shortLabel: string;
  pageTitle: string;
  calloutTitle: string;
  calloutBody: string;
  icon: React.ReactNode;
}

export const FREELANCE_OS_TABS: TabMeta[] = [
  {
    id: 'hub',
    shortLabel: 'Main Hub',
    pageTitle: 'Freelancer Business OS',
    calloutTitle: 'Main Hub (Freelancer Business OS)',
    calloutBody:
      'Shows unpaid invoices, overdue alerts, open proposals, today’s follow-ups, weekly tasks, and a Friday review checklist.',
    icon: <Home className="w-3.5 h-3.5" />,
  },
  {
    id: 'clients',
    shortLabel: 'Clients',
    pageTitle: 'Clients Dashboard',
    calloutTitle: 'Clients Dashboard',
    calloutBody:
      'Every relationship in one place: pipeline, key accounts, follow-ups, and open proposals. If it touches a client, it starts here.',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  {
    id: 'projects',
    shortLabel: 'Projects',
    pageTitle: 'Project Management',
    calloutTitle: 'Project Management',
    calloutBody:
      'Every engagement from kickoff to launch. Statuses, deadlines, health flags, and deliverables stay connected to the client and the invoice.',
    icon: <Folder className="w-3.5 h-3.5" />,
  },
  {
    id: 'finances',
    shortLabel: 'Finances',
    pageTitle: 'Finances & Invoices',
    calloutTitle: 'Finances & Invoices',
    calloutBody:
      'Unpaid invoice tracker with automatic overdue aging, paid ledger, expense tracker, and monthly financial reports.',
    icon: <Wallet className="w-3.5 h-3.5" />,
  },
  {
    id: 'time',
    shortLabel: 'Time Sheet',
    pageTitle: 'Time Sheet',
    calloutTitle: 'Time Sheet',
    calloutBody:
      'Billable hours, utilization, and project profitability. Log daily in 0.25 h steps; invoice from the Uninvoiced view.',
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  {
    id: 'ideas',
    shortLabel: 'Ideation Hub',
    pageTitle: 'Ideation Hub',
    calloutTitle: 'Ideation Hub',
    calloutBody:
      'Idea capture board with Impact/Confidence/Ease (ICE) scoring and promotion to active projects.',
    icon: <Lightbulb className="w-3.5 h-3.5" />,
  },
  {
    id: 'growth',
    shortLabel: 'Growth',
    pageTitle: 'Growth & Strategy',
    calloutTitle: 'Growth & Strategy',
    calloutBody:
      'The long view: SMART goals, the annual roadmap, and the marketing plan that compounds. Review quarterly; update monthly.',
    icon: <Sprout className="w-3.5 h-3.5" />,
  },
  {
    id: 'legals',
    shortLabel: 'Legals',
    pageTitle: 'Legals & Contracts',
    calloutTitle: 'Legals & Contracts',
    calloutBody:
      'Contract tracker (MSAs, SOWs, NDAs) with renewal alerts and a standard clause library.',
    icon: <Scale className="w-3.5 h-3.5" />,
  },
  {
    id: 'email',
    shortLabel: 'Email List',
    pageTitle: 'Email List & Outreach',
    calloutTitle: 'Email List',
    calloutBody:
      'Segmented contact directory and outreach/newsletter campaign tracker.',
    icon: <Mail className="w-3.5 h-3.5" />,
  },
  {
    id: 'accounts',
    shortLabel: 'Accounts',
    pageTitle: 'Accounts Access',
    calloutTitle: 'Accounts Access',
    calloutBody:
      'Secure catalog of login URLs, 2FA status, subscription renewals, and vault pointers (no raw passwords).',
    icon: <KeyRound className="w-3.5 h-3.5" />,
  },
  {
    id: 'plan',
    shortLabel: 'Business Plan',
    pageTitle: 'Business Plan',
    calloutTitle: 'Business Plan',
    calloutBody:
      'Structured 12-month financial model, offer ladder, risk register, and 90-day action plan.',
    icon: <Briefcase className="w-3.5 h-3.5" />,
  },
  {
    id: 'externals',
    shortLabel: 'Externals',
    pageTitle: 'Externals & Portfolio',
    calloutTitle: 'Externals',
    calloutBody:
      'Brand guidelines, business credentials, and a publish-ready portfolio page.',
    icon: <Globe className="w-3.5 h-3.5" />,
  },
  {
    id: 'system',
    shortLabel: 'System & Support',
    pageTitle: 'System & Support',
    calloutTitle: 'System & Support',
    calloutBody:
      'Quick Actions SOPs, Templates library (project briefs, proposals, invoices, contracts), and the System · Databases backend.',
    icon: <Database className="w-3.5 h-3.5" />,
  },
];

const NOTION_QUICK_NAV: Array<{
  id: FreelanceTabId;
  label: string;
  accent: string;
  icon: React.ReactNode;
}> = [
  { id: 'hub', label: 'Home', accent: 'text-[#9A6700]', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'clients', label: 'Clients', accent: 'text-[#2383E2]', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'projects', label: 'Projects', accent: 'text-[#2563EB]', icon: <Folder className="w-3.5 h-3.5" /> },
  { id: 'ideas', label: 'Ideas', accent: 'text-[#D97706]', icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { id: 'legals', label: 'Legals', accent: 'text-[#6E6D68]', icon: <Scale className="w-3.5 h-3.5" /> },
  { id: 'time', label: 'Time', accent: 'text-[#52504A]', icon: <Clock className="w-3.5 h-3.5" /> },
  { id: 'growth', label: 'Growth', accent: 'text-[#16A34A]', icon: <Sprout className="w-3.5 h-3.5" /> },
  { id: 'finances', label: 'Finances', accent: 'text-[#CA8A04]', icon: <Wallet className="w-3.5 h-3.5" /> },
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
    <div className="flex items-center gap-2 text-[13px] font-semibold text-[#37352F]">
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
    <p className="text-[14px] font-medium text-[#37352F] tabular-nums pl-5.5">
      {value}
    </p>
  </div>
);

const NotionSectionCallout: React.FC<{
  bg: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ bg, icon, title, subtitle, active, onClick }) => {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      style={{ backgroundColor: bg }}
      className={`w-full text-left rounded-[10px] px-4 py-3 flex items-start gap-2.5 text-[13px] leading-[1.45] border transition-all ${
        active
          ? 'border-[#2383E2]/50 ring-2 ring-[#2383E2]/10'
          : 'border-black/[0.04]'
      } ${onClick ? 'cursor-pointer hover:brightness-[0.985]' : ''}`}
    >
      <span className="shrink-0 mt-0.5">{icon}</span>
      <div className="text-[#37352F]">
        <span className="font-bold">{title}</span>{' '}
        <span className="text-[#52504A]">— {subtitle}</span>
      </div>
    </Tag>
  );
};

export const FreelanceOsWorkspaceTabs: React.FC<{
  onOpenBuy?: () => void;
  priceLabel?: string;
}> = ({ onOpenBuy, priceLabel = 'Duplicate to Notion' }) => {
  const [activeTab, setActiveTab] = useState<FreelanceTabId>('clients');
  const [clientsView, setClientsView] = useState<'board' | 'accounts'>('board');
  const [projectsView, setProjectsView] = useState<'board' | 'timeline' | 'risk'>('board');
  const [ideasView, setIdeasView] = useState<'board' | 'scored' | 'parked'>('board');
  const [fridayChecks, setFridayChecks] = useState<Record<string, boolean>>({
    'Send any invoice that is ready': true,
    'Chase the oldest overdue invoice': false,
    'Update goal scorecard & backlog': false,
    'Log weekly time entries': true,
  });
  const [timeInvoicedIds, setTimeInvoicedIds] = useState<Record<string, boolean>>({
    t1: true,
    t2: false,
    t3: false,
    t4: true,
  });

  const currentMeta =
    FREELANCE_OS_TABS.find((t) => t.id === activeTab) || FREELANCE_OS_TABS[0];

  const toggleFridayCheck = (item: string) => {
    setFridayChecks((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const toggleTimeInvoiced = (id: string) => {
    setTimeInvoicedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div data-testid="freelance-os-tabs-explorer" className="space-y-5">
      {/* Outer Interactive 13-Module Tab Strip */}
      <div
        role="tablist"
        aria-label="Freelancer OS 13 Interactive Sections"
        className="flex flex-wrap items-center gap-2"
      >
        {FREELANCE_OS_TABS.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`fos-module-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[10px] text-[12.5px] font-semibold border inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_6px_16px_-6px_rgba(55,53,47,0.35)]'
                  : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F]'
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

      {/* Interactive Notion Workspace Window (Replicating Reference Screens 1–7) */}
      <div
        data-testid={`fos-tabpanel-${activeTab}`}
        role="tabpanel"
        aria-label={currentMeta.pageTitle}
        className="rounded-[24px] bg-white border border-[#E9E9E7] shadow-[0_16px_44px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
      >
        {/* Subtle Notion Top Chrome */}
        <div className="px-5 py-3 border-b border-[#F1F1EF] bg-[#FBFBFA] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#6E6D68]">
          <div className="flex items-center gap-2 font-medium text-[#37352F]">
            <span className="inline-flex items-center gap-1 text-[#6E6D68]">
              <span>Freelancer Business OS</span>
              <span>/</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#37352F]">
              {currentMeta.icon}
              <span>{currentMeta.pageTitle}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11.5px] font-medium text-[#6E6D68]">
              Interactive Preview · Click tabs &amp; checkboxes
            </span>
            {onOpenBuy && (
              <button
                type="button"
                data-testid="fos-workspace-buy-btn"
                onClick={onOpenBuy}
                className="px-3 py-1 rounded-[7px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[11.5px] font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{priceLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Notion Canvas Interior */}
        <div className="p-5 sm:p-8 lg:p-10 space-y-6 bg-white">
          {/* Page Title (Editorial Serif/Display feel matching screenshot headers) */}
          <h3 className="font-display text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-[#2F2D28] leading-tight">
            {currentMeta.pageTitle}
          </h3>

          {/* 2-Row Quick Switch Notion Navigation Grid (Matching image_5302a519 & image_a61bb492) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {NOTION_QUICK_NAV.map((nav) => {
              const selected = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  type="button"
                  onClick={() => setActiveTab(nav.id)}
                  className={`px-3.5 py-2.5 rounded-[8px] border text-left text-[13px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#F4F3F1] border-[#D8D6D0] text-[#37352F] font-semibold'
                      : 'bg-white border-[#EAEAEA] text-[#52504A] hover:bg-[#FAF9F7]'
                  }`}
                >
                  <span className={`${nav.accent} shrink-0`}>{nav.icon}</span>
                  <span
                    className={`truncate ${
                      selected ? '' : 'underline decoration-[#D4D4D8] underline-offset-4'
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
            <span className="mt-0.5 text-[#2383E2] shrink-0">
              {currentMeta.icon}
            </span>
            <p>
              <span className="font-bold">{currentMeta.calloutTitle}</span> —{' '}
              <span className="text-[#52504A]">{currentMeta.calloutBody}</span>
            </p>
          </div>

          {/* ===============================================================
              TAB 01: MAIN HUB (FREELANCER BUSINESS OS)
             =============================================================== */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#FCECEC"
                  icon={<AlertTriangle className="w-4 h-4 text-[#DC2626]" />}
                  label="Overdue invoices"
                  value="2 overdue · ₹1,32,900"
                />
                <KpiTile
                  bg="#F3EFFB"
                  icon={<FileText className="w-4 h-4 text-[#7C3AED]" />}
                  label="Open proposals"
                  value="3 active · ₹8,90,000"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Calendar className="w-4 h-4 text-[#CA8A04]" />}
                  label="Today’s follow-ups"
                  value="5 due this week"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<CheckSquare className="w-4 h-4 text-[#16A34A]" />}
                  label="Weekly progress"
                  value="5 deliverables · 2 at risk"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 rounded-[12px] border border-[#EAEAEA] p-4 space-y-3 bg-[#FBFBFA]">
                  <h4 className="text-[15px] font-bold text-[#2F2D28]">
                    Friday 30-min Review Checklist
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(fridayChecks).map(([label, done]) => (
                      <label
                        key={label}
                        className="flex items-center gap-2.5 text-[13px] text-[#37352F] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleFridayCheck(label)}
                          className="w-4 h-4 rounded accent-[#2383E2] cursor-pointer"
                        />
                        <span className={done ? 'line-through text-[#8E8B84]' : ''}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 rounded-[12px] border border-[#EAEAEA] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#EAEAEA] bg-[#FAF9F7] flex items-center justify-between text-[13px] font-bold text-[#2F2D28]">
                    <span>↗ Weekly Priority Actions</span>
                    <span className="text-[11px] font-medium text-[#6E6D68]">
                      Mon Plan → Fri Review
                    </span>
                  </div>
                  <div className="divide-y divide-[#F1F1EF] text-[13px]">
                    {[
                      { task: 'Chase overdue invoice INV-2026-036', area: 'Finances', status: 'Urgent', tone: 'bg-[#FCECEC] text-[#DC2626]' },
                      { task: 'Send Kirana Cloud Speed Sprint SOW', area: 'Legals', status: 'Due Today', tone: 'bg-[#FBF5E2] text-[#B45309]' },
                      { task: 'Score Q4 productized offer ideas (ICE)', area: 'Ideation Hub', status: 'In Progress', tone: 'bg-[#EBF3FC] text-[#2383E2]' },
                      { task: 'Verify P2 Nova Labs billable hours', area: 'Time Sheet', status: 'Ready', tone: 'bg-[#EDF5EE] text-[#15803D]' },
                    ].map((row) => (
                      <div key={row.task} className="px-4 py-2.5 flex items-center justify-between gap-3">
                        <span className="font-medium text-[#2F2D28] truncate">
                          {row.task}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11.5px] text-[#6E6D68] hidden sm:inline">
                            {row.area}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.tone}`}>
                            {row.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 02: CLIENTS DASHBOARD (Matches image_5302a519 & image_c8c1f85f)
             =============================================================== */}
          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EDF5EE"
                  icon={<Users className="w-4 h-4 text-[#2383E2]" />}
                  label="Active clients"
                  value="4 relationships"
                />
                <KpiTile
                  bg="#F3EFFB"
                  icon={<Mail className="w-4 h-4 text-[#7C3AED]" />}
                  label="Open pipeline"
                  value="₹8,90,000"
                />
                <KpiTile
                  bg="#FCECEC"
                  icon={<span className="inline-block w-3 h-3 rounded-full bg-[#DC2626]" />}
                  label="Outstanding"
                  value="₹2,68,600"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Calendar className="w-4 h-4 text-[#CA8A04]" />}
                  label="Follow-ups this week"
                  value="5 due"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  Pipeline Command
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <NotionSectionCallout
                    bg="#EBF3FC"
                    icon={<BarChart3 className="w-4 h-4 text-[#2383E2]" />}
                    title="Pipeline Board"
                    subtitle="Drag to move deals"
                    active={clientsView === 'board'}
                    onClick={() => setClientsView('board')}
                  />
                  <NotionSectionCallout
                    bg="#FBF5E2"
                    icon={<span className="text-[#CA8A04]">★</span>}
                    title="Key Accounts"
                    subtitle="A-tier clients, LTV sorted"
                    active={clientsView === 'accounts'}
                    onClick={() => setClientsView('accounts')}
                  />
                </div>

                {clientsView === 'board' ? (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-[15px] font-bold text-[#2F2D28]">
                      <span>↗ Clients</span>
                      <span className="px-2.5 py-1 rounded-[6px] bg-[#2383E2] text-white text-[11.5px] font-semibold">
                        New
                      </span>
                    </div>
                    <div className="overflow-x-auto pb-2">
                      <div className="grid grid-cols-5 gap-3 min-w-[740px]">
                        {[
                          {
                            stage: 'Lead',
                            pillBg: '#F1F1EF',
                            pillText: '#52504A',
                            cardBg: '#FAF9F7',
                            items: [
                              { name: 'Finch Finance', tier: 'A — Key', tierBg: '#FBF5E2', val: '₹3,50,000', date: 'November 14, 2026' },
                            ],
                          },
                          {
                            stage: 'Contacted',
                            pillBg: '#E1EFFB',
                            pillText: '#2383E2',
                            cardBg: '#F5FAFE',
                            items: [],
                          },
                          {
                            stage: 'Discovery',
                            pillBg: '#EFEAFB',
                            pillText: '#6D28D9',
                            cardBg: '#F8F6FC',
                            items: [
                              { name: 'Studio Mosaic', tier: 'B — Standard', tierBg: '#E1EFFB', val: '₹2,50,000', date: 'November 16, 2026' },
                            ],
                          },
                          {
                            stage: 'Active',
                            pillBg: '#E3F2E8',
                            pillText: '#15803D',
                            cardBg: '#F5FAF6',
                            items: [
                              { name: 'Nova Labs', tier: 'A — Key', tierBg: '#FBF5E2', val: '₹3,00,000', date: 'November 23, 2026' },
                              { name: 'Kirana Cloud', tier: 'B — Standard', tierBg: '#E1EFFB', val: '₹2,20,000', date: 'November 18, 2026' },
                            ],
                          },
                          {
                            stage: 'On Hold',
                            pillBg: '#FBF0D6',
                            pillText: '#92400E',
                            cardBg: '#FCF9F0',
                            items: [
                              { name: 'Bloom Health', tier: 'C — Occasional', tierBg: '#F1F1EF', val: '₹1,80,000', date: 'November 20, 2026' },
                            ],
                          },
                        ].map((col) => (
                          <div
                            key={col.stage}
                            style={{ backgroundColor: col.cardBg }}
                            className="rounded-[10px] p-2.5 border border-black/[0.05] space-y-2"
                          >
                            <span
                              style={{ backgroundColor: col.pillBg, color: col.pillText }}
                              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                            >
                              ● {col.stage}
                            </span>
                            {col.items.map((item) => (
                              <div
                                key={item.name}
                                className="rounded-[8px] bg-white border border-[#EAEAEA] p-2.5 space-y-1.5 shadow-[0_1px_2px_rgba(55,53,47,0.03)]"
                              >
                                <p className="text-[12.5px] font-semibold text-[#2F2D28]">
                                  {item.name}
                                </p>
                                <div className="flex flex-wrap items-center gap-1.5 text-[10.5px]">
                                  <span
                                    style={{ backgroundColor: item.tierBg }}
                                    className="px-1.5 py-0.5 rounded font-medium text-[#37352F]"
                                  >
                                    {item.tier}
                                  </span>
                                  <span className="text-[#52504A] tabular-nums">
                                    {item.val}
                                  </span>
                                </div>
                                <p className="text-[10.5px] text-[#6E6D68]">
                                  {item.date}
                                </p>
                              </div>
                            ))}
                            <div className="rounded-[7px] border border-dashed border-[#D8D6D0] px-2.5 py-1.5 text-[11.5px] text-[#6E6D68]">
                              + New page
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                    <table className="w-full text-left text-[13px] min-w-[540px]">
                      <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Client</th>
                          <th className="py-2.5 px-4 font-medium">Tier</th>
                          <th className="py-2.5 px-4 font-medium">Contact</th>
                          <th className="py-2.5 px-4 font-medium text-right">LTV Revenue</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F1EF]">
                        {[
                          { name: 'Nova Labs', tier: 'A — Key', contact: 'priya@novalabs.io', ltv: '₹7,08,000' },
                          { name: 'Kirana Cloud', tier: 'B — Standard', contact: 'leo@kiranacloud.com', ltv: '₹4,35,700' },
                          { name: 'Finch Finance', tier: 'A — Key', contact: 'meera@finchfinance.com', ltv: '₹3,50,000' },
                        ].map((c) => (
                          <tr key={c.name}>
                            <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{c.name}</td>
                            <td className="py-2.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-[#FBF5E2] text-[11px] font-medium text-[#92400E]">
                                {c.tier}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-[#6E6D68]">{c.contact}</td>
                            <td className="py-2.5 px-4 text-right font-semibold tabular-nums">{c.ltv}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 03: PROJECT MANAGEMENT (Matches image_a61bb492)
             =============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EBF3FC"
                  icon={<FileText className="w-4 h-4 text-[#52504A]" />}
                  label="Active projects"
                  value="4"
                />
                <KpiTile
                  bg="#FCECEC"
                  icon={<AlertTriangle className="w-4 h-4 text-[#CA8A04]" />}
                  label="At risk"
                  value="1 overdue"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<Check className="w-4 h-4 text-[#16A34A]" />}
                  label="Deliverables done"
                  value="16 / 29"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Calendar className="w-4 h-4 text-[#DC2626]" />}
                  label="Due this week"
                  value="4 items"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  Delivery Command
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <NotionSectionCallout
                    bg="#EBF3FC"
                    icon={<FileText className="w-4 h-4 text-[#2383E2]" />}
                    title="Projects Board"
                    subtitle="Kanban by status (Simple, Complete, Advanced)"
                    active={projectsView === 'board'}
                    onClick={() => setProjectsView('board')}
                  />
                  <NotionSectionCallout
                    bg="#F3EFFB"
                    icon={<Calendar className="w-4 h-4 text-[#7C3AED]" />}
                    title="Timeline"
                    subtitle="Start → Deadline, grouped by client"
                    active={projectsView === 'timeline'}
                    onClick={() => setProjectsView('timeline')}
                  />
                  <NotionSectionCallout
                    bg="#FCECEC"
                    icon={<AlertTriangle className="w-4 h-4 text-[#CA8A04]" />}
                    title="At Risk"
                    subtitle="Health red, deadline ≤ 7d"
                    active={projectsView === 'risk'}
                    onClick={() => setProjectsView('risk')}
                  />
                </div>

                <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                  <table className="w-full text-left text-[13px] min-w-[600px]">
                    <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Project</th>
                        <th className="py-2.5 px-4 font-medium">Client</th>
                        <th className="py-2.5 px-4 font-medium">Board Mode</th>
                        <th className="py-2.5 px-4 font-medium">Deliverables</th>
                        <th className="py-2.5 px-4 font-medium">Health</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F1EF]">
                      {[
                        { name: 'P2 · Nova Labs · Care Redesign', client: 'Nova Labs', mode: 'Complete', deliv: '7 / 10', health: 'On Track', hBg: '#EDF5EE', hInk: '#15803D', isRisk: false },
                        { name: 'P4 · Kirana Cloud · Analytics Portal', client: 'Kirana Cloud', mode: 'Advanced', deliv: '4 / 9', health: 'At Risk (3d)', hBg: '#FCECEC', hInk: '#DC2626', isRisk: true },
                        { name: 'P6 · Bloom Health · Patient Flow', client: 'Bloom Health', mode: 'Simple', deliv: '5 / 10', health: 'On Track', hBg: '#EDF5EE', hInk: '#15803D', isRisk: false },
                      ]
                        .filter((r) => projectsView !== 'risk' || r.isRisk)
                        .map((row) => (
                          <tr key={row.name}>
                            <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{row.name}</td>
                            <td className="py-2.5 px-4 text-[#52504A]">{row.client}</td>
                            <td className="py-2.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-[#EBF3FC] text-[11px] font-medium text-[#2383E2]">
                                {row.mode}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 tabular-nums">{row.deliv}</td>
                            <td className="py-2.5 px-4">
                              <span
                                style={{ backgroundColor: row.hBg, color: row.hInk }}
                                className="px-2 py-0.5 rounded-full text-[11px] font-medium"
                              >
                                ● {row.health}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 04: FINANCES & INVOICES
             =============================================================== */}
          {activeTab === 'finances' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EDF5EE"
                  icon={<Wallet className="w-4 h-4 text-[#16A34A]" />}
                  label="Collected (All-time)"
                  value="₹4,82,500"
                />
                <KpiTile
                  bg="#FCECEC"
                  icon={<AlertTriangle className="w-4 h-4 text-[#DC2626]" />}
                  label="Overdue invoices"
                  value="₹1,32,900 · 2 due"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<FileText className="w-4 h-4 text-[#CA8A04]" />}
                  label="Outstanding balance"
                  value="₹2,68,600"
                />
                <KpiTile
                  bg="#EBF3FC"
                  icon={<TrendingUp className="w-4 h-4 text-[#2383E2]" />}
                  label="Net realized profit"
                  value="₹4,69,320"
                />
              </div>

              <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                <div className="px-4 py-2.5 bg-[#FAF9F7] border-b border-[#EAEAEA] flex items-center justify-between text-[13px] font-bold text-[#2F2D28]">
                  <span>↗ Unpaid & Overdue Aging Tracker</span>
                  <span className="text-[11px] font-medium text-[#6E6D68]">
                    Paid ledger & monthly P&L linked
                  </span>
                </div>
                <table className="w-full text-left text-[13px] min-w-[600px]">
                  <thead className="border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Invoice</th>
                      <th className="py-2.5 px-4 font-medium">Client</th>
                      <th className="py-2.5 px-4 font-medium">Status</th>
                      <th className="py-2.5 px-4 font-medium text-right">Balance Due</th>
                      <th className="py-2.5 px-4 font-medium">Aging Bucket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF]">
                    {[
                      { id: 'INV-2026-036', client: 'Studio Mosaic', status: 'Partial', sBg: '#FBF5E2', sInk: '#B45309', bal: '₹62,100', bucket: '31–60d Overdue', bInk: 'text-[#DC2626]' },
                      { id: 'INV-2026-035', client: 'Nova Labs', status: 'Sent', sBg: '#EBF3FC', sInk: '#2383E2', bal: '₹70,800', bucket: '16–30d Overdue', bInk: 'text-[#D97706]' },
                      { id: 'INV-2026-034', client: 'Kirana Cloud', status: 'Sent', sBg: '#EBF3FC', sInk: '#2383E2', bal: '₹88,500', bucket: '1–15d Due', bInk: 'text-[#CA8A04]' },
                      { id: 'INV-2026-031', client: 'Bloom Health', status: 'Paid', sBg: '#EDF5EE', sInk: '#15803D', bal: '₹0', bucket: 'Settled', bInk: 'text-[#16A34A]' },
                    ].map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{inv.id}</td>
                        <td className="py-2.5 px-4 text-[#52504A]">{inv.client}</td>
                        <td className="py-2.5 px-4">
                          <span
                            style={{ backgroundColor: inv.sBg, color: inv.sInk }}
                            className="px-2 py-0.5 rounded text-[11px] font-medium"
                          >
                            {inv.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-semibold tabular-nums">{inv.bal}</td>
                        <td className={`py-2.5 px-4 text-[12px] font-semibold ${inv.bInk}`}>{inv.bucket}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 05: TIME SHEET (Matches image_331e41c9)
             =============================================================== */}
          {activeTab === 'time' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EBF3FC"
                  icon={<Clock className="w-4 h-4 text-[#52504A]" />}
                  label="Hours this week"
                  value="25 h"
                />
                <KpiTile
                  bg="#F3EFFB"
                  icon={<BarChart3 className="w-4 h-4 text-[#7C3AED]" />}
                  label="Total logged"
                  value="74.5 h"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<FileText className="w-4 h-4 text-[#CA8A04]" />}
                  label="Uninvoiced"
                  value="28.5 h"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<Wallet className="w-4 h-4 text-[#16A34A]" />}
                  label="Uninvoiced value"
                  value="₹83,900"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  This Week
                </h4>

                <NotionSectionCallout
                  bg="#EBF3FC"
                  icon={<Calendar className="w-4 h-4 text-[#2383E2]" />}
                  title="This Week"
                  subtitle="Entries Mon–Sun, sorted by date"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[15px] font-bold text-[#2F2D28]">
                    <span>↗ Time Entries</span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-[#2383E2] text-white text-[11.5px] font-semibold">
                      New
                    </span>
                  </div>

                  <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                    <table className="w-full text-left text-[13px] min-w-[640px]">
                      <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Aa Name</th>
                          <th className="py-2.5 px-4 font-medium">↗ Project</th>
                          <th className="py-2.5 px-4 font-medium">Date</th>
                          <th className="py-2.5 px-4 font-medium text-right"># Hours</th>
                          <th className="py-2.5 px-4 font-medium text-center">Billable</th>
                          <th className="py-2.5 px-4 font-medium text-center">Invoiced</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F1EF]">
                        {[
                          { id: 't1', name: 'Journey mapping', project: 'P6 · Bloom Health · Patient Flow', date: 'November 12, 2026', hours: '3' },
                          { id: 't2', name: 'Tracking plan draft', project: 'P4 · Kirana Cloud · Analytics', date: 'November 11, 2026', hours: '2' },
                          { id: 't3', name: 'Monitoring & patches', project: 'P2 · Nova Labs · Care Redesign', date: 'November 11, 2026', hours: '1.5' },
                          { id: 't4', name: 'Heuristic evaluation', project: 'P6 · Bloom Health · Patient Flow', date: 'November 10, 2026', hours: '4' },
                        ].map((entry) => (
                          <tr key={entry.id}>
                            <td className="py-2.5 px-4 font-medium text-[#2F2D28]">{entry.name}</td>
                            <td className="py-2.5 px-4 text-[#52504A] underline decoration-[#D4D4D8] underline-offset-2">{entry.project}</td>
                            <td className="py-2.5 px-4 text-[#52504A]">{entry.date}</td>
                            <td className="py-2.5 px-4 text-right tabular-nums">{entry.hours}</td>
                            <td className="py-2.5 px-4 text-center">
                              <input type="checkbox" defaultChecked aria-label={`Billable ${entry.name}`} className="w-4 h-4 accent-[#2383E2]" />
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={Boolean(timeInvoicedIds[entry.id])}
                                onChange={() => toggleTimeInvoiced(entry.id)}
                                aria-label={`Invoiced ${entry.name}`}
                                className="w-4 h-4 accent-[#2383E2] cursor-pointer"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 06: IDEATION HUB (Matches image_414f6470)
             =============================================================== */}
          {activeTab === 'ideas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#F3EFFB"
                  icon={<Lightbulb className="w-4 h-4 text-[#D97706]" />}
                  label="Ideas captured"
                  value="6"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<span className="text-[#D97706]">🏆</span>}
                  label="Top ICE score"
                  value="8.7"
                />
                <KpiTile
                  bg="#EBF3FC"
                  icon={<span className="text-[#52504A]">🛠️</span>}
                  label="Building"
                  value="1"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<span className="text-[#16A34A]">🧪</span>}
                  label="Validating"
                  value="2"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  Idea Pipeline
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <NotionSectionCallout
                    bg="#F3EFFB"
                    icon={<span>🗂️</span>}
                    title="Stage Board"
                    subtitle="Drag through funnel"
                    active={ideasView === 'board'}
                    onClick={() => setIdeasView('board')}
                  />
                  <NotionSectionCallout
                    bg="#EDF5EE"
                    icon={<span>🏆</span>}
                    title="Scored"
                    subtitle="Sorted by ICE (Impact×Confidence×Ease)"
                    active={ideasView === 'scored'}
                    onClick={() => setIdeasView('scored')}
                  />
                  <NotionSectionCallout
                    bg="#EBF3FC"
                    icon={<span>🧊</span>}
                    title="Parked"
                    subtitle="Quarterly resurrection review"
                    active={ideasView === 'parked'}
                    onClick={() => setIdeasView('parked')}
                  />
                </div>

                {ideasView === 'scored' ? (
                  <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                    <table className="w-full text-left text-[13px] min-w-[520px]">
                      <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                        <tr>
                          <th className="py-2.5 px-4 font-medium">Idea</th>
                          <th className="py-2.5 px-4 font-medium">Category</th>
                          <th className="py-2.5 px-4 font-medium">Stage</th>
                          <th className="py-2.5 px-4 font-medium text-right">ICE Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F1EF]">
                        {[
                          { name: 'Notion client-portal template product', cat: 'Product', stage: 'Building', ice: '8.7' },
                          { name: 'Productized “Design Ops Lite” retainer', cat: 'Service', stage: 'Validating', ice: '8.3' },
                          { name: 'Invoice reminder automation', cat: 'Automation', stage: 'Researching', ice: '7.7' },
                          { name: 'YouTube teardown series', cat: 'Content', stage: 'Spark', ice: '7.0' },
                        ].map((row) => (
                          <tr key={row.name}>
                            <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{row.name}</td>
                            <td className="py-2.5 px-4 text-[#52504A]">{row.cat}</td>
                            <td className="py-2.5 px-4 text-[#2383E2] font-medium">{row.stage}</td>
                            <td className="py-2.5 px-4 text-right font-bold tabular-nums">{row.ice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="overflow-x-auto pb-2">
                    <div className="grid grid-cols-5 gap-3 min-w-[760px]">
                      {[
                        {
                          stage: 'Spark ✨',
                          pillBg: '#EFEFED',
                          pillInk: '#52504A',
                          bg: '#FAF9F7',
                          cards: [{ title: 'YouTube teardown series', tag: 'Content', tagBg: '#F9E8D9', score: '7' }],
                        },
                        {
                          stage: 'Researching 🔍',
                          pillBg: '#DCEBFA',
                          pillInk: '#2383E2',
                          bg: '#F4F9FD',
                          cards: [{ title: 'Invoice reminder automation', tag: 'Automation', tagBg: '#EFEAFB', score: '7.7' }],
                        },
                        {
                          stage: 'Validating 🧪',
                          pillBg: '#EFEAFB',
                          pillInk: '#6D28D9',
                          bg: '#F8F6FC',
                          cards: [
                            { title: 'White-label partnership with Studio Mosaic', tag: 'Partnership', tagBg: '#FCE8EE', score: '6.7' },
                            { title: 'Productized “Design Ops Lite” retainer', tag: 'Service', tagBg: '#E3F2E8', score: '8.3' },
                          ],
                        },
                        {
                          stage: 'Building 🛠️',
                          pillBg: '#FBF0D6',
                          pillInk: '#92400E',
                          bg: '#FCF9F0',
                          cards: [{ title: 'Notion client-portal template product', tag: 'Product', tagBg: '#DCEBFA', score: '8.7' }],
                        },
                        {
                          stage: 'Launched 🚀',
                          pillBg: '#E3F2E8',
                          pillInk: '#15803D',
                          bg: '#F5FAF6',
                          cards: [],
                        },
                      ].map((col) => (
                        <div
                          key={col.stage}
                          style={{ backgroundColor: col.bg }}
                          className="rounded-[10px] p-2.5 border border-black/[0.05] space-y-2"
                        >
                          <span
                            style={{ backgroundColor: col.pillBg, color: col.pillInk }}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          >
                            {col.stage}
                          </span>
                          {col.cards.map((card) => (
                            <div
                              key={card.title}
                              className="rounded-[8px] bg-white border border-[#EAEAEA] p-2.5 space-y-2 shadow-[0_1px_2px_rgba(55,53,47,0.03)]"
                            >
                              <p className="text-[12px] font-semibold text-[#2F2D28] leading-snug">
                                {card.title}
                              </p>
                              <div className="flex items-center gap-2 text-[10.5px]">
                                <span
                                  style={{ backgroundColor: card.tagBg }}
                                  className="px-1.5 py-0.5 rounded font-medium text-[#37352F]"
                                >
                                  {card.tag}
                                </span>
                                <span className="font-semibold text-[#52504A] tabular-nums">
                                  {card.score}
                                </span>
                              </div>
                            </div>
                          ))}
                          <div className="rounded-[7px] border border-dashed border-[#D8D6D0] px-2.5 py-1.5 text-[11px] text-[#6E6D68]">
                            + New page
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 07: GROWTH & STRATEGY (Matches image_60664650)
             =============================================================== */}
          {activeTab === 'growth' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile bg="#EDF5EE" icon={<span>💵</span>} label="Revenue goal" value="62% · ₹7.4L / ₹12L" />
                <KpiTile bg="#EBF3FC" icon={<Users className="w-4 h-4 text-[#2383E2]" />} label="Active clients" value="63% · 5 / 8" />
                <KpiTile bg="#FDF1E8" icon={<span>📝</span>} label="Case studies" value="33% · 4 / 12" />
                <KpiTile bg="#F3EFFB" icon={<span>📦</span>} label="Productized offer" value="0% · 0 / 1" />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  Goals Scorecard
                </h4>

                <NotionSectionCallout
                  bg="#EDF5EE"
                  icon={<BarChart3 className="w-4 h-4 text-[#16A34A]" />}
                  title="All Goals"
                  subtitle="Progress bars, sorted by type"
                />

                <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                  <table className="w-full text-left text-[13px] min-w-[660px]">
                    <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Aa Name</th>
                        <th className="py-2.5 px-4 font-medium">Type</th>
                        <th className="py-2.5 px-4 font-medium">Status</th>
                        <th className="py-2.5 px-4 font-medium text-right">Σ Progress</th>
                        <th className="py-2.5 px-4 font-medium text-right"># Target</th>
                        <th className="py-2.5 px-4 font-medium text-right"># Current</th>
                        <th className="py-2.5 px-4 font-medium">Quarter</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F1EF]">
                      {[
                        { name: '₹12L annual revenue', type: 'Revenue', tBg: '#E3F2E8', status: 'On Track', sBg: '#E3F2E8', sInk: '#15803D', prog: '61.7%', target: '1,200,000', current: '740,000', q: 'Full year' },
                        { name: '8 active clients', type: 'Client', tBg: '#DCEBFA', status: 'On Track', sBg: '#E3F2E8', sInk: '#15803D', prog: '62.5%', target: '8', current: '5', q: 'Q3 Oct–Dec' },
                        { name: 'Launch productized retainer offer', type: 'Product', tBg: '#FCE8EE', status: 'On Track', sBg: '#E3F2E8', sInk: '#15803D', prog: '0%', target: '1', current: '0', q: 'Q3 Oct–Dec' },
                        { name: 'Publish 12 case studies', type: 'Marketing', tBg: '#FBF0D6', status: 'At Risk', sBg: '#FBF5E2', sInk: '#B45309', prog: '33.3%', target: '12', current: '4', q: 'Full year' },
                      ].map((g) => (
                        <tr key={g.name}>
                          <td className="py-2.5 px-4 font-medium text-[#2F2D28]">{g.name}</td>
                          <td className="py-2.5 px-4">
                            <span style={{ backgroundColor: g.tBg }} className="px-2 py-0.5 rounded text-[11px] font-medium text-[#37352F]">
                              {g.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span style={{ backgroundColor: g.sBg, color: g.sInk }} className="px-2 py-0.5 rounded-full text-[11px] font-medium">
                              ● {g.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right tabular-nums">{g.prog}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums">{g.target}</td>
                          <td className="py-2.5 px-4 text-right tabular-nums">{g.current}</td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-[#F1F1EF] text-[11px] text-[#52504A]">{g.q}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 08: LEGALS & CONTRACTS (Matches image_1552db89)
             =============================================================== */}
          {activeTab === 'legals' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-[20px] font-bold tracking-[-0.02em] text-[#2F2D28]">
                  Contract Register
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <NotionSectionCallout
                    bg="#EDF5EE"
                    icon={<CheckSquare className="w-4 h-4 text-[#16A34A]" />}
                    title="Active Contracts"
                    subtitle="Signed, expiry ≥ today"
                  />
                  <NotionSectionCallout
                    bg="#FDF1E8"
                    icon={<AlertTriangle className="w-4 h-4 text-[#CA8A04]" />}
                    title="Expiring Soon"
                    subtitle="Within 30 days"
                  />
                  <NotionSectionCallout
                    bg="#EBF3FC"
                    icon={<Users className="w-4 h-4 text-[#2383E2]" />}
                    title="By Client"
                    subtitle="Grouped by relationship"
                  />
                </div>

                <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                  <table className="w-full text-left text-[13px] min-w-[620px]">
                    <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Aa Name</th>
                        <th className="py-2.5 px-4 font-medium">Type</th>
                        <th className="py-2.5 px-4 font-medium">↗ Client</th>
                        <th className="py-2.5 px-4 font-medium">Expiry</th>
                        <th className="py-2.5 px-4 font-medium">Σ Renewal Alert</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F1EF]">
                      {[
                        { name: 'Nova Labs · MSA', type: 'MSA', tBg: '#DCEBFA', client: 'Nova Labs', expiry: 'December 8, 2026', alert: '⚠ Renew soon', aInk: 'text-[#B45309]' },
                        { name: 'Nova Labs · Dashboard SOW', type: 'SOW', tBg: '#E3F2E8', client: 'Nova Labs', expiry: 'January 12, 2027', alert: '● Active', aInk: 'text-[#15803D]' },
                        { name: 'Finch Finance · NDA', type: 'NDA', tBg: '#EFEAFB', client: 'Finch Finance', expiry: 'Draft', alert: '● Draft', aInk: 'text-[#6E6D68]' },
                        { name: 'Kirana Cloud · Speed Sprint SOW', type: 'SOW', tBg: '#E3F2E8', client: 'Kirana Cloud', expiry: 'December 28, 2026', alert: '● Sent', aInk: 'text-[#2383E2]' },
                      ].map((row) => (
                        <tr key={row.name}>
                          <td className="py-2.5 px-4 font-medium text-[#2F2D28]">{row.name}</td>
                          <td className="py-2.5 px-4">
                            <span style={{ backgroundColor: row.tBg }} className="px-2 py-0.5 rounded text-[11px] font-medium text-[#37352F]">
                              {row.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-[#52504A] underline decoration-[#D4D4D8] underline-offset-2">{row.client}</td>
                          <td className="py-2.5 px-4 text-[#52504A]">{row.expiry}</td>
                          <td className={`py-2.5 px-4 text-[12px] font-semibold ${row.aInk}`}>{row.alert}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 09: EMAIL LIST
             =============================================================== */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile bg="#EBF3FC" icon={<Mail className="w-4 h-4 text-[#2383E2]" />} label="Contacts segmented" value="142 verified" />
                <KpiTile bg="#EDF5EE" icon={<Check className="w-4 h-4 text-[#16A34A]" />} label="Active campaigns" value="2 sequences" />
                <KpiTile bg="#F3EFFB" icon={<TrendingUp className="w-4 h-4 text-[#7C3AED]" />} label="Avg. open rate" value="54.2%" />
                <KpiTile bg="#FBF5E2" icon={<Users className="w-4 h-4 text-[#CA8A04]" />} label="Warm replies" value="11 this month" />
              </div>

              <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                <table className="w-full text-left text-[13px] min-w-[540px]">
                  <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Segment / Campaign</th>
                      <th className="py-2.5 px-4 font-medium">Audience</th>
                      <th className="py-2.5 px-4 font-medium">Status</th>
                      <th className="py-2.5 px-4 font-medium text-right">Engagement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF]">
                    {[
                      { name: 'Q4 Retainer Re-engagement Note', aud: 'Past A-Tier Clients (18)', status: 'Active', val: '61% Open' },
                      { name: 'Design Systems Teardown Dispatch', aud: 'Founder Newsletter (124)', status: 'Scheduled', val: '52% Avg Open' },
                      { name: 'Referral Partner Check-In', aud: 'Studio Mosaic & Allies (14)', status: 'Completed', val: '4 Replies' },
                    ].map((row) => (
                      <tr key={row.name}>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{row.name}</td>
                        <td className="py-2.5 px-4 text-[#52504A]">{row.aud}</td>
                        <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-[#EBF3FC] text-[#2383E2] text-[11px] font-medium">{row.status}</span></td>
                        <td className="py-2.5 px-4 text-right font-medium tabular-nums">{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 10: ACCOUNTS ACCESS
             =============================================================== */}
          {activeTab === 'accounts' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile bg="#EDF5EE" icon={<KeyRound className="w-4 h-4 text-[#16A34A]" />} label="Cataloged services" value="18 tools" />
                <KpiTile bg="#EBF3FC" icon={<Check className="w-4 h-4 text-[#2383E2]" />} label="2FA enforced" value="100% protected" />
                <KpiTile bg="#FBF5E2" icon={<Calendar className="w-4 h-4 text-[#CA8A04]" />} label="Renewals (30d)" value="3 subscriptions" />
                <KpiTile bg="#F3EFFB" icon={<Wallet className="w-4 h-4 text-[#7C3AED]" />} label="Security policy" value="Zero raw passwords" />
              </div>

              <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                <table className="w-full text-left text-[13px] min-w-[560px]">
                  <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#6E6D68] text-[12px]">
                    <tr>
                      <th className="py-2.5 px-4 font-medium">Service</th>
                      <th className="py-2.5 px-4 font-medium">Login URL</th>
                      <th className="py-2.5 px-4 font-medium">2FA Status</th>
                      <th className="py-2.5 px-4 font-medium">Renewal</th>
                      <th className="py-2.5 px-4 font-medium">Vault Pointer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F1EF]">
                    {[
                      { svc: 'Figma Organization', url: 'figma.com/login', mfa: 'Hardware Passkey', ren: 'Jan 15, 2027', vault: '1Password · Studio Vault' },
                      { svc: 'Stripe Merchant', url: 'dashboard.stripe.com', mfa: 'Authenticator TOTP', ren: 'Usage-based', vault: '1Password · Finance Vault' },
                      { svc: 'Notion Plus', url: 'notion.so/login', mfa: 'Passkey + Backup', ren: 'Dec 02, 2026', vault: '1Password · Core Ops' },
                    ].map((a) => (
                      <tr key={a.svc}>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">{a.svc}</td>
                        <td className="py-2.5 px-4 text-[#2383E2] font-mono text-[12px]">{a.url}</td>
                        <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-[#EDF5EE] text-[#15803D] text-[11px] font-medium">{a.mfa}</span></td>
                        <td className="py-2.5 px-4 text-[#52504A]">{a.ren}</td>
                        <td className="py-2.5 px-4 text-[#6E6D68] font-mono text-[11.5px]">{a.vault}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 11: BUSINESS PLAN
             =============================================================== */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile bg="#EDF5EE" icon={<TrendingUp className="w-4 h-4 text-[#16A34A]" />} label="12-month target" value="₹12,00,000" />
                <KpiTile bg="#EBF3FC" icon={<Briefcase className="w-4 h-4 text-[#2383E2]" />} label="Offer ladder" value="3 core tiers" />
                <KpiTile bg="#FCECEC" icon={<AlertTriangle className="w-4 h-4 text-[#DC2626]" />} label="Risk register" value="4 mitigated risks" />
                <KpiTile bg="#FBF5E2" icon={<Target className="w-4 h-4 text-[#CA8A04]" />} label="90-day action plan" value="Q4 launch sprint" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { tier: 'Tier 01 · Entry Audit', offer: '2-Week UX & System Diagnostic', price: '₹75,000 fixed', goal: 'Convert into Sprint or Retainer' },
                  { tier: 'Tier 02 · Core Sprint', offer: '4-Week Product & Notion OS Build', price: '₹2,20,000', goal: 'Primary cash-flow engine' },
                  { tier: 'Tier 03 · Retainer', offer: 'Monthly Embedded Design Ops Partner', price: '₹1,50,000 / mo', goal: 'Predictable recurring baseline' },
                ].map((o) => (
                  <div key={o.tier} className="rounded-[12px] border border-[#EAEAEA] bg-[#FAF9F7] p-4 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">{o.tier}</span>
                    <h5 className="text-[15px] font-bold text-[#2F2D28]">{o.offer}</h5>
                    <p className="text-[14px] font-semibold text-[#37352F] tabular-nums">{o.price}</p>
                    <p className="text-[12.5px] text-[#6E6D68]">{o.goal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===============================================================
              TAB 12: EXTERNALS
             =============================================================== */}
          {activeTab === 'externals' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  eyebrow: 'Brand Identity',
                  title: 'Brand Guidelines',
                  desc: 'Typography hierarchy, studio color tokens, tone of voice, and SVG logo lockups ready for client decks.',
                  meta: 'Public Notion Link Ready',
                },
                {
                  eyebrow: 'Compliance',
                  title: 'Business Credentials',
                  desc: 'Registered business entity info, GST/Tax IDs, wire transfer instructions, and W-8BEN / compliance pack.',
                  meta: 'Shareable PDF & Page',
                },
                {
                  eyebrow: 'Client Facing',
                  title: 'Publish-Ready Portfolio',
                  desc: 'Selected case studies, measurable client outcomes, scope filters, and inquiry intake form in one clean public page.',
                  meta: 'Custom Domain Ready',
                },
              ].map((card) => (
                <div key={card.title} className="rounded-[12px] border border-[#EAEAEA] bg-white p-5 space-y-2.5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">{card.eyebrow}</p>
                    <h5 className="text-[16px] font-bold text-[#2F2D28] flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#9B9A97]" />
                    </h5>
                    <p className="text-[13px] text-[#52504A] leading-relaxed">{card.desc}</p>
                  </div>
                  <p className="pt-2 border-t border-[#F1F1EF] text-[12px] font-medium text-[#6E6D68]">
                    {card.meta}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* ===============================================================
              TAB 13: SYSTEM & SUPPORT
             =============================================================== */}
          {activeTab === 'system' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: <Compass className="w-4 h-4 text-[#2383E2]" />,
                  title: 'Quick Actions & SOPs',
                  items: [
                    '15-minute Monday Planning SOP',
                    '30-minute Friday Financial Review',
                    '30-second Lead Capture Workflow',
                  ],
                },
                {
                  icon: <BookOpen className="w-4 h-4 text-[#16A34A]" />,
                  title: 'Ready-to-Use Templates Library',
                  items: [
                    'Project Brief & Kickoff Template',
                    'Modular Scope Proposal Template',
                    'GST Invoice & Contract Templates',
                  ],
                },
                {
                  icon: <Database className="w-4 h-4 text-[#7C3AED]" />,
                  title: 'System · 18 Databases Backend',
                  items: [
                    'Clients, Proposals & Contacts DBs',
                    'Projects, Deliverables & Time DBs',
                    'Invoices, Expenses, Goals & SOP DBs',
                  ],
                },
              ].map((block) => (
                <div key={block.title} className="rounded-[12px] border border-[#EAEAEA] bg-[#FAF9F7] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[15px] font-bold text-[#2F2D28]">
                    {block.icon}
                    <span>{block.title}</span>
                  </div>
                  <ul className="space-y-1.5 text-[13px] text-[#52504A]">
                    {block.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2383E2] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
