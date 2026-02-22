import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Popover from './Popover';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: false,
        iframeHeight: 160,
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    trigger: (
      <button className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm">
        Trigger
      </button>
    ),
    children: (
      <div className="p-3">
        <p className="text-sm text-neutral-700">Menu content here</p>
      </div>
    ),
  },
};
