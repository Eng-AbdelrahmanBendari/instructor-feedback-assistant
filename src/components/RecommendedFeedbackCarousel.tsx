import React, { useMemo } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Language, StateFeedbackItem, Rating } from '../types';
import { ARABIC_STATE_FEEDBACKS } from '../data/arabicStateFeedbacks';
import { ENGLISH_STATE_FEEDBACKS } from '../data/englishStateFeedbacks';
import { ThreeDFeedbackCarousel, FeedbackCardItem } from './ui/3d-carousel';

interface RecommendedFeedbackCarouselProps {
  language: Language;
  onApplyFeedback?: (item: StateFeedbackItem, rating: Rating) => void;
  onApplyRecommendation?: (item: StateFeedbackItem, rating: Rating) => void;
}

export const RecommendedFeedbackCarousel: React.FC<RecommendedFeedbackCarouselProps> = ({
  language,
  onApplyFeedback,
  onApplyRecommendation,
}) => {
  const isAr = language === 'ar';
  const [refreshKey, setRefreshKey] = React.useState(0);
  const handleApply = onApplyFeedback || onApplyRecommendation;

  const cards: FeedbackCardItem[] = useMemo(() => {
    const database = isAr ? ARABIC_STATE_FEEDBACKS : ENGLISH_STATE_FEEDBACKS;

    const byRating: Record<number, StateFeedbackItem[]> = {
      5: database.filter((item) => item.rating === 5),
      4: database.filter((item) => item.rating === 4),
      3: database.filter((item) => item.rating === 3),
      2: database.filter((item) => item.rating === 2),
      1: database.filter((item) => item.rating === 1),
    };

    const getRandomItem = (arr: StateFeedbackItem[], fallbackIndex: number): StateFeedbackItem => {
      if (!arr || arr.length === 0) return database[fallbackIndex % database.length];
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    };

    // Construct 10 cards to match exact original cylinder layout (36 degrees each)
    const rawPicks = [
      { item: getRandomItem(byRating[5], 0), rating: 5 as Rating },
      { item: getRandomItem(byRating[4], 1), rating: 4 as Rating },
      { item: getRandomItem(byRating[5], 2), rating: 5 as Rating },
      { item: getRandomItem(byRating[3], 3), rating: 3 as Rating },
      { item: getRandomItem(byRating[4], 4), rating: 4 as Rating },
      { item: getRandomItem(byRating[2], 5), rating: 2 as Rating },
      { item: getRandomItem(byRating[5], 6), rating: 5 as Rating },
      { item: getRandomItem(byRating[3], 7), rating: 3 as Rating },
      { item: getRandomItem(byRating[4], 8), rating: 4 as Rating },
      { item: getRandomItem(byRating[1], 9), rating: 1 as Rating },
    ];

    const getTheme = (rating: Rating) => {
      switch (rating) {
        case 5:
          return {
            bg: 'bg-emerald-50',
            border: 'border-emerald-500',
            badgeBg: 'bg-emerald-500',
            badgeText: 'text-white',
          };
        case 4:
          return {
            bg: 'bg-sky-50',
            border: 'border-sky-500',
            badgeBg: 'bg-sky-500',
            badgeText: 'text-white',
          };
        case 3:
          return {
            bg: 'bg-amber-50',
            border: 'border-amber-500',
            badgeBg: 'bg-amber-400',
            badgeText: 'text-slate-900',
          };
        case 2:
          return {
            bg: 'bg-orange-50',
            border: 'border-orange-500',
            badgeBg: 'bg-orange-500',
            badgeText: 'text-white',
          };
        case 1:
        default:
          return {
            bg: 'bg-rose-50',
            border: 'border-rose-500',
            badgeBg: 'bg-rose-500',
            badgeText: 'text-white',
          };
      }
    };

    const getCategoryTitle = (rating: Rating, isArabic: boolean) => {
      if (isArabic) {
        switch (rating) {
          case 5:
            return 'أداء استثنائي وإتقان شامل';
          case 4:
            return 'مستوى متقدم واستيعاب ممتاز';
          case 3:
            return 'أداء جيد مع حاجة لمتابعة الواجبات';
          case 2:
            return 'يحتاج تعزيز التركيز والممارسة';
          case 1:
            return 'تنبيه وتدخل تعليمي مباشر';
          default:
            return 'تقييم تدريبي';
        }
      } else {
        switch (rating) {
          case 5:
            return 'Exceptional Performance & Mastery';
          case 4:
            return 'Advanced Level & High Focus';
          case 3:
            return 'Good Progress & Homework Support';
          case 2:
            return 'Needs Focus & Practice Guidance';
          case 1:
            return 'Urgent Academic Intervention';
          default:
            return 'Session Assessment';
        }
      }
    };

    return rawPicks.map((pick, idx) => {
      const tag = pick.item.tags && pick.item.tags[0] 
        ? pick.item.tags[0] 
        : (isAr ? `${pick.rating} نجوم` : `${pick.rating} Stars`);

      return {
        id: `feedback-3d-${refreshKey}-${pick.item.id || idx}`,
        rating: pick.rating,
        feedback: pick.item,
        text: pick.item.text,
        tag,
        stars: pick.rating,
        categoryTitle: getCategoryTitle(pick.rating, isAr),
        colorTheme: getTheme(pick.rating),
      };
    });
  }, [isAr, refreshKey]);

  return (
    <section className="mt-8 pt-8 border-t-2 border-[#1E293B]/10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#FBBF24] text-[#1E293B] flex items-center justify-center border-2 border-[#1E293B] shadow-pop-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-black text-lg sm:text-xl text-[#1E293B]">
                {isAr ? 'نماذج تقييم وفيدباك مقترحة' : 'Recommended Feedback Templates'}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#0487D9] hidden sm:inline-block">
                {isAr ? 'فيدباك مقترح 3D' : 'Suggested Feedback 3D'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {isAr
                ? 'اسحب أسطوانة النماذج المقترحة للتنقل، واضغط على أي فيدباك لمعاينته بالكامل ونسخه أو تطبيقه فوراً'
                : 'Drag the cylinder to browse suggested feedback, click any card to inspect, copy, or apply directly'}
            </p>
          </div>
        </div>

        {/* Shuffle Button */}
        <button
          type="button"
          onClick={() => setRefreshKey((k) => k + 1)}
          className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-[#1E293B] border-2 border-[#1E293B] font-bold text-xs shadow-pop-sm transition-transform active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isAr ? 'تحديث النماذج' : 'Shuffle Cards'}</span>
        </button>
      </div>

      {/* 3D Feedback Carousel Component */}
      <div className="w-full bg-[#FFFDF5] rounded-3xl border-2 border-[#1E293B] shadow-pop p-2 sm:p-4 overflow-hidden relative">
        <ThreeDFeedbackCarousel
          cards={cards}
          language={language}
          onApplyFeedback={handleApply}
        />
      </div>
    </section>
  );
};
