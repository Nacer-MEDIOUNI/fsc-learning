import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BookmarkToggle from './BookmarkToggle';

describe('BookmarkToggle', () => {
  it('toggles state on click', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(<BookmarkToggle courseTitle="Test Course" onToggle={onToggle} />);
    const button = screen.getByRole('button', {
      name: /save test course for later/i,
    });
    expect(button).toHaveAttribute('aria-pressed', 'false');
    await user.click(button);
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
