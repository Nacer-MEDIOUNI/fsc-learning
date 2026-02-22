import type { Course, SearchableItem } from '../../types';

export interface SearchModalLabels {
  recent?: string;
  courses?: string;
  pages?: string;
  help?: string;
  noResultsPrefix?: string;
  tryDifferentTerm?: string;
  navigate?: string;
  open?: string;
  close?: string;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  searchResultsLabel?: string;
  recentCoursesLabel?: string;
  completed?: string;
  overdue?: string;
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchableItems: SearchableItem[];
  recentCourses: Course[];
  labels?: SearchModalLabels;
}
