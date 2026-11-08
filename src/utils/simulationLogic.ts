export type Language = 'en' | 'ar';

export const TARGET_DRILL_SECONDS = 240; // 04:00 target evacuation window

export interface DrillPerformanceSummary {
  acknowledgeSeconds: number;
  followSeconds: number;
  totalSeconds: number;
  remainingTargetSeconds: number;
  withinTarget: boolean;
  ratingEn: string;
  ratingAr: string;
  completedStagesCount: number;
  progressPercent: number;
}

export interface BreathingPhaseInfo {
  phase: 'inhale' | 'hold' | 'exhale';
  phaseLabelEn: string;
  phaseLabelAr: string;
  instructionEn: string;
  instructionAr: string;
  secondsRemainingInPhase: number;
  phaseDuration: number;
  scale: number;
}

/**
 * Formats non-negative seconds into MM:SS with leading zeros (e.g. 240 -> "04:00").
 */
export function formatTimeMMSS(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Computes drill performance metrics and readiness rating from 3 stage timestamps (legacy helper).
 */
export function calculateDrillPerformance(
  stage1Time: number | null,
  stage2Time: number | null,
  stage3Time: number | null,
  currentElapsedSeconds: number
): DrillPerformanceSummary {
  const completedStagesCount =
    (stage1Time !== null ? 1 : 0) +
    (stage2Time !== null ? 1 : 0) +
    (stage3Time !== null ? 1 : 0);

  const progressPercent = Math.round((completedStagesCount / 3) * 100);

  const ack = stage1Time ?? currentElapsedSeconds;
  const follow = stage2Time ?? Math.max(ack, currentElapsedSeconds);
  const total = stage3Time ?? Math.max(follow, currentElapsedSeconds);

  const withinTarget = total <= TARGET_DRILL_SECONDS;
  const remainingTargetSeconds = Math.max(0, TARGET_DRILL_SECONDS - total);

  let ratingEn = 'Excellent Readiness';
  let ratingAr = 'متقن - جاهزية ممتازة';

  if (total > TARGET_DRILL_SECONDS) {
    ratingEn = 'Completed (Above 04:00 Target)';
    ratingAr = 'مكتمل (تجاوز الزمن المستهدف 04:00)';
  } else if (total <= 180) {
    ratingEn = 'Exemplary Rapid Response';
    ratingAr = 'متقن بامتياز - استجابة قياسية';
  }

  return {
    acknowledgeSeconds: ack,
    followSeconds: follow,
    totalSeconds: total,
    remainingTargetSeconds,
    withinTarget,
    ratingEn,
    ratingAr,
    completedStagesCount,
    progressPercent,
  };
}

/**
 * Computes drill performance metrics and readiness rating across all 5 simulation stages.
 */
export function calculateFiveStageDrillPerformance(
  stageTimes: (number | null)[],
  currentElapsedSeconds: number
): DrillPerformanceSummary & { stageTimesSeconds: number[] } {
  const totalStages = 5;
  const normalized = Array.from({ length: totalStages }, (_, idx) => stageTimes[idx] ?? null);
  const completedStagesCount = normalized.filter((t) => t !== null).length;
  const progressPercent = Math.round((completedStagesCount / totalStages) * 100);

  const stageTimesSeconds: number[] = [];
  let runningMax = 0;
  for (let i = 0; i < totalStages; i++) {
    const val = normalized[i] ?? Math.max(runningMax, currentElapsedSeconds);
    runningMax = Math.max(runningMax, val);
    stageTimesSeconds.push(val);
  }

  const ack = stageTimesSeconds[0] ?? currentElapsedSeconds;
  const follow = stageTimesSeconds[2] ?? Math.max(ack, currentElapsedSeconds);
  const total = stageTimesSeconds[4] ?? Math.max(follow, currentElapsedSeconds);

  const withinTarget = total <= TARGET_DRILL_SECONDS;
  const remainingTargetSeconds = Math.max(0, TARGET_DRILL_SECONDS - total);

  let ratingEn = 'Excellent Readiness';
  let ratingAr = 'متقن - جاهزية ممتازة';

  if (total > TARGET_DRILL_SECONDS) {
    ratingEn = 'Completed (Above 04:00 Target)';
    ratingAr = 'مكتمل (تجاوز الزمن المستهدف 04:00)';
  } else if (total <= 180) {
    ratingEn = 'Exemplary Rapid Response';
    ratingAr = 'متقن بامتياز - استجابة قياسية';
  }

  return {
    acknowledgeSeconds: ack,
    followSeconds: follow,
    totalSeconds: total,
    remainingTargetSeconds,
    withinTarget,
    ratingEn,
    ratingAr,
    completedStagesCount,
    progressPercent,
    stageTimesSeconds,
  };
}

/**
 * Computes the 4-4-8 calming breathing state (16-second total cycle):
 * - 0..3s (4s): Inhale
 * - 4..7s (4s): Hold
 * - 8..15s (8s): Exhale
 */
export function getBreathingState(cycleElapsedSeconds: number): BreathingPhaseInfo {
  const t = ((Math.floor(cycleElapsedSeconds) % 16) + 16) % 16;

  if (t < 4) {
    return {
      phase: 'inhale',
      phaseLabelEn: 'Inhale Slowly',
      phaseLabelAr: 'شهيق ببطء وهدوء',
      instructionEn: 'Breathe in gently through your nose for 4 seconds',
      instructionAr: 'خذ نفساً عميقاً وهادئاً من الأنف لمدة 4 ثوانٍ',
      secondsRemainingInPhase: 4 - t,
      phaseDuration: 4,
      scale: 1.22,
    };
  }

  if (t < 8) {
    return {
      phase: 'hold',
      phaseLabelEn: 'Hold Breath',
      phaseLabelAr: 'احتفظ بالنفس',
      instructionEn: 'Keep your shoulders relaxed and hold for 4 seconds',
      instructionAr: 'أبقِ كتفيك مسترخيتين واحتفظ بالنفس لمدة 4 ثوانٍ',
      secondsRemainingInPhase: 8 - t,
      phaseDuration: 4,
      scale: 1.22,
    };
  }

  return {
    phase: 'exhale',
    phaseLabelEn: 'Exhale Gently',
    phaseLabelAr: 'زفير بطيء وممتد',
    instructionEn: 'Release your breath softly through your mouth for 8 seconds',
    instructionAr: 'أخرج الهواء بهدوء من الفم لمدة 8 ثوانٍ حتى تشعر بالطمأنينة',
    secondsRemainingInPhase: 16 - t,
    phaseDuration: 8,
    scale: 0.9,
  };
}

const PROHIBITED_PATTERNS = [
  /\bmissile(s)?\b/i,
  /\bwar(s|fare)?\b/i,
  /\bbomb(s|ing)?\b/i,
  /\bair\s*raid(s)?\b/i,
  /\bshrapnel\b/i,
  /\bhostile\s*attack(s)?\b/i,
  /صواريخ/,
  /صاروخ/,
  /قذائف/,
  /قذيفة/,
  /غارة/,
  /غارات/,
  /قنبلة/,
  /قنابل/,
  /شظايا/,
];

/**
 * Verifies that any UI copy strictly complies with the MoE / Ataa content rules.
 */
export function containsProhibitedVocabulary(text: string): boolean {
  return PROHIBITED_PATTERNS.some((regex) => regex.test(text));
}

/**
 * Circular next slide index for interactive galleries.
 */
export function getNextSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return ((currentIndex + 1) % totalSlides + totalSlides) % totalSlides;
}

/**
 * Circular previous slide index for interactive galleries.
 */
export function getPrevSlideIndex(currentIndex: number, totalSlides: number): number {
  if (totalSlides <= 0) return 0;
  return ((currentIndex - 1) % totalSlides + totalSlides) % totalSlides;
}

/**
 * Determines whether a horizontal pointer/touch swipe delta triggers next, prev, or none.
 */
export function resolveSwipeDirection(
  startX: number,
  endX: number,
  isRtl = false,
  thresholdPx = 40
): 'next' | 'prev' | 'none' {
  const deltaX = endX - startX;
  if (Math.abs(deltaX) < thresholdPx) {
    return 'none';
  }
  // In LTR, dragging left (deltaX < 0) advances to next slide.
  // In RTL, dragging right (deltaX > 0) advances to next slide.
  if (isRtl) {
    return deltaX > 0 ? 'next' : 'prev';
  }
  return deltaX < 0 ? 'next' : 'prev';
}

