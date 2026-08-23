import React from 'react';
import { Star } from 'lucide-react';
import { Language, Rating } from '../types';

interface RatingSelectorProps {
  rating: Rating;
  onSelectRating: (rating: Rating) => void;
  language: Language;
}

interface RatingOption {
  value: Rating;
  stars: number;
  labelAr: string;
  labelEn: string;
  sublabelAr: string;
  sublabelEn: string;
}

const RATING_OPTIONS: RatingOption[] = [
  {
    value: 5,
    stars: 5,
    labelAr: '5 نجوم · متميز وفائق',
    labelEn: '5 Stars · Excellent',
    sublabelAr: 'أداء متكامل وتطبيق احترافي',
    sublabelEn: 'Flawless execution & high focus'
  },
  {
    value: 4,
    stars: 4,
    labelAr: '4 نجوم · جيد جدًا',
    labelEn: '4 Stars · Very Good',
    sublabelAr: 'مستوى قوي مع فرص للتحسين',
    sublabelEn: 'Solid work with growth points'
  },
  {
    value: 3,
    stars: 3,
    labelAr: '3 نجوم · يحتاج دعم وتدريب',
    labelEn: '3 Stars · Needs Practice',
    sublabelAr: 'قابلية جيدة تحتاج ممارسة منزلية',
    sublabelEn: 'Needs regular coding habit'
  },
  {
    value: 2,
    stars: 2,
    labelAr: 'نجمتان · خطة تحسين',
    labelEn: '2 Stars · Action Plan',
    sublabelAr: 'تراكم مهام يحتاج متابعة وتطبيق',
    sublabelEn: 'Needs guided catch-up'
  },
  {
    value: 1,
    stars: 1,
    labelAr: 'نجمة واحدة · متابعة عاجلة',
    labelEn: '1 Star · Needs Attention',
    sublabelAr: 'تنبيه ودعم مكثف لتعويض ما فاته',
    sublabelEn: 'Urgent intervention needed'
  }
];

export const RatingSelector: React.FC<RatingSelectorProps> = ({
  rating,
  onSelectRating,
  language
}) => {
  const isAr = language === 'ar';

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#1E293B] p-5 sm:p-6 shadow-pop relative overflow-hidden">
      {/* Playful Geometric Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#0487D9] text-white font-heading font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
            1
          </span>
          <h2 className="font-heading font-bold text-lg sm:text-xl text-[#1E293B]">
            {isAr ? 'الخطوة الأولى: كم نجمة حصل عليها الطالب؟' : 'Step 1: How many stars did the student receive?'}
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD] rounded-full">
          {isAr ? 'تقييم الجلسة' : 'Session Rating'}
        </span>
      </div>

      {/* Grid of Star Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {RATING_OPTIONS.map((opt) => {
          const isSelected = rating === opt.value;

          return (
            <button
              key={opt.value}
              id={`rating-btn-${opt.value}`}
              type="button"
              onClick={() => onSelectRating(opt.value)}
              className={`text-start p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop -translate-y-1'
                  : 'bg-[#FFFDF5] text-[#1E293B] border-[#1E293B] hover:bg-[#E0F2FE] hover:shadow-pop hover:-translate-y-0.5'
              }`}
            >
              {/* Header: Stars Icon Row & Selected Check Indicator */}
              <div className="flex items-center justify-between gap-1 mb-2.5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
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

                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#0487D9] font-black text-xs flex items-center justify-center border border-[#1E293B] shadow-sm shrink-0">
                    ✓
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-auto">
                <div className={`font-heading font-bold text-sm sm:text-base leading-snug ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>
                  {isAr ? opt.labelAr : opt.labelEn}
                </div>
                <div className={`text-xs mt-1 leading-normal ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {isAr ? opt.sublabelAr : opt.sublabelEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
