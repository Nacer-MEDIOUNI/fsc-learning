'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import {
  SearchInput,
  SkeletonCard,
  CourseCard,
  BookmarkToggle,
} from '@fsc/design-system';
import type { CourseCardLabels } from '@fsc/design-system';
import { getEnrolledCourses } from '@/data/courses-enrolled';
import { getNewCourses } from '@/data/courses-new';

const CATEGORIES = [
  { key: 'categoryAll', value: 'All' },
  { key: 'categoryForestManagement', value: 'Forest Management' },
  { key: 'categoryCertification', value: 'Certification' },
  { key: 'categoryEnvironmental', value: 'Environmental' },
  { key: 'categorySocial', value: 'Social' },
  { key: 'categoryTrademark', value: 'Trademark' },
  { key: 'categoryStandardsPolicy', value: 'Standards & Policy' },
] as const;

export default function CatalogPage({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryKey, setActiveCategoryKey] =
    useState<string>('categoryAll');
  const t = useTranslations('courses');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const allCourses = useMemo(
    () => [...getEnrolledCourses(locale), ...getNewCourses(locale)],
    [locale],
  );

  const activeCategory = CATEGORIES.find((c) => c.key === activeCategoryKey);

  const courseCardLabels: CourseCardLabels = useMemo(
    () => ({
      startCourse: t('startCourse'),
      continue: t('continue'),
      start: t('start'),
      review: t('review'),
      resume: t('resume'),
      completed: t('completed'),
      certificate: t('certificate'),
      overdue: t('overdue'),
      duePrefix: t('duePrefix'),
      continueWhereLeftOff: t('continueWhereLeftOff'),
      percentComplete: t('percentComplete'),
    }),
    [t],
  );

  const filtered = useMemo(() => {
    return allCourses.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategoryKey === 'categoryAll' ||
        c.category === activeCategory?.value;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategoryKey, activeCategory, allCourses]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {t('courseCatalog')}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {t('courseCatalogDescription', { count: allCourses.length })}
          </p>
        </div>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('searchCourses')}
          ariaLabel={t('searchCourses')}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategoryKey(cat.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeCategoryKey === cat.key
                ? 'bg-primary-800 text-white'
                : 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-gold/25 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-gold/35'
            }`}
          >
            {t(cat.key)}
          </button>
        ))}
      </div>

      {showLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : showEmpty ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-16 text-center">
          <BookOpen
            size={40}
            className="text-neutral-500 dark:text-neutral-600 mx-auto mb-3"
          />
          <h3 className="text-base font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            {t('noCoursesAvailable')}
          </h3>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto">
            {tCommon('noResults')}
          </p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              variant="discovery"
              course={course}
              labels={courseCardLabels}
              renderOverlay={(c) => <BookmarkToggle courseTitle={c.title} />}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-10 text-center">
          <p className="text-sm text-neutral-500">
            {t('noCoursesMatch', {
              query:
                searchQuery ||
                (activeCategoryKey !== 'categoryAll'
                  ? t(activeCategoryKey)
                  : ''),
            })}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategoryKey('categoryAll');
            }}
            className="text-primary-500 dark:text-primary-400 text-sm font-medium mt-2 hover:underline"
          >
            {tCommon('clearFilters')}
          </button>
        </div>
      )}
    </div>
  );
}
