/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Download,
  Search,
  ShieldCheck,
} from 'lucide-react';
import {
  APPS,
  BLUSH_ASSETS,
  CATEGORIES,
  Category,
  TEMPLATES,
} from './data/catalog';
import {
  DigitalDeliveryPackage,
  filterTemplates,
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
    <div className="min-h-screen flex flex-col bg-[#FDFCFB] text-[#111110]">
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
            {/* 1. HERO SECTION — SOTA Asymmetric 12-Column Editorial Split Stage & Interactive Notion Workspace */}
            <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              {/* Subtle Architectural Dot-Matrix Backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 top-2 h-[540px] rounded-[28px] bg-editorial-grid opacity-65 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
              />

              {/* Primary Asymmetric 12-Column Hero Split */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center animate-fade-up">
                {/* Left Column (5 Cols): Editorial Display Typography, Actions, & Metric Ledger */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  {/* Studio Creator Eyebrow Pill with Floating Blush Vignette */}
                  <div className="inline-flex items-center gap-3 pr-4 pl-2 py-1.5 rounded-full border border-[#E8E6E1] bg-[#F7F6F2] shadow-[0_2px_10px_rgba(17,17,16,0.03)]">
                    <BlushAssetImage
                      src={BLUSH_ASSETS.notionLineArtCreator}
                      alt="Easlo Notion creator studio illustration"
                      floatDelay={0.1}
                      className="w-8 h-7 rounded-full bg-[#FDFCFB] border border-[#E8E6E1] p-0.5 shrink-0"
                    />
                    <div className="flex items-center gap-2 text-[12px] font-medium text-[#52504C]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse-soft" />
                      <span className="font-semibold text-[#111110]">Easlo Studio</span>
                      <span aria-hidden="true" className="text-[#D5D2CB]">·</span>
                      <span>300k+ Duplications</span>
                    </div>
                  </div>

                  {/* Display Heading + Editorial Serif Sub-Accent */}
                  <div className="space-y-2.5">
                    <h1 className="text-[clamp(42px,5.2vw,60px)] font-[680] tracking-[-0.038em] leading-[1.03] text-[#111110]">
                      Notion Templates
                    </h1>
                    <p className="font-serif italic text-[21px] sm:text-[24px] font-normal tracking-[-0.01em] text-[#52504C] leading-[1.25]">
                      Crafted for calm, daily execution.
                    </p>
                  </div>

                  <p className="text-[16.5px] sm:text-[17.5px] font-normal leading-[1.6] tracking-[-0.005em] text-[#52504C] max-w-[480px]">
                    Discover 30+ Notion templates to organize work and life, saving you valuable time.
                  </p>

                  {/* Primary & Secondary CTAs */}
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <a
                      href="/templates"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/templates');
                      }}
                      className="h-12 px-6 rounded-[10px] bg-[#111110] hover:bg-[#262523] active:translate-y-[1px] text-[#FDFCFB] text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 shadow-[0_8px_20px_-4px_rgba(17,17,16,0.22)]"
                    >
                      <span>Shop Templates</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        const sb = TEMPLATES.find((t) => t.slug === 'second-brain')!;
                        setCheckoutTarget({
                          name: sb.name,
                          slug: sb.slug,
                          price: sb.price,
                          compareAt: sb.compareAt,
                          pro: sb.pro,
                          whatsInside: sb.whatsInside,
                        });
                      }}
                      className="h-12 px-5 rounded-[10px] border border-[#D5D2CB] bg-[#FDFCFB] hover:bg-[#F7F6F3] text-[#111110] text-[14px] font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Get Second Brain ($39)</span>
                    </button>
                  </div>

                  {/* Architectural 3-Column Metric & Blush Character Ledger */}
                  <div className="pt-3 border-t border-[#E8E6E1] grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[20px] font-bold tracking-[-0.025em] text-[#111110] tabular-nums">
                        39
                      </p>
                      <p className="text-[12px] text-[#78756F]">
                        Ready-made setups
                      </p>
                    </div>
                    <div>
                      <p className="text-[20px] font-bold tracking-[-0.025em] text-[#111110] tabular-nums">
                        22 Free
                      </p>
                      <p className="text-[12px] text-[#78756F]">
                        Zero-cost templates
                      </p>
                    </div>
                    <div>
                      <p className="text-[20px] font-bold tracking-[-0.025em] text-[#111110] tabular-nums">
                        4.98 / 5
                      </p>
                      <p className="text-[12px] text-[#78756F]">
                        Verified rating
                      </p>
                    </div>
                  </div>

                  {/* Quiet Trust & Automated Delivery Strip */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-[#78756F]">
                    <span className="inline-flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-[#111110]" />
                      Instant Notion Duplication
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#111110]" />
                      Stripe & Lemon Squeezy
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#111110]" />
                      Free Notion Plan Ready
                    </span>
                  </div>
                </div>

                {/* Right Column (7 Cols): Interactive Live Notion Workspace Stage */}
                <div className="lg:col-span-7">
                  <HeroWorkspaceShowcase
                    activeMode={heroMode}
                    onSelectMode={setHeroMode}
                    onOpenTemplate={(slug) => navigate(`/templates/${slug}`)}
                    onQuickCheckout={(slug) => {
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
                    }}
                  />
                </div>
              </div>

              {/* Featured Flagship Systems 3-Card Preview Strip */}
              <div className="relative z-10 mt-16 sm:mt-20 pt-10 border-t border-[#E8E6E1]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
                  <div>
                    <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#78756F]">
                      Flagship Notion Systems · One-Click Duplication
                    </p>
                    <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold tracking-[-0.02em] text-[#111110]">
                      Most duplicated templates this week
                    </h2>
                  </div>
                  <a
                    href="/templates"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#111110] hover:underline underline-offset-4"
                  >
                    <span>Explore all 39 templates</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
                        delay: 0.12 + idx * 0.08,
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
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                  <h2 className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#0A0A0A]">
                    Second Brain
                  </h2>
                  <p className="text-[16px] text-[#525252] leading-[1.6]">
                    An all-in-one Notion system to organize your tasks, projects, goals, and notes.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/second-brain"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/second-brain');
                      }}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#0A0A0A] hover:underline underline-offset-4"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-180 group-hover:translate-x-[3px]" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <FeatureMedia kind="second-brain" />
                </div>
              </div>
            </section>

            {/* 3. MIRRORED SPLIT: ALL-IN-ONE FINANCE DASHBOARD */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-7">
                  <FeatureMedia kind="finance" />
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <h2 className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#0A0A0A]">
                    All-In-One Finance Dashboard
                  </h2>
                  <p className="text-[16px] text-[#525252] leading-[1.6]">
                    Bring your financials in one place to get the big picture.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/finance-tracker"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/finance-tracker');
                      }}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#0A0A0A] hover:underline underline-offset-4"
                    >
                      <span>Get Finance Tracker</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-180 group-hover:translate-x-[3px]" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SPLIT: BECOME A DIGITAL MINIMALIST */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                  <h2 className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#0A0A0A]">
                    Become a Digital Minimalist
                  </h2>
                  <p className="text-[16px] text-[#525252] leading-[1.6]">
                    Find tutorials, apps, and wallpapers to turn your devices into minimalist tools.
                  </p>
                  <div className="pt-2">
                    <a
                      href="/blog"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/blog');
                      }}
                      className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#0A0A0A] hover:underline underline-offset-4"
                    >
                      <span>Start Here</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-180 group-hover:translate-x-[3px]" />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <FeatureMedia kind="minimalism" />
                </div>
              </div>
            </section>

            {/* TESTIMONIALS SECTION BENEATH FEATURE SPLITS */}
            <TestimonialsSection onNavigate={navigate} />

            {/* 5. APPS BY EASLO (#F7F6F3 Warm Alabaster Full-Bleed Band) */}
            <section className="py-16 sm:py-24 bg-[#F7F6F3] border-t border-[#E8E6E1]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#111110]">
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
                    className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111110] hover:underline underline-offset-4 shrink-0"
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
                      className="group p-6 rounded-[16px] border border-[#E8E6E1] bg-[#FDFCFB] hover:-translate-y-[2px] hover:border-[#D5D2CB] hover:shadow-[0_10px_24px_-6px_rgba(17,17,16,0.06)] transition-all duration-200 flex flex-col justify-between gap-6"
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

            {/* 1. Page Head */}
            <section className="pt-14 pb-10 sm:pt-20 sm:pb-14 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-[640px] space-y-3">
                <h1 className="text-[clamp(32px,4.5vw,44px)] font-[650] tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
                  Notion Templates
                </h1>
                <p className="text-[18px] text-[#525252] leading-[1.55]">
                  Get started with ready-made Notion setups to organize your work and life.
                </p>
              </div>
            </section>

            {/* 2. Sticky Filter Tabs + Search Bar */}
            <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-y border-[#EAEAEA]">
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
                        className={`px-[14px] py-[8px] rounded-full text-[14px] font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                            : 'bg-white text-[#525252] border-[#EAEAEA] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]'
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
                      className="w-full h-9 pl-9 pr-3 rounded-[8px] bg-[#FAFAFA] border border-[#EAEAEA] text-[13px] text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#0A0A0A]"
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
