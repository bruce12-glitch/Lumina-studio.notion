import test from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLATES, FAQ_ITEMS, APPS } from '../data/catalog';
import { TEMPLATE_HOOKS, getTemplateHook } from '../data/templateHooks';
import {
  buildWhatsInsideSummary,
  filterOsDatabases,
  filterOsModules,
  getOsSpecSummaryCounts,
  validateOsSpecIntegrity,
} from '../data/osSpecTypes';
import { STUDENT_OS_SPEC } from '../data/studentOsSpec';
import { RESEARCHER_OS_SPEC } from '../data/researcherOsSpec';
import {
  filterNexusProjects,
  filterNexusTasks,
  INITIAL_NEXUS_PROJECTS,
  INITIAL_NEXUS_TASKS,
  NEXUS_OS_SPEC,
} from '../data/nexusOsSpec';
import {
  BOOK_TRACKER_OS_SPEC,
  computeLibraryKpis,
  computeQueueScore,
  computeReadingSignal,
  INITIAL_BOOKS,
} from '../data/bookTrackerOsSpec';
import {
  calculateDiscountedPrice,
  filterTemplates,
  formatPrice,
  generateDeliveryPackage,
  getCategoryCounts,
  getProTemplatesTotalValue,
  isProTemplate,
  validateAuthForm,
  validateCheckoutInput,
  validateCustomBrief,
} from './storeLogic';

test('catalog integrity matches Resonance specification (43 items, 22 free, 21 PRO, exact category counts)', () => {
  assert.equal(TEMPLATES.length, 43);

  const freeItems = TEMPLATES.filter((t) => !t.pro);
  const proItems = TEMPLATES.filter((t) => t.pro);
  assert.equal(freeItems.length, 22);
  assert.equal(proItems.length, 21);

  // Every item satisfies pro <=> price > 0
  for (const item of TEMPLATES) {
    assert.equal(item.pro, isProTemplate(item.price));
  }

  // Second Brain is the only sale item ($79 -> $39)
  const saleItems = TEMPLATES.filter((t) => t.compareAt !== undefined);
  assert.equal(saleItems.length, 1);
  assert.equal(saleItems[0].name, 'Second Brain');
  assert.equal(saleItems[0].price, 39);
  assert.equal(saleItems[0].compareAt, 79);

  // Exact category counts: All 43, Health & Fitness 9, Personal Productivity 14, Business 5, School 7, Finance 6, Travel 2
  const counts = getCategoryCounts(TEMPLATES);
  assert.equal(counts['All'], 43);
  assert.equal(counts['Health & Fitness'], 9);
  assert.equal(counts['Personal Productivity'], 14);
  assert.equal(counts['Business'], 5);
  assert.equal(counts['School'], 7);
  assert.equal(counts['Finance'], 6);
  assert.equal(counts['Travel'], 2);

  // Flagship OS systems must exist with exact DB counts
  const studentOs = TEMPLATES.find((t) => t.slug === 'student-os');
  const researcherOs = TEMPLATES.find((t) => t.slug === 'researcher-os');
  const nexusOs = TEMPLATES.find((t) => t.slug === 'nexus-os');
  const bookTrackerOs = TEMPLATES.find((t) => t.slug === 'book-tracker-os');
  assert.ok(studentOs);
  assert.ok(researcherOs);
  assert.ok(nexusOs);
  assert.ok(bookTrackerOs);
  assert.equal(studentOs.databaseCount, 12);
  assert.equal(researcherOs.databaseCount, 14);
  assert.equal(nexusOs.databaseCount, 15);
  assert.equal(bookTrackerOs.databaseCount, 8);

  // FAQ & Apps count
  assert.equal(FAQ_ITEMS.length, 6);
  assert.equal(APPS.length, 4);
});

