import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { TEMPLATES } from '../data/catalog';
import { getTemplateHook } from '../data/templateHooks';
import { formatPrice } from '../utils/storeLogic';
import { CheckoutTarget } from './CheckoutModal';
import { TemplateCard } from './Chrome';
import { BlushAssetImage } from './CoversAndIllustrations';
import { StandardTemplateWorkspace } from './StandardTemplateWorkspace';
import {
  DopamineMenuShowcase,
  DopamineTabId,
} from './DopamineMenuShowcase';
import {
  TravelPlannerShowcase,
  TravelTabId,
} from './TravelPlannerShowcase';
import {
  FreelanceOsGallery,
  FreelanceStudioFilterId,
} from './FreelanceOsGallery';
import {
  StudentOsShowcase,
  StudentStudioFilterId,
} from './StudentOsShowcase';
import {
  ResearcherOsShowcase,
  ResearcherStudioFilterId,
} from './ResearcherOsShowcase';
import {
  NexusOsShowcase,
  NexusStudioFilterId,
} from './NexusOsShowcase';
import {
  BookTrackerOsShowcase,
  BookTrackerStudioFilterId,
} from './BookTrackerOsShowcase';
import freelancerMascotHeroImg from '../assets/images/freelancer_mascot_hero_1794923265472.jpg';
import freelancerMascotCardImg from '../assets/images/freelancer_mascot_card_1794923266919.jpg';
import studentOsMascotHeroImg from '../assets/images/student_os_mascot_hero_1794933584495.jpg';
import researcherOsMascotHeroImg from '../assets/images/researcher_os_mascot_hero_1794933583291.jpg';
import nexusOsMascotHeroImg from '../assets/images/nexus_os_mascot_hero_1795351179233.jpg';
import bookTrackerOsMascotHeroImg from '../assets/images/book_tracker_os_mascot_hero_1795351180939.jpg';

const VerifiedBadgeIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-[#2383E2]',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M12 2.25L14.32 3.92L17.15 3.63L18.31 6.23L20.91 7.39L20.62 10.22L22.29 12.54L20.62 14.86L20.91 17.69L18.31 18.85L17.15 21.45L14.32 21.16L12 22.83L9.68 21.16L6.85 21.45L5.69 18.85L3.09 17.69L3.38 14.86L1.71 12.54L3.38 10.22L3.09 7.39L5.69 6.23L6.85 3.63L9.68 3.92L12 2.25Z"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 12.5L10.9 14.65L15.5 10.05"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NotionMarkSvg: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M4.5 6.2L14.8 4.2L20.2 7.2V18.8L10.2 20.5L4.5 17.2V6.2Z"
      fill="#FFFFFF"
      stroke="#37352F"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 6.2L10.2 9.4L20.2 7.2"
      stroke="#37352F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M10.2 9.4V20.5"
      stroke="#37352F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M12.7 16.7V11.8L16.8 16.2V11.1"
      stroke="#37352F"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TemplateShowcasePage: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
  onOpenCheckout: (target: CheckoutTarget) => void;
  purchasedSlugs: Set<string>;
}> = ({ slug, onNavigate, onOpenCheckout, purchasedSlugs }) => {
  const template =
    TEMPLATES.find((t) => t.slug === slug) ||
    TEMPLATES.find((t) => t.slug === 'second-brain')!;

  const hook = getTemplateHook(template.slug);
  const isOwned = purchasedSlugs.has(template.slug);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const [freelanceViewFilter, setFreelanceViewFilter] =
    useState<FreelanceStudioFilterId>('hub');
  const [studentViewFilter, setStudentViewFilter] =
    useState<StudentStudioFilterId>('hub-career');
  const [researcherViewFilter, setResearcherViewFilter] =
    useState<ResearcherStudioFilterId>('synthesis');
  const [nexusViewFilter, setNexusViewFilter] =
    useState<NexusStudioFilterId>('spine');
  const [bookTrackerViewFilter, setBookTrackerViewFilter] =
    useState<BookTrackerStudioFilterId>('telemetry');
  const [dopamineTab, setDopamineTab] = useState<DopamineTabId>('plate');
  const [travelTab, setTravelTab] = useState<TravelTabId>('control-tower');
  const [showStickyBuyBar, setShowStickyBuyBar] = useState(false);

  const isFlagshipOs =
    template.slug === 'freelance-os' ||
    template.slug === 'student-os' ||
    template.slug === 'researcher-os' ||
    template.slug === 'nexus-os' ||
    template.slug === 'book-tracker-os';

  const isInteractiveSpotlight =
    template.slug === 'dopamine-menu' || template.slug === 'travel-planner';

  useEffect(() => {
    setSelectedModuleIndex(0);
    setFreelanceViewFilter('hub');
    setStudentViewFilter('hub-career');
    setResearcherViewFilter('synthesis');
    setNexusViewFilter('spine');
    setBookTrackerViewFilter('telemetry');
    setDopamineTab('plate');
    setTravelTab('control-tower');
  }, [template.slug]);

  useEffect(() => {
    if (!isFlagshipOs && !isInteractiveSpotlight) {
      setShowStickyBuyBar(false);
      return;
    }
    const onScroll = () => {
      setShowStickyBuyBar(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isFlagshipOs, isInteractiveSpotlight]);

  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.slug !== template.slug
  ).slice(0, 3);

  const displayCompareAt =
    template.compareAt !== undefined
      ? template.compareAt
      : template.price > 0
      ? template.price + 20
      : undefined;

  const reviewsCount = 148 + ((template.id * 7) % 90);

  const handleOpenBuy = () => {
    onOpenCheckout({
      name: template.name,
      slug: template.slug,
      price: template.price,
      compareAt: template.compareAt,
      pro: template.pro,
      whatsInside: template.whatsInside,
    });
  };

  const handleScrollToCloserLook = () => {
    const el = document.getElementById('template-closer-look');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectInsideModule = (index: number) => {
    setSelectedModuleIndex(index);
    if (template.slug === 'freelance-os') {
      const mapping: FreelanceStudioFilterId[] = [
        'hub',
        'clients',
        'hub',
        'finances',
        'hub',
        'growth',
      ];
      setFreelanceViewFilter(mapping[index] || 'hub');
      document
        .getElementById('freelance-os-studio-views')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'student-os') {
      const mapping: StudentStudioFilterId[] = [
        'hub-career',
        'gpa-courses',
        'toolkit-wellness',
        'hub-career',
        'career-finance',
        'career-finance',
      ];
      setStudentViewFilter(mapping[index] || 'hub-career');
      document
        .getElementById('student-os-studio-views')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'researcher-os') {
      const mapping: ResearcherStudioFilterId[] = [
        'atomic-vault',
        'atomic-vault',
        'manuscripts',
        'lab-grants',
        'lab-grants',
        'synthesis',
      ];
      setResearcherViewFilter(mapping[index] || 'synthesis');
      document
        .getElementById('researcher-os-studio-views')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'nexus-os') {
      const mapping: NexusStudioFilterId[] = [
        'spine',
        'sprints',
        'portfolio',
        'capital',
        'capital',
        'capital',
      ];
      setNexusViewFilter(mapping[index] || 'spine');
      document
        .getElementById('nexus-os-studio-views')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'book-tracker-os') {
      const mapping: BookTrackerStudioFilterId[] = [
        'telemetry',
        'telemetry',
        'queue',
        'queue',
        'library',
        'timeline',
      ];
      setBookTrackerViewFilter(mapping[index] || 'telemetry');
      document
        .getElementById('book-tracker-os-studio-views')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'dopamine-menu') {
      const mapping: DopamineTabId[] = [
        'plate',
        'top-picks',
        'mood-match',
        'craving-swaps',
        'insights',
      ];
      setDopamineTab(mapping[index] || 'plate');
      document
        .getElementById('standard-preview-stage')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (template.slug === 'travel-planner') {
      const mapping: TravelTabId[] = [
        'control-tower',
        'wallet',
        'timeline',
        'packing',
        'itinerary',
      ];
      setTravelTab(mapping[index] || 'control-tower');
      document
        .getElementById('standard-preview-stage')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      document
        .getElementById('standard-preview-stage')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const heroArtSrc =
    template.slug === 'freelance-os'
      ? freelancerMascotHeroImg
      : template.slug === 'student-os'
      ? studentOsMascotHeroImg
      : template.slug === 'nexus-os'
      ? nexusOsMascotHeroImg
      : template.slug === 'book-tracker-os'
      ? bookTrackerOsMascotHeroImg
      : template.slug === 'researcher-os'
      ? researcherOsMascotHeroImg
      : template.illustrationUrl;

  const closingArtSrc =
    template.slug === 'freelance-os'
      ? freelancerMascotCardImg
      : heroArtSrc;

  const priceAnchorNote =
    template.slug === 'freelance-os'
      ? 'Pay once · Less than one billable hour'
      : template.slug === 'student-os'
      ? 'Pay once · Less than one textbook'
      : template.slug === 'nexus-os'
      ? 'Pay once · Replaces 5 monthly apps'
      : template.slug === 'book-tracker-os'
      ? 'Pay once · Less than two hardcovers'
      : template.price === 0
      ? 'Free forever · 60-second duplicate'
      : 'Pay once, keep forever · No subscription';

  return (
    <div data-testid="template-showcase-page" className="pb-24 bg-white">
      {/* =====================================================================
          1. HERO SECTION — SHARP HOOK, BEFORE/AFTER CONTRAST & SINGLE FOCAL ART
          ===================================================================== */}
      <section className="bg-gradient-to-b from-[#FAF9F6] via-[#FDFCFB] to-[#FFFFFF] pt-9 sm:pt-14 pb-12 sm:pb-16 border-b border-[#E9E9E7]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
          {/* Top Breadcrumb + Flagship OS Suite Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav
              aria-label="Breadcrumb"
              data-testid="template-breadcrumb"
              className="flex items-center gap-2 text-[14px] font-medium text-[#52504A]"
            >
              <a
                href="/templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/templates');
                }}
                className="text-[#6E6D68] hover:text-[#37352F] transition-colors cursor-pointer"
              >
                All templates
              </a>
              <span className="text-[#9B9A97]">/</span>
              <span className="text-[#37352F] font-semibold">
                {template.name}
              </span>
            </nav>

            {isFlagshipOs && (
              <div
                aria-label="Switch flagship OS"
                data-testid="flagship-os-switcher"
                className="flex flex-wrap items-center gap-1 p-1 rounded-[10px] bg-white border border-[#E9E9E7]"
              >
                {[
                  { slug: 'nexus-os', label: 'Nexus OS' },
                  { slug: 'book-tracker-os', label: 'Book Tracker OS' },
                  { slug: 'freelance-os', label: 'Freelance OS' },
                  { slug: 'student-os', label: 'Student OS' },
                  { slug: 'researcher-os', label: 'Researcher OS' },
                ].map((os) => {
                  const active = template.slug === os.slug;
                  return (
                    <button
                      key={os.slug}
                      type="button"
                      onClick={() => onNavigate(`/templates/${os.slug}`)}
                      className={`px-3 py-1 rounded-[7px] text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#37352F] text-white'
                          : 'text-[#52504A] hover:text-[#37352F] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {os.label}
                    </button>
                  );
                })}
              </div>
            )}
            {isInteractiveSpotlight && (
              <div
                aria-label="Switch interactive free template"
                data-testid="interactive-free-switcher"
                className="flex flex-wrap items-center gap-1 p-1 rounded-[10px] bg-white border border-[#E9E9E7]"
              >
                {[
                  { slug: 'dopamine-menu', label: 'Dopamine Menu' },
                  { slug: 'travel-planner', label: 'Travel Planner' },
                ].map((item) => {
                  const active = template.slug === item.slug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => onNavigate(`/templates/${item.slug}`)}
                      className={`px-3 py-1 rounded-[7px] text-[12.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#37352F] text-white'
                          : 'text-[#52504A] hover:text-[#37352F] hover:bg-[#FAF9F6]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Balanced 2-Column Hero Split (All 43 Templates) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-center">
            <div className="md:col-span-6 space-y-5">
              <div
                data-testid="made-for-notion-badge"
                className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#52504A]"
              >
                <NotionMarkSvg />
                <span>
                  {template.name} · {template.databaseCount} DBs ·{' '}
                  {template.viewsCount} views
                </span>
              </div>

              <h1 className="font-display text-[clamp(30px,3.6vw,46px)] font-bold tracking-[-0.035em] leading-[1.08] text-[#37352F] text-balance">
                {hook.heroHeadline}
              </h1>

              <p className="text-[16px] sm:text-[17px] leading-[1.55] text-[#52504A] max-w-[520px]">
                {hook.heroLead}
              </p>

              {/* 2-Second Scannable Contrast Box (Loss Aversion -> Immediate Relief) */}
              <div
                data-testid="template-contrast-box"
                className="rounded-[12px] bg-white border border-[#E9E9E7] divide-y divide-[#F1F1EF] text-[13.5px] max-w-[520px]"
              >
                <div className="px-3.5 py-2.5 flex items-start gap-3">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[#9B9A97] w-16 shrink-0 pt-0.5">
                    Without
                  </span>
                  <p className="text-[#6E6D68] leading-[1.4]">
                    {hook.painPoint}
                  </p>
                </div>
                <div className="px-3.5 py-2.5 flex items-start gap-3 bg-[#FAF9F6]/70">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[#0F7B6C] w-16 shrink-0 pt-0.5">
                    With it
                  </span>
                  <p className="text-[#37352F] font-medium leading-[1.4]">
                    {hook.payoff}
                  </p>
                </div>
              </div>

              {/* Price + Behavioral Anchor */}
              <div className="flex flex-wrap items-baseline gap-2.5 pt-0.5">
                <span className="text-[22px] sm:text-[24px] font-bold tracking-[-0.02em] text-[#37352F] tabular-nums">
                  {template.price === 0 ? 'Free ($0)' : formatPrice(template.price)}
                </span>
                {displayCompareAt !== undefined && (
                  <span className="text-[16px] font-medium text-[#9B9A97] line-through tabular-nums">
                    {formatPrice(displayCompareAt)}
                  </span>
                )}
                <span className="text-[13.5px] font-medium text-[#52504A]">
                  {priceAnchorNote}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  type="button"
                  data-testid="template-primary-cta"
                  whileHover={{ y: -2, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  onClick={handleOpenBuy}
                  className="h-12 px-6 rounded-[10px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_10px_24px_-8px_rgba(35,131,226,0.45)] cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <span>
                    {isOwned
                      ? `Open ${template.name}`
                      : template.price === 0
                      ? `Duplicate Free`
                      : `Get ${template.name} — ${formatPrice(template.price)}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  type="button"
                  data-testid="template-preview-inside-btn"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                  onClick={handleScrollToCloserLook}
                  className="h-12 px-5 rounded-[10px] bg-white hover:bg-[#F7F6F3] text-[#37352F] border border-[#D3D1CB] text-[14.5px] font-semibold inline-flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <span>See what&apos;s inside</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2 pt-0.5 text-[13.5px] font-medium text-[#6E6D68]">
                <VerifiedBadgeIcon className="w-4.5 h-4.5 text-[#2383E2] shrink-0" />
                <span>
                  4.9/5 ({reviewsCount} ratings) · {hook.buyerSignal}
                </span>
              </div>
            </div>

            {/* Right Column: Clean Editorial Artwork Stage */}
            <div className="md:col-span-6">
              <button
                type="button"
                data-testid="template-device-mockup"
                onClick={handleScrollToCloserLook}
                aria-label={`Inspect what is inside ${template.name}`}
                style={{
                  backgroundColor: isFlagshipOs ? '#FAF9F6' : template.cardTint,
                }}
                className="group w-full rounded-[22px] bg-editorial-grid border border-[#E9E9E7] hover:border-[#C7C5BE] p-6 sm:p-10 transition-colors duration-200 flex items-center justify-center min-h-[260px] sm:min-h-[340px] lg:min-h-[390px] overflow-hidden cursor-pointer"
              >
                {isFlagshipOs ? (
                  <img
                    src={heroArtSrc}
                    alt={`${template.name} workspace illustration`}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[340px] lg:max-h-[370px] object-contain mix-blend-multiply scale-[1.06] transition-transform duration-300 group-hover:scale-[1.10]"
                  />
                ) : (
                  <BlushAssetImage
                    src={heroArtSrc}
                    alt={`${template.name} illustration`}
                    disableFloat
                    className="w-full max-h-[290px] lg:max-h-[330px]"
                    imgClassName="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Full-Width 3-Column Concrete Proof Strip (Zero Fluff) */}
          <div
            data-testid="flagship-value-strip"
            className="rounded-[14px] bg-white border border-[#E9E9E7] grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E9E9E7]"
          >
            <div className="px-5 py-3.5 space-y-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6E6D68]">
                What&apos;s Built In
              </p>
              <p className="text-[14.5px] font-bold text-[#37352F] tabular-nums">
                {hook.insideItems.length} Core Modules · {template.databaseCount}{' '}
                Databases · {template.viewsCount} Views
              </p>
            </div>
            <div className="px-5 py-3.5 space-y-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6E6D68]">
                Time To First Use
              </p>
              <p className="text-[14.5px] font-bold text-[#37352F]">
                {hook.setupTime} · Works on Notion Free
              </p>
            </div>
            <div className="px-5 py-3.5 space-y-0.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6E6D68]">
                Zero Lock-In
              </p>
              <p className="text-[14.5px] font-bold text-[#37352F]">
                {template.price === 0
                  ? 'Free Forever · Yours to Customize'
                  : 'One-Time Payment · Lifetime Updates'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. WHAT'S ACTUALLY INSIDE (SCANNABLE 4-TO-6 ITEM GRID — ZERO ESSAYS)
          ===================================================================== */}
      <section
        id="template-closer-look"
        data-testid="template-closer-look"
        className="scroll-mt-24 pt-12 sm:pt-16 pb-8 sm:pb-10 max-w-[1200px] mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div className="space-y-1.5">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
              What&apos;s Inside {template.name}
            </p>
            <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F]">
              Everything you get—in plain English.
            </h2>
          </div>
          <p className="text-[13.5px] text-[#6E6D68] tabular-nums">
            {isFlagshipOs || isInteractiveSpotlight
              ? 'Click any module to jump straight to its live view'
              : `${hook.insideItems.length} core blocks ready out of the box`}
          </p>
        </div>

        <div
          data-testid="closer-look-grid"
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            hook.insideItems.length <= 4 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
          } gap-3.5`}
        >
          {hook.insideItems.map((item, index) => {
            const isSelected =
              (isFlagshipOs || isInteractiveSpotlight) &&
              selectedModuleIndex === index;
            const indexLabel = String(index + 1).padStart(2, '0');
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleSelectInsideModule(index)}
                className={`w-full h-full text-left rounded-[12px] bg-white border p-4 flex items-start gap-3 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'border-[#2383E2] bg-[#F7FAFE]'
                    : 'border-[#E9E9E7] hover:border-[#C7C5BE] hover:bg-[#FAF9F6]'
                }`}
              >
                <span
                  className={`font-mono text-[11.5px] font-semibold tabular-nums shrink-0 pt-0.5 ${
                    isSelected ? 'text-[#2383E2]' : 'text-[#6E6D68]'
                  }`}
                >
                  {indexLabel}
                </span>
                <div className="space-y-1 min-w-0">
                  <p className="text-[15px] font-semibold tracking-[-0.015em] text-[#37352F] leading-snug">
                    {item.name}
                  </p>
                  <p className="text-[13.5px] text-[#52504A] leading-[1.45]">
                    {item.whatItDoes}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. LIVE INTERACTIVE PREVIEW (FLAGSHIP OS OR STANDARD TEMPLATE)
          ===================================================================== */}
      {template.slug === 'freelance-os' ? (
        <section
          data-testid="template-cascading-pages"
          className="py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          <FreelanceOsGallery
            variant="detail"
            activeViewFilter={freelanceViewFilter}
            onViewFilterChange={setFreelanceViewFilter}
            onOpenBuy={handleOpenBuy}
            isOwned={isOwned}
            price={template.price}
            compareAt={displayCompareAt}
          />
        </section>
      ) : template.slug === 'student-os' ? (
        <section
          data-testid="template-full-specification"
          className="py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          <StudentOsShowcase
            activeViewFilter={studentViewFilter}
            onViewFilterChange={setStudentViewFilter}
            onOpenBuy={handleOpenBuy}
            isOwned={isOwned}
            price={template.price}
            compareAt={displayCompareAt}
          />
        </section>
      ) : template.slug === 'researcher-os' ? (
        <section
          data-testid="template-full-specification"
          className="py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          <ResearcherOsShowcase
            activeViewFilter={researcherViewFilter}
            onViewFilterChange={setResearcherViewFilter}
            onOpenBuy={handleOpenBuy}
            isOwned={isOwned}
            price={template.price}
            compareAt={displayCompareAt}
          />
        </section>
      ) : template.slug === 'nexus-os' ? (
        <section
          data-testid="template-full-specification"
          className="py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          <NexusOsShowcase
            activeViewFilter={nexusViewFilter}
            onViewFilterChange={setNexusViewFilter}
            onOpenBuy={handleOpenBuy}
            isOwned={isOwned}
            price={template.price}
            compareAt={displayCompareAt}
          />
        </section>
      ) : template.slug === 'book-tracker-os' ? (
        <section
          data-testid="template-full-specification"
          className="py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6"
        >
          <BookTrackerOsShowcase
            activeViewFilter={bookTrackerViewFilter}
            onViewFilterChange={setBookTrackerViewFilter}
            onOpenBuy={handleOpenBuy}
            isOwned={isOwned}
            price={template.price}
            compareAt={displayCompareAt}
          />
        </section>
      ) : template.slug === 'dopamine-menu' ? (
        <section
          id="standard-preview-stage"
          data-testid="template-cascading-pages"
          className="scroll-mt-24 py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#6940A5]">
                Actual Notion Views · Interactive Preview
              </p>
              <h2 className="font-display text-[clamp(22px,2.8vw,30px)] font-bold tracking-[-0.025em] text-[#37352F]">
                Explore every tab inside Dopamine Menu.
              </h2>
            </div>
            <p className="text-[13.5px] text-[#6E6D68]">
              Switch tabs or click any reset card to watch Orders 7d update live.
            </p>
          </div>

          <DopamineMenuShowcase
            activeTab={dopamineTab}
            onTabChange={setDopamineTab}
            isOwned={isOwned}
            onOpenBuy={handleOpenBuy}
            priceLabel={
              template.price === 0
                ? 'Duplicate Free'
                : `Duplicate for ${formatPrice(template.price)}`
            }
          />
        </section>
      ) : template.slug === 'travel-planner' ? (
        <section
          id="standard-preview-stage"
          data-testid="template-cascading-pages"
          className="scroll-mt-24 py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0F7B6C]">
                Actual Notion Views · Interactive Preview
              </p>
              <h2 className="font-display text-[clamp(22px,2.8vw,30px)] font-bold tracking-[-0.025em] text-[#37352F]">
                Explore every tab inside Travel Planner.
              </h2>
            </div>
            <p className="text-[13.5px] text-[#6E6D68]">
              Log expenses, check off bags, or approve permits to watch KPIs update live.
            </p>
          </div>

          <TravelPlannerShowcase
            activeTab={travelTab}
            onTabChange={setTravelTab}
            isOwned={isOwned}
            onOpenBuy={handleOpenBuy}
            priceLabel={
              template.price === 0
                ? 'Duplicate Free'
                : `Duplicate for ${formatPrice(template.price)}`
            }
          />
        </section>
      ) : (
        <section
          id="standard-preview-stage"
          data-testid="template-cascading-pages"
          className="scroll-mt-24 py-8 sm:py-12 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#0F7B6C]">
                Test Drive Before Duplicating
              </p>
              <h2 className="font-display text-[clamp(22px,2.8vw,30px)] font-bold tracking-[-0.025em] text-[#37352F]">
                Try {template.name} right here.
              </h2>
            </div>
            <p className="text-[13.5px] text-[#6E6D68]">
              Check off sample items or add your own row below.
            </p>
          </div>

          <StandardTemplateWorkspace
            template={template}
            hook={hook}
            isOwned={isOwned}
            onOpenBuy={handleOpenBuy}
          />
        </section>
      )}

      {/* =====================================================================
          4. TIGHT CLOSING DECISION CARD (NO REPETITIVE WALLS OF TEXT)
          ===================================================================== */}
      <section className="py-10 sm:py-14 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="rounded-[20px] bg-[#FAF9F6] border border-[#E9E9E7] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
              Ready In 60 Seconds · {template.version}
            </p>
            <h3 className="font-display text-[clamp(23px,2.8vw,30px)] font-bold tracking-[-0.025em] text-[#37352F] text-balance">
              Stop building Notion from scratch. Duplicate {template.name} today.
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {hook.insideItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-start gap-2 text-[13.5px] text-[#37352F] font-medium leading-[1.45]"
                >
                  <Check className="w-4 h-4 text-[#2383E2] shrink-0 mt-0.5" />
                  <span>{item.name}</span>
                </li>
              ))}
              <li className="flex items-start gap-2 text-[13.5px] text-[#52504A] leading-[1.45]">
                <Check className="w-4 h-4 text-[#0F7B6C] shrink-0 mt-0.5" />
                <span>Works on Notion Free forever</span>
              </li>
              <li className="flex items-start gap-2 text-[13.5px] text-[#52504A] leading-[1.45]">
                <Check className="w-4 h-4 text-[#0F7B6C] shrink-0 mt-0.5" />
                <span>
                  {template.price === 0
                    ? 'Instant 1-click duplicate link'
                    : 'Lifetime updates + Circle community'}
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-[16px] bg-white border border-[#E9E9E7] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#6E6D68]">
                  {template.category}
                </p>
                <p className="text-[19px] font-bold text-[#37352F] truncate">
                  {template.name}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[23px] font-bold text-[#37352F] tabular-nums">
                  {formatPrice(template.price)}
                </p>
                <p className="text-[11.5px] text-[#6E6D68]">
                  {template.price === 0 ? 'Free forever' : 'One-time payment'}
                </p>
              </div>
            </div>

            <div className="h-36 sm:h-40 border-y border-[#F1F1EF] py-2.5 flex items-center justify-center overflow-hidden">
              <BlushAssetImage
                src={closingArtSrc}
                alt={`${template.name} preview illustration`}
                disableFloat
                className="w-full h-full"
                imgClassName={`max-w-full max-h-full w-auto h-auto object-contain ${
                  isFlagshipOs ? 'scale-[1.06]' : ''
                }`}
              />
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleOpenBuy}
                className="w-full h-11 px-5 rounded-[10px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(35,131,226,0.45)] cursor-pointer transition-colors"
              >
                <span>
                  {isOwned
                    ? `Open ${template.name} Delivery`
                    : template.price === 0
                    ? `Duplicate ${template.name} Free`
                    : `Get ${template.name} — ${formatPrice(template.price)}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[12px] text-[#6E6D68]">
                {hook.setupTime} · Instant Notion duplicate link
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. RELATED TEMPLATES IN THE SAME CATEGORY
          ===================================================================== */}
      {related.length > 0 && (
        <section className="pt-6 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#E9E9E7]">
          <div className="flex items-center justify-between mb-7 pt-6">
            <div>
              <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
                More in {template.category}
              </h2>
              <p className="text-[14px] text-[#6E6D68]">
                Other Notion systems in this category.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  `/templates?category=${encodeURIComponent(template.category)}`
                )
              }
              className="text-[14px] font-semibold text-[#2383E2] hover:text-[#1B6EC2] inline-flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((item) => (
              <TemplateCard
                key={item.slug}
                template={item}
                onNavigate={onNavigate}
                isPurchased={purchasedSlugs.has(item.slug)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Slim Sticky Purchase Bar for Flagship OS & Interactive Spotlight Pages */}
      {(isFlagshipOs || isInteractiveSpotlight) && showStickyBuyBar && (
        <div
          data-testid="flagship-sticky-buy-bar"
          className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E9E9E7] shadow-[0_-8px_24px_-12px_rgba(55,53,47,0.12)]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-display text-[15px] font-bold text-[#37352F] truncate">
                {template.name}
              </span>
              <span className="hidden sm:inline text-[13px] text-[#6E6D68]">
                · {hook.setupTime} · Works on Notion Free
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden xs:flex items-baseline gap-1.5 tabular-nums">
                <span className="text-[16px] font-bold text-[#37352F]">
                  {template.price === 0 ? 'Free' : formatPrice(template.price)}
                </span>
                {displayCompareAt !== undefined && (
                  <span className="text-[13px] text-[#9B9A97] line-through">
                    {formatPrice(displayCompareAt)}
                  </span>
                )}
              </div>
              <button
                type="button"
                data-testid="flagship-sticky-buy-cta"
                onClick={handleOpenBuy}
                className="h-9 px-4 sm:px-5 rounded-[9px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  {isOwned
                    ? `Open ${template.name}`
                    : template.price === 0
                    ? `Duplicate ${template.name} Free`
                    : `Get ${template.name} — ${formatPrice(template.price)}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
