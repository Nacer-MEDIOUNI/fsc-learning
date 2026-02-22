import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import PageTabs from './PageTabs';

describe('PageTabs', () => {
  it('calls onTabChange on click', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    render(
      <PageTabs
        tabs={['Overview', 'Saved', 'Achievements']}
        activeTab="Overview"
        onTabChange={onTabChange}
      />,
    );
    await user.click(screen.getByRole('tab', { name: 'Saved' }));
    expect(onTabChange).toHaveBeenCalledWith('Saved');
  });
});
