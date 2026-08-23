import React from 'react';
import {
  RefreshCw,
  Sparkles,
  Wand2,
  Globe,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  BookCheck,
  Focus,
  Terminal
} from 'lucide-react';
import { FeedbackCard } from './FeedbackCard';
import { FinalCustomizer } from './FinalCustomizer';
import { Language, PerformanceAnswers, StateFeedbackItem } from '../types';

interface Step3FeedbackProps {
  suggestions: StateFeedbackItem[];
  selectedIndex: number;
  onSelectSuggestion: (index: number) => void;
  onTextChange: (id: string, newText: string) => void;
  onShuffle: () => void;
  answers: PerformanceAnswers;
  language: Language;
  onToggleLanguage: () => void;
  selectedText: string;
  onSelectedTextChange: (text: string) => void;
  additionalNote: string;
  onAdditionalNoteChange: (note: string) => void;
  onBack: () => void;
  onStartOver: () => void;
}

export const Step3Feedback: React.FC<Step3FeedbackProps> = ({
  suggestions,
  selectedIndex,
  onSelectSuggestion,
  onTextChange,
  onShuffle,
  answers,
  language,
  onToggleLanguage,
  selectedText,
  onSelectedTextChange,
  additionalNote,
  onAdditionalNoteChange,
  onBack,
  onStartOver
}) => {
  const isAr = language === 'ar';

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: Exact State Summary & Language Toggle & Shuffle */}
      <div className="w-full bg-white rounded-3xl border-2 border-[#1E293B] p-5 sm:p-6 shadow-pop relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Exact State Indicators */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-7 h-7 rounded-full bg-[#0487D9] text-white font-heading font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
                3
              </span>
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B]">
                {isAr ? 'الخطوة الثالثة: مقترحات التقرير المطابقة للحالة' : 'Step 3: State-Matched Feedback'}
              </h2>
            </div>

            {/* State Badges Row */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFFDF5] border border-[#1E293B] rounded-full font-bold text-slate-800 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{answers.rating} {isAr ? 'نجوم' : 'Stars'}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold border ${
                  answers.homework
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                    : 'bg-rose-50 text-rose-800 border-rose-400'
                }`}
              >
                <BookCheck className="w-3.5 h-3.5" />
                <span>{isAr ? (answers.homework ? 'الواجب: تم التسليم ✓' : 'الواجب: لم يسلّم ✗') : (answers.homework ? 'Homework: Done ✓' : 'Homework: Missed ✗')}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold border ${
                  answers.focus
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                    : 'bg-rose-50 text-rose-800 border-rose-400'
                }`}
              >
                <Focus className="w-3.5 h-3.5" />
                <span>{isAr ? (answers.focus ? 'التركيز: ممتاز ✓' : 'التركيز: مشتت ✗') : (answers.focus ? 'Focus: High ✓' : 'Focus: Low ✗')}</span>
              </span>

              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-bold border ${
                  answers.project
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                    : 'bg-rose-50 text-rose-800 border-rose-400'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{isAr ? (answers.project ? 'المشروع: تم التطبيق ✓' : 'المشروع: غير مكتمل ✗') : (answers.project ? 'Project: Applied ✓' : 'Project: Incomplete ✗')}</span>
              </span>
            </div>
          </div>

          {/* Quick Actions (Language Switch & Shuffle) */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Language Switch Toggle */}
            <button
              id="step3-language-toggle"
              type="button"
              onClick={onToggleLanguage}
              className="px-4 py-2 bg-[#FFFDF5] hover:bg-[#E0F2FE] text-[#1E293B] border-2 border-[#1E293B] rounded-full text-xs sm:text-sm font-heading font-bold shadow-pop-sm flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-[#0487D9]" />
              <span>{isAr ? 'English Language' : 'اللغة العربية'}</span>
            </button>

            {/* Shuffle Button */}
            <button
              id="btn-shuffle-feedback"
              type="button"
              onClick={onShuffle}
              className="px-4 py-2 bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] font-heading font-bold text-xs sm:text-sm rounded-full border-2 border-[#1E293B] shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-[#1E293B]" />
              <span>{isAr ? 'اقتراحات أخرى (توليد جديد)' : 'Show Different Feedback'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Feedback Cards Grid */}
      <div className="w-full bg-[#F0F9FF]/60 rounded-3xl border-2 border-[#1E293B] p-5 sm:p-7 shadow-pop relative bg-dot-grid-blue">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1E293B]">
              {isAr ? 'اختر القالب الأنسب أو انسخه فوراً' : 'Select or Copy Best Matching Template'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {isAr
                ? 'تم استرجاع قوالب مطابقة تماماً للمدخلات وبدون تكرار. انقر على "اختيار" لتعديل القالب وتخصيصه بالأسفل.'
                : 'Strictly matched templates retrieved without repetition. Click "Select" to edit and customize below.'}
            </p>
          </div>
        </div>

        {suggestions.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-[#1E293B] p-8 text-center shadow-pop">
            <Wand2 className="w-10 h-10 text-[#0487D9] mx-auto mb-2 opacity-80" />
            <p className="font-bold text-slate-700">
              {isAr ? 'لا توجد اقتراحات حالياً، انقر على زر التوليد' : 'No suggestions currently available. Click shuffle.'}
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

      {/* Final Customizer & Master Copy Box */}
      <FinalCustomizer
        selectedText={selectedText}
        onSelectedTextChange={onSelectedTextChange}
        additionalNote={additionalNote}
        onAdditionalNoteChange={onAdditionalNoteChange}
        language={language}
      />

      {/* Bottom Actions Bar (Back to Step 2 & Start Over / New Student) */}
      <div className="w-full bg-white rounded-2xl border-2 border-[#1E293B] p-4 shadow-pop flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          id="step3-btn-back"
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 rounded-full font-heading font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-[#1E293B] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isAr ? 'العودة لتعديل أداء الطالب' : 'Back to Performance'}</span>
        </button>

        <button
          id="btn-start-over"
          type="button"
          onClick={onStartOver}
          className="w-full sm:w-auto px-6 py-3 rounded-full font-heading font-bold text-xs sm:text-sm text-[#0369A1] bg-[#E0F2FE] hover:bg-[#BAE6FD] border-2 border-[#0487D9] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-[#0487D9]" />
          <span>{isAr ? 'طالب جديد / جلسة جديدة (إعادة البدء)' : 'New Student / Start Over'}</span>
        </button>
      </div>
    </div>
  );
};
