import React, { useState } from 'react';
import { Check } from 'lucide-react';
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

function splitFeatureLine(line: string): { lead: string; rest: string | null } {
  const idx = line.indexOf(' — ');
  if (idx === -1) {
    return { lead: line, rest: null };
  }
  return {
    lead: line.slice(0, idx),
    rest: line.slice(idx + 3),
  };
}

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
          <div className="divide-y divide-[#F1F5F9]">
            {visibleModules.map((mod) => (
              <div
                key={mod.id}
                data-testid={`${spec.slug}-feature-row-${mod.id}`}
                className="px-6 py-5 sm:px-8 sm:py-6 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                  <h4 className="font-display text-[17px] sm:text-[18.5px] font-bold tracking-[-0.02em] text-[#0F172A]">
                    <span className="text-[#1D6EE3] font-mono text-[13.5px] mr-2 tabular-nums">
                      {mod.number}.
                    </span>
                    {mod.title}
                  </h4>
                  <p className="text-[12.5px] font-medium text-[#64748B] tabular-nums shrink-0">
                    {mod.category} · {mod.includedViews.length} views · {mod.connectedDatabases.length} DBs
                  </p>
                </div>

                <p className="text-[14.5px] text-[#52504A] leading-[1.6] max-w-[780px]">
                  {mod.summary}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 pt-1">
                  {mod.whatItContains.map((featureLine) => {
                    const { lead, rest } = splitFeatureLine(featureLine);
                    return (
                      <li
                        key={featureLine}
                        className="flex items-start gap-2.5 text-[13.5px] sm:text-[14px] leading-[1.55] text-[#334155]"
                      >
                        <Check className="w-4 h-4 text-[#1D6EE3] shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-semibold text-[#0F172A]">
                            {lead}
                          </strong>
                          {rest ? ` — ${rest}` : ''}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <p className="text-[12.5px] text-[#64748B] leading-[1.5] pt-0.5">
                  <span className="font-medium text-[#475569]">Views:</span>{' '}
                  {mod.includedViews.map((v) => `${v.name} (${v.layout})`).join(' · ')}
                  <span aria-hidden="true" className="mx-2 text-[#CBD5E1]">
                    |
                  </span>
                  <span className="font-medium text-[#475569]">Linked DBs:</span>{' '}
                  {mod.connectedDatabases.join(' · ')}
                </p>
              </div>
            ))}

            {/* Concise Databases & Page Templates Summary Footer Row when viewing All */}
            {activeFilter === 'All' && (
              <div className="px-6 py-6 sm:px-8 sm:py-7 bg-[#F8FAFC]/70 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display text-[16px] font-bold text-[#0F172A]">
                      {counts.databasesCount} Interconnected Notion Databases
                    </h4>
                    <button
                      type="button"
                      onClick={() => setFilter(DATABASES_TAB)}
                      className="text-[12.5px] font-semibold text-[#1D6EE3] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect all {counts.databasesCount}
                    </button>
                  </div>
                  <p className="text-[13.5px] text-[#52504A] leading-[1.6]">
                    {spec.databases.map((db) => db.name).join(' · ')}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-display text-[16px] font-bold text-[#0F172A]">
                      {counts.templatesCount} Ready-to-Use Page Templates
                    </h4>
                    <button
                      type="button"
                      onClick={() => setFilter(TEMPLATES_TAB)}
                      className="text-[12.5px] font-semibold text-[#1D6EE3] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Inspect all {counts.templatesCount}
                    </button>
                  </div>
                  <p className="text-[13.5px] text-[#52504A] leading-[1.6]">
                    {spec.readyTemplates.map((tpl) => tpl.title).join(' · ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {isDatabasesView && (
          <div className="divide-y divide-[#F1F5F9]">
            <div className="px-6 py-4 sm:px-8 bg-[#F8FAFC]/80 flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-display text-[16px] font-bold text-[#0F172A]">
                {spec.databaseCountLabel}
              </h4>
              <span className="text-[12.5px] font-medium text-[#64748B] tabular-nums">
                {spec.databases.length} relational tables included
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-[#F1F5F9]">
              {spec.databases.map((db, idx) => (
                <div
                  key={db.id}
                  data-testid={`${spec.slug}-db-item-${db.id}`}
                  className="bg-white px-6 py-4 sm:px-8 sm:py-5 space-y-1.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[15px] font-bold text-[#0F172A]">
                      <span className="font-mono text-[12px] text-[#1D6EE3] mr-2 tabular-nums">
                        DB {String(idx + 1).padStart(2, '0')}
                      </span>
                      {db.name}
                    </p>
                    <span className="text-[12px] font-medium text-[#64748B] shrink-0">
                      {db.category}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#52504A] leading-[1.5]">
                    {db.purpose}
                  </p>
                  <p className="text-[12px] text-[#64748B]">
                    Properties: {db.keyProperties.join(' · ')}
                    <span aria-hidden="true" className="mx-2 text-[#CBD5E1]">
                      |
                    </span>
                    Linked: {db.relations.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {isTemplatesView && (
          <div className="divide-y divide-[#F1F5F9]">
            <div className="px-6 py-4 sm:px-8 bg-[#F8FAFC]/80 flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-display text-[16px] font-bold text-[#0F172A]">
                {counts.templatesCount} One-Click Notion Page Templates
              </h4>
              <span className="text-[12.5px] font-medium text-[#64748B]">
                Pre-wired inside your workspace databases
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:gap-px bg-[#F1F5F9]">
              {spec.readyTemplates.map((tpl, idx) => (
                <div
                  key={tpl.id}
                  data-testid={`${spec.slug}-tpl-item-${tpl.id}`}
                  className="bg-white px-6 py-4 sm:px-8 sm:py-5 flex items-start gap-3"
                >
                  <Check className="w-4 h-4 text-[#1D6EE3] shrink-0 mt-1" />
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="text-[15px] font-bold text-[#0F172A]">
                        {String(idx + 1).padStart(2, '0')}. {tpl.title}
                      </p>
                      <span className="text-[12px] text-[#64748B]">
                        · {tpl.triggerContext}
                      </span>
                    </div>
                    <p className="text-[13.5px] text-[#52504A] leading-[1.5]">
                      {tpl.contains}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
