import type { LearningStats } from '@/types';

const en: LearningStats = {
  inProgress: 3,
  completed: 12,
  notStarted: 5,
  totalCourses: 20,
  hoursCompleted: 47,
  hoursTotal: 64,
  statusLabel: 'On Track',
  streak: 5,
};

const fr: LearningStats = {
  inProgress: 3,
  completed: 12,
  notStarted: 5,
  totalCourses: 20,
  hoursCompleted: 47,
  hoursTotal: 64,
  statusLabel: 'En bonne voie',
  streak: 5,
};

const de: LearningStats = {
  inProgress: 3,
  completed: 12,
  notStarted: 5,
  totalCourses: 20,
  hoursCompleted: 47,
  hoursTotal: 64,
  statusLabel: 'Auf Kurs',
  streak: 5,
};

const es: LearningStats = {
  inProgress: 3,
  completed: 12,
  notStarted: 5,
  totalCourses: 20,
  hoursCompleted: 47,
  hoursTotal: 64,
  statusLabel: 'En camino',
  streak: 5,
};

const map: Record<string, LearningStats> = { en, fr, de, es };

export function getLearningStats(locale: string): LearningStats {
  return map[locale] ?? en;
}

export const learningStats = en;
