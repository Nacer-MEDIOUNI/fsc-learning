'use client';

import { Eye, EyeOff, Loader2 } from 'lucide-react';
import type { DemoToggleProps } from './DemoToggle.interfaces';

export default function DemoToggle({
  enabled,
  onToggle,
  loadingEnabled,
  onLoadingToggle,
  labels,
}: DemoToggleProps) {
  const l = {
    showcasingPurposes:
      labels?.showcasingPurposes ?? 'Showcasing purposes only',
    exitLoading: labels?.exitLoading ?? 'Exit Loading',
    loading: labels?.loading ?? 'Loading',
    exitLoadingAriaLabel: labels?.exitLoadingAriaLabel ?? 'Exit loading state',
    showLoadingAriaLabel: labels?.showLoadingAriaLabel ?? 'Show loading state',
    exitEmptyState: labels?.exitEmptyState ?? 'Exit Empty State',
    emptyState: labels?.emptyState ?? 'Empty State',
    showPopulatedAriaLabel:
      labels?.showPopulatedAriaLabel ?? 'Show populated state',
    showEmptyAriaLabel: labels?.showEmptyAriaLabel ?? 'Show empty state',
  };

  return (
    <div className="flex justify-start items-center gap-2">
      <span className="text-xs text-neutral-500 dark:text-neutral-400 italic hidden sm:inline">
        {l.showcasingPurposes}
      </span>
      <button
        onClick={onLoadingToggle}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
          loadingEnabled
            ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-gold/25 text-neutral-500 dark:text-neutral-400 hover:border-primary-300 dark:hover:border-gold/50 hover:text-primary-500 dark:hover:text-neutral-100 shadow-primary'
        }`}
        aria-label={
          loadingEnabled ? l.exitLoadingAriaLabel : l.showLoadingAriaLabel
        }
      >
        <Loader2 size={12} className={loadingEnabled ? 'animate-spin' : ''} />
        {loadingEnabled ? l.exitLoading : l.loading}
      </button>
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
          enabled
            ? 'bg-primary-600 border-primary-600 text-white shadow-sm'
            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-gold/25 text-neutral-500 dark:text-neutral-400 hover:border-primary-300 dark:hover:border-gold/50 hover:text-primary-600 dark:hover:text-neutral-100 shadow-primary'
        }`}
        aria-label={enabled ? l.showPopulatedAriaLabel : l.showEmptyAriaLabel}
      >
        {enabled ? <EyeOff size={12} /> : <Eye size={12} />}
        {enabled ? l.exitEmptyState : l.emptyState}
      </button>
    </div>
  );
}
