import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CourseCard from './CourseCard';
import type { Course } from '../../types';

const mockCourse: Course = {
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
};

const completedCourse: Course = {
  ...mockCourse,
  id: '2',
  status: 'completed',
  progress: 100,
};

const meta = {
  title: 'Compound/CourseCard',
  component: CourseCard,
  argTypes: {
    variant: {
      control: 'select',
      options: ['discovery', 'progress', 'saved', 'hero', 'achievement'],
    },
  },
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,
        iframeHeight: 420,
      },
    },
  },
} satisfies Meta<typeof CourseCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Discovery: Story = {
  args: { course: mockCourse, variant: 'discovery' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Progress: Story = {
  args: { course: mockCourse, variant: 'progress' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { story: { iframeHeight: 140 } } },
};

export const Saved: Story = {
  args: { course: mockCourse, variant: 'saved' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export const Hero: Story = {
  args: { course: mockCourse, variant: 'hero' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600 }}>
        <Story />
      </div>
    ),
  ],
  parameters: { docs: { story: { iframeHeight: 320 } } },
};

export const Achievement: Story = {
  args: { course: completedCourse, variant: 'achievement' },
};
