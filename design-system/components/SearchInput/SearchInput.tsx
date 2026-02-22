'use client';

import { Search } from 'lucide-react';
import type { SearchInputProps } from './SearchInput.interfaces';

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  ariaLabel,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative w-full sm:w-64 ${className ?? ''}`}>
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-gold/25 bg-white dark:bg-neutral-800 px-3 py-2 transition-all duration-150 focus-within:border-neutral-400 dark:focus-within:border-neutral-500 focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.04)]">
        <Search size={14} className="text-neutral-500 shrink-0" />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 outline-none focus:outline-none focus:ring-0 [&:focus-visible]:outline-none [&:focus-visible]:ring-0 placeholder:text-neutral-500"
          style={{ outline: 'none', boxShadow: 'none' }}
          aria-label={ariaLabel ?? placeholder}
        />
      </div>
    </div>
  );
}
