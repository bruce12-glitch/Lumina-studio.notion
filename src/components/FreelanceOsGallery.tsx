import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react';
import freelanceOsHubImg from '../assets/images/freelance_os_hub_hd_1794922765448.jpg';
import freelanceOsClientsImg from '../assets/images/freelance_os_clients_hd_1794922767161.jpg';
import freelanceOsGrowthImg from '../assets/images/freelance_os_growth_hd_1794922765086.jpg';
import freelanceOsFinancesImg from '../assets/images/freelance_os_finances_hd_1794922767056.jpg';

export interface FreelanceOsSlide {
  id: 'hub' | 'clients' | 'growth' | 'finances';
  label: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
}

export const FREELANCE_OS_SLIDES: FreelanceOsSlide[] = [
  {
    id: 'hub',
    label: '01 · Studio Hub',
    badge: 'Command Center',
    title: 'Freelancer Business OS & Studio Rhythm',
    description:
      'One calm weekly loop combining Start Here SOPs, live overdue invoice & deliverable alerts, Management databases, Workspace links, and Friday 30-min ritual tracking.',
    highlights: [
      'Weekly Studio Rhythm (Mon Plan → Fri Review)',
      'Live Overdue Invoices & Deliverables Radar',
      '6 Core Management Hubs + Workspace Shortcuts',
    ],
    image: freelanceOsHubImg,
  },
  {
    id: 'clients',
    label: '02 · Clients CRM',
    badge: 'Pipeline & Follow-ups',
    title: 'Clients Dashboard & Pipeline Command',
    description:
      'Track every active client, lead stage, weighted proposal pipeline, follow-up due date, and relationship health radar inside one interlinked Notion CRM.',
    highlights: [
      'Kanban Pipeline Board (Lead → Active)',
      'Follow-up Engine & Weighted Proposals Table',
      'Lead Sources Donut & Stage Conversion Insights',
    ],
    image: freelanceOsClientsImg,
  },
  {
    id: 'growth',
    label: '03 · Growth & Strategy',
    badge: 'OKRs & Roadmap',
    title: 'Growth & Strategy Scorecard',
    description:
      'Turn annual revenue goals, active client targets, case study publishing, and productized offers into measurable quarterly sprints with automated Goal Health charts.',
    highlights: [
      'SMART Goals Scorecard with Automated Rollups',
      'Quarterly Kanban Board (On Track / At Risk)',
      'Visual Roadmap Timeline & Goal Health Donut',
    ],
    image: freelanceOsGrowthImg,
  },
  {
    id: 'finances',
    label: '04 · Finances & Tax',
    badge: 'Cash Flow & Tax',
    title: 'Finances, Invoices & Tax Estimator',
    description:
      'Monitor unpaid invoices, aging buckets, spend by category, net realized profit after fees, and automated FY tax estimation across every client project.',
    highlights: [
      'Unpaid Tracker & Invoice Aging Detail Bar Chart',
      'Visual Insights (Total Invoiced, Spend & Timeline)',
      'Tax Estimator (GST / TDS / Advance Tax) & Client LTV',
    ],
    image: freelanceOsFinancesImg,
  },
];

