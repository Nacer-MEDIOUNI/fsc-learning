import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral', 'primary'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { children: 'Completed', variant: 'success' },
};
export const Warning: Story = {
  args: { children: 'Due Soon', variant: 'warning' },
};
export const Error: Story = { args: { children: 'Overdue', variant: 'error' } };
export const Info: Story = { args: { children: 'New', variant: 'info' } };
export const Neutral: Story = {
  args: { children: 'Draft', variant: 'neutral' },
};
export const PrimaryVariant: Story = {
  args: { children: 'Active', variant: 'primary' },
};
