import type { ProgressBarProps } from './ProgressBar.interfaces';

export default function ProgressBar({ progress, overdue }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1 h-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            overdue ? 'bg-red-500' : 'bg-primary-500'
          }`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${progress}% complete`}
        />
      </div>
      <span
        className={`text-xs font-semibold shrink-0 ${
          overdue ? 'text-red-600' : 'text-primary-600 dark:text-primary-400'
        }`}
      >
        {progress}%
      </span>
    </div>
  );
}
