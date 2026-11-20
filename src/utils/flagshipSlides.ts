export interface SlideDeckSavings {
  price: number;
  compareAt: number;
  savingsAmount: number;
  savingsPercent: number;
}

export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex + 1) % totalSlides;
}

export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return (currentIndex - 1 + totalSlides) % totalSlides;
}

export function clampSlideIndex(index: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  if (index < 0) return 0;
  if (index >= totalSlides) return totalSlides - 1;
  return index;
}

export function formatSlideCounter(index: number, totalSlides: number): string {
  const safeTotal = Math.max(1, totalSlides);
  const safeCurrent = clampSlideIndex(index, safeTotal) + 1;
  return `${String(safeCurrent).padStart(2, '0')} / ${String(safeTotal).padStart(2, '0')}`;
}

export function getSlideProgressRatio(index: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  const safeCurrent = clampSlideIndex(index, totalSlides) + 1;
  return safeCurrent / totalSlides;
}

export function calculateOsSavings(price: number, compareAt?: number): SlideDeckSavings {
  const effectiveCompareAt =
    compareAt !== undefined && compareAt > price
      ? compareAt
      : price > 0
      ? price + 20
      : 0;
  const savingsAmount = Math.max(0, effectiveCompareAt - price);
  const savingsPercent =
    effectiveCompareAt > 0
      ? Math.round((savingsAmount / effectiveCompareAt) * 100)
      : 0;

  return {
    price,
    compareAt: effectiveCompareAt,
    savingsAmount,
    savingsPercent,
  };
}
