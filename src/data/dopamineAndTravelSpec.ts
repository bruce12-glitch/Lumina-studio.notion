export type DopamineTabId =
  | 'plate'
  | 'reset'
  | 'top-picks'
  | 'mood-match'
  | 'craving-swaps'
  | 'order-log'
  | 'insights';

export type DopamineSortKey = 'score' | 'minutes' | 'lift';

export interface DopamineOrderEntry {
  id: string;
  item: string;
  course: 'Appetizer' | 'Entrée' | 'Side' | 'Dessert' | 'Special';
  mood:
    | 'Anxious'
    | 'Bored'
    | 'Fried / Exhausted'
    | 'Lonely'
    | 'Overstimulated'
    | 'Restless'
    | 'Sluggish';
  lift: number;
  cost: number;
  isSwap: boolean;
  isWin: boolean;
  loggedAt: string;
}

export interface TopPickItem {
  id: string;
  item: string;
  score: number;
  verdict: 'Keeper' | 'Works' | 'Untried';
  mins: number;
  idleDays: number;
  lift: number | null;
}

export const BASE_DOPAMINE_KPI_TOTALS = {
  orders7d: 12,
  liftSum7d: 21, // 21 / 12 = 1.75
  wins7d: 9.6, // 9.6 / 12 = 0.8
  swaps7d: 10,
  spend30d: 470,
} as const;

export const INITIAL_DOPAMINE_ORDERS: DopamineOrderEntry[] = [
  {
    id: 'ord-1',
    item: 'One song, eyes closed',
    course: 'Appetizer',
    mood: 'Overstimulated',
    lift: 2,
    cost: 0,
    isSwap: true,
    isWin: true,
    loggedAt: 'Today · 14:20',
  },
  {
    id: 'ord-2',
    item: 'Cold shower + 10 pushups',
    course: 'Appetizer',
    mood: 'Sluggish',
    lift: 3,
    cost: 0,
    isSwap: true,
    isWin: true,
    loggedAt: 'Today · 09:15',
  },
  {
    id: 'ord-3',
    item: 'Make a proper coffee',
    course: 'Appetizer',
    mood: 'Bored',
    lift: 1,
    cost: 40,
    isSwap: true,
    isWin: true,
    loggedAt: 'Yesterday · 16:05',
  },
  {
    id: 'ord-4',
    item: 'Something sweet',
    course: 'Dessert',
    mood: 'Fried / Exhausted',
    lift: 0,
    cost: 80,
    isSwap: false,
    isWin: false,
    loggedAt: 'Yesterday · 21:40',
  },
];

export const TOP_PICKS_ITEMS: TopPickItem[] = [
  { id: 'gym', item: 'Gym session', score: 8, verdict: 'Keeper', mins: 60, idleDays: 2, lift: 3.0 },
  { id: 'call', item: 'Long call with a friend', score: 8, verdict: 'Keeper', mins: 45, idleDays: 4, lift: 3.0 },
  { id: 'cook', item: 'Cook something new', score: 8, verdict: 'Keeper', mins: 75, idleDays: 5, lift: 3.0 },
  { id: 'cold', item: 'Cold shower + 10 pushups', score: 8, verdict: 'Keeper', mins: 5, idleDays: 0, lift: 3.0 },
  { id: 'song', item: 'One song, eyes closed', score: 6, verdict: 'Keeper', mins: 3, idleDays: 0, lift: 2.0 },
  { id: 'walk', item: 'Walk around the block', score: 6, verdict: 'Keeper', mins: 10, idleDays: 1, lift: 2.0 },
  { id: 'tidy', item: '10-minute tidy', score: 6, verdict: 'Keeper', mins: 10, idleDays: 2, lift: 2.0 },
  { id: 'lofi', item: 'Lo-fi while studying', score: 6, verdict: 'Keeper', mins: 60, idleDays: 1, lift: 2.0 },
  { id: 'text', item: 'Text a friend first', score: 6, verdict: 'Keeper', mins: 5, idleDays: 3, lift: 2.0 },
  { id: 'coffee', item: 'Make a proper coffee', score: 4, verdict: 'Works', mins: 8, idleDays: 1, lift: 1.0 },
  { id: 'podcast', item: 'Podcast while cleaning', score: 4, verdict: 'Works', mins: 30, idleDays: 6, lift: 1.0 },
  { id: 'hike', item: 'Weekend hike', score: 4, verdict: 'Untried', mins: 300, idleDays: 14, lift: null },
];

