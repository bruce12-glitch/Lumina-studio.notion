import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeDopamineKpis,
  computeMoodFrequency,
  computeTravelTelemetry,
  formatReadinessBar,
  INITIAL_EXPENSES,
  INITIAL_PACKING_ITEMS,
  INITIAL_TRIPS,
  INITIAL_VAULT_DOCS,
  sortTopPicks,
  TOP_PICKS_ITEMS,
} from './dopamineAndTravelSpec';

test('Dopamine Menu pure KPI formulas match exact base screenshot metrics and update live on new orders', () => {
  const base = computeDopamineKpis([]);
  assert.equal(base.orders7d, 12);
  assert.equal(base.avgLift, 1.75);
  assert.equal(base.winRate, 0.8);
  assert.equal(base.swaps7d, 10);
  assert.equal(base.spend30d, 470);

  const afterOrder = computeDopamineKpis([
    {
      id: 'new-1',
      item: 'Make a proper coffee',
      course: 'Appetizer',
      mood: 'Bored',
      lift: 3,
      cost: 40,
      isSwap: true,
      isWin: true,
      loggedAt: 'Just now',
    },
  ]);
  assert.equal(afterOrder.orders7d, 13);
  assert.equal(afterOrder.swaps7d, 11);
  assert.equal(afterOrder.spend30d, 510);
  assert.ok(afterOrder.avgLift > base.avgLift);

  const sortedByMins = sortTopPicks(TOP_PICKS_ITEMS, 'minutes');
  assert.equal(sortedByMins[0].item, 'One song, eyes closed');
  assert.equal(sortedByMins[0].mins, 3);

  const freq = computeMoodFrequency([
    {
      id: 'new-1',
      item: 'Walk around the block',
      course: 'Appetizer',
      mood: 'Bored',
      lift: 2,
      cost: 0,
      isSwap: true,
      isWin: true,
      loggedAt: 'Just now',
    },
  ]);
  assert.equal(freq[0].mood, 'Bored');
  assert.equal(freq[0].count, 10);
});

test('Travel Planner pure telemetry matches exact base spend, rails, readiness bar, and vault doc risk', () => {
  const base = computeTravelTelemetry(
    INITIAL_TRIPS,
    INITIAL_EXPENSES,
    INITIAL_PACKING_ITEMS,
    INITIAL_VAULT_DOCS
  );

  assert.equal(base.activeTrips, 2);
  assert.equal(base.totalBudget, 65000);
  assert.equal(base.totalSpent, 16150);
  assert.equal(base.docsAtRisk, 1);
  assert.equal(base.goaReadinessPct, 60);
  assert.equal(base.goaReadinessBar, '■■■■■■□□□□');
  assert.equal(base.byCategory.Travel, 12600);
  assert.equal(base.byCategory.Stay, 2900);
  assert.equal(base.byCategory.Other, 650);
  assert.equal(base.goaBudgetHealth, 'On track');
  assert.equal(base.manaliVisaStatus, 'To do');

  const upiRail = base.byRail.find((r) => r.rail === 'UPI / Bank Transfer');
  const cardRail = base.byRail.find((r) => r.rail === 'Primary Credit Card');
  assert.equal(upiRail?.amount, 8400);
  assert.equal(cardRail?.amount, 5250);

  // Checking off packing item updates readiness 60% -> 80%
  const updatedPacking = INITIAL_PACKING_ITEMS.map((item) =>
    item.id === 'p4' ? { ...item, done: true } : item
  );
  // Approving Manali permit drops docsAtRisk 1 -> 0
  const updatedVault = INITIAL_VAULT_DOCS.map((doc) =>
    doc.id === 'v4' ? { ...doc, status: 'Approved' as const } : doc
  );
  // Logging a big ₹10,000 Stay expense pushes Goa spend above ₹25,000 budget
  const updatedExpenses = [
    ...INITIAL_EXPENSES,
    {
      id: 'exp-extra',
      tripId: 'goa' as const,
      title: 'Extra Resort Nights',
      category: 'Stay' as const,
      rail: 'Primary Credit Card' as const,
      amount: 10000,
      date: 'Nov 23',
    },
  ];

  const after = computeTravelTelemetry(
    INITIAL_TRIPS,
    updatedExpenses,
    updatedPacking,
    updatedVault
  );
  assert.equal(after.goaReadinessPct, 80);
  assert.equal(after.goaReadinessBar, formatReadinessBar(80));
  assert.equal(after.docsAtRisk, 0);
  assert.equal(after.manaliVisaStatus, 'Approved');
  assert.equal(after.totalSpent, 26150);
  assert.equal(after.goaBudgetHealth, 'Over budget');
});
