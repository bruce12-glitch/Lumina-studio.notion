/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  Download,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  APPS,
  BLUSH_ASSETS,
  BLUSH_WORKFLOW_CARDS,
  CATEGORIES,
  Category,
  TEMPLATES,
} from './data/catalog';
import {
  DigitalDeliveryPackage,
  filterTemplates,
  formatPrice,
  getCategoryCounts,
} from './utils/storeLogic';
import {
  FaqAccordion,
  Footer,
  Header,
  LibraryModal,
  MenuOverlay,
  PromoBanner,
  TemplateCard,
  TestimonialsSection,
} from './components/Chrome';
import { CheckoutModal, CheckoutTarget } from './components/CheckoutModal';
import {
  AppIconGlyph,
  BlushAssetImage,
  FeatureMedia,
  HeroWorkspaceMode,
  HeroWorkspaceShowcase,
} from './components/CoversAndIllustrations';
import {
  AllAccessPage,
  AppsPage,
  AuthPage,
  BlogPage,
  FlagshipProductPage,
  StaticInfoPage,
  TemplateDetailPage,
} from './components/SecondaryPages';

const STORAGE_KEY = 'easlo_purchased_deliveries_v1';

function parseLocationState(): { pathname: string; category: Category } {
  const pathname = window.location.pathname || '/';
  const params = new URLSearchParams(window.location.search);
  const rawCat = params.get('category');
  const validCat = CATEGORIES.find((c) => c === rawCat) || 'All';
  return { pathname, category: validCat };
}

