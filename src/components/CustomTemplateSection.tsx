import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Layers, Sparkles } from 'lucide-react';
import { validateCustomBrief } from '../utils/storeLogic';

const AUDIENCE_OPTIONS = [
  'Solo / Personal',
  'Founder / Freelancer',
  'Team / Agency',
  'Student / Research Lab',
] as const;

const DESIGN_STYLES = [
  'Minimalist Notion DNA',
  'KPI Charts & Telemetry',
  'Editorial Clean',
  'Visual Kanban & Cards',
] as const;

export const CustomTemplateSection: React.FC<{ id?: string }> = ({
  id = 'custom-notion-builds',
}) => {
  const [audience, setAudience] = useState<string>(AUDIENCE_OPTIONS[1]);
  const [designStyle, setDesignStyle] = useState<string>(DESIGN_STYLES[0]);
  const [purpose, setPurpose] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateCustomBrief({
      email,
      purpose,
      audience,
      designStyle,
    });
    if (!result.valid) {
      setError(result.error || 'Please add your purpose and email.');
      return;
    }
    setError(null);
    const refCode = `RES-CUST-${String(Date.now()).slice(-4)}`;
    setSubmittedRef(refCode);
  };

  return (
    <section
      id={id}
      data-testid="custom-notion-builds-section"
      className="scroll-mt-24 py-14 sm:py-20 bg-[#FAF9F6] border-y border-[#E9E9E7]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left 6 Columns: Purpose-First Pitch & 3 Concrete Steps */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.08em] text-[#2383E2]">
              Custom Notion Builds · Designed Around Your Purpose
            </p>
            <h2 className="font-display text-[clamp(26px,3.4vw,38px)] font-bold tracking-[-0.03em] leading-[1.1] text-[#37352F] text-balance">
              Need a Notion workspace built from scratch for your exact workflow?
            </h2>
            <p className="text-[15.5px] text-[#52504A] leading-[1.6] max-w-[540px]">
              Ready-made templates cover 80% of people. When your team, studio, or personal system has unique rules, we start by understanding the real purpose—then design every database, formula, and view around your requirements.
            </p>
          </div>

          <div className="divide-y divide-[#E9E9E7] border-y border-[#E9E9E7]">
            {[
              {
                step: '01',
                icon: <Compass className="w-4 h-4 text-[#2383E2]" />,
                title: 'Start with the purpose, not random blocks',
                desc: 'We map the decisions you make every day and strip out every database you do not need.',
              },
              {
                step: '02',
                icon: <Sparkles className="w-4 h-4 text-[#0F7B6C]" />,
                title: 'Match your visual taste & design requirements',
                desc: 'Clean Notion typography, custom KPI rollups, charts, and linked views built to feel natural.',
              },
              {
                step: '03',
                icon: <Layers className="w-4 h-4 text-[#37352F]" />,
                title: 'Delivered ready to duplicate in 5–7 days',
                desc: 'Includes linked databases, mobile capture views, and a short walkthrough for your team.',
              },
            ].map((item) => (
              <div key={item.step} className="py-4 flex items-start gap-3.5">
                <span className="font-mono text-[11.5px] font-semibold text-[#6E6D68] tabular-nums pt-0.5 shrink-0">
                  {item.step}
                </span>
                <div className="space-y-1 min-w-0">
                  <p className="text-[15px] font-semibold text-[#37352F] inline-flex items-center gap-2">
                    {item.icon}
                    <span>{item.title}</span>
                  </p>
                  <p className="text-[13.5px] text-[#52504A] leading-[1.5]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[#6E6D68]">
            Fixed-scope pricing · Works on Notion Free or Team plans · Full ownership on handoff
          </p>
        </div>

        {/* Right 6 Columns: Interactive Client Brief Builder */}
        <div className="lg:col-span-6">
          <div className="rounded-[18px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] p-6 sm:p-8">
            {submittedRef ? (
              <div
                data-testid="custom-brief-confirmation"
                className="space-y-5 py-2"
              >
                <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0F7B6C]">
                  <Check className="w-4 h-4" />
                  <span>Brief Received · {submittedRef}</span>
                </div>
                <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
                  We&apos;ve logged your custom Notion build plan.
                </h3>
                <div className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-4 space-y-2 text-[13.5px]">
                  <p className="text-[#52504A]">
                    <strong className="text-[#37352F]">Built for:</strong>{' '}
                    {audience} · {designStyle}
                  </p>
                  <p className="text-[#52504A]">
                    <strong className="text-[#37352F]">Purpose:</strong>{' '}
                    {purpose}
                  </p>
                  <p className="text-[#52504A]">
                    <strong className="text-[#37352F]">Reply email:</strong>{' '}
                    {email}
                  </p>
                </div>
                <p className="text-[13.5px] text-[#52504A] leading-[1.55]">
                  Expect a clear database blueprint, timeline, and fixed quote within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setPurpose('');
                  }}
                  className="text-[13.5px] font-semibold text-[#2383E2] hover:underline cursor-pointer"
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="custom-brief-form"
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#37352F]">
                    Tell us what your workspace needs to do
                  </h3>
                  <p className="text-[13.5px] text-[#6E6D68]">
                    Takes 60 seconds. We reply with a database map and fixed quote.
                  </p>
                </div>

                {/* Who is it for */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#52504A]">
                    Who is using it?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {AUDIENCE_OPTIONS.map((opt) => {
                      const active = audience === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAudience(opt)}
                          className={`px-3 py-2 rounded-[9px] text-[13px] font-medium border text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#37352F] text-white border-[#37352F]'
                              : 'bg-[#FAF9F6] text-[#37352F] border-[#E9E9E7] hover:border-[#C7C5BE]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Design Direction */}
                <div className="space-y-2">
                  <label className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#52504A]">
                    Design preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {DESIGN_STYLES.map((style) => {
                      const active = designStyle === style;
                      return (
                        <button
                          key={style}
                          type="button"
                          onClick={() => setDesignStyle(style)}
                          className={`px-3 py-2 rounded-[9px] text-[13px] font-medium border text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#EDF5FC] text-[#2383E2] border-[#2383E2]'
                              : 'bg-[#FAF9F6] text-[#52504A] border-[#E9E9E7] hover:border-[#C7C5BE]'
                          }`}
                        >
                          {style}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="custom-purpose-input"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#52504A]"
                  >
                    What is the core purpose of this template?
                  </label>
                  <textarea
                    id="custom-purpose-input"
                    data-testid="custom-purpose-input"
                    rows={3}
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g., Client onboarding portal + sprint billing for our 5-person design agency..."
                    className="w-full rounded-[10px] bg-[#FAF9F6] border border-[#E2E1DC] focus:bg-white focus:border-[#2383E2] focus:outline-none px-3.5 py-2.5 text-[14px] text-[#37352F] placeholder:text-[#9B9A97] resize-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="custom-email-input"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#52504A]"
                  >
                    Your email
                  </label>
                  <input
                    id="custom-email-input"
                    data-testid="custom-email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@studio.com"
                    className="w-full h-11 rounded-[10px] bg-[#FAF9F6] border border-[#E2E1DC] focus:bg-white focus:border-[#2383E2] focus:outline-none px-3.5 text-[14px] text-[#37352F] placeholder:text-[#9B9A97]"
                  />
                </div>

                {error && (
                  <p className="text-[13px] font-medium text-[#C43B3B]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  data-testid="custom-brief-submit"
                  className="w-full h-11 px-5 rounded-[10px] bg-[#2383E2] hover:bg-[#1B6EC2] text-white text-[14.5px] font-semibold inline-flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(35,131,226,0.45)] transition-colors cursor-pointer"
                >
                  <span>Request Custom Build Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
