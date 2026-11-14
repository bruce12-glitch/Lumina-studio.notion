import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BLUSH_ASSETS,
  CATEGORY_BLUSH_ASSET,
  TemplateCategory,
} from '../data/catalog';

export const BlushAssetImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  maskCorner?: boolean;
  floatDelay?: number;
}> = ({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-contain',
  maskCorner = true,
  floatDelay = 0,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F7F6F3] text-[#78756F] text-xs font-medium p-4 ${className}`}
      >
        <span>{alt}</span>
      </div>
    );
  }

  const shouldClipCorner =
    maskCorner && src !== BLUSH_ASSETS.communityBanner;

  return (
    <motion.div
      whileHover={{ scale: 1.025, y: -2 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group/asset relative flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* Subtle Ambient Orbital Micro-Nodes inside the Asset Frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#111110]/15 animate-pulse-soft"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2.5 right-3 w-1 h-1 rounded-full bg-[#111110]/20 animate-pulse-soft"
      />

      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        animate={{
          y: [0, -3.5, 0],
          rotate: [0, 0.4, 0, -0.4, 0],
        }}
        transition={{
          duration: 5.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay,
        }}
        style={
          shouldClipCorner
            ? {
                clipPath:
                  'polygon(0 0, 86% 0, 86% 11%, 100% 11%, 100% 100%, 0 100%)',
              }
            : undefined
        }
        className={`blush-editorial-tone ${imgClassName}`}
      />
    </motion.div>
  );
};

function slugSeed(slug: string): number {
  let h = 17;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 9973;
  }
  return h;
}

