import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Download,
  Menu as MenuIcon,
} from 'lucide-react';
import {
  AppItem,
  FAQ_ITEMS,
  Template,
  TESTIMONIALS,
} from '../data/catalog';
import { DigitalDeliveryPackage, formatPrice } from '../utils/storeLogic';
import {
  AppIconGlyph,
  BlushAssetImage,
  TemplateCover,
} from './CoversAndIllustrations';
import hannahLinAvatar from '../assets/images/creator_hannah_lin_1794743242429.jpg';
import davidMoralesAvatar from '../assets/images/creator_david_morales_1794743241310.jpg';
import priyaNairAvatar from '../assets/images/creator_priya_nair_1794743242303.jpg';
import thomasLindAvatar from '../assets/images/creator_thomas_lind_1794743242396.jpg';

const CREATOR_AVATAR_MAP: Record<string, string> = {
  'rev-1': hannahLinAvatar,
  'rev-2': davidMoralesAvatar,
  'rev-3': priyaNairAvatar,
  'rev-4': thomasLindAvatar,
};

export const LuminaLogo: React.FC<{ size?: number; className?: string }> = ({
  className = '',
}) => (
  <span
    aria-label="Resonance"
    className={`font-display text-[22px] sm:text-[23px] font-extrabold tracking-[-0.045em] leading-none text-[#37352F] inline-flex items-baseline select-none ${className}`}
  >
    <span>Res</span>
    <span className="text-[#2383E2]">o</span>
    <span>nance</span>
    <span className="text-[#2383E2] ml-[1px]">.</span>
  </span>
);

