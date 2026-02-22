import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import CourseOptionsMenu from './CourseOptionsMenu';

describe('CourseOptionsMenu', () => {
  it('opens menu on trigger click', async () => {
    const user = userEvent.setup();
    render(
      <CourseOptionsMenu courseTitle="Test Course" status="in_progress" />,
    );
    const trigger = screen.getByRole('button', {
      name: /more options for test course/i,
    });
    await user.click(trigger);
    expect(screen.getByText('Continue Learning')).toBeInTheDocument();
  });
});
