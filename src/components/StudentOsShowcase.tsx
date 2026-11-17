import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { StudentOsWorkspaceTabs } from './StudentOsWorkspaceTabs';

export type StudentStudioFilterId = 'all' | 'hub-career' | 'toolkit-wellness';

export interface StudentOsSlide {
  id: 'hub-career' | 'toolkit-wellness';
  label: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  includedModules: { title: string; details: string }[];
}

export const STUDENT_OS_SLIDES: StudentOsSlide[] = [
  {
    id: 'hub-career',
    label: '01 · Hub Navigation, Career & Finance',
    badge: 'Command & Life Systems',
    title: 'Student Command Hub, Career Pipeline, Contacts & Student Finance',
    description:
      'Navigate seamlessly across classes, assignments, internship applications, professor office hours, and monthly budgets from one calm cockpit.',
    image: '/assets/aistudio/image_b97dc4dd.png',
    includedModules: [
      {
        title: 'Main Hub (Student OS Pro)',
        details:
          'Quick Nav bar for Home, Career & Internships, Study & Academics, Health & Wellness, Student Finance, and Contacts & Faculty alongside live status pills.',
      },
      {
        title: 'Career & Internships Kanban',
        details:
          'Track roles across Wishlist, Applied, OA / Challenge, Interviewing, and Offer with strength priority tags and deadline sorting.',
      },
      {
        title: 'Contacts & Faculty Directory',
        details:
          'Stores professor emails, departments, office hours, recruiters, and linked courses or opportunities in one lookup table.',
      },
      {
        title: 'Health & Wellness Tracker',
        details:
          'Pairs Reading & Habit Library with a daily Wellness Log (mood, sleep hours trend chart, water glasses, and exercise check-ins).',
      },
      {
        title: 'Student Finance & Budgets',
        details:
          'Monitors monthly spending caps, savings percentages, On Track health rollups, and categorized campus transactions.',
      },
    ],
  },
  {
    id: 'toolkit-wellness',
    label: '02 · Study Toolkit, Recall & Insights',
    badge: 'Focus, Exams & Insights',
    title: 'Pomodoro Study Toolkit, Visual Insights, Spaced Repetition & Life Systems',
    description:
      'Time deep-work blocks with the built-in Pomodoro timer, stay ahead of exams with proven active-recall workflows, and monitor study minutes, deliverables, and spending charts.',
    image: '/assets/aistudio/image_70835d84.png',
    includedModules: [
      {
        title: 'Visual Insights Dashboard',
        details:
          'Live charts for Focus & Study Sessions per course, Master Deliverables status rings, and Finance Transactions category breakdowns.',
      },
      {
        title: 'Study Toolkit & Focus Timer',
        details:
          'Embedded 25:00 Pomodoro timer, visual Study Techniques cards (Pomodoro, Active Recall, Spaced Repetition 1/3/7/21d, Teach It), and an Exam Week Checklist.',
      },
      {
        title: 'Spaced Repetition & Courses',
        details:
          'Link lecture notes and deliverables directly to study logs so every completed session updates your course analytics automatically.',
      },
      {
        title: 'Life & Wellness Routines',
        details:
          'Combines active habits, reading reflections, daily sleep trend lines, and weekly review check-ins to prevent mid-semester burnout.',
      },
      {
        title: 'System Vault (12 Connected Databases)',
        details:
          'Includes 8 one-click Notion templates (Cornell notes, lab reports, essays, exam sprints, and Sunday weekly resets) compatible with Notion Free.',
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
  const [internalFilter, setInternalFilter] = useState<StudentStudioFilterId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const lightboxSlide =
    lightboxIndex !== null ? STUDENT_OS_SLIDES[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % STUDENT_OS_SLIDES.length
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + STUDENT_OS_SLIDES.length) % STUDENT_OS_SLIDES.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  return (
    <div data-testid="student-os-details-showcase" className="space-y-10">
      {/* Header Row Matching Freelancer OS */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
          Inside Student OS · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A] text-balance">
          1 Command Hub, 10 Modules, 12 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Student OS includes a main command-center hub, 10 academic and life modules, 12 interconnected databases, and 8 ready-to-use templates. Explore every section live below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <StudentOsWorkspaceTabs />

      {/* Studio Workspace Views Section (Matching FreelanceOsGallery) */}
      <div
        id="student-os-studio-views"
        data-testid="student-os-studio-views"
        className="scroll-mt-24 space-y-6 pt-4 border-t border-[#E2E8F0]"
      >
        <div className="space-y-1">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#0F172A]">
            Studio Workspace Views
          </h3>
          <p className="text-[14.5px] text-[#64748B]">
            Click any preview below to inspect the full-screen layout.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Student OS Studio Previews"
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
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            All 2 Views (10 Modules)
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
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                {slide.label}
              </button>
            );
          })}
        </div>

        {/* Vertically Stacked Studio Cards */}
        <div
          data-testid="student-os-all-images"
          className="flex flex-col gap-8"
        >
          {visibleSlides.map((slide) => {
            const slideIndex = STUDENT_OS_SLIDES.findIndex(
              (item) => item.id === slide.id
            );
            return (
              <article
                key={slide.id}
                data-testid={`student-os-card-${slide.id}`}
                className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-16px_rgba(15,23,42,0.08)] overflow-hidden"
              >
                <div className="bg-[#F8FAFC] p-3 sm:p-5 border-b border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(slideIndex)}
                    aria-label={`Inspect ${slide.title} workspace preview`}
                    className="group relative w-full rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-white aspect-[16/9] cursor-zoom-in block text-left"
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover showcase-hd-image transition-transform duration-500 group-hover:scale-[1.012]"
                    />
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#1D6EE3]">
                      <span>{slide.label}</span>
                      <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                      <span className="text-[#64748B] font-medium">{slide.badge}</span>
                    </div>
                    <h3 className="font-display text-[21px] sm:text-[25px] font-bold tracking-[-0.025em] text-[#0F172A] leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-[15px] text-[#52504A] leading-[1.6] max-w-[760px]">
                      {slide.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
                    {slide.includedModules.map((mod) => (
                      <div
                        key={mod.title}
                        className="rounded-[12px] bg-[#F8FAFC] border border-[#E2E8F0]/80 px-4 py-3.5 flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-[#1D6EE3] shrink-0 mt-1" />
                        <div className="text-[14px] sm:text-[14.5px] leading-[1.55] text-[#334155]">
                          <span className="font-semibold text-[#0F172A]">
                            {mod.title}:
                          </span>{' '}
                          <span>{mod.details}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Full-Resolution Lightbox Modal */}
      {lightboxSlide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxSlide.title} full-resolution preview`}
          data-testid="student-os-lightbox"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1280px] rounded-[20px] bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between gap-4 bg-[#F8FAFC]">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#1D6EE3]">
                  {lightboxSlide.label} · {lightboxSlide.badge}
                </p>
                <h3 className="text-[16px] font-bold text-[#0F172A] truncate">
                  {lightboxSlide.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev - 1 + STUDENT_OS_SLIDES.length) %
                          STUDENT_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % STUDENT_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close full-resolution preview"
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#0F172A] p-2 sm:p-4 flex items-center justify-center max-h-[80vh]">
              <img
                src={lightboxSlide.image}
                alt={lightboxSlide.title}
                className="max-w-full max-h-[74vh] w-auto h-auto rounded-[10px] showcase-hd-image object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