export const TemplateCover: React.FC<{
  name: string;
  slug: string;
  category: TemplateCategory;
  pro?: boolean;
  className?: string;
}> = ({ name, slug, category, pro, className = '' }) => {
  const seed = slugSeed(slug);
  const bar1 = 35 + (seed % 40);
  const bar2 = 50 + ((seed * 3) % 35);
  const bar3 = 28 + ((seed * 7) % 45);
  const bar4 = 60 + ((seed * 11) % 30);

  return (
    <div
      className={`relative aspect-[16/10] w-full bg-[#F7F6F3] border-b border-[#E8E6E1] overflow-hidden select-none ${className}`}
    >
      <svg
        viewBox="0 0 640 400"
        className="w-full h-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
        role="img"
        aria-label={`${name} — Notion template preview`}
      >
        {/* Subtle warm editorial paper background */}
        <rect width="640" height="400" fill="#F7F6F3" />

        {/* Notion Window Frame */}
        <g transform="translate(36, 28)">
          <rect
            width="568"
            height="344"
            rx="10"
            fill="#FDFCFB"
            stroke="#E5E3DF"
            strokeWidth="1.25"
          />

          {/* Top Window Bar */}
          <line x1="0" y1="28" x2="568" y2="28" stroke="#EAEAEA" strokeWidth="1" />
          <circle cx="16" cy="14" r="3.5" fill="#D4D4D4" />
          <circle cx="28" cy="14" r="3.5" fill="#E5E5E5" />
          <circle cx="40" cy="14" r="3.5" fill="#E5E5E5" />
          <text
            x="60"
            y="18"
            fill="#737373"
            fontSize="9.5"
            fontWeight="500"
            fontFamily="Inter, -apple-system, sans-serif"
          >
            Easlo Workspace / {category} / {name}
          </text>
          {pro && (
            <g transform="translate(516, 7)">
              <rect width="38" height="14" rx="7" fill="#0A0A0A" />
              <text
                x="19"
                y="10"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="7.5"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                PRO
              </text>
            </g>
          )}

          {/* Left Faux Notion Sidebar */}
          <rect x="1" y="29" width="124" height="314" fill="#FAFAFA" />
          <line x1="125" y1="28" x2="125" y2="344" stroke="#EAEAEA" strokeWidth="1" />

          {/* Sidebar Workspace Header */}
          <rect x="14" y="42" width="14" height="14" rx="3" fill="#0A0A0A" />
          <text
            x="21"
            y="52"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8.5"
            fontWeight="700"
          >
            e
          </text>
          <rect x="34" y="45" width="56" height="7" rx="3.5" fill="#262626" />

          {/* Sidebar Navigation Lines */}
          {[0, 1, 2, 3, 4].map((idx) => {
            const isActive = idx === seed % 3;
            const width = 52 + ((seed + idx * 19) % 36);
            return (
              <g key={idx} transform={`translate(12, ${72 + idx * 22})`}>
                {isActive && (
                  <rect x="-4" y="-4" width="104" height="16" rx="4" fill="#EAEAEA" />
                )}
                <circle
                  cx="5"
                  cy="4"
                  r="2.5"
                  fill={isActive ? '#0A0A0A' : '#A3A3A3'}
                />
                <rect
                  x="14"
                  y="1"
                  width={width}
                  height="6"
                  rx="3"
                  fill={isActive ? '#0A0A0A' : '#A3A3A3'}
                />
              </g>
            );
          })}

          {/* Sidebar Bottom Minimalist Blush-Style Character Doodle */}
          <g transform="translate(22, 265)" opacity="0.78">
            <rect
              x="0"
              y="0"
              width="82"
              height="60"
              rx="6"
              fill="#FFFFFF"
              stroke="#EAEAEA"
            />
            {/* Minimal Notion/Blush line-art character sketch */}
            <circle
              cx="41"
              cy="22"
              r="9"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="1.4"
            />
            <path
              d="M34 20 C36 14, 46 14, 48 20"
              fill="#0A0A0A"
            />
            <circle cx="38" cy="22" r="1" fill="#0A0A0A" />
            <circle cx="44" cy="22" r="1" fill="#0A0A0A" />
            <path
              d="M39 25 Q41 27 43 25"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M27 48 C29 36, 53 36, 55 48"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </g>

          {/* Main Notion Canvas Area */}
          <g transform="translate(148, 46)">
            {/* Page Icon Box + Template Title */}
            <rect
              x="0"
              y="0"
              width="26"
              height="26"
              rx="6"
              fill="#F5F5F5"
              stroke="#D4D4D4"
              strokeWidth="1"
            />
            <rect x="7" y="7" width="12" height="12" rx="2" fill="#0A0A0A" />

            <text
              x="36"
              y="19"
              fill="#0A0A0A"
              fontSize="15.5"
              fontWeight="700"
              fontFamily="Inter, -apple-system, sans-serif"
            >
              {name}
            </text>

            {/* View Tabs Row */}
            <g transform="translate(0, 38)">
              <rect x="0" y="0" width="54" height="16" rx="4" fill="#0A0A0A" />
              <text
                x="27"
                y="11"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="8"
                fontWeight="600"
              >
                Overview
              </text>
              <rect x="60" y="0" width="48" height="16" rx="4" fill="#F5F5F5" />
              <rect x="70" y="6" width="28" height="4" rx="2" fill="#737373" />
              <rect x="114" y="0" width="48" height="16" rx="4" fill="#F5F5F5" />
              <rect x="124" y="6" width="28" height="4" rx="2" fill="#A3A3A3" />
              <line x1="0" y1="22" x2="396" y2="22" stroke="#EAEAEA" strokeWidth="1" />
            </g>

            {/* Category-Specific Notion Database Content */}
            <g transform="translate(0, 72)">
              {category === 'Personal Productivity' && (
                /* Kanban Board Columns */
                <g>
                  {[0, 1, 2].map((col) => (
                    <g key={col} transform={`translate(${col * 134}, 0)`}>
                      <rect
                        width="124"
                        height="198"
                        rx="6"
                        fill="#FAFAFA"
                        stroke="#EAEAEA"
                      />
                      <circle
                        cx="14"
                        cy="15"
                        r="3"
                        fill={col === 0 ? '#A3A3A3' : col === 1 ? '#525252' : '#0A0A0A'}
                      />
                      <rect
                        x="22"
                        y="12"
                        width={42 + col * 10}
                        height="6"
                        rx="3"
                        fill="#262626"
                      />
                      {[0, 1, 2].map((card) => (
                        <g key={card} transform={`translate(8, ${30 + card * 52})`}>
                          <rect
                            width="108"
                            height="44"
                            rx="5"
                            fill="#FFFFFF"
                            stroke="#E5E5E5"
                          />
                          <rect
                            x="9"
                            y="10"
                            width={50 + ((seed + card * 13 + col * 7) % 38)}
                            height="6"
                            rx="3"
                            fill="#0A0A0A"
                          />
                          <rect
                            x="9"
                            y="22"
                            width="34"
                            height="5"
                            rx="2.5"
                            fill="#A3A3A3"
                          />
                          <rect
                            x="76"
                            y="21"
                            width="22"
                            height="10"
                            rx="5"
                            fill={card === 0 && col === 1 ? '#0A0A0A' : '#F5F5F5'}
                          />
                        </g>
                      ))}
                    </g>
                  ))}
                </g>
              )}

              {category === 'Health & Fitness' && (
                /* Checklist Rows + Streak Dots Matrix */
                <g>
                  <rect
                    width="396"
                    height="198"
                    rx="6"
                    fill="#FAFAFA"
                    stroke="#EAEAEA"
                  />
                  {[0, 1, 2, 3, 4].map((row) => {
                    const checked = (seed + row) % 2 === 0;
                    return (
                      <g key={row} transform={`translate(14, ${16 + row * 35})`}>
                        <rect
                          width="368"
                          height="28"
                          rx="5"
                          fill="#FFFFFF"
                          stroke="#EAEAEA"
                        />
                        <rect
                          x="10"
                          y="7"
                          width="14"
                          height="14"
                          rx="3.5"
                          fill={checked ? '#0A0A0A' : '#FFFFFF'}
                          stroke="#0A0A0A"
                          strokeWidth="1.2"
                        />
                        {checked && (
                          <path
                            d="M13.5 14 L16 16.5 L20.5 11.5"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        )}
                        <rect
                          x="34"
                          y="11"
                          width={95 + ((seed + row * 23) % 70)}
                          height="6"
                          rx="3"
                          fill={checked ? '#737373' : '#0A0A0A'}
                        />
                        {/* 7-day habit streak dots */}
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                          const activeDot = (seed + row + day) % 3 !== 0;
                          return (
                            <circle
                              key={day}
                              cx={256 + day * 15}
                              cy="14"
                              r="4"
                              fill={activeDot ? '#0A0A0A' : '#E5E5E5'}
                            />
                          );
                        })}
                      </g>
                    );
                  })}
                </g>
              )}

              {category === 'Finance' && (
                /* Stat Cards + Monochrome Bar Chart + Totals Row */
                <g>
                  {[
                    { label: 'NET BALANCE', val: '$24,850' },
                    { label: 'MONTHLY INFLOW', val: '$6,400' },
                    { label: 'SAVINGS RATE', val: '42%' },
                  ].map((stat, idx) => (
                    <g key={idx} transform={`translate(${idx * 134}, 0)`}>
                      <rect
                        width="124"
                        height="54"
                        rx="6"
                        fill="#FAFAFA"
                        stroke="#EAEAEA"
                      />
                      <text
                        x="12"
                        y="20"
                        fill="#737373"
                        fontSize="7.5"
                        fontWeight="700"
                        letterSpacing="0.06em"
                      >
                        {stat.label}
                      </text>
                      <text
                        x="12"
                        y="40"
                        fill="#0A0A0A"
                        fontSize="14"
                        fontWeight="700"
                      >
                        {stat.val}
                      </text>
                    </g>
                  ))}

                  {/* Bar chart panel */}
                  <g transform="translate(0, 66)">
                    <rect
                      width="396"
                      height="132"
                      rx="6"
                      fill="#FAFAFA"
                      stroke="#EAEAEA"
                    />
                    <line
                      x1="20"
                      y1="104"
                      x2="376"
                      y2="104"
                      stroke="#D4D4D4"
                      strokeWidth="1"
                    />
                    {[bar1, bar2, bar3, bar4, bar1 + 15, bar2 - 10, bar4 + 8, bar3 + 20].map(
                      (h, i) => (
                        <g key={i} transform={`translate(${34 + i * 42}, 0)`}>
                          <rect
                            x="0"
                            y={104 - h}
                            width="22"
                            height={h}
                            rx="3"
                            fill={i === 6 ? '#0A0A0A' : i % 2 === 0 ? '#525252' : '#A3A3A3'}
                          />
                          <rect
                            x="3"
                            y="112"
                            width="16"
                            height="4"
                            rx="2"
                            fill="#A3A3A3"
                          />
                        </g>
                      )
                    )}
                  </g>
                </g>
              )}

              {category === 'Business' && (
                /* Structured Notion Database Table Rows */
                <g>
                  <rect
                    width="396"
                    height="198"
                    rx="6"
                    fill="#FFFFFF"
                    stroke="#EAEAEA"
                  />
                  <rect width="396" height="28" rx="6" fill="#FAFAFA" />
                  <line x1="0" y1="28" x2="396" y2="28" stroke="#EAEAEA" />
                  <rect x="14" y="11" width="54" height="6" rx="3" fill="#525252" />
                  <rect x="176" y="11" width="44" height="6" rx="3" fill="#525252" />
                  <rect x="280" y="11" width="48" height="6" rx="3" fill="#525252" />
                  {[0, 1, 2, 3, 4].map((r) => (
                    <g key={r} transform={`translate(0, ${28 + r * 34})`}>
                      <line x1="0" y1="34" x2="396" y2="34" stroke="#F0F0F0" />
                      <rect
                        x="14"
                        y="13"
                        width={85 + ((seed + r * 19) % 55)}
                        height="7"
                        rx="3.5"
                        fill="#0A0A0A"
                      />
                      <rect
                        x="176"
                        y="10"
                        width="58"
                        height="14"
                        rx="7"
                        fill={r % 2 === 0 ? '#0A0A0A' : '#F5F5F5'}
                      />
                      <rect
                        x="280"
                        y="13"
                        width="64"
                        height="6"
                        rx="3"
                        fill="#737373"
                      />
                    </g>
                  ))}
                </g>
              )}

              {category === 'School' && (
                /* Lined Note Blocks & Callout Box */
                <g>
                  <rect
                    width="244"
                    height="198"
                    rx="6"
                    fill="#FAFAFA"
                    stroke="#EAEAEA"
                  />
                  {[0, 1, 2, 3, 4, 5].map((l) => (
                    <g key={l} transform={`translate(16, ${18 + l * 28})`}>
                      <circle cx="4" cy="4" r="2" fill="#0A0A0A" />
                      <rect
                        x="14"
                        y="1"
                        width={130 + ((seed + l * 17) % 70)}
                        height="6"
                        rx="3"
                        fill={l === 0 ? '#0A0A0A' : '#525252'}
                      />
                      <line
                        x1="0"
                        y1="16"
                        x2="212"
                        y2="16"
                        stroke="#EAEAEA"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  <g transform="translate(256, 0)">
                    <rect
                      width="140"
                      height="198"
                      rx="6"
                      fill="#FFFFFF"
                      stroke="#EAEAEA"
                    />
                    <rect x="12" y="14" width="60" height="7" rx="3.5" fill="#0A0A0A" />
                    {[0, 1, 2, 3].map((c) => (
                      <g key={c} transform={`translate(12, ${34 + c * 38})`}>
                        <rect
                          width="116"
                          height="30"
                          rx="4"
                          fill="#FAFAFA"
                          stroke="#EAEAEA"
                        />
                        <rect x="8" y="8" width="76" height="5" rx="2.5" fill="#262626" />
                        <rect x="8" y="17" width="44" height="4" rx="2" fill="#A3A3A3" />
                      </g>
                    ))}
                  </g>
                </g>
              )}

              {category === 'Travel' && (
                /* Itinerary Timeline + Map Pin Card */
                <g>
                  <rect
                    width="248"
                    height="198"
                    rx="6"
                    fill="#FAFAFA"
                    stroke="#EAEAEA"
                  />
                  <line
                    x1="26"
                    y1="22"
                    x2="26"
                    y2="176"
                    stroke="#D4D4D4"
                    strokeWidth="1.5"
                  />
                  {[0, 1, 2, 3].map((step) => (
                    <g key={step} transform={`translate(18, ${18 + step * 44})`}>
                      <circle
                        cx="8"
                        cy="8"
                        r="5"
                        fill={step === 0 ? '#0A0A0A' : '#FFFFFF'}
                        stroke="#0A0A0A"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="24"
                        y="0"
                        width="190"
                        height="30"
                        rx="5"
                        fill="#FFFFFF"
                        stroke="#EAEAEA"
                      />
                      <rect x="34" y="8" width="110" height="6" rx="3" fill="#0A0A0A" />
                      <rect x="34" y="18" width="64" height="4" rx="2" fill="#A3A3A3" />
                    </g>
                  ))}

                  {/* Map Pin Panel */}
                  <g transform="translate(260, 0)">
                    <rect
                      width="136"
                      height="198"
                      rx="6"
                      fill="#FAFAFA"
                      stroke="#EAEAEA"
                    />
                    <path
                      d="M12 50 Q68 25 124 65 T124 140"
                      fill="none"
                      stroke="#E5E5E5"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Map Pin */}
                    <g transform="translate(52, 62)">
                      <path
                        d="M16 0 C7.2 0 0 7.2 0 16 C0 28 16 42 16 42 C16 42 32 28 32 16 C32 7.2 24.8 0 16 0 Z"
                        fill="#0A0A0A"
                      />
                      <circle cx="16" cy="16" r="6" fill="#FFFFFF" />
                    </g>
                    <rect x="28" y="152" width="80" height="7" rx="3.5" fill="#0A0A0A" />
                    <rect x="40" y="166" width="56" height="5" rx="2.5" fill="#737373" />
                  </g>
                </g>
              )}
            </g>
          </g>
        </g>
      </svg>

      {/* Floating Miniature Blush Category Illustration Vignette inside Template Cover */}
      <div className="pointer-events-none absolute bottom-3 right-3.5 w-14 h-11 rounded-[9px] bg-white/95 backdrop-blur-xs border border-[#E8E6E1] shadow-[0_4px_12px_rgba(17,17,16,0.05)] p-1 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105">
        <BlushAssetImage
          src={CATEGORY_BLUSH_ASSET[category]}
          alt={`${category} illustration`}
          floatDelay={(seed % 5) * 0.35}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export type HeroWorkspaceMode = 'second-brain' | 'finance' | 'habit';

export const HeroWorkspaceShowcase: React.FC<{
  activeMode: HeroWorkspaceMode;
  onSelectMode: (mode: HeroWorkspaceMode) => void;
  onOpenTemplate: (slug: string) => void;
  onQuickCheckout: (slug: string) => void;
}> = ({ activeMode, onSelectMode, onOpenTemplate, onQuickCheckout }) => {
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({
    'sb-1': true,
    'sb-2': true,
    'sb-3': false,
    'sb-4': false,
    'fin-1': true,
    'fin-2': true,
    'fin-3': true,
    'fin-4': false,
    'hab-1': true,
    'hab-2': true,
    'hab-3': false,
    'hab-4': true,
  });

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const modeConfig = {
    'second-brain': {
      slug: 'second-brain',
      breadcrumb: 'Easlo Workspace / Personal Productivity / Second Brain 5.0',
      badge: 'PARA SYSTEM · $39',
      title: 'Second Brain 5.0',
      subtitle: 'Unified PARA command center for tasks, projects, areas & notes.',
      primaryIllus: BLUSH_ASSETS.notionLineArtCreator,
      secondaryIllus: BLUSH_ASSETS.calmStudyDesk,
      illusCaption: 'PARA Architecture',
      metrics: [
        { label: 'ACTIVE PROJECTS', value: '6 Sprints', sub: '2 shipping this week' },
        { label: 'EVERGREEN NOTES', value: '142 Notes', sub: 'Linked across 8 areas' },
        { label: 'WEEKLY CLARITY', value: '4.5 hrs', sub: 'Saved on planning' },
      ],
      tasksTitle: 'Today’s Interactive Focus Queue (Click to complete)',
      tasks: [
        { id: 'sb-1', text: 'Finalize Q4 product launch roadmap in Projects', tag: 'Project' },
        { id: 'sb-2', text: 'Synthesize 3 book notes into Evergreen Zettelkasten', tag: 'Resources' },
        { id: 'sb-3', text: 'Run 10-minute Sunday zero-inbox weekly review', tag: 'Ritual' },
        { id: 'sb-4', text: 'Align quarterly OKR milestones with active tasks', tag: 'Goals' },
      ],
    },
    finance: {
      slug: 'finance-tracker',
      breadcrumb: 'Easlo Workspace / Finance / All-In-One Finance Ledger',
      badge: 'FINANCE OS · $39',
      title: 'Finance Tracker 2026',
      subtitle: 'Real-time cash flow, net-worth rollups, and subscription audit.',
      primaryIllus: BLUSH_ASSETS.financeCharts,
      secondaryIllus: BLUSH_ASSETS.financialAnalyst,
      illusCaption: 'Automated Rollups',
      metrics: [
        { label: 'NET WORTH', value: '$148,920', sub: '+14.2% YTD growth' },
        { label: 'MONTHLY SAVINGS', value: '66.0%', sub: '$7,560 saved this month' },
        { label: 'RECURRING AUDIT', value: '$340/mo', sub: 'Unused subs flagged' },
      ],
      tasksTitle: 'Monthly Financial Checklist (Click to complete)',
      tasks: [
        { id: 'fin-1', text: 'Reconcile checking & high-yield savings balances', tag: 'Ledger' },
        { id: 'fin-2', text: 'Audit recurring SaaS & streaming subscriptions', tag: 'Audit' },
        { id: 'fin-3', text: 'Allocate monthly index fund & treasury contributions', tag: 'Invest' },
        { id: 'fin-4', text: 'Review Q4 tax reserve & deductible business expenses', tag: 'Tax' },
      ],
    },
    habit: {
      slug: 'habit-tracker',
      breadcrumb: 'Easlo Workspace / Health & Rituals / Minimalist Habit OS',
      badge: 'FREE TEMPLATE · $0',
      title: 'Minimalist Habit Tracker',
      subtitle: 'Daily keystone habits, streak heatmaps, and evening reflection.',
      primaryIllus: BLUSH_ASSETS.minimalistLivingRoom,
      secondaryIllus: BLUSH_ASSETS.modernWorkspace,
      illusCaption: 'Daily Consistency',
      metrics: [
        { label: 'CURRENT STREAK', value: '28 Days', sub: '94% monthly completion' },
        { label: 'DEEP WORK BLOCKS', value: '3.5 hrs/day', sub: 'Distraction-free focus' },
        { label: 'EVENING SHUTDOWN', value: '100%', sub: '7-day calm streak' },
      ],
      tasksTitle: 'Today’s Keystone Rituals (Click to complete)',
      tasks: [
        { id: 'hab-1', text: '90 minutes of deep work before checking messages', tag: 'Focus' },
        { id: 'hab-2', text: '30 minutes of non-fiction reading & note capture', tag: 'Mind' },
        { id: 'hab-3', text: '45-minute strength training or outdoor run', tag: 'Health' },
        { id: 'hab-4', text: 'Digital sunset & 3-line gratitude journal at 9 PM', tag: 'Calm' },
      ],
    },
  }[activeMode];

  const completedCount = modeConfig.tasks.filter((t) => checkedTasks[t.id]).length;
  const completionPct = Math.round((completedCount / modeConfig.tasks.length) * 100);

  return (
    <div className="relative w-full">
      {/* Outer Warm Alabaster Architectural Stage */}
      <div className="relative rounded-[22px] border border-[#E8E6E1] bg-[#F7F6F2] p-3.5 sm:p-5 shadow-[0_24px_60px_-15px_rgba(17,17,16,0.08)]">
        {/* Top Mode Switcher Pills + Live Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-[#E8E6E1]">
          <div
            role="tablist"
            aria-label="Interactive Notion workspace preview modes"
            className="inline-flex items-center gap-1 p-1 rounded-[10px] bg-[#EFECE6] border border-[#E8E6E1]"
          >
            {[
              { id: 'second-brain' as const, label: '01 · Second Brain' },
              { id: 'finance' as const, label: '02 · Finance OS' },
              { id: 'habit' as const, label: '03 · Habit Tracker' },
            ].map((tab) => {
              const active = activeMode === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectMode(tab.id)}
                  className={`px-2.5 py-1.5 rounded-[7px] text-[11.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#111110] text-[#FDFCFB] shadow-[0_1px_3px_rgba(17,17,16,0.16)]'
                      : 'text-[#52504C] hover:text-[#111110]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium text-[#78756F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-pulse-soft" />
            <span>Interactive Notion Preview</span>
          </div>
        </div>

        {/* Main Interactive Notion Window */}
        <div className="rounded-[16px] border border-[#D5D2CB] bg-[#FDFCFB] overflow-hidden shadow-[0_8px_28px_-6px_rgba(17,17,16,0.06)]">
          {/* Notion Window Chrome Bar */}
          <div className="px-3.5 py-2.5 bg-[#F7F6F3] border-b border-[#E8E6E1] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111110]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D2CB]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#D5D2CB]" />
              </div>
              <span className="text-[11px] font-medium text-[#78756F] truncate pl-1">
                {modeConfig.breadcrumb}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onOpenTemplate(modeConfig.slug)}
                className="px-2.5 py-1 rounded-[6px] border border-[#D5D2CB] bg-[#FDFCFB] hover:bg-[#F7F6F3] text-[10.5px] font-semibold text-[#111110] transition-colors cursor-pointer"
              >
                Inspect Details
              </button>
              <button
                type="button"
                onClick={() => onQuickCheckout(modeConfig.slug)}
                className="px-2.5 py-1 rounded-[6px] bg-[#111110] hover:bg-[#262523] text-[#FDFCFB] text-[10.5px] font-semibold transition-colors cursor-pointer"
              >
                Duplicate Template
              </button>
            </div>
          </div>

          {/* Notion Workspace Body */}
          <div className="p-4 sm:p-5 space-y-4">
            {/* Workspace Header + Floating Blush Illustration Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3.5 border-b border-[#E8E6E1]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 rounded-[5px] bg-[#111110] text-[#FDFCFB] text-[11px] font-bold inline-flex items-center justify-center">
                    e
                  </span>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#78756F]">
                    {modeConfig.badge}
                  </span>
                </div>
                <h2 className="text-[19px] sm:text-[21px] font-bold tracking-[-0.025em] text-[#111110]">
                  {modeConfig.title}
                </h2>
                <p className="text-[12.5px] text-[#52504C]">
                  {modeConfig.subtitle}
                </p>
              </div>

              {/* Dual Floating Blush Illustration Cards */}
              <div className="flex items-center gap-2.5 shrink-0">
                <div className="w-24 h-20 rounded-[12px] border border-[#E8E6E1] bg-[#F7F6F2] p-1.5 flex flex-col justify-between">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.06em] text-[#78756F] px-1 truncate">
                    {modeConfig.illusCaption}
                  </span>
                  <BlushAssetImage
                    src={modeConfig.primaryIllus}
                    alt={`${modeConfig.title} primary illustration`}
                    floatDelay={0.15}
                    className="w-full h-14"
                  />
                </div>
                <div className="w-24 h-20 rounded-[12px] border border-[#E8E6E1] bg-[#F5F2EB] p-1.5 flex flex-col justify-between">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.06em] text-[#78756F] px-1 truncate">
                    Calm Setup
                  </span>
                  <BlushAssetImage
                    src={modeConfig.secondaryIllus}
                    alt={`${modeConfig.title} secondary illustration`}
                    floatDelay={0.65}
                    maskCorner={modeConfig.secondaryIllus !== BLUSH_ASSETS.financialAnalyst && modeConfig.secondaryIllus !== BLUSH_ASSETS.modernWorkspace}
                    className="w-full h-14"
                  />
                </div>
              </div>
            </div>

            {/* 3 Live KPI Metric Blocks */}
            <div className="grid grid-cols-3 gap-2.5">
              {modeConfig.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-[10px] border border-[#E8E6E1] bg-[#F7F6F3] p-2.5 sm:p-3"
                >
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.07em] text-[#78756F] truncate">
                    {m.label}
                  </p>
                  <p className="mt-1 text-[16px] sm:text-[18px] font-bold tracking-[-0.02em] text-[#111110] tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-[10.5px] text-[#52504C] truncate">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Checkable Notion Database Rows + Animated Progress Bar */}
            <div className="rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11.5px] font-semibold text-[#111110]">
                  {modeConfig.tasksTitle}
                </span>
                <span className="text-[11px] font-bold text-[#111110] tabular-nums">
                  {completedCount}/{modeConfig.tasks.length} Done ({completionPct}%)
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#E8E6E1] overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${completionPct}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-[#111110]"
                />
              </div>

              <div className="space-y-1.5 pt-1">
                {modeConfig.tasks.map((task) => {
                  const isDone = Boolean(checkedTasks[task.id]);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => toggleTask(task.id)}
                      className="w-full px-2.5 py-2 rounded-[8px] border border-[#E8E6E1] bg-[#F7F6F3]/70 hover:bg-[#F1EFEA] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-4 h-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                            isDone
                              ? 'bg-[#111110] border-[#111110] text-[#FDFCFB]'
                              : 'bg-[#FDFCFB] border-[#111110]'
                          }`}
                        >
                          {isDone && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6.5L5 9L9.5 3.5"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-[12px] font-medium truncate transition-colors ${
                            isDone ? 'line-through text-[#78756F]' : 'text-[#111110]'
                          }`}
                        >
                          {task.text}
                        </span>
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-[5px] bg-[#FDFCFB] border border-[#E8E6E1] text-[#52504C] shrink-0">
                        {task.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Blush.design-inspired Notion-style character & workspace illustration showcase
 * with SOTA minimalist motion & architectural connector line
 */
export const BlushNotionIllustration: React.FC<{
  variant?: 'hero' | 'workspace' | 'minimalist';
  className?: string;
}> = ({ variant = 'hero', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div
        className={`relative flex items-center justify-center gap-3 sm:gap-5 py-2 ${className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 flex items-center gap-3 rounded-[14px] border border-[#E8E6E1] bg-[#FDFCFB] px-3.5 py-2 shadow-[0_6px_20px_rgba(17,17,16,0.04)]"
        >
          <BlushAssetImage
            src={BLUSH_ASSETS.notionLineArtCreator}
            alt="Notion template creator illustration"
            floatDelay={0.2}
            className="w-12 h-10"
          />
          <div className="text-left">
            <p className="text-[11px] font-semibold text-[#111110]">
              Crafted by Easlo Studio
            </p>
            <p className="text-[10px] text-[#78756F]">
              300,000+ Notion workspaces duplicated
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

/**
 * 3 Home Feature Split SVG Mockups (960x720 aspect ratio)
 */
export const FeatureMedia: React.FC<{
  kind: 'second-brain' | 'finance' | 'minimalism';
}> = ({ kind }) => {
  if (kind === 'second-brain') {
    return (
      <div className="w-full rounded-[16px] border border-[#EAEAEA] bg-[#FAFAFA] p-4 sm:p-6 shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
        <svg
          viewBox="0 0 800 560"
          className="w-full h-auto block rounded-[12px] border border-[#EAEAEA] bg-white"
          role="img"
          aria-label="Second Brain Notion system dashboard preview"
        >
          <rect width="800" height="560" rx="12" fill="#FFFFFF" />
          {/* Header bar */}
          <rect width="800" height="40" rx="12" fill="#FAFAFA" />
          <line x1="0" y1="40" x2="800" y2="40" stroke="#EAEAEA" />
          <circle cx="20" cy="20" r="4.5" fill="#0A0A0A" />
          <circle cx="35" cy="20" r="4.5" fill="#D4D4D4" />
          <circle cx="50" cy="20" r="4.5" fill="#D4D4D4" />
          <text x="74" y="24" fill="#0A0A0A" fontSize="12" fontWeight="600">
            Second Brain 5.0 — PARA Workspace
          </text>
          <rect x="698" y="11" width="84" height="18" rx="9" fill="#0A0A0A" />
          <text x="740" y="23" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
            PARA SYSTEM
          </text>

          {/* Left Quick Capture + Navigation */}
          <rect x="0" y="41" width="180" height="519" fill="#FAFAFA" />
          <line x1="180" y1="40" x2="180" y2="560" stroke="#EAEAEA" />
          <text x="20" y="72" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="0.08em">
            QUICK CAPTURE
          </text>
          <rect x="16" y="84" width="148" height="32" rx="6" fill="#0A0A0A" />
          <text x="90" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="600">
            + New Task or Note
          </text>

          <text x="20" y="146" fill="#737373" fontSize="10" fontWeight="700" letterSpacing="0.08em">
            PARA HUB
          </text>
          {['01 · Projects (6)', '02 · Areas (8)', '03 · Resources (24)', '04 · Archive'].map(
            (label, i) => (
              <g key={label} transform={`translate(16, ${160 + i * 32})`}>
                <rect
                  width="148"
                  height="26"
                  rx="5"
                  fill={i === 0 ? '#EAEAEA' : 'transparent'}
                />
                <text
                  x="10"
                  y="17"
                  fill={i === 0 ? '#0A0A0A' : '#525252'}
                  fontSize="11.5"
                  fontWeight={i === 0 ? '600' : '500'}
                >
                  {label}
                </text>
              </g>
            )
          )}

          {/* Main Dashboard Collage: Tasks + Projects + Goals + Notes */}
          <g transform="translate(204, 64)">
            <text x="0" y="20" fill="#0A0A0A" fontSize="22" fontWeight="700" letterSpacing="-0.02em">
              Command Center
            </text>
            <text x="0" y="42" fill="#737373" fontSize="12">
              Tasks, active projects, quarterly goals, and evergreen notes in one unified view.
            </text>

            {/* 4 PARA Metric Cards */}
            {[
              { title: 'Projects', count: '6 Active', sub: '2 due this week' },
              { title: 'Areas', count: '8 Pillars', sub: 'Health, Career, Finance' },
              { title: 'Goals', count: '4 Q4 OKRs', sub: '78% avg progress' },
              { title: 'Notes Inbox', count: '14 Notes', sub: 'Synced today' },
            ].map((box, idx) => (
              <g key={box.title} transform={`translate(${idx * 144}, 62)`}>
                <rect
                  width="134"
                  height="78"
                  rx="8"
                  fill="#FAFAFA"
                  stroke="#EAEAEA"
                />
                <text x="14" y="24" fill="#737373" fontSize="10.5" fontWeight="600">
                  {box.title}
                </text>
                <text x="14" y="48" fill="#0A0A0A" fontSize="16" fontWeight="700">
                  {box.count}
                </text>
                <text x="14" y="66" fill="#737373" fontSize="10">
                  {box.sub}
                </text>
              </g>
            ))}

            {/* Split Bottom Panels: Today's Tasks (Left) + Active Projects & Goals (Right) */}
            <g transform="translate(0, 160)">
              <rect width="278" height="310" rx="10" fill="#FFFFFF" stroke="#EAEAEA" />
              <text x="18" y="28" fill="#0A0A0A" fontSize="13" fontWeight="700">
                Today’s Focus Tasks
              </text>
              <line x1="0" y1="42" x2="278" y2="42" stroke="#EAEAEA" />
              {[
                { t: 'Finalize Q4 product launch roadmap', done: true, tag: 'Product' },
                { t: 'Review weekly cash flow & budget ledger', done: true, tag: 'Finance' },
                { t: 'Draft newsletter issue #142 in Notion', done: false, tag: 'Writing' },
                { t: '30-minute evening reading & synthesis', done: false, tag: 'Growth' },
                { t: 'Clear inbox & archive completed sprints', done: false, tag: 'System' },
              ].map((task, idx) => (
                <g key={task.t} transform={`translate(16, ${56 + idx * 48})`}>
                  <rect
                    width="246"
                    height="38"
                    rx="6"
                    fill="#FAFAFA"
                    stroke="#EAEAEA"
                  />
                  <rect
                    x="10"
                    y="11"
                    width="15"
                    height="15"
                    rx="3.5"
                    fill={task.done ? '#0A0A0A' : '#FFFFFF'}
                    stroke="#0A0A0A"
                    strokeWidth="1.3"
                  />
                  {task.done && (
                    <path
                      d="M13.5 18.5 L16.5 21.5 L21.5 15.5"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  )}
                  <text
                    x="34"
                    y="23"
                    fill={task.done ? '#737373' : '#0A0A0A'}
                    fontSize="10.5"
                    fontWeight="500"
                    textDecoration={task.done ? 'line-through' : 'none'}
                  >
                    {task.t}
                  </text>
                </g>
              ))}
            </g>

            <g transform="translate(294, 160)">
              <rect width="278" height="310" rx="10" fill="#FFFFFF" stroke="#EAEAEA" />
              <text x="18" y="28" fill="#0A0A0A" fontSize="13" fontWeight="700">
                Quarterly Goals & Milestones
              </text>
              <line x1="0" y1="42" x2="278" y2="42" stroke="#EAEAEA" />
              {[
                { name: 'Ship 5 Minimalist Templates', pct: 85 },
                { name: 'Maintain 90% Daily Habit Streak', pct: 92 },
                { name: 'Read 24 Non-Fiction Books', pct: 68 },
                { name: 'Zero Inbox Every Sunday', pct: 100 },
              ].map((goal, idx) => (
                <g key={goal.name} transform={`translate(18, ${60 + idx * 58})`}>
                  <text x="0" y="14" fill="#111110" fontSize="11.5" fontWeight="600">
                    {goal.name}
                  </text>
                  <text x="242" y="14" textAnchor="end" fill="#111110" fontSize="11" fontWeight="700">
                    {goal.pct}%
                  </text>
                  <rect x="0" y="24" width="242" height="8" rx="4" fill="#E8E6E1" />
                  <motion.rect
                    x="0"
                    y="24"
                    initial={{ width: 0 }}
                    whileInView={{ width: Math.round((242 * goal.pct) / 100) }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{
                      duration: 0.9,
                      delay: idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    height="8"
                    rx="4"
                    fill="#111110"
                  />
                </g>
              ))}
            </g>
          </g>
        </svg>

        {/* Companion Blush.design Illustration Strip for Second Brain */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <motion.div
            whileHover={{ y: -2 }}
            className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
          >
            <BlushAssetImage
              src={BLUSH_ASSETS.notionLineArtCreator}
              alt="PARA note capture illustration"
              floatDelay={0.2}
              className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-[#111110] truncate">
                Capture & Synthesize
              </p>
              <p className="text-[11.5px] text-[#78756F] leading-snug">
                Connect fleeting ideas to active projects.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
          >
            <BlushAssetImage
              src={BLUSH_ASSETS.calmStudyDesk}
              alt="Deep work desk illustration"
              floatDelay={0.8}
              className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-[#111110] truncate">
                Calm Weekly Reviews
              </p>
              <p className="text-[11.5px] text-[#78756F] leading-snug">
                Zero-inbox ritual built for clarity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (kind === 'finance') {
    return (
      <div className="w-full rounded-[16px] border border-[#E8E6E1] bg-[#F7F6F3] p-4 sm:p-6 shadow-[0_1px_2px_rgba(17,17,16,0.035)]">
        <svg
          viewBox="0 0 800 560"
          className="w-full h-auto block rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB]"
          role="img"
          aria-label="All-In-One Finance Dashboard Notion preview with grayscale charts"
        >
          <rect width="800" height="560" rx="12" fill="#FDFCFB" />
          <rect width="800" height="40" rx="12" fill="#F7F6F3" />
          <line x1="0" y1="40" x2="800" y2="40" stroke="#E8E6E1" />
          <circle cx="20" cy="20" r="4.5" fill="#111110" />
          <circle cx="35" cy="20" r="4.5" fill="#D5D2CB" />
          <circle cx="50" cy="20" r="4.5" fill="#D5D2CB" />
          <text x="74" y="24" fill="#111110" fontSize="12" fontWeight="600">
            All-In-One Finance Dashboard — 2026 Ledger
          </text>

          {/* Top 4 KPI Stat Cards */}
          <g transform="translate(32, 64)">
            {[
              { label: 'NET WORTH', val: '$148,920.00', delta: '+14.2% YTD' },
              { label: 'MONTHLY INCOME', val: '$11,450.00', delta: 'On target' },
              { label: 'MONTHLY EXPENSES', val: '$3,890.00', delta: '-8.4% vs avg' },
              { label: 'SAVINGS RATE', val: '66.0%', delta: '$7,560 saved' },
            ].map((card, i) => (
              <g key={card.label} transform={`translate(${i * 188}, 0)`}>
                <rect width="172" height="92" rx="10" fill="#F7F6F3" stroke="#E8E6E1" />
                <text x="16" y="28" fill="#78756F" fontSize="10" fontWeight="700" letterSpacing="0.08em">
                  {card.label}
                </text>
                <text x="16" y="56" fill="#111110" fontSize="20" fontWeight="700">
                  {card.val}
                </text>
                <text x="16" y="76" fill="#52504C" fontSize="11" fontWeight="500">
                  {card.delta}
                </text>
              </g>
            ))}
          </g>

          {/* Labeled Grayscale Bar & Line Chart Panel */}
          <g transform="translate(32, 180)">
            <rect width="736" height="344" rx="10" fill="#F7F6F3" stroke="#E8E6E1" />
            <text x="24" y="34" fill="#111110" fontSize="14" fontWeight="700">
              Monthly Cash Flow & Net Savings Trajectory (Jan – Dec 2026)
            </text>
            <g transform="translate(530, 20)">
              <rect x="0" y="4" width="10" height="10" rx="2" fill="#111110" />
              <text x="16" y="13" fill="#52504C" fontSize="11" fontWeight="500">
                Income
              </text>
              <rect x="74" y="4" width="10" height="10" rx="2" fill="#A39F98" />
              <text x="90" y="13" fill="#52504C" fontSize="11" fontWeight="500">
                Expenses
              </text>
            </g>

            {/* Horizontal Grid Lines + Y-Axis Labels */}
            {[
              { y: 74, label: '$12k' },
              { y: 134, label: '$9k' },
              { y: 194, label: '$6k' },
              { y: 254, label: '$3k' },
              { y: 298, label: '$0' },
            ].map((row) => (
              <g key={row.label}>
                <text x="24" y={row.y + 4} fill="#78756F" fontSize="10" fontWeight="500">
                  {row.label}
                </text>
                <line
                  x1="64"
                  y1={row.y}
                  x2="708"
                  y2={row.y}
                  stroke="#E8E6E1"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* 12 Animated Monthly Bars */}
            {[
              { m: 'Jan', inc: 150, exp: 75 },
              { m: 'Feb', inc: 162, exp: 70 },
              { m: 'Mar', inc: 158, exp: 82 },
              { m: 'Apr', inc: 175, exp: 68 },
              { m: 'May', inc: 184, exp: 74 },
              { m: 'Jun', inc: 179, exp: 65 },
              { m: 'Jul', inc: 192, exp: 72 },
              { m: 'Aug', inc: 198, exp: 69 },
              { m: 'Sep', inc: 205, exp: 71 },
              { m: 'Oct', inc: 212, exp: 66 },
              { m: 'Nov', inc: 220, exp: 64 },
              { m: 'Dec', inc: 228, exp: 68 },
            ].map((bar, idx) => {
              const x = 82 + idx * 52;
              return (
                <g key={bar.m}>
                  <motion.rect
                    x={x}
                    initial={{ y: 298, height: 0 }}
                    whileInView={{ y: 298 - bar.inc, height: bar.inc }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    width="16"
                    rx="3"
                    fill="#111110"
                  />
                  <motion.rect
                    x={x + 19}
                    initial={{ y: 298, height: 0 }}
                    whileInView={{ y: 298 - bar.exp, height: bar.exp }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.04 + 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    width="14"
                    rx="3"
                    fill="#A39F98"
                  />
                  <text
                    x={x + 16}
                    y="320"
                    textAnchor="middle"
                    fill="#52504C"
                    fontSize="10.5"
                    fontWeight="500"
                  >
                    {bar.m}
                  </text>
                </g>
              );
            })}

            {/* Animated Cumulative Trajectory Line Overlay */}
            <polyline
              fill="none"
              stroke="#52504C"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-dash-flow"
              points="90,175 142,162 194,168 246,148 298,136 350,130 402,118 454,112 506,104 558,95 610,88 662,80"
            />
          </g>
        </svg>

        {/* Companion Blush.design Illustration Strip for Finance Dashboard */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <motion.div
            whileHover={{ y: -2 }}
            className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
          >
            <BlushAssetImage
              src={BLUSH_ASSETS.financeCharts}
              alt="Visual budget & chart tracking illustration"
              floatDelay={0.3}
              className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-[#111110] truncate">
                Visual Budget Breakdown
              </p>
              <p className="text-[11.5px] text-[#78756F] leading-snug">
                Spot cash-flow trends in seconds.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -2 }}
            className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
          >
            <BlushAssetImage
              src={BLUSH_ASSETS.financialAnalyst}
              alt="Net worth and savings analytics illustration"
              floatDelay={0.9}
              className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
              maskCorner={false}
            />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-[#111110] truncate">
                Net-Worth Rollups
              </p>
              <p className="text-[11.5px] text-[#78756F] leading-snug">
                Track every account in one ledger.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[16px] border border-[#E8E6E1] bg-[#F7F6F3] p-4 sm:p-6 shadow-[0_1px_2px_rgba(17,17,16,0.035)]">
      <svg
        viewBox="0 0 800 560"
        className="w-full h-auto block rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB]"
        role="img"
        aria-label="Digital Minimalism desktop and mobile setup preview"
      >
        <rect width="800" height="560" rx="12" fill="#FDFCFB" />

        {/* Minimalist Desktop Frame */}
        <g transform="translate(56, 62)">
          <rect
            width="470"
            height="310"
            rx="14"
            fill="#111110"
          />
          <rect
            x="12"
            y="12"
            width="446"
            height="286"
            rx="8"
            fill="#F7F6F3"
          />
          {/* Minimalist Quote / Clock on Desktop Wallpaper */}
          <text
            x="235"
            y="138"
            textAnchor="middle"
            fill="#111110"
            fontSize="36"
            fontWeight="700"
            letterSpacing="-0.04em"
          >
            09:41
          </text>
          <text
            x="235"
            y="166"
            textAnchor="middle"
            fill="#78756F"
            fontSize="13"
            fontWeight="500"
          >
            Less, but better.
          </text>
          {/* Minimalist dock */}
          <rect
            x="165"
            y="258"
            width="140"
            height="24"
            rx="12"
            fill="#FDFCFB"
            stroke="#E8E6E1"
          />
          {[0, 1, 2, 3, 4].map((d) => (
            <rect
              key={d}
              x={179 + d * 24}
              y="264"
              width="12"
              height="12"
              rx="3"
              fill="#111110"
            />
          ))}
          {/* Monitor Stand */}
          <rect x="205" y="310" width="60" height="36" fill="#D5D2CB" />
          <rect x="165" y="346" width="140" height="8" rx="4" fill="#A39F98" />
        </g>

        {/* Minimalist Phone Frame Overlapping Right */}
        <g transform="translate(510, 110)">
          <rect
            width="224"
            height="396"
            rx="32"
            fill="#111110"
          />
          <rect
            x="10"
            y="10"
            width="204"
            height="376"
            rx="24"
            fill="#FDFCFB"
          />
          {/* Dynamic Island */}
          <rect x="78" y="22" width="68" height="16" rx="8" fill="#111110" />

          <text
            x="112"
            y="92"
            textAnchor="middle"
            fill="#111110"
            fontSize="30"
            fontWeight="700"
            letterSpacing="-0.03em"
          >
            Saturday
          </text>
          <text
            x="112"
            y="114"
            textAnchor="middle"
            fill="#78756F"
            fontSize="12"
            fontWeight="500"
          >
            4 Essential Tools Only
          </text>

          {/* 4 Minimalist Text-List Launcher Rows */}
          {['01 · Calendar', '02 · Notion', '03 · SyncTasks', '04 · Journal'].map(
            (app, idx) => (
              <g key={app} transform={`translate(28, ${148 + idx * 44})`}>
                <rect
                  width="168"
                  height="34"
                  rx="8"
                  fill={idx === 1 ? '#F1EFEA' : '#F7F6F3'}
                  stroke="#E8E6E1"
                />
                <text x="14" y="21" fill="#111110" fontSize="12" fontWeight="600">
                  {app}
                </text>
                {idx === 1 && (
                  <circle cx="152" cy="17" r="3" fill="#111110" className="animate-pulse-soft" />
                )}
              </g>
            )
          )}

          {/* Home Indicator */}
          <rect x="76" y="368" width="72" height="4" rx="2" fill="#111110" />
        </g>
      </svg>

      {/* Companion Blush.design Illustration Strip for Digital Minimalism */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ y: -2 }}
          className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
        >
          <BlushAssetImage
            src={BLUSH_ASSETS.minimalistLivingRoom}
            alt="Calm minimalist environment illustration"
            floatDelay={0.4}
            className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-[#111110] truncate">
              Intentional Environment
            </p>
            <p className="text-[11.5px] text-[#78756F] leading-snug">
              Quiet setups for distraction-free focus.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ y: -2 }}
          className="group rounded-[12px] border border-[#E8E6E1] bg-[#FDFCFB] p-3 flex items-center gap-3 transition-shadow hover:shadow-[0_6px_18px_rgba(17,17,16,0.04)]"
        >
          <BlushAssetImage
            src={BLUSH_ASSETS.modernWorkspace}
            alt="Minimalist digital workspace illustration"
            floatDelay={1.0}
            className="w-16 h-14 rounded-[8px] bg-[#F7F6F3] p-1 shrink-0"
            maskCorner={false}
          />
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-[#111110] truncate">
              Curated Toolstack
            </p>
            <p className="text-[11.5px] text-[#78756F] leading-snug">
              Wallpapers, workflows & focused apps.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const AppIconGlyph: React.FC<{
  icon: 'grid' | 'book' | 'flask' | 'check-circle';
}> = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-[8px] border border-[#E8E6E1] bg-[#F7F6F3] flex items-center justify-center text-[#111110] shrink-0 transition-transform duration-300 group-hover:scale-105">
      {icon === 'grid' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )}
      {icon === 'book' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )}
      {icon === 'flask' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2v7.31L4.72 18.55A2 2 0 0 0 6.46 21.5h11.08a2 2 0 0 0 1.74-2.95L14 9.31V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
        </svg>
      )}
      {icon === 'check-circle' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )}
    </div>
  );
};
