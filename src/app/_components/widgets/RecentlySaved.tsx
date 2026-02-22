'use client';

import React from 'react';
import { ChevronRight, Clock, Bookmark } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Skeleton } from '@fsc/design-system';
import { getSavedItems } from '@/data/saved-items';

export function RecentlySaved({
  showEmpty = false,
  showLoading = false,
  onViewAll,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
  onViewAll?: () => void;
}) {
  const t = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const items = showEmpty ? [] : getSavedItems(locale);
  const hasItems = items.length > 0;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 sm:p-5 shadow-none h-full flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          {t('recentlySaved')}
        </h2>
        {hasItems && !showLoading && (
          <button
            onClick={onViewAll}
            className="text-xs text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
          >
            {tCommon('viewAll')}
          </button>
        )}
      </div>

      {showLoading ? (
        <div className="flex flex-col gap-3">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-3 px-2.5 py-2">
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-2.5 w-20" />
              </div>
              <Skeleton className="w-3.5 h-3.5 rounded shrink-0" />
            </div>
          ))}
        </div>
      ) : hasItems ? (
        <div className="flex flex-col gap-1">
          {items.slice(0, 2).map((item) => (
            <a
              key={item.id}
              href="#"
              className="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                  <Clock size={10} aria-hidden="true" />
                  {item.duration}
                </p>
              </div>
              <ChevronRight
                size={14}
                className="text-neutral-500 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors shrink-0"
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <Bookmark
            size={20}
            className="text-neutral-200 dark:text-neutral-700 mb-1.5"
          />
          <p className="text-sm font-medium text-neutral-500">
            {t('noSavedItems')}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
            {t('bookmarkCoursesHint')}
          </p>
        </div>
      )}
    </div>
  );
}
