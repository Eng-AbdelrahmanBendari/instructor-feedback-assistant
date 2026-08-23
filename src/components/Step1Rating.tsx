import React, { useState } from 'react';
import { Star, ArrowRight, ArrowLeft, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language, Rating } from '../types';

interface Step1RatingProps {
  rating: Rating | null;
  onSelectRating: (rating: Rating) => void;
  onNext: () => void;
  language: Language;
}

interface RatingCardInfo {
  value: Rating;
  stars: number;
  labelAr: string;
  labelEn: string;
  sublabelAr: string;
  sublabelEn: string;
  badgeAr: string;
  badgeEn: string;
}

const RATING_DETAILS: RatingCardInfo[] = [
  {
    value: 5,
    stars: 5,
    labelAr: '5 نجوم · متميز وفائق',
    labelEn: '5 Stars · Exceptional & Outstanding',
    sublabelAr: 'أداء متكامل، تركيز عالٍ، وتطبيق احترافي ومبتكر',
    sublabelEn: 'Flawless execution, deep focus, and creative code',
    badgeAr: 'أعلى تقييم',
    badgeEn: 'Top Rating'
  },
  {
    value: 4,
    stars: 4,
    labelAr: '4 نجوم · جيد جدًا',
    labelEn: '4 Stars · Very Good',
    sublabelAr: 'مستوى قوي ومجهود ملحوظ مع نقاط تطوير واضحة',
    sublabelEn: 'Solid progress and effort with actionable growth areas',
    badgeAr: 'مستوى متقدم',
    badgeEn: 'Advanced'
  },
  {
    value: 3,
    stars: 3,
    labelAr: '3 نجوم · يحتاج ممارسة وتدريب',
    labelEn: '3 Stars · Needs Practice & Support',
    sublabelAr: 'قابلية جيدة تحتاج تكرارًا وممارسة منزلية منتظمة',
    sublabelEn: 'Good potential requiring structured home coding habit',
    badgeAr: 'تطوير أساسيات',
    badgeEn: 'Needs Practice'
  },
  {
    value: 2,
    stars: 2,
    labelAr: 'نجمتان · خطة تحسين',
    labelEn: '2 Stars · Action Plan Required',
    sublabelAr: 'تراكم مهام وصعوبة في التطبيق تحتاج متابعة وتدريب',
    sublabelEn: 'Accumulated gaps needing guided review and catch-up',
    badgeAr: 'متابعة وتدريب',
    badgeEn: 'Action Plan'
  },
  {
    value: 1,
    stars: 1,
    labelAr: 'نجمة واحدة · متابعة عاجلة',
    labelEn: '1 Star · Urgent Attention Needed',
    sublabelAr: 'تنبيه ودعم مكثف لتعويض الفائت واستعادة المستوى',
    sublabelEn: 'Immediate intervention and recovery plan required',
    badgeAr: 'تنبيه عاجل',
    badgeEn: 'Urgent Alert'
  }
];

