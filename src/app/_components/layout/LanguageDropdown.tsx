'use client';

import React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Popover } from '@fsc/design-system';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

const languages = [
  { code: 'EN', locale: 'en', label: 'English' },
  { code: 'FR', locale: 'fr', label: 'Français' },
  { code: 'DE', locale: 'de', label: 'Deutsch' },
  { code: 'ES', locale: 'es', label: 'Español' },
] as const;

interface LanguageDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function LanguageDropdown({
  isOpen,
  onToggle,
  onClose,
}: LanguageDropdownProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const tCommon = useTranslations('common');

  const selectedLang =
    languages.find((l) => l.locale === locale) ?? languages[0];

  const handleSelect = (lang: (typeof languages)[number]) => {
    router.replace(pathname, { locale: lang.locale });
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      align="right"
      width="w-44"
      ariaLabel={tCommon('selectLanguage')}
      trigger={
        <button
          onClick={onToggle}
          className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          aria-label={tCommon('selectLanguage')}
          aria-expanded={isOpen}
        >
          {selectedLang.code}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      }
    >
      <div className="p-1.5">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang)}
            className={`flex items-center justify-between w-full px-3 py-2 text-start text-sm rounded-lg transition-colors ${
              locale === lang.locale
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50/60 dark:bg-primary-900/40'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className="font-medium">{lang.code}</span>
              <span
                className={
                  locale === lang.locale
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-500 dark:text-neutral-400'
                }
              >
                {lang.label}
              </span>
            </span>
            {locale === lang.locale && (
              <Check
                size={15}
                className="text-primary-600 dark:text-primary-400"
                strokeWidth={2}
              />
            )}
          </button>
        ))}
      </div>
    </Popover>
  );
}
