import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DemoToggle from './DemoToggle';

const meta = {
  title: 'UI/DemoToggle',
  component: DemoToggle,
} satisfies Meta<typeof DemoToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enabled: false,
    onToggle: () => {},
    loadingEnabled: false,
    onLoadingToggle: () => {},
  },
};

export const Active: Story = {
  args: {
    enabled: true,
    onToggle: () => {},
    loadingEnabled: false,
    onLoadingToggle: () => {},
  },
};
