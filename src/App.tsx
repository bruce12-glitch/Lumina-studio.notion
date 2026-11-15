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
  Search,
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
  UltraHdSvgFilter,
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

const STORAGE_KEY = 'lumina_purchased_deliveries_v1';

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

  // Dynamic Document Title
  useEffect(() => {
    const { pathname } = routeState;
    if (pathname === '/templates') {
      document.title = 'Notion Templates | Lumina';
    } else if (pathname === '/') {
      document.title = 'Lumina';
    } else if (pathname.startsWith('/templates/')) {
      const slug = pathname.replace('/templates/', '');
      const found = TEMPLATES.find((t) => t.slug === slug);
      document.title = found ? `${found.name} | Lumina` : 'Lumina';
    } else {
      document.title = 'Lumina';
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

  // Featured templates on the homepage
  const featuredTemplates = useMemo(() => {
    const slugs = [
      'second-brain',
      'finance-tracker',
      'freelance-os',
      'habit-tracker',
      'content-os',
      'book-tracker',
    ];
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
      <UltraHdSvgFilter />
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
            {/* 1. CLEAN EDITORIAL HERO SECTION */}
            <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-[780px] mx-auto text-center space-y-8">
                {/* 3-Card Illustration Triptych */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 pb-2">
                  {/* Left Card: Focus */}
                  <motion.div
                    initial={{ opacity: 0, y: 12, rotate: -4 }}
                    animate={{ opacity: 1, y: 0, rotate: -4 }}
                    whileHover={{ y: -4, rotate: -2, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/habit-tracker')}
                    className="w-[115px] sm:w-[155px] rounded-[16px] border border-[#E6E5E3] bg-[#FAF9F6] p-2.5 sm:p-3.5 shadow-[0_10px_24px_-8px_rgba(17,17,16,0.07)] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.06em] text-[#78756F] mb-1.5">
                      <span>01 · Focus</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7C5C0]" />
                    </div>
                    <div className="rounded-[10px] bg-white border border-[#EFECE6] p-2 h-20 sm:h-28 flex items-center justify-center">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.mindfulMeditationClock}
                        alt="Minimalist daily habits illustration"
                        disableFloat
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>

                  {/* Center Card: System (PARA) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    transition={{ duration: 0.45, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/second-brain')}
                    className="w-[140px] sm:w-[190px] rounded-[18px] border border-[#DFDDD8] bg-white p-3 sm:p-4 shadow-[0_16px_36px_-10px_rgba(17,17,16,0.10)] z-10 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.06em] text-[#111110] font-semibold mb-2">
                      <span>02 · System</span>
                      <span className="inline-flex items-center gap-1 text-[9px] text-[#15803D]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                        PARA
                      </span>
                    </div>
                    <div className="rounded-[12px] bg-[#FAF9F6] border border-[#EFECE6] p-2.5 h-24 sm:h-32 flex items-center justify-center">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.secondBrainMazeBulb}
                        alt="Second Brain PARA system illustration"
                        disableFloat
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>

                  {/* Right Card: Calm / Finance */}
                  <motion.div
                    initial={{ opacity: 0, y: 12, rotate: 4 }}
                    animate={{ opacity: 1, y: 0, rotate: 4 }}
                    whileHover={{ y: -4, rotate: 2, scale: 1.02 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => navigate('/templates/finance-tracker')}
                    className="w-[115px] sm:w-[155px] rounded-[16px] border border-[#E6E5E3] bg-[#FAF9F6] p-2.5 sm:p-3.5 shadow-[0_10px_24px_-8px_rgba(17,17,16,0.07)] cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.06em] text-[#78756F] mb-1.5">
                      <span>03 · Clarity</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7C5C0]" />
                    </div>
                    <div className="rounded-[10px] bg-white border border-[#EFECE6] p-2 h-20 sm:h-28 flex items-center justify-center">
                      <BlushAssetImage
                        src={BLUSH_ASSETS.mobilePiggyPortfolio}
                        alt="Finance Tracker illustration"
                        disableFloat
                        className="w-full h-full"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Headline & Subtitle */}
                <div className="space-y-4">
                  <h1 className="font-display text-[clamp(44px,6.2vw,72px)] font-bold tracking-[-0.04em] leading-[1.02] text-[#111110] text-balance">
                    Notion Templates
                  </h1>
                  <p className="text-[18px] sm:text-[20px] font-normal leading-[1.55] tracking-[-0.01em] text-[#52504C] max-w-[520px] mx-auto">
                    Discover 30+ Notion templates to organize work and life, saving you valuable time.
                  </p>
                </div>

                {/* Primary & Secondary CTAs with Tactile Spring Motion */}
                <div className="pt-1 flex flex-wrap items-center justify-center gap-3.5">
                  <motion.a
                    href="/templates"
                    whileHover={{ y: -2, scale: 1.018 }}
                    whileTap={{ y: 0.5, scale: 0.975 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="btn-motion-primary h-12 px-7 rounded-[10px] bg-[#111110] hover:bg-[#242422] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                  >
                    <span>Shop Templates</span>
                    <ArrowRight className="w-4 h-4 btn-arrow-slide" />
                  </motion.a>

                  <motion.button
                    type="button"
                    whileHover={{ y: -2, scale: 1.015 }}
                    whileTap={{ y: 0.5, scale: 0.975 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    onClick={() => handleOpenTemplateOrCheckout('second-brain')}
                    className="btn-motion-secondary h-12 px-6 rounded-[10px] border border-[#D4D2CC] bg-white hover:bg-[#F7F6F4] text-[#111110] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Get Second Brain ($39)</span>
                  </motion.button>
                </div>
              </div>

              {/* Curated Featured Templates Grid */}
              <div className="mt-16 sm:mt-20 pt-14 border-t border-[#E6E5E3]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                  <div className="space-y-1">
                    <h2 className="font-display text-[24px] sm:text-[28px] font-bold tracking-[-0.025em] text-[#111110]">
                      Featured Templates
                    </h2>
                    <p className="text-[15px] text-[#52504C]">
                      Our most popular workspaces for personal productivity, finance, and business.
                    </p>
                  </div>
                  <a
                    href="/templates"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#111110] hover:underline underline-offset-4"
                  >
                    <span>View all 39 templates</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTemplates.map((template, idx) => (
                    <motion.div
                      key={template.slug}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 + idx * 0.05,
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
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110] text-balance">
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
                      <span>Weekly Review & Daily Quick Capture</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.a
                      href="/second-brain"
                      whileHover={{ y: -2, scale: 1.015 }}
                      whileTap={{ scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/second-brain');
                      }}
                      className="btn-motion-primary h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 btn-arrow-slide" />
                    </motion.a>
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
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110] text-balance">
                    All-In-One Finance Dashboard
                  </h2>
                  <p className="text-[16.5px] text-[#52504C] leading-[1.6]">
                    Bring your financials in one place to get the big picture.
                  </p>
                  <ul className="space-y-2 text-[14px] text-[#52504C] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Monthly Cash Flow, Budgets & Net Worth</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Subscription Tracker & Savings Targets</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.a
                      href="/finance-tracker"
                      whileHover={{ y: -2, scale: 1.015 }}
                      whileTap={{ scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/finance-tracker');
                      }}
                      className="btn-motion-primary h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Get Finance Tracker</span>
                      <ArrowRight className="w-4 h-4 btn-arrow-slide" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SPLIT: BECOME A DIGITAL MINIMALIST */}
            <section className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#F0EFEA]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#111110] text-balance">
                    Become a Digital Minimalist
                  </h2>
                  <p className="text-[16.5px] text-[#52504C] leading-[1.6]">
                    Find tutorials, apps, and templates to turn your devices into minimalist tools.
                  </p>
                  <ul className="space-y-2 text-[14px] text-[#52504C] pt-1">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>22 Free Notion templates for daily habits, reading & study</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#111110] shrink-0" />
                      <span>Clean monochrome layouts that work on any device</span>
                    </li>
                  </ul>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <motion.a
                      href="/blog"
                      whileHover={{ y: -2, scale: 1.015 }}
                      whileTap={{ scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/blog');
                      }}
                      className="btn-motion-primary h-11 px-5 rounded-[9px] bg-[#111110] hover:bg-[#2B2B29] text-white text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Start Here</span>
                      <ArrowRight className="w-4 h-4 btn-arrow-slide" />
                    </motion.a>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <FeatureMedia kind="minimalism" />
                </div>
              </div>
            </section>

            {/* 5. TESTIMONIALS SECTION BENEATH FEATURE SPLITS */}
            <TestimonialsSection onNavigate={navigate} />

            {/* 6. APPS BY LUMINA */}
            <section className="py-16 sm:py-24 bg-[#F6F5F4] border-t border-[#E6E5E3]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="font-display text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.025em] leading-[1.15] text-[#111110]">
                      Apps by Lumina
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
                  {APPS.map((app, idx) => (
                    <a
                      key={app.slug}
                      href={`/apps/${app.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/apps/${app.slug}`);
                      }}
                      className="group p-5 rounded-[18px] border border-[#E6E5E3] bg-white hover:-translate-y-[3px] hover:border-[#D5D2CB] hover:shadow-[0_14px_30px_-8px_rgba(17,17,16,0.08)] transition-all duration-200 flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <AppIconGlyph icon={app.icon} />
                        <ArrowUpRight className="w-4 h-4 text-[#737373] group-hover:text-[#0A0A0A] transition-transform duration-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                      <div
                        style={{ backgroundColor: app.cardTint }}
                        className="rounded-[12px] border border-[#EAE8E1] p-2.5 flex items-center justify-center"
                      >
                        <div className="w-full h-36 rounded-[9px] bg-white border border-[#F0EFEA] p-2 flex items-center justify-center">
                          <BlushAssetImage
                            src={app.illustrationUrl}
                            alt={`${app.name} — ${app.tagline} illustration`}
                            floatDelay={idx * 0.25}
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 pt-0.5">
                        <h3 className="text-[16.5px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#0A0A0A]">
                          {app.name}
                        </h3>
                        <p className="text-[13.5px] text-[#525252] leading-[1.5]">
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
            <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-[640px] space-y-3">
                <h1 className="font-display text-[clamp(34px,4.5vw,48px)] font-bold tracking-[-0.035em] leading-[1.08] text-[#111110]">
                  Notion Templates
                </h1>
                <p className="text-[18px] text-[#52504C] leading-[1.55]">
                  Get started with ready-made Notion setups to organize your work and life.
                </p>
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
                      <motion.button
                        key={cat}
                        ref={(el) => {
                          tabRefs.current[idx] = el;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        tabIndex={active ? 0 : -1}
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
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
                            ? 'bg-[#111110] text-white border-[#111110] shadow-[0_4px_12px_rgba(17,17,16,0.18)]'
                            : 'bg-white text-[#52504C] border-[#E6E5E3] hover:bg-[#F6F5F4] hover:text-[#111110]'
                        }`}
                      >
                        {cat}
                      </motion.button>
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
                      placeholder="Search templates..."
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
