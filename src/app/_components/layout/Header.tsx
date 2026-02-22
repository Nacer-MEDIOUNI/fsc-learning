'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations, useLocale } from 'next-intl';
import { SearchModal } from '@fsc/design-system';
import type { SearchableItem, SearchModalLabels } from '@fsc/design-system';
import LanguageDropdown from './LanguageDropdown';
import NotificationsPanel from './NotificationsPanel';
import ProfileDropdown from './ProfileDropdown';
import { getEnrolledCourses } from '@/data/courses-enrolled';
import { getNewCourses } from '@/data/courses-new';
import { navItems } from '@/data/nav-items';

interface HeaderProps {
  sidebarExpanded: boolean;
  onSidebarToggle: () => void;
  onMobileMenuToggle: () => void;
}

type DropdownName = 'language' | 'notifications' | 'profile';

export default function Header({
  sidebarExpanded,
  onSidebarToggle,
  onMobileMenuToggle,
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownName | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const locale = useLocale();
  const t = useTranslations('search');
  const tDashboard = useTranslations('dashboard');
  const tCommon = useTranslations('common');
  const tCourses = useTranslations('courses');

  const enrolledCourses = useMemo(() => getEnrolledCourses(locale), [locale]);
  const newCoursesData = useMemo(() => getNewCourses(locale), [locale]);

  const searchModalLabels: SearchModalLabels = useMemo(
    () => ({
      recent: t('recent'),
      courses: t('courses'),
      pages: t('pages'),
      help: t('help'),
      noResultsPrefix: t('noResultsPrefix'),
      tryDifferentTerm: t('tryDifferentTerm'),
      navigate: t('navigate'),
      open: t('open'),
      close: tCommon('close'),
      searchPlaceholder: t('placeholder'),
      searchAriaLabel: t('searchAriaLabel'),
      searchResultsLabel: t('searchResultsLabel'),
      recentCoursesLabel: t('recentCoursesLabel'),
      completed: tCourses('completed'),
      overdue: tCourses('overdue'),
    }),
    [t, tCommon, tCourses],
  );

  const allSearchable: SearchableItem[] = useMemo(
    () => [
      ...enrolledCourses.map((c) => ({
        id: c.id,
        type: 'course' as const,
        title: c.title,
        description: `${c.category} — ${c.status === 'in_progress' ? `${tDashboard('inProgress')} (${c.progress}%)` : c.status === 'completed' ? tDashboard('completed') : c.status === 'overdue' ? tDashboard('overdue') : tDashboard('notStarted')}`,
      })),
      ...newCoursesData.map((c) => ({
        id: `new-${c.id}`,
        type: 'course' as const,
        title: c.title,
        description: `${c.category} — ${tDashboard('newCourses')}`,
      })),
      ...navItems.map((n) => ({
        id: `nav-${n.label}`,
        type: 'page' as const,
        title: n.label,
        description: n.label,
      })),
      {
        id: 'help-certificates',
        type: 'help',
        title: tDashboard('helpCertificates'),
        description: tDashboard('helpCertificatesDesc'),
      },
      {
        id: 'help-support',
        type: 'help',
        title: tDashboard('helpSupport'),
        description: tDashboard('helpSupportDesc'),
      },
    ],
    [tDashboard, enrolledCourses, newCoursesData],
  );

  const recentSearchCourses = useMemo(
    () =>
      enrolledCourses
        .filter((c) => c.lastAccessed)
        .sort((a, b) => {
          const order: Record<string, number> = {};
          enrolledCourses.forEach((c, i) => {
            if (c.lastAccessed) order[c.id] = i;
          });
          return (order[a.id] ?? 0) - (order[b.id] ?? 0);
        })
        .slice(0, 4),
    [enrolledCourses],
  );

  useEffect(() => setMounted(true), []);

  const toggleDropdown = useCallback((name: DropdownName) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }, []);

  const closeDropdown = useCallback(() => setOpenDropdown(null), []);

  const openSearch = useCallback(() => {
    setOpenDropdown(null);
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openSearch]);

  return (
    <>
      <header className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-gold/25 rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between px-4 lg:px-5 h-14">
          <div className="flex items-center">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 md:hidden"
              aria-label={tCommon('openMenu')}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={onSidebarToggle}
              className="hidden md:flex p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
              aria-label={
                sidebarExpanded
                  ? tCommon('collapseSidebar')
                  : tCommon('expandSidebar')
              }
            >
              {sidebarExpanded ? (
                <PanelLeftClose size={20} strokeWidth={1.5} />
              ) : (
                <PanelLeftOpen size={20} strokeWidth={1.5} />
              )}
            </button>

            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo_header.png"
                alt="FSC"
                className="h-9 w-auto dark:brightness-200"
              />
              <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 hidden sm:block">
                Learning
              </span>
            </div>
          </div>

          <button
            onClick={openSearch}
            className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-4 lg:mx-6 w-full px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-gold/25 rounded-lg text-sm text-neutral-500 hover:border-neutral-300 dark:hover:border-gold/35 hover:bg-white dark:hover:bg-neutral-700 hover:shadow-sm active:scale-[0.995] transition-all duration-150"
            aria-label={tCommon('search')}
          >
            <Search
              size={16}
              className="shrink-0 text-neutral-500"
              strokeWidth={1.5}
            />
            <span className="flex-1 text-left">{t('searchCoursesPages')}</span>
            <kbd className="shrink-0 text-xs font-medium text-neutral-500 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded px-1.5 py-0.5 shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
              Ctrl+K
            </kbd>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={openSearch}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 md:hidden"
              aria-label={tCommon('search')}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <LanguageDropdown
              isOpen={openDropdown === 'language'}
              onToggle={() => toggleDropdown('language')}
              onClose={closeDropdown}
            />

            <button
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
              aria-label={
                mounted
                  ? resolvedTheme === 'dark'
                    ? tCommon('switchToLight')
                    : tCommon('switchToDark')
                  : tCommon('toggleTheme')
              }
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun size={18} strokeWidth={1.5} />
              ) : (
                <Moon size={18} strokeWidth={1.5} />
              )}
            </button>

            <NotificationsPanel
              isOpen={openDropdown === 'notifications'}
              onToggle={() => toggleDropdown('notifications')}
              onClose={closeDropdown}
            />

            <ProfileDropdown
              isOpen={openDropdown === 'profile'}
              onToggle={() => toggleDropdown('profile')}
              onClose={closeDropdown}
            />
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={searchOpen}
        onClose={closeSearch}
        searchableItems={allSearchable}
        recentCourses={recentSearchCourses}
        labels={searchModalLabels}
      />
    </>
  );
}
