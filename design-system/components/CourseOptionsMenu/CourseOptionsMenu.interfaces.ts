import type { CourseStatus } from '../../types';

export interface CourseOptionsMenuLabels {
  continueLearning?: string;
  saveForLater?: string;
  viewDetails?: string;
  unenroll?: string;
  reviewCourse?: string;
  downloadCertificate?: string;
  startCourse?: string;
  remove?: string;
  resumeCourse?: string;
  requestExtension?: string;
  moreOptionsFor?: string;
}

export interface CourseOptionsMenuProps {
  courseTitle: string;
  status: CourseStatus;
  labels?: CourseOptionsMenuLabels;
}
