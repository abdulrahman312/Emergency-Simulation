import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  ShieldAlert,
  PackageX,
  Star,
  UserCheck,
  PhoneOff,
  ShieldCheck,
  DoorClosed,
  VolumeX,
} from 'lucide-react';
import { Language } from '../utils/simulationLogic';
import { AGE_GROUP_GUIDES, AgeGroupGuide } from '../data/portalContent';
import { SwipeableImageCarousel } from './SwipeableImageCarousel';
import {
  HeadNeckPostureIcon,
  WindowClearanceIcon,
  StairsOnlyIcon,
} from './SafetyInstructionIcons';

interface AgeGroupGuideSectionProps {
  lang: Language;
}

const AGE_GROUP_SLIDES: Record<
  AgeGroupGuide['id'],
  { src: string; labelEn: string; labelAr: string }[]
> = {
  kg: [
    {
      src: '/images/Classroom 1.jpg',
      labelEn: 'KG & Primary · Safe Hideout Under Desks',
      labelAr: 'رياض الأطفال · الاختباء الآمن تحت الطاولات',
    },
    {
      src: '/images/Lobby 1.jpg',
      labelEn: 'KG & Primary · Safety Train in Ground Lobby',
      labelAr: 'رياض الأطفال · قطار السلامة في البهو الأرضي',
    },
    {
      src: '/images/Assembly Point Girls 2.jpg',
      labelEn: 'KG & Primary · Protected Outdoor Assembly Court',
      labelAr: 'رياض الأطفال · ساحة التجمع الخارجية الآمنة',
    },
  ],
  elementary: [
    {
      src: '/images/Corridor 1.jpg',
      labelEn: 'Grades 4–6 · Silent Single-File Corridor Line',
      labelAr: 'المرحلة الابتدائية ٤–٦ · الصف الفردي الصامت في الممر',
    },
    {
      src: '/images/Classroom 2.jpg',
      labelEn: 'Grades 4–6 · Immediate Readiness Posture by Desk',
      labelAr: 'المرحلة الابتدائية ٤–٦ · وضعية الاستعداد الفوري بجانب الطاولة',
    },
    {
      src: '/images/Assembly Point Boys 1.jpg',
      labelEn: 'Grades 4–6 · Orderly Roll Call at Assembly Point',
      labelAr: 'المرحلة الابتدائية ٤–٦ · الاصطفاف المنظم في نقطة التجمع',
    },
  ],
  secondary: [
    {
      src: '/images/Lobby 3.jpg',
      labelEn: 'Middle & High School · Student Leaders Guiding Peers',
      labelAr: 'المتوسطة والثانوية · قادة الفصل يوجهون الزملاء',
    },
    {
      src: '/images/Building 3.jpg',
      labelEn: 'Middle & High School · Orderly Building Exit',
      labelAr: 'المتوسطة والثانوية · الخروج المنظم من المباني',
    },
    {
      src: '/images/Assembly Point Boys 2.jpg',
      labelEn: 'Middle & High School · Secondary Assembly Point Verification',
      labelAr: 'المتوسطة والثانوية · الحصر الدقيق في نقطة التجمع',
    },
  ],
};

