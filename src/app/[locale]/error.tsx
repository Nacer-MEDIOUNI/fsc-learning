'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@fsc/design-system';

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4"
      role="alert"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('errorTitle')}
        </h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          {t('errorMessage')}
        </p>
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={reset}>
            {t('retry')}
          </Button>
        </div>
      </div>
    </div>
  );
}
