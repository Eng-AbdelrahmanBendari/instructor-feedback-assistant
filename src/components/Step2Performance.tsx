import React from 'react';
import {
  CheckCircle2,
  XCircle,
  BookCheck,
  Focus,
  Terminal,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star
} from 'lucide-react';
import { Language, PerformanceAnswers, Rating } from '../types';

interface Step2PerformanceProps {
  answers: PerformanceAnswers;
  onChangeAnswer: <K extends keyof PerformanceAnswers>(key: K, value: PerformanceAnswers[K]) => void;
  onBack: () => void;
  onNext: () => void;
  language: Language;
}

export const Step2Performance: React.FC<Step2PerformanceProps> = ({
  answers,
  onChangeAnswer,
  onBack,
  onNext,
  language
}) => {
  const isAr = language === 'ar';

  const questions = [
    {
      key: 'homework' as const,
      icon: BookCheck,
      titleAr: '1. تسليم الواجب المنزلي',
      titleEn: '1. Homework Assignment',
      descAr: 'هل قام الطالب بحل وتسليم الواجب المطلوب في موعده؟',
      descEn: 'Did the student complete and submit the assigned homework?',
      currentValue: answers.homework,
      yesLabelAr: 'نعم، سلّم الواجب',
      yesLabelEn: 'Yes, Completed',
      noLabelAr: 'لم يسلّم الواجب',
      noLabelEn: 'No / Incomplete',
      badgeAr: 'التطبيق المنزلي',
      badgeEn: 'Home Practice'
    },
    {
      key: 'focus' as const,
      icon: Focus,
      titleAr: '2. التركيز والانتباه أثناء الشرح',
      titleEn: '2. Session Focus & Attention',
      descAr: 'هل كان الطالب مركزاً ومتفاعلاً طوال وقت السيشن؟',
      descEn: 'Was the student focused, alert, and engaged throughout?',
      currentValue: answers.focus,
      yesLabelAr: 'نعم، كان مركزاً',
      yesLabelEn: 'Yes, Fully Focused',
      noLabelAr: 'كان مشتتاً / قليل التركيز',
      noLabelEn: 'Distracted / Low Focus',
      badgeAr: 'التفاعل الصفي',
      badgeEn: 'Classroom Focus'
    },
    {
      key: 'project' as const,
      icon: Terminal,
      titleAr: '3. تطبيق وإنجاز المشروع العملي',
      titleEn: '3. Hands-on Project Execution',
      descAr: 'هل طبّق الطالب كود المشروع ونجح في تشغيله؟',
      descEn: 'Did the student apply the project code and execute it?',
      currentValue: answers.project,
      yesLabelAr: 'نعم، طبّق المشروع',
      yesLabelEn: 'Yes, Applied Project',
      noLabelAr: 'لم يطبّق / غير مكتمل',
      noLabelEn: 'Incomplete / Needs Work',
      badgeAr: 'التطبيق العملي',
      badgeEn: 'Hands-on Code'
    }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-[#1E293B] p-6 sm:p-8 shadow-pop relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#0487D9] text-white font-heading font-black text-base flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
            2
          </span>
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B]">
              {isAr ? 'الخطوة الثانية: أداء الطالب في الجلسة' : 'Step 2: Student Session Performance'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isAr
                ? 'حدد حالة الطالب في الجلسة للحصول على قوالب تطابق حالته بدقة وبدون عشوائية.'
                : 'Select the exact performance answers to retrieve strictly matched templates.'}
            </p>
          </div>
        </div>

        {/* Current State Summary Pill */}
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F0F9FF] border border-[#0487D9] rounded-full text-xs font-bold text-[#0369A1]">
          <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          <span>
            {isAr
              ? `التقييم المحدد: ${answers.rating} نجوم`
              : `Current Rating: ${answers.rating} Stars`}
          </span>
        </div>
      </div>

      {/* 3 Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {questions.map((q) => {
          const Icon = q.icon;
          const isYes = q.currentValue === true;

          return (
            <div
              key={q.key}
              className="bg-[#FFFDF5] rounded-2xl border-2 border-[#1E293B] p-5 flex flex-col justify-between shadow-pop-sm hover:border-[#0487D9] transition-all"
            >
              {/* Question Top */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] border border-[#0487D9] flex items-center justify-center text-[#0369A1] shadow-sm">
                    <Icon className="w-5 h-5 text-[#0487D9]" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-300">
                    {isAr ? q.badgeAr : q.badgeEn}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#1E293B] mb-1.5">
                  {isAr ? q.titleAr : q.titleEn}
                </h3>
                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                  {isAr ? q.descAr : q.descEn}
                </p>
              </div>

              {/* Yes / No Toggle Candy Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200/80">
                <button
                  id={`btn-${q.key}-yes`}
                  type="button"
                  onClick={() => onChangeAnswer(q.key, true)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isYes
                      ? 'bg-[#10B981] text-white border-[#1E293B] shadow-pop-sm -translate-y-0.5'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50 hover:border-emerald-400'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isYes ? 'text-white' : 'text-emerald-500'}`} />
                  <span>{isAr ? q.yesLabelAr : q.yesLabelEn}</span>
                </button>

                <button
                  id={`btn-${q.key}-no`}
                  type="button"
                  onClick={() => onChangeAnswer(q.key, false)}
                  className={`py-2.5 px-3 rounded-xl border-2 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    !isYes
                      ? 'bg-[#F43F5E] text-white border-[#1E293B] shadow-pop-sm -translate-y-0.5'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50 hover:border-rose-400'
                  }`}
                >
                  <XCircle className={`w-4 h-4 ${!isYes ? 'text-white' : 'text-rose-500'}`} />
                  <span>{isAr ? q.noLabelAr : q.noLabelEn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <button
          id="step2-btn-back"
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-3 rounded-full font-heading font-bold text-xs sm:text-sm text-slate-700 bg-white hover:bg-slate-100 border-2 border-slate-300 hover:border-[#1E293B] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isAr ? 'العودة لتعديل النجوم' : 'Back to Star Rating'}</span>
        </button>

        <button
          id="step2-btn-next"
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full font-heading font-black text-sm sm:text-base bg-[#FBBF24] hover:bg-[#F59E0B] text-[#1E293B] border-2 border-[#1E293B] shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <span>{isAr ? 'عرض قوالب التقرير المطابقة' : 'View Matching Feedback Templates'}</span>
          {isAr ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