test('filterTemplates filters accurately by category and search query', () => {
  const finance = filterTemplates(TEMPLATES, 'Finance');
  assert.equal(finance.length, 6);

  const school = filterTemplates(TEMPLATES, 'School');
  assert.equal(school.length, 7);

  const travel = filterTemplates(TEMPLATES, 'Travel');
  assert.equal(travel.length, 2);

  const searchBrain = filterTemplates(TEMPLATES, 'All', 'Second Brain');
  assert.equal(searchBrain.length, 1);
  assert.equal(searchBrain[0].slug, 'second-brain');

  const searchResearcher = filterTemplates(TEMPLATES, 'School', 'Researcher OS');
  assert.equal(searchResearcher.length, 1);
  assert.equal(searchResearcher[0].slug, 'researcher-os');

  const searchNexus = filterTemplates(TEMPLATES, 'Personal Productivity', 'Nexus OS');
  assert.equal(searchNexus.length, 1);
  assert.equal(searchNexus[0].slug, 'nexus-os');

  const searchBooks = filterTemplates(TEMPLATES, 'School', 'Book Tracker OS');
  assert.equal(searchBooks.length, 1);
  assert.equal(searchBooks[0].slug, 'book-tracker-os');
});

test('formatPrice and calculateDiscountedPrice handle $0 and promo codes properly', () => {
  assert.equal(formatPrice(0), '$0');
  assert.equal(formatPrice(39), '$39');

  const halfOff = calculateDiscountedPrice(39, 'ORGANIZE2026');
  assert.equal(halfOff.finalPrice, 19.5);
  assert.equal(halfOff.appliedCode, 'ORGANIZE2026');

  const freeItem = calculateDiscountedPrice(0, 'ORGANIZE2026');
  assert.equal(freeItem.finalPrice, 0);
  assert.equal(freeItem.appliedCode, null);
});

test('validateCheckoutInput and generateDeliveryPackage validate and provision digital downloads', () => {
  // Free template only requires valid email
  const freeCheck = validateCheckoutInput({
    email: 'alex@example.com',
    provider: 'stripe',
    price: 0,
  });
  assert.equal(freeCheck.valid, true);

  // Paid template requires valid card details
  const paidInvalid = validateCheckoutInput({
    email: 'alex@example.com',
    provider: 'lemonsqueezy',
    price: 39,
    cardNumber: '123',
    expiry: 'invalid',
    cvc: '1',
  });
  assert.equal(paidInvalid.valid, false);
  assert.ok(paidInvalid.errors.cardNumber);
  assert.ok(paidInvalid.errors.expiry);
  assert.ok(paidInvalid.errors.cvc);

  const paidValid = validateCheckoutInput({
    email: 'alex@example.com',
    provider: 'stripe',
    price: 39,
    cardNumber: '4242424242424242',
    expiry: '12/28',
    cvc: '424',
  });
  assert.equal(paidValid.valid, true);

  const pkg = generateDeliveryPackage({
    itemName: 'Second Brain',
    itemSlug: 'second-brain',
    price: 39,
    provider: 'stripe',
    customerEmail: 'alex@example.com',
  });
  assert.ok(pkg.licenseKey.startsWith('RESONANCE-PRO-'));
  assert.ok(pkg.notionDuplicateUrl.includes('second-brain'));
  assert.ok(pkg.circleCommunityInviteUrl);
});

test('validateAuthForm and getProTemplatesTotalValue', () => {
  const badAuth = validateAuthForm('not-an-email', '123', false);
  assert.equal(badAuth.valid, false);
  assert.ok(badAuth.errors.email);
  assert.ok(badAuth.errors.password);

  const goodAuth = validateAuthForm('creator@resonance.co', 'minimalism2026', true);
  assert.equal(goodAuth.valid, true);

  const bundle = getProTemplatesTotalValue();
  assert.equal(bundle.proCount, 21);
  assert.equal(bundle.allAccessPrice, 99);
  assert.ok(bundle.individualTotal > 99);
});

