'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import type { BookmarkToggleProps } from './BookmarkToggle.interfaces';

export default function BookmarkToggle({
  courseTitle,
  bookmarked: controlledBookmarked,
  defaultBookmarked = false,
  onToggle,
  confirmUnsave,
  onRequestUnsave,
}: BookmarkToggleProps) {
  const [internalBookmarked, setInternalBookmarked] =
    useState(defaultBookmarked);
  const bookmarked =
    controlledBookmarked !== undefined
      ? controlledBookmarked
      : internalBookmarked;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (bookmarked && confirmUnsave && onRequestUnsave) {
      onRequestUnsave();
      return;
    }

    const next = !bookmarked;
    setInternalBookmarked(next);
    onToggle?.(next);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-primary-500 cursor-pointer py-2 px-2.5 ${
        bookmarked
          ? 'bg-primary-50 dark:bg-primary-900/40 text-primary-500 border-primary-200 dark:border-primary-800'
          : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-gold/25 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-gold/35'
      }`}
      aria-label={
        bookmarked
          ? `Remove ${courseTitle} from saved list`
          : `Save ${courseTitle} for later`
      }
      aria-pressed={bookmarked}
    >
      <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} />
    </button>
  );
}
