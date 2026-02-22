import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BookmarkToggle from './BookmarkToggle';

const meta = {
  title: 'UI/BookmarkToggle',
  component: BookmarkToggle,
} satisfies Meta<typeof BookmarkToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bookmarked: Story = {
  args: { courseTitle: 'FSC Chain of Custody', defaultBookmarked: true },
};

export const Unbookmarked: Story = {
  args: { courseTitle: 'FSC Chain of Custody', defaultBookmarked: false },
};
