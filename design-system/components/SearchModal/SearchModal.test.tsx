import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchModal from './SearchModal';
import type { SearchableItem, Course } from '../../types';

const mockSearchableItems: SearchableItem[] = [
  {
    id: '1',
    type: 'course',
    title: 'FSC Chain of Custody',
    description: 'Certification - In Progress',
  },
  {
    id: '2',
    type: 'page',
    title: 'Overview',
    description: 'Go to Overview',
  },
  {
    id: '3',
    type: 'help',
    title: 'Contact Support',
    description: 'Get help from our support team',
  },
];

const mockRecentCourses: Course[] = [
  {
    id: '1',
    title: 'FSC Chain of Custody',
    description: 'Learn the basics',
    category: 'Certification',
    module: 'Module 3',
    icon: 'Award',
    progress: 65,
    status: 'in_progress',
    duration: '4h 30m',
  },
];

describe('SearchModal', () => {
  it('filters items on query input', async () => {
    const user = userEvent.setup();
    render(
      <SearchModal
        isOpen
        onClose={vi.fn()}
        searchableItems={mockSearchableItems}
        recentCourses={mockRecentCourses}
      />,
    );
    const input = screen.getByRole('combobox');
    await user.type(input, 'Support');
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    expect(screen.getByText('Help')).toBeInTheDocument();
  });
});
