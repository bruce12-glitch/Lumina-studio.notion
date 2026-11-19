import React, { useEffect, useState } from 'react';
import { Check, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ResearcherOsWorkspaceTabs } from './ResearcherOsWorkspaceTabs';
import { ResearcherOsStudioSpread } from './ResearcherOsStudioSpread';

export type ResearcherStudioFilterId = 'all' | 'synthesis' | 'lab-grants';

export interface ResearcherOsSlide {
  id: 'synthesis' | 'lab-grants';
  label: string;
  badge: string;
  title: string;
  description: string;
  includedModules: { title: string; details: string }[];
}

export const RESEARCHER_OS_SLIDES: ResearcherOsSlide[] = [
  {
    id: 'synthesis',
    label: '01 · Command, Synthesis & Manuscripts',
    badge: 'Capture -> Screen -> Write',
    title:
      'Research Command Hub, Atomic Vault & Active Manuscripts Writing Progress',
    description:
      'Move seamlessly from raw arXiv inbox capture and literature screening to citable Zettelkasten notes, live word-count pacing, and IMRaD drafting milestones.',
    includedModules: [
      {
        title: 'Research Command Hub',
        details:
          'Capture → Screen → Synthesize → Experiment → Write → Review toolbar with live manuscript counts, open reviewer comments, and reading queue.',
      },
      {
        title: 'Literature Review Synthesis Matrix',
        details:
          'Compare methodology, datasets, sample sizes, key empirical findings, and research gaps across 50+ papers with BibTeX & DOI links.',
      },
      {
        title: 'Atomic Synthesis Vault (Zettelkasten)',
        details:
          'One claim per note (Definition, Counter-Argument, Limitation, Core Claim) linked directly to source papers and manuscript sections.',
      },
      {
        title: 'Active Manuscripts & IMRaD Writing Progress',
        details:
          'Tracks word-count progress bars, venue cutoffs (ACL, TACL, NeurIPS), and section states from Outline to Polished.',
      },
      {
        title: 'Visual Insights & Quick Capture Inbox',
        details:
          'Word-count progress bars, Goal Health status ring, and a fast triage inbox for citations, ablation ideas, and preprints.',
      },
    ],
  },
  {
    id: 'lab-grants',
    label: '02 · Lab Experiments, Peer Review & Grants',
    badge: 'Runs, Rebuttals & 14 DBs',
    title:
      'Experiments Workbench, Peer Review Rebuttals, Grants & 14 Databases',
    description:
      'Keep every random seed, SOP protocol, reviewer critique, advisor 1:1 action item, and funding CFP cutoff synchronized across one reproducible academic backend.',
    includedModules: [
      {
        title: 'Hypotheses & Claims Register',
        details:
          'Falsifiable H1/H0 predictions with independent/dependent variables and pre-registration links.',
      },
      {
        title: 'Experiments & Versioned Lab Protocols',
        details:
          'Auditable run log tracking random seeds, parameters, anomalies, and versioned SOPs.',
      },
      {
        title: 'Datasets, Code Repos & Baselines',
        details:
          'Provenance catalog recording splits, licenses, Zenodo DOIs, Git commit SHAs, and SOTA benchmarks.',
      },
      {
        title: 'Reviewer Comments & Action Items',
        details:
          'Weekly Advisor Sync, Lab Seminar Dry Run agendas, and itemized reviewer severity matrix linked to follow-up runs.',
      },
      {
        title: 'Grants, CFP Venues & 14 Connected Databases',
        details:
          'RFPs, compute/travel budgets, co-author ORCID directory, Paper Launch Blueprint, and Weekly Research Reset templates.',
      },
    ],
  },
];

export const RESEARCHER_OS_MODULE_GROUPS = RESEARCHER_OS_SLIDES.map((s) => ({
  id: s.id,
  label: s.label,
  badge: s.badge,
  items: s.includedModules,
}));

interface ResearcherOsShowcaseProps {
  activeViewFilter?: ResearcherStudioFilterId;
  onViewFilterChange?: (next: ResearcherStudioFilterId) => void;
}

