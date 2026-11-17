import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from 'lucide-react';
import freelanceOsHubImg from '../assets/images/freelance_os_hub_hd_1794922765448.jpg';
import freelanceOsClientsImg from '../assets/images/freelance_os_clients_hd_1794922767161.jpg';
import freelanceOsGrowthImg from '../assets/images/freelance_os_growth_hd_1794922765086.jpg';
import freelanceOsFinancesImg from '../assets/images/freelance_os_finances_hd_1794922767056.jpg';

export interface FreelanceOsIncludedModule {
  title: string;
  details: string;
}

export interface FreelanceOsSlide {
  id: 'hub' | 'clients' | 'growth' | 'finances';
  label: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  includedModules: FreelanceOsIncludedModule[];
}

export const FREELANCE_OS_SLIDES: FreelanceOsSlide[] = [
  {
    id: 'hub',
    label: '01 · Studio Hub & Execution',
    badge: 'Command Center',
    title: 'Main Command Hub, Projects & Time Tracking',
    description:
      'Start every week from one calm operational cockpit combining overdue invoice alerts, multi-mode project delivery boards, and work-session profitability logging.',
    image: freelanceOsHubImg,
    includedModules: [
      {
        title: 'Main Hub (Freelancer Business OS)',
        details:
          'Shows unpaid invoices, overdue alerts, open proposals, today’s follow-ups, weekly tasks, and a Friday review checklist.',
      },
      {
        title: 'Project Management',
        details:
          'Project boards (Simple, Complete, Advanced), timelines, deadlines, and a deliverables board.',
      },
      {
        title: 'Time Sheet',
        details:
          'Work-session logger and project margin/utilization tracker.',
      },
    ],
  },
  {
    id: 'clients',
    label: '02 · Clients CRM, Outreach & Legals',
    badge: 'Pipeline & Relationships',
    title: 'Clients Dashboard, Email CRM & Contract Tracker',
    description:
      'Manage every prospect, retainer relationship, segmented outreach campaign, and MSA/SOW/NDA renewal alert without leaving Notion.',
    image: freelanceOsClientsImg,
    includedModules: [
      {
        title: 'Clients Dashboard',
        details:
          'Client CRM pipeline, key client profiles, contact directory, and proposal tracker.',
      },
      {
        title: 'Email List',
        details:
          'Segmented contact directory and outreach/newsletter campaign tracker.',
      },
      {
        title: 'Legals & Contracts',
        details:
          'Contract tracker (MSAs, SOWs, NDAs) with renewal alerts and a standard clause library.',
      },
    ],
  },
  {
    id: 'growth',
    label: '03 · Strategy, Ideation & Brand',
    badge: 'OKRs, Plan & Portfolio',
    title: 'Growth & Strategy, Ideation Hub, Business Plan & Externals',
    description:
      'Connect big-picture business strategy to daily execution—score raw ideas with ICE prioritization, model 12-month growth, and share a publish-ready portfolio.',
    image: freelanceOsGrowthImg,
    includedModules: [
      {
        title: 'Growth & Strategy',
        details:
          'SMART goals scorecard, quarterly annual roadmap, and marketing plan.',
      },
      {
        title: 'Ideation Hub',
        details:
          'Idea capture board with Impact/Confidence/Ease (ICE) scoring and promotion to active projects.',
      },
      {
        title: 'Business Plan',
        details:
          'Structured 12-month financial model, offer ladder, risk register, and 90-day action plan.',
      },
      {
        title: 'Externals',
        details:
          'Brand guidelines, business credentials, and a publish-ready portfolio page.',
      },
    ],
  },
  {
    id: 'finances',
    label: '04 · Finances, Security & System Core',
    badge: 'Cash Flow & Backend',
    title: 'Finances & Invoices, Accounts Access & System Backend',
    description:
      'Stay audit-ready with automated invoice overdue aging, clean expense & profit reporting, structured 2FA/vault pointers, and 18 connected backend databases.',
    image: freelanceOsFinancesImg,
    includedModules: [
      {
        title: 'Finances & Invoices',
        details:
          'Unpaid invoice tracker with automatic overdue aging, paid ledger, expense tracker, and monthly financial reports.',
      },
      {
        title: 'Accounts Access',
        details:
          'Secure catalog of login URLs, 2FA status, subscription renewals, and vault pointers (no raw passwords).',
      },
      {
        title: 'System & Support',
        details:
          'Quick Actions SOPs, Templates library (project briefs, proposals, invoices, contracts), and the System · Databases backend.',
      },
    ],
  },
];

