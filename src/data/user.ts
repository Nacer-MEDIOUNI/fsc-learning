import type { User } from '@/types';

const en: User = {
  id: '1',
  name: 'Sarah',
  initials: 'SR',
  email: 'sarah.richter@fsc.org',
  role: 'Forest Auditor',
};

const fr: User = {
  id: '1',
  name: 'Sarah',
  initials: 'SR',
  email: 'sarah.richter@fsc.org',
  role: 'Auditrice foresti\u00e8re',
};

const de: User = {
  id: '1',
  name: 'Sarah',
  initials: 'SR',
  email: 'sarah.richter@fsc.org',
  role: 'Forstauditorin',
};

const es: User = {
  id: '1',
  name: 'Sarah',
  initials: 'SR',
  email: 'sarah.richter@fsc.org',
  role: 'Auditora forestal',
};

const map: Record<string, User> = { en, fr, de, es };

export function getUser(locale: string): User {
  return map[locale] ?? en;
}

export const currentUser = en;
