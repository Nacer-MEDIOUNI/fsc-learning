'use client';

import React, { useState, useMemo } from 'react';
import { GraduationCap } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  Button,
  SkeletonRow,
  CourseCard,
  CourseOptionsMenu,
} from '@fsc/design-system';
import type {
  CourseCardLabels,
  CourseOptionsMenuLabels,
} from '@fsc/design-system';
import { getEnrolledCourses } from '@/data/courses-enrolled';
import type { CourseStatus } from '@/types';

const FILTERS = [
  { key: 'all', status: null },
  { key: 'inProgress', status: 'in_progress' as CourseStatus },
  { key: 'completed', status: 'completed' as CourseStatus },
  { key: 'notStarted', status: 'not_started' as CourseStatus },
  { key: 'overdue', status: 'overdue' as CourseStatus },
] as const;

export default function ContinueLearning({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const [activeFilterKey, setActiveFilterKey] = useState<string>('inProgress');
  const t = useTranslations('dashboard');
  const tCourses = useTranslations('courses');
  const locale = useLocale();
  const enrolledCourses = getEnrolledCourses(locale);

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

  const courseOptionsMenuLabels: CourseOptionsMenuLabels = useMemo(
    () => ({
      continueLearning: tCourses('continueLearning'),
      viewDetails: tCourses('viewDetails'),
      saveForLater: tCourses('saveForLater'),
      downloadCertificate: tCourses('downloadCertificate'),
      reviewCourse: tCourses('reviewCourse'),
      unenroll: tCourses('unenroll'),
      resumeCourse: tCourses('resumeCourse'),
      requestExtension: tCourses('requestExtension'),
      removeCourse: tCourses('removeCourse'),
      saveCourse: tCourses('saveCourse'),
      moreOptionsFor: tCourses('moreOptionsFor'),
    }),
    [tCourses],
  );

  const activeFilter =
    FILTERS.find((f) => f.key === activeFilterKey) ?? FILTERS[0]!;

  const filteredCourses = useMemo(() => {
    if (!activeFilter.status) return enrolledCourses;
    return enrolledCourses.filter((c) => c.status === activeFilter.status);
  }, [activeFilter.status, enrolledCourses]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { all: enrolledCourses.length };
    for (const filter of FILTERS) {
      if (filter.status) {
        counts[filter.key] = enrolledCourses.filter(
          (c) => c.status === filter.status,
        ).length;
      }
    }
    return counts;
  }, [enrolledCourses]);

  return (
    <section aria-label={t('continueLearning')}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('continueLearning')}
        </h2>
        <div
          className="flex gap-1 overflow-x-auto scrollbar-hide p-1 -m-1"
          role="tablist"
          aria-label={t('continueLearning')}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              role="tab"
              aria-selected={activeFilterKey === filter.key}
              onClick={() => setActiveFilterKey(filter.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeFilterKey === filter.key
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {t(filter.key)}
              {filterCounts[filter.key] !== undefined && (
                <span className="ml-1 opacity-60">
                  {showEmpty ? 0 : filterCounts[filter.key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {showLoading ? (
        <div className="flex flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      ) : showEmpty ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <GraduationCap
            size={28}
            className="text-neutral-200 dark:text-neutral-700 mb-2"
          />
          <p className="text-sm font-medium text-neutral-500">
            {t('noCourses')}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
            {t('noCoursesHint')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3" role="tabpanel" aria-live="polite">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                variant="progress"
                course={course}
                labels={courseCardLabels}
                priority={index < 3}
                renderActions={(c) => (
                  <>
                    {c.status === 'completed' ? (
                      <Button variant="outline" size="md">
                        {tCourses('review')}
                      </Button>
                    ) : c.status === 'not_started' ? (
                      <Button variant="primary" size="md">
                        {tCourses('start')}
                      </Button>
                    ) : (
                      <Button variant="primary" size="md">
                        {tCourses('continue')}
                      </Button>
                    )}
                    <CourseOptionsMenu
                      courseTitle={c.title}
                      status={c.status}
                      labels={courseOptionsMenuLabels}
                    />
                  </>
                )}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-10 text-center">
              <p className="text-neutral-500 text-sm">{t('noCoursesMatch')}</p>
              <button
                onClick={() => setActiveFilterKey('all')}
                className="text-primary-500 dark:text-primary-400 text-sm font-medium mt-2 hover:underline"
              >
                {t('viewAllCourses')}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
