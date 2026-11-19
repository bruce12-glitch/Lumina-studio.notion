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
  AppCard,
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

const HERO_PATHWAY_CARDS: Array<{
  id: 'life' | 'work' | 'idea';
  title: string;
  subtitle: string;
  href: string;
}> = [
  {
    id: 'life',
    title: 'For your life',
    subtitle: 'Give everyday plans a home.',
    href: '/second-brain',
  },
  {
    id: 'work',
    title: 'For your work',
    subtitle: 'Connect the moving parts.',
    href: '/templates?category=Business',
  },
  {
    id: 'idea',
    title: 'For your next idea',
    subtitle: 'Make space to create.',
    href: '/apps',
  },
];

const HOME_FEATURE_SPLITS: Array<{
  kind: 'second-brain' | 'finance' | 'minimalism';
  eyebrow: string;
  eyebrowTint: string;
  eyebrowInk: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  href: string;
  mediaFirst?: boolean;
}> = [
  {
    kind: 'second-brain',
    eyebrow: 'Personal System · PARA',
    eyebrowTint: '#EBF3FC',
    eyebrowInk: '#2383E2',
    title: 'Second Brain',
    description:
      'An all-in-one Notion system to organize your tasks, projects, goals, and notes.',
    bullets: [
      'Projects, Areas, Resources & Archives (PARA)',
      'Weekly Review & Daily Quick Capture',
    ],
    ctaLabel: 'Learn More',
    href: '/second-brain',
  },
  {
    kind: 'finance',
    eyebrow: 'Clarity & Cash Flow',
    eyebrowTint: '#E7F4F0',
    eyebrowInk: '#0F7B6C',
    title: 'All-In-One Finance Dashboard',
    description:
      'Bring your financials in one place to get the big picture.',
    bullets: [
      'Monthly Cash Flow, Budgets & Net Worth',
      'Subscription Tracker & Savings Targets',
    ],
    ctaLabel: 'Get Finance Tracker',
    href: '/finance-tracker',
    mediaFirst: true,
  },
  {
    kind: 'minimalism',
    eyebrow: 'Free Workspace Collection',
    eyebrowTint: '#F1F1EF',
    eyebrowInk: '#37352F',
    title: 'Become a Digital Minimalist',
    description:
      'Find tutorials, apps, and templates to turn your devices into minimalist tools.',
    bullets: [
      '22 Free Notion templates for daily habits, reading & study',
      'Clean monochrome layouts that work on any device',
    ],
    ctaLabel: 'Start Here',
    href: '/blog',
  },
];

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
      document.title = 'Notion Templates | Resonance';
    } else if (pathname === '/') {
      document.title = 'Resonance';
    } else if (pathname.startsWith('/templates/')) {
      const slug = pathname.replace('/templates/', '');
      const found = TEMPLATES.find((t) => t.slug === slug);
      document.title = found ? `${found.name} | Resonance` : 'Resonance';
    } else {
      document.title = 'Resonance';
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
      'student-os',
      'researcher-os',
      'habit-tracker',
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

  // JSON-LD ItemList of 41 Products for /templates SEO requirement
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
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#37352F]">
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
            {/* 1. CLEAN EDITORIAL HERO SECTION WITH WARM NOTION PAPER WASH */}
            <section className="relative bg-gradient-to-b from-[#FAF9F6] via-[#FDFCFB] to-[#FFFFFF] border-b border-[#E9E9E7]">
              <div className="pt-10 pb-14 sm:pt-14 sm:pb-20 max-w-[1200px] mx-auto px-4 sm:px-6">
                <div className="max-w-[780px] mx-auto text-center space-y-7">
                  {/* Unboxed Notion Editorial Kicker */}
                  <div className="flex justify-center">
                    <div
                      data-testid="hero-notion-pill"
                      className="inline-flex items-center gap-2 text-[13.5px] font-medium text-[#52504A]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="shrink-0 text-[#37352F]"
                      >
                        <path
                          d="M4.5 5.2L15.8 4.2L19.5 6.8V18.8L8.2 19.8L4.5 17.2V5.2Z"
                          fill="#FFFFFF"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.5 5.2L8.2 7.8L19.5 6.8M8.2 7.8V19.8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 16.2V10.6L15.6 15.8V10.2"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Your life. Your work. In Notion.</span>
                    </div>
                  </div>

                  {/* 3-Card Illustration Triptych (Accessible Native Buttons, Single-Surface Stages) */}
                  <div className="flex items-center justify-center gap-3 sm:gap-5 pb-1">
                    {/* Left Card: Focus */}
                    <motion.button
                      type="button"
                      initial={{ opacity: 1, rotate: -3.5 }}
                      whileHover={{ y: -4, rotate: -1.5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => navigate('/templates/habit-tracker')}
                      aria-label="Inspect Habit Tracker template"
                      className="w-[116px] sm:w-[158px] rounded-[14px] border border-[#DCE8E1] bg-[#EFF7F3] p-3 sm:p-3.5 shadow-[0_10px_24px_-12px_rgba(55,53,47,0.12)] cursor-pointer text-left"
                    >
                      <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.06em] text-[#52504A] mb-2 whitespace-nowrap">
                        01 · Focus
                      </div>
                      <div className="h-20 sm:h-28 flex items-center justify-center">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.mindfulMeditationClock}
                          alt="Minimalist daily habits illustration"
                          disableFloat
                          className="w-full h-full"
                        />
                      </div>
                    </motion.button>

                    {/* Center Card: System (PARA) */}
                    <motion.button
                      type="button"
                      whileHover={{ y: -5, scale: 1.025 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => navigate('/templates/second-brain')}
                      aria-label="Inspect Second Brain PARA system template"
                      className="w-[144px] sm:w-[192px] rounded-[16px] border border-[#D3D1CB] bg-white p-3.5 sm:p-4 shadow-[0_16px_36px_-14px_rgba(55,53,47,0.14)] z-10 cursor-pointer text-left"
                    >
                      <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.05em] text-[#37352F] font-semibold mb-2 whitespace-nowrap">
                        <span>02 · System</span>
                        <span className="text-[#0F7B6C] shrink-0">PARA</span>
                      </div>
                      <div className="h-24 sm:h-32 flex items-center justify-center">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.secondBrainMazeBulb}
                          alt="Second Brain PARA system illustration"
                          disableFloat
                          className="w-full h-full"
                        />
                      </div>
                    </motion.button>

                    {/* Right Card: Calm / Finance */}
                    <motion.button
                      type="button"
                      initial={{ opacity: 1, rotate: 3.5 }}
                      whileHover={{ y: -4, rotate: 1.5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => navigate('/templates/finance-tracker')}
                      aria-label="Inspect Finance Tracker template"
                      className="w-[116px] sm:w-[158px] rounded-[14px] border border-[#DAE6F3] bg-[#EFF5FB] p-3 sm:p-3.5 shadow-[0_10px_24px_-12px_rgba(55,53,47,0.12)] cursor-pointer text-left"
                    >
                      <div className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.06em] text-[#52504A] mb-2 whitespace-nowrap">
                        03 · Clarity
                      </div>
                      <div className="h-20 sm:h-28 flex items-center justify-center">
                        <BlushAssetImage
                          src={BLUSH_ASSETS.mobilePiggyPortfolio}
                          alt="Finance Tracker illustration"
                          disableFloat
                          className="w-full h-full"
                        />
                      </div>
                    </motion.button>
                  </div>

                  {/* Headline & Subtitle */}
                  <div className="space-y-4">
                    <h1 className="font-display text-[clamp(44px,6vw,70px)] font-bold tracking-[-0.035em] leading-[1.03] text-[#37352F] text-balance">
                      Notion{' '}
                      <span className="font-editorial italic font-medium tracking-[-0.02em]">
                        Templates
                      </span>
                    </h1>
                    <p className="text-[17.5px] sm:text-[19.5px] font-normal leading-[1.55] tracking-[-0.01em] text-[#52504A] max-w-[540px] mx-auto">
                      Discover 41 minimalist Notion systems to organize your work, academic research, study, and daily life.
                    </p>
                  </div>

                  {/* Primary & Secondary CTAs */}
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-3.5">
                    <motion.a
                      href="/templates"
                      whileHover={{ y: -2, scale: 1.015 }}
                      whileTap={{ y: 0.5, scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/templates');
                      }}
                      className="btn-motion-primary h-12 px-7 rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
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
                      className="btn-motion-secondary h-12 px-6 rounded-[10px] border border-[#D3D1CB] bg-white hover:bg-[#F7F6F3] text-[#37352F] text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Get Second Brain ($39)</span>
                    </motion.button>
                  </div>
                </div>

                {/* 3-Column Hero Pathway Cards */}
                <div
                  data-testid="hero-pathway-cards"
                  className="mt-12 sm:mt-14 max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
                >
                  {HERO_PATHWAY_CARDS.map((card) => {
                    const iconTone =
                      card.id === 'life'
                        ? 'bg-[#E6F4EC] text-[#0F7B6C]'
                        : card.id === 'work'
                        ? 'bg-[#EBF3FC] text-[#2383E2]'
                        : 'bg-[#FDF4E7] text-[#B45309]';
                    return (
                      <a
                        key={card.id}
                        href={card.href}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(card.href);
                        }}
                        className="group card-editorial-surface rounded-[14px] bg-white border border-[#E9E9E7] px-5 py-4.5 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={`w-10 h-10 rounded-[10px] ${iconTone} flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105`}
                          >
                            {card.id === 'life' && (
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                              </svg>
                            )}
                            {card.id === 'work' && (
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <rect x="3" y="7" width="18" height="13" rx="2.5" />
                                <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
                                <path d="M3 12.5c3 1.8 6 2.5 9 2.5s6-.7 9-2.5" />
                                <line x1="12" y1="12" x2="12.01" y2="12" />
                              </svg>
                            )}
                            {card.id === 'idea' && (
                              <svg
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M2 4.5C2 3.67 2.67 3 3.5 3H8c2.2 0 4 1.8 4 4v13.5c0-1.66-1.34-3-3-3H3.5A1.5 1.5 0 0 1 2 16V4.5Z" />
                                <path d="M22 4.5C22 3.67 21.33 3 20.5 3H16c-2.2 0-4 1.8-4 4v13.5c0-1.66 1.34-3 3-3h5.5a1.5 1.5 0 0 0 1.5-1.5V4.5Z" />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0 text-left space-y-0.5">
                            <h2 className="text-[16.5px] font-semibold tracking-[-0.015em] text-[#37352F] leading-snug">
                              {card.title}
                            </h2>
                            <p className="text-[13.5px] text-[#6E6D68] leading-snug truncate">
                              {card.subtitle}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#6E6D68] group-hover:text-[#2383E2] shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Curated Featured Templates Grid */}
            <section className="py-16 sm:py-20 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                  <div className="space-y-1">
                    <h2 className="font-display text-[24px] sm:text-[28px] font-bold tracking-[-0.025em] text-[#37352F]">
                      Featured Templates
                    </h2>
                    <p className="text-[15px] text-[#52504A]">
                      Our most popular workspaces for personal productivity, finance, and business.
                    </p>
                  </div>
                  <a
                    href="/templates"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/templates');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2383E2] hover:text-[#1B6EC2] hover:underline underline-offset-4"
                  >
                    <span>View all {TEMPLATES.length} templates</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {featuredTemplates.map((template) => (
                    <TemplateCard
                      key={template.slug}
                      template={template}
                      onNavigate={navigate}
                      isPurchased={purchasedSlugs.has(template.slug)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 2–4. CORE PRODUCT FEATURE SPLITS */}
            {HOME_FEATURE_SPLITS.map((split) => (
              <section
                key={split.kind}
                className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#EFEFED]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  <div
                    className={`lg:col-span-5 space-y-5 ${
                      split.mediaFirst ? 'lg:order-2' : 'order-2 lg:order-1'
                    }`}
                  >
                    <p
                      style={{ color: split.eyebrowInk }}
                      className="text-[12px] font-bold uppercase tracking-[0.08em]"
                    >
                      {split.eyebrow}
                    </p>
                    <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#37352F] text-balance">
                      {split.title}
                    </h2>
                    <p className="text-[16.5px] text-[#52504A] leading-[1.6]">
                      {split.description}
                    </p>
                    <ul className="space-y-2 text-[14px] text-[#52504A] pt-1">
                      {split.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-[#2383E2] shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <motion.a
                        href={split.href}
                        whileHover={{ y: -2, scale: 1.015 }}
                        whileTap={{ scale: 0.975 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(split.href);
                        }}
                        className="btn-motion-primary h-11 px-5 rounded-[9px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[14px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                      >
                        <span>{split.ctaLabel}</span>
                        <ArrowRight className="w-4 h-4 btn-arrow-slide" />
                      </motion.a>
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-7 ${
                      split.mediaFirst ? 'lg:order-1' : 'order-1 lg:order-2'
                    }`}
                  >
                    <FeatureMedia kind={split.kind} />
                  </div>
                </div>
              </section>
            ))}

            {/* 5. TESTIMONIALS SECTION BENEATH FEATURE SPLITS */}
            <TestimonialsSection onNavigate={navigate} />

            {/* 6. APPS BY RESONANCE */}
            <section className="py-16 sm:py-24 bg-[#F7F6F3] border-t border-[#E9E9E7]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="font-display text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.025em] leading-[1.15] text-[#37352F]">
                      Apps by Resonance
                    </h2>
                    <p className="text-[16px] text-[#52504A] leading-[1.6]">
                      Get things done with apps designed with simplicity in mind.
                    </p>
                  </div>

                  <a
                    href="/apps"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/apps');
                    }}
                    className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#37352F] hover:underline underline-offset-4 shrink-0"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-180 group-hover:translate-x-[3px]" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {APPS.map((app, idx) => (
                    <AppCard
                      key={app.slug}
                      app={app}
                      index={idx}
                      onNavigate={navigate}
                    />
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
            <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 max-w-[1200px] mx-auto px-4 sm:px-6">
              <div className="max-w-[680px] space-y-3">
                <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
                  {TEMPLATES.length} Curated Systems · Free &amp; PRO
                </p>
                <h1 className="font-display text-[clamp(34px,4.5vw,50px)] font-bold tracking-[-0.035em] leading-[1.06] text-[#37352F]">
                  Notion{' '}
                  <span className="font-editorial italic font-medium text-[#2383E2]">
                    Templates
                  </span>
                </h1>
                <p className="text-[17px] sm:text-[18px] text-[#52504A] leading-[1.55]">
                  Get started with ready-made Notion setups to organize your work, research, and daily routines.
                </p>
              </div>
            </section>

            {/* 2. Sticky Filter Tabs + Search Bar */}
            <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-y border-[#E9E9E7]">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div
                  role="tablist"
                  aria-label="Template categories"
                  className="flex flex-wrap md:flex-nowrap items-center gap-1.5 sm:gap-2 md:overflow-x-auto no-scrollbar py-0.5"
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
                        className={`px-3 py-1.5 sm:px-[14px] sm:py-[7px] rounded-[8px] text-[12.5px] sm:text-[13.5px] font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_4px_12px_rgba(55,53,47,0.18)]'
                            : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#F7F6F3] hover:text-[#37352F]'
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
                    <Search className="w-4 h-4 text-[#6E6D68] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search templates..."
                      aria-label="Search templates"
                      className="w-full h-9 pl-9 pr-3 rounded-[8px] bg-[#F7F6F3] border border-[#E9E9E7] text-[13px] text-[#37352F] placeholder:text-[#9B9A97] focus:outline-none focus:border-[#37352F]"
                    />
                  </div>
                  <span
                    data-testid="catalog-count"
                    className="text-[13px] text-[#6E6D68] tabular-nums whitespace-nowrap"
                  >
                    {filteredCatalog.length}{' '}
                    {filteredCatalog.length === 1 ? 'template' : 'templates'}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Grid of 41 Cards (+ Empty State) */}
            <section
              aria-label={`${category} Notion templates (${categoryCounts[category]})`}
              className="py-12 sm:py-16 max-w-[1200px] mx-auto px-4 sm:px-6"
            >
              {filteredCatalog.length === 0 ? (
                <div className="rounded-[16px] border border-[#E9E9E7] bg-[#FAF9F6] py-16 px-6 text-center space-y-4">
                  <p className="text-[18px] font-semibold text-[#37352F]">
                    No templates match &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-[14.5px] text-[#6E6D68] max-w-[420px] mx-auto">
                    Try a different keyword or reset the active category filter to browse all {TEMPLATES.length} templates.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      selectCategory('All');
                    }}
                    className="h-10 px-5 rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[13.5px] font-semibold cursor-pointer"
                  >
                    Reset search &amp; filters
                  </button>
                </div>
              ) : (
                <div
                  data-testid="template-grid"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
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
              )}
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
