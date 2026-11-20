import React, { useState } from 'react';
import {
  BookOpen,
  Check,
  FileText,
  FlaskConical,
  Layers,
  MessageSquare,
} from 'lucide-react';
import { ResearcherOsWorkspaceTabs } from './ResearcherOsWorkspaceTabs';
import { RESEARCHER_OS_SPEC } from '../data/researcherOsSpec';
import {
  FlagshipDeckSlideItem,
  FlagshipSlideDeck,
} from './FlagshipSlideDeck';

export type ResearcherStudioFilterId =
  | 'all'
  | 'synthesis'
  | 'atomic-vault'
  | 'manuscripts'
  | 'lab-grants';

export interface ResearcherOsSlide {
  id: 'synthesis' | 'atomic-vault' | 'manuscripts' | 'lab-grants';
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

export const RESEARCHER_OS_SLIDES: ResearcherOsSlide[] = [
  {
    id: 'synthesis',
    stepNumber: '01',
    shortLabel: 'Research Cockpit',
    label: '01 · Command Hub & Reading Triage',
    badge: 'Capture -> Screen -> Write',
    title: 'Keep every paper, reading queue, and',
    editorialAccent: 'venue deadline aligned.',
    description:
      'Replace fragmented folders with a structured six-stage academic pipeline connecting your Quick Capture Inbox, screening queue, and upcoming CFP countdowns.',
    beforeText:
      'Hundreds of unread arXiv PDFs buried in Downloads with no clear triage order.',
    afterText:
      '5-minute paper skims separated cleanly from deep synthesis reads and active drafts.',
    highlightMetric: '6-Stage Pipeline · Quick Inbox',
    includedModules: [
      {
        title: 'Research Command Hub',
        details:
          'Capture -> Screen -> Synthesize -> Experiment -> Write -> Review cockpit with CFP countdowns.',
      },
      {
        title: 'Quick Capture & Reading Triage',
        details:
          'Fast inbox isolating citation checks, ablation ideas, and preprints to screen.',
      },
      {
        title: 'Weekly Research Reset',
        details:
          'Structured Friday checklist aligning advisor feedback, experiment runs, and writing targets.',
      },
    ],
  },
  {
    id: 'atomic-vault',
    stepNumber: '02',
    shortLabel: 'Atomic Vault',
    label: '02 · Atomic Synthesis & Lit Matrix',
    badge: 'Zettelkasten & BibTeX',
    title: 'Turn dense literature into citable',
    editorialAccent: 'atomic claims.',
    description:
      'Compare methodology, baselines, sample sizes, and limitations side-by-side—then distill each insight into one linked atomic claim ready to cite in your draft.',
    beforeText:
      'Re-reading 30-page PDFs to remember which paper proved a specific baseline limitation.',
    afterText:
      'Searchable Literature Matrix + Zettelkasten claim cards linked straight to manuscript sections.',
    highlightMetric: 'Lit Matrix · DOIs · Atomic Notes',
    includedModules: [
      {
        title: 'Literature Review Synthesis Matrix',
        details:
          'Compare methodology, datasets, key empirical findings, limitations, DOIs, and BibTeX keys.',
      },
      {
        title: 'Atomic Synthesis Vault (Zettelkasten)',
        details:
          'One modular claim per note tagged by Core Claim, Counter-Argument, or Gap and linked to drafts.',
      },
      {
        title: 'Glossary & Notation Register',
        details:
          'Define every symbol, metric, and baseline once so terminology stays consistent across papers.',
      },
    ],
  },
  {
    id: 'manuscripts',
    stepNumber: '03',
    shortLabel: 'Manuscripts',
    label: '03 · Active Manuscripts & IMRaD',
    badge: 'Section-Level Pacing',
    title: 'Ship submission-ready papers with',
    editorialAccent: 'calm IMRaD pacing.',
    description:
      'Track every manuscript in flight from outline to camera-ready—monitor word-count budgets, section readiness, Overleaf links, and co-author sign-offs at a glance.',
    beforeText:
      'Last-week submission crunch with untracked sections and conflicting co-author edits.',
    afterText:
      'Live section progress bars, target venue deadlines, and clear draft ownership.',
    highlightMetric: 'IMRaD Tracker · Word Count Bars',
    includedModules: [
      {
        title: 'Active Manuscripts Pipeline',
        details:
          'Live word-count pacing, submission stage, Overleaf link, and target conference/journal deadlines.',
      },
      {
        title: 'IMRaD Section Tracker',
        details:
          'Track Abstract, Related Work, Methodology, and Experiments independently from Outline to Polished.',
      },
      {
        title: 'Paper Launch Blueprint',
        details:
          'Pre-configured checklist covering LaTeX anonymization, ethics statement, and artifact release.',
      },
    ],
  },
  {
    id: 'lab-grants',
    stepNumber: '04',
    shortLabel: 'Lab & Reviews',
    label: '04 · Lab Runs, Rebuttals & Grants',
    badge: 'Reproducibility & 14 DBs',
    title: 'Connect lab experiments directly to',
    editorialAccent: 'peer-review rebuttals.',
    description:
      'Log falsifiable hypotheses, versioned lab protocols, dataset hashes, and Git SHAs—then assign reviewer critiques directly to control experiments and draft revisions.',
    beforeText:
      'Untraceable experiment spreadsheets and stressful rebuttal periods before reviewer deadlines.',
    afterText:
      'Auditable trial ledger, severity-ranked reviewer action tracker, and funding CFP calendar.',
    highlightMetric: 'Protocols · Rebuttals · 14 Linked DBs',
    includedModules: [
      {
        title: 'Experiments, Protocols & Datasets',
        details:
          'Auditable trial runs capturing hyperparameters, metrics, dataset DOIs, and Git commit SHAs.',
      },
      {
        title: 'Peer Reviews & Rebuttals',
        details:
          'Point-by-point reviewer severity tracker linking each critique to control runs and paper edits.',
      },
      {
        title: 'Grants, CFPs & Collaborators',
        details:
          'Funding RFPs, conference submission cutoffs, blind-review policies, and co-author ORCID directory.',
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

/* Crisp Interactive Notion Preview Canvases for Researcher OS */
const ResearcherSlideVisual: React.FC<{
  slideId: ResearcherOsSlide['id'];
}> = ({ slideId }) => {
  const [resolvedCritiques, setResolvedCritiques] = useState<
    Record<string, boolean>
  >({
    c1: true,
    c2: false,
    c3: false,
  });

  if (slideId === 'synthesis') {
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Researcher OS / Command Cockpit</span>
          </span>
          <span className="font-mono text-[11px] text-[#2383E2] font-semibold">
            ACL 2027 · 42d left
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-semibold text-[#52504A] bg-[#FAF9F6] border border-[#E9E9E7] rounded-[10px] px-3 py-2.5">
            {['Capture', 'Screen', 'Synthesize', 'Experiment', 'Write', 'Review'].map(
              (step, idx) => (
                <React.Fragment key={step}>
                  <span
                    className={
                      idx === 2 || idx === 4
                        ? 'text-[#2383E2] font-bold'
                        : 'text-[#37352F]'
                    }
                  >
                    {step}
                  </span>
                  {idx < 5 && (
                    <span aria-hidden="true" className="text-[#9B9A97]">
                      →
                    </span>
                  )}
                </React.Fragment>
              )
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {[
              { label: 'Manuscripts', value: '2 active' },
              { label: 'Reading', value: '12 papers' },
              { label: 'Critiques', value: '3 open' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-2.5 sm:px-3 py-2 sm:py-2.5"
              >
                <p className="text-[10.5px] sm:text-[11px] text-[#6E6D68] font-medium whitespace-nowrap truncate">
                  {item.label}
                </p>
                <p className="text-[13px] sm:text-[14.5px] font-bold text-[#37352F] tabular-nums whitespace-nowrap mt-0.5">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
            {[
              {
                title: 'Verify ECE bin count in calibration baseline',
                type: 'Citation Check',
                status: 'Inbox',
              },
              {
                title: 'Ablate entropy vs. margin as retrieval trigger',
                type: 'Experiment Idea',
                status: 'To Process',
              },
              {
                title: 'Selective Classification for Deep Neural Networks',
                type: 'Paper to Screen',
                status: '5-min Skim',
              },
            ].map((row) => (
              <div
                key={row.title}
                className="px-3.5 py-2.5 bg-white flex items-center justify-between gap-3 text-[12.5px]"
              >
                <span className="font-medium text-[#37352F] truncate">
                  {row.title}
                </span>
                <span className="font-mono text-[11px] text-[#6E6D68] shrink-0">
                  {row.type} · {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slideId === 'atomic-vault') {
    const claims = [
      {
        title: 'Expected Calibration Error as the calibration yardstick',
        kind: 'Framework · Refined',
        source: 'Guo et al. (ICML 2017)',
        section: 'Sec 2 · Related Work',
      },
      {
        title: 'Embedding similarity is not the same as faithfulness',
        kind: 'Counter-Argument · Synthesis',
        source: 'Maynez et al. (ACL 2020)',
        section: 'Sec 1 · Introduction',
      },
      {
        title: 'Always-on retrieval degrades low-entropy domain queries',
        kind: 'Limitation / Gap · Integrated',
        source: 'Lab Ablation Run #14',
        section: 'Sec 4 · Experiments',
      },
    ];
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Atomic Synthesis Vault · Linked Zettels</span>
          </span>
          <span className="font-mono text-[11px]">DOI + BibTeX Synced</span>
        </div>

        <div className="p-4 sm:p-5 space-y-2.5">
          {claims.map((claim) => (
            <div
              key={claim.title}
              className="rounded-[10px] border border-[#E9E9E7] bg-[#FAF9F6]/70 px-3.5 py-3 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-[#2383E2] font-semibold">{claim.kind}</span>
                <span className="text-[#6E6D68]">{claim.section}</span>
              </div>
              <p className="text-[13.5px] font-semibold text-[#37352F] leading-snug">
                {claim.title}
              </p>
              <p className="text-[11.5px] text-[#6E6D68]">
                Source: <span className="text-[#52504A] font-medium">{claim.source}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slideId === 'manuscripts') {
    const sections = [
      { title: '1. Abstract & Introduction', status: 'Polished', words: '900 / 1,000 w', pct: 90 },
      { title: '2. Related Work', status: 'Revising', words: '1,350 / 1,500 w', pct: 90 },
      { title: '3. Methodology', status: 'Drafting', words: '1,500 / 2,000 w', pct: 75 },
      { title: '4. Experiments & Results', status: 'Outline', words: '300 / 2,500 w', pct: 12 },
    ];
    return (
      <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
        <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
          <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Active Manuscripts / IMRaD Section Tracker</span>
          </span>
          <span className="font-mono text-[11px] font-bold text-[#2383E2] tabular-nums">
            4,050 / 7,000 w (58%)
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-3.5 py-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-[#37352F] truncate">
                Uncertainty-Aware Retrieval for Low-Resource Domains
              </p>
              <p className="text-[11.5px] text-[#6E6D68]">
                Target Venue: ACL 2027 · Deadline Feb 15, 2027
              </p>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] shrink-0">
              Drafting
            </span>
          </div>

          <div className="space-y-2">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="rounded-[9px] border border-[#E9E9E7] px-3.5 py-2.5 space-y-1.5 bg-white"
              >
                <div className="flex items-center justify-between gap-2 text-[12px]">
                  <span className="font-semibold text-[#37352F]">{sec.title}</span>
                  <span className="font-mono text-[11px] text-[#6E6D68] tabular-nums">
                    {sec.status} · {sec.words}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#EFEFED] overflow-hidden">
                  <div
                    style={{ width: `${sec.pct}%` }}
                    className={`h-full rounded-full ${
                      sec.pct >= 85 ? 'bg-[#0F7B6C]' : 'bg-[#2383E2]'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Slide 04: Experiments & Peer Review Rebuttals
  return (
    <div className="rounded-[14px] bg-white border border-[#E9E9E7] shadow-[0_6px_22px_-12px_rgba(55,53,47,0.14)] overflow-hidden text-left">
      <div className="px-4 py-2.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] text-[#6E6D68]">
        <span className="font-semibold text-[#37352F] inline-flex items-center gap-1.5">
          <FlaskConical className="w-3.5 h-3.5 text-[#0F7B6C]" />
          <span>Lab Runs &amp; Reviewer Rebuttal Tracker</span>
        </span>
        <span className="font-mono text-[11px] tabular-nums">SHA 9f4c2a1</span>
      </div>

      <div className="p-4 sm:p-5 space-y-3.5">
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 font-mono">
          {[
            { label: 'Run #14 ECE', value: '0.031' },
            { label: 'Macro F1', value: '86.4%' },
            { label: 'Seeds', value: '3 / 3' },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-[10px] bg-[#FAF9F6] border border-[#E9E9E7] px-2.5 sm:px-3 py-2"
            >
              <p className="text-[10px] sm:text-[10.5px] text-[#6E6D68] whitespace-nowrap truncate">
                {m.label}
              </p>
              <p className="text-[12.5px] sm:text-[13.5px] font-bold text-[#37352F] tabular-nums whitespace-nowrap mt-0.5">
                {m.value}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <p className="text-[11.5px] font-semibold text-[#6E6D68] inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#2383E2]" />
            <span>Peer Review Action Items (click to mark addressed)</span>
          </p>
          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[10px] overflow-hidden">
            {[
              {
                id: 'c1',
                item: 'Re-run always-on retrieval baseline across 3 random seeds',
                severity: 'Minor',
              },
              {
                id: 'c2',
                item: 'Justify excluding BERTScore from faithfulness benchmark',
                severity: 'Major',
              },
              {
                id: 'c3',
                item: 'Report per-class calibration error in Appendix Table B',
                severity: 'Major',
              },
            ].map((crit) => {
              const done = !!resolvedCritiques[crit.id];
              return (
                <button
                  key={crit.id}
                  type="button"
                  onClick={() =>
                    setResolvedCritiques((prev) => ({
                      ...prev,
                      [crit.id]: !prev[crit.id],
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
                    <span
                      className={`text-[12.5px] font-medium truncate ${
                        done ? 'line-through text-[#9B9A97]' : 'text-[#37352F]'
                      }`}
                    >
                      {crit.item}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-semibold shrink-0 ${
                      done
                        ? 'text-[#0F7B6C]'
                        : crit.severity === 'Major'
                        ? 'text-[#C43B3B]'
                        : 'text-[#6E6D68]'
                    }`}
                  >
                    {done ? 'Resolved' : crit.severity}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ResearcherOsShowcaseProps {
  activeViewFilter?: ResearcherStudioFilterId;
  onViewFilterChange?: (next: ResearcherStudioFilterId) => void;
  onOpenBuy?: () => void;
  isOwned?: boolean;
  price?: number;
  compareAt?: number;
}

export const ResearcherOsShowcase: React.FC<ResearcherOsShowcaseProps> = ({
  activeViewFilter,
  onViewFilterChange,
  onOpenBuy,
  isOwned = false,
  price = 49,
  compareAt = 69,
}) => {
  const deckSlides: FlagshipDeckSlideItem[] = RESEARCHER_OS_SLIDES.map(
    (slide) => ({
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
      renderVisual: () => <ResearcherSlideVisual slideId={slide.id} />,
    })
  );

  return (
    <div data-testid="researcher-os-details-showcase" className="space-y-12">
      {/* Header Row */}
      <div className="space-y-3">
        <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
          Inside Researcher OS · Live Interactive Workspace
        </p>
        <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
          1 Research Hub, 12 Modules, 14 Interconnected Databases
        </h2>
        <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6] max-w-[700px]">
          Explore the live academic workspace below—switch between Manuscripts, Synthesis Vault, Experiments, and Peer Review to inspect every database view.
        </p>
      </div>

      {/* Interactive Notion Workspace Explorer */}
      <ResearcherOsWorkspaceTabs
        onOpenBuy={onOpenBuy}
        priceLabel={isOwned ? 'Open Delivery' : `Duplicate for $${price}`}
      />

      {/* Interactive 4-Slide Product Tour Deck */}
      <FlagshipSlideDeck
        deckId="researcher-os-studio-views"
        osName="Researcher OS"
        accentColor="#2383E2"
        price={price}
        compareAt={compareAt}
        isOwned={isOwned}
        onOpenBuy={onOpenBuy}
        sectionKicker="Guided Product Tour · 4 Research Pillars"
        sectionTitle="From raw literature to published manuscript, cleanly linked."
        sectionSubtitle="Step through each interactive slide to inspect the Zettelkasten claim vault, IMRaD writing tracker, reproducible lab ledger, and reviewer rebuttal workflow."
        slides={deckSlides}
        controlledSlideId={activeViewFilter}
        onControlledSlideChange={(next) => {
          if (onViewFilterChange) {
            onViewFilterChange(next as ResearcherStudioFilterId);
          }
        }}
        testIdPrefix="researcher-os"
      />

      {/* 8 Ready-to-Use Academic Page Templates Included */}
      <div
        data-testid="researcher-os-templates-included"
        className="rounded-[20px] bg-[#FAF9F6] border border-[#E9E9E7] p-6 sm:p-8 space-y-5"
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
          <span className="text-[13px] font-medium text-[#6E6D68]">
            Works on Notion Free plan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RESEARCHER_OS_SPEC.readyTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-[12px] bg-white border border-[#E9E9E7] hover:border-[#C7C5BE] transition-colors p-4 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-[#37352F]">
                <FileText className="w-4 h-4 text-[#2383E2] shrink-0" />
                <h5 className="text-[14px] font-semibold leading-snug">
                  {tpl.title}
                </h5>
              </div>
              <p className="text-[11.5px] font-mono text-[#6E6D68]">
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
  );
};
