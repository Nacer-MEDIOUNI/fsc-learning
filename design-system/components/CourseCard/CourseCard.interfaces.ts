import type { ReactNode } from 'react';
import type { Course } from '../../types';

export type CourseCardVariant =
  | 'discovery'
  | 'progress'
  | 'saved'
  | 'hero'
  | 'achievement';

export interface CourseCardLabels {
  startCourse?: string;
  continue?: string;
  start?: string;
  review?: string;
  resume?: string;
  completed?: string;
  certificate?: string;
  overdue?: string;
  duePrefix?: string;
  continueWhereLeftOff?: string;
  percentComplete?: string;
}

export interface CourseCardProps {
  course: Course;
  variant: CourseCardVariant;
  labels?: CourseCardLabels;
  priority?: boolean;
  renderActions?: (course: Course) => ReactNode;
  renderOverlay?: (course: Course) => ReactNode;
  renderSaveButton?: (course: Course) => ReactNode;
  className?: string;
}
