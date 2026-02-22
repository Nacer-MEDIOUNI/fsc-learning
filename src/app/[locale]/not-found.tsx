'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@fsc/design-system';
import { useRouter } from '@/i18n/navigation';

export default function LocaleNotFound() {
  const t = useTranslations('common');
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          404
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          {t('notFoundTitle')}
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500">
          {t('notFoundMessage')}
        </p>
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={() => router.push('/')}>
            {t('goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
