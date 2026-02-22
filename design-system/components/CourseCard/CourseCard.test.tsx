import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CourseCard from './CourseCard';
import type { Course } from '../../types';

const mockCourse: Course = {
  id: '1',
  title: 'FSC Chain of Custody',
  description: 'Learn the basics of chain of custody certification',
  category: 'Certification',
  module: 'Module 3: Documentation',
  icon: 'Award',
  thumbnailUrl: '/images/course1.jfif',
  progress: 65,
  status: 'in_progress',
  duration: '4h 30m',
  timeRemaining: '1h 45m',
  dueDate: 'Mar 15',
  instructor: ['Dr. Smith'],
};

describe('CourseCard', () => {
  it('renders discovery variant with title', () => {
    render(<CourseCard course={mockCourse} variant="discovery" />);
    expect(
      screen.getByRole('heading', { name: 'FSC Chain of Custody' }),
    ).toBeInTheDocument();
  });
});
