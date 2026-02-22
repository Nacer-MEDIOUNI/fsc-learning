import type { Deadline } from '@/types';

const en: Deadline[] = [
  {
    id: '1',
    title: 'Trademark Usage',
    date: 'Feb 10, 2026',
    type: 'course',
    urgent: true,
  },
  {
    id: '2',
    title: 'CoC Audit Preparation',
    date: 'Mar 15, 2026',
    type: 'audit',
    urgent: true,
  },
  {
    id: '3',
    title: 'Annual Certification Renewal',
    date: 'Jun 30, 2026',
    type: 'renewal',
    urgent: false,
  },
];

const fr: Deadline[] = [
  {
    id: '1',
    title: 'Utilisation des marques',
    date: '10 f\u00e9vr. 2026',
    type: 'course',
    urgent: true,
  },
  {
    id: '2',
    title: 'Pr\u00e9paration audit CoC',
    date: '15 mars 2026',
    type: 'audit',
    urgent: true,
  },
  {
    id: '3',
    title: 'Renouvellement annuel de certification',
    date: '30 juin 2026',
    type: 'renewal',
    urgent: false,
  },
];

const de: Deadline[] = [
  {
    id: '1',
    title: 'Markennutzung',
    date: '10. Feb. 2026',
    type: 'course',
    urgent: true,
  },
  {
    id: '2',
    title: 'CoC-Audit-Vorbereitung',
    date: '15. M\u00e4rz 2026',
    type: 'audit',
    urgent: true,
  },
  {
    id: '3',
    title: 'J\u00e4hrliche Zertifizierungserneuerung',
    date: '30. Juni 2026',
    type: 'renewal',
    urgent: false,
  },
];

const es: Deadline[] = [
  {
    id: '1',
    title: 'Uso de marcas',
    date: '10 feb. 2026',
    type: 'course',
    urgent: true,
  },
  {
    id: '2',
    title: 'Preparaci\u00f3n auditor\u00eda CoC',
    date: '15 mar. 2026',
    type: 'audit',
    urgent: true,
  },
  {
    id: '3',
    title: 'Renovaci\u00f3n anual de certificaci\u00f3n',
    date: '30 jun. 2026',
    type: 'renewal',
    urgent: false,
  },
];

const map: Record<string, Deadline[]> = { en, fr, de, es };

export function getUpcomingDeadlines(locale: string): Deadline[] {
  return map[locale] ?? en;
}

export const upcomingDeadlines = en;
