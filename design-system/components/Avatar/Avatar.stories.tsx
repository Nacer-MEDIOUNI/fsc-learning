import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Avatar from './Avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = { args: { initials: 'SM', size: 'sm' } };
export const Medium: Story = { args: { initials: 'SM', size: 'md' } };
export const Large: Story = { args: { initials: 'SM', size: 'lg' } };
export const WithImage: Story = {
  args: { initials: 'SM', imageUrl: '/images/course1.jpg', size: 'lg' },
};
