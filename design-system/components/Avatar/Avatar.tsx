import type { AvatarProps, AvatarSize } from './Avatar.interfaces';

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

export default function Avatar({
  initials,
  imageUrl,
  size = 'md',
  className = '',
}: AvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${initials} avatar`}
        className={`rounded-full object-cover ${sizeStyles[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-primary-800 text-white flex items-center justify-center font-semibold ${sizeStyles[size]} ${className}`}
      aria-label={`User avatar: ${initials}`}
    >
      {initials}
    </div>
  );
}
