import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressBar from './ProgressBar';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 100 } },
    overdue: { control: 'boolean' },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { progress: 0 },
};

export const HalfWay: Story = {
  args: { progress: 50 },
};

export const Complete: Story = {
  args: { progress: 100 },
};

export const Overdue: Story = {
  args: { progress: 30, overdue: true },
};