export const AgeGroupGuideSection: React.FC<AgeGroupGuideSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeTabId, setActiveTabId] = useState<AgeGroupGuide['id']>('kg');

  const activeGuide =
    AGE_GROUP_GUIDES.find((g) => g.id === activeTabId) || AGE_GROUP_GUIDES[0];

  return (
    <section id="student-guide" className="py-14 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#059669] mb-2">
              {isAr
                ? '٠٣. الدليل الإرشادي حسب المرحلة الدراسية (بروتوكول وزارة التعليم)'
                : '03. Age-Specific Student Guide (Ministry of Education Protocol)'}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {isAr
                ? 'تعليمات مخصصة لكل مرحلة عمرية داخل المدرسة'
                : 'Tailored Emergency Procedures for Every Grade Level'}
            </h2>
          </div>

          {/* 3 Interactive Tabs Styled Like Reference App Segmented Controls */}
          <div
            role="tablist"
            aria-label={isAr ? 'مراحل الطلاب الدراسية' : 'Student Age Group Tabs'}
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs self-start"
          >
            {AGE_GROUP_GUIDES.map((guide) => {
              const isSelected = guide.id === activeTabId;
              return (
                <button
                  key={guide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTabId(guide.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D9488] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isAr ? guide.tabTitleAr : guide.tabTitleEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Age Group Content Panel */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_16px_44px_-12px_rgba(15,23,42,0.07)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0D9488] mb-2">
                  <Users className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                  <span>{isAr ? activeGuide.gradeRangeAr : activeGuide.gradeRangeEn}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  {isAr ? activeGuide.headlineAr : activeGuide.headlineEn}
                </h3>

                {/* Official Cue Callout */}
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-amber-200 mb-6">
                  <div className="text-xs font-extrabold text-[#B45309] mb-1">
                    {isAr ? 'النداء التربوي المعتمد في الفصل:' : 'Official Classroom Cue:'}
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-900">
                    {isAr ? activeGuide.cuePhraseAr : activeGuide.cuePhraseEn}
                  </p>
                </div>

                {/* Step-by-Step Instructions with Tailored Visual Icons */}
                <div className="space-y-3">
                  {(isAr ? activeGuide.stepsAr : activeGuide.stepsEn).map((step, index) => {
                    // Determine tailored icon based on active tab and step index
                    let StepIcon: React.ComponentType<{
                      className?: string;
                      'aria-hidden'?: boolean | 'true' | 'false';
                    }> = CheckCircle;
                    let iconBg = 'bg-emerald-50 text-[#059669] border-emerald-200';
                    let isSpecialPosture = false;

                    if (activeGuide.id === 'kg') {
                      if (index === 0) {
                        StepIcon = PackageX;
                        iconBg = 'bg-amber-50 text-[#D97706] border-amber-200';
                      } else if (index === 1) {
                        StepIcon = Users;
                        iconBg = 'bg-teal-50 text-[#0D9488] border-teal-200';
                      } else if (index === 2) {
                        StepIcon = HeadNeckPostureIcon;
                        iconBg = 'bg-red-50 text-[#DC2626] border-red-200';
                        isSpecialPosture = true;
                      } else if (index === 3) {
                        StepIcon = Star;
                        iconBg = 'bg-amber-50 text-[#F59E0B] border-amber-200';
                      }
                    } else if (activeGuide.id === 'elementary') {
                      if (index === 0) {
                        StepIcon = UserCheck;
                        iconBg = 'bg-emerald-50 text-[#059669] border-emerald-200';
                      } else if (index === 1) {
                        StepIcon = WindowClearanceIcon;
                        iconBg = 'bg-red-50 text-[#DC2626] border-red-200';
                      } else if (index === 2) {
                        StepIcon = StairsOnlyIcon;
                        iconBg = 'bg-orange-50 text-[#EA580C] border-orange-200';
                      } else if (index === 3) {
                        StepIcon = PhoneOff;
                        iconBg = 'bg-red-50 text-[#EF4444] border-red-200';
                      }
                    } else if (activeGuide.id === 'secondary') {
                      if (index === 0) {
                        StepIcon = ShieldCheck;
                        iconBg = 'bg-blue-50 text-[#0284C7] border-blue-200';
                      } else if (index === 1) {
                        StepIcon = UserCheck;
                        iconBg = 'bg-emerald-50 text-[#059669] border-emerald-200';
                      } else if (index === 2) {
                        StepIcon = DoorClosed;
                        iconBg = 'bg-amber-50 text-[#D97706] border-amber-200';
                      } else if (index === 3) {
                        StepIcon = VolumeX;
                        iconBg = 'bg-purple-50 text-[#7C3AED] border-purple-200';
                      }
                    }

                    return (
                      <div
                        key={index}
                        className={`flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl border transition-all ${
                          isSpecialPosture
                            ? 'bg-red-50/40 border-red-200 shadow-2xs'
                            : 'bg-[#FAF8F5] border-slate-200/80'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${iconBg}`}
                        >
                          <StepIcon className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {isSpecialPosture && (
                            <span className="inline-block mb-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#EF4444] text-white">
                              {isAr ? 'وضعية حماية الرأس والرقبة' : 'Head & Neck Protection Posture'}
                            </span>
                          )}
                          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                            {step}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Teacher Pedagogical Note */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                <ShieldAlert className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-bold text-slate-900">
                    {isAr ? 'توجيه للمعلمين والمعلمات: ' : 'Teacher Guidance: '}
                  </span>
                  <span>{isAr ? activeGuide.teacherNoteAr : activeGuide.teacherNoteEn}</span>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Interactive Swipeable Carousel for Active Grade Group */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="text-xs font-bold text-slate-500 mb-2 flex items-center justify-between">
                <span>
                  {isAr
                    ? 'معرض صور المرحلة الدراسية (اسحب للتنقل)'
                    : 'Grade-Level Visual Gallery (Swipe to browse)'}
                </span>
                <span className="text-[#0D9488]">{isAr ? '٣ صور' : '3 Photos'}</span>
              </div>
              <SwipeableImageCarousel
                key={activeGuide.id}
                slides={AGE_GROUP_SLIDES[activeGuide.id]}
                lang={lang}
                accentColor="emerald"
                aspectClassName="aspect-[16/11]"
                showThumbnails={true}
                testIdPrefix={`age-guide-${activeGuide.id}-carousel`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
