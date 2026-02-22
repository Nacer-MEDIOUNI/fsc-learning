import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DemoToggle from './DemoToggle';

describe('DemoToggle', () => {
  it('calls onToggle when clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <DemoToggle
        enabled={false}
        onToggle={onToggle}
        loadingEnabled={false}
        onLoadingToggle={() => {}}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Show empty state' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
