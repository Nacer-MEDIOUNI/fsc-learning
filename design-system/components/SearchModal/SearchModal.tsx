'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search,
  FileText,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Clock,
  CornerDownLeft,
} from 'lucide-react';
import type { SearchableItem } from '../../types';
import type { SearchModalProps } from './SearchModal.interfaces';

const typeIcons: Record<string, typeof BookOpen> = {
  course: BookOpen,
  page: FileText,
  help: HelpCircle,
};

const defaultTypeLabels: Record<string, string> = {
  course: 'Courses',
  page: 'Pages',
  help: 'Help',
};

const typeStyles: Record<string, string> = {
  course:
    'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
  page: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  help: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
};

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-accent-100 dark:bg-accent-900/40 text-neutral-900 dark:text-neutral-100 rounded-[2px] px-[1px]"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function SearchModal({
  isOpen,
  onClose,
  searchableItems,
  recentCourses,
  labels,
}: SearchModalProps) {
  const typeLabels: Record<string, string> = {
    course: labels?.courses ?? defaultTypeLabels['course']!,
    page: labels?.pages ?? defaultTypeLabels['page']!,
    help: labels?.help ?? defaultTypeLabels['help']!,
  };
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(-1);
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, visible]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q),
    );
  }, [query, searchableItems]);

  const grouped = useMemo(() => {
    const groups: Record<string, SearchableItem[]> = {};
    for (const item of filtered) {
      const list = groups[item.type] ?? (groups[item.type] = []);
      list.push(item);
    }
    return groups;
  }, [filtered]);

  const flatItems = useMemo(() => {
    if (!query.trim()) {
      return recentCourses.map((c) => ({ id: c.id }));
    }
    const items: { id: string }[] = [];
    for (const group of Object.values(grouped)) {
      for (const item of group) {
        items.push({ id: item.id });
      }
    }
    return items;
  }, [query, grouped, recentCourses]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  useEffect(() => {
    if (activeIndex < 0 || !listboxRef.current) return;
    const el = listboxRef.current.querySelector(
      `[id="search-option-${activeIndex}"]`,
    );
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const selectItem = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev < flatItems.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : flatItems.length - 1,
          );
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(flatItems.length - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0) selectItem();
          break;
      }
    },
    [onClose, flatItems.length, activeIndex, selectItem],
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  if (!isOpen) return null;

  const hasQuery = query.trim().length > 0;
  const activeId =
    activeIndex >= 0 ? `search-option-${activeIndex}` : undefined;
  const resultCount = hasQuery ? filtered.length : recentCourses.length;
  const srMessage = hasQuery
    ? `${resultCount} result${resultCount !== 1 ? 's' : ''} found`
    : `${resultCount} recent course${resultCount !== 1 ? 's' : ''}`;

  let optionIndex = 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50"
    >
      <div
        className={`fixed inset-0 bg-black/25 backdrop-blur-[6px] transition-opacity duration-250 ${visible ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-start justify-center px-4 pt-[10vh] sm:pt-[12vh]">
        <div
          ref={panelRef}
          className={`relative z-[51] flex w-full max-w-[540px] flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-neutral-200/80 dark:ring-neutral-700/80 transition-all duration-250 ${
            visible
              ? 'translate-y-0 scale-100 opacity-100'
              : '-translate-y-2 scale-[0.98] opacity-0'
          }`}
        >
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center gap-3 rounded-xl border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-neutral-800 px-3.5 py-2.5 transition-all duration-150 focus-within:border-primary-300 dark:focus-within:border-primary-600 focus-within:bg-white dark:focus-within:bg-neutral-900 focus-within:ring-[3px] focus-within:ring-primary-500/10">
              <Search
                size={18}
                className="shrink-0 text-neutral-500 transition-colors duration-150 group-focus-within:text-primary-500"
                strokeWidth={1.5}
              />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="search-listbox"
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                aria-label={
                  labels?.searchAriaLabel ?? 'Search courses, pages, help'
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  labels?.searchPlaceholder ?? 'Search courses, pages, help...'
                }
                className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-neutral-100 outline-none placeholder:text-neutral-500 [&:focus-visible]:outline-none [&:focus-visible]:ring-0"
                style={{ outline: 'none', boxShadow: 'none' }}
              />
              <kbd className="shrink-0 rounded-md border border-neutral-200 dark:border-gold/25 bg-white dark:bg-neutral-800 px-1.5 py-0.5 text-xs font-medium text-neutral-500 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                ESC
              </kbd>
            </div>
          </div>

          <div className="mx-4 h-px bg-neutral-100 dark:bg-gold/15" />

          <div
            ref={listboxRef}
            id="search-listbox"
            role="listbox"
            aria-label={
              hasQuery
                ? (labels?.searchResultsLabel ?? 'Search results')
                : (labels?.recentCoursesLabel ?? 'Recent courses')
            }
            className="max-h-[48vh] overflow-y-auto overscroll-contain px-3 py-2"
          >
            {!hasQuery ? (
              <div>
                <div className="flex items-center gap-1.5 px-2 pb-1.5 pt-1">
                  <Clock
                    size={11}
                    className="text-neutral-500"
                    strokeWidth={2}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {labels?.recent ?? 'Recent'}
                  </span>
                </div>
                {recentCourses.map((course) => {
                  const idx = optionIndex++;
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={course.id}
                      id={`search-option-${idx}`}
                      role="option"
                      aria-selected={isActive}
                      className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-100 ${
                        isActive
                          ? 'bg-primary-50 dark:bg-primary-900/40'
                          : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      }`}
                      onClick={onClose}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          isActive
                            ? 'bg-primary-100 dark:bg-primary-900/60 text-primary-600 dark:text-primary-400'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                        } transition-colors duration-100`}
                      >
                        <BookOpen size={16} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
                          {course.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 px-1.5 py-[2px] text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {course.category}
                          </span>
                          {course.status === 'in_progress' && (
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-14 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                                <div
                                  className="h-full rounded-full bg-primary-500"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-xs tabular-nums text-neutral-500">
                                {course.progress}%
                              </span>
                            </div>
                          )}
                          {course.status === 'completed' && (
                            <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                              {labels?.completed ?? 'Completed'}
                            </span>
                          )}
                          {course.status === 'overdue' && (
                            <span className="text-xs font-medium text-red-500">
                              {labels?.overdue ?? 'Overdue'}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className={`shrink-0 text-neutral-500 dark:text-neutral-600 transition-all duration-100 ${
                          isActive
                            ? 'translate-x-0 opacity-100'
                            : '-translate-x-1 opacity-0'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            ) : filtered.length > 0 ? (
              Object.entries(grouped).map(([type, items]) => {
                const Icon = typeIcons[type] ?? FileText;
                const iconStyle =
                  typeStyles[type] ??
                  'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400';
                return (
                  <div key={type} className="mb-1">
                    <div className="px-2 pb-1 pt-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                        {typeLabels[type] ?? type}
                      </span>
                    </div>
                    {items.map((item) => {
                      const idx = optionIndex++;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={item.id}
                          id={`search-option-${idx}`}
                          role="option"
                          aria-selected={isActive}
                          className={`group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all duration-100 ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-900/40'
                              : 'hover:bg-neutral-50 dark:hover:bg-neutral-800'
                          }`}
                          onClick={onClose}
                          onMouseEnter={() => setActiveIndex(idx)}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              isActive
                                ? iconStyle
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                            } transition-colors duration-100`}
                          >
                            <Icon size={16} strokeWidth={1.5} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
                              {highlightMatch(item.title, query)}
                            </p>
                            <p className="mt-0.5 truncate text-sm text-neutral-500">
                              {highlightMatch(item.description, query)}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            strokeWidth={1.5}
                            className={`shrink-0 text-neutral-500 dark:text-neutral-600 transition-all duration-100 ${
                              isActive
                                ? 'translate-x-0 opacity-100'
                                : '-translate-x-1 opacity-0'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <Search
                    size={20}
                    className="text-neutral-500"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {(labels?.noResultsPrefix ?? 'No results for') +
                    ` \u201C${query}\u201D`}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  {labels?.tryDifferentTerm ?? 'Try a different search term'}
                </p>
              </div>
            )}
          </div>

          <div aria-live="polite" className="sr-only">
            {srMessage}
          </div>

          <div className="flex items-center gap-5 border-t border-neutral-100 dark:border-gold/15 px-5 py-2.5">
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-neutral-800 px-1 text-xs font-medium shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                &uarr;
              </kbd>
              <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-neutral-800 px-1 text-xs font-medium shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                &darr;
              </kbd>
              <span className="ml-0.5">{labels?.navigate ?? 'Navigate'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <kbd className="inline-flex h-5 items-center justify-center rounded border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-neutral-800 px-1.5 text-xs font-medium shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                <CornerDownLeft size={10} strokeWidth={2} />
              </kbd>
              <span>{labels?.open ?? 'Open'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <kbd className="inline-flex h-5 items-center justify-center rounded border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-neutral-800 px-1.5 text-xs font-medium shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
                esc
              </kbd>
              <span>{labels?.close ?? 'Close'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
