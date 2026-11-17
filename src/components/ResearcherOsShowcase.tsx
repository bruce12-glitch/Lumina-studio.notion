import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { ResearcherOsWorkspaceTabs } from './ResearcherOsWorkspaceTabs';

export type ResearcherStudioFilterId = 'all' | 'synthesis' | 'lab-grants';

export const RESEARCHER_OS_MODULE_GROUPS = [
  {
    id: 'synthesis' as const,
    label: '01 · Command, Synthesis & Manuscripts',
    badge: 'Capture -> Screen -> Write',
    items: [
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
          'Word-count progress charts, goal-health ring, and a fast triage inbox for citations, ablation ideas, and preprints.',
      },
    ],
  },
  {
    id: 'lab-grants' as const,
    label: '02 · Lab Experiments, Peer Review & Grants',
    badge: 'Runs, Rebuttals & 14 DBs',
    items: [
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
          'Weekly Advisor Sync, Lab Seminar Dry Run cards, and itemized reviewer severity matrix linked to follow-up runs.',
      },
      {
        title: 'Grants, CFP Venues & 14 Connected Databases',
        details:
          'RFPs, compute/travel budgets, co-author ORCID directory, Paper Launch Blueprint, and Weekly Research Reset templates.',
      },
    ],
  },
];

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
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filterId = activeViewFilter ?? internalFilter;
  const setFilterId = (next: ResearcherStudioFilterId) => {
    if (onViewFilterChange) {
      onViewFilterChange(next);
    } else {
      setInternalFilter(next);
    }
  };

  const visibleItems =
    filterId === 'all'
      ? RESEARCHER_OS_MODULE_GROUPS.flatMap((g) => g.items)
      : RESEARCHER_OS_MODULE_GROUPS.find((g) => g.id === filterId)?.items ?? [];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <div data-testid="researcher-os-details-showcase" className="space-y-10">
      {/* Header Row Matching Freelancer OS */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
          Inside Researcher OS · Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A] text-balance">
          1 Research Hub, 12 Modules, 14 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Researcher OS includes a main research hub, 12 synthesis, lab, and publishing modules, 14 interconnected databases, and 8 ready-to-use academic templates. Explore every section live below.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <ResearcherOsWorkspaceTabs />

      {/* Studio Workspace Views Section (Matching FreelanceOsGallery) */}
      <div
        id="researcher-os-studio-views"
        data-testid="researcher-os-studio-views"
        className="scroll-mt-24 space-y-6 pt-4 border-t border-[#E2E8F0]"
      >
        <div className="space-y-1">
          <h3 className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#0F172A]">
            Studio Workspace Views
          </h3>
          <p className="text-[14.5px] text-[#64748B]">
            Click the workspace preview below to inspect the full-screen layout.
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
                ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }`}
          >
            All Views (12 Modules)
          </button>

          {RESEARCHER_OS_MODULE_GROUPS.map((group) => {
            const isActive = filterId === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`researcher-os-tab-${group.id}`}
                onClick={() => setFilterId(group.id)}
                className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                    : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Single Clean Studio Card Matching Freelancer OS */}
        <article
          data-testid="researcher-os-card-overview"
          className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-16px_rgba(15,23,42,0.08)] overflow-hidden"
        >
          <div className="bg-[#F8FAFC] p-3 sm:p-5 border-b border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Inspect Researcher OS workspace overview preview"
              className="group relative w-full rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-white aspect-[16/9] cursor-zoom-in block text-left"
            >
              <img
                src="/assets/aistudio/image_1a6c6ccd.png"
                alt="Researcher OS studio overview showing Visual Insights, Active Manuscripts & Writing Progress, Atomic Synthesis Vault, Quick Capture Inbox, and Reviewer Comments"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover showcase-hd-image transition-transform duration-500 group-hover:scale-[1.012]"
              />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#1D6EE3]">
                <span>01 · End-to-End Academic Workspace</span>
                <span aria-hidden="true" className="text-[#94A3B8]">·</span>
                <span className="text-[#64748B] font-medium">
                  Synthesis, Lab & Manuscripts
                </span>
              </div>
              <h3 className="font-display text-[21px] sm:text-[25px] font-bold tracking-[-0.025em] text-[#0F172A] leading-snug">
                Literature Synthesis, Atomic Vault, Active Manuscripts & Peer Review
              </h3>
              <p className="text-[15px] text-[#52504A] leading-[1.6] max-w-[760px]">
                Move seamlessly from raw arXiv inbox capture and literature screening to citable Zettelkasten notes, reproducible experiment runs, IMRaD drafts, and itemized reviewer rebuttals.
              </p>
            </div>

            <div className="space-y-3 pt-2 border-t border-[#F1F5F9]">
              {visibleItems.map((mod) => (
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
      </div>

      {/* Full-Resolution Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Researcher OS studio overview full-resolution preview"
          data-testid="researcher-os-lightbox"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-[#0F172A]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1280px] rounded-[20px] bg-white border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-5 py-3.5 border-b border-[#E2E8F0] flex items-center justify-between gap-4 bg-[#F8FAFC]">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#1D6EE3]">
                  Researcher OS · Complete Academic Workspace
                </p>
                <h3 className="text-[16px] font-bold text-[#0F172A] truncate">
                  Visual Insights, Active Manuscripts, Atomic Synthesis & Peer Review
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close full-resolution preview"
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#0F172A] p-2 sm:p-4 flex items-center justify-center max-h-[80vh]">
              <img
                src="/assets/aistudio/image_1a6c6ccd.png"
                alt="Researcher OS studio overview"
                className="max-w-full max-h-[74vh] w-auto h-auto rounded-[10px] showcase-hd-image object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
