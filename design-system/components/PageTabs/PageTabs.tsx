'use client';

import type { PageTabsProps } from './PageTabs.interfaces';

export default function PageTabs({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel = 'Dashboard pages',
}: PageTabsProps) {
  return (
    <div
      className="flex gap-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-gold/25 rounded-xl p-1 sm:p-1.5 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] w-full sm:w-fit overflow-x-auto scrollbar-hide"
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 ${
            activeTab === tab
              ? 'bg-primary-800 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-sm'
              : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
