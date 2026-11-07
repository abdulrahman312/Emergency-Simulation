import React, { useState } from 'react';
import { Siren, Globe, Menu, X } from 'lucide-react';
import { Language } from '../utils/simulationLogic';

interface HeaderProps {
  lang: Language;
  onToggleLanguage: () => void;
  onTriggerSimulation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLanguage,
  onTriggerSimulation,
}) => {
  const isAr = lang === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#moe-video', labelEn: 'Golden Rules', labelAr: 'القواعد الذهبية' },
    { href: '#scenarios', labelEn: 'Scenarios', labelAr: 'مسارات الطوارئ' },
    { href: '#student-guide', labelEn: 'Student Guide', labelAr: 'دليل المراحل' },
    { href: '#campus-map', labelEn: 'Campus Safe Zones', labelAr: 'خريطة المدرسة' },
    { href: '#calming-support', labelEn: 'Calming & Contacts', labelAr: 'التنفس والطوارئ' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left / Start Zone: 3 Official Logos + Dual-Language School Title */}
        <a href="#top" className="flex items-center gap-2 sm:gap-3 min-w-0 group shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#FAF8F5] p-1 sm:p-1.5 border border-slate-200/90 flex items-center justify-center shadow-2xs">
              <img
                src="/images/moe.png"
                alt="Ministry of Education Logo"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#FAF8F5] p-1 sm:p-1.5 border border-slate-200/90 flex items-center justify-center shadow-2xs">
              <img
                src="/images/ataa_logoo.png"
                alt="Ataa Educational Company Logo"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#FAF8F5] p-1 sm:p-1.5 border border-slate-200/90 flex items-center justify-center shadow-2xs">
              <img
                src="/images/meis_logoo.png"
                alt="Middle East International School AlMuruj Logo"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          <div className="min-w-0 hidden md:block">
            <div
              dir="ltr"
              className="font-display text-xs xl:text-sm font-extrabold text-slate-900 tracking-tight whitespace-nowrap"
            >
              Middle East International School - AlMuruj
            </div>
            <div
              dir="rtl"
              className="text-xs font-bold text-[#D97706] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-ar)' }}
            >
              مدرسة الشرق الأوسط العالمية - المروج
            </div>
          </div>
        </a>

        {/* Center Zone: Concise Single-Line Section Links */}
        <nav
          aria-label={isAr ? 'التنقل الرئيسي' : 'Primary Navigation'}
          className="hidden xl:flex items-center gap-4 text-xs font-bold text-slate-600 shrink-0"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#EF4444] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {isAr ? item.labelAr : item.labelEn}
            </a>
          ))}
        </nav>

        {/* Right / End Zone: Language Switcher + Quick Simulation Trigger + Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleLanguage}
            aria-label={isAr ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#0D9488] hidden sm:inline" aria-hidden="true" />
            <span>{isAr ? '🌐 English' : '🌐 العربية'}</span>
          </button>

          <button
            type="button"
            onClick={onTriggerSimulation}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-[11px] sm:text-xs font-extrabold shadow-md shadow-red-500/20 border border-red-500 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Siren className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0" aria-hidden="true" />
            <span className="sm:hidden">{isAr ? '🚨 محاكاة' : '🚨 Simulate'}</span>
            <span className="hidden sm:inline">
              {isAr ? '🚨 محاكاة الطوارئ' : '🚨 Simulate Emergency'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={isAr ? 'القائمة' : 'Toggle navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <div className="sm:hidden pb-2 mb-2 border-b border-slate-100">
            <div dir="ltr" className="font-display text-xs font-bold text-slate-900">
              Middle East International School - AlMuruj
            </div>
            <div
              dir="rtl"
              className="text-xs font-bold text-[#D97706]"
              style={{ fontFamily: 'var(--font-ar)' }}
            >
              مدرسة الشرق الأوسط العالمية - المروج
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-[#EF4444] text-xs font-semibold text-slate-800 transition-colors"
              >
                {isAr ? item.labelAr : item.labelEn}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
