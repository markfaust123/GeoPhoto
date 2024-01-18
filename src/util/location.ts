import { Location } from "../lib/types";

const GOOGLE_API_KEY = `AIzaSyDyb7LucUVu9zu-LNgqX1RYB5LzkWi-CK4`;
const GOOGLE_STATIC_MAP = `https://maps.googleapis.com/maps/api/staticmap`;

export const getMapPreview = ({latitude, longitude}: Location) => {
    const imagePreviewUrl = `${GOOGLE_STATIC_MAP}?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}