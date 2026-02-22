import type { ReactNode } from 'react';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  align?: 'left' | 'right';
  width?: string;
  trigger: ReactNode;
  children: ReactNode;
  ariaLabel?: string;
}
