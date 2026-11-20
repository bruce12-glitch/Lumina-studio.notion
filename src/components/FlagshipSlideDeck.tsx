import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  LayoutGrid,
  Presentation,
} from 'lucide-react';
import {
  calculateOsSavings,
  clampSlideIndex,
  formatSlideCounter,
  getNextSlideIndex,
  getPrevSlideIndex,
  getSlideProgressRatio,
} from '../utils/flagshipSlides';

export interface FlagshipDeckSlideItem {
  id: string;
  stepNumber: string;
  shortLabel: string;
  kicker: string;
  headline: string;
  editorialAccent?: string;
  description: string;
  beforeText: string;
  afterText: string;
  highlightMetric: string;
  includedModules: { title: string; details: string }[];
  renderVisual: (opts: { compact?: boolean }) => React.ReactNode;
  onInspectFullScreen?: () => void;
}

interface FlagshipSlideDeckProps {
  deckId: string;
  osName: string;
  accentColor?: string;
  price: number;
  compareAt?: number;
  isOwned?: boolean;
  onOpenBuy?: () => void;
  sectionKicker: string;
  sectionTitle: string;
  sectionSubtitle: string;
  slides: FlagshipDeckSlideItem[];
  controlledSlideId?: string | 'all';
  onControlledSlideChange?: (next: string | 'all') => void;
  testIdPrefix: string;
}

