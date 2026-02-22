'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { PageTabs, DemoToggle } from '@fsc/design-system';
import type { DemoToggleLabels } from '@fsc/design-system';
import DashboardShell from '@/app/_components/layout/DashboardShell';
import { RecentlySaved } from '@/app/_components/widgets/RecentlySaved';
import { UpcomingDeadlines } from '@/app/_components/widgets/UpcomingDeadlines';
import GreetingBanner, {
  ResumeCard,
} from '@/app/_components/dashboard/GreetingBanner';
import LearningStatus from '@/app/_components/dashboard/LearningStatus';
import ContinueLearning from '@/app/_components/dashboard/ContinueLearning';
import NewCourses from '@/app/_components/dashboard/NewCourses';
import SavedListPage from '@/app/_components/dashboard/SavedListPage';
import AchievementsPage from '@/app/_components/dashboard/AchievementsPage';
import { useRouter } from '@/i18n/navigation';

const PAGE_TAB_KEYS = [
  'tabOverview',
  'tabSavedList',
  'tabAchievements',
] as const;

export default function DashboardPage() {
  const [activeTabKey, setActiveTabKey] = useState<string>('tabOverview');
  const [showEmpty, setShowEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const tDashboard = useTranslations('dashboard');
  const router = useRouter();

  const demoToggleLabels: DemoToggleLabels = useMemo(
    () => ({
      showcasingPurposes: tDashboard('showcasingPurposes'),
      exitLoading: tDashboard('exitLoading'),
      loading: tDashboard('showLoading'),
      exitLoadingAriaLabel: tDashboard('exitLoadingAriaLabel'),
      showLoadingAriaLabel: tDashboard('showLoadingAriaLabel'),
      exitEmptyState: tDashboard('exitEmptyState'),
      emptyState: tDashboard('showEmptyState'),
      showPopulatedAriaLabel: tDashboard('showPopulatedAriaLabel'),
      showEmptyAriaLabel: tDashboard('showEmptyAriaLabel'),
    }),
    [tDashboard],
  );

  const pageTabs = useMemo(
    () => PAGE_TAB_KEYS.map((key) => tDashboard(key)),
    [tDashboard],
  );

  const activePageTab = tDashboard(activeTabKey);

  const goToCatalog = () => {
    router.push('/catalogue');
  };

  const handleTabChange = (tab: string) => {
    const idx = pageTabs.indexOf(tab);
    if (idx !== -1) {
      setActiveTabKey(PAGE_TAB_KEYS[idx]!);
    }
  };

  return (
    <DashboardShell>
      <div className="flex flex-col 2xl:flex-row 2xl:items-start gap-4">
        <GreetingBanner />
        <div className="flex flex-wrap items-center justify-between gap-3 2xl:flex-1 2xl:justify-end">
          <DemoToggle
            enabled={showEmpty}
            onToggle={() => setShowEmpty(!showEmpty)}
            loadingEnabled={showLoading}
            onLoadingToggle={() => setShowLoading(!showLoading)}
            labels={demoToggleLabels}
          />
          <PageTabs
            tabs={pageTabs}
            activeTab={activePageTab}
            onTabChange={handleTabChange}
          />
        </div>
      </div>

      {activeTabKey === 'tabOverview' && (
        <>
          <ResumeCard
            showEmpty={showEmpty}
            showLoading={showLoading}
            onBrowse={goToCatalog}
          />

          <div className="flex gap-5">
            <div className="flex-1 min-w-0 flex flex-col gap-6">
              <div className="flex flex-col 2xl:flex-row gap-5">
                <div className="2xl:flex-1 min-w-max">
                  <LearningStatus
                    showEmpty={showEmpty}
                    showLoading={showLoading}
                  />
                </div>
                <div className="2xl:flex-1 min-w-0">
                  <RecentlySaved
                    showEmpty={showEmpty}
                    showLoading={showLoading}
                    onViewAll={goToCatalog}
                  />
                </div>
              </div>
              <ContinueLearning
                showEmpty={showEmpty}
                showLoading={showLoading}
              />
            </div>

            <aside className="hidden xl:block w-[260px] shrink-0">
              <UpcomingDeadlines
                showEmpty={showEmpty}
                showLoading={showLoading}
              />
            </aside>
          </div>

          <div className="xl:hidden">
            <UpcomingDeadlines
              showEmpty={showEmpty}
              showLoading={showLoading}
            />
          </div>

          <NewCourses
            showEmpty={showEmpty}
            showLoading={showLoading}
            onViewAll={goToCatalog}
          />
        </>
      )}

      {activeTabKey === 'tabSavedList' && (
        <SavedListPage showEmpty={showEmpty} showLoading={showLoading} />
      )}

      {activeTabKey === 'tabAchievements' && (
        <AchievementsPage showEmpty={showEmpty} showLoading={showLoading} />
      )}
    </DashboardShell>
  );
}
