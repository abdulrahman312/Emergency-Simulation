/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MinistryVideoSection } from './components/MinistryVideoSection';
import { EmergencyScenariosSection } from './components/EmergencyScenariosSection';
import { AgeGroupGuideSection } from './components/AgeGroupGuideSection';
import { CampusGallerySection } from './components/CampusGallerySection';
import { BreathingAndSafetySection } from './components/BreathingAndSafetySection';
import { EmergencySimulationModal } from './components/EmergencySimulationModal';
import { Language } from './utils/simulationLogic';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  // Dynamically update document direction and language attribute
  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  const handleToggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isAr = lang === 'ar';

  return (
    <div
      id="top"
      className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 relative"
      style={{
        backgroundImage:
          'radial-gradient(circle at 8% 12%, rgba(16, 185, 129, 0.06), transparent 38%), radial-gradient(circle at 92% 35%, rgba(245, 158, 11, 0.08), transparent 45%)',
      }}
    >
      {/* MODE 1: Comprehensive Educational Homepage (Awareness Portal) */}
      <Header
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
        onTriggerSimulation={() => setIsSimulationActive(true)}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onTriggerSimulation={() => setIsSimulationActive(true)}
        />

        <MinistryVideoSection lang={lang} />

        <EmergencyScenariosSection lang={lang} />

        <AgeGroupGuideSection lang={lang} />

        <CampusGallerySection lang={lang} />

        <BreathingAndSafetySection lang={lang} />
      </main>

      {/* Institutional Footer with All 3 Official Logos (MoE, Ataa, MEIS AlMuruj) */}
      <footer className="border-t border-slate-200/90 bg-white py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* 3 Official Logos (No Background Box) + Dual School Name */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
            <div className="flex items-center gap-3.5 shrink-0">
              <img
                src="/images/moe.png"
                alt="Ministry of Education Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
              />
              <img
                src="/images/ataa_logoo.png"
                alt="Ataa Educational Company Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
              />
              <img
                src="/images/meis_logoo.png"
                alt="Middle East International School AlMuruj Logo"
                referrerPolicy="no-referrer"
                className="h-11 w-11 sm:h-12 sm:w-12 object-contain"
              />
            </div>

            <div>
              <div dir="ltr" className="font-display text-sm sm:text-base font-extrabold text-slate-900">
                Middle East International School - AlMuruj
              </div>
              <div
                dir="rtl"
                className="text-xs sm:text-sm font-bold text-[#D97706] mt-0.5"
                style={{ fontFamily: 'var(--font-ar)' }}
              >
                مدرسة الشرق الأوسط العالمية - المروج
              </div>
            </div>
          </div>

          {/* Quick Footer Links & Attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-semibold text-slate-600 text-center">
            <span>
              {isAr
                ? 'شركة عطاء التعليمية · وزارة التعليم · الرياض، المملكة العربية السعودية'
                : 'Ataa Educational Company · Ministry of Education · Riyadh, Saudi Arabia'}
            </span>
          </div>
        </div>
      </footer>

      {/* MODE 2: Full-Screen Interactive Emergency Simulation Overlay */}
      {isSimulationActive && (
        <EmergencySimulationModal
          lang={lang}
          onToggleLanguage={handleToggleLanguage}
          onCloseSimulation={() => setIsSimulationActive(false)}
        />
      )}
    </div>
  );
}
