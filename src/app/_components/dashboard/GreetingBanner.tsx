'use client';

import React, { useMemo } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import Lottie from 'lottie-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button, Skeleton, CourseCard } from '@fsc/design-system';
import type { CourseCardLabels } from '@fsc/design-system';
import { getUser } from '@/data/user';
import { getEnrolledCourses } from '@/data/courses-enrolled';
import leafAnimation from '../../../../public/lottie/Leaf Icon.json';

export function ResumeCard({
  showEmpty = false,
  showLoading = false,
  onBrowse,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
  onBrowse?: () => void;
}) {
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

  if (showLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl overflow-hidden shadow-none">
        <div className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6">
          <Skeleton className="w-28 h-20 rounded-lg shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
          <Skeleton className="h-10 w-28 rounded-lg shrink-0" />
        </div>
      </div>
    );
  }

  const lastCourse = enrolledCourses
    .filter((c) => c.status === 'in_progress')
    .sort((a, b) => b.progress - a.progress)[0];

  if (!lastCourse || showEmpty) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl overflow-hidden shadow-none hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-200">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-5 sm:p-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center shrink-0">
            <Compass
              size={24}
              className="text-primary-500 dark:text-primary-400"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {t('startLearning')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {t('startLearningDescription')}
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            className="shrink-0 gap-2 group"
            onClick={onBrowse}
          >
            {t('browseCourses')}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CourseCard
      variant="hero"
      course={lastCourse}
      labels={courseCardLabels}
      priority
    />
  );
}

export default function GreetingBanner() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const currentUser = getUser(locale);

  return (
    <section
      aria-label={t('greeting', { name: currentUser.name })}
      className="shrink-0"
    >
      <div className="flex items-center gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('greeting', { name: currentUser.name })}
        </h1>
        <Lottie
          animationData={leafAnimation}
          loop
          className="w-9 h-9 sm:w-10 sm:h-10 shrink-0"
        />
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        {t('greetingSubtitle')}
      </p>
    </section>
  );
}
