'use client';

import React from 'react';
import { ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Popover, Avatar } from '@fsc/design-system';
import { getUser } from '@/data/user';
import { useAuth } from '@/context/auth-context';

interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onToggle,
  onClose,
}: ProfileDropdownProps) {
  const locale = useLocale();
  const currentUser = getUser(locale);
  const t = useTranslations('profile');
  const { logout } = useAuth();

  const menuItems = [
    { icon: User, label: t('viewProfile') },
    { icon: Settings, label: t('accountSettings') },
    { icon: HelpCircle, label: t('helpSupport') },
  ];

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      align="right"
      width="w-72"
      ariaLabel={t('viewProfile')}
      trigger={
        <button
          onClick={onToggle}
          className="flex items-center gap-2 ml-2 pl-3 border-l border-neutral-200 dark:border-gold/25"
          aria-label={t('viewProfile')}
          aria-expanded={isOpen}
        >
          <Avatar initials={currentUser.initials} size="sm" />
          <span className="hidden lg:block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {currentUser.name}
          </span>
          <ChevronDown
            size={14}
            className={`hidden lg:block text-neutral-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      }
    >
      <div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <Avatar initials={currentUser.initials} size="lg" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {currentUser.email}
            </p>
            <p className="text-xs text-neutral-500 mt-0.5">
              {currentUser.role}
            </p>
          </div>
        </div>

        <div className="h-px bg-neutral-100 dark:bg-gold/15 mx-3" />

        <div className="p-1.5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={onClose}
              className="flex items-center gap-3 w-full px-3 py-2 text-start text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <item.icon
                size={16}
                strokeWidth={1.5}
                className="text-neutral-500"
              />
              {item.label}
            </button>
          ))}
        </div>

        <div className="h-px bg-neutral-100 dark:bg-gold/15 mx-3" />

        <div className="p-1.5">
          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="flex items-center gap-3 w-full px-3 py-2 text-start text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut
              size={16}
              strokeWidth={1.5}
              className="text-red-500 dark:text-red-400"
            />
            {t('signOut')}
          </button>
        </div>
      </div>
    </Popover>
  );
}
