import { generateRandomSFCoordinates, isWithinSF } from '../utils/coordinates';

describe('Coordinate Utilities', () => {
  test('generateRandomSFCoordinates returns coordinates within SF', () => {
    const coords = generateRandomSFCoordinates();
    expect(isWithinSF(coords.latitude, coords.longitude)).toBe(true);
  });

  test('isWithinSF correctly identifies SF coordinates', () => {
    expect(isWithinSF(37.7749, -122.4194)).toBe(true); // San Francisco
    expect(isWithinSF(34.0522, -118.2437)).toBe(false); // Los Angeles
  });
});