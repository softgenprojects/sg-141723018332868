import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoibm92ZWxpY2EiLCJhIjoiY2xjdmF0NjR6MHMwZjN3cmxnMHFpaGFjMSJ9.bBri5mIGTCFnINYa75jS4w';

export default function MapBox() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4194, 37.7749], // San Francisco coordinates
      zoom: 12
    });
  }, []);

  return <div ref={mapContainer} className="w-full h-[600px]" />;
}