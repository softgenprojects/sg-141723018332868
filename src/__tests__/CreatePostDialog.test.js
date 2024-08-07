import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostDialog } from '../components/CreatePostDialog';

describe('CreatePostDialog Component', () => {
  const mockOnClose = jest.fn();
  const mockOnCreatePost = jest.fn();
  const mockProps = {
    isOpen: true,
    onClose: mockOnClose,
    onCreatePost: mockOnCreatePost,
    latitude: '37.7749',
    longitude: '-122.4194',
  };

  it('renders correctly when open', () => {
    render(<CreatePostDialog {...mockProps} />);
    expect(screen.getByText('Create a New Post')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<CreatePostDialog {...mockProps} isOpen={false} />);
    expect(screen.queryByText('Create a New Post')).not.toBeInTheDocument();
  });

  it('calls onCreatePost with correct data when form is submitted', () => {
    render(<CreatePostDialog {...mockProps} />);
    const contentInput = screen.getByPlaceholderText("What's on your mind?");
    fireEvent.change(contentInput, { target: { value: 'Test post content' } });
    fireEvent.click(screen.getByText('Create Post'));
    expect(mockOnCreatePost).toHaveBeenCalledWith({
      content: 'Test post content',
      latitude: '37.7749',
      longitude: '-122.4194',
    });
  });

  it('calls onClose when close button is clicked', () => {
    render(<CreatePostDialog {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  // Add more tests as needed
});