export const BASE_MOOD_FREQUENCY: Array<{
  mood: DopamineOrderEntry['mood'];
  count: number;
}> = [
  { mood: 'Bored', count: 9 },
  { mood: 'Restless', count: 7 },
  { mood: 'Sluggish', count: 7 },
  { mood: 'Anxious', count: 6 },
  { mood: 'Lonely', count: 4 },
  { mood: 'Overstimulated', count: 4 },
  { mood: 'Fried / Exhausted', count: 3 },
];

export function computeDopamineKpis(addedOrders: DopamineOrderEntry[]) {
  const orders7d = BASE_DOPAMINE_KPI_TOTALS.orders7d + addedOrders.length;
  const totalLift =
    BASE_DOPAMINE_KPI_TOTALS.liftSum7d +
    addedOrders.reduce((sum, o) => sum + o.lift, 0);
  const totalWins =
    BASE_DOPAMINE_KPI_TOTALS.wins7d +
    addedOrders.reduce((sum, o) => sum + (o.isWin ? 1 : 0), 0);
  const swaps7d =
    BASE_DOPAMINE_KPI_TOTALS.swaps7d +
    addedOrders.filter((o) => o.isSwap).length;
  const spend30d =
    BASE_DOPAMINE_KPI_TOTALS.spend30d +
    addedOrders.reduce((sum, o) => sum + o.cost, 0);

  return {
    orders7d,
    avgLift: Number((totalLift / orders7d).toFixed(2)),
    winRate: Number((totalWins / orders7d).toFixed(2)),
    swaps7d,
    spend30d,
  };
}

export function sortTopPicks(
  items: TopPickItem[],
  sortBy: DopamineSortKey
): TopPickItem[] {
  return [...items].sort((a, b) => {
    if (sortBy === 'minutes') return a.mins - b.mins;
    if (sortBy === 'lift') return (b.lift ?? -1) - (a.lift ?? -1);
    return b.score - a.score || (b.lift ?? -1) - (a.lift ?? -1);
  });
}

export function computeMoodFrequency(addedOrders: DopamineOrderEntry[]) {
  const extraByMood = new Map<string, number>();
  for (const ord of addedOrders) {
    extraByMood.set(ord.mood, (extraByMood.get(ord.mood) || 0) + 1);
  }
  return BASE_MOOD_FREQUENCY.map((row) => ({
    mood: row.mood,
    count: row.count + (extraByMood.get(row.mood) || 0),
  })).sort((a, b) => b.count - a.count);
}

// ============================================================================
// TRAVEL PLANNER PURE TELEMETRY, WALLET & READINESS ENGINE
// ============================================================================

export type TravelTabId =
  | 'control-tower'
  | 'wallet'
  | 'timeline'
  | 'packing'
  | 'itinerary';

export type ExpenseCategory = 'Travel' | 'Stay' | 'Other';
export type PaymentRail =
  | 'UPI / Bank Transfer'
  | 'Primary Credit Card'
  | 'Forex Travel Card'
  | 'Local Cash Notes'
  | 'Apple / Google Pay';

export interface TravelTrip {
  id: 'goa' | 'manali';
  name: string;
  destination: string;
  dates: string;
  countdown: string;
  budget: number;
}

export interface TravelExpense {
  id: string;
  tripId: 'goa' | 'manali';
  title: string;
  category: ExpenseCategory;
  rail: PaymentRail;
  amount: number;
  date: string;
}

export interface PackingItem {
  id: string;
  tripId: 'goa' | 'manali';
  item: string;
  group: 'Docs' | 'Stay' | 'Transit' | 'Wallet' | 'Bag';
  done: boolean;
}

export interface VaultDocument {
  id: string;
  tripId: 'goa' | 'manali';
  title: string;
  type: 'Passport' | 'Boarding Pass' | 'Booking PDF' | 'Visa / Permit';
  status: 'Approved' | 'To do';
  offlineReady: boolean;
}