export const FreelanceOsGallery: React.FC<{
  variant?: 'home' | 'detail';
  onInspectTemplate?: () => void;
}> = ({ variant = 'detail', onInspectTemplate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeSlide = FREELANCE_OS_SLIDES[activeIndex];

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % FREELANCE_OS_SLIDES.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex(
          (prev) =>
            (prev - 1 + FREELANCE_OS_SLIDES.length) % FREELANCE_OS_SLIDES.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  return (
    <div
      data-testid="freelance-os-gallery"
      className="space-y-6"
    >
      {/* Top Bar: Header (when home or detail) + Interactive Module Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div className="space-y-2 max-w-[640px]">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F5F4F8] border border-[#E2E8F0] text-[12px] font-semibold text-[#1D6EE3] tracking-[-0.01em]">
            {variant === 'home'
              ? 'Featured System · Freelancer Business OS'
              : 'Inside Freelancer Business OS · 4 HD Workspace Views'}
          </span>
          <h2 className="font-display text-[clamp(26px,3.2vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A]">
            {variant === 'home'
              ? 'Run Your Entire Freelance Studio in Notion'
              : 'Every Client, Goal, and Invoice — Crystal Clear'}
          </h2>
          <p className="text-[15.5px] text-[#52504A] leading-[1.6]">
            {activeSlide.description}
          </p>
        </div>

        {variant === 'home' && onInspectTemplate && (
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            onClick={onInspectTemplate}
            className="btn-motion-primary h-11 px-5 rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore Freelance OS ($79)</span>
            <ArrowRight className="w-4 h-4 btn-arrow-slide" />
          </motion.button>
        )}
      </div>

      {/* Interactive Tab Bar */}
      <div
        role="tablist"
        aria-label="Freelancer OS Workspace Modules"
        className="flex flex-wrap items-center gap-2"
      >
        {FREELANCE_OS_SLIDES.map((slide, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`freelance-os-tab-${slide.id}`}
              onClick={() => setActiveIndex(idx)}
              className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all cursor-pointer ${
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

      {/* Primary HD Stage Viewer */}
      <div className="rounded-[24px] bg-[#F8FAFC] border border-[#E2E8F0] p-3 sm:p-5 shadow-[0_14px_40px_-16px_rgba(15,23,42,0.08)] space-y-4">
        <div
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Expand ${activeSlide.title} full-resolution preview`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          className="group relative rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-[#FFFFFF] aspect-[16/9] cursor-zoom-in"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover showcase-hd-image transition-transform duration-500 group-hover:scale-[1.012]"
          />

          {/* Top-Left Subtle Caption Pill + Top-Right Expand Button */}
          <div className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 flex items-center justify-between gap-3 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-white/92 backdrop-blur-md border border-[#E2E8F0] text-[12px] font-semibold text-[#0F172A] shadow-sm">
              {activeSlide.badge} · {activeSlide.title}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-[12px] font-medium inline-flex items-center gap-1.5 shadow-sm group-hover:bg-[#1D6EE3] transition-colors">
              <Expand className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full-Res HD View</span>
            </span>
          </div>
        </div>

        {/* Highlights strip under featured image */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {activeSlide.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#334155]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D6EE3]" />
                {h}
              </span>
            ))}
          </div>
          <span className="text-[12px] font-mono text-[#64748B]">
            {activeIndex + 1} / {FREELANCE_OS_SLIDES.length} HD Views
          </span>
        </div>
      </div>

      {/* 4-Card Enhanced HD Thumbnail Strip (All 4 Images Visible at Once) */}
      <div
        data-testid="freelance-os-all-images"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {FREELANCE_OS_SLIDES.map((slide, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={slide.id}
              type="button"
              data-testid={`freelance-os-thumb-${slide.id}`}
              onClick={() => setActiveIndex(idx)}
              onDoubleClick={() => {
                setActiveIndex(idx);
                setLightboxOpen(true);
              }}
              className={`group text-left rounded-[16px] bg-white border overflow-hidden transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#1D6EE3] ring-2 ring-[#1D6EE3]/15 shadow-[0_12px_28px_-10px_rgba(29,110,227,0.18)]'
                  : 'border-[#E2E8F0] hover:border-[#1D6EE3]/45 shadow-[0_2px_10px_-3px_rgba(15,23,42,0.04)]'
              }`}
            >
              <div className="aspect-[16/9] bg-[#F8FAFC] overflow-hidden border-b border-[#F1F5F9] relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover showcase-hd-image transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className="absolute right-2 bottom-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-[#E2E8F0] text-[#0F172A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-[#1D6EE3] hover:text-white hover:border-[#1D6EE3]"
                  title="Inspect HD Image"
                >
                  <Expand className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#1D6EE3]">
                    {slide.label}
                  </span>
                  <span className="text-[10.5px] font-medium text-[#64748B]">
                    {slide.badge}
                  </span>
                </div>
                <h3 className="text-[13.5px] font-semibold text-[#0F172A] leading-snug truncate">
                  {slide.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Full-Resolution Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeSlide.title} full-resolution preview`}
          data-testid="freelance-os-lightbox"
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
                  {activeSlide.label} · {activeSlide.badge}
                </p>
                <h3 className="text-[16px] font-bold text-[#0F172A] truncate">
                  {activeSlide.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setActiveIndex(
                      (prev) =>
                        (prev - 1 + FREELANCE_OS_SLIDES.length) %
                        FREELANCE_OS_SLIDES.length
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
                    setActiveIndex(
                      (prev) => (prev + 1) % FREELANCE_OS_SLIDES.length
                    )
                  }
                  className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close full-resolution preview"
                  onClick={() => setLightboxOpen(false)}
                  className="w-9 h-9 rounded-[9px] border border-[#E2E8F0] bg-white hover:bg-[#F1F5F9] text-[#0F172A] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-[#0F172A] p-2 sm:p-4 flex items-center justify-center max-h-[80vh]">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className="max-w-full max-h-[74vh] w-auto h-auto rounded-[10px] showcase-hd-image object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
