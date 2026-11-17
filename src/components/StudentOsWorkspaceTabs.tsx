import React, { useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  CheckSquare,
  Clock,
  Database,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  Layers,
  Repeat,
  Timer,
  Users,
  Wallet,
} from 'lucide-react';

export type StudentTabId =
  | 'hub'
  | 'academics'
  | 'toolkit'
  | 'career'
  | 'wellness'
  | 'finance'
  | 'faculty'
  | 'system';

interface StudentTabMeta {
  id: StudentTabId;
  shortLabel: string;
  pageTitle: string;
  calloutTitle: string;
  calloutBody: string;
  icon: React.ReactNode;
}

export const STUDENT_OS_TABS: StudentTabMeta[] = [
  {
    id: 'hub',
    shortLabel: 'Main Hub',
    pageTitle: 'Student OS Pro',
    calloutTitle: 'Student OS Pro',
    calloutBody:
      'Your academic, career and life command center. Capture fast, plan the week, and review what you have learned.',
    icon: <Home className="w-3.5 h-3.5" />,
  },
  {
    id: 'academics',
    shortLabel: 'Academics',
    pageTitle: 'Study & Academics',
    calloutTitle: 'Study & Academics',
    calloutBody:
      'Track enrolled courses, syllabus weights, assignment deadlines, Due for Review topics, and Cornell lecture notes.',
    icon: <BookOpen className="w-3.5 h-3.5" />,
  },
  {
    id: 'toolkit',
    shortLabel: 'Study Toolkit',
    pageTitle: 'Study Toolkit',
    calloutTitle: 'Study Toolkit',
    calloutBody:
      'Focus Pomodoro timer, proven active recall techniques, spaced repetition interval queue (1d/3d/7d/21d), and exam checklists.',
    icon: <Timer className="w-3.5 h-3.5" />,
  },
  {
    id: 'career',
    shortLabel: 'Career',
    pageTitle: 'Career & Internships',
    calloutTitle: 'Career & Internships',
    calloutBody:
      'Track applications, deadlines, online assessments, and referrals across Wishlist to Offer stages.',
    icon: <Briefcase className="w-3.5 h-3.5" />,
  },
  {
    id: 'wellness',
    shortLabel: 'Health & Wellness',
    pageTitle: 'Health & Wellness',
    calloutTitle: 'Health & Wellness',
    calloutBody:
      'Goals, daily wellness check-ins, reading library, habits, and weekly reflections connected to sleep trends.',
    icon: <HeartPulse className="w-3.5 h-3.5" />,
  },
  {
    id: 'finance',
    shortLabel: 'Finance',
    pageTitle: 'Student Finance',
    calloutTitle: 'Student Finance',
    calloutBody:
      'Budgets, savings targets, campus spending, and scholarship applications in one clean monthly view.',
    icon: <Wallet className="w-3.5 h-3.5" />,
  },
  {
    id: 'faculty',
    shortLabel: 'Contacts & Faculty',
    pageTitle: 'Contacts & Faculty',
    calloutTitle: 'Contacts & Faculty',
    calloutBody:
      'Professors, lab leads, recruiters, office hours, rooms, and linked courses.',
    icon: <Users className="w-3.5 h-3.5" />,
  },
  {
    id: 'system',
    shortLabel: 'System · 12 DBs',
    pageTitle: 'System Vault & 12 Databases',
    calloutTitle: 'System & Support',
    calloutBody:
      'All 12 interconnected Notion databases, weighted 4.0 GPA formulas, and 8 one-click academic templates.',
    icon: <Database className="w-3.5 h-3.5" />,
  },
];

