import React from 'react';
import { Sparkles, BookOpen, RotateCcw, Globe, Library } from 'lucide-react';
import { Language } from '../types';
import jupiterLogo from '../../logo.png';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
  onOpenGuide: () => void;
  onOpenLibrary: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onReset,
  onOpenGuide,
  onOpenLibrary
}) => {
  const isAr = language === 'ar';

  return (
    <header className="w-full border-b-2 border-[#1E293B] bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          {/* Logo Badge */}
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#1E293B] overflow-hidden flex items-center justify-center shadow-pop-sm transition-transform group-hover:scale-105">
              <img
                src={jupiterLogo}
                alt="JUPITER Kid's School for Programming"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#34D399] border border-[#1E293B] rounded-full shadow-xs" title="JUPITER School Active" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-wider text-[#0487D9]">
                JUPITER
              </span>
              <span className="bg-[#E0F2FE] text-[#0369A1] text-xs font-bold px-2 py-0.5 rounded-full border border-[#0487D9]">
                {isAr ? 'مساعد المدربين' : 'Feedback Assistant'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isAr ? 'نظام تقارير وتقييم الطلاب الذكي' : 'Smart Student Feedback & Report System'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Language Toggle */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-full border-2 border-[#1E293B] shadow-pop-sm">
            <button
              id="lang-toggle-ar"
              type="button"
              onClick={() => onLanguageChange('ar')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                isAr
                  ? 'bg-[#0487D9] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              العربية
            </button>
            <button
              id="lang-toggle-en"
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                !isAr
                  ? 'bg-[#0487D9] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
          </div>

          {/* Guide Modal Trigger */}
          <button
            id="btn-open-guide"
            type="button"
            onClick={onOpenGuide}
            className="px-3.5 py-1.5 bg-[#FFFDF5] text-slate-800 text-xs sm:text-sm font-bold rounded-full border-2 border-[#1E293B] shadow-pop-sm hover:shadow-pop hover:bg-[#E0F2FE] hover:text-[#0369A1] transition-all flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
          >
            <BookOpen className="w-4 h-4 text-[#0487D9]" />
            <span>{isAr ? 'دليل التقارير' : 'Writing Guide'}</span>
          </button>

          {/* Template Library Trigger */}
          <button
            id="btn-open-library"
            type="button"
            onClick={onOpenLibrary}
            className="px-3.5 py-1.5 bg-[#FFFDF5] text-slate-800 text-xs sm:text-sm font-bold rounded-full border-2 border-[#1E293B] shadow-pop-sm hover:shadow-pop hover:bg-[#E0F2FE] hover:text-[#0369A1] transition-all flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
          >
            <Library className="w-4 h-4 text-[#0487D9]" />
            <span>{isAr ? 'المكتبة الشاملة' : 'Template Library'}</span>
          </button>

          {/* New Student / Reset */}
          <button
            id="btn-reset-session"
            type="button"
            onClick={onReset}
            className="px-3.5 py-1.5 bg-[#F43F5E] text-white text-xs sm:text-sm font-bold rounded-full border-2 border-[#1E293B] shadow-pop-sm hover:shadow-pop hover:bg-[#E11D48] transition-all flex items-center gap-1.5 active:translate-x-0.5 active:translate-y-0.5"
            title={isAr ? 'تصفير واختيار طالب جديد' : 'Reset and start for new student'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isAr ? 'طالب جديد' : 'New Student'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