export interface ItineraryStop {
  id: string;
  day: 1 | 2 | 3;
  time: string;
  title: string;
  area: string;
  done: boolean;
}

export interface SavedPlace {
  id: string;
  name: string;
  area: string;
  tag: 'Food & Coffee' | 'Beaches & Views' | 'Culture';
  estCost: number;
}

export const INITIAL_TRIPS: TravelTrip[] = [
  {
    id: 'goa',
    name: 'Goa · November',
    destination: 'North Goa',
    dates: 'Nov 22 – Nov 26, 2026',
    countdown: 'Today',
    budget: 25000,
  },
  {
    id: 'manali',
    name: 'Manali · March',
    destination: 'Manali + Solang',
    dates: 'Mar 10 – Mar 15, 2027',
    countdown: 'Planning',
    budget: 40000,
  },
];

export const INITIAL_EXPENSES: TravelExpense[] = [
  {
    id: 'exp-1',
    tripId: 'goa',
    title: 'IndiGo Return Flight (BLR ↔ GOI)',
    category: 'Travel',
    rail: 'UPI / Bank Transfer',
    amount: 8400,
    date: 'Nov 10',
  },
  {
    id: 'exp-2',
    tripId: 'goa',
    title: 'Scooter Rental (4 days + fuel)',
    category: 'Travel',
    rail: 'Primary Credit Card',
    amount: 2700,
    date: 'Nov 18',
  },
  {
    id: 'exp-3',
    tripId: 'goa',
    title: 'Boutique Stay Deposit · Assagao',
    category: 'Stay',
    rail: 'Primary Credit Card',
    amount: 2550,
    date: 'Nov 12',
  },
  {
    id: 'exp-4',
    tripId: 'goa',
    title: 'Airport Transfer Cab',
    category: 'Travel',
    rail: 'Forex Travel Card',
    amount: 1500,
    date: 'Nov 22',
  },
  {
    id: 'exp-5',
    tripId: 'goa',
    title: 'Beach Hut Locker & Late Checkout',
    category: 'Stay',
    rail: 'Local Cash Notes',
    amount: 350,
    date: 'Nov 22',
  },
  {
    id: 'exp-6',
    tripId: 'goa',
    title: 'Anjuna Espresso & Sunset Snacks',
    category: 'Other',
    rail: 'Local Cash Notes',
    amount: 650,
    date: 'Nov 22',
  },
];

export const INITIAL_PACKING_ITEMS: PackingItem[] = [
  {
    id: 'p1',
    tripId: 'goa',
    item: 'Passport & Flight Boarding Pass (Vault PDF)',
    group: 'Docs',
    done: true,
  },
  {
    id: 'p2',
    tripId: 'goa',
    item: 'North Goa Boutique Stay Confirmation',
    group: 'Stay',
    done: true,
  },
  {
    id: 'p3',
    tripId: 'goa',
    item: 'Scooter Rental License & Insurance Copy',
    group: 'Transit',
    done: true,
  },
  {
    id: 'p4',
    tripId: 'goa',
    item: 'Forex Travel Card + ₹5,000 Local Cash',
    group: 'Wallet',
    done: false,
  },
  {
    id: 'p5',
    tripId: 'goa',
    item: 'Reef-safe Sunscreen & Universal Adapter',
    group: 'Bag',
    done: false,
  },
];

export const INITIAL_VAULT_DOCS: VaultDocument[] = [
  {
    id: 'v1',
    tripId: 'goa',
    title: 'Passport & Gov ID Scan',
    type: 'Passport',
    status: 'Approved',
    offlineReady: true,
  },
  {
    id: 'v2',
    tripId: 'goa',
    title: 'IndiGo 6E-418 Boarding Pass',
    type: 'Boarding Pass',
    status: 'Approved',
    offlineReady: true,
  },
  {
    id: 'v3',
    tripId: 'goa',
    title: 'Assagao Villa Check-in Voucher',
    type: 'Booking PDF',
    status: 'Approved',
    offlineReady: true,
  },
  {
    id: 'v4',
    tripId: 'manali',
    title: 'Rohtang / Solang Snow Permit & ID',
    type: 'Visa / Permit',
    status: 'To do',
    offlineReady: false,
  },
];

