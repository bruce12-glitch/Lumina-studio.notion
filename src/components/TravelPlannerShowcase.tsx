import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  Compass,
  Luggage,
  MapPin,
  PieChart,
  Plane,
  Plus,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import {
  ALL_PAYMENT_RAILS,
  computeTravelTelemetry,
  ExpenseCategory,
  INITIAL_EXPENSES,
  INITIAL_ITINERARY,
  INITIAL_PACKING_ITEMS,
  INITIAL_SAVED_PLACES,
  INITIAL_TRIPS,
  INITIAL_VAULT_DOCS,
  ItineraryStop,
  PackingItem,
  PaymentRail,
  TravelExpense,
  TravelTabId,
  VaultDocument,
} from '../data/dopamineAndTravelSpec';

export type { TravelTabId };

interface TravelPlannerShowcaseProps {
  activeTab?: TravelTabId;
  onTabChange?: (tab: TravelTabId) => void;
  isOwned?: boolean;
  onOpenBuy?: () => void;
  priceLabel?: string;
}

export const TravelPlannerShowcase: React.FC<TravelPlannerShowcaseProps> = ({
  activeTab: controlledTab,
  onTabChange,
  isOwned = false,
  onOpenBuy,
  priceLabel = 'Duplicate Free',
}) => {
  const [internalTab, setInternalTab] = useState<TravelTabId>('control-tower');
  const activeTab = controlledTab ?? internalTab;
  const setActiveTab = (tab: TravelTabId) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const [tripFilter, setTripFilter] = useState<'all' | 'goa' | 'manali'>('all');
  const [expenses, setExpenses] = useState<TravelExpense[]>(INITIAL_EXPENSES);
  const [packingItems, setPackingItems] = useState<PackingItem[]>(
    INITIAL_PACKING_ITEMS
  );
  const [vaultDocs, setVaultDocs] = useState<VaultDocument[]>(INITIAL_VAULT_DOCS);
  const [itinerary, setItinerary] = useState<ItineraryStop[]>(INITIAL_ITINERARY);
  const [addedPlaceIds, setAddedPlaceIds] = useState<Record<string, boolean>>({});

  // Quick expense form state
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState<ExpenseCategory>('Other');
  const [expRail, setExpRail] = useState<PaymentRail>('UPI / Bank Transfer');
  const [expError, setExpError] = useState<string | null>(null);

  const telemetry = useMemo(
    () =>
      computeTravelTelemetry(
        INITIAL_TRIPS,
        expenses,
        packingItems,
        vaultDocs
      ),
    [expenses, packingItems, vaultDocs]
  );

  const hasCustomChanges =
    expenses.length !== INITIAL_EXPENSES.length ||
    vaultDocs.some((d, i) => d.status !== INITIAL_VAULT_DOCS[i]?.status) ||
    packingItems.some((p, i) => p.done !== INITIAL_PACKING_ITEMS[i]?.done) ||
    Object.keys(addedPlaceIds).length > 0;

  const handleResetDemo = () => {
    setExpenses(INITIAL_EXPENSES);
    setPackingItems(INITIAL_PACKING_ITEMS);
    setVaultDocs(INITIAL_VAULT_DOCS);
    setItinerary(INITIAL_ITINERARY);
    setAddedPlaceIds({});
    setExpError(null);
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = expTitle.trim();
    const parsedAmount = Number(expAmount);
    if (trimmed.length < 2) {
      setExpError('Enter an expense description (at least 2 characters).');
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setExpError('Enter a positive ₹ amount.');
      return;
    }
    setExpError(null);
    setExpenses((prev) => [
      {
        id: `exp-${Date.now()}`,
        tripId: 'goa',
        title: trimmed,
        category: expCategory,
        rail: expRail,
        amount: Math.round(parsedAmount),
        date: 'Nov 22',
      },
      ...prev,
    ]);
    setExpTitle('');
    setExpAmount('');
  };

  const togglePacking = (id: string) => {
    setPackingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const toggleVaultStatus = (id: string) => {
    setVaultDocs((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              status: doc.status === 'Approved' ? 'To do' : 'Approved',
              offlineReady: doc.status !== 'Approved',
            }
          : doc
      )
    );
  };

  const toggleStopDone = (id: string) => {
    setItinerary((prev) =>
      prev.map((stop) => (stop.id === id ? { ...stop, done: !stop.done } : stop))
    );
  };

  const addSavedPlaceToDay2 = (place: (typeof INITIAL_SAVED_PLACES)[number]) => {
    if (addedPlaceIds[place.id]) return;
    setAddedPlaceIds((prev) => ({ ...prev, [place.id]: true }));
    setItinerary((prev) => [
      ...prev,
      {
        id: `it-place-${place.id}`,
        day: 2,
        time: '18:30',
        title: place.name,
        area: place.area,
        done: false,
      },
    ]);
  };

  // Dynamic SVG Donut math
  const r = 42;
  const c = 2 * Math.PI * r;
  const totalForChart = Math.max(1, telemetry.totalSpent);
  const travelArc = c * (telemetry.byCategory.Travel / totalForChart);
  const stayArc = c * (telemetry.byCategory.Stay / totalForChart);
  const otherArc = c * (telemetry.byCategory.Other / totalForChart);

  const visibleTrips = INITIAL_TRIPS.filter(
    (t) => tripFilter === 'all' || t.id === tripFilter
  );

  return (
    <div
      data-testid="travel-planner-showcase"
      className="rounded-[18px] bg-white border border-[#E9E9E7] shadow-[0_14px_38px_-18px_rgba(55,53,47,0.10)] overflow-hidden"
    >
      {/* Notion Window Chrome */}
      <div className="px-4 sm:px-6 py-3 bg-[#F7F6F3] border-b border-[#E9E9E7] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-[#37352F]">
          <Plane className="w-4 h-4 text-[#0F7B6C]" />
          <span>Travel Planner</span>
          <span className="hidden sm:inline font-mono text-[11.5px] font-normal text-[#6E6D68]">
            · 6 linked DBs · Trips · Itinerary · Places · Packing · Vault · Wallet
          </span>
        </div>
        <div className="flex items-center gap-3">
          {hasCustomChanges && (
            <button
              type="button"
              onClick={handleResetDemo}
              className="text-[12px] font-medium text-[#6E6D68] hover:text-[#37352F] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset demo</span>
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

      {/* Exact 4-KPI Editorial Strip from Notion */}
      <div className="px-4 sm:px-7 pt-5 pb-5 border-b border-[#F1F1EF] space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="font-display text-[22px] font-bold tracking-[-0.02em] text-[#37352F]">
              Travel Planner
            </p>
            <p className="text-[12px] text-[#6E6D68]">
              ← Return to Resonance Studio Operating System
            </p>
          </div>
          <p className="text-[12px] text-[#6E6D68]">
            Log expenses, pack bags, or approve permits to watch KPIs update live
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
          {[
            {
              id: 'trips',
              pill: 'KPI · Active Trips',
              sub: 'Count all',
              val: String(telemetry.activeTrips),
            },
            {
              id: 'budget',
              pill: 'KPI · Budget',
              sub: 'Sum of Budget (₹)',
              val: telemetry.totalBudget.toLocaleString('en-IN'),
            },
            {
              id: 'spent',
              pill: 'KPI · Spent',
              sub: 'Total Logged (₹)',
              val: telemetry.totalSpent.toLocaleString('en-IN'),
            },
            {
              id: 'docs',
              pill: 'KPI · Docs at Risk',
              sub: 'Visa / IDs To Do',
              val: String(telemetry.docsAtRisk),
            },
          ].map((kpi) => (
            <div
              key={kpi.pill}
              data-testid={`travel-kpi-${kpi.id}`}
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
          aria-label="Travel Planner views"
          className="flex items-center gap-1.5 pb-3 min-w-max"
        >
          {[
            {
              id: 'control-tower' as const,
              label: 'Trips & Control Tower',
              icon: <Compass className="w-3.5 h-3.5 text-[#0F7B6C]" />,
            },
            {
              id: 'wallet' as const,
              label: 'Wallet & Spend Charts',
              icon: <PieChart className="w-3.5 h-3.5 text-[#2383E2]" />,
            },
            {
              id: 'timeline' as const,
              label: 'Trip Timeline',
              icon: <Calendar className="w-3.5 h-3.5 text-[#D9730D]" />,
            },
            {
              id: 'packing' as const,
              label: 'Packing & Vault',
              icon: <Luggage className="w-3.5 h-3.5 text-[#6940A5]" />,
            },
            {
              id: 'itinerary' as const,
              label: 'Day Plans & Places',
              icon: <MapPin className="w-3.5 h-3.5 text-[#C43B3B]" />,
            },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                data-testid={`travel-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-[8px] text-[12.5px] font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#F1F1EF] text-[#37352F] border border-[#E2E1DC]'
                    : 'text-[#6E6D68] hover:text-[#37352F] hover:bg-[#FAF9F6] border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active View Stage */}
      <div className="p-4 sm:p-7">
        {activeTab === 'control-tower' && (
          <div className="space-y-5">
            {/* Trip Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {(
                  [
                    { id: 'all', label: 'All Trips (2)' },
                    { id: 'goa', label: 'Goa · November' },
                    { id: 'manali', label: 'Manali · March' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTripFilter(opt.id)}
                    className={`px-2.5 py-1 rounded-[7px] text-[12px] font-semibold transition-colors cursor-pointer ${
                      tripFilter === opt.id
                        ? 'bg-[#37352F] text-white'
                        : 'bg-[#FAF9F6] text-[#52504A] border border-[#E9E9E7] hover:text-[#37352F]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11.5px] text-[#6E6D68] tabular-nums">
                Goa spent: ₹{telemetry.goaSpent.toLocaleString('en-IN')} / ₹25,000
              </span>
            </div>

            {/* Trip Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleTrips.map((trip) => {
                const isGoa = trip.id === 'goa';
                const bar = isGoa ? telemetry.goaReadinessBar : '□□□□□□□□□□';
                const pct = isGoa ? `${telemetry.goaReadinessPct}%` : '0%';
                const health = isGoa ? telemetry.goaBudgetHealth : 'On track';
                const healthTone =
                  health === 'Over budget'
                    ? 'text-[#C43B3B]'
                    : health === 'Watch'
                    ? 'text-[#D9730D]'
                    : 'text-[#0F7B6C]';

                return (
                  <div
                    key={trip.id}
                    className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[15px] font-bold text-[#37352F]">
                        {trip.name}
                      </p>
                      <span
                        className={`font-mono text-[11.5px] font-semibold ${healthTone}`}
                      >
                        ● {health}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-[#52504A]">
                      {trip.destination} · {trip.dates} · {trip.countdown}
                    </p>
                    <p
                      data-testid={isGoa ? 'goa-readiness-bar' : undefined}
                      className="font-mono text-[12px] text-[#37352F] tabular-nums tracking-tight"
                    >
                      {bar} {pct}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Control Tower Table */}
            <div className="rounded-[12px] border border-[#E9E9E7] overflow-x-auto">
              <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E9E9E7] flex items-center justify-between text-[12px] font-semibold text-[#37352F]">
                <span>Control Tower</span>
                <span className="font-mono text-[11px] font-normal text-[#6E6D68]">
                  Live formula rollups
                </span>
              </div>
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-[#E9E9E7] text-[11px] font-mono text-[#6E6D68] bg-white">
                    <th className="py-2.5 px-4 font-semibold">Aa Trip</th>
                    <th className="py-2.5 px-3 font-semibold">Σ Countdown</th>
                    <th className="py-2.5 px-3 font-semibold">Σ Readiness Bar</th>
                    <th className="py-2.5 px-3 font-semibold">Σ Budget Health</th>
                    <th className="py-2.5 px-3 font-semibold">Visa / Permit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF] text-[12.5px]">
                  {visibleTrips.map((trip) => {
                    const isGoa = trip.id === 'goa';
                    const health = isGoa ? telemetry.goaBudgetHealth : 'On track';
                    const visa = isGoa ? 'Approved' : telemetry.manaliVisaStatus;
                    return (
                      <tr key={trip.id} className="bg-white">
                        <td className="py-2.5 px-4 font-semibold text-[#37352F]">
                          {trip.name}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[#37352F]">
                          {trip.countdown}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[#37352F] tabular-nums">
                          {isGoa
                            ? `${telemetry.goaReadinessBar} ${telemetry.goaReadinessPct}%`
                            : '□□□□□□□□□□ 0%'}
                        </td>
                        <td
                          className={`py-2.5 px-3 font-semibold ${
                            health === 'Over budget'
                              ? 'text-[#C43B3B]'
                              : health === 'Watch'
                              ? 'text-[#D9730D]'
                              : 'text-[#0F7B6C]'
                          }`}
                        >
                          ● {health}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11.5px] font-semibold ${
                              visa === 'Approved'
                                ? 'bg-[#EDF6F1] text-[#0F7B6C]'
                                : 'bg-[#FAF9F6] border border-[#E9E9E7] text-[#52504A]'
                            }`}
                          >
                            {visa}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Spend by Category Donut */}
              <div className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-5 flex flex-col items-center justify-between gap-4">
                <div className="w-full flex items-center justify-between text-[12.5px] font-semibold text-[#37352F]">
                  <span>Chart · Spend by Category</span>
                  <span className="font-mono text-[11px] text-[#6E6D68]">
                    Total Final ₹
                  </span>
                </div>

                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg viewBox="0 0 110 110" className="w-36 h-36 -rotate-90">
                    <circle
                      cx="55"
                      cy="55"
                      r={r}
                      fill="none"
                      stroke="#E9E9E7"
                      strokeWidth="12"
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r={r}
                      fill="none"
                      stroke="#52A87A"
                      strokeWidth="12"
                      strokeDasharray={`${travelArc} ${c}`}
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r={r}
                      fill="none"
                      stroke="#E4B85B"
                      strokeWidth="12"
                      strokeDasharray={`${stayArc} ${c}`}
                      strokeDashoffset={-travelArc}
                    />
                    <circle
                      cx="55"
                      cy="55"
                      r={r}
                      fill="none"
                      stroke="#5698E8"
                      strokeWidth="12"
                      strokeDasharray={`${otherArc} ${c}`}
                      strokeDashoffset={-(travelArc + stayArc)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-[19px] font-bold text-[#37352F] tabular-nums leading-none">
                      {telemetry.totalSpent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10.5px] text-[#6E6D68] mt-1">
                      Total Final ₹
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3.5 text-[12px] text-[#52504A] tabular-nums">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#52A87A]" />
                    Travel (₹{telemetry.byCategory.Travel.toLocaleString('en-IN')})
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#E4B85B]" />
                    Stay (₹{telemetry.byCategory.Stay.toLocaleString('en-IN')})
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#5698E8]" />
                    Other (₹{telemetry.byCategory.Other.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>

              {/* Payment Rails Bar Chart */}
              <div className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-5 space-y-4">
                <div className="flex items-center justify-between text-[12.5px] font-semibold text-[#37352F]">
                  <span>Chart · Payment Rails</span>
                  <span className="font-mono text-[11px] text-[#6E6D68]">
                    Spend by method
                  </span>
                </div>
                <div className="space-y-3">
                  {telemetry.byRail.map((rItem) => (
                    <div key={rItem.rail} className="space-y-1">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#37352F] font-medium">
                          {rItem.rail}
                        </span>
                        <span className="font-mono text-[#52504A] tabular-nums">
                          ₹{rItem.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[#ECEBE7] overflow-hidden">
                        <div
                          style={{ width: `${rItem.pct}%` }}
                          className="h-full rounded-full bg-[#BC8BE0] transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Expense Quick-Capture Row */}
            <form
              onSubmit={handleAddExpense}
              className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-4 space-y-2.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-end">
                <div className="sm:col-span-4 space-y-1">
                  <label
                    htmlFor="travel-exp-title"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Log trip expense
                  </label>
                  <input
                    id="travel-exp-title"
                    type="text"
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    placeholder="e.g., Sunset seafood dinner"
                    className="w-full h-9 px-3 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F] focus:outline-none focus:border-[#0F7B6C]"
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="travel-exp-cat"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Category
                  </label>
                  <select
                    id="travel-exp-cat"
                    value={expCategory}
                    onChange={(e) =>
                      setExpCategory(e.target.value as ExpenseCategory)
                    }
                    className="w-full h-9 px-2.5 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F]"
                  >
                    <option value="Travel">Travel</option>
                    <option value="Stay">Stay</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="travel-exp-rail"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Rail
                  </label>
                  <select
                    id="travel-exp-rail"
                    value={expRail}
                    onChange={(e) => setExpRail(e.target.value as PaymentRail)}
                    className="w-full h-9 px-2 rounded-[8px] bg-white border border-[#D3D1CB] text-[12.5px] text-[#37352F]"
                  >
                    {ALL_PAYMENT_RAILS.map((rail) => (
                      <option key={rail} value={rail}>
                        {rail}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <label
                    htmlFor="travel-exp-amt"
                    className="block text-[11.5px] font-semibold text-[#52504A]"
                  >
                    Amount (₹)
                  </label>
                  <input
                    id="travel-exp-amt"
                    type="number"
                    min="1"
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    placeholder="1200"
                    className="w-full h-9 px-3 rounded-[8px] bg-white border border-[#D3D1CB] text-[13px] text-[#37352F] tabular-nums"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-9 px-3 rounded-[8px] bg-[#37352F] hover:bg-[#2F2D28] text-white text-[12.5px] font-semibold inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
              {expError && (
                <p role="alert" className="text-[12px] font-medium text-[#C43B3B]">
                  {expError}
                </p>
              )}
            </form>

            {/* Expenses Ledger */}
            <div className="rounded-[12px] border border-[#E9E9E7] overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[560px]">
                <thead>
                  <tr className="bg-[#FAF9F6] border-b border-[#E9E9E7] text-[11px] font-mono text-[#6E6D68]">
                    <th className="py-2.5 px-4 font-semibold">Aa Expense</th>
                    <th className="py-2.5 px-3 font-semibold">Category</th>
                    <th className="py-2.5 px-3 font-semibold">Payment Rail</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F1EF] text-[12.5px]">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="bg-white hover:bg-[#FAF9F6]/70">
                      <td className="py-2.5 px-4 font-semibold text-[#37352F]">
                        {exp.title}
                      </td>
                      <td className="py-2.5 px-3 text-[#52504A]">{exp.category}</td>
                      <td className="py-2.5 px-3 text-[#6E6D68]">{exp.rail}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-semibold text-[#37352F] tabular-nums">
                        ₹{exp.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-5 space-y-4">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="font-semibold text-[#37352F]">
                Trip Timeline · November 2026
              </span>
              <span className="font-mono text-[11.5px] font-semibold text-[#E03E3E]">
                Today · Nov 22
              </span>
            </div>

            <div className="relative rounded-[10px] bg-white border border-[#E9E9E7] p-4 space-y-3 overflow-hidden">
              <div className="grid grid-cols-7 text-[11px] font-mono text-[#6E6D68] border-b border-[#F1F1EF] pb-2">
                <span>Nov 18</span>
                <span>Nov 20</span>
                <span className="font-bold text-[#E03E3E]">Nov 22</span>
                <span>Nov 24</span>
                <span>Nov 26</span>
                <span>Nov 28</span>
                <span>Nov 30</span>
              </div>

              <div className="relative py-2 space-y-2.5">
                <div
                  aria-hidden="true"
                  style={{ left: '34%' }}
                  className="absolute top-0 bottom-0 w-[1.5px] bg-[#E03E3E]"
                />
                <div className="ml-[28%] w-[48%] rounded-[8px] bg-[#FAF9F6] border border-[#E2E1DC] px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 relative z-10 shadow-xs">
                  <span className="text-[13px] font-semibold text-[#37352F]">
                    Goa · November · Today
                  </span>
                  <span className="font-mono text-[11.5px] text-[#0F7B6C] font-semibold tabular-nums">
                    {telemetry.goaReadinessBar} {telemetry.goaReadinessPct}%
                  </span>
                </div>
                <div className="ml-[64%] w-[34%] rounded-[8px] bg-white border border-dashed border-[#D3D1CB] px-3 py-2 flex items-center justify-between gap-2 relative z-10 text-[12px] text-[#6E6D68]">
                  <span className="font-medium text-[#37352F]">
                    Manali · Mar 10 →
                  </span>
                  <span className="font-mono text-[11px]">
                    {telemetry.manaliVisaStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packing' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Packing Checklist */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
                <span>Goa Packing List (updates Readiness Bar live)</span>
                <span className="font-mono font-semibold text-[#0F7B6C] tabular-nums">
                  {telemetry.goaReadinessPct}% ready
                </span>
              </div>
              <div className="divide-y divide-[#F1F1EF] border border-[#E9E9E7] rounded-[12px] overflow-hidden">
                {packingItems.map((item) => (
                  <label
                    key={item.id}
                    className="w-full px-4 py-3 bg-white hover:bg-[#FAF9F6] flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => togglePacking(item.id)}
                        className="w-4 h-4 accent-[#0F7B6C] rounded cursor-pointer shrink-0"
                      />
                      <span
                        className={`text-[13.5px] font-medium truncate ${
                          item.done
                            ? 'line-through text-[#9B9A97]'
                            : 'text-[#37352F]'
                        }`}
                      >
                        {item.item}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#6E6D68] shrink-0">
                      {item.group}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Offline Document Vault */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
                <span>Offline Document Vault</span>
                <span className="font-mono font-semibold text-[#37352F] tabular-nums">
                  {telemetry.docsAtRisk} at risk
                </span>
              </div>
              <div className="space-y-2.5">
                {vaultDocs.map((doc) => {
                  const approved = doc.status === 'Approved';
                  return (
                    <div
                      key={doc.id}
                      className="rounded-[12px] bg-[#FAF9F6] border border-[#E9E9E7] p-3.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-[#37352F] truncate">
                          {doc.title}
                        </p>
                        <p className="text-[11.5px] text-[#6E6D68]">
                          {doc.type} · {doc.tripId === 'goa' ? 'Goa' : 'Manali'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleVaultStatus(doc.id)}
                        className={`px-2.5 py-1 rounded-[7px] text-[11.5px] font-semibold shrink-0 transition-colors cursor-pointer ${
                          approved
                            ? 'bg-[#EDF6F1] text-[#0F7B6C]'
                            : 'bg-[#37352F] text-white hover:bg-[#2F2D28]'
                        }`}
                      >
                        {approved ? 'Approved ✓' : 'Mark Approved'}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-[10px] bg-[#EDF6F1] border border-[#D7EBDF] px-3.5 py-2.5 flex items-center gap-2 text-[12px] text-[#0F7B6C] font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  Passports, visas, boarding passes &amp; emergency contacts stored offline.
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Day-by-Day Itinerary */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
                <span>Goa · Day-by-Day Plan (check off completed stops)</span>
                <span className="font-mono tabular-nums">
                  {itinerary.length} stops
                </span>
              </div>
              <div className="space-y-3">
                {([1, 2, 3] as const).map((dayNum) => {
                  const dayStops = itinerary.filter((s) => s.day === dayNum);
                  return (
                    <div
                      key={dayNum}
                      className="rounded-[12px] border border-[#E9E9E7] bg-[#FAF9F6] p-3.5 space-y-2"
                    >
                      <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[#52504A]">
                        Day 0{dayNum}
                      </p>
                      <div className="space-y-1.5">
                        {dayStops.map((stop) => (
                          <button
                            key={stop.id}
                            type="button"
                            onClick={() => toggleStopDone(stop.id)}
                            className="w-full rounded-[9px] bg-white border border-[#E9E9E7] hover:border-[#0F7B6C] px-3 py-2 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span
                                className={`w-4 h-4 rounded-[4px] border inline-flex items-center justify-center shrink-0 ${
                                  stop.done
                                    ? 'bg-[#0F7B6C] border-[#0F7B6C] text-white'
                                    : 'border-[#C7C5BE] bg-white'
                                }`}
                              >
                                {stop.done && (
                                  <Check className="w-3 h-3 stroke-[2.8]" />
                                )}
                              </span>
                              <span className="font-mono text-[11.5px] text-[#6E6D68] shrink-0">
                                {stop.time}
                              </span>
                              <span
                                className={`text-[13px] font-medium truncate ${
                                  stop.done
                                    ? 'line-through text-[#9B9A97]'
                                    : 'text-[#37352F]'
                                }`}
                              >
                                {stop.title}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#6E6D68] shrink-0">
                              {stop.area}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Linked Saved Places */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-[12px] text-[#6E6D68]">
                <span>Saved Places · Click to pin onto Day 2</span>
                <span className="font-mono tabular-nums">
                  {INITIAL_SAVED_PLACES.length} pins
                </span>
              </div>
              <div className="space-y-2.5">
                {INITIAL_SAVED_PLACES.map((place) => {
                  const added = !!addedPlaceIds[place.id];
                  return (
                    <div
                      key={place.id}
                      className="rounded-[12px] bg-white border border-[#E9E9E7] p-3.5 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[13.5px] font-semibold text-[#37352F]">
                            {place.name}
                          </p>
                          <p className="text-[11.5px] text-[#6E6D68]">
                            {place.area} · {place.tag} ·{' '}
                            {place.estCost === 0
                              ? 'Free'
                              : `Est. ₹${place.estCost}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          disabled={added}
                          onClick={() => addSavedPlaceToDay2(place)}
                          className={`px-2.5 py-1 rounded-[7px] text-[11.5px] font-semibold shrink-0 transition-colors ${
                            added
                              ? 'bg-[#EDF6F1] text-[#0F7B6C] cursor-default'
                              : 'bg-[#FAF9F6] border border-[#D3D1CB] text-[#37352F] hover:bg-[#37352F] hover:text-white cursor-pointer'
                          }`}
                        >
                          {added ? 'On Day 2 ✓' : '+ Add to Day 2'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
