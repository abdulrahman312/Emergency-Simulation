import React, { useRef, useState } from 'react';
import {
  Video,
  Volume2,
  VolumeX,
  Shield,
  AlertTriangle,
  Footprints,
  MapPin,
  HeartPulse,
} from 'lucide-react';
import { Language } from '../utils/simulationLogic';
import { GOLDEN_RULES, GoldenRuleItem } from '../data/portalContent';
import { SwipeableImageCarousel } from './SwipeableImageCarousel';

interface MinistryVideoSectionProps {
  lang: Language;
}

const RULE_CAROUSEL_SLIDES = [
  {
    src: '/images/Classroom 1.jpg',
    labelEn: 'Rule 03 · Classroom Desk Protection (Drop, Cover & Hold)',
    labelAr: 'القاعدة ٠٣ · الاحتماء تحت الطاولة داخل الفصل الدراسي',
    sublabelEn: '/images/Classroom 1.jpg',
    sublabelAr: '/images/Classroom 1.jpg',
  },
  {
    src: '/images/Corridor 1.jpg',
    labelEn: 'Rule 04 · Orderly Single-File Movement in Safe Corridor',
    labelAr: 'القاعدة ٠٤ · السير في صف فردي منتظم عبر الممر الآمن',
    sublabelEn: '/images/Corridor 1.jpg',
    sublabelAr: '/images/Corridor 1.jpg',
  },
  {
    src: '/images/Assembly Point Boys 1.jpg',
    labelEn: 'Rule 05 · Gathering at Designated Safe Assembly Point',
    labelAr: 'القاعدة ٠٥ · التجمع في نقطة التجمع الآمنة لإجراء الحصر',
    sublabelEn: '/images/Assembly Point Boys 1.jpg',
    sublabelAr: '/images/Assembly Point Boys 1.jpg',
  },
];

export const MinistryVideoSection: React.FC<MinistryVideoSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const renderRuleIcon = (type: GoldenRuleItem['iconType']) => {
    switch (type) {
      case 'calm':
        return (
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
            <HeartPulse className="w-6 h-6 text-[#0284C7]" aria-hidden="true" />
          </div>
        );
      case 'window':
        return (
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-[#EF4444]" aria-hidden="true" />
          </div>
        );
      case 'desk':
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-[#D97706]" aria-hidden="true" />
          </div>
        );
      case 'stairs':
        return (
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
            <Footprints className="w-6 h-6 text-[#EA580C]" aria-hidden="true" />
          </div>
        );
      case 'assembly':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#059669]" aria-hidden="true" />
          </div>
        );
    }
  };

  return (
    <section id="moe-video" className="py-14 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D97706] mb-2">
            <Video className="w-4 h-4 text-[#EF4444]" aria-hidden="true" />
            <span>
              {isAr
                ? '٠١. الفيديو التوعوي الرسمي لوزارة التعليم والقواعد الذهبية الخمس'
                : '01. Official Ministry of Education Awareness Video & 5 Golden Rules'}
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {isAr
              ? 'إرشادات السلامة المدرسية والقواعد الذهبية الخمس للتصرف الصحيح'
              : 'Official Ministry of Education Safety Guidelines & 5 Golden Rules'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
            {isAr
              ? 'شاهد الفيديو التوعوي الرسمي الصادر عن وزارة التعليم، وتعرف على الخطوات الخمس الأساسية لحماية نفسك وزملائك داخل مدرسة الشرق الأوسط العالمية - المروج.'
              : 'Watch the official Ministry of Education awareness video with your class and review the five foundational safety behaviors practiced at MEIS AlMuruj.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Official MoE Video Player Card + Swipeable Reference Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-[0_14px_40px_-12px_rgba(15,23,42,0.08)]">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-slate-900">
                      {isAr
                        ? 'الفيديو التوعوي الرسمي - وزارة التعليم'
                        : 'Official Awareness Video — Ministry of Education'}
                    </h3>
                    <p dir="ltr" className="text-xs text-slate-500 font-mono text-start">
                      /videos/Ministry Video.mp4
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-bold text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-[#EF4444]" aria-hidden="true" />
                      <span>{isAr ? 'تشغيل الصوت' : 'Unmute Audio'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
                      <span>{isAr ? 'كتم الصوت' : 'Mute Audio'}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-950 aspect-video w-full relative">
                <video
                  ref={videoRef}
                  src="/videos/Ministry Video.mp4"
                  poster="/images/Building 1.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-contain"
                >
                  Your browser does not support HTML5 video playback.
                </video>
              </div>
            </div>

            {/* Interactive Swipeable Reference Photo Gallery for the Golden Rules */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-5 shadow-[0_14px_40px_-12px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-slate-700">
                  {isAr
                    ? 'معرض تفاعلي: اسحب لليمين أو اليسار لمعاينة تطبيق القواعد في المدرسة'
                    : 'Interactive Visual Guide: Swipe or use arrows to preview school safe zones'}
                </span>
                <span className="text-xs font-semibold text-[#D97706]">
                  {isAr ? 'قابل للسحب ⇄' : 'Swipeable ⇄'}
                </span>
              </div>
              <SwipeableImageCarousel
                slides={RULE_CAROUSEL_SLIDES}
                lang={lang}
                accentColor="amber"
                aspectClassName="aspect-[16/8]"
                showThumbnails={false}
                testIdPrefix="golden-rules-carousel"
              />
            </div>
          </div>

          {/* Right 5 Columns: The 5 Golden Rules List (Styled like Reference Exercise Cards) */}
          <div className="lg:col-span-5 space-y-3.5">
            {GOLDEN_RULES.map((rule) => (
              <div
                key={rule.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-5 shadow-[0_10px_28px_-10px_rgba(15,23,42,0.06)] hover:border-amber-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  {renderRuleIcon(rule.iconType)}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-extrabold text-slate-900">
                      {isAr ? rule.titleAr : rule.titleEn}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {isAr ? rule.descAr : rule.descEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
