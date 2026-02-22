import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Sidebar from './Sidebar';
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

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    expanded: true,
    navItems: mockNavItems,
    activeItem: 'Overview',
  },
};

export const Collapsed: Story = {
  args: {
    expanded: false,
    navItems: mockNavItems,
    activeItem: 'Overview',
  },
};
