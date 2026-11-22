import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  Compass,
  Database,
  FolderKanban,
  Layers,
  Lock,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from 'lucide-react';
import {
  filterNexusProjects,
  filterNexusTasks,
  INITIAL_NEXUS_PROJECTS,
  INITIAL_NEXUS_TASKS,
  NEXUS_OS_SPEC,
  NexusPriority,
  NexusProjectItem,
  NexusProjectStatus,
  NexusTaskItem,
  NexusTaskView,
} from '../data/nexusOsSpec';
import { filterOsDatabases } from '../data/osSpecTypes';

type NexusTabId =
  | 'command'
  | 'sprints'
  | 'projects'
  | 'para'
  | 'capital'
  | 'system';

interface SubscriptionItem {
  id: string;
  name: string;
  cadence: string;
  dueLabel: string;
  cost: string;
  reviewed: boolean;
}

interface ContactItem {
  id: string;
  name: string;
  role: string;
  circle: string;
  daysAgo: number;
  project: string;
}

const INITIAL_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: 'sub-1',
    name: 'Cloud GPU Compute Cluster',
    cadence: 'Monthly',
    dueLabel: 'Due in 3 days',
    cost: '₹42,500',
    reviewed: false,
  },
  {
    id: 'sub-2',
    name: 'Figma & Linear Team Seats',
    cadence: 'Monthly',
    dueLabel: 'Due in 5 days',
    cost: '₹18,400',
    reviewed: false,
  },
  {
    id: 'sub-3',
    name: 'Domain & CDN Infrastructure',
    cadence: 'Annual',
    dueLabel: 'Due in 9 days',
    cost: '₹9,800',
    reviewed: false,
  },
];

const INITIAL_CONTACTS: ContactItem[] = [
  {
    id: 'ct-1',
    name: 'Rohan Mehta',
    role: 'Principal ML Architect',
    circle: 'AI & Systems',
    daysAgo: 18,
    project: 'Publish LLM Inference Benchmark',
  },
  {
    id: 'ct-2',
    name: 'Clara Lindholm',
    role: 'Product Design Advisor',
    circle: 'Studio Mentors',
    daysAgo: 11,
    project: 'Launch Nexus OS Flagship',
  },
  {
    id: 'ct-3',
    name: 'Arjun Kapoor',
    role: 'Tax & Capital CPA',
    circle: 'Finance',
    daysAgo: 6,
    project: 'Q4 Free Cash Flow & ROCE Portfolio',
  },
];

const KNOWLEDGE_NOTES = [
  {
    id: 'kn-1',
    title: 'PagedAttention & KV-Cache Quantization Notes',
    area: 'AI & Systems Research',
    tag: 'AI Auto-Tagged',
    maturity: 'Evergreen',
    updated: '2d ago',
  },
  {
    id: 'kn-2',
    title: 'Core-5 Relational Spine Architecture Principles',
    area: 'Career & Business',
    tag: 'Framework',
    maturity: 'Evergreen',
    updated: '4d ago',
  },
  {
    id: 'kn-3',
    title: 'ROCE & Free Cash Flow Screening Checklist',
    area: 'Career & Business',
    tag: 'Capital',
    maturity: 'Distilled',
    updated: '6d ago',
  },
  {
    id: 'kn-4',
    title: 'Zone 2 Aerobic Base & Mobility Micro-Cycles',
    area: 'Health & Vitality',
    tag: 'Protocol',
    maturity: 'Evergreen',
    updated: '1w ago',
  },
];

const TASK_VIEWS: NexusTaskView[] = [
  'Today',
  'Upcoming',
  'Next',
  'Waiting',
  'Focus',
  'Inbox',
  'Done',
];

interface NexusOsWorkspaceTabsProps {
  onOpenBuy?: () => void;
  priceLabel?: string;
}

