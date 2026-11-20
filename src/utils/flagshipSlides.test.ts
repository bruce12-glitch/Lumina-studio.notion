import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOsSavings,
  clampSlideIndex,
  formatSlideCounter,
  getNextSlideIndex,
  getPrevSlideIndex,
  getSlideProgressRatio,
} from './flagshipSlides';

test('slide deck index navigation wraps cleanly in both directions', () => {
  assert.equal(getNextSlideIndex(0, 4), 1);
  assert.equal(getNextSlideIndex(3, 4), 0);
  assert.equal(getPrevSlideIndex(0, 4), 3);
  assert.equal(getPrevSlideIndex(2, 4), 1);
  assert.equal(getNextSlideIndex(0, 0), 0);
  assert.equal(getPrevSlideIndex(0, 0), 0);
});

test('clampSlideIndex, formatSlideCounter, and getSlideProgressRatio compute exact values', () => {
  assert.equal(clampSlideIndex(-2, 4), 0);
  assert.equal(clampSlideIndex(9, 4), 3);
  assert.equal(clampSlideIndex(1, 4), 1);

  assert.equal(formatSlideCounter(0, 4), '01 / 04');
  assert.equal(formatSlideCounter(3, 4), '04 / 04');
  assert.equal(getSlideProgressRatio(0, 4), 0.25);
  assert.equal(getSlideProgressRatio(3, 4), 1);
});

test('calculateOsSavings computes savings amounts and percentages accurately', () => {
  const freelance = calculateOsSavings(79, 99);
  assert.equal(freelance.savingsAmount, 20);
  assert.equal(freelance.savingsPercent, 20);

  const student = calculateOsSavings(39, 59);
  assert.equal(student.savingsAmount, 20);
  assert.equal(student.savingsPercent, 34);

  const researcher = calculateOsSavings(49, 69);
  assert.equal(researcher.savingsAmount, 20);
  assert.equal(researcher.savingsPercent, 29);
});
