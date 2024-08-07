import { useEffect, useRef, useMemo, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoibm92ZWxpY2EiLCJhIjoiY2xjdmF0NjR6MHMwZjN3cmxnMHFpaGFjMSJ9.bBri5mIGTCFnINYa75jS4w';

function MapBox({ posts, setLatitude, setLongitude }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const memoizedPosts = useMemo(() => posts, [posts]);

  const initializeMap = useCallback(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/novelica/cldzj4ky0003h01qkjx9xqfhk',
      center: [-122.4194, 37.7749],
      zoom: 12,
      pitch: 60,
      bearing: -60,
    });

    map.current.on('load', () => {
      map.current.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    });

    map.current.on('click', (e) => {
      setLatitude(e.lngLat.lat.toFixed(6));
      setLongitude(e.lngLat.lng.toFixed(6));
    });
  }, [setLatitude, setLongitude]);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (!map.current || !memoizedPosts) return;

    const markers = [];

    memoizedPosts.forEach((post) => {
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

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.remove());
    };
  }, [memoizedPosts]);

  return <div ref={mapContainer} className="w-full h-[600px]" aria-label="3D Map of San Francisco" />;
}

export default MapBox;