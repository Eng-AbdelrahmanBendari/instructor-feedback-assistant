import React, { useState } from 'react';
import { X, Library, Star, Copy, Check, Search, Filter, Sparkles, BookCheck, Focus, Terminal } from 'lucide-react';
import { ARABIC_STATE_FEEDBACKS } from '../data/arabicStateFeedbacks';
import { ENGLISH_STATE_FEEDBACKS } from '../data/englishStateFeedbacks';
import { Language, Rating, StateFeedbackItem } from '../types';
import jupiterLogo from '../assets/images/logo.jpg';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (text: string) => void;
  language: Language;
}

export const LibraryModal: React.FC<LibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  language
}) => {
  const [selectedRating, setSelectedRating] = useState<Rating | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const isAr = language === 'ar';

  if (!isOpen) return null;

  const dataset: StateFeedbackItem[] = language === 'ar' ? ARABIC_STATE_FEEDBACKS : ENGLISH_STATE_FEEDBACKS;

  const filteredItems = dataset.filter((item) => {
    const matchesRating = selectedRating === 'all' || item.rating === selectedRating;
    const matchesSearch =
      item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesRating && matchesSearch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FFFDF5] w-full max-w-5xl max-h-[90vh] rounded-3xl border-2 border-[#1E293B] shadow-pop-lg flex flex-col overflow-hidden">
        {/* Header */}
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
                {isAr ? 'مكتبة قوالب تقارير JUPITER الشاملة' : 'JUPITER Feedback Template Library'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isAr
                  ? `أكثر من ${dataset.length} قالب مصنف حسب النجوم والحالات السلوكية`
                  : `Browse & search ${dataset.length}+ curated state-specific feedback templates`}
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

        {/* Filters & Search */}
        <div className="p-4 sm:p-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute start-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في القوالب والوسوم...' : 'Search templates or tags...'}
              className="w-full ps-9 pe-4 py-2 text-xs sm:text-sm bg-[#F8FAFC] border-2 border-slate-300 rounded-xl focus:border-[#0487D9] focus:outline-none"
            />
          </div>

          {/* Rating filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto justify-start">
            <button
              type="button"
              onClick={() => setSelectedRating('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                selectedRating === 'all'
                  ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isAr ? 'الكل' : 'All'} ({dataset.length})
            </button>

            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRating(r as Rating)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                  selectedRating === r
                    ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>{r}★</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 bg-dot-grid">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border-2 border-slate-200">
              <p className="text-slate-500 font-bold">
                {isAr ? 'لا توجد قوالب تطابق معايير البحث' : 'No templates match your search filter.'}
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border-2 border-[#1E293B] p-4 shadow-pop-sm hover:border-[#0487D9] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <div className="flex items-center text-amber-500">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E0F2FE] text-[#0369A1]">
                        #{idx + 1}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {isAr
                          ? `واجب: ${item.homework ? '✓' : '✗'} · تركيز: ${item.focus ? '✓' : '✗'} · مشروع: ${item.project ? '✓' : '✗'}`
                          : `HW: ${item.homework ? 'Y' : 'N'} · Focus: ${item.focus ? 'Y' : 'N'} · Project: ${item.project ? 'Y' : 'N'}`}
                      </span>
                      {item.tags?.map((t, tidx) => (
                        <span
                          key={tidx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.text)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all flex items-center gap-1 cursor-pointer ${
                        isCopied
                          ? 'bg-[#10B981] text-white border-[#1E293B]'
                          : 'bg-[#FFFDF5] text-slate-800 border-[#1E293B] hover:bg-[#E0F2FE]'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectTemplate(item.text);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-[#0487D9] hover:bg-[#0369A1] text-white rounded-lg text-xs font-bold border-2 border-[#1E293B] shadow-pop-sm transition-all cursor-pointer"
                    >
                      {isAr ? 'استخدام في التقرير' : 'Use Template'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t-2 border-[#1E293B] flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">
            {filteredItems.length} {isAr ? 'قالب متاح' : 'templates shown'}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white font-heading font-bold text-xs rounded-full border border-slate-900 hover:bg-slate-700 cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
