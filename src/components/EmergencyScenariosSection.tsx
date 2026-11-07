import React from 'react';
import { Shield, Footprints, CheckCircle2 } from 'lucide-react';
import { Language } from '../utils/simulationLogic';
import { EMERGENCY_SCENARIOS } from '../data/portalContent';
import { SwipeableImageCarousel } from './SwipeableImageCarousel';

interface EmergencyScenariosSectionProps {
  lang: Language;
}

export const EmergencyScenariosSection: React.FC<EmergencyScenariosSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="scenarios" className="py-14 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <p className="text-xs sm:text-sm font-bold text-[#EF4444] mb-2">
            {isAr
              ? '٠٢. سيناريوهات الطوارئ المعتمدة (بروتوكول الإنذار المبكر - وزارة التعليم)'
              : '02. Two Core Emergency Scenarios (MoE Early Warning Protocol)'}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {isAr
              ? 'المقارنة بين الاحتماء الداخلي الآمن والإخلاء الخارجي إلى نقاط التجمع'
              : 'Internal Shelter-in-Place vs. External Evacuation to Assembly Points'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl">
            {isAr
              ? 'يتحدد الإجراء الصحيح بناءً على نوع الإنذار وتوجيهات إدارة المدرسة. اسحب الصور في كل بطاقة لاستعراض المواقع الفعلية داخل المدرسة.'
              : 'Depending on the alert instruction from school leadership, classes execute either Internal Shelter-in-Place or External Evacuation. Swipe or click through the interactive photo galleries below.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {EMERGENCY_SCENARIOS.map((scenario) => {
            const isInternal = scenario.id === 'internal';

            return (
              <div
                key={scenario.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_16px_44px_-12px_rgba(15,23,42,0.07)]"
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${
                          isInternal
                            ? 'bg-amber-50 border-amber-200 text-[#D97706]'
                            : 'bg-emerald-50 border-emerald-200 text-[#059669]'
                        }`}
                      >
                        {isInternal ? (
                          <Shield className="w-6 h-6" aria-hidden="true" />
                        ) : (
                          <Footprints className="w-6 h-6" aria-hidden="true" />
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-xs font-bold ${
                            isInternal ? 'text-[#D97706]' : 'text-[#059669]'
                          }`}
                        >
                          {isAr ? scenario.badgeAr : scenario.badgeEn}
                        </div>
                        <h3 className="font-display text-xl font-extrabold text-slate-900">
                          {isAr ? scenario.titleAr : scenario.titleEn}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* When Used Callout */}
                  <div
                    className={`p-4 rounded-2xl border mb-5 ${
                      isInternal
                        ? 'bg-[#FFFBEB] border-amber-200/80'
                        : 'bg-[#ECFDF5] border-emerald-200/80'
                    }`}
                  >
                    <div
                      className={`text-xs font-extrabold mb-1 ${
                        isInternal ? 'text-[#B45309]' : 'text-[#047857]'
                      }`}
                    >
                      {isAr ? 'متى يُطبق هذا البروتوكول؟' : 'When This Protocol Is Activated:'}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {isAr ? scenario.whenUsedAr : scenario.whenUsedEn}
                    </p>
                  </div>

                  {/* Action Steps */}
                  <div className="space-y-2.5 mb-6">
                    {(isAr ? scenario.actionsAr : scenario.actionsEn).map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            isInternal ? 'text-[#F59E0B]' : 'text-[#10B981]'
                          }`}
                          aria-hidden="true"
                        />
                        <span className="leading-relaxed">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Swipeable Photo Carousel for Scenario */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>
                      {isAr
                        ? 'اسحب الصورة أو اضغط الأسهم للتنقل بين المرافق'
                        : 'Swipe image or click arrows to browse locations'}
                    </span>
                    <span className={isInternal ? 'text-[#D97706]' : 'text-[#059669]'}>
                      {scenario.photos.length} {isAr ? 'صور' : 'Photos'}
                    </span>
                  </div>
                  <SwipeableImageCarousel
                    slides={scenario.photos.map((p) => ({
                      src: p.src,
                      labelEn: p.labelEn,
                      labelAr: p.labelAr,
                      sublabelEn: p.src,
                      sublabelAr: p.src,
                    }))}
                    lang={lang}
                    accentColor={isInternal ? 'amber' : 'emerald'}
                    aspectClassName="aspect-[16/10]"
                    showThumbnails={true}
                    testIdPrefix={`scenario-${scenario.id}-carousel`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
