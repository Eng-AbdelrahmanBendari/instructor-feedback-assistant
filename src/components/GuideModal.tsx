import React, { useState } from 'react';
import { X, BookOpen, Check, Copy, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';
import { INSTRUCTOR_GUIDE } from '../data/guideData';
import { Language } from '../types';
import jupiterLogo from '../assets/images/logo.jpg';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const isAr = language === 'ar';

  if (!isOpen) return null;

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  const filteredGuides = INSTRUCTOR_GUIDE.filter((g) => {
    const term = search.toLowerCase();
    return (
      g.titleAr.toLowerCase().includes(term) ||
      g.titleEn.toLowerCase().includes(term) ||
      g.descAr.toLowerCase().includes(term) ||
      g.descEn.toLowerCase().includes(term)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDF5] w-full max-w-4xl max-h-[90vh] rounded-3xl border-2 border-[#1E293B] shadow-pop-lg flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-white px-6 py-4 border-b-2 border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white overflow-hidden flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm shrink-0">
              <img
                src={jupiterLogo}
                alt="JUPITER Logo"
                className="w-full h-full object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-[#1E293B]">
                {isAr ? 'دليل المدربين لكتابة تقارير الطلاب' : 'Instructor Feedback Writing Guide'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isAr ? 'إرشادات لكتابة تقارير احترافية ومخصصة وتفادي الصياغة الآلية' : 'Best practices for authentic, personal, and constructive student feedback'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 border-2 border-[#1E293B] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Search & Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Search */}
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث في إرشادات وقواعد الكتابة...' : 'Search guidelines, rules, or tips...'}
              className="w-full py-2.5 px-4 bg-white border-2 border-slate-300 rounded-xl focus:border-[#0487D9] focus:outline-none text-sm font-medium"
            />
          </div>

          {/* Guide Cards */}
          <div className="space-y-6">
            {filteredGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-[#1E293B] p-5 shadow-pop-sm space-y-4"
              >
                {/* Title & Description */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#E0F2FE] text-[#0369A1] font-bold text-xs flex items-center justify-center border border-[#0487D9]">
                      {idx + 1}
                    </span>
                    <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900">
                      {isAr ? guide.titleAr : guide.titleEn}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isAr ? guide.descAr : guide.descEn}
                  </p>
                </div>

                {/* Example Comparison: Good vs Generic */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {/* Good Example */}
                  <div className="bg-emerald-50/60 border border-emerald-300 rounded-xl p-3.5">
                    <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold mb-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{isAr ? 'مثال احترافي ومحدد (مكتوب بإيد):' : 'Authentic Specific Example:'}</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed">
                      "{isAr ? guide.exampleGoodAr : guide.exampleGoodEn}"
                    </p>
                  </div>

                  {/* Bad Example */}
                  {guide.exampleBadAr && (
                    <div className="bg-rose-50/60 border border-rose-300 rounded-xl p-3.5">
                      <div className="flex items-center gap-1.5 text-rose-800 text-xs font-bold mb-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>{isAr ? 'صياغة عامة أو آلية متكررة (تجنبها):' : 'Generic / Robotic Example (Avoid):'}</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        "{isAr ? guide.exampleBadAr : guide.exampleBadEn}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Reusable Phrases */}
                {guide.reusablePhrasesAr && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500 block mb-2">
                      {isAr ? 'عبارات جاهزة لإعادة الاستخدام (انقر للنسخ):' : 'Ready phrases to copy & insert:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(isAr ? guide.reusablePhrasesAr : guide.reusablePhrasesEn || []).map((phrase, pIdx) => {
                        const isCopied = copiedPhrase === phrase;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleCopyPhrase(phrase)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold'
                                : 'bg-[#FFFDF5] border-slate-300 text-slate-700 hover:border-[#0487D9] hover:bg-[#E0F2FE]'
                            }`}
                          >
                            {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                            <span>{phrase}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3 border-t-2 border-[#1E293B] flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            JUPITER Teaching Standards
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#0487D9] text-white font-heading font-bold text-xs rounded-full border-2 border-[#1E293B] shadow-pop-sm hover:bg-[#0369A1]"
          >
            {isAr ? 'إغلاق الدليل' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};
