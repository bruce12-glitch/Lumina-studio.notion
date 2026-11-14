import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import {
  AI_TOOLS_LIST,
  ALL_ACCESS_PRICE,
  APPS,
  BLOG_POSTS,
  TEMPLATES,
  UPDATES_LIST,
} from '../data/catalog';
import {
  formatPrice,
  getProTemplatesTotalValue,
  validateAuthForm,
} from '../utils/storeLogic';
import { CheckoutTarget } from './CheckoutModal';
import { FaqAccordion, PromoBanner, TemplateCard } from './Chrome';
import {
  AppIconGlyph,
  FeatureMedia,
  TemplateCover,
} from './CoversAndIllustrations';

export const TemplateDetailPage: React.FC<{
  slug: string;
  onNavigate: (path: string) => void;
  onOpenCheckout: (target: CheckoutTarget) => void;
  purchasedSlugs: Set<string>;
}> = ({ slug, onNavigate, onOpenCheckout, purchasedSlugs }) => {
  const template =
    TEMPLATES.find((t) => t.slug === slug) ||
    TEMPLATES.find((t) => t.slug === 'second-brain')!;

  const related = TEMPLATES.filter(
    (t) => t.category === template.category && t.slug !== template.slug
  ).slice(0, 3);

  const isOwned = purchasedSlugs.has(template.slug);

  return (
    <div className="pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <button
          type="button"
          onClick={() => onNavigate('/templates')}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#737373] hover:text-[#0A0A0A] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Notion Templates</span>
        </button>

        {/* Contiguous Purchase Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Large 16/10 Cover */}
          <div className="lg:col-span-7 rounded-[16px] border border-[#EAEAEA] overflow-hidden bg-[#FAFAFA]">
            <TemplateCover
              name={template.name}
              slug={template.slug}
              category={template.category}
              pro={template.pro}
              illustrationUrl={template.illustrationUrl}
              cardTint={template.cardTint}
            />
          </div>

          {/* Right: Purchase & Delivery Module */}
          <div className="lg:col-span-5 rounded-[16px] border border-[#EAEAEA] bg-white p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 text-[13px] text-[#737373]">
                <span>{template.category}</span>
                <span>·</span>
                <span>{template.version}</span>
              </div>

              <h1 className="text-[clamp(28px,3.5vw,38px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
                {template.name}
              </h1>
            </div>

            <div className="flex items-center gap-2.5 pt-1">
              {template.compareAt !== undefined && (
                <span className="text-[20px] font-semibold text-[#A3A3A3] line-through tabular-nums">
                  {formatPrice(template.compareAt)}
                </span>
              )}
              <span className="text-[24px] font-bold text-[#0A0A0A] tabular-nums">
                {formatPrice(template.price)}
              </span>
              {template.pro && (
                <span className="rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-[0.08em] px-[8px] py-[4px] leading-none">
                  PRO
                </span>
              )}
            </div>

            <div className="space-y-3 text-[15px] text-[#525252] leading-[1.6]">
              <p>{template.description[0]}</p>
              <p>{template.description[1]}</p>
            </div>

            {/* Primary CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenCheckout({
                    name: template.name,
                    slug: template.slug,
                    price: template.price,
                    compareAt: template.compareAt,
                    pro: template.pro,
                    whatsInside: template.whatsInside,
                  })
                }
                className="w-full h-12 px-6 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] active:translate-y-[1px] text-white text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>
                  {isOwned
                    ? 'Open Template Delivery & License'
                    : template.price === 0
                    ? 'Get Template ($0 — Instant Duplicate)'
                    : `Get Template (${formatPrice(template.price)})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[12px] text-[#737373] pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  Stripe & Lemon Squeezy
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Instant Automated Notion Delivery
                </span>
              </div>
            </div>

            {/* What's Inside */}
            <div className="pt-6 border-t border-[#EAEAEA] space-y-3">
              <h2 className="text-[14px] font-semibold text-[#0A0A0A]">
                What’s inside
              </h2>
              <ul className="space-y-2.5 text-[14px] text-[#525252]">
                {template.whatsInside.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Templates */}
        {related.length > 0 && (
          <div className="mt-20 pt-14 border-t border-[#EAEAEA]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
                More in {template.category}
              </h2>
              <button
                type="button"
                onClick={() =>
                  onNavigate(
                    `/templates?category=${encodeURIComponent(template.category)}`
                  )
                }
                className="text-[14px] font-medium text-[#0A0A0A] inline-flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <TemplateCard
                  key={item.slug}
                  template={item}
                  onNavigate={onNavigate}
                  isPurchased={purchasedSlugs.has(item.slug)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const FlagshipProductPage: React.FC<{
  kind: 'second-brain' | 'finance-tracker';
  onNavigate: (path: string) => void;
  onOpenCheckout: (target: CheckoutTarget) => void;
}> = ({ kind, onNavigate, onOpenCheckout }) => {
  const isSecondBrain = kind === 'second-brain';
  const template = TEMPLATES.find((t) => t.slug === kind)!;

  const features = isSecondBrain
    ? [
        {
          title: '01. Unified PARA Architecture',
          body: 'Organize Projects, Areas, Resources, and Archives inside one coherent hierarchy so every note and task has a permanent home.',
        },
        {
          title: '02. Daily Focus & Quick Capture',
          body: 'Drop fleeting ideas into your inbox in seconds on desktop or mobile, then sort them cleanly during your weekly review.',
        },
        {
          title: '03. Quarterly Goal Alignment',
          body: 'Connect daily tasks directly to quarterly OKRs and annual milestones with automated progress rollups.',
        },
      ]
    : [
        {
          title: '01. Complete Cash-Flow Visibility',
          body: 'Track income streams, fixed bills, variable spending, and savings targets inside one minimalist financial ledger.',
        },
        {
          title: '02. Automated Budget Rollups',
          body: 'See real-time category utilization and monthly net-worth progression without maintaining complex spreadsheet macros.',
        },
        {
          title: '03. Subscription & Renewal Radar',
          body: 'Spot recurring charges before they renew and calculate your exact monthly burn rate in one view.',
        },
      ];

  return (
    <div>
      <section className="py-20 sm:py-28 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-[680px] mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#525252]">
            <span>Flagship Notion System</span>
            <span>·</span>
            <span className="rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-[0.08em] px-[7px] py-[3px]">
              PRO
            </span>
          </div>
          <h1 className="text-[clamp(36px,5vw,56px)] font-semibold tracking-[-0.035em] leading-[1.08] text-[#0A0A0A] text-balance">
            {isSecondBrain ? 'Second Brain' : 'All-In-One Finance Dashboard'}
          </h1>
          <p className="text-[18px] text-[#525252] leading-[1.55]">
            {isSecondBrain
              ? 'An all-in-one Notion system to organize your tasks, projects, goals, and notes.'
              : 'Bring your financials in one place to get the big picture.'}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                onOpenCheckout({
                  name: template.name,
                  slug: template.slug,
                  price: template.price,
                  compareAt: template.compareAt,
                  pro: true,
                  whatsInside: template.whatsInside,
                })
              }
              className="h-12 px-6 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[15px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Get {template.name} —</span>
              {template.compareAt && (
                <span className="text-[#A3A3A3] line-through tabular-nums">
                  {formatPrice(template.compareAt)}
                </span>
              )}
              <span className="tabular-nums">{formatPrice(template.price)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate(`/templates/${template.slug}`)}
              className="h-12 px-5 rounded-[10px] border border-[#D4D4D4] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-[14px] font-semibold cursor-pointer"
            >
              Inspect Specifications
            </button>
          </div>
        </div>

        <div className="mt-14">
          <FeatureMedia kind={isSecondBrain ? 'second-brain' : 'finance'} />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#FAFAFA] border-y border-[#EAEAEA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-[16px] border border-[#EAEAEA] bg-white space-y-3"
            >
              <h2 className="text-[18px] font-semibold text-[#0A0A0A]">{f.title}</h2>
              <p className="text-[15px] text-[#525252] leading-[1.6]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqAccordion />
      <PromoBanner />
    </div>
  );
};

export const AllAccessPage: React.FC<{
  onNavigate: (path: string) => void;
  onOpenCheckout: (target: CheckoutTarget) => void;
  purchasedSlugs: Set<string>;
}> = ({ onNavigate, onOpenCheckout, purchasedSlugs }) => {
  const proTemplates = TEMPLATES.filter((t) => t.pro);
  const stats = getProTemplatesTotalValue(TEMPLATES);

  return (
    <div className="pb-20">
      <section className="py-20 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-[680px] space-y-4">
          <span className="rounded-full bg-[#0A0A0A] text-white text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 inline-block">
            COMPLETE PRO BUNDLE
          </span>
          <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
            All Access Bundle
          </h1>
          <p className="text-[18px] text-[#525252] leading-[1.55]">
            One purchase, every PRO template. Unlock all {stats.proCount} premium Notion systems (${stats.individualTotal} individual value) plus lifetime updates for {formatPrice(ALL_ACCESS_PRICE)}.
          </p>
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() =>
                onOpenCheckout({
                  name: 'All Access Bundle (All 17 PRO Templates)',
                  slug: 'all-access',
                  price: ALL_ACCESS_PRICE,
                  compareAt: stats.individualTotal,
                  pro: true,
                  whatsInside: [
                    'All 17 PRO Notion templates including Second Brain, Finance Tracker, Freelance OS, and Content OS',
                    'Instant access to all future PRO releases at no extra cost',
                    'Private Circle community membership & priority support',
                  ],
                })
              }
              className="h-12 px-6 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[15px] font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Get All Access — {formatPrice(ALL_ACCESS_PRICE)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[14px] text-[#737373] tabular-nums">
              Save ${stats.savings} vs buying individually
            </span>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proTemplates.map((item) => (
            <TemplateCard
              key={item.slug}
              template={item}
              onNavigate={onNavigate}
              isPurchased={purchasedSlugs.has(item.slug)}
            />
          ))}
        </div>
      </section>
      <PromoBanner />
    </div>
  );
};

export const AppsPage: React.FC<{
  slug?: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  const [demoInput, setDemoInput] = useState('');
  const [demoItems, setDemoItems] = useState<string[]>([
    'Review morning Second Brain dashboard',
    'Complete 60-minute deep work block',
    'Log daily workout & hydration streak',
  ]);

  if (slug) {
    const app = APPS.find((a) => a.slug === slug) || APPS[0];
    return (
      <div className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
        <button
          type="button"
          onClick={() => onNavigate('/apps')}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#737373] hover:text-[#0A0A0A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Apps by Easlo</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <AppIconGlyph icon={app.icon} />
            <div className="space-y-2">
              <h1 className="text-[clamp(32px,4.5vw,48px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
                {app.name}
              </h1>
              <p className="text-[20px] text-[#525252]">{app.tagline}</p>
            </div>
            <p className="text-[16px] text-[#525252] leading-[1.6]">
              {app.description}
            </p>
            <div className="text-[13px] text-[#737373]">
              <span>{app.platform}</span>
              <span className="mx-2">·</span>
              <span>{app.priceLabel}</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('/sign-up')}
                className="h-11 px-5 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[14px] font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Launch {app.name} Web App</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Mini App Sandbox */}
          <div className="lg:col-span-6 rounded-[16px] border border-[#EAEAEA] bg-[#FAFAFA] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
              <span className="text-[13px] font-semibold text-[#0A0A0A]">
                {app.name} — Interactive Preview
              </span>
              <span className="text-[12px] text-[#737373]">Synced with Notion</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!demoInput.trim()) return;
                setDemoItems([demoInput.trim(), ...demoItems]);
                setDemoInput('');
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder={`Add entry to ${app.name}...`}
                aria-label={`Add entry to ${app.name}`}
                className="flex-1 h-10 px-3 rounded-[8px] bg-white border border-[#D4D4D4] text-[14px] text-[#0A0A0A]"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-[8px] bg-[#0A0A0A] text-white text-[13px] font-semibold cursor-pointer"
              >
                Add
              </button>
            </form>

            <ul className="space-y-2">
              {demoItems.map((entry, idx) => (
                <li
                  key={`${entry}-${idx}`}
                  className="p-3 rounded-[8px] bg-white border border-[#EAEAEA] flex items-center justify-between text-[14px] text-[#0A0A0A]"
                >
                  <span>{entry}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDemoItems(demoItems.filter((_, i) => i !== idx))
                    }
                    className="text-[12px] text-[#737373] hover:text-[#0A0A0A] cursor-pointer"
                  >
                    Done
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#EAEAEA]">
          {app.features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-[16px] border border-[#EAEAEA] bg-white space-y-2"
            >
              <h2 className="text-[16px] font-semibold text-[#0A0A0A]">{f.title}</h2>
              <p className="text-[14px] text-[#525252] leading-[1.6]">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
      <div className="space-y-3 max-w-[600px]">
        <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
          Apps by Easlo
        </h1>
        <p className="text-[18px] text-[#525252] leading-[1.55]">
          Get things done with apps designed with simplicity in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {APPS.map((app) => (
          <a
            key={app.slug}
            href={`/apps/${app.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/apps/${app.slug}`);
            }}
            className="group p-6 rounded-[16px] border border-[#EAEAEA] bg-white hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(10,10,10,0.08)] transition-all flex flex-col justify-between gap-6"
          >
            <div className="flex items-start justify-between">
              <AppIconGlyph icon={app.icon} />
              <ArrowUpRight className="w-4 h-4 text-[#737373] group-hover:text-[#0A0A0A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-[16px] font-semibold text-[#0A0A0A]">{app.name}</h2>
              <p className="text-[14px] text-[#525252]">{app.tagline}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export const BlogPage: React.FC<{
  slug?: string;
  onNavigate: (path: string) => void;
}> = ({ slug, onNavigate }) => {
  if (slug) {
    const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
    return (
      <article className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6 space-y-8">
        <button
          type="button"
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-2 text-[14px] font-medium text-[#737373] hover:text-[#0A0A0A] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </button>

        <header className="space-y-3 border-b border-[#EAEAEA] pb-8">
          <div className="flex items-center gap-2 text-[13px] text-[#737373]">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-[clamp(30px,4vw,42px)] font-semibold tracking-[-0.03em] leading-[1.12] text-[#0A0A0A]">
            {post.title}
          </h1>
        </header>

        <div className="space-y-6 text-[18px] text-[#525252] leading-[1.7]">
          {post.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="p-6 rounded-[16px] bg-[#FAFAFA] border border-[#EAEAEA] space-y-3">
          <h2 className="text-[15px] font-semibold text-[#0A0A0A]">Key Takeaways</h2>
          <ul className="space-y-2 text-[15px] text-[#525252]">
            {post.takeaways.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#0A0A0A] shrink-0 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6 space-y-12">
      <div className="space-y-3">
        <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
          Blog & Digital Minimalism
        </h1>
        <p className="text-[18px] text-[#525252] leading-[1.55]">
          Essays and practical guides on Notion systems, intentional workflows, and minimalist tools.
        </p>
      </div>

      <div className="divide-y divide-[#EAEAEA] border-y border-[#EAEAEA]">
        {BLOG_POSTS.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/blog/${post.slug}`);
            }}
            className="block py-8 group space-y-2.5"
          >
            <div className="flex items-center gap-2 text-[13px] text-[#737373]">
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-[#0A0A0A] group-hover:underline">
              {post.title}
            </h2>
            <p className="text-[16px] text-[#525252] leading-[1.6]">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export const StaticInfoPage: React.FC<{
  page: 'about' | 'updates' | 'privacy' | 'ai-tools';
}> = ({ page }) => {
  if (page === 'about') {
    return (
      <div className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
          About Easlo
        </h1>
        <div className="space-y-5 text-[16px] text-[#525252] leading-[1.7]">
          <p>
            Easlo is an independent digital product studio focused on minimalist Notion templates and single-purpose productivity web apps. Since 2022, over 500,000 creators, students, and founders have used our templates to bring clarity to their daily work.
          </p>
          <p>
            We believe software should stay out of your way. Every template in our catalog is built on a strict monochrome design language: zero visual clutter, intuitive database relations, and immediate utility on Notion’s free plan.
          </p>
          <p>
            Have a question about a template, partnership, or educational discount? Reach out directly at{' '}
            <a href="mailto:support@easlo.co" className="text-[#0A0A0A] underline">
              support@easlo.co
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  if (page === 'updates') {
    return (
      <div className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="space-y-2">
          <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
            Updates & Changelog
          </h1>
          <p className="text-[16px] text-[#525252]">
            All template improvements and new releases shipped in 2026.
          </p>
        </div>

        <div className="divide-y divide-[#EAEAEA] border-y border-[#EAEAEA]">
          {UPDATES_LIST.map((u) => (
            <div key={u.version} className="py-8 space-y-3">
              <div className="flex items-center gap-2 text-[13px] text-[#737373] tabular-nums">
                <span className="font-semibold text-[#0A0A0A]">v{u.version}</span>
                <span>·</span>
                <span>{u.date}</span>
              </div>
              <h2 className="text-[20px] font-semibold text-[#0A0A0A]">{u.title}</h2>
              <ul className="space-y-2 text-[15px] text-[#525252] list-disc pl-5">
                {u.changes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page === 'privacy') {
    return (
      <div className="py-16 sm:py-24 max-w-[720px] mx-auto px-4 sm:px-6 space-y-8">
        <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[15px] text-[#525252] leading-[1.7]">
          <section className="space-y-2">
            <h2 className="text-[18px] font-semibold text-[#0A0A0A]">1. Data Collected</h2>
            <p>
              We collect only the email address and billing details necessary to deliver your digital Notion template links, generate license receipts, and provide access to your customer library.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-[18px] font-semibold text-[#0A0A0A]">2. Payments & Security</h2>
            <p>
              All payments are processed securely by Stripe and Lemon Squeezy. Easlo never stores raw payment card numbers on our servers.
            </p>
          </section>
          <section className="space-y-2">
            <h2 className="text-[18px] font-semibold text-[#0A0A0A]">3. Contact</h2>
            <p>
              For data export or deletion requests, email{' '}
              <a href="mailto:privacy@easlo.co" className="text-[#0A0A0A] underline">
                privacy@easlo.co
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-24 max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
      <div className="space-y-2 max-w-[600px]">
        <h1 className="text-[clamp(32px,4.5vw,44px)] font-semibold tracking-[-0.03em] leading-[1.1] text-[#0A0A0A]">
          Curated AI Tools
        </h1>
        <p className="text-[16px] text-[#525252]">
          Six essential AI tools that pair seamlessly with your minimalist Notion workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AI_TOOLS_LIST.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-[16px] border border-[#EAEAEA] bg-white hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(10,10,10,0.08)] transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#737373]">{tool.category}</span>
                <ArrowUpRight className="w-4 h-4 text-[#737373] group-hover:text-[#0A0A0A]" />
              </div>
              <h2 className="text-[18px] font-semibold text-[#0A0A0A]">{tool.name}</h2>
              <p className="text-[14px] text-[#525252] leading-[1.55]">
                {tool.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export const AuthPage: React.FC<{
  mode: 'sign-in' | 'sign-up';
  onNavigate: (path: string) => void;
}> = ({ mode, onNavigate }) => {
  const isSignUp = mode === 'sign-up';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateAuthForm(email, password, isSignUp);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="py-20 sm:py-28 px-4 flex items-center justify-center">
      <div className="w-full max-w-[400px] rounded-[16px] border border-[#EAEAEA] bg-white p-6 sm:p-8 space-y-6">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-10 h-10 rounded-full bg-[#15803D] text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h1 className="text-[20px] font-semibold text-[#0A0A0A]">
              Check your inbox to continue.
            </h1>
            <p className="text-[14px] text-[#525252]">
              We sent a magic verification link to{' '}
              <span className="font-medium text-[#0A0A0A]">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/templates')}
              className="w-full h-10 rounded-[10px] bg-[#0A0A0A] text-white text-[14px] font-semibold cursor-pointer"
            >
              Browse Templates
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-1.5">
              <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-[#0A0A0A]">
                {isSignUp ? 'Create a free account' : 'Sign In'}
              </h1>
              <p className="text-[14px] text-[#525252]">
                {isSignUp
                  ? 'Access your Notion templates, updates, and apps in one place.'
                  : 'Welcome back. Enter your credentials to access your templates.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="auth-email"
                  className="block text-[13px] font-medium text-[#0A0A0A]"
                >
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] ${
                    errors.email ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[13px] text-[#B42318]">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="auth-password"
                  className="block text-[13px] font-medium text-[#0A0A0A]"
                >
                  Password
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] ${
                    errors.password ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                  }`}
                />
                {errors.password && (
                  <p className="text-[13px] text-[#B42318]">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-10 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] disabled:opacity-40 text-white text-[14px] font-semibold inline-flex items-center justify-center cursor-pointer"
              >
                {loading
                  ? 'Authenticating...'
                  : isSignUp
                  ? 'Create a free account'
                  : 'Sign In'}
              </button>
            </form>

            <p className="text-[13px] text-[#737373] text-center pt-2 border-t border-[#EAEAEA]">
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <a
                href={isSignUp ? '/sign-in' : '/sign-up'}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(isSignUp ? '/sign-in' : '/sign-up');
                }}
                className="text-[#0A0A0A] font-medium underline underline-offset-4"
              >
                {isSignUp ? 'Sign In' : 'Create a free account'}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