test('testimonials include 4 attributable reviews linked to valid catalog templates', async () => {
  const { TESTIMONIALS, BLUSH_ASSETS } = await import('../data/catalog');
  assert.equal(TESTIMONIALS.length, 4);
  const testimonialAssets = new Set(TESTIMONIALS.map((r) => r.illustrationUrl));
  assert.equal(testimonialAssets.size, 4, 'All 4 testimonials must use distinct Blush assets');
  const testimonialAvatars = new Set(TESTIMONIALS.map((r) => r.avatarUrl));
  assert.equal(testimonialAvatars.size, 4, 'All 4 testimonials must use distinct creator portrait photos');
  for (const rev of TESTIMONIALS) {
    assert.ok(rev.author.length > 0);
    assert.ok(rev.role.length > 0);
    assert.ok(rev.organization.length > 0);
    assert.ok(rev.avatarUrl.length > 0);
    assert.ok(rev.quote.length > 40);
    assert.ok(rev.surfaceTint.startsWith('#'));
    const linkedTemplate = TEMPLATES.find((t) => t.slug === rev.templateSlug);
    assert.ok(linkedTemplate, `Testimonial should link to valid template ${rev.templateSlug}`);
  }

  // Verify all 30 copyright-free Ultra-HD assets exist and have unique paths
  const assetUrls = Object.values(BLUSH_ASSETS);
  assert.equal(assetUrls.length, 30);
  assert.equal(new Set(assetUrls).size, 30, 'All 30 BLUSH_ASSETS URLs must be unique');

  // Verify all 4 Apps by Resonance have distinct illustrations
  const appAssets = new Set(APPS.map((a) => a.illustrationUrl));
  assert.equal(appAssets.size, 4, 'All 4 Apps by Resonance must use distinct illustrations');

  // Verify the first 30 templates use 30 completely unique illustrations and no two adjacent templates share an asset
  const first30Assets = new Set(TEMPLATES.slice(0, 30).map((t) => t.illustrationUrl));
  assert.equal(first30Assets.size, 30, 'First 30 templates must use all 30 distinct copyright-free illustrations');
  for (let i = 1; i < TEMPLATES.length; i++) {
    assert.notEqual(
      TEMPLATES[i].illustrationUrl,
      TEMPLATES[i - 1].illustrationUrl,
      `Adjacent templates ${TEMPLATES[i - 1].name} and ${TEMPLATES[i].name} must not share the same asset`
    );
  }
});

test('Student OS and Researcher OS specification integrity and filters work deterministically', () => {
  assert.equal(validateOsSpecIntegrity(STUDENT_OS_SPEC), true);
  assert.equal(validateOsSpecIntegrity(RESEARCHER_OS_SPEC), true);

  const studentCounts = getOsSpecSummaryCounts(STUDENT_OS_SPEC);
  assert.equal(studentCounts.modulesCount, 11);
  assert.equal(studentCounts.databasesCount, 12);
  assert.equal(studentCounts.templatesCount, 8);
  assert.ok(studentCounts.totalViewsCount >= 22);

  const researcherCounts = getOsSpecSummaryCounts(RESEARCHER_OS_SPEC);
  assert.equal(researcherCounts.modulesCount, 12);
  assert.equal(researcherCounts.databasesCount, 14);
  assert.equal(researcherCounts.templatesCount, 8);
  assert.ok(researcherCounts.totalViewsCount >= 24);

  const filteredGpa = filterOsModules(STUDENT_OS_SPEC.modules, 'All', 'GPA');
  assert.equal(filteredGpa.length, 1);
  assert.equal(filteredGpa[0].id, 'gpa-grades');

  const filteredProtocols = filterOsDatabases(RESEARCHER_OS_SPEC.databases, 'Protocol');
  assert.ok(filteredProtocols.length >= 2);

  const studentInside = buildWhatsInsideSummary(STUDENT_OS_SPEC);
  const researcherInside = buildWhatsInsideSummary(RESEARCHER_OS_SPEC);
  assert.equal(studentInside.length, 6);
  assert.equal(researcherInside.length, 6);
  assert.ok(studentInside[1].includes('12 interconnected databases'));
  assert.ok(researcherInside[1].includes('14 interconnected databases'));

  const studentCatalogEntry = TEMPLATES.find((t) => t.slug === 'student-os');
  const researcherCatalogEntry = TEMPLATES.find((t) => t.slug === 'researcher-os');
  assert.deepEqual(studentCatalogEntry?.whatsInside, studentInside);
  assert.deepEqual(researcherCatalogEntry?.whatsInside, researcherInside);
});

