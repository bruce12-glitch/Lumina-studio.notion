import React, { useState } from 'react';
import {
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  Repeat,
  Timer,
  Wallet,
} from 'lucide-react';
import { StudentOsWorkspaceTabs } from './StudentOsWorkspaceTabs';
import { STUDENT_OS_SPEC } from '../data/studentOsSpec';
import {
  FlagshipDeckSlideItem,
  FlagshipSlideDeck,
} from './FlagshipSlideDeck';

export type StudentStudioFilterId =
  | 'all'
  | 'hub-career'
  | 'toolkit-wellness'
  | 'gpa-courses'
  | 'career-finance';

export interface StudentOsSlide {
  id: 'hub-career' | 'toolkit-wellness' | 'gpa-courses' | 'career-finance';
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

export const STUDENT_OS_SLIDES: StudentOsSlide[] = [
  {
    id: 'hub-career',
    stepNumber: '01',
    shortLabel: 'Semester Hub',
    label: '01 · Command Hub & Deadlines',
    badge: '7-Day Radar',
    title: 'See every class and deadline in',
    editorialAccent: 'one screen.',
    description:
      'Open Notion to an automatic 7-day deadline list, course progress bars, and a Sunday reset checklist.',
    beforeText:
      'Digging through Canvas, syllabus PDFs, and group chats to spot due dates.',
    afterText:
      'Every syllabus weight, lab deadline, and weekly reading rolled up in one place.',
    highlightMetric: 'Main Hub · 7-Day Radar · Courses',
    includedModules: [
      {
        title: 'Main Hub',
        details: '7-day urgent deadline radar, active courses, and Sunday reset.',
      },
      {
        title: 'Course Pages',
        details: 'Professors, grading weights, readings, and deliverables per class.',
      },
      {
        title: 'Master Calendar',
        details: 'Switch between Kanban, Calendar, and Priority List views.',
      },
    ],
  },
  {
    id: 'toolkit-wellness',
    stepNumber: '02',
    shortLabel: 'Recall & Notes',
    label: '02 · Cornell Notes & Spaced Recall',
    badge: 'Active Study',
    title: 'Turn lecture notes into',
    editorialAccent: 'exam retention.',
    description:
      'Write Cornell cues in class—the 1·3·7·21-day spaced recall queue surfaces exactly what to review today.',
    beforeText:
      'Re-reading highlighted notes at 2 a.m. the night before midterms.',
    afterText:
      'Auto Due-for-Review recall queue paired with 25/5 Pomodoro sprints.',
    highlightMetric: 'Cornell Notes · 1/3/7/21d Recall',
    includedModules: [
      {
        title: 'Cornell Lecture Notes',
        details: 'Cue questions, takeaways, and First Pass → Quiz Ready tags.',
      },
      {
        title: 'Spaced Recall Queue',
        details: 'Auto 1, 3, 7, and 21-day cadence showing only topics due today.',
      },
      {
        title: 'Exam Sprint Toolkit',
        details: 'Pomodoro log, active-recall rubrics, and 14-day exam checklists.',
      },
    ],
  },
  {
    id: 'gpa-courses',
    stepNumber: '03',
    shortLabel: 'Weighted GPA',
    label: '03 · Weighted 4.0 GPA & Gradebook',
    badge: 'Live Formulas',
    title: 'Know your standing with live',
    editorialAccent: 'weighted GPA.',
    description:
      'Log assignment and exam scores once—credit-weighted formulas compute your exact term and cumulative 4.0 GPA.',
    beforeText:
      'Guessing what score you need on the final exam in messy spreadsheets.',
    afterText:
      'Live credit-weighted course % and cumulative GPA updated on every entry.',
    highlightMetric: 'Auto 4.0 Scale · Credit Rollups',
    includedModules: [
      {
        title: 'Weighted Gradebook',
        details: 'Auto score weighting across homework, labs, midterms, and finals.',
      },
      {
        title: 'Cumulative GPA Rollup',
        details: 'Credit-hour weighted GPA across semesters with target grades.',
      },
      {
        title: 'Revision Index',
        details: 'Link textbook chapters and past papers straight to high-weight exams.',
      },
    ],
  },
  {
    id: 'career-finance',
    stepNumber: '04',
    shortLabel: 'Career & Life',
    label: '04 · Internships, Budget & Wellness',
    badge: 'Beyond Class',
    title: 'Track internships, budget, and',
    editorialAccent: 'weekly balance.',
    description:
      'Manage summer internship pipelines, professor office hours, monthly spending caps, and sleep habits together.',
    beforeText:
      'Missing internship OA deadlines and losing track of campus spending.',
    afterText:
      'Internship Kanban, faculty directory, scholarship tracker, and monthly caps.',
    highlightMetric: 'Career Kanban · Budget · 12 DBs',
    includedModules: [
      {
        title: 'Internship Kanban',
        details: 'Track roles from Wishlist → Applied → OA → Interview → Offer.',
      },
      {
        title: 'Faculty Directory',
        details: 'Office hours, email templates, and recommendation tracking.',
      },
      {
        title: 'Student Budget & Habits',
        details: 'Monthly spending caps, scholarship deadlines, and sleep check-ins.',
      },
    ],
  },
];

/* Crisp Interactive Notion Preview Canvases (Razor-Sharp Vector/DOM, Zero Blurry Screenshots) */
const StudentSlideVisual: React.FC<{
  slideId: StudentOsSlide['id'];
}> = ({ slideId }) => {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    'CS 201 · Binary Tree Lab Report': false,
    'ECON 104 · Monetary Policy Essay': true,
    'STAT 210 · Problem Set 6': false,
  });
  const [recalledIds, setRecalledIds] = useState<Record<string, boolean>>({
    r1: true,
    r2: false,
    r3: false,
  });

  if (slideId === 'hub-career') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Student OS Pro / 7-Day Command Radar</span>
          </span>
          <span className="font-mono text-[11px] tabular-nums">Week 09 · Fall</span>
        </div>

        <div className="p-3.5 sm:p-5 space-y-3.5">
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { label: 'Due in 7d', value: '3 tasks', tone: 'text-[#C43B3B]' },
              { label: 'Courses', value: '5 active', tone: 'text-[#0F7B6C]' },
              { label: 'Focus', value: '18.5 hrs', tone: 'text-[#2383E2]' },
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

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11.5px] font-semibold text-[#6E6D68]">
              <span className="truncate">
                Upcoming Deliverables{' '}
                <span className="hidden sm:inline font-normal text-[#9B9A97]">
                  (click to toggle)
                </span>
              </span>
              <span className="font-mono shrink-0">Due</span>
            </div>
            <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
              {[
                {
                  name: 'CS 201 · Binary Tree Lab Report',
                  course: 'Algorithms',
                  due: 'Tomorrow',
                  weight: '15%',
                },
                {
                  name: 'ECON 104 · Monetary Policy Essay',
                  course: 'Macroeconomics',
                  due: 'In 3 days',
                  weight: '20%',
                },
                {
                  name: 'STAT 210 · Problem Set 6',
                  course: 'Probability',
                  due: 'Fri, 5 PM',
                  weight: '10%',
                },
              ].map((task) => {
                const done = !!checkedTasks[task.name];
                return (
                  <button
                    key={task.name}
                    type="button"
                    onClick={() =>
                      setCheckedTasks((prev) => ({
                        ...prev,
                        [task.name]: !prev[task.name],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 transition-colors ${
                          done
                            ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                            : 'border-[#C7C5BE] bg-white'
                        }`}
                      >
                        {done && <Check className="w-3 h-3 stroke-[2.6]" />}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`text-[13px] font-semibold truncate ${
                            done
                              ? 'line-through text-[#9B9A97]'
                              : 'text-[#37352F]'
                          }`}
                        >
                          {task.name}
                        </p>
                        <p className="text-[11px] text-[#6E6D68]">
                          {task.course} · Weight {task.weight}
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
        </div>
      </div>
    );
  }

  if (slideId === 'toolkit-wellness') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <Repeat className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Spaced Repetition Queue · 1 / 3 / 7 / 21d</span>
          </span>
          <span className="font-mono text-[11px] text-[#0F7B6C] font-semibold inline-flex items-center gap-1">
            <Timer className="w-3 h-3" />
            <span>25:00 Sprint</span>
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-3.5 grid grid-cols-12 gap-3 text-[12px]">
            <div className="col-span-5 border-r border-[#E9E9E7] pr-3 space-y-1">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[#6E6D68]">
                Cornell Cue
              </p>
              <p className="font-semibold text-[#37352F] leading-snug">
                Why does Dijkstra fail with negative edge weights?
              </p>
            </div>
            <div className="col-span-7 space-y-1">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-[#2383E2]">
                Active Recall Summary
              </p>
              <p className="text-[#52504A] leading-snug">
                Greedy relaxation assumes once a node is popped from the min-heap, no shorter path exists via later negative edges.
              </p>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-[11.5px] font-semibold text-[#6E6D68]">
              Due for Review Today (click to mark Quiz Ready)
            </p>
            <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
              {[
                {
                  id: 'r1',
                  topic: 'Bayes Theorem & Posterior Updates',
                  interval: 'Day 7 · STAT 210',
                },
                {
                  id: 'r2',
                  topic: 'Dynamic Programming Memoization vs Tabulation',
                  interval: 'Day 3 · CS 201',
                },
                {
                  id: 'r3',
                  topic: 'IS-LM Equilibrium Shifts',
                  interval: 'Day 1 · ECON 104',
                },
              ].map((card) => {
                const mastered = !!recalledIds[card.id];
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() =>
                      setRecalledIds((prev) => ({
                        ...prev,
                        [card.id]: !prev[card.id],
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#37352F] truncate">
                        {card.topic}
                      </p>
                      <p className="text-[11px] font-mono text-[#6E6D68]">
                        {card.interval}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-[11px] font-semibold shrink-0 ${
                        mastered ? 'text-[#0F7B6C]' : 'text-[#2383E2]'
                      }`}
                    >
                      {mastered ? 'Quiz Ready ✓' : 'Review Now'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'gpa-courses') {
    const courses = [
      { code: 'CS 201', title: 'Data Structures & Algorithms', credits: 4, pct: 94.2, gpa: '4.00', grade: 'A' },
      { code: 'STAT 210', title: 'Probability & Inference', credits: 4, pct: 92.8, gpa: '4.00', grade: 'A' },
      { code: 'ECON 104', title: 'Macroeconomic Policy', credits: 3, pct: 89.5, gpa: '3.70', grade: 'A-' },
      { code: 'PHIL 112', title: 'Logic & Critical Inquiry', credits: 3, pct: 95.0, gpa: '4.00', grade: 'A' },
    ];
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#0F7B6C]" />
            <span>Weighted Gradebook &amp; 4.0 GPA Rollup</span>
          </span>
          <span className="font-mono text-[11px] font-bold text-[#0F7B6C] tabular-nums">
            Term GPA 3.94 / 4.00
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="space-y-2.5">
            {courses.map((c) => (
              <div
                key={c.code}
                className="rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6]/70 px-3.5 py-2.5 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2 text-[12.5px]">
                  <div className="min-w-0">
                    <span className="font-mono font-bold text-[#37352F] mr-2">
                      {c.code}
                    </span>
                    <span className="text-[#52504A] truncate">{c.title}</span>
                  </div>
                  <div className="font-mono text-[12px] font-bold text-[#37352F] tabular-nums shrink-0">
                    {c.pct.toFixed(1)}% · {c.grade} ({c.gpa})
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#E9E9E7] overflow-hidden">
                  <div
                    style={{ width: `${c.pct}%` }}
                    className="h-full rounded-full bg-[#0F7B6C]"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F1F1EF] text-[12px] text-[#6E6D68] font-mono tabular-nums">
            <span>14 Credits · Dean&apos;s List Standing</span>
            <span className="text-[#37352F] font-semibold">
              Formula: sum(grade × credits) / 14
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Slide 04: Career Kanban & Student Budget
  return (
    <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
      <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
        <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-[#2383E2]" />
          <span>Internship Pipeline &amp; Monthly Budget</span>
        </span>
        <span className="font-mono text-[11px] tabular-nums">Summer 2027</span>
      </div>

      <div className="p-3.5 sm:p-5 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              stage: 'OA / Challenge',
              count: '3',
              items: ['Stripe SWE Intern', 'Figma Product'],
            },
            {
              stage: 'Interviewing',
              count: '2',
              items: ['Linear Design Eng', 'Vercel Frontend'],
            },
            {
              stage: 'Offer',
              count: '1',
              items: ['Notion Campus Fellow'],
            },
          ].map((col) => (
            <div
              key={col.stage}
              className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] p-2.5 space-y-2"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#52504A]">
                <span className="truncate">{col.stage}</span>
                <span className="font-mono text-[#2383E2]">{col.count}</span>
              </div>
              <div className="space-y-1.5">
                {col.items.map((role) => (
                  <div
                    key={role}
                    className="rounded-[7px] bg-white border border-[#E9E9E7] px-2.5 py-2 text-[11.5px] font-semibold text-[#37352F] leading-snug"
                  >
                    {role}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-3.5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Wallet className="w-4 h-4 text-[#0F7B6C] shrink-0" />
            <div>
              <p className="text-[12.5px] font-semibold text-[#37352F]">
                Monthly Student Budget
              </p>
              <p className="text-[11.5px] text-[#6E6D68]">
                Housing, Dining, Books &amp; Transit
              </p>
            </div>
          </div>
          <div className="text-right font-mono tabular-nums">
            <p className="text-[13px] font-bold text-[#37352F]">$640 / $950</p>
            <p className="text-[11px] text-[#0F7B6C] font-semibold">
              $310 remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StudentOsShowcaseProps {
  activeViewFilter?: StudentStudioFilterId;
  onViewFilterChange?: (next: StudentStudioFilterId) => void;
  onOpenBuy?: () => void;
  isOwned?: boolean;
  price?: number;
  compareAt?: number;
}

export const StudentOsShowcase: React.FC<StudentOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
  onOpenBuy,
  isOwned = false,
  price = 39,
  compareAt = 59,
}) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const deckSlides: FlagshipDeckSlideItem[] = STUDENT_OS_SLIDES.map((slide) => ({
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
    renderVisual: () => <StudentSlideVisual slideId={slide.id} />,
  }));

  return (
    <div data-testid="student-os-details-showcase" className="space-y-10">
      {/* Header Row */}
      <div className="space-y-2">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#0F7B6C]">
          Interactive Preview
        </p>
        <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          Test the live workspace — 10 modules, 12 linked databases.
        </h2>
        <p className="text-[15px] text-[#52504A] leading-[1.55] max-w-[660px]">
          Click through Courses, Recall Notes, Internships, and Budget below before you duplicate.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <StudentOsWorkspaceTabs
        onOpenBuy={onOpenBuy}
        priceLabel={isOwned ? 'Open Delivery' : `Duplicate for $${price}`}
      />

      {/* Interactive 4-Slide Product Tour Deck */}
      <FlagshipSlideDeck
        deckId="student-os-studio-views"
        osName="Student OS"
        accentColor="#0F7B6C"
        price={price}
        compareAt={compareAt}
        isOwned={isOwned}
        onOpenBuy={onOpenBuy}
        sectionKicker="4 Core Views"
        sectionTitle="Built for exam week — not just syllabus week."
        sectionSubtitle=""
        slides={deckSlides}
        controlledSlideId={activeViewFilter}
        onControlledSlideChange={(next) => {
          if (onViewFilterChange) {
            onViewFilterChange(next as StudentStudioFilterId);
          }
        }}
        testIdPrefix="student-os"
      />

      {/* Collapsible 8 Ready-to-Use Page Templates Included */}
      <div
        data-testid="student-os-templates-included"
        className="rounded-[16px] bg-[#FAF9F6] border border-[#E9E9E7] overflow-hidden"
      >
        <button
          type="button"
          data-testid="student-os-templates-toggle"
          aria-expanded={showTemplates}
          onClick={() => setShowTemplates((v) => !v)}
          className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-[#F4F3F0] transition-colors cursor-pointer"
        >
          <div className="space-y-0.5 min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#0F7B6C]">
              One-Click Notion Templates · Free Plan Compatible
            </p>
            <h4 className="font-display text-[17px] sm:text-[19px] font-bold tracking-[-0.02em] text-[#37352F]">
              Includes {STUDENT_OS_SPEC.readyTemplates.length} ready-to-use page templates
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
            {STUDENT_OS_SPEC.readyTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-[12px] bg-white border border-[#E9E9E7] p-3.5 space-y-1"
              >
                <div className="flex items-center gap-2 text-[#37352F]">
                  <FileText className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
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
