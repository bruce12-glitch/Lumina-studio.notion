import React, { useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { ResearcherOsWorkspaceTabs } from './ResearcherOsWorkspaceTabs';
import { RESEARCHER_OS_SPEC } from '../data/researcherOsSpec';

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
      'Research Command Hub, Atomic Vault & Active Manuscripts Pipeline',
    description:
      'Move cleanly from arXiv reading triage and literature screening to citable Zettelkasten notes and section-by-section IMRaD drafting.',
    includedModules: [
      {
        title: 'Research Command Hub',
        details:
          'Capture → Screen → Synthesize → Experiment → Write → Review cockpit with reading queue and venue countdowns.',
      },
      {
        title: 'Literature Review Synthesis Matrix',
        details:
          'Compare methodology, sample size, key empirical findings, limitations, DOIs, and BibTeX across papers.',
      },
      {
        title: 'Atomic Synthesis Vault (Zettelkasten)',
        details:
          'One modular claim card per note linked directly to source papers and target manuscript sections.',
      },
      {
        title: 'Active Manuscripts & IMRaD Drafts',
        details:
          'Track word-count pacing, co-author sign-offs, Overleaf links, and section status from Outline to Polished.',
      },
      {
        title: 'Quick Capture & Reading Triage',
        details:
          'Fast inbox separating 5-minute paper skims from deep synthesis reads.',
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
      'Keep falsifiable hypotheses, versioned lab protocols, dataset hashes, reviewer critiques, and funding RFPs linked cleanly in one backend.',
    includedModules: [
      {
        title: 'Hypotheses & Claims Register',
        details:
          'Falsifiable H1/H0 predictions with independent/dependent variables and pre-registration links.',
      },
      {
        title: 'Experiments & Versioned Protocols',
        details:
          'Auditable trial run ledger capturing parameters, metrics, anomalies, and versioned SOPs.',
      },
      {
        title: 'Datasets, Code Repos & Baselines',
        details:
          'Provenance catalog tracking splits, licenses, Zenodo DOIs, Git commit SHAs, and SOTA benchmarks.',
      },
      {
        title: 'Peer Reviews & Rebuttals',
        details:
          'Point-by-point reviewer severity tracker assigning critiques directly to control runs and draft edits.',
      },
      {
        title: 'Grants, CFP Venues & Collaborators',
        details:
          'Funding pipelines, conference CFP deadlines, blind-review policies, and co-author ORCID directory.',
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

      {/* What Researcher OS Consists Of (Clean Structured Breakdown, No Images) */}
      <div
        id="researcher-os-studio-views"
        data-testid="researcher-os-studio-views"
        className="scroll-mt-24 space-y-6 pt-4 border-t border-[#E9E9E7]"
      >
        <div className="space-y-1">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#37352F]">
            What&apos;s Included Inside Researcher OS
          </h3>
          <p className="text-[14.5px] text-[#6E6D68]">
            A clear overview of every core module, connected database, and ready-to-use academic template.
          </p>
        </div>

        {/* Interactive Filter Tabs */}
        <div
          role="tablist"
          aria-label="Researcher OS Modules & Templates"
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
            All Modules &amp; Templates
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

        {/* Module Breakdown Cards */}
        <div
          data-testid="researcher-os-all-images"
          className="flex flex-col gap-6"
        >
          {visibleSlides.map((slide) => (
            <article
              key={slide.id}
              data-testid={`researcher-os-card-${slide.id}`}
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

        {/* 8 Ready-to-Use Academic Page Templates Included */}
        <div
          data-testid="researcher-os-templates-included"
          className="rounded-[24px] bg-[#FAF9F6] border border-[#E9E9E7] p-6 sm:p-8 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <p className="text-[11.5px] font-bold uppercase tracking-[0.07em] text-[#2383E2]">
                One-Click Notion Templates
              </p>
              <h4 className="font-display text-[20px] sm:text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
                8 Ready-to-Use Templates Inside Researcher OS
              </h4>
            </div>
            <span className="text-[13px] font-semibold text-[#52504A] bg-white border border-[#E9E9E7] px-3 py-1 rounded-[8px] self-start sm:self-auto">
              Works on Notion Free
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {RESEARCHER_OS_SPEC.readyTemplates.map((tpl) => (
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
