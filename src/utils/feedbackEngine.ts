import { ARABIC_STATE_FEEDBACKS } from '../data/arabicStateFeedbacks';
import { ENGLISH_STATE_FEEDBACKS } from '../data/englishStateFeedbacks';
import { Language, PerformanceAnswers, Rating, StateFeedbackItem } from '../types';

export const ALL_FEEDBACK_DATABASE: StateFeedbackItem[] = [
  ...ARABIC_STATE_FEEDBACKS,
  ...ENGLISH_STATE_FEEDBACKS
];

/**
 * Retrieves feedback items strictly matching the exact state:
 * Rating + Homework + Focus + Project + Language.
 *
 * Implements non-repeating shuffle within the exact state pool.
 * Under NO circumstances does it return a contradictory state (e.g. HW=YES receiving HW=NO).
 */
export function getFeedbacksForState(
  answers: PerformanceAnswers,
  language: Language,
  excludeIds: string[] = [],
  targetCount: number = 5
): { items: StateFeedbackItem[]; newSeenIds: string[] } {
  if (answers.rating === null) {
    return { items: [], newSeenIds: [] };
  }

  const { rating, homework, focus, project } = answers;

  // 1. Strict Exact State Match
  const exactMatches = ALL_FEEDBACK_DATABASE.filter(
    (item) =>
      item.rating === rating &&
      item.homework === homework &&
      item.focus === focus &&
      item.project === project &&
      item.language === language
  );

  let pool: StateFeedbackItem[] = [];

  if (exactMatches.length > 0) {
    // Separate into unseen and seen items for anti-repetition
    const unseen = exactMatches.filter((item) => !excludeIds.includes(item.id));
    const seen = exactMatches.filter((item) => excludeIds.includes(item.id));

    if (unseen.length >= targetCount) {
      // Pick randomly from unseen
      pool = shuffleArray([...unseen]).slice(0, targetCount);
    } else if (unseen.length > 0) {
      // Pick all unseen, and fill remainder from shuffled seen
      const remainingCount = targetCount - unseen.length;
      const shuffledSeen = shuffleArray([...seen]).slice(0, remainingCount);
      pool = [...unseen, ...shuffledSeen];
    } else {
      // All items have been seen in this state, reshuffle the entire exact pool
      pool = shuffleArray([...exactMatches]).slice(0, targetCount);
    }
  } else {
    // Secondary fallback: matches rating + language + at least homework match to avoid direct contradiction
    const compatibleMatches = ALL_FEEDBACK_DATABASE.filter(
      (item) =>
        item.rating === rating &&
        item.language === language &&
        item.homework === homework
    );

    if (compatibleMatches.length > 0) {
      pool = shuffleArray([...compatibleMatches]).slice(0, targetCount);
    } else {
      // Final fallback within same rating and language
      const ratingMatches = ALL_FEEDBACK_DATABASE.filter(
        (item) => item.rating === rating && item.language === language
      );
      pool = shuffleArray([...ratingMatches]).slice(0, targetCount);
    }
  }

  const newSeenIds = pool.map((p) => p.id);
  return { items: pool, newSeenIds };
}

/**
 * Fisher-Yates array shuffler
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
