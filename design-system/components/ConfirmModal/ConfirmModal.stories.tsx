import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ConfirmModal from './ConfirmModal';

const meta = {
  title: 'UI/ConfirmModal',
  component: ConfirmModal,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', minHeight: 200, overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        inline: false,
        iframeHeight: 200,
      },
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: 'Remove from saved?',
    confirmLabel: 'Remove',
    cancelLabel: 'Cancel',
  },
};

export const WithDescription: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: 'Remove from saved?',
    description: 'This course will be removed from your saved list.',
    confirmLabel: 'Remove',
    cancelLabel: 'Cancel',
  },
  parameters: {
    docs: {
      story: {
        iframeHeight: 240,
      },
    },
  },
};
