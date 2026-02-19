'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@fsc/design-system';

export default function NotFoundPage() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
      <p className="text-lg">{t('notFound.message')}</p>
      <Button onClick={() => router.push('/')}>{t('notFound.goHome')}</Button>
    </main>
  );
}
