import { OsSystemSpec } from './osSpecTypes';

export type NexusTaskView =
  | 'Today'
  | 'Upcoming'
  | 'Next'
  | 'Waiting'
  | 'Done'
  | 'Focus'
  | 'Inbox';

export type NexusPriority = 'P1 Critical' | 'P2 High' | 'P3 Normal';
export type NexusProjectStatus = 'Active' | 'Planned' | 'Done';

export interface NexusTaskItem {
  id: string;
  title: string;
  project: string;
  status: 'Next Action' | 'Waiting' | 'In Focus' | 'Done' | 'Inbox';
  priority: NexusPriority;
  bucket: NexusTaskView;
  done: boolean;
}

export interface NexusProjectItem {
  id: string;
  name: string;
  paraArea: string;
  paraTone: 'blue' | 'violet' | 'emerald' | 'amber';
  status: NexusProjectStatus;
  timelineGroup: 'Apr 2026' | 'Last 30 days' | 'Last 7 days';
  dateRange: string;
  progressPct: number;
}

export const INITIAL_NEXUS_TASKS: NexusTaskItem[] = [
  {
    id: 'nx-t1',
    title: '[1/5] Capture a rapid thought using Quick Capture',
    project: 'Launch Nexus OS Flagship',
    status: 'Next Action',
    priority: 'P1 Critical',
    bucket: 'Today',
    done: false,
  },
  {
    id: 'nx-t2',
    title: '[2/5] Curate your realistic daily intentions',
    project: 'Launch Nexus OS Flagship',
    status: 'Next Action',
    priority: 'P2 High',
    bucket: 'Today',
    done: false,
  },
  {
    id: 'nx-t3',
    title: '[3/5] Open Knowledge and test AI Auto-Tagging',
    project: 'Launch Nexus OS Flagship',
    status: 'Next Action',
    priority: 'P2 High',
    bucket: 'Today',
    done: false,
  },
  {
    id: 'nx-t4',
    title: 'Benchmark vLLM vs TensorRT-LLM throughput matrix',
    project: 'Publish LLM Inference Benchmark',
    status: 'In Focus',
    priority: 'P1 Critical',
    bucket: 'Focus',
    done: false,
  },
  {
    id: 'nx-t5',
    title: 'Audit 3 recurring software renewals due this week',
    project: 'Q4 Free Cash Flow & ROCE Portfolio',
    status: 'Next Action',
    priority: 'P2 High',
    bucket: 'Upcoming',
    done: false,
  },
  {
    id: 'nx-t6',
    title: 'Follow up with advisor on Q4 capital memo',
    project: 'Q4 Free Cash Flow & ROCE Portfolio',
    status: 'Waiting',
    priority: 'P3 Normal',
    bucket: 'Waiting',
    done: false,
  },
  {
    id: 'nx-t7',
    title: 'Triage 4 mobile voice memos into PARA Areas',
    project: 'Weekly System Hygiene',
    status: 'Inbox',
    priority: 'P3 Normal',
    bucket: 'Inbox',
    done: false,
  },
  {
    id: 'nx-t8',
    title: 'Finalize 2026 personal tax return filing bundle',
    project: 'File 2026 Personal Tax Return',
    status: 'Done',
    priority: 'P2 High',
    bucket: 'Done',
    done: true,
  },
];

export const INITIAL_NEXUS_PROJECTS: NexusProjectItem[] = [
  {
    id: 'nx-p1',
    name: 'Publish LLM Inference Benchmark',
    paraArea: 'AI & Systems Research',
    paraTone: 'violet',
    status: 'Active',
    timelineGroup: 'Last 7 days',
    dateRange: 'Nov 10, 2026 → Dec 18, 2026',
    progressPct: 74,
  },
  {
    id: 'nx-p2',
    name: 'Launch Nexus OS Flagship Template',
    paraArea: 'Career & Business',
    paraTone: 'blue',
    status: 'Active',
    timelineGroup: 'Last 30 days',
    dateRange: 'Nov 5, 2026 → Nov 28, 2026',
    progressPct: 82,
  },
  {
    id: 'nx-p3',
    name: 'Build a steady weekly movement routine',
    paraArea: 'Health & Vitality',
    paraTone: 'emerald',
    status: 'Active',
    timelineGroup: 'Last 7 days',
    dateRange: 'Nov 17, 2026 → Jan 12, 2027',
    progressPct: 58,
  },
  {
    id: 'nx-p4',
    name: 'Read six books this quarter',
    paraArea: 'Personal Development',
    paraTone: 'amber',
    status: 'Active',
    timelineGroup: 'Last 7 days',
    dateRange: 'Nov 17, 2026 → Feb 15, 2027',
    progressPct: 67,
  },
  {
    id: 'nx-p5',
    name: 'Q4 Free Cash Flow & ROCE Portfolio',
    paraArea: 'Career & Business',
    paraTone: 'blue',
    status: 'Planned',
    timelineGroup: 'Last 30 days',
    dateRange: 'Dec 1, 2026 → Jan 20, 2027',
    progressPct: 20,
  },
  {
    id: 'nx-p6',
    name: 'File 2026 Personal Tax Return',
    paraArea: 'Personal Development',
    paraTone: 'amber',
    status: 'Done',
    timelineGroup: 'Apr 2026',
    dateRange: 'Apr 10, 2026 → Apr 30, 2026',
    progressPct: 100,
  },
];

