import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTimeMMSS,
  calculateDrillPerformance,
  getBreathingState,
  containsProhibitedVocabulary,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSwipeDirection,
  TARGET_DRILL_SECONDS,
} from './simulationLogic';
import {
  GOLDEN_RULES,
  EMERGENCY_SCENARIOS,
  AGE_GROUP_GUIDES,
  CAMPUS_GALLERY_ITEMS,
  EMERGENCY_CONTACTS,
} from '../data/portalContent';

test('formatTimeMMSS formats countdown and elapsed seconds accurately', () => {
  assert.equal(formatTimeMMSS(240), '04:00');
  assert.equal(formatTimeMMSS(65), '01:05');
  assert.equal(formatTimeMMSS(9), '00:09');
  assert.equal(formatTimeMMSS(0), '00:00');
  assert.equal(formatTimeMMSS(-5), '00:00');
});

test('calculateDrillPerformance computes stage progress and target comparison', () => {
  const partial = calculateDrillPerformance(14, null, null, 30);
  assert.equal(partial.completedStagesCount, 1);
  assert.equal(partial.progressPercent, 33);
  assert.equal(partial.acknowledgeSeconds, 14);

  const completedFast = calculateDrillPerformance(12, 48, 145, 145);
  assert.equal(completedFast.completedStagesCount, 3);
  assert.equal(completedFast.progressPercent, 100);
  assert.equal(completedFast.withinTarget, true);
  assert.equal(completedFast.remainingTargetSeconds, TARGET_DRILL_SECONDS - 145);

  const completedSlow = calculateDrillPerformance(25, 110, 260, 260);
  assert.equal(completedSlow.withinTarget, false);
  assert.equal(completedSlow.remainingTargetSeconds, 0);
});

test('getBreathingState follows the 4-4-8 Ataa calming breathing cycle', () => {
  const inhaleStart = getBreathingState(0);
  assert.equal(inhaleStart.phase, 'inhale');
  assert.equal(inhaleStart.secondsRemainingInPhase, 4);

  const holdMid = getBreathingState(5);
  assert.equal(holdMid.phase, 'hold');
  assert.equal(holdMid.secondsRemainingInPhase, 3);

  const exhaleStart = getBreathingState(8);
  assert.equal(exhaleStart.phase, 'exhale');
  assert.equal(exhaleStart.secondsRemainingInPhase, 8);

  const wrapAround = getBreathingState(16);
  assert.equal(wrapAround.phase, 'inhale');
  assert.equal(wrapAround.secondsRemainingInPhase, 4);
});

test('carousel navigation wraps indices and resolves LTR/RTL swipe gestures', () => {
  assert.equal(getNextSlideIndex(0, 5), 1);
  assert.equal(getNextSlideIndex(4, 5), 0);
  assert.equal(getPrevSlideIndex(0, 5), 4);
  assert.equal(getPrevSlideIndex(2, 5), 1);

  assert.equal(resolveSwipeDirection(200, 120, false), 'next');
  assert.equal(resolveSwipeDirection(120, 200, false), 'prev');
  assert.equal(resolveSwipeDirection(200, 185, false), 'none');
  assert.equal(resolveSwipeDirection(120, 200, true), 'next');
  assert.equal(resolveSwipeDirection(200, 120, true), 'prev');
});

test('strict safety constraint: portal content contains zero prohibited vocabulary in English or Arabic', () => {
  const allStrings = JSON.stringify({
    GOLDEN_RULES,
    EMERGENCY_SCENARIOS,
    AGE_GROUP_GUIDES,
    CAMPUS_GALLERY_ITEMS,
    EMERGENCY_CONTACTS,
  });

  assert.equal(
    containsProhibitedVocabulary(allStrings),
    false,
    'Portal content must never contain prohibited words in English or Arabic'
  );

  // Also verify detector catches prohibited words if present
  assert.equal(containsProhibitedVocabulary('Incoming missile alert'), true);
  assert.equal(containsProhibitedVocabulary('تحذير من صواريخ'), true);
  assert.equal(containsProhibitedVocabulary('Emergency Alert إنذار طوارئ'), false);
});

