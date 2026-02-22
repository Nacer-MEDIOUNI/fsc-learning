'use client';

import React, { useMemo } from 'react';
import { Trophy, Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button, Skeleton, SkeletonRow, CourseCard } from '@fsc/design-system';
import type { CourseCardLabels } from '@fsc/design-system';
import { getEnrolledCourses } from '@/data/courses-enrolled';
import { getLearningStats } from '@/data/learning-stats';

function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 flex flex-col items-center gap-2">
      <Skeleton className="h-7 w-12" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export default function AchievementsPage({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const t = useTranslations('achievements');
  const tCourses = useTranslations('courses');
  const locale = useLocale();
  const learningStats = getLearningStats(locale);
  const completedCourses = getEnrolledCourses(locale).filter(
    (c) => c.status === 'completed',
  );

  const courseCardLabels: CourseCardLabels = useMemo(
    () => ({
      startCourse: tCourses('startCourse'),
      continue: tCourses('continue'),
      start: tCourses('start'),
      review: tCourses('review'),
      resume: tCourses('resume'),
      completed: tCourses('completed'),
      certificate: tCourses('certificate'),
      overdue: tCourses('overdue'),
      duePrefix: tCourses('duePrefix'),
      continueWhereLeftOff: tCourses('continueWhereLeftOff'),
      percentComplete: tCourses('percentComplete'),
    }),
    [tCourses],
  );

  if (showLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <section>
          <Skeleton className="h-5 w-44 mb-4" />
          <div className="flex flex-col gap-3">
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 text-center shadow-none">
          <p className="text-2xl font-bold text-primary-500 dark:text-accent-400">
            {showEmpty ? 0 : learningStats.completed}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t('coursesCompleted')}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 text-center shadow-none">
          <p className="text-2xl font-bold text-primary-500 dark:text-accent-400">
            {showEmpty ? 0 : learningStats.hoursCompleted}h
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t('hoursLearned')}
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 text-center shadow-none">
          <p className="text-2xl font-bold text-primary-500 dark:text-accent-400">
            {showEmpty ? 0 : 1}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {t('certificates')}
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          {t('completedCourses')}
        </h2>
        {showEmpty ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-16 text-center">
            <Trophy
              size={40}
              className="text-neutral-500 dark:text-neutral-600 mx-auto mb-3"
            />
            <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              {t('noCourses')}
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              {t('noCoursesDescription')}
            </p>
          </div>
        ) : completedCourses.length > 0 ? (
          <div className="flex flex-col gap-3">
            {completedCourses.map((course) => (
              <CourseCard
                key={course.id}
                variant="progress"
                course={course}
                labels={courseCardLabels}
                renderActions={() => (
                  <>
                    <Button variant="outline" size="md">
                      {tCourses('review')}
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      className="flex items-center gap-1.5"
                    >
                      <Download size={13} />
                      {tCourses('certificate')}
                    </Button>
                  </>
                )}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-16 text-center">
            <Trophy
              size={40}
              className="text-neutral-500 dark:text-neutral-600 mx-auto mb-3"
            />
            <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
              {t('noCourses')}
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto">
              {t('noCoursesDescription')}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
