import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton, SkeletonCard, SkeletonRow } from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { className: 'h-4 w-40' },
};

export const Card: Story = {
  render: () => <SkeletonCard />,
};

export const Row: Story = {
  render: () => <SkeletonRow />,
};
