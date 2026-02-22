import type { SavedItem } from '@/types';

const en: SavedItem[] = [
  {
    id: '1',
    title: 'Advanced GIS Mapping',
    category: 'FM',
    categoryColor: 'primary',
    duration: '45 min',
  },
  {
    id: '2',
    title: 'Community Forestry Rights',
    category: 'SOC',
    categoryColor: 'blue',
    duration: '1h 20m',
  },
  {
    id: '3',
    title: 'Timber Legality Verification',
    category: 'CoC',
    categoryColor: 'accent',
    duration: '30 min',
  },
];

const fr: SavedItem[] = [
  {
    id: '1',
    title: 'Cartographie SIG avanc\u00e9e',
    category: 'FM',
    categoryColor: 'primary',
    duration: '45 min',
  },
  {
    id: '2',
    title: 'Droits forestiers communautaires',
    category: 'SOC',
    categoryColor: 'blue',
    duration: '1h 20m',
  },
  {
    id: '3',
    title: 'V\u00e9rification de la l\u00e9galit\u00e9 du bois',
    category: 'CoC',
    categoryColor: 'accent',
    duration: '30 min',
  },
];

const de: SavedItem[] = [
  {
    id: '1',
    title: 'Fortgeschrittene GIS-Kartierung',
    category: 'FM',
    categoryColor: 'primary',
    duration: '45 min',
  },
  {
    id: '2',
    title: 'Gemeinschaftliche Forstrechte',
    category: 'SOC',
    categoryColor: 'blue',
    duration: '1h 20m',
  },
  {
    id: '3',
    title: '\u00dcberpr\u00fcfung der Holzlegalit\u00e4t',
    category: 'CoC',
    categoryColor: 'accent',
    duration: '30 min',
  },
];

const es: SavedItem[] = [
  {
    id: '1',
    title: 'Cartograf\u00eda SIG avanzada',
    category: 'FM',
    categoryColor: 'primary',
    duration: '45 min',
  },
  {
    id: '2',
    title: 'Derechos forestales comunitarios',
    category: 'SOC',
    categoryColor: 'blue',
    duration: '1h 20m',
  },
  {
    id: '3',
    title: 'Verificaci\u00f3n de legalidad de la madera',
    category: 'CoC',
    categoryColor: 'accent',
    duration: '30 min',
  },
];

const map: Record<string, SavedItem[]> = { en, fr, de, es };

export function getSavedItems(locale: string): SavedItem[] {
  return map[locale] ?? en;
}

export const savedItems = en;