test('Nexus OS and Book Tracker OS specification integrity, filters, and Notion formulas match exact telemetry', () => {
  assert.equal(validateOsSpecIntegrity(NEXUS_OS_SPEC), true);
  assert.equal(validateOsSpecIntegrity(BOOK_TRACKER_OS_SPEC), true);

  const nexusCounts = getOsSpecSummaryCounts(NEXUS_OS_SPEC);
  assert.equal(nexusCounts.modulesCount, 10);
  assert.equal(nexusCounts.databasesCount, 15);
  assert.equal(nexusCounts.templatesCount, 8);

  const bookCounts = getOsSpecSummaryCounts(BOOK_TRACKER_OS_SPEC);
  assert.equal(bookCounts.modulesCount, 8);
  assert.equal(bookCounts.databasesCount, 8);
  assert.equal(bookCounts.templatesCount, 8);

  // Nexus OS pure filters
  const todayTasks = filterNexusTasks(INITIAL_NEXUS_TASKS, 'Today');
  assert.ok(todayTasks.length >= 3);
  const doneTasks = filterNexusTasks(INITIAL_NEXUS_TASKS, 'Done');
  assert.equal(doneTasks.length, 1);

  const activeProjects = filterNexusProjects(INITIAL_NEXUS_PROJECTS, 'Active');
  assert.equal(activeProjects.length, 4);
  const doneProjects = filterNexusProjects(INITIAL_NEXUS_PROJECTS, 'Done');
  assert.equal(doneProjects.length, 1);

  // Book Tracker OS pure KPI aggregation (matches real Notion screenshot telemetry)
  const kpis = computeLibraryKpis(INITIAL_BOOKS);
  assert.equal(kpis.booksFinished, 6);
  assert.equal(kpis.pagesFinished, 2379);
  assert.equal(kpis.hoursRead, 21.3);
  assert.equal(kpis.notesDue, 5);
  assert.equal(kpis.totalBooks, 15);

  // Book Tracker OS Σ Queue Score formula
  assert.equal(
    computeQueueScore({ stage: 'Next Up', priority: 'High', owned: true }),
    65
  );
  assert.equal(
    computeQueueScore({ stage: 'Next Up', priority: 'High', owned: false }),
    55
  );
  assert.equal(
    computeQueueScore({ stage: 'Want to Read', priority: 'Medium', owned: false }),
    20
  );
  assert.equal(
    computeQueueScore({ stage: 'Want to Read', priority: 'Low', owned: false }),
    10
  );

  // Book Tracker OS Σ Signal formula (Meditations = Stale, Norwegian Wood = On Track)
  const meditations = INITIAL_BOOKS.find((b) => b.title === 'Meditations')!;
  const norwegian = INITIAL_BOOKS.find((b) => b.title === 'Norwegian Wood')!;
  const medSig = computeReadingSignal(meditations);
  const norSig = computeReadingSignal(norwegian);
  assert.equal(medSig.signal, 'Stale');
  assert.equal(medSig.progressPct, 35);
  assert.equal(medSig.daysToFinish, 64);
  assert.equal(norSig.signal, 'On Track');
  assert.equal(norSig.progressPct, 47);

  // Catalog whatsInside parity
  const nexusCatalogEntry = TEMPLATES.find((t) => t.slug === 'nexus-os');
  const bookCatalogEntry = TEMPLATES.find((t) => t.slug === 'book-tracker-os');
  assert.deepEqual(
    nexusCatalogEntry?.whatsInside,
    buildWhatsInsideSummary(NEXUS_OS_SPEC)
  );
  assert.deepEqual(
    bookCatalogEntry?.whatsInside,
    buildWhatsInsideSummary(BOOK_TRACKER_OS_SPEC)
  );
});

