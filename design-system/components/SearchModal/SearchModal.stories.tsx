import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchModal from './SearchModal';
import type { SearchableItem, Course } from '../../types';

const mockSearchableItems: SearchableItem[] = [
  {
    id: '1',
    type: 'course',
    title: 'FSC Chain of Custody',
    description: 'Certification - In Progress (65%)',
  },
  {
    id: '2',
    type: 'course',
    title: 'Forest Management Basics',
    description: 'Forest Management - New Course',
  },
  {
    id: '3',
    type: 'page',
    title: 'Overview',
    description: 'Go to Overview',
  },
  {
    id: '4',
    type: 'help',
    title: 'How to earn certificates',
    description: 'Complete all modules to earn your certificate',
  },
];

const mockRecentCourses: Course[] = [
  {
    id: '1',
    title: 'FSC Chain of Custody',
    description: 'Learn the basics of chain of custody certification',
    category: 'Certification',
    module: 'Module 3: Documentation',
    icon: 'Award',
    thumbnailUrl: '/images/course1.jpg',
    progress: 65,
    status: 'in_progress',
    duration: '4h 30m',
    timeRemaining: '1h 45m',
    dueDate: 'Mar 15',
    instructor: ['Dr. Smith'],
  },
];

const meta = {
  title: 'Compound/SearchModal',
  component: SearchModal,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    searchableItems: mockSearchableItems,
    recentCourses: mockRecentCourses,
  },
};

export const WithResults: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    searchableItems: mockSearchableItems,
    recentCourses: mockRecentCourses,
  },
};