export const INITIAL_ITINERARY: ItineraryStop[] = [
  {
    id: 'it-1',
    day: 1,
    time: '13:30',
    title: 'Land at Mopa (GOX) & pick up scooter',
    area: 'North Goa',
    done: true,
  },
  {
    id: 'it-2',
    day: 1,
    time: '17:45',
    title: 'Golden-hour cliff walk at Chapora Fort',
    area: 'Vagator',
    done: false,
  },
  {
    id: 'it-3',
    day: 2,
    time: '09:30',
    title: 'Slow pour-over breakfast in Assagao',
    area: 'Assagao',
    done: false,
  },
  {
    id: 'it-4',
    day: 2,
    time: '15:00',
    title: 'Fontainhas Latin Quarter heritage walk',
    area: 'Panjim',
    done: false,
  },
  {
    id: 'it-5',
    day: 3,
    time: '08:00',
    title: 'Early swim at Ashwem Beach before checkout',
    area: 'Ashwem',
    done: false,
  },
];

export const INITIAL_SAVED_PLACES: SavedPlace[] = [
  {
    id: 'sp-1',
    name: 'Baba Au Rhum Bakery',
    area: 'Anjuna',
    tag: 'Food & Coffee',
    estCost: 900,
  },
  {
    id: 'sp-2',
    name: 'Arambol Sweet Water Lake',
    area: 'Arambol',
    tag: 'Beaches & Views',
    estCost: 0,
  },
  {
    id: 'sp-3',
    name: 'Museum of Goa (MOG)',
    area: 'Pilerne',
    tag: 'Culture',
    estCost: 300,
  },
];

export const ALL_PAYMENT_RAILS: PaymentRail[] = [
  'UPI / Bank Transfer',
  'Primary Credit Card',
  'Forex Travel Card',
  'Local Cash Notes',
  'Apple / Google Pay',
];

export function formatReadinessBar(percent: number): string {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const filled = Math.round(clamped / 10);
  return '■'.repeat(filled) + '□'.repeat(10 - filled);
}

export function computeTravelTelemetry(
  trips: TravelTrip[],
  expenses: TravelExpense[],
  packingItems: PackingItem[],
  vaultDocs: VaultDocument[]
) {
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const docsAtRisk = vaultDocs.filter((d) => d.status !== 'Approved').length;

  const goaPacking = packingItems.filter((p) => p.tripId === 'goa');
  const goaPackedCount = goaPacking.filter((p) => p.done).length;
  const goaReadinessPct =
    goaPacking.length === 0
      ? 0
      : Math.round((goaPackedCount / goaPacking.length) * 100);

  const byCategory: Record<ExpenseCategory, number> = {
    Travel: 0,
    Stay: 0,
    Other: 0,
  };
  for (const exp of expenses) {
    byCategory[exp.category] += exp.amount;
  }

  const byRail = ALL_PAYMENT_RAILS.map((rail) => {
    const amount = expenses
      .filter((e) => e.rail === rail)
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      rail,
      amount,
      pct: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
    };
  });

  const goaSpent = expenses
    .filter((e) => e.tripId === 'goa')
    .reduce((sum, e) => sum + e.amount, 0);
  const goaTrip = trips.find((t) => t.id === 'goa');
  const goaRatio = goaTrip && goaTrip.budget > 0 ? goaSpent / goaTrip.budget : 0;
  const goaBudgetHealth: 'On track' | 'Watch' | 'Over budget' =
    goaRatio > 1 ? 'Over budget' : goaRatio >= 0.85 ? 'Watch' : 'On track';

  const manaliDocsPending = vaultDocs.some(
    (d) => d.tripId === 'manali' && d.status !== 'Approved'
  );

  return {
    activeTrips: trips.length,
    totalBudget,
    totalSpent,
    docsAtRisk,
    goaReadinessPct,
    goaReadinessBar: formatReadinessBar(goaReadinessPct),
    goaSpent,
    goaBudgetHealth,
    manaliVisaStatus: manaliDocsPending ? ('To do' as const) : ('Approved' as const),
    byCategory,
    byRail,
  };
}