export const NexusOsWorkspaceTabs: React.FC<NexusOsWorkspaceTabsProps> = ({
  onOpenBuy,
  priceLabel = 'Duplicate for $59',
}) => {
  const [activeTab, setActiveTab] = useState<NexusTabId>('command');
  const [tasks, setTasks] = useState<NexusTaskItem[]>(INITIAL_NEXUS_TASKS);
  const [taskView, setTaskView] = useState<NexusTaskView>('Today');
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskPriority, setQuickTaskPriority] =
    useState<NexusPriority>('P1 Critical');
  const [showQuickCaptureBar, setShowQuickCaptureBar] = useState(false);

  const [projects, setProjects] = useState<NexusProjectItem[]>(
    INITIAL_NEXUS_PROJECTS
  );
  const [projectStatusFilter, setProjectStatusFilter] = useState<
    'All' | NexusProjectStatus
  >('All');

  const [selectedParaArea, setSelectedParaArea] = useState<string>('All');
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(
    INITIAL_SUBSCRIPTIONS
  );
  const [contacts, setContacts] = useState<ContactItem[]>(INITIAL_CONTACTS);
  const [dbQuery, setDbQuery] = useState('');

  const filteredTasks = useMemo(
    () => filterNexusTasks(tasks, taskView),
    [tasks, taskView]
  );

  const filteredProjects = useMemo(
    () => filterNexusProjects(projects, projectStatusFilter),
    [projects, projectStatusFilter]
  );

  const filteredDatabases = useMemo(
    () => filterOsDatabases(NEXUS_OS_SPEC.databases, dbQuery),
    [dbQuery]
  );

  const openTaskCount = useMemo(
    () => tasks.filter((t) => !t.done).length,
    [tasks]
  );

  const pendingSubscriptionsCount = useMemo(
    () => subscriptions.filter((s) => !s.reviewed).length,
    [subscriptions]
  );

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              status: !t.done ? 'Done' : 'Next Action',
              bucket: !t.done ? 'Done' : 'Today',
            }
          : t
      )
    );
  };

  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = quickTaskTitle.trim();
    if (!cleaned) return;
    const nextTask: NexusTaskItem = {
      id: `nx-custom-${Date.now()}`,
      title: cleaned,
      project: 'Launch Nexus OS Flagship',
      status: 'Next Action',
      priority: quickTaskPriority,
      bucket: 'Today',
      done: false,
    };
    setTasks((prev) => [nextTask, ...prev]);
    setQuickTaskTitle('');
    setShowQuickCaptureBar(false);
    setTaskView('Today');
    setActiveTab('sprints');
  };

  const handleAdvanceProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextPct = Math.min(100, p.progressPct + 10);
        return {
          ...p,
          progressPct: nextPct,
          status: nextPct === 100 ? 'Done' : 'Active',
        };
      })
    );
  };

  const handleToggleSubReviewed = (id: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, reviewed: !s.reviewed } : s))
    );
  };

  const handleLogTouchpoint = (id: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, daysAgo: 0 } : c))
    );
  };

  const tabs: Array<{ id: NexusTabId; num: string; label: string }> = [
    { id: 'command', num: '01', label: 'Command Hub' },
    { id: 'sprints', num: '02', label: 'Sprint Queue' },
    { id: 'projects', num: '03', label: 'Master Projects' },
    { id: 'para', num: '04', label: 'PARA & Knowledge' },
    { id: 'capital', num: '05', label: 'Capital & People' },
    { id: 'system', num: '06', label: 'System · 15 DBs' },
  ];

  const paraBadgeStyle = (tone: NexusProjectItem['paraTone']) => {
    if (tone === 'violet') return 'bg-[#F4EFFA] text-[#6940A5]';
    if (tone === 'blue') return 'bg-[#EBF3FC] text-[#2383E2]';
    if (tone === 'emerald') return 'bg-[#E7F4F0] text-[#0F7B6C]';
    return 'bg-[#FDF4E7] text-[#B45309]';
  };

  const statusBadgeStyle = (status: NexusProjectStatus) => {
    if (status === 'Active') return 'bg-[#EBF3FC] text-[#2383E2]';
    if (status === 'Done') return 'bg-[#E7F4F0] text-[#0F7B6C]';
    return 'bg-[#F1F1EF] text-[#52504A]';
  };

  const priorityBadgeStyle = (priority: NexusPriority) => {
    if (priority === 'P1 Critical') return 'bg-[#FDECEC] text-[#C43B3B]';
    if (priority === 'P2 High') return 'bg-[#FDF4E7] text-[#B45309]';
    return 'bg-[#F1F1EF] text-[#52504A]';
  };

  return (
    <div
      data-testid="nexus-os-workspace-tabs"
      className="rounded-[20px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
    >
      {/* Top Notion Workspace Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#FAF9F6] border-b border-[#E9E9E7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12.5px] text-[#6E6D68] min-w-0">
          <span className="w-5 h-5 rounded-[5px] bg-[#37352F] text-white font-mono text-[10.5px] font-bold inline-flex items-center justify-center shrink-0">
            N
          </span>
          <span className="font-semibold text-[#37352F] truncate">
            Nexus OS
          </span>
          <span className="text-[#C7C5BE]">/</span>
          <span className="truncate font-mono text-[11.5px]">
            Core-5 Relational Spine
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            data-testid="nexus-quick-capture-toggle"
            onClick={() => setShowQuickCaptureBar((prev) => !prev)}
            className="h-8 px-3 rounded-[8px] border border-[#D3D1CB] bg-white hover:bg-[#F7F6F3] text-[#37352F] text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Quick Capture</span>
          </button>
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
      </div>

      {/* Inline Quick Capture Drawer */}
      {showQuickCaptureBar && (
        <form
          onSubmit={handleAddQuickTask}
          data-testid="nexus-quick-capture-form"
          className="px-4 sm:px-6 py-3 bg-[#F3F8FD] border-b border-[#DAE6F3] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          <input
            type="text"
            value={quickTaskTitle}
            onChange={(e) => setQuickTaskTitle(e.target.value)}
            placeholder="Capture a sprint task into Today Queue (e.g. Draft Q4 architecture memo)..."
            className="flex-1 h-9 px-3 rounded-[8px] border border-[#C8DDF2] bg-white text-[13px] text-[#37352F] placeholder:text-[#9B9A97] focus:outline-none focus:border-[#2383E2]"
          />
          <div className="flex items-center gap-2 shrink-0">
            <select
              aria-label="Task priority"
              value={quickTaskPriority}
              onChange={(e) =>
                setQuickTaskPriority(e.target.value as NexusPriority)
              }
              className="h-9 px-2.5 rounded-[8px] border border-[#C8DDF2] bg-white text-[12px] font-medium text-[#37352F]"
            >
              <option value="P1 Critical">P1 Critical</option>
              <option value="P2 High">P2 High</option>
              <option value="P3 Normal">P3 Normal</option>
            </select>
            <button
              type="submit"
              className="h-9 px-3.5 rounded-[8px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[12.5px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        </form>
      )}

      {/* Notion Interactive Page Tabs */}
      <div
        role="tablist"
        aria-label="Nexus OS workspace modules"
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
              data-testid={`nexus-tab-${tab.id}`}
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

      {/* Interactive Workspace Canvas */}
      <div className="p-4 sm:p-6 lg:p-7 bg-white">
        {/* TAB 01: COMMAND HUB */}
        {activeTab === 'command' && (
          <div data-testid="nexus-panel-command" className="space-y-5">
            {/* Editorial Spine Banner */}
            <div className="rounded-[12px] bg-[#EDF5FC] border border-[#D8E8F8] px-4 py-3.5 flex items-start gap-3">
              <div className="w-7 h-7 rounded-[7px] bg-white border border-[#D8E8F8] text-[#2383E2] flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                  NEXUS OS — ENTERPRISE LIFE &amp; WORK INTEGRATED OPERATING SYSTEM
                </p>
                <p className="text-[13.5px] text-[#37352F] leading-[1.5]">
                  Core-5 relational spine uniting{' '}
                  <span className="underline decoration-[#9DC3EB] underline-offset-2 font-medium">
                    Goals, Projects, Tasks
                  </span>
                  , PARA{' '}
                  <span className="underline decoration-[#9DC3EB] underline-offset-2 font-medium">
                    Areas, Knowledge, Network, Capital &amp; Habits
                  </span>{' '}
                  into one coherent telemetry engine.
                </p>
              </div>
            </div>

            {/* 4 Pastel Notion Telemetry Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-[12px] bg-[#F6F2FA] border border-[#E8DEF3] p-4 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#6940A5]">
                  <Target className="w-3.5 h-3.5" />
                  <span>SYSTEM INTEGRITY</span>
                </p>
                <p className="text-[16px] font-bold text-[#37352F] tabular-nums">
                  100% Linked Spine
                </p>
                <p className="text-[12.5px] text-[#52504A]">
                  Zero Orphaned Nodes
                </p>
              </div>

              <div className="rounded-[12px] bg-[#EDF5FC] border border-[#D8E8F8] p-4 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ACTIVE VELOCITY</span>
                </p>
                <p className="text-[16px] font-bold text-[#37352F] tabular-nums">
                  {openTaskCount + 5} Live Sprints
                </p>
                <p className="text-[12.5px] text-[#52504A] tabular-nums">
                  4 Key Milestones · {openTaskCount} open
                </p>
              </div>

              <div className="rounded-[12px] bg-[#EDF6F1] border border-[#D7EBDF] p-4 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#0F7B6C]">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>CAPITAL BURN</span>
                </p>
                <p className="text-[16px] font-bold text-[#37352F] tabular-nums">
                  ₹1.24L Mo. Run-rate
                </p>
                <p className="text-[12.5px] text-[#52504A] tabular-nums">
                  {pendingSubscriptionsCount} Subscriptions Due
                </p>
              </div>

              <div className="rounded-[12px] bg-[#FCF2EA] border border-[#F3DFCE] p-4 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#B45309]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PARA ARCHITECTURE</span>
                </p>
                <p className="text-[16px] font-bold text-[#37352F] tabular-nums">
                  24 Active Areas
                </p>
                <p className="text-[12.5px] text-[#52504A]">
                  Weekly Hygiene Passed
                </p>
              </div>
            </div>

            {/* 4-Column Interactive Notion Launcher Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {/* Quick Capture */}
              <div className="rounded-[12px] bg-[#EDF5FC]/70 border border-[#D8E8F8] p-4 space-y-3">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                  <Zap className="w-3.5 h-3.5" />
                  <span>QUICK CAPTURE</span>
                </p>
                <ul className="space-y-1.5">
                  {[
                    {
                      label: 'New Task',
                      action: () => setShowQuickCaptureBar(true),
                    },
                    {
                      label: 'New Note',
                      action: () => setActiveTab('para'),
                    },
                    {
                      label: 'New Project',
                      action: () => setActiveTab('projects'),
                    },
                    {
                      label: 'New Contact',
                      action: () => setActiveTab('capital'),
                    },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={item.action}
                        className="w-full text-left px-2.5 py-1.5 rounded-[7px] bg-white/80 hover:bg-white border border-transparent hover:border-[#C8DDF2] text-[13px] font-medium text-[#37352F] inline-flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="underline decoration-[#B8D4F0] underline-offset-2">
                          {item.label}
                        </span>
                        <Plus className="w-3.5 h-3.5 text-[#2383E2]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dashboards */}
              <div className="rounded-[12px] bg-[#F6F2FA]/75 border border-[#E8DEF3] p-4 space-y-3">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#6940A5]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>DASHBOARDS</span>
                </p>
                <ul className="space-y-1.5">
                  {[
                    {
                      label: 'My Day',
                      action: () => {
                        setTaskView('Today');
                        setActiveTab('sprints');
                      },
                    },
                    {
                      label: 'My Week',
                      action: () => {
                        setTaskView('Upcoming');
                        setActiveTab('sprints');
                      },
                    },
                    {
                      label: 'PARA Matrix',
                      action: () => setActiveTab('para'),
                    },
                    {
                      label: 'Weekly Review',
                      action: () => setActiveTab('projects'),
                    },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={item.action}
                        className="w-full text-left px-2.5 py-1.5 rounded-[7px] bg-white/80 hover:bg-white border border-transparent hover:border-[#DECFF0] text-[13px] font-medium text-[#37352F] inline-flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="underline decoration-[#D2BFE9] underline-offset-2">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#6940A5]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Domains */}
              <div className="rounded-[12px] bg-[#EDF6F1]/75 border border-[#D7EBDF] p-4 space-y-3">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0F7B6C]">
                  <FolderKanban className="w-3.5 h-3.5" />
                  <span>DOMAINS</span>
                </p>
                <ul className="space-y-1.5">
                  {[
                    { label: 'People', action: () => setActiveTab('capital') },
                    {
                      label: 'Goals & Habits',
                      action: () => setActiveTab('projects'),
                    },
                    { label: 'Money', action: () => setActiveTab('capital') },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={item.action}
                        className="w-full text-left px-2.5 py-1.5 rounded-[7px] bg-white/80 hover:bg-white border border-transparent hover:border-[#C2E2D0] text-[13px] font-medium text-[#37352F] inline-flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="underline decoration-[#B3DAC4] underline-offset-2">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#0F7B6C]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vault & Setup */}
              <div className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-4 space-y-3">
                <p className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#52504A]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>VAULT &amp; SETUP</span>
                </p>
                <ul className="space-y-1">
                  {[
                    { label: 'Start Here', tab: 'sprints' as NexusTabId },
                    { label: 'Knowledge', tab: 'para' as NexusTabId },
                    { label: 'Templates', tab: 'system' as NexusTabId },
                    { label: 'Mobile Capture', tab: 'sprints' as NexusTabId },
                    { label: 'System Vault (15 DBs)', tab: 'system' as NexusTabId },
                  ].map((item) => (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(item.tab)}
                        className="w-full text-left px-2 py-1 rounded-[6px] hover:bg-white text-[12.5px] font-medium text-[#52504A] hover:text-[#37352F] inline-flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="underline decoration-[#D3D1CB] underline-offset-2">
                          {item.label}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-[#9B9A97]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 02: ACTIVE SPRINT & EXECUTION QUEUE */}
        {activeTab === 'sprints' && (
          <div data-testid="nexus-panel-sprints" className="space-y-4">
            <div className="rounded-[10px] bg-[#EDF5FC] border border-[#D8E8F8] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                <Zap className="w-3.5 h-3.5" />
                <span>ACTIVE SPRINT &amp; EXECUTION QUEUE</span>
              </span>
              <span className="text-[12px] text-[#52504A] tabular-nums">
                Click any checkbox to mark done · {openTaskCount} active tasks
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {TASK_VIEWS.map((v) => {
                  const active = taskView === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      data-testid={`nexus-task-view-${v.toLowerCase()}`}
                      onClick={() => setTaskView(v)}
                      className={`px-2.5 py-1 rounded-[7px] text-[12px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#F1F1EF] text-[#37352F] border-[#D3D1CB]'
                          : 'bg-white text-[#6E6D68] border-transparent hover:bg-[#FAF9F6] hover:text-[#37352F]'
                      }`}
                    >
                      {v === 'Inbox' ? 'Inbox (triage)' : v}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowQuickCaptureBar(true)}
                className="h-8 px-3 rounded-[7px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[12px] font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
            </div>

            <div className="rounded-[12px] border border-[#E9E9E7] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-medium text-[#6E6D68]">
                    <th className="py-2.5 px-3.5 w-[44%]">Aa Task Name</th>
                    <th className="py-2.5 px-3 w-[26%]">↗ Project</th>
                    <th className="py-2.5 px-3 w-[16%]">Status</th>
                    <th className="py-2.5 px-3 w-[14%]">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-8 text-center text-[#6E6D68] text-[13px]"
                      >
                        Queue clear in <strong>{taskView}</strong>. Switch view or add a quick capture above.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className="hover:bg-[#FAF9F6]/80 transition-colors"
                      >
                        <td className="py-2.5 px-3.5">
                          <button
                            type="button"
                            onClick={() => handleToggleTask(task.id)}
                            className="inline-flex items-center gap-2.5 text-left cursor-pointer group"
                          >
                            <span
                              className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 transition-colors ${
                                task.done
                                  ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                                  : 'border-[#C7C5BE] bg-white group-hover:border-[#2383E2]'
                              }`}
                            >
                              {task.done && (
                                <Check className="w-3 h-3 stroke-[2.6]" />
                              )}
                            </span>
                            <span
                              className={`font-medium ${
                                task.done
                                  ? 'line-through text-[#9B9A97]'
                                  : 'text-[#37352F]'
                              }`}
                            >
                              {task.title}
                            </span>
                          </button>
                        </td>
                        <td className="py-2.5 px-3 text-[#52504A] underline decoration-[#E0DFDB] underline-offset-2">
                          {task.project}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] bg-[#F1F1EF] text-[#37352F] text-[11.5px] font-medium whitespace-nowrap">
                            {task.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold whitespace-nowrap ${priorityBadgeStyle(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 03: MASTER PROJECTS PORTFOLIO + PROGRESS RADAR */}
        {activeTab === 'projects' && (
          <div
            data-testid="nexus-panel-projects"
            className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          >
            {/* Left Pane: Master Projects Timeline */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="rounded-[10px] bg-[#F6F2FA] border border-[#E8DEF3] px-3.5 py-2.5 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#6940A5]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>MASTER PROJECTS PORTFOLIO</span>
                </span>
                <span className="text-[11.5px] text-[#6E6D68]">
                  Grouped Timeline
                </span>
              </div>

              <div className="space-y-3">
                {(['Last 7 days', 'Last 30 days', 'Apr 2026'] as const).map(
                  (group) => {
                    const groupItems = projects.filter(
                      (p) => p.timelineGroup === group
                    );
                    return (
                      <div
                        key={group}
                        className="rounded-[11px] border border-[#E9E9E7] overflow-hidden"
                      >
                        <div className="px-3.5 py-2 bg-[#FAF9F6] border-b border-[#E9E9E7] flex items-center justify-between text-[12px] font-semibold text-[#37352F]">
                          <span>▾ {group}</span>
                          <span className="font-mono text-[11px] text-[#6E6D68] tabular-nums">
                            {groupItems.length === 1
                              ? '1 project'
                              : `${groupItems.length} projects`}
                          </span>
                        </div>
                        <div className="divide-y divide-[#F1F1EF]">
                          {groupItems.map((proj) => (
                            <div
                              key={proj.id}
                              className="px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[12.5px]"
                            >
                              <div className="min-w-0">
                                <p className="font-semibold text-[#37352F] truncate">
                                  {proj.name}
                                </p>
                                <p className="text-[11px] text-[#6E6D68] font-mono tabular-nums">
                                  {proj.dateRange}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-[5px] text-[11px] font-medium whitespace-nowrap shrink-0 self-start sm:self-center ${paraBadgeStyle(
                                  proj.paraTone
                                )}`}
                              >
                                {proj.paraArea}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Right Pane: Portfolio Progress Radar */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="rounded-[10px] bg-[#EDF6F1] border border-[#D7EBDF] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[#0F7B6C]">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>PORTFOLIO PROGRESS RADAR</span>
                </span>
                <div className="inline-flex items-center gap-1">
                  {(['All', 'Active', 'Planned', 'Done'] as const).map(
                    (st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setProjectStatusFilter(st)}
                        className={`px-2 py-0.5 rounded-[5px] text-[11px] font-semibold transition-colors cursor-pointer ${
                          projectStatusFilter === st
                            ? 'bg-[#0F7B6C] text-white'
                            : 'bg-white/80 text-[#52504A] hover:bg-white'
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-[11px] border border-[#E9E9E7] divide-y divide-[#F1F1EF] overflow-hidden">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 bg-white hover:bg-[#FAF9F6]/70 transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#37352F] leading-snug">
                          {proj.name}
                        </p>
                        <p className="text-[11.5px] text-[#6E6D68]">
                          {proj.paraArea}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-[5px] text-[11px] font-semibold whitespace-nowrap shrink-0 ${statusBadgeStyle(
                          proj.status
                        )}`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-[#EFEFED] overflow-hidden">
                        <div
                          style={{ width: `${proj.progressPct}%` }}
                          className="h-full rounded-full bg-[#2383E2] transition-all duration-200"
                        />
                      </div>
                      <span className="font-mono text-[11.5px] font-semibold text-[#37352F] tabular-nums w-9 text-right">
                        {proj.progressPct}%
                      </span>
                      <button
                        type="button"
                        disabled={proj.progressPct >= 100}
                        onClick={() => handleAdvanceProject(proj.id)}
                        className="px-2 py-0.5 rounded-[5px] border border-[#E9E9E7] bg-white hover:bg-[#F7F6F3] disabled:opacity-40 text-[11px] font-semibold text-[#37352F] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        +10%
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 04: PARA & KNOWLEDGE VAULT */}
        {activeTab === 'para' && (
          <div data-testid="nexus-panel-para" className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  name: 'AI & Systems Research',
                  count: '3 active sprints · 14 notes',
                  tone: 'bg-[#F6F2FA] border-[#E8DEF3] text-[#6940A5]',
                },
                {
                  name: 'Career & Business',
                  count: '4 active sprints · 19 notes',
                  tone: 'bg-[#EDF5FC] border-[#D8E8F8] text-[#2383E2]',
                },
                {
                  name: 'Health & Vitality',
                  count: '2 routines · 8 protocols',
                  tone: 'bg-[#EDF6F1] border-[#D7EBDF] text-[#0F7B6C]',
                },
                {
                  name: 'Personal Development',
                  count: '3 goals · 11 books',
                  tone: 'bg-[#FCF2EA] border-[#F3DFCE] text-[#B45309]',
                },
              ].map((area) => {
                const selected = selectedParaArea === area.name;
                return (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() =>
                      setSelectedParaArea(selected ? 'All' : area.name)
                    }
                    className={`text-left rounded-[12px] border p-3.5 space-y-1 transition-all cursor-pointer ${
                      selected
                        ? 'ring-2 ring-[#2383E2] bg-white border-[#2383E2]'
                        : area.tone
                    }`}
                  >
                    <p className="text-[13px] font-bold text-[#37352F]">
                      {area.name}
                    </p>
                    <p className="text-[11.5px] text-[#52504A]">{area.count}</p>
                    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.04em]">
                      {selected ? 'Filtering notes ✓' : 'Hygiene passed'}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-[12px] border border-[#E9E9E7] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E9E9E7] flex items-center justify-between text-[12px]">
                <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#2383E2]" />
                  <span>
                    Knowledge Vault ·{' '}
                    {selectedParaArea === 'All'
                      ? 'All PARA Areas'
                      : selectedParaArea}
                  </span>
                </span>
                {selectedParaArea !== 'All' && (
                  <button
                    type="button"
                    onClick={() => setSelectedParaArea('All')}
                    className="text-[#2383E2] font-semibold hover:underline cursor-pointer"
                  >
                    Show all
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#F1F1EF]">
                {KNOWLEDGE_NOTES.filter(
                  (n) =>
                    selectedParaArea === 'All' || n.area === selectedParaArea
                ).map((note) => (
                  <div
                    key={note.id}
                    className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-[13px]"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-[#37352F]">
                        {note.title}
                      </p>
                      <p className="text-[11.5px] text-[#6E6D68]">
                        {note.area} · Updated {note.updated}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-[5px] bg-[#EBF3FC] text-[#2383E2] text-[11px] font-semibold">
                        {note.tag}
                      </span>
                      <span className="px-2 py-0.5 rounded-[5px] bg-[#F1F1EF] text-[#52504A] text-[11px] font-medium">
                        {note.maturity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 05: CAPITAL & PEOPLE CRM */}
        {activeTab === 'capital' && (
          <div
            data-testid="nexus-panel-capital"
            className="grid grid-cols-1 lg:grid-cols-12 gap-5"
          >
            {/* Capital Burn & Subscriptions */}
            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-[10px] bg-[#EDF6F1] border border-[#D7EBDF] px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#0F7B6C]">
                    MONTHLY CAPITAL RUN-RATE
                  </p>
                  <p className="text-[18px] font-bold text-[#37352F] tabular-nums">
                    ₹1.24L / month
                  </p>
                </div>
                <span className="font-mono text-[11.5px] font-semibold text-[#0F7B6C] tabular-nums">
                  {pendingSubscriptionsCount} due soon
                </span>
              </div>

              <div className="rounded-[12px] border border-[#E9E9E7] divide-y divide-[#F1F1EF] overflow-hidden">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-[13px] font-semibold ${
                          sub.reviewed
                            ? 'line-through text-[#9B9A97]'
                            : 'text-[#37352F]'
                        }`}
                      >
                        {sub.name}
                      </p>
                      <p className="text-[11.5px] text-[#6E6D68]">
                        {sub.cadence} · {sub.dueLabel}
                      </p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-mono text-[12.5px] font-bold text-[#37352F] tabular-nums">
                        {sub.cost}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleSubReviewed(sub.id)}
                        className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold border transition-colors cursor-pointer ${
                          sub.reviewed
                            ? 'bg-[#E7F4F0] text-[#0F7B6C] border-[#CBE4D7]'
                            : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#FAF9F6]'
                        }`}
                      >
                        {sub.reviewed ? 'Reviewed ✓' : 'Verify'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* People & Relationship CRM */}
            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#52504A] inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#2383E2]" />
                    <span>PEOPLE &amp; RELATIONSHIP CRM</span>
                  </p>
                  <p className="text-[13px] text-[#6E6D68]">
                    Keep advisors, collaborators, and mentors warm.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-[#E9E9E7] divide-y divide-[#F1F1EF] overflow-hidden">
                {contacts.map((person) => (
                  <div
                    key={person.id}
                    className="px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#37352F]">
                        {person.name}{' '}
                        <span className="font-normal text-[#6E6D68]">
                          · {person.role}
                        </span>
                      </p>
                      <p className="text-[11.5px] text-[#6E6D68] truncate">
                        {person.circle} · {person.project}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[11px] text-[#6E6D68] tabular-nums">
                        {person.daysAgo === 0 ? 'Today' : `${person.daysAgo}d ago`}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleLogTouchpoint(person.id)}
                        className="px-2.5 py-1 rounded-[6px] border border-[#E9E9E7] bg-white hover:bg-[#FAF9F6] text-[11px] font-semibold text-[#2383E2] whitespace-nowrap cursor-pointer"
                      >
                        Log Check-in
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 06: SYSTEM VAULT (15 DATABASES) */}
        {activeTab === 'system' && (
          <div data-testid="nexus-panel-system" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-[13px] font-semibold text-[#37352F]">
                <Database className="w-4 h-4 text-[#2383E2]" />
                <span>
                  Core-5 Relational Schema ({filteredDatabases.length} of{' '}
                  {NEXUS_OS_SPEC.databases.length} databases)
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#6E6D68] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={dbQuery}
                  onChange={(e) => setDbQuery(e.target.value)}
                  placeholder="Filter 15 databases..."
                  className="w-full h-8 pl-8 pr-3 rounded-[8px] border border-[#E9E9E7] bg-[#FAF9F6] text-[12.5px] text-[#37352F] placeholder:text-[#9B9A97] focus:outline-none focus:bg-white focus:border-[#2383E2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredDatabases.map((db) => (
                <div
                  key={db.id}
                  className="rounded-[11px] border border-[#E9E9E7] bg-[#FAF9F6]/60 p-3.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-[13.5px] font-bold text-[#37352F] truncate">
                      {db.name}
                    </h5>
                    <span className="font-mono text-[10.5px] text-[#2383E2] font-semibold shrink-0">
                      {db.category}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#52504A] leading-[1.45]">
                    {db.purpose}
                  </p>
                  <p className="font-mono text-[10.5px] text-[#6E6D68] pt-1 border-t border-[#EFEFED]">
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
