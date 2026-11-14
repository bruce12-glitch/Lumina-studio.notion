import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  Menu as MenuIcon,
} from 'lucide-react';
import { BLUSH_ASSETS, FAQ_ITEMS, Template, TESTIMONIALS } from '../data/catalog';
import { DigitalDeliveryPackage, formatPrice } from '../utils/storeLogic';
import { BlushAssetImage, TemplateCover } from './CoversAndIllustrations';

export interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenMenu: () => void;
  purchasesCount: number;
  onOpenLibrary: () => void;
}

export const Header: React.FC<NavigationProps> = ({
  currentPath,
  onNavigate,
  onOpenMenu,
  purchasesCount,
  onOpenLibrary,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isNavActive = (target: string) => {
    if (target === '/templates') {
      return (
        currentPath.startsWith('/templates') ||
        currentPath === '/second-brain' ||
        currentPath === '/finance-tracker' ||
        currentPath === '/all-access'
      );
    }
    if (target === '/apps') {
      return currentPath.startsWith('/apps');
    }
    if (target === '/blog') {
      return currentPath.startsWith('/blog');
    }
    return currentPath === target;
  };

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[100] focus:bg-[#0A0A0A] focus:text-white focus:px-4 focus:py-2 focus:rounded-[8px] focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 h-16 w-full bg-[#FDFCFB]/88 backdrop-blur-md transition-[border-color] duration-150 ${
          scrolled ? 'border-b border-[#E8E6E1]' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark + Primary Nav Links */}
          <div className="flex items-center gap-8">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="text-[20px] font-bold tracking-[-0.03em] text-[#0A0A0A] whitespace-nowrap shrink-0"
            >
              Easlo
            </a>

            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-6 text-[14px] font-medium"
            >
              {[
                { label: 'Apps', path: '/apps' },
                { label: 'Templates', path: '/templates' },
                { label: 'Blog', path: '/blog' },
              ].map((item) => {
                const active = isNavActive(item.path);
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleLink(e, item.path)}
                    aria-current={active ? 'page' : undefined}
                    className={`whitespace-nowrap shrink-0 transition-colors duration-150 ${
                      active
                        ? 'text-[#0A0A0A] underline decoration-2 underline-offset-[6px]'
                        : 'text-[#737373] hover:text-[#0A0A0A]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Zone 3: Right Actions */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {purchasesCount > 0 && (
              <motion.button
                type="button"
                whileHover={{ y: -1.5, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                onClick={onOpenLibrary}
                className="btn-motion-secondary h-10 px-3.5 rounded-[10px] border border-[#D4D4D4] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-[13px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>My Downloads ({purchasesCount})</span>
              </motion.button>
            )}
            <motion.a
              href="/sign-in"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              onClick={(e) => handleLink(e, '/sign-in')}
              className="btn-motion-ghost h-10 px-4 rounded-[10px] text-[14px] font-medium text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] inline-flex items-center justify-center whitespace-nowrap shrink-0"
            >
              Sign In
            </motion.a>
            <motion.a
              href="/sign-up"
              whileHover={{ y: -1.5, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              onClick={(e) => handleLink(e, '/sign-up')}
              className="btn-motion-primary h-10 px-[18px] rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[14px] font-semibold inline-flex items-center justify-center whitespace-nowrap shrink-0"
            >
              Create a free account
            </motion.a>
          </div>

          {/* Mobile Menu Trigger (<768px) */}
          <div className="flex md:hidden items-center gap-2">
            {purchasesCount > 0 && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={onOpenLibrary}
                aria-label={`My Downloads (${purchasesCount})`}
                className="h-11 px-3 rounded-[10px] border border-[#EAEAEA] bg-[#FAFAFA] text-[#0A0A0A] text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{purchasesCount}</span>
              </motion.button>
            )}
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={onOpenMenu}
              aria-label="Open menu"
              className="w-11 h-11 rounded-[10px] inline-flex items-center justify-center text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <MenuIcon className="w-5 h-5 stroke-[1.5]" />
            </motion.button>
          </div>
        </div>
      </header>
    </>
  );
};

export const MenuOverlay: React.FC<{
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}> = ({ open, onClose, onNavigate }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onClose();
    onNavigate(path);
  };

  const groups = [
    {
      title: 'Pages',
      links: [
        { label: 'Apps', path: '/apps' },
        { label: 'Templates', path: '/templates' },
        { label: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Apps',
      links: [
        { label: 'SyncTasks', path: '/apps/sync-tasks' },
        { label: 'Experiments', path: '/apps/experiments' },
        { label: 'Menu', path: '/apps/menu' },
      ],
    },
    {
      title: 'Templates',
      links: [
        { label: 'Second Brain', path: '/second-brain' },
        { label: 'Finance Tracker', path: '/finance-tracker' },
        { label: 'All Access', path: '/all-access' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', path: '/about' },
        { label: 'Updates', path: '/updates' },
        { label: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[90] bg-white flex flex-col justify-between overflow-y-auto animate-fade-up"
    >
      {/* Top Bar Mirror */}
      <div className="h-16 border-b border-[#EAEAEA] shrink-0">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => go(e, '/')}
            className="text-[20px] font-bold tracking-[-0.03em] text-[#0A0A0A]"
          >
            Easlo
          </a>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 rounded-[10px] inline-flex items-center justify-center text-[20px] font-medium text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Center Link Groups */}
      <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 my-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          {groups.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#737373]">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="block text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] leading-[1.2] text-[#0A0A0A] hover:text-[#525252] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Auth Row + Ctrl M Shortcut Hint */}
      <div className="border-t border-[#EAEAEA] py-5 shrink-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/sign-in"
              onClick={(e) => go(e, '/sign-in')}
              className="h-10 px-4 rounded-[10px] border border-[#D4D4D4] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-[14px] font-medium inline-flex items-center justify-center"
            >
              Sign In
            </a>
            <a
              href="/sign-up"
              onClick={(e) => go(e, '/sign-up')}
              className="h-10 px-[18px] rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[14px] font-semibold inline-flex items-center justify-center"
            >
              Create a free account
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-[12px] text-[#737373]">
            <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#0A0A0A] bg-[#FAFAFA] border border-[#D4D4D4] border-b-2 rounded-[6px]">
              Ctrl
            </kbd>
            <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#0A0A0A] bg-[#FAFAFA] border border-[#D4D4D4] border-b-2 rounded-[6px]">
              M
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC<{
  onNavigate: (path: string) => void;
  onOpenMenu?: () => void;
}> = ({ onNavigate, onOpenMenu }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E8E6E1] bg-[#FDFCFB] pt-14 sm:pt-20 pb-12 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* 1. Editorial Pre-Footer Dispatch & Free Systems Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[20px] border border-[#E8E6E1] bg-[#F7F6F2] p-6 sm:p-10 mb-14 sm:mb-16 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-[12px] font-medium text-[#787671]">
                <span>Sunday Minimalist Dispatch · 120,000+ Readers</span>
              </div>

              <h2 className="text-[clamp(24px,3vw,32px)] font-[630] tracking-[-0.025em] leading-[1.15] text-[#111110] text-balance">
                Build a calmer, more intentional Notion workspace.
              </h2>

              <p className="text-[15px] text-[#37352F] leading-[1.6] max-w-[520px]">
                Receive one actionable Notion architecture guide, digital minimalism workflow, and free template drop every Sunday morning. No noise, unsubscribe anytime.
              </p>

              {subscribed ? (
                <div className="pt-1 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] bg-white border border-[#C8C4BE] text-[13.5px] font-medium text-[#111110]">
                  <span className="w-5 h-5 rounded-full bg-[#15803D] text-white inline-flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                  <span>
                    You’re subscribed with <strong>{newsletterEmail}</strong>. Check your inbox for the free Notion Starter Pack.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-[460px]"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    aria-label="Email address for newsletter"
                    className="h-11 flex-1 px-3.5 rounded-[8px] bg-white border border-[#C8C4BE] text-[14px] text-[#111110] placeholder:text-[#A4A097] focus:outline-none focus:border-[#111110] transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ y: -1.5, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                    className="btn-motion-primary h-11 px-5 rounded-[8px] bg-[#111110] hover:bg-[#262523] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Subscribe Free</span>
                    <ArrowRight className="w-3.5 h-3.5 btn-arrow-slide" />
                  </motion.button>
                </form>
              )}
            </div>

            {/* Right Editorial Dispatch Visual & Notion System Specification Duo */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="rounded-[14px] border border-[#E5E3DF] bg-white p-4 shadow-[0_8px_24px_-6px_rgba(17,17,16,0.05)] flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.07em] text-[#787671]">
                    Weekly Creator Dispatch
                  </span>
                  <p className="text-[14.5px] font-bold text-[#111110] leading-snug">
                    120,000+ Notion Architects
                  </p>
                  <p className="text-[12px] text-[#37352F] leading-snug">
                    New workflows, PARA setups & minimalist templates every Sunday.
                  </p>
                </div>
                <BlushAssetImage
                  src={BLUSH_ASSETS.socialMegaphoneCreator}
                  alt="Sunday Minimalist Dispatch creator newsletter illustration"
                  floatDelay={0.2}
                  className="w-28 h-24 shrink-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[14px] border border-[#E5E3DF] bg-white p-4 shadow-[0_8px_24px_-6px_rgba(17,17,16,0.05)] flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.07em] text-[#787671]">
                    <span>Free Collection</span>
                    <span className="font-bold text-[#15803D]">$0</span>
                  </div>
                  <div>
                    <p className="font-display text-[22px] font-bold tracking-[-0.03em] text-[#111110] leading-none">
                      22 Setups
                    </p>
                    <p className="mt-1 text-[12px] text-[#37352F] leading-snug">
                      Ready-to-duplicate Notion trackers for habits & tasks.
                    </p>
                  </div>
                </div>

                <div className="rounded-[14px] border border-[#E5E3DF] bg-white p-4 shadow-[0_8px_24px_-6px_rgba(17,17,16,0.05)] flex flex-col justify-between gap-2">
                  <div className="flex items-center justify-between text-[10.5px] font-mono uppercase tracking-[0.07em] text-[#787671]">
                    <span>PRO Systems</span>
                    <span className="font-bold text-[#111110]">PARA</span>
                  </div>
                  <div>
                    <p className="font-display text-[22px] font-bold tracking-[-0.03em] text-[#111110] leading-none">
                      17 OS Kits
                    </p>
                    <p className="mt-1 text-[12px] text-[#37352F] leading-snug">
                      Complete Second Brain, Finance & Creator OS kits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. Architectural 12-Column Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-14">
          {/* Brand & System Status Block */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2.5">
              <a
                href="/"
                onClick={(e) => go(e, '/')}
                className="inline-flex items-center gap-2.5 group"
              >
                <span className="w-7 h-7 rounded-[7px] bg-[#111110] text-white text-[14px] font-bold inline-flex items-center justify-center tracking-tight transition-transform duration-200 group-hover:scale-105">
                  e
                </span>
                <span className="text-[20px] font-bold tracking-[-0.03em] text-[#111110]">
                  Easlo
                </span>
              </a>
              <p className="text-[14.5px] font-medium text-[#111110]">
                Productivity meets minimalism.
              </p>
              <p className="text-[13.5px] text-[#37352F] leading-[1.6] max-w-[360px]">
                Thoughtfully engineered Notion workspaces, financial ledgers, and minimalist tools designed to help you focus on what matters.
              </p>
            </div>

            {/* Quiet Unboxed System Metadata */}
            <div className="pt-1 flex flex-wrap items-center gap-2 text-[12.5px] text-[#787671]">
              <span className="font-medium text-[#111110]">39 Notion Templates Ready</span>
              <span aria-hidden="true">·</span>
              <span>Stripe & Lemon Squeezy Fulfillment</span>
            </div>
          </div>

          {/* 4 Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-3.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#111110]">
                Pages
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#52504C]">
                {[
                  { label: 'Apps', path: '/apps' },
                  { label: 'Templates', path: '/templates' },
                  { label: 'Blog', path: '/blog' },
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="group/link inline-flex items-center gap-1 hover:text-[#111110] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#111110]">
                Apps
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#52504C]">
                {[
                  { label: 'SyncTasks', path: '/apps/sync-tasks' },
                  { label: 'Experiments', path: '/apps/experiments' },
                  { label: 'Menu', path: '/apps/menu' },
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="group/link inline-flex items-center gap-1 hover:text-[#111110] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#111110]">
                Templates
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#52504C]">
                <li>
                  <a
                    href="/second-brain"
                    onClick={(e) => go(e, '/second-brain')}
                    className="group/link inline-flex items-center gap-1.5 hover:text-[#111110] transition-colors"
                  >
                    <span>Second Brain</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/finance-tracker"
                    onClick={(e) => go(e, '/finance-tracker')}
                    className="group/link inline-flex items-center gap-1.5 hover:text-[#111110] transition-colors"
                  >
                    <span>Finance Tracker</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/all-access"
                    onClick={(e) => go(e, '/all-access')}
                    className="group/link inline-flex items-center gap-1.5 hover:text-[#111110] transition-colors"
                  >
                    <span>All Access</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.05em] px-1.5 py-0.5 rounded-[4px] bg-[#F1EFEA] text-[#111110]">
                      Bundle
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#111110]">
                Company
              </h3>
              <ul className="space-y-2.5 text-[14px] text-[#52504C]">
                {[
                  { label: 'About', path: '/about' },
                  { label: 'Updates', path: '/updates' },
                  { label: 'Privacy Policy', path: '/privacy' },
                ].map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="group/link inline-flex items-center gap-1 hover:text-[#111110] transition-colors"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright, Interactive Quick Menu Shortcut & Back to Top */}
        <div className="pt-8 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#78756F]">
          <p>© 2022-2026 Easlo. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenMenu ? (
              <button
                type="button"
                onClick={onOpenMenu}
                className="inline-flex items-center gap-1.5 text-[12px] text-[#52504C] hover:text-[#111110] transition-colors cursor-pointer"
              >
                <span>Quick menu</span>
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#111110] bg-[#F7F6F2] border border-[#D5D2CB] rounded-[5px]">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#111110] bg-[#F7F6F2] border border-[#D5D2CB] rounded-[5px]">
                  M
                </kbd>
              </button>
            ) : (
              <p className="text-[12px] text-[#78756F]">
                Press{' '}
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#111110] bg-[#F7F6F2] border border-[#D5D2CB] rounded-[5px]">
                  Ctrl
                </kbd>{' '}
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#111110] bg-[#F7F6F2] border border-[#D5D2CB] rounded-[5px]">
                  M
                </kbd>{' '}
                anywhere to open quick menu
              </p>
            )}

            <span aria-hidden="true" className="text-[#D5D2CB]">
              ·
            </span>

            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="btn-motion-ghost inline-flex items-center gap-1 text-[12px] font-medium text-[#52504C] hover:text-[#111110] cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-180 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const TemplateCard: React.FC<{
  template: Template;
  onNavigate: (path: string) => void;
  onQuickCheckout?: (template: Template) => void;
  isPurchased?: boolean;
}> = ({ template, onNavigate, isPurchased }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(`/templates/${template.slug}`);
  };

  return (
    <a
      href={`/templates/${template.slug}`}
      onClick={handleClick}
      className="group card-editorial-surface block rounded-[16px] border border-[#E5E3DF] bg-white overflow-hidden"
    >
      <TemplateCover
        name={template.name}
        slug={template.slug}
        category={template.category}
        pro={template.pro}
        illustrationUrl={template.illustrationUrl}
        cardTint={template.cardTint}
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11.5px] font-medium text-[#787671] truncate">
              {template.category}
            </p>
            <h3 className="text-[16px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#111110] truncate mt-0.5 group-hover:text-[#0A0A0A]">
              {template.name}
            </h3>
          </div>
          {isPurchased && (
            <span className="text-[11px] font-semibold text-[#15803D] shrink-0">
              Owned
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#F3F2EE]">
          <div className="flex items-center gap-1.5 tabular-nums text-[14.5px] font-semibold leading-none">
            {template.compareAt !== undefined && (
              <span className="text-[#A4A097] line-through">
                {formatPrice(template.compareAt)}
              </span>
            )}
            <span className="text-[#111110]">{formatPrice(template.price)}</span>
            {template.pro && (
              <span className="ml-1 text-[10px] font-mono font-bold uppercase tracking-[0.07em] text-[#787671]">
                · PRO
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#52504C] group-hover:text-[#111110] transition-colors">
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5 btn-arrow-slide" />
          </span>
        </div>
      </div>
    </a>
  );
};

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6"
    >
      <div className="space-y-3 mb-10">
        <h2
          id="faq-heading"
          className="text-[clamp(26px,3.2vw,36px)] font-semibold tracking-[-0.025em] leading-[1.15] text-[#0A0A0A]"
        >
          Frequently asked questions
        </h2>
        <p className="text-[16px] text-[#525252] leading-[1.6]">
          If you still have questions, feel free to{' '}
          <a
            href="mailto:support@easlo.co"
            className="text-[#0A0A0A] underline underline-offset-4 hover:text-[#525252]"
          >
            get in touch
          </a>{' '}
          with us.
        </p>
      </div>

      <div className="border-t border-[#EAEAEA]">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;
          const btnId = `faq-btn-${idx}`;
          return (
            <div key={item.question} className="border-b border-[#EAEAEA]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-5 flex items-center justify-between gap-4 text-left text-[16px] font-semibold text-[#0A0A0A] hover:text-[#525252] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[#525252] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={`grid transition-[grid-template-rows,opacity] duration-250 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-[15px] text-[#525252] leading-[1.7]">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const PromoBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#0A0A0A] text-[#FAFAFA]">
      <a
        href="https://www.notionsecondbrain.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex items-center justify-center gap-2 text-center text-[15px] sm:text-[16px] font-semibold"
      >
        <span className="group-hover:underline underline-offset-4">
          Get organized in 2026! Enjoy 50% off Second Brain template.
        </span>
        <ArrowUpRight className="w-4 h-4 shrink-0 transition-transform duration-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </div>
  );
};

export const LibraryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  purchases: DigitalDeliveryPackage[];
  onSelectDelivery: (pkg: DigitalDeliveryPackage) => void;
}> = ({ open, onClose, purchases, onSelectDelivery }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="My Purchased Templates & Digital Downloads"
      className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] rounded-[16px] bg-white border border-[#EAEAEA] shadow-[0_8px_24px_rgba(10,10,10,0.08)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#0A0A0A]">
              My Digital Downloads ({purchases.length})
            </h2>
            <p className="text-[13px] text-[#737373]">
              Instant access to your Notion template duplication links and license keys.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close library"
            className="w-9 h-9 rounded-[8px] inline-flex items-center justify-center text-[#525252] hover:bg-[#F5F5F5] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-3">
          {purchases.length === 0 ? (
            <p className="text-[14px] text-[#737373] text-center py-8">
              You have not downloaded any templates yet.
            </p>
          ) : (
            purchases.map((pkg) => (
              <div
                key={pkg.orderId}
                className="p-4 rounded-[12px] border border-[#EAEAEA] bg-[#FAFAFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#0A0A0A]">
                      {pkg.itemName}
                    </span>
                    <span className="text-[12px] text-[#737373] tabular-nums">
                      · ${pkg.amountPaid} ({pkg.provider === 'stripe' ? 'Stripe' : 'Lemon Squeezy'})
                    </span>
                  </div>
                  <p className="text-[12px] font-mono text-[#525252]">
                    License: {pkg.licenseKey} · Order {pkg.orderId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectDelivery(pkg);
                  }}
                  className="h-9 px-3.5 rounded-[8px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[13px] font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Open Delivery</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const MinimalistAvatar: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div className="w-10 h-10 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center shrink-0 overflow-hidden">
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        aria-hidden="true"
      >
        <rect width="40" height="40" fill="#FFFFFF" />
        {/* Head */}
        <circle
          cx="20"
          cy="15.5"
          r="6.2"
          fill="#FFFFFF"
          stroke="#0A0A0A"
          strokeWidth="1.4"
        />
        {/* Distinct Blush/Notion minimalist hairstyle per reviewer */}
        {index % 4 === 0 && (
          <path
            d="M13.8 15 C14 10, 26 10, 26.2 15 C23 12.5, 17 12.5, 13.8 15 Z"
            fill="#0A0A0A"
          />
        )}
        {index % 4 === 1 && (
          <>
            <path
              d="M14 13.5 C15.5 9.5, 24.5 9.5, 26 13.5"
              fill="#0A0A0A"
            />
            <circle cx="17.8" cy="15.5" r="1.8" fill="none" stroke="#0A0A0A" strokeWidth="1.1" />
            <circle cx="22.2" cy="15.5" r="1.8" fill="none" stroke="#0A0A0A" strokeWidth="1.1" />
            <line x1="19.6" y1="15.5" x2="20.4" y2="15.5" stroke="#0A0A0A" strokeWidth="1.1" />
          </>
        )}
        {index % 4 === 2 && (
          <path
            d="M13.5 16.5 C13.5 9.5, 26.5 9.5, 26.5 16.5 C24.5 12.5, 15.5 12.5, 13.5 16.5 Z"
            fill="#0A0A0A"
          />
        )}
        {index % 4 === 3 && (
          <path
            d="M14.5 13 C16.5 10, 23.5 10, 25.5 13"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {index % 4 !== 1 && (
          <>
            <circle cx="18" cy="15.5" r="0.9" fill="#0A0A0A" />
            <circle cx="22" cy="15.5" r="0.9" fill="#0A0A0A" />
          </>
        )}
        <path
          d="M18.5 18.2 Q20 19.4 21.5 18.2"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Shoulders */}
        <path
          d="M9.5 34.5 C11 25.5, 29 25.5, 30.5 34.5"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export const TestimonialsSection: React.FC<{
  onNavigate: (path: string) => void;
}> = ({ onNavigate }) => {
  const [layoutMode, setLayoutMode] = useState<'swipe' | 'grid'>('grid');
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollToCard = (nextIdx: number) => {
    const clamped =
      (nextIdx + TESTIMONIALS.length) % TESTIMONIALS.length;
    setActiveIndex(clamped);
    if (layoutMode !== 'swipe') {
      setLayoutMode('swipe');
    }
    requestAnimationFrame(() => {
      const container = trackRef.current;
      if (!container) return;
      const cards = container.querySelectorAll<HTMLElement>(
        '[data-testimonial-card]'
      );
      const targetCard = cards[clamped];
      if (targetCard) {
        container.scrollTo({
          left: targetCard.offsetLeft - container.offsetLeft,
          behavior: 'smooth',
        });
      }
    });
  };

  return (
    <section
      aria-labelledby="testimonials-heading"
      data-testid="testimonials-section"
      className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#EAEAEA]"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div className="space-y-2.5 max-w-[580px]">
          <p className="text-[12px] font-medium text-[#737373]">
            Reader & Customer Stories · 4.9/5 Average Rating
          </p>
          <h2
            id="testimonials-heading"
            className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#0A0A0A] text-balance"
          >
            Designed for calm, daily execution
          </h2>
          <p className="text-[16px] text-[#525252] leading-[1.6]">
            How designers, engineers, and founders organize their work and finances with Easlo Notion systems.
          </p>
        </div>

        {/* Minimalist View & Swipe Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <div
            role="group"
            aria-label="Testimonial layout mode"
            className="inline-flex items-center p-1 rounded-[10px] bg-[#F5F5F5] border border-[#EAEAEA]"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setLayoutMode('grid')}
              aria-pressed={layoutMode === 'grid'}
              className={`relative px-3 py-1.5 rounded-[7px] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                layoutMode === 'grid'
                  ? 'bg-white text-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.06)]'
                  : 'text-[#525252] hover:text-[#0A0A0A]'
              }`}
            >
              Grid View
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => setLayoutMode('swipe')}
              aria-pressed={layoutMode === 'swipe'}
              className={`relative px-3 py-1.5 rounded-[7px] text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                layoutMode === 'swipe'
                  ? 'bg-white text-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.06)]'
                  : 'text-[#525252] hover:text-[#0A0A0A]'
              }`}
            >
              Swipe View
            </motion.button>
          </div>

          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              whileHover={{ y: -1.5, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              onClick={() => scrollToCard(activeIndex - 1)}
              aria-label="Previous customer review"
              className="btn-motion-secondary w-10 h-10 rounded-[10px] border border-[#EAEAEA] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] inline-flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -1.5, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              onClick={() => scrollToCard(activeIndex + 1)}
              aria-label="Next customer review"
              className="btn-motion-secondary w-10 h-10 rounded-[10px] border border-[#EAEAEA] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] inline-flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Cards Container: Responsive Grid or Horizontal Swipe Track */}
      <div
        ref={trackRef}
        data-testid="testimonials-track"
        className={
          layoutMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'
            : 'flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2'
        }
      >
        {TESTIMONIALS.map((item, idx) => (
          <motion.article
            key={item.id}
            data-testimonial-card
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: idx * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -3 }}
            style={{ backgroundColor: item.surfaceTint }}
            className={`group rounded-[16px] border border-[#E8E6E1] p-6 flex flex-col justify-between gap-6 transition-shadow duration-300 hover:border-[#D5D2CB] hover:shadow-[0_12px_28px_-6px_rgba(17,17,16,0.06)] ${
              layoutMode === 'swipe'
                ? 'w-[310px] sm:w-[360px] flex-none snap-start'
                : 'w-full'
            }`}
          >
            <div className="space-y-4">
              {/* Prominent Blush Character Workspace Illustration */}
              <BlushAssetImage
                src={item.illustrationUrl}
                alt={`${item.author} workspace illustration`}
                maskCorner
                floatDelay={idx * 0.4}
                className="h-36 w-full rounded-[12px] bg-white border border-[#E5E3DF] p-3"
                imgClassName="max-h-full max-w-full object-contain"
              />

              {/* Quiet Unboxed Outcome & System Metadata */}
              <div className="flex flex-col gap-1 text-[12px] text-[#37352F] border-b border-black/[0.06] pb-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[#111110] tabular-nums">
                    {item.outcomeMetric}
                  </span>
                  <a
                    href={`/templates/${item.templateSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/templates/${item.templateSlug}`);
                    }}
                    className="inline-flex items-center gap-1 font-medium text-[#37352F] hover:text-[#111110] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                  >
                    <span>{item.templateUsed}</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Editorial Review Quote */}
              <blockquote className="text-[14.5px] leading-[1.65] text-[#111110] font-normal">
                “{item.quote}”
              </blockquote>
            </div>

            {/* Reviewer Attribution Footer */}
            <footer className="flex items-center gap-3 pt-2">
              <MinimalistAvatar index={idx} />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#111110] leading-snug">
                  {item.author}
                </p>
                <p className="text-[12px] text-[#37352F] leading-snug">
                  {item.role} · {item.organization}
                </p>
              </div>
            </footer>
          </motion.article>
        ))}
      </div>

      {/* Community & Instant Digital Storefront Showcase Strip */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
        <motion.div
          whileHover={{ y: -2 }}
          className="group lg:col-span-6 rounded-[16px] border border-[#E5E3DF] bg-[#EDF5FD] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 transition-shadow hover:shadow-[0_12px_28px_-6px_rgba(15,15,15,0.06)]"
        >
          <div className="space-y-2.5 max-w-[310px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#787671]">
              Global Notion Community
            </p>
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-[#111110] leading-snug">
              Join 300,000+ creators, students & operators
            </h3>
            <p className="text-[14px] text-[#37352F] leading-relaxed">
              Every template includes lifetime updates, step-by-step setup guides, and one-click workspace duplication.
            </p>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.globalCommunityNetwork}
            alt="Easlo global Notion creator community network illustration"
            floatDelay={0.25}
            className="w-full sm:w-[210px] h-[155px] rounded-[12px] bg-white border border-[#E5E3DF] p-3 shrink-0"
            imgClassName="max-w-full max-h-full object-contain"
          />
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="group lg:col-span-6 rounded-[16px] border border-[#E5E3DF] bg-[#F2EEFA] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 transition-shadow hover:shadow-[0_12px_28px_-6px_rgba(15,15,15,0.06)]"
        >
          <div className="space-y-2.5 max-w-[310px]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#787671]">
              Instant Digital Delivery
            </p>
            <h3 className="text-[19px] font-bold tracking-[-0.02em] text-[#111110] leading-snug">
              Automated Stripe & Lemon Squeezy Fulfillment
            </h3>
            <p className="text-[13.5px] text-[#37352F] leading-relaxed">
              Receive your one-click Notion duplicate link, verified license key, and receipt seconds after checkout.
            </p>
            <div className="pt-1">
              <a
                href="/templates"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/templates');
                }}
                className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#111110] hover:underline underline-offset-4"
              >
                <span>Browse 17 PRO templates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.clientDealHandshake}
            alt="Instant digital fulfillment and license delivery illustration"
            floatDelay={0.45}
            className="w-full sm:w-[210px] h-[155px] rounded-[12px] bg-white border border-[#E5E3DF] p-3 shrink-0"
            imgClassName="max-w-full max-h-full object-contain"
          />
        </motion.div>
      </div>
    </section>
  );
};

