import type { Notification } from '@/types';

const en: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Course deadline approaching',
    description: 'FSC Trademark Usage Guidelines is due in 2 days',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'course',
    title: 'New course available',
    description: 'Advanced Carbon Accounting has been added to the catalog',
    timestamp: '2 days ago',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'System maintenance',
    description: 'Scheduled maintenance on March 1st from 2-4 AM UTC',
    timestamp: '3 days ago',
    read: true,
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Audit preparation reminder',
    description: 'CoC Audit Preparation deadline is in 3 weeks',
    timestamp: '5 days ago',
    read: true,
  },
];

const fr: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: '\u00c9ch\u00e9ance de cours imminente',
    description:
      'Les directives d\u2019utilisation des marques FSC sont dues dans 2 jours',
    timestamp: 'Il y a 2 heures',
    read: false,
  },
  {
    id: '2',
    type: 'course',
    title: 'Nouveau cours disponible',
    description:
      'Comptabilit\u00e9 carbone avanc\u00e9e a \u00e9t\u00e9 ajout\u00e9 au catalogue',
    timestamp: 'Il y a 2 jours',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Maintenance syst\u00e8me',
    description: 'Maintenance pr\u00e9vue le 1er mars de 2h \u00e0 4h UTC',
    timestamp: 'Il y a 3 jours',
    read: true,
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Rappel de pr\u00e9paration d\u2019audit',
    description:
      'L\u2019\u00e9ch\u00e9ance de pr\u00e9paration de l\u2019audit CoC est dans 3 semaines',
    timestamp: 'Il y a 5 jours',
    read: true,
  },
];

const de: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Kursabgabefrist n\u00e4hert sich',
    description: 'FSC-Markennutzungsrichtlinien sind in 2 Tagen f\u00e4llig',
    timestamp: 'Vor 2 Stunden',
    read: false,
  },
  {
    id: '2',
    type: 'course',
    title: 'Neuer Kurs verf\u00fcgbar',
    description:
      'Fortgeschrittene CO\u2082-Bilanzierung wurde dem Katalog hinzugef\u00fcgt',
    timestamp: 'Vor 2 Tagen',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Systemwartung',
    description: 'Geplante Wartung am 1. M\u00e4rz von 2\u20134 Uhr UTC',
    timestamp: 'Vor 3 Tagen',
    read: true,
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Erinnerung an Audit-Vorbereitung',
    description:
      'Die Frist f\u00fcr die CoC-Audit-Vorbereitung ist in 3 Wochen',
    timestamp: 'Vor 5 Tagen',
    read: true,
  },
];

const es: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Fecha l\u00edmite del curso pr\u00f3xima',
    description: 'Las directrices de uso de marcas FSC vencen en 2 d\u00edas',
    timestamp: 'Hace 2 horas',
    read: false,
  },
  {
    id: '2',
    type: 'course',
    title: 'Nuevo curso disponible',
    description:
      'Contabilidad avanzada de carbono ha sido a\u00f1adido al cat\u00e1logo',
    timestamp: 'Hace 2 d\u00edas',
    read: false,
  },
  {
    id: '3',
    type: 'system',
    title: 'Mantenimiento del sistema',
    description: 'Mantenimiento programado el 1 de marzo de 2 a 4 AM UTC',
    timestamp: 'Hace 3 d\u00edas',
    read: true,
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Recordatorio de preparaci\u00f3n de auditor\u00eda',
    description:
      'La fecha l\u00edmite de preparaci\u00f3n de auditor\u00eda CoC es en 3 semanas',
    timestamp: 'Hace 5 d\u00edas',
    read: true,
  },
];

const map: Record<string, Notification[]> = { en, fr, de, es };

export function getNotifications(locale: string): Notification[] {
  return map[locale] ?? en;
}

export const notifications = en;
