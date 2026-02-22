import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText('\u00A9 2026 Forest Stewardship Council'),
    ).toBeInTheDocument();
  });
});
