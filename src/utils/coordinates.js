// San Francisco boundaries (approximate)
const SF_BOUNDS = {
  north: 37.84,
  south: 37.71,
  east: -122.35,
  west: -122.52
};

export function generateRandomSFCoordinates() {
  const lat = Math.random() * (SF_BOUNDS.north - SF_BOUNDS.south) + SF_BOUNDS.south;
  const lng = Math.random() * (SF_BOUNDS.east - SF_BOUNDS.west) + SF_BOUNDS.west;
  return { latitude: lat.toFixed(6), longitude: lng.toFixed(6) };
}

export function isWithinSF(lat, lng) {
  return lat >= SF_BOUNDS.south && lat <= SF_BOUNDS.north && 
         lng >= SF_BOUNDS.west && lng <= SF_BOUNDS.east;
}