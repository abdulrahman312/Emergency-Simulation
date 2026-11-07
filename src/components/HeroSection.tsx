import React from 'react';
import {
  Siren,
  ShieldAlert,
  PlayCircle,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Language } from '../utils/simulationLogic';

interface HeroSectionProps {
  lang: Language;
  onTriggerSimulation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onTriggerSimulation,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#FAF8F5]">
      {/* Light Background Image using /images/Building 1.jpg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/images/Building 1.jpg"
          alt="MEIS AlMuruj Building 1 Campus Exterior"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        {/* Soft Luminous Light Gradient Wash inspired by the reference UI */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(125deg, rgba(250, 248, 245, 0.96) 0%, rgba(255, 255, 255, 0.86) 52%, rgba(254, 243, 199, 0.78) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 12% 25%, rgba(16, 185, 129, 0.10), transparent 45%), radial-gradient(circle at 88% 30%, rgba(245, 158, 11, 0.15), transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Primary Editorial Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D97706]">
              <ShieldAlert className="w-4 h-4 text-[#EF4444] shrink-0" aria-hidden="true" />
              <span>
                {isAr
                  ? 'وزارة التعليم · شركة عطاء التعليمية · مدرسة الشرق الأوسط العالمية - المروج (الرياض)'
                  : 'Ministry of Education · Ataa Educational Company · MEIS AlMuruj (Riyadh)'}
              </span>
            </div>

            <h1
              className="font-display font-extrabold text-slate-900 tracking-tight text-balance"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', lineHeight: 1.12 }}
            >
              {isAr ? (
                <>
                  بوابة <span className="text-[#EF4444]">الجاهزية للطوارئ</span> والإخلاء الافتراضي الآمن
                </>
              ) : (
                <>
                  Emergency <span className="text-[#EF4444]">Readiness</span> & Virtual Evacuation Portal
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-medium">
              {isAr
                ? 'منصة تفاعلية حديثة مخصصة للمعلمين والطلاب خلال الحصص الدراسية للتدريب العملي على إجراءات الإنذار المبكر، الاحتماء الداخلي الآمن، والإخلاء الخارجي المنظم إلى نقاط التجمع المعتمدة بالمدرسة.'
                : 'Interactive classroom readiness platform designed for live lessons to educate students on Early Warning Alert procedures, Internal Shelter-in-Place, and orderly External Evacuation to designated MEIS AlMuruj Assembly Points.'}
            </p>

            {/* Quick Action Buttons Inspired by Reference App */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#moe-video"
                className="inline-flex items-center gap-3 pl-5 pr-2.5 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] text-white text-sm font-bold shadow-md shadow-teal-600/20 transition-all whitespace-nowrap shrink-0"
              >
                <span>{isAr ? 'مشاهدة فيديو وزارة التعليم' : 'Watch Official MoE Video'}</span>
                <span className="w-8 h-8 rounded-full bg-white text-[#0D9488] flex items-center justify-center shrink-0">
                  {isAr ? (
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </span>
              </a>

              <a
                href="#campus-map"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/95 hover:bg-white border border-slate-200/90 text-sm font-bold text-slate-800 shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <MapPin className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
                <span>{isAr ? 'خريطة المدرسة ونقاط التجمع' : 'Explore Campus Safe Zones'}</span>
              </a>
            </div>

            {/* Campus Highlights Row (Inspired by Reference "Today's Progress" Metrics) */}
            <div className="pt-2 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#EF4444]">
                  <PlayCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isAr ? 'القواعد الذهبية' : 'Golden Rules'}</span>
                </div>
                <div className="mt-1 font-display text-lg sm:text-xl font-extrabold text-slate-900">
                  {isAr ? '٥ خطوات' : '5 Rules'}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F59E0B]">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isAr ? 'زمن الإخلاء' : 'Target Time'}</span>
                </div>
                <div dir="ltr" className="mt-1 font-mono text-lg sm:text-xl font-extrabold text-slate-900 text-start">
                  04:00 min
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-3.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#10B981]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{isAr ? 'مناطق الأمان' : 'Safe Zones'}</span>
                </div>
                <div className="mt-1 font-display text-lg sm:text-xl font-extrabold text-slate-900">
                  {isAr ? '١٤ موقعاً' : '14 Zones'}
                </div>
              </div>
            </div>
          </div>

          {/* Right / Centerpiece Teacher Command Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] relative overflow-hidden">
              {/* Top Soft Status Header */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-bold text-[#D97706] block">
                    {isAr
                      ? 'لوحة المعلم · التمرين الافتراضي المباشر'
                      : 'Teacher Command Deck · Live Class Drill'}
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {isAr
                      ? 'إطلاق محاكاة الطوارئ الحية'
                      : 'Launch Live Evacuation Drill'}
                  </h2>
                </div>

                {/* Circular Readiness Progress Ring Inspired by Fitness Reference Card */}
                <div className="relative w-16 h-16 rounded-full border-4 border-[#10B981] bg-emerald-50/70 flex flex-col items-center justify-center shrink-0">
                  <span dir="ltr" className="font-mono text-xs font-extrabold text-slate-900">
                    100%
                  </span>
                  <span className="text-[10px] font-bold text-[#059669]">
                    {isAr ? 'جاهز' : 'Ready'}
                  </span>
                </div>
              </div>

              {/* Campus Building 1 Preview Card inside Command Deck */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/8] mb-5 border border-slate-200">
                <img
                  src="/images/Building 1.jpg"
                  alt="MEIS AlMuruj Campus Building 1"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent p-3.5 flex items-end justify-between">
                  <div className="text-white">
                    <div className="text-xs font-bold text-[#FDE047]">
                      {isAr ? 'الحرم المدرسي · المبنى ١' : 'MEIS AlMuruj Campus · Building 1'}
                    </div>
                    <div className="text-xs text-slate-100">
                      {isAr
                        ? 'محاكاة صوتية ومرئية مع تحكم كامل بصوت المعلم'
                        : 'Audio-visual siren loop with teacher voiceover mixer'}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {isAr
                  ? 'يفعّل شاشة الإنذار الكاملة مع فيديو صافرة الإنذار، شريط خفض الصوت لتحدث المعلم، مؤقت الإخلاء (04:00)، ومراحل الاستجابة الثلاث.'
                  : 'Opens full-screen drill mode with campus siren loop video, teacher voiceover volume controls, 04:00 countdown timer, and 3-stage interactive check-in.'}
              </p>

              {/* Giant Pulsing CTA Button with Red/Amber Alert Colors */}
              <div className="relative my-1">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1.5 rounded-2xl border-2 border-[#EF4444]/55 animate-radar-ring"
                />
                <button
                  type="button"
                  onClick={onTriggerSimulation}
                  data-testid="hero-simulate-btn"
                  className="relative w-full py-4 px-5 rounded-2xl font-display text-sm sm:text-base font-extrabold text-white shadow-xl shadow-red-500/25 border border-red-400 transition-transform active:scale-[0.99] hover:brightness-105 flex items-center justify-between gap-3 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444 0%, #F97316 55%, #F59E0B 100%)',
                  }}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Siren className="w-5 h-5 text-white shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {isAr
                        ? '🚨 بدء محاكاة إنذار الطوارئ الآن'
                        : '🚨 SIMULATE EMERGENCY ALERT NOW'}
                    </span>
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white text-[#EF4444] flex items-center justify-center shrink-0 shadow-xs">
                    {isAr ? (
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
