import React, { useState } from 'react';
import { Copy, Check, MessageSquarePlus, Sparkles, Send, FileText, PlusCircle } from 'lucide-react';
import { Language } from '../types';

interface FinalCustomizerProps {
  selectedText: string;
  onSelectedTextChange: (text: string) => void;
  additionalNote: string;
  onAdditionalNoteChange: (note: string) => void;
  language: Language;
}

export const FinalCustomizer: React.FC<FinalCustomizerProps> = ({
  selectedText,
  onSelectedTextChange,
  additionalNote,
  onAdditionalNoteChange,
  language
}) => {
  const [copied, setCopied] = useState(false);
  const isAr = language === 'ar';

  const finalCombinedMessage = additionalNote.trim()
    ? `${selectedText.trim()}\n\n${additionalNote.trim()}`
    : selectedText.trim();

  const handleCopy = () => {
    if (!finalCombinedMessage) return;
    navigator.clipboard.writeText(finalCombinedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Quick insertion chips
  const quickChips = isAr
    ? [
        { label: '+ مشروع الآلة الحاسبة', text: 'أنجز مشروع الآلة الحاسبة بدقة متناهية.' },
        { label: '+ مشروع الألعاب (Scratch/Python)', text: 'أضاف أفكارًا تفاعلية مميزة في مشروع اللعبة.' },
        { label: '+ حل مشكلة برمجية بنفسه', text: 'اكتشف سبب الخطأ في الكود بنفسه وقام بتصحيحه بثقة.' },
        { label: '+ سؤال ذكي في الشرح', text: 'طرح سؤالاً عميقًا أثناء الشرح عكس فهمه للتفاصيل البرمجية.' },
        { label: '+ توصية بمتابعة الممارسة', text: 'نوصي بتخصيص 20 دقيقة يوميًا للتطبيق المنزلي.' }
      ]
    : [
        { label: '+ Calculator Project', text: 'Completed the calculator project with great accuracy.' },
        { label: '+ Game Project (Scratch/Python)', text: 'Added creative interactive logic to the game project.' },
        { label: '+ Debugged Independently', text: 'Independently identified a bug in the code and resolved it.' },
        { label: '+ Insightful Question', text: 'Asked an insightful question during class that enriched the session.' },
        { label: '+ Home Practice Routine', text: 'Recommended 20 minutes of daily home practice.' }
      ];

  const handleAddChip = (chipText: string) => {
    if (additionalNote.trim()) {
      onAdditionalNoteChange(`${additionalNote.trim()} ${chipText}`);
    } else {
      onAdditionalNoteChange(chipText);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border-2 border-[#1E293B] p-5 sm:p-7 shadow-pop relative">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#0487D9] text-white font-heading font-black text-sm flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm">
            4
          </span>
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1E293B]">
            {isAr ? 'الخطوة الرابعة: التخصيص النهائي ونسخ التقرير' : 'Step 4: Final Customization & Copy'}
          </h2>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#E0F2FE] border border-[#0487D9] rounded-full text-xs font-bold text-[#0369A1]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'جاهز للإرسال للأهل' : 'Ready for Parents/Students'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Edit text & Additional note */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Selected Feedback Editor */}
          <div>
            <label className="block text-xs font-heading font-bold uppercase tracking-wider text-slate-700 mb-2">
              {isAr ? 'نص التقرير الأساسي (قابل للتعديل):' : 'Main Report Content (Editable):'}
            </label>
            <textarea
              id="selected-feedback-editor"
              value={selectedText}
              onChange={(e) => onSelectedTextChange(e.target.value)}
              rows={4}
              placeholder={isAr ? 'اختر قالبًا من الأعلى أو اكتب التقرير هنا...' : 'Select a template above or type here...'}
              className="w-full p-4 text-sm sm:text-base text-slate-800 bg-[#FFFDF5] border-2 border-[#1E293B] rounded-2xl focus:outline-none focus:border-[#0487D9] focus:ring-2 focus:ring-[#0487D9]/20 shadow-pop-sm leading-relaxed transition-all resize-y"
            />
          </div>

          {/* Additional Custom Note */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MessageSquarePlus className="w-4 h-4 text-[#0487D9]" />
                <span>{isAr ? 'ملاحظة إضافية أو لمسة شخصية (اختياري):' : 'Additional Note / Personal Touch (Optional):'}</span>
              </label>
              {additionalNote && (
                <button
                  type="button"
                  onClick={() => onAdditionalNoteChange('')}
                  className="text-xs text-rose-600 hover:underline font-semibold"
                >
                  {isAr ? 'مسح الملاحظة' : 'Clear'}
                </button>
              )}
            </div>

            <textarea
              id="additional-note-input"
              value={additionalNote}
              onChange={(e) => onAdditionalNoteChange(e.target.value)}
              rows={2}
              placeholder={
                isAr
                  ? 'مثال: في أثناء تنفيذ مشروع الآلة الحاسبة، قدر الطالب يحل مشكلة معقدة بنفسه...'
                  : 'Example: During the calculator project, the student solved a tricky bug independently...'
              }
              className="w-full p-3.5 text-xs sm:text-sm text-slate-800 bg-white border-2 border-slate-300 focus:border-[#0487D9] focus:ring-2 focus:ring-[#0487D9]/20 rounded-xl leading-relaxed resize-none transition-all"
            />

            {/* Quick Chips for fast instructor workflow */}
            <div className="mt-2.5">
              <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                {isAr ? 'عبارات سريعة لإضافتها للملاحظة:' : 'Quick touches to append:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickChips.map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => handleAddChip(chip.text)}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#F1F5F9] hover:bg-[#E0F2FE] hover:text-[#0369A1] border border-slate-300 hover:border-[#0487D9] transition-all text-slate-700 active:scale-95 flex items-center gap-1"
                  >
                    <PlusCircle className="w-3 h-3 text-[#0487D9]" />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Final Live Preview & Big Candy Copy Button */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8FAFC] rounded-2xl border-2 border-[#1E293B] p-5 shadow-pop-sm">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0487D9]" />
                <span className="font-heading font-bold text-sm text-slate-800">
                  {isAr ? 'المعاينة النهائية للنص المنسوخ' : 'Final Combined Preview'}
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {finalCombinedMessage.length} {isAr ? 'حرف' : 'chars'}
              </span>
            </div>

            {/* Combined Output Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 min-h-[140px] text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
              {finalCombinedMessage ? (
                finalCombinedMessage
              ) : (
                <span className="text-slate-400 italic">
                  {isAr
                    ? 'سيظهر نص التقرير النهائي هنا بمجرد اختيار أو تعديل القالب...'
                    : 'The final combined report will appear here once selected...'}
                </span>
              )}
            </div>
          </div>

          {/* Copy Master Button */}
          <div className="mt-5 space-y-2">
            <button
              id="btn-master-copy"
              type="button"
              onClick={handleCopy}
              disabled={!finalCombinedMessage}
              className={`w-full py-3.5 px-6 rounded-full font-heading font-black text-sm sm:text-base border-2 border-[#1E293B] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
                copied
                  ? 'bg-[#10B981] text-white shadow-pop'
                  : finalCombinedMessage
                  ? 'bg-[#0487D9] hover:bg-[#0369A1] text-white shadow-pop hover:shadow-pop-hover hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>{isAr ? 'تم نسخ التقرير النهائي بنجاح! ✓' : 'Report Copied Successfully! ✓'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>{isAr ? 'نسخ التقرير النهائي بضغطة واحدة' : 'One-Click Copy Final Report'}</span>
                </>
              )}
            </button>

            {copied && (
              <p className="text-center text-xs font-bold text-emerald-600 animate-fade-in">
                {isAr ? 'جاهز للصق في رسائل الواتساب أو نظام التقارير!' : 'Ready to paste into WhatsApp, email, or report portal!'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
