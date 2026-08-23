export type Rating = 1 | 2 | 3 | 4 | 5;

export type Language = 'ar' | 'en';

export type WizardStep = 1 | 2 | 3;

export interface PerformanceAnswers {
  rating: Rating | null;
  homework: boolean;
  focus: boolean;
  project: boolean;
}

export interface StateFeedbackItem {
  id: string;
  rating: Rating;
  homework: boolean;
  focus: boolean;
  project: boolean;
  language: Language;
  text: string;
  category: string;
  tags?: string[];
}

export interface GuideTip {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  exampleGoodAr: string;
  exampleGoodEn: string;
  exampleBadAr?: string;
  exampleBadEn?: string;
  reusablePhrasesAr?: string[];
  reusablePhrasesEn?: string[];
}