const NAV_DIRECTORY_GROUPS: Array<{
  title: string;
  links: Array<{ label: string; path: string; badge?: string }>;
}> = [
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
      { label: 'Custom Builds', path: '/#custom-notion-builds' },
      { label: 'All Access', path: '/all-access', badge: 'Bundle' },
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[100] focus:bg-[#37352F] focus:text-white focus:px-4 focus:py-2 focus:rounded-[8px] focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <header
        className={`sticky top-0 z-50 h-16 w-full bg-[#FFFFFF]/92 backdrop-blur-md transition-[border-color] duration-150 ${
          scrolled ? 'border-b border-[#E9E9E7]' : 'border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLink(e, '/')}
            className="group inline-flex items-center whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
          >
            <LuminaLogo />
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-[14px] font-medium"
          >
            {[
              { label: 'Templates', path: '/templates' },
              { label: 'Second Brain', path: '/second-brain' },
              { label: 'Custom Builds', path: '/#custom-notion-builds' },
              { label: 'Apps', path: '/apps' },
              { label: 'Blog', path: '/blog' },
            ].map((item) => {
              const active =
                item.path === '/second-brain'
                  ? currentPath === '/second-brain' ||
                    currentPath === '/templates/second-brain'
                  : isNavActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLink(e, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'text-[#37352F] underline decoration-2 underline-offset-[6px]'
                      : 'text-[#6E6D68] hover:text-[#37352F]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (+ Downloads when owned) */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {purchasesCount > 0 && (
              <motion.button
                type="button"
                whileHover={{ y: -1.5, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                onClick={onOpenLibrary}
                className="btn-motion-secondary h-10 px-3.5 rounded-[10px] border border-[#D3D1CB] bg-white hover:bg-[#F7F6F3] text-[#37352F] text-[13px] font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>My Downloads ({purchasesCount})</span>
              </motion.button>
            )}
            <motion.a
              href="/templates"
              whileHover={{ y: -1.5, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              onClick={(e) => handleLink(e, '/templates')}
              className="btn-motion-primary h-10 px-[18px] rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <span>Browse Templates</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow-slide" />
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
                className="h-11 px-3 rounded-[10px] border border-[#E9E9E7] bg-[#F7F6F3] text-[#37352F] text-xs font-semibold inline-flex items-center gap-1.5"
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
              className="w-11 h-11 rounded-[10px] inline-flex items-center justify-center text-[#37352F] hover:bg-[#F1F1EF] transition-colors cursor-pointer"
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

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-[90] bg-white flex flex-col justify-between overflow-y-auto animate-fade-up"
    >
      {/* Top Bar Mirror */}
      <div className="h-16 border-b border-[#E9E9E7] shrink-0">
        <div className="max-w-[1200px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => go(e, '/')}
            className="inline-flex items-center transition-opacity hover:opacity-85"
          >
            <LuminaLogo />
          </a>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 rounded-[10px] inline-flex items-center justify-center text-[20px] font-medium text-[#37352F] hover:bg-[#F1F1EF] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Center Link Groups */}
      <div className="max-w-[720px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 my-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
          {NAV_DIRECTORY_GROUPS.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#6E6D68]">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((item) => (
                  <li key={item.path}>
                    <a
                      href={item.path}
                      onClick={(e) => go(e, item.path)}
                      className="block text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em] leading-[1.2] text-[#37352F] hover:text-[#6E6D68] transition-colors"
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

      {/* Bottom Quick Action + Ctrl M Shortcut Hint */}
      <div className="border-t border-[#E9E9E7] py-5 shrink-0">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="/templates"
            onClick={(e) => go(e, '/templates')}
            className="h-10 px-[18px] rounded-[10px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-1.5"
          >
            <span>Browse All Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-1.5 text-[12px] text-[#6E6D68]">
            <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] border-b-2 rounded-[6px]">
              Ctrl
            </kbd>
            <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] border-b-2 rounded-[6px]">
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
  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E9E9E7] bg-[#FFFFFF] pt-14 sm:pt-16 pb-12 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Architectural 12-Column Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-14">
          {/* Brand Block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-2.5">
              <a
                href="/"
                onClick={(e) => go(e, '/')}
                className="inline-flex items-center group transition-opacity hover:opacity-85"
              >
                <LuminaLogo />
              </a>
              <p className="text-[14.5px] font-medium text-[#37352F]">
                Built for people who finish what they start.
              </p>
              <p className="text-[13.5px] text-[#52504A] leading-[1.6] max-w-[340px]">
                Notion systems and small tools that cut setup time to 60 seconds.
              </p>
            </div>
          </div>

          {/* 4 Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {NAV_DIRECTORY_GROUPS.map((group) => (
              <div key={group.title} className="space-y-3.5">
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#37352F]">
                  {group.title}
                </h3>
                <ul className="space-y-2.5 text-[14px] text-[#52504A]">
                  {group.links.map((item) => (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        onClick={(e) => go(e, item.path)}
                        className="group/link inline-flex items-center gap-1.5 hover:text-[#37352F] transition-colors"
                      >
                        <span>{item.label}</span>
                        {item.badge ? (
                          <span className="text-[11px] font-mono text-[#6E6D68]">
                            · {item.badge}
                          </span>
                        ) : (
                          <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 transition-all" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright, Interactive Quick Menu Shortcut & Back to Top */}
        <div className="pt-8 border-t border-[#E9E9E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#6E6D68]">
          <p>© 2022-2026 Resonance. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3">
            {onOpenMenu ? (
              <button
                type="button"
                onClick={onOpenMenu}
                className="inline-flex items-center gap-1.5 text-[12px] text-[#52504A] hover:text-[#37352F] transition-colors cursor-pointer"
              >
                <span>Quick menu</span>
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] rounded-[5px]">
                  Ctrl
                </kbd>
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] rounded-[5px]">
                  M
                </kbd>
              </button>
            ) : (
              <p className="text-[12px] text-[#6E6D68]">
                Press{' '}
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] rounded-[5px]">
                  Ctrl
                </kbd>{' '}
                <kbd className="px-1.5 py-0.5 text-[11px] font-semibold text-[#37352F] bg-[#F7F6F3] border border-[#D3D1CB] rounded-[5px]">
                  M
                </kbd>{' '}
                anywhere to open quick menu
              </p>
            )}

            <span aria-hidden="true" className="text-[#D3D1CB]">
              ·
            </span>

            <motion.button
              type="button"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.96 }}
              onClick={scrollToTop}
              className="btn-motion-ghost inline-flex items-center gap-1 text-[12px] font-medium text-[#52504A] hover:text-[#37352F] cursor-pointer"
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
      className="group card-editorial-surface flex flex-col rounded-[16px] border border-[#E9E9E7] bg-white overflow-hidden"
    >
      <TemplateCover
        name={template.name}
        slug={template.slug}
        category={template.category}
        pro={template.pro}
        illustrationUrl={template.illustrationUrl}
        cardTint={template.cardTint}
      />
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3.5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11.5px] font-medium text-[#6E6D68] truncate tabular-nums">
              {template.category} · {template.databaseCount} DBs · {template.viewsCount} views
            </p>
            {isPurchased && (
              <span className="text-[11px] font-semibold text-[#0F7B6C] shrink-0">
                Owned
              </span>
            )}
          </div>
          <h3 className="text-[16.5px] font-semibold leading-[1.3] tracking-[-0.015em] text-[#37352F] truncate group-hover:text-[#1F1E1B]">
            {template.name}
          </h3>
          <p className="text-[13px] leading-[1.45] text-[#52504A] line-clamp-2">
            {template.summary}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <div
            data-testid={`template-quick-win-${template.slug}`}
            className="flex items-start gap-2 pt-2.5 border-t border-[#F1F1EF] text-[12.5px] leading-[1.45]"
          >
            <span
              aria-hidden="true"
              className="mt-[1px] font-mono text-[11.5px] font-semibold text-[#0F7B6C] shrink-0 select-none"
            >
              →
            </span>
            <p className="text-[#52504A] line-clamp-2">
              <span className="font-semibold text-[#37352F]">Quick-Win:</span>{' '}
              {template.quickWin}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2.5 border-t border-[#F1F1EF]">
            <div className="flex items-center gap-1.5 tabular-nums text-[14.5px] font-semibold leading-none">
              {template.compareAt !== undefined && (
                <span className="text-[#9B9A97] line-through">
                  {formatPrice(template.compareAt)}
                </span>
              )}
              <span className="text-[#37352F]">{formatPrice(template.price)}</span>
              {template.pro && (
                <span className="ml-1 text-[10.5px] font-mono font-semibold uppercase tracking-[0.06em] text-[#2383E2]">
                  · PRO
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#52504A] group-hover:text-[#37352F] transition-colors">
              <span>See inside</span>
              <ArrowRight className="w-3.5 h-3.5 btn-arrow-slide" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export const AppCard: React.FC<{
  app: AppItem;
  index?: number;
  onNavigate: (path: string) => void;
  showPrice?: boolean;
}> = ({ app, onNavigate, showPrice = false }) => {
  return (
    <a
      href={`/apps/${app.slug}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(`/apps/${app.slug}`);
      }}
      className="group card-editorial-surface p-5 rounded-[16px] border border-[#E9E9E7] bg-white flex flex-col justify-between gap-4"
    >
      <div className="flex items-center justify-between">
        <AppIconGlyph icon={app.icon} />
        <ArrowUpRight className="w-4 h-4 text-[#6E6D68] group-hover:text-[#37352F] transition-transform duration-180 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div
        style={{ backgroundColor: app.cardTint }}
        className="rounded-[12px] border border-[#E9E9E7]/80 p-3.5 h-40 flex items-center justify-center overflow-hidden"
      >
        <BlushAssetImage
          src={app.illustrationUrl}
          alt={`${app.name} — ${app.tagline} illustration`}
          disableFloat
          className="w-full h-full"
          imgClassName="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="space-y-1 pt-0.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[16.5px] font-semibold leading-[1.35] tracking-[-0.015em] text-[#37352F]">
            {app.name}
          </h3>
          {showPrice && (
            <span className="text-[11px] font-mono text-[#6E6D68]">
              {app.priceLabel}
            </span>
          )}
        </div>
        <p className="text-[13.5px] text-[#52504A] leading-[1.5]">
          {app.tagline}
        </p>
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
          className="text-[clamp(26px,3.2vw,36px)] font-semibold tracking-[-0.025em] leading-[1.15] text-[#37352F]"
        >
          Frequently asked questions
        </h2>
        <p className="text-[16px] text-[#52504A] leading-[1.6]">
          If you still have questions, feel free to{' '}
          <a
            href="mailto:support@resonance.co"
            className="text-[#37352F] underline underline-offset-4 hover:text-[#6E6D68]"
          >
            get in touch
          </a>{' '}
          with us.
        </p>
      </div>

      <div className="border-t border-[#E9E9E7]">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          const panelId = `faq-panel-${idx}`;
          const btnId = `faq-btn-${idx}`;
          return (
            <div key={item.question} className="border-b border-[#E9E9E7]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-5 flex items-center justify-between gap-4 text-left text-[16px] font-semibold text-[#37352F] hover:text-[#52504A] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-[#52504A] transition-transform duration-200 ${
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
                  <p className="text-[15px] text-[#52504A] leading-[1.7]">
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
    <div className="w-full bg-[#37352F] text-[#FFFFFF]">
      <a
        href="https://www.notionsecondbrain.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex items-center justify-center gap-2 text-center text-[15px] sm:text-[16px] font-semibold"
      >
        <span className="group-hover:underline underline-offset-4">
          Second Brain is half off right now ($39 instead of $79) — pay once, own it for life.
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
      className="fixed inset-0 z-[95] bg-[#37352F]/40 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] rounded-[16px] bg-white border border-[#E9E9E7] shadow-[0_8px_24px_rgba(55,53,47,0.10)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E9E9E7] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-[#37352F]">
              My Digital Downloads ({purchases.length})
            </h2>
            <p className="text-[13px] text-[#6E6D68]">
              Instant access to your Notion template duplication links and license keys.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close library"
            className="w-9 h-9 rounded-[8px] inline-flex items-center justify-center text-[#52504A] hover:bg-[#F1F1EF] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-3">
          {purchases.length === 0 ? (
            <p className="text-[14px] text-[#6E6D68] text-center py-8">
              You have not downloaded any templates yet.
            </p>
          ) : (
            purchases.map((pkg) => (
              <div
                key={pkg.orderId}
                className="p-4 rounded-[12px] border border-[#E9E9E7] bg-[#F7F6F3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#37352F]">
                      {pkg.itemName}
                    </span>
                    <span className="text-[12px] text-[#6E6D68] tabular-nums">
                      · ${pkg.amountPaid} ({pkg.provider === 'stripe' ? 'Stripe' : 'Lemon Squeezy'})
                    </span>
                  </div>
                  <p className="text-[12px] font-mono text-[#52504A]">
                    License: {pkg.licenseKey} · Order {pkg.orderId}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectDelivery(pkg);
                  }}
                  className="h-9 px-3.5 rounded-[8px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[13px] font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
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

const CreatorAvatar: React.FC<{
  id: string;
  src: string;
  author: string;
}> = ({ id, src, author }) => {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = CREATOR_AVATAR_MAP[id] || src;
  const initials = author
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-11 h-11 rounded-full bg-[#F7F6F3] border border-[#E9E9E7] flex items-center justify-center shrink-0 overflow-hidden shadow-[0_1px_3px_rgba(55,53,47,0.08)]">
      {failed ? (
        <span className="text-[13px] font-semibold text-[#37352F] tracking-tight">
          {initials}
        </span>
      ) : (
        <img
          src={resolvedSrc}
          alt={`${author} portrait`}
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      )}
    </div>
  );
};

export const TestimonialsSection: React.FC<{
  onNavigate: (path: string) => void;
}> = ({ onNavigate }) => {
  return (
    <section
      aria-labelledby="testimonials-heading"
      data-testid="testimonials-section"
      className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 border-t border-[#E9E9E7]"
    >
      {/* Header Row */}
      <div className="mb-10 sm:mb-12">
        <div className="space-y-2.5 max-w-[580px]">
          <p className="text-[12px] font-semibold text-[#2383E2] uppercase tracking-[0.07em]">
            Real people · Real hours won back
          </p>
          <h2
            id="testimonials-heading"
            className="text-[clamp(26px,3.2vw,36px)] font-[620] tracking-[-0.025em] leading-[1.15] text-[#37352F] text-balance"
          >
            Still open six months later.
          </h2>
          <p className="text-[15.5px] text-[#52504A] leading-[1.55]">
            Most templates look good on Sunday and get abandoned by Tuesday. Here is what stayed.
          </p>
        </div>
      </div>

      {/* Cards Container: Responsive 4-Column Grid (Zero-Latency Immediate Render) */}
      <div
        data-testid="testimonials-track"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {TESTIMONIALS.map((item) => (
          <article
            key={item.id}
            data-testimonial-card
            style={{ backgroundColor: item.surfaceTint }}
            className="group card-editorial-surface w-full rounded-[16px] border border-[#E9E9E7] p-5 sm:p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              {/* Seamless Illustration Stage (Melts directly onto surface tint) */}
              <div className="h-32 w-full flex items-center justify-center border-b border-[#E9E9E7]/80 pb-3">
                <BlushAssetImage
                  src={item.illustrationUrl}
                  alt={`${item.author} workspace illustration`}
                  disableFloat
                  className="h-full w-full"
                  imgClassName="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              {/* Quiet Unboxed Outcome & System Metadata */}
              <div className="flex flex-col gap-1 text-[12px] text-[#52504A] border-b border-[#E9E9E7] pb-3.5">
                <span className="font-semibold text-[#37352F] tabular-nums">
                  {item.outcomeMetric}
                </span>
                <a
                  href={`/templates/${item.templateSlug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/templates/${item.templateSlug}`);
                  }}
                  className="inline-flex items-center gap-1 font-medium text-[#2383E2] hover:text-[#1B6EC2] hover:underline underline-offset-4 w-fit"
                >
                  <span>{item.templateUsed}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {/* Editorial Review Quote */}
              <blockquote className="text-[14.5px] leading-[1.6] text-[#37352F] font-normal">
                “{item.quote}”
              </blockquote>
            </div>

            {/* Creator Photo & Attribution Footer */}
            <footer className="flex items-center gap-3 pt-2 border-t border-[#E9E9E7]/70">
              <CreatorAvatar
                id={item.id}
                src={item.avatarUrl}
                author={item.author}
              />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-[#37352F] leading-snug truncate">
                  {item.author}
                </p>
                <p className="text-[12px] text-[#6E6D68] leading-[1.35] truncate">
                  {item.role} · {item.organization}
                </p>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
};

