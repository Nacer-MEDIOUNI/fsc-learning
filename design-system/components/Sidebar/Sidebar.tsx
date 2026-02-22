'use client';

import type { ElementType, ReactNode } from 'react';
import {
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
import type { SidebarProps } from './Sidebar.interfaces';

const iconMap: Record<string, ElementType> = {
  LayoutDashboard,
  BookOpen,
  Target,
  BarChart3,
  Star,
  User,
  Settings,
};

function NavItemComponent({
  item,
  isActive,
  expanded,
  onClick,
  renderLink,
}: {
  item: NavItem;
  isActive: boolean;
  expanded: boolean;
  onClick?: () => void;
  renderLink?: (props: {
    href: string;
    children: ReactNode;
    className: string;
    ariaCurrent?: 'page';
    ariaLabel?: string;
  }) => ReactNode;
}) {
  const Icon = iconMap[item.icon];
  const isLocked = item.locked;

  const className = `flex items-center gap-3 rounded-lg text-sm transition-all duration-200 relative w-full ${
    expanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'
  } ${
    isLocked
      ? 'text-neutral-400 dark:text-neutral-600 opacity-50 cursor-not-allowed'
      : isActive
        ? 'bg-neutral-100 dark:bg-neutral-800 text-primary-500 dark:text-white font-medium'
        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-200'
  }`;

  const content = (
    <>
      {isActive && !isLocked && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-500 rounded-r-full" />
      )}
      {Icon && <Icon size={20} strokeWidth={1.5} className="shrink-0" />}
      {expanded && (
        <>
          <span className="truncate flex-1 text-left">{item.label}</span>
          {isLocked && (
            <Lock
              size={14}
              className="shrink-0 text-neutral-500 dark:text-neutral-600"
            />
          )}
        </>
      )}
    </>
  );

  const ariaLabel = !expanded ? item.label : undefined;

  if (!isLocked && item.href && renderLink) {
    return renderLink({
      href: item.href,
      children: content,
      className,
      ariaCurrent: isActive ? 'page' : undefined,
      ariaLabel,
    });
  }

  return (
    <button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked || undefined}
      aria-current={isActive ? 'page' : undefined}
      aria-label={ariaLabel}
      className={className}
    >
      {content}
    </button>
  );
}

export default function Sidebar({
  expanded,
  navItems,
  activeItem = 'Overview',
  onNavClick,
  sectionLabels,
  logoutLabel,
  onLogout,
  renderLink,
}: SidebarProps) {
  const sections = ['MAIN', 'ANALYTICS', 'SETTINGS'];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-gold/25 rounded-xl shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] dark:shadow-[0px_2px_4px_0px_rgba(0,0,0,0.3)] shrink-0 transition-[width] duration-300 ease-in-out overflow-hidden ${
        expanded ? 'w-[220px]' : 'w-[56px]'
      }`}
      aria-label="Main navigation"
    >
      <nav
        className={`flex flex-col flex-1 overflow-y-auto overflow-x-hidden ${expanded ? 'px-3 py-4' : 'px-1.5 py-4'}`}
      >
        {sections.map((section) => {
          const items = navItems.filter((i) => i.section === section);
          if (items.length === 0) return null;
          return (
            <div key={section} className="mb-4">
              {expanded && (
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 px-3">
                  {sectionLabels?.[section] ?? section}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {items.map((item) => (
                  <NavItemComponent
                    key={item.label}
                    item={item}
                    isActive={item.label === activeItem}
                    expanded={expanded}
                    onClick={() => onNavClick?.(item.label)}
                    renderLink={renderLink}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      <div
        className={`mt-auto border-t border-neutral-200 dark:border-gold/25 ${expanded ? 'px-3 py-3' : 'px-1.5 py-3'}`}
      >
        <button
          onClick={onLogout}
          aria-label={!expanded ? (logoutLabel ?? 'Logout') : undefined}
          className={`flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg transition-colors w-full ${
            expanded ? 'px-3 py-2.5' : 'px-0 py-2.5 justify-center'
          }`}
        >
          <LogOut size={20} strokeWidth={1.5} className="shrink-0" />
          {expanded && <span>{logoutLabel ?? 'Logout'}</span>}
        </button>
      </div>
    </aside>
  );
}
