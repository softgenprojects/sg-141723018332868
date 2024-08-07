import React from 'react';
import { render, screen } from '@testing-library/react';
import MapBox from '../components/MapBox';

// Mock mapboxgl
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    remove: jest.fn(),
  })),
  Popup: jest.fn(() => ({
    setHTML: jest.fn().mockReturnThis(),
  })),
}));

describe('MapBox Component', () => {
  const mockPosts = [
    { id: 1, content: 'Test post 1', latitude: 37.7749, longitude: -122.4194 },
    { id: 2, content: 'Test post 2', latitude: 37.7750, longitude: -122.4195 },
  ];

  it('renders without crashing', () => {
    render(<MapBox posts={mockPosts} onMapClick={() => {}} />);
    expect(screen.getByLabelText('3D Map of San Francisco')).toBeInTheDocument();
  });

  it('initializes map on mount', () => {
    render(<MapBox posts={mockPosts} onMapClick={() => {}} />);
    expect(mapboxgl.Map).toHaveBeenCalled();
  });

  it('adds markers for each post', () => {
    render(<MapBox posts={mockPosts} onMapClick={() => {}} />);
    expect(mapboxgl.Marker).toHaveBeenCalledTimes(mockPosts.length);
  });

  // Add more tests as needed
});