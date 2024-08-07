import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { FloatingActionButton } from '../components/FloatingActionButton';

describe('FloatingActionButton', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(<FloatingActionButton />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<FloatingActionButton onClick={handleClick} />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    const { getByRole } = render(<FloatingActionButton />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Create new post');
  });
});