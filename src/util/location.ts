import { Location } from "../lib/types";

const GOOGLE_API_KEY = `AIzaSyDyb7LucUVu9zu-LNgqX1RYB5LzkWi-CK4`;
const GOOGLE_STATIC_MAP = `https://maps.googleapis.com/maps/api/staticmap`;
const GOOGLE_GEOCODE = `https://maps.googleapis.com/maps/api/geocode/json`;

export const getMapPreview = ({ latitude, longitude }: Location) => {
  const imagePreviewUrl = `${GOOGLE_STATIC_MAP}?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async ({ latitude, longitude }: Location) => {
  const response = await fetch(
    `${GOOGLE_GEOCODE}?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
};