test('all 43 templates have bespoke psychological hooks, Quick-Win bullets, plain-English inside breakdowns, and zero AI-slop clichés', () => {
  const BANNED_SLOP_PATTERNS = [
    /a clean .* notion template to track and organize/i,
    /\bpre-configured\b/i,
    /\bend-to-end\b/i,
    /\bzero-friction\b/i,
    /\bseamless(ly)?\b/i,
    /\bbattle-tested\b/i,
    /\ballergic to clutter\b/i,
    /\bcalm cockpit\b/i,
    /\bstreamline\b/i,
    /\bsupercharge\b/i,
    /\belevate\b/i,
    /\brevolutionize\b/i,
    /\bunleash\b/i,
    /\bempower\b/i,
    /\bgame-?changer\b/i,
    /\bdelve\b/i,
  ];

  assert.equal(Object.keys(TEMPLATE_HOOKS).length, TEMPLATES.length);
  const seenQuickWins = new Set<string>();

  for (const tpl of TEMPLATES) {
    assert.ok(
      tpl.slug in TEMPLATE_HOOKS,
      `Missing explicit hook profile in TEMPLATE_HOOKS for "${tpl.slug}"`
    );
    const hook = getTemplateHook(tpl.slug);

    assert.ok(
      hook.cardHook.length >= 16 && hook.cardHook.length <= 95,
      `cardHook for "${tpl.slug}" should be crisp (16-95 chars), got ${hook.cardHook.length}: "${hook.cardHook}"`
    );
    assert.equal(tpl.quickWin, hook.quickWin, `Catalog quickWin should match hook for "${tpl.slug}"`);
    assert.ok(
      tpl.quickWin.length >= 24 && tpl.quickWin.length <= 85,
      `quickWin for "${tpl.slug}" should be crisp (24-85 chars), got ${tpl.quickWin.length}: "${tpl.quickWin}"`
    );
    assert.ok(
      !seenQuickWins.has(tpl.quickWin),
      `Duplicate quickWin detected on "${tpl.slug}": "${tpl.quickWin}"`
    );
    seenQuickWins.add(tpl.quickWin);

    assert.ok(hook.heroHeadline.length >= 10, `heroHeadline missing for "${tpl.slug}"`);
    assert.ok(hook.heroLead.length >= 20, `heroLead missing for "${tpl.slug}"`);
    assert.ok(hook.painPoint.length >= 12, `painPoint missing for "${tpl.slug}"`);
    assert.ok(hook.payoff.length >= 12, `payoff missing for "${tpl.slug}"`);
    assert.ok(
      hook.insideItems.length >= 4 && hook.insideItems.length <= 6,
      `Expected 4-6 insideItems for "${tpl.slug}", got ${hook.insideItems.length}`
    );
    assert.equal(
      hook.samplePreviewRows.length,
      3,
      `Expected 3 samplePreviewRows for "${tpl.slug}"`
    );

    const textFields = [
      tpl.summary,
      tpl.quickWin,
      ...tpl.description,
      hook.cardHook,
      hook.heroHeadline,
      hook.heroLead,
      hook.painPoint,
      hook.payoff,
      ...hook.insideItems.map((i) => `${i.name} ${i.whatItDoes}`),
    ];

    for (const text of textFields) {
      for (const pattern of BANNED_SLOP_PATTERNS) {
        assert.doesNotMatch(
          text,
          pattern,
          `Found banned AI-slop phrase (${pattern}) in template "${tpl.slug}": "${text}"`
        );
      }
    }
  }
});

test('validateCustomBrief enforces meaningful purpose and valid client email', () => {
  const shortPurpose = validateCustomBrief({
    email: 'maya@studio.io',
    audience: 'Solo founder',
    designStyle: 'Minimalist Notion',
    purpose: 'too short',
  });
  assert.equal(shortPurpose.valid, false);
  assert.ok(shortPurpose.error);

  const badEmail = validateCustomBrief({
    email: 'not-an-email',
    audience: 'Solo founder',
    designStyle: 'Minimalist Notion',
    purpose: 'Track client onboarding and weekly project deliverables.',
  });
  assert.equal(badEmail.valid, false);
  assert.ok(badEmail.error);

  const valid = validateCustomBrief({
    email: 'maya@studio.io',
    audience: 'Small team (2–15)',
    designStyle: 'Editorial Serif',
    purpose:
      'Replace 4 messy spreadsheets with one client onboarding and deliverable tracker that flags overdue reviews.',
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.error, undefined);
});
