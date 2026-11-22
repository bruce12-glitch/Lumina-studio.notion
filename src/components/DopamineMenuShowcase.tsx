import React, { useMemo, useState } from 'react';
import {
  ArrowDownUp,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  Plus,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  Utensils,
  Zap,
} from 'lucide-react';
import {
  computeDopamineKpis,
  computeMoodFrequency,
  DopamineOrderEntry,
  DopamineSortKey,
  DopamineTabId,
  INITIAL_DOPAMINE_ORDERS,
  sortTopPicks,
  TOP_PICKS_ITEMS,
} from '../data/dopamineAndTravelSpec';

export type { DopamineTabId };

interface DopamineMenuShowcaseProps {
  activeTab?: DopamineTabId;
  onTabChange?: (tab: DopamineTabId) => void;
  isOwned?: boolean;
  onOpenBuy?: () => void;
  priceLabel?: string;
}

const TABS: { id: DopamineTabId; label: string; icon: React.ReactNode }[] = [
  { id: 'plate', label: "Today's Plate", icon: <Utensils className="w-3.5 h-3.5" /> },
  { id: 'reset', label: 'Reset Now', icon: <Zap className="w-3.5 h-3.5 text-[#D9730D]" /> },
  { id: 'top-picks', label: 'Top Picks', icon: <Target className="w-3.5 h-3.5 text-[#C43B3B]" /> },
  { id: 'mood-match', label: 'Mood Match', icon: <Brain className="w-3.5 h-3.5 text-[#C14C8A]" /> },
  { id: 'craving-swaps', label: 'Craving Swaps', icon: <Shield className="w-3.5 h-3.5 text-[#2383E2]" /> },
  { id: 'order-log', label: 'Order Log', icon: <BookOpen className="w-3.5 h-3.5 text-[#D9730D]" /> },
  { id: 'insights', label: 'Insights', icon: <BarChart3 className="w-3.5 h-3.5 text-[#6940A5]" /> },
];

const PLATE_COLUMNS: Array<{
  course: DopamineOrderEntry['course'];
  items: Array<{
    id: string;
    title: string;
    mins: number;
    effect: 'Restores' | 'Neutral' | 'Drains';
    cost: number;
    lift: number;
    mood: DopamineOrderEntry['mood'];
  }>;
}> = [
  {
    course: 'Appetizer',
    items: [
      {
        id: 'plate-song',
        title: 'One song, eyes closed',
        mins: 3,
        effect: 'Restores',
        cost: 0,
        lift: 2,
        mood: 'Overstimulated',
      },
    ],
  },
  {
    course: 'Dessert',
    items: [
      {
        id: 'plate-sweet',
        title: 'Something sweet',
        mins: 10,
        effect: 'Neutral',
        cost: 80,
        lift: 1,
        mood: 'Bored',
      },
    ],
  },
  {
    course: 'Entrée',
    items: [
      {
        id: 'plate-gym',
        title: 'Gym session',
        mins: 60,
        effect: 'Restores',
        cost: 0,
        lift: 3,
        mood: 'Restless',
      },
    ],
  },
  {
    course: 'Side',
    items: [
      {
        id: 'plate-lofi',
        title: 'Lo-fi while studying',
        mins: 60,
        effect: 'Neutral',
        cost: 0,
        lift: 2,
        mood: 'Anxious',
      },
    ],
  },
];

