import type { BadgeProps, BadgeVariant } from './Badge.interfaces';

const variantStyles: Record<BadgeVariant, string> = {
  success:
    'bg-accent-50 text-accent-700 dark:bg-accent-900/40 dark:text-accent-400',
  warning:
    'bg-amber-50 text-amber-900 dark:bg-amber-900/40 dark:text-amber-400',
  error: 'bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-400',
  info: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  neutral:
    'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
  primary:
    'bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400',
};

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
