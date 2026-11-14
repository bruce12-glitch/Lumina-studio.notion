import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Check,
  Copy,
  CreditCard,
  Download,
  Lock,
  ShieldCheck,
} from 'lucide-react';
import {
  calculateDiscountedPrice,
  DigitalDeliveryPackage,
  formatPrice,
  generateDeliveryPackage,
  PaymentProvider,
  validateCheckoutInput,
} from '../utils/storeLogic';

export interface CheckoutTarget {
  name: string;
  slug: string;
  price: number;
  compareAt?: number;
  pro: boolean;
  whatsInside?: string[];
}

export const CheckoutModal: React.FC<{
  target: CheckoutTarget | null;
  activeDelivery: DigitalDeliveryPackage | null;
  onClose: () => void;
  onCompletePurchase: (pkg: DigitalDeliveryPackage) => void;
}> = ({ target, activeDelivery, onClose, onCompletePurchase }) => {
  const [provider, setProvider] = useState<PaymentProvider>('stripe');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('424');
  const [promoCode, setPromoCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deliveryPkg, setDeliveryPkg] = useState<DigitalDeliveryPackage | null>(
    activeDelivery
  );
  const [copiedKey, setCopiedKey] = useState(false);
  const [duplicatedPreview, setDuplicatedPreview] = useState(false);

  useEffect(() => {
    setDeliveryPkg(activeDelivery);
    setErrors({});
    setSubmitting(false);
    setCopiedKey(false);
    setDuplicatedPreview(false);
  }, [target, activeDelivery]);

  useEffect(() => {
    if (!target && !deliveryPkg) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [target, deliveryPkg, onClose]);

  if (!target && !deliveryPkg) return null;

  const basePrice = target ? target.price : deliveryPkg?.amountPaid || 0;
  const { finalPrice, discountAmount, appliedCode } = calculateDiscountedPrice(
    basePrice,
    promoCode
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target) return;

    const validation = validateCheckoutInput({
      email,
      provider,
      cardNumber,
      expiry,
      cvc,
      promoCode,
      price: target.price,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      const pkg = generateDeliveryPackage({
        itemName: target.name,
        itemSlug: target.slug,
        price: finalPrice,
        provider,
        customerEmail: email,
        whatsInside: target.whatsInside,
      });
      setSubmitting(false);
      setDeliveryPkg(pkg);
      onCompletePurchase(pkg);
    }, 650);
  };

  const handleDownloadBlueprint = (pkg: DigitalDeliveryPackage) => {
    const blob = new Blob([pkg.blueprintMarkdown], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pkg.itemSlug}-notion-blueprint.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLicense = (key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key).catch(() => {});
    }
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        deliveryPkg
          ? `Automated Digital Delivery — ${deliveryPkg.itemName}`
          : `Checkout — ${target?.name}`
      }
      className="fixed inset-0 z-[95] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[540px] rounded-[16px] bg-white border border-[#EAEAEA] shadow-[0_8px_24px_rgba(10,10,10,0.08)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAFA]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#0A0A0A]" />
            <span className="text-[14px] font-semibold text-[#0A0A0A]">
              {deliveryPkg
                ? 'Automated Digital Delivery — Ready'
                : finalPrice === 0
                ? 'Instant Free Template Delivery'
                : 'Secure Digital Checkout'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="w-8 h-8 rounded-[8px] inline-flex items-center justify-center text-[#525252] hover:bg-[#EAEAEA] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {deliveryPkg ? (
          /* Automated Digital Delivery View */
          <div className="p-6 space-y-6">
            <div className="p-4 rounded-[12px] bg-[#FAFAFA] border border-[#EAEAEA] flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#15803D] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
                  Your {deliveryPkg.itemName} workspace is ready
                </h3>
                <p className="text-[13px] text-[#525252]">
                  Receipt & duplication link sent to{' '}
                  <span className="font-medium text-[#0A0A0A]">
                    {deliveryPkg.customerEmail}
                  </span>{' '}
                  via {deliveryPkg.provider === 'stripe' ? 'Stripe' : 'Lemon Squeezy'}.
                </p>
              </div>
            </div>

            {/* Automated Delivery Pipeline Status */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { step: '1. Payment', status: 'Verified' },
                { step: '2. License Key', status: 'Provisioned' },
                { step: '3. Notion Link', status: 'Unlocked' },
              ].map((s) => (
                <div
                  key={s.step}
                  className="p-2.5 rounded-[8px] border border-[#EAEAEA] bg-white"
                >
                  <p className="text-[11px] text-[#737373] font-medium">{s.step}</p>
                  <p className="text-[12px] font-semibold text-[#15803D]">{s.status}</p>
                </div>
              ))}
            </div>

            {/* License Key Box */}
            <div className="space-y-1.5">
              <label className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#737373]">
                License Key & Order ID ({deliveryPkg.orderId})
              </label>
              <div className="flex items-center justify-between gap-2 p-3 rounded-[8px] bg-[#FAFAFA] border border-[#D4D4D4] font-mono text-[13px] text-[#0A0A0A]">
                <span className="truncate">{deliveryPkg.licenseKey}</span>
                <button
                  type="button"
                  onClick={() => handleCopyLicense(deliveryPkg.licenseKey)}
                  className="px-2.5 py-1 rounded-[6px] bg-white border border-[#D4D4D4] hover:bg-[#F5F5F5] text-[12px] font-sans font-medium inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  {copiedKey ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Primary Digital Delivery Actions */}
            <div className="space-y-2.5">
              <motion.button
                type="button"
                whileHover={{ y: -1.5, scale: 1.012 }}
                whileTap={{ scale: 0.978 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                onClick={() => setDuplicatedPreview(true)}
                className="btn-motion-primary w-full h-11 px-4 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Duplicate to Notion Workspace</span>
                <ArrowUpRight className="w-4 h-4 btn-arrow-diagonal" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ y: -1.5, scale: 1.01 }}
                whileTap={{ scale: 0.978 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                onClick={() => handleDownloadBlueprint(deliveryPkg)}
                className="btn-motion-secondary w-full h-10 px-4 rounded-[10px] border border-[#D4D4D4] bg-white hover:bg-[#FAFAFA] text-[#0A0A0A] text-[14px] font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Setup Blueprint & Receipt (.md)</span>
              </motion.button>
            </div>

            {duplicatedPreview && (
              <div className="p-4 rounded-[10px] bg-[#FAFAFA] border border-[#EAEAEA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-[#0A0A0A]">
                    Notion Duplication Link Active
                  </span>
                  <span className="text-[12px] text-[#15803D] font-medium">
                    Ready to import
                  </span>
                </div>
                <p className="text-[12px] font-mono text-[#525252] break-all">
                  {deliveryPkg.notionDuplicateUrl}
                </p>
                {deliveryPkg.circleCommunityInviteUrl && (
                  <p className="text-[12px] text-[#525252] pt-1 border-t border-[#EAEAEA]">
                    Private Circle Community Invite:{' '}
                    <span className="font-mono text-[#0A0A0A]">
                      {deliveryPkg.circleCommunityInviteUrl}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">
            {/* Order Summary Row */}
            <div className="p-4 rounded-[12px] bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-semibold text-[#0A0A0A]">
                    {target?.name}
                  </h3>
                  {target?.pro && (
                    <span className="rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-[0.08em] px-[7px] py-[3px] leading-none">
                      PRO
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[#737373] mt-0.5">
                  Instant Notion workspace link + setup blueprint
                </p>
              </div>
              <div className="text-right tabular-nums">
                {discountAmount > 0 ? (
                  <div>
                    <span className="text-[13px] text-[#A3A3A3] line-through mr-1.5">
                      {formatPrice(basePrice)}
                    </span>
                    <span className="text-[18px] font-bold text-[#0A0A0A]">
                      ${finalPrice}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    {target?.compareAt !== undefined && (
                      <span className="text-[14px] text-[#A3A3A3] line-through">
                        {formatPrice(target.compareAt)}
                      </span>
                    )}
                    <span className="text-[18px] font-bold text-[#0A0A0A]">
                      {formatPrice(basePrice)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Gateway Selector (Stripe vs Lemon Squeezy) */}
            <div className="space-y-1.5">
              <label className="block text-[13px] font-medium text-[#0A0A0A]">
                Payment & Automated Delivery Provider
              </label>
              <div className="grid grid-cols-2 gap-2.5" role="radiogroup">
                <button
                  type="button"
                  role="radio"
                  aria-checked={provider === 'stripe'}
                  onClick={() => setProvider('stripe')}
                  className={`h-11 px-3.5 rounded-[10px] border text-[13px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    provider === 'stripe'
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                      : 'border-[#D4D4D4] bg-white text-[#525252] hover:bg-[#FAFAFA]'
                  }`}
                >
                  <span>Stripe Checkout</span>
                  <CreditCard className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={provider === 'lemonsqueezy'}
                  onClick={() => setProvider('lemonsqueezy')}
                  className={`h-11 px-3.5 rounded-[10px] border text-[13px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    provider === 'lemonsqueezy'
                      ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white'
                      : 'border-[#D4D4D4] bg-white text-[#525252] hover:bg-[#FAFAFA]'
                  }`}
                >
                  <span>Lemon Squeezy</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="checkout-email"
                className="block text-[13px] font-medium text-[#0A0A0A]"
              >
                Delivery Email Address
              </label>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none ${
                  errors.email
                    ? 'border-[#B42318] focus:border-[#B42318]'
                    : 'border-[#D4D4D4] focus:border-[#0A0A0A]'
                }`}
              />
              {errors.email && (
                <p className="text-[13px] text-[#B42318]">{errors.email}</p>
              )}
            </div>

            {/* Discount Code & Card Details (only if paid template) */}
            {basePrice > 0 && (
              <>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="checkout-promo"
                      className="block text-[13px] font-medium text-[#0A0A0A]"
                    >
                      Discount Code
                    </label>
                    <button
                      type="button"
                      onClick={() => setPromoCode('ORGANIZE2026')}
                      className="text-[12px] text-[#525252] underline hover:text-[#0A0A0A] cursor-pointer"
                    >
                      Apply 2026 Promo (ORGANIZE2026)
                    </button>
                  </div>
                  <input
                    id="checkout-promo"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="ORGANIZE2026"
                    className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] text-[#0A0A0A] placeholder:text-[#A3A3A3] ${
                      errors.promoCode ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                    }`}
                  />
                  {appliedCode && (
                    <p className="text-[12px] text-[#15803D] font-medium">
                      Code {appliedCode} applied — saving ${discountAmount}
                    </p>
                  )}
                  {errors.promoCode && (
                    <p className="text-[13px] text-[#B42318]">{errors.promoCode}</p>
                  )}
                </div>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="checkout-card"
                      className="block text-[13px] font-medium text-[#0A0A0A]"
                    >
                      Card Number ({provider === 'stripe' ? 'Stripe' : 'Lemon Squeezy'})
                    </label>
                    <input
                      id="checkout-card"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] tabular-nums text-[#0A0A0A] ${
                        errors.cardNumber ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                      }`}
                    />
                    {errors.cardNumber && (
                      <p className="text-[13px] text-[#B42318]">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-expiry"
                        className="block text-[13px] font-medium text-[#0A0A0A]"
                      >
                        Expiry (MM/YY)
                      </label>
                      <input
                        id="checkout-expiry"
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="12/28"
                        className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] tabular-nums text-[#0A0A0A] ${
                          errors.expiry ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                        }`}
                      />
                      {errors.expiry && (
                        <p className="text-[13px] text-[#B42318]">{errors.expiry}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="checkout-cvc"
                        className="block text-[13px] font-medium text-[#0A0A0A]"
                      >
                        CVC
                      </label>
                      <input
                        id="checkout-cvc"
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="424"
                        className={`w-full h-10 px-3 rounded-[8px] bg-[#FAFAFA] border text-[14px] tabular-nums text-[#0A0A0A] ${
                          errors.cvc ? 'border-[#B42318]' : 'border-[#D4D4D4]'
                        }`}
                      />
                      {errors.cvc && (
                        <p className="text-[13px] text-[#B42318]">{errors.cvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ y: -1.5, scale: 1.012 }}
              whileTap={{ scale: 0.978 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="btn-motion-primary w-full h-12 rounded-[10px] bg-[#0A0A0A] hover:bg-[#262626] disabled:opacity-40 text-white text-[14px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {submitting ? (
                <span>Provisioning Notion Workspace...</span>
              ) : finalPrice === 0 ? (
                <span>Send Free Template & Duplicate Link ($0)</span>
              ) : (
                <span>
                  Pay ${finalPrice} via{' '}
                  {provider === 'stripe' ? 'Stripe' : 'Lemon Squeezy'} & Unlock Template
                </span>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
};