export const ResearcherOsShowcase: React.FC<ResearcherOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
}) => {
  const [internalFilter, setInternalFilter] =
    useState<ResearcherStudioFilterId>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterId = activeViewFilter ?? internalFilter;
  const setFilterId = (next: ResearcherStudioFilterId) => {
    if (onViewFilterChange) {
      onViewFilterChange(next);
    } else {
      setInternalFilter(next);
    }
  };

  const visibleSlides =
    filterId === 'all'
      ? RESEARCHER_OS_SLIDES
      : RESEARCHER_OS_SLIDES.filter((slide) => slide.id === filterId);

  const lightboxSlide =
    lightboxIndex !== null ? RESEARCHER_OS_SLIDES[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % RESEARCHER_OS_SLIDES.length
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + RESEARCHER_OS_SLIDES.length) %
              RESEARCHER_OS_SLIDES.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  return (
    <div data-testid="researcher-os-details-showcase" className="space-y-10">
      {/* Header Row Matching Freelancer OS */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
          Inside Researcher OS · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          1 Research Hub, 12 Modules, 14 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Researcher OS includes a main research hub, 12 synthesis, lab, and publishing modules, 14 interconnected databases, and 8 ready-to-use academic templates. Explore every section live below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <ResearcherOsWorkspaceTabs />

      {/* Studio Workspace Views Section (Matching FreelanceOsGallery & StudentOsShowcase) */}
      <div
        id="researcher-os-studio-views"
        data-testid="researcher-os-studio-views"
        className="scroll-mt-24 space-y-6 pt-4 border-t border-[#E9E9E7]"
      >
        <div className="space-y-1">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#37352F]">
            Studio Workspace Views
          </h3>
          <p className="text-[14.5px] text-[#6E6D68]">
            Click any workspace preview below to inspect the full-screen layout.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Researcher OS Studio Previews"
          className="flex flex-wrap items-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={filterId === 'all'}
            data-testid="researcher-os-tab-all"
            onClick={() => setFilterId('all')}
            className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              filterId === 'all'
                ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_6px_16px_-6px_rgba(55,53,47,0.28)]'
                : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F]'
            }`}
          >
            All 2 Views (12 Modules)
          </button>

          {RESEARCHER_OS_SLIDES.map((slide) => {
            const isActive = filterId === slide.id;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`researcher-os-tab-${slide.id}`}
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

        {/* Vertically Stacked Studio Cards */}
        <div
          data-testid="researcher-os-all-images"
          className="flex flex-col gap-8"
        >
          {visibleSlides.map((slide) => {
            const slideIndex = RESEARCHER_OS_SLIDES.findIndex(
              (item) => item.id === slide.id
            );

            return (
              <article
                key={slide.id}
                data-testid={`researcher-os-card-${slide.id}`}
                className="rounded-[24px] bg-white border border-[#E9E9E7] shadow-[0_12px_36px_-16px_rgba(55,53,47,0.08)] overflow-hidden"
              >
                <div className="bg-[#F7F6F3] p-3 sm:p-5 border-b border-[#E9E9E7]">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(slideIndex)}
                    aria-label={`Inspect ${slide.title} workspace preview`}
                    className="group relative w-full rounded-[16px] overflow-hidden border border-[#E9E9E7] bg-[#DDD5C8] aspect-[16/9] cursor-zoom-in block text-left"
                  >
                    <div className="w-full h-full transition-transform duration-500 group-hover:scale-[1.012]">
                      <ResearcherOsStudioSpread variant={slide.id} />
                    </div>
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
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
                    <h3 className="font-display text-[21px] sm:text-[25px] font-bold tracking-[-0.025em] text-[#37352F] leading-snug">
                      {slide.title}
                    </h3>
                    <p className="text-[15px] text-[#52504A] leading-[1.6] max-w-[760px]">
                      {slide.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#F1F1EF]">
                    {slide.includedModules.map((mod) => (
                      <div
                        key={mod.title}
                        className="rounded-[12px] bg-[#F7F6F3] border border-[#E9E9E7] px-4 py-3.5 flex items-start gap-3"
                      >
                        <Check className="w-4 h-4 text-[#2383E2] shrink-0 mt-1" />
                        <div className="text-[14px] sm:text-[14.5px] leading-[1.55] text-[#52504A]">
                          <span className="font-semibold text-[#37352F]">
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
          data-testid="researcher-os-lightbox"
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-[100] bg-[#1F1E1B]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1280px] rounded-[20px] bg-white border border-[#E9E9E7] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[#E9E9E7] flex items-center justify-between gap-4 bg-[#F7F6F3]">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2383E2]">
                  {lightboxSlide.label} · {lightboxSlide.badge}
                </p>
                <h3 className="text-[16px] font-bold text-[#37352F] truncate">
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
                        : (prev - 1 + RESEARCHER_OS_SLIDES.length) %
                          RESEARCHER_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev + 1) % RESEARCHER_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close full-resolution preview"
                  onClick={() => setLightboxIndex(null)}
                  className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#1F1E1B] p-2 sm:p-4 flex items-center justify-center max-h-[82vh]">
              <div className="w-full max-w-[1180px] aspect-[16/9] rounded-[10px] overflow-hidden shadow-2xl">
                <ResearcherOsStudioSpread variant={lightboxSlide.id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