const RESET_CARDS: Array<{
  id: string;
  title: string;
  mins: number;
  effect: 'Restores' | 'Neutral';
  cost: number;
  verdict: 'Keeper' | 'Works' | 'Retire';
  tone: string;
  lift: number;
  mood: DopamineOrderEntry['mood'];
}> = [
  {
    id: 'reset-song',
    title: 'One song, eyes closed',
    mins: 3,
    effect: 'Restores',
    cost: 0,
    verdict: 'Keeper',
    tone: 'text-[#2383E2]',
    lift: 2,
    mood: 'Overstimulated',
  },
  {
    id: 'reset-cold',
    title: 'Cold shower + 10 pushups',
    mins: 5,
    effect: 'Restores',
    cost: 0,
    verdict: 'Keeper',
    tone: 'text-[#2383E2]',
    lift: 3,
    mood: 'Sluggish',
  },
  {
    id: 'reset-text',
    title: 'Text a friend first',
    mins: 5,
    effect: 'Restores',
    cost: 0,
    verdict: 'Keeper',
    tone: 'text-[#2383E2]',
    lift: 2,
    mood: 'Lonely',
  },
  {
    id: 'reset-coffee',
    title: 'Make a proper coffee',
    mins: 8,
    effect: 'Neutral',
    cost: 40,
    verdict: 'Works',
    tone: 'text-[#0F7B6C]',
    lift: 1,
    mood: 'Bored',
  },
  {
    id: 'reset-walk',
    title: 'Walk around the block',
    mins: 10,
    effect: 'Restores',
    cost: 0,
    verdict: 'Keeper',
    tone: 'text-[#2383E2]',
    lift: 2,
    mood: 'Anxious',
  },
  {
    id: 'reset-tidy',
    title: '10-minute tidy',
    mins: 10,
    effect: 'Restores',
    cost: 0,
    verdict: 'Keeper',
    tone: 'text-[#2383E2]',
    lift: 2,
    mood: 'Restless',
  },
  {
    id: 'reset-sweet',
    title: 'Something sweet',
    mins: 10,
    effect: 'Neutral',
    cost: 80,
    verdict: 'Retire',
    tone: 'text-[#C43B3B]',
    lift: 0,
    mood: 'Fried / Exhausted',
  },
];

