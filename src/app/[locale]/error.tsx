'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@fsc/design-system';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div role="alert">
        <h1 className="text-4xl font-bold">{t('error.title')}</h1>
        <p className="mt-2 text-lg">{t('error.message')}</p>
      </div>
      <Button onClick={reset}>{t('error.retry')}</Button>
    </main>
  );
}
