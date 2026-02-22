'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import {
  Clock,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Download,
  BookOpen,
} from 'lucide-react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import ProgressBar from '../ProgressBar/ProgressBar';
import { courseIconMap, categoryGradients, categoryStyles } from '../../utils';
import type { Course } from '../../types';
import type {
  CourseCardProps,
  CourseCardVariant,
  CourseCardLabels,
} from './CourseCard.interfaces';

function InstructorLabel({ instructors }: { instructors: string[] }) {
  if (instructors.length === 1) return <>{instructors[0]}</>;
  return (
    <>
      {instructors[0]}
      <span className="text-neutral-500 dark:text-neutral-600 ml-1">
        +{instructors.length - 1}
      </span>
    </>
  );
}

function DefaultActions({
  course,
  variant,
  mobile,
  labels,
}: {
  course: Course;
  variant: CourseCardVariant;
  mobile?: boolean;
  labels?: CourseCardLabels;
}) {
  if (variant === 'discovery') {
    const label = labels?.startCourse ?? 'Start Course';
    return (
      <Button
        variant="primary"
        size="md"
        className="gap-1.5 group/btn w-full"
        aria-label={`${label}: ${course.title}`}
      >
        {label}
        <ArrowRight
          size={14}
          className="group-hover/btn:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </Button>
    );
  }

  if (variant === 'saved') {
    const ctaLabel =
      course.status === 'in_progress'
        ? (labels?.continue ?? 'Continue')
        : (labels?.startCourse ?? 'Start Course');
    return (
      <Button
        variant="primary"
        size="md"
        className="gap-1.5 group/btn w-full"
        aria-label={`${ctaLabel}: ${course.title}`}
      >
        {ctaLabel}
        <ArrowRight
          size={14}
          className="group-hover/btn:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </Button>
    );
  }

  if (variant === 'progress') {
    const isCompleted = course.status === 'completed';
    const isNotStarted = course.status === 'not_started';
    const cls = mobile ? 'flex-1' : '';

    if (isCompleted)
      return (
        <Button variant="outline" size="md" className={cls}>
          {labels?.review ?? 'Review'}
        </Button>
      );
    if (isNotStarted)
      return (
        <Button variant="primary" size="md" className={cls}>
          {labels?.start ?? 'Start'}
        </Button>
      );
    return (
      <Button variant="primary" size="md" className={cls}>
        {labels?.continue ?? 'Continue'}
      </Button>
    );
  }

  if (variant === 'achievement') {
    return (
      <>
        <Badge variant="success">{labels?.completed ?? 'Completed'}</Badge>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1.5${mobile ? ' ml-auto' : ''}`}
        >
          <Download size={13} />
          {labels?.certificate ?? 'Certificate'}
        </Button>
      </>
    );
  }

  return null;
}

function VerticalLayout({
  course,
  variant,
  renderActions,
  renderOverlay,
  renderSaveButton,
  className,
  labels,
  priority,
}: {
  course: Course;
  variant: 'discovery' | 'saved';
  renderActions?: (course: Course) => ReactNode;
  renderOverlay?: (course: Course) => ReactNode;
  renderSaveButton?: (course: Course) => ReactNode;
  className?: string;
  labels?: CourseCardLabels;
  priority?: boolean;
}) {
  const Icon = courseIconMap[course.icon] || BookOpen;
  const gradient =
    categoryGradients[course.category] ||
    categoryGradients['Forest Management'];
  const titleId = `coursecard-${variant}-${course.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={`bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl overflow-hidden shadow-none hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-200 flex flex-col group/card${className ? ` ${className}` : ''}`}
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
            priority={priority}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Icon
              size={40}
              className="text-white/30"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {renderOverlay?.(course)}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          id={titleId}
          className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 leading-snug line-clamp-2"
        >
          {course.title}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3 flex-1">
          {course.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
          <span
            className="flex items-center gap-1"
            aria-label={`Duration: ${course.duration}`}
          >
            <Clock size={12} aria-hidden="true" />
            {course.duration}
          </span>
          {course.module && (
            <>
              <span
                aria-hidden="true"
                className="w-0.5 h-0.5 rounded-full bg-neutral-300 dark:bg-neutral-600"
              />
              <span aria-label={`${course.module}`}>{course.module}</span>
            </>
          )}
        </div>

        {course.instructor && course.instructor.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-4">
            <GraduationCap size={12} aria-hidden="true" />
            <span>
              <InstructorLabel instructors={course.instructor} />
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex-1">
            {renderActions ? (
              renderActions(course)
            ) : (
              <DefaultActions
                course={course}
                variant={variant}
                labels={labels}
              />
            )}
          </div>
          {renderSaveButton?.(course)}
        </div>
      </div>
    </article>
  );
}

function HorizontalRowLayout({
  course,
  variant,
  renderActions,
  className,
  labels,
  priority,
}: {
  course: Course;
  variant: 'progress' | 'achievement';
  renderActions?: (course: Course) => ReactNode;
  className?: string;
  labels?: CourseCardLabels;
  priority?: boolean;
}) {
  const Icon = courseIconMap[course.icon] || BookOpen;
  const style =
    categoryStyles[course.category] || categoryStyles['Forest Management'];
  const isOverdue = course.status === 'overdue';
  const isCompleted = course.status === 'completed';
  const isNotStarted = course.status === 'not_started';

  if (variant === 'achievement') {
    return (
      <div
        className={`bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 sm:p-5 shadow-none hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-200${className ? ` ${className}` : ''}`}
      >
        <div className="hidden sm:flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-lg shrink-0 flex items-center justify-center ${style.bg} ${style.text}`}
          >
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {course.title}
              </h3>
              <CheckCircle size={14} className="text-accent-500 shrink-0" />
            </div>
            <p className="text-xs text-neutral-500">
              {course.category} &middot; {course.duration} &middot;{' '}
              {course.instructor?.join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {renderActions ? (
              renderActions(course)
            ) : (
              <DefaultActions
                course={course}
                variant="achievement"
                labels={labels}
              />
            )}
          </div>
        </div>
        <div className="flex sm:hidden flex-col gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-lg shrink-0 flex items-center justify-center ${style.bg} ${style.text}`}
            >
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {course.title}
                </h3>
                <CheckCircle size={14} className="text-accent-500 shrink-0" />
              </div>
              <p className="text-xs text-neutral-500">
                {course.category} &middot; {course.duration}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {renderActions ? (
              renderActions(course)
            ) : (
              <DefaultActions
                course={course}
                variant="achievement"
                mobile
                labels={labels}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  const titleId = `coursecard-progress-${course.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className={`bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl p-4 sm:p-5 shadow-none hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-200${className ? ` ${className}` : ''}`}
    >
      <div className="hidden sm:flex items-center gap-4">
        <div className="w-20 h-14 rounded-lg shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center ${style.bg}`}
            >
              <Icon
                size={22}
                className={style.text}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              id={titleId}
              className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate"
            >
              {course.title}
            </h3>
            {isOverdue && (
              <Badge variant="error">{labels?.overdue ?? 'Overdue'}</Badge>
            )}
            {isCompleted && (
              <CheckCircle
                size={14}
                className="text-accent-500 shrink-0"
                aria-label={labels?.completed ?? 'Completed'}
              />
            )}
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
            {course.module}
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            {course.instructor && course.instructor.length > 0 && (
              <span className="flex items-center gap-1">
                <GraduationCap
                  size={12}
                  aria-hidden="true"
                  className="text-neutral-500"
                />
                <InstructorLabel instructors={course.instructor} />
              </span>
            )}
            {course.timeRemaining && (
              <span
                className="flex items-center gap-1"
                aria-label={course.timeRemaining}
              >
                <Clock
                  size={12}
                  aria-hidden="true"
                  className="text-neutral-500"
                />
                {course.timeRemaining}
              </span>
            )}
            {course.dueDate && (
              <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                {labels?.duePrefix ?? 'Due'} {course.dueDate}
              </span>
            )}
          </div>

          {!isCompleted && !isNotStarted && (
            <div className="mt-2.5 max-w-sm">
              <ProgressBar progress={course.progress} overdue={isOverdue} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {renderActions ? (
            renderActions(course)
          ) : (
            <DefaultActions
              course={course}
              variant="progress"
              labels={labels}
            />
          )}
        </div>
      </div>

      <div className="flex sm:hidden flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-16 h-12 rounded-lg shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
            {course.thumbnailUrl ? (
              <Image
                src={course.thumbnailUrl}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                priority={priority}
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${style.bg}`}
              >
                <Icon
                  size={18}
                  className={style.text}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                {course.title}
              </h3>
              {isOverdue && (
                <Badge variant="error">{labels?.overdue ?? 'Overdue'}</Badge>
              )}
              {isCompleted && (
                <CheckCircle
                  size={14}
                  className="text-accent-500 shrink-0"
                  aria-label={labels?.completed ?? 'Completed'}
                />
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              {course.module}
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-500 flex-wrap">
              {course.instructor && course.instructor.length > 0 && (
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} aria-hidden="true" />
                  <InstructorLabel instructors={course.instructor} />
                </span>
              )}
              {course.timeRemaining && (
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {course.timeRemaining}
                </span>
              )}
              {course.dueDate && (
                <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
                  {labels?.duePrefix ?? 'Due'} {course.dueDate}
                </span>
              )}
            </div>
          </div>
        </div>

        {!isCompleted && !isNotStarted && (
          <ProgressBar progress={course.progress} overdue={isOverdue} />
        )}

        <div className="flex items-center gap-2">
          <DefaultActions
            course={course}
            variant="progress"
            mobile
            labels={labels}
          />
        </div>
      </div>
    </article>
  );
}

function HeroLayout({
  course,
  className,
  labels,
  priority,
}: {
  course: Course;
  className?: string;
  labels?: CourseCardLabels;
  priority?: boolean;
}) {
  return (
    <div
      className={`bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-gold/15 rounded-xl shadow-none hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] dark:hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.3)] transition-all duration-200 overflow-hidden${className ? ` ${className}` : ''}`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-28 sm:h-auto shrink-0">
          {course.thumbnailUrl ? (
            <Image
              src={course.thumbnailUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full bg-primary-100 dark:bg-primary-900/40" />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <PlayCircle size={36} className="text-white" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                {labels?.continueWhereLeftOff ?? 'Continue where you left off'}
              </p>
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/40 rounded-md px-2 py-0.5">
                {labels?.percentComplete
                  ? labels.percentComplete.replace(
                      '[percent]',
                      String(course.progress),
                    )
                  : `${course.progress}% complete`}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 truncate">
              {course.title}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {course.module}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
              {course.instructor && course.instructor.length > 0 && (
                <span className="flex items-center gap-1">
                  <GraduationCap size={12} aria-hidden="true" />
                  {course.instructor[0]}
                </span>
              )}
              {course.timeRemaining && (
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {course.timeRemaining}
                </span>
              )}
              {course.dueDate && (
                <span className="hidden sm:inline">
                  {labels?.duePrefix ?? 'Due'} {course.dueDate}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <ProgressBar progress={course.progress} />
            <Button
              variant="primary"
              size="md"
              className="shrink-0 gap-2 group"
            >
              {labels?.resume ?? 'Resume'}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCard({
  course,
  variant,
  labels,
  priority,
  renderActions,
  renderOverlay,
  renderSaveButton,
  className,
}: CourseCardProps) {
  if (variant === 'discovery' || variant === 'saved') {
    return (
      <VerticalLayout
        course={course}
        variant={variant}
        renderActions={renderActions}
        renderOverlay={renderOverlay}
        renderSaveButton={renderSaveButton}
        className={className}
        labels={labels}
        priority={priority}
      />
    );
  }

  if (variant === 'progress' || variant === 'achievement') {
    return (
      <HorizontalRowLayout
        course={course}
        variant={variant}
        renderActions={renderActions}
        className={className}
        labels={labels}
        priority={priority}
      />
    );
  }

  if (variant === 'hero') {
    return (
      <HeroLayout
        course={course}
        className={className}
        labels={labels}
        priority={priority}
      />
    );
  }

  return null;
}
