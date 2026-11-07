import React, { useEffect, useRef, useState } from 'react';
import {
  Siren,
  Volume2,
  VolumeX,
  CheckCircle2,
  Footprints,
  MapPin,
  RotateCcw,
  Home,
  Users,
  Plus,
  Minus,
  Globe,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import {
  Language,
  TARGET_DRILL_SECONDS,
  formatTimeMMSS,
  calculateDrillPerformance,
} from '../utils/simulationLogic';
import { SwipeableImageCarousel } from './SwipeableImageCarousel';

interface EmergencySimulationModalProps {
  lang: Language;
  onToggleLanguage: () => void;
  onCloseSimulation: () => void;
}

const STAGE1_SLIDES = [
  {
    src: '/images/Classroom 1.jpg',
    labelEn: 'Classroom Desk Protection (Drop, Cover & Hold)',
    labelAr: 'الاحتماء تحت الطاولة داخل الفصل الدراسي',
  },
  {
    src: '/images/Corridor 1.jpg',
    labelEn: 'Windowless Interior Safe Corridor',
    labelAr: 'الممر الداخلي الآمن بعيداً عن النوافذ',
  },
];

const STAGE2_SLIDES = [
  {
    src: '/images/Lobby 1.jpg',
    labelEn: 'Orderly Single-File Line in Ground Lobby 1',
    labelAr: 'الصف الفردي المنظم في البهو الأرضي ١',
  },
  {
    src: '/images/Lobby 2.jpg',
    labelEn: 'Central Ground Lobby 2 Circulation',
    labelAr: 'العبور المنظم عبر البهو الأرضي ٢',
  },
  {
    src: '/images/Building 2.jpg',
    labelEn: 'Exiting Building 2 via Ground Staircases',
    labelAr: 'الخروج من المبنى ٢ عبر مخارج الدرج الأرضية',
  },
];

const STAGE3_SLIDES = [
  {
    src: '/images/Assembly Point Boys 1.jpg',
    labelEn: 'Boys Safe Assembly Point 1',
    labelAr: 'نقطة التجمع الآمنة للبنين ١',
  },
  {
    src: '/images/Assembly Point Boys 2.jpg',
    labelEn: 'Boys Safe Assembly Point 2',
    labelAr: 'نقطة التجمع الآمنة للبنين ٢',
  },
  {
    src: '/images/Assembly Point Girls 2.jpg',
    labelEn: 'Girls Safe Assembly Point',
    labelAr: 'نقطة التجمع الآمنة للبنات',
  },
];

export const EmergencySimulationModal: React.FC<EmergencySimulationModalProps> = ({
  lang,
  onToggleLanguage,
  onCloseSimulation,
}) => {
  const isAr = lang === 'ar';
  const sirenVideoRef = useRef<HTMLVideoElement | null>(null);

  // Audio volume state (0 to 100)
  const [volumePercent, setVolumePercent] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Timers & Stage completion timestamps (in elapsed seconds)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [stage1Time, setStage1Time] = useState<number | null>(null);
  const [stage2Time, setStage2Time] = useState<number | null>(null);
  const [stage3Time, setStage3Time] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Class Roll-Call Counter for Stage 3
  const [totalStudents, setTotalStudents] = useState<number>(28);
  const [accountedStudents, setAccountedStudents] = useState<number>(28);

  // Sync volume & mute state with background siren video
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    vid.volume = Math.max(0, Math.min(1, volumePercent / 100));
    vid.muted = isMuted || volumePercent === 0;
  }, [volumePercent, isMuted]);

  // Attempt playback when simulation mounts
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    vid.volume = 0.5;
    vid.play().catch(() => {});
  }, []);

  // Pause siren video when drill is completed
  useEffect(() => {
    const vid = sirenVideoRef.current;
    if (!vid) return;
    if (isCompleted) {
      vid.pause();
    } else {
      vid.play().catch(() => {});
    }
  }, [isCompleted]);

  // 1-second stopwatch & countdown interval while drill is active
  useEffect(() => {
    if (isCompleted) return;
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [isCompleted]);

  const countdownRemaining = Math.max(0, TARGET_DRILL_SECONDS - elapsedSeconds);
  const performance = calculateDrillPerformance(
    stage1Time,
    stage2Time,
    stage3Time,
    elapsedSeconds
  );

  const handleStage1Acknowledge = () => {
    if (stage1Time === null) {
      setStage1Time(elapsedSeconds);
    }
  };

  const handleStage2Follow = () => {
    const now = elapsedSeconds;
    if (stage1Time === null) {
      setStage1Time(now);
    }
    if (stage2Time === null) {
      setStage2Time(now);
    }
  };

  const handleStage3ReachedAssembly = () => {
    const now = elapsedSeconds;
    if (stage1Time === null) {
      setStage1Time(now);
    }
    if (stage2Time === null) {
      setStage2Time(now);
    }
    if (stage3Time === null) {
      setStage3Time(now);
    }
    setIsCompleted(true);
  };

  const handleRestartSimulation = () => {
    setElapsedSeconds(0);
    setStage1Time(null);
    setStage2Time(null);
    setStage3Time(null);
    setIsCompleted(false);
    if (sirenVideoRef.current) {
      sirenVideoRef.current.currentTime = 0;
      sirenVideoRef.current.play().catch(() => {});
    }
  };

  const applyVolumePreset = (presetPercent: number) => {
    if (presetPercent === 0) {
      setIsMuted(true);
      setVolumePercent(0);
    } else {
      setIsMuted(false);
      setVolumePercent(presetPercent);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={
        isAr
          ? 'محاكاة الطوارئ والإخلاء الافتراضي الحية'
          : 'Live Virtual Emergency Evacuation Simulation'
      }
      data-testid="emergency-simulation-overlay"
      className={`fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] text-slate-900 ${
        isCompleted
          ? 'ring-4 ring-inset ring-[#10B981]'
          : 'animate-emergency-border'
      }`}
    >
      {/* Background Loop Video (/videos/Siren Video.mp4) with Light Translucent Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <video
          ref={sirenVideoRef}
          src="/videos/Siren Video.mp4"
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover opacity-22"
        />
        <div
          className="absolute inset-0"
          style={{
            background: isCompleted
              ? 'linear-gradient(180deg, rgba(236, 253, 245, 0.92) 0%, rgba(250, 248, 245, 0.95) 100%)'
              : 'linear-gradient(180deg, rgba(254, 242, 242, 0.90) 0%, rgba(255, 251, 235, 0.93) 100%)',
          }}
        />
      </div>

      {/* Foreground Interactive Simulation Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Top Command Bar + Floating Audio Volume Controller */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-center">
          {/* School Identity & 3 Official Logos + Return Button (5 Cols) */}
          <div className="xl:col-span-5 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-3.5 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1 shrink-0">
                <div className="h-9 w-9 rounded-xl bg-[#FAF8F5] p-1 border border-slate-200 flex items-center justify-center">
                  <img
                    src="/images/moe.png"
                    alt="MoE"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="h-9 w-9 rounded-xl bg-[#FAF8F5] p-1 border border-slate-200 flex items-center justify-center">
                  <img
                    src="/images/ataa_logoo.png"
                    alt="Ataa"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="h-9 w-9 rounded-xl bg-[#FAF8F5] p-1 border border-slate-200 flex items-center justify-center">
                  <img
                    src="/images/meis_logoo.png"
                    alt="MEIS AlMuruj"
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900">
                  {isAr
                    ? 'مدرسة الشرق الأوسط العالمية - المروج'
                    : 'MEIS AlMuruj — Live Drill'}
                </div>
                <div className="text-[11px] font-bold text-[#D97706]">
                  {isAr
                    ? 'شركة عطاء التعليمية · وزارة التعليم'
                    : 'Ataa Educational · Ministry of Education'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onToggleLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
                <span>{isAr ? '🌐 English' : '🌐 العربية'}</span>
              </button>

              <button
                type="button"
                onClick={onCloseSimulation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5 text-[#10B981]" aria-hidden="true" />
                <span>{isAr ? 'إنهاء والعودة' : 'Exit Drill'}</span>
              </button>
            </div>
          </div>

          {/* Mandatory Audio Control Bar (7 Cols) */}
          <div
            data-testid="siren-audio-controller"
            className="xl:col-span-7 bg-white/95 backdrop-blur-xl border-2 border-[#F59E0B] rounded-3xl p-3.5 shadow-sm flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                {isMuted || volumePercent === 0 ? (
                  <VolumeX className="w-5 h-5 text-[#EF4444]" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
                )}
              </div>
              <div>
                <label
                  htmlFor="siren-volume-slider"
                  className="block text-xs font-extrabold text-slate-900"
                >
                  {isAr
                    ? `مستوى صوت صافرة الإنذار: ${isMuted ? '0%' : `${volumePercent}%`}`
                    : `Siren Audio Volume: ${isMuted ? '0%' : `${volumePercent}%`}`}
                </label>
                <span className="text-[11px] font-medium text-slate-600">
                  {isAr
                    ? 'اخفض الصوت إلى 20% للتحدث مع الطلاب بوضوح أثناء التمرين'
                    : 'Lower to 20% while speaking instructions to students'}
                </span>
              </div>
            </div>

            {/* Slider + Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 flex-1 justify-end">
              <input
                id="siren-volume-slider"
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volumePercent}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setVolumePercent(val);
                  setIsMuted(val === 0);
                }}
                aria-label={isAr ? 'شريط التحكم بمستوى صوت صافرة الإنذار' : 'Siren Audio Volume Slider'}
                className="w-28 sm:w-36 accent-[#EF4444] cursor-pointer"
              />

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => applyVolumePreset(100)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isMuted && volumePercent === 100
                      ? 'bg-[#F59E0B] text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isAr ? '100% كامل' : '100% Full'}
                </button>
                <button
                  type="button"
                  onClick={() => applyVolumePreset(50)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isMuted && volumePercent === 50
                      ? 'bg-[#F59E0B] text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isAr ? '50% متوسط' : '50% Medium'}
                </button>
                <button
                  type="button"
                  onClick={() => applyVolumePreset(20)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    !isMuted && volumePercent === 20
                      ? 'bg-[#F59E0B] text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isAr ? '20% صوت المعلم' : '20% Low (Teacher Voiceover)'}
                </button>
                <button
                  type="button"
                  onClick={() => applyVolumePreset(0)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isMuted || volumePercent === 0
                      ? 'bg-[#EF4444] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {isAr ? 'كتم 🔇' : 'Mute 🔇'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate On-Screen Emergency Banner OR Completion Banner */}
        {!isCompleted ? (
          <div className="bg-white border-2 border-[#EF4444] rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_-15px_rgba(239,68,68,0.2)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EF4444] flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                  <Siren className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <p
                    dir="ltr"
                    className="font-display text-base sm:text-xl font-extrabold text-[#DC2626] leading-snug text-start"
                  >
                    EMERGENCY ALERT! An evacuation drill is now in progress. Please stop the lesson and follow the emergency instructions.
                  </p>
                  <p
                    dir="rtl"
                    className="text-base sm:text-xl font-extrabold text-slate-900 leading-snug text-start"
                    style={{ fontFamily: 'var(--font-ar)' }}
                  >
                    إنذار طوارئ! يجري الآن تمرين إخلاء افتراضي. يرجى إيقاف الدرس فوراً واتباع تعليمات الطوارئ.
                  </p>
                </div>
              </div>

              {/* Live Drill Countdown Timer (04:00) & Elapsed Stopwatch */}
              <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#F59E0B] text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold text-[#B45309]">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isAr ? 'العد التنازلي المستهدف' : 'Target Countdown'}</span>
                  </div>
                  <div
                    dir="ltr"
                    data-testid="countdown-timer"
                    className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-[#D97706] tabular-nums"
                  >
                    {formatTimeMMSS(countdownRemaining)}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-center">
                  <div className="text-[11px] font-bold text-slate-600">
                    {isAr ? 'زمن الاستجابة المنقضي' : 'Elapsed Stopwatch'}
                  </div>
                  <div
                    dir="ltr"
                    data-testid="elapsed-stopwatch"
                    className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums"
                  >
                    {formatTimeMMSS(elapsedSeconds)}
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Progress Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-2">
                <span>
                  {isAr
                    ? `تقدم مراحل الإخلاء الفصلي: ${performance.completedStagesCount} من 3 مراحل مكتملة`
                    : `Class Evacuation Progress: ${performance.completedStagesCount} of 3 Stages Completed`}
                </span>
                <span dir="ltr" className="font-mono text-[#EF4444]">
                  {performance.progressPercent}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/80">
                <div
                  className="h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.max(6, performance.progressPercent)}%`,
                    background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2 Step 5: Simulation Completion Screen */
          <div
            data-testid="drill-completion-card"
            className="bg-white border-2 border-[#10B981] rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.2)] space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981] flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                  <ShieldCheck className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="text-xs font-extrabold text-[#059669]">
                    {isAr
                      ? 'الحالة: تم الوصول الآمن واكتمل التمرين بنجاح'
                      : 'STATUS: SAFE ASSEMBLY REACHED · DRILL COMPLETE'}
                  </div>
                  <h2
                    dir="ltr"
                    className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 text-start"
                  >
                    EVACUATION DRILL COMPLETED. Thank you for your cooperation.
                  </h2>
                  <p
                    dir="rtl"
                    className="text-lg sm:text-2xl font-extrabold text-[#059669] text-start"
                    style={{ fontFamily: 'var(--font-ar)' }}
                  >
                    اكتمل تمرين الإخلاء بنجاح. شكراً لتعاونكم والتزامكم بتعليمات السلامة.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleRestartSimulation}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm font-bold text-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>{isAr ? '🔄 إعادة المحاكاة' : '🔄 Restart Simulation'}</span>
                </button>
                <button
                  type="button"
                  onClick={onCloseSimulation}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white text-sm font-extrabold shadow-md shadow-emerald-500/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Home className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isAr ? '🏠 العودة للصفحة الرئيسية' : '🏠 Return to Safety Portal'}
                  </span>
                </button>
              </div>
            </div>

            {/* Drill Performance Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200">
                <div className="text-xs font-bold text-slate-600">
                  {isAr
                    ? 'زمن الاستجابة للإنذار (المرحلة ١)'
                    : 'Time to Acknowledge Alert (Stage 1)'}
                </div>
                <div dir="ltr" className="mt-1 font-mono text-2xl font-extrabold text-[#D97706] tabular-nums text-start">
                  {formatTimeMMSS(performance.acknowledgeSeconds)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
                <div className="text-xs font-bold text-slate-600">
                  {isAr
                    ? 'زمن بدء التحرك المنظم (المرحلة ٢)'
                    : 'Time to Follow Instructions (Stage 2)'}
                </div>
                <div dir="ltr" className="mt-1 font-mono text-2xl font-extrabold text-[#EA580C] tabular-nums text-start">
                  {formatTimeMMSS(performance.followSeconds)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-xs font-bold text-slate-600">
                  {isAr
                    ? 'إجمالي زمن الإخلاء (مقابل الهدف 04:00)'
                    : 'Total Evacuation Time vs. 04:00 Target'}
                </div>
                <div dir="ltr" className="mt-1 font-mono text-2xl font-extrabold text-[#059669] tabular-nums text-start">
                  {formatTimeMMSS(performance.totalSeconds)} / 04:00
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981]">
                <div className="text-xs font-bold text-slate-600">
                  {isAr
                    ? 'تقييم الجاهزية وحصر الطلاب'
                    : 'Readiness Rating & Roll Call'}
                </div>
                <div className="mt-1 text-base font-extrabold text-[#059669]">
                  {isAr ? performance.ratingAr : performance.ratingEn}
                </div>
                <div className="text-xs text-slate-600 font-mono font-bold mt-0.5">
                  {isAr
                    ? `تم حصر ${accountedStudents} / ${totalStudents} طالب`
                    : `${accountedStudents} / ${totalStudents} Students Accounted`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interactive 3-Stage Student & Teacher Action Plan (with Swipeable Carousels) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* STAGE 1: Alert Received & Immediate Protection (0:00 - 0:30) */}
          <div
            className={`bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 shadow-md transition-all ${
              stage1Time !== null
                ? 'border-[#10B981]'
                : 'border-[#EF4444]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-red-50 text-xs font-mono font-extrabold text-[#EF4444]">
                  {isAr ? 'المرحلة ١ · 0:00 - 0:30' : 'STAGE 1 · 0:00 - 0:30'}
                </span>
                {stage1Time !== null && (
                  <span dir="ltr" className="text-xs font-mono font-extrabold text-[#059669]">
                    ✓ {formatTimeMMSS(stage1Time)}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                {isAr
                  ? '١. استلام الإنذار والحماية الفورية'
                  : '1. Alert Received & Immediate Protection'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {isAr
                  ? 'أوقف الدرس فوراً، التزم الهدوء التام، ابتعد عن النوافذ الزجاجية، واحتمِ تحت الطاولة (انزل، احتمِ، تمسك) أو قف مستعداً بجانب المقعد.'
                  : 'Stop lesson immediately, stay calm, step away from windows, and take cover under desks (Drop, Cover, Hold) or stand ready by your desk.'}
              </p>

              {/* Stage 1 Interactive Swipeable Carousel */}
              <div className="mb-5">
                <SwipeableImageCarousel
                  slides={STAGE1_SLIDES}
                  lang={lang}
                  accentColor="red"
                  aspectClassName="aspect-[16/10]"
                  showThumbnails={true}
                  testIdPrefix="sim-stage1-carousel"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleStage1Acknowledge}
              data-testid="stage1-btn"
              className="w-full py-3.5 px-4 rounded-2xl font-display text-sm font-extrabold text-white shadow-md transition-all hover:brightness-105 flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background:
                  stage1Time !== null
                    ? '#10B981'
                    : 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
              }}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">
                {isAr
                  ? '✅ لقد استلمت الإنذار'
                  : '✅ I Have Received the Alert'}
              </span>
            </button>
          </div>

          {/* STAGE 2: Orderly Movement & Following Instructions (0:30 - 2:30) */}
          <div
            className={`bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 shadow-md transition-all ${
              stage2Time !== null
                ? 'border-[#10B981]'
                : stage1Time !== null
                ? 'border-[#F97316]'
                : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-50 text-xs font-mono font-extrabold text-[#D97706]">
                  {isAr ? 'المرحلة ٢ · 0:30 - 2:30' : 'STAGE 2 · 0:30 - 2:30'}
                </span>
                {stage2Time !== null && (
                  <span dir="ltr" className="text-xs font-mono font-extrabold text-[#059669]">
                    ✓ {formatTimeMMSS(stage2Time)}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                {isAr
                  ? '٢. التحرك المنظم واتباع التعليمات'
                  : '2. Orderly Movement & Following Instructions'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {isAr
                  ? 'اترك جميع الحقائب والمقتنيات خلفك. سر بهدوء في صف فردي دون ركض. استخدم الدرج فقط — يمنع استخدام المصاعد نهائياً. ساعد زملاءك.'
                  : 'Leave all bags behind. Walk calmly in a single file without running. Use stairs only—NEVER use elevators. Assist classmates who need help.'}
              </p>

              {/* Stage 2 Interactive Swipeable Carousel */}
              <div className="mb-5">
                <SwipeableImageCarousel
                  slides={STAGE2_SLIDES}
                  lang={lang}
                  accentColor="orange"
                  aspectClassName="aspect-[16/10]"
                  showThumbnails={true}
                  testIdPrefix="sim-stage2-carousel"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleStage2Follow}
              data-testid="stage2-btn"
              className="w-full py-3.5 px-4 rounded-2xl font-display text-sm font-extrabold text-white shadow-md transition-all hover:brightness-105 flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background:
                  stage2Time !== null
                    ? '#10B981'
                    : 'linear-gradient(135deg, #F97316 0%, #F59E0B 100%)',
              }}
            >
              <Footprints className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">
                {isAr
                  ? '🚶‍♂️ أنا أتبع التعليمات الآن'
                  : '🚶‍♂️ I Am Following the Instructions'}
              </span>
            </button>
          </div>

          {/* STAGE 3: Reaching the Designated Assembly Point & Roll Call (2:30 - 4:00) */}
          <div
            className={`bg-white rounded-3xl p-5 sm:p-6 flex flex-col justify-between border-2 shadow-md transition-all ${
              stage3Time !== null
                ? 'border-[#10B981]'
                : stage2Time !== null
                ? 'border-[#10B981]'
                : 'border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-xs font-mono font-extrabold text-[#059669]">
                  {isAr ? 'المرحلة ٣ · 2:30 - 4:00' : 'STAGE 3 · 2:30 - 4:00'}
                </span>
                {stage3Time !== null && (
                  <span dir="ltr" className="text-xs font-mono font-extrabold text-[#059669]">
                    ✓ {formatTimeMMSS(stage3Time)}
                  </span>
                )}
              </div>

              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-2">
                {isAr
                  ? '٣. الوصول لنقطة التجمع الآمنة وحصر الطلاب'
                  : '3. Reaching Assembly Point & Class Roll Call'}
              </h3>

              {/* Stage 3 Interactive Swipeable Carousel */}
              <div className="mb-3">
                <SwipeableImageCarousel
                  slides={STAGE3_SLIDES}
                  lang={lang}
                  accentColor="emerald"
                  aspectClassName="aspect-[16/9]"
                  showThumbnails={true}
                  testIdPrefix="sim-stage3-carousel"
                />
              </div>

              {/* Interactive Class Roll-Call Counter */}
              <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-slate-200/90 mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#059669] shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {isAr ? 'حصر الطلاب في نقطة التجمع' : 'Students Accounted For'}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500">
                      {accountedStudents >= totalStudents
                        ? isAr
                          ? 'جميع الطلاب متواجدون (٠ مفقود)'
                          : 'All students verified (0 missing)'
                        : isAr
                        ? `متبقي ${totalStudents - accountedStudents} للمطابقة`
                        : `${totalStudents - accountedStudents} remaining to verify`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setAccountedStudents((prev) => Math.max(0, prev - 1))}
                    aria-label={isAr ? 'إنقاص عدد الطلاب' : 'Decrease accounted students'}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span dir="ltr" className="font-mono text-sm font-extrabold text-[#059669] px-2 tabular-nums">
                    {accountedStudents}/{totalStudents}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setAccountedStudents((prev) => {
                        const next = prev + 1;
                        if (next > totalStudents) setTotalStudents(next);
                        return next;
                      })
                    }
                    aria-label={isAr ? 'زيادة عدد الطلاب' : 'Increase accounted students'}
                    className="p-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStage3ReachedAssembly}
              data-testid="stage3-btn"
              className="w-full py-3.5 px-4 rounded-2xl font-display text-sm font-extrabold text-white bg-[#10B981] hover:bg-[#059669] shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">
                {isAr
                  ? '📍 لقد وصلت إلى نقطة التجمع الآمنة'
                  : '📍 I Have Reached the Assembly Point'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
