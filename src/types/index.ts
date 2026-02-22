export type {
  Course,
  CourseCategory,
  CourseStatus,
  NavItem,
  SearchableItem,
} from '@fsc/design-system';

export interface User {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export interface SavedItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  duration: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'audit' | 'renewal' | 'course' | 'goal';
  urgent: boolean;
}

export interface LearningStats {
  inProgress: number;
  completed: number;
  notStarted: number;
  totalCourses: number;
  hoursCompleted: number;
  hoursTotal: number;
  statusLabel: string;
  streak: number;
}

export type NotificationType = 'deadline' | 'course' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}
