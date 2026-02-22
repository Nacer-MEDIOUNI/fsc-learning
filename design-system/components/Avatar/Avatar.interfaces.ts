export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  initials: string;
  imageUrl?: string;
  size?: AvatarSize;
  className?: string;
}
