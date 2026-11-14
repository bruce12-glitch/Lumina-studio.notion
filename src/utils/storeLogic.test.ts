import test from 'node:test';
import assert from 'node:assert/strict';
import { TEMPLATES, FAQ_ITEMS, APPS } from '../data/catalog';
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
} from './storeLogic';

test('catalog integrity matches Easlo specification (39 items, 22 free, 17 PRO, exact category counts)', () => {
  assert.equal(TEMPLATES.length, 39);

  const freeItems = TEMPLATES.filter((t) => !t.pro);
  const proItems = TEMPLATES.filter((t) => t.pro);
  assert.equal(freeItems.length, 22);
  assert.equal(proItems.length, 17);

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

  // Exact category counts: All 39, Health & Fitness 9, Personal Productivity 13, Business 5, School 4, Finance 6, Travel 2
  const counts = getCategoryCounts(TEMPLATES);
  assert.equal(counts['All'], 39);
  assert.equal(counts['Health & Fitness'], 9);
  assert.equal(counts['Personal Productivity'], 13);
  assert.equal(counts['Business'], 5);
  assert.equal(counts['School'], 4);
  assert.equal(counts['Finance'], 6);
  assert.equal(counts['Travel'], 2);

  // FAQ & Apps count
  assert.equal(FAQ_ITEMS.length, 6);
  assert.equal(APPS.length, 4);
});

test('filterTemplates filters accurately by category and search query', () => {
  const finance = filterTemplates(TEMPLATES, 'Finance');
  assert.equal(finance.length, 6);

  const travel = filterTemplates(TEMPLATES, 'Travel');
  assert.equal(travel.length, 2);

  const searchBrain = filterTemplates(TEMPLATES, 'All', 'Second Brain');
  assert.equal(searchBrain.length, 1);
  assert.equal(searchBrain[0].slug, 'second-brain');
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
  assert.ok(pkg.licenseKey.startsWith('EASLO-PRO-'));
  assert.ok(pkg.notionDuplicateUrl.includes('second-brain'));
  assert.ok(pkg.circleCommunityInviteUrl);
});

test('validateAuthForm and getProTemplatesTotalValue', () => {
  const badAuth = validateAuthForm('not-an-email', '123', false);
  assert.equal(badAuth.valid, false);
  assert.ok(badAuth.errors.email);
  assert.ok(badAuth.errors.password);

  const goodAuth = validateAuthForm('creator@easlo.co', 'minimalism2026', true);
  assert.equal(goodAuth.valid, true);

  const bundle = getProTemplatesTotalValue();
  assert.equal(bundle.proCount, 17);
  assert.equal(bundle.allAccessPrice, 99);
  assert.ok(bundle.individualTotal > 99);
});

test('testimonials include 4 attributable reviews linked to valid catalog templates', async () => {
  const { TESTIMONIALS, BLUSH_ASSETS } = await import('../data/catalog');
  assert.equal(TESTIMONIALS.length, 4);
  const testimonialAssets = new Set(TESTIMONIALS.map((r) => r.illustrationUrl));
  assert.equal(testimonialAssets.size, 4, 'All 4 testimonials must use distinct Blush assets');
  for (const rev of TESTIMONIALS) {
    assert.ok(rev.author.length > 0);
    assert.ok(rev.role.length > 0);
    assert.ok(rev.organization.length > 0);
    assert.ok(rev.quote.length > 40);
    assert.ok(rev.surfaceTint.startsWith('#'));
    const linkedTemplate = TEMPLATES.find((t) => t.slug === rev.templateSlug);
    assert.ok(linkedTemplate, `Testimonial should link to valid template ${rev.templateSlug}`);
  }

  // Verify all 30 copyright-free Ultra-HD assets exist and have unique paths
  const assetUrls = Object.values(BLUSH_ASSETS);
  assert.equal(assetUrls.length, 30);
  assert.equal(new Set(assetUrls).size, 30, 'All 30 BLUSH_ASSETS URLs must be unique');

  // Verify all 4 Apps by Easlo have distinct illustrations
  const appAssets = new Set(APPS.map((a) => a.illustrationUrl));
  assert.equal(appAssets.size, 4, 'All 4 Apps by Easlo must use distinct illustrations');

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


