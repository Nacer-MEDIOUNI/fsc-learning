'use client';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useTheme } from 'next-themes';
import { useTranslations, useLocale } from 'next-intl';
import { Badge, Skeleton } from '@fsc/design-system';
import { getLearningStats } from '@/data/learning-stats';
import leafsAnimation from '../../../../public/lottie/Leafs blow.json';

function StatBlock({
  dotColor,
  label,
  value,
  sublabel,
}: {
  dotColor: string;
  label: string;
  value: number;
  sublabel: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${label}: ${value} ${sublabel}`}
      className="text-center sm:text-left"
    >
      <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 text-neutral-500 dark:text-neutral-400 mb-1">
        <span
          className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`}
          aria-hidden="true"
        />
        <span className="text-xs font-medium uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        {value}
      </p>
      <p className="text-xs text-neutral-500 mt-0.5">{sublabel}</p>
    </div>
  );
}

function StatBlockSkeleton() {
  return (
    <div className="text-center sm:text-left flex flex-col items-center sm:items-start gap-1.5">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="h-7 w-12" />
      <Skeleton className="h-3 w-14" />
    </div>
  );
}

const lightGradient =
  'linear-gradient(to right, #ffffff 35%, transparent 100%), linear-gradient(to top left, #ffffff 15%, transparent 40%), radial-gradient(ellipse 70% 130% at 75% 30%, rgba(168,215,188,0.5) 0%, rgba(200,230,212,0.25) 40%, transparent 70%)';

const darkGradient =
  'linear-gradient(to right, rgb(18,46,38) 35%, transparent 100%), linear-gradient(to top left, rgb(18,46,38) 15%, transparent 40%), radial-gradient(ellipse 70% 130% at 75% 30%, rgba(40,92,77,0.3) 0%, rgba(40,92,77,0.15) 40%, transparent 70%)';

export default function LearningStatus({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const learningStats = getLearningStats(locale);
  useEffect(() => setMounted(true), []);

  const isEmpty =
    showEmpty ||
    (learningStats.inProgress === 0 &&
      learningStats.completed === 0 &&
      learningStats.notStarted === 0);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <div
      className="relative border border-neutral-100 dark:border-gold/15 rounded-xl p-4 sm:p-5 sm:pl-8 shadow-none overflow-hidden bg-white dark:bg-neutral-900 flex flex-col min-w-0 h-full"
      style={{
        background: isDark ? darkGradient : lightGradient,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{ transform: 'scaleX(-1) scaleY(-1)' }}
      >
        <Lottie
          animationData={leafsAnimation}
          loop
          autoplay
          className="w-[100px] h-[90px] sm:w-[160px] sm:h-[144px]"
        />
      </span>

      <div className="relative z-10 flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          {t('learningStatus')}
        </h2>
        {!isEmpty && !showLoading && (
          <Badge variant="success">{learningStats.statusLabel}</Badge>
        )}
      </div>

      {showLoading ? (
        <div className="relative z-10 flex justify-start gap-6 sm:gap-10 xl:gap-12 flex-1 items-center pl-4 md:pl-8">
          <StatBlockSkeleton />
          <div className="w-px self-stretch bg-neutral-200/50 dark:bg-gold/15" />
          <StatBlockSkeleton />
          <div className="w-px self-stretch bg-neutral-200/50 dark:bg-gold/15" />
          <StatBlockSkeleton />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col md:flex-row justify-start gap-6 sm:gap-10 xl:gap-12 flex-1 items-center">
          <StatBlock
            dotColor="bg-amber-500"
            label={t('inProgress')}
            value={isEmpty ? 0 : learningStats.inProgress}
            sublabel={tCommon('courses')}
          />
          <div className="w-px self-stretch bg-neutral-200/50 dark:bg-gold/15" />
          <StatBlock
            dotColor="bg-accent-500"
            label={t('completed')}
            value={isEmpty ? 0 : learningStats.completed}
            sublabel={tCommon('courses')}
          />
          <div className="w-px self-stretch bg-neutral-200/50 dark:bg-gold/15" />
          <StatBlock
            dotColor="bg-neutral-400"
            label={t('notStarted')}
            value={isEmpty ? 0 : learningStats.notStarted}
            sublabel={tCommon('courses')}
          />
        </div>
      )}
    </div>
  );
}
