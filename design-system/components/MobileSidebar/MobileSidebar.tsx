'use client';

import type { ElementType, ReactNode } from 'react';
import {
  X,
  LayoutDashboard,
  BookOpen,
  Target,
  BarChart3,
  Star,
  User,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';
import type { NavItem } from '../../types';
import type { MobileSidebarProps } from './MobileSidebar.interfaces';

const iconMap: Record<string, ElementType> = {
  LayoutDashboard,
  BookOpen,
  Target,
  BarChart3,
  Star,
  User,
  Settings,
};

function NavItemMobile({
  item,
  isActive,
  onClick,
  renderLink,
}: {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
  renderLink?: (props: {
    href: string;
    children: ReactNode;
    className: string;
    ariaCurrent?: 'page';
  }) => ReactNode;
}) {
  const Icon = iconMap[item.icon];
  const isLocked = item.locked;

  const className = `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors w-full ${
    isLocked
      ? 'text-neutral-400 dark:text-neutral-600 opacity-50 cursor-not-allowed'
      : isActive
        ? 'bg-neutral-100 dark:bg-neutral-800 text-primary-500 dark:text-white font-medium'
        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
  }`;

  const content = (
    <>
      {Icon && <Icon size={20} strokeWidth={1.5} />}
      <span className="flex-1 text-left">{item.label}</span>
      {isLocked && (
        <Lock
          size={14}
          className="shrink-0 text-neutral-500 dark:text-neutral-600"
        />
      )}
    </>
  );

  if (!isLocked && item.href && renderLink) {
    return renderLink({
      href: item.href,
      children: content,
      className,
      ariaCurrent: isActive ? 'page' : undefined,
    });
  }

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked || undefined}
      aria-current={isActive ? 'page' : undefined}
      className={className}
    >
      {content}
    </button>
  );
}

export default function MobileSidebar({
  isOpen,
  onClose,
  navItems,
  activeItem = 'Overview',
  onNavClick,
  sectionLabels,
  logoutLabel,
  onLogout,
  renderLink,
}: MobileSidebarProps) {
  const sections = ['MAIN', 'ANALYTICS', 'SETTINGS'];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-neutral-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-gold/25">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo_header.png"
              alt="FSC"
              className="h-7 w-auto dark:brightness-200"
            />
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Learning
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col flex-1 px-4 py-4 overflow-y-auto">
          {sections.map((section) => {
            const items = navItems.filter((i) => i.section === section);
            if (items.length === 0) return null;
            return (
              <div key={section} className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 px-3 mb-2">
                  {sectionLabels?.[section] ?? section}
                </p>
                <div className="flex flex-col gap-0.5">
                  {items.map((item) => (
                    <NavItemMobile
                      key={item.label}
                      item={item}
                      isActive={item.label === activeItem}
                      onClick={() => {
                        onNavClick?.(item.label);
                        onClose();
                      }}
                      renderLink={renderLink}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-neutral-200 dark:border-gold/25">
          <button
            onClick={() => {
              onLogout?.();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-sm transition-colors w-full"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span>{logoutLabel ?? 'Logout'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
