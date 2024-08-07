import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';
import { usePosts } from '../hooks/usePosts';

// Mock the usePosts hook
jest.mock('../hooks/usePosts');

// Mock the MapBox component
jest.mock('../components/MapBox', () => {
  return function DummyMapBox() {
    return <div data-testid="map-box">Map Box</div>;
  };
});

describe('Home Component', () => {
  beforeEach(() => {
    usePosts.mockReturnValue({
      posts: [{ id: 1, content: 'Test post', latitude: 37.7749, longitude: -122.4194 }],
      isLoading: false,
      error: null,
      nextPage: jest.fn(),
      prevPage: jest.fn(),
      page: 1,
      totalPages: 2,
    });
  });

  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText('3D Mapbox World - San Francisco')).toBeInTheDocument();
  });

  it('displays the MapBox component', () => {
    render(<Home />);
    expect(screen.getByTestId('map-box')).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    const { nextPage, prevPage } = usePosts();
    render(<Home />);
    
    fireEvent.click(screen.getByText('Next'));
    expect(nextPage).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Previous'));
    expect(prevPage).toHaveBeenCalled();
  });

  it('displays loading state', () => {
    usePosts.mockReturnValue({
      ...usePosts(),
      isLoading: true,
    });
    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    usePosts.mockReturnValue({
      ...usePosts(),
      error: new Error('Test error'),
    });
    render(<Home />);
    expect(screen.getByText('Failed to load posts. Please try again later.')).toBeInTheDocument();
  });
});