import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import {
  Language,
  getNextSlideIndex,
  getPrevSlideIndex,
  resolveSwipeDirection,
} from '../utils/simulationLogic';

export interface CarouselPhotoSlide {
  src: string;
  labelEn: string;
  labelAr: string;
  sublabelEn?: string;
  sublabelAr?: string;
}

interface SwipeableImageCarouselProps {
  slides: CarouselPhotoSlide[];
  lang: Language;
  accentColor?: 'amber' | 'emerald' | 'red' | 'orange';
  aspectClassName?: string;
  showThumbnails?: boolean;
  onInspectSlide?: (slide: CarouselPhotoSlide, index: number) => void;
  testIdPrefix?: string;
}

export const SwipeableImageCarousel: React.FC<SwipeableImageCarouselProps> = ({
  slides,
  lang,
  accentColor = 'emerald',
  aspectClassName = 'aspect-[16/10]',
  showThumbnails = true,
  onInspectSlide,
  testIdPrefix = 'carousel',
}) => {
  const isAr = lang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);

  if (slides.length === 0) return null;

  const safeIndex = Math.min(currentIndex, slides.length - 1);
  const activeSlide = slides[safeIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => getNextSlideIndex(prev, slides.length));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => getPrevSlideIndex(prev, slides.length));
  };

  const handlePointerStart = (clientX: number) => {
    startXRef.current = clientX;
    setIsDragging(true);
    setDragOffsetX(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || startXRef.current === null) return;
    const delta = clientX - startXRef.current;
    setDragOffsetX(Math.max(-140, Math.min(140, delta)));
  };

  const handlePointerEnd = (clientX: number) => {
    if (!isDragging || startXRef.current === null) return;
    const action = resolveSwipeDirection(startXRef.current, clientX, isAr, 36);
    if (action === 'next') {
      handleNext();
    } else if (action === 'prev') {
      handlePrev();
    }
    startXRef.current = null;
    setIsDragging(false);
    setDragOffsetX(0);
  };

  const accentBorderMap = {
    amber: 'border-[#F59E0B]',
    emerald: 'border-[#10B981]',
    red: 'border-[#EF4444]',
    orange: 'border-[#F97316]',
  };

  const accentDotMap = {
    amber: 'bg-[#F59E0B]',
    emerald: 'bg-[#10B981]',
    red: 'bg-[#EF4444]',
    orange: 'bg-[#F97316]',
  };

  return (
    <div className="select-none" data-testid={testIdPrefix}>
      {/* Main Interactive Swipeable Stage */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm ${aspectClassName} cursor-grab active:cursor-grabbing group`}
        onTouchStart={(e) => handlePointerStart(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (e.changedTouches.length > 0) {
            handlePointerEnd(e.changedTouches[0].clientX);
          }
        }}
        onMouseDown={(e) => handlePointerStart(e.clientX)}
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onMouseUp={(e) => handlePointerEnd(e.clientX)}
        onMouseLeave={() => {
          if (isDragging) {
            startXRef.current = null;
            setIsDragging(false);
            setDragOffsetX(0);
          }
        }}
      >
        <img
          src={activeSlide.src}
          alt={isAr ? activeSlide.labelAr : activeSlide.labelEn}
          referrerPolicy="no-referrer"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-200 ease-out"
          style={{
            transform: isDragging ? `translateX(${dragOffsetX * 0.35}px) scale(1.01)` : 'translateX(0) scale(1)',
          }}
        />

        {/* Top Bar Overlay: Slide Counter + Optional Fullscreen Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <span
            dir="ltr"
            className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-xs font-mono font-bold shadow-xs border border-slate-200/70"
          >
            {safeIndex + 1} / {slides.length}
          </span>

          {onInspectSlide && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectSlide(activeSlide, safeIndex);
              }}
              aria-label={isAr ? 'تكبير الصورة' : 'Expand image fullscreen'}
              className="pointer-events-auto w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-sm border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Left / Right Circular Navigation Arrows (Inspired by Reference UI) */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isAr) handleNext();
                else handlePrev();
              }}
              data-testid={`${testIdPrefix}-prev-btn`}
              aria-label={isAr ? 'الصورة التالية' : 'Previous image'}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md border border-slate-200 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isAr) handlePrev();
                else handleNext();
              }}
              data-testid={`${testIdPrefix}-next-btn`}
              aria-label={isAr ? 'الصورة السابقة' : 'Next image'}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md border border-slate-200 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Bottom Caption Scrim */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-3.5 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs sm:text-sm font-bold text-white truncate">
              {isAr ? activeSlide.labelAr : activeSlide.labelEn}
            </div>
            {(activeSlide.sublabelEn || activeSlide.sublabelAr) && (
              <div className="text-[11px] text-slate-200 truncate">
                {isAr ? activeSlide.sublabelAr : activeSlide.sublabelEn}
              </div>
            )}
          </div>

          {/* Interactive Dot Indicators */}
          {slides.length > 1 && (
            <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.src + idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  aria-label={`${isAr ? 'الانتقال إلى الصورة' : 'Go to slide'} ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === safeIndex
                      ? `w-5 ${accentDotMap[accentColor]}`
                      : 'w-2 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Optional Thumbnail Strip Below */}
      {showThumbnails && slides.length > 1 && (
        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto pb-1">
          {slides.map((slide, idx) => {
            const isSelected = idx === safeIndex;
            return (
              <button
                key={slide.src + idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`${isAr ? 'معاينة' : 'Select'} ${
                  isAr ? slide.labelAr : slide.labelEn
                }`}
                className={`relative rounded-xl overflow-hidden h-12 w-16 shrink-0 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? `${accentBorderMap[accentColor]} shadow-xs scale-[1.03]`
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={slide.src}
                  alt={isAr ? slide.labelAr : slide.labelEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
