'use client';

import React, { useState } from 'react';
import { Bell, AlertTriangle, BookOpen, Info } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Popover } from '@fsc/design-system';
import { getNotifications } from '@/data/notifications';
import type { NotificationType } from '@/types';

interface NotificationsPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const iconMap: Record<
  NotificationType,
  { icon: React.ElementType; color: string }
> = {
  deadline: {
    icon: AlertTriangle,
    color:
      'bg-amber-50 text-amber-500 dark:bg-amber-900/40 dark:text-amber-400',
  },
  course: {
    icon: BookOpen,
    color:
      'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
  },
  system: {
    icon: Info,
    color: 'bg-blue-50 text-blue-500 dark:bg-blue-900/40 dark:text-blue-400',
  },
};

export default function NotificationsPanel({
  isOpen,
  onToggle,
  onClose,
}: NotificationsPanelProps) {
  const locale = useLocale();
  const [items, setItems] = useState(() => getNotifications(locale));
  const t = useTranslations('notifications');

  const unreadCount = items.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      align="right"
      width="w-80"
      ariaLabel={t('title')}
      trigger={
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 relative transition-colors"
          aria-label={t('title')}
          aria-expanded={isOpen}
        >
          <Bell size={18} strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-neutral-900" />
          )}
        </button>
      }
    >
      <div>
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {t('title')}
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              {t('markAllRead')}
            </button>
          )}
        </div>

        <div className="h-px bg-neutral-100 dark:bg-gold/15" />

        <div className="max-h-[320px] overflow-y-auto overscroll-contain p-1.5">
          {items.map((notification) => {
            const { icon: Icon, color } = iconMap[notification.type];
            return (
              <button
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`flex items-start gap-3 w-full px-3 py-2.5 text-left rounded-lg transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800 ${
                  !notification.read
                    ? 'bg-primary-50/30 dark:bg-primary-900/20'
                    : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${color}`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm leading-snug ${!notification.read ? 'font-semibold text-neutral-900 dark:text-neutral-100' : 'font-medium text-neutral-700 dark:text-neutral-300'}`}
                  >
                    {notification.title}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0 mt-1.5" />
                )}
              </button>
            );
          })}
        </div>

        <div className="h-px bg-neutral-100 dark:bg-gold/15" />

        <div className="px-4 py-2.5">
          <button
            onClick={onClose}
            className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium w-full text-center transition-colors"
          >
            {t('viewAll')}
          </button>
        </div>
      </div>
    </Popover>
  );
}