const STUDENT_QUICK_NAV: Array<{
  id: StudentTabId;
  label: string;
  accent: string;
  icon: React.ReactNode;
}> = [
  { id: 'hub', label: 'Home', accent: 'text-[#9A6700]', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'toolkit', label: 'Study Toolkit', accent: 'text-[#DC2626]', icon: <Timer className="w-3.5 h-3.5" /> },
  { id: 'academics', label: 'Academics', accent: 'text-[#1D6EE3]', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'career', label: 'Career', accent: 'text-[#7C3AED]', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'wellness', label: 'Wellness', accent: 'text-[#16A34A]', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { id: 'finance', label: 'Finance', accent: 'text-[#CA8A04]', icon: <Wallet className="w-3.5 h-3.5" /> },
  { id: 'faculty', label: 'Faculty', accent: 'text-[#475569]', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'system', label: '12 Databases', accent: 'text-[#0F172A]', icon: <Database className="w-3.5 h-3.5" /> },
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

export const StudentOsWorkspaceTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<StudentTabId>('academics');
  const [examChecks, setExamChecks] = useState<Record<string, boolean>>({
    'Confirm exam date, room and allowed materials': true,
    'Collect all lecture notes into revision index': true,
    'Clear every Due for Review spaced recall card': false,
    'Complete two timed past practice papers': true,
  });
  const [academicsView, setAcademicsView] = useState<'review' | 'gpa'>('review');

  const currentMeta =
    STUDENT_OS_TABS.find((t) => t.id === activeTab) || STUDENT_OS_TABS[0];

  const toggleExamCheck = (label: string) => {
    setExamChecks((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div data-testid="student-os-tabs-explorer" className="space-y-5">
      {/* Outer Interactive 8-Module Tab Strip (Matching Freelancer OS) */}
      <div
        role="tablist"
        aria-label="Student OS Interactive Sections"
        className="flex flex-wrap items-center gap-2"
      >
        {STUDENT_OS_TABS.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`sos-module-tab-${tab.id}`}
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
        data-testid={`sos-tabpanel-${activeTab}`}
        role="tabpanel"
        aria-label={currentMeta.pageTitle}
        className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_16px_44px_-18px_rgba(15,23,42,0.10)] overflow-hidden"
      >
        {/* Top Notion Chrome Bar */}
        <div className="px-5 py-3 border-b border-[#F1F5F9] bg-[#FBFBFA] flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#64748B]">
          <div className="flex items-center gap-2 font-medium text-[#37352F]">
            <span className="inline-flex items-center gap-1 text-[#64748B]">
              <span>Student OS Pro</span>
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
            {STUDENT_QUICK_NAV.map((nav) => {
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

          {/* TAB 01: MAIN HUB */}
          {activeTab === 'hub' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EAF3FC"
                  icon={<GraduationCap className="w-4 h-4 text-[#1D6EE3]" />}
                  label="Current Term GPA"
                  value="3.88 / 4.00"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Calendar className="w-4 h-4 text-[#CA8A04]" />}
                  label="Due this week"
                  value="5 deliverables · 2 due soon"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<HeartPulse className="w-4 h-4 text-[#16A34A]" />}
                  label="Sleep avg (7d)"
                  value="7.3h · Mood Good"
                />
                <KpiTile
                  bg="#F3EFFB"
                  icon={<Wallet className="w-4 h-4 text-[#7C3AED]" />}
                  label="Monthly budget"
                  value="$600 cap · On Track (74%)"
                />
              </div>

              <div className="border-t border-[#EAEAEA] pt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-6 rounded-[12px] border border-[#EAEAEA] p-4 space-y-3 bg-[#FBFBFA]">
                  <h4 className="text-[15px] font-bold text-[#2F2D28]">
                    Quick Capture Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[12.5px]">
                    {[
                      { label: '+ New deliverable', bg: '#EAF3FC', text: '#1D6EE3' },
                      { label: '+ Log an exam', bg: '#FCECEC', text: '#DC2626' },
                      { label: '+ New lecture note', bg: '#F3EFFB', text: '#7C3AED' },
                      { label: '+ Log study session', bg: '#EDF5EE', text: '#15803D' },
                    ].map((btn) => (
                      <div
                        key={btn.label}
                        style={{ backgroundColor: btn.bg, color: btn.text }}
                        className="rounded-[8px] px-3 py-2 font-semibold border border-black/[0.04]"
                      >
                        {btn.label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 rounded-[12px] border border-[#EAEAEA] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-[#EAEAEA] bg-[#FAF9F7] flex items-center justify-between text-[13px] font-bold text-[#2F2D28]">
                    <span>↗ Goals & Milestones</span>
                    <span className="text-[11px] font-medium text-[#64748B]">
                      30d Countdown
                    </span>
                  </div>
                  <div className="divide-y divide-[#F1F1EF] text-[13px]">
                    {[
                      { goal: 'Finish semester above 3.85 GPA', pct: '78%', tag: 'Academic', tone: 'bg-[#EAF3FC] text-[#1D6EE3]' },
                      { goal: 'Sleep 7+ hrs on 5 nights / week', pct: '70%', tag: 'Health', tone: 'bg-[#EDF5EE] text-[#15803D]' },
                      { goal: 'Land summer SWE / research role', pct: '45%', tag: 'Career', tone: 'bg-[#F3EFFB] text-[#7C3AED]' },
                    ].map((row) => (
                      <div key={row.goal} className="px-4 py-2.5 flex items-center justify-between gap-3">
                        <span className="font-medium text-[#2F2D28] truncate">
                          {row.goal}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${row.tone}`}>
                            {row.tag}
                          </span>
                          <span className="font-semibold text-[#334155] tabular-nums text-[12px]">
                            {row.pct}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 02: STUDY & ACADEMICS */}
          {activeTab === 'academics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#EAF3FC"
                  icon={<BookOpen className="w-4 h-4 text-[#1D6EE3]" />}
                  label="Active coursework"
                  value="3 core courses"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Repeat className="w-4 h-4 text-[#CA8A04]" />}
                  label="Due for review"
                  value="5 syllabus topics"
                />
                <KpiTile
                  bg="#FCECEC"
                  icon={<FileText className="w-4 h-4 text-[#DC2626]" />}
                  label="Needs first pass"
                  value="2 lecture notes"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<GraduationCap className="w-4 h-4 text-[#16A34A]" />}
                  label="Weighted GPA"
                  value="3.88 / 4.00"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setAcademicsView('review')}
                  className={`w-full text-left rounded-[10px] px-4 py-3 text-[13px] border cursor-pointer transition-all ${
                    academicsView === 'review'
                      ? 'bg-[#EAF3FC] border-[#1D6EE3]/50 ring-2 ring-[#1D6EE3]/10'
                      : 'bg-[#FAF9F7] border-[#EAEAEA]'
                  }`}
                >
                  <span className="font-bold text-[#2F2D28]">Syllabus & Recall Queue</span>{' '}
                  <span className="text-[#52504A]">— Review cadence & Cornell lecture notes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAcademicsView('gpa')}
                  className={`w-full text-left rounded-[10px] px-4 py-3 text-[13px] border cursor-pointer transition-all ${
                    academicsView === 'gpa'
                      ? 'bg-[#EDF5EE] border-[#16A34A]/45 ring-2 ring-[#16A34A]/10'
                      : 'bg-[#FAF9F7] border-[#EAEAEA]'
                  }`}
                >
                  <span className="font-bold text-[#2F2D28]">Weighted GPA Ledger</span>{' '}
                  <span className="text-[#52504A]">— Credit-weighted scores across classes</span>
                </button>
              </div>

              {academicsView === 'review' ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-6 rounded-[12px] border border-[#EAEAEA] overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-[#EAEAEA] bg-[#FAF9F7] text-[13px] font-bold text-[#2F2D28]">
                      ↗ Syllabus & Modules (Due for Review)
                    </div>
                    <div className="divide-y divide-[#F1F1EF] text-[12.5px]">
                      {[
                        { course: 'Linear Algebra & Optimization', topic: 'Eigenvalues & Diagonalization', prio: 'High (7d)', tone: 'bg-[#EDF5EE] text-[#15803D]' },
                        { course: 'Data Structures & Algorithms', topic: 'Dynamic Programming & Memoization', prio: 'Low (1d)', tone: 'bg-[#FCECEC] text-[#DC2626]' },
                        { course: 'Cellular Biophysics', topic: 'Membrane Potential & Ion Channels', prio: 'Low (1d)', tone: 'bg-[#FCECEC] text-[#DC2626]' },
                        { course: 'Data Structures & Algorithms', topic: 'Graph Traversal (BFS vs DFS)', prio: 'Medium (3d)', tone: 'bg-[#FBF5E2] text-[#B45309]' },
                      ].map((row) => (
                        <div key={row.topic} className="px-4 py-2.5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-[#2F2D28] truncate">{row.topic}</p>
                            <p className="text-[11px] text-[#64748B] truncate">{row.course}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-medium shrink-0 ${row.tone}`}>
                            {row.prio}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 rounded-[12px] border border-[#EAEAEA] p-4 space-y-3 bg-[#FAF9F7]">
                    <div className="text-[13px] font-bold text-[#2F2D28]">
                      ↗ Cornell Lecture Notes & Recall
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { title: 'Lecture 19: DP Memoization', course: 'Data Structures', status: 'Needs First Pass', tone: 'bg-[#FCECEC] text-[#DC2626]' },
                        { title: 'Lab 5: Patch-Clamp Basics', course: 'Cellular Biophysics', status: 'Needs First Pass', tone: 'bg-[#FCECEC] text-[#DC2626]' },
                        { title: 'Lecture 17: BFS vs DFS', course: 'Data Structures', status: 'Flashcards Created', tone: 'bg-[#FBF5E2] text-[#B45309]' },
                        { title: 'Lecture 22: Diagonalization', course: 'Linear Algebra', status: 'Flashcards Created', tone: 'bg-[#FBF5E2] text-[#B45309]' },
                      ].map((card) => (
                        <div key={card.title} className="rounded-[9px] bg-white border border-[#EAEAEA] p-3 space-y-1.5">
                          <p className="text-[12.5px] font-semibold text-[#2F2D28] leading-snug">
                            {card.title}
                          </p>
                          <p className="text-[11px] text-[#64748B]">{card.course}</p>
                          <span className={`inline-block px-2 py-0.5 rounded text-[10.5px] font-medium ${card.tone}`}>
                            {card.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
                  <table className="w-full text-left text-[13px] min-w-[540px]">
                    <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#64748B] text-[12px]">
                      <tr>
                        <th className="py-2.5 px-4 font-medium">Course</th>
                        <th className="py-2.5 px-4 font-medium">Credits</th>
                        <th className="py-2.5 px-4 font-medium">Current Score</th>
                        <th className="py-2.5 px-4 font-medium text-right">Grade Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F1EF]">
                      <tr>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Data Structures & Algorithms</td>
                        <td className="py-2.5 px-4">4.0</td>
                        <td className="py-2.5 px-4">94.2% (A)</td>
                        <td className="py-2.5 px-4 text-right font-semibold tabular-nums">4.00</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Linear Algebra & Optimization</td>
                        <td className="py-2.5 px-4">4.0</td>
                        <td className="py-2.5 px-4">91.5% (A-)</td>
                        <td className="py-2.5 px-4 text-right font-semibold tabular-nums">3.70</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Cellular Biophysics</td>
                        <td className="py-2.5 px-4">3.0</td>
                        <td className="py-2.5 px-4">93.8% (A)</td>
                        <td className="py-2.5 px-4 text-right font-semibold tabular-nums">4.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 03: STUDY TOOLKIT & SPACED REPETITION */}
          {activeTab === 'toolkit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <KpiTile
                  bg="#FCECEC"
                  icon={<Clock className="w-4 h-4 text-[#DC2626]" />}
                  label="Focus timer"
                  value="25:00 Pomodoro"
                />
                <KpiTile
                  bg="#EAF3FC"
                  icon={<Repeat className="w-4 h-4 text-[#1D6EE3]" />}
                  label="Spaced recall"
                  value="1d / 3d / 7d / 21d"
                />
                <KpiTile
                  bg="#EDF5EE"
                  icon={<CheckSquare className="w-4 h-4 text-[#16A34A]" />}
                  label="Weekly study"
                  value="18.5h logged"
                />
                <KpiTile
                  bg="#FBF5E2"
                  icon={<Layers className="w-4 h-4 text-[#CA8A04]" />}
                  label="Deliverables"
                  value="8 tracked"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-6 rounded-[12px] border border-[#EAEAEA] p-4 space-y-3 bg-[#FBFBFA]">
                  <h4 className="text-[15px] font-bold text-[#2F2D28]">
                    Exam Week Checklist
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(examChecks).map(([label, done]) => (
                      <label
                        key={label}
                        className="flex items-center gap-2.5 text-[13px] text-[#37352F] cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={done}
                          onChange={() => toggleExamCheck(label)}
                          className="w-4 h-4 rounded accent-[#1D6EE3] cursor-pointer"
                        />
                        <span className={done ? 'line-through text-[#8E8B84]' : ''}>
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-3">
                  {[
                    { title: 'Pomodoro', desc: '25 min focus, 5 min break', bg: '#FCECEC' },
                    { title: 'Active Recall', desc: 'Close the book, write from memory', bg: '#F3EFFB' },
                    { title: 'Spaced Repetition', desc: 'Review at 1, 3, 7 & 21 days', bg: '#FBF5E2' },
                    { title: 'Teach It', desc: 'Explain complex concepts out loud', bg: '#EAF3FC' },
                  ].map((card) => (
                    <div
                      key={card.title}
                      style={{ backgroundColor: card.bg }}
                      className="rounded-[10px] p-3.5 border border-black/[0.04] space-y-1"
                    >
                      <p className="text-[13px] font-bold text-[#0F172A]">{card.title}</p>
                      <p className="text-[12px] text-[#475569] leading-snug">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 04: CAREER & INTERNSHIPS */}
          {activeTab === 'career' && (
            <div className="space-y-5">
              <div className="overflow-x-auto pb-2">
                <div className="grid grid-cols-5 gap-3 min-w-[740px]">
                  {[
                    {
                      stage: 'Wishlist',
                      pillBg: '#F1F1EF',
                      pillText: '#52504A',
                      cardBg: '#FAF9F7',
                      items: [{ role: 'Library Desk Assistant', org: 'University Library', tag: 'Backup', tagBg: '#EDF5EE' }],
                    },
                    {
                      stage: 'Applied',
                      pillBg: '#E1EFFB',
                      pillText: '#1D6EE3',
                      cardBg: '#F5FAFE',
                      items: [{ role: 'Undergraduate Research (UROP)', org: 'Biophysics Lab', tag: 'Strong', tagBg: '#FBF5E2' }],
                    },
                    {
                      stage: 'OA / Challenge',
                      pillBg: '#FBF0D6',
                      pillText: '#92400E',
                      cardBg: '#FCF9F0',
                      items: [],
                    },
                    {
                      stage: 'Interviewing',
                      pillBg: '#FCECEC',
                      pillText: '#DC2626',
                      cardBg: '#FEF7F7',
                      items: [{ role: 'Software Engineering Intern', org: 'Orbit Labs', tag: 'Dream', tagBg: '#FCECEC' }],
                    },
                    {
                      stage: 'Offer',
                      pillBg: '#E3F2E8',
                      pillText: '#15803D',
                      cardBg: '#F5FAF6',
                      items: [],
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
                          key={item.role}
                          className="rounded-[8px] bg-white border border-[#EAEAEA] p-2.5 space-y-1.5"
                        >
                          <p className="text-[12.5px] font-semibold text-[#2F2D28] leading-snug">
                            {item.role}
                          </p>
                          <span
                            style={{ backgroundColor: item.tagBg }}
                            className="inline-block px-1.5 py-0.5 rounded text-[10.5px] font-medium text-[#37352F]"
                          >
                            {item.tag}
                          </span>
                          <p className="text-[11px] text-[#64748B]">{item.org}</p>
                        </div>
                      ))}
                      <div className="rounded-[7px] border border-dashed border-[#D8D6D0] px-2.5 py-1.5 text-[11.5px] text-[#64748B]">
                        + New page
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 05: HEALTH & WELLNESS */}
          {activeTab === 'wellness' && (
            <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
              <table className="w-full text-left text-[13px] min-w-[540px]">
                <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#64748B] text-[12px]">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Date</th>
                    <th className="py-2.5 px-4 font-medium">Mood</th>
                    <th className="py-2.5 px-4 font-medium">Sleep (hrs)</th>
                    <th className="py-2.5 px-4 font-medium">Water</th>
                    <th className="py-2.5 px-4 font-medium">Highlight Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF]">
                  {[
                    { date: 'Nov 15, 2026', mood: 'Good', tone: 'bg-[#EAF3FC] text-[#1D6EE3]', sleep: '8.5', water: '8', note: 'Rested and caught up on notes' },
                    { date: 'Nov 14, 2026', mood: 'Great', tone: 'bg-[#EDF5EE] text-[#15803D]', sleep: '7.5', water: '7', note: 'Weekend plans with friends' },
                    { date: 'Nov 13, 2026', mood: 'Good', tone: 'bg-[#EAF3FC] text-[#1D6EE3]', sleep: '7.0', water: '7', note: 'Lab report submitted' },
                    { date: 'Nov 11, 2026', mood: 'Okay', tone: 'bg-[#FBF5E2] text-[#B45309]', sleep: '6.0', water: '5', note: 'Good study group session' },
                  ].map((r) => (
                    <tr key={r.date}>
                      <td className="py-2.5 px-4 font-medium text-[#2F2D28]">{r.date}</td>
                      <td className="py-2.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${r.tone}`}>{r.mood}</span>
                      </td>
                      <td className="py-2.5 px-4 tabular-nums">{r.sleep}h</td>
                      <td className="py-2.5 px-4 tabular-nums">{r.water} glasses</td>
                      <td className="py-2.5 px-4 text-[#64748B]">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 06: STUDENT FINANCE */}
          {activeTab === 'finance' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { month: 'November 2026', cap: '$600.00', spent: '$441', left: '$159', health: 'On Track (74%)', rate: 'Saving 12%' },
                { month: 'October 2026', cap: '$600.00', spent: '$335', left: '$265', health: 'On Track (56%)', rate: 'Saving 33%' },
              ].map((m) => (
                <div key={m.month} className="rounded-[12px] border border-[#EAEAEA] p-4 space-y-2 bg-[#FAF9F7]">
                  <p className="text-[14px] font-bold text-[#2F2D28]">{m.month}</p>
                  <div className="grid grid-cols-3 gap-2 text-[12px] pt-1">
                    <div><p className="text-[#64748B]">Budget</p><p className="font-semibold tabular-nums">{m.cap}</p></div>
                    <div><p className="text-[#64748B]">Spent</p><p className="font-semibold tabular-nums">{m.spent}</p></div>
                    <div><p className="text-[#64748B]">Left</p><p className="font-semibold text-[#15803D] tabular-nums">{m.left}</p></div>
                  </div>
                  <div className="flex items-center gap-3 pt-1 text-[11.5px] font-medium text-[#15803D]">
                    <span>● {m.health}</span>
                    <span className="text-[#B45309]">● {m.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 07: CONTACTS & FACULTY */}
          {activeTab === 'faculty' && (
            <div className="rounded-[12px] border border-[#EAEAEA] overflow-x-auto">
              <table className="w-full text-left text-[13px] min-w-[540px]">
                <thead className="bg-[#FAF9F7] border-b border-[#EAEAEA] text-[#64748B] text-[12px]">
                  <tr>
                    <th className="py-2.5 px-4 font-medium">Name</th>
                    <th className="py-2.5 px-4 font-medium">Role</th>
                    <th className="py-2.5 px-4 font-medium">Department / Org</th>
                    <th className="py-2.5 px-4 font-medium">Office Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF]">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Dr. Anika Rao</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-[#F3EFFB] text-[#7C3AED] text-[11px] font-medium">Professor</span></td>
                    <td className="py-2.5 px-4 text-[#475569]">Computer Science</td>
                    <td className="py-2.5 px-4 text-[#64748B]">Tue 3:00–5:00 PM, Room 310</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Prof. Marcus Lee</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-[#F3EFFB] text-[#7C3AED] text-[11px] font-medium">Professor</span></td>
                    <td className="py-2.5 px-4 text-[#475569]">Mathematics</td>
                    <td className="py-2.5 px-4 text-[#64748B]">Thu 1:00–2:30 PM, Hall 112</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#2F2D28]">Priya Nair</td>
                    <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded bg-[#EDF5EE] text-[#15803D] text-[11px] font-medium">Recruiter / Mentor</span></td>
                    <td className="py-2.5 px-4 text-[#475569]">Orbit Labs</td>
                    <td className="py-2.5 px-4 text-[#64748B]">SWE Intern referral</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 08: SYSTEM VAULT (12 DATABASES) */}
          {activeTab === 'system' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                { name: '01 · Courses & Syllabi', desc: 'Classes, credit hours, office hours, and grading weights.' },
                { name: '02 · Assignments & Deliverables', desc: '7-day queue, weights, and status kanban.' },
                { name: '03 · Cornell Lecture Notes & Flashcards', desc: 'Cue/summary sheets & 1d/3d/7d/21d spaced repetition.' },
                { name: '04 · Exams, Gradebook & Weighted GPA', desc: '14-day exam sprints & live 4.0 GPA math.' },
                { name: '05 · Reading Library & Citations Vault', desc: 'Assigned chapters & APA/MLA/BibTeX entries.' },
                { name: '06 · Career, Wellness, Finance & Faculty', desc: 'Internships, sleep logs, budgets, scholarships & contacts.' },
              ].map((db) => (
                <div
                  key={db.name}
                  className="rounded-[10px] border border-[#EAEAEA] bg-[#FAF9F7] p-3.5 flex items-start gap-2.5"
                >
                  <Check className="w-4 h-4 text-[#1D6EE3] shrink-0 mt-0.5" />
                  <div className="text-[13px]">
                    <p className="font-semibold text-[#2F2D28]">{db.name}</p>
                    <p className="text-[#64748B]">{db.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
