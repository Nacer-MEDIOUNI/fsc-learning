import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CourseOptionsMenu from './CourseOptionsMenu';

const meta = {
  title: 'Compound/CourseOptionsMenu',
  component: CourseOptionsMenu,
  decorators: [
    (Story) => {
      useEffect(() => {
        const timer = setTimeout(() => {
          const btn = document.querySelector<HTMLButtonElement>(
            '[aria-label*="More options"]',
          );
          if (btn && btn.getAttribute('aria-expanded') !== 'true') {
            btn.click();
          }
        }, 100);
        return () => clearTimeout(timer);
      }, []);
      return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    status: {
      control: 'select',
      options: ['in_progress', 'completed', 'not_started', 'overdue'],
    },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 260,
      },
    },
  },
} satisfies Meta<typeof CourseOptionsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: { courseTitle: 'FSC Chain of Custody', status: 'in_progress' },
};

export const Completed: Story = {
  args: { courseTitle: 'FSC Chain of Custody', status: 'completed' },
};

export const NotStarted: Story = {
  args: { courseTitle: 'FSC Chain of Custody', status: 'not_started' },
};

export const Overdue: Story = {
  args: { courseTitle: 'FSC Chain of Custody', status: 'overdue' },
};
