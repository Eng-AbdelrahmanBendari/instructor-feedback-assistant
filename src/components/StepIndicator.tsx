import React from 'react';
import { Check, Star, UserCheck, FileText } from 'lucide-react';
import { Language, WizardStep } from '../types';

interface StepIndicatorProps {
  currentStep: WizardStep;
  onGoToStep: (step: WizardStep) => void;
  language: Language;
  ratingSelected: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onGoToStep,
  language,
  ratingSelected
}) => {
  const isAr = language === 'ar';

  const steps = [
    {
      num: 1 as WizardStep,
      icon: Star,
      titleAr: 'تقييم النجوم',
      titleEn: 'Star Rating',
      descAr: 'كم نجمة حصل عليها الطالب؟',
      descEn: 'Overall session rating',
      canNavigate: true
    },
    {
      num: 2 as WizardStep,
      icon: UserCheck,
      titleAr: 'أداء الطالب',
      titleEn: 'Performance',
      descAr: 'الواجب، التركيز، والمشروع',
      descEn: 'Homework, focus & project',
      canNavigate: ratingSelected
    },
    {
      num: 3 as WizardStep,
      icon: FileText,
      titleAr: 'التقرير والنسخ',
      titleEn: 'Feedback & Copy',
      descAr: 'النماذج المطابقة والتخصيص',
      descEn: 'Tailored templates & export',
      canNavigate: ratingSelected
    }
  ];

  return (
    <div className="w-full bg-white rounded-2xl border-2 border-[#1E293B] p-3 sm:p-4 shadow-pop mb-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <button
              key={step.num}
              id={`step-indicator-btn-${step.num}`}
              type="button"
              disabled={!step.canNavigate}
              onClick={() => step.canNavigate && onGoToStep(step.num)}
              className={`flex flex-col sm:flex-row items-center sm:items-start gap-2 p-2 sm:p-3 rounded-xl border-2 transition-all text-start cursor-pointer ${
                isActive
                  ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop-sm -translate-y-0.5'
                  : isCompleted
                  ? 'bg-[#F0FDF4] text-emerald-900 border-emerald-500 hover:border-[#1E293B] hover:shadow-pop-sm'
                  : step.canNavigate
                  ? 'bg-[#FFFDF5] text-slate-700 border-slate-300 hover:border-[#1E293B]'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-75'
              }`}
            >
              {/* Badge Icon / Number */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-heading font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border border-[#1E293B] shadow-sm ${
                  isActive
                    ? 'bg-[#FBBF24] text-[#1E293B]'
                    : isCompleted
                    ? 'bg-[#10B981] text-white'
                    : 'bg-white text-slate-700'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.num}
              </div>

              {/* Text Meta */}
              <div className="min-w-0 text-center sm:text-start hidden sm:block">
                <div className="font-heading font-bold text-xs sm:text-sm leading-tight truncate">
                  {isAr ? step.titleAr : step.titleEn}
                </div>
                <div
                  className={`text-[11px] leading-tight truncate mt-0.5 ${
                    isActive
                      ? 'text-blue-100'
                      : isCompleted
                      ? 'text-emerald-700'
                      : 'text-slate-500'
                  }`}
                >
                  {isAr ? step.descAr : step.descEn}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