export const Step1Rating: React.FC<Step1RatingProps> = ({
  rating,
  onSelectRating,
  onNext,
  language
}) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const isAr = language === 'ar';

  const effectiveStars = hoveredRating !== null ? hoveredRating : rating || 0;

  const currentSelectedInfo = rating
    ? RATING_DETAILS.find((item) => item.value === rating)
    : null;

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-8 shadow-pop relative">
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#0487D9] text-white font-heading font-black text-base flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
            1
          </span>
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B]">
              {isAr ? 'الخطوة الأولى: كم نجمة حصل عليها الطالب؟' : 'Step 1: How many stars did the student receive?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isAr
                ? 'اختر عدد النجوم بناءً على التقييم الإجمالي لأداء الطالب في الجلسة.'
                : 'Select the overall star rating awarded for this session.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F0F9FF] border border-[#0487D9] rounded-full text-xs font-bold text-[#0369A1]">
          <Award className="w-4 h-4 text-[#0487D9]" />
          <span>{isAr ? 'تقييم الجلسة' : 'Session Rating'}</span>
        </div>
      </div>

      {/* Interactive Big Star Bar */}
      <div className="bg-[#FFFDF5] rounded-2xl border-2 border-[#1E293B] p-6 sm:p-8 mb-8 text-center shadow-sm relative overflow-hidden">
        <div className="text-xs font-heading font-bold uppercase tracking-wider text-slate-500 mb-3">
          {isAr ? 'انقر على النجوم لتحديد التقييم' : 'Click the stars to select rating'}
        </div>

        {/* 5 Big Stars */}
        <div
          className="flex items-center justify-center gap-2 sm:gap-4 my-2"
          onMouseLeave={() => setHoveredRating(null)}
        >
          {[1, 2, 3, 4, 5].map((starIndex) => {
            const isFilled = starIndex <= effectiveStars;

            return (
              <button
                key={starIndex}
                id={`star-select-${starIndex}`}
                type="button"
                onMouseEnter={() => setHoveredRating(starIndex)}
                onClick={() => onSelectRating(starIndex as Rating)}
                className="p-1 sm:p-2 transition-transform duration-150 transform hover:scale-125 active:scale-95 cursor-pointer focus:outline-none"
                title={`${starIndex} ${isAr ? 'نجوم' : 'Stars'}`}
              >
                <Star
                  className={`w-10 h-10 sm:w-14 sm:h-14 transition-colors duration-150 ${
                    isFilled
                      ? 'fill-amber-400 text-amber-500 drop-shadow-sm'
                      : 'fill-transparent text-slate-300 hover:text-amber-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Active Feedback Subtitle */}
        <div className="min-h-[28px] mt-3">
          {rating ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E0F2FE] border border-[#0487D9] rounded-full text-xs sm:text-sm font-bold text-[#0369A1] animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#0487D9]" />
              <span>
                {isAr
                  ? `تم اختيار: ${currentSelectedInfo?.labelAr}`
                  : `Selected: ${currentSelectedInfo?.labelEn}`}
              </span>
            </div>
          ) : (
            <span className="text-xs sm:text-sm text-slate-400 font-medium">
              {isAr ? 'لم يتم تحديد التقييم بعد (اختر من 1 إلى 5 نجوم)' : 'No rating chosen yet (select 1 to 5 stars)'}
            </span>
          )}
        </div>
      </div>

      {/* Grid of Star Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
        {RATING_DETAILS.map((opt) => {
          const isSelected = rating === opt.value;

          return (
            <button
              key={opt.value}
              id={`rating-card-btn-${opt.value}`}
              type="button"
              onClick={() => onSelectRating(opt.value)}
              className={`text-start p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop -translate-y-1'
                  : 'bg-[#FFFDF5] text-[#1E293B] border-[#1E293B] hover:bg-[#E0F2FE] hover:shadow-pop hover:-translate-y-0.5'
              }`}
            >
              {/* Card Header: Badge on Start & Checkmark on End */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border whitespace-nowrap ${
                    isSelected
                      ? 'bg-white/20 text-white border-white/40'
                      : 'bg-white text-slate-700 border-slate-300 shadow-sm'
                  }`}
                >
                  {isAr ? opt.badgeAr : opt.badgeEn}
                </span>

                {isSelected ? (
                  <span className="w-5 h-5 rounded-full bg-white text-[#0487D9] font-black text-xs flex items-center justify-center border border-[#1E293B] shadow-sm shrink-0">
                    ✓
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border border-slate-300/60 bg-transparent shrink-0 opacity-0 group-hover:opacity-100" />
                )}
              </div>

              {/* Dedicated Stars Row */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < opt.stars
                        ? isSelected
                          ? 'fill-amber-300 text-amber-300'
                          : 'fill-amber-400 text-amber-500'
                        : isSelected
                        ? 'text-white/40'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-auto">
                <div
                  className={`font-heading font-bold text-sm sm:text-base leading-snug ${
                    isSelected ? 'text-white' : 'text-[#1E293B]'
                  }`}
                >
                  {isAr ? opt.labelAr : opt.labelEn}
                </div>
                <div
                  className={`text-xs mt-1.5 leading-relaxed ${
                    isSelected ? 'text-blue-100' : 'text-slate-500'
                  }`}
                >
                  {isAr ? opt.sublabelAr : opt.sublabelEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Next Button Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          {rating
            ? isAr
              ? 'انقر على التالي للانتقال لتحديد أداء الطالب في الجلسة'
              : 'Click next to proceed to student performance answers'
            : isAr
            ? 'يرجى تحديد عدد النجوم للمتابعة'
            : 'Please select a star rating to proceed'}
        </div>

        <button
          id="step1-btn-next"
          type="button"
          disabled={!rating}
          onClick={onNext}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-black text-sm sm:text-base border-2 border-[#1E293B] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
            rating
              ? 'bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
              : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
          }`}
        >
          <span>{isAr ? 'الخطوة التالية: أداء الطالب' : 'Next: Student Performance'}</span>
          {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
