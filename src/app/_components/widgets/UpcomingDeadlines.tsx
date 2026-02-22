'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Skeleton } from '@fsc/design-system';
import { getUpcomingDeadlines } from '@/data/deadlines';
import type { Deadline } from '@/types';

function getMonthName(year: number, month: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1));
}

function getDayHeaders(locale: string): string[] {
  const base = new Date(2024, 0, 1);
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d));
  }
  return days;
}

function MiniCalendar({
  deadlines,
  locale,
}: {
  deadlines: Deadline[];
  locale: string;
}) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();
  const todayDate = today.getDate();

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else setViewMonth(viewMonth + 1);
  };

  const deadlineDates = new Set(
    deadlines
      .map((dl) => {
        const parsed = new Date(dl.date);
        if (
          parsed.getFullYear() === viewYear &&
          parsed.getMonth() === viewMonth
        ) {
          return parsed.getDate();
        }
        return null;
      })
      .filter((d): d is number => d !== null),
  );

  const dayHeaders = useMemo(() => getDayHeaders(locale), [locale]);
  const monthLabel = getMonthName(viewYear, viewMonth, locale);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 capitalize">
          {monthLabel}
        </h3>
        <div className="flex items-center gap-0.5">
          <button
            onClick={prevMonth}
            className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={nextMonth}
            className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {dayHeaders.map((d) => (
          <span
            key={d}
            className="text-center text-xs font-medium text-neutral-500 py-0.5"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (day === null) return <span key={`e-${i}`} />;

          const isToday = isCurrentMonth && day === todayDate;
          const isDeadline = deadlineDates.has(day);

          return (
            <span
              key={day}
              className={`flex items-center justify-center text-xs h-[26px] rounded-full relative ${
                isToday
                  ? 'bg-primary-600 text-white font-bold'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {day}
              {isDeadline && !isToday && (
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-red-500" />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function UpcomingDeadlines({
  showEmpty = false,
  showLoading = false,
}: {
  showEmpty?: boolean;
  showLoading?: boolean;
}) {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const upcomingDeadlines = getUpcomingDeadlines(locale);
  const deadlines = showEmpty ? [] : upcomingDeadlines;
  const hasDeadlines = deadlines.length > 0;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 sm:p-5 shadow-none xl:h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          {t('upcomingDeadlines')}
        </h2>
      </div>

      {showLoading ? (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-2.5 py-2 rounded-lg border border-neutral-100 dark:border-gold/15 bg-neutral-50/50 dark:bg-neutral-800/50"
            >
              <Skeleton className="w-3.5 h-3.5 rounded shrink-0" />
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-2.5 w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : hasDeadlines ? (
        <div className="flex flex-col gap-2.5">
          {deadlines.map((deadline) => (
            <div
              key={deadline.id}
              className={`flex items-center gap-3 px-2.5 py-2 rounded-lg border ${
                deadline.urgent
                  ? 'border-red-100 dark:border-red-900/40 bg-red-50/40 dark:bg-red-900/20'
                  : 'border-neutral-100 dark:border-gold/15 bg-neutral-50/50 dark:bg-neutral-800/50'
              }`}
            >
              <div
                className={`shrink-0 ${
                  deadline.urgent ? 'text-red-600' : 'text-neutral-500'
                }`}
              >
                {deadline.urgent ? (
                  <AlertTriangle size={14} />
                ) : (
                  <Calendar size={14} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  title={deadline.title}
                  className="text-xs font-medium text-neutral-800 dark:text-neutral-200 truncate"
                >
                  {deadline.title}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    deadline.urgent
                      ? 'text-red-600 font-medium'
                      : 'text-neutral-500'
                  }`}
                >
                  {deadline.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <CheckCircle size={20} className="text-accent-300 mb-1.5" />
          <p className="text-sm font-medium text-neutral-500">
            {t('allCaughtUp')}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-0.5">
            {t('noDeadlines')}
          </p>
        </div>
      )}

      <div className="mt-4">
        <div className="h-px bg-neutral-100 dark:bg-gold/15 mb-4" />
        {showLoading ? (
          <div>
            <Skeleton className="h-3.5 w-28 mb-3" />
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} className="h-[26px] w-full rounded-full" />
              ))}
            </div>
          </div>
        ) : (
          <MiniCalendar deadlines={upcomingDeadlines} locale={locale} />
        )}
      </div>
    </div>
  );
}
