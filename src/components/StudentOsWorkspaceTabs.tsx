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

        </div>
      </div>
    </div>
  );
};
