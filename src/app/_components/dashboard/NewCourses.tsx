'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  CourseCard,
  BookmarkToggle,
  ConfirmModal,
  SkeletonCard,
} from '@fsc/design-system';
import type { CourseCardLabels } from '@fsc/design-system';
import { getNewCourses } from '@/data/courses-new';
import type { Course } from '@/types';

export default function NewCourses({
  showEmpty = false,
  showLoading = false,
  onViewAll,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
  onViewAll?: () => void;
}) {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [courseToUnsave, setCourseToUnsave] = useState<Course | null>(null);
  const t = useTranslations('dashboard');
  const tCourses = useTranslations('courses');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const newCourses = getNewCourses(locale);

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

  return (
    <section aria-label={t('newCourses')}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('newCourses')}
        </h2>
        <button
          onClick={onViewAll}
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors font-medium"
        >
          {tCommon('viewAll')}
        </button>
      </div>

      {showLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : showEmpty || newCourses.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-10 flex flex-col items-center justify-center text-center">
          <BookOpen
            size={28}
            className="text-neutral-200 dark:text-neutral-700 mb-2"
          />
          <p className="text-sm font-medium text-neutral-500">
            {t('noNewCourses')}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
            {t('checkBackLater')}
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
          role="list"
        >
          {newCourses.map((course) => (
            <div role="listitem" key={course.id}>
              <CourseCard
                variant="discovery"
                course={course}
                labels={courseCardLabels}
                className="min-w-[240px]"
                renderSaveButton={(c) => (
                  <BookmarkToggle
                    courseTitle={c.title}
                    bookmarked={savedIds.has(c.id)}
                    onToggle={(saved) => {
                      setSavedIds((prev) => {
                        const next = new Set(prev);
                        if (saved) next.add(c.id);
                        else next.delete(c.id);
                        return next;
                      });
                    }}
                    confirmUnsave
                    onRequestUnsave={() => setCourseToUnsave(c)}
                  />
                )}
              />
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={courseToUnsave !== null}
        onClose={() => setCourseToUnsave(null)}
        onConfirm={() => {
          if (courseToUnsave) {
            setSavedIds((prev) => {
              const next = new Set(prev);
              next.delete(courseToUnsave.id);
              return next;
            });
          }
        }}
        title={tCourses('unsaveConfirmTitle')}
        description={
          courseToUnsave
            ? tCourses('unsaveConfirmDescription', {
                title: courseToUnsave.title,
              })
            : undefined
        }
        confirmLabel={tCommon('remove')}
      />
    </section>
  );
}
