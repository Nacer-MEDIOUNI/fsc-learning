'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { DemoToggle } from '@fsc/design-system';
import type { DemoToggleLabels } from '@fsc/design-system';
import DashboardShell from '@/app/_components/layout/DashboardShell';
import CatalogPage from '@/app/_components/dashboard/CatalogPage';

export default function CatalogueRoute() {
  const [showEmpty, setShowEmpty] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const tDashboard = useTranslations('dashboard');

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

  return (
    <DashboardShell>
      <DemoToggle
        enabled={showEmpty}
        onToggle={() => setShowEmpty(!showEmpty)}
        loadingEnabled={showLoading}
        onLoadingToggle={() => setShowLoading(!showLoading)}
        labels={demoToggleLabels}
      />
      <CatalogPage showEmpty={showEmpty} showLoading={showLoading} />
    </DashboardShell>
  );
}
