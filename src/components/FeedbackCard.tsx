import React, { useState } from 'react';
import { Copy, Check, Edit3, Sparkles } from 'lucide-react';
import { Language, StateFeedbackItem } from '../types';

interface FeedbackCardProps {
  item: StateFeedbackItem;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onTextChange: (newText: string) => void;
  language: Language;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  item,
  index,
  isSelected,
  onSelect,
  onTextChange,
  language
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const isAr = language === 'ar';

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`feedback-card-${item.id}`}
      onClick={onSelect}
      className={`rounded-2xl border-2 transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative group ${
        isSelected
          ? 'bg-white border-[#0487D9] shadow-pop -translate-y-1 ring-2 ring-[#0487D9]/20'
          : 'bg-white border-[#1E293B] shadow-pop hover:shadow-pop-hover hover:-translate-y-1'
      }`}
    >
      {/* Top Header / Meta */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full font-heading font-black text-xs flex items-center justify-center border border-[#1E293B] ${
                isSelected
                  ? 'bg-[#0487D9] text-white shadow-sm'
                  : 'bg-[#E0F2FE] text-[#0369A1]'
              }`}
            >
              {index + 1}
            </span>
            <span className="font-heading font-bold text-xs sm:text-sm text-slate-800">
              {isAr ? `الخيار ${index + 1}` : `Option ${index + 1}`}
            </span>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.tags?.slice(0, 2).map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Text / Editable Area */}
        <div className="mb-4">
          {isEditing ? (
            <div onClick={(e) => e.stopPropagation()}>
              <textarea
                value={item.text}
                onChange={(e) => onTextChange(e.target.value)}
                rows={4}
                className="w-full p-2.5 text-xs sm:text-sm text-slate-800 bg-[#FFFDF5] border-2 border-[#0487D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0487D9] leading-relaxed resize-none"
              />
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 text-xs font-bold bg-[#0487D9] text-white rounded-md hover:bg-[#0369A1]"
                >
                  {isAr ? 'تم الحفظ' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {item.text}
            </p>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2">
          {/* Inline Edit Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(!isEditing);
            }}
            className="p-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
            title={isAr ? 'تعديل هذا القالب' : 'Edit template inline'}
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline">{isAr ? 'تعديل' : 'Edit'}</span>
          </button>

          {/* Word Count */}
          <span className="text-[11px] text-slate-400 font-medium">
            {item.text.trim().split(/\s+/).length} {isAr ? 'كلمة' : 'words'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Card Direct Copy */}
          <button
            id={`btn-copy-card-${item.id}`}
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              copied
                ? 'bg-[#10B981] text-white border-[#1E293B] shadow-pop-sm'
                : 'bg-[#FFFDF5] text-slate-800 border-[#1E293B] shadow-pop-sm hover:bg-[#E0F2FE] hover:text-[#0369A1]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isAr ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isAr ? 'نسخ' : 'Copy'}</span>
              </>
            )}
          </button>

          {/* Select Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border-2 flex items-center gap-1 transition-all cursor-pointer ${
              isSelected
                ? 'bg-[#0487D9] text-white border-[#1E293B] shadow-pop-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#0487D9] hover:text-[#0487D9]'
            }`}
          >
            <span>{isSelected ? (isAr ? 'محدد حالياً ✓' : 'Selected ✓') : (isAr ? 'اختيار' : 'Select')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
