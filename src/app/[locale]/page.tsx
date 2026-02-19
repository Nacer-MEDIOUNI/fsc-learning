'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@fsc/design-system';
import { useAuth } from '@/context/auth-context';
import courses from '../../../data/courses.json';

export default function HomePage() {
  const t = useTranslations();
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">{t('metadata.title')}</h1>
      {user && (
        <p className="text-lg">{t('auth.greeting', { name: user.name })}</p>
      )}
      <p className="text-lg">Courses: {courses.length}</p>
      <div className="flex gap-3">
        <Button onClick={() => window.location.reload()}>
          {t('home.refresh')}
        </Button>
        {user && (
          <Button variant="secondary" onClick={logout}>
            {t('auth.logout')}
          </Button>
        )}
      </div>
    </main>
  );
}
