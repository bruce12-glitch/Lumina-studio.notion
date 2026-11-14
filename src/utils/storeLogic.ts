import {
  ALL_ACCESS_PRICE,
  CATEGORIES,
  Category,
  Template,
  TEMPLATES,
} from '../data/catalog';

export type PaymentProvider = 'stripe' | 'lemonsqueezy';

export interface CheckoutInput {
  email: string;
  fullName?: string;
  provider: PaymentProvider;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
  promoCode?: string;
  price: number;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: {
    email?: string;
    fullName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    promoCode?: string;
  };
}

export interface DigitalDeliveryPackage {
  orderId: string;
  licenseKey: string;
  itemName: string;
  itemSlug: string;
  provider: PaymentProvider;
  amountPaid: number;
  customerEmail: string;
  purchasedAt: string;
  notionDuplicateUrl: string;
  circleCommunityInviteUrl?: string;
  blueprintMarkdown: string;
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function isProTemplate(price: number): boolean {
  return price > 0;
}

export function filterTemplates(
  templates: Template[],
  category: Category,
  searchQuery = ''
): Template[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  return templates.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesSearch =
      normalizedSearch === '' ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.category.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
}

export function getCategoryCounts(templates: Template[] = TEMPLATES): Record<Category, number> {
  const counts: Record<Category, number> = {
    All: templates.length,
    'Health & Fitness': 0,
    'Personal Productivity': 0,
    Business: 0,
    School: 0,
    Finance: 0,
    Travel: 0,
  };

  for (const t of templates) {
    counts[t.category] += 1;
  }

  return counts;
}

export function calculateDiscountedPrice(
  basePrice: number,
  promoCode = ''
): {
  finalPrice: number;
  discountAmount: number;
  appliedCode: string | null;
} {
  if (basePrice <= 0) {
    return { finalPrice: 0, discountAmount: 0, appliedCode: null };
  }

  const code = promoCode.trim().toUpperCase();
  if (code === 'ORGANIZE2026' || code === 'EASLO50') {
    const discountAmount = Math.round(basePrice * 0.5 * 100) / 100;
    return {
      finalPrice: Math.max(0, Number((basePrice - discountAmount).toFixed(2))),
      discountAmount,
      appliedCode: code,
    };
  }

  if (code === 'STUDENT25' || code === 'EDU25') {
    const discountAmount = Math.round(basePrice * 0.25 * 100) / 100;
    return {
      finalPrice: Math.max(0, Number((basePrice - discountAmount).toFixed(2))),
      discountAmount,
      appliedCode: code,
    };
  }

  return { finalPrice: basePrice, discountAmount: 0, appliedCode: null };
}

export function validateEmail(email: string): boolean {
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function validateAuthForm(
  email: string,
  password: string,
  isSignUp = false
): { valid: boolean; errors: { email?: string; password?: string } } {
  const errors: { email?: string; password?: string } = {};

  if (!email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address (e.g., name@domain.com).';
  }

  if (!password) {
    errors.password = 'Please enter your password.';
  } else if (isSignUp && password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else if (!isSignUp && password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCheckoutInput(input: CheckoutInput): CheckoutValidationResult {
  const errors: CheckoutValidationResult['errors'] = {};

  if (!input.email.trim()) {
    errors.email = 'Email address is required for instant template delivery.';
  } else if (!validateEmail(input.email)) {
    errors.email = 'Enter a valid email address to receive your Notion template link.';
  }

  const { finalPrice, appliedCode } = calculateDiscountedPrice(input.price, input.promoCode);

  if (input.promoCode && input.promoCode.trim() !== '' && !appliedCode && input.price > 0) {
    errors.promoCode = 'Unrecognized discount code. Try ORGANIZE2026 or STUDENT25.';
  }

  if (finalPrice > 0) {
    const digits = (input.cardNumber || '').replace(/\s+/g, '');
    if (!digits || digits.length < 12 || !/^\d+$/.test(digits)) {
      errors.cardNumber = 'Enter a valid card number (minimum 12 digits).';
    }

    const exp = (input.expiry || '').trim();
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      errors.expiry = 'Use MM/YY format.';
    }

    const cvc = (input.cvc || '').trim();
    if (!/^\d{3,4}$/.test(cvc)) {
      errors.cvc = '3-4 digit CVC required.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function hashSeed(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

export function generateDeliveryPackage(params: {
  itemName: string;
  itemSlug: string;
  price: number;
  provider: PaymentProvider;
  customerEmail: string;
  whatsInside?: string[];
}): DigitalDeliveryPackage {
  const seed = hashSeed(`${params.itemSlug}:${params.customerEmail}`);
  const blockA = seed.toString(36).toUpperCase().padStart(4, '0').slice(0, 4);
  const blockB = ((seed * 31) >>> 0).toString(36).toUpperCase().padStart(4, '0').slice(0, 4);
  const orderNum = (100000 + (seed % 900000)).toString();

  const licenseKey = `EASLO-${params.price > 0 ? 'PRO' : 'FREE'}-${blockA}-${blockB}`;
  const orderId = `ORD-${orderNum}`;
  const notionDuplicateUrl = `https://www.notion.so/easlo/${params.itemSlug}-${blockA.toLowerCase()}?duplicate=true`;

  const insideList = (
    params.whatsInside || [
      `Master ${params.itemName} Notion Database`,
      'Quick-capture inbox and automated rollup views',
      'Minimalist monochrome icon pack',
    ]
  )
    .map((line) => `- [x] ${line}`)
    .join('\n');

  const blueprintMarkdown = `# ${params.itemName} — Official Easlo Notion Blueprint
Order ID: ${orderId}
License Key: ${licenseKey}
Licensed To: ${params.customerEmail}
Payment Processor: ${params.provider === 'stripe' ? 'Stripe Verified Checkout' : 'Lemon Squeezy Merchant of Record'}
Amount Paid: $${params.price} USD

## 1. One-Click Notion Duplication
Open the link below and click **Duplicate** in the top-right corner of your Notion workspace:
${notionDuplicateUrl}

## 2. Included Modules & Databases
${insideList}

## 3. Quick Setup Guide
1. Click the duplication link above while signed into your free or paid Notion account.
2. Pin "${params.itemName}" to your Notion sidebar Favorites for fast daily access.
3. Use Ctrl/Cmd + K inside Notion to jump directly to this workspace anytime.
${
  params.price > 0
    ? '\n## 4. Private Circle Community\nInvite URL: https://community.easlo.co/invite/' + blockB.toLowerCase()
    : ''
}
`;

  return {
    orderId,
    licenseKey,
    itemName: params.itemName,
    itemSlug: params.itemSlug,
    provider: params.provider,
    amountPaid: params.price,
    customerEmail: params.customerEmail.trim(),
    purchasedAt: '2026-11-14',
    notionDuplicateUrl,
    circleCommunityInviteUrl:
      params.price > 0 ? `https://community.easlo.co/invite/${blockB.toLowerCase()}` : undefined,
    blueprintMarkdown,
  };
}

export function getProTemplatesTotalValue(templates: Template[] = TEMPLATES): {
  individualTotal: number;
  allAccessPrice: number;
  savings: number;
  proCount: number;
} {
  const proItems = templates.filter((t) => t.pro);
  const individualTotal = proItems.reduce((sum, item) => sum + item.price, 0);
  return {
    individualTotal,
    allAccessPrice: ALL_ACCESS_PRICE,
    savings: Math.max(0, individualTotal - ALL_ACCESS_PRICE),
    proCount: proItems.length,
  };
}

export { CATEGORIES };
