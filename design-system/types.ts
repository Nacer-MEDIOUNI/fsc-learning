export type CourseCategory =
  | 'Certification'
  | 'Standards & Policy'
  | 'Environmental'
  | 'Social'
  | 'Trademark'
  | 'Forest Management';

export type CourseStatus =
  | 'in_progress'
  | 'completed'
  | 'not_started'
  | 'overdue';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  module: string;
  icon: string;
  thumbnailUrl?: string;
  progress: number;
  status: CourseStatus;
  duration: string;
  timeRemaining?: string;
  dueDate?: string;
  lastAccessed?: string;
  instructor?: string[];
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  section: string;
  locked?: boolean;
}

export interface SearchableItem {
  id: string;
  type: 'course' | 'page' | 'help';
  title: string;
  description: string;
}
