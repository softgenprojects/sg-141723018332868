import React from 'react';
import { render, screen } from '@testing-library/react';
import MapBox from '../components/MapBox';
import Header from '../components/Header';
import ErrorBoundary from '../components/ErrorBoundary';

describe('Component Tests', () => {
  test('MapBox renders without crashing', () => {
    render(<MapBox posts={[]} setLatitude={() => {}} setLongitude={() => {}} />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  test('Header renders correctly', () => {
    render(<Header />);
    expect(screen.getByText('3D Mapbox World - San Francisco')).toBeInTheDocument();
  });

  test('ErrorBoundary catches errors', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});