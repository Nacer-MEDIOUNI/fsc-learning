'use client';

import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/auth-context';
import { Button } from '@fsc/design-system';

export default function LoggedOutPage() {
  const t = useTranslations();
  const { loginBack } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">{t('loggedOut.title')}</h1>
      <p className="text-lg">{t('loggedOut.message')}</p>
      <Button onClick={loginBack}>{t('loggedOut.loginBack')}</Button>
    </main>
  );
}