export const FreelanceOsGallery: React.FC<{
  variant?: 'home' | 'detail';
  onInspectTemplate?: () => void;
}> = ({ variant = 'detail', onInspectTemplate }) => {
  const [filterId, setFilterId] = useState<'all' | FreelanceOsSlide['id']>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleSlides =
    filterId === 'all'
      ? FREELANCE_OS_SLIDES
      : FREELANCE_OS_SLIDES.filter((s) => s.id === filterId);

  const lightboxSlide =
    lightboxIndex !== null ? FREELANCE_OS_SLIDES[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev + 1) % FREELANCE_OS_SLIDES.length
        );
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null
            ? 0
            : (prev - 1 + FREELANCE_OS_SLIDES.length) % FREELANCE_OS_SLIDES.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  return (
    <div data-testid="freelance-os-gallery" className="space-y-8">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2.5 max-w-[700px]">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
            {variant === 'home'
              ? 'Featured System · Freelancer Business OS'
              : 'Inside Freelancer Business OS · Full Workspace Walkthrough'}
          </p>
          <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#0F172A] text-balance">
            {variant === 'home'
              ? 'Run Your Entire Freelance Studio in Notion'
              : '1 Command Hub, 11 Modules, 18 Interconnected Databases'}
          </h2>
          <p className="text-[15.5px] sm:text-[16.5px] text-[#52504A] leading-[1.6]">
            Freelancer OS includes a main command-center hub, 11 functional modules, 18 interconnected databases, and ready-to-use templates.
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

      {/* Interactive Filter Tabs */}
      <div
        role="tablist"
        aria-label="Freelancer OS Workspace Modules"
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={filterId === 'all'}
          data-testid="freelance-os-tab-all"
          onClick={() => setFilterId('all')}
          className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            filterId === 'all'
              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
              : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
          }`}
        >
          All 4 Views (13 Systems)
        </button>

        {FREELANCE_OS_SLIDES.map((slide) => {
          const isActive = filterId === slide.id;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`freelance-os-tab-${slide.id}`}
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

      {/* Vertically Stacked HD Showcase Cards (PDF Pages 6–13 Rhythm) */}
      <div
        data-testid="freelance-os-all-images"
        className="flex flex-col gap-8"
      >
        {visibleSlides.map((slide) => {
          const slideIndex = FREELANCE_OS_SLIDES.findIndex(
            (item) => item.id === slide.id
          );

          return (
            <article
              key={slide.id}
              data-testid={`freelance-os-card-${slide.id}`}
              className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-16px_rgba(15,23,42,0.08)] overflow-hidden"
            >
              {/* Crisp 16:9 Enhanced HD Preview Image */}
              <div className="bg-[#F8FAFC] p-3 sm:p-5 border-b border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(slideIndex)}
                  aria-label={`Expand ${slide.title} full-resolution preview`}
                  className="group relative w-full rounded-[16px] overflow-hidden border border-[#E2E8F0] bg-white aspect-[16/9] cursor-zoom-in block text-left"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover showcase-hd-image transition-transform duration-500 group-hover:scale-[1.012]"
                  />

                  <span className="absolute right-3.5 bottom-3.5 px-3.5 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-[12px] font-medium inline-flex items-center gap-1.5 shadow-sm group-hover:bg-[#1D6EE3] transition-colors">
                    <Expand className="w-3.5 h-3.5" />
                    <span>Full-Res HD View</span>
                  </span>
                </button>
              </div>

              {/* Generous Unclipped Text & Vertical Module Breakdown */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-[#1D6EE3]">
                    <span>{slide.label}</span>
                    <span aria-hidden="true" className="text-[#94A3B8]">
                      ·
                    </span>
                    <span className="text-[#64748B] font-medium">
                      {slide.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-[21px] sm:text-[25px] font-bold tracking-[-0.025em] text-[#0F172A] leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-[15px] text-[#52504A] leading-[1.6] max-w-[760px]">
                    {slide.description}
                  </p>
                </div>

                {/* Vertically Stacked Included Modules */}
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

      {/* Full-Resolution Lightbox Modal */}
      {lightboxSlide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${lightboxSlide.title} full-resolution preview`}
          data-testid="freelance-os-lightbox"
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
                        : (prev - 1 + FREELANCE_OS_SLIDES.length) %
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
                    setLightboxIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev + 1) % FREELANCE_OS_SLIDES.length
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
