import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Start Course' },
};
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'View Details' },
};
export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};
