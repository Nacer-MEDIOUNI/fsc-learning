import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PageTabs from './PageTabs';

const meta = {
  title: 'UI/PageTabs',
  component: PageTabs,
} satisfies Meta<typeof PageTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeTabs: Story = {
  args: {
    tabs: ['Overview', 'Saved', 'Achievements'],
    activeTab: 'Overview',
    onTabChange: () => {},
  },
};
