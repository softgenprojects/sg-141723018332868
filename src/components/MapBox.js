import { useEffect, useRef, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { logError } from '@/utils/errorLogging';
import { isWithinSF } from '@/utils/coordinates';

mapboxgl.accessToken = 'pk.eyJ1Ijoibm92ZWxpY2EiLCJhIjoiY2xjdmF0NjR6MHMwZjN3cmxnMHFpaGFjMSJ9.bBri5mIGTCFnINYa75jS4w';

function MapBox({ posts, onMapClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  const initializeMap = useCallback(() => {
    if (map.current) return;
    try {
      console.log('Initializing map');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/novelica/cldzj4ky0003h01qkjx9xqfhk',
        center: [-122.4194, 37.7749],
        zoom: 12,
        pitch: 60,
        bearing: -60,
      });

      map.current.on('load', () => {
        console.log('Map loaded');
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      });

      map.current.on('click', (e) => {
        console.log('Map clicked', e.lngLat);
        onMapClick(e.lngLat.lat, e.lngLat.lng);
      });
    } catch (error) {
      logError('Error initializing map:', error);
    }
  }, [onMapClick]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (!map.current || !memoizedPosts) return;

    console.log('Updating markers', memoizedPosts);

    try {
      // Remove existing markers
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // Add new markers
      memoizedPosts.forEach((post) => {
        if (!isWithinSF(post.latitude, post.longitude)) {
          console.warn('Post coordinates outside SF:', post);
          return;
        }

        console.log('Creating marker for post', post);
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = '#3FB1CE';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([post.longitude, post.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${post.content}</p>`))
          .addTo(map.current);

        markers.current.push(marker);
      });
    } catch (error) {
      logError('Error adding markers to map:', error);
    }
  }, [memoizedPosts]);

  return <div ref={mapContainer} className="w-full h-full" aria-label="3D Map of San Francisco" />;
}

export default MapBox;