import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BLUSH_ASSETS,
  CATEGORY_BLUSH_ASSET,
  TemplateCategory,
} from '../data/catalog';
import freelancerMascotCardImg from '../assets/images/freelancer_mascot_card_1794923266919.jpg';

export const UltraHdSvgFilter: React.FC = () => (
  <svg
    width="0"
    height="0"
    aria-hidden="true"
    className="fixed top-0 left-0 pointer-events-none opacity-0"
  >
    <defs>
      <filter id="lumina-ultra-hd" colorInterpolationFilters="sRGB">
        <feConvolveMatrix
          order="3 3"
          preserveAlpha="true"
          kernelMatrix="0 -0.16 0 -0.16 1.64 -0.16 0 -0.16 0"
          result="sharpened"
        />
        <feComponentTransfer in="sharpened">
          <feFuncR type="linear" slope="1.03" intercept="-0.015" />
          <feFuncG type="linear" slope="1.03" intercept="-0.015" />
          <feFuncB type="linear" slope="1.03" intercept="-0.015" />
        </feComponentTransfer>
      </filter>
      <filter id="resonance-showcase-hd" colorInterpolationFilters="sRGB">
        <feConvolveMatrix
          order="3 3"
          preserveAlpha="true"
          kernelMatrix="0 -0.18 0 -0.18 1.72 -0.18 0 -0.18 0"
          result="crisp"
        />
        <feComponentTransfer in="crisp">
          <feFuncR type="linear" slope="1.04" intercept="-0.02" />
          <feFuncG type="linear" slope="1.04" intercept="-0.02" />
          <feFuncB type="linear" slope="1.04" intercept="-0.02" />
        </feComponentTransfer>
      </filter>
    </defs>
  </svg>
);

