'use client';

import type { ElementType } from 'react';
import { useState, useMemo } from 'react';
import {
  MoreVertical,
  Play,
  Bookmark,
  Eye,
  RefreshCw,
  RotateCcw,
  Download,
  Clock,
  Trash2,
  UserMinus,
} from 'lucide-react';
import { Popover } from '../Popover';
import type { CourseStatus } from '../../types';
import type {
  CourseOptionsMenuProps,
  CourseOptionsMenuLabels,
} from './CourseOptionsMenu.interfaces';

interface MenuItem {
  icon: ElementType;
  labelKey: keyof CourseOptionsMenuLabels;
  fallback: string;
  destructive?: boolean;
}

const menusByStatus: Record<CourseStatus, MenuItem[]> = {
  in_progress: [
    { icon: Play, labelKey: 'continueLearning', fallback: 'Continue Learning' },
    { icon: Bookmark, labelKey: 'saveForLater', fallback: 'Save for Later' },
    { icon: Eye, labelKey: 'viewDetails', fallback: 'View Details' },
    {
      icon: UserMinus,
      labelKey: 'unenroll',
      fallback: 'Unenroll',
      destructive: true,
    },
  ],
  completed: [
    { icon: RefreshCw, labelKey: 'reviewCourse', fallback: 'Review Course' },
    {
      icon: Download,
      labelKey: 'downloadCertificate',
      fallback: 'Download Certificate',
    },
    { icon: Eye, labelKey: 'viewDetails', fallback: 'View Details' },
  ],
  not_started: [
    { icon: Play, labelKey: 'startCourse', fallback: 'Start Course' },
    { icon: Bookmark, labelKey: 'saveForLater', fallback: 'Save for Later' },
    { icon: Eye, labelKey: 'viewDetails', fallback: 'View Details' },
    { icon: Trash2, labelKey: 'remove', fallback: 'Remove', destructive: true },
  ],
  overdue: [
    { icon: RotateCcw, labelKey: 'resumeCourse', fallback: 'Resume Course' },
    {
      icon: Clock,
      labelKey: 'requestExtension',
      fallback: 'Request Extension',
    },
    { icon: Eye, labelKey: 'viewDetails', fallback: 'View Details' },
    {
      icon: UserMinus,
      labelKey: 'unenroll',
      fallback: 'Unenroll',
      destructive: true,
    },
  ],
};

export default function CourseOptionsMenu({
  courseTitle,
  status,
  labels,
}: CourseOptionsMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = menusByStatus[status];

  const resolvedItems = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        label: labels?.[item.labelKey] ?? item.fallback,
      })),
    [items, labels],
  );

  const regularItems = resolvedItems.filter((i) => !i.destructive);
  const destructiveItems = resolvedItems.filter((i) => i.destructive);

  const ariaLabel = labels?.moreOptionsFor
    ? labels.moreOptionsFor.replace('[title]', courseTitle)
    : `More options for ${courseTitle}`;

  return (
    <Popover
      isOpen={menuOpen}
      onClose={() => setMenuOpen(false)}
      align="right"
      width="w-52"
      ariaLabel={ariaLabel}
      trigger={
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 transition-colors"
          aria-label={ariaLabel}
          aria-expanded={menuOpen}
        >
          <MoreVertical size={16} />
        </button>
      }
    >
      <div className="p-1.5">
        {regularItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5 w-full px-3 py-2 text-start text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <item.icon
              size={15}
              strokeWidth={1.5}
              className="text-neutral-500"
            />
            {item.label}
          </button>
        ))}

        {destructiveItems.length > 0 && (
          <>
            <div className="h-px bg-neutral-100 dark:bg-gold/15 mx-1.5 my-1" />
            {destructiveItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-start text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <item.icon
                  size={15}
                  strokeWidth={1.5}
                  className="text-red-500 dark:text-red-400"
                />
                {item.label}
              </button>
            ))}
          </>
        )}
      </div>
    </Popover>
  );
}
