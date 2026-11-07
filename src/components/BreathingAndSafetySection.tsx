import React, { useState, useEffect } from 'react';
import {
  Wind,
  AlertTriangle,
  Users,
  PhoneCall,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { Language, getBreathingState } from '../utils/simulationLogic';
import { EMERGENCY_CONTACTS } from '../data/portalContent';

interface BreathingAndSafetySectionProps {
  lang: Language;
}

export const BreathingAndSafetySection: React.FC<BreathingAndSafetySectionProps> = ({
  lang,
}) => {
  const isAr = lang === 'ar';
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [cycleSeconds, setCycleSeconds] = useState(0);

  useEffect(() => {
    if (!isBreathingActive) return;
    const interval = window.setInterval(() => {
      setCycleSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isBreathingActive]);

  const breathingInfo = getBreathingState(cycleSeconds);

  return (
    <section id="calming-support" className="py-14">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D9488] mb-2">
            <Wind className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
            <span>
              {isAr
                ? '٠٥. تمرين التنفس التهدئي (٤-٤-٨) وتعليمات ما بعد الإنذار وأولياء الأمور'
                : '05. Ataa 4-4-8 Calming Breathing Exercise, Post-Alert Safety & Parent Rules'}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {isAr
              ? 'الدعم النفسي والهدوء، تنبيهات السلامة بعد انتهاء الحالة، وأرقام الطوارئ'
              : 'Psychological Calmness, Post-Alert Safety Rules & Official Emergency Contacts'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive 4-4-8 Breathing Widget (5 Columns - Styled Like Reference Activity Rings Card) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_16px_44px_-12px_rgba(15,23,42,0.07)]">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                    <Wind className="w-5 h-5 text-[#0D9488]" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-extrabold text-slate-900">
                    {isAr
                      ? 'تمرين التنفس التهدئي (٤ - ٤ - ٨)'
                      : 'Interactive 4-4-8 Breathing Guide'}
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#0D9488]">
                  {isAr ? 'دليل أزمات عطاء' : 'Ataa Crisis Guide'}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {isAr
                  ? 'يساعد هذا التمرين الطلاب على استعادة الهدوء وتنظيم ضربات القلب: شهيق (4 ثوانٍ) · احتفاظ بالنفس (4 ثوانٍ) · زفير بطيء (8 ثوانٍ).'
                  : 'Guide students through rhythmic calming breathing: Inhale 4 seconds · Hold 4 seconds · Exhale 8 seconds.'}
              </p>

              {/* Visual Animated Concentric Rings Inspired by Reference App */}
              <div className="my-6 flex flex-col items-center justify-center">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <div
                    className="w-36 h-36 rounded-full border-[6px] border-[#0D9488] bg-teal-50/70 flex flex-col items-center justify-center text-center p-4 transition-transform duration-700 ease-out shadow-inner"
                    style={{
                      transform: `scale(${isBreathingActive ? breathingInfo.scale : 1})`,
                    }}
                  >
                    <span className="text-xs font-extrabold text-[#0D9488]">
                      {isBreathingActive
                        ? isAr
                          ? breathingInfo.phaseLabelAr
                          : breathingInfo.phaseLabelEn
                        : isAr
                        ? 'جاهز للبدء'
                        : 'Ready to Start'}
                    </span>
                    <span dir="ltr" className="font-mono text-3xl font-extrabold text-slate-900 my-1 tabular-nums">
                      {isBreathingActive ? `${breathingInfo.secondsRemainingInPhase}s` : '4-4-8'}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {isAr
                        ? `المرحلة: ${breathingInfo.phaseDuration} ثوانٍ`
                        : `Phase: ${breathingInfo.phaseDuration}s`}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold min-h-[2.5rem]">
                  {isBreathingActive
                    ? isAr
                      ? breathingInfo.instructionAr
                      : breathingInfo.instructionEn
                    : isAr
                    ? 'اضغط على زر البدء لممارسة التنفس الجماعي مع الطلاب'
                    : 'Click Start below to practice calming breathing with your class'}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsBreathingActive((prev) => !prev)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs sm:text-sm font-bold shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isBreathingActive ? (
                  <>
                    <Pause className="w-4 h-4" aria-hidden="true" />
                    <span>{isAr ? 'إيقاف مؤقت' : 'Pause Exercise'}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>{isAr ? 'بدء تمرين التنفس' : 'Start Breathing Guide'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsBreathingActive(false);
                  setCycleSeconds(0);
                }}
                aria-label={isAr ? 'إعادة ضبط تمرين التنفس' : 'Reset breathing exercise'}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>{isAr ? 'إعادة' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Post-Alert Safety Warning & Parent Instructions */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Post-Alert Safety Warning Card */}
            <div className="bg-white border border-red-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_14px_40px_-12px_rgba(239,68,68,0.08)] flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#EF4444] mb-1">
                    {isAr
                      ? 'تحذير هام للسلامة بعد انتهاء الحالة'
                      : 'Critical Post-Alert Safety Warning'}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                    {isAr
                      ? 'عدم لمس أو الاقتراب من أي أجسام غريبة والانتظار حتى التصريح الرسمي'
                      : 'Never Touch Suspicious Objects & Wait for Official Clearance'}
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 leading-relaxed font-medium">
                    <li>
                      •{' '}
                      {isAr
                        ? 'يُمنع منعاً باتاً لمس أو الاقتراب من أي جسم غريب أو مشبوه على الأرض أو في الساحات أو الأسطح، ويجب إبلاغ المعلمين أو إدارة المدرسة فوراً.'
                        : 'Never touch, move, or approach any strange or unfamiliar object on the ground, courtyard, or roof; report it immediately to teachers or school management.'}
                    </li>
                    <li>
                      •{' '}
                      {isAr
                        ? 'لا تعُد إلى المبنى المدرسي أو الفصول الدراسية إلا بعد صدور التصريح الرسمي بالتأكد من سلامة المبنى.'
                        : 'Do not return inside the school building or classrooms until official safety clearance is announced by school leadership.'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Parent Instructions Card */}
            <div className="bg-white border border-amber-200/90 rounded-3xl p-6 sm:p-7 shadow-[0_14px_40px_-12px_rgba(245,158,11,0.08)] flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-[#D97706]" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#D97706] mb-1">
                    {isAr
                      ? 'إرشادات أولياء الأمور الكرام'
                      : 'Official Parent & Guardian Protocol'}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-2">
                    {isAr
                      ? 'إبقاء مسارات الطوارئ خالية ومتابعة الرسائل النصية الرسمية'
                      : 'Keep Emergency Lanes Clear & Follow Official School SMS'}
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-700 leading-relaxed font-medium">
                    <li>
                      •{' '}
                      {isAr
                        ? 'نرجو عدم الاندفاع نحو المدرسة أثناء الإنذار النشط لإبقاء الشوارع المحيطة ومسارات مركبات الطوارئ والدفاع المدني سالكة تماماً.'
                        : 'Do not rush to the campus during an active alert so surrounding roads and emergency vehicle lanes remain completely clear.'}
                    </li>
                    <li>
                      •{' '}
                      {isAr
                        ? 'تابع رسائل المدرسة النصية (SMS) الرسمية لمعرفة مواعيد الانصراف المنظم، مع إحضار بطاقة الهوية أو تصريح الاستلام المعتمد.'
                        : 'Follow official school SMS notifications and bring authorized ID for organized, verified student dismissal.'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Bar */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-[0_14px_40px_-12px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5 text-[#EF4444]" aria-hidden="true" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900">
              {isAr
                ? 'أرقام الطوارئ الرسمية في المملكة العربية السعودية (الرياض)'
                : 'Official Emergency Hotlines — Riyadh, Kingdom of Saudi Arabia'}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div
                key={contact.code}
                className={`p-4 rounded-2xl border flex flex-col justify-between ${
                  idx === 0
                    ? 'bg-red-50/70 border-red-200'
                    : 'bg-[#FAF8F5] border-slate-200/80'
                }`}
              >
                <div className="text-xs font-bold text-slate-700">
                  {isAr ? contact.nameAr : contact.nameEn}
                </div>
                <div
                  dir="ltr"
                  className={`mt-2 font-mono text-2xl sm:text-3xl font-extrabold tabular-nums text-start ${
                    idx === 0 ? 'text-[#EF4444]' : 'text-[#D97706]'
                  }`}
                >
                  {contact.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