const MOOD_COLUMNS: Array<{
  mood: DopamineOrderEntry['mood'];
  headerBg: string;
  badgeBg: string;
  cards: Array<{
    id: string;
    title: string;
    course: DopamineOrderEntry['course'];
    mins: number;
    effect: 'Restores' | 'Neutral' | 'Drains';
    cost: number;
    lift: number;
  }>;
}> = [
  {
    mood: 'Anxious',
    headerBg: 'bg-[#EDF5FC]',
    badgeBg: 'bg-[#D3E5EF] text-[#1D4E73]',
    cards: [
      { id: 'm-anx-1', title: 'One song, eyes closed', course: 'Appetizer', mins: 3, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-anx-2', title: 'Walk around the block', course: 'Appetizer', mins: 10, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-anx-3', title: '10-minute tidy', course: 'Appetizer', mins: 10, effect: 'Restores', cost: 0, lift: 2 },
    ],
  },
  {
    mood: 'Bored',
    headerBg: 'bg-[#FCF9EC]',
    badgeBg: 'bg-[#FDECC8] text-[#7D5715]',
    cards: [
      { id: 'm-bor-1', title: 'Walk around the block', course: 'Appetizer', mins: 10, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-bor-2', title: 'Podcast while cleaning', course: 'Side', mins: 30, effect: 'Neutral', cost: 0, lift: 1 },
      { id: 'm-bor-3', title: 'Something sweet', course: 'Dessert', mins: 10, effect: 'Neutral', cost: 80, lift: 0 },
    ],
  },
  {
    mood: 'Fried / Exhausted',
    headerBg: 'bg-[#F7F3FB]',
    badgeBg: 'bg-[#E8DEEE] text-[#5B368A]',
    cards: [
      { id: 'm-fri-1', title: 'One song, eyes closed', course: 'Appetizer', mins: 3, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-fri-2', title: 'Cycle to the lake', course: 'Entrée', mins: 80, effect: 'Restores', cost: 0, lift: 3 },
      { id: 'm-fri-3', title: 'One episode of a series', course: 'Dessert', mins: 45, effect: 'Neutral', cost: 0, lift: 1 },
    ],
  },
  {
    mood: 'Lonely',
    headerBg: 'bg-[#FDF2F6]',
    badgeBg: 'bg-[#F5E0E9] text-[#8E2A57]',
    cards: [
      { id: 'm-lon-1', title: 'Long call with a friend', course: 'Entrée', mins: 45, effect: 'Restores', cost: 0, lift: 3 },
      { id: 'm-lon-2', title: 'Text a friend first', course: 'Appetizer', mins: 5, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-lon-3', title: 'Concert or live gig', course: 'Special', mins: 180, effect: 'Restores', cost: 1500, lift: 3 },
    ],
  },
  {
    mood: 'Overstimulated',
    headerBg: 'bg-[#FDF4F4]',
    badgeBg: 'bg-[#FFE2DD] text-[#9E2B25]',
    cards: [
      { id: 'm-ovr-1', title: 'One song, eyes closed', course: 'Appetizer', mins: 3, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-ovr-2', title: '10-minute tidy', course: 'Appetizer', mins: 10, effect: 'Restores', cost: 0, lift: 2 },
      { id: 'm-ovr-3', title: 'Cold shower + 10 pushups', course: 'Appetizer', mins: 5, effect: 'Restores', cost: 0, lift: 3 },
    ],
  },
];

const CRAVING_SWAPS: Array<{
  craving: string;
  tint: string;
  pill: string;
  mood: DopamineOrderEntry['mood'];
  swaps: Array<{
    id: string;
    title: string;
    mins: number;
    effect: 'Restores' | 'Neutral';
    cost: number;
    lift: number;
    course: DopamineOrderEntry['course'];
  }>;
}> = [
  {
    craving: 'Doomscrolling',
    tint: 'bg-[#FDF4F4]',
    pill: 'bg-[#FFE2DD] text-[#9E2B25]',
    mood: 'Bored',
    swaps: [
      { id: 'sw-1', title: 'One song, eyes closed', mins: 3, effect: 'Restores', cost: 0, lift: 2, course: 'Appetizer' },
      { id: 'sw-2', title: 'Walk around the block', mins: 10, effect: 'Restores', cost: 0, lift: 2, course: 'Appetizer' },
      { id: 'sw-3', title: 'Cold shower + 10 pushups', mins: 5, effect: 'Restores', cost: 0, lift: 3, course: 'Appetizer' },
    ],
  },
  {
    craving: 'Binge Watching',
    tint: 'bg-[#F7F3FB]',
    pill: 'bg-[#E8DEEE] text-[#5B368A]',
    mood: 'Fried / Exhausted',
    swaps: [
      { id: 'sw-4', title: 'Deep work block on side project', mins: 90, effect: 'Restores', cost: 0, lift: 3, course: 'Entrée' },
      { id: 'sw-5', title: 'Music while cooking', mins: 40, effect: 'Neutral', cost: 0, lift: 2, course: 'Side' },
      { id: 'sw-6', title: 'Cycle to the lake', mins: 80, effect: 'Restores', cost: 0, lift: 3, course: 'Entrée' },
    ],
  },
  {
    craving: 'Impulse Ordering',
    tint: 'bg-[#FCF6EE]',
    pill: 'bg-[#FADEC9] text-[#8A4613]',
    mood: 'Restless',
    swaps: [
      { id: 'sw-7', title: 'Cook something new', mins: 75, effect: 'Restores', cost: 350, lift: 3, course: 'Entrée' },
      { id: 'sw-8', title: 'Make a proper coffee', mins: 8, effect: 'Neutral', cost: 40, lift: 1, course: 'Appetizer' },
    ],
  },
  {
    craving: 'Over-caffeinating',
    tint: 'bg-[#F7F6F3]',
    pill: 'bg-[#E9E9E7] text-[#37352F]',
    mood: 'Sluggish',
    swaps: [
      { id: 'sw-9', title: 'Cold shower + 10 pushups', mins: 5, effect: 'Restores', cost: 0, lift: 3, course: 'Appetizer' },
      { id: 'sw-10', title: 'Walk around the block', mins: 10, effect: 'Restores', cost: 0, lift: 2, course: 'Appetizer' },
    ],
  },
];

export const DopamineMenuShowcase: React.FC<DopamineMenuShowcaseProps> = ({
  activeTab: controlledTab,
  onTabChange,
  isOwned = false,
  onOpenBuy,
  priceLabel = 'Duplicate Free',
}) => {
  const [internalTab, setInternalTab] = useState<DopamineTabId>('plate');
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: DopamineTabId) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const [addedOrders, setAddedOrders] = useState<DopamineOrderEntry[]>([]);
  const [toggledIds, setToggledIds] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<DopamineSortKey>('score');
  const [quickItem, setQuickItem] = useState('');
  const [quickMood, setQuickMood] = useState<DopamineOrderEntry['mood']>('Bored');
  const [quickLift, setQuickLift] = useState<number>(2);
  const [quickError, setQuickError] = useState<string | null>(null);

  const kpis = useMemo(() => computeDopamineKpis(addedOrders), [addedOrders]);
  const sortedPicks = useMemo(() => sortTopPicks(TOP_PICKS_ITEMS, sortBy), [sortBy]);
  const moodFrequency = useMemo(() => computeMoodFrequency(addedOrders), [addedOrders]);
  const maxMoodCount = Math.max(10, ...moodFrequency.map((m) => m.count));

  const logOrToggleCard = (card: {
    id: string;
    title: string;
    course: DopamineOrderEntry['course'];
    mood: DopamineOrderEntry['mood'];
    lift: number;
    cost: number;
    isSwap: boolean;
  }) => {
    const alreadyLogged = !!toggledIds[card.id];
    if (alreadyLogged) {
      setToggledIds((prev) => ({ ...prev, [card.id]: false }));
      setAddedOrders((prev) => prev.filter((o) => o.id !== card.id));
    } else {
      setToggledIds((prev) => ({ ...prev, [card.id]: true }));
      setAddedOrders((prev) => [
        {
          id: card.id,
          item: card.title,
          course: card.course,
          mood: card.mood,
          lift: card.lift,
          cost: card.cost,
          isSwap: card.isSwap,
          isWin: card.lift >= 1,
          loggedAt: 'Just now',
        },
        ...prev,
      ]);
    }
  };

  const handleQuickLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = quickItem.trim();
    if (trimmed.length < 2) {
      setQuickError('Enter a reset activity name (at least 2 characters).');
      return;
    }
    setQuickError(null);
    const id = `custom-${Date.now()}`;
    setAddedOrders((prev) => [
      {
        id,
        item: trimmed,
        course: 'Appetizer',
        mood: quickMood,
        lift: quickLift,
        cost: 0,
        isSwap: true,
        isWin: quickLift >= 1,
        loggedAt: 'Just now',
      },
      ...prev,
    ]);
    setQuickItem('');
  };

  const handleResetDemo = () => {
    setAddedOrders([]);
    setToggledIds({});
    setQuickError(null);
  };

  const allOrders = [...addedOrders, ...INITIAL_DOPAMINE_ORDERS];

  return (
    <div
      data-testid="dopamine-menu-showcase"
      className="rounded-[18px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
    >
      {/* Notion Window Chrome */}
      <div className="px-4 sm:px-6 py-3 bg-[#F7F6F3] border-b border-[#E9E9E7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#37352F]">
          <Sparkles className="w-4 h-4 text-[#6940A5]" />
          <span>Dopamine Menu</span>
          <span className="hidden sm:inline font-mono text-[11.5px] font-normal text-[#6E6D68]">
            · 3 linked DBs · 10 Notion views · Formula Pick Score
          </span>
        </div>
        <div className="flex items-center gap-3">
          {addedOrders.length > 0 && (
            <button
              type="button"
              onClick={handleResetDemo}
              className="text-[12px] font-medium text-[#6E6D68] hover:text-[#37352F] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({addedOrders.length} logged)</span>
            </button>
          )}
          {onOpenBuy && (
            <button
              type="button"
              onClick={onOpenBuy}
              className="text-[12.5px] font-semibold text-[#2383E2] hover:text-[#1B6EC2] inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{isOwned ? 'Open Delivery' : priceLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Exact 5-KPI Editorial Counter Strip from Notion */}
      <div className="px-4 sm:px-7 pt-5 pb-5 border-b border-[#F1F1EF] space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
              Dopamine Menu
            </p>
            <p className="text-[12px] text-[#6E6D68]">
              ← Return to Resonance Studio Operating System
            </p>
          </div>
          <p className="text-[12px] text-[#6E6D68]">
            Click any card below to log a live order and recalculate all 5 KPIs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-center">
          {[
            {
              id: 'orders',
              pill: 'KPI Orders 7d',
              sub: 'Count all',
              val: String(kpis.orders7d),
            },
            {
              id: 'lift',
              pill: 'KPI Lift 7d',
              sub: 'Avg Mood Lift',
              val: String(kpis.avgLift),
            },
            {
              id: 'winrate',
              pill: 'KPI Win Rate',
              sub: 'Average of Win',
              val: String(kpis.winRate),
            },
            {
              id: 'swaps',
              pill: 'KPI Swaps 7d',
              sub: 'Count all',
              val: String(kpis.swaps7d),
            },
            {
              id: 'spend',
              pill: 'KPI Spend 30d',
              sub: 'Sum of Cost (₹)',
              val: String(kpis.spend30d),
            },
          ].map((kpi) => (
            <div
              key={kpi.pill}
              data-testid={`dopamine-kpi-${kpi.id}`}
              className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] px-3 py-3 space-y-1.5"
            >
              <p className="text-[11px] font-medium text-[#6E6D68] truncate">
                {kpi.pill}
              </p>
              <p className="text-[10.5px] font-semibold text-[#52504A]">
                {kpi.sub}
              </p>
              <p className="font-editorial text-[26px] sm:text-[30px] font-semibold text-[#37352F] leading-none tabular-nums">
                {kpi.val}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notion View Tab Bar */}
      <div className="px-4 sm:px-7 pt-4 border-b border-[#E9E9E7] overflow-x-auto">
        <div
          role="tablist"
          aria-label="Dopamine Menu views"
          className="flex items-center gap-1.5 pb-3 min-w-max"
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                data-testid={`dopamine-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#F1F1EF] text-[#37352F] border border-[#E2E1DC]'
                    : 'text-[#6E6D68] hover:text-[#37352F] hover:bg-[#FAF9F6] border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.id === 'order-log' && addedOrders.length > 0 && (
                  <span className="font-mono text-[11px] text-[#0F7B6C] tabular-nums">
                    (+{addedOrders.length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active View Stage */}
      <div className="p-4 sm:p-7">
        {activeTab === 'plate' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
              <span>Today&apos;s Plate · Grouped by Course (click any card to log an order)</span>
              <span className="font-mono tabular-nums">4 courses</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PLATE_COLUMNS.map((col) => (
                <div
                  key={col.course}
                  className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-3 space-y-2.5"
                >
                  <span className="inline-block px-2 py-0.5 rounded-[5px] bg-[#E9E9E7] text-[11.5px] font-semibold text-[#37352F]">
                    {col.course}
                  </span>
                  {col.items.map((item) => {
                    const logged = !!toggledIds[item.id];
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                          logOrToggleCard({
                            id: item.id,
                            title: item.title,
                            course: col.course,
                            mood: item.mood,
                            lift: item.lift,
                            cost: item.cost,
                            isSwap: item.effect === 'Restores',
                          })
                        }
                        className={`w-full text-left rounded-[10px] bg-white border p-3 space-y-2 transition-colors cursor-pointer ${
                          logged
                            ? 'border-[#0F7B6C] bg-[#F7FCFA]'
                            : 'border-[#E9E9E7] hover:border-[#2383E2]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13.5px] font-semibold text-[#37352F] leading-snug">
                            {item.title}
                          </p>
                          {logged && (
                            <Check className="w-4 h-4 text-[#0F7B6C] shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11.5px] font-mono text-[#6E6D68] tabular-nums">
                          <span>{item.mins}m</span>
                          <span className="px-1.5 py-0.5 rounded bg-[#F1F1EF] text-[#37352F] font-sans text-[11px]">
                            {item.effect}
                          </span>
                          <span>₹{item.cost}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reset' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
              <span>Reset Now · Under-10-minute healthy hits &amp; verdict tags (click to log)</span>
              <span className="font-mono tabular-nums">{RESET_CARDS.length} items</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RESET_CARDS.map((card) => {
                const logged = !!toggledIds[card.id];
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() =>
                      logOrToggleCard({
                        id: card.id,
                        title: card.title,
                        course: card.verdict === 'Retire' ? 'Dessert' : 'Appetizer',
                        mood: card.mood,
                        lift: card.lift,
                        cost: card.cost,
                        isSwap: card.verdict !== 'Retire',
                      })
                    }
                    className={`text-left rounded-[12px] bg-white border p-4 space-y-2 transition-colors cursor-pointer ${
                      logged
                        ? 'border-[#0F7B6C] bg-[#F7FCFA]'
                        : 'border-[#E9E9E7] hover:border-[#2383E2]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[14px] font-semibold text-[#37352F]">
                        {card.title}
                      </p>
                      {logged && (
                        <span className="text-[11px] font-mono font-semibold text-[#0F7B6C]">
                          Logged ✓
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] text-[#6E6D68] font-mono tabular-nums">
                      <span>{card.mins} min</span>
                      <span>·</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#F1F1EF] text-[#37352F] font-sans text-[11px]">
                        {card.effect}
                      </span>
                      <span>·</span>
                      <span>₹{card.cost}</span>
                    </div>
                    <p className={`text-[12px] font-semibold ${card.tone}`}>
                      {card.verdict === 'Keeper'
                        ? '◆ Keeper'
                        : card.verdict === 'Works'
                        ? '● Works'
                        : '▼ Retire'}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'top-picks' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[12px] text-[#6E6D68]">
                Top Picks · 12 ranked menu items with automatic Σ Pick Score &amp; Verdict formulas
              </p>
              <div className="inline-flex items-center gap-1.5 text-[11.5px]">
                <ArrowDownUp className="w-3.5 h-3.5 text-[#6E6D68]" />
                <span className="text-[#6E6D68]">Sort:</span>
                {(
                  [
                    { key: 'score', label: 'Pick Score' },
                    { key: 'minutes', label: 'Fastest' },
                    { key: 'lift', label: 'Avg Lift' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setSortBy(opt.key)}
                    className={`px-2 py-0.5 rounded-[6px] font-semibold transition-colors cursor-pointer ${
                      sortBy === opt.key
                        ? 'bg-[#37352F] text-white'
                        : 'bg-[#F7F6F3] text-[#52504A] hover:text-[#37352F]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[12px] border border-[#E9E9E7] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-mono text-[#6E6D68]">
                    <th className="py-2.5 px-4 font-semibold">Aa Item</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Σ Pick Score</th>
                    <th className="py-2.5 px-3 font-semibold">Σ Menu Verdict</th>
                    <th className="py-2.5 px-3 font-semibold text-right"># Minutes</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Σ Idle Days</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Avg Lift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                  {sortedPicks.map((row) => (
                    <tr key={row.id} className="hover:bg-[#FAF9F6]/70">
                      <td className="py-2.5 px-4 font-semibold text-[#37352F]">
                        {row.item}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#37352F] tabular-nums">
                        {row.score}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-[12px]">
                        <span
                          className={
                            row.verdict === 'Keeper'
                              ? 'text-[#2383E2]'
                              : row.verdict === 'Works'
                              ? 'text-[#0F7B6C]'
                              : 'text-[#6940A5]'
                          }
                        >
                          {row.verdict === 'Keeper'
                            ? '◆ Keeper'
                            : row.verdict === 'Works'
                            ? '● Works'
                            : 'NEW Untried'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#52504A] tabular-nums">
                        {row.mins}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#6E6D68] tabular-nums">
                        {row.idleDays}d
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-[#0F7B6C] tabular-nums">
                        {row.lift !== null ? `+${row.lift.toFixed(2)}` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'mood-match' && (
          <div className="space-y-3">
            <p className="text-[12px] text-[#6E6D68]">
              Mood Match · Pick your current state across 5 columns (click any card to log a matched reset)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {MOOD_COLUMNS.map((col) => (
                <div
                  key={col.mood}
                  className={`rounded-[12px] border border-[#E9E9E7] p-3 space-y-2.5 ${col.headerBg}`}
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold ${col.badgeBg}`}
                  >
                    {col.mood}
                  </span>
                  <div className="space-y-2">
                    {col.cards.map((card) => {
                      const logged = !!toggledIds[card.id];
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() =>
                            logOrToggleCard({
                              id: card.id,
                              title: card.title,
                              course: card.course,
                              mood: col.mood,
                              lift: card.lift,
                              cost: card.cost,
                              isSwap: card.effect !== 'Drains',
                            })
                          }
                          className={`w-full text-left rounded-[9px] bg-white border p-2.5 space-y-1.5 transition-colors cursor-pointer ${
                            logged
                              ? 'border-[#0F7B6C] bg-[#F7FCFA]'
                              : 'border-[#E9E9E7] hover:border-[#2383E2]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12.5px] font-semibold text-[#37352F] leading-snug">
                              {card.title}
                            </p>
                            {logged && (
                              <Check className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-[10.5px] text-[#6E6D68]">
                            <span className="px-1.5 py-0.5 rounded bg-[#F1F1EF] text-[#37352F]">
                              {card.course}
                            </span>
                            <span className="font-mono tabular-nums">{card.mins}m</span>
                            <span>· {card.effect}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'craving-swaps' && (
          <div className="space-y-3">
            <p className="text-[12px] text-[#6E6D68]">
              Craving Swaps · Click a healthier swap when an urge hits to log a win and increment Swaps 7d
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CRAVING_SWAPS.map((col) => (
                <div
                  key={col.craving}
                  className={`rounded-[12px] border border-[#E9E9E7] p-3 space-y-2.5 ${col.tint}`}
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded-[5px] text-[11.5px] font-semibold ${col.pill}`}
                  >
                    {col.craving}
                  </span>
                  <div className="space-y-2">
                    {col.swaps.map((swap) => {
                      const logged = !!toggledIds[swap.id];
                      return (
                        <button
                          key={swap.id}
                          type="button"
                          onClick={() =>
                            logOrToggleCard({
                              id: swap.id,
                              title: swap.title,
                              course: swap.course,
                              mood: col.mood,
                              lift: swap.lift,
                              cost: swap.cost,
                              isSwap: true,
                            })
                          }
                          className={`w-full text-left rounded-[9px] bg-white border p-2.5 space-y-1.5 transition-colors cursor-pointer ${
                            logged
                              ? 'border-[#0F7B6C] bg-[#F7FCFA]'
                              : 'border-[#E9E9E7] hover:border-[#2383E2]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <p className="text-[12.5px] font-semibold text-[#37352F] leading-snug">
                              {swap.title}
                            </p>
                            {logged && (
                              <Check className="w-3.5 h-3.5 text-[#0F7B6C] shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-[#6E6D68] tabular-nums">
                            <span>{swap.mins}m</span>
                            <span className="px-1.5 py-0.5 rounded bg-[#F1F1EF] font-sans text-[#37352F]">
                              {swap.effect}
                            </span>
                            <span>₹{swap.cost}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'order-log' && (
          <div className="space-y-4">
            <form
              onSubmit={handleQuickLogSubmit}
              className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-4 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                <div className="sm:col-span-5 space-y-1">
                  <label
                    htmlFor="dopamine-quick-item"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Activity ordered
                  </label>
                  <input
                    id="dopamine-quick-item"
                    type="text"
                    value={quickItem}
                    onChange={(e) => setQuickItem(e.target.value)}
                    placeholder="e.g., 5-min sunlight stretch"
                    className="w-full h-9 px-3 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F] focus:outline-none focus:border-[#2383E2]"
                  />
                </div>
                <div className="sm:col-span-3 space-y-1">
                  <label
                    htmlFor="dopamine-quick-mood"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Trigger mood
                  </label>
                  <select
                    id="dopamine-quick-mood"
                    value={quickMood}
                    onChange={(e) =>
                      setQuickMood(e.target.value as DopamineOrderEntry['mood'])
                    }
                    className="w-full h-9 px-2.5 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F] focus:outline-none focus:border-[#2383E2]"
                  >
                    <option value="Bored">Bored</option>
                    <option value="Anxious">Anxious</option>
                    <option value="Restless">Restless</option>
                    <option value="Sluggish">Sluggish</option>
                    <option value="Overstimulated">Overstimulated</option>
                    <option value="Lonely">Lonely</option>
                    <option value="Fried / Exhausted">Fried / Exhausted</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="dopamine-quick-lift"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Mood lift
                  </label>
                  <select
                    id="dopamine-quick-lift"
                    value={quickLift}
                    onChange={(e) => setQuickLift(Number(e.target.value))}
                    className="w-full h-9 px-2.5 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F] focus:outline-none focus:border-[#2383E2]"
                  >
                    <option value={3}>+3 High</option>
                    <option value={2}>+2 Solid</option>
                    <option value={1}>+1 Mild</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-9 px-3 rounded-[8px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[12.5px] font-semibold inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Log Order</span>
                  </button>
                </div>
              </div>
              {quickError && (
                <p role="alert" className="text-[12px] font-medium text-[#C43B3B]">
                  {quickError}
                </p>
              )}
            </form>

            <div className="rounded-[12px] border border-[#E9E9E7] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11.5px] font-mono text-[#6E6D68]">
                    <th className="py-2.5 px-4 font-semibold">Aa Menu Item</th>
                    <th className="py-2.5 px-3 font-semibold">Trigger Mood</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Mood Lift</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Cost</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Logged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF] text-[13px]">
                  {allOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FAF9F6]/70">
                      <td className="py-2.5 px-4 font-semibold text-[#37352F]">
                        {ord.item}
                      </td>
                      <td className="py-2.5 px-3 text-[#52504A]">{ord.mood}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-semibold text-[#0F7B6C] tabular-nums">
                        +{ord.lift}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#52504A] tabular-nums">
                        ₹{ord.cost}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono text-[11.5px] text-[#6E6D68]">
                        {ord.loggedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[14px] font-bold text-[#37352F]">
                  Mood State Frequency
                </p>
                <p className="text-[12px] text-[#6E6D68]">
                  Live chart showing how often each mood state triggers a dopamine order
                </p>
              </div>
              <span className="font-mono text-[11.5px] font-semibold text-[#6940A5] tabular-nums">
                Top trigger: {moodFrequency[0]?.mood} ({moodFrequency[0]?.count})
              </span>
            </div>

            <div className="space-y-2.5">
              {moodFrequency.map((row) => (
                <div
                  key={row.mood}
                  className="grid grid-cols-12 items-center gap-3 text-[12.5px]"
                >
                  <span className="col-span-4 sm:col-span-3 text-[#52504A] font-medium truncate text-right">
                    {row.mood}
                  </span>
                  <div className="col-span-7 sm:col-span-8 h-3 rounded-full bg-[#ECEBE7] overflow-hidden">
                    <div
                      style={{
                        width: `${Math.min(100, Math.round((row.count / maxMoodCount) * 100))}%`,
                      }}
                      className="h-full rounded-full bg-[#BC8BE0] transition-all duration-300"
                    />
                  </div>
                  <span className="col-span-1 font-mono font-bold text-[#37352F] tabular-nums">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
