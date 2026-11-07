import React, { useState, useRef } from 'react';
import {
  MapPin,
  Shield,
  Building2,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  Language,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSwipeDirection,
} from '../utils/simulationLogic';
import {
  CAMPUS_GALLERY_ITEMS,
  CampusPhotoItem,
  CampusZoneCategory,
} from '../data/portalContent';
import { SwipeableImageCarousel } from './SwipeableImageCarousel';

interface CampusGallerySectionProps {
  lang: Language;
}

export const CampusGallerySection: React.FC<CampusGallerySectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<CampusZoneCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxTouchStartX = useRef<number | null>(null);

  const filteredItems = CAMPUS_GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const filterButtons: { id: CampusZoneCategory; labelEn: string; labelAr: string }[] = [
    {
      id: 'all',
      labelEn: `All Campus Zones (${CAMPUS_GALLERY_ITEMS.length})`,
      labelAr: `جميع مرافق المدرسة (${CAMPUS_GALLERY_ITEMS.length})`,
    },
    {
      id: 'assembly',
      labelEn: 'Safe Assembly Points (3)',
      labelAr: 'نقاط التجمع الآمنة (3)',
    },
    {
      id: 'shelter',
      labelEn: 'Internal Shelters: Lobbies & Corridors (4)',
      labelAr: 'الاحتماء الداخلي: الأبهية والممرات (4)',
    },
    {
      id: 'classroom',
      labelEn: 'Classrooms (3)',
      labelAr: 'الفصول الدراسية (3)',
    },
    {
      id: 'building',
      labelEn: 'Buildings 1–4 (4)',
      labelAr: 'المباني المدرسية ١–٤ (4)',
    },
  ];

  const getCategoryTextColor = (cat: CampusPhotoItem['category']) => {
    switch (cat) {
      case 'assembly':
        return 'text-[#059669]';
      case 'shelter':
        return 'text-[#D97706]';
      case 'classroom':
        return 'text-[#0284C7]';
      case 'building':
        return 'text-[#EA580C]';
    }
  };

  const activeLightboxItem =
    lightboxIndex !== null && filteredItems[lightboxIndex]
      ? filteredItems[lightboxIndex]
      : null;

  const handleLightboxNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(getNextSlideIndex(lightboxIndex, filteredItems.length));
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(getPrevSlideIndex(lightboxIndex, filteredItems.length));
  };

  return (
    <section id="campus-map" className="py-14 border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#059669] mb-2">
              <MapPin className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
              <span>
                {isAr
                  ? '٠٤. الخريطة المصورة لحرم مدرسة الشرق الأوسط العالمية - المروج ومناطق الأمان'
                  : '04. MEIS AlMuruj Campus Visual Map & Interactive Safe Zones Gallery'}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {isAr
                ? 'تعرف على نقاط التجمع للبنين والبنات والأبهية والممرات والفصول الدراسية'
                : 'Recognize Your Real School Assembly Points, Lobbies, Corridors & Buildings'}
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label={isAr ? 'تصفية مرافق المدرسة' : 'Filter Campus Safe Zones'}
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs self-start"
          >
            {filterButtons.map((btn) => {
              const active = selectedCategory === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setSelectedCategory(btn.id);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0D9488] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {isAr ? btn.labelAr : btn.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Widescreen Swipeable Showcase Carousel */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_16px_44px_-12px_rgba(15,23,42,0.07)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900">
                {isAr
                  ? 'المعرض التفاعلي السريع لمرافق المدرسة (اسحب لليمين أو اليسار)'
                  : 'Interactive Campus Walkthrough Carousel (Swipe or use arrows)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'اسحب الصور باللمس أو الماوس أو اضغط على أي صورة بالأسفل لتكبيرها'
                  : 'Drag/swipe horizontally or click the circular arrows to cycle through campus zones'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#0D9488]">
              {filteredItems.length} {isAr ? 'مواقع معروضة' : 'Locations Active'}
            </span>
          </div>

          <SwipeableImageCarousel
            key={selectedCategory}
            slides={filteredItems.map((item) => ({
              src: item.src,
              labelEn: `${item.titleEn} — ${item.zoneLabelEn}`,
              labelAr: `${item.titleAr} — ${item.zoneLabelAr}`,
              sublabelEn: item.descriptionEn,
              sublabelAr: item.descriptionAr,
            }))}
            lang={lang}
            accentColor="emerald"
            aspectClassName="aspect-[16/8] sm:aspect-[21/9]"
            showThumbnails={true}
            onInspectSlide={(_slide, idx) => setLightboxIndex(idx)}
            testIdPrefix="campus-main-carousel"
          />
        </div>

        {/* Visual Campus Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-white border border-slate-200/90 rounded-3xl overflow-hidden flex flex-col justify-between shadow-[0_10px_28px_-10px_rgba(15,23,42,0.06)] hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={item.src}
                    alt={isAr ? item.titleAr : item.titleEn}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(idx);
                      }}
                      aria-label={`${isAr ? 'تكبير صورة' : 'Inspect photo'} ${
                        isAr ? item.titleAr : item.titleEn
                      }`}
                      className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-sm border border-slate-200 flex items-center justify-center transition-transform group-hover:scale-105 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className={`text-xs font-extrabold mb-1 ${getCategoryTextColor(item.category)}`}>
                    {isAr ? item.zoneLabelAr : item.zoneLabelEn}
                  </div>
                  <h3 className="font-display text-base font-extrabold text-slate-900">
                    {isAr ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {isAr ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-100 bg-[#FAF8F5] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span dir="ltr" className="truncate">{item.src}</span>
                {item.category === 'assembly' ? (
                  <MapPin className="w-4 h-4 text-[#10B981] shrink-0" aria-hidden="true" />
                ) : item.category === 'shelter' ? (
                  <Shield className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                ) : (
                  <Building2 className="w-4 h-4 text-[#F97316] shrink-0" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Swipeable Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? activeLightboxItem.titleAr : activeLightboxItem.titleEn}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="max-w-4xl w-full bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              lightboxTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (lightboxTouchStartX.current !== null && e.changedTouches.length > 0) {
                const action = resolveSwipeDirection(
                  lightboxTouchStartX.current,
                  e.changedTouches[0].clientX,
                  isAr,
                  36
                );
                if (action === 'next') handleLightboxNext();
                else if (action === 'prev') handleLightboxPrev();
                lightboxTouchStartX.current = null;
              }
            }}
          >
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <div className={`text-xs font-bold ${getCategoryTextColor(activeLightboxItem.category)}`}>
                  {isAr ? activeLightboxItem.zoneLabelAr : activeLightboxItem.zoneLabelEn}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                  {isAr ? activeLightboxItem.titleAr : activeLightboxItem.titleEn}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span dir="ltr" className="text-xs font-mono font-bold text-slate-500 px-2">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={isAr ? 'إغلاق الصورة' : 'Close photo preview'}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative bg-slate-950 max-h-[68vh] flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxItem.src}
                alt={isAr ? activeLightboxItem.titleAr : activeLightboxItem.titleEn}
                referrerPolicy="no-referrer"
                className="max-h-[68vh] w-auto object-contain"
              />

              {filteredItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => (isAr ? handleLightboxNext() : handleLightboxPrev())}
                    aria-label={isAr ? 'الصورة التالية' : 'Previous photo'}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => (isAr ? handleLightboxPrev() : handleLightboxNext())}
                    aria-label={isAr ? 'الصورة السابقة' : 'Next photo'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-700">
              <p className="font-medium">
                {isAr ? activeLightboxItem.descriptionAr : activeLightboxItem.descriptionEn}
              </p>
              <span dir="ltr" className="text-xs font-mono text-slate-400 shrink-0">
                {activeLightboxItem.src}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
