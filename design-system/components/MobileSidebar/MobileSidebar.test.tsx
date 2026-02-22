import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import MobileSidebar from './MobileSidebar';
import type { NavItem } from '../../types';

const mockNavItems: NavItem[] = [
  { label: 'Overview', href: '/', icon: 'LayoutDashboard', section: 'MAIN' },
  { label: 'Catalogue', href: '/catalogue', icon: 'BookOpen', section: 'MAIN' },
];

describe('MobileSidebar', () => {
  it('calls onClose on close button click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<MobileSidebar isOpen onClose={onClose} navItems={mockNavItems} />);
    await user.click(screen.getByRole('button', { name: /close navigation/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
