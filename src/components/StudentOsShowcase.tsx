import React, { useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { StudentOsWorkspaceTabs } from './StudentOsWorkspaceTabs';
import { STUDENT_OS_SPEC } from '../data/studentOsSpec';

export type StudentStudioFilterId = 'all' | 'hub-career' | 'toolkit-wellness';

export interface StudentOsSlide {
  id: 'hub-career' | 'toolkit-wellness';
  label: string;
  badge: string;
  title: string;
  description: string;
  includedModules: { title: string; details: string }[];
}

export const STUDENT_OS_SLIDES: StudentOsSlide[] = [
  {
    id: 'hub-career',
    label: '01 · Hub Navigation, Career & Finance',
    badge: 'Command & Life Systems',
    title: 'Student Command Hub, Career Pipeline, Contacts & Student Finance',
    description:
      'Manage classes, assignments, internship applications, faculty contacts, and monthly student budgets from one connected workspace.',
    includedModules: [
      {
        title: 'Main Hub (Student OS Pro)',
        details:
          'Quick Nav links, 7-Day deadline alerts, enrolled course progress, and a Sunday weekly review checklist.',
      },
      {
        title: 'Courses, Syllabi & Deliverables',
        details:
          'Dedicated course hubs linking grading weights, reading lists, and deadlines automatically.',
      },
      {
        title: 'Career & Internships Kanban',
        details:
          'Track applications across Wishlist, Applied, OA / Challenge, Interviewing, and Offer.',
      },
      {
        title: 'Contacts & Faculty Directory',
        details:
          'Store professor office hours, departments, emails, recruiters, and linked courses.',
      },
      {
        title: 'Student Finance & Wellness',
        details:
          'Monthly spending caps, scholarship deadlines, daily sleep check-ins, and habit tracking.',
      },
    ],
  },
  {
    id: 'toolkit-wellness',
    label: '02 · Study Toolkit, Recall & Templates',
    badge: 'Focus, Exams & Notes',
    title:
      'Study Toolkit, Cornell Lecture Notes, Spaced Repetition & Weighted GPA',
    description:
      'Pair active-recall flashcards and exam sprints with deep-work study timers and automatic credit-weighted GPA calculations.',
    includedModules: [
      {
        title: 'Cornell Lecture Notes',
        details:
          'Cue prompts, lecture takeaways, and First Pass / Quiz Ready review tracking.',
      },
      {
        title: 'Spaced Repetition Flashcards',
        details:
          'Automated 1 · 3 · 7 · 21 day recall queue filtered to topics due today.',
      },
      {
        title: 'Study Toolkit & Exam Sprints',
        details:
          '25/5 Pomodoro focus blocks, active recall checklists, and 14-day exam readiness trackers.',
      },
      {
        title: 'Weighted Gradebook & GPA Rollup',
        details:
          'Credit-weighted course score formulas rolling up into live term and cumulative GPA.',
      },
      {
        title: '12 Connected Databases + 8 Templates',
        details:
          'Everything works on the Notion Free plan across desktop, tablet, and mobile.',
      },
    ],
  },
];

interface StudentOsShowcaseProps {
  activeViewFilter?: StudentStudioFilterId;
  onViewFilterChange?: (next: StudentStudioFilterId) => void;
}

export const StudentOsShowcase: React.FC<StudentOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
}) => {
  const [internalFilter, setInternalFilter] =
    useState<StudentStudioFilterId>('all');

  const filterId = activeViewFilter ?? internalFilter;
  const setFilterId = (next: StudentStudioFilterId) => {
    if (onViewFilterChange) {
      onViewFilterChange(next);
    } else {
      setInternalFilter(next);
    }
  };

  const visibleSlides =
    filterId === 'all'
      ? STUDENT_OS_SLIDES
      : STUDENT_OS_SLIDES.filter((s) => s.id === filterId);

  return (
    <div data-testid="student-os-details-showcase" className="space-y-10">
      {/* Header Row Matching Freelancer OS */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
          Inside Student OS · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          1 Command Hub, 10 Modules, 12 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Student OS includes a main command-center hub, 10 academic and life modules, 12 interconnected databases, and 8 ready-to-use templates. Explore every section live below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <StudentOsWorkspaceTabs />

      {/* What Student OS Consists Of (Clean Structured Breakdown, No Images) */}
      <div
        id="student-os-studio-views"
        data-testid="student-os-studio-views"
        className="scroll-mt-24 space-y-6 pt-4 border-t border-[#E9E9E7]"
      >
        <div className="space-y-1">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#37352F]">
            What&apos;s Included Inside Student OS
          </h3>
          <p className="text-[14.5px] text-[#6E6D68]">
            A clear overview of every core module, connected database, and ready-to-use Notion template.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Student OS Modules & Templates"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterId === 'all'}
            data-testid="student-os-tab-all"
            onClick={() => setFilterId('all')}
            className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              filterId === 'all'
                ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_6px_16px_-6px_rgba(55,53,47,0.28)]'
                : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F]'
            }`}
          >
            All Modules &amp; Templates
          </button>

          {STUDENT_OS_SLIDES.map((slide) => {
            const isActive = filterId === slide.id;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`student-os-tab-${slide.id}`}
                onClick={() => setFilterId(slide.id)}
                className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_6px_16px_-6px_rgba(55,53,47,0.28)]'
                    : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F]'
                }`}
              >
                {slide.label}
              </button>
            );
          })}
        </div>

        {/* Module Breakdown Cards */}
        <div
          data-testid="student-os-all-images"
          className="flex flex-col gap-6"
        >
          {visibleSlides.map((slide) => (
            <article
              key={slide.id}
              data-testid={`student-os-card-${slide.id}`}
              className="rounded-[24px] bg-white border border-[#E9E9E7] shadow-[0_12px_36px_-16px_rgba(55,53,47,0.08)] p-6 sm:p-8 space-y-5"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#2383E2]">
                  <span>{slide.label}</span>
                  <span aria-hidden="true" className="text-[#9B9A97]">
                    ·
                  </span>
                  <span className="text-[#6E6D68] font-medium">
                    {slide.badge}
                  </span>
                </div>
                <h3 className="font-display text-[21px] sm:text-[24px] font-bold tracking-[-0.025em] text-[#37352F] leading-snug">
                  {slide.title}
                </h3>
                <p className="text-[15px] text-[#52504A] leading-[1.6] max-w-[760px]">
                  {slide.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-[#F1F1EF]">
                {slide.includedModules.map((mod, idx) => (
                  <div
                    key={mod.title}
                    className={`rounded-[12px] bg-[#F7F6F3] border border-[#E9E9E7] px-4 py-3.5 flex items-start gap-3 ${
                      idx === slide.includedModules.length - 1 &&
                      slide.includedModules.length % 2 === 1
                        ? 'md:col-span-2'
                        : ''
                    }`}
                  >
                    <Check className="w-4 h-4 text-[#2383E2] shrink-0 mt-1" />
                    <div className="text-[14px] leading-[1.55] text-[#52504A]">
                      <span className="font-semibold text-[#37352F]">
                        {mod.title}:
                      </span>{' '}
                      <span>{mod.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* 8 Ready-to-Use Page Templates Included */}
        <div
          data-testid="student-os-templates-included"
          className="rounded-[24px] bg-[#FAF9F6] border border-[#E9E9E7] p-6 sm:p-8 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-[#2383E2]">
                One-Click Notion Templates
              </p>
              <h4 className="font-display text-[20px] sm:text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
                8 Ready-to-Use Templates Inside Student OS
              </h4>
            </div>
            <span className="text-[13px] font-semibold text-[#52504A] bg-white border border-[#E9E9E7] px-3 py-1 rounded-[8px] self-start sm:self-auto">
              Works on Notion Free
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STUDENT_OS_SPEC.readyTemplates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-[14px] bg-white border border-[#E9E9E7] p-4 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[#37352F]">
                  <FileText className="w-4 h-4 text-[#2383E2] shrink-0" />
                  <h5 className="text-[14px] font-semibold leading-snug">
                    {tpl.title}
                  </h5>
                </div>
                <p className="text-[11.5px] font-semibold text-[#6E6D68]">
                  In {tpl.triggerContext}
                </p>
                <p className="text-[13px] text-[#52504A] leading-[1.45]">
                  {tpl.contains}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
