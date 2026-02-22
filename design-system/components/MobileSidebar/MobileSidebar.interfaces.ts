import type { ReactNode } from 'react';
import type { NavItem } from '../../types';

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeItem?: string;
  onNavClick?: (label: string) => void;
  sectionLabels?: Record<string, string>;
  logoutLabel?: string;
  onLogout?: () => void;
  renderLink?: (props: {
    href: string;
    children: ReactNode;
    className: string;
    ariaCurrent?: 'page';
    ariaLabel?: string;
  }) => ReactNode;
}
