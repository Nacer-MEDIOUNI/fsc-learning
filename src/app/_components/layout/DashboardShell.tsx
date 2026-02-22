'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Sidebar, MobileSidebar, Footer } from '@fsc/design-system';
import Header from '@/app/_components/layout/Header';
import { useAuth } from '@/context/auth-context';
import { usePathname, Link } from '@/i18n/navigation';
import { navItems } from '@/data/nav-items';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { logout } = useAuth();
  const pathname = usePathname();

  const sectionLabels = useMemo(
    () => ({
      MAIN: tNav('main'),
      ANALYTICS: tNav('analyticsSection'),
      SETTINGS: tNav('settingsSection'),
    }),
    [tNav],
  );

  const translatedNavItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        label: tNav(item.label.toLowerCase()),
      })),
    [tNav],
  );

  const activeItem = useMemo(() => {
    const match = navItems.findIndex((item) => {
      if (item.href === '/') return pathname === '/';
      return pathname.startsWith(item.href);
    });
    if (match !== -1) return translatedNavItems[match]?.label;
    return translatedNavItems[0]?.label;
  }, [pathname, translatedNavItems]);

  const renderLink = useCallback(
    ({
      href,
      children: linkChildren,
      className,
      ariaCurrent,
      ariaLabel,
    }: {
      href: string;
      children: React.ReactNode;
      className: string;
      ariaCurrent?: 'page';
      ariaLabel?: string;
    }) => (
      <Link
        href={href}
        className={className}
        aria-current={ariaCurrent}
        aria-label={ariaLabel}
      >
        {linkChildren}
      </Link>
    ),
    [],
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="shrink-0 z-40 px-4 lg:px-6 pt-3 pb-4">
        <Header
          sidebarExpanded={sidebarExpanded}
          onSidebarToggle={() => setSidebarExpanded(!sidebarExpanded)}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />
      </div>

      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeItem}
        navItems={translatedNavItems}
        sectionLabels={sectionLabels}
        logoutLabel={tNav('logout')}
        onLogout={logout}
        renderLink={renderLink}
      />

      <div className="flex flex-1 min-h-0 gap-4 pl-4 lg:pl-6 pb-4">
        <Sidebar
          expanded={sidebarExpanded}
          activeItem={activeItem}
          navItems={translatedNavItems}
          sectionLabels={sectionLabels}
          logoutLabel={tNav('logout')}
          onLogout={logout}
          renderLink={renderLink}
        />

        <main
          id="main-content"
          className="flex-1 min-w-0 overflow-y-auto md:[scrollbar-gutter:stable]"
        >
          <div className="flex flex-col gap-6 pt-6 pr-4 lg:pr-6">
            {children}

            <Footer
              copyrightText={tCommon('copyright')}
              privacyLabel={tCommon('privacy')}
              termsLabel={tCommon('terms')}
              helpLabel={tCommon('helpLabel')}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
