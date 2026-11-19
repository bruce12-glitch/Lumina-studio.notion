import React from 'react';
import {
  BookOpen,
  Check,
  Database,
  FileCode2,
  FileText,
  FlaskConical,
  GitBranch,
  Inbox,
  Layers,
  MessageSquare,
  Microscope,
  Sparkles,
} from 'lucide-react';

interface ResearcherOsStudioSpreadProps {
  variant: 'synthesis' | 'lab-grants';
}

export const ResearcherOsStudioSpread: React.FC<
  ResearcherOsStudioSpreadProps
> = ({ variant }) => {
  return (
    <div
      style={{ containerType: 'inline-size' }}
      className="relative w-full h-full overflow-hidden select-none bg-[#DDD5C8]"
    >
      {/* Warm Editorial Linen Desk Backdrop & Afternoon Sunlit Diagonal Beams */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 12%, rgba(255,252,246,0.55) 0%, rgba(221,213,200,0) 58%), linear-gradient(128deg, #E3DCD0 0%, #D6CEC0 48%, #DFD8CB 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(118deg, rgba(255,253,248,0.42) 0%, rgba(255,253,248,0.16) 24%, rgba(96,86,72,0.09) 34%, rgba(96,86,72,0.03) 56%, rgba(255,252,245,0.28) 76%, rgba(96,86,72,0.08) 100%)',
        }}
      />

      {variant === 'synthesis' ? (
        /* =====================================================================
           SPREAD 01: COMMAND HUB, ACTIVE MANUSCRIPTS & ATOMIC SYNTHESIS VAULT
           ===================================================================== */
        <div className="relative w-full h-full">
          {/* SHEET 1 (Left Staggered): Researcher OS Command Hub */}
          <div className="absolute left-[2.4%] top-[5.5%] bottom-[5.5%] w-[32%] rounded-[1.05cqw] bg-[#FAF9F6] border border-[#DFDCD5] shadow-[0_1.3cqw_3cqw_-0.7cqw_rgba(45,41,34,0.24)] overflow-hidden flex flex-col">
            {/* Editorial Slate Cover Header */}
            <div className="h-[11.5%] bg-gradient-to-r from-[#586D84] via-[#677D94] to-[#748B9F] relative px-[1.8cqw] flex items-end">
              <div className="translate-y-[38%] w-[3.4cqw] h-[3.4cqw] rounded-[0.65cqw] bg-[#46596E] border-[0.2cqw] border-[#FAF9F6] shadow-sm flex items-center justify-center text-white">
                <Microscope className="w-[1.85cqw] h-[1.85cqw]" />
              </div>
            </div>

            <div className="pt-[2.2cqw] px-[1.8cqw] pb-[1.5cqw] space-y-[1.15cqw] flex-1 overflow-hidden">
              <div>
                <h4 className="font-display text-[2.05cqw] font-bold tracking-[-0.025em] text-[#2F2D28] leading-tight">
                  Researcher OS
                </h4>
                <p className="text-[0.88cqw] text-[#6E6D68] mt-[0.25cqw]">
                  Capture → Screen → Synthesize → Write
                </p>
              </div>

              {/* Quick KPI Status Pills */}
              <div className="flex flex-wrap gap-[0.45cqw]">
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#E8F1FA] text-[#1E5FA3] text-[0.82cqw] font-semibold">
                  Manuscripts: 2
                </span>
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#FDECE8] text-[#B4432C] text-[0.82cqw] font-semibold">
                  Reviews: 3
                </span>
                <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#F1EDF9] text-[#6645A8] text-[0.82cqw] font-semibold">
                  Queue: 12
                </span>
              </div>

              {/* Callout Box */}
              <div className="rounded-[0.6cqw] bg-[#EFECE5] border border-[#E2DFD7] px-[0.95cqw] py-[0.75cqw] text-[0.85cqw] text-[#37352F] leading-[1.42]">
                <span className="font-semibold">Paper Launch Blueprint:</span> Keep
                every hypothesis, literature note, and run linked to one active
                manuscript.
              </div>

              {/* Core Databases */}
              <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.95cqw] space-y-[0.65cqw]">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#6E6D68]">
                  Core Synthesis Databases
                </p>
                <div className="grid grid-cols-2 gap-x-[0.6cqw] gap-y-[0.5cqw] text-[0.86cqw] text-[#37352F] font-medium">
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <BookOpen className="w-[1cqw] h-[1cqw] text-[#2383E2] shrink-0" />
                    <span className="truncate">Literature</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <Sparkles className="w-[1cqw] h-[1cqw] text-[#7C3AED] shrink-0" />
                    <span className="truncate">Atomic Vault</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <FileText className="w-[1cqw] h-[1cqw] text-[#B45309] shrink-0" />
                    <span className="truncate">IMRaD Drafts</span>
                  </div>
                  <div className="flex items-center gap-[0.4cqw] truncate">
                    <Database className="w-[1cqw] h-[1cqw] text-[#15803D] shrink-0" />
                    <span className="truncate">14 Linked DBs</span>
                  </div>
                </div>
              </div>

              {/* Weekly Checklist */}
              <div className="space-y-[0.45cqw] text-[0.86cqw] text-[#52504A]">
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] bg-[#2383E2] text-white inline-flex items-center justify-center shrink-0">
                    <Check className="w-[0.65cqw] h-[0.65cqw]" />
                  </span>
                  <span className="line-through text-[#9B9A97] truncate">
                    Screen 4 new ACL preprints
                  </span>
                </div>
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] border border-[#C6C3BC] shrink-0" />
                  <span className="truncate">Synthesize 3 Zettel claims</span>
                </div>
                <div className="flex items-center gap-[0.5cqw]">
                  <span className="w-[1cqw] h-[1cqw] rounded-[0.22cqw] border border-[#C6C3BC] shrink-0" />
                  <span className="truncate">Finalize Section 3 (+500w)</span>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 2 (Center Elevated, Unobstructed!): Active Manuscripts & Atomic Vault */}
          <div className="absolute left-[33.4%] top-[8.5%] bottom-[4.2%] w-[36%] z-10 rounded-[1.05cqw] bg-white border border-[#DEDBD3] shadow-[0_1.5cqw_3.4cqw_-0.7cqw_rgba(45,41,34,0.28)] p-[1.7cqw] flex flex-col gap-[1.1cqw] overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-[#F1F1EF] pb-[0.75cqw]">
              <div className="min-w-0">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#2383E2]">
                  Manuscripts &amp; Synthesis
                </p>
                <h5 className="font-display text-[1.42cqw] font-bold text-[#2F2D28] leading-tight truncate">
                  Active Manuscripts
                </h5>
              </div>
              <span className="px-[0.65cqw] py-[0.25cqw] rounded-[0.4cqw] bg-[#F7F6F3] border border-[#E9E9E7] text-[0.78cqw] font-semibold text-[#52504A] shrink-0">
                ACL 2027
              </span>
            </div>

            {/* Active Paper IMRaD Sections Table */}
            <div className="rounded-[0.65cqw] border border-[#E9E9E7] overflow-hidden">
              <div className="bg-[#F7F6F3] px-[0.85cqw] py-[0.5cqw] grid grid-cols-12 text-[0.78cqw] font-semibold text-[#52504A] border-b border-[#E9E9E7]">
                <span className="col-span-6">Section</span>
                <span className="col-span-3 text-center">Stage</span>
                <span className="col-span-3 text-right">Words</span>
              </div>
              <div className="divide-y divide-[#F1F1EF] text-[0.82cqw]">
                <div className="px-[0.85cqw] py-[0.56cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    1. Abstract &amp; Intro
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.48cqw] py-[0.12cqw] rounded bg-[#E7F5EC] text-[#17693A] font-medium text-[0.72cqw]">
                      Polished
                    </span>
                  </div>
                  <span className="col-span-3 text-right tabular-nums text-[#6E6D68]">
                    900/1k
                  </span>
                </div>

                <div className="px-[0.85cqw] py-[0.56cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    2. Related Work
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.48cqw] py-[0.12cqw] rounded bg-[#FEF3C7] text-[#92400E] font-medium text-[0.72cqw]">
                      Revising
                    </span>
                  </div>
                  <span className="col-span-3 text-right tabular-nums text-[#6E6D68]">
                    1.3k/1.5k
                  </span>
                </div>

                <div className="px-[0.85cqw] py-[0.56cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    3. Methodology
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.48cqw] py-[0.12cqw] rounded bg-[#E0F2FE] text-[#0369A1] font-medium text-[0.72cqw]">
                      Drafting
                    </span>
                  </div>
                  <span className="col-span-3 text-right tabular-nums text-[#6E6D68]">
                    1.5k/2k
                  </span>
                </div>

                <div className="px-[0.85cqw] py-[0.56cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-6 font-medium truncate pr-1">
                    4. Experiments
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.48cqw] py-[0.12cqw] rounded bg-[#F1F1EF] text-[#52504A] font-medium text-[0.72cqw]">
                      Outline
                    </span>
                  </div>
                  <span className="col-span-3 text-right tabular-nums text-[#6E6D68]">
                    300/2.5k
                  </span>
                </div>
              </div>
            </div>

            {/* Atomic Synthesis Vault Grid */}
            <div className="space-y-[0.65cqw] flex-1">
              <div className="flex items-center justify-between">
                <p className="text-[1.02cqw] font-bold text-[#2F2D28]">
                  Atomic Synthesis Vault
                </p>
                <span className="text-[0.76cqw] text-[#6E6D68]">
                  1 claim per note
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[0.7cqw]">
                <div className="rounded-[0.6cqw] bg-[#FAF9F6] border border-[#E9E9E7] p-[0.82cqw] space-y-[0.45cqw]">
                  <p className="text-[0.84cqw] font-semibold text-[#37352F] leading-snug">
                    Expected Calibration Error as yardstick
                  </p>
                  <div className="flex flex-wrap gap-[0.3cqw]">
                    <span className="px-[0.42cqw] py-[0.12cqw] rounded bg-[#EBF3FC] text-[#1D63B8] text-[0.7cqw] font-medium">
                      Framework
                    </span>
                    <span className="px-[0.42cqw] py-[0.12cqw] rounded bg-[#E7F5EC] text-[#17693A] text-[0.7cqw] font-medium">
                      Refined
                    </span>
                  </div>
                </div>

                <div className="rounded-[0.6cqw] bg-[#FAF9F6] border border-[#E9E9E7] p-[0.82cqw] space-y-[0.45cqw]">
                  <p className="text-[0.84cqw] font-semibold text-[#37352F] leading-snug">
                    Cosine similarity ≠ factual faithfulness
                  </p>
                  <div className="flex flex-wrap gap-[0.3cqw]">
                    <span className="px-[0.42cqw] py-[0.12cqw] rounded bg-[#FEF3C7] text-[#92400E] text-[0.7cqw] font-medium">
                      Counter
                    </span>
                    <span className="px-[0.42cqw] py-[0.12cqw] rounded bg-[#F1F1EF] text-[#52504A] text-[0.7cqw] font-medium">
                      Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 3 (Right-Front Elevated, Unobstructed!): Visual Insights & Quick Capture */}
          <div className="absolute right-[2.4%] top-[5.2%] bottom-[6.2%] w-[29.5%] z-20 rounded-[1.05cqw] bg-[#FFFFFF] border border-[#DAD7CF] shadow-[0_1.7cqw_3.8cqw_-0.8cqw_rgba(45,41,34,0.3)] p-[1.65cqw] flex flex-col justify-between overflow-hidden">
            <div className="space-y-[1.05cqw]">
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-display text-[1.45cqw] font-bold text-[#2F2D28]">
                  Visual Insights
                </h5>
                <span className="px-[0.58cqw] py-[0.2cqw] rounded-[0.38cqw] bg-[#EBF3FC] text-[#1D63B8] text-[0.76cqw] font-semibold shrink-0">
                  Progress
                </span>
              </div>

              {/* Clean Word Count Bar Visual */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] space-y-[0.7cqw]">
                <p className="text-[0.84cqw] font-semibold text-[#52504A]">
                  Word Count Progress
                </p>
                <div className="space-y-[0.55cqw]">
                  <div>
                    <div className="flex justify-between text-[0.78cqw] text-[#37352F] mb-[0.22cqw]">
                      <span className="font-medium truncate">
                        Uncertainty Retrieval
                      </span>
                      <span className="font-bold tabular-nums">58%</span>
                    </div>
                    <div className="h-[0.68cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                      <div className="h-full w-[58%] rounded-full bg-[#4B9B6E]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[0.78cqw] text-[#37352F] mb-[0.22cqw]">
                      <span className="font-medium truncate">
                        Eval Benchmarks
                      </span>
                      <span className="font-bold tabular-nums">18%</span>
                    </div>
                    <div className="h-[0.68cqw] rounded-full bg-[#E8E6E0] overflow-hidden">
                      <div className="h-full w-[18%] rounded-full bg-[#2383E2]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crisp SVG Goal Health Ring */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] flex items-center gap-[1cqw]">
                <svg
                  viewBox="0 0 80 80"
                  className="w-[5.2cqw] h-[5.2cqw] shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#E8E6E0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#2383E2"
                    strokeWidth="10"
                    strokeDasharray="88 176"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#4B9B6E"
                    strokeWidth="10"
                    strokeDasharray="44 176"
                    strokeDashoffset="-88"
                    transform="rotate(-90 40 40)"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#D99B26"
                    strokeWidth="10"
                    strokeDasharray="44 176"
                    strokeDashoffset="-132"
                    transform="rotate(-90 40 40)"
                  />
                  <text
                    x="40"
                    y="39"
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill="#37352F"
                  >
                    4
                  </text>
                  <text
                    x="40"
                    y="51"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#6E6D68"
                  >
                    Sections
                  </text>
                </svg>
                <div className="space-y-[0.3cqw] min-w-0">
                  <p className="text-[0.92cqw] font-bold text-[#2F2D28]">
                    Goal Health
                  </p>
                  <div className="space-y-[0.18cqw] text-[0.76cqw] text-[#52504A]">
                    <div className="flex items-center gap-[0.38cqw]">
                      <span className="w-[0.5cqw] h-[0.5cqw] rounded-full bg-[#2383E2]" />
                      <span>Drafting (50%)</span>
                    </div>
                    <div className="flex items-center gap-[0.38cqw]">
                      <span className="w-[0.5cqw] h-[0.5cqw] rounded-full bg-[#4B9B6E]" />
                      <span>Polished (25%)</span>
                    </div>
                    <div className="flex items-center gap-[0.38cqw]">
                      <span className="w-[0.5cqw] h-[0.5cqw] rounded-full bg-[#D99B26]" />
                      <span>Revising (25%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Capture Inbox Strip */}
            <div className="rounded-[0.65cqw] bg-[#F7F6F3] border border-[#E5E3DC] p-[0.95cqw] space-y-[0.5cqw]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[0.4cqw] text-[0.9cqw] font-bold text-[#2F2D28]">
                  <Inbox className="w-[1cqw] h-[1cqw] text-[#B4432C]" />
                  <span>Quick Capture</span>
                </div>
                <span className="px-[0.5cqw] py-[0.14cqw] rounded bg-[#2383E2] text-white text-[0.72cqw] font-semibold">
                  + New
                </span>
              </div>
              <div className="space-y-[0.32cqw] text-[0.78cqw] text-[#52504A]">
                <div className="flex items-center justify-between bg-white px-[0.6cqw] py-[0.32cqw] rounded border border-[#EAE8E2]">
                  <span className="truncate pr-1">Verify ECE baseline</span>
                  <span className="text-[#92400E] bg-[#FEF3C7] px-[0.36cqw] rounded text-[0.68cqw] shrink-0">
                    Check
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white px-[0.6cqw] py-[0.32cqw] rounded border border-[#EAE8E2]">
                  <span className="truncate pr-1">Ablate entropy gate</span>
                  <span className="text-[#6645A8] bg-[#F1EDF9] px-[0.36cqw] rounded text-[0.68cqw] shrink-0">
                    Run Idea
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* =====================================================================
           SPREAD 02: LAB EXPERIMENTS, PEER REVIEW & GRANTS
           ===================================================================== */
        <div className="relative w-full h-full">
          {/* SHEET 1 (Left Staggered): Lab & Experiments Workbench */}
          <div className="absolute left-[2.4%] top-[5.5%] bottom-[5.5%] w-[32%] rounded-[1.05cqw] bg-[#FAF9F6] border border-[#DFDCD5] shadow-[0_1.3cqw_3cqw_-0.7cqw_rgba(45,41,34,0.24)] overflow-hidden flex flex-col">
            <div className="h-[11.5%] bg-gradient-to-r from-[#9C572A] via-[#AD6738] to-[#BC7849] relative px-[1.8cqw] flex items-end">
              <div className="translate-y-[38%] w-[3.4cqw] h-[3.4cqw] rounded-[0.65cqw] bg-[#7D431D] border-[0.2cqw] border-[#FAF9F6] shadow-sm flex items-center justify-center text-white">
                <FlaskConical className="w-[1.85cqw] h-[1.85cqw]" />
              </div>
            </div>

            <div className="pt-[2.2cqw] px-[1.8cqw] pb-[1.5cqw] space-y-[1.15cqw] flex-1 overflow-hidden">
              <div>
                <h4 className="font-display text-[2.0cqw] font-bold tracking-[-0.025em] text-[#2F2D28] leading-tight">
                  Lab &amp; Experiments
                </h4>
                <p className="text-[0.88cqw] text-[#6E6D68] mt-[0.2cqw]">
                  Auditable runs, SOPs, dataset hashes &amp; repos
                </p>
              </div>

              {/* Clean 2x2 Gallery Cards completely inside Sheet 1 */}
              <div className="grid grid-cols-2 gap-[0.7cqw]">
                <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.8cqw] space-y-[0.45cqw]">
                  <div className="h-[3.8cqw] rounded-[0.4cqw] bg-[#EFECE5] flex items-center justify-center text-[#37352F]">
                    <FlaskConical className="w-[1.85cqw] h-[1.85cqw]" />
                  </div>
                  <p className="text-[0.86cqw] font-semibold text-[#37352F] truncate">
                    Run Ledger (18)
                  </p>
                  <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#E7F5EC] text-[#17693A] text-[0.7cqw] font-medium">
                    Seed Verified
                  </span>
                </div>

                <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.8cqw] space-y-[0.45cqw]">
                  <div className="h-[3.8cqw] rounded-[0.4cqw] bg-[#EFECE5] flex items-center justify-center text-[#37352F]">
                    <Layers className="w-[1.85cqw] h-[1.85cqw]" />
                  </div>
                  <p className="text-[0.86cqw] font-semibold text-[#37352F] truncate">
                    SOP Protocols
                  </p>
                  <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#EBF3FC] text-[#1D63B8] text-[0.7cqw] font-medium">
                    v2.4 Active
                  </span>
                </div>

                <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.8cqw] space-y-[0.45cqw]">
                  <div className="h-[3.8cqw] rounded-[0.4cqw] bg-[#EFECE5] flex items-center justify-center text-[#37352F]">
                    <Database className="w-[1.85cqw] h-[1.85cqw]" />
                  </div>
                  <p className="text-[0.86cqw] font-semibold text-[#37352F] truncate">
                    Zenodo Data
                  </p>
                  <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#FEF3C7] text-[#92400E] text-[0.7cqw] font-medium">
                    SHA-256
                  </span>
                </div>

                <div className="rounded-[0.65cqw] bg-white border border-[#E8E6E0] p-[0.8cqw] space-y-[0.45cqw]">
                  <div className="h-[3.8cqw] rounded-[0.4cqw] bg-[#EFECE5] flex items-center justify-center text-[#37352F]">
                    <FileCode2 className="w-[1.85cqw] h-[1.85cqw]" />
                  </div>
                  <p className="text-[0.86cqw] font-semibold text-[#37352F] truncate">
                    Code &amp; Repos
                  </p>
                  <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#F1EDF9] text-[#6645A8] text-[0.7cqw] font-medium">
                    eval-v1.8
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 2 (Center Elevated, Unobstructed!): Reviewer Comments & Action Items */}
          <div className="absolute left-[33.4%] top-[8.5%] bottom-[4.2%] w-[36%] z-10 rounded-[1.05cqw] bg-white border border-[#DEDBD3] shadow-[0_1.5cqw_3.4cqw_-0.7cqw_rgba(45,41,34,0.28)] p-[1.7cqw] flex flex-col gap-[1.05cqw] overflow-hidden">
            <div className="flex items-center justify-between gap-2 border-b border-[#F1F1EF] pb-[0.7cqw]">
              <div className="min-w-0">
                <p className="text-[0.76cqw] font-bold uppercase tracking-[0.06em] text-[#B4432C]">
                  Peer Review &amp; Advisor Log
                </p>
                <h5 className="font-display text-[1.42cqw] font-bold text-[#2F2D28] leading-tight truncate">
                  Reviewer Comments
                </h5>
              </div>
              <span className="px-[0.6cqw] py-[0.22cqw] rounded-[0.38cqw] bg-[#FAF9F6] border border-[#E9E9E7] text-[0.78cqw] font-semibold text-[#37352F] shrink-0">
                3 Open
              </span>
            </div>

            {/* Neatly Aligned Meeting Cards (Zero collision with heading!) */}
            <div className="grid grid-cols-2 gap-[0.7cqw]">
              <div className="rounded-[0.6cqw] bg-[#FAF9F6] border border-[#E8E6E0] p-[0.8cqw] space-y-[0.3cqw]">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[0.84cqw] font-bold text-[#37352F] truncate">
                    Advisor Sync
                  </span>
                  <MessageSquare className="w-[0.9cqw] h-[0.9cqw] text-[#2383E2] shrink-0" />
                </div>
                <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#EBF3FC] text-[#1D63B8] text-[0.68cqw] font-medium">
                  Meeting Notes
                </span>
                <p className="text-[0.72cqw] text-[#6E6D68] truncate">
                  Nov 13 · Retrieval Draft
                </p>
              </div>

              <div className="rounded-[0.6cqw] bg-[#FAF9F6] border border-[#E8E6E0] p-[0.8cqw] space-y-[0.3cqw]">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[0.84cqw] font-bold text-[#37352F] truncate">
                    Seminar Dry Run
                  </span>
                  <GitBranch className="w-[0.9cqw] h-[0.9cqw] text-[#7C3AED] shrink-0" />
                </div>
                <span className="inline-block px-[0.4cqw] py-[0.1cqw] rounded bg-[#F1EDF9] text-[#6645A8] text-[0.68cqw] font-medium">
                  Lab Seminar
                </span>
                <p className="text-[0.72cqw] text-[#6E6D68] truncate">
                  Nov 10 · Benchmarks
                </p>
              </div>
            </div>

            {/* Clean Rebuttal Action Ledger */}
            <div className="rounded-[0.65cqw] border border-[#E9E9E7] overflow-hidden">
              <div className="bg-[#F7F6F3] px-[0.85cqw] py-[0.5cqw] grid grid-cols-12 text-[0.76cqw] font-semibold text-[#52504A] border-b border-[#E9E9E7]">
                <span className="col-span-7">Action Item</span>
                <span className="col-span-3 text-center">Severity</span>
                <span className="col-span-2 text-right">Due</span>
              </div>
              <div className="divide-y divide-[#F1F1EF] text-[0.8cqw]">
                <div className="px-[0.85cqw] py-[0.55cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-7 truncate pr-1 font-medium">
                    Re-run baseline (3 seeds)
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#FEF3C7] text-[#92400E] text-[0.7cqw] font-medium">
                      Minor
                    </span>
                  </div>
                  <span className="col-span-2 text-right text-[#6E6D68] tabular-nums">
                    Nov 27
                  </span>
                </div>

                <div className="px-[0.85cqw] py-[0.55cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-7 truncate pr-1 font-medium">
                    Justify BERTScore omission
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#FDECE8] text-[#B4432C] text-[0.7cqw] font-medium">
                      Major
                    </span>
                  </div>
                  <span className="col-span-2 text-right text-[#6E6D68] tabular-nums">
                    Nov 30
                  </span>
                </div>

                <div className="px-[0.85cqw] py-[0.55cqw] grid grid-cols-12 items-center text-[#37352F]">
                  <span className="col-span-7 truncate pr-1 font-medium">
                    Per-class calibration split
                  </span>
                  <div className="col-span-3 flex justify-center">
                    <span className="px-[0.4cqw] py-[0.1cqw] rounded bg-[#FDECE8] text-[#B4432C] text-[0.7cqw] font-medium">
                      Major
                    </span>
                  </div>
                  <span className="col-span-2 text-right text-[#6E6D68] tabular-nums">
                    Dec 01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SHEET 3 (Right-Front Elevated, Unobstructed!): Grants, CFP Venues & 14 DBs */}
          <div className="absolute right-[2.4%] top-[5.2%] bottom-[6.2%] w-[29.5%] z-20 rounded-[1.05cqw] bg-white border border-[#DAD7CF] shadow-[0_1.7cqw_3.8cqw_-0.8cqw_rgba(45,41,34,0.3)] p-[1.65cqw] flex flex-col justify-between overflow-hidden">
            <div className="space-y-[1.05cqw]">
              <div className="flex items-center justify-between gap-2">
                <h5 className="font-display text-[1.45cqw] font-bold text-[#2F2D28]">
                  Grants &amp; CFPs
                </h5>
                <span className="px-[0.58cqw] py-[0.2cqw] rounded-[0.38cqw] bg-[#E7F5EC] text-[#17693A] text-[0.76cqw] font-semibold shrink-0">
                  14 DBs
                </span>
              </div>

              {/* Clean CFP Venue Timeline List */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] space-y-[0.6cqw]">
                <p className="text-[0.84cqw] font-semibold text-[#52504A]">
                  Submission &amp; RFP Cutoffs
                </p>
                <div className="space-y-[0.48cqw] text-[0.78cqw]">
                  <div className="flex items-center justify-between bg-white px-[0.65cqw] py-[0.42cqw] rounded border border-[#EAE8E2]">
                    <span className="font-semibold text-[#37352F]">ACL 2027</span>
                    <span className="text-[#1D63B8] font-medium">Feb 15</span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-[0.65cqw] py-[0.42cqw] rounded border border-[#EAE8E2]">
                    <span className="font-semibold text-[#37352F]">
                      NeurIPS 2027
                    </span>
                    <span className="text-[#6645A8] font-medium">May 22</span>
                  </div>
                  <div className="flex items-center justify-between bg-white px-[0.65cqw] py-[0.42cqw] rounded border border-[#EAE8E2]">
                    <span className="font-semibold text-[#37352F]">
                      NSF Compute Grant
                    </span>
                    <span className="text-[#17693A] font-medium">$45,000</span>
                  </div>
                </div>
              </div>

              {/* Clean Award Utilization Donut */}
              <div className="rounded-[0.65cqw] bg-[#FAF9F6] border border-[#ECE9E2] p-[0.95cqw] flex items-center gap-[0.95cqw]">
                <svg
                  viewBox="0 0 80 80"
                  className="w-[4.9cqw] h-[4.9cqw] shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#E8E6E0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="28"
                    fill="none"
                    stroke="#D99B26"
                    strokeWidth="10"
                    strokeDasharray="132 176"
                    transform="rotate(-90 40 40)"
                  />
                  <text
                    x="40"
                    y="40"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#37352F"
                  >
                    75%
                  </text>
                  <text
                    x="40"
                    y="52"
                    textAnchor="middle"
                    fontSize="7.5"
                    fill="#6E6D68"
                  >
                    Approved
                  </text>
                </svg>
                <div className="space-y-[0.22cqw] min-w-0">
                  <p className="text-[0.92cqw] font-bold text-[#2F2D28]">
                    Award Allocation
                  </p>
                  <p className="text-[0.74cqw] text-[#6E6D68] leading-snug">
                    Compute credits, travel &amp; dataset licensing tracked live
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[0.6cqw] bg-[#F7F6F3] border border-[#E5E3DC] px-[0.85cqw] py-[0.6cqw] text-[0.78cqw] text-[#52504A] flex items-center justify-between">
              <span className="font-semibold text-[#37352F]">
                Co-Authors &amp; ORCID
              </span>
              <span className="text-[#17693A] font-medium">CRediT Linked</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
