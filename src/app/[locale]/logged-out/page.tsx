'use client';

import { useTranslations } from 'next-intl';
import { LogIn } from 'lucide-react';
import { Button } from '@fsc/design-system';
import { useAuth } from '@/context/auth-context';

export default function LoggedOutPage() {
  const t = useTranslations('common');
  const { loginBack } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/40">
          <LogIn
            size={28}
            className="text-primary-500 dark:text-primary-400"
            strokeWidth={1.5}
          />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {t('loggedOutTitle')}
        </h1>
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          {t('loggedOutMessage')}
        </p>
        <div className="mt-6">
          <Button variant="primary" size="md" onClick={loginBack}>
            {t('loginBack')}
          </Button>
        </div>
      </div>
    </div>
  );
}
