import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Popover from './Popover';

describe('Popover', () => {
  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(
      <Popover isOpen={true} onClose={onClose} trigger={<button>Open</button>}>
        <p>Content</p>
      </Popover>,
    );
    fireEvent.keyDown(screen.getByText('Content'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
