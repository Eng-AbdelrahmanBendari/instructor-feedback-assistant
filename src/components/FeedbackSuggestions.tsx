import React from 'react';
import { RefreshCw, Wand2 } from 'lucide-react';
import { FeedbackCard } from './FeedbackCard';
import { Language, PerformanceAnswers, StateFeedbackItem } from '../types';

interface FeedbackSuggestionsProps {
  suggestions: StateFeedbackItem[];
  selectedIndex: number;
  onSelectSuggestion: (index: number) => void;
  onTextChange: (id: string, newText: string) => void;
  onShuffle: () => void;
  answers: PerformanceAnswers;
  language: Language;
}

export const FeedbackSuggestions: React.FC<FeedbackSuggestionsProps> = ({
  suggestions,
  selectedIndex,
  onSelectSuggestion,
  onTextChange,
  onShuffle,
  language
}) => {
  const isAr = language === 'ar';

  return (
    <div className="w-full bg-[#F0F9FF]/60 rounded-3xl border-2 border-[#1E293B] p-5 sm:p-7 shadow-pop relative bg-dot-grid-blue">
      {/* Header & Shuffle Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-[#0487D9] text-white font-heading font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
              3
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B]">
              {isAr ? 'الخطوة الثالثة: اختر أو عدّل القالب الأنسب' : 'Step 3: Suggested Feedback Templates'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            {isAr
              ? 'تم اختيار 5 قوالب مخصصة للحالة الحالية بذكاء وبدون تكرار.'
              : '5 tailored suggestions selected without repetition.'}
          </p>
        </div>

        <button
          id="btn-shuffle-feedback"
          type="button"
          onClick={onShuffle}
          className="px-5 py-2.5 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] font-heading font-bold text-xs sm:text-sm rounded-full border-2 border-[#1E293B] shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-[#1E293B]" />
          <span>{isAr ? 'اقتراحات أخرى (توليد جديد)' : 'Show Different Feedback'}</span>
        </button>
      </div>

      {/* Grid of Suggestions */}
      {suggestions.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-[#1E293B] p-8 text-center shadow-pop">
          <Wand2 className="w-10 h-10 text-[#0487D9] mx-auto mb-2 opacity-80" />
          <p className="font-bold text-slate-700">
            {isAr ? 'لا توجد اقتراحات حالياً، انقر على زر التوليد' : 'No suggestions currently available.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {suggestions.map((item, idx) => (
            <FeedbackCard
              key={item.id}
              item={item}
              index={idx}
              isSelected={selectedIndex === idx}
              onSelect={() => onSelectSuggestion(idx)}
              onTextChange={(newText) => onTextChange(item.id, newText)}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};
