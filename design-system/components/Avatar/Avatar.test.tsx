import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders initials when no image', () => {
    render(<Avatar initials="SM" />);
    expect(screen.getByText('SM')).toBeInTheDocument();
  });
});
