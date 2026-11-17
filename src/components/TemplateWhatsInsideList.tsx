import React, { useState } from 'react';
import {
  OsSystemSpec,
  filterOsModules,
  getOsSpecSummaryCounts,
} from '../data/osSpecTypes';

export type WhatsInsideFilter = string;

interface TemplateWhatsInsideListProps {
  spec: OsSystemSpec;
  activeFilter?: WhatsInsideFilter;
  onFilterChange?: (nextFilter: WhatsInsideFilter) => void;
}

const DATABASES_TAB = '__databases__';
const TEMPLATES_TAB = '__templates__';

export const TemplateWhatsInsideList: React.FC<TemplateWhatsInsideListProps> = ({
  spec,
  activeFilter: controlledFilter,
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<WhatsInsideFilter>('All');
  const activeFilter = controlledFilter ?? internalFilter;

  const setFilter = (next: WhatsInsideFilter) => {
    if (onFilterChange) {
      onFilterChange(next);
    } else {
      setInternalFilter(next);
    }
  };

  const counts = getOsSpecSummaryCounts(spec);
  const categoryOptions = spec.moduleCategories.filter((cat) => cat !== 'All');
  const isDatabasesView = activeFilter === DATABASES_TAB;
  const isTemplatesView = activeFilter === TEMPLATES_TAB;
  const visibleModules =
    isDatabasesView || isTemplatesView
      ? []
      : filterOsModules(spec.modules, activeFilter, '');

  return (
    <section
      id="template-whats-inside"
      data-testid={`${spec.slug}-whats-inside`}
      aria-labelledby={`${spec.slug}-whats-inside-heading`}
      className="scroll-mt-24 space-y-6 pt-6 border-t border-[#E2E8F0]"
    >
      {/* Clean Editorial Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#1D6EE3]">
            What&apos;s Inside {spec.name}
          </p>
          <h3
            id={`${spec.slug}-whats-inside-heading`}
            className="font-display text-[22px] sm:text-[26px] font-bold tracking-[-0.025em] text-[#0F172A] text-balance"
          >
            Complete Feature &amp; Database Breakdown
          </h3>
          <p className="text-[14.5px] sm:text-[15px] text-[#52504A] leading-[1.55] max-w-[680px]">
            Every module, pre-built view, connected database, and ready-to-use Notion template included inside {spec.name}.
          </p>
        </div>

        <p className="text-[13px] font-medium text-[#64748B] tabular-nums whitespace-nowrap shrink-0">
          {counts.modulesCount} modules · {counts.databasesCount} databases · {counts.templatesCount} templates
        </p>
      </div>

      {/* Category & Section Filter Strip */}
      <div
        role="tablist"
        aria-label={`${spec.name} included features filter`}
        className="flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'All'}
          data-testid={`${spec.slug}-inside-tab-all`}
          onClick={() => setFilter('All')}
          className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6EE3] ${
            activeFilter === 'All'
              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
              : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
          }`}
        >
          All Features ({counts.modulesCount})
        </button>

        {categoryOptions.map((cat) => {
          const isActive = activeFilter === cat;
          const slugified = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              data-testid={`${spec.slug}-inside-tab-${slugified}`}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6EE3] ${
                isActive
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
                  : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              {cat}
            </button>
          );
        })}

        <button
          type="button"
          role="tab"
          aria-selected={isDatabasesView}
          data-testid={`${spec.slug}-inside-tab-databases`}
          onClick={() => setFilter(DATABASES_TAB)}
          className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6EE3] ${
            isDatabasesView
              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
              : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
          }`}
        >
          {counts.databasesCount} Databases
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={isTemplatesView}
          data-testid={`${spec.slug}-inside-tab-templates`}
          onClick={() => setFilter(TEMPLATES_TAB)}
          className={`px-3.5 py-2 rounded-[10px] text-[13px] font-semibold border transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D6EE3] ${
            isTemplatesView
              ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-[0_6px_16px_-6px_rgba(15,23,42,0.35)]'
              : 'bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
          }`}
        >
          {counts.templatesCount} Page Templates
        </button>
      </div>

      {/* Single Clean Text-Focused Container (Hairline Dividers, Zero Nested Card Clutter) */}
      <div
        role="tabpanel"
        data-testid={`${spec.slug}-whats-inside-panel`}
        className="rounded-[24px] bg-white border border-[#E2E8F0] shadow-[0_12px_36px_-16px_rgba(15,23,42,0.06)] overflow-hidden"
      >
        {!isDatabasesView && !isTemplatesView && (
          <div className="px-6 py-6 text-[14px] text-[#52504A]">
            Showing {visibleModules.length} modules inside {spec.name}.
          </div>
        )}
      </div>
    </section>
  );
};
