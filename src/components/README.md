# Components Documentation

This directory contains React components used in the 3D Mapbox World application.

## MapBox

The `MapBox` component renders a 3D map using Mapbox GL JS.

### Props

- `posts`: An array of post objects to display on the map.
- `setLatitude`: A function to update the latitude state in the parent component.
- `setLongitude`: A function to update the longitude state in the parent component.

## Header

The `Header` component displays the application title and navigation.

## ErrorBoundary

The `ErrorBoundary` component catches JavaScript errors anywhere in their child component tree, logs those errors, and displays a fallback UI.

## Usage

Import these components in your pages or other components:

```jsx
import MapBox from '@/components/MapBox';
import Header from '@/components/Header';
import ErrorBoundary from '@/components/ErrorBoundary';
```

Wrap your application or specific components with the ErrorBoundary:

```jsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```