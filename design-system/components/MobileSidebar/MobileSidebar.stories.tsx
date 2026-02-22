import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MobileSidebar from './MobileSidebar';
import type { NavItem } from '../../types';

const mockNavItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: 'LayoutDashboard', section: 'MAIN' },
  { label: 'Catalogue', href: '/catalogue', icon: 'BookOpen', section: 'MAIN' },
  {
    label: 'Goals',
    href: '/goals',
    icon: 'Target',
    section: 'ANALYTICS',
    locked: true,
  },
  {
    label: 'Analytics',
    href: '/analytics',
    icon: 'BarChart3',
    section: 'ANALYTICS',
    locked: true,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: 'User',
    section: 'SETTINGS',
    locked: true,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'Settings',
    section: 'SETTINGS',
    locked: true,
  },
];

const mdVisibleOverride = `@media (min-width: 768px) {
  .md\\:hidden { display: block !important; }
}`;

const meta = {
  title: 'Layout/MobileSidebar',
  component: MobileSidebar,
  decorators: [
    (Story) => (
      <>
        <style>{mdVisibleOverride}</style>
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 600,
      },
    },
  },
} satisfies Meta<typeof MobileSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    navItems: mockNavItems,
    activeItem: 'Overview',
  },
};