export const BlushAssetImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  floatDelay?: number;
  disableFloat?: boolean;
}> = ({
  src,
  alt,
  className = '',
  imgClassName = 'max-w-full max-h-full w-auto h-auto object-contain',
  floatDelay = 0,
  disableFloat = false,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F7F6F3] text-[#6E6D68] text-xs font-medium p-4 ${className}`}
      >
        <span>{alt}</span>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className={`group/asset relative flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        onError={() => setFailed(true)}
        animate={
          disableFloat
            ? undefined
            : {
                y: [0, -3, 0],
              }
        }
        transition={
          disableFloat
            ? undefined
            : {
                duration: 5.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              }
        }
        className={`blush-illustration ${imgClassName}`}
      />
    </motion.div>
  );
};

export const TemplateCover: React.FC<{
  name: string;
  slug: string;
  category: TemplateCategory;
  pro?: boolean;
  illustrationUrl?: string;
  cardTint?: string;
  className?: string;
}> = ({
  name,
  slug,
  category,
  pro,
  illustrationUrl,
  cardTint = '#F7F6F3',
  className = '',
}) => {
  const isFreelanceMascot = slug === 'freelance-os';
  const resolvedAsset = isFreelanceMascot
    ? freelancerMascotCardImg
    : illustrationUrl || CATEGORY_BLUSH_ASSET[category];

  return (
    <div
      style={{ backgroundColor: cardTint }}
      className={`relative aspect-[16/10] w-full border-b border-[#E9E9E7] p-3.5 sm:p-4 overflow-hidden select-none ${className}`}
    >
      <div className="w-full h-full rounded-[12px] bg-white border border-[#E9E9E7] shadow-[0_2px_10px_rgba(55,53,47,0.04)] overflow-hidden flex flex-col">
        {/* Minimal Window Header */}
        <div className="h-6 px-3 bg-[#FBFBFA] border-b border-[#EFEFED] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D3D1CB]" />
            <span className="w-2 h-2 rounded-full bg-[#E5E4E0]" />
            <span className="w-2 h-2 rounded-full bg-[#E5E4E0]" />
          </div>
          {pro && (
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#37352F] text-white text-[8.5px] font-bold uppercase tracking-[0.06em] leading-none">
              PRO
            </span>
          )}
        </div>

        {/* Full-Stage Ultra-HD Illustration */}
        <div
          className={`flex-1 flex items-center justify-center overflow-hidden bg-white ${
            isFreelanceMascot ? 'p-1 sm:p-1.5' : 'p-3 sm:p-4'
          }`}
        >
          <BlushAssetImage
            src={resolvedAsset}
            alt={isFreelanceMascot ? 'Freelance OS freelancer mascot illustration' : `${name} Notion template`}
            disableFloat
            className="w-full h-full"
            imgClassName={`max-w-full max-h-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.04] ${
              isFreelanceMascot ? 'scale-[1.08]' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Clean Editorial Feature Media Showcases for the 3 Homepage Feature Splits
 */
export const FeatureMedia: React.FC<{
  kind: 'second-brain' | 'finance' | 'minimalism';
}> = ({ kind }) => {
  if (kind === 'second-brain') {
    return (
      <div className="w-full rounded-[20px] border border-[#E9E9E7] bg-[#F7F6F3] p-5 sm:p-6 shadow-[0_10px_28px_-10px_rgba(55,53,47,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
          <div className="sm:col-span-7 rounded-[14px] bg-white border border-[#E9E9E7] p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11.5px] font-medium text-[#6E6D68] mb-2">
              <span>PARA System</span>
              <span className="font-mono text-[#37352F]">Second Brain</span>
            </div>
            <BlushAssetImage
              src={BLUSH_ASSETS.strategicMazeThinker}
              alt="Second Brain PARA Notion workspace illustration"
              floatDelay={0.1}
              className="w-full h-52 sm:h-60"
            />
            <p className="pt-3 border-t border-[#EFEFED] text-[12.5px] font-medium text-[#37352F]">
              Projects · Areas · Resources · Archives
            </p>
          </div>

          <div className="sm:col-span-5 flex flex-col gap-4">
            <div className="flex-1 rounded-[14px] bg-white border border-[#E9E9E7] p-4 flex flex-col justify-between">
              <span className="text-[11.5px] font-medium text-[#6E6D68]">
                Daily Focus
              </span>
              <BlushAssetImage
                src={BLUSH_ASSETS.developerCodeDesk}
                alt="Focused daily work illustration"
                floatDelay={0.35}
                className="w-full h-36"
              />
              <p className="text-[12px] text-[#52504A]">
                Quick capture for tasks, notes, and active projects.
              </p>
            </div>

            <div className="rounded-[14px] bg-white border border-[#E9E9E7] p-4 flex items-center gap-3.5">
              <BlushAssetImage
                src={BLUSH_ASSETS.clockCalendarPlanner}
                alt="Weekly review planner illustration"
                floatDelay={0.6}
                className="w-16 h-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#37352F]">
                  Weekly Review
                </p>
                <p className="text-[12px] text-[#6E6D68] leading-snug">
                  Keep your inbox clear in 10 minutes a week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'finance') {
    return (
      <div className="w-full rounded-[20px] border border-[#E9E9E7] bg-[#EEF5FC] p-5 sm:p-6 shadow-[0_10px_28px_-10px_rgba(55,53,47,0.06)]">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
          <div className="sm:col-span-7 rounded-[14px] bg-white border border-[#E9E9E7] p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[11.5px] font-medium text-[#6E6D68] mb-2">
              <span>Finance Tracker</span>
              <span className="font-mono text-[#37352F]">Monthly Overview</span>
            </div>
            <BlushAssetImage
              src={BLUSH_ASSETS.savingsJarsCalendar}
              alt="Savings and budget allocation illustration"
              floatDelay={0.15}
              className="w-full h-52 sm:h-60"
            />
            <p className="pt-3 border-t border-[#EFEFED] text-[12.5px] font-medium text-[#37352F]">
              Income · Expenses · Budgets · Savings Goals
            </p>
          </div>

          <div className="sm:col-span-5 flex flex-col gap-4">
            <div className="flex-1 rounded-[14px] bg-white border border-[#E9E9E7] p-4 flex flex-col justify-between">
              <span className="text-[11.5px] font-medium text-[#6E6D68]">
                Budget Breakdown
              </span>
              <BlushAssetImage
                src={BLUSH_ASSETS.boardroomPieChart}
                alt="Financial budget breakdown illustration"
                floatDelay={0.4}
                className="w-full h-36"
              />
              <p className="text-[12px] text-[#52504A]">
                Clear monthly spending categories and net-worth tracking.
              </p>
            </div>

            <div className="rounded-[14px] bg-white border border-[#E9E9E7] p-4 flex items-center gap-3.5">
              <BlushAssetImage
                src={BLUSH_ASSETS.expenseReceiptAlert}
                alt="Subscription tracker illustration"
                floatDelay={0.7}
                className="w-16 h-16 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-[#37352F]">
                  Subscription Tracker
                </p>
                <p className="text-[12px] text-[#6E6D68] leading-snug">
                  Track recurring bills and upcoming renewal dates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[20px] border border-[#E9E9E7] bg-[#EEF7F1] p-5 sm:p-6 shadow-[0_10px_28px_-10px_rgba(55,53,47,0.06)]">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
        <div className="sm:col-span-6 rounded-[14px] bg-white border border-[#E9E9E7] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11.5px] font-medium text-[#6E6D68] mb-2">
            <span>Minimalist Setup</span>
            <span className="font-mono text-[#37352F]">Daily Habits</span>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.dualDeskStudio}
            alt="Minimalist desk setup illustration"
            floatDelay={0.2}
            className="w-full h-48 sm:h-56"
          />
          <p className="pt-3 border-t border-[#EFEFED] text-[12.5px] font-medium text-[#37352F]">
            Distraction-free layouts for daily planning and routines.
          </p>
        </div>

        <div className="sm:col-span-6 rounded-[14px] bg-white border border-[#E9E9E7] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11.5px] font-medium text-[#6E6D68] mb-2">
            <span>Free Collection</span>
            <span className="font-mono text-[#37352F]">22 Templates</span>
          </div>
          <BlushAssetImage
            src={BLUSH_ASSETS.onlineCourseLecture}
            alt="Study and reading notes illustration"
            floatDelay={0.45}
            className="w-full h-48 sm:h-56"
          />
          <p className="pt-3 border-t border-[#EFEFED] text-[12.5px] font-medium text-[#37352F]">
            Free Notion trackers for habits, reading lists, and study notes.
          </p>
        </div>
      </div>
    </div>
  );
};

export const AppIconGlyph: React.FC<{
  icon: 'grid' | 'book' | 'flask' | 'check-circle';
}> = ({ icon }) => {
  return (
    <div className="w-10 h-10 rounded-[8px] border border-[#E9E9E7] bg-[#F7F6F3] flex items-center justify-center text-[#37352F] shrink-0 transition-transform duration-300 group-hover:scale-105">
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