export default function App() {
  const [routeState, setRouteState] = useState(parseLocationState);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroMode, setHeroMode] = useState<HeroWorkspaceMode>('second-brain');
  const [checkoutTarget, setCheckoutTarget] = useState<CheckoutTarget | null>(
    null
  );
  const [activeDelivery, setActiveDelivery] =
    useState<DigitalDeliveryPackage | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [purchases, setPurchases] = useState<DigitalDeliveryPackage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const purchasedSlugs = useMemo(
    () => new Set(purchases.map((p) => p.itemSlug)),
    [purchases]
  );

  const navigate = useCallback((targetUrl: string) => {
    window.history.pushState({}, '', targetUrl);
    setRouteState(parseLocationState());
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const selectCategory = useCallback((cat: Category) => {
    const nextUrl =
      cat === 'All'
        ? '/templates'
        : `/templates?category=${encodeURIComponent(cat)}`;
    window.history.pushState({}, '', nextUrl);
    setRouteState({ pathname: '/templates', category: cat });
  }, []);

  // Listen to browser Back / Forward navigation
  useEffect(() => {
    const onPopState = () => {
      setRouteState(parseLocationState());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Global Ctrl+M / Cmd+M shortcut for full-screen Menu Overlay
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Dynamic Document Title + JSON-LD Product Schema on /templates
  useEffect(() => {
    const { pathname } = routeState;
    if (pathname === '/templates') {
      document.title = 'Notion Templates | Easlo';
    } else if (pathname === '/') {
      document.title = 'Easlo';
    } else if (pathname.startsWith('/templates/')) {
      const slug = pathname.replace('/templates/', '');
      const found = TEMPLATES.find((t) => t.slug === slug);
      document.title = found ? `${found.name} | Easlo` : 'Easlo';
    } else {
      document.title = 'Easlo';
    }
  }, [routeState]);

  const handleCompletePurchase = useCallback((pkg: DigitalDeliveryPackage) => {
    setPurchases((prev) => {
      const filtered = prev.filter((item) => item.itemSlug !== pkg.itemSlug);
      const next = [pkg, ...filtered];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  }, []);

  const handleOpenTemplateOrCheckout = useCallback(
    (slug: string) => {
      const found = TEMPLATES.find((t) => t.slug === slug);
      if (!found) return;
      const existing = purchases.find((p) => p.itemSlug === found.slug);
      if (existing) {
        setActiveDelivery(existing);
      } else {
        setCheckoutTarget({
          name: found.name,
          slug: found.slug,
          price: found.price,
          compareAt: found.compareAt,
          pro: found.pro,
          whatsInside: found.whatsInside,
        });
      }
    },
    [purchases]
  );

  // Hero 3-card preview strip: Second Brain, Finance Tracker, Habit Tracker
  const heroPreviewTemplates = useMemo(() => {
    const slugs = ['second-brain', 'finance-tracker', 'habit-tracker'];
    return slugs
      .map((s) => TEMPLATES.find((t) => t.slug === s))
      .filter((t): t is NonNullable<typeof t> => Boolean(t));
  }, []);

  const categoryCounts = useMemo(() => getCategoryCounts(TEMPLATES), []);
  const filteredCatalog = useMemo(
    () => filterTemplates(TEMPLATES, routeState.category, searchQuery),
    [routeState.category, searchQuery]
  );

  // JSON-LD ItemList of 39 Products for /templates SEO requirement
  const templatesJsonLd = useMemo(() => {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: TEMPLATES.length,
      itemListElement: TEMPLATES.map((t, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: t.name,
          category: t.category,
          offers: {
            '@type': 'Offer',
            price: t.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    });
  }, []);

  const { pathname, category } = routeState;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1D1D1F]">
      <Header
        currentPath={pathname}
        onNavigate={navigate}
        onOpenMenu={() => setMenuOpen(true)}
        purchasesCount={purchases.length}
        onOpenLibrary={() => setLibraryOpen(true)}
      />

      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigate}
      />

      <main id="main-content" className="flex-1">
        {pathname === '/' && (
          <div>
            {/* 1. HERO SECTION — Notion × Blush.design Editorial Hero + Live Interactive Workspace */}
            <section className="relative pt-10 pb-20 sm:pt-14 sm:pb-24 max-w-[1200px] mx-auto px-4 sm:px-6 overflow-hidden">
              {/* Subtle Architectural Dot-Matrix Backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-2 h-[560px] rounded-[28px] bg-editorial-grid opacity-55 [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_82%)]"
              />

              {/* Top Editorial Hero Stage: Framed by Large Floating Blush.design Character Vignettes */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Floating Blush Character Stack (Desktop) */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-end pr-2">
                  <motion.div
                    initial={{ opacity: 0, x: -16, rotate: -2 }}
                    animate={{ opacity: 1, x: 0, rotate: -2 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/second-brain')}
                    className="w-full max-w-[235px] rounded-[18px] border border-[#E6E5E3] p-4 shadow-[0_14px_34px_-12px_rgba(17,17,16,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
                    style={{ backgroundColor: '#F8F5E8' }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-[#52504C] mb-1.5">
                      <span>01 · PARA System</span>
                      <span className="font-bold text-[#111110]">$39</span>
                    </div>
                    <div className="rounded-[12px] bg-white border border-[#EAE8E1] p-2">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.notionLineArtCreator}
                        alt="Second Brain Notion line art creator illustration"
                        floatDelay={0.1}
                        className="w-full h-32"
                      />
                    </div>
                    <p className="mt-2 text-[12px] font-semibold text-[#111110] flex items-center justify-between">
                      <span>Second Brain 5.0</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#78756F]" />
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -12, rotate: 1.5 }}
                    animate={{ opacity: 1, x: 0, rotate: 1.5 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/content-os')}
                    className="w-[215px] rounded-[16px] border border-[#E6E5E3] p-3.5 shadow-[0_10px_28px_-10px_rgba(17,17,16,0.07)] hover:-translate-y-1 transition-transform cursor-pointer"
                    style={{ backgroundColor: '#FFF0E3' }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-[#52504C] mb-1.5">
                      <span>02 · Creator Desk</span>
                      <span className="font-bold text-[#111110]">PRO</span>
                    </div>
                    <div className="rounded-[10px] bg-white border border-[#EAE8E1] p-1.5">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.creatorDesktop}
                        alt="Creator desktop studio Blush illustration"
                        floatDelay={0.35}
                        className="w-full h-24"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Center Editorial Headline, Sub-Headline, Primary CTA & Trust Strip */}
                <div className="lg:col-span-6 text-center space-y-6">
                  <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[8px] border border-[#E6E5E3] bg-[#F6F5F4] text-[12px] font-medium text-[#52504C]">
                    <span className="font-semibold text-[#111110]">Easlo Notion Store</span>
                    <span aria-hidden="true" className="text-[#C7C5C0]">·</span>
                    <span>39 Minimalist Systems</span>
                    <span aria-hidden="true" className="text-[#C7C5C0]">·</span>
                    <span className="font-mono text-[11px] text-[#111110]">300k+ Users</span>
                  </div>

                  <div className="space-y-3">
                    <h1 className="font-display text-[clamp(44px,6vw,68px)] font-bold tracking-[-0.04em] leading-[1.02] text-[#111110]">
                      Notion Templates
                    </h1>
                    <p className="font-serif italic text-[22px] sm:text-[26px] font-normal tracking-[-0.01em] text-[#52504C] leading-[1.25]">
                      Where productivity meets calm, visual minimalism.
                    </p>
                  </div>

                  <p className="text-[17px] sm:text-[18.5px] font-normal leading-[1.58] tracking-[-0.008em] text-[#52504C] max-w-[540px] mx-auto">
                    Discover 30+ Notion templates to organize work and life, saving you valuable time.
                  </p>

                  {/* Primary & Secondary Notion CTAs */}
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-3.5">
                    <a
                      href="/templates"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/templates');
                      }}
                      className="h-12 px-7 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] active:translate-y-[1px] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 shadow-[0_10px_24px_-6px_rgba(17,17,16,0.25)]"
                    >
                      <span>Shop Templates</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenTemplateOrCheckout('second-brain')}
                      className="h-12 px-6 rounded-[9px] border border-[#D4D2CC] bg-white hover:bg-[#F6F5F4] text-[#111110] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Get Second Brain ($39)</span>
                    </button>
                  </div>

                  {/* Mobile / Tablet Blush Character Trio (Visible below lg) */}
                  <div className="grid grid-cols-3 gap-3 pt-2 lg:hidden max-w-[520px] mx-auto">
                    <div
                      onClick={() => navigate('/templates/second-brain')}
                      className="rounded-[14px] border border-[#E6E5E3] p-2.5 cursor-pointer"
                      style={{ backgroundColor: '#F8F5E8' }}
                    >
                      <div className="rounded-[10px] bg-white p-1.5">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.notionLineArtCreator}
                          alt="Second Brain illustration"
                          className="w-full h-20"
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] font-semibold text-[#111110] truncate">
                        Second Brain
                      </p>
                    </div>
                    <div
                      onClick={() => navigate('/templates/finance-tracker')}
                      className="rounded-[14px] border border-[#E6E5E3] p-2.5 cursor-pointer"
                      style={{ backgroundColor: '#EDF5FD' }}
                    >
                      <div className="rounded-[10px] bg-white p-1.5">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.financeCharts}
                          alt="Finance Tracker illustration"
                          className="w-full h-20"
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] font-semibold text-[#111110] truncate">
                        Finance Tracker
                      </p>
                    </div>
                    <div
                      onClick={() => navigate('/templates/habit-tracker')}
                      className="rounded-[14px] border border-[#E6E5E3] p-2.5 cursor-pointer"
                      style={{ backgroundColor: '#EBF8EF' }}
                    >
                      <div className="rounded-[10px] bg-white p-1.5">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.calmStudyDesk}
                          alt="Habit Tracker illustration"
                          className="w-full h-20"
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] font-semibold text-[#111110] truncate">
                        Habit Tracker
                      </p>
                    </div>
                  </div>

                  {/* Quiet Automated Delivery & Payment Trust Bar */}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12.5px] text-[#78756F]">
                    <span className="inline-flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-[#111110]" />
                      Instant Notion Duplication
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#111110]" />
                      Stripe & Lemon Squeezy Checkout
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#111110]" />
                      Works on Free Notion Plan
                    </span>
                  </div>
                </div>

                {/* Right Floating Blush Character Stack (Desktop) */}
                <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 items-start pl-2">
                  <motion.div
                    initial={{ opacity: 0, x: 16, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: 2 }}
                    transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/finance-tracker')}
                    className="w-full max-w-[235px] rounded-[18px] border border-[#E6E5E3] p-4 shadow-[0_14px_34px_-12px_rgba(17,17,16,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
                    style={{ backgroundColor: '#EDF5FD' }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-[#52504C] mb-1.5">
                      <span>03 · Cash Flow</span>
                      <span className="font-bold text-[#111110]">$39</span>
                    </div>
                    <div className="rounded-[12px] bg-white border border-[#EAE8E1] p-2">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.financeCharts}
                        alt="Finance Tracker charts Blush illustration"
                        floatDelay={0.2}
                        className="w-full h-32"
                      />
                    </div>
                    <p className="mt-2 text-[12px] font-semibold text-[#111110] flex items-center justify-between">
                      <span>Finance Tracker</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#78756F]" />
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 12, rotate: -1.5 }}
                    animate={{ opacity: 1, x: 0, rotate: -1.5 }}
                    transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/habit-tracker')}
                    className="w-[215px] rounded-[16px] border border-[#E6E5E3] p-3.5 shadow-[0_10px_28px_-10px_rgba(17,17,16,0.07)] hover:-translate-y-1 transition-transform cursor-pointer"
                    style={{ backgroundColor: '#EBF8EF' }}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.08em] text-[#52504C] mb-1.5">
                      <span>04 · Daily Calm</span>
                      <span className="font-bold text-[#15803D]">FREE</span>
                    </div>
                    <div className="rounded-[10px] bg-white border border-[#EAE8E1] p-1.5">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.calmStudyDesk}
                        alt="Calm study desk Blush illustration"
                        floatDelay={0.45}
                        className="w-full h-24"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Interactive Live Notion Workspace Stage (Full 12-Col Centerpiece) */}
              <div className="relative z-10 mt-12 sm:mt-14">
                <HeroWorkspaceShowcase
                  activeMode={heroMode}
                  onSelectMode={setHeroMode}
                  onOpenTemplate={(slug) => navigate(`/templates/${slug}`)}
                  onQuickCheckout={handleOpenTemplateOrCheckout}
                />
              </div>

              {/* Featured Flagship Systems 3-Card Preview Strip */}
              <div className="relative z-10 mt-16 sm:mt-20 pt-12 border-t border-[#E6E5E3]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                  <div>
                    <p className="text-[11.5px] font-mono uppercase tracking-[0.08em] text-[#78756F]">
                      Flagship Notion Systems · Instant One-Click Duplication
                    </p>
                    <h2 className="mt-1 font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#111110]">
                      Most duplicated templates this week
                    </h2>
                  </div>
                  <a
                    href="/templates"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4"
                  >
                    <span>Explore all 39 templates</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {heroPreviewTemplates.map((template, idx) => (
                    <motion.div
                      key={template.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.1 + idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <TemplateCard
                        template={template}
                        onNavigate={navigate}
                        isPurchased={purchasedSlugs.has(template.slug)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. FEATURE SPLIT: SECOND BRAIN */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#F0EFEA]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F8F5E8] border border-[#E6E0C8] text-[11px] font-mono uppercase tracking-[0.08em] text-[#111110]">
                    <span>01 · Flagship PARA OS</span>
                  </div>
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110]">
                    Second Brain
                  </h2>
                  <p className="text-[16.5px] text-[#52504C] leading-[1.6]">
                    An all-in-one Notion system to organize your tasks, projects, goals, and notes.
                  </p>
                  <ul className="space-y-2 text-[14px] text-[#52504C] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Projects, Areas, Resources & Archives (PARA)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Automated Weekly Review & Daily Quick Capture</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="/second-brain"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/second-brain');
                      }}
                      className="h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenTemplateOrCheckout('second-brain')}
                      className="text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Instant Duplicate ($39) →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <FeatureMedia kind="second-brain" />
                </div>
              </div>
            </section>

            {/* 3. MIRRORED SPLIT: ALL-IN-ONE FINANCE DASHBOARD */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#F0EFEA]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <FeatureMedia kind="finance" />
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#EDF5FD] border border-[#D0E3F8] text-[11px] font-mono uppercase tracking-[0.08em] text-[#111110]">
                    <span>02 · Personal & Creator Ledger</span>
                  </div>
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110]">
                    All-In-One Finance Dashboard
                  </h2>
                  <p className="text-[16.5px] text-[#52504C] leading-[1.6]">
                    Bring your financials in one place to get the big picture.
                  </p>
                  <ul className="space-y-2 text-[14px] text-[#52504C] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Monthly Cash Flow, 50/30/20 Budgets & Net Worth</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Subscription Renewal Radar & Tax-Ready Exports</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="/finance-tracker"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/finance-tracker');
                      }}
                      className="h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      <span>Get Finance Tracker</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenTemplateOrCheckout('finance-tracker')}
                      className="text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Instant Duplicate ($39) →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SPLIT: BECOME A DIGITAL MINIMALIST */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#F0EFEA]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#EBF8EF] border border-[#CBEAD5] text-[11px] font-mono uppercase tracking-[0.08em] text-[#111110]">
                    <span>03 · Intentional Workflows</span>
                  </div>
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110]">
                    Become a Digital Minimalist
                  </h2>
                  <p className="text-[16.5px] text-[#52504C] leading-[1.6]">
                    Find tutorials, apps, and wallpapers to turn your devices into minimalist tools.
                  </p>
                  <ul className="space-y-2 text-[14px] text-[#52504C] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>22 Free Notion setups for daily habits, reading & study</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Zero-clutter monochrome layouts that work on any device</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="/blog"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/blog');
                      }}
                      className="h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 transition-colors"
                    >
                      <span>Start Here</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleOpenTemplateOrCheckout('habit-tracker')}
                      className="text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Duplicate Free Habit Tracker ($0) →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <FeatureMedia kind="minimalism" />
                </div>
              </div>
            </section>

            {/* 5. BUILT FOR EVERY WORKFLOW — FULL BLUSH.DESIGN VISUAL BENTO GALLERY */}
            <section className="py-16 sm:py-24 bg-[#F6F5F4] border-t border-[#E6E5E3]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2.5 max-w-[640px]">
                    <span className="inline-flex items-center gap-2 text-[11.5px] font-mono uppercase tracking-[0.08em] text-[#52504C]">
                      <span>Visual System Architecture · Blush.design × Notion</span>
                    </span>
                    <h2 className="font-display text-[clamp(28px,3.6vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110]">
                      Designed for every corner of your work and life
                    </h2>
                    <p className="text-[16px] text-[#52504C] leading-[1.6]">
                      Every template pairs Notion’s relational databases with calm, illustrated visual workspaces—click any workflow below to inspect or duplicate it immediately.
                    </p>
                  </div>

                  <a
                    href="/templates"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[13.5px] font-semibold inline-flex items-center gap-2 self-start md:self-auto shrink-0"
                  >
                    <span>Browse All 39 Templates</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* 6-Card Blush Workflow Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {BLUSH_WORKFLOW_CARDS.map((card, idx) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => navigate(`/templates/${card.templateSlug}`)}
                      className="group rounded-[18px] border border-[#E6E5E3] p-5 flex flex-col justify-between gap-4 hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(17,17,16,0.09)] transition-all cursor-pointer"
                      style={{ backgroundColor: card.tint }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-[6px] bg-white/90 border border-[#E6E5E3] text-[10.5px] font-mono uppercase tracking-[0.07em] font-semibold text-[#111110]">
                            {card.category}
                          </span>
                          <span className="text-[12px] font-mono font-bold text-[#111110] bg-white/90 px-2.5 py-0.5 rounded-[6px] border border-[#E6E5E3]">
                            {card.priceLabel}
                          </span>
                        </div>

                        {/* Large Crisp White Blush Illustration Stage */}
                        <div className="rounded-[14px] bg-white border border-[#EAE8E1] p-4 flex items-center justify-center overflow-hidden shadow-[0_2px_8px_rgba(17,17,16,0.03)]">
                          <BlushAssetImage
                            src={card.assetUrl}
                            alt={card.title}
                            floatDelay={idx * 0.12}
                            className="w-full h-44 sm:h-48 group-hover:scale-[1.03] transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-[19px] font-bold tracking-[-0.02em] text-[#111110]">
                            {card.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-[#52504C] group-hover:text-[#111110] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                        </div>
                        <p className="text-[13.5px] text-[#52504C] leading-[1.55]">
                          {card.subtitle}
                        </p>
                        <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11.5px] font-medium text-[#111110]">
                          <span className="font-mono text-[#52504C]">
                            {card.templateName}
                          </span>
                          <span className="underline underline-offset-4">
                            Inspect Template →
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. TESTIMONIALS SECTION BENEATH FEATURE SPLITS */}
            <TestimonialsSection onNavigate={navigate} />

            {/* 7. APPS BY EASLO */}
            <section className="py-16 sm:py-24 bg-[#F6F5F4] border-t border-[#E6E5E3]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="font-display text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.025em] leading-[1.15] text-[#111110]">
                      Apps by Easlo
                    </h2>
                    <p className="text-[16px] text-[#52504C] leading-[1.6]">
                      Get things done with apps designed with simplicity in mind.
                    </p>
                  </div>

                  <a
                    href="/apps"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/apps');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4 shrink-0"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-180 group-hover:translate-x-[3px]" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {APPS.map((app) => (
                    <a
                      key={app.slug}
                      href={`/apps/${app.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/apps/${app.slug}`);
                      }}
                      className="group p-6 rounded-[16px] border border-[#E6E5E3] bg-white hover:-translate-y-[2px] hover:border-[#D5D2CB] hover:shadow-[0_10px_24px_-6px_rgba(17,17,16,0.06)] transition-all duration-200 flex flex-col justify-between gap-6"
                    >
                      <div className="flex items-start justify-between">
                        <AppIconGlyph icon={app.icon} />
                        <ArrowUpRight className="w-4 h-4 text-[#737373] group-hover:text-[#0A0A0A] transition-transform duration-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-[16px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#0A0A0A]">
                          {app.name}
                        </h3>
                        <p className="text-[14px] text-[#525252] leading-[1.5]">
                          {app.tagline}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {pathname === '/templates' && (
          <div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: templatesJsonLd }}
            />

            {/* 1. Page Head with Blush Illustration Banner */}
            <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F6F5F4] border border-[#E6E5E3] text-[11px] font-mono uppercase tracking-[0.08em] text-[#52504C]">
                    39 Minimalist Systems · 22 Free + 17 PRO
                  </span>
                  <h1 className="font-display text-[clamp(34px,4.5vw,48px)] font-bold tracking-[-0.035em] leading-[1.08] text-[#111110]">
                    Notion Templates
                  </h1>
                  <p className="text-[18px] text-[#52504C] leading-[1.55] max-w-[560px]">
                    Get started with ready-made Notion setups to organize your work and life.
                  </p>
                </div>

                {/* Right: Blush Studio Illustration Trio Card */}
                <div className="lg:col-span-5 grid grid-cols-3 gap-3">
                  <div className="rounded-[14px] border border-[#E6E5E3] bg-[#F8F5E8] p-2.5">
                    <div className="rounded-[10px] bg-white p-1.5">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.notionLineArtCreator}
                        alt="Productivity Notion system illustration"
                        className="w-full h-20"
                      />
                    </div>
                  </div>
                  <div className="rounded-[14px] border border-[#E6E5E3] bg-[#EDF5FD] p-2.5">
                    <div className="rounded-[10px] bg-white p-1.5">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.financeCharts}
                        alt="Finance Notion system illustration"
                        className="w-full h-20"
                      />
                    </div>
                  </div>
                  <div className="rounded-[14px] border border-[#E6E5E3] bg-[#EBF8EF] p-2.5">
                    <div className="rounded-[10px] bg-white p-1.5">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.focusedCreator}
                        alt="Creator Notion system illustration"
                        className="w-full h-20"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Sticky Filter Tabs + Search Bar */}
            <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-y border-[#E6E5E3]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div
                  role="tablist"
                  aria-label="Template categories"
                  className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
                >
                  {CATEGORIES.map((cat, idx) => {
                    const active = category === cat;
                    return (
                      <button
                        key={cat}
                        ref={(el) => {
                          tabRefs.current[idx] = el;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        tabIndex={active ? 0 : -1}
                        onClick={() => selectCategory(cat)}
                        onKeyDown={(e) => {
                          if (e.key === 'ArrowRight') {
                            e.preventDefault();
                            const nextIdx = (idx + 1) % CATEGORIES.length;
                            selectCategory(CATEGORIES[nextIdx]);
                            tabRefs.current[nextIdx]?.focus();
                          } else if (e.key === 'ArrowLeft') {
                            e.preventDefault();
                            const prevIdx =
                              (idx - 1 + CATEGORIES.length) % CATEGORIES.length;
                            selectCategory(CATEGORIES[prevIdx]);
                            tabRefs.current[prevIdx]?.focus();
                          }
                        }}
                        className={`px-[14px] py-[7px] rounded-[8px] text-[13.5px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#111110] text-white border-[#111110]'
                            : 'bg-white text-[#52504C] border-[#E6E5E3] hover:bg-[#F6F5F4] hover:text-[#111110]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input + Active Count */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="relative flex-1 sm:w-56">
                    <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search 39 templates..."
                      aria-label="Search templates"
                      className="w-full h-9 pl-9 pr-3 rounded-[8px] bg-[#F6F5F4] border border-[#E6E5E3] text-[13px] text-[#111110] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#111110]"
                    />
                  </div>
                  <span
                    data-testid="catalog-count"
                    className="text-[13px] text-[#737373] tabular-nums whitespace-nowrap"
                  >
                    {filteredCatalog.length}{' '}
                    {filteredCatalog.length === 1 ? 'template' : 'templates'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Grid of 39 Cards */}
            <section
              aria-label={`${category} Notion templates (${categoryCounts[category]})`}
              className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6"
            >
              <div
                data-testid="template-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCatalog.map((template) => (
                  <TemplateCard
                    key={template.slug}
                    template={template}
                    onNavigate={navigate}
                    isPurchased={purchasedSlugs.has(template.slug)}
                  />
                ))}
              </div>
            </section>

            {/* 4. FAQ Accordion */}
            <FaqAccordion />

            {/* 5. Inverse Promo Banner */}
            <PromoBanner />
          </div>
        )}

        {pathname.startsWith('/templates/') && (
          <TemplateDetailPage
            slug={pathname.replace('/templates/', '')}
            onNavigate={navigate}
            onOpenCheckout={(target) => {
              const existing = purchases.find((p) => p.itemSlug === target.slug);
              if (existing) {
                setActiveDelivery(existing);
              } else {
                setCheckoutTarget(target);
              }
            }}
            purchasedSlugs={purchasedSlugs}
          />
        )}

        {pathname === '/second-brain' && (
          <FlagshipProductPage
            kind="second-brain"
            onNavigate={navigate}
            onOpenCheckout={(target) => setCheckoutTarget(target)}
          />
        )}

        {pathname === '/finance-tracker' && (
          <FlagshipProductPage
            kind="finance-tracker"
            onNavigate={navigate}
            onOpenCheckout={(target) => setCheckoutTarget(target)}
          />
        )}

        {pathname === '/all-access' && (
          <AllAccessPage
            onNavigate={navigate}
            onOpenCheckout={(target) => setCheckoutTarget(target)}
            purchasedSlugs={purchasedSlugs}
          />
        )}

        {pathname === '/apps' && <AppsPage onNavigate={navigate} />}

        {pathname.startsWith('/apps/') && (
          <AppsPage
            slug={pathname.replace('/apps/', '')}
            onNavigate={navigate}
          />
        )}

        {pathname === '/blog' && <BlogPage onNavigate={navigate} />}

        {pathname.startsWith('/blog/') && (
          <BlogPage
            slug={pathname.replace('/blog/', '')}
            onNavigate={navigate}
          />
        )}

        {pathname === '/about' && <StaticInfoPage page="about" />}
        {pathname === '/updates' && <StaticInfoPage page="updates" />}
        {pathname === '/privacy' && <StaticInfoPage page="privacy" />}

        {pathname === '/sign-in' && (
          <AuthPage mode="sign-in" onNavigate={navigate} />
        )}
        {pathname === '/sign-up' && (
          <AuthPage mode="sign-up" onNavigate={navigate} />
        )}
      </main>

      <Footer
        onNavigate={navigate}
        onOpenMenu={() => setMenuOpen(true)}
      />

      <CheckoutModal
        target={checkoutTarget}
        activeDelivery={activeDelivery}
        onClose={() => {
          setCheckoutTarget(null);
          setActiveDelivery(null);
        }}
        onCompletePurchase={handleCompletePurchase}
      />

      <LibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        purchases={purchases}
        onSelectDelivery={(pkg) => setActiveDelivery(pkg)}
      />
    </div>
  );
}
