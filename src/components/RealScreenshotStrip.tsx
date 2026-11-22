import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

export interface RealScreenshotItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

interface RealScreenshotStripProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  items: RealScreenshotItem[];
  testIdPrefix: string;
}

export const RealScreenshotStrip: React.FC<RealScreenshotStripProps> = ({
  title,
  subtitle,
  accentColor = '#2383E2',
  items,
  testIdPrefix,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + 1) % items.length
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev - 1 + items.length) % items.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, items.length]);

  if (!items.length) return null;

  return (
    <div
      data-testid={`${testIdPrefix}-real-screenshots`}
      className="space-y-4 pt-4 border-t border-[#E9E9E7]"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div className="space-y-1">
          <p
            style={{ color: accentColor }}
            className="text-[11.5px] font-bold uppercase tracking-[0.08em]"
          >
            Actual Notion Views · Click Any Screen To Zoom
          </p>
          <h3 className="font-display text-[21px] sm:text-[25px] font-bold tracking-[-0.025em] text-[#37352F]">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[14px] text-[#52504A] leading-[1.5]">
              {subtitle}
            </p>
          )}
        </div>
        <span className="font-mono text-[12px] text-[#6E6D68] tabular-nums shrink-0">
          {items.length} real screenshots
        </span>
      </div>

      <div
        className={`grid grid-cols-1 ${
          items.length === 3
            ? 'md:grid-cols-3'
            : 'sm:grid-cols-2 lg:grid-cols-4'
        } gap-4`}
      >
        {items.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            data-testid={`${testIdPrefix}-shot-${item.id}`}
            onClick={() => setActiveIndex(idx)}
            className="group text-left rounded-[14px] bg-white border border-[#E9E9E7] hover:border-[#C7C5BE] overflow-hidden transition-all duration-150 flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[16/10] bg-[#FAF9F6] border-b border-[#E9E9E7] overflow-hidden p-2 flex items-center justify-center">
              <img
                src={item.src}
                alt={`${item.title} — Notion template view`}
                loading="lazy"
                className="w-full h-full object-contain rounded-[6px] transition-transform duration-200 group-hover:scale-[1.03]"
              />
              <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded-[7px] bg-white/95 border border-[#E9E9E7] text-[#37352F] inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Expand className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="p-3.5 space-y-0.5">
              <p className="text-[13.5px] font-semibold text-[#37352F] leading-snug">
                {item.title}
              </p>
              <p className="text-[12px] text-[#6E6D68] leading-[1.45]">
                {item.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {activeItem && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeItem.title} screenshot`}
          data-testid={`${testIdPrefix}-shot-lightbox`}
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[100] bg-[#1F1E1B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1060px] rounded-[18px] bg-white border border-[#E9E9E7] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-5 py-3.5 bg-[#F7F6F3] border-b border-[#E9E9E7] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[14.5px] font-bold text-[#37352F] truncate">
                  {activeItem.title}
                </p>
                <p className="text-[12px] text-[#6E6D68] truncate">
                  {activeItem.caption}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono text-[11.5px] text-[#6E6D68] tabular-nums pr-1.5">
                  {activeIndex + 1} / {items.length}
                </span>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null
                        ? 0
                        : (prev - 1 + items.length) % items.length
                    )
                  }
                  className="w-8 h-8 rounded-[8px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % items.length
                    )
                  }
                  className="w-8 h-8 rounded-[8px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close screenshot preview"
                  onClick={() => setActiveIndex(null)}
                  className="w-8 h-8 rounded-[8px] border border-[#E9E9E7] bg-white hover:bg-[#F1F1EF] text-[#37352F] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-[#FAF9F6] overflow-auto flex items-center justify-center">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="w-full max-h-[72vh] object-contain rounded-[10px] border border-[#E9E9E7] bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
