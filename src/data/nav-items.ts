import type { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: 'LayoutDashboard', section: 'MAIN' },
  { label: 'Catalogue', href: '/catalogue', icon: 'BookOpen', section: 'MAIN' },
  {
    label: 'Goals',
    href: '/goals',
    icon: 'Target',
    section: 'MAIN',
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
    label: 'Reviews',
    href: '/reviews',
    icon: 'Star',
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
