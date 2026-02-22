'use client';

import React, { useState, useMemo } from 'react';
import { Bookmark } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  CourseCard,
  SearchInput,
  ConfirmModal,
  SkeletonCard,
  BookmarkToggle,
} from '@fsc/design-system';
import type { CourseCardLabels } from '@fsc/design-system';
import type { Course } from '@/types';
import { getNewCourses } from '@/data/courses-new';
import { getEnrolledCourses } from '@/data/courses-enrolled';

export default function SavedListPage({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const locale = useLocale();
  const allCourses = [...getEnrolledCourses(locale), ...getNewCourses(locale)];
  const savedCourses: Course[] = [
    allCourses.find((c) => c.id === '10'),
    allCourses.find((c) => c.id === '12'),
    allCourses.find((c) => c.id === '3'),
  ].filter((c): c is Course => c !== undefined);
  const [courses, setCourses] = useState(savedCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseToRemove, setCourseToRemove] = useState<Course | null>(null);
  const t = useTranslations('saved');
  const tCourses = useTranslations('courses');
  const tCommon = useTranslations('common');

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

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemove = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {t('title')}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {t('description', { count: courses.length })}
          </p>
        </div>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={tCourses('searchSavedCourses')}
          ariaLabel={tCourses('searchSavedCourses')}
        />
      </div>

      {showLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {[0, 1, 2].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : showEmpty ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-16 text-center">
          <Bookmark
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
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              variant="saved"
              course={course}
              labels={courseCardLabels}
              renderSaveButton={(c) => (
                <BookmarkToggle
                  courseTitle={c.title}
                  defaultBookmarked={true}
                  confirmUnsave
                  onRequestUnsave={() => setCourseToRemove(c)}
                />
              )}
            />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-16 text-center">
          <Bookmark
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
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-10 text-center">
          <p className="text-sm text-neutral-500">
            {tCourses('noCoursesMatch', { query: searchQuery })}
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-primary-500 dark:text-primary-400 text-sm font-medium mt-2 hover:underline"
          >
            {tCommon('clearSearch')}
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={courseToRemove !== null}
        onClose={() => setCourseToRemove(null)}
        onConfirm={() => {
          if (courseToRemove) handleRemove(courseToRemove.id);
        }}
        title={tCourses('unsaveConfirmTitle')}
        description={
          courseToRemove
            ? tCourses('unsaveConfirmDescription', {
                title: courseToRemove.title,
              })
            : undefined
        }
        confirmLabel={tCommon('remove')}
      />
    </div>
  );
}