export const FlagshipSlideDeck: React.FC<FlagshipSlideDeckProps> = ({
  deckId,
  osName,
  accentColor = '#2383E2',
  price,
  compareAt,
  isOwned = false,
  onOpenBuy,
  sectionKicker,
  sectionTitle,
  sectionSubtitle,
  slides,
  controlledSlideId,
  onControlledSlideChange,
  testIdPrefix,
}) => {
  const [viewMode, setViewMode] = useState<'tour' | 'all'>('tour');
  const [internalIndex, setInternalIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const controlledIndex =
    controlledSlideId && controlledSlideId !== 'all'
      ? slides.findIndex((s) => s.id === controlledSlideId)
      : -1;

  useEffect(() => {
    if (controlledSlideId === 'all') {
      setViewMode('all');
    } else if (controlledIndex >= 0) {
      setViewMode('tour');
      setInternalIndex(controlledIndex);
    }
  }, [controlledSlideId, controlledIndex]);

  const activeIndex = clampSlideIndex(internalIndex, slides.length);
  const activeSlide = slides[activeIndex] || slides[0];
  const savings = calculateOsSavings(price, compareAt);
  const progressRatio = getSlideProgressRatio(activeIndex, slides.length);

  const goToIndex = (nextIdx: number) => {
    const safeNext = clampSlideIndex(nextIdx, slides.length);
    setDirection(safeNext >= activeIndex ? 1 : -1);
    setInternalIndex(safeNext);
    setViewMode('tour');
    if (onControlledSlideChange && slides[safeNext]) {
      onControlledSlideChange(slides[safeNext].id);
    }
  };

  const handleNext = () => {
    const nextIdx = getNextSlideIndex(activeIndex, slides.length);
    setDirection(1);
    setInternalIndex(nextIdx);
    setViewMode('tour');
    if (onControlledSlideChange && slides[nextIdx]) {
      onControlledSlideChange(slides[nextIdx].id);
    }
  };

  const handlePrev = () => {
    const prevIdx = getPrevSlideIndex(activeIndex, slides.length);
    setDirection(-1);
    setInternalIndex(prevIdx);
    setViewMode('tour');
    if (onControlledSlideChange && slides[prevIdx]) {
      onControlledSlideChange(slides[prevIdx].id);
    }
  };

  const handleModeChange = (mode: 'tour' | 'all') => {
    setViewMode(mode);
    if (onControlledSlideChange) {
      onControlledSlideChange(mode === 'all' ? 'all' : activeSlide.id);
    }
  };

  const handleDeckKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (viewMode !== 'tour') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  if (!activeSlide) return null;

  return (
    <div
      id={deckId}
      data-testid={`${testIdPrefix}-slide-deck`}
      onKeyDown={handleDeckKeyDown}
      className="scroll-mt-24 space-y-4 sm:space-y-5 pt-5 border-t border-[#E9E9E7]"
    >
      {/* Header + View Mode Switch */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3.5">
        <div className="space-y-1.5 max-w-[700px]">
          <p
            style={{ color: accentColor }}
            className="text-[11.5px] font-bold uppercase tracking-[0.08em]"
          >
            {sectionKicker}
          </p>
          <h3 className="font-display text-[23px] sm:text-[28px] font-bold tracking-[-0.03em] leading-[1.12] text-[#37352F] text-balance">
            {sectionTitle}
          </h3>
          <p className="text-[14.5px] text-[#52504A] leading-[1.55]">
            {sectionSubtitle}
          </p>
        </div>

        {/* Segmented Mode Control (Slide Tour vs View All Slides) */}
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-end">
          <div
            role="group"
            aria-label="Slide display mode"
            className="inline-flex items-center p-1 rounded-[10px] bg-[#F4F3F0] border border-[#E9E9E7]"
          >
            <button
              type="button"
              data-testid={`${testIdPrefix}-mode-tour`}
              onClick={() => handleModeChange('tour')}
              aria-pressed={viewMode === 'tour'}
              className={`px-3 py-1.5 rounded-[7px] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'tour'
                  ? 'bg-white text-[#37352F] shadow-[0_1px_3px_rgba(55,53,47,0.08)]'
                  : 'text-[#6E6D68] hover:text-[#37352F]'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slide Tour</span>
            </button>
            <button
              type="button"
              data-testid={`${testIdPrefix}-tab-all`}
              onClick={() => handleModeChange('all')}
              aria-pressed={viewMode === 'all'}
              className={`px-3 py-1.5 rounded-[7px] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-white text-[#37352F] shadow-[0_1px_3px_rgba(55,53,47,0.08)]'
                  : 'text-[#6E6D68] hover:text-[#37352F]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All {slides.length} Slides</span>
            </button>
          </div>
        </div>
      </div>

      {/* Numbered Slide Jump Tabs + Prev/Next Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div
          role="tablist"
          aria-label={`${osName} product tour slides`}
          className="flex flex-wrap items-center gap-2"
        >
          {slides.map((slide, idx) => {
            const isSelected = viewMode === 'tour' && idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                data-testid={`${testIdPrefix}-tab-${slide.id}`}
                onClick={() => goToIndex(idx)}
                className={`px-3 py-1.5 rounded-[9px] text-[13px] font-semibold border inline-flex items-center gap-2 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#37352F] text-white border-[#37352F] shadow-[0_6px_16px_-6px_rgba(55,53,47,0.28)]'
                    : 'bg-white text-[#52504A] border-[#E9E9E7] hover:bg-[#FAF9F6] hover:border-[#C7C5BE] hover:text-[#37352F]'
                }`}
              >
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    isSelected ? 'text-white/75' : 'text-[#6E6D68]'
                  }`}
                >
                  {slide.stepNumber}
                </span>
                <span>{slide.shortLabel}</span>
              </button>
            );
          })}
        </div>

        {viewMode === 'tour' && (
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span
              data-testid={`${testIdPrefix}-slide-counter`}
              className="font-mono text-[12px] font-semibold text-[#6E6D68] tabular-nums pr-1"
            >
              {formatSlideCounter(activeIndex, slides.length)}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous ${osName} slide`}
              data-testid={`${testIdPrefix}-prev-slide`}
              className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#FAF9F6] hover:border-[#C7C5BE] text-[#37352F] inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next ${osName} slide`}
              data-testid={`${testIdPrefix}-next-slide`}
              className="w-9 h-9 rounded-[9px] border border-[#E9E9E7] bg-white hover:bg-[#FAF9F6] hover:border-[#C7C5BE] text-[#37352F] inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* MODE 1: INTERACTIVE FOCUSED SLIDE TOUR */}
      {viewMode === 'tour' ? (
        <div
          data-testid={`${testIdPrefix}-active-slide-stage`}
          className="rounded-[20px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
        >
          {/* Compositor-only Slide Progress Hairline */}
          <div className="h-[2.5px] w-full bg-[#F1F1EF] overflow-hidden">
            <div
              style={{
                backgroundColor: accentColor,
                transform: `scaleX(${progressRatio})`,
              }}
              className="h-full w-full origin-left transition-transform duration-300 ease-out"
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeSlide.id}
              data-testid={`${testIdPrefix}-card-${activeSlide.id}`}
              initial={{ opacity: 0, x: direction > 0 ? 18 : -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -18 : 18 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              {/* Left 7 Columns: Rich Visual Slide Stage */}
              <div className="lg:col-span-7 bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-[#E9E9E7] p-4 sm:p-6 flex flex-col justify-between gap-3.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6E6D68]">
                    Slide {activeSlide.stepNumber} · {activeSlide.shortLabel}
                  </span>
                  <span className="text-[11.5px] font-medium text-[#52504A] tabular-nums truncate">
                    {activeSlide.highlightMetric}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {activeSlide.renderVisual({ compact: false })}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-[#E9E9E7]/80">
                  <div className="flex items-center gap-2">
                    <div
                      className="inline-flex items-center gap-1.5"
                      aria-label="Slide step indicators"
                    >
                      {slides.map((s, idx) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => goToIndex(idx)}
                          aria-label={`Jump to slide ${s.stepNumber}: ${s.shortLabel}`}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            idx === activeIndex
                              ? 'w-5 bg-[#37352F]'
                              : 'w-1.5 bg-[#D3D1CB] hover:bg-[#9B9A97]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[12px] text-[#6E6D68] hidden sm:inline">
                      · Ready to duplicate in 1 click
                    </span>
                  </div>

                  {activeSlide.onInspectFullScreen ? (
                    <button
                      type="button"
                      onClick={activeSlide.onInspectFullScreen}
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#37352F] hover:text-[#2383E2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Expand className="w-3.5 h-3.5" />
                      <span>Inspect full screen</span>
                    </button>
                  ) : (
                    <span className="font-mono text-[11px] text-[#6E6D68]">
                      Interactive Notion preview
                    </span>
                  )}
                </div>
              </div>

              {/* Right 5 Columns: Outcome Copy, Before/After & Contextual Buy CTA */}
              <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between gap-4 bg-white">
                <div className="space-y-3.5">
                  <div className="space-y-1.5">
                    <p
                      style={{ color: accentColor }}
                      className="text-[11.5px] font-bold uppercase tracking-[0.08em] truncate"
                    >
                      {activeSlide.kicker}
                    </p>
                    <h4 className="font-display text-[20px] sm:text-[23px] font-bold tracking-[-0.03em] leading-[1.16] text-[#37352F] text-balance">
                      {activeSlide.headline}{' '}
                      {activeSlide.editorialAccent && (
                        <span
                          style={{ color: accentColor }}
                          className="font-editorial italic font-medium"
                        >
                          {activeSlide.editorialAccent}
                        </span>
                      )}
                    </h4>
                    <p className="text-[13.5px] text-[#52504A] leading-[1.52]">
                      {activeSlide.description}
                    </p>
                  </div>

                  {/* Clean Before -> After Comparison (Hairline Divided, Zero Heavy Borders) */}
                  <div className="rounded-[11px] bg-[#FAF9F6] border border-[#E9E9E7] divide-y divide-[#E9E9E7] text-[12.5px]">
                    <div className="px-3.5 py-2.5 flex items-start gap-2.5">
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[#9B9A97] w-12 shrink-0 pt-0.5">
                        Before
                      </span>
                      <p className="text-[#6E6D68] leading-[1.4]">
                        {activeSlide.beforeText}
                      </p>
                    </div>
                    <div className="px-3.5 py-2.5 flex items-start gap-2.5 bg-white/75">
                      <span
                        style={{ color: accentColor }}
                        className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.05em] w-12 shrink-0 pt-0.5"
                      >
                        After
                      </span>
                      <p className="text-[#37352F] font-medium leading-[1.4]">
                        {activeSlide.afterText}
                      </p>
                    </div>
                  </div>

                  {/* Modules Included in This Slide */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#6E6D68]">
                      Included in this workflow
                    </p>
                    <ul className="divide-y divide-[#F1F1EF]">
                      {activeSlide.includedModules.map((mod) => (
                        <li
                          key={mod.title}
                          className="py-1.5 first:pt-0 last:pb-0 flex items-start gap-2"
                        >
                          <Check
                            style={{ color: accentColor }}
                            className="w-3.5 h-3.5 shrink-0 mt-0.5"
                          />
                          <div className="text-[12.5px] leading-[1.45] text-[#52504A]">
                            <span className="font-semibold text-[#37352F]">
                              {mod.title}
                            </span>{' '}
                            — {mod.details}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Contextual Conversion Footer */}
                <div className="pt-4 border-t border-[#E9E9E7] space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2 tabular-nums">
                      <span className="text-[19px] font-bold text-[#37352F]">
                        ${price}
                      </span>
                      {savings.savingsAmount > 0 && (
                        <span className="text-[13.5px] text-[#9B9A97] line-through">
                          ${savings.compareAt}
                        </span>
                      )}
                      <span className="text-[12px] text-[#6E6D68]">
                        one-time
                      </span>
                    </div>
                    {savings.savingsAmount > 0 && (
                      <span className="font-mono text-[11px] font-semibold text-[#0F7B6C] tabular-nums">
                        Save ${savings.savingsAmount} ({savings.savingsPercent}%)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {onOpenBuy && (
                      <button
                        type="button"
                        data-testid={`${testIdPrefix}-slide-buy-cta`}
                        onClick={onOpenBuy}
                        className="flex-1 min-w-[180px] h-10 px-4 rounded-[10px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_-8px_rgba(35,131,226,0.45)] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span>
                          {isOwned
                            ? `Open ${osName}`
                            : `Get ${osName} — $${price}`}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-10 px-3.5 rounded-[10px] border border-[#D3D1CB] bg-white hover:bg-[#FAF9F6] text-[#37352F] text-[13px] font-semibold inline-flex items-center justify-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      ) : (
        /* MODE 2: CLEAN ALL-SLIDES STACKED OVERVIEW */
        <div
          data-testid={`${testIdPrefix}-all-images`}
          className="grid grid-cols-1 gap-7"
        >
          {slides.map((slide, idx) => (
            <article
              key={slide.id}
              data-testid={`${testIdPrefix}-card-${slide.id}`}
              className="rounded-[22px] bg-white border border-[#E9E9E7] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-6 bg-[#FAF9F6] border-b lg:border-b-0 lg:border-r border-[#E9E9E7] p-5 sm:p-6 flex flex-col justify-center gap-3">
                <div className="flex items-center justify-between text-[11.5px] font-mono text-[#6E6D68]">
                  <span>
                    {slide.stepNumber} · {slide.shortLabel}
                  </span>
                  <span>{slide.highlightMetric}</span>
                </div>
                {slide.renderVisual({ compact: true })}
              </div>

              <div className="lg:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <p
                    style={{ color: accentColor }}
                    className="text-[11.5px] font-bold uppercase tracking-[0.08em]"
                  >
                    {slide.kicker}
                  </p>
                  <h4 className="font-display text-[20px] sm:text-[23px] font-bold tracking-[-0.025em] text-[#37352F] leading-snug">
                    {slide.headline}{' '}
                    {slide.editorialAccent && (
                      <span
                        style={{ color: accentColor }}
                        className="font-editorial italic font-medium"
                      >
                        {slide.editorialAccent}
                      </span>
                    )}
                  </h4>
                  <p className="text-[14.5px] text-[#52504A] leading-[1.6]">
                    {slide.description}
                  </p>

                  <ul className="divide-y divide-[#F1F1EF] pt-1">
                    {slide.includedModules.map((mod) => (
                      <li
                        key={mod.title}
                        className="py-2 flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-[#52504A]"
                      >
                        <Check
                          style={{ color: accentColor }}
                          className="w-4 h-4 shrink-0 mt-0.5"
                        />
                        <span>
                          <strong className="font-semibold text-[#37352F]">
                            {mod.title}:
                          </strong>{' '}
                          {mod.details}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#F1F1EF] flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => goToIndex(idx)}
                    className="text-[13px] font-semibold text-[#37352F] hover:text-[#2383E2] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Focus this slide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {onOpenBuy && (
                    <button
                      type="button"
                      onClick={onOpenBuy}
                      className="h-9 px-4 rounded-[8px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[13px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isOwned ? `Open ${osName}` : `Get ${osName} — $${price}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
