export interface BookmarkToggleProps {
  courseTitle: string;
  bookmarked?: boolean;
  defaultBookmarked?: boolean;
  onToggle?: (bookmarked: boolean) => void;
  confirmUnsave?: boolean;
  onRequestUnsave?: () => void;
}
