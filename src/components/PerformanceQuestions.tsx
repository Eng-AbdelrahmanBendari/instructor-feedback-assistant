import React from 'react';
import { CheckCircle2, XCircle, BookCheck, Focus, Terminal, Sparkles } from 'lucide-react';
import { Language, PerformanceAnswers } from '../types';

interface PerformanceQuestionsProps {
  answers: PerformanceAnswers;
  onChangeAnswer: <K extends keyof PerformanceAnswers>(key: K, value: PerformanceAnswers[K]) => void;
  language: Language;
}

export const PerformanceQuestions: React.FC<PerformanceQuestionsProps> = ({
  answers,
  onChangeAnswer,
  language
}) => {
  const isAr = language === 'ar';

  const questions = [
    {
      key: 'homework' as const,
      icon: BookCheck,
      titleAr: 'تسليم الواجب المنزلي',
      titleEn: 'Homework Assignment',
      descAr: 'هل قام الطالب بحل وتسليم الواجب المطلوب؟',
      descEn: 'Did the student complete and submit the homework?',
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
      titleAr: 'التركيز والانتباه أثناء الشرح',
      titleEn: 'Attention & Focus in Class',
      descAr: 'هل كان الطالب مركزًا ومتفاعلاً خلال الجلسة؟',
      descEn: 'Was the student focused and engaged throughout?',
      currentValue: answers.focus,
      yesLabelAr: 'نعم، كان مركزًا',
      yesLabelEn: 'Yes, Fully Focused',
      noLabelAr: 'كان مشتتًا / قليل التركيز',
      noLabelEn: 'Distracted / Needs Focus',
      badgeAr: 'التفاعل الصفي',
      badgeEn: 'Classroom Engagement'
    },
    {
      key: 'project' as const,
      icon: Terminal,
      titleAr: 'تطبيق وإنجاز المشروع العملي',
      titleEn: 'Hands-on Project Execution',
      descAr: 'هل طبّق الطالب المشروع وكتب الكود بنجاح؟',
      descEn: 'Did the student apply and complete the project code?',
      currentValue: answers.project,
      yesLabelAr: 'نعم، طبّق المشروع',
      yesLabelEn: 'Yes, Applied Project',
      noLabelAr: 'لم يطبّق / غير مكتمل',
      noLabelEn: 'Incomplete / Needs Work',
      badgeAr: 'التطبيق العملي',
      badgeEn: 'Hands-on Project'
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#1E293B] p-5 sm:p-6 shadow-pop relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#0487D9] text-white font-heading font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
            2
          </span>
          <h2 className="font-heading font-bold text-lg sm:text-xl text-[#1E293B]">
            {isAr ? 'الخطوة الثانية: أداء الطالب في الجلسة' : 'Step 2: Student Session Performance'}
          </h2>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F0F9FF] border border-[#0487D9] rounded-full text-xs font-bold text-[#0369A1]">
          <Sparkles className="w-3.5 h-3.5 text-[#0487D9]" />
          <span>
            {isAr
              ? `الحالة: ${answers.rating} نجوم · واجب ${answers.homework ? '✓' : '✗'} · تركيز ${answers.focus ? '✓' : '✗'} · مشروع ${answers.project ? '✓' : '✗'}`
              : `State: ${answers.rating}★ · HW: ${answers.homework ? 'Yes' : 'No'} · Focus: ${answers.focus ? 'Yes' : 'No'} · Project: ${answers.project ? 'Yes' : 'No'}`}
          </span>
        </div>
      </div>

      {/* 3 Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questions.map((q) => {
          const Icon = q.icon;
          const isYes = q.currentValue === true;

          return (
            <div
              key={q.key}
              className="bg-[#FFFDF5] rounded-xl border-2 border-[#1E293B] p-4 flex flex-col justify-between shadow-sm hover:border-[#0487D9] transition-colors"
            >
              {/* Question Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#E0F2FE] border border-[#0487D9] flex items-center justify-center text-[#0369A1]">
                    <Icon className="w-5 h-5 text-[#0487D9]" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                    {isAr ? q.badgeAr : q.badgeEn}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#1E293B] mb-1">
                  {isAr ? q.titleAr : q.titleEn}
                </h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  {isAr ? q.descAr : q.descEn}
                </p>
              </div>

              {/* Yes / No Toggle Candy Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button
                  id={`btn-${q.key}-yes`}
                  type="button"
                  onClick={() => onChangeAnswer(q.key, true)}
                  className={`py-2 px-2.5 rounded-lg border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
                  className={`py-2 px-2.5 rounded-lg border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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
    </div>
  );
};
