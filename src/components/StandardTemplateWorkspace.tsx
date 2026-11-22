import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Database, Layers, Plus } from 'lucide-react';
import { Template } from '../data/catalog';
import { TemplateHookProfile } from '../data/templateHooks';
import { formatPrice } from '../utils/storeLogic';

interface PreviewRow {
  id: string;
  title: string;
  meta: string;
  status: string;
  done: boolean;
}

interface StandardTemplateWorkspaceProps {
  template: Template;
  hook: TemplateHookProfile;
  isOwned: boolean;
  onOpenBuy: () => void;
}

export const StandardTemplateWorkspace: React.FC<
  StandardTemplateWorkspaceProps
> = ({ template, hook, isOwned, onOpenBuy }) => {
  const [activeTab, setActiveTab] = useState<'workspace' | 'structure'>(
    'workspace'
  );
  const [rows, setRows] = useState<PreviewRow[]>(() =>
    hook.samplePreviewRows.map((row, idx) => ({
      id: `${template.slug}-${idx}`,
      title: row.title,
      meta: row.meta,
      status: row.status,
      done: Boolean(row.done),
    }))
  );
  const [draftTitle, setDraftTitle] = useState('');

  useEffect(() => {
    setRows(
      hook.samplePreviewRows.map((row, idx) => ({
        id: `${template.slug}-${idx}`,
        title: row.title,
        meta: row.meta,
        status: row.status,
        done: Boolean(row.done),
      }))
    );
    setDraftTitle('');
    setActiveTab('workspace');
  }, [template.slug, hook]);

  const toggleRow = (id: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              done: !row.done,
              status: !row.done ? 'Done' : 'Active',
            }
          : row
      )
    );
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftTitle.trim();
    if (!cleaned) return;
    setRows((prev) => [
      {
        id: `custom-${Date.now()}`,
        title: cleaned,
        meta: 'Added just now',
        status: 'Active',
        done: false,
      },
      ...prev,
    ]);
    setDraftTitle('');
  };

  const completedCount = rows.filter((r) => r.done).length;

  return (
    <div
      data-testid="standard-template-workspace"
      className="rounded-[18px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
    >
      {/* Notion Window Chrome */}
      <div className="px-4 sm:px-6 py-3 bg-[#F7F6F3] border-b border-[#E9E9E7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-6 h-6 rounded-[6px] bg-white border border-[#E9E9E7] inline-flex items-center justify-center text-[#37352F] font-semibold text-[12px] shrink-0">
            {template.name.slice(0, 1)}
          </span>
          <span className="text-[13.5px] font-semibold text-[#37352F] truncate">
            {template.name}
          </span>
          <span className="hidden sm:inline text-[12px] font-mono text-[#6E6D68] tabular-nums">
            · {template.databaseCount} DBs · {template.viewsCount} views
          </span>
        </div>

        <div
          role="tablist"
          aria-label={`${template.name} preview mode`}
          className="inline-flex items-center p-0.5 rounded-[8px] bg-[#ECEBE7] border border-[#E2E1DC]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'workspace'}
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'workspace'
                ? 'bg-white text-[#37352F] shadow-[0_1px_2px_rgba(55,53,47,0.08)]'
                : 'text-[#6E6D68] hover:text-[#37352F]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Try Live View</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'structure'}
            onClick={() => setActiveTab('structure')}
            className={`px-3 py-1 rounded-[6px] text-[12px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-white text-[#37352F] shadow-[0_1px_2px_rgba(55,53,47,0.08)]'
                : 'text-[#6E6D68] hover:text-[#37352F]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Inside Structure</span>
          </button>
        </div>
      </div>

      {activeTab === 'workspace' ? (
        <div className="p-5 sm:p-7 space-y-5">
          {/* Quick Add Bar */}
          <form onSubmit={handleAddRow} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder={`Add a test entry to ${template.name}...`}
              aria-label={`Add a test entry to ${template.name}`}
              className="flex-1 h-10 px-3.5 rounded-[9px] bg-[#FAF9F6] border border-[#E2E1DC] focus:bg-white focus:border-[#2383E2] focus:outline-none text-[13.5px] text-[#37352F] placeholder:text-[#9B9A97] transition-colors"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-[9px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[13px] font-semibold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Capture</span>
            </button>
          </form>

          {/* Interactive Notion Database Table */}
          <div className="rounded-[12px] border border-[#E9E9E7] overflow-hidden">
            <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E9E9E7] flex items-center justify-between text-[11.5px] font-mono text-[#6E6D68]">
              <span>Active Entries · Click any row to toggle</span>
              <span className="tabular-nums font-semibold text-[#37352F]">
                {completedCount}/{rows.length} checked
              </span>
            </div>

            <div className="divide-y divide-[#F1F1EF]">
              {rows.map((row) => (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => toggleRow(row.id)}
                  className="w-full px-4 py-3 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-4 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 transition-colors ${
                        row.done
                          ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                          : 'border-[#C7C5BE] bg-white'
                      }`}
                    >
                      {row.done && <Check className="w-3 h-3 stroke-[2.8]" />}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[14px] font-semibold truncate ${
                          row.done
                            ? 'line-through text-[#9B9A97]'
                            : 'text-[#37352F]'
                        }`}
                      >
                        {row.title}
                      </p>
                      <p className="text-[12px] text-[#6E6D68] truncate">
                        {row.meta}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[12px] font-mono font-semibold shrink-0 ${
                      row.done ? 'text-[#0F7B6C]' : 'text-[#2383E2]'
                    }`}
                  >
                    {row.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[13px] text-[#6E6D68]">
            <span>
              {hook.setupTime} · Works on Notion Free · Mobile ready
            </span>
            <button
              type="button"
              onClick={onOpenBuy}
              className="text-[13.5px] font-semibold text-[#2383E2] hover:text-[#1B6EC2] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>
                {isOwned
                  ? `Open ${template.name}`
                  : template.price === 0
                  ? `Duplicate Free`
                  : `Get ${template.name} (${formatPrice(template.price)})`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 sm:p-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[12.5px] text-[#6E6D68]">
            <span>
              Built with{' '}
              <strong className="text-[#37352F] tabular-nums">
                {template.databaseCount} linked databases
              </strong>{' '}
              and{' '}
              <strong className="text-[#37352F] tabular-nums">
                {template.viewsCount} pre-filtered views
              </strong>
              .
            </span>
            <span className="font-mono">{hook.setupTime}</span>
          </div>

          <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[12px] overflow-hidden">
            {hook.insideItems.map((item, idx) => (
              <div
                key={item.name}
                className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-[11px] font-semibold text-[#6E6D68] tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-semibold text-[#37352F]">
                    {item.name}
                  </span>
                </div>
                <p className="text-[13px] text-[#52504A] sm:text-right">
                  {item.whatItDoes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
