import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { Step1Rating } from './components/Step1Rating';
import { Step2Performance } from './components/Step2Performance';
import { Step3Feedback } from './components/Step3Feedback';
import { RecommendedFeedbackCarousel } from './components/RecommendedFeedbackCarousel';
import { GuideModal } from './components/GuideModal';
import { LibraryModal } from './components/LibraryModal';
import { Language, PerformanceAnswers, Rating, StateFeedbackItem, WizardStep } from './types';
import { getFeedbacksForState } from './utils/feedbackEngine';

export const App: React.FC = () => {
  // Step navigation state (Step 1 -> Step 2 -> Step 3)
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  // Language state (ar / en)
  const [language, setLanguage] = useState<Language>('ar');

  // Performance answers state (rating starts as null in Step 1)
  const [answers, setAnswers] = useState<PerformanceAnswers>({
    rating: null,
    homework: true,
    focus: true,
    project: true
  });

  // State-matched feedback suggestions & selections
  const [suggestions, setSuggestions] = useState<StateFeedbackItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedText, setSelectedText] = useState<string>('');
  const [additionalNote, setAdditionalNote] = useState<string>('');
  const [seenHistoryIds, setSeenHistoryIds] = useState<string[]>([]);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);

  // Generate feedback for current state
  const generateSuggestions = useCallback(
    (currentAnswers: PerformanceAnswers, currentLang: Language, historyIds: string[] = []) => {
      if (currentAnswers.rating === null) return;

      const { items, newSeenIds } = getFeedbacksForState(
        currentAnswers,
        currentLang,
        historyIds,
        5
      );

      setSuggestions(items);
      setSelectedIndex(0);
      if (items.length > 0) {
        setSelectedText(items[0].text);
      } else {
        setSelectedText('');
      }
      setSeenHistoryIds((prev) => [...prev, ...newSeenIds]);
    },
    []
  );

  // When step 3 is reached or answers change while on step 3, refresh suggestions
  useEffect(() => {
    if (currentStep === 3 && answers.rating !== null) {
      generateSuggestions(answers, language, []);
    }
  }, [currentStep, answers.rating, answers.homework, answers.focus, answers.project, language, generateSuggestions]);

  // Step 1: Select Rating
  const handleSelectRating = (rating: Rating) => {
    setAnswers((prev) => ({ ...prev, rating }));
  };

  // Step 2: Answer Change
  const handleChangeAnswer = <K extends keyof PerformanceAnswers>(
    key: K,
    value: PerformanceAnswers[K]
  ) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Step 3: Suggestion text inline change
  const handleSuggestionTextChange = (id: string, newText: string) => {
    setSuggestions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
    if (suggestions[selectedIndex]?.id === id) {
      setSelectedText(newText);
    }
  };

  // Step 3: Select a suggestion card
  const handleSelectSuggestion = (index: number) => {
    setSelectedIndex(index);
    if (suggestions[index]) {
      setSelectedText(suggestions[index].text);
    }
  };

  // Step 3: Shuffle non-repeating suggestions
  const handleShuffle = () => {
    generateSuggestions(answers, language, seenHistoryIds);
  };

  // Language switch
  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
  };

  // Reset entire session for a new student
  const handleResetSession = () => {
    setAnswers({
      rating: null,
      homework: true,
      focus: true,
      project: true
    });
    setSuggestions([]);
    setSelectedText('');
    setAdditionalNote('');
    setSeenHistoryIds([]);
    setSelectedIndex(0);
    setCurrentStep(1);
  };

  // Library modal selection
  const handleSelectFromLibrary = (text: string) => {
    setSelectedText(text);
    if (currentStep !== 3) {
      setCurrentStep(3);
    }
  };

  // 3D Carousel recommendation selection
  const handleApplyRecommendation = (item: StateFeedbackItem, rating: Rating) => {
    setAnswers({
      rating,
      homework: item.homework ?? true,
      focus: item.focus ?? true,
      project: item.project ?? true,
    });
    setSelectedText(item.text);
    setSuggestions([item]);
    setSelectedIndex(0);
    setCurrentStep(3);
  };

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FFFDF5] text-slate-900 flex flex-col font-sans selection:bg-[#FBBF24] selection:text-[#1E293B]"
    >
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onReset={handleResetSession}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenLibrary={() => setIsLibraryOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Step Progress Indicator */}
        <StepIndicator
          currentStep={currentStep}
          onGoToStep={(s) => setCurrentStep(s)}
          language={language}
          ratingSelected={answers.rating !== null}
        />

        {/* Step 1: Rating Selection + 3D Recommendations Carousel */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <Step1Rating
              rating={answers.rating}
              onSelectRating={handleSelectRating}
              onNext={() => {
                if (answers.rating !== null) {
                  setCurrentStep(2);
                }
              }}
              language={language}
            />

            {/* 3D Recommendations Showcase */}
            <RecommendedFeedbackCarousel
              language={language}
              onApplyRecommendation={handleApplyRecommendation}
            />
          </div>
        )}

        {/* Step 2: Student Performance */}
        {currentStep === 2 && (
          <Step2Performance
            answers={answers}
            onChangeAnswer={handleChangeAnswer}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
            language={language}
          />
        )}

        {/* Step 3: Tailored Feedback Suggestions & Customizer */}
        {currentStep === 3 && (
          <Step3Feedback
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSelectSuggestion={handleSelectSuggestion}
            onTextChange={handleSuggestionTextChange}
            onShuffle={handleShuffle}
            answers={answers}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            selectedText={selectedText}
            onSelectedTextChange={setSelectedText}
            additionalNote={additionalNote}
            onAdditionalNoteChange={setAdditionalNote}
            onBack={() => setCurrentStep(2)}
            onStartOver={handleResetSession}
          />
        )}
      </main>

      {/* Writing Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
      />

      {/* Feedback Library Modal */}
      <LibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectTemplate={handleSelectFromLibrary}
        language={language}
      />

      {/* Footer */}
      <footer className="border-t-2 border-[#1E293B] bg-white py-4 px-6 text-center text-xs font-semibold text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {language === 'ar'
              ? 'نظام JUPITER لإعداد تقارير وملاحظات الطلاب الذكية'
              : 'JUPITER Instructor Feedback & Student Report System'}
          </span>
          <span className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'مبني وفق أعلى معايير الجودة والتقييم السلوكي'
              : 'Engineered for accurate, state-matched educational feedback'}
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
