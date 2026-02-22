import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchInput from './SearchInput';

const meta = {
  title: 'UI/SearchInput',
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { value: '', onChange: () => {}, placeholder: 'Search courses...' },
};

export const WithValue: Story = {
  args: { value: 'FSC Standards', onChange: () => {} },
};