export function filterNexusTasks(
  tasks: NexusTaskItem[],
  view: NexusTaskView
): NexusTaskItem[] {
  if (view === 'Done') return tasks.filter((t) => t.done);
  if (view === 'Today') return tasks.filter((t) => !t.done && (t.bucket === 'Today' || t.priority === 'P1 Critical'));
  if (view === 'Next') return tasks.filter((t) => !t.done && t.status === 'Next Action');
  if (view === 'Focus') return tasks.filter((t) => !t.done && (t.bucket === 'Focus' || t.priority === 'P1 Critical'));
  return tasks.filter((t) => !t.done && t.bucket === view);
}

export function filterNexusProjects(
  projects: NexusProjectItem[],
  statusFilter: 'All' | NexusProjectStatus
): NexusProjectItem[] {
  if (statusFilter === 'All') return projects;
  return projects.filter((p) => p.status === statusFilter);
}

export const NEXUS_OS_SPEC: OsSystemSpec = {
  slug: 'nexus-os',
  name: 'Nexus OS',
  eyebrow: 'Core-5 Relational Spine · Enterprise Life & Work OS',
  sectionHeadline: 'One Relational Spine. Ten Modules. Fifteen Databases.',
  sectionSubheadline:
    'Unite Goals, Projects, Tasks, PARA Areas, Knowledge, People, Capital & Habits inside one zero-orphan Notion command center.',
  overviewPillars: [
    {
      id: 'spine',
      label: 'System Integrity',
      metric: '100% Linked Spine',
      detail: 'Zero orphaned nodes across Core-5 goals, projects, tasks, PARA & knowledge.',
    },
    {
      id: 'velocity',
      label: 'Active Velocity',
      metric: '12 Live Sprints',
      detail: 'Today, Focus, Waiting, and Inbox triage views wired straight to projects.',
    },
    {
      id: 'capital',
      label: 'Capital Burn',
      metric: 'Run-Rate Radar',
      detail: 'Monthly burn rate, recurring subscription alerts, and portfolio cash flow.',
    },
    {
      id: 'para',
      label: 'PARA Architecture',
      metric: '24 Active Areas',
      detail: 'Weekly hygiene checks separating active execution from reference archives.',
    },
  ],
  moduleCategories: ['Command', 'Execution', 'Knowledge', 'Domains', 'Vault'],
  modules: [
    {
      id: 'nexus-command-hub',
      number: '01',
      shortLabel: 'Command Hub',
      title: 'Nexus OS Command Hub',
      category: 'Command',
      summary:
        'Executive start page uniting 4 KPI telemetry callouts, Quick Capture buttons, Dashboards, Domains, and Vault shortcuts.',
      whatItContains: [
        '4 live KPI callouts (System Integrity, Active Velocity, Capital Burn, PARA Architecture)',
        'One-click Quick Capture buttons (New Task, New Note, New Project, New Contact)',
        'Direct launchers for My Day, My Week, PARA Matrix, and Weekly Review',
        'Domain shortcuts to People, Goals & Habits, Money, Knowledge, and System Vault',
      ],
      includedViews: [
        { name: 'Executive Cockpit', layout: 'Board', description: 'Top-level KPIs and domain launchers.' },
        { name: 'Mobile Capture View', layout: 'List', description: 'Zero-friction phone capture inbox.' },
      ],
      keyFormulasAndProperties: ['Orphan Node Audit', 'Active Sprint Counter', 'Weekly Hygiene Status'],
      connectedDatabases: ['Goals', 'Projects', 'Tasks', 'PARA Areas', 'Money Ledger'],
      includedSubTemplates: ['Daily Intention Brief', 'Weekly Hygiene Reset'],
    },
    {
      id: 'active-sprint-queue',
      number: '02',
      shortLabel: 'Sprint & Tasks',
      title: 'Active Sprint & Execution Queue',
      category: 'Execution',
      summary:
        'Multi-view task engine with Today, Upcoming, Next, Waiting, Focus, Done, and Inbox triage tabs linked to every project.',
      whatItContains: [
        '7+ pre-filtered execution views including Focus Mode and Inbox Triage',
        'Priority tiering (P1 Critical, P2 High, P3 Normal) with Next Action status',
        'Automatic rollup back to Master Projects and Weekly Review velocity',
        '1-click Quick Capture task buttons inside every dashboard',
      ],
      includedViews: [
        { name: 'Today Execution Table', layout: 'Table', description: 'Focused daily tasks sorted by priority.' },
        { name: 'Inbox Triage Queue', layout: 'Table', description: 'Unassigned captures waiting for PARA routing.' },
        { name: 'Focus Board', layout: 'Board', description: 'Single-column deep work sprint view.' },
      ],
      keyFormulasAndProperties: ['Priority Weight', 'Project Rollup', 'Stale Inbox Flag'],
      connectedDatabases: ['Tasks', 'Projects', 'Goals'],
      includedSubTemplates: ['Sprint Task Brief', 'Waiting-For Follow-Up'],
    },
    {
      id: 'master-projects-portfolio',
      number: '03',
      shortLabel: 'Master Projects',
      title: 'Master Projects Portfolio & Progress Radar',
      category: 'Execution',
      summary:
        'Side-by-side Timeline and Progress Radar tracking every active, planned, and finished initiative across PARA areas.',
      whatItContains: [
        'Grouped Project Timeline (Apr 2026, Last 30 days, Last 7 days)',
        'Live Portfolio Progress Radar linking each project to its PARA domain',
        'Automatic completion percentage rollups from linked Sprint Tasks',
        'Milestone deadline visibility across Career, Research, and Health',
      ],
      includedViews: [
        { name: 'Grouped Timeline', layout: 'Timeline', description: 'Chronological horizon across quarters.' },
        { name: 'Portfolio Progress Radar', layout: 'Table', description: 'Status and progress rollup per project.' },
      ],
      keyFormulasAndProperties: ['Task Completion %', 'Days Remaining', 'PARA Alignment Tag'],
      connectedDatabases: ['Projects', 'Tasks', 'PARA Areas', 'Goals'],
      includedSubTemplates: ['Flagship Project Kickoff', 'Post-Mortem Review'],
    },
    {
      id: 'my-day-my-week',
      number: '04',
      shortLabel: 'My Day & Week',
      title: 'My Day & My Week Dashboards',
      category: 'Command',
      summary:
        'Calm daily intention planner and 7-day workload balancer that prevents over-committing.',
      whatItContains: [
        'Realistic daily top-3 intention selector synced to Today tasks',
        'Weekly capacity bar balancing deep work sprints and habits',
        'End-of-day shutdown checklist to clear Inbox to zero',
      ],
      includedViews: [
        { name: 'My Day Canvas', layout: 'List', description: 'Today priorities, calendar blocks, and habits.' },
        { name: 'My Week Horizon', layout: 'Calendar', description: '7-day sprint and deadline outlook.' },
      ],
      keyFormulasAndProperties: ['Daily Load Score', 'Shutdown Completion'],
      connectedDatabases: ['Tasks', 'Habits', 'Weekly Reviews'],
      includedSubTemplates: ['Morning Intention Card'],
    },
    {
      id: 'para-matrix',
      number: '05',
      shortLabel: 'PARA Matrix',
      title: 'PARA Architecture Matrix',
      category: 'Knowledge',
      summary:
        '24 active life and work areas cleanly separating Projects, Areas, Resources, and Archives with weekly hygiene checks.',
      whatItContains: [
        'Unified PARA hub connecting Career & Business, AI Research, Health, and Personal Dev',
        'Automatic counts of active projects, tasks, and knowledge notes per area',
        'One-click archive sweep for completed quarterly projects',
      ],
      includedViews: [
        { name: 'PARA Domain Gallery', layout: 'Gallery', description: 'Visual cards per active life/work area.' },
        { name: 'Hygiene Audit Table', layout: 'Table', description: 'Surfaces unlinked items or stale areas.' },
      ],
      keyFormulasAndProperties: ['Active Project Count', 'Orphan Check', 'Last Reviewed Date'],
      connectedDatabases: ['PARA Areas', 'Projects', 'Knowledge Vault', 'Archive'],
      includedSubTemplates: ['New Area Blueprint'],
    },
    {
      id: 'knowledge-vault',
      number: '06',
      shortLabel: 'Knowledge',
      title: 'Knowledge Vault & Auto-Tagging',
      category: 'Knowledge',
      summary:
        'Permanent research notes, web clippings, frameworks, and AI-ready auto-tagging linked straight to active projects.',
      whatItContains: [
        'Evergreen note cards linked directly to PARA domains and Projects',
        'Source capture inbox for articles, papers, podcasts, and voice memos',
        'Structured synthesis prompts for turning highlights into reusable assets',
      ],
      includedViews: [
        { name: 'Knowledge Library', layout: 'Gallery', description: 'Searchable cards grouped by topic.' },
        { name: 'Unprocessed Clippings', layout: 'Table', description: 'Inbox for rapid note distillation.' },
      ],
      keyFormulasAndProperties: ['Linked Projects Count', 'Maturity Stage'],
      connectedDatabases: ['Knowledge Vault', 'PARA Areas', 'Projects'],
      includedSubTemplates: ['Atomic Framework Note', 'Research Clipping'],
    },
    {
      id: 'goals-habits',
      number: '07',
      shortLabel: 'Goals & Habits',
      title: 'Goals, OKRs & Habit Streaks',
      category: 'Domains',
      summary:
        'Quarterly outcome targets connected directly to projects and daily habit consistency trackers.',
      whatItContains: [
        'Quarterly OKR key results with live formula progress bars',
        'Daily habit check-in grid tracking movement, reading, and deep work',
        'Automatic link from annual vision down to weekly sprint tasks',
      ],
      includedViews: [
        { name: 'Quarterly OKR Board', layout: 'Board', description: 'Goals grouped by On Track, At Risk, Done.' },
        { name: 'Daily Habit Matrix', layout: 'Table', description: '7-day streak rollup per habit.' },
      ],
      keyFormulasAndProperties: ['OKR Progress %', '30-Day Habit Consistency'],
      connectedDatabases: ['Goals', 'Habits', 'Projects'],
      includedSubTemplates: ['Quarterly Goal Charter'],
    },
    {
      id: 'capital-money',
      number: '08',
      shortLabel: 'Money & Burn',
      title: 'Capital, Burn Rate & Subscriptions',
      category: 'Domains',
      summary:
        'Personal and studio financial ledger tracking monthly run-rate, recurring subscription alerts, and portfolio ROCE.',
      whatItContains: [
        'Live monthly capital burn rate and runway calculator',
        'Recurring subscription renewal radar flagging upcoming charges',
        'Net worth, cash flow, and investment thesis tracker',
      ],
      includedViews: [
        { name: 'Cash Flow Ledger', layout: 'Table', description: 'Income, burn, and category rollups.' },
        { name: 'Subscriptions Due', layout: 'Calendar', description: 'Renewal alert timeline.' },
      ],
      keyFormulasAndProperties: ['Monthly Run-Rate', 'Annualized Cost', 'Net Savings Rate'],
      connectedDatabases: ['Money Ledger', 'Subscriptions', 'Investments'],
      includedSubTemplates: ['Monthly Cash-Flow Close'],
    },
    {
      id: 'people-network',
      number: '09',
      shortLabel: 'People CRM',
      title: 'People & Relationship CRM',
      category: 'Domains',
      summary:
        'Keep mentors, collaborators, clients, and key introductions warm with automatic follow-up intervals.',
      whatItContains: [
        'Personal CRM storing roles, organizations, context notes, and shared projects',
        'Touchpoint cadence reminders so important relationships never go cold',
        'Meeting notes automatically linked to each contact profile',
      ],
      includedViews: [
        { name: 'Reconnect Queue', layout: 'List', description: 'Contacts overdue for a check-in.' },
        { name: 'Directory Gallery', layout: 'Gallery', description: 'Searchable people cards by circle.' },
      ],
      keyFormulasAndProperties: ['Days Since Contact', 'Follow-Up Status'],
      connectedDatabases: ['People', 'Meeting Notes', 'Projects'],
      includedSubTemplates: ['1-on-1 Meeting Log', 'New Contact Profile'],
    },
    {
      id: 'system-vault',
      number: '10',
      shortLabel: 'System Vault',
      title: 'Weekly Review, Mobile Capture & System Vault',
      category: 'Vault',
      summary:
        'Guided Friday/Sunday weekly review engine, mobile quick-capture screen, and centralized 15-database architecture vault.',
      whatItContains: [
        'Guided Weekly Review scorecard clearing Inbox, Tasks, Projects, and Finances',
        'Dedicated Mobile Capture page optimized for one-thumb entry',
        'Centralized System Vault housing all 15 source databases safely out of sight',
      ],
      includedViews: [
        { name: 'Weekly Review Archive', layout: 'Table', description: 'Historical energy, wins, and lessons.' },
        { name: 'Master Schema Index', layout: 'Table', description: 'All 15 linked backend databases.' },
      ],
      keyFormulasAndProperties: ['Hygiene Score', 'Orphan Count'],
      connectedDatabases: ['Weekly Reviews', 'Templates Library', 'Archive'],
      includedSubTemplates: ['Weekly Review Scorecard', 'Annual Reflection'],
    },
  ],
  databaseCountLabel: '15 Interconnected Core-5 Databases',
  databases: [
    { id: 'nx-db-1', name: 'Goals & OKRs', category: 'Core-5 Spine', purpose: 'Quarterly and annual outcomes anchoring every project.', keyProperties: ['Quarter', 'Target', 'Progress %', 'Status'], relations: ['Projects', 'PARA Areas'], viewsIncluded: ['Active OKRs', 'Annual Horizon'] },
    { id: 'nx-db-2', name: 'Master Projects', category: 'Core-5 Spine', purpose: 'Active, planned, and completed multi-step initiatives.', keyProperties: ['Status', 'Timeline', 'Progress %', 'Priority'], relations: ['Goals', 'Tasks', 'PARA Areas'], viewsIncluded: ['Timeline', 'Progress Radar'] },
    { id: 'nx-db-3', name: 'Sprint Tasks', category: 'Core-5 Spine', purpose: 'Executable next actions across Today, Focus, Waiting, and Inbox.', keyProperties: ['Status', 'Priority', 'Due Date', 'Bucket'], relations: ['Master Projects', 'People'], viewsIncluded: ['Today', 'Focus', 'Inbox Triage'] },
    { id: 'nx-db-4', name: 'PARA Areas', category: 'Core-5 Spine', purpose: '24 ongoing life and business areas governing hygiene.', keyProperties: ['Domain Type', 'Health', 'Active Count'], relations: ['Master Projects', 'Knowledge Vault'], viewsIncluded: ['PARA Matrix', 'Hygiene Audit'] },
    { id: 'nx-db-5', name: 'Knowledge Vault', category: 'Core-5 Spine', purpose: 'Atomic notes, web clippings, and synthesis frameworks.', keyProperties: ['Topic', 'Maturity', 'Source URL'], relations: ['PARA Areas', 'Master Projects'], viewsIncluded: ['Evergreen Gallery', 'Inbox'] },
    { id: 'nx-db-6', name: 'Daily Habits', category: 'Life Telemetry', purpose: 'Daily check-ins and 30-day streak calculations.', keyProperties: ['Date', 'Completion %', 'Streak'], relations: ['Goals & OKRs', 'Weekly Reviews'], viewsIncluded: ['Today Check-In', 'Monthly Grid'] },
    { id: 'nx-db-7', name: 'Weekly Reviews', category: 'Cadence', purpose: 'Structured weekly resets auditing velocity and energy.', keyProperties: ['Week #', 'Wins', 'Hygiene Passed'], relations: ['Master Projects', 'Daily Habits'], viewsIncluded: ['Review Log'] },
    { id: 'nx-db-8', name: 'Capital & Cash Flow', category: 'Capital', purpose: 'Income, monthly burn rate, and expense categorization.', keyProperties: ['Amount', 'Category', 'Month', 'Type'], relations: ['Subscriptions', 'PARA Areas'], viewsIncluded: ['Monthly Burn', 'Cash Flow'] },
    { id: 'nx-db-9', name: 'Subscriptions Radar', category: 'Capital', purpose: 'Recurring SaaS & life bills with renewal countdowns.', keyProperties: ['Billing Cycle', 'Next Renewal', 'Monthly Cost'], relations: ['Capital & Cash Flow'], viewsIncluded: ['Due Soon', 'Annual Cost'] },
    { id: 'nx-db-10', name: 'Portfolio & Investments', category: 'Capital', purpose: 'Free cash flow, ROCE tracking, and allocation thesis.', keyProperties: ['Asset', 'Thesis', 'Allocation %'], relations: ['Capital & Cash Flow', 'Knowledge Vault'], viewsIncluded: ['Allocation Matrix'] },
    { id: 'nx-db-11', name: 'People CRM', category: 'Network', purpose: 'Mentors, founders, clients, and warm follow-up cadence.', keyProperties: ['Circle', 'Last Contact', 'Cadence'], relations: ['Meeting Notes', 'Master Projects'], viewsIncluded: ['Reconnect Queue', 'Directory'] },
    { id: 'nx-db-12', name: 'Meeting Notes', category: 'Network', purpose: 'Structured call notes linked to contacts and action items.', keyProperties: ['Date', 'Attendees', 'Decisions'], relations: ['People CRM', 'Sprint Tasks'], viewsIncluded: ['Recent Calls'] },
    { id: 'nx-db-13', name: 'Quick Capture Inbox', category: 'Capture', purpose: 'Mobile & desktop scratchpad for rapid zero-friction entry.', keyProperties: ['Captured At', 'Type', 'Triaged'], relations: ['Sprint Tasks', 'Knowledge Vault'], viewsIncluded: ['Mobile Capture'] },
    { id: 'nx-db-14', name: 'Templates Library', category: 'System', purpose: 'Reusable project briefs, SOPs, and review blueprints.', keyProperties: ['Domain', 'Trigger', 'Version'], relations: ['PARA Areas'], viewsIncluded: ['Blueprint Catalog'] },
    { id: 'nx-db-15', name: 'Cold Archive', category: 'System', purpose: 'Completed initiatives stored cleanly without cluttering active views.', keyProperties: ['Archived Date', 'Outcome', 'Key Lesson'], relations: ['Master Projects', 'PARA Areas'], viewsIncluded: ['Completed Vault'] },
  ],
  readyTemplates: [
    { id: 'nx-tpl-1', title: 'Flagship Project Brief', triggerContext: 'Master Projects', contains: 'Scope, success metrics, linked sprint tasks, and milestone timeline.' },
    { id: 'nx-tpl-2', title: 'P1 Sprint Action Card', triggerContext: 'Sprint Tasks', contains: 'Definition of done, context tag, and linked project relation.' },
    { id: 'nx-tpl-3', title: 'Weekly Hygiene Reset', triggerContext: 'Weekly Reviews', contains: '15-minute checklist clearing Inbox, overdue tasks, and subscriptions.' },
    { id: 'nx-tpl-4', title: 'Atomic Knowledge Note', triggerContext: 'Knowledge Vault', contains: 'Core insight, source citation, AI auto-tag prompts, and PARA link.' },
    { id: 'nx-tpl-5', title: 'Quarterly OKR Charter', triggerContext: 'Goals & OKRs', contains: 'Objective statement, 3 measurable key results, and linked projects.' },
    { id: 'nx-tpl-6', title: 'Contact & CRM Profile', triggerContext: 'People CRM', contains: 'Background context, follow-up cadence, and linked meeting history.' },
    { id: 'nx-tpl-7', title: 'Monthly Capital Close', triggerContext: 'Capital & Cash Flow', contains: 'Burn-rate snapshot, subscription audit, and savings rate review.' },
    { id: 'nx-tpl-8', title: 'Mobile Voice/Text Triage', triggerContext: 'Quick Capture', contains: 'Fast capture block routing ideas straight to Tasks or Knowledge.' },
  ],
  weeklyRhythm: [
    { day: 'Mon', focus: 'Sprint Commitment', checklist: 'Select P1/P2 weekly tasks and align active project timelines.' },
    { day: 'Wed', focus: 'Mid-Week Pulse', checklist: 'Clear Inbox to zero and unblock Waiting-for follow-ups.' },
    { day: 'Fri', focus: 'Capital & CRM Check', checklist: 'Review upcoming subscriptions and touch base with 2 key contacts.' },
    { day: 'Sun', focus: 'PARA Hygiene Reset', checklist: 'Verify 0 orphaned nodes, score habits, and set Monday intentions.' },
  ],
};
