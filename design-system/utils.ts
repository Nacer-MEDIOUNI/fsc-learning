import type { ElementType } from 'react';
import {
  TreePine,
  Link,
  Leaf,
  Users,
  Shield,
  Award,
  BarChart3,
  Map,
  Sprout,
  BookOpen,
} from 'lucide-react';
import type { CourseCategory } from './types';

export const courseIconMap: Record<string, ElementType> = {
  TreePine,
  Link,
  Leaf,
  Users,
  Shield,
  Award,
  BarChart3,
  Map,
  Sprout,
  BookOpen,
};

export const categoryGradients: Record<CourseCategory, string> = {
  'Forest Management': 'from-primary-500 to-primary-700',
  Certification: 'from-accent-500 to-accent-700',
  Environmental: 'from-accent-500 to-primary-500',
  Social: 'from-blue-500 to-blue-600',
  Trademark: 'from-blue-500 to-primary-500',
  'Standards & Policy': 'from-amber-500 to-amber-600',
};

export const categoryBadgeVariant: Record<
  CourseCategory,
  'success' | 'warning' | 'info' | 'primary' | 'neutral'
> = {
  'Forest Management': 'primary',
  Certification: 'success',
  Environmental: 'success',
  Social: 'info',
  Trademark: 'info',
  'Standards & Policy': 'warning',
};

export const categoryStyles: Record<
  CourseCategory,
  { bg: string; text: string }
> = {
  Certification: {
    bg: 'bg-accent-50 dark:bg-accent-900/40',
    text: 'text-accent-700 dark:text-accent-400',
  },
  'Standards & Policy': {
    bg: 'bg-amber-50 dark:bg-amber-900/40',
    text: 'text-amber-600 dark:text-amber-400',
  },
  Environmental: {
    bg: 'bg-accent-50 dark:bg-accent-900/40',
    text: 'text-accent-700 dark:text-accent-400',
  },
  Social: {
    bg: 'bg-blue-50 dark:bg-blue-900/40',
    text: 'text-blue-600 dark:text-blue-400',
  },
  Trademark: {
    bg: 'bg-blue-50 dark:bg-blue-900/40',
    text: 'text-blue-600 dark:text-blue-400',
  },
  'Forest Management': {
    bg: 'bg-primary-50 dark:bg-primary-900/40',
    text: 'text-primary-600 dark:text-primary-400',
  },
};
