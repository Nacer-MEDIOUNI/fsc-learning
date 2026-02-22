import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
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
];

describe('Sidebar', () => {
  it('renders nav items', () => {
    render(<Sidebar expanded navItems={mockNavItems} />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
    expect(screen.getByText('Goals')).toBeInTheDocument();
  });
});
